// * This is 	the 'Structure API' part of the package - it contains means of working with arbitrary multilayered recursive forms, the shape of which is defined by the user;
// % note: the module is, in many ways, central to the library from the dependency- and generality- standpoints of view, for its methods and definitions can be applied to nigh every part of the package that works with recursion and nested objects;

import { general } from "./../refactor.mjs"
import { repeatedApplication as _repeatedApplication } from "../imported.mjs"
import { TEMPLATE, ID } from "./../macros.mjs"
import * as algorithms from "./algorithms.mjs"
import * as aliases from "./aliases.mjs"
import * as types from "./types.mjs"
import { valueCompare } from "./comparisons.mjs"
import * as orders from "./orders.mjs"
import * as native from "./native.mjs"
import * as predicates from "./predicates.mjs"

export const form = (
	_new,
	is,
	index,
	// ? What about this? Not really used by anything except for the 'constForm'...; Perhaps, decide means of individual extension of forms?
	isomorphic = predicates.TRUTH,
	copy = (x, f) => x.copy(f),
	read = (x, i) => x.read(i),
	write = (x, i, v) => x.write(i, v),
	keys = (x) => x.keys()
) => {
	// ? Should one be using the 'arrow-functions' like that, or will 'form->this+function' be a more prefereable option?
	const X = { new: _new, is, index, isomorphic }
	X.flatmap = (x, f) => X.new(copy(X.index(x), f))
	X.read = (x, i) => read(X.index(x), i)
	X.write = (x, i) => write(X.index(x), i, v)
	X.keys = (x) => keys(X.index(x))
	return X
}

export const structure = TEMPLATE({
	defaults: {
		form: general.DEFAULT_FORM,
		comparison: valueCompare,
		// * Note: this is a complex example - for 1 argument, it must return the expected 'equivalent', but for 2 - whether they are, in fact, equivalent, (id est: compequiv(a, compequiv(a)) == true);
		compequiv: function (...args) {
			if (args.length === 1) return args[1]
			return true
		}
	},
	function: function (obj = this.template.form.new()) {
		return {
			template: {
				template: this.template,
				compequiv: this.template.compequiv,
				comparison: this.template.comparison,
				form: this.template.form,
				object: obj
			},
			equivalent: function (form = general.DEFAULT_FORM) {
				const o = form.new()
				for (const x of this.template.form.keys(this.template.object)) {
					const rresult = this.template.form.read(this.template.object, x)
					o.write(
						x,
						this.template.form.is(rresult)
							? this.function(rresult).equivalent()
							: this.template.compequiv(rresult)
					)
				}
				return o
			},
			recisomorphic(object = this.template.object, current = this.template.object) {
				if (!this.template.form.is(object)) {
					return (
						!this.template.form.is(current) &&
						this.template.compequiv(object, current)
					)
				}
				const keys = this.template.form.keys(object)
				return (
					this.template.comparison(keys, this.template.form.keys(current)) &&
					keys.every((k) =>
						this.recisomorphic(
							...[object, current].map((x) => this.template.form.read(x, k))
						)
					)
				)
			}
		}
	}
}).function

// * An SUPERBLY useful technique for recursive type-creation and working with layers; Allows one to separate one layer from another using 'comparisons.refCompare' and the out-of-scope object constant;
export function typeConst(f = ID, n = 1) {
	const TCONST = aliases.native.object.empty()
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
		let isomorphic = undefined
		if (n) {
			c = c[0]
			_new = (x = defaultval) => ({ [fieldname]: c, [contentsname]: x })
			is = (checked) =>
				aliases.is.obj(checked) &&
				checked[fieldname] === c &&
				checked.hasOwnProperty(contentsname)
			isomorphic = (x, y) => x[fieldname] === y[fieldname]
		}
		return form(_new, is, index, isomorphic)
	}, n)
}

export const propertyForm = function (contentsname = "", defaultval = {}) {
	return constForm("", contentsname, false, defaultval)
}

export const objectForm = form(
	aliases.obj,
	aliases.is.obj,
	aliases.obj.values,
	aliases.TRUTH,
	(x, f = ID) => {
		let c = native.copy.flatCopy(x)
		for (const y in x) c[y] = f(c[y])
		return c
	},
	// ? aliases? [or, are they defined already?]
	(x, i) => x[i],
	(x, i, v) => (x[i] = v),
	aliases.obj.keys
)
export const arrayForm = form(
	aliases.arr,
	aliases.is.arr,
	ID,
	aliases.TRUTH,
	(x, f = ID) => x.map(f),
	(x, i = 0) => x[i],
	(x, i, v) => (x[i] = v)
)

export const classForm =
	(_class) =>
	(template = {}, index = ID, additional = []) => {
		const Class = _class(template)
		return form(Class.class, Class.is, index, aliases.TRUTH, ...additional)
	}

export const garrayForm = classForm(types.GeneralArray)
export const treeForm = (parentclass = general.DEFAULT_GENARRCLASS) =>
	classForm(types.TreeNode(parentclass), aliases.native.function.index("children"))

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
}).function

// Counts all the array-elements within a multi-dimensional array;
export const arrElems = function (template = {}) {
	// ? aliases... Let function-related aliases like this one be repositioned into the 'expressions.mjs' codefile;
	return (x) =>
		(
			(a, b) => (y) =>
				a(y).difference(b(y))
		)([totalElems, nonArrElems].map((t) => t(template)))(x)
}

// Counts all non-array elements within a multidimensional array passed... [recursively so]
export const nonArrElems = function (template = {}) {
	return countrecursive({
		predicate: aliases.negate(aliases.is.arr),
		...template
	})
}

// Counts all the elements within a multi-dimensional array (including the arrays themselves...)
export const totalElems = function (template = {}) {
	return countrecursive({
		predicate: (x) => (aliases.is.arr(x) ? x.length : 0),
		...template
	})
}

export const dim = TEMPLATE({
	defaults: {
		icclass: general.DEFAULT_ICCLASS,
		form: general.DEFAULT_FORM
	},
	function: function (recarr = this.template.form.new()) {
		if (this.template.form.is(recarr))
			return this.template.icclass.static
				.one()
				.jumpForward(
					orders
						.max(this.template)
						.function(this.form.copy(recarr, this.function))
				)
		return this.template.icclass.class()
	}
}).function

// * A general algorithm for search inside a recursive array [of arbitrary depth]; Uses GeneralArray for layer-depth-indexes;
export const generalSearch = TEMPLATE({
	defaults: {
		self: false,
		reversed: false,
		genarrclass: general.DEFAULT_GENARRCLASS,
		soughtProp: predicates.TRUTH,
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
				comparison: valueCompare
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
}).function

// * all of these things ought to have aliases...
export const findDeepUnfilledArr = TEMPLATE({
	defaults: { type: aliases.is.arr, comparison: (a, b) => a <= b.length, self: true },
	function: function (template = {}) {
		return findDeepUnfilled.function({
			...this.template,
			...template
		})
	}
}).function

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
}).function

export const recursiveIndexation = TEMPLATE({
	function: function (object, fields = this.template.genarrclass.static.empty()) {
		return repeatedApplication({
			icclass: fields.this.class.template.icclass,
			...this.template
		})(
			(x, i) => {
				return this.form.read(x, fields.read(i))
			},
			fields.length().get(),
			object
		)
	}
}).function

export const recursiveSetting = TEMPLATE({
	defaults: {
		form: general.DEFAULT_FORM,
		genarrclass: general.DEFAULT_GENARRCLASS
	},
	function: function (
		object = this.tepmlate.form.new(),
		fields = this.template.genarrclass.static.empty()
	) {
		if (!fields.isEmpty()) {
			const indexed = recursiveIndexation(this.template).function(
				fields.copied("slice", [fields.init(), fields.finish().previous()])
			)
			this.template.form.write(indexed, fields.read(fiends.finish()))
		}
		return object
	}
}).function

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
}).function

// * This can create infinite loops...
export const repeatedApplicationWhilst = TEMPLATE({
	defaults: { initial: undefined },
	function: function (f = this.template.function) {
		let curr = initial
		while (this.template.property()) curr = f(curr)
		return curr
	}
}).function

const Native = {}
Native.repeatedApplication = _repeatedApplication

export { Native as native }
