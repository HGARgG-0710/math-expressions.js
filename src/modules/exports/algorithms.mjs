// * Various algorithms and data structure types implementations for the library that one considered potentially useful;

// % Plan for removal of unwanted finite method instances:
// 		1. Create the general versions for each and every single one of them [generalizaion];
// 		2. Seek out those that are used in places of the library that are considered desired/essential, keep them. The rest - replace with 'finite()' call;

// * List of new abstract types interfaces to be implemented:
// 	% 1. Heap <- types.NTreeNode;
// * DECISION: this, unlike Tree, is not too general; It works by means of limiting the size of the GeneralArrays in question; This goes into 'algorithms'; Based off the more general 'types' counterpart;
// 	? 2. Prioritee queue? (generalized Qeueu);

import { TEMPLATE, EXTENSION } from "../macros.mjs"
import * as aliases from "./aliases.mjs"
import * as orders from "./orders.mjs"
import * as native from "./native.mjs"
import * as expressions from "./expressions.mjs"
import * as numeric from "./numeric.mjs"

import { classes, general } from "../refactor.mjs"
import { finiteCounter } from "./counters.mjs"
import { InfiniteCounter } from "./types.mjs"

// ? Add anything more to the Stack, and Queue? [These, basically, do the required job...]
export function Stack(parentclass = general.DEFAULT_GENARRCLASS) {
	return EXTENSION({
		defaults: { parentclass: parentclass, names: ["genarr"] },
		toextend: [],
		methods: {
			// ! work on such 'renamed' methods, pray; The possibilities for extension, currently, are, extremely narrow-cased;
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
export function Queue(parentclass = general.DEFAULT_GENARRCLASS) {
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

// Extends 'TreeNode';
export function NTreeNode(parentclass = general.DEFAULT_TREENODECLASS) {
	return EXTENSION({
		defaults: {
			parentclass: parentclass,
			names: ["treenode"]
		},
		methods: {
			// ! Make a list;
		},
		properties: {
			// ! Make a list;
		},
		recursive: true,
		// ! Decide this!
		toextend: []
	})
}

export function Graph(parentclass = general.DEFAULT_GENARRCLASS) {
	return EXTENSION({
		defaults: {
			parentclass: parentclass,
			names: ["verticies"],
			defaults: {
				constructor: [this.template.parentclass.static.empty],
				inter: function (args, i) {
					if (!i) return edges
					return args[0].copy((x, i) => Vertex(x, args[1].read(i)))
				}
			}
		},
		methods: {
			// * Methods list:
			// 1. getAdjacent(index); - returns the adjacent verticies to the 'verticies.read(index)';
			// 2. addvertex(value); - adds a new vertex with a given value 'value';
			// 3. addedge(indexfrom, indexto);
			// 4. computevertex(indexv, indexe); - adds the vertex value of 'indexv.edges.read(indexe)'
			// 5. write(index, value); - gives the value to a vertex at the index 'index';
			// 6. read(index); - returns the '.value' of the vertex at the index 'index';
			// 7. deledge(indv, inde); - deletes the edge ;
			// 8. delete(index); - deletes the vertex at the index 'index' and all the edges that connect with it...
			// ? 9. deledgeval(index, value) - deletes the edge of vertex at index 'index' by its value?
			// ^ NOTE: this class allows for infinitely large graphs (namely, those that use the recursive objects);
		},
		recursive: true
	})
}

// ? Generalize this - work on defaults, remake into a proper methodless class...
export const Vertex = (value, edges) => {
	return { value, edges }
}

// TODO: pray make sure of the universally chosen order of arguments throughout the library usage of 'this.template.predicate'; Generally, ensure such small things and standards;
// * So, the whole procedure really just comes down to transforming the objects in question into a defined set of alphabet-described strings! Only then, may the Radix Sort be implemented desireably...;
// ^ About Heap Sort Implementation:
// * First, one must implement the Heap itself:
// 		% A. Implement the conversion of the given GeneralArray's order to a different one so that the Heap may read it (in accordance with a class template property called 'heappred', or somesuch):
// 		% B. Apply the conversion onto the given GeneralArray, then read the thing IN ACCORDANCE WITH THE OTHER PROPERTIES OF THE HEAP:
// 			B.1. 'n' - the 'n', on which the 'n'-ary Tree, on which the Heap is based upon will be built [By default, equals to 2 in the appropriate InfiniteCounter class - the one used by the Tree-parent's GeneralArray 'parentclass' is used];
//	* Only then, may one finish the implementation of the thing in question...;
export const sort = {
	// ! PROBLEM [with the 'radix' sort] - in order for the thing to be [appropriately...] converted to a polystring, it must ALREADY be sorted [so, it HAS to be an InfiniteCounter... of sorts];
	radix: TEMPLATE({
		defaults: [
			function () {
				return {
					ustrclass: general.DEFAULT_USTRCLASS,
					genarrclass: general.DEFAULT_GENARRCLASS,
					tintclass: general.DEFAULT_TINTCLASS
				}
			},
			function () {
				return { alphabet: this.template.genarrclass.static.empty() }
			}
		],
		function: function (garr = this.template.genarrclass.static.empty()) {
			const polyconverted = garr
				.copy(this.template.tintclass.static.fromCounter)
				.map(numeric.toPolystring(this.template).function)
			const maxsize = numeric.sameLength(this.template).function(polyconverted)
			const toorder = (ordered, i) => this.template.alphabet
				.copy((l) => ordered.suchthat((y) => y.read(i) === l))
				.suchthat((x) => !x.isEmpty()).join()
			let ordered = polyconverted.copy()
			for (const x of maxsize) 
				ordered = toorder(ordered, x)
			return ordered
		},
		isthis: true
	}),
	// ! Complete;
	bucket: TEMPLATE({
		defaults: {
			genarrclass: general.DEFAULT_GENARRCLASS
		},
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
		defaults: {
			genarrclass: DEFAULT_GENARRCLASS
		},
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
		defaults: {
			genarrclass: DEFAULT_GENARRCLASS
		},
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
		defaults: {
			genarrclass: DEFAULT_GENARRCLASS
		},
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

// ! Finish! [alg list: metabinary? (maybe sometime later, after BinaryArray has been implemented...), fibonacci? (if doing that, add the number sequences to the library...)];
// ? Does one want the finite versions for those? [Current answer: nay]
export const search = {
	sentinel: TEMPLATE({
		defaults: { defelem: undefined, unfound: undefined },
		function: function (
			sought = this.template.defelem,
			garr = this.template.genarrclass.static.empty()
		) {
			const c = garr.copied("pushback", [sought])
			for (
				let i = garr.init();
				!this.template.comparison(c.read(i), sought);
				i = i.next()
			) {}
			return this.template.comparison(garr.length().get(), i)
				? this.template.unfound
				: i
		}
	}),
	exponential: TEMPLATE({
		// ! set the 'defaults' to have the 'factor' as '.fromNumber(2)' by default;
		defaults: {
			defelem: undefined
		},
		function: function (
			sought = this.template.defelem,
			garr = this.template.genarrclass.static.empty()
		) {
			let i = this.template.tintclass.class()
			let p
			for (
				;
				!i.value.compare(garr.length().get());
				p = i, i = i.multiply(this.template.factor)
			)
				if (this.predicate(garr.read(i), sought)) break
			return search
				.binary(this.template)
				.function(sought, garr.copied("slice", [p.value, i.value]))
		}
	}),
	interpolation: TEMPLATE({
		defaults: {
			defelem: undefined,
			comparison: comparisons.valueCompare,
			unfound: undefined
		},
		function: function (
			sought = this.template.defelem,
			garr = this.template.genarrclass.static.empty(),
			original = true
		) {
			const ZERO = this.template.tintclass.class()
			if (ZERO.compare(garr.length().get())) return this.template.unfound

			// ! Issue - with using the 'value' for the TrueInteger; Pray consider more carefully its design in regard to cases like these...;
			const initint = this.template.tintlclass.class(garr.init().value)
			const finishint = this.template.tintclass.class(garr.finish().value)

			const interpolated = initint.add(
				finishint
					.difference(initint)
					.divide(
						this.template
							.predicate(garr.read(finishint))
							.difference(this.template.predicate(garr.read()))
					)
					.multiply(this.template.predicate(sought).difference(garr.read()))
			)
			const inelem = garr.index(interpolated)
			if (this.template.comparison(inelem, sought)) return interpolated
			return (original ? (x) => x.value : ID)(
				interpolated.add(
					this.function(
						sought,
						garr.copied(
							"slice",
							this.template.predicate(inelem, sought)
								? [garr.init(), interpolated.previous()]
								: [interpolated.next()]
						),
						false
					)
				)
			)
		}
	}),
	jump: (() => {
		const FORBIDDEN = {}
		return TEMPLATE({
			defaults: { defelem: undefined },
			function: function (
				sought = this.template.defelem,
				garr = this.template.tenarrclass.static.empty()
			) {
				const sqrtlen = this.template.tintclass.class(garr.length().get()).root()
				let tempres = FORBIDDEN
				for (
					let i = this.tintclass.class();
					!i.compare(garr.length().get());
					i = i.add(sqrtlen)
				) {
					const curr = garr.read(i)
					// ! make an alias; (was requested already somewhere...);
					if (
						((x) =>
							this.template.predicate(x) || this.template.comparison(x))(
							curr,
							sought
						)
					) {
						tempres = i
						break
					}
				}
				if (tempres === FORBIDDEN) return this.template.unfound
				return search.linear(this.template)(
					garr.copied(
						"slice",
						[i.difference(sqrtlen), i].map((x) => x.value)
					)
				)
			}
		})
	})(),
	linear: TEMPLATE({
		defaults: { defelem: undefined, unfound: undefined },
		function: function (
			sought = this.template.defelem,
			garr = this.template.genarrclass.static.empty()
		) {
			for (const a of garr.keys())
				if (this.template.comparison(garr.read(a), sought)) return a
			return this.template.unfound
		}
	}),
	// ! Issue [potential]: the 'defaults' often are in need of having the ability to do things like 'default.x = this.template.genarrclass.class()'; However, the JS object notation does not, as of self permit that;
	// ? how about defaults orders? Conditional defaults?
	// ? Generalize? (can be generalized to an 'n-ary' search); Consider...
	binary: TEMPLATE({
		defaults: {
			defelem: undefined,
			comparison: comparisons.valueCompare,
			unfound: undefined
		},
		function: function (
			sought = this.template.defelem,
			garr = this.template.genarrclass.static.empty(),
			original = true
		) {
			const ZERO = this.template.tintclass.class
			if (ZERO().compare(garr.length().get())) return this.template.unfound
			const lenint = this.template.tintclass.class(garr.length().get().value)
			const ONE = ZERO().add
			const TWO = ONE().add
			const middleind = lenint.modulo(TWO).equal(ONE)
				? lenint.divide(TWO).add()
				: lenint.divide(TWO)
			const midelem = garr.index(middleind)
			if (this.template.comparison(midelem, sought)) return middleind
			return (original ? (x) => x.value : ID)(
				middleind.add(
					this.function(
						sought,
						garr.copied(
							"slice",
							this.template.predicate(midelem, sought)
								? [garr.init(), middleind.previous()]
								: [middleind.next()]
						),
						false
					)
				)
			)
		}
	})
}

// ! generalize too;
export const integer = {
	native: {
		factorOut: function (number = 1) {
			const factors = []
			for (
				let currDivisor = 2;
				number !== 1;
				currDivisor += 2 - (currDivisor === 2)
			) {
				while (number % currDivisor === 0) {
					factors.push(currDivisor)
					number /= currDivisor
				}
			}
			return factors
		},

		isPrime: function (x = 1) {
			return this.factorOut(x).length === 1
		},

		primesBefore: function (x = 1) {
			return native.number.generate(x).filter(this.isPrime)
		},

		multiples: TEMPLATE({
			defaults: {
				defrange: 1,
				includezero: false,
				step: 1
			},
			function: function (n = 1, range = this.template.defrange) {
				return array.native
					.generate(
						this.template.includezero ? 0 : 1,
						range,
						this.template.step * (-1) ** (range > 0 || n > 0)
					)
					.map((a) => a * n)
			}
		}),

		multiplesBefore: TEMPLATE({
			defaults: {
				defrange: 1
			},
			function: function (n = 1, x = this.template.defrange) {
				return multiples(n, native.number.floor(x / n))
			}
		}),

		// * lcm stands for least-common-multiple;
		lcm: function (...nums) {
			return native.number.min(this.commonMultiples(...nums))
		},
		// * lcd stands for 'least common divisor';
		lcd: function (...nums) {
			return native.number.min(this.commonDivisors(...nums))
		},

		areCoprime: function (...args) {
			return !!this.commonDivisors(...args).length
		},

		allFactors: function (number = 1) {
			const factors = [1]
			const l = number / 2
			for (let currFactor = 2; currFactor <= l; currFactor++)
				if (number % currFactor === 0) factors.push(currFactor)
			return factors
		},

		isPerfect: function (number = 1) {
			return (
				expressions
					.evaluate()
					.function(
						expressions.Expression("+", [], this.allFactors(number))
					) === number
			)
		},

		factorial: function (number = 0) {
			const numbers = [1]

			if (number < 0)
				throw new RangeError(
					"factorial() library function only accepts values >= 0"
				)

			for (let i = 1; i <= number; i++) numbers.push(i)
			return expressions
				.evaluate()
				.function(expressions.Expression("*", [], numbers))
		},

		// ! Currently stopped the generalization of the 'algorithms.integer' here;

		// * Re-look through this;
		// Finds for some 'k' an array of all representations 'a = [a1, ..., an]', such that: a1+...+an with given minimum value 'al>=minval', for all n>=l>=1; (without the 'minval', the set is infinite due to the fact that Z is an abelian group over +);
		sumRepresentations: function (n, m, minval = 1) {
			// ? generalize this as well... [either use this or do stuff related to the finite natural power-series arrays + ]
			const itered = generate(minval, n).map((x) =>
				generate(minval, m).map((v, i) => (i == 0 ? x : minval))
			)

			while (itered.length < n ** m)
				for (let i = 0; i < itered.length; i++) {
					const copied = native.copy.flatCopy(itered[i])
					for (let j = 0; j < m; j++) {
						copied[j]++
						if (native.array.indexesOf().function(itered, copied).length) {
							copied[j]--
							continue
						}
						itered.push(copied)
					}
				}

			return itered.filter(
				(x) =>
					expressions.evaluate().function(expressions.Expression("+", [], x)) ==
					n
			)
		},

		binomial: function (n, k) {
			if (isNaN(n) || isNaN(k))
				throw new RangeError(
					"binomial() function only accepts values that are natively convertible to Number"
				)

			n = Number(n)
			k = Number(k) | 0
			return (
				expressions.evaluate()(
					expressions.Expression(
						"*",
						[],
						native.number.generate(0, k - 1, 1).map((num) => n - num)
					)
				) / this.factorial(k)
			)
		}
	},

	factorOut: TEMPLATE({
		defaults: {},
		function: function (tint = this.template.tintclass.class()) {
			const tintc = tint.copy()
			const factors = this.template.genarrclass.class()
			const [ZERO, ONE, TWO] = [0, 1, 2].map(tint.class.static.fromNumber)
			for (
				let currDivisor = tint.class.static.fromNumber(2);
				!ONE.compare(tintc);
				currDivisor = currDivisor.add(
					TWO.difference(currDivisor.equal(TWO) ? ONE : ZERO)
				)
			) {
				while (number % currDivisor === 0) {
					factors.pushback(currDivisor)
					tintc = tintc.divide(currDivisor)
				}
			}
			return factors
		}
	}),

	isPrime: TEMPLATE({
		defaults: {},
		function: function (x) {
			return this.template.genarrclass.class.template.icclass
				.class()
				.next()
				.compare(number.factorOut(this.template)(x).length().get())
		}
	}),

	primesBefore: TEMPLATE({
		defaults: {},
		function: function (x = this.template.icclass.class()) {
			return array.generate(this.template)(x).suchthat(number.isPrime)
		}
	}),

	multiples: TEMPLATE({
		default: { includezero: false },
		function: function (
			n = this.template.tintclass.class().add(),
			range = this.template.tintclass.class().add()
		) {
			return array
				.generate()(
					(this.template.includezero ? ID : aliases.next)(n.class.class())
						.value,
					range.value,
					this.template.step
				)
				.map((a) => this.template.tintclass(a.value).multiply(n))
		}
	}),

	multiplesBefore: TEMPLATE({
		defaults: {},
		function: function (
			n = this.template.tintclass.class().add(),
			x = this.template.tintclass.class().add()
		) {
			return number.multiples(n, x.divide(n))
		}
	}),

	commonDivisors: TEMPLATE({
		defaults: {},
		function: function (...tints) {
			return array
				.common({ f: integer.factorOut, ...this.template })
				.function(tints)
		}
	}),

	commonMultiples: TEMPLATE({
		defaults: {},
		function: function (...nums) {
			return array
				.common({ f: (x) => integer.native.multiples(x, this.template.range) })
				.function(nums)
		}
	}),

	lcm: TEMPLATE({
		defaults: {},
		function: function (...nums) {
			return orders.min(this.template).function(integer.commonMultiples(...nums))
		}
	}),

	lcd: TEMPLATE({
		defaults: {},
		function: function (...nums) {
			return orders
				.min(this.template)
				.function(integer.commonDivisors(this.template)(...nums))
		}
	}),

	areCoprime: TEMPLATE({
		defaults: {},
		function: function (...tints) {
			return this.template.genarrclass.static
				.empty()
				.length()
				.get()
				.compare(
					integer.commonDivisors(this.template).function(tints).length().get()
				)
		}
	}),

	allFactors: TEMPLATE({
		defaults: {},
		function: function (number = this.template.tintclass.class()) {
			// ! These reappear throughout the code extremely often; Pray do something in this regard...
			const ZERO = () => this.template.tintclass()
			const ONE = () => ZERO().add()
			const TWO = () => ONE().add()

			const z = ZERO()
			const o = ONE()

			const factors = [o]
			const l = number.divide(TWO())
			for (let currFactor = TWO(); l.compare(currFactor); currFactor.add())
				if (number.modulo(currFactor).equal(z)) factors.push(currFactor)
			return factors
		}
	}),

	isPerfect: TEMPLATE({
		defaults: {},
		function: function (number = this.template.tintclass.class()) {
			return expressions
				.uevaluate()
				.function(
					expressions.Expression(
						"+",
						[],
						integer.allFactors(this.template)(number)
					)
				)
				.equal(number)
		}
	}),

	factorial: TEMPLATE({
		defaults: {},
		function: function (tint = this.template.tintclass.class()) {
			const numbers = this.template.genarrclass.static.fromArray([
				this.template.tintclass.class().add()
			])

			if (!tint.compare(this.template.tintclass.class()))
				throw new RangeError(
					"factorial() library function only accepts non-negative values"
				)

			for (
				let i = this.template.tintclass.class().add();
				tint.compare(i);
				i = i.add()
			)
				numbers.pushback(i)

			return expressions
				.uevaluate()
				.function(expressions.Expression("*", [], numbers))
		}
	})
}

integer.native.commonDivisors = function (...nums) {
	return array.common({ f: integer.native.factorOut }).function(nums)
}

integer.native.commonMultiples = TEMPLATE({
	defaults: { range: 100 },
	function: function (...nums) {
		return array
			.common({ f: (x) => integer.native.multiples(x, this.template.range) })
			.function(nums)
	}
})

export const array = {
	native: {
		intersection: TEMPLATE({
			defaults: {
				comparison: comparisons.refCompare,
				preferred: (fel, sel, comp, farr, sarr) => fel
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
									!array
										.indexesOf({
											comparison: this.template.comparison
										})
										.function(result, arrs[0][i])
								)
									result.push(
										this.template.preferred(
											arrs[0][i],
											arrs[1][j],
											this.template.comparison,
											...arrs
										)
									)
							}
						}
						return result
				}

				// TODO [general]: use the 'this.function' recursion feature extensively... [semantically powerful, resourcefully efficient, beautifully looking - it has literally everything];
				return this.function(arrs[0], this.function(...arrs.slice(1)))
			}
		}),

		// * Note: one could implement the 'factorial(n)' for integers as "permutations(generate(n)).length";
		// ! Think on that - which of the two would be quicker;
		permutations: function (array = []) {
			if (array.length < 2) return [[...array]]

			const pprev = this.permutations(array.slice(0, array.length - 1))
			const l = array[array.length - 1]
			const pnext = []

			for (let i = 0; i < array.length; i++)
				for (let j = 0; j < pprev[i].length; j++)
					pnext.push(aliases.native.array.insert(pprev[i], j, [l]))

			return pnext
		},

		indexesOf: TEMPLATE({
			defaults: { comparison: comparisons.refCompare, defha: Infinity },
			function: function (array, el, haltAfter = this.template.defha) {
				const indexes = []
				for (let i = 0; i < array.length && indexes.length < haltAfter; i++)
					if (this.template.comparison(array[i], el)) indexes.push(i)
				return indexes
			}
		}),

		// * clears all but the first `tokeep` repetition of `el`
		norepetitions: TEMPLATE({
			defaults: {
				tokeep: 0,
				comparison: comparisons.refCompare
			},
			function: function (arr, el, tokeep = this.template.tokeep) {
				const firstMet = array.native
					.indexesOf({ comparison: this.template.comparison })
					.function(arr, el)
				return arr.filter(
					(a, i) =>
						firstMet.indexOf(i) < tokeep || !this.template.comparison(a, el)
				)
			}
		}),

		split: TEMPLATE({
			defaults: {
				comparison: comparisons.refCompare
			},
			function: function (arr, el) {
				const segments = []
				let begInd = 0
				let endInd = 0
				for (let i = 0; i < arr.length; i++)
					if (this.template.comparison(el, arr[i])) {
						begInd = endInd + (endInd > 0)
						endInd = i
						segments.push([begInd, endInd])
					}
				return segments.map((seg) => arr.slice(...seg))
			}
		}),

		isSub: TEMPLATE({
			defaults: {
				comparison: comparisons.valueCompare,
				defarr: []
			},
			function: function (arrsub, arr = this.template.defarr) {
				for (const x of arrsub)
					if (!arr.any((y) => this.template.comparison(x, y))) return false
				return true
			}
		}),

		join: TEMPLATE({
			defaults: { separators: [null] },
			function: function (arrs = [], separators = this.template.separators) {
				return multidim.native.repeatedApplication([], arrs.length, (x, i) =>
					x.concat([...arrs[i], ...separators])
				)
			}
		}),

		generate: function (start, end, step = 1, precision = 1) {
			// ! perform this operation throughout the package's code;
			if (arguments.length === 1) {
				end = start
				start = 1
			}
			const generated = []
			const upper =
				end + (-1) ** step < 0 * (Number.isInteger(step) ? 1 : 10 ** -precision)
			const proposition = step > 0 ? (i) => i < upper : (i) => i > upper
			for (let i = start; proposition(i); i += step)
				generated.push(this.floor(i, precision))
			return generated
		}
	},
	intersection: TEMPLATE({
		defaults: {
			comparison: comparisons.valueCompare,
			preferred: (fel, sel, comp, farr, sarr) => fel
		},
		function: function (...arrs) {
			if (!arrs.length) return this.template.genarrclass.empty()
			if (arrs.length == 1) return arrs[0]
			if (arrs.length == 2) {
				const inter = this.template.genarrclass.class()
				// ? Q: Does one want to provide indexes at which the elements have been met as well?
				for (const x of arrs[0])
					for (const y of arrs[1])
						if (this.template.comparison(x, y))
							inter.pushback(
								this.template.preferred(x, y, comparison, ...arrs)
							)
				return inter
			}
			return this.function(arrs[0], this.function(arrs.slice(1)))
		}
	}),
	permutations: TEMPLATE({
		defaults: {},
		// ? In cases such as these (when there are 2 or more ways of doing exactly the same thing) - ought '.static.empty()' or '.class()' be called?
		function: function (array = this.template.genarrclass.static.empty()) {
			if (array.init().next().compare(array.length().get()))
				return this.template.genarrclass.fromArray([array.copy()])

			const pprev = this.function(
				array.copied("slice", array.init(), array.finish().previous())
			)
			const l = array.end(false)
			const pnext = this.template.genarrclass.static.empty()

			for (const i of array.keys())
				for (const j of pprev.read(i).keys())
					pnext.pushback(pprev.copied("insert", [j, l]))

			return pnext
		}
	}),
	indexesOf: TEMPLATE({
		defaults: {
			unfound: undefined,
			comparison: comparisons.valueCompare,
			halt: false,
			haltAfter: Infinity
		},
		function: function (
			arr,
			el,
			halt = this.template.halt,
			haltAfter = this.template.haltAfter
		) {
			return general.fix([arr.this.this], ["currindex"], () => {
				const inds = this.empty()
				const cond = halt
					? (inds, _this) => {
							return inds
								.length()
								.get()
								.compare(
									haltAfter.map(
										_this.this.this.this.class.template.icclass
									)
								)
					  }
					: aliases.TRUTH
				let currind
				while (currind !== leftovers.unfound && !cond(inds, this)) {
					currind = search.linear(this.template).function(el, arr)
					inds.pushback(currind)
				}
				return inds
			})
		}
	}),
	norepetitions: TEMPLATE({
		defaults: { comparison: comparisons.valueCompare, copy: false },
		function: function (arr, el, tokeep = this.template.tokeep) {
			const firstMet = array.indexesOf(this.template).function(arr, el)
			const pred = (a, i) =>
				!firstMet.firstIndex(i).map(tokeep.class).compare(tokeep) ||
				!this.template.comparison(a, el)
			return (
				this.template.copy
					? (x) => x.copied("suchthat", [pred])
					: (x) => x.suchthat(pred)
			)(arr)
		}
	}),
	isSub: TEMPLATE({
		// ! Refactor also the usage of the 'defaults' like here - give the commonly appearing objects names and then, copy them each time {...DefaultsName};
		defaults: {
			comparison: comparisons.valueCompare
		},
		function: function (arrsub, arr = this.template.genarrclass.static.empty()) {
			for (const x of arrsub)
				if (!arr.any((y) => this.template.comparison(x, y))) return false
			return true
		}
	}),
	join: TEMPLATE({
		defaults: {},
		function: function (
			arrs = this.template.genarrclass.static.empty(),
			separators = this.template.separators
		) {
			return multidim.repeatedApplication(
				this.template.genarrclass.static.empty(),
				arrs.length().get(),
				(x, i) => x.concat(arrs.read(i).copied("concat", [separators]))
			)
		}
	}),
	generate: TEMPLATE({
		defaults: { ic: false },
		function: function (start, end, step = this.template.icclass.class().next()) {
			if (arguments.length === 1) {
				end = start
				start = this.template.icclass.class().next()
			}
			const generated = this.genarrclass.static.empty()
			const proposition = step.direction()
				? (i) => end.compare(i)
				: (i) => i.compare(end)
			const wrap = this.template.ic ? ID : (x) => x.value
			for (let i = start; proposition(i); i = i.jumpDirection(step))
				generated.pushback(wrap(i))
			return generated
		}
	}),
	common: TEMPLATE({
		defaults: {},
		function: function (...args) {
			return native.array
				.intersections(this.template)
				.function(args.map(this.template.f))
		}
	})
}

export const number = {
	farey: TEMPLATE({
		defaults: {},
		function: function (
			startRatio = this.template.tratio.class(),
			endRatio = this.template.tratio.class(),
			iterations = this.template.icclass.class()
		) {
			const gotten = this.template.genarrclass.fromArray([
				this.template.genarrclass.fromArray([startRatio, endRatio])
			])
			for (let i = this.template.icclass.class(); i < iterations; i = i.next()) {
				gotten.pushback(this.template.genarrclass.static.empty())
				for (
					let j = this.template.icclass.class();
					!j.compare(gotten.read(i).length().get());
					j = j.next()
				) {
					gotten.read(i.next()).pushback(gotten.read(i).read(j))
					if (!j.compare(gotten.read(i).length().get().previous()))
						gotten
							.read(i.next())
							.push(
								gotten
									.read(i)
									.read(j)
									.naivesum(gotten.read(i).read(j.next()))
							)
				}
			}
			return gotten
		}
	})
}
