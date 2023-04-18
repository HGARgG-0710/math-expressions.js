// TODO: get rid of all the redundant (due to moving from TS) definitions... (that is, those that can work for many different kinds of objects the same way, but have a type-counterpart which is essentially the same thing...);
// TODO: tidy up;
// TODO: see that all the algorithms here are, in fact, finite;

// ? Question: what to do with those definitions that happen to be universal?
// * Example: the "valueCompare" -- it would work for both the "finite" and "infinite" apis the same, though if had an "infinite" counterpart, the latter would be rather more intuitive relative to those types...
// * But underneath, it's still all an object...
// * Same goes for deepCopy, flatCopy
// * Decision: all such will go to the "infinite";

// TODO: let the "finite.mjs" have the same structure as "infinite.mjs" (them being dual), whilst the "math-expressions.js" will stay (mostly, apart from bug fixes), untouched...
// * For this, pray distribute the contents of the file through others... (For this, create a particular distribution first)
// * (One would want a separate file for everything related to numbers...)

import { max } from "./finite.mjs"

// * Replaces a value within a string...
function replaceStr(string, x, y) {
	return string.split(x).join(y)
}
function replaceStrInd(string, ind, value) {
	return `${string.slice(0, ind)}${value}${string.slice(ind)}`
}
// TODO: code-rework -- rewrite as repeated application of the replaceStrInd...
function replaceStrIndMany(string, inds, values) {
	let copy = string
	for (let i = 0; i < inds.length; i++)
		copy = replaceStrInd(copy, inds[i], values[i])
	return copy
}
function replaceStrMany(string, x, y) {
	// TODO: again, the repeatedApplication from a different library could do this in 1 line... Same thing with the versions...
	// * do code-update...
	let final = string
	for (let i = 0; i < x.length; i++) final = replaceStr(final, x[i], y[i])
	return final
}
// * Replaces values within an array and returns the obtained copy...
function replaceArr(array, x, y, transformation = (a) => a) {
	const resArray = [...array]
	for (let i = 0; i < array.length; i++) {
		const index = x.indexOf(array[i])
		if (index !== -1) resArray[i] = transformation(y[index])
	}
	return resArray
}
// * just a convinient syntax...
function arrThisApply(f, arr, thisArg = null) {
	return f.apply(thisArg, arr)
}
function arrApply(f, arr) {
	return f(...arr)
}
const countAppearences = (
	array,
	element,
	i = 0,
	comparison = (a, b) => a === b
) =>
	i < array.length
		? Number(comparison(array[i], element)) +
		  countAppearences(array, element, i + 1, comparison)
		: 0
function indexOfMult(array, el, comparison = (a, b) => a === b) {
	const indexes = []
	for (let i = 0; i < array.length; i++)
		if (comparison(array[i], el)) indexes.push(i)
	return indexes
}
// ? which one to use as an export? (they will both be kept in any case...)
// * Current decision: the newer one (one below);
// * Alternative implementation (this time, with a searchIndex -- i parameter):
// export const indexOfMult = (
// 	array: any[],
// 	el: any,
// 	comparison: (a: any, b: any) => boolean = (a: any, b: any) => a === b,
//  i: number = 0
// ) => {
//		if (i >= array.length) return []
// 		const next = indexOfMult(array, el, comparison, i + 1)
// 		return comparison(array[i], el) ? [i, ...next]: [...next]
// }
// * clears all but the first `tokeep` repetition of `el`
function clearRepetitions(arr, el, tokeep = 0, comparison = (a, b) => a === b) {
	const firstMet = indexOfMult(arr, el, comparison)
	return firstMet.length
		? arr.filter(
				(a, i) => firstMet.indexOf(i) < tokeep || !comparison(a, el)
		  )
		: [...arr]
}
function splitArr(arr, el, comparison) {
	const segments = []
	let begInd = 0
	let endInd = 0
	for (let i = 0; i < arr.length; i++)
		if (comparison(el, arr[i])) {
			begInd = endInd + Number(Boolean(endInd))
			endInd = i
			segments.push([begInd, endInd])
		}
	return segments.map((seg) => arr.slice(...seg))
}
// * "guts" the first layer inner arrays into the current one...
function gutInnerArrs(array) {
	const returned = []
	for (let i = 0; i < array.length; i++) {
		if (array[i] instanceof Array) {
			array[i].forEach(returned.push)
			continue
		}
		returned.push(array[i])
	}
	return returned
}
// TODO: this thing don't copy an array; It changes the existing one (namely, changes the reference)...
// * Rewrite so that it returns a new one...
function gutInnerArrsRecursive(array) {
	while (hasArrays(array)) array = gutInnerArrs(array)
	return array
}
// TODO: another one's library has a method for this thing (boolmapMult; maps a set of boolean functions to a set of values forming a 2d boolean array...)
// * code-update...
const hasArrays = (array) =>
	max(array.map((a) => Number(a instanceof Array))) === 1
// * "reverses" the gutInnerArrs (only once, at a given place)
function arrEncircle(a, from = 0, to = a.length) {
	const copied = []
	for (let i = 0; i < a.length; i++) {
		if (i >= from && i <= to) {
			copied.push(a.slice(from, to + 1))
			i = to
		}
		copied.push(a[i])
	}
	return copied
}
// todo: generalize (using the notion of 'level' -- capability to copy up to an arbitrary level... rest is either referenced or ommited (depends on a flag, for instance?)); Having generalized, pray get rid of this special case...
// * copies array's structure deeply without copying the elements
// ? create one similar such, except an even largetly generalized? (using the notion of 'objectType' and whether something matches it, for example?)
function arrStructureCopy(thing) {
	if (thing instanceof Array) return thing.map(arrStructureCopy)
	return thing
}
// TODO: write the gutInnerObjs function, as well as guttInnerObjsRecursive; principle is same as the array functions;
// TODO: the same way, write objEncircle; there'd also be an argument for the key;
// TODO: the same way, write "encircle" functions for the UniversalMaps and InfiniteMaps (maybe, make these a method of theirs (too?)?)
// TODO: write the same one for the UniversalMap(s) and InfiniteMap(s) (they would differ cruelly...)
// TODO: write methods for encircling a piece of an array with an object (also takes the keys array...) and a piece of an object with an array;
// * Same permutations for the InfiniteMap and UniversalMap...
// TODO : for each and every array/object function available, pray do write the InfiniteMap and UnversalMap versions for them...
// TODO: same goes for the old api -- let every single thing from there have an infinite counterpart here...
// TODO: add more methods to UniversalMap and InfiniteMap;
// * Create the .map methods for them -- let they be ways of mapping one set of keys-values to another one;
// ! There is something I do not like about the 'comparison' parameter...
// * It is only of 2 variables...
// TODO: think about generalizing to arbitrary number of variables...
// * IDEA: a recursive function-building type: RecursiveFunctionType<ArgType, Type> = (a: ArgType) => RecursiveFunctionType<Type> | Type
// ! By repeatedly calling them, one would obtain expressions equivalent to some n number of variables...: func(a)(b)(c) instead of func(a, b, c);
function arrIntersections(arrs, comparison = (a, b) => a === b) {
	if (arrs.length === 0) return []
	if (arrs.length === 1) return arrs[1]
	if (arrs.length === 2) {
		const result = []
		for (let i = 0; i < arrs[0].length; i++) {
			for (let j = 0; j < arrs[1].length; j++) {
				// TODO: change for the use of indexOfMult... the .includes thing...
				if (
					comparison(arrs[0][i], arrs[1][j]) &&
					!result.includes(arrs[0][i])
				) {
					// ? Problem: this thing is not very useful (as in, general); It throws out the information concerning the arrs[1][j];
					// * This is not good...
					// TODO: fix; restructure it somehow...
					result.push(arrs[0][i])
				}
			}
		}
		return result
	}
	return arrIntersections(
		[arrs[0], arrIntersections(arrs.slice(1), comparison)],
		comparison
	)
}

function repeatedApplication(a, n, initial = undefined) {
	if (n <= 0) return undefined
	if (n === 1) return a(initial)
	return a(repeatedApplication(a, n - 1))
}

function repeatedApplicationIndex(a, n, initial = undefined, offset = 1) {
	if (n <= 0) return undefined
	if (n === 1) return a(initial, n - offset)
	return a(
		repeatedApplicationIndex(a, n - 1, initial, offset),
		n - offset - 1
	)
}

// * This can create infinite loops... Equiv. of `function () {let a = initial; while (property()) {a = b(a)}; return a}`; (Should one not also add this one thing?)
function repeatedApplicationWhilst(function_, property, initial = undefined) {
	return property()
		? repeatedApplicationWhilst(function_, property, function_(initial))
		: initial
}

const repeatedApplicationWhile = repeatedApplicationWhilst

// ? should this be kept? It is a special case of the function below....
// * Current decision: let it stay; it may be nice to just "get it"; without taking the first index...
function _multmap(a, fs) {
	return multmap([a], fs)[0]
}

// * Finds use in Mr. Body's code all the time.
// ^ Note: The first index stays for the elements, the second one stays for the function...
function multmap(a, fs) {
	return a.map((el) => fs.map((f) => f(el)))
}

// TODO: match the order of the functions with the order of exports... Do the same for all the files...
export {
	replaceStr,
	replaceStrInd,
	replaceStrMany,
	replaceStrIndMany,
	replaceArr,
	arrThisApply,
	arrApply,
	countAppearences,
	indexOfMult,
	clearRepetitions,
	splitArr,
	gutInnerArrs,
	gutInnerArrsRecursive,
	hasArrays,
	arrEncircle,
	arrStructureCopy,
	arrIntersections,
	repeatedApplication,
	repeatedApplicationIndex,
	repeatedApplicationWhile,
	repeatedApplicationWhilst,
	_multmap,
	multmap
}
