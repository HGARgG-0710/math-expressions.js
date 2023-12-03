// * Various algorithms and data structure types implementations for the library that one considered potentially useful;

// TODO: extend this thing - create new algorithms implementations for the library...
// TODO: make the things more efficient, general, implement more algorithms;

// ! problem: in this instance - the usage of finite types;
// ? When shall it be the preference?
// * DECISION: yes, generalize them, then make the 'CommonArray'-kind of special cases; [Make such special cases for all of them...];

// * List of new abstract types interfaces to be implemented:
// ! First, however, 1.,3. require individual work on the 'Tree' and 4. may require some additional work on the Queue;
// 	% 1. Heap;
// * DECISION: This stays in 'algorithms';
// 	% 2. Graph?
// * Decision: part of 'algorithms';
//  % 3. N-ary tree (generalization of Binary Tree);
// * DECISION: this, unlike Tree, is not too general; It works by means of limiting the size of the GeneralArrays in question; This goes into 'algorithms'; Based off the more general 'types' counterpart;
// 	% 4. Prioritee queue?;
// ? maybe? [pray think on it...]; Only after having implemented the Queue;

import { EXTENSION } from "../macros.mjs"
import * as aliases from "./aliases.mjs"
import * as orders from "./orders.mjs"
import * as native from "./native.mjs"
import { classes } from "../refactor.mjs"

// ! Finish these two, pray [this is a sketch; further design assesment, generalization and work on arguments is needed]
export function Stack(parentclass) {
	return EXTENSION({
		defaults: { parentclass: parentclass, names: ["genarr"] },
		toextend: [],
		methods: {
			push(element) {
				return this.this.this.genarr.pushback(element)
			},
			pop: classes.pop,
			peek: classes.peek,
			copy: classes.copy
		},
		recursive: true
	})
}
export function Queue(parentclass) {
	return EXTENSION({
		defaults: { parentclass: parentclass, names: ["genarr"] },
		toextend: [],
		methods: {
			enqueue(element) {
				return this.this.this.genarr.pushfront(element)
			},
			dequeue: classes.pop,
			front: classes.peek,
			copy: classes.copy
		},
		recursive: true
	})
}

// ! Unfinished. Requires work with TrueRatio(s);
/**
 * Runs the Farey Algorithm with given ratios and number of iterations. Returns the resulting array of ratios.
 * @param {Ratio} startRatio Ratio, from which the Farey Algorithm should start.
 * @param {Ratio} endRatio Ratio, that is used as an upper bound in the algorithm.
 * @param {number} iterations Number of iterations (integer).
 */
export function Farey(startRatio, endRatio, iterations = 0) {
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
				gotten[i + 1].push(formNewRatio(gotten[i][j], gotten[i][j + 1]))
		}
	}
	return gotten
}

// ! Finish! [wanted: heap!, radix!];
// ! Check that the algorithms are implemented correctly and efficiently, when testing... [in particular, pay attention to the memory-efficiency... - get rid of undue copying];
// TODO: pray make sure that the usage of 'this.predicate' (or, to be more precise, the 'arguments')
// ^ About Radix Sort Implementation;
// 	* For one to be capable of arbitrary objects sorting using it, necessity arises for the implementation of a 'toAlphabet' function;
// 		% And while one __could__ leave it to the user to finish... One could also do it by oneself in the following fashion:
// 			1. Get the set of objects in question;
// 			2. Connect them using a manner of an InfiniteCounter class [namely, define a generator/inverse/range encomassing them and their connections] and get an order (.compare) based off it;
// 				* 2.1. The generator would be based off the GeneralArray that the user would give; [use the finiteCounter];
// 			3. Finally, use the 'numerics.polystring' with the alphabet given by the user;
// 			4. Using the order from 2., define the appropriate linear order function predicate (using the 'orders.linear');
// * So, the whole procedure really just comes down to transforming the objects in question into a defined set of alphabet-described strings! Only then, may the Radix Sort be implemented desireably...;
// ^ About Heap Sort Implementation:
// * First, one must implement the Heap itself:
// 		% A. Implement the conversion of the given GeneralArray's order to a different one so that the Heap may read it (in accordance with a class template property called 'heappred', or somesuch):
// 		% B. Apply the conversion onto the given GeneralArray, then read the thing IN ACCORDANCE WITH THE OTHER PROPERTIES OF THE HEAP:
// 			B.1. 'n' - the 'n', on which the 'n'-ary Tree, on which the Heap is based upon will be built [By default, equals to 2 in the appropriate InfiniteCounter class - the one used by the Tree-parent's GeneralArray 'parentclass' is used];
//	* Only then, may one finish the implementation of the thing in question...;
export const sort = {
	// ! Complete;
	bucket: TEMPLATE({
		defaults: {},
		function: function (garr = this.this.this.genarrclass.static.empty()) {
			// ! must be refactored [same as the thing in the 'sort.counting'];
			const k = this.template.hasOwnProperty("maxkey")
				? this.template.maxkey
				: orders.most({ comparison: this.template.predicate })(
						garr.copy((x) => this.template.predicate(x))
				  )
			const buckets = this.this.this.genarrclass
				.fromCounter(this.template.buckets)
				.map(garr.empty)

			// ! PROBLEM: what about the index-arithmetic? [IT'S PRESENT IN THE DEFINITION OF BUCKET SORT...]
			// * To finish this thing, one must first complete the 'TrueNumbers' (AGAIN, one runs into the necessity of finishing them first...); Probably going to do them soon, then...;
			for (const x of garr) {
				buckets.write()
			}
		}
	}),
	counting: TEMPLATE({
		defaults: {},
		function: function (garr = this.template.genarrclass.static.empty()) {
			// * note: it's FAR more efficient for the user to provide the '.maxkey' on their own instead of having to calculate it...;
			const k = this.template.hasOwnProperty("maxkey")
				? this.template.maxkey
				: orders.most({ comparison: this.template.predicate })(
						garr.copy((x) => this.template.predicate(x))
				  )
			const count = this.template.genarrclass.static
				.fromCounter(k.next())
				.map(aliases.function_const(k.class.init()))
			const output = garr.copy(aliases.function._const(aliases.udef))

			for (const x of garr) {
				const j = this.template.predicate(x).map(count.class.template.icclass)
				count.write(j, count.read(j).next())
			}

			for (let i = k.class.init().next(); !i.compare(k.next()); i = i.next()) {
				const j = i.map(count.class.template.icclass)
				count.write(j, count.read(j).jump(count.read(j.previous())))
			}

			for (let i = garr.finish(); i.compare(garr.init()); i = i.previous()) {
				const j = this.template
					.predicate(garr.read(i))
					.map(count.class.template.icclass)
				output.write(
					count.read(j).previous().map(ouput.class.template.icclass),
					garr.read(i)
				)
			}

			return output
		}
	}),
	quick: TEMPLATE({
		defaults: {},
		function: function (garr = this.template.genarrclass.static.empty()) {
			// ? DOES ONE WANT TO BE MAKING THESE MANNER OF MARKINGS ANYWHERE???
			// * Consider this small question in some detail...
			const ZERO = garr.init()
			const ONE = ZERO.next()
			const TWO = ONE.next()
			if (TWO.next().compare(garr.length().get())) {
				if (ONE.compare(garr.length().get())) return garr
				const X = () => {
					if (this.template.predicate(garr.read(ONE), garr.read()))
						garr.swap(ZERO, ONE)
				}
				X()
				if (TWO.compare(garr.length().get())) return garr
				if (this.template.predicate(garr.read(ONE), garr.read(TWO)))
					garr.swap(ONE, TWO)
				X()
				return garr
			}

			// ! future improvements - make the 'MIDDLE_ELEMENT' equal something more efficient...;
			const MIDDLE_ELEMENT = garr.read(garr.finish())
			return this.function(
				garr.copied("suchthat", [
					(x) => this.template.predicate(MIDDLE_ELEMENT, x)
				])
			)
				.pushback(MIDDLE_ELEMENT)
				.concat(
					this.function(
						garr.copied("suchthat", [
							(x) => this.template.predicate(x, MIDDLE_ELEMENT)
						])
					)
				)
		}
	}),
	insertion: TEMPLATE({
		defaults: {},
		function: function (garr = this.template.genarrclass.static.empty()) {
			garr = garr.copy()
			for (
				let i = garr.init().next();
				!i.compare(garr.length().get());
				i = i.next()
			) {
				for (let j = garr.init(); !j.compare(i); j = j.next()) {
					if (this.template.predicate(garr.read(i), garr.read(j))) continue
					garr.insert(garr.read(i), j)
					break
				}
			}
			return garr
		}
	}),
	bubble: TEMPLATE({
		defaults: {},
		function: function (garr = this.template.genarrclass.static.empty()) {
			garr = garr.copy()
			// ! use the 'lesser/greater' aliases A LOT...; The code uses them all over the place;
			// ! create corresponding finite versions of them (for >, >=, <, <=);
			for (let i = garr.init(); !i.compare(garr.length().get()); i = i.next())
				for (
					let j = garr.init();
					!j.compare(garr.length().get().jumpBackward(i));
					j = j.next()
				)
					if (!this.template.predicate(garr.read(i), garr.read(j)))
						garr.swap(i, j)
			return garr
		}
	}),
	selection: TEMPLATE({
		defaults: {},
		function: function (garr = this.template.genarrclass.static.empty()) {
			const listArr = garr.copy()
			const sorted = garr.empty()
			// ! alias this...
			const f = orders.most({ comparison: this.template.predicate })
			for (const _t of garr) {
				const extreme = f(listArr)
				sorted.pushback(extreme)
				listArr.delval(extreme)
			}
			return sorted
		}
	}),
	merge: TEMPLATE({
		defaults: {},
		function: function (array = this.template.genarrclass.static.empty()) {
			const CONSTOBJ = {}
			function split(a) {
				return a.copied("splitlen", [a.init().next()]).map((x) => [CONSTOBJ, x])
			}
			function merge(a) {
				if (a.init().compare(a.length().get())) return a.read()[1]
				const b = a.empty()
				a.loop()._full(
					(t) => {
						if (t.object().currindex.next().compare(t.length().get())) return
						const fn = t.object().read(t.object().currindex.next())[1]
						const ca = t.object().currelem[1]
						const newarr = t.object().empty()
						let fc = t.object().init(),
							sc = t.object().init()
						for (
							;
							!fc
								.jump(sc)
								.compare(
									t
										.object()
										.currelem.length()
										.get()
										.jump(fn.length().get())
								);

						) {
							let m = CONSTOBJ
							const firarrel = ca.read(fc)
							const secarrel = fn.read(sc)

							if (this.template.predicate(firarrel, secarrel)) {
								m = firarrel
								fc = fc.next()
							}
							if (m === CONSTOBJ) {
								m = secarrel
								sc = sc.next()
							}

							newarr.pushback(m)
						}
						b.pushback([CONSTOBJ, newarr])
					},
					aliases.function._const((x) => x.next().next())
				)
				return merge(b)
			}
			return merge(split(array))
		}
	})
	// todo: more sorting algorithms;
}

// ! work on that too... [make a list of algorithms...]
export const search = {
	binary: function (array, number) {
		// * For getting the middle index of the array.
		const middle = (arr) => floor(median(arr.map((_a, i) => i)), 0)
		const copyArray = Sort.bubble(array)
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
}

export const integer = {
	native: {
		// % This is the current agenda;
		// ? Suggestion - make a new module - 'integer' for generalization of these algorithms? Then, put those in there under 'native'? [This always fit into the module not quite well... ]

		/**
		 * Factors out a passed number to the prime numbers. Works quite quickly.
		 * @param {number} num Number, to be factored out.
		 * @returns {number[]} Prime factors array.
		 */
		factorOut: function (number = 1) {
			const factors = []
			for (
				let currDevisor = 2;
				number !== 1;
				currDevisor += 2 - (currDevisor === 2)
			) {
				while (number % currDevisor === 0) {
					factors.push(currDevisor)
					number /= currDevisor
				}
			}
			return factors
		},

		isPrime: function (x = 1) {
			return this.factorOut(x).length === 1
		},

		primesBefore: function (x = 1) {
			return native.number.generate(1, x).filter(this.isPrime)
		},

		multiples: TEMPLATE({
			defaults: {
				defrange: 1,
				includezero: false
			},
			function: function (n = 1, range = this.template.defrange) {
				return native.number
					.generate(this.template.includezero ? 0 : 1, range)
					.map((a) => a * n)
			}
		}),

		// TODO: extend to negative numbers, pray ('generate' supports this already)...
		multiplesBefore: function (n, x) {
			return multiples(n, native.number.floor(x / n))
		},

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
				return native.number.min(
					native.array.arrIntersections(
						multiples(nums[0], nums[1]),
						multiples(nums[1], nums[0])
					)
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
			return this.arrIntersections([this.multiples(nums[0], range[range.length - 1]), rest])
		},
		
		// ! continue later... too exhausted now...

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
						if (aliases.array.indexesOf().function(itered, copied).length) {
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
}
