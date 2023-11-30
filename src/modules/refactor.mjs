export const classes = {
	finish: function () {
		return this.this.this.length().get().previous()
	},
	begin: function () {
		return this.this.this.go(this.this.this.init(), RESULT.aliases._const(true))
	},
	end: function () {
		return this.this.this.go(this.this.this.finish(), RESULT.aliases._const(true))
	},
	suchthat: function (predicate = aliases._const(true)) {
		const subset = this.this.this.this.class.class()
		for (const element of this.this.this)
			if (predicate(element)) subset.pushback(element)
		return (this.this.this = subset)
	},
	any: function (predicate = aliases._const(true)) {
		return !this.this.this
			.init()
			.compare(this.this.this.copied("suchthat", [predicate]).length().get())
	},
	every: function (predicate = aliases._const(true)) {
		return this.this.this.class.template.icclass.template.comparison(
			this.this.this.copied("suchthat", [predicate]).length().get(),
			this.this.this.length().get()
		)
	},
	forEach: function (method = aliases.void) {
		for (const x of this.this.this) method(x)
		return this.this.this
	},
	includes: function (element) {
		return (
			this.this.this.firstIndex(element) !== this.this.this.class.template.unfound
		)
	}
}

export const general = {
	fix: function (objs, keys, operation = () => {}, setfunc = (o, k, v) => (o[k] = v)) {
		const remember = objs.map((obj, i) => objs)
		for (let i = 0; i < objs.length; i++) remember.push(objs[i][keys[i]])
		const returned = operation()
		for (let i = 0; i < remember.length; i++) setfunc(objs[i], keys[i], remember[i])
		return returned
	}
}
