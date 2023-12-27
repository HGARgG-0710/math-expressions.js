// ! essential: before publishing or doing anything else - make another round through the ENTIRE codebase, checking for each and every single thing, refactoring madly...;
// ? Later - try to redistribute all this somewhere accordingly?

import { TEMPLATE } from "./macros.mjs"
import * as aliases from "./exports/aliases.mjs"
import * as comparisons from "./exports/comparisons.mjs"
import * as native from "./exports/native.mjs"
import {
	numbers,
	arrays,
	InfiniteCounter,
	UnlimitedString,
	TreeNode
} from "./exports/types.mjs"
import { heaps } from "./exports/algorithms.mjs"
import * as predicates from "./exports/predicates.mjs"
import * as orders from "./exports/orders.mjs"
import * as structure from "./exports/structure.mjs"

export const classes = {
	finish: function () {
		return this.length().get().previous()
	},
	begin: function (go = true) {
		return this[go ? "go" : "read"](this.init(), go ? aliases.TRUTH : undefined)
	},
	end: function (go = true) {
		return this[go ? "go" : "read"](this.finish(), go ? aliases.TRUTH : undefined)
	},
	suchthat: function (predicate = aliases.TRUTH) {
		const subset = this.this.this.this.class.class()
		for (const key of this.keys())
			if (predicate(this.read(key), key, this, subset)) subset.pushback(key)
		this.this.this = subset
		return this
	},
	any: function (predicate = aliases.TRUTH) {
		return !this.init().compare(this.copied("suchthat", [predicate]).length().get())
	},
	every: function (predicate = aliases.TRUTH) {
		return this.this.this.class.template.icclass.template.comparison(
			this.copied("suchthat", [predicate]).length().get(),
			this.length().get()
		)
	},
	forEach: function (method = aliases.VOID) {
		for (const x of this.keys()) method(this.read(x), x, this)
		return this
	},
	includes: function (element, leftovers = {}) {
		ensureProperties(leftovers, {
			unfound: this.this.this.this.class.template.unfound,
			comparison: comparisons.refCompare
		})
		return !leftovers.comparison(
			this.firstIndex(element),
			this.this.this.class.template.unfound
		)
	},
	copy: function (
		f = ID,
		isclass = false,
		template = isclass
			? this.this.this.this.class
			: this.this.this.this.class.template,
		leftovers = {}
	) {
		const empty = this.this.this.this.class.class()
		empty.genarr = this.this.this.genarr.copy(f, isclass, template, leftovers)
		return empty
	},
	peek: function () {
		return this.this.this.genarr.read(this.this.this.genarr.finish())
	},
	pop: function () {
		return this.this.this.genarr.delete()
	},
	// * Note: the 'args' does __not__ have to be a native JS array; (This uses the Symbol.iterator...);
	multcall(method, args = [], arrs = false, leftovers = {}) {
		for (let x of args) {
			if (!arrs) x = [x]
			this.this.this[method](...x, leftovers)
		}
		return this
	},
	add: function (elem) {
		return this.merge(
			this.this.this.template.parentclass.template.parentclass.static.fromArray([
				this.this.this.this.class.class(elem)
			])
		)
	},
	zero: function () {
		return this.this.class.class()
	},
	one: function () {
		return this.zero().next()
	},
	two: function () {
		return this.one().next()
	},
	oneadd: function () {
		return this.zero().add()
	},
	twoadd: function () {
		return this.one().add()
	},
	copied: function (
		method,
		_arguments = [],
		f = id,
		template = this.this.this.this.class.template,
		isclass = false
	) {
		const c = this.copy(f, template, isclass)
		if (aliases.hasFunction(c, method)) c[method](..._arguments)
		return c
	}
}

export const general = {
	fix: function (
		objs = [],
		keys = [],
		operation = () => {},
		readfunc = (o, k) => o[k],
		setfunc = (o, k, v) => (o[k] = v)
	) {
		const remember = objs.map((obj, i) => readfunc(obj, keys[i]))
		const returned = operation()
		for (let i = 0; i < remember.length; i++) setfunc(objs[i], keys[i], remember[i])
		return returned
	},
	lengthSafeConcat: function (a, b) {
		if (a.length >= variables.MAX_STRING_LENGTH.get - b.length)
			return [
				a.concat(b.slice(0, variables.MAX_STRING_LENGTH.get - a.length)),
				b.slice(variables.MAX_STRING_LENGTH.get - a.length)
			]
		return [a.concat(b)]
	},
	StaticThisTransform: (templated) => {
		templated.static.this = templated
	},
	recursiveOperation(opname, binaryver) {
		return function (...args) {
			return args.length >= 2
				? binaryver(args[0], this.get[opname](args.slice(1)))
				: args[0]
		}
	},
	// ! FIX [for it to work with 'TEMPLATE's...];
	finiteobj: function (
		target = {},
		names = [],
		templates = [],
		insequences = [],
		outtransform = []
	) {
		const newobj = {}
		const xf = !(template instanceof Array)
			? (x) => templates[x]
			: aliases.native.function.const(template)
		for (const x in names)
			newobj[names[x]] = native
				.finite(xf(x))
				.function(target[names[x]], outtransform[x], insequences[x])
		return newobj
	},
	counterFrom: function (_labels = [], wrapper = ID) {
		return TEMPLATE({
			defaults: [
				aliases.function.const({ icclass: general.DEFAULT_ICCLASS, wrapper }),
				function () {
					return {
						forth: this.template.wrapper(this.template.icclass.static.one()),
						back: this.template.wrapper(this.template.icclass.static.none())
					}
				}
			],
			function: function (icclass = general.DEFAULT_ICCLASS) {
				const X = {
					range: icclass.is
				}
				const labels = {
					generator: [_labels[0], "forth"],
					inverse: [_labels[1], "back"]
				}
				for (const x in labels)
					X[x] = (x = this.template.start) =>
						icclass.class(x)[labels[x][0]](this.template[labels[x][1]])
				return X
			}
		}).function()
	},
	maxkey(garr) {
		return this.template.hasOwnProperty("maxkey")
			? this.template.maxkey
			: orders.most({ comparison: this.template.predicate })(
					garr.copy(this.template.predicate)
			  )
	},
	DEFAULT_ICCLASS: InfiniteCounter(),
	DEFAULT_GENARRCLASS: arrays.LastIndexArray()
}

general.DEFAULT_USTRCLASS = UnlimitedString()
general.DEFAULT_TREENODECLASS = TreeNode()
general.DEFAULT_INFARR = InfiniteArray()
general.DEFAULT_TINTCLASS = numbers.TrueInteger()
general.DEFAULT_HEAPCLASS = heaps.PairingHeap()
general.DEFAULT_TRATIOCLASS = numbers.TrueRatio()
general.DEFAULT_FORM = structure.arrayForm

// TODO: make the object of defaults that is to be used throughout the library...;
export const defaults = {
	heap: (parentclass) => ({
		check: true,
		parentclass: parentclass,
		names: ["treenode"],
		defaults: {
			inter: function (args) {
				aliases.native.object.ensureProperty(args, 2, this.template.check)
				if (args[2]) {
					const tempcopy = args[1].copied("concat", [args[0]])
					const m = orders
						.most({
							comparison: this.template.predicate
						})
						.function(tempcopy)
					return [m, tempcopy.delval(m)]
				}
				return [args[0], args[1]]
			}
		},
		predicate: predicates.lesser
	}),
	basicgenarr: (parentclass) => ({ parentclass: parentclass, names: ["genarr"] }),
	basicheap: (heapclass) => ({ parentclass: heapclass, names: ["heap"] })
}
