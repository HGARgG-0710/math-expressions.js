// * This is the 'Structure API' part of the package - it contains means of working with arbitrary multilayered recursive forms, the shape of which is defined by the user;
// % note: the module is, in many ways, central to the library from the dependency- and generality- standpoints of view, for its methods and definitions can be applied to nigh every part of the package that works with recursion and nested objects;

import { general } from "./../refactor.mjs"
import { TEMPLATE, ID } from "./../macros.mjs"
import * as algorithms from "./algorithms.mjs"
import * as aliases from "./aliases.mjs"
import * as types from "./types.mjs"
import * as comparisons from "./comparisons.mjs"
import * as orders from "./orders.mjs"

// ? Add more methods to it? [IDEA: get rid of 'structure', embed its functionality inside the 'form'?]; 
export const form = (_new, is, index, isomorphic) => {
	const X = { new: _new, is, index, isomorphic }
	X.flatmap = formFlatMap(X)
	return X
}

export const formFlatMap = (form) => (x, f) => form.new(form.index(x).copy(f))

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
		// ! REWRITE; This is highly faulty, not general enough and object-oriented-only;
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
					keys.every((k) => this.isisomorphic(object[k], current[k]))
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
			return form(_new, is, index, isomorphic)
		}
	}, n)
}

export const propertyForm = function (contentsname = "") {
	return constForm("", contentsname, false)
}

export const objectForm = form(aliases.obj, aliases.is.obj, Object.values, aliases.TRUTH)
export const arrayForm = form(aliases.arr, aliases.is.arr, ID, aliases.TRUTH)

export const classForm =
	(_class) =>
	(template = {}) => {
		const Class = _class(template)
		return form(Class.class, Class.is, ID, aliases.TRUTH)
	}

export const garrayForm = classForm(types.GeneralArray)

export const countrecursive = TEMPLATE({
	defaults: {
		// ^ IDEA [for an application of a refactoring technique]: create such 'DEFAULT' template-variable values for every single one recurring element of the library, so that different pieces may use them (not only classes, but items like forms, predicates and so on...)
		form: general.DEFAULT_FORM
	},
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
	defaults: {
		icclass: general.DEFAULT_ICCLASS,
		form: arrayForm
	},
	function: function (recarr = this.template.form.new()) {
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
		genarrclass: general.DEFAULT_GENARRCLASS,
		soughtProp: aliases._const(true),
		form: general.DEFAULT_FORM
	},
	function: function (
		arrrec = this.template.form.new(),
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
					this.template.form.index(arrrec).read(i.currelem().get())
				)
			)
				return i
			// ! [like here] - fix the '[...]' array-like indexes, replace them with the '.read()';
			if (
				this.template.form.is(
					this.template.form.index(arrec).read(i.currelem().get())
				)
			) {
				const r = this.function(
					this.template.form.index(arrrec).read(i.currelem().get()),
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

// ? Consider this '.comparison' business (not quite sure one likes it, the '.compare' ensures that the thing works on all forms, this doesn't...)
export const findDeepUnfilled = TEMPLATE({
	defaults: [
		function () {
			return {
				form: general.DEFAULT_FORM,
				comparison: comparisons.valueCompare
			}
		},
		function () {
			return { soughtProp: this.template.form.is }
		}
	],
	function: function (template = {}) {
		return generalSearch({
			soughtProp: (x) =>
				this.template.soughtProp(x) &&
				!this.template.comparison(this.template.bound, x),
			...this.template,
			...template
		}).function
	},
	isthis: true
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

export const native = {
	// ! make the infinite version...
	recursiveSetting: function (object = {}, fields = [], value = null) {
		return (recursiveIndexation(object, fields.slice(0, fields.length - 1))[
			fields[fields.length - 1]
		] = value)
	},

	// ? Considered for deletion;
	// * That's only useful for finite methods refactoring; [Consider if there are any in the library, if not - think whether wish to keep...];
	repeatedApplication(initial, times, f, offset = 0, iter = (x) => x + 1) {
		let r = initial
		for (let i = 0; i < times; i = iter(i)) r = f(r, i - offset)
		return r
	}
}
