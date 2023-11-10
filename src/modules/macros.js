// * Space for macros and local constants... [used for semantics and simplification of development/code-reading];

// TODO: improve the macros (make them general as well...); Consider self-using the package...;

export const ID = (a) => a

// ? Make a template? [namely, allow the user to define the default type of the TYPED_VARIABLE?]
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
// ! The default keyword is now 'function' and not '.class';
export const TEMPLATE = function (template = {}) {
	return {
		template: {
			deftemplate: {},
			defaults: {},
			word: "function",
			function: ID,
			isthis: false,
			this: null,
			rest: {},
			transform: ID,
			...template
		},
		function: function (template = this.template.deftemplate) {
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
// ! PROBLEM [1]: must have a different 'X' structure; [Look at UnlimitedString, for an example];
// ! PROBLEM [2]: missing a layer - what is must return is the new *CLASS* based off another class (one that's capable of producing an instance itself), not an instance of that another class;
export const EXTENSION = TEMPLATE(
	function (...args) {
		ensureProperties(args, this.template.defaults.constructor)

		const s = this.template.name.selfname === null
		const X = s
			? {
					[this.template.name.instname]: this.template.parentclass.class(
						...args
					),
					...this.template.methods
			  }
			: {}

		// How to 'turn it off'
		if (!s) {
			X[this.template.name.instname][this.template.name.selfname] = X
			X[this.template.name.instname][this.template.name.subinstancename] =
				this.template.parentclass.class(...args)
			for (const method in this.template.methods)
				X[method] = this.template.methods[method](this)
		}

		X[this.template.name.classrefname] = this

		// ! PROBLEM: with the way that the 'this.template.toextend' works like;
		// * Pray consider a more general [id est, convinient] design for it...
		for (const x in RESULT.aliases.native.array.arrIntersections([
			Object.keys(this.template.parentclass.methods),
			this.template.toextend
		]))
			X[this.template.name.instname][x] = function (...args) {
				if (this.class.template.defaults.methods[x])
					ensureProperties(args, this.class.template.defaults.methods[x])
				// ? Is this correct, pray?
				return this[this.class.template.name][x](...args)
			}.bind(X)

		return X
	},
	{
		name: {
			classrefname: "class",
			instname: "proto",
			selfname: "this",
			subinstancename: "sub"
		},
		methods: {},
		defaults: { constructor: [], methods: {}, template: {} },
		toextend: []
	},
	"function"
)

export const GENERATOR = NOREST(["generator", "inverse", "range"])
export const CLASS = NOREST(["methods", "static"])

// ! PROBLEM: the way that this thing ties with other functions - namely, the 'nominal' (in reality, missing) "[template.word]: ID" property from the TEMPLATE definiton;
// Consider it more carefully, pray...
export const NOREST = function (labels = []) {
	return function (template = {}) {
		const X = {
			...template,
			rest: {}
		}
		// ! refactor!
		for (const l of labels) X.rest[l] = template[l]
		X.rest = { ...X.rest, ...template.rest }
		return TEMPLATE(X)
	}
}
