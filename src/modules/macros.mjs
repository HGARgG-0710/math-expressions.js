// * Space for macros and local constants... [used for semantics and simplification of development/code-reading];

import * as native from "./exports/native.mjs"
import * as structure from "./exports/structure.mjs"
import * as aliases from "./exports/aliases.mjs"
import * as structure from "./exports/structure.mjs"

// TODO: improve the macros (make them general as well...); Consider self-using the package...;
// ? In particular - later create a General versions of macros (using unlimited types...);
// ? In particular more - create later the 'returnless' versions [namely, the 'infinite stack' function];

// TODO [general]: make a total safe-check for ALL the methods/macros/functions/classes regarding anything concerning parameter values [default values, the transformations used, alternative values and the way that they behave collectively...];
// TODO [general]: think further (and more deeply) on the matter of the publicity of the structure that is presented to the user by the results of the various macros;

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
export const RECURSIVE_VARIABLE = (x) => {
	if (x instanceof Object) {
		const r = {
			get: {},
			set(f) {
				this.get = { ...f }
				for (const y in this.get)
					if (aliases.is.fn(this.get[y])) this.get[y] = f[y].bind(this)
			}
		}
		r.set(x)
		return r
	}
	return VARIABLE(x)
}

export const NAMED_TEMPLATE = (f, dname = undefined, dinstance = undefined, rest = {}) =>
	TEMPLATE({ defaults: { name: dname, instance: dinstance }, function: f, ...rest })

export const READONLY = (x) =>
	Object.freeze({
		get: x
	})

// * Allows to define templated classes and functions more non-conventionally;
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
			templateword: "template",
			...template
		},
		function: function (template = this.template.deftemplate) {
			let _class = {}
			// ? Do something about this - don't just leave hanging...;
			const K = (x, i = 0) =>
				x instanceof Array
					? this.template.isthis
						? x[i].bind(this.template.this)()
						: x[i]
					: this.template.isthis
					? x.bind(this.template.this ? this.template.this : _class)()
					: x
			// ! refactor! [again, the native.object methods for immidiate object-property inheritance procedures accomplishment]
			if (this.template.defaults instanceof Array)
				for (const x in this.template.defaults) {
					const k = K(this.template.defaults, x)
					for (const y of k) _class[this.template.templateword][y] = k[y]
					for (const y of template)
						_class[this.template.templateword][y] = template[y]
				}
			_class[this.template.templateword] = {
				...K(this.template.defaults),
				...template
			}
			// ! FIX THIS [the present 'isthis' function do __NOT__ adhere to this requirement of possessing a 'this'-wrapper...] - simply use the 'aliases.native.function.const' on it...;
			_class[this.template.word] = (
				this.template.isthis
					? (x) => x(this.template.this ? _class : this.template.this)
					: ID
			)(this.template.function).bind(_class)
			for (const x in this.template.rest) _class[x] = { ...this.template.rest[x] }
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

// ? Generalize? [the user won't need that much for the "manual" cases, only when doing something meta; Do later...]
export const HIERARCHY = function (hierarr = []) {
	return structure.native.repeatedApplication(
		TEMPLATE(hierarr[hierarr.length - 1]),
		hierarr.length - 1,
		(r, i) => INHERIT(hierarr[hierarr.length - i], r),
		-2
	)
}

// ! Partially solved the issue of non-copiability of the methods produced by the 'EXTENSION' macro using 'deepCopy' (or, generally, '.bind'), but now the dilemma is somewhat different:
// * 	IF one decides to copy a thing in question, then the keywords for reference ('name'), must be exactly the same; Namely, one doesn't really utilize the fact that there is a TEMPLATE underneath all this... [it works as if there isn't one...]; Consider making it different from that...
// 		% In particular, it's because there is not a reference to the object in question that'd be available to the user - the value is simply copied from the original 'template', so as to work with the default value;
// ! ADD THE ABILITY TO INHERIT FROM MULTIPLE CLASSES! [change the general structure of the '.names' and '.parentclass'];
// ? ADD THE ABILITY TO USE THE '.function' on EXTENSIONs;
export const EXTENSION = (template = {}) => {
	// ? refactor this repeating 'ensureProperties';
	ensureProperties(template, {
		word: "class",
		recursive: false,
		selfname: "this",
		subselfname: "this",
		classref: "class",
		methods: {},
		static: {},
		isgeneral: {},
		toextend: true,
		defaults: {},
		index: {}
	})
	const ftemplate = {
		function: function (template = {}) {
			return CLASS({
				...this,
				function: function (...args) {
					ensureProperties(
						args,
						this.template.defaults.constructor.map((x) => x.bind(this)())
					)
					const X = {}
					let i = 0
					for (const y of this.template.names)
						X[y] = this.template.defauls.outer(
							this.template.parentclass.class(
								...this.template.defaults.inter.bind(this)(args, i, X)
							),
							i++
						)
					return X
				},
				...template
			})
		},
		...template,
		defaults: {
			names: ["sub"],
			defaults: {
				constructor: [],
				inter: aliases.cdieach,
				outer: ID,
				...template.defaults.defaults
			},
			...template.defaults
		},
		methods: {
			...template.methods,
			...((x) =>
				OBJECT(
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
									// ! This is not general. Reconsider deeply. First - should be ability to return arbitrary 'this'-bound expression (including 'this' itself); Second - think of whether this does the job for recursive classes as well [test, in other words...]; Third - look through the code and consider some powerful generalization cases which would be desired by one's code...
									return this[
										this[name.classref].template.names[name.index]
									][a](...args)
								}.bind(instance)
							},
							{
								classref: template.classref,
								index: template.index[a] || 0
							}
						)
					])
				))(
				template.toextend === true
					? template.defaults.parentclass.methods
					: native.array.arrIntersections([
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

export const GENERATOR = NOREST(["inverse", "range"], { word: "generator" })
// ? Add the 'parentclass' and 'names' in there? Pray consider...;
export const PRECLASS = NOREST([
	"methods",
	"static",
	"recursive",
	"classref",
	"selfname",
	"subselfname",
	"isgeneral",
	"properties",
	"isname"
])

// ? generalize to another macro, maybe?
// * Use all over the place...
export const CLASS = (ptemplate = {}) => {
	ensureProperties(ptemplate, {
		word: "class",
		// ! alias for that;
		function: () => ({}),
		methods: {},
		static: {},
		recursive: false,
		classref: "class",
		selfname: "this",
		subselfname: "this",
		isgeneral: {},
		properties: {},
		isname: "is"
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

			if (this.recursive) {
				V = {
					[this.classref]: this,
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

			const O = this.recursive ? V[this.selfname][this.subselfname] : V
			for (const pr in this.properties)
				O[p] = this.properties[pr].bind(this)(...args)
			return V
		}.bind(p)
		p[p.isname] = function (x) {
			return (
				x.hasOwnProperty("class") &&
				structure.structure().function(this).recisomorphic(x.class)
			)
		}.bind(p)
		// * Note: this __doesn't__ (and isn't supposed to) check for presence of methods within the class in question - only for the presence of it in the recursive 'names-chain';
		p[Symbol.hasInstance] = function (x) {
			return (
				this.is(x) ||
				(x.class.template.names &&
					x.class.template.names.any((n) => x[n] instanceof this))
			)
		}.bind(p)
		return p
	}
	return template
}

export const NOREST = function (labels = [], btemplate = {}) {
	return function (template = {}) {
		const X = { ...btemplate }
		// ! refactor! [make a method for array disjunction...];
		for (const a in template) if (!labels.includes(a)) X[a] = template[a]
		X.rest = {}
		// ! refactor!
		for (const l of labels) X.rest[l] = template[l]
		X.rest = { ...X.rest, ...template.rest }
		return TEMPLATE(X)
	}
}

export const DEOBJECT = function (obj = {}) {
	return [Object.keys, Object.values].map((x) => x(obj))
}

export const OBJECT = function (keys = [], values = []) {
	let length = Math.min([keys.length, values.length])
	const returned = {}
	for (let i = 0; i < length; i++) returned[keys[i]] = values[i]
	return returned
}

export const NOMODULE = function (moduleobj) {
	return OBJECT(Object.keys(moduleobj), Object.values(moduleobj))
}

// ! Use throughout...Maybe, pick a more plausible name...
// * Stands for 'Obj-Func-Def-Key-List'
export const OFDKL = (obj, f, keylist = [], bind = false) => {
	for (const x of keylist) obj[x] = (bind ? (x) => x.bind(obj) : ID)(f(x))
}
