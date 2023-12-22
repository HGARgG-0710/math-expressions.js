// * This is the 'Structure API' part of the package - it contains means of working with arbitrary multilayered recursive forms, the shape of which is defined by the user;
// % note: the module is, in many ways, central to the library from the dependency- and generality- standpoints of view, for its methods and definitions can be applied to nigh every part of the package that works with recursion and nested objects;

import { TEMPLATE, ID } from "./../macros.mjs"
import * as algorithms from "./algorithms.mjs"
import * as aliases from "./aliases.mjs"
import * as types from "./types.mjs"
import * as counters from "./counters.mjs"
import * as comparisons from "./comparisons.mjs"
import * as orders from "./orders.mjs"

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

export function constForm(
	fieldname = "",
	contentsname = "contents",
	n = true,
	defaultval = []
) {
	return typeConst((c) => {
		let _new = (x = defaultval) => ({ [contentsname]: x })
		let is = (checked) =>
			checked instanceof Object && checked.hasOwnProperty(contentsname)
		const index = (x) => x[contentsname]
		let isomorphic = aliases.TRUTH
		if (n) {
			c = c[0]
			_new = (x = defaultval) => ({ [fieldname]: c, [contentsname]: x })
			is = (checked) =>
				checked instanceof Object &&
				checked[fieldname] === c &&
				checked.hasOwnProperty(contentsname)
			isomorphic = (x, y) => x[fieldname] === y[fieldname]
		}
		return { new: _new, is, index, isomorphic }
	}, n)
}

export const propertyForm = function (contentsname = "") {
	return constForm("", contentsname, false)
}

export const objectForm = {
	new: aliases.obj,
	is: aliases.is.obj,
	index: Object.values,
	isomorphic: aliases.TRUTH
}

export const arrayForm = {
	new: aliases.arr,
	is: aliases.is.arr,
	index: ID,
	isomorphic: aliases.TRUTH
}

export const classForm =
	(_class) =>
	(template = {}) => {
		const Class = _class(template)
		return {
			new: Class.class,
			is: Class.is,
			index: ID,
			isomorphic: aliases.TRUTH
		}
	}

export const garrayForm = classForm(types.GeneralArray)

export const countrecursive = TEMPLATE({
	defaults: {},
	function: function (array = this.form.new()) {
		return aliases.native.number
			.fromNumber({ icclass: this.template.icclass })(
				this.template.predicate(array)
			)
			.jumpForward(
				this.template.form.is(array)
					? expressions
							.uevaluate()
							.function(
								expressions.Expression(
									"+",
									[],
									this.template.form.index(array).copy(this.function)
								)
							)
					: this.template.icclass.zero()
			)
	}
})

// Counts all the array-elements within a multi-dimensional array;
export const arrElems = function (template = {}) {
	// ! aliases... Let function-related aliases like this one be repositioned into the 'expressions.mjs' codefile;
	return (x) =>
		(
			(a, b) => (y) =>
				a(y).difference(b(y))
		)([totalElems, nonArrElems].map((t) => t(template)))(x)
}

// Counts all non-array elements within a multidimensional array passed... [recursively so]
export const nonArrElems = function (template = {}) {
	return native.countrecursive({
		predicate: aliases.negate(aliases.is.arr),
		...template
	})
}

// Counts all the elements within a multi-dimensional array (including the arrays themselves...)
export const totalElems = function (template = {}) {
	return native.countrecursive({
		predicate: (x) => (aliases.is.arr(x) ? x.length : 0),
		...template
	})
}

export const dim = TEMPLATE({
	defaults: {},
	function: function (recarr = this.template.genarrclass.static.empty()) {
		if (this.template.form.is(recarr))
			return this.template.icclass.static
				.one()
				.jumpDirection(
					orders
						.max(this.template)
						.function(this.form.index(recarr).copy(this.function))
				)
		return this.template.icclass.class()
	}
})

// * A general algorithm for search inside a recursive array [of arbitrary depth]; Uses GeneralArray for layer-depth-indexes;
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
		arrrec = this.form.new(),
		prevArr = this.template.genarrclass.static.empty(),
		self = this.template.self,
		reversed = this.template.reversed
	) {
		const i = prevArr.copy()
		if (self && this.template.soughtProp(this.template.form.index(arrrec))) return i

		// ! Generalize this bounding function to allow arbitrary kinds of forms, pray...
		const boundprop = reversed
			? (x) => x >= 0
			: (x) => x < this.template.form.index(arrrec).length
		i.pushback(reversed ? this.template.form.index(arrrec).length - 1 : 0)
		i.end()
		for (
			;
			boundprop(i.currelem().get());
			i.currelem().set(i.currelem().get() + (-1) ** reversed)
		) {
			if (
				this.template.soughtProp(
					this.template.form.index(arrrec)[i.currelem().get()]
				)
			)
				return i
			if (
				this.template.form.is(this.template.form.index(arrec)[i.currelem().get()])
			) {
				const r = this.function(
					this.template.form.index(arrrec)[i.currelem().get()],
					i,
					false,
					reversed
				)
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

export const recursiveIndexationInfFields = TEMPLATE({
	function: function (object, fields = this.template.genarrclass.static.empty()) {
		return repeatedApplication({
			icclass: fields.this.class.template.icclass,
			...this.template
		})(
			(x, i) => {
				return this.form.index(x).read(fields.read(i))
			},
			fields.length().get(),
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
export const repeatedApplicationWhilst = TEMPLATE({
	defaults: { initial: undefined },
	function: function (f = this.template.function) {
		let curr = initial
		while (this.template.property()) curr = f(curr)
		return curr
	}
})

// ? Q: Keep or not?
export const native = {
	// ! rewrite using the repeatedApplication...
	// ? Delete? [already an infinite version present...]
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

	// ? Considered for deletion;
	repeatedApplication(initial, times, f, offset = 0, iter = (x) => x + 1) {
		let r = initial
		for (let i = 0; i < times; i = iter(i)) r = f(r, i - offset)
		return r
	}
}
