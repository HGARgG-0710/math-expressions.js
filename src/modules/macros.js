// * Space for macros and local constants... [used for semantics and simplification of development/code-reading];

// TODO: improve the macros (make them general as well...); Consider self-using the package...;
// ! In particular - later create a General versions of macros (using unlimited types...);
// ! In particular more - create later the 'returnless' versions [namely, the 'infinite stack' function];

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

// * This macro shall be used to determine:
// 	1. InfiniteMap (extends GeneralArray);
//  2. UnlimitedString (extends GeneralArray);
//  3. NArray (maybe, if it's going to be a class and a separate API; extends GeneralArray)
export const EXTENSION = (template = {}) => {
	const ftemplate = {
		function: function (template = {}) {
			// ! FINISH THIS: the present issue is with the structure of the result of the 'function:' underneath... Decide how ought it all look like...
			// ^ CONCLUSION: in order to finish the 'EXTENSION', one must also work with the presence/lack of turning on/off of the 'this.this.this' construct (and, additionally, the generalization of it, like it is here...)
			return CLASS({
				function: function (...args) {
					ensureProperties(args, this.template.defaults.constructor)

					// ? Make more general?
					const s =
						this.template.name.subinstancename === null ||
						this.template.name.selfname === null
					const X = s
						? {
								[this.template.name.instname]:
									this.template.parentclass.class(...args)
						  }
						: {}

					// How to 'turn it off'
					// ! the 'CLASS' macro must also be able to 'turn this.this.this off'...
					if (!s) {
						X[this.template.name.instname][this.template.name.selfname] = X
						X[this.template.name.instname][
							this.template.name.subinstancename
						] = this.template.parentclass.class(...args)
						for (const method in this.template.methods)
							X[method] = this.template.methods[method].bind(
								(s ? ID : (x) => x[this.template.name.instname])(X)
							)
					}

					X[this.template.name.classrefname] = this

					for (const x in RESULT.aliases.native.array.arrIntersections([
						Object.keys(this.template.parentclass.methods),
						this.template.toextend
					])) {
						const R = this.template.parentclass.methods[x].bind(X)
						X[this.template.name.instname][x] = function (...args) {
							if (
								this[this.template.name.classrefname].template.defaults
									.methods[x]
							)
								ensureProperties(
									args,
									this[this.template.name.classrefname].template
										.defaults.methods[x]
								)
							return R(...args)
						}.bind(X)
					}

					return X
				},
				methods: { ...this.template.methods },
				static: { ...this.template.static }
			})
		},
		...template,
		defaults: {
			name: {
				classrefname: "class",
				instname: "proto",
				selfname: "this",
				subinstancename: "sub",
				...template.defaults.name
			},
			methods: { ...template.defaults.methods },
			defaults: {
				constructor: [],
				methods: {},
				template: {},
				...template.defaults.defaults
			},
			toextend: [
				...(template.toextend === true
					? template.defaults.parentclass.methods
					: template.toextend)
			],
			...template.defaults
		}
	}

	return PRECLASS(ftemplate)
}

export const GENERATOR = NOREST(["generator", "inverse", "range"])
export const PRECLASS = NOREST(["methods", "static"])
// ! GENERALIZE TO ANOTHER [EVEN MORE SO] POWERFUL MACRO!
// * Use all over the place...
export const CLASS = (ptemplate = {}) => {
	ensureProperty(ptemplate, "word", "class")
	const template = PRECLASS(ptemplate)
	const POSTTF = template.function
	template.function = function (vtemplate = template.template.deftemplate) {
		const p = POSTTF(vtemplate)
		const POSTF = p[template.template.word]
		p[template.template.word] = function (...args) {
			const V = POSTF(...args)
			// ! FURTHER PROBLEM - solved the '.methods' bit, now - what about the '.this'?
			// * The thing in question uses the 'this.this.this' structure...;
			// ? One wanted to use it across the library...\
			// ^ decision [temporary]: for now only, let the thing stay as-is, AND all the library's classes now use the 'this.this.this';
			// ! later, one'll generalize;
			// ! [GENERAL] CHECK FOR THE 'in/of' consistency within the 'for' loops; (I think one may have used 'of' where one ought to have written 'in' on more than one occasion...);
			for (const x in this.methods) V[x] = this.methods[x].bind(V.this)
			return V
		}.bind(p)
		return p
	}
	return template
}

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
