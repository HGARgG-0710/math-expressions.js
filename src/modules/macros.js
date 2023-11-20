// * Space for macros and local constants... [used for semantics and simplification of development/code-reading];

// TODO: improve the macros (make them general as well...); Consider self-using the package...;
// ! In particular - later create a General versions of macros (using unlimited types...);
// ! In particular more - create later the 'returnless' versions [namely, the 'infinite stack' function];

// TODO [general; leave for the test-tune period]: make a total safe-check for ALL the methods/macros/functions/classes regarding anything concerning parameter values [default values, the transformations used, alternative values and the way that they behave collectively...];
// TODO [general; leave for tidying-up period]: pray walk through all of code and inspect the desireability of all the elements of the style (ranges from [kinds of functions used in places it does not, as such, matter] to [variable names and conventions used for them] to [whether to use one-time constants for the sake of memory-efficiency or not] to [chosen orders of properties/elements within objects/arrays])
// TODO [general; leave until sometime later]: think further (and more deeply) on the matter of the publicity of the structure that is presented to the user by the results of the various macros;

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
			return CLASS({
				...this,
				function: function (...args) {
					ensureProperties(args, this.template.defaults.constructor)
					return {
						[this.template.defaults.name]: this.template.parentclass.class(
							...args
						)
					}
				}
			})
		},
		...template,
		defaults: {
			name: "sub",
			methods: {
				...template.defaults.methods,
				...(template.toextend === true
					? template.defaults.parentclass.methods
					: ((x) =>
							RESULT.aliases.native.object.obj(
								x,
								x.map((a) => (...args) => {
									// ! THE 'this.class' bit is flawed, must instead rely upon the 'classreference'; [STILL UNFINISHED...]
									// * The problem has now shifted to the fact that the object of such a class instance has no means of accessing the class, which [for it], is the ONLY mean of knowing which of the properties contains the way to the class! 
									// ^ CONCLUSION: to solve this, either:
									// 		% A. the object must itself have the access to the class's name by means of some fixed property...
									// 		% B. the names of the properties in question must be constant...;
									// 		% C. one creates another layer of function abstraction over the methods of a class, that would rely upon the names for the objects in question; Then, the new form of the methods is adapted by this present 'non-static' form and, hence, it no longer depends on the precise values for a function's name!
									// 			* In this case, however, there still remains the problem of flexibility - namely, that each and every method must still be made a TEMPLATE in order for the thing wtih arbitrary namesf for fields to be truly workable with...
									//	^ DECISION: yes, pray do make it so; Only small issue is the following - does one want the TEMPLATEs of methods for decided names of the properties to be completely optional, or not? 
									if (this.class.template.defaults.hasOwnProperty(a)) 
										ensureProperties(args, this.class.template.defaults[a])	
									return this.class.template.parentclass.methods[a](
										...args
									)
								})
							))(
							RESULT.aliases.native.array.arrIntersections([
								Object.keys(this.template.parentclass.methods),
								template.toextend
							])
					  ))
			},
			defaults: {
				constructor: [],
				...template.defaults.defaults
			},
			...template.defaults
		}
	}

	return PRECLASS(ftemplate)
}

export const GENERATOR = NOREST(["generator", "inverse", "range"])
export const PRECLASS = NOREST(["methods", "static"]) // ? Do I want to keep this one in the library even?

// ! GENERALIZE TO ANOTHER [EVEN MORE SO] POWERFUL MACRO!
// ? Make into a template?
// * Use all over the place...
export const CLASS = (ptemplate = {}) => {
	ensureProperties(ptemplate, {
		word: "class",
		recursive: false,
		selfname: "this",
		subselfname: "this",
		classref: "class",
		methods: {},
		static: {}
	})
	// ? Save the 'recursive', or use the PRECLASS instead?
	const template = NOREST([
		"methods",
		"static",
		"recursive",
		"classref",
		"selfname",
		"subselfname"
	])(ptemplate)
	// !!! NOOOOOTTTTEEE: one has recently found out how EXACTLY does NodeJS (and seemingly the ECMA standard altogether) treat the behaviour of the 'this' during the procedures of method-extraction via 'const x = {somemethod: function (...) {...}}; const f = x.somemethod';
	// * Apparantly, during the assignment THE FINAL VALUE OF 'x' __DOES_NOT___ by default retain the 'this' context's value; So, hence, one ALWAYS has to assign it explicitly during such conversions;
	// TODO: pray ensure that this is the thing done _throughout_the_code! TEST THE LIBRARY MOST VIGOROUSLY...
	const POSTTF = template.function.bind(template)
	template.function = function (vtemplate = template.template.deftemplate) {
		const p = POSTTF(vtemplate)
		const POSTF = p[template.template.word]
		p[template.template.word] = function (...args) {
			const V = POSTF(...args)

			// ? QUESTION: does one desire for to use the 'ptemplate' in the way that it is used currently?
			// TODO: after having completed the CLASS, pray restructure the definition of the 'EXTENSION' based off it...
			if (this.recursive) {
				V = {
					[this.classref]: p,
					[this.selfname]: {
						...V
					}
				}
				V[this.selfname][this.subselfname] = V
			}

			// ! [GENERAL] CHECK FOR THE 'in/of' consistency within the 'for' loops; (I think one may have used 'of' where one ought to have written 'in' on more than one occasion...);
			// TODO: this thing does not (generally) expect a TEMPLATE-method (an object in type, not a result of a 'TEMPLATE(...).function'); Pray think of those, and how one'd love to have them implemented...
			for (const x in this.methods)
				V[x] = this.methods[x].bind(
					(template.template.rest.recursive ? (x) => x[this.selfname] : ID)(V)
				)
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
