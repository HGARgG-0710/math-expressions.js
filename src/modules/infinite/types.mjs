// TODO: get rid of all the "typechecking" stuff with this... (Leftovers from TS); Do the same for the entire repository; 
import { constants } from "../../infinite.mjs"
import { dim } from "../../finite.mjs"

// TODO: also, add stuff for different numeral systems; create one's own, generalize to a class for their arbitrary creation...
// * That's an example of an infinite counter;
// * btw, it is non-linear, that is one can give to it absolutely any array, like for example [[[0, 1234566643]]], and it won't say word against it; will continue in the asked fashion...
// * This particular nice feature allows to build different InfiniteCounters with different beginnings on it...
// ! but its output should not be used for reference-checking things, it creates entirely new objects when being called...
function numberCounter(a) {
	if (a === undefined) return [0]
	// ? put these two out of the function's context?
	function findDeepUnfilledNum(a, prevArr = []) {
		const i = [...prevArr, 0]
		for (; i[i.length - 1] < a.length; i[i.length - 1]++) {
			const indexed = a[i[i.length - 1]]
			if (indexed instanceof Array) {
				const temp = findDeepUnfilledNum(a, i)
				if (temp) return temp
				continue
			}
			if (indexed < constants.js.MAX_INT) return i
		}
		return false
	}
	function findDeepUnfilledArr(a, prevArr = []) {
		const i = [...prevArr, 0]
		for (; i[i.length - 1] < a.length; i[i.length - 1]++) {
			// ! noticed another "percularity" about TypeScript (one of those things that had been previously called "stupidity");
			// * When an expression is being checked for something without the value of that expression changeing...
			// * The thing won't react to the type-check! This is a very bright example: one would not call the thing in question 'indexed' had it worked without it;
			// ? should this be submitted to their Issues? (one didn't check if this was an actual thing with the compiler, though Linter's behaviour suggests that it is)
			const indexed = a[i[i.length - 1]]
			if (indexed instanceof Array) {
				if (indexed.length < constants.js.MAX_INT) return i
				const temp = findDeepUnfilledArr(a, i)
				if (temp) return temp
			}
		}
		return false
	}
	let resultIndexes = findDeepUnfilledNum(a)
	const _result = util.deepCopy(a)
	let result = _result
	if (!resultIndexes) {
		resultIndexes = findDeepUnfilledArr(a)
		if (!resultIndexes) return [a]
		// TODO: again, the same thing as below...
		for (let i = 0; i < resultIndexes.length - 1; i++) {
			const indexed = result[resultIndexes[i]]
			if (indexed instanceof Array) {
				result = indexed
				continue
			}
			break
		}
		// TODO: THIS DOESN'T WORK; oldapi dim() handles only finitely deep arrays (id est, it's useless...); do the thing manually here... newapi 'dim' will use the numberCounter...
		const finalDimension = dim(a) - resultIndexes.length
		// todo: again, the same thing as below...
		for (let i = 0; i < finalDimension; i++) {
			result.push([])
			const last = result[result.length - 1]
			if (!isNumber(last)) result = last
		}
		result.push(0)
		return _result
	}
	// * Hmmm... That's a very interesting thing there...
	// * See, that thing is already in one of the unpublished projects that depend upon the math-expressions.js;
	// ? Solution: if the versions of the dependant and the dependee are different, then it's alright...;
	// TODO: implement, later, after publishing both the math-expressions.js 1.0 and the new thing...;
	// ! the check is, again, only for TS to shut up...
	for (let i = 0; i < resultIndexes.length - 1; i++) {
		const indexed = result[resultIndexes[i]]
		if (indexed instanceof Array) {
			result = indexed
			continue
		}
		break
	}
	let finalIndexed = result[resultIndexes[resultIndexes.length - 1]]
	if (isNumber(finalIndexed)) finalIndexed++ // this is for TypeScript to shut up only...
	return _result
}
// TODO: define such similar "default" types' typecheckers; TypeScript is an unworkable piece of shit and a pain to work with; Let the library make this easier about working with it, at the very least;
// TODO: pray do define all such for all types present within the library;
function isNumber(x) {
	return typeof x === "number"
}
function isUndefined(x) {
	return x === undefined
}
// TODO: the thing with the booleans used can also be replaced by a function from a different unpublshed library...
// * an example of a typechecker for the recursive arrays...
function isRecursiveArray(x, typechecker) {
	return (
		x instanceof Array &&
		Math.min(
			...x.map((a) =>
				Number(isRecursiveArray(a, typechecker) || typechecker(a))
			)
		) === 1
	)
}
// TODO: add the circular counters (too, an infiniteCounter, just one that is looped)
// TODO: finish this thing (add orders, other things from the previous file)...
// TODO: add ways of 'jumping' forward onto a 'number | InfiniteCounter' of steps, along with an order of some kind (which would map the wanted thing to the wanted quantity of steps);
// TODO: add a way of transforming the given InfiniteCounter into a TrueInteger on-the-go and back again; This allows to use them equivalently to built-in numbers (their only difference currently is counter arithmetic...)
// ! There is a problem with this class: The array is used for "InfiniteCounter.previous"; Because of this, there is only limited number of previous members that can be;
// TODO: create an InfiniteArray type and put it there (not just an `InfiniteArray<T = any> := InfiniteMap<InfiniteCounter<number>, T, undefined>)...
// * With the approach outlined in the brackets, there is a difficulty -- infinite recursion (dependency); So, instead, one should pick an alternative one...
// * Example of an implementation -- same, but the InfiniteCounter of an InfiniteArray is hardcoded into itself (uses the numberCounter, for example...);
class InfiniteCounter {
	next() {
		return new InfiniteCounter([...this.previous, this], this.generator)
	}
	prev() {
		return this.previous[this.previous.length - 1]
	}
	// * 'true' means 'follows after'
	// * 'false' means 'is followed after'
	// * 'null' means 'no following';
	// TODO: add the 'comparison' argument here. One may want to abstract from the references (current thing in certain circumstances don't work)...
	compare(ic) {
		return this.previous.includes(ic)
			? true
			: ic.previous.includes(this)
			? false
			: null
	}
	constructor(previous = [], generator) {
		this.generator = generator
		this.previous = previous
		this.value = previous.length
			? generator(previous[previous.length - 1].value)
			: generator()
	}
}
// TODO: in a library of oneself, there is a piece of code that does precisely this kind of a thing (recursiveApplication);
// * Again, the issue with inter-dependency; solution is the same -- first publish like so, then rewrite differently...
function fromNumber(n, generator) {
	if (n <= 0) return undefined
	let result = new InfiniteCounter([], generator)
	n = BigInt(n) - 1n
	for (let i = 0n; i < n; i++) result = result.next()
	return result
}
// TODO: document what does this do exactly... Along with everything else...
// TODO: pray re-order the library's new API again (don't seem to completely like the way it looks like currently...)
function sameStructure(
	array,
	generator,
	currval = undefined,
	copy = true,
	subcall = false
) {
	const copied = copy ? util.deepCopy(array) : array
	for (let i = 0; i < copied.length; i++) {
		const index = copied[i]
		if (index instanceof Array) {
			currval = sameStructure(index, generator, currval, false, true)
			continue
		}
		currval = currval === undefined ? generator() : generator(currval)
		copied[i] = currval
	}
	return !subcall ? currval : copied
}
function isBigInt(x) {
	return typeof x === "bigint"
}
// * For iteration over an array; this thing is index-free; handles them for the user;
// * By taking different permutations of an array, one may cover all the possible ways of accessing a new element from a new one with this class;
// ! This thing isn't infinite though. For infinite version, InfiniteArray could be used instead...
class IterableSet {
	curr() {
		return Array.from(this.elements.values())[this.currindex]
	}
	next() {
		// ? should self be creating a new method "updateIndex()"? This could be more useful than this... Saves time, one don't always have to have the output...
		// * Current decision: yes, let it be.
		// TODO: pray do that...
		this.currindex = (this.currindex + 1) % this.elements.size
		return this.curr()
	}
	add(x) {
		return this.elements.add(x)
	}
	has(x) {
		if (!this.typechecker(x)) return false
		return this.elements.has(x)
	}
	get size() {
		return this.elements.size
	}
	delete(x) {
		if (!this.typechecker(x)) return false
		return this.elements.delete(x)
	}
	constructor(elems = new Set([]), typechecker = (x) => true) {
		this.currindex = 0
		this.elements = elems
		this.typechecker = typechecker
	}
}
class UniversalMap {
	get(key, comparison = (a, b) => a === b, number = 1) {
		const indexes = util.indexOfMult(this.keys, key, comparison)
		if (indexes.length === 0) return this.notFound
		return indexes.slice(0, number).map((i) => this.values[i])
	}
	set(key, value, comparison = (a, b) => a === b) {
		const index = util.indexOfMult(this.keys, key, comparison)
		if (index.length !== 0) {
			for (const _index of index) this.values[_index] = value
			return value
		}
		this.keys.push(key)
		this.values.push(value)
		return value
	}
	constructor(
		keys,
		values,
		notFound = undefined,
		notFoundChecker = (x) => x === undefined
	) {
		this.keys = keys
		this.values = values
		this.notFound = notFound
		this.notFoundChecker = notFoundChecker
	}
}
// * Not to write TypeCheckers every time...
// TODO: using those two, pray do refactor the code that uses the ': x is Type' kind of types; Let they be defined in terms of these functions...
function typechecker(_function) {
	return (x) => _function(x)
}
function typecheck(x, f) {
	return typechecker(f)(x)
}
// TODO: currently, work with the RecursiveArrays is such a pain; Do something about it;
// * The matter of recursiveIndexation and other such library things (code re-doing) would solve a considerable part of the problem;
// * Also, the library (probably) should export this thing from the different library as well (would give the user a way of getting less dependencies...)
// TODO: finish this thing... (as well as others...)
class InfiniteArray {
	currIndex() {
		return this.index
	}
	next() {
		// TODO: these recursive functions should get generalizations that would become dependencies...
		// ? perhaps, the library function that does this kind of stuff should too be rewritten (after adding math-expressions.js as a dependency) to work with InfiniteCounter(s)
		function recursive(array, index, path, typechecker) {
			for (let i = 0; i < path.length; i++) {
				const indexed = path[i]
				if (typeof indexed !== "number") {
					;[array, index] = recursive(
						array,
						index,
						indexed,
						typechecker
					)
					continue
				}
				const indexindexed = index[indexed]
				const arrayindexed = array[indexed]
				if (
					typeof indexindexed === "boolean" ||
					typechecker(arrayindexed)
				)
					break
				index = indexindexed
				array = arrayindexed
			}
			return [array, index]
		}
		const path = this.currElement()
		let [array, index] = recursive(
			this.array,
			this.index,
			path,
			this.typechecker
		)
		const lastIndex = path[path.length - 1]
		if (typeof lastIndex === "number") index[lastIndex] = false
		// TODO: as one have decided that the InfiniteArrays can have user-defined, there comes the question of finding and marking the next index... do this;
		// * There is a strong feeling for far more advanced API for working with the RecursiveArrays; This API is to be added
		// ! Pray do walk the code up and down and decide what to do about this...
	}
	currElement() {
		let current = this.index
		function recursive() {
			const prevCurrent = current
			let temp = false
			if (prevCurrent instanceof Array) {
				for (let i = 0; i < prevCurrent.length; i++) {
					current = prevCurrent[i]
					if (typeof current === "boolean") {
						if (current) return [i]
						continue
					}
					temp = recursive()
					if (temp !== false) {
						if (temp.length < constants.js.MAX_ARRAY_LENGTH)
							return [i, ...temp]
						return [i, temp]
					}
				}
				current = prevCurrent
			}
			return temp
		}
		// * shutting TypeScript up...
		return recursive()
	}
	// ! this thing should get some documentation. very very much should...
	// * finds the first index and sets the thing to it...
	first(shouldSet = true) {
		this.index = sameStructure(this.index, () => false)
		const index = []
		let indexpointer = index
		let current = this.index
		// TODO: create a function in a different library for general dealing with these things... Later, pray do change this for that too...
		while (true) {
			if (typeof current[0] !== "boolean") {
				const isFull =
					indexpointer.length === constants.js.MAX_ARRAY_LENGTH - 1
				indexpointer.push(isFull ? [] : 0)
				const lastPointer = indexpointer[indexpointer.length - 1]
				if (isFull && lastPointer instanceof Array)
					indexpointer = lastPointer
				current = current[0]
				continue
			}
			break
		}
		if (shouldSet) current[0] = true
		return index
	}
	// * IDEAS FOR UNITED API OF WORKING WITH THE RECURSIVEARRAYS:
	// * 1. Function for indexation by means of some RecursiveArray<number>; There should be a way to establish the order of following (DECIDE HOW IT WOULD BE IMPLEMENTED WITHIN THIS LIBRARY);
	// * 2. Function for setting values to an array value based on a RecursiveArray<number>-index, with the same kind of "order" thing as in 1.
	// ? Currently, that's just the stuff that the InfiniteArray implementation is concerned with;
	// ! Now, if one was to write it for the InfiniteArray<Type>, one would then generalize the stuff to an arbitrary RecursiveArray<Type> and then just define InfiniteArray as a convinient in-built wrapper around the stuff...
	// ? This still don't solve the problem of generalizing the specific cases of recursive functions that are a part of the InfiniteArray methods, though;
	// * This would have in it the ideas of the order, structure of the given array (ways of copying it, changing it flexibly, reading via some handy InfiniteMap-structure);
	// * Also, should be ways of assigning to it an "index-array" with the same structure, which would contain various kinds of datatypes in it, allowing to read the array in various ways (simplest example -- boolean for marking an element; one could have one type with some "n" different modes, allowing for different ways of accessing it...);
	// * The "index-arrays" along with the orders and different comparison functions should be useable to read something from a recursive array...
	// ! Then, the InfiniteArray would simply become a special case of all this with it having the index array being boolean, or something (or it would become a truly general wrapper with 'boolean' as merely a default case...);
	// ! There is also another small trouble preventing the swift generalization of all these things -- lack of singular form for checking the same stuff (somewhere, 'typeof' is used and somewhere else 'instanceof', for example);
	// * Also: to avoid "if-else" (branching), one uses 'if-continue' or 'if-break';
	// * Different things are checked and the return types are not unanimous (they differ, though could (probably) be made to be in the same general form);
	// * Different loops are used;
	// ! Also, there should be ways of transforming a non-infinite Array into an Infinite one;
	last() {}
	// TODO: implement a safe-check that the last element of the last of the last ... of the last array IS, in fact, a RecursiveArray<Type>; if not, pray do change the structure of the final array,
	constructor(objects, typechecker) {
		this.array = objects
		this.index = sameStructure(this.array, () => false)
		this.first(true)
		this.typechecker = typechecker
	}
}
// ? Should one not then write the InfiniteArray class, then use it in the InfiniteString class (not to repeat the same things all over again)?
// TODO: finish the InfiniteString class; It would allow work like with a string, though would be based on the InfiniteCounter/TrueInteger classes...
// * Let it have all the capabilities (methods, properties) of a string and more -- let there be a way to reverse() it natively...;
class InfiniteString {
	append(x) {
		// ? generalize and then make an export ?
		function appendStrRecursive(str, thisArg, i = 0) {
			// TODO: replace with repeatedApplication or recursiveIndexation or something such within a different library...
			let currLevel = thisArg.string
			for (let j = 0; j < i; j++) {
				// * again, TypeScript...
				const indexed = currLevel[currLevel.length - 1]
				if (typeof indexed === "string") break
				currLevel = indexed
			}
			if (currLevel.length < constants.js.MAX_ARRAY_LENGTH - 1) {
				thisArg.length = thisArg.length.next()
				currLevel.push(str)
				return
			}
			if (currLevel.length === constants.js.MAX_ARRAY_LENGTH - 1)
				currLevel.push([])
			return appendStrRecursive(str, thisArg, i + 1)
		}
		function appendInfStringRecursive(arr, thisArg) {
			for (let i = 0; i < arr.string.length - 1; i++) {
				const currStr = arr.string[i]
				if (typeof currStr !== "string") break
				appendStrRecursive(currStr, thisArg)
			}
			if (arr.string.length === constants.js.MAX_ARRAY_LENGTH) {
				appendInfStringRecursive(
					new InfiniteString(
						arr.string[arr.string.length - 1],
						arr.indexGenerator
					),
					this
				)
			}
		}
		if (typeof x === "string") return appendStrRecursive(x, this)
		return appendInfStringRecursive(x, this)
	}
	copy() {
		return util.deepCopy(this)
	}
	// TODO: allow for use of the InfiniteString as an argument... (That is, copying an InfiniteString; new instance is by default its extension...)
	// TODO: allow for use of the RecursiveArray<string>... (for this, generalize the last element-safety check...)
	constructor(initial, indexGenerator) {
		if (typeof initial === "string") {
			this.string = [initial]
			return
		}
		this.string = initial
		// TODO: use the util.gut... and util.encircle... functions for the finalized check (make it all the same form -- [string, ...., pointer to RecursiveArray<string>])
		if (initial.length === constants.js.MAX_ARRAY_LENGTH) {
			this.string[this.string.length - 1] = [
				this.string[this.string.length - 1]
			]
		}
		this.length = fromNumber(initial.length, indexGenerator)
		this.indexGenerator = indexGenerator
	}
}
// TODO: finish the InfiniteMap class; the UniversalMap has a limitation of 2**32 - 1 elements on it, whilst the InfiniteMap would have no such limitation...
// TODO: let the InfiniteMap and UniversalMap have the capabilities of adding getters/setters (or better: create their natural extensions that would do it for them)
class InfiniteMap {
	// TODO: finish this later... Mr. Body feels tired...
	// * Here, one should implement the algorithms for setting an index of interest (which depends on the current length of the array), to a given value; It comes down to finding the first free index, restructuring the array recursively and creating one, if there isn't...;
	set(key, value) {}
	// * Here, one finds the fitting keys, returns an array of their values;
	get(key, comparison = (a, b) => a === b, number) {}
	constructor(
		keys,
		values,
		notFound,
		notFoundChecker,
		keyTypeChecker,
		valuetypeChecker
	) {
		this.keys = keys
		this.values = values
		this.notFound = notFound
		this.notFoundChecker = notFoundChecker
		this.isValueType = valuetypeChecker
		this.isKeyType = keyTypeChecker
	}
}
