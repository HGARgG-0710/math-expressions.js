// * Space for macros and local constants... [used for semantics and simplification of development/code-reading];

// TODO: improve the macros (make them general as well...); Consider self-using the package...;

export const ID = (a) => a

export const TYPED_VARIABLE =
	(type = ID) =>
	(x) => {
		return {
			get: type(x),
			set(t) {
				return (this.get = type(t))
			}
		}
	}

export const VARIABLE = TYPED_VARIABLE()

// * Allows to define templated classes and functions more non-conventionally;
// ! use actively across the entire library...
// TODO: optimize the macros; [re-implement them more desireably...];
export const TEMPLATE = function (template = {}) {
	return {
		template: {
			deftemplate: {},
			defaults: {},
			word: "class",
			function: ID,
			isthis: false,
			this: null,
			rest: {},
			transform: ID,
			...template
		},
		f: function (template = this.template.deftemplate) {
			const _class = {
				template: {
					...(this.template.isthis
						? this.template.defaults(this.template.this)
						: this.template.defaults),
					...template
				},
				...this.template.rest
			}
			_class[this.template.word] = (
				this.template.isthis
					? this.template.function(this.template.this)
					: this.template.function
			).bind(_class)
			return this.template.transform(_class, template)
		}
	}
}

export const INHERIT = function (x, X) {
	return {
		template: {
			inherited: X,
			defchild: x,
			this: null
		},
		f: function (target = this.template.defchild) {
			const _class = {
				template: {
					...target.defaults(this.template.this)
				},
				...target.rest
			}
			this.template.inherited.template.this = _class
			_class[target.word] = this.template.inherited.f
			return x.transform(_class)
		}
	}
}

// TODO: update the previous usages of TEMPLATES in accordance with the new 'templated' templates...
export const HIERARCHY = function (hierarr = []) {
	// ? rewrite using the repeatedApplication?
	// * Add the infinite types version [as a macro - this'll do, for now...];
	let final = TEMPLATE(hierarr[hierarr.length - i])
	for (let i = 1; i <= hierarr.length; i++)
		final = INHERIT(hierarr[hierarr.length - i], final)
	return final
}

// * This function shall be used by:
// 	1. InfiniteMap (extends GeneralArray);
//  2. UnlimitedString (extends GeneralArray);
//  3. NArray (maybe, if it's going to be a class and a separate API; extends GeneralArray)
export const EXTENSION = TEMPLATE(
	function (...args) {
		if (this.template.defaults.constructor)
			ensureProperties(args, this.template.defaults.constructor)

		let X = {
			template: this.template.defaults.template,
			[this.template.name.classrefname]: this,
			[this.template.name.instname]: this.template.class.class(...args)
		}

		// How to 'turn it off'
		if (this.template.name.selfname != null) {
			X[this.template.name.instname][this.template.name.selfname] = X

			for (const method in this.template.methods) {
				X[method] = this.template.methods[method](this)
			}
		} else X = { ...X, ...this.template.methods }

		const extkeys = RESULT.aliases.native.array.arrIntersections(
			Object.keys(X[this.template.name.instname]),
			this.template.toextend
		)
		for (const x of extkeys)
			X[x] = function (...args) {
				if (this.class.template.defaults.methods[x])
					ensureProperties(args, this.class.template.defaults.methods[x])
				return this[this.class.template.name][x](...args)
			}.bind(X)

		return X
	},
	{
		name: {
			classrefname: "class",
			instname: "proto",
			selfname: "this"
		},
		methods: {},
		defaults: { constructor: [], methods: {}, template: {} },
		toextend: []
	},
	"function"
)

// ! PROBLEM: the way that this thing ties with other functions - namely, the 'nominal' "[template.word]: ID" property; Consider it more carefully, pray...
export const GENERATOR = function (template = {}) {
	return TEMPLATE({
		...template,
		rest: {
			generator: template.generator,
			inverse: template.inverse,
			range: template.range,
			...template.rest
		}
	})
}
