// * This module defines some basic means of immidiate work with the multidimensional GeneralArrays and other recursive structures;

import { TEMPLATE } from "./../macros.mjs"
import * as types from "./types.mjs"
import * as counters from "./counters.mjs"
import * as comparisons from "./comparisons.mjs"
import * as aliases from "./aliases.mjs"

export const dim = TEMPLATE({
	defaults: { comparison: aliases.refCompare },
	function: function (recarr = this.template.genarrclass.static.empty()) {
		if (this.template.comparison(recarr.class, this.template.genarrclass))
			return this.template.icclass
				.class()
				.next()
				.jumpDirection(maxgeneral(recarr.map(this.function)))
		return this.template.icclass.class()
	}
})

export const recursiveIndexationInfFields = TEMPLATE({
	function: function (object, fields = this.template.genarrclass.static.empty()) {
		return repeatedApplication({
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
})

export const repeatedApplication = TEMPLATE({
	defaults: { iter: (x) => x.next() },
	function: function (
		initial = this.template.initial,
		times = this.template.times,
		f = this.template.f,
		offset = this.template.icclass.class(),
		iter = this.template.iter
	) {
		let r = initial
		for (let i = template.icclass.class(); !i.compare(times); i = iter(i))
			r = f(r, i.difference(offset))
		return r
	}
})

// * This can create infinite loops...
// ? create a 'While' - same as 'Whilst'? Or just rename? [naming conventions];
export const repeatedApplicationWhilst = TEMPLATE({
	defaults: { initial: undefined },
	function: function () {
		let curr = initial
		while (this.template.property()) curr = this.template.function(curr)
		return curr
	}
})

// * A general algorithm for search inside a recursive array [of arbitrary depth]; Uses GeneralArray for layer-depth-indexes;
// ? What about the default addition of '.function's to the TEMPLATEs? Pray think about that as well...
export const generalSearch = TEMPLATE({
	defaults: {
		self: false,
		reversed: false,
		// ? Give this thing an alias...;
		genarrclass: types.arrays.LastIndexArray({
			icclass: types.InfiniteCounter(counters.arrayCounter())
		}),
		soughtProp: aliases._const(true)
	},
	function: function (
		arrrec = [],
		prevArr = this.template.genarrclass.static.empty(),
		self = this.template.self,
		reversed = this.template.reversed
	) {
		const i = prevArr.copy()
		if (self && this.template.soughtProp(arrrec)) return i

		const boundprop = reversed ? (x) => x >= 0 : (x) => x < arrrec.length
		i.pushback(reversed ? arrrec.length - 1 : 0)
		i.end()
		for (
			;
			boundprop(i.currelem().get());
			i.currelem().set(i.currelem().get() + (-1) ** reversed)
		) {
			if (this.template.soughtProp(arrrec[i.currelem().get()])) return i
			if (arrec[i.currelem().get()] instanceof Array) {
				const r = this.function(arrrec[i.currelem().get()], i, false, reversed)
				if (!r) continue
				return r
			}
		}
		return false
	}
}).function

// ? Question [general]: does one want to put the thematically essential aliases for methods inside their appropriate theme-submodules or into the 'alias'?  Or ought one make a division of the alias? Or make an '.aliases' division inside each thematical one?
// * Pray consider further reorganization of the library...;
// ! THESE ONES DON'T CARRY ANY ESSENCE, EXCEPT AS ALIASES... Rethink the way that aliases organization is generally handled throughout the library...;
// ^ DECISION [1]: about ones such as these - they'll be put in 'refactor.aliases';
// ? perhaps, one has finally decided on how to abstract those kinds of 'multi-templates'?
export const findDeepUnfilled = TEMPLATE({
	defaults: {
		soughtProp: aliases._const(true),
		comparison: comparisons.valueCompare
	},
	function: function (template = {}) {
		return generalSearch({
			soughtProp: (x) =>
				this.template.soughtProp(x) &&
				!this.template.comparison(this.template.bound, x),
			...this.template,
			...template
		}).function
	}
}).function()
// * all of these things ought to have aliases...
export const findDeepUnfilledArr = TEMPLATE({
	defaults: { type: aliases.is.arr, comparison: (a, b) => a <= b.length, self: true },
	function: function (template = {}) {
		return findDeepUnfilled.function({
			...this.template,
			...template
		})
	}
}).function()
export const findDeepLast = TEMPLATE({
	defaults: {
		reversed: true
	},
	function: function (template = {}) {
		return generalSearch({
			...this.template,
			...template
		}).function
	}
}).function()
