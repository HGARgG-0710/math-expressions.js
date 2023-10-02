// TODO: finish this introduction note [later...];
/**
 * * math-expressions.js API source code, version 1.0 alpha (in work).
 * @copyright HGARgG-0710 (Igor Kuznetsov), 2020-2023
 */

// Space for the local constants... [used for semantics and simplification of development/code-reading];
// ? Should one export them as well? If so, should one export them separately or as a part of 'activate'?

export const ID = (a) => a

export const TYPED_VARIABLE =
	(type = ID) =>
	(x) => {
		return {
			get: type(x),
			set(t) {
				return (this.get = type(t))
			}
		}
	}

export const VARIABLE = TYPED_VARIABLE()

// TODO [for versions >=1.1], pray create a 'returnless' (continuation-style-tailpipe-infinite-stack) version of the 'activate' function;
// * This way, for this thing, pray separate the 'returnless' version COMPLETELY into a different file [so that, one has the definition of it being one according...]
export function activate(transformation = ID) {
	// TODO [general] : do the GRAND CLEANUP - final stage for the preparations of v1.0 of the library. It consists of fixing old broken code, renewing it and creating more new things [especially beautiful exotic stuff];
	const RESULT = {
		// ? Should 'aliases' get renamed into 'semantic'? Or something else? Think, pray...
		aliases: {
			// todo: work extensively on the precise list of aliases... Also, their names...

			// ! Everything here ought to have a generalized version for the Infinite Types in the '.main' part of the library;
			// TODO [general] : work on the spacing - all the definition lines must have a 1-spacing between each other [for readability];
			native: {
				number: {
					numconvert: (x) => (isNaN(x) ? 0 : Number(x)),

					fromNumber(template = {}) {
						return {
							template: { ...template },
							function: function (x = this.template.start) {
								return RESULT.main
									.InfiniteCounter(RESULT.main.addnumber(this.template))
									.class(x)
									.map(this.template.icclass)
							}
						}
					},

					// todo: generalize -- let 'readable' be something that is definable by the user -- allow for an arbitrary separator, different patterns for indentation and so on... The current version would become a default...
					/**
					 * Takes a number and returns a string, containing it's readable variant. (Like 12345 and 12 345)
					 * @param {number} num A number, from which to make a better-looking version of it.
					 */
					readable: function (num = 0) {
						const arr = String(num).split("")
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
					},

					/**
					 * Takes three numbers: the start position, the end position and the step, generates a numeric array using them and returns it.
					 * @param {number} start Start number in array(it's supposed to be the least number in it)
					 * @param {number} end End number in array(the creation of the array is going until end value + 1 number is reached).
					 * @param {number} step Value, by which the count is incremented every iteration.
					 * @param {number} precision Precision of a step, by default set to 1. (If your array is of integers, it's not necessary.)
					 */
					generate: function (start, end, step = 1, precision = 1) {
						const generated = []
						// TODO [general]: GET RID OF 'realAddition'...
						const upper = realAddition(
							end,
							(-1) ** step <
								0 * (Number.isInteger(step) ? 1 : 10 ** -precision)
						)[0]
						const proposition = step > 0 ? (i) => i < upper : (i) => i > upper
						for (let i = start; proposition(i); i += step)
							generated.push(floor(i, precision))
						return generated
					},

					// TODO: generalize this thing -- make it possible for afterDot < 0; Then, it would truncate even the stuff before the point! (using this, one could get a character-by-character representation of a JS number...)
					// TODO: write such a function as well for both old api and new api!
					// ? also -- conversion between the number systems for both old and new api too...; Generalize the thing for it as well (as well as the character-by-character function and many more others...);
					/**
					 * Floors the given number to the needed level of precision.
					 * @param {number} number Number to be floored.
					 * @param {number} afterDot How many positions after dot should there be.
					 * @returns {number}
					 */
					floor: function (number, afterDot = globalPrecision) {
						return Number(number.toFixed(afterDot))
					},

					integer: {
						/**
						 * Factors out a passed number to the prime numbers. Works quite quickly.
						 * @param {number} num Number, to be factored out.
						 * @returns {number[]} Prime factors array.
						 */
						factorOut: function (number) {
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
						},

						isPrime: function (x) {
							return factorOut(x).length === 1
						},

						primesBefore: function (x) {
							return generate(1, x).filter(isPrime)
						},

						// * Brings whatever is given within the given base to base 10;
						// TODO: generalize this "alphabet" thing... Put this as a default of some kind somewhere...
						nbase: function (nstr, base, alphabet = defaultAlphabet) {
							return repeatedArithmetic(
								generate(0, nstr.length - 1).map(
									(i) => alphabet.indexOf(nstr[i]) * base ** i
								),
								"+"
							)
						},

						// * Brings whatever in base 10 to whatever in whatever base is given...
						nbasereverse: function (n, base, alphabet = defaultAlphabet) {
							const coefficients = []
							// TODO: call this thing nrepresentation(), then use here...
							// TODO: change this for either one's own implementation of log, or this, as an alias...
							let i = Math.floor(Math.log(n) / Math.log(base))
							while (n !== 0) {
								// TODO: add an operator for that to the defaultTable...
								n = (n - (n % base ** i)) / base
								coefficients.push(n)
								i--
							}
							// TODO: create a generalized map() function that would map to both functions, arrays and objects;
							return coefficients.map((i) => alphabet[i]).join("")
						},

						baseconvert: function (a, basebeg, baseend) {
							return nbasereverse(nbase(a, basebeg), baseend)
						},

						// TODO: let all the non-alias-exports be handled by the export {...} piece of code, instead of it being done on-the-spot, like here...
						// ? This thing don't include 0. Should it include 0?
						multiples: function (n, range) {
							return generate(1, range).map((a) => a * n)
						},

						// TODO: generalize for negative numbers, pray ['generate' does work with them, actually!]...
						// ? That is, if that is desired... Is it? Pray think...
						multiplesBefore: function (n, x) {
							return multiples(n, floor(x / n))
						},

						// TODO: generalize to leastCommon when working on the general 'orders' api for 'newapi';
						// TODO: generalize all the number-theoretic functions implementations that take a particular number of arguments to them taking an arbitrary amount (kind of like here and in the 'arrIntersections')
						/**
						 * Takes three numbers, thwo of which are numbers for which least common multiple shall be found and the third one is a search range for them.
						 * @param {number} firstNum First number.
						 * @param {number} secondNum Second number.
						 */
						leastCommonMultiple: function (...nums) {
							if (nums.length === 0) return undefined
							if (nums.length === 1) return nums[0]
							if (nums.length === 2)
								return min(
									arrIntersections([
										multiples(nums[0], nums[1]),
										multiples(nums[1], nums[0])
									])
								)
							return leastCommonMultiple(
								nums[0],
								leastCommonMultiple(...nums.slice(1))
							)
						},

						commonMultiples: function (range, ...nums) {
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
							return arrIntersections([
								multiples(nums[0], range[range.length - 1]),
								rest
							])
						},

						leastCommonDivisor: function (...nums) {
							// TODO: like this style; rewrite some bits of the library to have it -- replaceing 'const's with nameless (anonymous) functions as a way of "distributing" certain value;
							return ((x) =>
								typeof x === "number" || typeof x === "undefined"
									? x
									: min(x))(commonDivisors(...nums))
						},

						commonDivisors: function (...nums) {
							if (nums.length === 0) return undefined
							if (nums.length === 1) return nums[0]
							if (nums.length === 2)
								return arrIntersections([
									factorOut(nums[0]),
									factorOut(nums[1])
								])
							return arrIntersections([
								factorOut(nums[0]),
								commonDivisors(...nums.slice(1))
							])
						},

						/**
						 * Checks whether the number passed is perfect or not.
						 * @param {number} number Number, perfectness of which is to be checked.
						 */
						isPerfect: function (number) {
							return (
								repeatedArithmetic(
									allFactors(number).map(String),
									"+"
								) === number
							)
						},

						/**
						 * Takes one integer and returns all of its factors (not only primes, but others also).
						 * @param {number} number An integer, factors for which are to be found.
						 */
						allFactors: function (number) {
							const factors = [1]
							for (let currFactor = 2; currFactor !== number; currFactor++)
								if (number % currFactor === 0) factors.push(currFactor)
							return factors
						},

						/**
						 * This function calculates the factorial of a positive integer given.
						 * @param {number} number A positive integer, factorial for which is to be calculated.
						 */
						factorial: function (number = 0) {
							const numbers = []

							// ? Shall one extend this? [Think about it...]
							if (number < 0)
								throw new Error(
									"factorial() function is not supposed to be used with the negative numbers. "
								)
							if (!number) return 1

							for (let i = 1; i <= number; i++) numbers.push(i)
							return repeatedArithmetic(numbers.map(String), "*")
						},

						sumRepresentations: function (n, m, minval = 1) {
							// TODO: generalize this as well... [either use this or do stuff related to the finite natural power-series arrays + ]
							const itered = generate(minval, n).map((x) =>
								generate(minval, m).map((v, i) => (i == 0 ? x : minval))
							)
							while (itered.length < n ** m) {
								for (let i = 0; i < itered.length; i++) {
									const copied = flatCopy(itered[i])
									for (let j = 0; j < m; j++) {
										copied[j]++
										if (indexOfMult(itered, copied).length) {
											copied[j]--
											continue
										}
										itered.push(copied)
									}
								}
							}

							return itered.filter((x) => repeatedArithmetic(x, "+") == n)
						},

						/**
						 * Takes two numbers (one rational and other - integer) and calculates the value of combinatorics choose function for them.
						 * (What it actually does is it takes their binomial coefficient, but never mind about that. )
						 * @param {number} n First number (any rational number).
						 * @param {number} k Second number (integer).
						 */
						binomial: function (n, k) {
							if (
								(typeof n !== "number" || typeof k !== "number") &&
								(isNaN(Number(n)) || isNaN(Number(k)))
							)
								throw new Error(
									"Input given to the choose function could not be converted to a number. "
								)

							// Rounding down just in case.
							n = Number(n)
							k = Number(k) | 0
							return floor(
								repeatedArithmetic(
									generate(0, k - 1, 1).map((num) => n - num),
									"*"
								) / factorial(k)
							)
						}
					}
				},

				string: {
					stoa(x = "") {
						return x.split("")
					},
					atos(x = []) {
						return x.join("")
					},
					fcc: String.fromCharCode,
					strMap: function (str, symb = ID, isStrOut = false) {
						return (isStrOut ? (x) => x.join("") : RESULT.aliases.id)(
							str.split("").map(symb)
						)
					}
				},

				array: {
					// * What about 'firstSuch' and 'lastSuch' instead??? Then, '_first' and '_last' would be just 'first' and 'last' correspondently...
					last: (arr, obj, comparison = valueCompare) => {
						return max(indexOfMult(arr, obj, comparison))
					},
					first: (arr, obj, comparison = valueCompare) => {
						return min(indexOfMult(arr, obj, comparison))
					},
					_last: (arr) => arr[arr.length - 1],
					_first: (arr) => arr[0],
					insert: (arr, index, values) =>
						arr.slice(0, index).concat(values).concat(arr.slice(index)),
					_insert: (arr, index, val) => insert(arr, index, [val]),
					remove: (arr, start, end) =>
						arr.slice(0, start).concat(arr.slice(end + 1)),
					_remove: (arr, index) => remove(arr, index, index),
					minlen: (...arrs) => flen(min, ...arrs),
					maxlen: (...arrs) => flen(max, ...arrs),
					flen: (f, ...arrs) => {
						return f(arrs.map((a) => a.length))
					},
					flenarrs: (f, ...arrs) => {
						const _f = f(...arrs)
						return arrs.filter((a) => a.length === _f)
					},
					minlenarrs: (...arrs) => flenarrs(minlen, ...arrs),
					maxlenarrs: (...arrs) => flenarrs(maxlen, ...arrs),
					propertymap: (prop) => (objs) => objs.map((a) => a[prop]),

					// ? does one want to rename these two?
					arrThisApply: function (f, arr, thisArg = null) {
						return f.apply(thisArg, arr)
					},
					arrApply: function (f, arr) {
						return f(...arr)
					},

					// ? What about the default comparison? Again, the lower 'todo'...
					// TODO [general] : template-defaults; Look into them carefully for each and every single thing in the library... [Here, in particular - the default 'comparison']
					mostf(template = {}) {
						return {
							template: { ...template },
							function: function (farr = []) {
								let most = farr[0]
								for (const x of farr)
									if (this.template.comparison(x, most)) most = x
								return most
							}
						}
					},

					replaceIndex: function (arr, index, value) {
						return [...arr.slice(0, index), value, ...arr.slice(index + 1)]
					},
					// ! stuff from 'methods:' goes here...

					hasArrays: function (array = []) {
						return !!max(array.map((a) => a instanceof Array))
					},

					// ! A slight problem; Some of the number-theoretic functions' implementations use that thing, whilst it itself is on to being generalized;
					// ^ CONCLUSION: use the special case of the generalized version for those [if they don't get generalized themselves...];
					countAppearences: function (
						array,
						element,
						i = 0,
						comparison = (a, b) => a === b
					) {
						return i < array.length
							? Number(comparison(array[i], element)) +
									countAppearences(array, element, i + 1, comparison)
							: 0
					},

					indexOfMult: function (array, el, comparison = (a, b) => a === b) {
						const indexes = []
						for (let i = 0; i < array.length; i++)
							if (comparison(array[i], el)) indexes.push(i)
						return indexes
					},

					// * clears all but the first `tokeep` repetition of `el`
					clearRepetitions: function (
						arr,
						el,
						tokeep = 0,
						comparison = (a, b) => a === b
					) {
						const firstMet = indexOfMult(arr, el, comparison)
						return firstMet.length
							? arr.filter(
									(a, i) =>
										firstMet.indexOf(i) < tokeep || !comparison(a, el)
							  )
							: [...arr]
					},

					splitArr: function (arr, el, comparison) {
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
					},

					// * "guts" the first layer inner arrays into the current one...
					gutInnerArrs: function (array) {
						const returned = []
						for (let i = 0; i < array.length; i++) {
							if (array[i] instanceof Array) {
								array[i].forEach(returned.push)
								continue
							}
							returned.push(array[i])
						}
						return returned
					},

					// * Replaces values within an array and returns the obtained copy...
					replaceArr: function (array, x, y, transformation = (a) => a) {
						const resArray = [...array]
						for (let i = 0; i < array.length; i++) {
							const index = x.indexOf(array[i])
							if (index !== -1) resArray[i] = transformation(y[index])
						}
						return resArray
					},

					// TODO: Optimize with the use of repeatedApplicationWhilst;
					// TODO: this thing don't copy an array; It changes the existing one (namely, changes the reference)...
					// * Rewrite so that it returns a new one...
					gutInnerArrsRecursive: function (array) {
						while (hasArrays(array)) array = gutInnerArrs(array)
						return array
					},

					// * "reverses" the gutInnerArrs (only once, at a given place)
					// TODO: generalize; make a version of multiple encirclements;
					// todo [general]: do that thing to literally every algorithm that there be within the library [that is, all that are wanted to be]; have a more general counterpart which is supposed to work with multiple cases in question; a repetition of the algorithm in question;
					// ! Allow for negative indexes; Optimize the check of 'i >= from && i <= to' (one thinks it can be done more "elegantly" [read, desireably] with here...)
					arrEncircle: function (a, from = 0, to = a.length) {
						const copied = []
						for (let i = 0; i < a.length; i++) {
							if (i >= from && i <= to) {
								copied.push(a.slice(from, to + 1))
								i = to
								continue
							}
							copied.push(a[i])
						}
						return copied
					},

					// todo: generalize (using the notion of 'level' -- capability to copy up to an arbitrary level... rest is either referenced or ommited (depends on a flag, for instance?)); Having generalized, pray get rid of this special case...
					// * copies array's structure deeply without copying the elements
					// ? create one similar such, except an even largetly generalized? (using the notion of 'objectType' and whether something matches it, for example?)
					// ! Problem: same as with the isSameStructure - introduce forms; keeps this one separate... also, rename; make the absence of element copying apparent in the name...
					arrStructureCopy: function (thing) {
						if (thing instanceof Array) return thing.map(arrStructureCopy)
						return thing
					},
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

					// TODO: think about generalizing the 'comparison' argument to arbitrary number of variables...

					// ! By repeatedly calling them, one would obtain expressions equivalent to some n number of variables...: func(a)(b)(c) instead of func(a, b, c);
					arrIntersections: function (arrs, comparison = (a, b) => a === b) {
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
									)
										result.push([i, j, arrs[0][i], arrs[1][j]])
								}
							}
							return result
						}
						return arrIntersections(
							[arrs[0], arrIntersections(arrs.slice(1), comparison)],
							comparison
						)
					},

					// * Counts all non-array elements within a multidimensional array passed... [recursively so]
					nonArrElems: function (array) {
						return array instanceof Array
							? repeatedArithmetic(array.map(nonArrElems), "+")
							: 1
					},

					// Counts all the elements within a multi-dimensional array (including the arrays themselves...)
					totalElems: function (array) {
						return array instanceof Array
							? array.length +
									repeatedArithmetic(array.map(totalElems), "+")
							: 0
					},

					_multmap: function (a, fs) {
						return multmap([a], fs)[0]
					},

					// * Finds use in one's code all the time.
					// ^ Note: The first index stays for the elements, the second one stays for the function...
					multmap: function (a, fs) {
						return a.map((el) => fs.map((f) => f(el)))
					},

					// TODO: optimize the library in places such as this - where the '.min/.max(.map(somefunc))' actually takes additional steps to check for a thing... Instead, break once having found some such a 'breaking point' (like here); Saves a lot of execution steps in some cases;
					isSubset: function (template = {}) {
						return {
							template: {
								comparison: RESULT.main.valueCompare,
								defarr: [],
								...template
							},
							function: function (arrsub, arr = this.template.defarr) {
								for (const x of arrsub)
									if (
										!RESULT.max(
											arr.map((y) => this.template.comparison(x, y))
										)
									)
										return false
								return true
							}
						}
					},

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
					find: function (searchArr, searchVal) {
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
									? ((result = true),
									  foundTimes++,
									  foundIndexes.push(i))
									: null
						return [result, foundTimes, foundIndexes]
					},

					// * Note: one could implement the 'factorial(n)' for integers as "permutations(generate(1, n)).length";
					permutations: function (array = []) {
						if (array.length < 2) return [[...array]]

						const pprev = permutations(array.slice(0, array.length - 1))
						const l = array[array.length - 1]
						const pnext = []

						for (let i = 0; i < array.length; i++)
							for (let j = 0; j < pprev[i].length; j++)
								pnext.push([
									...pprev[i].slice(0, j),
									l,
									...pprev[i].slice(j, pprev.length)
								])

						return pnext
					}
				},

				function: {
					/**
					 * * Returns a constant-function based on the argument;
					 *
					 * DEFINITION:
					 *
					 * WIKI:
					 */
					_const: (c) => () => c,

					// * The 'do nothing' function; useful as a placeholder in places requiring a function argument;
					void: () => {},

					bind: (a, f, fieldName) => (a[fieldName] = f.bind(a)),

					// ! this is for generalized use, not like 'wrapper', which is for alias-like-use
					/**
					 * Finds the composition of given functions array on each other;
					 * TODO: pray finish [generalize to an arbitrary position for each and every function + additional arguments' lists...]
					 */
					compose: (fs = []) => {
						if (!fs.length) return undefined
						return fs[fs.length - 1](
							RESULT.compose(fs.slice(0, fs.length - 1))
						)
					},
					wrapper: (template = {}) => {
						return {
							template: {
								in: RESULT.aliases.id,
								out: RESULT.aliases.id,
								deff: RESULT.aliases.id,
								...template
							},
							function: function (f = this.template.deff) {
								return (x) => this.template.out(f(this.template.in(x)))
							}
						}
					}
				},

				object: {
					// ! PROBLEM [?is it though? - general]: decide what to do about the default values of functions in cases like these;
					ensureProperty: function (object, property, value) {
						if (!object.hasOwnProperty(property)) object[property] = value
					},
					// * A convinient general-version...
					ensureProperties: function (object, defaultobj) {
						for (const x in defaultobj)
							ensureProperty(object, x, defaultobj[x])
					},

					// ! PROBLEM [1]: won't work in the recursive case (exampli gratia: 'const a = {x : a}') [or, namely, will work indefinitely] - fix!
					subobjects(object = {}, prev = []) {
						let returned = []
						if (object instanceof Object && !prev.includes(object)) {
							for (const a in object)
								if (object[a] instanceof Object) {
									returned.push(object[a])
									prev.push(object)
									returned = returned.concat(
										this.subobjects(object[a], prev)
									)
								}
						}
						return returned
					},
					subobjectsFlat(object = {}) {
						return Object.values(object)
							.filter((x) => x instanceof Object)
							.map(
								(x) =>
									object[
										Object.keys(object)[
											Object.values(object).indexOf(x)
										]
									]
							)
					},

					// ! PROBLEM: this thing [subobjectsFlat]
					// * Checks if a certain object contains a recursive reference;
					isRecursive(object = {}, prevobjsarr = this.subobjects(object)) {
						if (!(object instanceof Object)) return false
						return max(
							Object.keys(object).map(
								(x) =>
									prevobjsarr.includes(object[x]) ||
									this.isRecursive(object[x], prevobjsarr)
							)
						)
					},

					objInverse: function (notfound, treatUniversal = false) {
						return {
							template: { notfound, treatUniversal },
							value: function (obj, treatUniversal = this.treatUniversal) {
								return ((a) =>
									((universal) => a(universal.values, universal.keys))(
										a(obj, treatUniversal)
									))(UniversalMap(this.notfound))
							}
						}
					},

					// TODO: for all these things pray do add the infinite counterpart as well [still strong does it stay -- for EACH AND EVERY thing to be an infinite counterpart]...

					obj: function (keys = [], values = []) {
						let length = min([keys.length, values.length])
						const returned = {}
						for (let i = 0; i < length; i++) returned[keys[i]] = values[i]
						return returned
					},

					objMap: function (obj, keys, id = true) {
						const newobj = {}
						for (const key in keys) newobj[keys[key]] = obj[key]
						if (id)
							for (const key in obj)
								if (!Object.values(keys).has(key)) newobj[key] = obj[key]
						return newobj
					},

					objFmap: function (obj = {}, f = ID) {
						const newobj = {}
						for (const a in obj) newobj[a] = f(obj[a])
						return newobj
					},

					objArr: function (obj = {}) {
						return [Object.keys, Object.values].map((x) => x(obj))
					},

					objSwap: function (obj1, obj2) {
						;((obj1Copy, obj2Copy) => {
							objClear(obj1, obj1Copy)
							objClear(obj2, obj2Copy)
							objInherit(obj1, obj2Copy)
							objInherit(obj2, obj1Copy)
						})(...Array.from(arguments).map(flatCopy))
					},

					objClear: function (obj, objCopy = flatCopy(obj)) {
						for (const dp in objCopy) delete obj[dp]
					},

					objInherit: function (obj, parObj) {
						for (const ap in parObj) obj[ap] = parObj[ap]
					},

					propSwap: function (obj, prop1, prop2) {
						const temp = obj[prop1]
						obj[prop1] = obj[prop2]
						obj[prop2] = temp
					},

					ismapped: function (...args) {
						// TODO: create a function for general kind of 'arr-filling'; Similar (special case of) ensureProperty;
						while (args.length < 2) args.push({})
						return RESULT.main
							.valueCompare()
							.function(...args.map(Object.keys))
					}
				},

				boolean: {
					n: (x) => !x
				},

				// ! What to do with these two? The 'Vector' has been [at large] destroyed; Work with this thing [mostly] corresponds to the further work on 'Vectors and Matricies' part of the libary...
				// ? Should one also add one that is related to exotic-shape-things? (Consider)
				Matrix: function (
					vector,
					typechecker,
					defaultMatrix = [RESULT._const(null), RESULT._const(null)],
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
				},

				// This thing is flexible; it adapts the output to input -- the result is a vector of corresponding depth (the input's inside arrays that are not the given type are all turned into vectors; all else is left untouched...)
				// Depth of the final vector is equal to the depth of the original array...
				// ! Rework this thing later...
				nestedVector: function (
					vector,
					typechecker,
					defaultElems = vector.map(RESULT._const(RESULT._const(null))),
					transform = vector.map(RESULT._const(null)),
					dimensions = Infinity,
					currDim = 0
				) {
					return new Vector({
						vectortypes: ["any"],
						vector: vector.map((el) =>
							el instanceof Array &&
							!typechecker(el) &&
							currDim < dimensions
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
				},

				// ? Where does that go [all the old Expression(s) API generalized]?
				// * Creates a function for execution of operations based on the given operations table...;
				op: function (template = {}) {
					return {
						template: {
							defop: undefined,
							defobjs: [],
							optable: RESULT.variables.defaultTable.get,
							...template
						},
						function: function (
							operator = this.template.defop,
							objects = this.template.defobjs
						) {
							// ? Create some kind of a shortcut (alias) for this thing?
							return Object.values(this.template.optable)
								.map((x) => x[0])
								[Object.keys(this.template.optable).indexOf(operator)](
									...objects
								)
						}
					}
				},

				/**
				 * This class represents a mathematical arithmetic expression.
				 *
				 * It can also come in helpful when evaluating the same expression various number of times.
				 */
				Expression: function (template = {}) {
					return {
						template: {
							optable: RESULT.variables.defaultTable.get,
							...template
						},
						class: function (
							objects = [],
							operators = [],
							indexes = operators.map(RESULT.aliases._const(0))
						) {
							return {
								this: this,
								objects: objects,
								operators: operators,
								indexes: indexes,
								/**
								 * Just a wrapper for fullExp() function. Watch documentation for it.
								 */
								execute() {
									return fullExp(this.this.template).function(
										this.operators,
										this.objects,
										this.indexes
									)
								},
								// TODO: create a new kind of "repeat": repeat (just repeat) and repeatCompose (the current repeat), also make the repeatCompose take an array of arguments for an operator;
								// TODO: then, add the repeatComposeSame as the current repeat (special case of the repeatCompose)...
								/**
								 * Wrapper for repeatExp() function. Watch documentation for it.
								 * @param {number} times A number, representing how many times should current expression be repeated (By default 1).
								 * @param {string} operator A string, representing the operator, with which ariphmetic operation upon the expression result will be done a several times.
								 */
								repeat(operator, times = 1) {
									return repeatExp(this, operator, times)
								},
								// ! Problem: how does one handle different-table merges? What about naming conflicts? How should they be resolved [if at all?];
								merge(expression) {
									for (const x of ["operators", "objects", "indexes"])
										this[x] = this[x].concat(expression[x])
								}
							}
						}
					}
				},

				// Executes an expression;
				fullExp: function (template = {}) {
					return {
						template: {
							optable: RESULT.variables.defaultTable.get,
							...template
						},
						function: function (
							operators = [],
							objects = [],
							indexes = operators.map(RESULT.aliases._const(0))
						) {
							// TODO [general; a known runtime bug]: the BigInt usage across the library will cause problems with the Number- and Boolean-based indexation; Pray convert;
							return repeatedApplication(
								(double, i) => {
									let hasMet = false
									return [
										// ? Should it use 'this.template' for 'exp' here instead?;
										// * Consider more generally on the library-scale...

										// ! Write an alias for this 'argument-compilation' procedure from the 'fullExpr'...
										exp({ optable: this.template.optable }).function(
											operators[i],
											generate(
												0,
												this.template.optable[operators[i]][1] - 1
											).map((j) => {
												if (j == indexes[i]) {
													hasMet = i > 0
													return double[0]
												}
												return objects[double[1] + j - hasMet]
											})
										),
										double[1] +
											this.template.optable[operators[i]][1] -
											1
									]
								},
								operators.length,
								[objects[0], 1]
							)[0]
						}
					}
				},

				// ? Consider refactoring [couldn't it be rewritten via fullExp];
				repeatExp: function (template = {}) {
					return {
						template: {
							optable: RESULT.variables.defaultTable.get,
							...template
						},
						function: function (args, indexes, roperator, repetitions = 1) {
							return repeatedApplication(
								(r, i) => {
									let hasMet = false
									return RESULT.aliases.native
										.op(this.template)
										.function(
											roperator,
											generate(
												0,
												this.optable[roperator][1] - 1
											).map((x) => {
												if (x == indexes[i]) {
													hasMet = i > 0
													return r
												}
												return otherargs[i][x - hasMet]
											})
										)
								},
								repetitions,
								args[0][0]
							)
						}
					}
				},

				repeatedOperation: function (template = {}) {
					return {
						template: {
							optable: RESULT.variables.defaultTable.get,
							...template
						},
						function: function (
							operator,
							objects = [],
							indexes = objects.map(RESULT.aliases._const(0))
						) {
							return Expression(this.template)
								.class(
									objects,
									objects.map(RESULT._const(operator), indexes)
								)
								.execute()
						}
					}
				},

				// TODO: change this thing (recursiveIndexation and recusiveSetting): make 'fields' a far more complex and powerful argument -- let it be capable of taking the form [a:string,b:string,c:number, ...] with different (and different number of them too!) a,b and c, which would virtiually mean obj[a][b]...(c-2 more times here)[a][b], then proceeding as follows;
				// * This would allow for a more powerful use of the function generally and lesser memory-time consumption (also, add support for InfiniteCounters...; as everywhere else around this and other librarries)
				// * May be very useful in parsing of nested things. Used it once for an algorithm to traverse an arbitrary binary operator sequence within a parser...
				// TODO: extend this thing (add more stuff to it, create powerful extensions)
				// ! rewrite using the repeatedApplication...
				recursiveIndexation: function (object, fields) {
					let res = object
					for (const f of fields) res = res[f]
					return res
				},

				recursiveSetting: function (object, fields, value) {
					return (recursiveIndexation(
						object,
						fields.slice(0, fields.length - 1)
					)[fields[fields.length - 1]] = value)
				},

				// * For iteration over an array; this thing is index-free; handles them for the user;
				// * By taking different permutations of an array, one may cover all the possible ways of accessing a new element from a new one with this class;
				// ! This thing isn't infinite though. For infinite version, InfiniteArray could be used instead...
				IterableSet: class {
					curr() {
						return Array.from(this.elements.values())[this.currindex]
					}
					updateIndex(change = 1) {
						this.currindex = (this.currindex + change) % this.elements.size
					}
					prev() {
						this.updateIndex(-1)
						return this.curr()
					}
					next() {
						this.updateIndex()
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
			},

			// * Identity map (just a nice piece of notation, that's all);
			/**
			 * * The identity map;
			 *
			 * DEFINITION:
			 *
			 * WIKI:
			 */
			id: ID,

			// ? Old; Keep or not?
			exp: op,
			mostPopularElem: mostPopular,
			repeatedApplicationWhile: repeatedApplicationWhilst,

			refCompare: (a, b) => a === b,

			// TODO [general] : work very carefully on the precise list of the aliases for the 'main' functions... Ignore the stuff from previous versions; Clean up the unwanted ones...

			// TODO [general] : perform hardcore alias-reusage ['alias-relinkage'] procedure, thus shortening and simplifying code using newly/previously introduced aliases...

			bool: Boolean,
			str: String,
			num: Number,
			obj: Object,
			sym: Symbol,
			udef: undefined,
			set: Set,
			arr: Array,
			// ? Maybe, 'fn' instead? Or both?
			fun: Function,
			bi: BigInt,

			// ? Put it where?
			// * Generally, where does one want to put the aliases that are based off the 'main' types? [As of now, had been decided it'll be just the '.aliases'...]
			mostg(template = {}) {
				return {
					template: { ...template },
					function: function (garr) {
						let most = garr.read(garr.init())
						garr.loop()._full((t) => {
							if (this.template.comparison(t.object().current, most))
								most = t.object().current
						})
						return most
					}
				}
			},

			// ! USE THIS ONE ESPECIALLY EXTENSIVELY...
			property: (p) => (x) => x[p]
		},
		main: {
			// ! order the definitions...
			// ! REMINDER: consistency check across the entire library... [GRAND CLEANUP...]

			// ! implement the 'printi' for generalarrays and ic-s;
			printing: {
				// TODO: create a version of this (printic) with a default 'this.interpret' for the InfiniteCounters to be distinguishable... [and other corresponding templates]
				print(template = {}) {
					return {
						template: { pfun: console.log, interpret: ID, ...template },
						function: function (x) {
							return this.pfun(this.interpret(x))
						}
					}
				},

				// todo: create special cases for this stuff pray...
				controlprint(template = {}) {
					const T = {
						template: {
							pfun: console.log,
							// TODO: make an alias for that thing...
							limit: (x, appended) =>
								x.length >= RESULT.MAX_STRING_LENGTH - appended.length,
							// * By default, will finish the printing of the thing using the function chosen [REGARDLESS OF SIZE!];
							control: function (current, loophandle) {
								this.pfun(current)
								return this.this
									.function({ ishandle: true })
									.function(loophandle)
							},
							...template
						},
						function: function (template = {}) {
							const X = {
								template: {
									ishandle: false,
									function: this,
									...template
								},
								function: function (
									toprint = this.template.function.defstr
								) {
									if (!this.template.ishandle) {
										let final = ""
										let broken = false
										let handle = null
										// ! PROBLEM [general] : how does one pass the general arrays around? Is it via the {this: ...(the actual array)} reference, or just the '...(the actual array)'; One would desire it greater had it been unified...;
										// * Current decision: via the '...(the actual array)' part;
										toprint.loop().full((x) => {
											return RESULT.main
												.CommonArray()
												.class({ treatfinite: true })
												.class([
													(k) => {
														if (
															this.template.function.limit(
																final,
																x.object().current
															)
														) {
															k.break()
															broken = true
															// * The 'full()' erases data regarding the current index from the handle in question;
															handle =
																RESULT.main.deepCopy(k)
														}
													},
													(t) => (final += t.object().current)
												]).this
										})
										if (broken)
											return this.template.function.control(
												final,
												handle
											)
										return this.template.function.pfun(final)
									}
									this.template.ishandle = false
									const r = this.template.this.function(
										toprint.object().slice(toprint.counter.next())
									)
									this.template.ishandle = true
									return r
								}
							}
							X.template.this = X
							return X
						}
					}

					T.template.this = T
					T.template.defstr = T.ustrclass("")
					T.template = { ...T.template, ...template }

					return T
				}
			},
			numeric: {
				// * Stuff related to number systems and alphabets;
				// here, various predefined string-functions for representations of numbers would go;
				polystring(template = {}) {
					return {
						template: {
							alphabet: RESULT.variables.defaultAlphabet.get,
							separator: "",
							...template
						},
						function: function (counter = this.template.icclass.class()) {
							// ? Consider - does one really want these things to be saved into a variable...
							const TIClass = TrueInteger(this.template.icclass).class
							// ? Make this thing an 'alias'?
							const iccmap = (x) => x.map(this.template.icclass)
							const converted = TIClass(
								iccmap(this.template.alphabet.length)
							)

							let copy = RESULT.main.deepCopy(counter)
							let index = this.template.ustrclass.template.icclass()
							const representation = this.template.ustrclass.class()
							const copyZero = copy.class.class()

							for (; copy.compare(copyZero); index = index.next()) {
								const modulo = copy.modulo(
									converted.power(TIClass(iccmap(index)))
								)
								representation.write(
									index,
									this.template.alphabet.read(modulo)
								)
								copy = copy.add(modulo.invadd())
							}

							// TODO: create a way to 'insert' the separator like so into the thing;
							return representation.join(this.template.separator)
						}
					}
				}
			},

			GeneralArray(template = {}) {
				const B = {
					template: {
						empty: [],
						unfound: undefined,
						treatfinite: false,
						...template
					},
					static: {
						empty(template = this.this.template) {
							return this.this.class(template).class()
						},
						pushbackLoop(template = {}) {
							return {
								template: {
									arguments: [],
									transform: RESULT.id,
									...template
								},
								function(b) {
									return this.template.target.pushback(
										this.template.transform(b.object().currelem),
										...this.template.arguments
									)
								}
							}
						},
						// * This is pretty much THE SAME code as above for the 'pushbackLoop';
						// ! Strongly desired it is by one for it to be generalized [with 'function-name'-based approach, somewhere in the TODOS;]...
						pushfrontLoop(template = {}) {
							return {
								template: {
									arguments: [],
									transform: RESULT.id,
									...template
								},
								function(b) {
									return this.template.target.pushfront(
										this.template.transform(b.object().currelem),
										...this.template.arguments
									)
								}
							}
						},
						// TODO: look through the GeneralArray code looking for places this thing might get used handily... (Just like in the '.appendfront()' case...);
						fromArray(arr, leftovers = {}) {
							RESULT.ensureProperties(leftovers, {
								fast: false,
								range: this.this.template.icclass.template.range,
								comparison: this.this.template.icclass.template.comparison
							})
							const generalized = this.empty()
							for (const a of arr) generalized.pushback(a, leftovers)
							return generalized
						}
					},
					class: function (array = this.template.empty) {
						// TODO: ensure that all the objects within the library possess this style [uniformity; so that it's more intuitive to work with (under certain particular interpretation of 'intuitive' + it has more features...)]; Allows for changing the 'this' dynamically easily [something that plain JS 'this' don't really allow];
						const A = { class: this }
						A.this = {
							array: this.template.treatfinite
								? this.static.fromArray(array)
								: array,
							currindex: this.template.class.template.icclass.class(),
							// ^ IDEA: naming-maps-defined methods!
							// * Implement a special way of object-definition allowing the creation of methods, which are defined based upon the 'this' object ['defining methods' would have access to those] + the name of the method...
							// This way, one'd have that the object's methods' names' list would be run through a certian 'definingMethod', which for each and every one would return the value for it...
							// * This'd allow for easy generalization of method names for things like these two here... Essentially cutting down greatly on the repeating code;
							// One could even generalize to the 'args' passed to the function, doing it like so:
							//		definingMethod (name, _this, args) {let value; switch(name) {...}; _this[name] = value}
							// * with the 'value' getting changed in the 'switch'
							next() {
								return (this.this.this.currindex =
									this.this.this.currindex.next())
							},
							previous() {
								return (this.this.this.currindex =
									this.this.this.currindex.previous())
							},
							get currelem() {
								// ^ CONCLUSION: yes, let it be; All the user-functions would have access to the entirety of the object's properties...
								// todo [general] : pray do just that...
								return this.this.this.this.class.template.elem(
									this.this.this
								)
							},
							set currelem(newval) {
								return this.this.this.this.class.template.newvalue(
									this.this.this,
									newval
								)
							},
							// * For loops; Allows to loop over an array, with a changing index; Usage examples may be found across the default GeneralArray methods definitions:
							// * pray notice, that '.full()' changes the 'this.object.currindex' by default, whilst
							loop(template = {}) {
								// ? Generalize to a separate class maybe???
								const a = {
									template: {
										indexiter: (x) => x.object().next(),
										end: (x) =>
											x
												.object()
												.this.class.template.isEnd(x.object()),
										begin: (x) => x.object().begin(),
										icclass:
											this.this.this.this.class.template.icclass,
										...template
									},
									object: RESULT._const(this.this.this),
									restart: function () {
										this.counter = this.template.icclass.class()
									},
									yield: function (
										_indexiter = this.template.indexiter,
										end = this.template.end,
										iter = true
									) {
										if (iter) _indexiter(this)
										const isend = end(this)
										if (!isend && iter)
											this.counter = this.counter.next()
										return isend
									},
									_full(
										each,
										iter = RESULT._const(this.template.indexiter),
										end = RESULT._const(this.template.end),
										begin = this.template.begin
									) {
										const index = this.object().currindex
										begin(this)
										let r = undefined
										let is = this.yield(
											RESULT._const(null),
											end(),
											false
										)
										while (!is) {
											r = each(this, r)
											is = this.yield(iter(), end())
											if (this.broke) break
										}
										this.restart()
										this.broke = false
										this.object().currindex = index
										return r
									},
									// * The difference between '.full()' and '._full()' is that the former is based on later and allows for 'break' and 'continue'...
									// ? work on their names...
									// TODO: generalize to a function for a truly general loop (the 'while', that'd use this system for the 'separation' of an iteration into a GeneralArray of functions suceptible to inner 'this.break()' or 'this.continue()' calls...)
									full(
										each = this.template.each,
										iter = RESULT._const(this.template.indexiter),
										end = RESULT._const(this.template.end),
										begin = this.template.begin
									) {
										const index = this.object().currindex
										begin(this)
										let r = undefined
										let is = this.yield(null, end(), false)
										while (!is) {
											const x = each(this)
											let goOn = true
											r = x.loop()._full((t) => {
												if (goOn) {
													if (this.broke || this.continued) {
														goOn = false
														return
													}
													return t.object().currelem(t)
												}
											})
											is = this.yield(iter(), end())
											if (this.broke) break
											goOn = true
											this.continued = false
										}
										this.restart()
										this.broke = false
										this.object().currindex = index
										return r
									},
									break: function () {
										this.broke = true
									},
									continue: function () {
										this.continued = true
									},
									broke: false,
									continued: false
								}
								a.restart()
								return a
							},
							// ! shorten the code with these 4 [begin, end, init, finish]...
							begin() {
								return this.this.this.go(
									this.this.this.init(),
									RESULT._const(true)
								)
							},
							end() {
								// * skipping the check because one knows that it would be 'true' anyway...
								return this.this.this.go(
									this.this.this.finish(),
									RESULT._const(true)
								)
							},
							init() {
								return this.this.this.this.class.template.icclass.class()
							},
							// * NOTE: the '.length()' is NOT the last '!isEnd'-kind-of index, but the one after it...
							finish() {
								return this.this.this.length().get().previous()
							},
							// * A far simpler, yet non-slowed down for corresponding tasks, direction independent alternative to '.move';
							// Note, that 'move' hasn't a 'range' check; it is purposed to work with properties of indexes; [For instance, walk a sub-array of an array with the same cardinality as some particularly chosen array, or some such other thing...]
							go(
								index,
								range = this.this.this.this.class.template.icclass
									.template.range
							) {
								if (!range(index.value))
									throw new RangeError(
										"Range error in the '.go' method 'index' argument whilst calling."
									)

								return (this.this.this.currindex = index)
							},
							// ? What about static methods??? Make this thing [other such similar ones???] static, rewrite in terms of the static class member?

							// TODO: pray decide about the question of dependence/independence of methods from mutual definition...
							// * For instance, if one has a thing relying on another thing, should user's interference with the definition also affect the behaviour of the thing that relies on it??? Or should contents of definitions be copied to their dependencies instead??? If so, pray create some general mechanism for organization of that manner of a procedure...
							move(
								index,
								preface = RESULT.void,
								comparison = this.this.this.this.class.template.icclass
									.template.comparison,
								each = (x) => x.next(),
								stop = (x) => comparison(x.length().get(), x.currindex)
							) {
								preface(arguments, this.this.this)
								while (
									!comparison(this.this.this.currindex, index) &&
									!stop(this.this.this)
								)
									each(this.this.this)
								return this.this.this.currindex
							},
							moveforward(index, leftovers = {}) {
								RESULT.ensureProperties(leftovers, {
									begin: false,
									comparison:
										this.this.this.this.class.template.icclass
											.template.comparison,
									stop: (x) =>
										leftovers.comparison(
											x.length().get().next(),
											x.currindex
										)
								})
								return this.this.this.move(
									index,
									(args, x) => {
										if (leftovers.begin) x.currindex = x.init()
									},
									leftovers.comparison,
									(x) => x.next(),
									leftovers.stop
								)
							},
							// TODO [GENERAL]: work on the order of arguments of various methods and functions... Update things in correspondence with them.
							movebackward(index, leftovers = {}) {
								RESULT.ensureProperties(leftovers, {
									end: false,
									comparison:
										this.this.this.this.class.template.icclass
											.template.comparison,
									stop: (x) =>
										leftovers.comparison(x.init(), x.currindex)
								})
								return this.this.this.move(
									index,
									(args, x) => {
										if (leftovers.end) x.currindex = x.length().get()
									},
									leftovers.comparison,
									(x) => x.previous(),
									leftovers.stop
								)
							},
							movedirection(index, leftovers = {}) {
								RESULT.ensureProperty(
									leftovers,
									"comparison",
									this.this.this.this.class.template.icclass.template
										.comparison
								)
								return this.this.this.currindex.compare(index)
									? this.moveforward(index, {
											begin: false,
											comparison: leftovers.comparison,
											stop: (leftovers.stop =
												leftovers.stop ||
												((x) =>
													leftovers.comparison(
														x.currindex,
														x.length().get()
													)))
									  })
									: this.movebackward(index, {
											end: false,
											comparison: leftovers.comparison,
											stop: (leftovers.stop =
												leftovers.stop ||
												((x) =>
													leftovers.comparison(
														x.currindex,
														x.init()
													)))
									  })
							},
							jump(index, leftovers = {}) {
								RESULT.ensureProperties(leftovers, {
									comparison:
										this.this.this.this.class.template.icclass
											.comparison,
									range: this.this.this.this.class.template.icclass
										.range
								})
								return (this.this.this.currindex =
									this.this.this.currindex.jumpDirection(
										index,
										leftovers.comparison,
										leftovers.range
									))
							},
							/**
							 * * Hello, Wilbur!
							 * ? Does that thing work even???
							 * * might...
							 * TODO: pray check if these kinds of 'nested'ly stuctured objects' methods even get their in-editor JSDoc documentation properly... [Quite a jolly surprise if they do!]
							 */
							read(index, leftovers = {}) {
								RESULT.ensureProperties(leftovers, {
									fast: false,
									range: this.this.this.this.class.template.icclass
										.template.range,
									comparison:
										this.this.this.this.class.template.icclass
											.template.comparison
								})

								const ind = this.this.this.currindex
								if (leftovers.fast)
									this.this.this.go(index, leftovers.range)
								else
									this.this.this.moveforward(
										index,
										true,
										leftovers.comparison
									)
								this.this.this.currindex = ind
								const c = this.this.this.currelem
								return c
							},
							write(index, value, leftovers = {}) {
								RESULT.ensureProperties(leftovers, {
									fast: false,
									range: this.this.this.this.class.template.icclass
										.template.range,
									comparison:
										this.this.this.this.class.template.icclass
											.template.comparison
								})

								const ind = this.this.this.currindex
								if (leftovers.fast)
									this.this.this.go(index, leftovers.range)
								else
									this.this.this.moveforward(index, {
										begin: true,
										comparison: leftovers.comparison
									})
								const returned = (this.this.this.currelem = value)
								this.this.this.currindex = ind
								return returned
							},
							length() {
								// ? QUESTION: does one want the '.length().get' to work like a function [current - finding the length]; or like a static value changed by transformations?
								// ? Or like a getter? As in: 'get get() {...}'; Then, one'd drop the '()' from '.get()' during the calling procedure...
								// * pray think on it...
								return {
									object: RESULT._const(this.this.this),
									get() {
										// ? Could this [the 'length.get()' method] not be rewritten by the means of the '.loop()' method??? Pray consider...
										// * Yes, indeed! Pray do...
										// TODO: refactor...
										const index = this.object().currindex
										this.object().begin()
										while (
											!this.object().this.class.template.isEnd(
												this.object()
											)
										)
											this.object().next()
										const returned = this.object().currindex
										this.object().currindex = index
										return returned
									},
									set(value, leftovers = {}) {
										RESULT.ensureProperties(leftovers, {
											range: this.object().this.class.template.class
												.template.icclass.template.range,
											comparison:
												this.object().this.class.template.class
													.template.icclass.template.comparison
										})

										if (!leftovers.range(value.value))
											throw new RangeError(
												"Index range error for array length setting"
											)

										if (
											leftovers.comparison(
												this.object().length().get(),
												value
											)
										)
											return

										if (
											this.object()
												.length()
												.get()
												.compare(
													value,
													undefined,
													RESULT._const(true)
												)
										) {
											// Decrease the length
											this.object().deleteMult(
												this.object().init(),
												this.object()
													.length()
													.get()
													.jumpDirection(
														this.object()
															.length()
															.get()
															.difference(value)
													)
											)
										} else {
											// Increase the length
											// TODO: finish the sketch...
											// * Sketch: .pushback() some 'default()' element(s) [settable as a default-template by the user] for the required number of items...
											// The number of items is supposed to be given by the InfiniteCounter.difference(ic) method... would essentially take an 'InfiniteCounter' instance, find the difference between it and the current index;
											// * note: the returned difference would be non-absolute and by the chosen generator, that being, one would 'jump' on the appropritate number of times;
										}
									}
								}
							},
							appendfront(x, leftovers = {}) {
								RESULT.ensureProperties(leftovers, {
									fast: false,
									range: this.this.this.this.class.template.icclass
										.template.range,
									comparison:
										this.this.this.this.class.template.icclass
											.template.comparison
								})

								const newArr = this.this.this.this.class.static.fromArray(
									[x],
									leftovers
								)
								newArr.concat(this.this.this, leftovers)
								return newArr
							},
							copied(
								method,
								_arguments = [],
								f = RESULT.id,
								leftovers = {}
							) {
								RESULT.ensureProperties(leftovers, {
									fast: false,
									range: this.this.this.this.class.template.icclass
										.template.range,
									comparison:
										this.this.this.this.class.template.icclass
											.template.comparison
								})
								const c = this.this.this.copy(f, leftovers)
								if (c[method]) c[method](..._arguments)
								return c
							},
							// ! Leftovers of a note... [DO NOT DELETE YET!!! KEEP FOR NOW, ONLY WHEN WRITING DOCUMENTATION AND CLEANING UP]
							// Shape of the modifiable 'this' objects...
							// const A = {this: {...[the actual object]}}; A.this.this = A;
							// * The user would access the object by means of 'obj.this'; And from within - using 'this.this.this' [for the sake of ability to change the value of 'this.this.this']
							// TODO: after having semi-completed the first stage of prototyping the library's contents and architechture, pray create the documentation for all that stuff...
							// ? Think on HOW to document it all... Ought to be general yet also representative of the possible uses such as to employ different combinations of separate elements of the library per a single one...
							// TODO [general]: spread this 'this.this.this' architecture throughout the project...
							pushback(value, leftovers = {}) {
								RESULT.ensureProperties(leftovers, {
									fast: false,
									range: this.this.this.this.class.template.icclass
										.template.range,
									comparison:
										this.this.this.this.class.template.icclass
											.template.comparison
								})
								return this.this.this.write(
									this.this.this.length().get(),
									value,
									leftovers
								)
							},
							pushfront(value, leftovers = {}) {
								RESULT.ensureProperties(leftovers, {
									fast: false,
									range: this.this.this.this.class.template.icclass
										.template.range,
									comparison:
										this.this.this.this.class.template.icclass
											.template.comparison
								})
								return (this.this.this = this.this.this.appendfront(
									value,
									leftovers
								))
							},
							// TODO: ensure these kinds of 'saviour' default empty templates all over the templated code;
							pushfrontLoop(template = {}) {
								const origin =
									this.this.this.this.class.static.pushfrontkLoop(
										template
									)
								const T = {
									template: {
										target: this.this.this,
										...origin.template
									}
								}
								T.function = origin.function.bind(T)
								return T
							},
							pushbackLoop(template = {}) {
								const origin =
									this.this.this.this.class.static.pushbackLoop(
										template
									)
								const T = {
									template: {
										target: this.this.this,
										...origin.template
									}
								}
								T.function = origin.function.bind(T)
								return T
							},
							// TODO: allow for multiple arrays to concat the current one with... [perhaps, an array of arrays?]
							concat(
								// TODO: make the 'array' an '.empty()' by default in such and other similar cases...
								array,
								leftovers = {}
							) {
								RESULT.ensureProperties(leftovers, {
									fast: false,
									range: this.this.this.this.class.template.icclass
										.template.range,
									comparison:
										this.this.this.this.class.template.icclass
											.template.comparison
								})
								return array.loop()._full(
									this.this.this.pushbackLoop({
										arguments: [leftovers]
									}).function
								)
							},
							empty(template = this.this.this.this.class.template) {
								return this.this.this.this.class.static.empty(template)
							},
							copy(f = RESULT.id, leftovers = {}) {
								RESULT.ensureProperties(leftovers, {
									fast: false,
									range: this.this.this.this.class.template.icclass
										.template.range,
									comparison:
										this.this.this.this.class.template.icclass
											.template.comparison
								})

								const copied = this.this.this.empty()
								this.this.this.loop()._full(
									copied.pushbackLoop({
										transform: f,
										arguments: [leftovers]
									}).function
								)
								return copied
							},
							slice(
								begin = this.this.this.init(),
								end = this.this.this.finish(),
								leftovers = {}
							) {
								RESULT.ensureProperties(leftovers, {
									fast: false,
									range: this.this.this.this.class.template.icclass
										.template.range,
									comparison:
										this.this.this.this.class.template.icclass
											.template.comparison
								})

								if (!leftovers.range(end.value))
									throw new RangeError(
										"Bad range in the 'end' argument passed to the 'GeneralArray.slice()' function call!"
									)

								// TODO: generalize [add the corresponding argument to the methods and employ it] the uses of the 'this.this.this.empty'... in accordance with the newly created implementation...
								const sliced = this.this.this.empty()

								this.this.this.loop()._full(
									sliced.pushbackLoop({
										arguments: [leftovers]
									}).function,
									undefined,
									// ? QUESTION: should one use '.compare + same InfiniteCounter' or 'comparison()'???
									// TODO: decide generally....
									// ^ decided! Let all the algorithms involving indexes all be inclusive to the arguments' values...
									// TODO: pray ensure that too...
									RESULT._const((t) =>
										end.compare(t.object().currindex)
									),
									(t) => {
										t.object().begin()
										t.object().go(begin, leftovers.range)
									}
								)
								return sliced
							},
							*forin() {
								for (
									let c = this.this.this.init();
									!c.compare(this.this.this.length().get());
									c = c.next()
								)
									yield c
							},
							*[Symbol.iterator](leftovers = {}) {
								RESULT.ensureProperties(leftovers, {
									fast: false,
									range: this.this.this.this.class.template.icclass
										.template.range,
									comparison:
										this.this.this.this.class.template.icclass
											.template.comparison
								})
								for (
									let c = this.this.this.init();
									!c.compare(this.this.this.length().get());
									c = c.next()
								)
									yield this.this.this.read(c, leftovers)
							},
							// TODO: rewrite by means of already create methods [refactor];
							// * Do it using '.project() + InfiniteCounter.difference() + repeat()...';
							// Sketch: 'this.this.this.projectComplete(index, this.this.this.static.fromArray([value]).repeat(this.this.this.length().get().difference(index)))'
							// ! later, pray review the integrity of the small things with this sketch...;
							fillfrom(index, value, leftovers = {}) {
								RESULT.ensureProperties(leftovers, {
									range: this.this.this.this.class.template.icclass
										.template.range,
									comparison:
										this.this.this.this.class.template.icclass
											.template.comparison
								})
								const indexsaved = this.this.this.currindex
								this.this.this.go(index, leftovers.range)
								while (
									!leftovers.comparison(
										this.this.this.currindex,
										this.this.this.finish()
									)
								) {
									this.this.this.currelem = value
									this.this.this.next()
								}
								this.this.this.currindex = indexsaved
							},
							convert(
								// ? An urge to generalize this thing as well -- by means of creating a 'type' of functions that can be 'called' an arbitrary number of times, then change this thing to a 'GeneralArray' and allow GeneralArray [and anything else] to be such a 'many-calls-function-type', to which a GeneralArray given could be applied...
								template = this.this.this.this.class.template,
								leftovers = {}
							) {
								RESULT.ensureProperties(leftovers, {
									fast: false,
									range: template.icclass.template.range,
									comparison: template.icclass.template.comparison
								})
								const newArr = RESULT.GeneralArray(templates[0]).class()
								this.this.this.loop()._full(
									newArr.pushbackLoop({
										arguments: [leftovers]
									}).function
								)
								return newArr
							},
							delete(index, leftovers = {}) {
								RESULT.ensureProperties(leftovers, {
									fast: false,
									range: this.this.this.this.class.template.icclass
										.template.range,
									comparison:
										this.this.this.this.class.template.icclass
											.template.comparison
								})
								return this.this.this.deleteMult(index, index, leftovers)
							},
							deleteMult(
								startindex,
								endindex = startindex,
								leftovers = {}
							) {
								RESULT.ensureProperties(leftovers, {
									fast: false,
									range: this.this.this.this.class.template.icclass
										.template.range,
									comparison:
										this.this.this.this.class.template.icclass
											.template.comparison
								})
								return (this.this.this = this.this.this
									.slice(
										this.this.this.init(),
										startindex.previous(),
										leftovers
									)
									.concat(
										this.this.this.slice(endindex.next(), leftovers)
									))
							},
							projectComplete(array, index, leftovers = {}) {
								RESULT.ensureProperties(leftovers, {
									fast: false,
									range: this.this.this.this.class.template.icclass
										.template.range,
									comparison:
										this.this.this.this.class.template.icclass
											.template.comparison
								})

								const _index = this.this.this.currindex
								array.loop()._full(
									(t) => {
										// TODO: generalize this as well - some '.currwriteLoop(value, fast, range, comparison)', or something...
										this.this.this.write(
											this.this.this.currindex,
											t.object().currelem,
											leftovers
										)
									},
									RESULT._const((x) => {
										x.object().next()
										this.this.this.next()
									}),
									undefined,
									(x) => {
										x.object().begin()
										this.this.this.go(index, leftovers.range)
									}
								)
								// ? Should one embed this into the '._full()/.full()' calls as well??? As some 'ending' argument, after the 'begin'???
								// ! Problem : generally , one might want to implement a sort of a multi-array loop function [so that the 'index' could be changed and then restored for multiple of them...]...
								// * Problem with this is this '.loop' is attached to one array and one don't seem to want to generalize it much further than that...
								// ? Where to stick it? Should it be a '.static'? Or ought one take it out of the GeneralArray completely???
								this.this.this.currindex = _index
							},
							// TODO: expand the list of those "leftover" arguments [the fast/range/comparison] + ensure their presence everywhere...; Look for vast generalization possibilities [so as not to trail them all around like that, maybe?...];
							// TODO: think deeply on the return values for the GeneralArray algorithms...
							projectFit(array, index, leftovers = {}) {
								RESULT.ensureProperties(leftovers, {
									fast: false,
									range: this.this.this.this.class.template.icclass
										.template.range,
									comparison:
										this.this.this.this.class.template.icclass
											.template.comparison
								})

								const ind = array.currindex
								this.this.this.loop()._full(
									(t) => {
										t.object().write(
											t.object().currindex,
											array.currelem,
											leftovers
										)
										array.next()
									},
									undefined,
									(x) =>
										x
											.object()
											.this.class.template.isEnd(x.object()) ||
										array.this.class.template.isEnd(array),
									(t) => t.object().go(index, leftovers.range)
								)
								array.currindex = ind
							},
							inserted(index, value, leftovers = {}) {
								RESULT.ensureProperties(leftovers, {
									fast: false,
									range: this.this.this.this.class.template.icclass
										.template.range,
									comparison:
										this.this.this.this.class.template.icclass
											.template.comparison
								})

								const x = this.this.this.slice(
									undefined,
									index.previous(),
									leftovers
								)
								x.pushback(value, leftovers)
								x.concat(
									this.this.this.slice(index, undefined, leftovers)
								)
								return x
							},
							insert(index, value, leftovers = {}) {
								RESULT.ensureProperties(leftovers, {
									fast: false,
									range: this.this.this.this.class.template.icclass
										.template.range,
									comparison:
										this.this.this.this.class.template.icclass
											.template.comparison
								})
								return (this.this.this = this.inserted(
									index,
									value,
									leftovers
								))
							},
							has(x, leftovers = {}) {
								RESULT.ensureProperties(leftovers, {
									unfound: this.this.this.this.class.template.unfound,
									comparison:
										this.this.this.this.class.template.icclass
											.template.comparison
								})
								return !leftovers.comparison(
									this.this.this.firstIndex(x, leftovers),
									leftovers.unfound
								)
							},
							// * Just an alias...
							index(i, leftovers = {}) {
								RESULT.ensureProperties(leftovers, {
									fast: false,
									range: this.this.this.this.class.template.icclass
										.template.range,
									comparison:
										this.this.this.this.class.template.icclass
											.template.comparison
								})
								return this.this.this.read(i, leftovers)
							},
							// * Write in terms of 'firstIndex' + 'slice'; just collect the indexes from corresponding index (found index) after having pushed it to the GeneralArray of the indexes of the same type, then return the result...
							indexesOf(x, leftovers = {}) {
								RESULT.ensureProperties(leftovers, {
									fast: false,
									range: this.this.this.this.class.template.icclass
										.template.range,
									comparison:
										this.this.this.this.class.template.icclass
											.template.comparison
								})
								const indexes = this.this.this.empty()
								this.this.this.loop()._full((arr) => {
									if (leftovers.comparison(arr.object().currelem, x))
										indexes.pushback(arr.currindex, leftovers)
								})
								return indexes
							},

							// ? Question[2]: should one add a (potentially, a template?) 'comparison' defaulting to the class's/instance's comparison[s]?
							// * Something like 'comparison = this.comparison || this.class.comparison'?
							// ? Repeating the [2] for all the correspondent 'leftover' arguments??? Might be quite nice... Modifying it per instance...
							// * On the other hand, if the user really does want to modify it per instance, there's no utter requirement for this; A simpler solution would be just to do:
							//	'const thing = ClassName()...()' all over anew, thus re-creating all the templates' levels within the question...

							firstIndex(x, leftovers = {}) {
								RESULT.ensureProperties(leftovers, {
									unfound: this.this.this.this.class.template.unfound,
									comparison:
										this.this.this.this.class.template.icclass
											.template.comparison
								})
								let index = leftovers.unfound
								this.this.this.loop()._full((arr) => {
									if (leftovers.comparison(arr.object().currelem, x)) {
										index = arr.currindex
										arr.break()
									}
								})
								return index
							},
							// TODO: template the 'baseelem' argument, pray;
							shiftForward(
								times,
								icclass = this.this.this.this.class.template.icclass,
								baseelem = undefined,
								leftovers = {}
							) {
								RESULT.ensureProperties(leftovers, {
									fast: false,
									range: this.this.this.this.class.template.icclass
										.template.range,
									comparison:
										this.this.this.this.class.template.icclass
											.template.comparison
								})
								const x = this.this.this.this.class.static
									.fromArray([baseelem])
									.repeat(times, icclass)
								x.concat(this.this.this, leftovers)
								return x
							},
							// TODO [general]: do proper work on the functions' defaults;
							shiftBackward(times, leftovers = {}) {
								RESULT.ensureProperties(leftovers, {
									fast: false,
									range: this.this.this.this.class.template.icclass
										.template.range,
									comparison:
										this.this.this.this.class.template.icclass
											.template.comparison
								})
								this.this.this = this.this.this.slice(
									times.map(
										this.this.this.this.template.class.template
											.icclass
									),
									undefined,
									leftovers
								)
							},
							repeat(
								times = this.this.this.init(),
								icclass = this.this.this.this.class.template.icclass,
								leftovers = {}
							) {
								const newarr = this.this.this.empty()
								icclass.static.whileloop(icclass.class(), times, () =>
									newarr.concat(this.this.this, leftovers)
								)
								return newarr
							},
							reversed(leftovers = {}) {
								const reversedArr = this.this.this.empty()
								this.this.this.loop()._full(
									reversedArr.pushfrontLoop({
										arguments: [leftovers]
									}).function
								)
								return reversedArr
							},
							reverse() {
								return (this.this.this = this.this.this.reversed())
							},
							// * Just an alias for 'copy'...
							map(f = RESULT.id, leftovers = {}) {
								RESULT.ensureProperties(leftovers, {
									fast: false,
									range: this.this.this.this.class.template.icclass
										.template.range,
									comparison:
										this.this.this.this.class.template.icclass
											.template.comparison
								})
								return this.this.this.copy(f, leftovers)
							},
							isEmpty(isend = this.this.this.this.class.template.isEnd) {
								const index = this.this.this.currindex
								this.this.this.begin()
								const val = isend(this.this.this)
								this.this.this.currindex = index
								return val
							},
							/**
							 * Implementation of the merge-sort of the GeneralArray in question by means of the passed predicate;
							 *
							 * DEFINITION:
							 *
							 * WIKI:
							 */
							sorted(predicate, leftovers = {}) {
								RESULT.ensureProperties(leftovers, {
									fast: false,
									range: this.this.this.this.class.template.icclass
										.template.range,
									comparison:
										this.this.this.this.class.template.icclass
											.template.comparison
								})

								// TODO: create an alias for that thing...
								// ? Make this the 'fromNumber'??? Would be quite nice, considering how grotesque it is...
								const ALIAS = (x) =>
									RESULT.infinite
										.InfiniteCounter(
											RESULT.infinite.addnumber({
												start: -1
											})
										)({ value: x })
										.map(this.this.this.this.class.template.icclass)

								const TWO = ALIAS(2),
									THREE = ALIAS(3)

								function split(a) {
									if (
										leftovers.comparison(TWO, a.length().get()) ||
										leftovers.comparison(a.length().get(), THREE)
									)
										return this.this.this.this.class.static.fromArray(
											[a],
											leftovers
										)

									// ? Should one generalize this ???
									// * YES, this code is getting slightly repetitious and unwieldy...
									const counter = this.this.ths.init()
									while (
										!leftovers.comparison(
											a.finish(),
											counter.jump(counter)
										) &&
										!leftovers.comparison(
											a.finish(),
											counter.jump(counter.next())
										)
									)
										counter = counter.next()

									// TODO: it's really time to generalize this [the empty arrays thing...]!!!
									const final = this.this.this.empty()
									final.concat(
										split(a.slice(a.init(), counter, leftovers))
									)
									final.concat(
										split(a.slice(counter, undefined, leftovers)),
										leftovers
									)
									return final
								}
								function merge(a) {
									function binmerge(a, b) {
										// TODO: AGAIN...
										const merged = this.this.this.empty()

										// TODO: make the default 'index' for .read() to be '.init()'...; Then, here, one'd just write 'undefined everywhere...'
										// * One was expecting this to be far more unwieldy...
										// ? Question: make it better? Pray do sometime later...
										const F = (x) => {
											const K = (ampt, bmpt) => {
												const f1 = elem_sort(
													a.this.class.static.fromArray(
														ampt
															? [
																	b.read(
																		b.init(),
																		leftovers
																	)
															  ]
															: bmpt
															? [
																	a.read(
																		a.init(),
																		leftovers
																	)
															  ]
															: [
																	a.read(
																		a.init(),
																		leftovers
																	),
																	b.read(
																		b.init(),
																		leftovers
																	)
															  ],
														leftovers
													)
												)
												merged.pushback(
													f1.read(f1.init(), leftovers),
													leftovers
												)
												// TODO: fix up the usage of 'a.has' here...
												const c =
													bmpt ||
													a.has(f1.read(f1.init(), leftovers))
														? a
														: b
												// TODO: finish the .shiftBackward() first... - one is required to delete only 1 element from the start...
												c.shiftBackward()
											}
											// * This code does not run when both are true, by the way...
											K(a.isEmpty(), b.isEmpty())
										}
										const T = (x) =>
											x.loop()._full(F, RESULT._const(RESULT.void))

										T(a)
										T(b)

										return merged
									}
									let current = elem_sort(a.index(a.init(), leftovers))
									a.loop()._full(
										(x) =>
											(current = binmerge(
												current,
												elem_sort(x.object().currelem)
											)),
										undefined,
										undefined,
										(x) => x.object().go(x.object().init().next())
									)
								}
								function elem_sort(a) {
									function TWOCASE(a) {
										const first = a.read(a.init(), leftovers)
										const second = a.read(a.init().next(), leftovers)
										return predicate(second, first)
											? a
											: a.this.class.static.fromArray(
													[second, first],
													leftovers
											  )
									}
									function THREECASE(a) {
										const first = a.read(a.init())
										// todo: pray finish the arguments list for .shiftBackward()...
										const copied = elem_sort(
											a.copied("shiftBackward")
										)

										const c1 = copied.read(copied.init(), leftovers)
										const c2 = copied.read(
											copied.init().next(),
											leftovers
										)

										const fC1 = predicate(first, c1)
										const fC2 = predicate(first, c2)

										// ? QUESTION: should one try to shorten these kinds of things....
										// * Pray consider in some depth...
										return fC1
											? fC2
												? a.this.class.static.fromArray(
														[c1, c2, first],
														leftovers
												  )
												: a.this.class.static.fromArray(
														[c1, first, c2],
														leftovers
												  )
											: a.this.class.static.fromArray(
													[first, c1, c2],
													leftovers
											  )
									}
									return leftovers.comparison(a.length().get(), TWO)
										? TWOCASE(a)
										: THREECASE(a)
								}

								return merge(split(this.this.this))
							},
							sort(predicate, leftovers = {}) {
								RESULT.ensureProperties(leftovers, {
									fast: false,
									range: this.this.this.this.class.template.icclass
										.template.range,
									comparison:
										this.this.this.this.class.template.icclass
											.template.comparison
								})
								return (this.this.this = this.this.this.sorted(
									predicate,
									leftovers
								))
							},
							isSorted(predicate, leftovers = {}) {
								RESULT.ensureProperties(leftovers, {
									fast: false,
									range: this.this.this.this.class.template.icclass
										.template.range,
									comparison:
										this.this.this.this.class.template.icclass
											.template.comparison
								})
								return leftovers.comparison(
									this.this.this,
									this.this.this.sorted(predicate, leftovers)
								)
							}
						}
						A.this.this = A
						return A
					}
				}
				B.static.this = B
				return B
			},

			number(template = {}) {
				return {
					template: { start: 0, ...template },
					generator(x = this.template.start) {
						return this.template.forward(Number(x))
					},
					inverse(x = this.template.start) {
						return this.template.backward(Number(x))
					},
					range: RESULT.negate(isNaN)
				}
			},
			addnumber(template = {}) {
				return RESULT.main.number({
					fdiff: 1,
					bdiff: -1,
					forward(x) {
						return x + this.template.fdiff
					},
					backward(x) {
						return x + this.template.bdiff
					},
					...template
				})
			},
			multnumber(template = {}) {
				return RESULT.main.number({
					template: { fdiff: 1, bdiff: -1, ...template },
					forward(x) {
						return x * this.template.fdiff
					},
					backward(x) {
						return x * this.template.bdiff
					}
				})
			},

			copy() {
				// TODO: create an alias of 'trim' from the function in the Symbol-copying operation, with the argument for number of symbols/elements from String/Array, in question (here, only 1);
				return {
					array: (a, method = RESULT.id) => a.map(method),
					object: (a, method = RESULT.id) => objFmap(a, method),
					function: (a) => a.bind({}),
					symbol: (a) =>
						Symbol(((x) => x.slice(0, x.length - 1))(a.toString().slice(7))),
					arrayFlat: (a) => [...a],
					objectFlat: (a) => ({ ...a })
				}
			},

			// TODO: generalize later with a _switch() from a different library of self's...
			// ? Wonder if one want to put it into this one package instead???
			// ! extend the template further...
			// ? rename
			copyFunction(template = {}) {
				// TODO: do something about that inner one; shouldn't be there...
				function typeTransform(x) {
					if (x === "array" || x === "arrayFlat")
						return (p) => p instanceof Array
					if (x === "objectFlat") return (p) => typeof p === "object"
					return (p) => typeof p === x
				}
				return {
					template: template,
					function(a) {
						for (const x of this.template.list)
							if (typeTransform(x).function(a))
								return RESULT.infinite.copy()[x](a, this.function)
						return a
					}
				}
			},

			// * A useful algorithm from a different project of mine; value-wise comparison of two arbitrary things...
			// ? GENERAL QUESTION [over the 'infinite' object - for each and every method referencing it, pray decide...]: should one use "this" instead of "infinite"? This'd allow for some neat object-related stuff...
			// * [Previous] Current decision: yes, why not; works by itself + allows user to instantiate this structure partially for their own purposes conviniently... So, one'd just make it 'this' everywhere! Or not?
			// ! On the other hand - if there are dependencies of certain methods and user does decide to instantiate something, then they'd have to instantiate dependencies as well...
			// ^ IDEA [solution]: create an 'instantiation structure' for this thing; distribute as some instance of an InstantiableObject class, which creates instantiable objects; It allows to set dependencies,
			// ^ which would 'by default' add the stuff required; [The default instantiation could, of course, be turned off - flag for it;]
			//
			// ! PROBLEM: with the currently chosen solution for the handling of the funciton arguments;
			// * List of 'problems' (1. and 3. especially; the 2. is more curious);
			//		1. Function Size [the 'String' won't work with large enough functions' code...];
			//		2. Notation [stuff like (a) => {return a} and (b) => {return b}; won't be considered "the same"];
			//		3. Formatting [stuff like (a) => {return a} and (a   ) => {   return   a;  }; won't be considered "the same"];
			// * This does work for stuff like template classes and methods of different objects that have the exactly same code;
			// TODO [about the 1.]: after having created the InfiniteString, pray allow for a function/String to be transformed into it; The function - to get all of its code...
			// ? About the formatting [3.] stuff [and, possbily notation, 2.], one ideally ought to parse functions, then compoare their ASTs; For that sort of stuff, one'd do
			// ? something like 'Parser(InfiniteString(a)) === Parser(InfiniteString(b))';
			// ! All that'd be required is a JS parser...
			// todo: having created the JSONF, for the 1.1 [or even the 1.2] release, pray add this there too...

			// ! PROOOOOOOBLEEEEEEM!!! With recursive objects; They won't get handled properly, instead using out ALL THE STACK...
			// TODO: pray fix;
			valueCompare(template = {}) {
				function TWOCASE(oneway = false) {
					return (a, b) => {
						if (typeof a !== typeof b) return false
						switch (typeof a) {
							case "object":
								for (const a_ in a)
									if (!TWOCASE()(b[a_], a[a_])) return false
								if (!oneway) return TWOCASE(true)(b, a)
								return true
							case "function":
								return String(a) === String(b)
							case "symbol":
								return a.toString() === b.toString()
							default:
								return a === b
						}
					}
				}
				return {
					template: {
						oneway: false,
						...template
					},
					function: function (...args) {
						return !!RESULT.aliases.native.min(
							args
								.slice(0, args.length - 1)
								.map((x, i) =>
									TWOCASE(this.template.oneway)(x, args[i + 1])
								)
						)
					}
				}
			},

			// TODO [GENERAL] : add the ability for certain methods to take arbitrary number of arguments from the user... Let it use the '...something' operator for Arguments-to-Array conversion...
			// Like the way one's done recently with the valueCompare...

			// * Probably the simplest infinite counter one would have in JS;
			arrayCounter(template = {}) {
				return {
					template: {
						start: null,
						...template
					},
					generator(a = this.template.start) {
						if (!this.range(a)) this.template.start = a
						return [a]
					},
					inverse: function (a) {
						return a[0]
					},
					range: function (a) {
						return (
							a === this.template.start ||
							(a instanceof Array && this.range(this.inverse(a)))
						)
					}
				}
			},

			// * Generalization of the thing above (arrayCounter)...
			objCounter(template = {}) {
				return {
					template: {
						field: "",
						start: null,
						// ? Does one desire the refCompare? Or valueCompare to be the default?
						comparison: RESULT.aliases.refCompare,
						...template
					},
					generator: function (a = this.template.start) {
						if (!this.range(a)) this.template.start = a
						return { [this.template.field]: a }
					},
					inverse: function (a) {
						return a[this.template.field]
					},
					range: function (a) {
						return (
							this.template.comparison(a, this.template.start) ||
							(typeof a === "object" && this.range(this.inverse(a)))
						)
					}
				}
			},

			// * A general algorithm for search inside a recursive array [of arbitrary depth]; Uses GeneralArray for layer-depth-indexes;
			generalSearch(template = {}) {
				return {
					template: { self: false, reversed: false, ...template },
					function: function (
						arrrec = [],
						prevArr = this.template.genarrclass.static.empty(),
						self = this.template.self,
						reversed = this.template.reversed
					) {
						const i = prevArr.copy()
						if (self && this.template.soughtProp(arrrec)) return i

						const boundprop = reversed
							? (x) => x >= 0
							: (x) => x < arrrec.length
						i.pushback(reversed ? arrrec.length - 1 : 0)
						i.end()
						for (; boundprop(i.currelem); i.currelem += (-1) ** reversed) {
							if (this.template.soughtProp(arrrec[i.currelem])) return i
							if (arrec[i.currelem] instanceof Array) {
								const r = this.function(
									arrrec[i.currelem],
									i,
									false,
									reversed
								)
								if (!r) continue
								return r
							}
						}
						return false
					}
				}
			},

			// * A maximally efficient structurally counter based on array recursion and finite orders;
			// ! Clean, review again later; fix	problems
			// TODO: this is the now generally chosen structure for the library; make all the 'template-generator-inverse-range' quartets to be written in it...
			recursiveCounter(template = {}) {
				// ^ IDEA: generalize this thing EVEN further: add the 'R-L-U' linear order as a finite sub-counter preceeding the arrays' sequences... (as in 0-1-2-3-...-2^(whatever...)-[0]-...[2^(whatever)]-...)
				// ! that's good, but what about the '[0]' concept? One don't want to have 2/3 strictly central points like this [because of linearity...]; Pray consider...
				const returned = {
					template: {
						comparison: RESULT.main.valueCompare,
						maxarrlen: RESULT.variables.MAX_ARRAY_LENGTH,
						type: RESULT.aliases._const(true),
						...template
					},
					range(x) {
						return (
							x instanceof Array &&
							!!x.length &&
							!!RESULT.functions.min(
								(x) =>
									this.template.type(x) ||
									(x instanceof Array && this.range(x))
							)
						)
					}
				}

				// TODO: generalize this operation to an outer-scope function;
				const keys = ["inverse", "generator"]
				keys.map(
					(x, i) =>
						(returned[x] = function (t) {
							return generalgenerator(t, !!i, this)
						})
				)

				function signedAdd(sign) {
					return function (thisobject) {
						return function (x) {
							let indexes = findDeepUnfilled(sign)(x)
							let result = x

							if (!indexes) {
								indexes = findDeepUnfilledArr(x)
								if (!indexes) return [x]

								result =
									RESULT.submodules.infinite.recursiveIndexationInfFields()(
										result,
										indexes
									)

								// TODO: generalize the construction [[...]] of depth 'n'; Create the simple alias-functions for quick creation of recursive arrays;
								// * Including the infinite versions of them...
								result = RESULT.submodules.infinite.repeatedApplication()(
									(value) => {
										value.push([])
										return value[value.length - 1]
									},
									dim({
										icclass: indexes.this.class.template.icclass
									})(a)
										.difference(indexes.length())
										.previous(),
									result
								)
								result.push(thisobject.template.lower)
								return x
							}

							result =
								RESULT.submodules.infinite.recursiveIndexationInfFields()(
									result,
									indexes.slice(undefined, indexes.finish().previous())
								)
							const endind = indexes.read(indexes.finish())
							result[endind] = thisobject.template[
								sign ? "forward" : "backward"
							](result[endind])
							return x
						}
					}
				}
				function signedDelete(sign) {
					return function (thisobject) {
						return function (x) {
							if (
								!findDeepUnfilled(sign)(x) &&
								findDeepUnfilledArr(x) &&
								x.length === 1
							)
								return x[0]

							// TODO [general]: use the 'recursiveSetting' where appropriate; Create an infinite version for it as well...
							let lastIndexes = findDeepLast(a)
							const finind = lastIndexes.final()
							const ffinind = finind.previous()
							// * Note: the one underneath here is an old note;
							// ! do the 'ppointer' stuff after having made sure that the 'lastNumIndexes.length().compare(lastNumIndexes.init().next().next())'
							let ppointer =
								RESULT.submodules.infinite.recursiveIndexationInfFields()(
									x,
									lastIndexes.slice(undefined, ffinind.previous())
								)
							let pointer =
								RESULT.submodules.infinite.recursiveIndexationInfFields()(
									x,
									lastIndexes.slice(undefined, ffinind)
								)
							const llindex = lastIndexes.read(ffinind)
							const lindex = lastIndexes.read(finind)

							if (thisobject.template.sign(pointer[lindex])) {
								pointer[lindex] = thisobject.template[
									sign ? "forward" : "backward"
								](pointer[lindex])
								return x
							}

							ppointer[llindex] = RESULT.aliases._remove(
								ppointer[llindex],
								lindex
							)
							pointer = ppointer[llindex]

							let index = lindex
							let hlindex = llindex

							// TODO [local refactoring]: the pre-while-loop piece of code is nigh exactly the same as that within the loop; Pray re-organize to make this stuff shorter and more concise... [for instance, separate declarations from definitions and on and on...]
							while (!pointer.length) {
								// TODO: now, this is a RECURSIVE step, so, for instance, one accomplishes this same one procedure not just for 'pointer', but for the 'ppointer' and all the other ones such as well...
								// * Consider carefully how to do this precisely...
								// ? Some of these things do tend to re-appear quite some number of times here... Generalize?
								index = index.previous()
								ppointer =
									RESULT.submodules.infinite.recursiveIndexationInfFields()(
										x,
										lastIndexes.slice(
											undefined,
											(hlindex = hlindex.previous())
										)
									)
								ppointer[hlindex] = RESULT.aliases._remove(
									ppointer[hlindex],
									index
								)
								pointer =
									RESULT.submodules.infinite.recursiveIndexationInfFields()(
										x,
										lastIndexes.slice(undefined, index)
									)
							}

							return x
						}
					}
				}

				const sat = signedAdd(true),
					saf = signedAdd(false),
					sdt = signedDelete(true),
					sdf = signedDelete(false)

				function boolfunctswitch(f, bool) {
					return f ? (bool ? sat : saf) : bool ? sdt : sdf
				}

				function generalgenerator(x, bool, thisobj) {
					if (!thisobj.range(x)) return [thisobj.template.lower]
					let r = RESULT.submodules.infinite.deepCopy(x)
					return boolfunctswitch(thisobj.template.globalsign(r), bool)(thisobj)(
						r
					)
				}

				// ! PROBLEM [same - with the re-creation of different methods for the purpose of running this thing...];
				// TODO: DO THE SAME THERE...
				// TODO: generalize the 'LastIndexArray + arrayCounter()' part...
				// ? What about putting these things out into the 'submodules.infinite.' or some other more global scope?
				const findDeepUnfilled = (t = true) => {
					RESULT.submodules.infinite.generalSearch({
						genarrclass: RESULT.submodules.infinite.LastIndexArray({
							icclass: RESULT.submodules.infinite.InfiniteCounter(
								RESULT.submodules.infinite.arrayCounter()
							)
						}),
						soughtProp: (x) =>
							returned.template.type(x) &&
							(t ? RESULT.aliases.id : RESULT.aliases.n)(
								returned.template.sign(x)
							) &&
							!returned.template.comparison(
								t ? returned.template.upper : returned.template.rupper,
								x
							)
					}).function
				}
				const findDeepUnfilledArr = RESULT.submodules.infinite.generalSearch({
					genarrclass: RESULT.submodules.infinite.LastIndexArray({
						icclass: RESULT.submodules.infinite.InfiniteCounter(
							RESULT.submodules.infinite.arrayCounter()
						)
					}),
					soughtProp: (x) =>
						x instanceof Array && x.length < returned.template.maxarrlen,
					self: true
				}).functions
				const findDeepLast = RESULT.submodules.infinite.generalSearch({
					genarrclass: RESULT.submodules.infinite.LastIndexArray({
						icclass: RESULT.submodules.infinite.InfiniteCounter(
							RESULT.submodules.infinite.arrayCounter()
						)
					}),
					soughtProp: returned.template.type,
					reversed: true
				}).function

				return returned
			},

			// * That's an example of an infinite counter;
			// * btw, it is non-linear, that is one can give to it absolutely any array, like for example [[[0, 1234566643]]], and it won't say word against it; will continue in the asked fashion...
			// * This particular nice feature allows to build different InfiniteCounters with different beginnings on it...
			// note: creates new objects after having been called;
			numberCounter(template = {}) {
				return RESULT.submodules.infinite.recursiveCounter({
					upper: RESULT.variables.MAX_INT.get,
					lower: 0,
					rupper: -RESULT.variables.MAX_INT.get,
					sign: (x) => x > 0,
					// TODO: generalize this to an 'alias';
					globalsign: function (x) {
						return !!RESULT.methods.max(
							x.map((a) => this.sign(a) || this.globalsign(a))
						)
					},
					// ? Should this not be replaced with !isNaN(x)? [this'd permit stuff like '[true]' to be recieved by the '.range()'; ]
					// * Also, create an alias for that thing pray...
					type: (x) => typeof x === "number" || x instanceof Number,
					forward: (x) => x + 1,
					backward: (x) => x - 1,
					...template
				})
			},

			// A special case of 'recusiveCounter';
			// * Uses array-orders (by default);
			orderCounter(template = {}) {
				return RESULT.main.recursiveCounter({
					upper: template.order[template.strorder.length - 1],
					lower: template.order[Math.floor(template.order.length / 2)],
					rupper: template.order[0],
					forward: (x) => template.order[template.order.indexOf(x) + 1],
					backward: (x) => template.order[template.order.indexOf(x) - 1],
					globalsign: function (x) {
						return !!RESULT.methods.max(
							x.map((a) => this.sign(a) || this.globalsign(a))
						)
					},
					sign: (x) =>
						strorder.indexOf(x) > Math.floor(template.order.length / 2),
					...template
				})
			},

			stringCounter(template = {}) {
				// todo: create a nice default 'template.order' made of strings...;
				// ^ IDEA [for a thing to plug in] : a maximally long array of unique strings, generated by some single elegant expression;
				return RESULT.main.orderCounter({
					type: (x) => typeof x === "string" || x instanceof String,
					...template
				})
			},

			// * It checks for the same array structure... That being, if array are precisely isomorphic in a certain given sense...
			isSameArrStructure(arr1, arr2, comparison = RESULT.aliases.refCompare) {
				// ? create an alias for the 'instanceof' instruction? [idea: 'is', example: is(obj, ObjClass)]
				if (arr1 instanceof Array != arr2 instanceof Array)
					return comparison(arr1, arr2)

				return !!RESULT.main.min(
					RESULT.main
						.generate(1, max([arr1, arr2].map((a) => a.length)))
						.map((i) => !!this.isSameArrStructure(arr1[i], arr2[i]))
				)
			},

			// * Object-Generalization of the isSameArrStructure...
			isSameObjStructure(obj1, obj2, comparison = RESULT.aliases.refCompare) {
				if (obj1 instanceof Object != obj2 instanceof Object)
					return comparison(obj1, obj2)
				const x = RESULT.main.valueCompare(Object.keys(obj1), Object.keys(obj2))
				const vals1 = Object.values(obj1)
				const vals2 = Object.values(obj2)
				return !x
					? false
					: RESULT.main.min(
							vals1.map((t, i) =>
								RESULT.main.isSameObjStructure(t, vals2[i])
							)
					  )
			},

			// ? QUESTION [general]: should such inter-call arguments required to pass the intermidiate execution values between the two recursive calls be available to user? Or does one want them to be obstructed via additional function context instead???
			// TODO: pray think in each individual case on this stuff, make it correspondent...
			// ! PROBLEM [same as with the isSameStructure]: there is no distinction between whether something is an element or an object!
			// ^ IDEA: introduce a specialized function for this stuff - 'form'; it'd take the array and map [in accordance with the decided form], whether it's an element or a part of the structure; continuation is a second element;
			// * Example (for some 'form'): form([a, [b, [c, d, e]]]) = [[0], [1, [0, 0]]];
			// * Then, the isSameStructure would just compare forms;
			// ^ IDEA: create a 'ArrayForm', which would be the array embedded with this sturcture...
			// ! isSameStructure performs forms comparison. sameStructure performs form-copying; The only functions really missing are ones for fast form-creation;
			// * Three elements of an object-system:
			// 	1. Creation [emerging of elements of the object-system from nothing];
			// 	2. Relation [non-affecting (non-mutating, that is) processes that can take place between them, described by elementary pieces of 'relations'];
			// 	3. Transformation [ways of transforming one into the other on-the-go...];
			// ! Write this down somewhere [about the 3 elements]. It's good. Really good...
			// * copies the array structure in question precisely;
			sameStructureArr(
				array,
				generator,
				currval = undefined,
				copy = true,
				subcall = false
			) {
				const copied = copy ? RESULT.main.deepCopy(array) : array
				for (let i = 0; i < copied.length; i++) {
					if (copied[i] instanceof Array) {
						currval = sameStructureArr(
							copied[i],
							generator,
							currval,
							false,
							true
						)
						continue
					}
					// * Found out that in JS, 'a(undefined) = a()';
					currval = generator(currval)
					copied[i] = currval
				}
				return !subcall ? currval : copied
			},

			// * Generalization of the sameStructureArr...
			sameStructureObj(
				object,
				generator,
				initval = undefined,
				copy = true,
				subcall = false
			) {
				let currvalue = initval
				let copied = copy ? RESULT.main.deepCopy(object) : object
				for (const x of object) {
					if (copied[x] instanceof Object) {
						currvalue = RESULT.main.sameStructureObj(
							copied[x],
							generator,
							currvalue,
							false,
							true
						)
						continue
					}
					currvalue = generator(currvalue)
					copied[x] = currvalue
				}
				return !subcall ? copied : currvalue
			},

			// ! this thing is for finitely lengthed Arrays; [? Create a 'GeneralArray' version for it?]
			// * Slight problem with this whole 'separation' onto finite and infinite arrays;
			// This is a general problem;
			// ^ GENERAL SOLUTION: just use the General types, which'd include the Common types ('finite' ones in a wrapper) and the Unlimited types (things using recursion such as LastIndexArray);
			dim(template = {}) {
				return {
					template: { ...template },
					function: function (recarr = []) {
						if (recarr instanceof Array)
							return template.icclass
								.class()
								.next()
								.jumpDirection(
									RESULT.submodules.infinite.maxfinite(
										recarr.map(this.function)
									)
								)
						return template.icclass.class()
					}
				}
			},

			// * NOTE: for now assumes that all the elements of the 'finarr' have the same 'icclass'
			// TODO: create an 'arrIcclassSame' functions (aliases) for: 1. identyfying if it is [indeed] the same icclass; 2. making it the same [regardless of the results of 1.];
			maxfinite(finarr = []) {
				return RESULT.aliases
					.mostf({ comparison: (chosen, current) => !current.compare(chosen) })
					.function(finarr)
			},
			// ? One could just implement it as the 'maxfinite()' of the reversed icclass [there was a todo for making this a separate operation]... instead of manually reversing it like here;
			// * Pray consider...
			minfinite(finarr = []) {
				return RESULT.aliases
					.mostf({ comparison: (chosen, current) => !chosen.compare(current) })
					.function(finarr)
			},
			// * Same as above, but with the 'GeneralArray' instead...
			// ? Should one be doing any of the template + defaulting-to-empty() stuff?
			mingeneral(genarr) {
				// ! Make aliases for these 'chosen/current' functions...
				return RESULT.aliases
					.mostg({ comparison: (chosen, current) => !chosen.compare(current) })
					.function(genarr)
			},
			maxgeneral(genarr) {
				return RESULT.aliases
					.mostg({ comparison: (chosen, current) => !current.compare(chosen) })
					.function(genarr)
			},

			recursiveIndexationInfFields(template = {}) {
				return {
					template: { ...template },
					function: function (
						object,
						fields = this.template.genarrclass.static.empty()
					) {
						return RESULT.main.repeatedApplication({
							icclass: fields.this.class.template.icclass,
							...this.template
						})(
							(x, i) => {
								return x[fields.read(i)]
							},
							fields.length(),
							object
						)
					}
				}
			},

			repeatedApplication(template = {}) {
				return {
					template: { iter: (x) => x.next(), ...template },
					function: function (
						f = this.template.f,
						times = this.template.times,
						initial = this.template.initial,
						offset = this.template.icclass.class()
					) {
						let r = initial
						for (
							let i = template.icclass.class();
							!i.compare(times);
							i = this.template.iter(i)
						)
							r = f(r, i.difference(offset))
						return r
					}
				}
			},

			// * This can create infinite loops...
			// ! create a 'While' - same as 'Whilst' [naming conventions];
			repeatedApplicationWhilst: function (
				function_,
				property,
				initial = undefined
			) {
				let curr = initial
				while (property()) curr = function_(curr)
				return curr
			},

			InfiniteCounter(template = {}) {
				const A = {
					static: {
						direction(ic) {
							return ic.compare(this.this.class())
						},
						// TODO: do the thing with the first n 'conditional' arguments - that being, if length of passed args array is 'n<k', where 'k' is maximum length, then the first 'k-n' recieve prescribed default values
						// * Pray make it work generally, put all the methods into this one form;
						forloop(
							target,
							i = this.this.class(),
							goal,
							jumping = (x) => x.next(),
							comparison = this.this.template.comparison
						) {
							// TODO: create a generalization of the repeatedApplicationWhilst, which'd be a function, accomplishing an application of functions onto a certain initial object consequently [like here],
							// * ; with the functions being generated by a different function passed, one of a current index; With '(i) => f', for some 'f', one'd get this thing...
							return repeatedApplicationWhilst(
								(r) => {
									i = i.next()
									return jumping(r)
								},
								() => !i.compare(goal, comparison, () => true),
								target
							)
						},
						// TODO [general]: ensure the use of 'leftover' argument objects across the library...
						// ! Problem: the 'forloop' and 'whileloop' are the same function; Get rid of one of them in favour of another, fix things, replace the chosen for deletion with the other one...
						// * They differ very slightly; ought to be GENERALIZED to the same function;
						whileloop(
							start = this.this.class(),
							end,
							each,
							iter = (x) => x.next(),
							comparison = this.this.template.comparison
						) {
							let curr = infinite.deepCopy(start)
							while (!comparison(curr, end)) {
								each(curr)
								curr = iter(curr)
							}
							return curr
						}
					},
					template: {
						comparison: infinite.valueCompare,
						unfound: null,
						...template
					},
					class: function (previous) {
						return {
							class: this,
							// ! THE CHECK FOR 'non-nullness' here is flawed; Pray generalize, keep this as a default...
							value: !previous ? this.template.generator() : previous.value,
							next() {
								// * An observation: this is one of the ways to be able to reference a function from within itself...
								return this.class.template.generator(this)
							},
							// * DECIDED: full words are preferred to shortenings and shortenings are preferred to abbreviations...
							// One-worded names are preferred to all the other ones...
							// flatcase (submodules, methods, varnames, general ids) is generally preferred to camelCase (methods, varnames), which is preferred to PascalCase ("classes" and some templated functions), which is prefereed to UPPERCASE, which is preferred to all else...
							// TODO [general]: pray ensure that the desired naming conventions are implemented - walk through the code, seeking things unwanted and fix them... Create new things desired...
							previous() {
								return this.class.template.inverse(this)
							},
							/**
							 *
							 * * DEFINE:
							 *
							 *		length(x, a) := number of iterations of 'generator' required to get to 'a' from 'x';
							 *
							 * Positive - of generator;
							 * Negative - of inverse;
							 *
							 * Then, the boolean case ( return { true | false } ) function is equivalent to evaluating
							 *
							 *		length(this, a) >= 0;
							 *
							 * * 'null' means 'no strict following in appearance (no linear order) under chosen pair of generators';
							 *
							 * ! NOTE: this thing is pretty much useless... The new API DON'T WORK WITH JSDoc NOTATION VERY WELL... INSTEAD, RESERVE TO SIMPLE DESCRIPTIONS WHEN IT COMES DOWN TO WRITING THE DOCS...
							 * @return { any }
							 */
							compare(ic, leftovers = {}) {
								RESULT.ensureProperties(leftovers, {
									comparison: this.class.template.comparison,
									range: this.class.template.range,
									unfound: this.class.template.unfound
								})
								// TODO: Pray think deeply and create a sequence of similar todo-s regarding use of counters in relation to presence/lack of InfiniteCounter-wrapper and other such similar objects...

								// ? Shouldn't one generalize this to a function, to allow exceptions? [And only as a default - return that thing???]
								if (!leftovers.range(ic.value)) return leftovers.unfound

								let pointerfor = ic
								let pointerback = ic

								// TODO: again, do the same thing - get rid of the 'InfiniteCounter' wrapper's influence on the workflow of the methods that use it... (this time with 'comparison(x.value, t.value)')
								// TODO [general]: Do the above thing [InfiniteCounter wrapper influence removal] generally...

								// TODO: generalize this loop thing...
								while (
									!leftovers.comparison(pointerfor.value, this.value) &&
									!leftovers.comparison(pointerback.value, this.value)
								) {
									pointerfor = pointerfor.next()
									pointerback = pointerback.previous()
								}

								return leftovers.comparison(pointerfor, this)
							},
							difference(ic, leftovers = {}) {
								RESULT.ensureProperties(leftovers, {
									comparison: this.class.template.comparison,
									range: this.class.template.range,
									unfound: this.class.template.unfound
								})

								let current = this.class.class()
								// TODO: generalize with 'const propcall = (prop) => ((x) => x[prop]())'
								// ? If not created that 'alias' already...
								const next = ic.compare(this, leftovers)
									? (x) => x.previous()
									: (x) => x.next()
								// * Work on all the 'functions' and 'default args' stuff... Review the previously made todos, notes, do it...
								// TODO: above *;
								this.class.static.whileloop(
									infinite.deepCopy(this),
									ic,
									() => {
										current = next(current)
									},
									next,
									leftovers.comparison
								)
								return current
							},
							jumpDirection(ic, leftovers = {}) {
								RESULT.ensureProperties(leftovers, {
									comparison: this.class.template.comparison,
									range: this.class.template.range
								})
								const d = this.class.static.direction(ic)
								// ? Question: should one ever return 'this' like that??? Or should one instead do {...this} (or just 'RESULT.copy(this)', or some other copying-function?);
								// TODO [general] : pray consider this and other such small (a) detail(s) over any manner of a 'return' statement of any piece of code ;
								return d
									? this.jumpForward(ic, leftovers)
									: d === null
									? this
									: this.jumpBackward(ic, leftovers)
							},
							// TODO [general]: at a certain desired point, pray make some good and thorough work on the precise definitions for the template-structures for each and every templated thing...
							jump(x, jumping = (k) => k.next(), leftovers = {}) {
								RESULT.ensureProperties(leftovers, {
									comparison: this.class.template.comparison,
									range: this.class.template.range,
									counterclass: this.class
								})
								// TODO [general]: one don't like that 'function' style for elimination of 'const's and 'let's; Get rid of it; Make things pretty and simple again;
								// * Do not overdo that either, though; miss not the opportunities for generalizing/(bringing into the larger scope) something
								// What one means is:
								//		`const a = ...; f(a); c(a); ...` -> `((a) => {f(a); c(a); ...})(...)`
								// Really just replaces 'const' with these brackets and an arrow...
								if (!leftovers.range(x.value)) return this
								return this.class.static.forloop(
									{
										// TODO [general]: use the 'deepCopy' and 'dataCopy' at appropriate places... Work some on determining those...
										...infinite.deepCopy(this),
										class: this.this
									},
									infinite.InfiniteCounter(leftovers.counterclass)(),
									x,
									jumping,
									leftovers.comparison
								)
							},
							jumpForward(x, leftovers = {}) {
								RESULT.ensureProperties(leftovers, {
									comparison: this.class.template.comparison,
									range: this.class.template.range
								})
								return this.jump(x, (a) => a.next(), leftovers)
							},
							jumpBackward(x, leftovers = {}) {
								RESULT.ensureProperties(leftovers, {
									comparison: this.class.template.comparison,
									range: this.class.template.range
								})
								return this.jump(x, (k) => k.previous(), leftovers)
							},
							map(icClass = this.class, leftovers = {}) {
								RESULT.ensureProperties(leftovers, {
									comparison: this.class.template.comparison
								})
								let current = this.class.class()
								let alterCurrent = icClass.class()
								while (!leftovers.comparison(current, this))
									alterCurrent = alterCurrent.next()
								return alterCurrent
							},
							reverse() {
								const zero = this.class.class()
								// ? Maybe, add a local version of 'this.direction', defined as that thing for an InfiniteCounter 'this'?
								const dirfunc = (
									(p) => (x) =>
										x[p]
								)(this.class.static.direction(this) ? "previous" : "next")
								let a = this.class.class()
								let copy = RESULT.main.deepCopy(this)
								while (!this.class.template.comparison(zero, copy)) {
									copy = copy.previous()
									a = dirfunc(a)
								}
								return a
							}
						}
					}
				}

				// TODO [GENERAL]: that's how one does add a self-reference to the 'static' member of the class's object. Pray ensure that this is used and all the classes have their own 'static.this'
				A.static.this = A
				return A
			},

			MultiInfiniteCounter(template = {}) {
				// ? Question: does one really want just a SINGLE ONE comparison? One does have multiple generators...
				// * Perhaps, one would have multiple comparisons assigned to each and every one index of the array in question? [But, that'd require using the same manner of array-templates for them...]
				// ! Pray think and decide...
				return {
					template: {
						comparison: RESULT.main.valueCompre,
						...template
					},
					class: function (
						previous,
						index,
						generators = this.template.generators
					) {
						return {
							class: this,
							generators: generators,
							value: previous
								? this.generator(index)(previous.value)
								: this.generator(index)(),
							generator(index) {
								return this.generators.read(index)
							},
							next(index) {
								return this.generator(index)(this)
							},
							// TODO: pray consider the fate of all the other methods within the structure in question....
							// * What about '.compare()'? Because of greatness of variaty of manner of things possible within the structure in question, one would [if at all, that being] not have it the same way as it is within the InfiniteCounter!
							// One might do this by only choosing some one particular generator of the entire bunch; Or [more general], perhaps, creating some manner of way for the user to set the order by which to 'judge' the return value of the 'compare', with it serving as merely a wrapper for the essential part of the order in question???
							// * For '.jump()', one would require the 'ranges' + also the index of the generator that is to be used for the jump...
							// ! About the ranges: does one really want them to be an argument for this stuff??? [Perhaps, make them arguments for other things too, then???]
							// ^ Implementation of '.jump()';
							jump(x, index, ranges = this.class.template.ranges) {
								if (!ranges.read(index)(x.value)) return this
								// TODO: generalize the InfiniteCounter.jump(), then use the stuff here [essentially the same code]...
							}
							// * For '.map()'... What does one do about '.map()'???
							// * Due to the fact that there is not one single direction to continue in [and there is an infinite number of different permutations of operators...]
							// * There's no way to know generally how does one get from a certain thing 'x' to a 'y' using the Multi; Thus, CANNOT BE IMPLEMENTED TO BE THE SAME WAY...
							// ! However.... If one was to somehow remember the path taken [starting from the decided position...];
							// * One may as well do it...
							// ! Or better, make a general method which would accept a GeneralArray of indexes, that'd correspond to indexes of the 'this.generators';
							// * Then, one'd just iterate over the array in question, applying the '=.next(currindex)' to the chosen 'beginindex'!
							// ? Would this not better be off as a static method, though?
							// * CURRENT DECISION: yes!
							// TODO: work on the static methods for the class-like structures in question...
						}
					}
				}
			},

			// TODO [general]: polish [look for small issues and solve them] and tidy [make the thing as of itself look more liked by oneself]...
			LastIndexArray(template = {}) {
				const A = {
					template: {
						icclass: RESULT.submodules.infinite.InfiniteCounter(
							RESULT.submodules.infinite.numberCounter()
						),
						maxarrlen: RESULT.constants.MAX_ARRAY_LENGTH,
						filling: null,
						...template,
						bound: (i) => i < this.template.maxarrlen - 1,
						...template
					}
				}

				A.class = RESULT.main.GeneralArray({
					this: A,
					elem: function (
						arrobj,
						array = arrobj.array,
						pointer = false,
						beginningobj = array.currindex,
						beginningind = 0
					) {
						// TODO [general]: a very small thing - format the spaces between lines; group the lines that in a fashion that is by oneself desireable...
						const begin = arrobj.init()
						let currarr = array
						const original = arrobj.currindex
						array.currindex = beginningobj
						let isReturn = [false, undefined]
						let index = beginningind
						for (
							;
							!arrobj.this.class.template.icclass.template.comparison(
								begin,
								arrobj.currindex
							);
							arrobj.previous()
						) {
							const withinbounds = this.this.template.bound(index)

							if (!(index in currarr)) {
								isReturn[0] = true
								if (withinbounds) isReturn[1] = null
								break
							}

							if (withinbounds) {
								index++
								continue
							}

							currarr = currarr[index]
							index = 0
						}
						const returned = arrobj.currindex
						arrobj.currindex = original
						return isReturn[0]
							? pointer
								? [isReturn[1], currarr, index, returned]
								: undefined
							: !pointer
							? currarr[index]
							: [currarr, index]
					},
					newvalue: function (array, value) {
						let pointer = this.elem(array, undefined, true)
						while (!pointer[0]) {
							pointer[1][pointer[2]] = (
								pointer[0] === undefined ? (x) => [x] : RESULT.aliases.id
							)(this.this.template.filling)
							pointer = this.elem(
								array,
								pointer[1],
								true,
								pointer[3],
								pointer[2]
							)
						}
						return (pointer[0][ponter[1]] = value)
					},
					icclass: A.template.icclass
				})

				return A
			},
			// * This is the 'arr.length > MAXLENGTH -> arr = [arr] ELSE arr.push([recursively, until hitting the 'min-depth']) THEN arr.push(newvalue)'-kind of an array [the one that is very resourceful and with slowly growin layers...]
			// ! First deal with the related numberCounter/stringCounter-generalization-stuff (it's based off the exactly same recursive array structure-principle, but generalized...); Maybe they'll converge or something...
			DeepArray(template = {}) {
				// TODO: provide the template; [Think through that thing first, slightly; make a templated itself (same for the LastIndexArray)];
				return {
					template: {
						icclass: RESULT.submodules.infinite.numberCounter()
					},
					class: RESULT.submodules.infinite.GeneralArray({
						newvalue: function (array, value) {},
						elem(array) {},
						icclass: this.template.icclass
					})
				}
			},
			CommonArray(template = {}) {
				return {
					template: { offset: -1, ...template },
					class: RESULT.submodules.infinite.GeneralArray({
						newvalue: function (arr, value) {
							return (arr.array[arr.currindex] = value)
						},
						elem: function (arr) {
							return arr.array[arr.currindex]
						},
						icclass: RESULT.main.InfiniteCounter(
							RESULT.main.addnumber({
								start: this.template.offset
							})
						),
						...template
					})
				}
			},

			// ? [Olden - a todo] _TODO: let the InfiniteMap and UniversalMap have the capabilities of adding getters/setters (or better: create their natural extensions that would do it for them)
			// _? Question: store the pointer to the 'infinite' structure within the thing in question.
			InfiniteMap(template = {}) {
				return {
					template: { keyclass: template.valueclass, ...template },
					class: function (initial = {}) {
						const final = {
							this: {
								indexes: this.template.keyclass(),
								values: this.templates.valueclass(),
								// TODO: about the 'leftovers' concept's implementation:
								// * It ought to be used in such a manner as for to allow for greater diversity of functionality, that being - one ought to allow for 'leftoverss' [an array of 'leftovers' objects, which are (in accordance), used in appropriate places]
								get(index, leftovers = {}) {
									return this.this.this.values.read(
										this.this.this.indexes
											.firstIndex(index, leftovers)
											.map(
												this.this.this.values.this.this.this.this
													.class.template.icclass
											),
										leftovers
									)
								},
								set(index, value, leftovers = {}) {
									return this.this.this.values.write(
										this.this.this.indexes
											.firstIndex(index, leftovers)
											.map(
												this.this.this.values.this.this.this.this
													.class.template.icclass
											),
										value,
										leftovers
									)
								}
								// TODO: create a list of algorithms to go into the InfiniteMap, apart from the basic 'set' and 'get' (rely upon the GeneralArray's algorithms heavily...);
							}
						}
						final.this.this = final
						for (const key in initial) final.this.set(key, initial[key])
						return final
					}
				}
			},

			// ^ IDEA [for a decision for an implementation]: let it work like a GeneralArray-based String-Stack; So, instead of looking at lengths, all one really do is just check that the 'incoming' thing is a string;
			// That's for the addition of things into the UnlimitedString;
			// * When removing/replacing/deleting a thing from the string, however, one treats it as a whole instead, looking at each single bit of the string separately in a two-level loop;
			UnlimitedString(template = {}) {
				return {
					template: { empty: "", ...template },
					class(string = this.template.empty) {
						// ? What other methods does one desire within this one???
						// * Ideally, it ought to have all the possibilities of the GeneralArray;
						// ^ IDEA [for implementation of it]: just use these 'method-objects-definitions' thingies, to basically create a perfect wrapper, aside from a couple of methods like 'append', say...
						// ^ IDEA [for a generalization]: create a generalization of this particular instance of a 'wrapping' operation, define instead a class for creating a 'templated this.this.this-wrapper' for a class, with a further function defined for it...;
						// Implemented below...;
						const X = {
							this: {
								string: this.template.genarrclass.static.empty()
							}
						}
						X.this.this = X
						// TODO: fix this thing to include only the desired keys; Generalize this (the partial object-instantiation);
						for (const x of Object.keys(X.this.string))
							X.this[x] = function (...args) {
								return this.this.this.string[x](...args)
							}
						X.this.append(string)
						return X
					}
				}
			},

			// TODO: do some great generalizational work on this thing... [add 'leftovers'; same for the rest of this stuff...]; also, complete it properly... add all the desired stuff...
			// TODO [GENERALLY] : first, whenever working on some one thing, pray first just implement the rawest simplest version of it, then do the 'leftovers' and hardcore generalizations...
			TrueInteger(template = {}) {
				return {
					// * 'template' has the 'icclass';
					template: { ...template },
					class: function (v = this.template.icclass.class()) {
						return {
							class: this,
							value: v,
							// * Would return added value;
							add(added) {
								return TrueInteger(this.class.template)(
									this.value
										.jumpDirection(added.value.map(this.value.class))
										.map(this.class.template.icclass)
								)
							},
							// * Would return multiplied value
							multiply(multiplied) {
								return multiplied.class.static.forloop(
									this,
									multiplied.value.class.template.icclass.class(),
									multiplied,
									(x) => x.add(this)
								)
							},
							// * Raise 'this' to the integer power of 'x' (works with negatives too...);
							power(x) {
								if (!this.class.template.icclass.direction(x))
									return TrueRatio(this.template.icclass).class([
										this.class.template.icclass.class().next(),
										this.power(x.reverse())
									])
								return repeatedApplication(
									(y) => y.multiply(this),
									x,
									this
								)
							},
							// ? This thing could definitely be optimized... [Though, this appears to be far more 'clean' (in this context, equivalent of 'abstracted' and 'pure') as an algorithm... Think on it...]
							// * For starters, one could '.add()' instead of multiplying by an index + use a '.static.while()' method... Pray consder...
							modulo(divided) {
								let i = TrueInteger(this.value.class.template).class(
									this.value.class.template.icclass.class()
								)
								const d = TrueInteger(this.value.class.template).class(
									divided.map(this.value.class.template.icclas)
								)
								while (!d.multiply(i).value.compare(this.value))
									i.value = i.value.next()
								return d.multiply(i).value.difference(this.value)
							},
							// * Would return the additive inverse;
							invadd() {
								// TODO: generalize this operation as a '.static()' - let it be something like 'ICClass-reversal';
								const ICCLASS = this.class.template.icclass.template
								return this.value.map({
									generator(x) {
										if (x === undefined) return ICCLASS.generator()
										return ICCLASS.inverse(x)
									},
									inverse(x) {
										return ICCLASS.generator(x)
									},
									range(x) {
										return ICCLASS.range(x)
									}
								})
							},
							// * Would return a TrueRatio
							invmult() {
								return TrueRatio(this.class.template)(
									this.class.template.icclass.class(),
									this
								)
							}
						}
					}
				}
			},
			TrueRatio(template = {}) {
				const B = {
					// * 'template' has the 'icclass';
					template: { ...template },
					static: {
						simplify(ratio) {
							let x = RESULT.main.deepCopy(ratio)
							const l = RESULT.main.minfinite(ratio.value)
							for (
								let i = TrueInteger({
									icclass: this.this.template.icclass
								}).class();
								!i.compare(l);
								i.value = i.value.next()
							) {
								// ! generalize this thing in the condititon... [Basically, this is integer-division with rational output (non-simplified, possibly 'x: x.isWhole()');]
								while (
									TrueRatio()
										.class(
											x.value[0],
											this.this.template.icclass.class().next()
										)
										.multiply(TrueRatio().class(i.invmult()))
										.isWhole() &&
									TrueRatio()
										.class(
											x.value[1],
											this.this.template.icclass.class().next()
										)
										.multiply(TrueRatio().class(i.invmult()))
										.isWhole()
								) {
									x.value[0] = TrueRatio()
										.class(
											x.value[0],
											this.this.template.icclass.class().next()
										)
										.multiply(TrueRatio().class(i.invmult())).value[0]
									x.value[1] = TrueRatio()
										.class(
											x.value[1],
											this.this.template.icclass.class().next()
										)
										.multiply(TrueRatio().class(i.invmult())).value[0]
								}
							}
							return x
						}
					},
					class: function (numer, denom) {
						return {
							class: this,
							value: [numer, denom],
							add(addratio) {
								return this.class.simpilfy(
									TrueRatio().class(
										this.value[0]
											.multiply(addratio.value[1])
											.add(
												addratio.value[0].multiply(this.value[1])
											),
										this.value[1].multiply(addratio.value[1])
									)
								)
							},
							multiply(multratio) {
								return TrueRatio().class(
									this.value[0].multiply(multratio.value[0]),
									this.value[1].multiply(multratio.value[1])
								)
							},
							invadd() {
								return TrueRatio().class(
									this.value[0].invadd(),
									this.value[1]
								)
							},
							invmult() {
								return TrueRatio().class(...this.value.reverse())
							},
							isWhole() {
								return this.class.template.icclass.template.comparison(
									this.value[1],
									this.class.template.icclass.class().next()
								)
							}
						}
					}
				}
				B.static.this = B
				return B
			},
			InfiniteSum(template = {}) {
				return {
					template: { ...template },
					class: function (f = template.f) {
						return {
							f: f,
							// * Sums up to a given point 'point'; The 'template' has an index-'generator' in it... That's used for index-generation, and 'point' is of the same icounter-type...
							// uses 'f' for it...
							sum(point) {
								let added = TrueInteger(this.template.icclass).class()
								this.template.icclass.static.whileloop(
									this.template.icclass.class(),
									point,
									(i) => {
										added = added.add(this.f(i))
									}
								)
								return added
							},
							add(is) {
								return InfiniteSum(this.class.template).class((i) =>
									this.f(i).add(is.f(i))
								)
							}
							// ? Does one want to implement anything else for this thing???
						}
					}
				}
			},

			// ? QUESTION: about the UniversalMap... Does it remain under the '.main'? Or does it instead travel to the '.aliases.native'? Should it be replaced by the UnlimitedMap or turned into a distinctly named special case of it?
			UniversalMap: function (template = {}) {
				return {
					template: {
						// ! DECISION: the template properties that are by default 'undefined' still ARE PRESENT; because it allows for things like '.hasOwnProperty' to work in a greater accordance;
						notfound: undefined,
						treatUniversal: false,
						comparison: RESULT.main.valueCompares,
						...template
					},
					class: function (
						keys = [],
						values = [],
						treatUniversal = this.template.treatUniversal
					) {
						// * Conversion from a non-array object...
						if (!(keys instanceof Array)) {
							if (keys.keys && keys.values && treatUniversal) {
								values = values.values
								keys = keys.keys
							} else {
								keys = Object(keys)
								values = Object.values(keys)
								keys = Object.keys(keys)
							}
						}
						return {
							keys: keys,
							values: values,
							index: 0,
							class: this,
							get(key, number = 1) {
								const indexes = indexOfMult(
									this.keys,
									key,
									this.class.template.comparison
								)
								if (indexes.length === 0)
									return this.class.template.notfound
								return indexes.slice(0, number).map((i) => this.values[i])
							},
							set(key, value) {
								const index = indexOfMult(
									this.keys,
									key,
									this.class.template.comparison
								)
								if (index.length !== 0)
									for (const _index of index)
										this.values[_index] = value
								else {
									this.keys.push(key)
									this.values.push(value)
								}
								return value
							},
							// TODO: define the [Symbol.iterator] for all the types of all objects;
							// * Similarly, define 'forin'
							// ^ Funny, that reminds oneself:
							// Thorin
							// Fili
							// Kili
							// Oin
							// Gloin
							// Forin
							// Balin
							// Dwalin
							// Ori
							// Dori
							// Nori
							// Bifur
							// Bofur
							// Bombur
							// * Noticed anything different? :D
							// * hahaha!
							// ? Should it become for_in() or _for_in() or _forin() or forIn() or FOR_IN() or something else instead of 'forin'?
							[Symbol.iterator]: function* () {
								for (
									this.index = 0;
									this.index < this.keys.length;
									this.index++
								)
									yield this.get(this.keys[this.index])
							},
							forin(body) {
								for (
									this.index = 0;
									this.index < this.keys.length;
									this.index++
								)
									body(this.keys[this.index])
							},

							// TODO: create a method for checking if this kind of conversion is valid; 'isValidObject', for instance...
							toObject() {
								const a = {}
								for (let i = 0; i < this.keys.length; i++)
									a[
										(!["symbol", "number"].includes(
											typeof this.keys[i]
										)
											? JSON.stringify
											: RESULT.id)(this.keys[i])
									] = this.values[i]
								return a
							}
						}
					}
				}
			},

			// Utilizes the simple matter of fact that JS creates a "pointer" (the object reference) to a certain object implicitly, then using it to pass it...
			Pointer: function (template = {}) {
				return {
					template: { label: "", ...template },
					class: function (value) {
						return { [this.template.label]: value }
					}
				}
			},

			// TODO: extend this thing - create new algorithms implementations for the library...
			// ! Generalize this;
			algorithms: {
				BinarySearch(array, number) {
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
				},
				/**
				 * Runs the Farey Algorithm with given ratios and number of iterations. Returns the resulting array of ratios.
				 * @param {Ratio} startRatio Ratio, from which the Farey Algorithm should start.
				 * @param {Ratio} endRatio Ratio, that is used as an upper bound in the algorithm.
				 * @param {number} iterations Number of iterations (integer).
				 */
				Farey(startRatio, endRatio, iterations = 0) {
					// ? Add a 'fareyAddition' general function?
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
			},

			statistics: {
				// ! Problem: what to do with the 'statistics' part of the API? [CONSIDER, PRAY...]
				/**
				 * This class represents an assembly of various statistics on the array of numeric data given.
				 *
				 * Useful when needing a lot of info about data in one place.
				 */
				Statistics: class {
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
				},

				// TODO: look through this stuff; rename, refactor/shorten, generalize code where want to;
				/**
				 * This a class that contains various statistical tests.
				 * It is a static class, i.e. it is supposed to be like this:
				 * * Tests.testName();
				 */
				Tests: class {
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
						const biggerDispersionIndex =
							dispersions[0] > dispersions[1] ? 0 : 1
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
				},

				/**
				 * Takes the number array and rerturns an average of it.
				 * @param {number[]} nums An array of numbers passed to the function.
				 * @param {boolean} isTruncated A boolean saying does or does not the average will be truncated. By default false.
				 * @param {number} percents A number, that is used as a multiplier for two, when shortening the numeric array.
				 */
				average: function (nums = [], isTruncated = false, percents = 10) {
					return (function (newArr) {
						return floor(
							repeatedArithmetic(newArr, "+") /
								(nums.length + ((nums.length === newArr.length) - 1)),
							globalPrecision
						)
					})(isTruncated && percents > 0 ? truncate(nums, percents) : nums)
				},

				/**
				 * Takes an array of umbers and returns the smallest of thems.
				 * @param {number[]} nums An array of numbers passed to the function.
				 * @returns {number} The smallest number of the passed array.
				 */
				min: function (nums = []) {
					return arrApply(Math.min, nums)
				},

				/**
				 * Takes an array of numbers and returns the largest of them.
				 * @param {number[]} nums An array of numbers passed to the function.
				 * @returns {number} The largest number in passed numerical array.
				 */
				max: function (nums = []) {
					return arrApply(Math.max, nums)
				},

				/**
				 * Takes an array of numbers, which length can be odd or even and returns the median of it.
				 * @param {number[]} nums An array of numbers, passed to the function.
				 */
				median: function (nums = []) {
					return (function (sorted) {
						return (
							nums.length % 2 === 1
								? RESULT.id
								: (firstIndex) =>
										average([firstIndex, sorted[nums.length / 2]])
						)(sorted[Math.round(nums.length / 2) - 1])
					})(sort(nums))
				},

				// TODO: create a type definition for this '(a: any, b: any) => boolean' thing; Replace it everywhere in the codebase...
				// * The same way, pray name all the redundant (appearing more than once) types;
				/**
				 * Takes an array and returns most "popular" number in it.
				 * @param {number[]} elems An array of numbers passed to the function.
				 * @param {any} noneValue A value, returned if the array doesn't have a most popular number. String "None" by default.
				 */
				mostPopular: function (
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
				},

				leastPopular: function (
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
				},

				// TODO: make the range of truncation an argument too... Generalize...
				/**
				 * @param {number[]} nums An array of numbers passed to the function.
				 * @param {boolean} isInterquartile A boolean, representing shall the range to be gotten be interquartille or not. By deafault false.
				 * @returns the range of the numeric array (if passed [-5, 10] returns 15).
				 */
				range: function (nums = [], isInterquartile = false) {
					const newArr = isInterquartile ? truncate(nums, 25) : copy(nums)
					return floor(max(newArr) - min(newArr))
				},

				// TODO: what's below (star)...
				// * Make this thing into an object: let this be put under "bubble" (for bubble sort, if that's what this thing is...);
				/**
				 * Takes an array of numbers and returns sorted version of it.
				 * @param {number[]} nums An array of numbers, passed to the function to sort.
				 * @param {boolean} forward A boolean, on which value depends will the function sort an array from least to the largest or from largest to the least. By default true.
				 */
				sort: function (nums = [], forward = true) {
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
				},

				/**
				 * Takes a numeric array and a number and truncates the passed array, using the second paramater as a count of percents of numbers, that shall be deleted.
				 * @param {number[]} nums An array to be truncated.
				 * @param {number} percents A number, that is multiplied by two(if you passed 10, then it is 20) and represents count of percents of numbers to be deleted from the edges of the passed array.
				 */
				truncate: function (nums = [], percents = 10) {
					const shortened = sort(copy(nums))
					const toDelete = Number(
						Math.trunc((shortened.length / 100) * percents)
					)
					for (let i = 0; i < toDelete; i++) {
						shortened.shift()
						shortened.pop()
					}
					return shortened
				},

				/**
				 * Takes an a array(or a row, if you prefer) and returns an array of all deviations from its average.
				 * @param {number[]} row An array, in which deviations should be found.
				 * @param {boolean} isSquare A boolean, representing should or should not every found deviation be powered by two or else it shall be absolute. By default false.
				 * @param {boolean} isTruncated A boolean, representing, should or should not an array be truncated, during the process of searching for its average. By default false.
				 * @param {number} percents A number, representing count of percents of numbers, for which this array shall be truncated, while searching for its average. Pased value will be doubled. Works only if isTruncated equals true. By default 10.
				 */
				deviations: function (
					row,
					isSquare = false,
					isTruncated = false,
					percents = 10
				) {
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
				},

				/**
				 * Returns a dispersion of a numeric array(or a row, if you prefer). It can be of a population variance or a sample variance, depending on the second parameter.
				 * @param {number[]} row A numeric array, dispersion for which is to be found and returned.
				 * @param {boolean} isSquare A boolean, representing should or should not result of the deviations() function be found powering found deviations by two or not. If false(what is a default value), then instead of doing that it uses absolute values of found deviations.
				 * @param {boolean} isGeneral A boolean value representing whether or not the variance returned is either the population or the sample. By default true.
				 * @param {number[]} indexes A numeric array of indexes, using which, inside of a first argument needed values will be taken for a sample population(only if second parameter is false).
				 */
				dispersion: function (
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
				},

				/**
				 * Takes an array of numbers and returns (general or sample) standard deviation of it depending on the second parameter. (Indexes of sample, if it's a sample, are set using the last argument.)
				 * @param {number[]} row Row(or an array if you prefer) of numbers, (sample or population) standard deviation for which shall be found.
				 * @param {boolean} isPopulation A boolean, representing should function return the population standard deviation or sample standard deviation.
				 * @param {number[]} indexes An array of numbers, representing indexes of the sample, sample standard deviation deviation for which shall be found.
				 */
				standardDeviation: function (
					row = [],
					isPopulation = true,
					indexes = []
				) {
					return floor(
						Math.sqrt(dispersion(row, true, isPopulation, indexes)),
						globalPrecision
					)
				},

				/**
				 * Takes an array of numbers and returns the standard error of it.
				 * @param {number[]} row An array of numbers, standard error for which is to be found.
				 * @param {boolean} isDispersion A boolean, that characterizes, should it be dispersion, found through absolute values of diviations in the row or standard deviation(found common way). By default false(standard deviation is used).
				 * @param {boolean} isPopulation A boolean, representing should or not standart error be population(true) or sample(false). By default true.
				 * @param {number[]} indexes An array of numbers, representing indexes using which sample of the original row should be made. Works only if isPopulation equals true.
				 */
				standardError: function (
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
								exp(
									[dispersion(row, false), Math.sqrt(newArr.length)],
									"/"
								),
								globalPrecision
						  )
						: floor(
								exp(
									[standardDeviation(row), Math.sqrt(newArr.length)],
									"/"
								),
								globalPrecision
						  )
				},

				/**
				 * Takes a two-dimensional array, containing one dimensional number arrays and returns the number of degrees of freedom for all of them.
				 * @param {number[]} numRows Multiple one-dimensional arrays for which the degree of freedom is to be found.
				 */
				degreeOfFreedom: function (...numRows) {
					let lenSum = 0
					for (let i = 0; i < numRows.length; i++) lenSum += numRows[i].length
					return lenSum - numRows.length
				},

				/**
				 * Takes a numbers array and an array of probabilities for each of the given numbers to appear and returns expected value for them.
				 * @param {number[]} numbers A number array, expected value for which is to be found.
				 * @param {number[]} probabilities An array of probabilitiles for certain numbers from numbers array to appear.
				 */
				expectedValue: function (numbers, probabilities) {
					const values = []
					if (numbers.length > probabilities.length)
						throw new Error(
							"The length of probability array is smaller than the length of the numbers array. No possibility to compute the expectedValue."
						)
					for (let i = 0; i < numbers.length; i++)
						values.push(numbers[i] * probabilities[i])
					return floor(repeatedArithmetic(values.map(String), "+"))
				},

				// TODO: generalize to allow for arbitrary "random" function...
				/**
				 * Takes the max length of the random array, it's max value, the flag, characterizing whether numbers in it should be integers.
				 * @param {number} maxLength The largest count of numbers, that can appear in the random array. (It can be different from the given value).
				 * @param {number} maxValue The max value, that can be found in the randomly generated array.
				 * @param {boolean} integers The boolean flag, that represents whether all numbers in the array should be integers or not. By default false.
				 */
				randomArray: function (maxLength, maxValue, integers = false) {
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
			},

			// * This thing will allow to create function-based types on top of an Array;
			// Usage Example 1: use the 'typefunction' as a mean of identifying if the 'type' of the thing is right, with 'typefail' defined as a result of .newval(+typeconversion);
			// Usage Example 2: in 'typefail', throw an Exception, whilst in typefunction, do whatever it is one desires to do with the pre-checking of elements' properties;
			TypedArray(template = {}) {
				const C = {
					template: {
						empty: [],
						typefunction: RESULT.aliases._const(true),
						...template
					}
				}

				C.class = function (array = C.template.empty) {
					return GeneralArray({
						this: C,
						...C.template,
						newvalue: function (arr, val) {
							if (this.this.template.typefunction(val))
								return this.this.template.newval(arr, val)
							return this.this.template.typefail(arr, val)
						}
					}).class(array)
				}

				return C
			},

			// ! These 2 get 'poured out' into the 'main' field;
			methods: {
				// ^ DECISION: this library shall use 'undefined' as the defuault 'unknown' value; Pray represent within it correspondently...
				// * Let this agree with the way other of self's libraries agree with this -- achieve the synonymity of style...

				// TODO [general] : get rid of obsolete finite methods that are already in possession of generalizations across the entire library... Review the system carefully...
				// * Example of one such was the arrayEquality (or something like that...); compared an array of arrays with one another. Was planned for generalization; Now the 'valueCompare' does the exact same thing but on a broader types' set;

				// TODO: generalizes and then merge those with the array methods;
				// ! Next question is strucural - does one add the '.string' methods to the '.aliases.native' for this or not?
				// * ANSWER - yes, why not.
				// They'll either be:
				// 		1. references to the array methods...
				// 		2. conversion from-str-to-arr to which the corresponding method's been concatenated...

				// % LOCAL AGENDA: these two issues would get addressed in the order of original writing...

				// ? Make more 'public'? Consider deeply the general question of publicity of various methods in question...

				// ! Needs generalizational work [getting rid of unwanted repeats..., working heavily with naming conventions... yada yada yada]
				// * 1.
				// * Replaces at 1 index;
				// ! Generalize!
				replaceIndexesMult: function (arr = [], inds = [], values = []) {
					return repeatedApplication(
						(val, i) => replaceIndex(val, inds[i], values[i]),
						Math.min(inds.length, values.length),
						arr
					)
				},

				// * 2.
				// * Replace the first occurence of a given value within a string...
				stringReplaceFirst: function (string, x, y) {
					return stringReplaceIndexes(string, x, y)
				},
				// * replaces occurences of a value within a string at the given posiitons...
				// TODO: write a generalization for multiple values and index-positions...
				stringReplaceIndexes: function (string, x, y, indexes = [0]) {
					return string
						.split(x)
						.map((a, i) => [a, indexes.includes(i) ? y : x])
						.flat()
						.join("")
				},
				// * Replaces all occurences of 'x' with 'y';
				stringReplace: function (string, x, y) {
					return string.split(x).join(y)
				},
				// * Replaces all occurences of all 'a: a in x' with 'y[x.indexOf(a)]' for each and every such 'a';
				replaceStrMany: function (string, x, y) {
					// ! This thing ought to be generalized to a separate method...
					return repeatedApplication(
						(v, i) => stringReplace(v, x[i], y[i]),
						Math.min(x.length, y.length),
						string
					)
				}

				// * [For good memory...]: before replacing the old 'math-expressions.js' file, pray compare it to the current one [_ver10.js]
			},
			classes: {
				// ! Originally intended to extend GeneralVector, these things will now extend the TypedArray, because GeneralVector ended up being just a copypast of the GeneralArray; Fixed that. Now there's just a single one tidy templated wrapper instead.
				// * For this, one ought to consider more carefully the generalized 'number' API part of the library... [namely, the interface used for these things...];
				// ! Plus, these things get changed radically :
				// 	1. They now are far more configurable with user defaults...
				// 	2. The actual vector/matrix algorithms are __separate__ from the things that are the wrappers [the named functions], they also get their own space;
				// 	3. Fixes, fixes, fixes! [Fix the problems with the old code]:
				// 	4. Heavy aliases usage requested;

				// TODO: rewrite; finish...
				// * Current idea for a list of features:
				// * 1. All number-related methods and features;
				// * 2. Based on number-version of the Vector
				NumberVector: class extends RESULT.Vector {
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
						for (let i = 0; i < this._vector.length; i++)
							this._vector[i] *= scalar
					}
					scalarAdd(scalar) {
						for (let i = 0; i < this._vector.length; i++)
							this._vector[i] += scalar
					}
					// TODO: add vector addition...
				},
				// * Current idea for the list of features:
				// * 1. Arbitrarily shaped;
				// * 2. Full of numbers;
				// * 3. Can have user-defined operations for doing certain things with numbers;
				// TODO: finish work on the number-related matricies... Fix the errors... Adapt the old code...
				NumberMatrix: class extends RESULT.Vector {},
				// * Current idea for the list of features:
				// * 1. Only numbers ;
				// * 2. Number-related methods present (they are classically defined by default, can be re-defined by the user...);
				// * 3. Rectangular-shaped;
				RectNumberMatrix: class extends RESULT.NumberMatrix {
					matrixMultiply(matrix) {
						if (this.sidelen[0] !== matrix.sidelen[1])
							throw new Error(
								`Trying to multiply rectangular matrices with different values for width and height ${this.sidelen[0]} and ${matrix.sidelen[1]} correspondently. They must be equal.`
							)
						const copy = this.toArray()
						const matrixCopy = matrix.toArray()
						const result = copy.map(
							RESULT._const(matrixCopy[0].map(RESULT._const(0)))
						)
						for (let i = 0; i < this.sidelen[1]; i++)
							for (let j = 0; j < matrix.sidelen[0]; j++)
								for (let k = 0; k < this.sidelen[0]; k++)
									result[i][j] += copy[i][k] * matrix[k][j]
						return new RectMatrix(
							[matrix.sidelen[0], this.sidelen[1]],
							result
						)
					}
					// ! does one not want this to become a more generalized thing, like matrixOperator for example (one could attach this to op, then)?
					addMatrix(matrix) {
						// ! This should be thrown out, for user to implement...
						// * The library should have 2 different "kinds" matricies -- generalized generic ones and those for Numbers (based on the first ones);
						// * As an example: NumberRectMatrix and RectMatrix; NumberRectMatrix extends RectMatrix;
						if (!arrayEquality(matrix.sidelen, this.sidelen))
							throw new Error(
								"Trying to add matrices with different lengths. "
							)
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
				},
				// * Current idea for the list of features:
				// * 1. Only numbers ;
				// * 2. Number-related methods present (they are classically defined by default, can be re-defined by the user...);
				// * 3. Square-shaped;
				SquareNumberMatrix: class extends RESULT.RectNumberMatrix {
					/**
					 * Finds the determinant of a square matrix it's invoked onto.
					 */
					determinant() {
						function findAdditional(matrix, i, j) {
							const final = matrix.matrix
								.slice(1)
								.vector.map(RESULT._const([]))
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
							if (this.sidelen[0] === 1)
								return this.matrix.index(0).index(0)
							const matricesDeterminants = {}
							let n = 0
							let finale = 0
							for (let j = 0; j < this.sidelen[0]; j++)
								matricesDeterminants[this.navigate([0, j])] =
									findAdditional(this, 0, j)
							for (const pair in matricesDeterminants) {
								finale +=
									matricesDeterminants[pair] * Number(pair) * (-1) ** n
								n++
							}
							return finale
						}
						return (
							this.navigate([0, 0]) * this.navigate([1, 1]) -
							this.navigate([1, 0]) * this.navigate([0, 1])
						)
					}
				},

				// ! Rename this thing; it's pretty general (so not Polynomial, for instance), but it's not JUST an equation; it's one involving numbers
				// * CURRENT IDEA FOR A NAME: NumberEquation... Or NumericEquation... Or something...
				/**
				 * This class's purpose is to represent a mathematical equation of multiple variables.
				 * * Temporary note: for now it can be used only with simplest arithmetical operators (+, -, ^(exponentiation), /, *).
				 */
				Equation: class {
					/**
					 * A static method for parsing an equation with various mappings applied.
					 * @param {string} equationLine A line, containing an equation.
					 * @param {VarMapping} mappings A mapping of variables to their values.
					 * @param {string[]} variables Additional variable names.
					 */
					static ParseEquation(equationLine, origmappings, variables) {
						const operators = ["+", "*", "/", "-", "^"]
						const brackets = ["[", "]", "(", ")", "{", "}"]
						const digits = [
							"0",
							"1",
							"2",
							"3",
							"4",
							"5",
							"6",
							"7",
							"8",
							"9",
							"."
						]
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
												brackets.indexOf(line[i]) % 2 === 0
													? "("
													: ")"
											)
											continue
										}
										if (
											operators.includes(line[i]) ||
											digits.includes(line[i]) ||
											variables.includes(line[i])
										)
											continue
										throw new Error(
											`Unknown symbol detected: ${line[i]}`
										)
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
						return (
							string.substring(0, index) + val + string.substring(index + 1)
						)
					}
					/**
					 * Parses an equation, that it's invoked onto.
					 * @param {VarMapping} mappings Various mappings for variables.
					 */
					parse(mappings) {
						return Equation.ParseEquation(
							this.equation,
							mappings,
							this.variables
						)
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
								parsed.right = Equation.replaceIndex(
									parsed.right,
									i,
									varvalue
								)
						for (let i = 0; i < parsed.left.length; i++)
							if (parsed.left[i] === varname)
								parsed.left = Equation.replaceIndex(
									parsed.left,
									i,
									varvalue
								)
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
						const plugged = Equation.plug(
							this.parse(mappings),
							varname,
							varvalue
						)
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
					searchSolution(
						mappings,
						varname,
						startvalue,
						pathlength,
						precision = 4
					) {
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
					defaultSearchSolution(
						index,
						varname,
						startvalue,
						pathlength,
						precision
					) {
						const differences = generate(
							startvalue,
							startvalue + pathlength,
							floor(10 ** -precision, precision),
							precision
						).map((i) => {
							return Math.abs(
								this.defaultDifferRightLeft(index, varname, i)
							)
						})
						return (
							startvalue +
							differences.indexOf(min(differences)) *
								floor(10 ** -precision, precision)
						)
					}
				}
			},

			// ! Finish the todos + stuff listed in here, then 'pour out' the rest; Otherwise, finished [first ever sketch...]
			submodules: {
				infinite: {
					// TODO: create a MultiGeneralArray, which [in essence], behaves exactly like the GeneralArray, but is "based" on it (has 'the same' methods set and template...) and allows for an infinite (arbitrary) number of counters [uses the MultiInfiniteCounter alternative...]
					// TODO: think deeply on the matter of copying/referencing of 'class-template-static' objects within the instances objects... Review each and every method within each and every class, make it plausible to oneself, most general;

					// TODO: create a very general class of infinite arrays called DeepArray [most modifiable, works based on recursion];
					// ! [as a followup to the note about GeneralArray]; Then, the InfiniteArray would simply be the 'combiner class' [which contains all the algorithms, generalized, without reference to the actual inside-definitions...];

					// TODO: decide which particular definitions from the 'infinite' are to be defined post-createm for it...
					// What one meaans is 'const infinite = {.., def: ..., ....}' -> 'const infinite = {.., ....}; infinite.def = ...';s

					// TODO: also, add stuff for different numeral systems; create one's own, generalize to a class for their arbitrary creation...

					// TODO: add the circular counters (too, an infiniteCounter, just one that is looped);
					// * They are just special cases of InfiniteCounters; Based off array-orders [takes in an array and then loops over it...];

					// TODO: implement InfiniteString [the *truly* infinite one, that is...]
					InfiniteString() {},

					// TODO: pray create an actual InfiniteArray implementation [not that of 'UnlimitedArray' - term for special cases of GeneralArray];
					InfiniteArray() {}

					// ? question: does one want to go implementing the 'InfiniteNumber' as well? [As a special case of the GeneralArray, perhaps?]

					// * _ [OLD; re-assess later] TODO: implement -- depthOrder([[[0], [1], 2], 3, [[4, [5]]]]) := SomeInfiniteArrType([1,2,3,4,5])...
				}
			}
		},
		variables: {
			// ? Add more stuff here? (This table was originally supposed to be like a small calculator for binary things...)
			// TODO: change the architecture of these tables -- they should contain information concerning the Arity of the stuff that is within them...
			// * That is one's solution to the problem of the "all functions that work with them currently support only binary operations..., et cetera"
			// TODO: use this thing as the default for the functions using these kinds of tables...
			defaultTable: VARIABLE({
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
			}),

			/**
			 *
			 * * This variable characterizes how many fixed numbers are outputted.
			 * * You can change it freely using setPrecision() function, if you want a more "precise" output of some of the functions.
			 */
			// ? create various numeric constants within the library (besides, some of ones functions' definitions may use it;)...
			// ! Make this thing more useful - when using unlimited types, use it to the full extent...
			globalPrecision: VARIABLE(16),
			// TODO: create a function paramDecide(), that would wrap the function in question in the condition of certain kind, and if it is not fullfilled, call something else given instead...
			// TODO: create a derived function ensureParam(), that too would take a function, expected number of non-undefined args and a bunch of arguments (either an array of them, or directly -- just like that...); let it ensure that all the given arguments are non-undefined...; in case it is not so, call different given function;
			MAX_ARRAY_LENGTH: VARIABLE(2 ** 32 - 1),
			MAX_INT: VARIABLE(2 ** 53 - 1)
		}
	}

	// todo: generalize further with the stuff below - create a function for creating a new array from 'cuts coordinates' of another array;
	// ? Is one really happy with the way this is getting exported?
	// * Gorgeous. Just gorgeous...
	RESULT.aliases.native.string.UTF16 = (p, l) =>
		RESULT.main.generate(0, l).map((x) => RESULT.native.string.fcc(p + x))

	const UTF16 = RESULT.aliases.native.string.UTF16

	// TODO: generalize even further - using the alias for '(p) => (x) => x[p]' + ".concat" + the repeatedApplication...;
	const ccf = RESULT.aliases.property("concat")
	const coorarrs = [
		[97, 25],
		[65, 25]
	]
	// TODO: create the alias for mapping arrays to functions as arguments' lists...;
	// * alias sketch [alias-re-link pray...]: (f) => (a) => f(...a);
	RESULT.variables.defaultAlphabet = VARIABLE(
		ccf(UTF16(48, 9))(coorarrs.map((a) => UTF16(...a)))
	)

	// ? Does one want to keep this as this sort of an alias, pray?
	RESULT.variables.MAX_STRING_LENGTH = RESULT.variables.MAX_INT

	RESULT.aliases.string.strmethod = RESULT.aliases.function.wrapper({
		in: RESULT.aliases.string.stoa,
		out: RESULT.string.atos
	}).function

	/**
	 * * Returns the function returning the logical negation of the output of the function passed relative to the input of the newly passed argument;
	 *
	 * In short, performs logical negation of a function;
	 *
	 * DEFINITION:
	 *
	 * WIKI:
	 */
	// * in this case, rewrite this via a wrapper...
	RESULT.aliases.negate = RESULT.aliases.native.function.wrapper({
		out: RESULT.aliases.n
	}).function

	REUSLT.aliases.native.string.sreplaceIndex = RESULT.aliases.native.string.strmethod(
		RESULT.aliases.native.array.replaceIndex
	)

	// * Copies an object/array deeply...
	RESULT.main.deepCopy = RESULT.main.copyFunction({
		list: ["array", "object", "function", "symbol", "primitive"]
	})

	// * Keeps the functions references intact whilst copying...
	RESULT.main.dataCopy = RESULT.main.copyFunction({
		list: ["array", "object", "symbol"]
	})

	// * Does a flat copy of something;
	RESULT.main.flatCopy = RESULT.main.copyFunction({
		list: ["arrayFlat", "objectFlat", "function", "symbol"]
	})

	// TODO: rewrite the docs...
	// ! Start by deleting the old docs [those that are completely off what the thing in question is about now...]; the rest - pray rewrite [either on-the-spot, or a tad later...]
	// * Begin with small and simple stuff that's been mostly finished on conceptual level ; Things like copying functions, examplified...
	// ^ IDEA: let each and every in-editor documentation bit possess a link to the definition of the thing in question [in GitHub repo, for instance???], along with the similar link to the GitHub Wiki-s and a brief unique description of its purpose [along with using full spectre of JSDoc notation, perhaps???];
	// Wiki, then, would go into greater depths as to the purposes, possible uses, examples, definitions and technicalities of each and every abstraction in the question...
	// * The Aliases would have the information going more like 'REFER TO: ...' or something; Just refering to the information from a different definition [not as convinient within the editor, though];

	// TODO: create a function like (a: [key, value][]) => a.map(([key, value]) => [key, objInverse(value).toObject()]);
	// * Would come in handy in one of one's projects...

	// TODO: generalize further (f, obj, depth) => ... [would with depth 'depth', map 'f' to keys/values of an object...]

	// * Module Export
	return transformation(RESULT)
}

// * This is the [temporary] place in the file, where the presently considered OLD CODE goes;

// * A
// ! Old code for the [incomplete] definition of the 'numberCounter' [later used for the recursiveCounter]; The renewed code [in accordance with the general 'recursiveCounter' counter] is above;
// TODO: carefully revise, re-look, and do the stuff mentioned there that one desires for to; [Also, check correspondence with the newer version...]
// // TODO: when putting out into the higher scope [RESULT.submodules.infinite], pray generalize - not just these general array types and counters [these'd get used in this particular version...];
// // ? Keep these 2 as a part of 'submodules.infinite'?
// // * Decided: yes! Add them, here [when generalizing], pray replace with the general constructions for this stuff...
// const findDeepUnfilledNum = RESULT.submodules.infinite.generalSearch({
// 	genarrclass: RESULT.submodules.infinite.LastIndexArray({
// 		icclass: RESULT.submodules.infinite.InfiniteCounter(
// 			RESULT.submodules.infinite.arrayCounter()
// 		)
// 	}),
// 	soughtProp: (x) => typeof x === "number" && x < A.template.maxint
// }).function
// const findDeepUnfilledArr = RESULT.submodules.infinite.generalSearch({
// 	genarrclass: RESULT.submodules.infinite.LastIndexArray({
// 		icclass: RESULT.submodules.infinite.InfiniteCounter(
// 			RESULT.submodules.infinite.arrayCounter()
// 		)
// 	}),
// 	soughtProp: (x) =>
// 		x instanceof Array && x.length < A.template.maxarrlen,
// 	self: true
// }).function

// const findDeepLastNum = RESULT.submodules.infinite.generalSearch({
// 	genarrclass: RESULT.submodules.infinite.LastIndexArray({
// 		icclass: RESULT.submodules.infinite.InfiniteCounter(
// 			RESULT.submodules.infinite.arrayCounter()
// 		)
// 	}),
// 	soughtProp: (x) => typeof x === "number",
// 	reversed: true
// }).function

// ! OLD GENERAL NOTES [previously within the 'activate' function...]:

// ^ IDEA: class extensions;
// * These are just the same plain old classes, with the ability for user to arbitrarily extend them;
// * Everything - the defaults list, the methods list, can be changed, extended;
// todo: pray create a general structure for them and then re-do everything appropriate in a manner allowing for this particular kind of thing;
// ? Mayhaps, merge with the idea for inheritances-extensions of stuff like 'infinite'? [Been a todo there somewhere, pray find...]

// TODO: later, consider deeply the use of each and every type of abstraction/notation; Think through how things are affected by it...
// * Example: use of '() => {}' (arrow-functions), or 'function () {}' (plain anonymous functions); Or, use of 'class' or 'function'; Degree and cases of use of native JS 'this' variable...
//  And some such stuff... Pray consider

// TODO: work extensively on the general possibilities of each and every method/class within the library... make it possible to easily create most exotic manner of things with it...

// TODO [general]: change the stuff like 'function A (a) {return B({...sometemplatehere})(a)}' to 'const A = B({...sometemplatehere})'; In other words, use aliases for pre-computation of the values for things...

// todo [general]: ensure that all the defaults for ALL the [templated] functions configurable useing the 'templates'...

// TODO [general] : check the correspondence of use with the definition of the methods within the library...

// ! Clean-up later;
// [Parts of the Grand Cleanup]:
// % 1. (get rid of)/refactor the repeating notes;
// todo: work on the names for the objects in question [should this not be under the 'names' todo done before?]
// * That'd be the general structure of any templated method within the library...
// % 2. Notation/Conventions; [Currently - nigh the second biggest problem after not working code, one yet without a solution] Decide on notation and conventions - what should library use, where in particular;
// % 3. Generalization; Note completeion;
// * One completes all the notes, related to 'generalize'/'fix'/'complete', and so on... All the unfinished stuff that is separate of all else ['modular'], gets completed;
// % 4. Stuff related to forming the particular picture of the library in question...

// TODO: replace all the functional implementations of functions with imperative ones; for: 1. they may run forever; 2 [of which 1 is a consequence, really]. they do not rely on JS stack;
// * The functional ones get to be kept as a memento within the Git repo's memory...

// TODO [very-very general; later-stage]: Pray conduct a thorough read-through of all the code, once the in-editor documentation has been written and the first sketches has been written;
// * Also, note - base the new GitHub Wiki-documentation on the in-editor documentation...

// TODO [cleaning up]: create short-hands for things [where possible; stuff like 'this.this.this.this.class.template.class.template.icclass.comparison' don't get to be shortened (functional concerns)]...

// TODO: during the generalization procedures a lot of stuff have become terminally broken. Make another such "round" through the code, fixing anything that's broken due to generalizaiton [as always, probably won't fix all the cases, but some/most];

// TODO: think about errors - which, where, when and how to throw; What error messages, whether it could be generalized instead in a fashion that one would within one's chosen interpretation consider favorable, and on and on...

// TODO [general]: where appropriate, replace the native API usage with the library API usage...

// todo [general]: work on the lists of static methods for classes; Make implementation for them all...

// TODO: restore the old order of following within the library -- aliases, constants, classes, functions, one big export; Currently, it's a mess...
// TODO: compare the final '_ver10.mjs' file with the previous version 'math-expressions.js' file; make it a complete superset [if ever anything got completely thrown out - revive as a generalized version with an archaic special-case alias]

// TODO: work on the names a lot; make it sound plausible to oneself...
// TODO: work on the error messages...

// TODO: test this thouroughly [for every function, every class, check every possibility and write tests runnable by the user; run them, mr. flesh];
// TODO: add more default parameter values, make code look and be [whatever that for self would mean...] tidy and to one's complete liking...

// TODO: do micro-optimizations; Spend some time on making the code generally more performant [without sacrificing any of the style or shortness/simlicity of it, of course];

// TODO: read all the library's code all over and make it such as to be to one's liking -- utter and complete;
// * Get rid of unwanted explicit type conversions...
// * Get rid of unwanted "const"'s
// * Get rid of 'let's that can become 'const's [and one wants them to]
// * Get rid of 'const's that can become results of doing ((c1, ...) => {...[code]})(...arrOfPrevConsts);
// * Generalize the code [along with making it more compact], simplify constructs...

// * Make good use of stack; [Id est, try to save it; use elementary tools not relying upon it; This will allow to make better use of the methods, whose 'power/usefulness' relies upon the stack...]

// * Some general independant ideas to add to the project...
// ^ IDEA: perhaps, add a way of setting which methods should and which should not appear within a class???; thing like {[x: string]: [b: 0 | 1]}; if 0, delete, if 1 keep;

// TODO: after having finished most everything within the first prototype, pray create all manner of crazy beautiful ideas and scenarios of use to support for methods in question;
// * Generalize the stuff heavily; [ESPECIALLY] if the use of the methods/functions/classes/objects/structures/whatever in question within the library itself does not require it...

// todo: new things to add:
// * 1. more beautiful in their simplicity number-theoretic functions...;

// TODO: more things to do (generally; in a 'planned' order):
// * 1. Write the in-editor JSDoc documentation (most would, probably, be done from scratch...)...
// * 2. tidy up [round after round of read-through+change, with new notes and ideas, until one is happy enough to proceed further...] and, finally, test [implement the proper testing system for the user to have locally after having gotten the package...];

// TODO [general] : order things within the 'activate' function and the 'RESULT' definition in particularly;
// TODO [general] : pray fix all the names issues [take all the old names and replace them with new ones - same with the old methods definitions - renew, renew, renew!];
