// * Various algorithms for the library that one considered potentially useful;

// TODO: extend this thing - create new algorithms implementations for the library...
// TODO: make the things more efficient, general, implement more algorithms;

// ! problem: in this instance - the usage of finite types;
// ? When shall it be the preference?
// * DECISION: yes, generalize them, then make the 'CommonArray'-kind of special cases; [Make such special cases for all of them...];

import * as aliases from "./aliases.mjs"
import * as orders from "./orders.mjs"

export function BinarySearch(array, number) {
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

// ! For that, one first has to fix the 'orders' part of the module...;
export const Sort = {
	bubble: TEMPLATE({
		defaults: {},
		function: function (garr = this.template.genarrclass.static.empty()) {
			const listArr = garr.copy()
			const sorted = garr.empty()
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
