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

export const NAMED_TEMPLATE = (f, dname = undefined, dinstance = undefined, rest = {}) =>
	TEMPLATE({ defaults: { name: dname, instance: dinstance }, function: f, ...rest })

export const READONLY = (x) =>
	Object.freeze({
		get: x
	})

// * Allows to define templated classes and functions more non-conventionally;
// ! use actively across the entire library...
// TODO: optimize the macros; [re-implement them more desireably...];
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
// ! Partially solved the issue of non-copiability of the methods produced by the 'EXTENSION' macro using 'deepCopy' (or, generally, '.bind'), but now the issue is somewhat different:
// * 	IF one decides to copy a thing in question, then the keywords for reference ('name'), must be exactly the same; Namely, one doesn't really utilize the fact that there is a TEMPLATE underneath all this... [it works as if there isn't one...]; Consider making it different from that...
// 		% In particular, it's because there is not a reference to the object in question that'd be available to the user - the value is simply copied from the original 'template', so as to work with the default value;  
export const EXTENSION = (template = {}) => {
	// TODO: refactor this piece of code, pray...
	ensureProperties(ptemplate, {
		word: "class",
		recursive: false,
		selfname: "this",
		subselfname: "this",
		classref: "class",
		methods: {},
		static: {},
		isgeneral: {},
		toextend: true
	})
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
			defaults: {
				constructor: [],
				...template.defaults.defaults
			},
			...template.defaults
		},
		methods: {
			...template.methods,
			...((x) =>
				RESULT.aliases.native.object.obj(
					x,
					x.map((a) => [
						template.isgeneral[x] || false,
						NAMED_TEMPLATE(
							function (
								instance = this.template.instance,
								name = this.template.name
							) {
								return function (...args) {
									if (
										this[
											name.classref
										].template.defaults.hasOwnProperty(a)
									)
										ensureProperties(
											args,
											this[name.classref].template.defaults[a]
										)
									// ? Question: does one want the individual treatment of each and every parentclass method in regard of whether they should be bound to
									// ! PROBLEM [1]: with 'recursive' classes and the way that '.bind' works for them - the separate '.bind' must be implemented for these kinds of methods, seemingly... [namely], one must have the thing attributed to the right part of it... - not the '{classref: ..., selfname: ...}' part, but the '.selfname: {...}' part...;
									// ! PROBLEM [2]: with the referencing of the 'recursive' class properties, namely the fact that the '[...]' operator doesn't universally work in the desired fashion with the properties of the thing...
									// ^ IDEA [for a solution]: implement the '.get(...)' method for the classes objects [namely, in the { classref: ..., selfname?: ... } part], which'd resolve this uncertainty [for non-recursive classes would return a thing as-is, whereas for the recursive ones - it'd do the '[.selfname][x]' thing...]; 
									// * For this thing to work properly, the '.get' method must be present and used in all the CLASSes and macros related to CLASSes; 
									return this[
										this[name.classref].template.defaults.name
									][a](...args)
								}.bind(instance)
							},
							{
								classref: template.classref,
							}
						)
					])
				))(
				template.toextend === true
					? template.defaults.parentclass.methods
					: RESULT.aliases.native.array.arrIntersections([
							Object.keys(template.defaults.parentclass.methods),
							template.toextend
					  ])
			)
		}
	}
	// ! CONSIDER, whether to change this to letting the '.toextend' stay + making it more flexible [id est, either adding another abstraction layer or changing the way that the '.toextend' is treated here...];
	delete ftemplate.toextend
	return PRECLASS(ftemplate)
}

// ! the 'function' is nominal... Consider, whether one wants to do something about it...
export const GENERATOR = NOREST(["generator", "inverse", "range"])
export const PRECLASS = NOREST([
	"methods",
	"static",
	"recursive",
	"classref",
	"selfname",
	"subselfname",
	"isgeneral"
])

// ! GENERALIZE TO ANOTHER [EVEN MORE SO] POWERFUL MACRO!
// ? Make into a template? [Highly doubtful currently...]
// * Use all over the place...
export const CLASS = (ptemplate = {}) => {
	ensureProperties(ptemplate, {
		word: "class",
		recursive: false,
		selfname: "this",
		subselfname: "this",
		classref: "class",
		methods: {},
		static: {},
		isgeneral: {}
	})
	const template = PRECLASS(ptemplate)
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
			for (const x in this.methods) {
				const isarr = this.methods[x] instanceof Array
				if (isarr || this.isgeneral.hasOwnProperty(x)) {
					const B = isarr
						? this.methods[x]
						: [this.isgeneral[x], this.methods[x]]
					const A = B[1]
					A.template.instance = (this.recursive ? (x) => x[this.selfname] : ID)(
						V
					)
					V[x] = B.methods[0] ? A.function.bind(A) : A.function()
					continue
				}
				V[x] = this.methods[x].bind(
					(this.recursive ? (x) => x[this.selfname] : ID)(V)
				)
			}
			return V
		}.bind(p)
		return p
	}
	return template
}

export const NOREST = function (labels = []) {
	return function (template = {}) {
		const X = {}
		// ! refactor!
		for (const a in template) if (!labels.includes(a)) X[a] = template[a]
		X.rest = {}
		// ! refactor!
		for (const l of labels) X.rest[l] = template[l]
		X.rest = { ...X.rest, ...template.rest }
		return TEMPLATE(X)
	}
}
