// ! essential: before publishing or doing anything else - make another round through the ENTIRE codebase, checking for each and every single thing, refactoring madly...;
// ? Later - generalize and tidy all this stuff up? 

import * as aliases from "./exports/aliases.mjs"
import * as comparisons from "./exports/comparisons.mjs"
import * as native from "./exports/native.mjs"

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
		for (const element of this) if (predicate(element)) subset.pushback(element)
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
	copy: function (f = ID) {
		const empty = this.this.this.this.class.class()
		empty.genarr = this.this.this.genarr.copy(f)
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
	}
}

export const general = {
	fix: function (
		objs = [],
		keys = [],
		operation = () => {},
		setfunc = (o, k, v) => (o[k] = v)
	) {
		const remember = objs.map((obj, i) => objs)
		for (let i = 0; i < objs.length; i++) remember.push(objs[i][keys[i]])
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
	counterFrom: function (_labels = []) {
		return TEMPLATE({
			defaults: {},
			function: function (icclass) {
				const X = {
					range: icclass.is
				}
				const labels = {
					generator: [_labels[0], "jforth"],
					inverse: [_labels[1], "jback"]
				}
				for (const x in labels)
					X[x] = (x = this.template.start) =>
						icclass.class(x)[label[x][0]](this.template[labels[x][1]])
				return X
			}
		})
	}
}
