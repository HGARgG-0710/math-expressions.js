// * This is the 'Structure API' part of the package - it contains means of working with arbitrary multilayered recursive forms, the shape of which is defined by the user;

import { TEMPLATE, ID } from "./../macros.mjs"
import * as algorithms from "./algorithms.mjs"

// ^ OBSERVATIONS regarding the issues concerning the generalization of the 'multidim' methods to the 'structures' module API;
// * 	1. The 'objStructure' is fairly incompatible with the 'form', namely: the names of the fields;

// ! Use in the library for refactoring purposes;
export const structure = TEMPLATE({
	defaults: {
		form: objectForm,
		// * Note: this is a complex example - for 1 argument, it must return the expected 'equivalent', but for 2 - whether they are, in fact, equivalent, (id est: compequiv(a, compequiv(a)) == true);
		compequiv: function (...args) {
			if (args.length === 1) return args[1]
			return true
		}
	},
	function: function (obj = {}) {
		// ! REWRITE; This is highly faulty and object-oriented-only;
		return {
			template: {
				template: this.template,
				compequiv: this.template.compequiv,
				form: this.template.form,
				object: obj
			},
			equivalent: function () {
				const o = {}
				for (const x in this.template.object)
					o[x] = this.template.form.is(this.template.obj[x])
						? this.function(this.template.obj[x]).equivalent()
						: this.template.compequiv(obj[x])
				return o
			},
			isisomorphic(object, current = this.template.object) {
				if (!this.template.form(object)) {
					return (
						!this.template.is(current) &&
						this.template.compequiv(object, current)
					)
				}
				const keys = Object.keys(object)
				// ! Not sufficiently general - need ability to set arbitary comparisons (for instance, 'refCompare...', so that one could check for typeConst results... - INFINITE POTENTIAL FOR COMPARISON-CONSTANT CREATION...)
				return (
					valueCompare(keys, Object.keys(current)) &&
					!!min(keys.map((k) => this.isisomorphic(object[k], current[k])))
				)
			}
		}
	}
})

// * An SUPERBLY useful technique for recursive type-creation and working with layers; Allows one to separate one layer from another using 'comparisons.refCompare' and the out-of-scope object constant;
export function typeConst(f, n = 1) {
	const TCONST = {}
	// ! make an alias for the function in the map;
	const arr = [TCONST].append(
		algorithms.array.native.generate(n - 1).map(() => ({ ...TCONST }))
	)
	return f(Object.freeze(arr))
}

// * Some forms aliases for immidiate work with the 'structure';

export function constForm(fieldname = "", contentsname = "contents", n = true) {
	return typeConst((c) => {
		// ! conduct refactoring...
		if (n) {
			c = c[0]
			return {
				new: (x) => ({ [fieldname]: c, [contentsname]: x }),
				is: (checked) =>
					checked instanceof Object &&
					checked[fieldname] === c &&
					checked.hasOwnProperty(contentsname),
				index: (x) => x[contentsname],
				isomorphic: (x, y) => x[fieldname] === y[fieldname]
			}
		}
		return {
			new: (x) => ({ [contentsname]: x }),
			is: (checked) =>
				checked instanceof Object && checked.hasOwnProperty(contentsname),
			index: (x) => x[contentsname],
			isomorphic: aliases.TRUTH
		}
	}, n)
}

export const propertyForm = function (contentsname = "") {
	return constForm("", contentsname, false)
}

export const objectForm = {
	new: aliases.obj,
	is: aliases.is.obj,
	index: ID,
	isomorphic: aliases.TRUTH
}

export const arrayForm = {
	new: aliases.arr,
	is: aliases.is.arr,
	index: ID,
	isomorphic: aliases.TRUTH
}

// ! Originally - the 'multidim' module; Generalize whatever is here, let it work with forms... [similarly, replace the array- and object- specific functions here with a generalization to allow for successful substitution different kinds of forms...];
import * as types from "./types.mjs"
import * as counters from "./counters.mjs"
import * as comparisons from "./comparisons.mjs"
import * as aliases from "./aliases.mjs"
import * as orders from "./orders.mjs"

export const native = {
	// ! rewrite using the repeatedApplication...
	recursiveIndexation: function (object = {}, fields = []) {
		let res = object
		for (const f of fields) res = res[f]
		return res
	},

	// ! make the infinite version...
	recursiveSetting: function (object = {}, fields = [], value = null) {
		return (recursiveIndexation(object, fields.slice(0, fields.length - 1))[
			fields[fields.length - 1]
		] = value)
	},

	repeatedApplication(initial, times, f, offset = 0, iter = (x) => x + 1) {
		let r = initial
		for (let i = 0; i < times; i = iter(i)) r = f(r, i - offset)
		return r
	},

	// ! Generalize
	countrecursive: TEMPLATE({
		defaults: {
			defarr: []
		},
		function: function (array = this.template.defarr) {
			return (
				this.template.predicate(array) +
				(aliases.is.arr(array)
					? expressions
							.evaluate()
							.function(
								expressions.Expression("+", [], array.map(this.function))
							)
					: 0)
			)
		}
	}),

	// ! Generalize [thing similar to the 'countrecursive'], except, instead of a 'sum', let it be 'max';
	dim: TEMPLATE({
		defaults: { comparison: aliases.refCompare },
		function: function (recarr = []) {
			if (recarr instanceof Array)
				return this.template.icclass
					.class()
					.next()
					.jumpDirection(
						orders.max(this.function).function(recarr.map(this.function))
					)
			return this.template.icclass.static.zero()
		}
	})
}

// Counts all the array-elements within a multi-dimensional array;
native.arrElems = function (template = {}) {
	return (x) => native.totalElems(template)(x) - native.nonArrElems(template)(x)
}

// Counts all non-array elements within a multidimensional array passed... [recursively so]
native.nonArrElems = function (template = {}) {
	return native.countrecursive({
		predicate: aliases.negate(aliases.is.arr),
		...template
	})
}

// Counts all the elements within a multi-dimensional array (including the arrays themselves...)
native.totalElems = function (template = {}) {
	return native.countrecursive({
		predicate: (x) => (aliases.is.arr(x) ? x.length : 0),
		...template
	})
}

export const dim = TEMPLATE({
	defaults: { comparison: aliases.refCompare },
	function: function (recarr = this.template.genarrclass.static.empty()) {
		if (this.template.genarrclass.is(recarr))
			return this.template.icclass
				.class()
				.next()
				.jumpDirection(
					orders.max(this.template).function(recarr.map(this.function))
				)
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
		for (let i = this.template.icclass.class(); !i.compare(times); i = iter(i))
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
