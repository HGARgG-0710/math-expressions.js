// todo: work extensively on the precise list of aliases... Also, their names...

// ! Everything here ought to have a generalized version for the Infinite Types in the '.main' part of the library;
// TODO [general] : work on the spacing - all the definition lines must have a 1-spacing between each other [for readability]; The non-definition lines ('a:b' - pure aliases) ought to be 'grouped' without such a spacing;
export const native = {
	number: {
		numconvert: (x) => (isNaN(x) ? 0 : Number(x)),

		fromNumber: TEMPLATE({
			function(x = this.template.start) {
				return RESULT.main
					.InfiniteCounter(RESULT.main.addnumber(this.template))
					.class(x)
					.map(this.template.icclass)
			}
		}),

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

		// TODO: generalize this HEAVILY - instead of just numbers [as in addnumber], pray make it possible to do this thing with ANY generator -
		// * Id est, getting an array of [f(s), f(f(s)), f(f(f(s))), ...] and so on forever; Generalize to a GeneralArray (so that one could have arbitrarily long sequences of generators like so);
		// [Maybe] Keep this thing as a nice special case util of that new generalized version;
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
				(-1) ** step < 0 * (Number.isInteger(step) ? 1 : 10 ** -precision)
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
			// ! ALL OF THIS STUFF - convert to functions of 'True' number types and re-assign to corresponding parts of 'main'; Create functions that'd allow quick one-way conversion from the JS's native 'Number' to True number types;
			// Then, either:
			// % 1. make this stuff into aliases of those general versions;
			// % 2. keep as-is [for the sake of either: 2.1. nostalgia; 2.2. effeciency;]
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
			nbase: function (nstr, alphabet = defaultAlphabet) {
				return repeatedArithmetic(
					generate(0, nstr.length - 1).map(
						(i) => alphabet.indexOf(nstr[i]) * alphabet.length ** i
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
				return leastCommonMultiple(nums[0], leastCommonMultiple(...nums.slice(1)))
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
					typeof x === "number" || typeof x === "undefined" ? x : min(x))(
					commonDivisors(...nums)
				)
			},

			commonDivisors: function (...nums) {
				if (nums.length === 0) return undefined
				if (nums.length === 1) return nums[0]
				if (nums.length === 2)
					return arrIntersections([factorOut(nums[0]), factorOut(nums[1])])
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
				return repeatedArithmetic(allFactors(number).map(String), "+") === number
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
							if (
								RESULT.aliases.native.array
									.indexesOf()
									.function(itered, copied).length
							) {
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
		},

		// * Replace the first occurence of a given value within a string...
		sreplaceFirst: function (string, x, y) {
			return RESULT.aliases.native.string.sreplaceIndexes(string, x, y)
		}
	},

	array: {
		// * What about 'firstSuch' and 'lastSuch' instead??? Then, '_first' and '_last' would be just 'first' and 'last' correspondently...
		last: (arr, obj, comparison = valueCompare) => {
			return max(
				RESULT.aliases.native.array
					.indexesOf({ comparison: comparison })
					.function(arr, obj, comparison)
			)
		},
		first: (arr, obj, comparison = valueCompare) => {
			return min(
				RESULT.aliases.native.array
					.indexesOf({ comparison: comparison })
					.function(arr, obj, comparison)
			)
		},
		_last: (arr) => arr[arr.length - 1],
		_first: (arr) => arr[0],
		insert: (arr, index, values) =>
			arr.slice(0, index).concat(values).concat(arr.slice(index)),
		_insert: (arr, index, val) => insert(arr, index, [val]),
		remove: (arr, start, end) => arr.slice(0, start).concat(arr.slice(end + 1)),
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

		replaceIndex: function (arr, index, value) {
			return [...arr.slice(0, index), value, ...arr.slice(index + 1)]
		},

		// TODO: write a generalization for multiple values and index-positions...
		replaceIndexes: function (arr, x, y, indexes = [0]) {
			// TODO [here, and generally]: use the 'comparison' properly in 'aliases';
			return RESULT.aliases.native.array
				.splitArr(arr, x)
				.map((seg, i) => seg.concat(indexes.includes(i) ? y : x))
				.flat()
		},

		// * Replaces all occurences of 'x' with 'y';
		replace: function (arr, x, y) {
			return RESULT.aliases.native.array.replaceIndexes(
				arr,
				x,
				y,
				generate(1, arr.length)
			)
		},

		multArrsRepApp: TEMPLATE({
			function: function (x = this.template.default) {
				const args = Array.from(arguments).slice(1, this.template.n + 1)
				// TODO: generalize this construction somehow conviniently pray...
				const defobj = {}
				for (let i = arguments.length; i < this.template.n + 1; i++)
					defobj[i] = []
				ensureProperties(args, defobj)
				return repeatedApplication(
					(v, i) => this.template.f(v, ...args.map((x) => x[i])),
					Math.min(...args.map((a) => a.length)),
					x
				)
			},
			defaults: { n: 1, default: null }
		}),

		// ! CURRENT AGENDA: work on this, then hop back forth to the procedure of implementing the UnlimitedString;

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

		// TODO: RENAMAME to 'indexesOf' - far more understandable and general in the sense of naming conventions...;
		indexesOf: TEMPLATE({
			defaults: { comparison: RESULT.main.refCompare },
			function: function (array, el) {
				const indexes = []
				for (let i = 0; i < array.length; i++)
					if (this.template.comparison(array[i], el)) indexes.push(i)
				return indexes
			}
		}),

		// * clears all but the first `tokeep` repetition of `el`
		clearRepetitions: TEMPLATE({
			defaults: {
				tokeep: 0,
				comparison: RESULT.main.comparisons.refCompare
			},
			function: function (arr, el) {
				const firstMet = RESULT.aliases.native.array
					.indexesOf({ comparison: this.template.comparison })
					.function(arr, el)
				return arr.filter(
					(a, i) =>
						firstMet.indexOf(i) < tokeep || !this.template.comparison(a, el)
				)
			}
		}),

		// TODO: make the 'refCompare' a default comparison in cases like this (lonely utility methods);
		splitArr: function (arr, el, comparison = RESULT.aliases.refCompare) {
			const segments = []
			let begInd = 0
			let endInd = 0
			for (let i = 0; i < arr.length; i++)
				if (comparison(el, arr[i])) {
					begInd = endInd + (endInd > 0)
					endInd = i
					segments.push([begInd, endInd])
				}
			return segments.map((seg) => arr.slice(...seg))
		},

		// ? rewrite via repeatedApplication?
		// TODO [general]: decide where and for what to use methods 'f(...) {...}', where functions-properties 'f: function(...) {...}' and where arrow-function-parameters 'f: (...) => {...}';
		joinArrs(arrs = [], separator = null) {
			let final = []
			for (const arr of arrs) final = final.concat([...arr, separator])
			return final
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

		// TODO: later - use this and other such finite algorithms for the GeneralArray;
		arrIntersections: TEMPLATE({
			defaults: {
				comparison: RESULT.main.comparisons.refCompare,
				preferred: (a, b, c) => a
			},
			function: function (...arrs) {
				switch (arrs.length) {
					case 0:
						return []
					case 1:
						return arrs[1]
					case 2:
						const result = []
						for (let i = 0; i < arrs[0].length; i++) {
							for (let j = 0; j < arrs[1].length; j++) {
								if (
									this.template.comparison(arrs[0][i], arrs[1][j]) &&
									!RESULT.aliases.native.array
										.indexesOf({
											comparison: this.template.comparison
										})
										.function(result, arrs[0][i])
								)
									result.push(
										this.template.preferred(
											arrs[0][i],
											arrs[1][j],
											this.template.comparison
										)
									)
							}
						}
						return result
				}

				// TODO: use the 'this.function' recursion feature extensively... [semantically powerful, resourcefully efficient, beautifully looking - it has literally everything];
				return this.function(arrs[0], this.function(...arrs.slice(1)))
			}
		}),

		// * Counts all non-array elements within a multidimensional array passed... [recursively so]
		nonArrElems: function (array = []) {
			return array instanceof Array
				? repeatedArithmetic(array.map(nonArrElems), "+")
				: 1
		},

		// Counts all the elements within a multi-dimensional array (including the arrays themselves...)
		totalElems: function (array) {
			return array instanceof Array
				? array.length + repeatedArithmetic(array.map(totalElems), "+")
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
		isSubset: TEMPLATE({
			function: function (arrsub, arr = this.template.defarr) {
				for (const x of arrsub)
					if (!RESULT.max(arr.map((y) => this.template.comparison(x, y))))
						return false
				return true
			},
			defaults: {
				comparison: RESULT.main.valueCompare,
				defarr: []
			}
		}),

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
						? ((result = true), foundTimes++, foundIndexes.push(i))
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
		},

		// * For iteration over an array; this thing is index-free; handles them for the user;
		// * By taking different permutations of an array, one may cover all the possible ways of accessing a new element from a new one with this class;
		// ! This thing isn't infinite though. For infinite version, GeneralArray could be used instead...
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
			return fs[fs.length - 1](RESULT.compose(fs.slice(0, fs.length - 1)))
		},

		wrapper: TEMPLATE({
			function: function (f = this.template.deff) {
				return (x) => this.template.out(f(this.template.in(x)))
			},
			defaults: {
				in: RESULT.aliases.id,
				out: RESULT.aliases.id,
				deff: RESULT.aliases.id
			}
		}),

		// TODO: pray put this somewhere else [after ensuring it's generalized]...;
		expression: {
			// * Creates a function for execution of operations based on the given operations table...;
			op: TEMPLATE({
				function: function (
					operator = this.template.defop,
					objects = this.template.defobjs
				) {
					// ? Create some kind of a shortcut (alias) for this thing?
					return Object.values(this.template.optable)
						.map((x) => x[0])
						[Object.keys(this.template.optable).indexOf(operator)](...objects)
				},
				defaults: {
					defop: undefined,
					defobjs: [],
					optable: RESULT.variables.defaultTable.get
				}
			}),

			/**
			 * This class represents a mathematical arithmetic expression.
			 *
			 * It can also come in helpful when evaluating the same expression various number of times.
			 */
			Expression: TEMPLATE({
				function: function (
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
				},
				defaults: {
					optable: RESULT.variables.defaultTable.get
				}
			}),

			// Executes an expression;
			// ! INCOMPLETE - does not seem to work with expressions of the type 'a(b(p2, p3, p4), c(d(p), pdash), p1)', where a,b,c,d - are operators [in short - don't support multi-directed operators...];
			// * This must be fixed before proceeding with the NumberEquation...
			fullExp: TEMPLATE({
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
								exp({
									optable: this.template.optable
								}).function(
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
								double[1] + this.template.optable[operators[i]][1] - 1
							]
						},
						operators.length,
						[objects[0], 1]
					)[0]
				},
				defaults: {
					optable: RESULT.variables.defaultTable.get
				}
			}),

			// ? Consider refactoring [couldn't it be rewritten via fullExp];
			repeatExp: TEMPLATE({
				function: function (args, indexes, roperator, repetitions = 1) {
					return repeatedApplication(
						(r, i) => {
							let hasMet = false
							return RESULT.aliases.native.op(this.template).function(
								roperator,
								generate(0, this.optable[roperator][1] - 1).map((x) => {
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
				},
				defaults: {
					optable: RESULT.variables.defaultTable.get
				}
			}),

			repeatedOperation: TEMPLATE({
				function: function (
					operator,
					objects = [],
					indexes = objects.map(RESULT.aliases._const(0))
				) {
					return Expression(this.template)
						.class(objects, objects.map(RESULT._const(operator), indexes))
						.execute()
				},
				defaults: {
					optable: RESULT.variables.defaultTable.get
				}
			})
		}
	},

	object: {
		// ! PROBLEM [?is it though? - general]: decide what to do about the default values of functions in cases like these;
		ensureProperty: function (object, property, value = undefined) {
			if (!object.hasOwnProperty(property)) object[property] = value
		},
		// * A convinient general-version...
		ensureProperties: function (object, defaultobj) {
			for (const x in defaultobj) ensureProperty(object, x, defaultobj[x])
		},

		// ! PROBLEM [1]: won't work in the recursive case (exampli gratia: 'const a = {x : a}') [or, namely, will work indefinitely] - fix!
		subobjects(object = {}, prev = []) {
			let returned = []
			if (object instanceof Object && !prev.includes(object)) {
				for (const a in object)
					if (object[a] instanceof Object) {
						returned.push(object[a])
						prev.push(object)
						returned = returned.concat(this.subobjects(object[a], prev))
					}
			}
			return returned
		},
		subobjectsFlat(object = {}) {
			return Object.values(object)
				.filter((x) => x instanceof Object)
				.map((x) => object[Object.keys(object)[Object.values(object).indexOf(x)]])
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

		objInverse: TEMPLATE({
			function: function (obj, treatUniversal = this.template.treatUniversal) {
				return ((a) =>
					((universal) => a(universal.values, universal.keys))(
						a(obj, treatUniversal)
					))(UniversalMap(this.template.notfound))
			},
			defaults: {
				notfound: undefined,
				treatUniversal: false
			}
		}),

		// TODO: for all these things pray do add the infinite counterpart as well [still strong does it stay -- for EACH AND EVERY thing to be an infinite counterpart]...

		obj: OBJECT,

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
			return RESULT.main.valueCompare().function(...args.map(Object.keys))
		},

		// TODO: change this thing (recursiveIndexation and recusiveSetting): make 'fields' a far more complex and powerful argument -- let it be capable of taking the form [a:string,b:string,c:number, ...] with different (and different number of them too!) a,b and c, which would virtiually mean obj[a][b]...(c-2 more times here)[a][b], then proceeding as follows;
		// * This would allow for a more powerful use of the function generally and lesser memory-time consumption (also, add support for InfiniteCounters...; as everywhere else around this and other librarries)
		// * May be very useful in parsing of nested things. Used it once for an algorithm to traverse an arbitrary binary operator sequence within a parser...
		// TODO: extend this thing (add more stuff to it, create powerful extensions)
		// ! rewrite using the repeatedApplication...
		recursiveIndexation: function (object = {}, fields = []) {
			let res = object
			for (const f of fields) res = res[f]
			return res
		},

		recursiveSetting: function (object = {}, fields = [], value = null) {
			return (recursiveIndexation(object, fields.slice(0, fields.length - 1))[
				fields[fields.length - 1]
			] = value)
		}
	},

	boolean: {
		n: (x) => !x,
		t: true,
		f: false
	}
}

// * Identity map (just a nice piece of notation, that's all);
/**
 * * The identity map;
 *
 * DEFINITION:
 *
 * WIKI:
 */
export const id = ID

// TODO [general] : work very carefully on the precise list of the aliases for the 'main' functions... Ignore the stuff from previous versions; Clean up the unwanted ones...
// TODO [general] : perform hardcore alias-reusage ['alias-relinkage'] procedure, thus shortening and simplifying code using newly/previously introduced aliases...

export const bool = Boolean
export const str = String
export const num = Number
export const obj = Object
export const sym = Symbol
export const udef = undefined
export const set = Set
export const arr = Array
export const fn = Function
export const fun = Function
export const bi = BigInt

export const ustr = RESULT.main.types.UnlimitedString

// ! USE THIS ONE ESPECIALLY EXTENSIVELY...
export const property =
	(p) =>
	(x) =>
	(...args) =>
		x[p](...args)
export const trim =
	(n = 1) =>
	(x) =>
		x.slice(0, x.length - n)
export const paramDecide =
	(cond) =>
	(a = ID, b = ID) =>
	(...args) =>
		(cond() ? a : b)(...args)

export const is = {
	bool: (x) => x === true || x === false,
	str: (x) => typeof x === "string" || x instanceof String,
	num: (x) => typeof x === "number" || x instanceof Number,
	obj: (x) => typeof x === "object" && x instanceof Object,
	sym: (x) => typeof x === "symbol",
	udef: (x) => x === undefined,
	set: (x) => x instanceof Set,
	arr: (x) => x instanceof Array,
	fn: (x) => x instanceof Function,
	fun: (x) => typeof x === "function",
	bi: (x) => x instanceof BigInt
}
// ? [old todo - delete?]: create a derived function ensureParam(), that too would take a function, expected number of non-undefined args and a bunch of arguments (either an array of them, or directly -- just like that...); let it ensure that all the given arguments are non-undefined...; in case it is not so, call different given function;

// todo: generalize further with the stuff below - create a function for creating a new array from 'cuts coordinates' of another array;
// ? Is one really happy with the way this is getting exported?
// * Gorgeous. Just gorgeous...
native.string.UTF16 = (p, l) =>
	RESULT.main.generate(0, l).map((x) => RESULT.native.string.fcc(p + x))

native.string.strmethod = RESULT.aliases.function.wrapper({
	in: RESULT.aliases.string.stoa,
	out: RESULT.string.atos
}).function

native.string.sreplaceIndexes = RESULT.aliases.native.string.strmethod(
	RESULT.aliases.native.array.replaceIndexes
)

native.string.sreplace = RESULT.aliases.native.string.strmethod(
	RESULT.aliases.native.array.replace
)

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
export const negate = native.function.wrapper({
	out: RESULT.aliases.n
}).function

native.string.sreplaceIndex = RESULT.aliases.native.string.strmethod(
	RESULT.aliases.native.array.replaceIndex
)

// TODO: RELOOK THROUGH THESE ONES [the array methods for index-replacement procedures] especially carefully! There's probably a lot of repetition going on here...
// * 1.
// * Replaces at 1 index;
native.array.replaceIndexesMult = native.array.multArrsRepApp({
	n: 2,
	f: native.array.replaceIndex,
	default: []
}).function
native.string.sreplaceIndexesMult = native.string.strmethod(
	native.array.repalceIndexesMult
)

// * 2.
// * Replaces all occurences of all 'a: a in x' with 'y[x.indexOf(a)]' for each and every such 'a';
native.array.replaceMany = RESULT.aliases.native.array.multArrsRepApp({
	n: 2,
	f: native.array.replace,
	default: []
}).function
native.string.sreplaceMany = RESULT.aliases.native.string.strmethod(
	RESULT.aliases.native.array.replaceMany
)
