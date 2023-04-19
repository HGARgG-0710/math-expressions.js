// TODO: read all the library's code all over and make it such as to be to one's liking -- utter and complete;
// * Get rid of unwanted explicit conversions...
// * Get rid of unwanted "const"'s
// * Get rid of 'let's that can become 'const's
// * Get rid of 'const's that can become results of doing ((c1, ...) => {...[code]})(...arrOfPrevConsts);

// TODO: make places that use these constants more general and flexible;
// (Later, one may expect to use this particular version in a different language transpiled -- for this, pray, do add ways of changing the number limit used here; EVEN IF, for JavaScript that would not be truly possible to use some of them...)
// * Instead of entirely rewriting it then, one would far more prefer simply "choosing" a different version -- substituting a different argument or so...
// ! Delete after fullfilling the TODO...
const MAX_ARRAY_LENGTH = 2 ** 32 - 1

// TODO: tidy up! The source code is a mess of beautiful things...

/**
 * * This is the Old API source code, version pre-1.0 (in work).
 * @copyright HGARgG-0710 (Igor Kuznetsov), 2020-2023
 */
// TODO: finish;

// todo: new things to add:
// * 1. more number-theoretic functions...;
// TODO: things to do (generally):
// * 1. Pick out the "too specific" or "number-oriented" methods and rewrite them to be more general; then, add a version for numbers (for backward compatibility),
// *    or, just add the old alias (like in the case of sameOperator...)
// *    1.1. Special cases of it:
// *        1.1.1. repeatedArithmetic -- rename to repeated (add a ton of new possibilities of use for this...)
// * 2. Rewrite the in-editor JSDoc documentation (most probably, from scratch...)...
// * 3. Add proper types to everywhere in the code (especially, places with dots...);
// * 4. Fix all the compilers' TypeErrors...
// * 5. Make code more permissive (get rid of all the "safety" things, get rid of some of the Error throws -- replace them with special function values, where want to);
// * 6. Simplify and generalize function argument lists; get rid of booleans functions of which can be subsued by the default values of the other parameters without loss of generality... Add more arbitrary-length spread arguments;
// * 7. Add new in-editor documentation for the new definitions...
// * 8. After having finished all else, pray do check that all the things that are being wanted to be exported are, in fact, being exported...

// Global variables

/**
 *
 * * This variable characterizes how many fixed numbers are outputted.
 * * You can change it freely using setPrecision() function, if you want a more "precise" output of some of the functions.
 */
// ? should this thing be kept even? (Consider)
let globalPrecision = 16

// Objects

// ? Add more stuff here? (This table is supposed to be like a small calculator for binary things...)
// TODO: change the architecture of these tables -- they should contain information concerning the Arity of the stuff that is within them...
// * That is one's solution to the problem of the "all functions that work with them currently support only binary operations..., et cetera"
const defaultTable = {
	"+": [(a, b) => realAddition(a, b)[0], 2],
	"-": [(a, b) => realAddition(a, -b)[0], 2],
	"/": [(a, b) => a / b, 2],
	"*": [(a, b) => a * b, 2],
	"**": [(a, b) => a ** b, 2],
	"^": [(a, b) => a ** b, 2],
	xor: [(a, b) => a ^ b, 2],
	">>": [(a, b) => a >> b, 2],
	"<<": [(a, b) => a << b, 2],
	"&": [(a, b) => a & b, 2],
	"|": [(a, b) => a | b, 2],
	"%": [(a, b) => a % b, 2],
	"&&": [(a, b) => a && b, 2],
	"||": [(a, b) => a || b, 2]
}

// * IDEA to the organization of the duality of library's codebase: have a finite version of something, then precisely after it, a definition of infinite.[thing's name] -- its infinite counterpart; For stuff that don't have an explicit finite/infinite counterpart it is left alone/put into the original definition of the 'infinite'
const infinite = {
	// ? some of these things are quite good with the arrays.... Question: should Mr. Body be adding those for some kind of "uniter" structure? (Like the Statistics and other such classes from the oldapi, other classes from other packages?)
	// ? considering the fact that there is now the deepCopy() function (which is a generalization of copy)
	deepCopy(a) {
		if (a instanceof Array) return a.map((el) => infinite.deepCopy(el))
		if (typeof a === "object") {
			const aCopy = {}
			for (const b in a) aCopy[b] = infinite.deepCopy(a[b])
			return aCopy
		}
		return a
	},
	// * A useful algorithm from a different project of mine; value-wise comparison of two arbitrary things...
	// ? should one use "this" instead of "infinite"? This'd allow for some neat object-related stuff...
	// * Current decision: yes, why not
	valueCompare(a, b, oneway = false) {
		if (typeof a !== typeof b) return false
		switch (typeof a) {
			case "object":
				for (const a_ in a)
					if (!infinite.valueCompare(b[a_], a[a_])) return false
				if (!oneway) return infinite.valueCompare(b, a, true)
				return true
			default:
				return a === b
		}
	},
	// * Does a flat copy of something;
	flatCopy(a) {
		return a instanceof Array
			? [...a]
			: typeof a === "object"
			? { ...a }
			: a
	},

	// TODO: also, add stuff for different numeral systems; create one's own, generalize to a class for their arbitrary creation...
	// * That's an example of an infinite counter;
	// * btw, it is non-linear, that is one can give to it absolutely any array, like for example [[[0, 1234566643]]], and it won't say word against it; will continue in the asked fashion...
	// * This particular nice feature allows to build different InfiniteCounters with different beginnings on it...
	// ! but its output should not be used for reference-checking things, it creates entirely new objects when being called...
	numberCounter(MAX_INT = 2 ** 53 - 1, MAX_ARRAY_LENGTH = 2 ** 32 - 1) {
		return functionTemplate(
			{
				maxint: MAX_INT,
				maxarrlen: MAX_ARRAY_LENGTH
			},
			function (a) {
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
						if (indexed < MAX_INT) return i
					}
					return false
				}
				function findDeepUnfilledArr(a, prevArr = []) {
					const i = [...prevArr, 0]
					for (; i[i.length - 1] < a.length; i[i.length - 1]++) {
						const indexed = a[i[i.length - 1]]
						if (indexed instanceof Array) {
							if (indexed.length < this.maxarrlen) return i
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

					// TODO: get rid of such object-parameters... within both this library and others...
					result = recursiveIndexation({
						object: result,
						fields: resultIndexes.slice(0, resultIndexes.length - 1)
					})

					// TODO: THIS DOESN'T WORK; oldapi dim() handles only finitely deep arrays (id est, it's useless...); do the thing manually here... newapi 'dim' will use the numberCounter...
					// ! As well -- resultIndexes IS A FINITE ARRAY; Wouldn't allow one do more than (2**53 - 1)**(2 ** 32 - 1) with this; Using InfiniteArray instead would allow for this thing to work properly...
					// * Actually, not necessarily... One would just write one recursive and that would work just as well...
					const finalDimension = dim(a) - resultIndexes.length
					// ? whilst refactoring, one have noticed a funny thing... -- doing so makes the code LONGER, not shorter...
					// * Does one truly want these kinds of pieces refactored (those simple enough, but when refactored become longer?)
					// * Pray decide...
					// ! This is the finite version... Infinite one is required for the thing anyway...
					// result = repeatedApplication(
					// 	(value) => {
					// 		value.push([])
					// 		return value[value.length - 1]
					// 	},
					// 	finalDimension,
					// 	result
					// )
					for (let i = 0; i < finalDimension; i++) {
						result.push([])
						result = result[result.length - 1]
					}
					result.push(0)
					return _result
				}

				// ? Again! The resulting piece is longer than the original! (Try after having gotten rid of those braces, object notation...)
				// result = recursiveIndexation({
				// 	object: result,
				// 	field: resultIndexes.slice(0, resultIndexes.length - 1)
				// })
				for (let i = 0; i < resultIndexes.length - 1; i++)
					result = result[resultIndexes[i]]
				result[resultIndexes[resultIndexes.length - 1]]++
				return _result
			}
		)
	},

	// ? delete this as well?
	// * pray decide too...
	// TODO: the thing with the booleans used can also be replaced by a function from a different unpublshed library (boolmap)...
	// * an example of a typechecker for the recursive arrays...
	// * This thing could be useful...
	isRecursiveArray(x, checker) {
		return (
			x instanceof Array &&
			Math.min(
				...x.map((a) =>
					Number(isRecursiveArray(a, checker) || checker(a))
				)
			) === 1
		)
	},

	// TODO: in a library of oneself, there is a piece of code that does precisely this kind of a thing (recursiveApplication);
	// * Again, the issue with inter-dependency; solution is the same -- first publish like so, then rewrite differently...
	fromNumber(n, generator) {
		if (n < 0) return undefined
		let result = InfiniteCounter(generator)()
		n = BigInt(n)
		for (let i = 0n; i < n; i++) result = result.next()
		return result
	},
	// TODO: document what does this do exactly... Along with everything else...
	// TODO: pray re-order the library's new API again (don't seem to completely like the way it looks like currently...)
	sameStructure(
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
	},
	// TODO: currently, work with the RecursiveArrays is such a pain; Do something about it;
	// * The matter of recursiveIndexation and other such library things (code re-doing) would solve a considerable part of the problem;
	// * Also, the library (probably) should export this thing from the different library as well (would give the user a way of getting less dependencies...)
	// TODO: finish this thing... (as well as others...)
	InfiniteArray: class {
		currIndex() {
			return this.index
		}
		next() {
			// TODO: these recursive functions should get generalizations that would become dependencies...
			// ? perhaps, the library function that does this kind of stuff should too be rewritten (after adding math-expressions.js as a dependency) to work with InfiniteCounter(s)
			function recursive(array, index, path) {
				for (let i = 0; i < path.length; i++) {
					const indexed = path[i]
					if (typeof indexed !== "number") {
						;[array, index] = recursive(array, index, indexed)
						continue
					}
					const indexindexed = index[indexed]
					const arrayindexed = array[indexed]
					if (typeof indexindexed === "boolean") break
					index = indexindexed
					array = arrayindexed
				}
				return [array, index]
			}
			const path = this.currElement()
			let [array, index] = recursive(this.array, this.index, path)
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
							if (temp.length < MAX_ARRAY_LENGTH)
								return [i, ...temp]
							return [i, temp]
						}
					}
					current = prevCurrent
				}
				return temp
			}
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
					const isFull = indexpointer.length === MAX_ARRAY_LENGTH - 1
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
		constructor(objects) {
			this.array = objects
			this.index = sameStructure(this.array, () => false)
			this.first(true)
		}
	},
	// ? Should one not then write the InfiniteArray class, then use it in the InfiniteString class (not to repeat the same things all over again)?
	// TODO: finish the InfiniteString class; It would allow work like with a string, though would be based on the InfiniteCounter/TrueInteger classes...
	// * Let it have all the capabilities (methods, properties) of a string and more -- let there be a way to reverse() it natively...;
	InfiniteString: class {
		append(x) {
			// ? generalize and then make an export ?
			function appendStrRecursive(str, thisArg, i = 0) {
				// TODO: replace with repeatedApplication or recursiveIndexation or something such within a different library...
				let currLevel = thisArg.string
				for (let j = 0; j < i; j++) {
					const indexed = currLevel[currLevel.length - 1]
					if (typeof indexed === "string") break
					currLevel = indexed
				}
				if (currLevel.length < MAX_ARRAY_LENGTH - 1) {
					thisArg.length = thisArg.length.next()
					currLevel.push(str)
					return
				}
				if (currLevel.length === MAX_ARRAY_LENGTH - 1)
					currLevel.push([])
				return appendStrRecursive(str, thisArg, i + 1)
			}
			function appendInfStringRecursive(arr, thisArg) {
				for (let i = 0; i < arr.string.length - 1; i++) {
					const currStr = arr.string[i]
					if (typeof currStr !== "string") break
					appendStrRecursive(currStr, thisArg)
				}
				if (arr.string.length === MAX_ARRAY_LENGTH) {
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
			if (initial.length === MAX_ARRAY_LENGTH) {
				this.string[this.string.length - 1] = [
					this.string[this.string.length - 1]
				]
			}
			this.length = fromNumber(initial.length, indexGenerator)
			this.indexGenerator = indexGenerator
		}
	},

	// TODO: finish the InfiniteMap class; the UniversalMap has a limitation of 2**32 - 1 elements on it, whilst the InfiniteMap would have no such limitation...
	// TODO: let the InfiniteMap and UniversalMap have the capabilities of adding getters/setters (or better: create their natural extensions that would do it for them)
	InfiniteMap(notfound) {
		return classTemplate({ notfound: notfound }, function (keys, values) {
			return {
				keys: keys,
				values: values,
				set(key, value) {},
				// * Here, one finds the fitting keys, returns an InfiniteArray of their values;
				get(key, comparison = (a, b) => a === b, number) {}
			}
		})
	},

	// TODO: add the circular counters (too, an infiniteCounter, just one that is looped)
	// TODO: finish this thing (add orders, other things from the previous file)...
	// TODO: add a way of transforming the given InfiniteCounter into a TrueInteger on-the-go and back again; This allows to use them equivalently to built-in numbers (their only difference currently is counter arithmetic...)
	// ! There is a problem with this class: The array is used for "InfiniteCounter.previous"; Because of this, there is only limited number of previous members that can be;
	// TODO: create an InfiniteArray type and put it there (not just an `InfiniteArray<T = any> := InfiniteMap<InfiniteCounter<number>, T, undefined>)... The InfiniteArray should work independently...
	// * With the approach outlined in the brackets, there is a difficulty -- infinite recursion (dependency); So, instead, one should pick an alternative one...
	// * Example of an implementation -- same, but the InfiniteCounter of an InfiniteArray is hardcoded into itself (uses the numberCounter, for example...);
	InfiniteCounter(generator) {
		return classTemplate({ generator: generator }, function (previous) {
			return {
				class: this,
				previous: !previous ? new InfiniteArray() : previous,
				value: !previous
					? this.generator()
					: this.generator(previous.index(previous.length - 1).value),
				next() {
					return this.class.class(
						new InfiniteArray(this.previous).add(this)
					)
				},
				previous() {
					return this.previous.index(this.length - 1)
				},
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
				},
				// TODO: this thing don't work; fix; generalize the .compare() and fix it here [because 'comparison' is not used...]...
				jump(x, jumping = (k) => k.next()) {
					x = typeof x === "number" ? fromNumber(x, numberCounter) : x
					if (x === undefined) return this
					let i = InfiniteCounter(numberCounter)
					return repeatedApplicationWhilst(
						(r) => {
							i = i.next()
							return jumping(r)
						},
						() => x.compare(i),
						{ ...deepCopy(this), class: this.class }
					)
				},
				jumpForward(x) {
					return this.jump(x)
				},
				jumpBackward(x) {
					return this.jump(x, (k) => k.prev())
				},
				// ? what kind of a structure is to be returned? It is to be an InfiniteArray like other things...
				// TODO: pray do see that all the things within all parts of the code fit together nicely afterwards...
				// TODO: add a way of mapping one infinite counter to another...
				map(icClass, thisIC) {}
			}
		})
	}
}

// Aliases

const exp = op
const repeatedArithmetic = repeatedOperation
const sameOperator = repeatedArithmetic
const mostPopularElem = mostPopular
const mostPopularNum = mostPopular
const repeatedApplicationWhile = repeatedApplicationWhilst

// TODO: rewrite the docs...
/**
 * Copies an array without referencing its object.
 * @param {any[]} nums An array that needs to be copied.
 * @returns {number[]} Copy of a passed array, without referencing its object.
 */
const copy = infinite.flatCopy
// * Previous definition (later, clear?)
// function copy(nums = [1, 2, 3, 4, 5]) {
// 	return nums.map(id)
// }

// * Identity map (just a nice piece of notation, that's all);
const id = (a) => a

// Classes

/**
 * This class represents an assembly of various statistics on the array of numeric data given.
 *
 * Useful when needing a lot of info about data in one place.
 */
class Statistics {
	static isNumeric(data) {
		for (let i = 0; i < data.length; i++)
			if (typeof data[i] !== "number") return false
		return true
	}
	/**
	 * Takes nums array and creates a Statistics object, containing statistic about the row of numeric data.
	 * @param {number[]} nums An array of numbers passed to the function.
	 * @param {boolean} forward Tells the constructor should, or should not array be structured in order from the least to the largest num or not in case if it is not structured.
	 */
	constructor(nums = [], forward = true, nullValue = "None") {
		if (Statistics.isNumeric(nums)) {
			this.min = min(nums)
			this.max = max(nums)
			this.sorted = sort(nums, forward)
			this.range = range(nums)
			this.interquartRange = range(nums, true)
			this.median = median(nums)
			this.average = average(nums)
			this.truncatedAverage = average(nums, true)
			this.deviations = deviations(nums)
			this.populationVariance = dispersion(nums)
			this.populationStandDev = standardDeviation(nums)
			this.standardError = standardError(nums)
		} else {
			this.min = null
			this.max = null
			this.sorted = null
			this.range = null
			this.interquartRange = null
			this.median = null
			this.average = null
			this.truncatedAverage = null
			this.deviations = null
			this.populationVariance = null
			this.populationStandDev = null
			this.standardError = null
		}
		this.mostPopular = mostPopular(nums, nullValue)
		this.length = nums.length
		this.dim = dim(nums)
	}
}

// TODO: add the user interface to the window of the Surface.draw(), such that it would be possible to modify a surface given right there....
// TODO: get rid of the inLimits: let the thing be scalable: that is, if there is
/**
 * This class represents a geometric surface with dots, segments and lines on it.
 * They are represented via coordinates.
 */
class Surface {
	static n = 0
	// TODO: add capability to have the initial Surface not being empty (unlike it is at the moment...)
	// TODO: use the Tuple type from one's library for the [number...] arrays...
	/**
	 * Takes two objects(or just numeric arrays) with properties from 0 to 2 and creates a Surface object.
	 *
	 * !!! NOTE: Be careful, when choosing step in your limits objects(or arrays), because after Surface.x and Surface.y properties of your object are generated
	 * you can work with this object, providing only dots' coordinates, that exist in these arrays, otherwise you get an error. !!!
	 *
	 * @param {object | number[]} xInit Object(or an array) containing number properties for the x axis of your surface. First number - the start position(the smallest number) of your surface's axis, second numder - the end position of your surafce's x axis and the third is that step, with which an array of numbers will be assembled.
	 * @param {object | number[]} yInit The same as xLimits, but for y axis of your surface.
	 */
	constructor(xInit, yInit) {
		this.n = 0
		this.x = [...xInit]
		this.y = [...yInit]
		this.width = range(this.x)
		this.height = range(this.y)
		this.dots = []
		this.lines = []
		this.segments = []
		this.n = ++Surface.n
	}
	// ? make the "line" have the same shape as a segment? This way, one could have lines that are "not full" in the middle...
	// * CURRENT DECISION: sure, why not?
	add(type, data) {
		if (
			indexOfMult(this[`${type}s`], data, infinite.valueCompare)
				.length !== 0
		)
			return this[`${type}s`].length
		const returned =
			type === "segment"
				? this.segments.push(data)
				: this[`${type}s`].push(data)
		const minIndex = indexOfMult(this.x, min(this.x))[0]
		let maxIndex = indexOfMult(this.x, max(this.x))[0]
		if (minIndex === maxIndex) maxIndex++
		let minData = 0
		let maxData = 0
		if (type === "segment") {
			const copy = gutInnerArrs([...data])
			const maxs = []
			const mins = []
			for (let i = 0; i < copy.length; i++) {
				maxs.push(max(copy[i]))
				mins.push(min(copy[i]))
			}
			minData = min(mins)
			maxData = max(maxs)
		} else {
			minData = min(data)
			maxData = max(data)
		}
		this.x[minIndex] = min([minData, this.x[minIndex]])
		this.x[maxIndex] = max([maxData, this.x[maxIndex]])
		this.y[minIndex] = min([minData, this.y[minIndex]])
		this.y[maxIndex] = max([maxData, this.y[maxIndex]])
		return returned
	}
	// ? question: should the x and y automatically shrink with the deletion of border objects? Or no?
	// * Current decision: no, let it stay...
	delete(type, data) {
		return (this[`${type}s`] =
			indexOfMult(this[`${type}s`], data, infinite.valueCompare)
				.length === 0
				? this[`${type}s`]
				: clearRepetitions(
						this[`${type}s`],
						data,
						0,
						infinite.valueCompare
				  )).length
	}
	draw(width, height, title = `Surface ${this.n}`) {
		// TODO: this is to be written ; the decision to use the "ntk" was scratched; an alternative solution is currently sought;
	}
}

/**
 * This class represents a mathematical arithmetic expression.
 *
 * It can also come in helpful when evaluating the same expression various number of times.
 */
class Expression {
	/**
	 * Takes two arrays, one of which contains numbers, used in the expression and the other one contains strings, containing operators, using which expression shall be executed (only after calling one of functions, working with expressions: exp(), repeatedArithmetic(), fullExp(), repeatExp().)
	 * @param {string[]} objects An array, containing numbers of expression.
	 * @param {string[]} operators An array, containing operators of expression.
	 */
	constructor(objects = [], operators = [], table = defaultTable) {
		this.objects = objects
		this.operators = operators
		this.table = table
	}
	/**
	 * Just a wrapper for fullExp() function. Watch documentation for it.
	 */
	execute() {
		return fullExp(this)
	}
	// TODO: create a new kind of "repeat": repeat (just repeat) and repeatCompose (the current repeat), also make the repeatCompose take an array of arguments for an operator;
	// TODO: then, add the repeatComposeSame as the current repeat (special case of the repeatCompose)...
	/**
	 * Wrapper for repeatExp() function. Watch documentation for it.
	 * @param {number} times A number, representing how many times should current expression be repeated (By default 1).
	 * @param {string} operator A string, representing the operator, with which ariphmetic operation upon the expression result will be done a several times.
	 */
	repeat(operator, times = 1) {
		return repeatExp(this, operator, times)
	}
}

// TODO: look through this stuff; rename, refactor/shorten, generalize code where want to;
/**
 * This a class that contains various statistical tests.
 * It is a static class, i.e. it is supposed to be like this:
 * * Tests.testName();
 */
class Tests {
	constructor() {
		throw new TypeError("Tests is not a constructor")
	}
	/**
	 * Takes an array and a number and checks if the length of the given array equals the given number. If not, throws new Error. Otherwise returns void.
	 * @param {any[]} arr An array, size of which is to be checked for being equal to size parameter.
	 * @param {number} size A number, equality to which is checked.
	 * @throws Error, if the length of given array is not equal to the size parameter.
	 */
	static sizecheck(arr, size) {
		if (arr.length !== size)
			throw new Error(
				`Expected ${size} elements inside of the passed array, got ${arr.length}.`
			)
	}
	/**
	 * Takes a two-dimensional numeric array, containing two other arrays, and returns the number, representing the value of Student's t-test.
	 * @param {number[]} rows Numeric array, containing two arrays, for which value of Student's t-test is to be found.
	 */
	static t_Students_test(...rows) {
		Tests.sizecheck(rows, 2)
		const averages = [average(rows[0]), average(rows[1])]
		const errors = [
			Math.pow(standardError(rows[0]), 2),
			Math.pow(standardError(rows[1]), 2)
		]
		return floor(
			exp(
				[
					Math.abs(exp([averages[0], averages[1]], "-")),
					Math.sqrt(exp([errors[0], errors[1]], "+"))
				],
				"/"
			),
			globalPrecision
		)
	}
	// ? question: should one keep the runtime checks if the compile-time check is already there?
	// TODO: make a decision and change/keep correspondently;
	// * CURRENT DECISION: nah, let it stay; one likes it, that is cute;
	/**
	 * Takes a two-dimensional array, containing two arrays, and a number and returns the numeric value of f-test for the equality of dispersions of two sub-arrays.
	 * @param {number[]} rows Two one-dimensional arrays, the equality of dispersions of which shall be found.
	 */
	static F_test(...rows) {
		Tests.sizecheck(rows, 2)
		const dispersions = [
			dispersion(rows[0], true),
			dispersion(rows[1], true)
		]
		const biggerDispersionIndex = dispersions[0] > dispersions[1] ? 0 : 1
		const difference = exp(
			[
				dispersions[biggerDispersionIndex],
				dispersions[Number(!biggerDispersionIndex)]
			],
			"/"
		)
		return floor(difference, globalPrecision)
	}
	/**
	 * Takes a two-dimensional array of numbers and returns the number, representing the results of the Mann-Whitney U-test.
	 * !NOTE: For now be careful, when using, because the method does not work with the arrays, that have repeating numbers in them.
	 * @param {number[][]} rows Two one-dimensional arrays, using which the u-test is to be done.
	 */
	static U_test(...rows) {
		Tests.sizecheck(rows, 2)
		let firstSum = 0
		let secondSum = 0
		let tempNum = 0
		const general = []
		const ranks = []
		;`${rows[0]},${rows[1]}`
			.split(",")
			.forEach((str) => general.push(Number(str)))
		const final = sort(general)
		final.forEach((num, index) => {
			if (num != final[index - 1] && num != final[index + 1]) {
				ranks.push(index + 1)
				tempNum = 0
			} else {
				//! NOT WORKING! FIX!
				if (num === final[index + 1]) {
					ranks.push(index + 1.5) //! Reason is in this thing!
					tempNum = index + 1.5 //! And in this one also. Instead of putting 1.5 here I need to somehow rank the repeating numbers the correct way (but how ???).
				} else {
					ranks.push(tempNum)
				}
			}
		})
		final.forEach((num, index) => {
			if (rows[0].includes(num)) firstSum += ranks[index]
			if (rows[1].includes(num)) secondSum += ranks[index]
		})
		const firstResult =
			rows[0].length * rows[1].length +
			(rows[0].length * (rows[0].length + 1)) / 2 -
			firstSum
		const secondResult =
			rows[0].length * rows[1].length +
			(rows[1].length * (rows[1].length + 1)) / 2 -
			secondSum
		return min([firstResult, secondResult])
	}
	/**
	 * Takes a number and an array of numbers and returns the Z-score for the given number.
	 * @param {number} testedNum A number for which the Z-score is to be found.
	 * @param {number[]} numbers An array of numbers, required to calculate the Z-score for the given number.
	 */
	static Z_score(testedNum, numbers) {
		return exp(
			[testedNum - average(numbers), standardDeviation(numbers)],
			"/"
		)
	}
}

// TODO: Add the runtime type-safety to all the data-keeping types...
// ? Suggestion: Add the runtime type-safety to all the things within the library...
/**
 * This class represents a length-safe array with some nice stuff added to it.
 * It also may behave like a mathematical vector.
 */
class Vector {
	// TODO: make this thing into a separate type or something... It is very big and clumsy (though, useful...)
	constructor(vectorargs) {
		// TODO: let there be way for user to give their own defaults for this thing...
		ensureProperty(vectorargs, "vector", [])
		ensureProperty(vectorargs, "defaultelement", () => null)
		ensureProperty(vectorargs, "transform", null)
		ensureProperty(vectorargs, "vectortypes", [
			"number",
			"string",
			"boolean",
			"function",
			"object",
			"bigint",
			"any",
			"undefined",
			"symbol"
		])
		ensureProperty(vectorargs, "typefunction", (x) => typeof x)
		ensureProperty(vectorargs, "type", ["any"])
		// TODO: when having fixed all errors, give many things in the library a good renaming... Some of this stuff just don't sound right...
		ensureProperty(vectorargs, "typecheck", (item) => {
			if (
				!this.type.includes(typeof item) &&
				!this.type.includes("any")
			) {
				if (this.transform) return this.transform(item)
				throw new Error(
					`Type of item ${item} is not equal to vector type: [${this.type
						.map((a) => `"${a}"`)
						.join(",")}]. Item type: ${typeof item}`
				)
			}
		})
		this._vector = vectorargs.vector
		this._length = vectorargs.vector.length
		this.type = vectorargs.type
		this.default = vectorargs.defaultelement
		this.transform = vectorargs.transform
		this.vectortypes = vectorargs.vectortypes
		this.typefunction = vectorargs.typefunction
		this.typecheck = vectorargs.typecheck
		this.typefail = vectorargs.typefail
	}
	// TODO: there should be a "defaultReturn" function for the cases like these (what should be returned on the failing of the typecheck?);
	static typecheck(item, vector) {
		if (!vector.typecheck(item)) {
			if (!vector.transform) {
				vector.typefail()
				return
			}
			return vector.transform(item)
		}
		return item
	}
	delete(index) {
		const deleted = this._vector[index]
		if (index < this._length - 1)
			for (let i = index; i < this._length - 1; i++)
				this._vector[i] = this._vector[i + 1]
		this._length--
		this._vector.pop()
		return deleted
	}
	// TODO: make arbitrary indexes writeable...
	add(item) {
		if (!this.transform) Vector.typecheck(item, this)
		this._length++
		return (
			this.vector.push(this.transform ? this.transform(item) : item) - 1
		)
	}
	swap(index1, index2) {
		if (
			typeof index1 !== "number" ||
			typeof index2 !== "number" ||
			this._vector[index1] === undefined ||
			this._vector[index2] === undefined
		)
			throw new Error("Invalid indexes passed. ")
		const temp = this._vector[index1]
		this._vector[index1] = this._vector[index2]
		this._vector[index2] = temp
	}
	fill(item) {
		Vector.typecheck(item, this)
		this._vector.fill(item)
		return this
	}
	// TODO: here, implement a beautiful construction way for arbitrary Vectors;
	construct() {}
	set(index, value) {
		if (this._vector[index] === undefined)
			throw new Error("Invalid index passed into the set function.")
		this._vector[index] = value
	}
	index(i) {
		return this._vector[i]
	}
	slice(start, end = this.vector.length) {
		const sliced = this._vector.slice(start, end)
		return new Vector({
			vectortypes: this._type,
			typefunction: sliced.length,
			type: sliced
		})
	}
	indexof(element) {
		return this._vector.indexOf(element)
	}
	indexes(element) {
		const indexes = [this._vector.indexOf(element)]
		if (indexes[0] >= 0)
			for (let i = indexes[0] + 1; i < this._length; i++)
				if (this._vector[i] === element) indexes.push(i)
		return indexes
	}
	concat(vector) {
		return this.vector.concat(vector.vector)
	}
	map(f = (x) => x, type = this.type) {
		return new Vector({
			vectortypes: type,
			typefunction: this.vector.map(f)
		})
	}
	byElement(vector, operation) {
		const newVec = this.copy()
		for (let i = 0; i < Math.min(vector.length, this.length); i++)
			newVec.set(i, operation(this.vector[i], vector.vector[i]))
		return newVec
	}
	copy() {
		return new Vector({
			vectortypes: infinite.deepCopy(this.vectortypes),
			typefunction: this.typefunction,
			type: infinite.deepCopy(this.vector),
			vector: copy(this.type),
			defaultelement: this.default
		})
	}
	static type(array) {
		if (!array.length) return ["any"]
		// TODO: create a function called uniqueValues (or uniqueMap) for getting all the unique values of a certain function for an array of values into a new array in an order of following...
		const type = [typeof array[0]]
		for (const element of array)
			if (!type.includes(typeof element)) type.push(typeof element)
		return type
	}
	get length() {
		return this._length
	}
	get vector() {
		return this._vector
	}
	get type() {
		return this._type
	}
	set type(newType) {
		// TODO: create an isSubset array function; would check if one array is having all the elements of the other using some chosen 'comparison'; then, define isSuperset as its arguments' permutation...
		// TODO: the 'includes' don't work; change for something that is actually working generally (namely, add a 'comparison' type, use the library's new api stuff then...)...
		// * Again, if the current design decision is to be implemented, types will be capable of being changed more or less freely (more or less, because if the typecheck is not appropriate, error would ocurr...)
		// for (let i = 0; i < newType.length; i++)
		// 	if (!this.vectortypes.includes(newType[i]))
		// 		throw new Error(`Unknown vector type: ${newType}`)
		// TODO: fix... Give the entire code a very good look-through once have fixed the TypeErrors...
		// * Apply the generics where want to...
		this._type = newType
		this._vector = this.vector.map((a) => Vector.typecheck(a, this))
	}
	set length(newLength) {
		if (newLength < 0)
			throw new Error(`Passed negative length: ${newLength}`)
		if (newLength < this._length)
			for (let i = this._length; i > newLength; i--) this._vector.pop()
		if (newLength > this._length)
			for (let i = this._length; i < newLength; i++)
				this._vector[i] = this.default(this.type)
		this._length = newLength
	}
	set vector(newVector) {
		const type = Vector.type(newVector)
		this._vector = newVector
		this.length = newVector.length
		if (!infinite.valueCompare(type, this.type)) this._type = type
	}
}

// TODO: rewrite; finish...
// * Current idea for a list of features:
// * 1. All number-related methods and features;
// * 2. Based on number-version of the Vector
class NumberVector extends Vector {
	vectorScalarMultiply(vector) {
		const main =
			Math.max(this.length, vector.length) == vector.length
				? vector
				: this
		const other = main.vector == vector.vector ? this : vector
		return repeatedArithmetic(
			other.vector.map((el, i) => el * main.vector[i]),
			"+"
		)
	}
	crossProduct(vector) {
		if (this.length != 3 && this.length != 7)
			throw new Error(
				"Cross product is not defined for vectors, which lengths aren't 3 or 7. "
			)
		if (this.length != vector.length)
			throw new Error(
				"Trying to cross product vectors with different lengths. "
			)
		if (vector.length === 3)
			return new Vector({
				vectortypes: ["number"],
				typefunction: 3,
				type: [
					this.vector[1] * vector.vector[2] -
						vector.vector[1] * this.vector[2],
					vector.vector[0] * this.vector[2] -
						this.vector[0] * vector.vector[2],
					this.vector[0] * vector.vector[1] -
						this.vector[1] * vector.vector[0]
				]
			})
		// TODO: Use the RectMatrix product formula on wikipedia page.
	}
	scalarMultiply(scalar) {
		for (let i = 0; i < this._vector.length; i++) this._vector[i] *= scalar
	}
	scalarAdd(scalar) {
		for (let i = 0; i < this._vector.length; i++) this._vector[i] += scalar
	}
	// TODO: add vector addition...
}
// * Current idea for the list of features:
// * 1. Arbitrarily shaped;
// * 2. Full of numbers;
// * 3. Can have user-defined operations for doing certain things with numbers;
// TODO: finish work on the number-related matricies... Fix the errors... Adapt the old code...
class NumberMatrix extends Vector {}

// * Current idea for the list of features:
// * 1. Only numbers ;
// * 2. Number-related methods present (they are classically defined by default, can be re-defined by the user...);
// * 3. Rectangular-shaped;
class RectNumberMatrix extends NumberMatrix {
	matrixMultiply(matrix) {
		if (this.sidelen[0] !== matrix.sidelen[1])
			throw new Error(
				`Trying to multiply rectangular matrices with different values for width and height ${this.sidelen[0]} and ${matrix.sidelen[1]} correspondently. They must be equal.`
			)
		const copy = this.toArray()
		const matrixCopy = matrix.toArray()
		const result = copy.map(() => matrixCopy[0].map(() => 0))
		for (let i = 0; i < this.sidelen[1]; i++)
			for (let j = 0; j < matrix.sidelen[0]; j++)
				for (let k = 0; k < this.sidelen[0]; k++)
					result[i][j] += copy[i][k] * matrix[k][j]
		return new RectMatrix([matrix.sidelen[0], this.sidelen[1]], result)
	}
	// ! does one not want this to become a more generalized thing, like matrixOperator for example (one could attach this to op, then)?
	addMatrix(matrix) {
		// ! This should be thrown out, for user to implement...
		// * The library should have 2 different "kinds" matricies -- generalized generic ones and those for Numbers (based on the first ones);
		// * As an example: NumberRectMatrix and RectMatrix; NumberRectMatrix extends RectMatrix;
		if (!arrayEquality(matrix.sidelen, this.sidelen))
			throw new Error("Trying to add matrices with different lengths. ")
		// ! This here should be replaced with copying the thing (Question: should this be achieved via the constructor or via the deepCopy?)
		// ? funny, this oughtn't have worked before... Is it another one of those bugs that didn't get fixed in math-expressions.js 0.8?
		// * Current decision: use a deepCopy; That is because the constructor also checks for validity of a thing and one don't really care for that all that much...
		// * Current decision: do not copy (ignore the previous one :D); This thing (general version) should simply run the 'op' with corresponding operator definitions table, operator and also Matricies;
		// ! Considering the current development of things... Is it not best one gets rid of the old 'op' thing for good? As in... It all just comes down to getting a thing from a table
		// * No, let it stay; one will do the next: try to change the operators tables definitions to (TODO: refactor this with other libraries later) {[a: string | symbol | number]: <anything extends any[], type = any>(x: anything) => type}
		const thisCopy = new RectMatrix(this.sidelen, this.dimentions)
		for (let i = 0; i < matrix.sidelen[0]; i++)
			thisCopy.matrix[i].addVector(matrix.matrix[i])
		return thisCopy
	}
	scalarAdd(scalar) {
		for (let i = 0; i < this.sidelen[0]; i++)
			this.matrix.index(i).scalarAdd(scalar)
	}
	scalarMultiply(scalar) {
		for (let i = 0; i < this.sidelen[0]; i++)
			this.matrix.index(i).scalarMultiply(scalar)
	}
}

// * Current idea for the list of features:
// * 1. Only numbers ;
// * 2. Number-related methods present (they are classically defined by default, can be re-defined by the user...);
// * 3. Square-shaped;
class SquareNumberMatrix extends RectNumberMatrix {
	/**
	 * Finds the determinant of a square matrix it's invoked onto.
	 */
	determinant() {
		function findAdditional(matrix, i, j) {
			const final = matrix.matrix.slice(1).vector.map(() => [])
			for (let index = 0; index < matrix.sidelen; index++)
				for (let jndex = 0; jndex < matrix.sidelen; jndex++)
					if (index !== i && jndex !== j)
						final[index > i ? index - 1 : index].push(
							matrix.toArray()[index][jndex]
						)
			return new SquareMatrix(final.length, final).determinant()
		}
		if (this.sidelen[0] < 2) {
			if (this.sidelen[0] === 1) return this.navigate([0, 0])
			return 0
		}
		if (this.sidelen[0] > 2) {
			if (this.sidelen[0] === 1) return this.matrix.index(0).index(0)
			const matricesDeterminants = {}
			let n = 0
			let finale = 0
			for (let j = 0; j < this.sidelen[0]; j++)
				matricesDeterminants[this.navigate([0, j])] = findAdditional(
					this,
					0,
					j
				)
			for (const pair in matricesDeterminants) {
				finale += matricesDeterminants[pair] * Number(pair) * (-1) ** n
				n++
			}
			return finale
		}
		return (
			this.navigate([0, 0]) * this.navigate([1, 1]) -
			this.navigate([1, 0]) * this.navigate([0, 1])
		)
	}
}

// TODO (reminder): create the "True"(Infinite) Number types for the 'newapi'; Let they be based on InfiniteCounters and also there be: (True/Infinite)Natural (which turns into Integer), (True/Infinite)Integer (which flows into Ratio), (True/Infinite)Ratio, and InfiniteSum;
// TODO (reminder): create all sorts of implementations of mathematical functions like log, exponent, roots and others that would employ these; (Equally, create stuff for arbitrary logical systems and also finite PowerSeries Ratio/Integer/Natural representations)
/**
 * This class represents a mathematical ratio of two rational numbers (as a special case - integers).
 */
class Ratio {
	constructor(numerator, denomenator) {
		this.numerator = numerator
		this.denomenator = denomenator
	}
	evaluate() {
		return this.numerator / this.denomenator
	}
	add(ratio) {
		return Ratio.simplify(
			new Ratio(
				this.numerator * ratio.denomenator +
					ratio.numerator * this.denomenator,
				this.denomenator * ratio.denomenator
			)
		)
	}
	static simplify(ratio) {
		const len = Math.max(
			allFactors(ratio.numerator).length,
			allFactors(ratio.denomenator).length
		)
		let currDivisor
		for (let i = 0; i < len; i++) {
			currDivisor = leastCommonDivisor(ratio.numerator, ratio.denomenator)
			if (!currDivisor) break
			ratio.numerator /= currDivisor
			ratio.denomenator /= currDivisor
		}
		return ratio
	}
	array() {
		return [this.numerator, this.denomenator]
	}
	divide(ratio) {
		return this.multiply(ratio.multinverse())
	}
	multinverse() {
		return new Ratio(this.denomenator, this.numerator)
	}
	addinverse() {
		return new Ratio(-this.numerator, this.denomenator)
	}
	multiply(ratio) {
		return Ratio.simplify(
			new Ratio(
				this.numerator * ratio.numerator,
				this.denomenator * ratio.denomenator
			)
		)
	}
	subtract(ratio) {
		return this.add(ratio.addinverse())
	}
	power(exponent) {
		return new Ratio(
			this.numerator ** exponent,
			this.denomenator ** exponent
		)
	}
	root(exponent) {
		return this.power(1 / exponent)
	}
}

/**
 * This class has a bunch of useful algorithms.
 * This is one of the static classes, it contains only methods,
 * i.e. it's supposed to be used like this:
 * * Algorithms.algorithmName(arg_1, ..., arg_n);
 */
class Algorithms {
	constructor() {
		throw new TypeError("Algorithms is not a constructor")
	}
	static BinarySearch(array, number) {
		// * For getting the middle index of the array.
		const middle = (arr) => floor(median(arr.map((_a, i) => i)), 0)
		const copyArray = sort(array)
		let index = middle(copyArray)
		let copyArr = copy(copyArray)
		let copyIndex = index
		for (let i = 0; ; i++) {
			if (number === copyArray[index]) return index
			if (copyArr.length === 1) break
			const isBigger = number > copyArray[index]
			copyArr = isBigger
				? copyArr.slice(copyIndex + 1, copyArr.length)
				: copyArr.slice(0, copyIndex)
			copyIndex = middle(copyArr)
			index = isBigger ? index + copyIndex : index - copyIndex
		}
		return -1
	}
	/**
	 * Runs the Farey Algorithm with given ratios and number of iterations. Returns the resulting array of ratios.
	 * @param {Ratio} startRatio Ratio, from which the Farey Algorithm should start.
	 * @param {Ratio} endRatio Ratio, that is used as an upper bound in the algorithm.
	 * @param {number} iterations Number of iterations (integer).
	 */
	static Farey(startRatio, endRatio, iterations = 0) {
		// ? add as an operation to the Ratio class?
		function formNewRatio(first, second) {
			return new Ratio(
				first.numerator + second.numerator,
				first.denomenator + second.denomenator
			)
		}
		const gotten = [[startRatio, endRatio]]
		for (let i = 0; i < iterations; i++) {
			gotten.push([])
			for (let j = 0; j < gotten[i].length; j++) {
				gotten[i + 1].push(gotten[i][j])
				if (j !== gotten[i].length - 1)
					gotten[i + 1].push(
						formNewRatio(gotten[i][j], gotten[i][j + 1])
					)
			}
		}
		return gotten
	}
}
// ! Rename this thing; it's pretty general (so not Polynomial, for instance), but it's not JUST an equation; it's one involving numbers
// * CURRENT IDEA FOR A NAME: NumberEquation...
/**
 * This class's purpose is to represent a mathematical equation of multiple variables.
 * * Temporary note: for now it can be used only with simplest arithmetical operators (+, -, ^(exponentiation), /, *).
 */
class Equation {
	/**
	 * A static method for parsing an equation with various mappings applied.
	 * @param {string} equationLine A line, containing an equation.
	 * @param {VarMapping} mappings A mapping of variables to their values.
	 * @param {string[]} variables Additional variable names.
	 */
	static ParseEquation(equationLine, origmappings, variables) {
		const operators = ["+", "*", "/", "-", "^"]
		const brackets = ["[", "]", "(", ")", "{", "}"]
		const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."]
		let metEquality = false
		const mappings = { ...origmappings.varmap } // for simplicity of use
		function eliminateSpaces() {
			return equationLine.split(" ").join("")
		}
		function parse(line) {
			const result = { right: "", left: "" }
			for (let i = 0; i < line.length; i++) {
				switch (line[i]) {
					case "=":
						if (metEquality)
							throw new Error(
								"Met equality sign in the parsed string already!"
							)
						metEquality = true
						break
					default:
						if (line[i] === "^") {
							line = Equation.replaceIndex(line, i, "**")
							continue
						}
						if (mappings.variables.includes(line[i])) {
							line = Equation.replaceIndex(
								line,
								i,
								mappings.mappings[
									mappings.variables.indexOf(line[i])
								]
							)
							continue
						}
						if (brackets.includes(line[i])) {
							line = Equation.replaceIndex(
								line,
								i,
								brackets.indexOf(line[i]) % 2 === 0 ? "(" : ")"
							)
							continue
						}
						if (
							operators.includes(line[i]) ||
							digits.includes(line[i]) ||
							variables.includes(line[i])
						)
							continue
						throw new Error(`Unknown symbol detected: ${line[i]}`)
				}
			}
			for (let i = 0; i < line.length; i++) {
				if (line[i] === "=") {
					result.right = line.slice(0, i)
					result.left = line.slice(i + 1)
					break
				}
			}
			return result
		}
		return parse(eliminateSpaces())
	}
	/**
	 * This static method replaces a given index in a given string by a given value and returns the result.
	 * Note: Original string is NOT mutated.
	 *
	 * @param {string} string String, index in which is to be changed.
	 * @param {number} index Index.
	 * @param {number | string | boolean} val Value to be inserted on a place of index "index", thereby replacing it.
	 */
	static replaceIndex(string, index, val) {
		return string.substring(0, index) + val + string.substring(index + 1)
	}
	/**
	 * Parses an equation, that it's invoked onto.
	 * @param {VarMapping} mappings Various mappings for variables.
	 */
	parse(mappings) {
		return Equation.ParseEquation(this.equation, mappings, this.variables)
	}
	constructor(equationText = "", vars = ["x"], defaultMappings = []) {
		this.variables = []
		this.equation = ""
		this.defaultParsed = null
		this.defaultMappings = null
		this.variables = vars
		this.equation = equationText
		this.defaultMappings = defaultMappings
		this.defaultParsed = []
		for (let i = 0; i < defaultMappings.length; i++)
			this.defaultParsed.push(this.parse(defaultMappings[i]))
	}
	// TODO: Currently, plugging works correctly only with variables of length 1. Fix it.
	static plug(origparsed, varname, varvalue) {
		const parsed = { ...origparsed } // Making a copy.
		for (let i = 0; i < parsed.right.length; i++)
			if (parsed.right[i] === varname)
				parsed.right = Equation.replaceIndex(parsed.right, i, varvalue)
		for (let i = 0; i < parsed.left.length; i++)
			if (parsed.left[i] === varname)
				parsed.left = Equation.replaceIndex(parsed.left, i, varvalue)
		return parsed
	}
	/**
	 * Difference in between the right and left sides of the equation with mappings for different variables.
	 * @param {VarMapping} mappings Mapping of variables to their values.
	 * @param {string} varname Additional mapping, can be used with a variable, that is being searched for in an algorithm.
	 * @param {number} varvalue Addtional value.
	 */
	differRightLeft(mappings, varname, varvalue) {
		if (typeof varname !== "string")
			throw new Error(
				`Expected string as an input of variable name, got ${typeof varname}}`
			)
		const plugged = Equation.plug(this.parse(mappings), varname, varvalue)
		return eval(plugged.right) - eval(plugged.left)
	}
	/**
	 * This method searches for the solution of an equation it's invoked onto.
	 *
	 * ! WARNING 1 !
	 *
	 * This method performs only numerical search, i.e. it doesn't search for the precise solution.
	 * Just an approximation. (Namely, the one number of all given that is the closest to the solution.)
	 * (However, if the root is rational, then it could even be exactly it.)
	 *
	 * ! WARNING 2 !
	 *
	 * DO NOT set the precision to be more than 5 or 6, because otherwise the JavaScript stack won't handle it (unless, you extended it).
	 *
	 * PARAMETRES
	 *
	 * @param {VarMapping} mappings Mapping for all the variables in the equation except one for which search is invoked.
	 * @param {string} varname Name of the variable for which search is invoked.
	 * @param {number} startvalue Value, from which search is invoked.
	 * @param {number} pathlength The length of the search path.
	 * @param {number} precision The depth of the search, i.e. how accurate the final result shall be.
	 */
	searchSolution(mappings, varname, startvalue, pathlength, precision = 4) {
		const differences = generate(
			startvalue,
			startvalue + pathlength,
			floor(10 ** -precision, precision),
			precision
		).map((i) => {
			return Math.abs(this.differRightLeft(mappings, varname, i))
		})
		return (
			startvalue +
			differences.indexOf(min(differences)) *
				floor(10 ** -precision, precision)
		)
	}
	defaultDifferRightLeft(index, varname, varvalue) {
		if (typeof varname !== "string")
			throw new Error(
				`Expected string as an input of variable name, got ${typeof varname}}`
			)
		const plugged = Equation.plug(
			this.defaultParsed[index],
			varname,
			varvalue
		)
		return eval(plugged.right) - eval(plugged.left)
	}
	/**
	 * This method searches for the solution of an equation it's invoked onto using default mappings.
	 * It's technically supposed to be much faster because of the data preparation.
	 *
	 * ! WARNING 1 !
	 *
	 * This method performs only numerical search, i.e. it doesn't search for the precise solution.
	 * Just an approximation. (Namely, the one number of all given that is the closest to the solution.)
	 * (However, if the root is rational, then it could even be exactly it.)
	 *
	 * ! WARNING 2 !
	 *
	 * DO NOT set the precision to be more than 5 or 6, because otherwise the JavaScript stack won't handle it (unless, you extended it).
	 *
	 * PARAMETRES
	 * @param {number} index Index of the default mapping to be used.
	 * @param {string} varname Name of the variable for which search is invoked.
	 * @param {number} startvalue Value, from which search is invoked.
	 * @param {number} pathlength The length of the search path.
	 * @param {number} precision The depth of the search, i.e. how accurate the final result shall be.
	 */
	defaultSearchSolution(index, varname, startvalue, pathlength, precision) {
		const differences = generate(
			startvalue,
			startvalue + pathlength,
			floor(10 ** -precision, precision),
			precision
		).map((i) => {
			return Math.abs(this.defaultDifferRightLeft(index, varname, i))
		})
		return (
			startvalue +
			differences.indexOf(min(differences)) *
				floor(10 ** -precision, precision)
		)
	}
}
/**
 * This class represents a mapping of variables to numeric values.
 * It can be used separately or in combination with the Equation class.
 * (It's original purpose was the second)
 */
class VarMapping {
	/**
	 * Constructs a new mapping based on the data inputted.
	 * @param {string[]} vars Variable names in a mapping.
	 * @param {number[]} maps Numerical values for them.
	 */
	constructor(vars = [], maps = []) {
		this.varmap = { variables: [], mappings: [] }
		function hasLetters(thing) {
			return thing.toLowerCase() !== thing.toUpperCase()
		}
		// ? what is this? deal with this thing later... Seems to have been inteded to be different from that...
		if (!(vars instanceof String) && !(maps instanceof Array))
			if (vars.length !== maps.length)
				throw new Error(
					"Arrays of different lengths passed to VarMapping constructor. "
				)
		for (let i = 0; i < vars.length; i++) {
			if (!hasLetters(vars[i]))
				throw new Error(
					`Varname without letters is being passed: ${vars[i]}`
				)
			for (let j = i + 1; j < vars.length; j++)
				if (vars[j] === vars[i])
					throw new Error(
						"Given repeating variable maps in the VarMapping constructor. "
					)
		}
		this.varmap.variables = vars
		this.varmap.mappings = maps
	}
	/**
	 * Adds a new pair of name-number to the mapping.
	 * Useful when using some sort of numerical function in a big cycle.
	 * @param {string} name Name of the new (or old) property.
	 * @param {number} value Numerical value to be set to the name.
	 */
	add(name, value) {
		if (typeof value !== "number")
			throw new Error("Given non-numeric data as a value for mapping. ")
		this.varmap.variables.push(name)
		this.varmap.mappings.push(value)
	}
	/**
	 * Deletes a property from varmap by the given name.
	 * @param {string} name Name to be used for deletion.
	 */
	delete(name) {
		for (
			let i = this.varmap.variables.indexOf(name);
			i < this.varmap.variables.length;
			i++
		) {
			this.varmap.variables[i] = this.varmap.variables[i + 1]
			this.varmap.mappings[i] = this.varmap.mappings[i + 1]
		}
		this.varmap.mappings.pop()
		this.varmap.variables.pop()
	}
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
		return this.elements.has(x)
	}
	get size() {
		return this.elements.size
	}
	delete(x) {
		return this.elements.delete(x)
	}
	constructor(elems = new Set([])) {
		this.currindex = 0
		this.elements = elems
	}
}

// Functions

// ? Question: how does one want to be ordering all this stuff within a file???
function ensureProperty(object, property, value) {
	if (!object.hasOwnProperty(property)) object[property] = value
}

// ? Should one also add one that is related to shape-things? (Consider)
function Matrix(
	vector,
	typechecker,
	defaultMatrix = [() => null, () => null],
	defaultTransform = [null, null]
) {
	return nestedVector(
		vector,
		typechecker,
		defaultMatrix,
		defaultTransform,
		2,
		0
	)
}

// This thing is flexible; it adapts the output to input -- the result is a vector of corresponding depth (the input's inside arrays that are not the given type are all turned into vectors; all else is left untouched...)
// Depth of the final vector is equal to the depth of the original array...
function nestedVector(
	vector,
	typechecker,
	defaultElems = vector.map(() => () => null),
	transform = vector.map(() => null),
	dimensions = Infinity,
	currDim = 0
) {
	return new Vector({
		vectortypes: ["any"],
		vector: vector.map((el) =>
			el instanceof Array && !typechecker(el) && currDim < dimensions
				? nestedVector(
						el,
						typechecker,
						defaultElems.slice(1),
						transform.slice(1),
						dimensions,
						currDim + 1
				  )
				: el
		),
		type: defaultElems[0],
		transform: transform[0]
	})
}

// TODO: restore the old order of following within the library -- aliases, constants, classes, functions, one big export; Currently, it's a mess...
// * Counts all non-array elements within a multidimensional array passed...
function nonArrElems(array) {
	return array instanceof Array
		? repeatedArithmetic(array.map(nonArrElems), "+")
		: 1
}

// Counts all the elements within a multi-dimensional array (including the arrays themselves...)
function totalElems(array) {
	return array instanceof Array
		? array.length + repeatedArithmetic(array.map(totalElems), "+")
		: 0
}

// TODO: this thing it to be rewritten (both the JSDoc and the function...)
/**
 * Executes an arithmetic expression with two numbers
 *
 * * Note: with it you can even build a very simple calculator.
 * * Plus, it's more secure an allows only aritmetic (for now, at least).
 *
 * @param {number} firstObj  First number.
 * @param {number} secondObj Second number.
 * @param {string} operator  String, containing an ariphmetic operator(+, -, /, *, ** or %).
 * @returns {number} Result of a mathematical expression.
 */
function op(objects, operator, operatorTable = defaultTable) {
	// TODO: in a different library of mr. body, there's a _switch function that works on a passed object like a generalized switch; use this here, when code-reworking for 1.1;
	const values = Object.values(operatorTable)
	const keys = Object.keys(operatorTable)
	for (let i = 0; i < values.length; i++)
		if (operator === keys[i]) return values[i](...objects)
	throw new Error(`Undefined operator ${operator}!`)
}

// ? make the Expressions' api more complex? Add orders of following, arities, that sort of thing?
// TODO: rewrite this later, as a repeated application of the same function on itself...
// * Example of how one's future Code might look like (currrently, won't work; no dependency):
// const repeatedOperation = (objects: string[], operator: string) =>
// {
// let i = 1
// let result = objects[0]
// const repeated = () => {result = exp(result, objects[i++], operator)}
// return repeatedApplication(repeated, objects.length)
// }
/**
 * Executes mathematical expression with the same operator repeating, but different numbers.
 * @param {number[]} objects An array of numbers(or strings) using which expression will be executed.
 * @param {string} operator - A string, containing an operator, with which expression will be executed.
 */
function repeatedOperation(objects = [], operator, table = defaultTable) {
	return new Expression(
		objects,
		objects.map(() => operator),
		table
	).execute()
}

// TODO: same as the function above -- use the repeatedApplication...
// * code-rework
// TODO: problem -- this thing does not take the number of operands into account (always uses the expression.operators[i] as binary); This should change...
// * Rework this thing capitally...
/**
 * Executes mathematical expression with different operators and numbers.
 *
 * ! NOTE: passed operators[] array must be shorter than the passed numbers[] array for one element or the same length
 * ! (but in this case the last element of the operators[] array will be ignored).
 *
 * @param {Expression} expression An object, containing two array properties, one of which is for numbers(or strings) using which expression will be executed and the second is for strings, each of which contains an ariphmetic operator, using which expression shall be executed.
 */
function fullExp(expression) {
	// TODO: decide which one value to use as a "default" for library's "unknown value" -- null or undefined;
	// * Let this agree with the way other of self's libraries agree with this -- achieve the synonymity of style...
	if (expression.objects.length === 0) return null
	let result = expression.objects[0]
	for (let i = 0; i < expression.objects.length - 1; i++)
		result = exp(
			[result, expression.objects[i + 1]],
			expression.operators[i]
		)
	return result
}

// TODO: same difficulty as above. WORKS ONLY WITH BINARY OPERATORS...
/**
 * Repeats an expression a bunch of times and returns you the result of making an ariphmetic actions between them.
 *
 * ! NOTE: keys of the key-value pairs of the passed object must have the next names: nums, operators.
 * ! Wrong names of keys will cause an Error.
 *
 * @param {Expression} expression An object, that contains two key-value pairs, where each value is an array. First array contains nums, second - operators.
 * @param {number} timesRepeat   A number of repeats of ariphmetic operation.
 * @param {string} repeatOperator   A string, containing an operator, with which ariphmetic operation upon the expression result will be done a several times.
 */
function repeatExp(expression, repeatOperator, timesRepeat = 1) {
	let tempRes = null
	let result = (tempRes = fullExp(expression))
	for (let i = 0; i < timesRepeat - 1; i++)
		result = exp([result, tempRes], repeatOperator)
	return result
}

/**
 * Takes the number array and rerturns an average of it.
 * @param {number[]} nums An array of numbers passed to the function.
 * @param {boolean} isTruncated A boolean saying does or does not the average will be truncated. By default false.
 * @param {number} percents A number, that is used as a multiplier for two, when shortening the numeric array.
 */
function average(nums = [], isTruncated = false, percents = 10) {
	return (function (newArr) {
		return floor(
			repeatedArithmetic(newArr, "+") /
				(nums.length + ((nums.length === newArr.length) - 1)),
			globalPrecision
		)
	})(isTruncated && percents > 0 ? truncate(nums, percents) : nums)
}

/**
 * Takes an array of numbers and returns the smallest of thems.
 * @param {number[]} nums An array of numbers passed to the function.
 * @returns {number} The smallest number of the passed array.
 */
function min(nums = []) {
	return arrApply(Math.min, nums)
}

/**
 * Takes an array of numbers and returns the largest of them.
 * @param {number[]} nums An array of numbers passed to the function.
 * @returns {number} The largest number in passed numerical array.
 */
function max(nums = []) {
	return arrApply(Math.max, nums)
}

/**
 * Takes an array of numbers, which length can be odd or even and returns the median of it.
 * @param {number[]} nums An array of numbers, passed to the function.
 */
function median(nums = []) {
	return (function (sorted) {
		return (
			nums.length % 2 === 1
				? id
				: (firstIndex) => average([firstIndex, sorted[nums.length / 2]])
		)(sorted[Math.round(nums.length / 2) - 1])
	})(sort(nums))
}

// TODO: create a type definition for this '(a: any, b: any) => boolean' thing; Replace it everywhere in the codebase...
// * The same way, pray name all the redundant (appearing more than once) types;
/**
 * Takes an array and returns most "popular" number in it.
 * @param {number[]} elems An array of numbers passed to the function.
 * @param {any} noneValue A value, returned if the array doesn't have a most popular number. String "None" by default.
 */
function mostPopular(
	elems = [],
	noneValue = null,
	comparison = (a, b) => a === b
) {
	if (elems.length === 0) return noneValue
	const freq = new UniversalMap(
		elems,
		elems.map((el) => countAppearences(elems, el, 0, comparison))
	)
	return indexOfMult(freq.values, max(freq.values), comparison).map(
		(a) => freq.keys[a]
	)
}

function leastPopular(
	elems = [],
	noneValue = null,
	comparison = (a, b) => a === b
) {
	if (elems.length === 0) return noneValue
	const freq = new UniversalMap(
		elems,
		elems.map((el) => countAppearences(elems, el, 0, comparison))
	)
	return indexOfMult(freq.values, min(freq.values), comparison).map(
		(a) => freq.keys[a]
	)
}

// TODO: make the range of truncation an argument too... Generalize...
/**
 * @param {number[]} nums An array of numbers passed to the function.
 * @param {boolean} isInterquartile A boolean, representing shall the range to be gotten be interquartille or not. By deafault false.
 * @returns the range of the numeric array (if passed [-5, 10] returns 15).
 */
function range(nums = [], isInterquartile = false) {
	const newArr = isInterquartile ? truncate(nums, 25) : copy(nums)
	return floor(max(newArr) - min(newArr))
}

// * Make this thing into an object: let this be put under "bubble" (for bubble sort, if that's what this thing is...);
/**
 * Takes an array of numbers and returns sorted version of it.
 * @param {number[]} nums An array of numbers, passed to the function to sort.
 * @param {boolean} forward A boolean, on which value depends will the function sort an array from least to the largest or from largest to the least. By default true.
 */
function sort(nums = [], forward = true) {
	const listArr = copy(nums)
	const sorted = []
	if (forward) {
		for (let i = 0; i < nums.length; i++) {
			const least = min(listArr)
			listArr.splice(listArr.indexOf(least), 1)
			sorted.push(least)
		}
	} else {
		for (let i = 0; i < nums.length; i++) {
			const largest = max(listArr)
			listArr.splice(listArr.indexOf(largest), 1)
			sorted.push(largest)
		}
	}
	return sorted
}

/**
 * Takes three numbers: the start position, the end position and the step, generates a numeric array using them and returns it.
 * @param {number} start Start number in array(it's supposed to be the least number in it)
 * @param {number} end End number in array(the creation of the array is going until end value + 1 number is reached).
 * @param {number} step Value, by which the count is incremented every iteration.
 * @param {number} precision Precision of a step, by default set to 1. (If your array is of integers, it's not necessary.)
 */
function generate(start, end, step = 1, precision = 1) {
	const generated = []
	const upper = realAddition(
		end,
		(-1) ** step < 0 * (Number.isInteger(step) ? 1 : 10 ** -precision)
	)[0]
	const proposition = step > 0 ? (i) => i < upper : (i) => i > upper
	for (let i = start; proposition(i); i += step)
		generated.push(floor(i, precision))
	return generated
}

// TODO: this should also separate onto findValue and findReference;
// * Better just add a "comparison" bit, and default it to (a, b) => a === b like everywhere else with such situations...
// TODO: this don't do what one did expect it to do... It should do the next take an array and an arbitrary thing and seek if it is in the array; If it is, return indexes where it is;
// TODO: create a findMany function which would return a UniversalMap that would tell how many times and what had been found...
/**
 * Takes an array(or a string) and a number(or a one-dimensional array of numbers or a substring), that must be found in this array. If the value is found returns true and a count of times this number was found, otherwise false.
 * @param {number[] | number[][] | string} searchArr Array in which queried value is being searched.
 * @param {number | number[] | string} searchVal Searched value.
 * @returns {[boolean, number, number[]]} An array, containig boolean(was the needed number, numeric array or string found in searchArr or not), a number(frequency) and an array of numbers(indexes, where the needed number or string characters were found), but the last one is only when the searchVal is not an array and searchArr is not a two-dimensional array.
 */
function find(searchArr, searchVal) {
	let result = false
	let foundTimes = 0
	const foundIndexes = []
	if (searchVal instanceof Array && searchArr instanceof Array)
		searchVal.forEach((value) =>
			searchArr.forEach((arr, index) =>
				arr.forEach((obj) => {
					if (value === obj) {
						result = true
						foundTimes++
						if (!foundIndexes.includes(index))
							foundIndexes.push(index)
					}
				})
			)
		)
	else
		for (let i = 0; i < searchArr.length; i++)
			searchArr[i] === searchVal
				? ((result = true), foundTimes++, foundIndexes.push(i))
				: null
	return [result, foundTimes, foundIndexes]
}

/**
 * Takes a number and returns a string, containing it's readable variant. (Like 12345 and 12 345)
 * @param {number} num A number, from which to make a better-looking version of it.
 */
function readable(num) {
	const arr = num.toString().split("")
	let changeStr = ""
	while (arr.length % 3 > 0) {
		changeStr += arr[0]
		if ((arr.length - 1) % 3 === 0) changeStr += " "
		arr.shift()
	}
	arr.forEach((number, index) => {
		index % 3 === 0 && index > 0
			? (changeStr += ` ${number}`)
			: (changeStr += `${number}`)
	})
	return changeStr
}

/**
 * Factors out a passed number to the prime numbers. Works quite quickly.
 * @param {number} num Number, to be factored out.
 * @returns {number[]} Prime factors array.
 */
function factorOut(number) {
	const factors = []
	for (
		let currDevisor = 2;
		number !== 1;
		currDevisor += currDevisor === 2 ? 1 : 2
	) {
		while (number % currDevisor === 0) {
			factors.push(currDevisor)
			number /= currDevisor
		}
	}
	return factors
}

/**
 * Takes a numeric array and a number and truncates the passed array, using the second paramater as a count of percents of numbers, that shall be deleted.
 * @param {number[]} nums An array to be truncated.
 * @param {number} percents A number, that is multiplied by two(if you passed 10, then it is 20) and represents count of percents of numbers to be deleted from the edges of the passed array.
 */
function truncate(nums, percents = 10) {
	const shortened = sort(copy(nums))
	const len = shortened.length
	const toDelete = Number(Math.trunc((len / 100) * percents))
	for (let i = 0; i < toDelete; i++) {
		shortened.shift()
		shortened.pop()
	}
	return shortened
}

// TODO: let all the non-alias-exports be handled by the export {...} piece of code, instead of it being done on-the-spot, like here...
function multiples(n, range) {
	return generate(1, range).map((a) => a * n)
}

// TODO: generalize to leastCommon when working on the general 'orders' api for 'newapi';
// TODO: generalize all the number-theoretic functions implementations that take a particular number of arguments to them taking an arbitrary amount (kind of like here and in the newapi.util.arrIntersections)
/**
 * Takes three numbers, thwo of which are numbers for which least common multiple shall be found and the third one is a search range for them.
 * @param {number} firstNum First number.
 * @param {number} secondNum Second number.
 */
function leastCommonMultiple(...nums) {
	if (nums.length === 0) return undefined
	if (nums.length === 1) return nums[0]
	if (nums.length === 2)
		return min(
			arrIntersections([
				multiples(nums[0], nums[1]),
				multiples(nums[1], nums[0])
			])
		)
	return leastCommonMultiple(nums[0], leastCommonMultiple(...nums.slice(1)))
}

function commonMultiples(range, ...nums) {
	if (nums.length === 0) return undefined
	if (nums.length === 1) return nums[0]
	if (nums.length === 2) {
		const found = arrIntersections([
			multiples(nums[0], range[range.length - 1]),
			multiples(nums[1], nums[range[range.length - 2]])
		])
		range.pop()
		range.pop()
		return found
	}
	const rest = commonMultiples(range, ...nums.slice(1))
	return arrIntersections([multiples(nums[0], range[range.length - 1]), rest])
}

function leastCommonDivisor(...nums) {
	// TODO: like this style; rewrite some bits of the library to have it -- replaceing 'const's with nameless (anonymous) functions as a way of "distributing" certain value;
	return ((x) =>
		typeof x === "number" || typeof x === "undefined" ? x : min(x))(
		commonDivisors(...nums)
	)
}

function commonDivisors(...nums) {
	if (nums.length === 0) return undefined
	if (nums.length === 1) return nums[0]
	if (nums.length === 2)
		return arrIntersections([factorOut(nums[0]), factorOut(nums[1])])
	return arrIntersections([
		factorOut(nums[0]),
		commonDivisors(...nums.slice(1))
	])
}

/**
 * Takes an a array(or a row, if you prefer) and returns an array of all deviations from its average.
 * @param {number[]} row An array, in which deviations should be found.
 * @param {boolean} isSquare A boolean, representing should or should not every found deviation be powered by two or else it shall be absolute. By default false.
 * @param {boolean} isTruncated A boolean, representing, should or should not an array be truncated, during the process of searching for its average. By default false.
 * @param {number} percents A number, representing count of percents of numbers, for which this array shall be truncated, while searching for its average. Pased value will be doubled. Works only if isTruncated equals true. By default 10.
 */
function deviations(row, isSquare = false, isTruncated = false, percents = 10) {
	const rowAverage = average(row, isTruncated, percents)
	const deviations = []
	row.forEach((num) => {
		isSquare
			? deviations.push(
					floor(Math.pow(num - rowAverage, 2), globalPrecision)
			  )
			: deviations.push(
					floor(Math.abs(num - rowAverage), globalPrecision)
			  )
	})
	deviations.length = row.length
	return deviations
}

/**
 * Returns a dispersion of a numeric array(or a row, if you prefer). It can be of a population variance or a sample variance, depending on the second parameter.
 * @param {number[]} row A numeric array, dispersion for which is to be found and returned.
 * @param {boolean} isSquare A boolean, representing should or should not result of the deviations() function be found powering found deviations by two or not. If false(what is a default value), then instead of doing that it uses absolute values of found deviations.
 * @param {boolean} isGeneral A boolean value representing whether or not the variance returned is either the population or the sample. By default true.
 * @param {number[]} indexes A numeric array of indexes, using which, inside of a first argument needed values will be taken for a sample population(only if second parameter is false).
 */
function dispersion(
	row = [],
	isSquare = false,
	isGeneral = true,
	indexes = []
) {
	const newRow = []
	!isGeneral
		? row.forEach((num, index) => {
				indexes.forEach((checkIndex) => {
					index === checkIndex ? newRow.push(num) : null
				})
		  })
		: row.forEach((num) => newRow.push(num))
	newRow.length = row.length
	// ? what's that, a hack?
	// TODO: if don't like, pray do something about...
	return floor(average(deviations(newRow, isSquare), true, 0)) // ! DO NOT DO LIKE THIS, WHEN USING THE LIBRARY(I mean the last two arguments of average()).
}

/**
 * Takes an array of numbers and returns (general or sample) standard deviation of it depending on the second parameter. (Indexes of sample, if it's a sample, are set using the last argument.)
 * @param {number[]} row Row(or an array if you prefer) of numbers, (sample or population) standard deviation for which shall be found.
 * @param {boolean} isPopulation A boolean, representing should function return the population standard deviation or sample standard deviation.
 * @param {number[]} indexes An array of numbers, representing indexes of the sample, sample standard deviation deviation for which shall be found.
 */
function standardDeviation(row = [], isPopulation = true, indexes = []) {
	return floor(
		Math.sqrt(dispersion(row, true, isPopulation, indexes)),
		globalPrecision
	)
}

/**
 * Takes an array of numbers and returns the standard error of it.
 * @param {number[]} row An array of numbers, standard error for which is to be found.
 * @param {boolean} isDispersion A boolean, that characterizes, should it be dispersion, found through absolute values of diviations in the row or standard deviation(found common way). By default false(standard deviation is used).
 * @param {boolean} isPopulation A boolean, representing should or not standart error be population(true) or sample(false). By default true.
 * @param {number[]} indexes An array of numbers, representing indexes using which sample of the original row should be made. Works only if isPopulation equals true.
 */
function standardError(
	row = [],
	isDispersion = false,
	isPopulation = true,
	indexes = []
) {
	const newArr = []
	isPopulation
		? row.forEach((num) => newArr.push(num))
		: row.forEach((num, index) => {
				indexes.forEach((checkIndex) => {
					index === checkIndex ? newArr.push(num) : null
				})
		  })
	return isDispersion
		? floor(
				exp([dispersion(row, false), Math.sqrt(newArr.length)], "/"),
				globalPrecision
		  )
		: floor(
				exp([standardDeviation(row), Math.sqrt(newArr.length)], "/"),
				globalPrecision
		  )
}

/**
 * Takes a two-dimensional array, containing one dimensional number arrays and returns the number of degrees of freedom for all of them.
 * @param {number[]} numRows Multiple one-dimensional arrays for which the degree of freedom is to be found.
 */
function degreeOfFreedom(...numRows) {
	let lenSum = 0
	for (let i = 0; i < numRows.length; i++) lenSum += numRows[i].length
	return lenSum - numRows.length
}

/**
 * Takes a numbers array and an array of probabilities for each of the given numbers to appear and returns expected value for them.
 * @param {number[]} numbers A number array, expected value for which is to be found.
 * @param {number[]} probabilities An array of probabilitiles for certain numbers from numbers array to appear.
 */
function expectedValue(numbers, probabilities) {
	const values = []
	if (numbers.length > probabilities.length)
		throw new Error(
			"The length of probability array is smaller than the length of the numbers array. No possibility to compute the expectedValue."
		)
	for (let i = 0; i < numbers.length; i++)
		values.push(numbers[i] * probabilities[i])
	return floor(repeatedArithmetic(values.map(String), "+"))
}

// TODO: generalize this thing -- make it possible for afterDot < 0; Then, it would truncate even the stuff before the point! (using this, one could get a character-by-character representation of a JS number...)
// TODO: write such a function as well for both old api and new api!
// ? also -- conversion between the number systems for both old and new api too...; Generalize the thing for it as well (as well as the character-by-character function and many more others...);
/**
 * Floors the given number to the needed level of precision.
 * @param {number} number Number to be floored.
 * @param {number} afterDot How many positions after dot should there be.
 * @returns {number}
 */
function floor(number, afterDot = globalPrecision) {
	return Number(number.toFixed(afterDot))
}

// TODO: generalize to allow for arbitrary "random" function...
/**
 * Takes the max length of the random array, it's max value, the flag, characterizing whether numbers in it should be integers.
 * @param {number} maxLength The largest count of numbers, that can appear in the random array. (It can be different from the given value).
 * @param {number} maxValue The max value, that can be found in the randomly generated array.
 * @param {boolean} integers The boolean flag, that represents whether all numbers in the array should be integers or not. By default false.
 */
function randomArray(maxLength, maxValue, integers = false) {
	const length = Math.floor(Math.random() * maxLength)
	const storage = []
	for (let i = 0; i < length; i++)
		storage.push(
			integers
				? floor(Math.random() * maxValue, 0)
				: floor(Math.random() * maxValue, globalPrecision)
		)
	return storage
}

/**
 * Checks whether the number passed is perfect or not.
 * @param {number} number Number, perfectness of which is to be checked.
 */
function isPerfect(number) {
	return repeatedArithmetic(allFactors(number).map(String), "+") === number
}

/**
 * Takes one integer and returns all of its factors (not only primes, but others also).
 * @param {number} number An integer, factors for which are to be found.
 */
function allFactors(number) {
	const factors = [1]
	for (let currFactor = 2; currFactor !== number; currFactor++)
		if (number % currFactor === 0) factors.push(currFactor)
	return factors
}

/**
 * This function calculates the factorial of a positive integer given.
 * @param {number} number A positive integer, factorial for which is to be calculated.
 */
function factorial(number) {
	const numbers = []
	// TODO: after having implemented the Gamma function for the old API (?maybe just extend this one?), pray do make this thing more general...
	if (number < 0)
		throw new Error(
			"factorial() function is not supposed to be used with the negative numbers. "
		)
	for (let i = 1; i <= number; i++) numbers.push(i)
	if (!numbers.length) return 1
	return repeatedArithmetic(numbers.map(String), "*")
}

/**
 * This function does a fixed addition of two numbers. It decreases error a tiny bit, but with large numbers it may be signigicant.
 * @param {number} float1 First number to be added.
 * @param {number} float2 Second number to be added.
 * @returns {[number, number]} a number with error much less than it would be with JavaScript addition.
 */
function realAddition(float1, float2) {
	const sum = float1 + float2
	const fixedB = sum - float1
	const fix = float2 - fixedB
	return [sum + fix, fix]
}

/**
 * This function takes an integer value, representing the new precision of the output and sets fixdSize equal to it.
 * @param {number} newPrecision The new value of fixedSize.
 */
function setPrecision(newPrecision = 0) {
	return (globalPrecision = newPrecision | 0) // in case someone malisciously decides to put floats in there, hehe :D
}

// TODO : separate onto reference-equality (current) and value-equality (for this, one could employ newapi.utils.valueComparison)
/**
 * This funciton takes in n arrays of dimension 1 (dim (arr) = 1) and compares them.
 * (I.e. returns the boolean value, representing whether they're equal or not).
 * @param {any[]} arrays An array of one-dimensional array of any length.
 */
function arrayEquality(...arrays) {
	function equalBinary(arr1, arr2) {
		if (arr1.length !== arr2.length) return false
		for (let i = 0; i < arr1.length; i++)
			if (arr1[i] !== arr2[i]) return false
		return true
	}
	for (let i = 1; i < arrays.length; i++)
		if (!equalBinary(arrays[i - 1], arrays[i])) return false
	return true
}

/**
 * This function takes in array and determines how nested it is (its dimensions).
 * If it is not array, dimension is 0.
 * If it is an empty array, then it's dimension is 1.
 * If it is an array only with an element which is not an array, then it's dim is 1.
 * If it is an array with only an array of dim n-1, then it's own dim is n.
 * If it is an array with a bunch of stuff with different dims, then it's dim is the highest of the ones of it's elements + 1.
 * This function is defined recursively.
 * @param {any[] | any} array An array with any data in it. It doesn't have to be an array, though.
 */
// * Alternative implementation (second one):
function dim(array) {
	if (array instanceof Array)
		return 1 + (array.length === 0 ? 0 : max(array.map((a) => dim(a))))
	return 0
}

// function dim(array: any): number {
// 	const d = (elem: any) => (elem instanceof Array ? t(elem) : 0)
// 	const t = (arr: any[]) =>
// 		1 + (arr.length === 0 ? 0 : max(arr.map((el) => d(el))))
// 	return array instanceof Array ? t(array) : 0
// }
// ? They're both so good... Which one should be?
// * first is 4 function calls per level;
// * second is 3 function calls per level;
// * CURRENT DECISION: both shall stay, but the first one will be commented out...

/**
 * Takes two numbers (one rational and other - integer) and calculates the value of combinatorics choose function for them.
 * (What it actually does is it takes their binomial coefficient, but never mind about that. )
 * @param {number} n First number (any rational number).
 * @param {number} k Second number (integer).
 */
function binomial(n, k) {
	if (typeof n !== "number" || typeof k !== "number")
		throw new Error("Requiring a number to calculate the choose function. ")
	// Rounding down just in case.
	k = k | 0
	return floor(
		repeatedArithmetic(
			generate(0, k - 1, 1).map((num) => String(n - num)),
			"*"
		) / factorial(k)
	)
}

// TODO: Implement the compareUniversal(...arrays), which uses dim;

// * Replaces a value within a string...
// TODO: this replaces All -- write replaceFirst(n: number) function, which would only replace first appearing...
function replaceStr(string, x, y) {
	return string.split(x).join(y)
}

function replaceStrInd(string, ind, value) {
	return `${string.slice(0, ind)}${value}${string.slice(ind)}`
}

function replaceStrIndMany(string, inds, values) {
	// TODO: use the min() instead of Math.min here...
	return repeatedApplicationIndex(
		(val, i) => replaceStrInd(val, inds[i], values[i]),
		Math.min(inds.length, values.length),
		string
	)
	// * Previous: before refactoring (check that they are the same thing...)
	// let copy = string
	// for (let i = 0; i < inds.length; i++)
	// 	copy = replaceStrInd(copy, inds[i], values[i])
	// return copy
}

function replaceStrMany(string, x, y) {
	// TODO: use min() instead of Math.min() here...
	return repeatedApplicationIndex(
		(v, i) => replaceStr(v, x[i], y[i]),
		Math.min(x.length, y.length),
		string
	)
	// * Previous: before refactoring (check that they are, indeed, the same in functionality)
	// let final = string
	// for (let i = 0; i < x.length; i++) final = replaceStr(final, x[i], y[i])
	// return final
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

function countAppearences(
	array,
	element,
	i = 0,
	comparison = (a, b) => a === b
) {
	return i < array.length
		? Number(comparison(array[i], element)) +
				countAppearences(array, element, i + 1, comparison)
		: 0
}

function indexOfMult(array, el, comparison = (a, b) => a === b) {
	const indexes = []
	for (let i = 0; i < array.length; i++)
		if (comparison(array[i], el)) indexes.push(i)
	return indexes
}

// ? which one to use as an export? (they will both be kept in any case...)
// * Current decision: the newer one (one below);
// * Alternative implementation (this time, with a searchIndex -- i parameter):
//  const indexOfMult = (
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

// TODO: also -- repeatedApplication, code-rework...
// TODO: this thing don't copy an array; It changes the existing one (namely, changes the reference)...
// * Rewrite so that it returns a new one...
function gutInnerArrsRecursive(array) {
	while (hasArrays(array)) array = gutInnerArrs(array)
	return array
}

// TODO: another one's library has a method for this thing (boolmapMult; maps a set of boolean functions to a set of values forming a 2d boolean array...)
// * code-update...
function hasArrays(array) {
	return max(array.map((a) => Number(a instanceof Array))) === 1
}

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
	return a(repeatedApplicationIndex(a, n - 1, initial, offset), n - offset)
}

// * This can create infinite loops... Equiv. of `function () {let a = initial; while (property()) {a = b(a)}; return a}`; (Should one not also add this one thing?)
function repeatedApplicationWhilst(function_, property, initial = undefined) {
	return property()
		? repeatedApplicationWhilst(function_, property, function_(initial))
		: initial
}

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

// TODO: match the order of the definitions with the order of exports... Do the same for all the files...
// * Also, match with the original "math-expressions.js" file...

// TODO: ORDER THE stuff further -- separate the "class" functions from other ones (those that are made as object generators, that is...)
function UniversalMap(notfound) {
	return classTemplate(
		{ notfound: notfound },
		function (keys = [], values = []) {
			return {
				keys: keys,
				values: values,
				class: this,
				get(key, comparison = infinite.valueCompare, number = 1) {
					const indexes = indexOfMult(this.keys, key, comparison)
					if (indexes.length === 0) return this.notFound
					return indexes.slice(0, number).map((i) => this.values[i])
				},
				set(key, value, comparison = infinite.valueCompare) {
					const index = indexOfMult(this.keys, key, comparison)
					if (index.length !== 0) {
						for (const _index of index) this.values[_index] = value
						return value
					}
					this.keys.push(key)
					this.values.push(value)
					return value
				}
			}
		}
	)
}

function template(defobj, label, finObj) {
	return { ...defobj, [label]: finObj }
}

// TODO: work with the idea! Create nestedTemplate and so on...
// * Create the Universal and infinite versions for this...
// * Same todo stands for the infinite and universal versions...
function classTemplate(defaultobject, classObj) {
	return template(defaultobject, "class", classObj)
}

function functionTemplate(defObj, functionObj) {
	return template(defObj, "function", functionObj)
}

// TODO: change this thing (recursiveIndexation and recusiveSetting): make 'fields' a far more complex and powerful argument -- let it be capable of taking the form [a:string,b:string,c:number, ...] with different (and different number of them too!) a,b and c, which would virtiually mean obj[a][b]...(c-2 more times here)[a][b], then proceeding as follows;
// * This would allow for a more powerful use of the function generally and lesser memory-time consumption (also, add support for InfiniteCounters...; as everywhere else around this and other librarries)
// * May be very useful in parsing of nested things. Used it once for an algorithm to traverse an arbitrary binary sequence...
// TODO: extend this thing (add more stuff to it, create powerful extensions)
function recursiveIndexation({ object, fields }) {
	let res = object
	for (const f of fields) res = res[f]
	return res
}

function recursiveSetting({ object, fields, value }) {
	return (recursiveIndexation({
		object: object,
		fields: fields.slice(0, fields.length - 1)
	})[fields[fields.length - 1]] = value)
}

// * Exports (constants are being exported separately).

// ? decide formatting?
export { globalPrecision }

export { defaultTable, infinite }

export {
	exp,
	repeatedArithmetic,
	sameOperator,
	mostPopularElem,
	mostPopularNum,
	repeatedApplicationWhile
}

export {
	Statistics,
	Surface,
	Expression,
	Tests,
	Vector,
	NumberVector,
	NumberMatrix,
	RectNumberMatrix,
	SquareNumberMatrix,
	Ratio,
	Algorithms,
	Equation,
	VarMapping,
	IterableSet
}

export {
	ensureProperty,
	Matrix,
	nestedVector,
	nonArrElems,
	totalElems,
	op,
	repeatedOperation,
	fullExp,
	repeatExp,
	average,
	min,
	max,
	median,
	mostPopular,
	leastPopular,
	range,
	sort,
	generate,
	find,
	readable,
	factorOut,
	truncate,
	multiples,
	leastCommonMultiple,
	commonMultiples,
	leastCommonDivisor,
	commonDivisors,
	deviations,
	dispersion,
	standardDeviation,
	standardError,
	degreeOfFreedom,
	expectedValue,
	floor,
	randomArray,
	isPerfect,
	allFactors,
	factorial,
	realAddition,
	setPrecision,
	arrayEquality,
	dim,
	binomial,
	replaceStr,
	replaceStrInd,
	replaceStrIndMany,
	replaceStrMany,
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
	repeatedApplicationWhilst,
	_multmap,
	multmap,
	UniversalMap,
	template,
	classTemplate,
	functionTemplate,
	recursiveIndexation,
	recursiveSetting
}
