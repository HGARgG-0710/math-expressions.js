// * The 'orders' module [for working with GeneralArray-based linear and non-linear orders];
// Currently, provides means of immidiate construction of orders based off GeneralArrays [non-generalized, a sketch, only the finite arrays for now...]
// ^ idea [for the further restrucruring of the library] - take out most of the stuff from 'aliases', which isn't (in itself) any manner of an alias at all; The present case of 'min/max' is an excellent example;
// 		% An alias ought to do little less but add a new name for a special case of a general thing or a native part of JS [example String->str];

// ! GENERALIZE AND REFACTOR EVERYTHING IN HERE... [this is some very early code indeed...];
export function linear(array = [], reflexive = true) {
	return reflexive
		? (a, b) => array.indexOf(a) <= array.indexOf(b)
		: (a, b) => array.indexOf(a) < array.indexOf(b)
}
// "fixes" a linear order, by means of excluding all the repeating elements from it...
export function fixLinear(array = []) {
	const copy = [...array]
	for (let i = 0; i < copy.length; i++) {
		let x = copy.slice(i + 1)
		while (x.includes(copy[i])) {
			const ind = x.indexOf(copy[i])
			copy = copy.slice(0, i + 1).concat(x.slice(0, ind).concat(x.slice(ind + 1)))
		}
	}
	return copy
}
export function nonlinear(array = [], reflexive = true) {
	const f = reflexive ? (x, y) => x <= y : (x, y) => x < y
	return (a, b) =>
		max(indexesOf(array, a).map((x) => max(indexesOf(b).map((y) => f(x, y)))))
}

// ! IN FOR GETTING REWRITTEN and connected with the present 'orders' mini sub-module;
// * For the 'min'/'max' of a lineraly ordered set of InfiniteCounters;
export function min(template = {}) {
	// ! Make aliases for these 'chosen/current' functions...
	return this.most({
		comparison: (chosen, current) => !chosen.compare(current),
		...template
	})
}
export function max(template = {}) {
	// ! Make aliases for these 'chosen/current' functions...
	return this.most({
		comparison: (chosen, current) => !current.compare(chosen),
		...template
	})
}

// * Generally, where does one want to put the aliases that are based off the 'main' types? [As of now, had been decided it'll be just the '.aliases'...]
export const most = TEMPLATE({
	function: function (garr = this.template.genarrclass.static.empty()) {
		let most = garr.read(garr.init())
		garr.loop()._full((t) => {
			if (this.template.comparison(t.object().current, most))
				most = t.object().current
		})
		return most
	}
})
