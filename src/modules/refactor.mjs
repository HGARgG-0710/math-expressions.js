import * as aliases from "./exports/aliases.mjs"
import * as comparisons from "./exports/comparisons.mjs"

export const classes = {
	finish: function () {
		return this.this.this.length().get().previous()
	},
	begin: function (go = true) {
		return this.this.this[go ? "go" : "read"](
			this.this.this.init(),
			go ? aliases.TRUTH : undefined
		)
	},
	end: function (go = true) {
		return this.this.this[go ? "go" : "read"](
			this.this.this.finish(),
			go ? aliases.TRUTH : undefined
		)
	},
	suchthat: function (predicate = aliases.TRUTH) {
		const subset = this.this.this.this.class.class()
		for (const element of this.this.this)
			if (predicate(element)) subset.pushback(element)
		return (this.this.this = subset)
	},
	any: function (predicate = aliases.TRUTH) {
		return !this.this.this
			.init()
			.compare(this.this.this.copied("suchthat", [predicate]).length().get())
	},
	every: function (predicate = aliases.TRUTH) {
		return this.this.this.class.template.icclass.template.comparison(
			this.this.this.copied("suchthat", [predicate]).length().get(),
			this.this.this.length().get()
		)
	},
	forEach: function (method = aliases.VOID) {
		for (const x of this.this.this.keys())
			method(this.this.this.read(x), x, this.this.this)
		return this.this.this
	},
	includes: function (element, leftovers = {}) {
		ensureProperties(leftovers, {
			unfound: this.this.this.this.class.template.unfound,
			comparison: comparisons.refCompare
		})
		return !leftovers.comparison(
			this.this.this.firstIndex(element),
			this.this.this.class.template.unfound
		)
	}, 
	copy: function(f = ID) {
				const empty = this.this.this.this.class.class()
				empty.genarr = this.this.this.genarr.copy(f)
				return empty
			}, 
			peek: function() {
				return this.this.this.genarr.read(this.this.this.genarr.finish())
			}, 
			pop: function() {
				return this.this.this.genarr.delete()
			}
}

export const general = {
	fix: function (objs, keys, operation = () => {}, setfunc = (o, k, v) => (o[k] = v)) {
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
	}
}
