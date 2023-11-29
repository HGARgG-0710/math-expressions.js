// * This module defines some basic means of immidiate work with the multidimensional GeneralArrays and other recursive structures;

import { TEMPLATE } from "./../macros.mjs"

export const dim = TEMPLATE({
	defaults: { comparison: RESULT.aliases.refCompare },
	function: function (recarr = this.template.genarrclass.static.empty()) {
		if (this.template.comparison(recarr.class, this.template.genarrclass))
			return this.template.icclass
				.class()
				.next()
				.jumpDirection(RESULT.main.maxgeneral(recarr.map(this.function)))
		return this.template.icclass.class()
	}
})

export const recursiveIndexationInfFields = TEMPLATE({
	function: function (object, fields = this.template.genarrclass.static.empty()) {
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
export const generalSearch = TEMPLATE({
	defaults: {
		self: false,
		reversed: false
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
})
