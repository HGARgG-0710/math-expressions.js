// * The 'orders' module [for working with GeneralArray-based linear and non-linear orders];
// Currently, provides means of immidiate construction of orders based off GeneralArrays

import * as predicates from "./predicates.mjs"

export const linear = TEMPLATE({
	defaults: {
		reflexive: true
	},
	function: function (
		array = this.template.genarrclass.static.empty(),
		reflexive = this.template.reflexive
	) {
		return reflexive
			? (a, b) => array.firstIndex(b).compare(array.firstIndex(a))
			: (a, b) => !array.firstIndex(a).compare(array.firstIndex(b))
	}
}).function()

// "fixes" a linear order, by means of excluding all the repeating elements from it...
export const fixLinear = TEMPLATE({
	defaults: {
		genarrclass: general.DEFAULT_GENARRCLASS
	},
	function: function (array = this.template.genarrclass.static.empty()) {
		const copy = array.copy()
		for (let i = copy.init(); !i.compare(copy.length().get()); i = i.next()) {
			const x = copy.copied("slice", [i.next()])
			while (x.includes(copy.read(i))) {
				const ind = x.firstIndex(copy.read(i))
				copy.slice(undefined, i.next()).concat(x.delete(ind))
			}
		}
		return copy
	}
}).function()

export const nonlinear = TEMPLATE({
	defaults: {
		reflexive: true
	},
	function: function (
		array = this.template.genarrclass.static.empty(),
		reflexive = this.template.reflexive
	) {
		const f = reflexive ? (x, y) => y.compare(x) : (x, y) => !x.compare(y)
		return (a, b) => {
			const binds = array.indexes(b)
			return array.indexes(a).every((x) => binds.every((y) => f(x, y)))
		}
	}
}).function()

// * Generally, where does one want to put the aliases that are based off the 'main' types? [As of now, had been decided it'll be just the '.aliases'...]
export const most = TEMPLATE({
	defaults: {
		genarrclass: general.DEFAULT_GENARRCLASS, 
	},
	function: function (
		garr = this.template.genarrclass.static.empty(),
		comparison = this.template.comparison
	) {
		let most = garr.read()
		// TODO [general]: where possible, prefer for-of against '.loop()'; '.loop()' can be used, but it's better fit for more complex cases...
		for (const x of garr) if (comparison(x, most)) most = x
		return most
	}
}).function()

// * For the 'min'/'max' of a lineraly ordered set of InfiniteCounters;
export function min(template = {}) {
	return most({
		comparison: predicates.lesser,
		...template
	})
}
export function max(template = {}) {
	return most({
		comparison: predicates.greater,
		...template
	})
}

// * Constructs an infinte order from given Infinite Counter class;
export function fromIcc(icclass) {
	return (x, y) => icclass.class(x).compare(icclass.class(y))
}
