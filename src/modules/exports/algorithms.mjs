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
// 				* 2.1. The generator would be based off the GeneralArray that the user would give
// 					TODO: create a 'garrCounter'/'finiteCounter', which would be based entirely off a user-passed GeneralArray; note - not circular, or infinite recursively defined based off given elements - just the simplest possible iteration... [id est, IT CAN END...]; 
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
