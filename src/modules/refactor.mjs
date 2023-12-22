// ! essential: before publishing or doing anything else - make another round through the ENTIRE codebase, checking for each and every single thing, refactoring madly...;
// ? Later - try to redistribute all this somewhere accordingly?

import * as aliases from "./exports/aliases.mjs"
import * as comparisons from "./exports/comparisons.mjs"
import { arrayCounter } from "./exports/counters.mjs"
import * as native from "./exports/native.mjs"
import {
	TrueInteger,
	arrays,
	InfiniteCounter,
	UnlimitedString,
	TreeNode
} from "./exports/types.mjs"
import { heaps } from "./exports/algorithms.mjs"
import * as predicates from "./exports/predicates.mjs"

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
	// ? Does oneself want this, pray? [if no in-lib application, delete...];
	finiteobj: function (target, names = [], insequences = [], outtransform = []) {
		const newobj = {}
		const f = native.finite().function
		for (const x in names)
			newobj[names[x]] = f(target[names[x]], outtransform[x], insequences[x])
		return newobj
	},
	counterFrom: function (_labels = [], wrapper = aliases.ID) {
		return TEMPLATE({
			defaults: [
				aliases.function._const({ icclass: InfiniteCounter(arrayCounter) }),
				function () {
					return {
						forth: wrapper(this.template.icclass.static.one()),
						back: wrapper(this.template.icclass.static.none())
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
		})
	},
	DEFAULT_ICCLASS: InfiniteCounter(),
	DEFAULT_GENARRCLASS: arrays.LastIndexArray()
}

general.DEFAULT_USTRCLASS = UnlimitedString()
general.DEFAULT_TREENODECLASS = TreeNode()
general.DEFAULT_INFARR = InfiniteArray()
general.DEFAULT_TINTCLASS = TrueInteger()
general.DEFAULT_HEAPCLASS = heaps.PairingHeap()

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
	})
}
