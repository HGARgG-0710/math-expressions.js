// * The library's source code file (due to ESM's almost total ineffectiveness in handling anyhow complex recursive imports, the library's inner representation format was changed)

// ? [for v1.1? maybe, not do at all?] CREATE CLEAR DEFINITION FOLLOWING IN THIS FILE - LET DIFFERENT MODULES BE DISTINGUISHABLE SOMEHOW...
// ! FIX THE ERRORS RELATED TO SOME MISSING TEMPLATE-PROPERTIES AT RUNTIME [examples: 'no defaults.parentclass for an EXTENSION']

export const refCompare = (a, b) => a === b
export const ID = (a) => a
// * Identity map (just a nice piece of notation, that's all);
export const id = ID
// ! generalize...
export const empf =
	(f) =>
	(...dargs) =>
	(...args) =>
		f(...args)(...dargs)

export const abs = Math.abs

export const bool = Boolean
export const str = String
export const num = Number
export const obj = Object
export const sym = Symbol
export const udef = undefined
export const set = Set
export const arr = Array
export const fn = Function
export const fun = Function
export const bi = BigInt
export const nil = null

export const is = {
	bool: (x) => x === true || x === false,
	str: (x) => typeof x === "string" || x instanceof String,
	num: (x) => typeof x === "number" || x instanceof Number,
	obj: (x) => typeof x === "object" && x instanceof Object,
	sym: (x) => typeof x === "symbol",
	udef: (x) => x === undefined,
	set: (x) => x instanceof Set,
	arr: (x) => x instanceof Array,
	fn: (x) => x instanceof Function,
	fun: (x) => typeof x === "function",
	bi: (x) => x instanceof BigInt,
	nan: isNaN,
	class: (cl) => cl.is
}

// ? NOTE: a minor limitation - the function passed MUST NOT BE ALREADY BOUND!!! [see if there's a desireable way to check besides '.hasOwnProperty("prototype")'...];
// ^ IDEA [note]: THIS ALLOWS FOR CLASS-INSTANCE-INHERITANCE! IMPLEMENT IT... ('toClass' method for turning a class instance into a class + 'sameClass/fromInstance' method for creating an instance of the same class as that of the passed one..);
export const BindableFunction = TEMPLATE({
	// ? Decide for a better placeholder function?
	defaults: { origin: ID, defaultThis: null },
	function: function (f = null, thisObj = this.template.defaultThis, ...defargs) {
		const ownerobj = {}
		// ! ISSUE: with the purely template-based approach for functions - it doesn't work, functions (generally) don't have means of accessing themselves...;
		const newfun = function (...args) {
			return (
				is.fun(ownerobj.f.origin) ? ownerobj.f.origin : ownerobj.f.class.origin
			).call(ownerobj.f.this, ...defargs, ...args)
		}

		// * note: private variable 'ownerobj' is needed because without it, the function has no means of accessing its own data from within its own calls...
		ownerobj.f = newfun

		// * this is so as to allow for 'single-separation' from a class...
		newfun.class = this
		// ^ IDEA [for general reimplementation of the default-defaults- system throughout the library]: instead of just linking the passed args to 'this.this...(.class, or whatever).template.varname', one checks for whether it is non-null EVERYWHERE WHERE IT'S USED (namely, dynamic replacement instead of static);
		// % That kind of generalization would allow to EXPLICITLY create classes-based variables and AS EXPLICITLY, to separate them...
		// ? But does one want that behaviour everywhere?
		// * Answer: no, probably not. Hence, CONCLUSION - add this behaviour everywhere, where desired to the library, but in other places - keep things as they are (namely, separate the semantics of terms 'defaults-defaults' and 'templates').
		newfun.origin = f
		newfun.this = thisObj

		newfun.bindArr = function (x, args = []) {
			return this.bind(x, ...args)
		}

		newfun.bind = function (x, ...args) {
			const R = this.class.function(
				(is.fn(this.origin) ? this : this.class.template).origin,
				...args
			)
			R.this = x
			return R
		}

		newfun.apply = function (thisObj = this.this, args = []) {
			return this.call(thisObj, ...args)
		}

		newfun.call = function (thisObj = this.this, ...args) {
			return (is.fn(this.origin) ? this : this.class.template).origin.call(
				thisObj,
				...args
			)
		}

		newfun.switchclass = function (template = {}) {
			return BindableFunction(template).function(
				(is.fun(this.origin) ? this : this.class.template).origin
			)
		}

		newfun.toString = function () {
			// ! refactor that - (is.fun(...) ? ... : this.class.... )...
			return (
				is.fun(this.origin) ? this.origin : this.class.template.origin
			).toString()
		}

		return newfun
	}
}).function

export const FUNCTION = BindableFunction()
const _FUNCTION = FUNCTION.function

// ? Export or no? [if export, then make sure that this thing has a more 'sounding' name...]; Maybe, make a part of 'refactoring' instead? [serves little semantic purpose apart from the trivial one...];
// * Stands for 'Obj-Func-Def-Key-List'
const OFDKL = (obj, f, keylist = [], bind = false) => {
	for (const x of keylist) obj[x] = (bind ? (x) => x.bind(obj) : ID)(f(x))
}

const INTERSECTION = (a, b) => {
	const f = []
	for (const x of a) for (const y of b) if (x === y && !f.includes(x)) f.push(x)
	return f
}

// ? Again - export or not?
export const NAMED_TEMPLATE = (f, dname = undefined, dinstance = undefined, rest = {}) =>
	TEMPLATE({
		defaults: { name: dname, instance: dinstance },
		function: f,
		...rest
	})

export const alinative = {
	number: {
		numconvert: (x) => (isNaN(x) ? 0 : Number(x)),
		negind: (x, arr) => (x < 0 ? arr.length + x : x),
		nneg: (x) => (x < 0 ? -x : x)
	},

	string: {
		stoa(x = "") {
			return x.split("")
		},
		atos(x = []) {
			return x.join("")
		},
		fcc: String.fromCharCode
	},

	array: {
		// * What about 'firstSuch' and 'lastSuch' instead??? Then, '_first' and '_last' would be just 'first' and 'last' correspondently...
		last: (arr, obj, comparison = valueCompare) => {
			return max(
				alarray.native
					.indexesOf({ comparison: comparison })
					.function(arr, obj, comparison)
			)
		},
		first: (arr, obj, comparison = valueCompare) => {
			return min(
				alarray.native
					.indexesOf({ comparison: comparison })
					.function(arr, obj, comparison)
			)
		},
		_last: (arr) => arr[arr.length - 1],
		_first: (arr) => arr[0],
		insert: (arr, index, values, replacing = false) =>
			arr
				.slice(0, index)
				.concat(values)
				.concat(arr.slice(replacing ? (x) => x + values.length : index)),
		_insert: (arr, index, val) => alinative.array.insert(arr, index, [val]),
		remove: (arr, start, end) => arr.slice(0, start).concat(arr.slice(end + 1)),
		_remove: (arr, index) => remove(arr, index, index),
		minlen: (...arrs) => flen(min, ...arrs),
		maxlen: (...arrs) => flen(max, ...arrs),
		flen: (f, ...arrs) => {
			return f(arrs.map((a) => a.length))
		},
		flenarrs: (f, ...arrs) => {
			const _f = f(...arrs)
			return arrs.filter((a) => a.length === _f)
		},
		minlenarrs: (...arrs) => flenarrs(minlen, ...arrs),
		maxlenarrs: (...arrs) => flenarrs(maxlen, ...arrs),
		propertymap: (prop) => (objs) => objs.map((a) => a[prop]),

		// ? does one want to rename these two?
		arrThisApply: function (f, arr, thisArg = null) {
			return f.apply(thisArg, arr)
		},
		arrApply: function (f, arr) {
			return f(...arr)
		},
		noarrs(array = []) {
			return array.filter(negate(is.arr))
		},
		arrsonly(array = []) {
			return array.filter(is.arr)
		},
		// ? Does one want to keep those?
		_multmap: function (a, fs) {
			return multmap([a], fs)[0]
		},
		multmap: function (a, fs) {
			return a.map((el) => fs.map((f) => f(el)))
		},
		// ! try hard to use arrow functions only for the aliases;
		hasArrays: (array = []) => array.any(is.arr)
	},

	function: {
		const: (c) => () => c,
		void: () => {},
		bind: (a, f, fieldName) => (a[fieldName] = f.bind(a)),
		// TODO: pray finish [generalize to an arbitrary position for each and every function + additional arguments' lists...]
		compose: (fc, args = []) => {
			return this.composition(fc)(...args)
		},
		// ! Use this one extensively...
		// ? Not general enough... Do the same thing as with the 'finite' - then, rewrite 'finite' using wrapper...;
		wrapper: TEMPLATE({
			defaults: {
				inarr: false,
				in: id,
				out: id,
				deff: id
			},
			function: _FUNCTION(function (f = this.template.deff) {
				return this.template.inarr
					? (x, ...rest) =>
							this.template.out(f(...this.template.in(x), ...rest))
					: (x, ...rest) => this.template.out(f(this.template.in(x), ...rest))
			})
		}).function,
		condfunc: (cond, elseval) => (f) => (x) => cond() ? f(x) : elseval,

		// ? Generalize this to a context (add 'this');
		adddefaults:
			(f) =>
			(defaults = []) => {
				return (...args) => {
					for (const x in defaults) if (!(x in args)) args[x] = defaults[x]
					return f(...args)
				}
			},
		paramDecide:
			(cond) =>
			(a = ID, b = ID) =>
			(...args) =>
				(cond() ? a : b)(...args),

		index: (i) => (x) => x[i],
		rindex: (x) => (i) => x[i],

		exparr: (f) => (arr) => f(...arr),
		rexparr: (arr) => (f) => f(...arr),
		call: (x) => x(),
		argscall: function (...args) {
			return this.rexparr(args)
		}
	},

	object: {
		ensureProperty: function (object, property, value = undefined) {
			if (!object.hasOwnProperty(property)) object[property] = value
		},
		// * A convinient general-version...
		ensureProperties: function (object, defaultobj) {
			for (const x in defaultobj) this.ensureProperty(object, x, defaultobj[x])
		},
		// ? should this be in the 'object' or in 'function'?
		property:
			(p) =>
			(x) =>
			(...args) =>
				x[p](...args),
		rproperty:
			(p) =>
			(...args) =>
			(x) =>
				x[p](...args),
		empty: () => ({})
	},

	boolean: {
		n: (x) => !x,
		t: true,
		f: false,
		btic: (x, _class) => _class.static[x ? "one" : "zero"]()
	},

	binary: {
		add: (a, b) => a + b,
		sub: (a, b) => a - b,
		mult: (a, b) => a * b,
		div: (a, b) => a / b,
		power: (a, b) => a ** b,
		xor: (a, b) => a ^ b,
		rshift: (a, b) => a >> b,
		lshift: (a, b) => a << b,
		and: (a, b) => a & b,
		or: (a, b) => a | b,
		modulo: (a, b) => a % b,
		dand: (a, b) => a && b,
		dor: (a, b) => a || b
	}
}

export const trimBeginning =
	(n = 1) =>
	(x) =>
		x.slice(n)
export const trimEnd =
	(n = 1) =>
	(x) =>
		x.slice(0, x.length - n)

// ! use the 'composition' and 'wrapper' especially much with the 'aliases' to obtain new ones...;
export const cdieach = (x, i) => [x[i]]
export const hasFunction = (x, m) => x.hasOwnProperty(m) && typeof x[m] === "function"
export const inarr = (x) => [x]

export const Stack = (parentclass = general.DEFAULT_GENARRCLASS) => {
	return EXTENSION({
		defaults: defaults.basicgenarr(parentclass),
		toextend: [],
		methods: {
			// ! work on such 'renamed' methods, pray; The possibilities for extension, currently, are, extremely narrow-cased;
			push: _FUNCTION(function (element) {
				return this.this.this.genarr.pushback(element)
			}),
			pop: refactor.classes.pop,
			peek: refactor.classes.peek,
			copy: refactor.classes.copy
		},
		recursive: true
	})
}
export const Queue = (parentclass = general.DEFAULT_GENARRCLASS) => {
	return EXTENSION({
		defaults: defaults.basicgenarr(parentclass),
		toextend: [],
		methods: {
			enqueue: _FUNCTION(function (element) {
				return this.this.this.genarr.pushfront(element)
			}),
			dequeue: refactor.classes.pop,
			front: refactor.classes.peek,
			copy: refactor.classes.copy
		},
		recursive: true
	})
}

const refactor = {
	// ! essential: before publishing or doing anything else - make another round through the ENTIRE codebase, checking for each and every single thing, refactoring madly...;
	// ? Later - try to redistribute all this somewhere accordingly?
	classes: {
		finish: _FUNCTION(function () {
			return this.length().get().previous()
		}),
		begin: _FUNCTION(function (go = true) {
			return this[go ? "go" : "read"](this.init(), go ? TRUTH : undefined)
		}),
		end: _FUNCTION(function (go = true) {
			return this[go ? "go" : "read"](this.finish(), go ? TRUTH : undefined)
		}),
		suchthat: _FUNCTION(function (predicate = TRUTH) {
			// ? After all - is it 'this.this' or 'this.this.this.this'? Repeat the deliberation in question with some greater diligence...
			const subset = this.this.this.this.class.class()
			for (const key of this.keys())
				if (predicate(this.read(key), key, this, subset)) subset.pushback(key)
			this.this.this = subset.this
			return this.this
		}),
		any: _FUNCTION(function (predicate = TRUTH) {
			return !this.init().compare(
				this.copied("suchthat", [predicate]).length().get()
			)
		}),
		every: _FUNCTION(function (predicate = TRUTH) {
			return this.this.this.class.template.icclass.template.comparison(
				this.copied("suchthat", [predicate]).length().get(),
				this.length().get()
			)
		}),
		forEach: _FUNCTION(function (method = VOID) {
			for (const x of this.keys()) method(this.read(x), x, this)
			return this.this
		}),
		includes: _FUNCTION(function (
			element,
			comparison = this.this.this.this.class.template.comparison,
			unfound = this.this.this.this.class.template.unfound
		) {
			return !comparison(this.firstIndex(element, comparison), unfound)
		}),
		copy: _FUNCTION(function (
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
		}),
		peek: _FUNCTION(function () {
			return this.this.this.genarr.read(this.this.this.genarr.finish())
		}),
		pop: _FUNCTION(function () {
			return this.this.this.genarr.delete()
		}),
		// * Note: the 'args' does __not__ have to be a native JS array; (This uses the Symbol.iterator...);
		multcall: _FUNCTION(function (method, args = [], arrs = false, leftovers = {}) {
			for (let x of args) {
				if (!arrs) x = [x]
				this.this.this[method](...x, leftovers)
			}
			return this.this
		}),
		add: _FUNCTION(function (elem) {
			return this.merge(
				this.this.this.template.parentclass.template.parentclass.static.fromArray(
					[this.this.this.this.class.class(elem)]
				)
			)
		}),
		zero: _FUNCTION(function () {
			return this.this.class()
		}),
		one: _FUNCTION(function () {
			return this.zero().next()
		}),
		two: _FUNCTION(function () {
			return this.one().next()
		}),
		oneadd: _FUNCTION(function () {
			return this.zero().add()
		}),
		twoadd: _FUNCTION(function () {
			return this.one().add()
		}),
		copied: _FUNCTION(function (
			method,
			_arguments = [],
			f = id,
			isclass = false,
			template = isclass
				? this.this.this.this.class
				: this.this.this.this.class.template
		) {
			const c = this.copy(f, isclass, template)
			if (hasFunction(c, method)) c[method](..._arguments)
			return c
		}),
		usetmeth: function (name) {
			return _FUNCTION(function (uset = this.this.this.this.class.static.empty()) {
				return this.this.this.this.class.class(
					this.this.this.genarr.copied(name, [uset.genarr])
				)
			})
		}
	},

	general: {
		lengthSafeConcat: function (a, b) {
			if (a.length >= MAX_STRING_LENGTH.get - b.length)
				return [
					a.concat(b.slice(0, MAX_STRING_LENGTH.get - a.length)),
					b.slice(MAX_STRING_LENGTH.get - a.length)
				]
			return [a.concat(b)]
		},
		counterFrom: function (_labels = [], wrapper = ID) {
			return TEMPLATE({
				defaults: [
					alinative.function.const({
						icclass: general.DEFAULT_ICCLASS,
						wrapper
					}),
					_FUNCTION(function () {
						return {
							forth: this.template.wrapper(
								this.template.icclass.static.one()
							),
							back: this.template.wrapper(
								this.template.icclass.static.negone()
							)
						}
					})
				],
				function: _FUNCTION(function (icclass = general.DEFAULT_ICCLASS) {
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
				})
			})
		},
		maxkey(garr) {
			return this.template.hasOwnProperty("maxkey")
				? this.template.maxkey
				: orders.most({ comparison: this.template.predicate })(
						garr.copy(this.template.predicate)
				  )
		}
	},

	// TODO: make the object of defaults that is to be used throughout the library...;
	defaults: {
		heap: (parentclass) => ({
			check: true,
			parentclass: parentclass,
			names: ["treenode"],
			defaults: {
				outer: _FUNCTION(function (trNode) {
					return ensureHeap(trNode, this.template.predicate)
				})
			},
			predicate: general.DEFAULT_PREDICATE
		}),
		basicgenarr: (parentclass) => ({ parentclass: parentclass, names: ["genarr"] }),
		basicheap: (heapclass) => ({ parentclass: heapclass, names: ["heap"] }),
		// ! SEE IF ONE CAN REPLACE THESE KINDS OF THINGS WITH '.const' (ECMAScript standard does not permit implicit processing-on-request, only explicit, like so...)
		polyd1: () => ({
			ustrclass: general.DEFAULT_USTRCLASS,
			tintclass: general.DEFAULT_TINTCLASS,
			genarrclass: general.DEFAULT_GENARRCLASS,
			shrink: false
		})
	}
}

// ? Make a part of the 'MACROS?' [makes an awful lot of sense, especially considering just how ugly most of these functions' signatures are and that they mostly bear a purely service purpose...];
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
		for (let i = 0; i < remember.length; ++i) setfunc(objs[i], keys[i], remember[i])
		return returned
	},
	StaticThisTransform: (templated) => {
		templated.static.this = templated
		return templated
	},
	recursiveOperation(opname, binaryver, nullval) {
		return _FUNCTION(function (...args) {
			return args.length >= 2
				? binaryver(args[0], this.get[opname](...args.slice(1)))
				: args.length
				? args[0]
				: nullval
		})
	},
	finiteobj: function (
		target = {},
		names = [],
		templates = [],
		insequences = [],
		outtransform = [],
		aretemplates = [],
		ftemplates = []
	) {
		const newobj = {}
		const xf = !(templates instanceof Array)
			? (x) => templates[x]
			: alinative.function.const(templates)
		for (const x in names)
			newobj[names[x]] = finite(xf(x)).function(
				(aretemplates[x] ? (f) => f(ftemplates[x]) : ID)(target[names[x]]),
				outtransform[x],
				insequences[x]
			)

		return newobj
	}
}

// * Allows to define templated classes and functions more non-conventionally;
// ? MAKE THE '_FUNCTION' a part of the 'TEMPLATE' definition?
export function TEMPLATE(template = {}) {
	const F = function (template = this.template.deftemplate) {
		let _class = { [this.template.templateword]: {} }
		const tobind = () => (this.template.this ? this.template.this : _class)
		// ? Relocate, refactor?
		const K = (x, i = 0) => {
			const isxarr = is.arr(x)
			return i === -1
				? isxarr
					? {}
					: x
				: isxarr
				? this.template.isthis
					? x[i].bind(this.template.this ? this.template.this : _class)()
					: x[i]
				: this.template.isthis
				? x.bind(this.template.this ? this.template.this : _class)()
				: x
		}
		// ! refactor! [native.object methods]
		if (is.arr(this.template.defaults)) {
			for (const x in this.template.defaults) {
				const k = K(this.template.defaults, x)
				for (const y in k) _class[this.template.templateword][y] = k[y]
				for (const y in template)
					_class[this.template.templateword][y] = template[y]
			}
		}
		_class[this.template.templateword] = {
			...K(this.template.defaults, -1),
			...template
		}
		_class[this.template.word] = (this.template.isthis ? (x) => x() : ID)(
			this.template.function
		).bind(_class)
		for (const x in this.template.rest)
			_class[x] =
				is.obj(this.template.rest[x]) && !this.template.remain.includes(x)
					? { ...this.template.rest[x] }
					: (this.template.tobind.includes(x) ? (y) => y.bind(tobind()) : ID)(
							this.template.rest[x]
					  )
		return this.template.transform(_class, template)
	}
	const X = {
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
			tobind: [],
			remain: [],
			...template
		}
	}
	X.function = F.bind(X)
	return X
}

export const finite = TEMPLATE({
	defaults: {
		definseq: [false],
		defout: false,
		integer: false
	},
	function: _FUNCTION(function (
		f,
		out = this.template.defout,
		inseq = this.template.definseq
	) {
		const fu = this.template.integer
			? ID
			: general.DEFAULT_TINTCLASS.static.fromCounter
		// ? Does one want to save these somewhere additionally or simply keep here as-is? [may be useful for the user...];
		const tin = (out) => (out ? fu(native.number.fromNumber) : garrays.CommonArray())
		const tout = (out) =>
			out
				? (x) => x.map(InfiniteCounter(addnumber())).value
				: (x) => x.copied("switchclass", [arrays.CommonArray()]).array
		return alinative.function
			.wrapper({
				out: tout(out),
				in: inseq.map(tin),
				inarr: true
			})
			.function(f)
	})
}).function

export function NOREST(labels = [], btemplate = {}) {
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

export const GENERATOR = NOREST(["inverse", "range"], {
	word: "generator",
	isthis: true,
	tobind: ["inverse", "range"]
})

// ? Add the 'parentclass' and 'names' in there? Pray consider...;
export const PRECLASS = NOREST(
	[
		"methods",
		"static",
		"recursive",
		"classref",
		"selfname",
		"subselfname",
		"isgeneral",
		"properties",
		"isname"
	],
	{
		remain: ["static"]
	}
)

// ? generalize to another macro, maybe?
// ! CONCLUSION: using 'x.this' for every single object of a CLASS-class all over the place doesn't cut it. Create copies of methods [WITH NON-CONFLICTING NAMES...] for the classes in question...
// * Use all over the place...
export const CLASS = (ptemplate = {}) => {
	alinative.object.ensureProperties(ptemplate, {
		word: "class",
		function: (ptemplate.isthis ? alinative.function.const : ID)(
			alinative.object.empty
		),
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
	const POSTTF = template.function.bind(template)
	template.function = _FUNCTION(function (vtemplate = template.template.deftemplate) {
		const p = POSTTF(vtemplate)
		const POSTF = p[template.template.word]
		p[template.template.word] = _FUNCTION(function (...args) {
			let V = POSTF(...args)

			if (this.recursive) {
				V = {
					[this.classref]: this,
					[this.selfname]: {
						...V
					}
				}
				V[this.selfname][this.subselfname] = V
			}

			let K = this.recursive ? V[this.selfname] : V

			// TODO: this thing does not (generally) expect a TEMPLATE-method (an object in type, not a result of a 'TEMPLATE(...).function'); Pray think of those, and how one'd love to have them implemented...
			for (const x in this.methods) {
				// ! THIS IS A HACK [with this.methods[x] being an Array...]. ACCEPTABLE ONLY TEMPORARILY! FIX IT...
				const isarr = this.methods[x] instanceof Array
				if (isarr || this.isgeneral.hasOwnProperty(x)) {
					const B = isarr
						? this.methods[x]
						: [this.isgeneral[x], this.methods[x]]
					const A = B[1]
					A.template.instance = K
					K[x] = B.methods[0] ? A.function.bind(A) : A.function()
					continue
				}
				K[x] = this.methods[x].bind(K)
			}

			// ! CREATE THE ABILITY TO DEFINE CONSTANTS!!! [using obj.defineProperty(..., ..., { writable: false, value: ... })]
			const O = this.recursive ? V[this.selfname] : V
			for (const pr in this.properties)
				O[pr] = this.properties[pr].bind(this)(...args)

			// ? refactor...
			if (this.recursive) {
				for (const x in V[this.selfname])
					if (!V.hasOwnProperty(x) && !(x in this.properties))
						V[x] = K[x].bind(K)
				for (const p in this.properties)
					obj.defineProperty(V, p, {
						get: function () {
							return V[this.class.selfname][p]
						},
						set: function (v) {
							return (V[this.class.selfname][p] = v)
						}
					})
			}

			return V
		}).bind(p)
		p[p.isname] = _FUNCTION(function (x, classword = this.classref) {
			return x.hasOwnProperty(classword) && valueCompare(this, x[classword])
		}).bind(p)
		// * Note: this __doesn't__ (and isn't supposed to) check for presence of methods within the class in question - only for the presence of it in the recursive 'names-chain';
		p[Symbol.hasInstance] = _FUNCTION(function (x) {
			return (
				this.is(x) ||
				(x.class.template.names &&
					x.class.template.names.any((n) => x[n] instanceof this))
			)
		}).bind(p)
		return p
	}).bind(template)
	return template
}

// ! Partially solved the issue of non-copiability of the methods produced by the 'EXTENSION' macro using 'deepCopy' (or, generally, '.bind'), but now the dilemma is somewhat different:
// * 	IF one decides to copy a thing in question, then the keywords for reference ('name'), must be exactly the same; Namely, one doesn't really utilize the fact that there is a TEMPLATE underneath all this... [it works as if there isn't one...]; Consider making it different from that...
// 		% In particular, it's because there is not a reference to the object in question that'd be available to the user - the value is simply copied from the original 'template', so as to work with the default value;
// ! ADD THE ABILITY TO INHERIT FROM MULTIPLE CLASSES! [change the general structure of the '.names' and '.parentclass'];
// ? ADD THE ABILITY TO USE THE '.function' on EXTENSIONs;
export const EXTENSION = (template = {}) => {
	// ? refactor this repeating 'ensureProperties';
	alinative.object.ensureProperties(template, {
		word: "class",
		recursive: false,
		selfname: "this",
		subselfname: "this",
		classref: "class",
		isname: "is",
		methods: {},
		properties: {},
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
					alinative.object.ensureProperties(
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
							++i
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
				inter: cdieach,
				outer: ID,
				...template.defaults.defaults
			},
			...template.defaults
		},
		methods: {
			...template.methods,
			...((x) => {
				return OBJECT(
					x,
					x.map((a) => [
						template.isgeneral[x] || false,
						NAMED_TEMPLATE(
							_FUNCTION(function (
								instance = this.template.instance,
								name = this.template.name
							) {
								return _FUNCTION(function (...args) {
									if (
										this[
											name.classref
										].template.defaults.hasOwnProperty(a)
									)
										alinative.object.ensureProperties(
											args,
											this[name.classref].template.defaults[a]
										)
									// ! This is not general. Reconsider deeply. First - should be ability to return arbitrary 'this'-bound expression (including 'this' itself); Second - think of whether this does the job for recursive classes as well [test, in other words...]; Third - look through the code and consider some powerful generalization cases which would be desired by one's code...
									return this[
										this[name.classref].template.names[name.index]
									][a](...args)
								}).bind(instance)
							}),
							{
								classref: template.classref,
								index: template.index[a] || 0
							}
						)
					])
				)
			})(
				template.toextend === true
					? Object.keys(template.defaults.parentclass.methods)
					: // ! was - alarray.native.intersection - FIX! [decide when to PROPERLY define them...];
					  INTERSECTION(
							Object.keys(template.defaults.parentclass.methods),
							template.toextend
					  )
			)
		}
	}
	// ! CONSIDER, whether to change this to letting the '.toextend' stay + making it more flexible [id est, either adding another abstraction layer or changing the way that the '.toextend' is treated here...];
	delete ftemplate.toextend
	return PRECLASS(ftemplate).function()
}

// * A useful algorithm from a different project of mine; value-wise comparison of two arbitrary things...
//
// ! [2]: with the currently chosen solution for the handling of the function arguments;
// * It's not good. For this sort of thing, one ought instead compare the ASTs of the functions in question;
// TODO: once having implemented the JSONF and parser libraries for the 1.1 or 1.2 release of the library, pray
// TODO [additionally; maybe, if it's implementable...] - use the UnlimitedString for this stuff... [problem is that the seemingly only way to obtain the code of a function from within the code itself is via '.toString()', which returns the native JS string instead of the UnlimitedString];
export const valueCompare = TEMPLATE({
	defaults: {
		oneway: false
	},
	function: _FUNCTION(function (...args) {
		function TWOCASE(oneway = false, objs = []) {
			return (a, b) => {
				if (typeof a !== typeof b) return false
				switch (typeof a) {
					case "object":
						if (
							!objs.some((x) =>
								alinative.binary.dand(...[a, b].map(x[0].includes))
							)
						) {
							objs.push([a, b])
							for (const a_ in a)
								if (!TWOCASE(false, objs)(b[a_], a[a_])) return false
							if (!oneway) return TWOCASE(true)(b, a)
						}
						return true
					case "function":
						return String(a) === String(b)
					case "symbol":
						return a.toString() === b.toString()
					default:
						return a === b
				}
			}
		}
		return args
			.slice(0, args.length - 1)
			.every((x, i) => TWOCASE(this.template.oneway)(x, args[i + 1]))
	})
}).function

export const alarray = {
	native: {
		generate: function (start, end, step = 1, precision = 1) {
			// ! find more places for this operation's application (refactor to an alias, mayhaps?)
			if (arguments.length === 1) {
				end = start
				start = 1
			}
			const generated = []
			const upper =
				end +
				num((-1) ** step < 0) * (Number.isInteger(step) ? 1 : 10 ** -precision)
			const proposition = step > 0 ? (i) => i < upper : (i) => i > upper
			for (let i = start; proposition(i); i += step)
				generated.push(nanumber.floor().function(i, precision))
			return generated
		}
	},
	// ? Question [general]: which one should the library prefer the 'GeneralArray'-based multiple arguments, or the spread syntax? (GeneralArray permits unlimited number of arguments for a function that uses it...);
	// ! THE 'finite' is not currently suited to transform methods such as this... PRAY FIX IT... [allow for arguments-arrays transformations..., such as here...];
	intersection: TEMPLATE({
		defaults: {
			// ! ISSUE [about the 'finite' again] - what to do with cases such as this - when the default 'genarrclass' is given, whereas it must be finite (CommonArray?);
			// ^ 'finite' does permit the usage of arbitrary templates... Could just create a 'general.[something...]' property for storing the Defualt 'Finitization' template, which can then be used where needed via spread {...general.[whatever], ...{(rest of the good things)}};
			comparison: valueCompare,
			preferred: (fel, sel, comp, farr, sarr, find, sind) => fel,
			genarrclass: general.DEFAULT_GENARRCLASS
		},
		function: _FUNCTION(function (...arrs) {
			if (!arrs.length) return this.template.genarrclass.empty()
			if (arrs.length == 1) return arrs[0].copy()
			if (arrs.length == 2) {
				const inter = this.template.genarrclass.class()
				for (
					let i = this.template.icclass.class();
					lesser(i, arrs[0].length().get());
					i = next(i)
				)
					for (
						let j = this.template.icclass.class();
						lesser(j, arrs[1].length().get());
						j = next(j)
					) {
						const x = arrs[0].read(i),
							y = arrs[1].read(j)
						if (this.template.comparison(x, y))
							inter.pushback(
								this.template.preferred(x, y, comparison, ...arrs, i, j)
							)
					}
				return inter
			}
			return this.function(arrs[0], this.function(arrs.slice(1)))
		})
	}).function,
	permutations: TEMPLATE({
		defaults: {
			genarrclass: general.DEFAULT_GENARRCLASS
		},
		// ? In cases such as these (when there are 2 or more ways of doing exactly the same thing) - ought '.static.empty()' or '.class()' be called?
		function: _FUNCTION(function (array = this.template.genarrclass.static.empty()) {
			if (array.one().compare(array.length().get()))
				return this.template.genarrclass.fromArray([array.copy()])

			const pprev = this.function(
				array.copied("slice", array.init(), array.finish().previous())
			)
			const l = array.end(false)
			const pnext = this.template.genarrclass.static.empty()

			for (const i of array.keys())
				for (const j of pprev.read(i).keys())
					pnext.pushback(pprev.copied("insert", [j, l]))

			return pnext
		})
	}).function,
	indexesOf: TEMPLATE({
		defaults: [
			_FUNCTION(function () {
				return {
					unfound: undefined,
					comparison: valueCompare,
					halt: false,
					icclass: general.DEFAULT_ICCLASS
				}
			}),
			_FUNCTION(function () {
				return {
					haltAfter: this.template.icclass.static.one()
				}
			})
		],
		function: alinative.function.const(function (
			arr,
			el,
			halt = this.template.halt,
			haltAfter = this.template.haltAfter
		) {
			return general.fix([arr.this.this], ["currindex"], () => {
				const inds = this.empty()
				const cond = halt
					? (inds) => inds.length().get().compare(haltAfter)
					: TRUTH
				let currind
				while (currind !== this.template.unfound && !cond(inds, this)) {
					currind = search.linear(this.template).function(el, arr)
					inds.pushback(currind)
				}
				return inds
			})
		}),
		isthis: true
	}).function,
	norepetitions: TEMPLATE({
		defaults: [
			_FUNCTION(function () {
				return {
					comparison: valueCompare,
					copy: false,
					genarrclass: general.DEFAULT_GENARRCLASS,
					icclass: general.DEFAULT_ICCLASS
				}
			}),
			_FUNCTION(function () {
				return {
					tokeep: this.template.icclass.static.zero()
				}
			})
		],
		function: alinative.function.const(
			_FUNCTION(function (arr, el, tokeep = this.template.tokeep) {
				const firstMet = array.indexesOf(this.template).function(arr, el)
				const pred = (a, i) =>
					!firstMet.firstIndex(i).map(tokeep.class).compare(tokeep) ||
					!this.template.comparison(a, el)
				return (
					this.template.copy
						? (x) => x.copied("suchthat", [pred])
						: (x) => x.suchthat(pred)
				)(arr)
			})
		),
		isthis: true
	}).function,
	isSub: TEMPLATE({
		// ! Refactor also the usage of the 'defaults' like here - give the commonly appearing objects names and then, copy them each time {...DefaultsName};
		defaults: {
			comparison: valueCompare
		},
		function: _FUNCTION(function (
			arrsub,
			arr = this.template.genarrclass.static.empty()
		) {
			for (const x of arrsub)
				if (!arr.any((y) => this.template.comparison(x, y))) return false
			return true
		})
	}).function,
	join: TEMPLATE({
		defaults: {
			genarrclass: general.DEFAULT_GENARRCLASS
		},
		function: _FUNCTION(function (
			arrs = this.template.genarrclass.static.empty(),
			separators = this.template.separators
		) {
			return repeatedApplication(
				this.template.genarrclass.static.empty(),
				arrs.length().get(),
				(x, i) => x.concat(arrs.read(i).copied("concat", [separators]))
			)
		})
	}).function,
	generate: TEMPLATE({
		defaults: {
			icclass: general.DEFAULT_ICCLASS,
			genarrclass: general.DEFAULT_GENARRCLASS,
			ic: false
		},
		function: _FUNCTION(function (
			start,
			end,
			step = this.template.icclass.class().next()
		) {
			if (arguments.length === 1) {
				end = start
				start = this.template.icclass.class().next()
			}
			const generated = this.template.genarrclass.static.empty()
			const proposition = (
				(f) => (i) =>
					f(i, end)
			)(predicates[step.direction() ? "lesseroe" : "greateroe"])
			const wrap = this.template.ic ? ID : alinative.function.index("value")
			for (let i = start; proposition(i); i = i.jumpDirection(step))
				generated.pushback(wrap(i))
			return generated
		})
	}).function,
	common: TEMPLATE({
		defaults: {
			f: ID
		},
		function: _FUNCTION(function (...args) {
			return array.intersection(this.template).function(args.map(this.template.f))
		})
	}).function,
	concat: TEMPLATE({
		defaults: {
			genarrclass: general.DEFAULT_GENARRCLASS
		},
		function: _FUNCTION(function (arrays = this.template.genarrclass.static.empty()) {
			if (arrays.two().compare(arrays.length().get()))
				return (arrays.one().equal(arrays.length().get()) ? (x) => x.read() : ID)(
					arrays
				)
			if (arrays.length().get().equal(arrays.two()))
				return arrays.read().concat(arrays.read(arrays.one()))
			let r = arrays.read()
			for (const x of arrays.slice(arrays.one()))
				r = this.function(this.template.genarrclass.static.fromArray([r, x]))
			return r
		})
	}).function,
	split: TEMPLATE({
		defaults: {
			// ! DEFINE!
			comparison: general.DEFAULT_COMPARISON,
			genarrclass: general.DEFAULT_GENARRCLASS
		},
		function: _FUNCTION(function (
			array = this.template.genarrclass.static.empty(),
			separator = this.template.separator
		) {
			const farr = array.empty()
			let prev = array.init()
			for (const x of array.keys().copied("slice", [array.one()]))
				if (this.template.comparison(separator, array.read(x))) {
					farr.pushback(array.copied("slice", [prev, x]))
					prev = x
				}
			return farr
		})
	}).function
}

// * Probably the "simplest" infinite counter one would have in JS is based off this generator;
export const arrayCounter = GENERATOR({
	defaults: {
		start: null
	},
	function: alinative.function.const(
		_FUNCTION(function (a = this.template.start) {
			if (!this.range(a)) this.template.start = a
			return [a]
		})
	),
	// ? How about a default argument for this one? [Generally - pray look for such "unresolved" tiny things, such as missing default arguments' values];
	inverse: function (a) {
		if (!a.hasOwnProperty(0)) return a[0]
	},
	range: _FUNCTION(function (a) {
		return (
			a === this.template.start ||
			(a instanceof Array && this.range(this.inverse(a)))
		)
	})
}).function

general.DEFUAULT_COUNTER = arrayCounter()
alinative.number.iterations = TEMPLATE({
	defaults: { iterated: general.DEFUAULT_COUNTER, defnum: 1 },
	function: _FUNCTION(function (n = this.template.defnum) {
		return repeatedApplication(
			undefined,
			nneg(n),
			this.template.iterated[n > 0 ? "generator" : "inverse"]
		)
	})
}).function

export const InfiniteCounter = (() => {
	// * Note: 'this.template.unacceptable' is thrown out of the function's scope for the sake of providing the 'InfiniteCounter(...).class()' syntax for simplified zero-creation;
	return CLASS({
		defaults: {
			comparison: valueCompare,
			unacceptable: undefined,
			initialcheck: refCompare,
			...general.DEFUAULT_COUNTER
		},
		properties: {
			value: _FUNCTION(function (previous = this.template.unacceptable) {
				return this.template.initialcheck(previous, this.template.unacceptable)
					? this.template.generator()
					: previous
			})
		},
		transform: general.StaticThisTransform,
		static: (() => {
			// ? Question: generalize this construction with objects and their consecurive _FUNCTION(...).bind(RESULTOBJECT)?
			const R = {}
			for (const x of ["zero", "one", "two"]) R[x] = refactor.classes[x].bind(R)

			R.direction = _FUNCTION(function (ic) {
				return ic.compare(this.this.class())
			}).bind(R)
			// ? do the thing with the first n 'conditional' arguments - that being, if length of passed args array is 'n<k', where 'k' is maximum length, then the first 'k-n' recieve prescribed default values
			R.whileloop = _FUNCTION(function (
				end,
				each,
				start = this.zero(),
				iter = next,
				comparison = greateroe,
				init = undefined
			) {
				let curr = start.copy()
				let r = init
				while (comparison(curr, end)) {
					r = each(curr, r)
					curr = iter(curr)
				}
				return curr
			}).bind(R)
			R.reverse = _FUNCTION(function () {
				const _this = this
				return InfiniteCounter({
					generator(x) {
						if (x === undefined) return _this.this.template.generator()
						return _this.this.template.inverse(x)
					},
					inverse: this.this.template.generator
				})
			}).bind(R)
			R.negone = _FUNCTION(function () {
				return this.zero().previous()
			}).bind(R)

			return R
		})(),
		methods: {
			next: _FUNCTION(function () {
				// * An observation: this is one of the ways to be able to reference a function from within itself...
				return this.this.this.this.class.class(
					this.this.this.this.class.template.generator(this.this.this.value)
				)
			}),
			previous: _FUNCTION(function () {
				return this.this.this.this.class.class(
					this.this.class.template.inverse(this.this.this.value)
				)
			}),
			direction: _FUNCTION(function () {
				return this.this.this.this.class.static.direction(this)
			}),
			// ^ Consider creating an alternative definition for InfiniteCounter or just a different part of the library -
			compare: _FUNCTION(function (
				ic,
				comparison = this.this.this.this.class.template.comparison
			) {
				ic = ic.map(this.this.this.this.class)

				let pointerfor = ic
				let pointerback = ic

				while (
					!comparison(pointerfor, this.this.this) &&
					!comparison(pointerback, this.this.this)
				) {
					pointerfor = pointerfor.next()
					pointerback = pointerback.previous()
				}

				return comparison(pointerfor, this.this.this)
			}),
			difference: _FUNCTION(function (
				ic,
				comparison = this.this.this.this.class.template.comparison
			) {
				const next = property(
					ic.compare(this.this.this, comparison) ? "previous" : "next"
				)
				this.this.this.this.class.static.whileloop(
					this.this.this.copy(),
					(current) => next(current)(),
					ic,
					(x) => next(x)(),
					comparison,
					this.this.this.this.class.class()
				)
				return current
			}),
			jumpDirection: _FUNCTION(function (
				ic,
				comparison = this.this.this.this.class.template.comparison
			) {
				return this.this.this.this.class.static.direction(ic)
					? this.this.this.jumpForward(ic, comparison)
					: this.this.this.jumpBackward(ic)
			}),
			jump: _FUNCTION(function (
				x,
				jumping = next,
				counterclass = this.this.this.this.class
			) {
				return this.this.this.this.class.static.whileloop(
					x,
					jumping,
					counterclass.class(),
					jumping,
					undefined,
					deepCopy(this.this.this)
				)
			}),
			loop: _FUNCTION(function (
				body = () => {},
				start = this.this.this.this.class.class(),
				init = undefined
			) {
				return this.this.this.this.class.static.whileloop(
					this.this.this,
					body,
					start,
					undefined,
					undefined,
					init
				)
			}),
			jumpForward: _FUNCTION(function (
				x,
				comparison = this.this.this.this.class.template.comparison
			) {
				return this.jump(x, next, comparison)
			}),
			jumpBackward: _FUNCTION(function (
				x,
				comparison = this.this.this.this.class.template.comparison
			) {
				return this.jump(x, (k) => k.previous(), comparison)
			}),
			map: _FUNCTION(function (
				icClass = this.class,
				comparison = this.this.this.this.class.template.comparison
			) {
				let current = this.this.this.this.class.class()
				let alterCurrent = icClass.class()
				while (!comparison(current, this.this.this))
					alterCurrent = alterCurrent.next()
				return alterCurrent
			}),
			reverse: _FUNCTION(function () {
				const REVERSED = this.this.this.this.class.static.reverse()
				let revres = REVERSED.class()
				this.loop(() => revres.next())
				return revres
			}),
			copy: _FUNCTION(function () {
				return this.this.this.this.class.class(this.this.this.value)
			}),
			equal: _FUNCTION(function (x) {
				return this.compare(x) && x.compare(this)
			}),
			// ? Consider the matter of making generator-functions bindable like this...
			// ! NOTE: one may have a need to rewrite their definitions using the bare 'Generator' protocol, without the usage of the 'function*' syntax sugar...;
			// ^ For this, just 'copy' the Generator structure ({ next: () => {value: any, done: boolean}, return: () => void, throw: (error) => never, suspeneded: boolean, closed: boolean }), then the [Symbol.iterator] as a thing that returns the Gsenerator object, when called;
			[Symbol.iterator]: function* () {
				const predicate = this.direction() ? lesser : greater
				const change = this.direction() ? next : previous
				for (
					let i = this.this.this.this.class.class();
					predicate(this);
					i = change(i)
				)
					yield i
			},
			zero: _FUNCTION(function () {
				return this.this.this.this.class.static.zero()
			}),
			one: refactor.classes.one,
			two: refactor.classes.two
		},
		recursive: true
	})
})().function

general.DEFAULT_ICCLASS = InfiniteCounter()
alinative.number.fromNumber = TEMPLATE({
	defaults: {
		icclass: general.DEFAULT_ICCLASS
	},
	function: _FUNCTION(function (x = this.template.start) {
		return types
			.InfiniteCounter(addnumber(this.template))
			.class(x)
			.map(this.template.icclass)
	})
}).function

export const copy = {
	copy: TEMPLATE({
		defaults: {
			objdefmeth: ID,
			arrdefmeth: ID,
			defcontext: alinative.object.empty
		},
		function: _FUNCTION(function (
			arrmeth = this.template.arrdefmeth,
			objmeth = this.template.objdefmeth,
			dcontext = this.template.defcontext
		) {
			return {
				array: (a, method = arrmeth) => a.map(method),
				object: (a, method = objmeth) => object.objFmap(a, method),
				function: (a, context = dcontext()) => a.bind(context),
				symbol: (a) => Symbol(trimBeginning(7)(trimEnd(1)(str(a)))),
				arrayFlat: (a) => [...a],
				objectFlat: (a) => ({ ...a })
			}
		})
	}).function,

	// ? find the definition for the general _switch() from a different library of self's, place in this one, then use here...
	copyFunction: (() => {
		// ^ IDEA [for a solution]: create a function for generation of functions like such based off objects [for instance: switch-case-like ones (objects, that is)!];
		function typeTransform(x) {
			if (x === "array" || x === "arrayFlat") return is.arr
			if (x === "objectFlat") return is.obj
			return (p) => typeof p === x
		}
		return TEMPLATE({
			defaults: { list: [] },
			function: _FUNCTION(function (a) {
				for (const x of this.template.list)
					if (typeTransform(x)(a))
						return copy.copy().function()[x](a, this.function)
				return a
			})
		}).function
	})()
}

export const nanumber = {
	// ! Note: this thing, while originally intended for numbers representations, actually is better categorized as an element for the string formatting operations;
	// TODO: later, make either such a package/npm-module, or add an according new section to the library; Then, relocate...;
	readable: TEMPLATE({
		defaults: {
			mod: 3
		},
		function: _FUNCTION(function (num = 0) {
			const arr = String(num).split("")
			let affecteds = ""
			while (arr.length % this.template.mod > 0) affecteds += arr.shift()
			arr.forEach((number, index) => {
				affecteds +=
					(index && index % this.template.mod === 0 ? ` ` : ``) + number
			})
			return affecteds
		})
	}).function,

	// TODO: generalize [put into the 'numerics', use with 'polystring'];
	// ? also -- conversion between the number systems for both old and new api too...; Generalize the thing for it as well (as well as the character-by-character function and many more others...);
	floor: TEMPLATE({
		defaults: { defacc: 16 },
		function: _FUNCTION(function (number, afterDot = this.template.defacc) {
			if (afterDot < 0) {
				afterDot = -afterDot
				let inted = string.reverse(str(this.function(number, 0)))
				inted = alinative.array._insert(inted, afterDot, ".")
				const parts = string.reverse(inted).split(".")
				return num(
					parts[0].concat(string.map(parts[1], alinative.function.const("0")))
				)
			}
			return num(number.toFixed(afterDot))
		})
	}).function,
	ceil(x = 1) {
		return this.floor().function(x, 0) + !this.isWhole(x)
	},
	isWhole(x) {
		return num(str(x).split(".")[0]) === x
	},
	min(numarr = []) {
		return Math.min(...numarr)
	},
	max(numarr = []) {
		return Math.max(...numarr)
	}
}

export const object = {
	subobjects(object = {}, prev = [], first = true) {
		let returned = []
		if (!first && prev.includes(object)) return returned
		if (is.obj(object)) {
			if (!first) prev.push(object)
			for (const a in object)
				if (is.obj(object[a]) && !prev.includes(object[a])) {
					returned.push(object[a])
					returned = returned.concat(this.subobjects(object[a], prev, false))
				}
		}
		return returned
	},
	subobjectsFlat(object = {}) {
		return obj.values(object).filter(is.obj)
	},

	// * Checks if a certain object contains a recursive reference;
	// ! Finite - don't work with arbitrarily deep objects... [write an infinite version - utilizes GeneralArrays, or (better still), forms?]
	isRecursive(object = {}, prevobjsarrarrs = this.subobjects(object)) {
		if (!is.obj(object)) return false
		const v = obj.values(object)
		return (
			v.includes(object) ||
			prevobjsarrarrs.includes(object) ||
			v.some((x) => this.isRecursive.bind(this)(x))
		)
	},

	obj: OBJECT,

	objMap: function (obj_, keys = {}, id = true) {
		const newobj = {}
		for (const key in keys) newobj[keys[key]] = obj_[key]
		if (id) {
			const newkeys = obj.values(keys)
			for (const key in obj_) if (!newkeys.includes(key)) newobj[key] = obj_[key]
		}
		return newobj
	},

	objFmap: function (obj = {}, f = ID) {
		const newobj = {}
		for (const a in obj) newobj[a] = f(obj[a])
		return newobj
	},

	objArr: DEOBJECT,

	objSwap: function (obj1 = {}, obj2 = {}) {
		const [obj1Copy, obj2Copy] = Array.from(arguments).map(copy.flatCopy)
		this.objClear(obj1, obj.keys(obj1Copy))
		this.objClear(obj2, obj.keys(obj2Copy))
		this.objInherit(obj1, obj2Copy)
		this.objInherit(obj2, obj1Copy)
	},

	objClear: function (obj_, delkeys = obj.keys(obj_)) {
		for (const dp of delkeys) delete obj_[dp]
	},

	// ? Isn't it just builtin 'Object.assign'? [Re-define as another alias, maybe then?];
	objInherit: function (obj, parObj = {}) {
		for (const ap in parObj) obj[ap] = parObj[ap]
	},

	propSwap: function (obj, prop1, prop2) {
		const temp = obj[prop1]
		obj[prop1] = obj[prop2]
		obj[prop2] = temp
	},

	ismapped: function (...args) {
		return valueCompare().function(...args.map(obj.keys))
	},

	gutInnerObjs(obj_ = {}, keys = obj.keys(obj_)) {
		let gutted = {}
		const ok = obj.keys(obj_)
		for (const y of ok) {
			if (is.obj(obj_[y]) && keys.includes(y)) {
				gutted = { ...gutted, ...obj_[y] }
				continue
			}
			gutted[y] = obj_[y]
		}
		return gutted
	},

	objEncircle(obj_, newkey, keys = []) {
		const encircled = { [newkey]: {} }
		for (const y of obj.keys(obj_)) {
			if (keys.includes(y)) {
				encircled[newkey][y] = obj_[y]
				continue
			}
			encircled[y] = obj_[y]
		}
		return encircled
	},

	boundObj(o, c = false) {
		if (c) return this.boundObj(copy.deepCopy(o))
		for (const x in o) if (is.fun(o[x])) o[x] = o[x].bind(o)
		return o
	},

	// method for converting objects into a JSON-like String format
	toString(object, separator = ", ", padding = " ") {
		const k = obj.keys(object)
		const p = k.length ? padding : ""
		return `{${p}${k
			.map((x) => `"${x.toString()}": ${object[x].toString()}`)
			.join(separator)}${p}}`
	}
}

export const naarray = {
	replace: {
		replaceIndex: function (arr = [], index = 0, value = undefined) {
			return [...arr.slice(0, index), value, ...arr.slice(index + 1)]
		},

		replaceIndexes: function (_arr, x, y, indexes = naarray.keys(_arr)) {
			return alarray.native
				.split()
				.function(_arr, x)
				.map((seg, i, r) =>
					(i === r.length - 1
						? ID
						: (t) => t.concat([indexes.includes(i) ? y : x]))(seg)
				)
				.flat()
		},

		// * Replaces all occurences of 'x' with 'y';
		replace: function (arr, x, y) {
			return naarray.replace.replaceIndexes(arr, x, y)
		},

		// TODO [for the future] - develop (far more largely) the usage and immidiate construction of predicates (example [from which to make special cases]: (predicate) => (x) => (y) => predicate(x, y))
		// ! In particular, add more generality to methods and base most the things (especially the searching operations and such) on the predicates instead of particular values/keys and so on...; Replace the '.comparisons' in this matter...;
		// * Replaces values within an array and returns the obtained copy...
		replaceArr: function (array, p, transformation = ID) {
			const resArray = copy.flatCopy(array)
			for (let i = 0; i < array.length; ++i)
				if (p(array[i])) resArray[i] = transformation(array[i])
			return resArray
		}
	},

	keys(array = []) {
		const keys = array.keys()
		const fk = []
		for (const k of keys) fk.push(k)
		return fk
	},

	// ? What is this even? Fit only to be an alias...;
	// ! decompose onto aliases, then consider what to do with it...
	multArrsRepApp: TEMPLATE({
		defaults: { n: 1, default: null, f: ID },
		function: _FUNCTION(function (x = this.template.default) {
			const args = Array.from(arguments).slice(1, this.template.n + 1)

			// ? generalize conviniently...
			const defobj = {}
			for (let i = arguments.length; i < this.template.n + 1; ++i) defobj[i] = []
			alinative.object.ensureProperties(args, defobj)

			return stnative.repeatedApplication(
				x,
				nanumber.min(args.map(alinative.function.index("length"))),
				(v, i) => this.template.f(v, ...args.map(alinative.function.index(i)))
			)
		})
	}).function,

	// * "reverses" the "Array.flat()";
	arrEncircle: function (a, from = 0, to = a.length - 1) {
		from = alinative.number.negind(from, a)
		to = alinative.number.negind(to, a)
		const copied = []
		for (let i = 0; i < a.length; ++i) {
			if (i >= from && i <= to) {
				copied.push(a.slice(from, to + 1))
				i = to
				continue
			}
			copied.push(a[i])
		}
		return copied
	},

	// ? Generalize such usages of 'repeatedApplication' with some special alias of 'multiple' (works exclusively with arrays, for example?);
	// ! This can be optimized [repeated 'evaluate()'];
	arrEncircleMult(arr = [], coors = []) {
		return stnative.repeatedApplication(copy.flatCopy(arr), coors.length, (r, i) =>
			this.arrEncircle(
				r,
				...coors[i].map(
					(x) =>
						x +
						i * num(i > 0) -
						evaluate().function(
							Expression(
								"+",
								[],
								alarray.native
									.generate(i)
									.map((l) => ((x) => x[1] - x[0] + 1)(coors[l - 1]))
							)
						)
				)
			)
		)
	},

	// ! Later, (in v1.1, when working on 'statistics', pray relocate 'countAppearences' to there...);
	// ! Again, things like that are ALL to be generalized to the 'property'-style arguments (to allow for generality) + 'predicates' extended greatly to allow for working with both sub-divisions of structures and particular elements
	countAppearences: TEMPLATE({
		defaults: {
			comparison: refCompare,
			defelem: undefined
		},
		function: function (array = [], element = this.template.defelem) {
			return array.filter((x) => this.template.comparison(x, element)).length
		}
	}).function
}

export const string = {
	strmethod: alinative.function.wrapper({
		in: alinative.string.stoa,
		out: alinative.string.atos
	}).function,
	replace: {}
}

// * Copies an object/array deeply...
copy.deepCopy = copy.copyFunction({
	list: ["array", "object", "function", "symbol"]
}).function

// * Keeps the functions references intact whilst copying...
copy.dataCopy = copy.copyFunction({
	list: ["array", "object", "symbol"]
}).function

// * Does a flat copy of something;
copy.flatCopy = copy.copyFunction({
	list: ["arrayFlat", "objectFlat", "function", "symbol"]
}).function

for (const x in naarray.replace)
	string.replace[`s${x}`] = string.strmethod(naarray.replace[x])
string.replace.sreplaceFirst = (s, x, y) => string.replace.sreplaceIndexes(s, x, y, [0])
string.reverse = string.strmethod(alinative.object.rproperty("reverse")())
string.map = string.strmethod((x, ...args) =>
	alinative.object.property("map")(x)(...args)
)

// ? generalize further with the stuff below - create a function for creating a new array from 'cuts coordinates' of another array;
// * Gorgeous. Just gorgeous...
string.UTF16 = (p, l = 0) =>
	alarray.native.generate(0, l, (-1) ** (l < 0)).map((x) => alinative.string.fcc(p + x))

naarray.replace.replaceIndexesMult = naarray.multArrsRepApp({
	n: 2,
	f: naarray.replace.replaceIndex,
	default: []
}).function
string.replace.sreplaceIndexesMult = string.strmethod(naarray.replace.replaceIndexesMult)

naarray.replace.replaceMany = naarray.multArrsRepApp({
	n: 2,
	f: naarray.replace.replace,
	default: []
}).function
string.replace.sreplaceMany = string.strmethod(naarray.replace.replaceMany)

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

const ccf = alinative.object.property("concat")
export const defaultAlphabet = VARIABLE(
	ccf("")(
		[
			// 0-9
			[48, 9],
			// a-z
			[97, 25],
			// A-Z
			[65, 25]
		].map(alinative.function.exparr(string.UTF16))
	)
)

export const polystring = TEMPLATE({
	defaults: {
		alphabet: defaultAlphabet.get,
		ustrclass: general.DEFAULT_USTRCLASS,
		tintclass: general.DEFAULT_TINTCLASS,
		icclass: general.DEFAULT_ICCLASS
	},
	function: _FUNCTION(function (counter = this.template.icclass.class()) {
		const converted = this.template.tintclass.fromCounter(
			this.template.alphabet.length().get()
		)

		let copy = counter.copy()
		const representation = this.template.ustrclass.class()
		const copyZero = copy.class.class()

		for (
			let index = this.template.icclass.class();
			copy.compare(copyZero);
			index = index.next()
		) {
			const modulo = this.template.tintclass.static
				.fromCounter(copy)
				.modulo(
					converted.power(this.template.tintclass.static.fromCounter(index))
				)
			representation.write(index, this.template.alphabet.read(modulo))
			copy = copy.add(modulo.invadd())
		}

		return representation
	})
}).function

export const fromPolystring = TEMPLATE({
	defaults: [
		alinative.function.const({
			ustrclass: general.DEFAULT_USTRCLASS,
			tintclass: general.DEFAULT_TINTCLASS,
			genarrclass: general.DEFAULT_GENARRCLASS
		}),
		_FUNCTION(function () {
			return { alphabet: this.template.genarrclass.static.empty() }
		})
	],
	function: alinative.function.const(
		_FUNCTION(function (ustr = this.template.ustrclass.class()) {
			const r = this.template.tintclass.class()
			let i = ustr.init()
			for (k of ustr.keys())
				r.add(
					this.tintclass.static
						.fromCounter(this.template.alphabet.firstIndex(ustr.read(k)))
						.multiply(
							this.template.tintclass.static
								.fromCounter(k)
								.power(
									this.template.tintclass.static
										.fromCounter(ustr.length().get())
										.difference(i)
								)
						)
				)
			return r
		})
	),
	isthis: true
}).function

// ! NOTE: this is a special case of the 'ensuring' methods; In effect, they are run, to ensure a property of the object in question...
// ? Generalize them, as well? Would do extremely well...
export const sameLength = TEMPLATE({
	defaults: [
		refactor.defaults.polyd1,
		_FUNCTION(function () {
			return { alphabet: this.template.genarrclass.static.empty() }
		})
	],
	function: alinative.function.const(
		_FUNCTION(function (strs = this.template.genarrclass.static.empty()) {
			const endsize = (this.template.shrink ? min : max)().function(
				strs.copy((str) => str.length().get())
			)
			for (const str of strs)
				str.length().set(endsize, { basestr: this.template.alphabet.read() })
			return endsize
		})
	),
	isthis: true
}).function

export const baseconvert = TEMPLATE({
	defaults: [
		refactor.defaults.polyd1,
		_FUNCTION(function () {
			return {
				alphabetfrom: this.template.genarrclass.static.empty(),
				alphabetto: this.template.genarrclass.static.empty(),
				empty: this.template.ustrclass.class()
			}
		})
	],
	function: _FUNCTION(function (numstr = this.tepmlate.empty) {
		return polystring({
			...this.template,
			alphabet: this.template.alphabettos
		}).function(
			fromPolystring({
				...this.template,
				alphabet: this.template.alphabetfrom
			}).function(numstr)
		)
	})
}).function

export const ponative = {
	// * Brings whatever is given within the given base to base 10;
	fromPolystring: TEMPLATE({
		defaults: {
			alphabet: defaultAlphabet.get,
			defstr: ""
		},
		function: _FUNCTION(function (nstr = this.template.defstr) {
			return expressions.evaluate(
				expressions.Expression(
					"+",
					[],
					generate(0, nstr.length - 1).map(
						(i) =>
							this.template.alphabet.indexOf(nstr[i]) * alphabet.length ** i
					)
				)
			)
		})
	}).function,

	// * Brings whatever in base 10 to whatever in whatever base is given...
	polystring: TEMPLATE({
		defaults: {
			alphabet: defaultAlphabet
		},
		function: _FUNCTION(function (n) {
			const coefficients = []
			const base = this.template.alphabet.length
			let i = Math.floor(Math.log(n) / Math.log(base))
			while (n !== 0) {
				const k = (n - (n % base ** i)) / base ** i
				n -= k * base ** i
				coefficients.push(k)
				i--
			}
			return coefficients.map((i) => this.template.alphabet[i]).join("")
		})
	}).function,

	// * Convert a numeric string in one base to a base string in another;
	baseconvert: TEMPLATE({
		defaults: {
			alphabet: defaultAlphabet,
			from: 2,
			to: 16
		},
		function: _FUNCTION(function (
			a,
			basefrom = this.template.from,
			baseto = this.template.to
		) {
			return native
				.polystring({ alphabet: this.template.alphabet })
				.function(
					native.fromPolystring({ alphabet: this.template.alphabet })(
						a,
						basefrom
					),
					baseto
				)
		})
	}).function
}

export const negate = alinative.function.wrapper({
	out: alinative.boolean.n
}).function

export const RECURSIVE_VARIABLE = (x) => {
	if (is.obj(x)) {
		const r = {
			get: {},
			set(f) {
				this.get = { ...f }
				for (const y in this.get)
					if (is.fun(this.get[y])) this.get[y] = f[y].bind(this)
			}
		}
		r.set(x)
		return r
	}
	return VARIABLE(x)
}

// ? More methods? [later, maybe...]
export const deftable = RECURSIVE_VARIABLE({
	"+": general.recursiveOperation("+", alinative.binary.add, 0),
	"-": _FUNCTION(function (...args) {
		return this.get["+"](
			...(args.length ? [args[0]].concat(args.slice(1).map((x) => -x)) : [])
		)
	}),
	"/": _FUNCTION(function (...args) {
		return args.length >= 2 ? args[0] / this.get["*"](...args.slice(1)) : args[0]
	}),
	"*": general.recursiveOperation("*", alinative.binary.mult, 1),
	"**": general.recursiveOperation("**", alinative.binary.power, 1),
	"^": general.recursiveOperation("^", alinative.binary.xor, 0),
	">>": general.recursiveOperation(">>", alinative.binary.rshift, 0),
	"<<": general.recursiveOperation("<<", alinative.binary.lshift, 0),
	"&": general.recursiveOperation("&", alinative.binary.and, 0),
	"|": general.recursiveOperation("|", alinative.binary.or, 0),
	"%": general.recursiveOperation("%", alinative.binary.modulo, 1),
	"&&": general.recursiveOperation("&&", alinative.binary.dand, false),
	"||": general.recursiveOperation("||", alinative.binary.dor, false)
})
export const udeftable = RECURSIVE_VARIABLE({
	"+": general.recursiveOperation("+", (a, b) => a.add(b)),
	"-": _FUNCTION(function (...args) {
		return this.get["+"](
			...(args.length ? [args[0]].concat(args.slice(1).map((x) => x.invadd())) : [])
		)
	}),
	// ! the '/' division must return a TrueRation-al value;
	"#": _FUNCTION(function (...args) {
		return (
			args.length >= 2 ? (x) => x.divide(this.get["*"](...args.slice(1))) : ID
		)(args[0])
	}),
	"*": general.recursiveOperation("*", (a, b) => a.multiply(b)),
	"**": general.recursiveOperation("**", (a, b) => a.power(b)),
	"%": general.recursiveOperation("%", (a, b) => a.modulo(b))
})

// % This is the 'expressions' main expression-evaluation function;
export const evaluate = TEMPLATE({
	defaults: {
		table: deftable.get
	},
	function: _FUNCTION(function (expression) {
		if (expression.expressions.length)
			return this.template.table[expression.operator](
				...expression.expressions.map(this.function)
			)
		return this.template.table[expression.operator](...expression.objects)
	})
}).function

// ? Generalize within the library's context the n-objects of named properties?
// ? Make into a template to allow for general-types defaults? [another minor general dilemma]
export function Expression(operator = "", expressions = [], objects = []) {
	return { operator, expressions, objects }
}

export const uevaluate = TEMPLATE({
	defaults: {
		deftable: udeftable
	},
	function: _FUNCTION(function (expression) {
		if (
			expression.expressions.class.template.parentclass.template.icclass
				.class()
				.compare(expression.expressions.length().get())
		)
			return this.template.table.read(expression.operator)(
				expression.expressions.map(this.function)
			)
		return this.template.table.read(expression.operator)(expression.objects)
	})
}).function

// * Generalization of the 'Expression':
export function composition(fcall) {
	return (...args) => {
		return fcall.f(
			...integer.native
				.generate(native.number.max([fcall.functions.length, fcall.args.length]))
				.map((x) => {
					// ! PROBLEM - does ___not__ currently allow for things like: (a,b,c) => d(a, e(b, f, g(c))); Fix that...
					// ^ IDEA [for a solution]: create a special Interface/signature for this with an array of GeneralArrays for setting (recursively) indexes to a given value from 'typeConst', other arguments get replaced with user's values (Pre-Calling); Then, one repeats the procedure of replacement, this time with the user's final arguments (the Final-Calling);
					// ^ Idea: generalize the 2-calling(Pre- and Final-Calling-s) process to the n-calling (like with (a1, ..., an) => composition(f1, ..., fn)(a1, ..., an) -> (a1) => (a2) => ... (an) => composition(f1, ..., fn)(a1, ..., an));
					if (x in fcall.functions) return this.composition(x)()
					if (!fcall.args) return args[x]
					return fcall.args[x]
				})
		)
	}
}

export function FunctionCall(f, functions = [], args = []) {
	return { f, functions, args }
}

export const numberc = GENERATOR({
	defaults: { start: 0 },
	function: alinative.function.const(
		_FUNCTION(function (x = this.template.start) {
			return this.template.forward(num(x))
		})
	),
	inverse(x = this.template.start) {
		return this.template.backward(num(x))
	},
	range: negate(is.nan)
}).function

export function addnumber(template = {}, ntemplate = {}) {
	return numberc({
		template: { fdiff: 1, bdiff: -1, ...template },
		forward(x) {
			return x + this.template.fdiff
		},
		backward(x) {
			return x + this.template.bdiff
		},
		...ntemplate
	})
}
export function multnumber(template = {}, ntemplate = {}) {
	return numberc({
		template: { fdiff: 2, bdiff: 2, ...template },
		forward(x) {
			return x * this.template.fdiff
		},
		backward(x) {
			return x / this.template.bdiff
		},
		start: 1,
		...ntemplate
	})
}

// ! GENERALIZE THE OBJCOUNTER AND ARRAYCOUNTER TO A 'formCounter' (a counter, whose elements are forms...);
// ? What about recursiveCounter?
// * Generalization of arrayCounter...
export const objCounter = GENERATOR({
	defaults: {
		field: "",
		start: null,
		// ? Does one desire the refCompare? Or valueCompare to be the default?
		comparison: refCompare
	},
	function: alinative.function.const(
		_FUNCTION(function (a = this.template.start) {
			if (!this.range(a)) this.template.start = a
			return { [this.template.field]: a }
		})
	),
	inverse: _FUNCTION(function (a) {
		return a[this.template.field]
	}),
	range: _FUNCTION(function (a) {
		return (
			this.template.comparison(a, this.template.start) ||
			(typeof a === "object" && this.range(this.inverse(a)))
		)
	})
}).function

// ? Generalize with the usage of 'forms'? [the present implementation uses the 'DEFAULT_FORM...'];
// * A maximally efficient (structurally, that being) counter based on array recursion and finite orders;
// ! Note: the counters are way too slow as of present (seeking potential ways of remedying it...).
export function recursiveCounter(template = {}) {
	const returned = {
		defaults: {
			comparison: valueCompare,
			maxarrlen: MAX_ARRAY_LENGTH.get,
			type: TRUTH,
			...template
		},
		range(x) {
			// ! NOTE: places like these ARE NOT to be refactored using '.dand' or '.dor' - the functions do not provide the ability to avoid errors regarding pre-computation...
			return (
				is.arr(x) &&
				alinative.binary.dand(
					!!x.length,
					x.every((y) =>
						alinative.binary.dor(
							...[
								this.template.type,
								(y) => alinative.binary.dand(is.arr(x), this.range(y))
							].map(alinative.function.argscall(y))
						)
					)
				)
			)
		}
	}

	const findDeepUnfilled_ =
		(returned) =>
		(t = true) =>
			findDeepUnfilled({
				soughtProp: (x) =>
					returned.template.type(x) && (t ? id : n)(returned.template.sign(x)),
				bound: t ? returned.template.upper : returned.template.rupper,
				comparison: returned.template.comparison
			}).function()
	const findDeepUnfilledArr_ = (returned) =>
		findDeepUnfilledArr({
			bound: returned.template.maxarrlen
		})
	const findDeepLast_ = (returned) =>
		findDeepLast({
			soughtProp: returned.template.type
		})

	const keys = ["inverse", "function"]
	keys.map(
		(x, i) =>
			(returned[x] = (x === "function" ? alinative.function.const : ID)(
				_FUNCTION(function (t = [this.template.lower]) {
					return generalgenerator(t, !!i, this)
				})
			))
	)

	const rindexation = recursiveIndexation().function

	function signedAdd(sign) {
		return function (thisobject) {
			return function (x) {
				let indexes = findDeepUnfilled_(thisobject)(sign)(x)
				let result = x

				if (!indexes) {
					indexes = findDeepUnfilledArr_(thisobject)(x)
					if (!indexes) return [x]

					result = rindexation(result, indexes)

					// TODO: generalize the construction [[...]] of depth 'n'; Create the simple alias-functions for quick creation of recursive arrays;
					// * Including the infinite versions of them...
					result = repeatedApplication()(
						(value) => {
							value.push([])
							return value[value.length - 1]
						},
						dim({
							icclass: indexes.class.template.icclass
						})
							.function(x)
							.difference(indexes.length())
							.previous(),
						result
					)
					result.push(thisobject.template.lower)
					return x
				}

				result = rindexation(
					result,
					indexes.copied("slice", [undefined, indexes.finish().previous()])
				)
				const endind = indexes.read(indexes.finish())
				result[endind] = thisobject.template[sign ? "forward" : "backward"](
					result[endind]
				)
				return x
			}
		}
	}
	function signedDelete(sign) {
		return function (thisobject) {
			return function (x) {
				if (
					!findDeepUnfilled_(thisobject)(sign)(x) &&
					findDeepUnfilledArr_(thisobject)(x) &&
					x.length === 1
				)
					return x[0]

				let lastIndexes = findDeepLast_(thisobject)(x)
				const finind = lastIndexes.final()
				const ffinind = finind.previous()

				// ! do the 'ppointer' stuff after having made sure that the 'lastIndexes.length().get().compare(lastNumIndexes.two())'
				let ppointer = rindexation(
					x,
					lastIndexes.slice(undefined, ffinind.previous())
				)
				let pointer = rindexation(x, lastIndexes.slice(undefined, ffinind))

				const lindex = lastIndexes.read(finind)
				if (thisobject.template.sign(pointer[lindex])) {
					pointer[lindex] = thisobject.template[sign ? "forward" : "backward"](
						pointer[lindex]
					)
					return x
				}
				const llindex = lastIndexes.read(ffinind)

				ppointer[llindex] = alinative.array._remove(ppointer[llindex], lindex)
				pointer = ppointer[llindex]

				let index = lindex
				let hlindex = llindex

				while (!pointer.length) {
					ppointer = rindexation(
						x,
						lastIndexes.copied("slice", [
							undefined,
							(hlindex = hlindex.previous())
						])
					)
					ppointer[hlindex] = alinative.array._remove(
						ppointer[hlindex],
						(index = index.previous())
					)
					pointer = rindexation(
						x,
						lastIndexes.copied("slice", [undefined, index])
					)
				}

				return x
			}
		}
	}

	const sat = signedAdd(true),
		saf = signedAdd(false),
		sdt = signedDelete(true),
		sdf = signedDelete(false)

	function boolfunctswitch(f, bool) {
		return f ? (bool ? sat : saf) : bool ? sdt : sdf
	}

	function generalgenerator(x, bool, thisobj) {
		if (!thisobj.range(x)) return [thisobj.template.lower]
		let r = copy.deepCopy(x)
		return boolfunctswitch(thisobj.template.globalsign(r), bool)(thisobj)(r)
	}

	return GENERATOR(returned).function()
}

// * That's an example of an infinite counter;
// * btw, it is non-linear, that is one can give to it absolutely any array, like for example [[[0, 1234566643]]], and it won't say word against it; will continue in the asked fashion...
// * This particular nice feature allows to build different InfiniteCounters with different beginnings on it...
// note: creates new objects after having been called;
export function numberCounter(template = {}) {
	return recursiveCounter({
		upper: MAX_INT.get,
		lower: 0,
		rupper: -MAX_INT.get,
		// ? So... should the 'sign', then, involve '.lower', or not?
		sign: (x) => x >= 0,
		globalsign: function (x) {
			return (
				is.arr(x) &&
				x.some(
					(a) =>
						alinative.function.argscall(a)(this.sign) ||
						alinative.function.argscall(a)(this.globalsign)
				)
			)
		},
		type: negate(is.nan),
		forward: inc(),
		backward: dec(),
		...template
	})
}

// A special case of 'recusiveCounter';
// * Uses array-orders (by default);
export function orderCounter(template = {}) {
	return recursiveCounter({
		upper: template.order[template.order.length - 1],
		lower: template.order[Math.floor(template.order.length / 2)],
		rupper: template.order[0],
		forward: (x) => template.order[inc(template.order.indexOf(x))],
		backward: (x) => template.order[dec(template.order.indexOf(x))],
		globalsign: _FUNCTION(function (x) {
			return x.any((a) =>
				alinative.binary.dor(
					...[this.sign, this.globalsign].map(alinative.function.argscall(a))
				)
			)
		}),
		sign: (x) => strorder.indexOf(x) > Math.floor(template.order.length / 2),
		...template
	})
}

export function stringCounter(template = {}) {
	return orderCounter({
		type: is.str,
		order: string.UTF16(48, 127),
		...template
	})
}

export const circularCounter = (() => {
	const final = {
		defaults: {
			values: [],
			form: general.DEFAULT_FORM,
			hop: 1
		},
		range(x) {
			return this.template.values.includes(x)
		}
	}

	const generalized = (name, sign) =>
		_FUNCTION(function (x) {
			if (this.template.form.is(x)) return this.template.form.flatmap(x, this[name])
			const vals = alinative.array
				.indexesOf(this.template.values, x)
				.map(
					(i) =>
						this.template.values[
							(i + sign * this.template.hop) % this.template.values
						]
				)
			if (vals.length == 1) return vals[0]
			return this.template.form.new(vals)
		})
	const arr = ["function", "inverse"]
	for (const i of [0, 1]) final[arr[i]] = generalized(arr[i], (-1) ** i)

	return GENERATOR(final).function
})()

export function arrCircCounter(template = {}) {
	return circularCounter({
		form: general.DEFAULT_FORM,
		...template
	})
}

export const finiteCounter = (() => {
	const F = {}
	const keys = ["function", "inverse"]
	const labels = ["next", "previous"]
	for (const x in keys)
		F[keys[x]] = (keys[x] === "function" ? alinative.function.const : ID)(function (
			item
		) {
			return this.template.values.read(
				this.template.values.firstIndex(item)[labels[x]]()
			)
		})
	return GENERATOR({
		defaults: [
			alinative.function.const({
				genarrclass: general.DEFAULT_GENARRCLASS
			}),
			_FUNCTION(function () {
				return {
					values: this.template.genarrclass.static.empty()
				}
			})
		],
		...F,
		range(x) {
			return this.template.values.includes(x)
		},
		isthis: true
	}).function
})()

export const oldCompare = (a, b) => a == b

export const linear = TEMPLATE({
	defaults: {
		reflexive: true
	},
	function: _FUNCTION(function (
		array = this.template.genarrclass.static.empty(),
		reflexive = this.template.reflexive
	) {
		// ^ NOTE: these can be easily generalized...
		return reflexive
			? (a, b) => lesseroe(...[a, b].map(array.firstIndex))
			: (a, b) => lesser(...[a, b].map(array.firstIndex))
	})
}).function

// "fixes" a linear order, by means of excluding all the repeating elements from it...
// ? DOESN'T THIS JUST GET RID OF REPETITIONS??? [pray consider, whether to do something about it - ensureSet, fixLinear and algorithms.array.norepetitions seem all to do the exactly same thing, even though for different purposes...];
// * Currently, in plans, to generalize the 'norepetions' to include ensureSet and fixLinear, then re-do those as aliases of 'norepetitions'...
export const fixLinear = TEMPLATE({
	defaults: {
		genarrclass: general.DEFAULT_GENARRCLASS
	},
	function: _FUNCTION(function (array = this.template.genarrclass.static.empty()) {
		const copy = array.copy()
		for (let i = copy.init(); !i.compare(copy.length().get()); i = i.next()) {
			const x = copy.copied("slice", [i.next()])
			while (x.includes(copy.read(i)))
				copy.slice(undefined, i.next()).concat(x.delval(copy.read(i)))
		}
		return copy
	})
}).function

export const nonlinear = TEMPLATE({
	defaults: {
		reflexive: true
	},
	function: _FUNCTION(function (
		array = this.template.genarrclass.static.empty(),
		reflexive = this.template.reflexive
	) {
		const f = reflexive ? lesseroe : lesser
		return (a, b) => {
			const binds = array.indexes(b)
			return array.indexes(a).every((x) => binds.every((y) => f(x, y)))
		}
	})
}).function

// ! ISSUEEEEEE: this doesn't work with native JS arrays yet it is called with them. WHAT-TO-DO? WHAT-USAGE-WAS-EVEN-INTENDED? [idea 1 for resolution: use the 'CommonArray()' as the target form for the present special case of the recursiveCounter... instead...];
export const most = TEMPLATE({
	defaults: {
		genarrclass: general.DEFAULT_GENARRCLASS
	},
	function: _FUNCTION(function (
		garr = this.template.genarrclass.static.empty(),
		comparison = this.template.comparison
	) {
		let most = garr.read()
		for (const x of garr) if (comparison(x, most)) most = x
		return most
	})
}).function

// * For the 'min'/'max' of a lineraly ordered set of InfiniteCounters;
export function min(template = {}) {
	return most({
		comparison: lesser,
		...template
	})
}
export function max(template = {}) {
	return most({
		comparison: greater,
		...template
	})
}

// * Constructs an infinte order from given Infinite Counter class;
export function ofromIcc(icclass = general.DEFAULT_ICCLASS) {
	return (x, y) => icclass.class(x).compare(icclass.class(y))
}

// ! use these four a lot...
export const greateroe = (a, b) => a.compare(b)
export const lesseroe = (a, b) => greateroe(b, a)
export const lesser = (a, b) => !greateroe(a, b)
export const greater = (a, b) => lesser(b, a)

general.DEFAULT_PREDICATE = lesser

export const previous = (x) => x.previous()
export const next = (x) => x.next()
export const inc =
	(a = 1) =>
	(x) =>
		x + a
export const dec =
	(a = 1) =>
	(x) =>
		x - a

export const allUnique = (el, _key, _arr, subset) => !subset.includes(el)

export const Ensurer = (_class, predicate = T, responses = {}) => {
	const X = {}
	for (const m of _class.methods)
		X[m] = _FUNCTION(function (...args) {
			const tempr = _class.methods[m].bind(this)(...args)
			if (predicate(tempr, this) && hasFunction(responses, m))
				return responses[m].bind(this)(tempr, this, args)
			return tempr
		})
	return { ..._class, methods: X }
}

// ^ IDEA [for a future project]: JSpace - a package for alias and function namespaces from various programming languages implementations (they'd work in an exactly the same fashion, but work in JavaScript);
export const TRUTH = alinative.function.const(true)
export const T = TRUTH
export const FALLACY = alinative.function.const(false)
export const F = FALLACY
export const VOID = alinative.function.void

// * Ensures the 'heap' property upon a given tree;
// TODO: rewrite the previous parts of the library in such a way so as to use this... [namely, algorithms.heaps]
export const ensureHeap = (
	tree,
	predicate,
	comparison = tree.class.template.parentclass.template.comparison
) => {
	const node = tree.node
	const most = orders
		.most({ predicate: predicate })
		.function(tree.children.copied("pushfront", tree.node))
	if (!comparison(node, most)) {
		tree.node = most
		tree.children.write(tree.children.firstIndex(most), node)
	}
	for (const c of tree.children) ensureHeap(c)
	return tree
}

export const ensureSet = (genarr = general.DEFAULT_GENARRCLASS.static.empty()) => {
	return genarr.copied("suchthat", [allUnique])
}

export const stnative = {
	repeatedApplication: function (initial, times, f, offset = 0, iter = (x) => x + 1) {
		let r = initial
		for (let i = 0; i < times; i = iter(i)) r = f(r, i - offset)
		return r
	}
}

// _? Generalize? [the user won't need that much for the "manual" cases, only when doing something meta; Do later...]
// ? The 'print' is gone... Does oneself still want to keep it here?
// ! commented out for now (not present in the v1.0 release, decide what to do with it later...);
/* export const HIERARCHY = function (hierarr = []) {
	return stnative.repeatedApplication(
		TEMPLATE(hierarr[hierarr.length - 1]),
		hierarr.length - 1,
		(r, i) => INHERIT(hierarr[hierarr.length - i], r),
		-2
	)
} */

export const form = (
	_new,
	is,
	index,
	// ? What about this? Not really used by anything except for the 'constForm'...; Perhaps, decide means of individual extension of forms?
	isomorphic = TRUTH,
	copy = (x, f) => x.copy(f),
	read = (x, i) => x.read(i),
	write = (x, i, v) => x.write(i, v),
	keys = (x) => x.keys(),
	init = (x) => x.init()
) => {
	// ? Should one be using the 'arrow-functions' like that, or will 'form->this+function' be a more prefereable option?
	const X = { new: _new, is, index, isomorphic }
	X.init = (x) => init(x)
	X.flatmap = (x, f) => X.new(copy(X.index(x), f))
	X.read = (x, i = X.init(x)) => read(X.index(x), i)
	X.write = (x, i) => write(X.index(x), i, v)
	X.keys = (x) => keys(X.index(x))
	X.copy = (x, f) => copy(X.index(x), f)
	return X
}

export const structure = TEMPLATE({
	defaults: {
		form: general.DEFAULT_FORM,
		comparison: valueCompare,
		// * Note: this is a complex example - for 1 argument, it must return the expected 'equivalent', but for 2 - whether they are, in fact, equivalent, (id est: compequiv(a, compequiv(a)) == true);
		compequiv: function (...args) {
			if (args.length === 1) return args[1]
			return true
		}
	},
	function: _FUNCTION(function (obj = this.template.form.new()) {
		return {
			template: {
				template: this.template,
				compequiv: this.template.compequiv,
				comparison: this.template.comparison,
				form: this.template.form,
				object: obj
			},
			equivalent: function (form = general.DEFAULT_FORM) {
				const o = form.new()
				for (const x of this.template.form.keys(this.template.object)) {
					const rresult = this.template.form.read(this.template.object, x)
					o.write(
						x,
						this.template.form.is(rresult)
							? this.function(rresult).equivalent()
							: this.template.compequiv(rresult)
					)
				}
				return o
			},
			recisomorphic(object = this.template.object, current = this.template.object) {
				if (!this.template.form.is(object)) {
					return (
						!this.template.form.is(current) &&
						this.template.compequiv(object, current)
					)
				}
				const keys = this.template.form.keys(object)
				return (
					this.template.comparison(keys, this.template.form.keys(current)) &&
					keys.every((k) =>
						this.recisomorphic(
							...[object, current].map((x) => this.template.form.read(x, k))
						)
					)
				)
			}
		}
	})
}).function

// * An SUPERBLY useful technique for recursive type-creation and working with layers; Allows one to separate one layer from another using 'refCompare' and the out-of-scope object constant;
export function typeConst(f = ID, n = 1) {
	const TCONST = alinative.object.empty()
	// ! make an alias for the function in the map;
	const arr = [TCONST].concat(alarray.native.generate(n - 1).map(() => ({ ...TCONST })))
	return f(Object.freeze(arr))
}

// * Some forms aliases for immidiate work with the 'structure';

export function constForm(
	fieldname = "",
	contentsname = "contents",
	n = true,
	defaultval = []
) {
	return typeConst((c) => {
		let _new = (x = defaultval) => ({ [contentsname]: x })
		let is = (checked) =>
			checked instanceof Object && checked.hasOwnProperty(contentsname)
		const index = (x) => x[contentsname]
		let isomorphic = undefined
		if (n) {
			c = c[0]
			_new = (x = defaultval) => ({ [fieldname]: c, [contentsname]: x })
			is = (checked) =>
				is.obj(checked) &&
				checked[fieldname] === c &&
				checked.hasOwnProperty(contentsname)
			isomorphic = (x, y) => x[fieldname] === y[fieldname]
		}
		return form(_new, is, index, isomorphic)
	}, n)
}

export function propertyForm(contentsname = "", defaultval = {}) {
	return constForm("", contentsname, false, defaultval)
}

export const objectForm = form(
	obj,
	is.obj,
	obj.values,
	TRUTH,
	(x, f = ID) => {
		let c = copy.flatCopy(x)
		for (const y in x) c[y] = f(c[y])
		return c
	},
	// ? aliases? [or, are they defined already?]
	(x, i) => x[i],
	(x, i, v) => (x[i] = v),
	obj.keys,
	(x) => obj.keys(x)[0]
)
export const arrayForm = form(
	arr,
	is.arr,
	ID,
	TRUTH,
	(x, f = ID) => x.map(f),
	(x, i = 0) => x[i],
	(x, i, v) => (x[i] = v),
	naarray.keys,
	alinative.function.const(0)
)

general.DEFAULT_FORM = arrayForm

export const classForm =
	(_class) =>
	(template = {}, index = ID, additional = []) => {
		const Class = _class(template)
		return form(Class.class, Class.is, index, TRUTH, ...additional)
	}

export const GeneralArray = (() => {
	return CLASS({
		defaults: {
			empty: [],
			unfound: undefined,
			treatfinite: false,
			fast: false,
			default: alinative.function.const(undefined),
			icclass: general.DEFAULT_ICCLASS,
			comparison: refCompare
		},
		properties: {
			array: _FUNCTION(function (array = this.template.empty) {
				// ! ISSUE [general, for GeneralArray's first constructor argument]: array-copying - how is it to be done? Consider, pray...;
				return this.template.treatfinite
					? this.static.fromArray(array).array
					: copy.deepCopy(array)
			}),
			currindex: _FUNCTION(function (
				_arr,
				startindex = this.template.icclass.class()
			) {
				return startindex
			})
		},
		transform: general.StaticThisTransform,
		static: (() => {
			const R = {}

			R.zero = _FUNCTION(function () {
				return this.this.template.icclass.static.zero()
			}).bind(R)

			R.one = _FUNCTION(function () {
				return this.zero().next()
			}).bind(R)

			R.two = _FUNCTION(function () {
				return this.one().next()
			}).bind(R)
			// ! ISSUE - the 'BindableFunctions' don't get to be bound automatically to the object of desire. CONCLUSION - they must be ALL BOUND MANUALLY ...
			R.empty = _FUNCTION(function (template = this.this.template) {
				return GeneralArray(template).class()
			}).bind(R)

			R.fromArray = _FUNCTION(function (arr) {
				const generalized = this.empty({
					...this.this.template,
					treatfinite: false
				})
				for (const a of arr) generalized.pushback(a)
				return generalized
			}).bind(R)

			R.fromCounter = _FUNCTION(function (counter) {
				const narr = this.empty()
				counter.loop(() => narr.pushback(this.this.class.template.default()))
				return narr
			}).bind(R)

			for (const x of ["back", "front"]) {
				R[`push${x}Loop`] = TEMPLATE({
					defaults: {
						arguments: [],
						transform: id
					},
					function: _FUNCTION(function (b) {
						return this.template.target[`push${x}`](
							this.template.transform(
								b.object().currelem().get(),
								b.object().currindex,
								b.object(),
								b
							),
							...this.template.arguments
						)
					})
				}).function
			}
			return R
		})(),
		methods: (() => {
			const X = {
				currelem: _FUNCTION(function () {
					return {
						get: () =>
							this.this.this.this.class.template.elem(this.this.this),
						set: (newval) =>
							this.this.this.this.class.template.newvalue(
								this.this.this,
								newval
							)
					}
				}),
				// * For loops; Allows to loop over an array, with a changing index; Usage examples may be found across the default GeneralArray methods definitions:
				// * pray notice, that '.full()' changes the 'this.object.currindex' by default, whilst
				loop: _FUNCTION(function (template = {}) {
					const a = {
						template: {
							indexiter: (x) => x.object().next(),
							end: (x) => x.object().this.class.template.isEnd(x.object()),
							begin: (x) => x.object().begin(),
							icclass: this.this.this.this.class.template.icclass,
							after: ID,
							...template
						},
						object: alinative.function.const(this),
						broke: false,
						continued: false
					}
					a.restart = _FUNCTION(function () {
						this.counter = this.template.icclass.class()
					}).bind(a)
					a.yield = _FUNCTION(function (
						_indexiter = this.template.indexiter,
						end = this.template.end,
						iter = true
					) {
						if (iter) _indexiter(this)
						const isend = end(this)
						if (!isend && iter) this.counter = this.counter.next()
						return isend
					}).bind(a)
					a._full = _FUNCTION(function (
						each,
						iter = alinative.function.const(this.template.indexiter),
						end = alinative.function.const(this.template.end),
						begin = this.template.begin,
						after = this.template.after
					) {
						const index = this.object().this.this.currindex
						begin(this)
						let r = undefined
						let is = this.yield(alinative.function.const(null), end(), false)
						while (!is) {
							r = each(this, r)
							is = this.yield(iter(), end())
							if (this.broke) break
						}
						this.restart()
						this.broke = false
						this.object().currindex = index
						after(this)
						return r
					}).bind(a)
					// * The difference between '.full()' and '._full()' is that the former is based on latter and allows for 'break' and 'continue'...
					// ? [later?] generalize to a function for a truly general loop (the 'while', that'd use this system for the 'separation' of an iteration into a GeneralArray of functions suceptible to inner 'this.break()' or 'this.continue()' calls...)
					a.full = _FUNCTION(function (
						each = this.template.each,
						iter = alinative.function.const(this.template.indexiter),
						end = alinative.function.const(this.template.end),
						begin = this.template.begin,
						after = this.template.after
					) {
						const index = this.object().currindex
						begin(this)
						let r = undefined
						let is = this.yield(null, end(), false)
						while (!is) {
							const x = each(this)
							let goOn = true
							r = x.loop()._full((t) => {
								if (goOn) {
									if (this.broke || this.continued) {
										goOn = false
										return
									}
									return t.object().currelem().get()(t)
								}
							})
							is = this.yield(iter(), end())
							if (this.broke) break
							goOn = true
							this.continued = false
						}
						this.restart()
						this.broke = false
						this.object().currindex = index
						after(this)
						return r
					}).bind(a)
					a.break = _FUNCTION(function () {
						this.broke = true
					}).bind(a)
					a.continue = _FUNCTION(function () {
						this.continued = true
					}).bind(a)
					a.restart()
					return a
				}),
				begin: refactor.classes.begin,
				end: refactor.classes.end,
				init: _FUNCTION(function () {
					return this.this.this.this.class.template.icclass.class()
				}),
				// * NOTE: the '.length()' is NOT the last '!isEnd'-kind-of index, but the one after it...
				finish: refactor.classes.finish,
				// * A far simpler (hence, less capable with performance of complex walking tasks), faster, direction independent alternative to '.move';
				go: _FUNCTION(function (index = this.init()) {
					return (this.this.this.currindex = index)
				}),
				move: _FUNCTION(function (
					index = this.init(),
					preface = VOID,
					comparison = this.this.this.this.class.template.icclass.template
						.comparison,
					each = (x) => x.next(),
					stop = (x) => comparison(x.length().get(), x.currindex)
				) {
					preface(arguments, this.this.this)
					while (
						!comparison(this.this.this.currindex, index) &&
						!stop(this.this.this)
					)
						each(this.this.this)
					return this.this.this.currindex
				}),
				moveforward: _FUNCTION(function (
					index = this.init(),
					begin = false,
					// ! Fix the '.comparison' argument for this thing, pray...
					comparison = this.this.this.this.class.template.icclass.template
						.comparison,
					stop = (x) => comparison(x.length().get().next(), x.currindex)
				) {
					return this.move(
						index,
						(args, x) => {
							if (begin) x.currindex = x.init()
						},
						comparison,
						(x) => x.next(),
						stop
					)
				}),
				movebackward: _FUNCTION(function (
					index = this.init(),
					end = false,
					comparison = this.this.this.this.class.template.icclass.template
						.comparison,
					stop = (x) => comparison(x.init(), x.currindex)
				) {
					return this.move(
						index,
						(args, x) => {
							if (end) x.currindex = x.length().get()
						},
						comparison,
						previous,
						stop
					)
				}),
				movedirection: _FUNCTION(function (
					index,
					init = false,
					comparison,
					stop = (x) => comparison(x.init(), x.currindex)
				) {
					return this.this.this.currindex.compare(index)
						? this.moveforward(
								index,
								init,
								comparison,
								stop || ((x) => comparison(x.currindex, x.length().get()))
						  )
						: this.movebackward(
								index,
								init,
								comparison,
								stop || ((x) => comparison(x.currindex, x.init()))
						  )
				}),
				jump: _FUNCTION(function (
					index = this.init(),
					comparison = this.this.this.this.class.template.icclass.template
						.comparison
				) {
					return (this.this.this.currindex =
						this.this.this.currindex.jumpDirection(index, comparison))
				}),
				read: _FUNCTION(function (
					index = this.init(),
					fast = this.this.this.this.class.template.fast
				) {
					return general.fix([this.this.this], ["currindex"], () => {
						if (fast) this.go(index)
						else this.moveforward(index, true)
						return this.currelem().get()
					})
				}),
				write: _FUNCTION(function (index, value, fast = true) {
					return general.fix([this.this.this], ["currindex"], () => {
						if (fast) this.go(index)
						else this.moveforward(index, true)
						return this.currelem().set(value)
					})
				}),
				length: _FUNCTION(function () {
					return {
						get: () => {
							return general.fix([this.this.this], ["currindex"], () => {
								this.begin()
								while (
									!this.this.this.this.class.template.isEnd(
										this.this.this
									)
								)
									this.next()
								return this.this.this.currindex
							})
						},
						set: (value) => {
							if (this.object().length().get().equal(value)) return
							return this.length().get().compare(value)
								? this.deleteMult(
										this.init(),
										this.length()
											.get()
											.jumpDirection(
												this.length().get().difference(value)
											)
								  )
								: this.concat(
										this.this.this.this.class.static.fromCounter(
											this.length().get().difference(value)
										)
								  )
						}
					}
				}),
				copied: refactor.classes.copied,
				pushback: _FUNCTION(function (value) {
					return this.write(this.length().get(), value)
				}),
				pushfront: _FUNCTION(function (x) {
					this.this.this = this.this.this.this.class.static
						.fromArray([x])
						.concat(this).this
					return this.this
				}),
				concat: _FUNCTION(function (array = this.empty()) {
					return array.loop()._full(
						this.pushbackLoop({
							arguments: []
						}).function
					)
				}),
				multcall: refactor.classes.multcall,
				empty: _FUNCTION(function (
					template = this.this.this.this.class.template
				) {
					return this.this.this.this.class.static.empty(template)
				}),
				copy: _FUNCTION(function (
					f = ID,
					isclass = false,
					template = isclass
						? this.this.this.this.class
						: this.this.this.this.class.template
				) {
					// ! The problem's with '.empty()' - apparently, it doesn't create an empty GeneralArray, but instead just references the current one... [somehow, see how this happens and fix...]
					const copied = this.empty()
					copied.class = isclass
						? template
						: { ...copied.class, template: { ...template } }
					this.loop()._full(
						copied.pushbackLoop({
							transform: f,
							arguments: []
						}).function
					)
					return copied
				}),
				delval: _FUNCTION(function (
					value,
					comparison = this.this.this.this.class.template.comparison
				) {
					const x = this.this.this.firstIndex(value, comparison)
					if (!(x === this.this.this.template.unfound)) return this.delete(x)
					return this.this
				}),
				slice: _FUNCTION(function (begin = this.init(), end = this.finish()) {
					const sliced = this.empty()
					this.loop()._full(
						sliced.pushbackLoop({
							arguments: []
						}).function,
						undefined,
						alinative.function.const((t) =>
							end.compare(t.object().currindex)
						),
						(t) => {
							t.object().begin()
							t.object().go(begin)
						}
					)
					return (this.this.this = sliced.this)
				}),
				keys: function* () {
					for (
						let c = this.init();
						!c.compare(this.length().get());
						c = c.next()
					)
						yield c
				},
				[Symbol.iterator]: function* () {
					for (
						let c = this.init();
						lesser(c, this.length().get());
						c = c.next()
					)
						yield this.read(c)
				},
				// ? refactor using the other GeneralArray methods;
				// * Do it using '.project() + InfiniteCounter.difference() + repeat()...';
				// Sketch: 'this.this.this.projectComplete(index, this.this.this.static.fromArray([value]).repeat(this.this.this.length().get().difference(index)))'
				fillfrom: _FUNCTION(function (index, value) {
					const indexsaved = this.this.this.currindex
					this.go(index)
					while (!comparison(this.this.this.currindex, this.finish())) {
						this.currelem().set(value)
						this.next()
					}
					this.this.this.currindex = indexsaved
					// * It must always return 'this', not 'this.this.this';
					return this.this
				}),
				convert: _FUNCTION(function (
					template = this.this.this.this.class.template
				) {
					return (this.this.this = this.copy(ID, false, template).this)
				}),
				// * NOTE: the difference between this thing and the '.convert' is the fact that '.switchclass' is capable of preserving "reference-connections" of different objects to the same one object class's instance;
				switchclass: _FUNCTION(function (arrclass = this.this.this.this.class) {
					return (this.this.this = this.copy(ID, true, arrclass).this)
				}),
				swap: _FUNCTION(function (i, j) {
					const ival = this.read(i)
					this.write(i, this.read(j))
					this.write(j, ival)
					return this.this
				}),
				delete: _FUNCTION(function (index = this.finish()) {
					return this.deleteMult(index, index)
				}),
				deleteMult: _FUNCTION(function (startindex, endindex = this.finish()) {
					const x = this.copied("slice", [endindex.next()], undefined)
					return this.slice(this.init(), startindex.previous()).concat(x)
				}),
				projectComplete: _FUNCTION(function (array, index = this.init()) {
					general.fix([this.this.this], ["currindex"], () => {
						array.loop()._full(
							(t) => {
								// ? refactor this as well - some '.currwriteLoop(value, fast, comparison)', or something...
								this.write(
									this.this.this.currindex,
									t.object().currelem().get()
								)
							},
							alinative.function.const((x) => {
								x.object().next()
								this.next()
							}),
							undefined,
							(x) => {
								x.object().begin()
								this.go(index)
							}
						)
					})
					return this.this
				}),
				projectFit: _FUNCTION(function (array, index = this.init()) {
					general.fix([array], ["currindex"], () => {
						this.loop()._full(
							(t) => {
								t.object().write(
									t.object().currindex,
									array.currelem().get()
								)
								array.next()
							},
							undefined,
							(x) =>
								x.object().this.class.template.isEnd(x.object()) ||
								array.this.class.template.isEnd(array),
							(t) => t.object().go(index)
						)
					})
					return this.this
				}),
				insert: _FUNCTION(function (index, value) {
					const x = this.copied(
						"slice",
						[undefined, index.previous()],
						undefined
					)
					x.pushback(value)
					x.concat(this.copied("slice", [index], undefined))
					this.this.this = x.this
					return this.this
				}),
				index: _FUNCTION(function (i = this.init()) {
					return this.read(i)
				}),
				indexesOf: _FUNCTION(function (x, halt = false, haltAfter = Infinity) {
					return alarray
						.indexesOf({ halt: halt, haltAfter: haltAfter })
						.function(this.this, x)
				}),
				firstIndex: _FUNCTION(function (
					x,
					comparison = this.this.this.this.class.template.comparison
				) {
					return search.linear({ comparison }).function(this, x)
				}),
				shiftForward: _FUNCTION(function (times) {
					const x = this.this.this.this.class.static.fromCounter(times)
					this.this.this = x.concat(this.this.this).this
					return this.this
				}),
				shiftBackward: _FUNCTION(function (times = this.init()) {
					return this.slice(times, undefined)
				}),
				repeat: _FUNCTION(function (times = this.init()) {
					const newarr = this.empty()
					times.loop(() => newarr.concat(this))
					this.this.this = newarr.this
					return this.this
				}),
				reverse: _FUNCTION(function () {
					const reversedArr = this.empty()
					this.loop()._full(
						reversedArr.pushfrontLoop({
							arguments: []
						}).function
					)
					this.this.this = reversedArr.this
					return this.this
				}),
				map: _FUNCTION(function (
					f = id,
					isclass = false,
					template = isclass
						? this.this.this.this.class
						: this.this.this.this.class.template
				) {
					this.this.this = this.copy(f, isclass, template).this
					return this.this
				}),
				isEmpty: _FUNCTION(function (
					isend = this.this.this.this.class.template.isEnd
				) {
					return general.fix([this.this.this], ["currindex"], () => {
						this.begin()
						return isend(this)
					})
				}),
				sort: _FUNCTION(function (predicate) {
					this.this.this = sort
						.merge({
							predicate
						})
						.function(this.this.this).this
					return this.this
				}),
				isSorted: _FUNCTION(function (predicate, comparison) {
					return comparison(
						this.this.this,
						this.copied("sort", [predicate], undefined)
					)
				}),
				includes: refactor.classes.includes,
				suchthat: refactor.classes.suchthat,
				any: refactor.classes.any,
				every: refactor.classes.every,
				forEach: refactor.classes.forEach,
				intersection: _FUNCTION(function (arr = this.empty()) {
					this.this.this = alarray.intersection().function(this.this, arr).this
					return this.this
				}),
				permutations: _FUNCTION(function () {
					return alarray.permutations({
						genarrclass: this.this.this.this.class
					})(this.this)
				}),
				// For an array of arrays only;
				join: _FUNCTION(function () {
					this.this.this = alarray.join().function(this.this).this
					return this.this
				}),
				strjoin: _FUNCTION(function (separator = "") {
					return UnlimitedString(this.this.this.this.class)
						.function()
						.class(this.copy(str, undefined, undefined))
						.join(separator)
				}),
				split: _FUNCTION(function (
					comparison = this.this.this.this.class.template.comparison
				) {
					this.this.this = alarray
						.split({ comparison })
						.function(this.this).this
					return this.this
				}),
				splitlen: _FUNCTION(function (length = this.length().get()) {
					let arrs = this.empty()
					let currarr = this.copy()
					while (currarr.length().get().compare(length)) {
						arrs.pushback(currarr.copied("slice", [this.init(), length]))
						currarr.slice(length)
					}
					return arrs.pushback(currarr)
				}),
				splice: _FUNCTION(function (index, times = this.one()) {
					const c = this.copy()
					this.this.this = c
						.slice(c.init(), index.previous())
						.concat(this.slice(index.jumpDirection(times))).this
					return this.this
				}),
				one: _FUNCTION(function () {
					return this.init().next()
				}),
				two: refactor.classes.two
			}
			// ? Destructurize this further?
			OFDKL(
				X,
				(name) =>
					_FUNCTION(function () {
						return (this.this.this.currindex =
							this.this.this.currindex[name]())
					}),
				["next", "previous"]
			)
			OFDKL(
				X,
				(name) =>
					_FUNCTION(function (template = {}) {
						const origin = this.this.this.this.class.static[name](template)
						const T = {
							template: {
								target: this,
								...origin.template
							}
						}
						T.function = origin.function.bind(T)
						return T
					}),
				["front", "back"].map((n) => `push${n}Loop`)
			)
			return X
		})(),
		recursive: true,
		isthis: true
	})
})().function

export const garrayForm = classForm(GeneralArray)
export const treeForm = (parentclass = general.DEFAULT_GENARRCLASS) =>
	classForm(TreeNode(parentclass), alinative.function.index("children"))

export const countrecursive = TEMPLATE({
	defaults: {
		// ^ IDEA [for an application of a refactoring technique]: create such 'DEFAULT' template-variable values for every single one recurring element of the library, so that different pieces may use them (not only classes, but items like forms, predicates and so on...)
		form: general.DEFAULT_FORM
	},
	function: _FUNCTION(function (array = this.form.new()) {
		return alinative.number
			.fromNumber({ icclass: this.template.icclass })(
				this.template.predicate(array)
			)
			.jumpForward(
				this.template.form.is(array)
					? expressions
							.uevaluate()
							.function(
								expressions.Expression(
									"+",
									[],
									this.template.form.index(array).copy(this.function)
								)
							)
					: this.template.icclass.zero()
			)
	})
}).function

// Counts all the array-elements within a multi-dimensional array;
export function arrElems(template = {}) {
	// ? .. Let function-related aliases like this one be repositioned into the 'expressions.mjs' codefile;
	return (x) =>
		(
			(a, b) => (y) =>
				a(y).difference(b(y))
		)([totalElems, nonArrElems].map((t) => t(template)))(x)
}

// Counts all non-array elements within a multidimensional array passed... [recursively so]
export function nonArrElems(template = {}) {
	return countrecursive({
		predicate: negate(is.arr),
		...template
	})
}

// Counts all the elements within a multi-dimensional array (including the arrays themselves...)
export function totalElems(template = {}) {
	return countrecursive({
		predicate: (x) => (is.arr(x) ? x.length : 0),
		...template
	})
}

export const dim = TEMPLATE({
	defaults: {
		icclass: general.DEFAULT_ICCLASS,
		form: general.DEFAULT_FORM
	},
	function: _FUNCTION(function (recarr = this.template.form.new()) {
		if (this.template.form.is(recarr))
			return this.template.icclass.static
				.one()
				.jumpForward(
					max(this.template).function(
						this.template.form.copy(recarr, this.function)
					)
				)
		return this.template.icclass.class()
	})
}).function

export const MAX_ARRAY_LENGTH = VARIABLE(2 ** 32 - 1)
export const MAX_INT = VARIABLE(2 ** 53 - 1)

export const MAX_STRING_LENGTH = MAX_INT

export const garrays = {
	LastIndexArray(template = {}, garrtemplate = {}) {
		const A = {
			template: {
				icclass: general.DEFAULT_ICCLASS,
				maxarrlen: MAX_ARRAY_LENGTH.get,
				filling: null,
				...template,
				bound: _FUNCTION(function (i) {
					return i < this.template.maxarrlen - 1
				}),
				...template
			}
		}
		return GeneralArray({
			this: A,
			elem: _FUNCTION(function (
				arrobj,
				array = arrobj.array,
				pointer = false,
				beginningobj = arrobj.init(),
				beginningind = 0
			) {
				let currarr = array
				let ic = beginningobj
				let isReturn = [false, undefined]
				let index = beginningind
				for (
					;
					!arrobj.this.class.template.icclass.template.comparison(
						ic,
						arrobj.currindex
					);
					ic = ic.next()
				) {
					const withinbounds = this.this.template.bound(index)

					if (!(index in currarr)) {
						isReturn[0] = true
						if (withinbounds) isReturn[1] = null
						break
					}

					if (withinbounds) {
						++index
						continue
					}

					currarr = currarr[index]
					index = 0
				}
				const returned = arrobj.currindex
				return isReturn[0]
					? pointer
						? [isReturn[1], currarr, index, returned]
						: undefined
					: !pointer
					? currarr[index]
					: [currarr, index]
			}),
			newvalue: _FUNCTION(function (array, value) {
				let pointer = this.elem(array, undefined, true)
				while (!pointer[0]) {
					pointer[1][pointer[2]] = (pointer[0] === undefined ? (x) => [x] : id)(
						this.this.template.filling
					)
					pointer = this.elem(array, pointer[1], true, pointer[3], pointer[2])
				}
				return (pointer[0][pointer[1]] = value)
			}),
			isEnd: _FUNCTION(function (array) {
				return !!this.elem(array, undefined, true)[0]
			}),
			icclass: A.template.icclass,
			...garrtemplate
		})
	}
}

general.DEFAULT_GENARRCLASS = garrays.LastIndexArray()

// * A general algorithm for search inside a recursive array [of arbitrary depth]; Uses GeneralArray for layer-depth-indexes;
export const generalSearch = TEMPLATE({
	defaults: {
		self: false,
		reversed: false,
		genarrclass: general.DEFAULT_GENARRCLASS,
		soughtProp: TRUTH,
		form: general.DEFAULT_FORM
	},
	function: _FUNCTION(function (
		arrrec = this.template.form.new(),
		prevArr = this.template.genarrclass.static.empty(),
		self = this.template.self,
		reversed = this.template.reversed
	) {
		const i = prevArr.copy()
		if (self && this.template.soughtProp(this.template.form.index(arrrec))) return i

		// ! Generalize this bounding function to allow arbitrary kinds of forms, pray...
		const boundprop = reversed
			? (x) => x >= 0
			: (x) => x < this.template.form.index(arrrec).length
		i.pushback(reversed ? this.template.form.index(arrrec).length - 1 : 0)
		i.end()
		for (
			;
			boundprop(i.currelem().get());
			i.currelem().set(i.currelem().get() + (-1) ** reversed)
		) {
			if (
				this.template.soughtProp(
					this.template.form.read(arrrec, i.currelem().get())
				)
			)
				return i

			if (
				this.template.form.is(this.template.form.read(arrrec, i.currelem().get()))
			) {
				const r = this.function(
					this.template.form.read(arrrec, i.currelem().get()),
					i,
					false,
					reversed
				)
				if (!r) continue
				return r
			}
		}
		return false
	})
}).function

// ? Consider this '.comparison' business (not quite sure one likes it, the '.compare' ensures that the thing works on all forms, this doesn't...)
export const findDeepUnfilled = TEMPLATE({
	defaults: [
		alinative.function.const({
			form: general.DEFAULT_FORM,
			comparison: valueCompare,
			bound: MAX_INT.get
		}),
		_FUNCTION(function () {
			return { soughtProp: this.template.form.is }
		})
	],
	function: alinative.function.const(
		_FUNCTION(function (template = {}) {
			return generalSearch({
				...this.template,
				soughtProp: (x) =>
					this.template.soughtProp(x) &&
					!this.template.comparison(this.template.bound, x),
				...template
			}).function
		})
	),
	isthis: true
}).function

// ? Return back the 'findDeepUnfilledArr' its original TEMPLATE shape...; Or keep it (and the other alias-derivatives of generalSearch as they currently are?)
export const findDeepUnfilledArr = _FUNCTION(function (template = {}) {
	return findDeepUnfilled({
		soughtProp: is.arr,
		comparison: (a, b) => a <= b.length,
		self: true,
		...template
	}).function()
})

export const findDeepLast = _FUNCTION(function (template = {}) {
	return generalSearch({
		reversed: true,
		...template
	}).function()
})

export const recursiveIndexation = TEMPLATE({
	defaults: {
		genarrclass: general.DEFAULT_GENARRCLASS,
		form: general.DEFAULT_FORM
	},
	function: _FUNCTION(function (
		object,
		fields = this.template.genarrclass.static.empty()
	) {
		return repeatedApplication({
			icclass: fields.class.template.icclass,
			...this.template
		}).function(object, fields.length().get(), (x, i) =>
			this.form.read(x, fields.read(i))
		)
	})
}).function

export const recursiveSetting = TEMPLATE({
	defaults: {
		form: general.DEFAULT_FORM,
		genarrclass: general.DEFAULT_GENARRCLASS
	},
	function: _FUNCTION(function (
		object = this.template.form.new(),
		fields = this.template.genarrclass.static.empty()
	) {
		if (!fields.isEmpty()) {
			const indexed = recursiveIndexation(this.template).function(
				fields.copied("slice", [fields.init(), fields.finish().previous()])
			)
			this.template.form.write(indexed, fields.read(fiends.finish()))
		}
		return object
	})
}).function

export const repeatedApplication = TEMPLATE({
	defaults: { iter: (x) => x.next(), icclass: general.DEFAULT_ICCLASS },
	function: _FUNCTION(function (
		initial = this.template.initial,
		times = this.template.times,
		f = this.template.f,
		offset = this.template.icclass.class(),
		iter = this.template.iter
	) {
		let r = initial
		for (let i = this.template.icclass.class(); !i.compare(times); i = iter(i))
			r = f(r, i.difference(offset))
		return r
	})
}).function

// * This can create infinite loops...
export const repeatedApplicationWhilst = TEMPLATE({
	defaults: { initial: undefined },
	function: _FUNCTION(function (f = this.template.function) {
		let curr = initial
		while (this.template.property()) curr = f(curr)
		return curr
	})
}).function

// ! Refactor; Consider the optimization...
// * Note: this one requires another GeneralArray class to be used;
garrays.DeepArray = function (template = {}, garrtemplate = {}) {
	const daform = constForm("TOKEN", "arr", 1, [])
	const X = {
		template: {
			icclass: InfiniteCounter(numberCounter()),
			maxlen: MAX_ARRAY_LENGTH.get,
			genarrclass: general.DEFAULT_GENARRCLASS,
			filling: null,
			...template
		}
	}
	return GeneralArray({
		this: X,
		empty: daform.new(),
		// ! make defaults for the 'newvalue' work here, pray... (so that the user can 'initialize' the index without actually assigning an 'acceptable' value to it...);
		newvalue: _FUNCTION(function (array, value) {
			let e = this.elem(array, true)
			if (e[0] == undefined) {
				if (e[0] === null) {
					// ! ensure the proper template here, pray...
					const flayer = structure
						.findDeepUnfilled({ form: daform })
						.function(array.array)
					if (flayer) {
						let p = array.array
						for (const x of flayer) p = p[x].arr
						p.push(value)
						return value
					}
				}

				for (const y of e[1].previous())
					general.fix([array], ["currindex"], () => {
						array.currindex = array.currindex.jumpBackward(
							e[1].previous().jumpBackward(y)
						)
						this.newvalue(array, this.this.template.filling)
					})
			}
			return (e[0][e[1]] = value)
		}),
		elem: _FUNCTION(function (array, pointer = false) {
			let i = array.init()
			let fi = 0
			let prevarrs = arrays.LastIndexArray().class()
			let currarray = array.array
			for (; lesser(i, array.currindex); ++fi) {
				if (currarray === array.array && fi === array.array.arr.length) {
					const rx = array.currindex.difference(i)
					return [rx.equal(array.one()) ? null : undefined, rx]
				}
				const isfibelow = fi < currarray.length
				if (isfibelow) {
					while (daform.is(currarray.arr[fi])) {
						prevarrs.pushback(currarray)
						currarray = currarray.arr[fi]
						continue
					}
					i = i.jumpForward(
						alinative.number.fromNumber(
							native.number.min([
								this.this.template.maxlen,
								currarray.arr.length
							])
						)
					)
				}
				fi = isfibelow ? fi : 0
				currarray = prevarrs.read(prevarrs.finish())
				prevarrs.delete()
			}
			return pointer ? [[currarray, fi]] : [[currarray[fi]]]
		}),
		isEnd: _FUNCTION(function (array) {
			return this.elem(array)[0] == undefined
		}),
		icclass: this.template.icclass,
		...garrtemplate
	})
}

garrays.CommonArray = function (template = {}, garrtemplate = {}) {
	// ? Change the shape of this 'this.this' object?
	const X = {
		template: { offset: -1, ...template }
	}
	return GeneralArray({
		this: X,
		newvalue: _FUNCTION(function (arr, value) {
			return (arr.array[arr.currindex.value] = value)
		}),
		elem: _FUNCTION(function (arr) {
			return arr.array[arr.currindex.value]
		}),
		isEnd: _FUNCTION(function (arr) {
			return arr.array.length <= arr.currindex.value
		}),
		icclass: InfiniteCounter(
			addnumber(
				{},
				{
					start: X.template.offset
				}
			)
		),
		...garrtemplate
	})
}

// * This thing will allow to create function-based types on top of an Array;
// Usage Example 1: use the 'typefunction' as a mean of identifying if the 'type' of the thing is right, with 'typefail' defined as a result of .newval(+typeconversion);
// Usage Example 2: in 'typefail', throw an Exception, whilst in typefunction, do whatever it is one desires to do with the pre-checking of elements' properties;
garrays.TypedArray = CLASS({
	defaults: {
		empty: [],
		typefunction: TRUTH
	},
	function: _FUNCTION(function (array = C.template.empty) {
		const X = this
		return GeneralArray({
			...this.template,
			newvalue: function (arr, val) {
				if (X.template.typefunction(val)) return X.template.newval(arr, val)
				return X.template.typefail(arr, val)
			}
		}).class(array)
	})
})

export const UnlimitedMap = (parentclass = general.DEFAULT_GENARRCLASS) => {
	const sh1 = (key, _this, f, args = [], name = "keys") => {
		const ind = _this.this.this[name].firstIndex(key)
		if (ind === _this.this.this[name].class.template.unfound)
			return _this.this.this.this.class.template.unfound
		return f(ind, ...args)
	}
	const NAMESLIST = ["keys", "values"]
	return EXTENSION({
		defaults: {
			names: NAMESLIST,
			parentclass: parentclass,
			defaults: {
				constructor: alarray.native.generate(2).map(
					alinative.function.const(function () {
						return this.template.empty
					})
				),
				inter: cdieach
			},
			unfound: undefined
		},
		methods: {
			read: _FUNCTION(function (key = this.this.this.keys.read()) {
				return sh1(key, this, this.this.this.values.read)
			}),
			write: _FUNCTION(function (key, value) {
				sh1(key, this, this.this.this.values.write, [value])
				return this.this
			}),
			deleteKey: _FUNCTION(function (key = this.this.this.keys.read()) {
				sh1(key, this, this.this.this.values.delete)
				sh1(key, this, this.this.this.keys.delete)
				return this.this
			}),
			deleteValues: _FUNCTION(function (values) {
				for (const v of values) {
					const inds = this.this.this.values.indexesOf(v)
					this.this.this.keys.multcall("delete", inds)
					this.this.this.keys.multcall("delete", inds)
				}
				return this.this
			}),
			suchthat: _FUNCTION(function (
				predicates = alarray.native.generate(2).map(T)
			) {
				const oldkeys = this.this.this.keys.copy()
				this.this.this.keys.suchthat(
					(value, key) =>
						predicates[0](value) &&
						predicates[1](this.this.this.values.read(key))
				)
				this.this.this.values.suchthat(
					(value, key) =>
						predicates[1](value) && predicates[0](oldkeys.read(key))
				)
				return this.this
			}),
			copy: _FUNCTION(function (
				f = alarray.native.generate(2).map(alinative.function.const(ID)),
				isclass = false,
				template = isclass
					? this.this.this.this.class
					: this.this.this.this.class.template
			) {
				return this.this.this.this.class.class(
					this.this.this.keys.copy(f[0], isclass, template),
					this.this.this.values.copy(f[1], isclass, template)
				)
			}),
			copied: refactor.classes.copied,
			map: _FUNCTION(function (
				f = ID,
				isclass = false,
				template = isclass
					? this.this.this.this.class
					: this.this.this.this.class.template
			) {
				this.this.this = this.copy(f, isclass, template).this
				return this.this
			}),
			deleteKeys: _FUNCTION(function (
				keys = this.this.this.this.class.template.parentclass.static.empty()
			) {
				for (const k of keys) {
					const inds = this.this.this.keys.indexesOf(k)
					this.this.this.values.multcall("delete", inds)
					this.this.this.keys.multcall("delete", inds)
				}
				return this.this
			}),
			multcall: refactor.classes.multcall,
			[Symbol.iterator]: function* () {
				for (const x of this.this.this.values) yield x
			},
			every: _FUNCTION(function (predicates = alarray.native.generate(2).map(T)) {
				return (
					this.this.this.keys.every(predicates[0]) &&
					this.this.this.values.every(predicates[1])
				)
			}),
			any: _FUNCTION(function (predicates = alarray.native.generate(2).map(T)) {
				return (
					this.this.this.keys.any(predicates[0]) ||
					this.this.this.values.any(predicates[1])
				)
			})
		},
		static: (() => {
			const R = {}

			R.fromObject = _FUNCTION(function (object = {}, finite = false) {
				return this.this.class(
					...DEOBJECT(object).map(
						finite ? this.this.template.parentclass.static.fromArray : ID
					)
				)
			}).bind(R)

			R.empty = _FUNCTION(function () {
				return this.fromObject({}, true)
			}).bind(R)

			return R
		})(),
		transform: general.StaticThisTransform,
		recursive: true
	})
}

export const UnlimitedString = (parent = general.DEFAULT_GENARRCLASS) => {
	return EXTENSION({
		defaults: {
			parentclass: parent,
			empty: "",
			names: ["genarr"],
			unfound: undefined,
			basestr: " "
		},
		properties: {
			currindex: alinative.function.const(0)
		},
		// ? Refactor the 'methods' with 'OBJECT(...(methods' names), ...(methods' list).map(_FUNCTION))'?
		methods: {
			split: _FUNCTION(function (useparator = "") {
				const strarr = this.this.this.this.class.template.parentclass.class()
				if (is.str(useparator)) {
					let carryover = ""
					for (const str of this.this.this.genarr) {
						const postsplit = str.split(useparator)
						for (let i = 0; i < postsplit.length; ++i) {
							if (i === 0) {
								general
									.lengthSafeConcat(carryover, postsplit[i])
									.map(strarr.pushback)
								continue
							}
							if (
								i === postsplit.length - 1 &&
								!this.this.this.this.class.template.parentclass.template.icclass.template.comparison(
									this.this.this.genarr.currindex,
									this.this.this.genarr.finish()
								)
							) {
								carryover = postsplit[i]
								continue
							}
							strarr.pushback(postsplit[i])
						}
					}
				}
				if (this.this.this.this.class.is(useparator)) {
					// ! This thing re-appears throughout the class twice! Pray refactor...
					let prevcounter = this.init()
					let currcounter = this.init()
					let backupcounter = this.init()
					let hasBroken = false
					const first = useparator.read(useparator.init())

					// ! Pray generalize and re-scope this thing later...
					const FUNC = _FUNCTION(function (strarr, prevcounter, currcounter) {
						return strarr.pushback(
							this.copied("slice", [prevcounter, currcounter])
						)
					})

					for (
						;
						!currcounter.length().get().compare(this.length().get());
						currcounter = currcounter.next()
					) {
						while (this.read(currcounter) !== first) continue
						backupcounter = backupcounter.next()
						while (
							!this.this.this.this.class.template.parentclass.template.icclass.template.comparison(
								backupcounter,
								useparator.tototalindex()
							)
						) {
							// ! ISSUE [general]: with the passed instances of recursive classes - decide which parts of them are to be passed, how they should be read, and so on...
							// * Current decision: by the 'this.this.this->.class' part... [the inner, that is...];
							if (
								this.read(currcounter.jumpForward(backupcounter)) !=
								useparator.read(backupcounter)
							) {
								hasBroken = true
								break
							}
							backupcounter = backupcounter.next()
						}

						if (!hasBroken) {
							FUNC.bind(this)(strarr, prevcounter, currcounter)
							prevcounter = native.deepCopy(currcounter)
						}
						hasBroken = false
						currcounter = currcounter.jumpForward(backupcounter)
						backupcounter = this.init()
						continue
					}

					// * The last one is also needed due to the fact that the 'end' is 'open' in the sense that there is no more separators after it (hence, it follows that the end may also be equal to "");
					FUNC.bind(this)(strarr, prevcounter, currcounter)
				}
				return strarr
			}),
			// * Note: this transformation is the reverse of the thing that all the functions working with the data of the string must perform upon the indexes passed by the user...
			tototalindex: _FUNCTION(function (
				ind = this.this.this.genarr.currindex,
				subind = this.this.this.currindex
			) {
				let final = this.init()
				for (const x of this.this.this.genarr
					.copied("slice", [this.init(), ind.previous()])
					.keys())
					final = final.jumpForward(
						alinative.number.fromNumber(genarr.read(x).length)
					)
				return final.jumpForward(alinative.number.fromNumber().function(subind))
			}),
			finish: refactor.classes.finish,
			go: _FUNCTION(function (index) {
				const nind = this.fromtotalindex(index)
				this.this.this.genarr.currindex = nind[0]
				this.this.this.currindex = nind[1]
				return this.this
			}),
			fromtotalindex: _FUNCTION(function (index) {
				let present = this.init()
				let inarrind = this.init()
				let currstr = ""
				for (const x of this.genarr.copy((str) =>
					alinative.number.fromNumber(str.length)
				)) {
					inarrind = inarrind.next()
					currstr = x
					present = present.jumpForward(x)
					if (present.compare(index)) break
				}
				return [
					inarrind,
					currstr.length -
						present.difference(index).map(
							// ! make an alias for that thing (generally, so that there is a way for shorthand of an reverse-conversion...);
							InfiniteCounter(
								addnumber({
									start: -1
								})
							)
						).value
				]
			}),
			begin: refactor.classes.begin,
			end: refactor.classes.end,
			slice: _FUNCTION(function (
				beginning = this.init(),
				end = this.finish(),
				orderly = false
			) {
				const newstr = this.this.this.this.class.class()
				this.go(beginning)
				for (; !this.tototalindex().compare(end); this.next())
					newstr.pushback(this.currelem().get())
				this.this.this = (orderly ? (x) => x.order() : ID)(newstr).this
				return this.this
			}),
			read: _FUNCTION(function (index = this.init()) {
				return this.copied("symbolic", []).genarr.read(index)
			}),
			write: _FUNCTION(function (index, value) {
				general.fix(
					[this.this.this.genarr, this.this.this],
					alarray.native.generate(2).map(alinative.function.const("currindex")),
					() => {
						this.go(index)
						this.currelem().set(value)
					}
				)
				return this.this
			}),
			concat: _FUNCTION(function (ustring) {
				if (is.str(ustring)) return this.pushback(ustring)
				this.this.this.genarr.concat(ustring.genarr)
				return this.this
			}),
			currelem: _FUNCTION(function () {
				return {
					get: () => {
						return this.this.this.genarr.currelem().get()[
							this.this.this.currindex
						]
					},
					set: (char) => {
						return this.this.this.genarr
							.currelem()
							.set(
								alinative.string.sreplaceIndex(
									this.this.this.genarr.currelem().get(),
									this.this.this.currindex,
									char
								)
							)
					}
				}
			}),
			next: _FUNCTION(function () {
				if (
					this.this.this.genarr.currelem().get().length >
					this.this.this.currindex
				)
					return this.this.this.genarr.currelem().get()[
						++this.this.this.currindex
					]
				this.this.this.genarr.next()
				return this.this.this.genarr
					.currelem()
					.get()[(this.this.this.currindex = 0)]
			}),
			previous: _FUNCTION(function () {
				if (this.this.this.currindex > 0)
					return this.this.this.genarr.currelem().get()[
						--this.this.this.currindex
					]
				this.this.this.genarr.previous()
				return this.this.this.genarr
					.currelem()
					.get()[(this.this.this.currindex = this.this.this.genarr.currelem().get().length - 1)]
			}),
			length: _FUNCTION(function () {
				return {
					get: () => {
						return this.tototalindex(
							this.this.this.genarr.length().get(),
							this.this.this.genarr.read(this.this.this.genarr.finish())
						)
					},
					set: (
						newlen,
						basestr = this.this.this.this.class.template.basestr[0]
					) => {
						if (newlen.compare(this.length().get())) {
							newlen
								.difference(this.length().get())
								.loop(() => this.pushback(basestr))
							return this.this
						}

						return this.slice(this.init(), newlen.previous())
					}
				}
			}),
			copied: refactor.classes.copied,
			insert: _FUNCTION(function (index, value) {
				this.this.this = this.copied("slice", [this.init(), index.previous()])
					.concat(value)
					.concat(this.copied("slice", [index])).this
				return this.this
			}),
			remove: _FUNCTION(function (index) {
				return this.slice(index, index)
			}),
			join: _FUNCTION(function (
				separator,
				frequency = alinative.function.const(
					this.this.this.this.class.template.parentclass.template.icclass.next()
				),
				order = false
			) {
				const r = this.this.this.genarr.empty()
				let inserted = this.init()
				let cfreq = frequency(inserted)
				for (let i = this.init(); !i.compare(this.length().get()); i = i.next()) {
					r.pushback(this.read(i))
					if (
						this.this.this.this.class.template.tintclass.static
							.fromCounter(i.next())
							.modulo(cfreq)
							.equal(
								this.this.this.this.class.template.tintclass.static.zero()
							)
					) {
						r.pushback(separator)
						inserted = inserted.next()
						cfreq = frequency(inserted)
					}
				}
				this.this.this = (order ? (x) => x.order() : ID)(r).this
				return this.this
			}),
			reverse: _FUNCTION(function () {
				this.this.this.genarr.reverse()
				for (x in this.this.this.genarr)
					this.write(x, x.split("").reverse().join(""))
				return this.this
			}),
			map: _FUNCTION(function (f = ID) {
				this.this.this = this.copy(f).this
				return this.this
			}),
			copy: _FUNCTION(function (f = ID) {
				const emptystr = this.this.this.this.class.class()
				emptystr.this.genarr = this.this.this.genarr.copy()
				for (const x of emptystr.keys())
					emptystr.write(x, f(emptystr.read(x), x, emptystr))
				return emptystr
			}),
			keys: function* () {
				let curr = this.init()
				for (; !curr.compare(this.length().get()); curr = curr.next()) yield curr
			},
			isEmpty: _FUNCTION(function () {
				for (const x of this.this.this.genarr) if (x !== "") return false
				return true
			}),
			sort: _FUNCTION(function (predicate) {
				return this.split("").genarr.sort.merge().function(predicate)
			}),
			isSorted: _FUNCTION(function (predicate) {
				return this.this.this.this.class.template.parentclass.template.icclass.template.comparison(
					this.copied("sort", [predicate]),
					this.this.this
				)
			}),
			indexesOf: _FUNCTION(function (ustring, halt = false, haltAfter = Infinity) {
				const indexes = this.this.this.this.class.template.parentclass.class()
				if (is.str(ustring))
					return this.indexesOf(this.this.this.this.class.class(ustring))
				if (this.this.this.this.class.is(ustring)) {
					// ! NOTE: (partially) the same code as in the 'split'; Pray, after further work on it - refactor...
					let currcounter = this.init()
					let backupcounter = this.init()
					let hasBroken = false
					const first = useparator.read(useparator.init())

					for (
						;
						!currcounter.length().get().compare(this.length().get());
						currcounter = currcounter.next()
					) {
						if (halt && indexes.length().get().compare(haltAfter)) break
						while (this.read(currcounter) !== first) continue
						backupcounter = backupcounter.next()
						while (
							!this.this.this.this.class.template.parentclass.template.icclass.template.comparison(
								backupcounter,
								useparator.tototalindex()
							)
						) {
							if (
								this.read(currcounter.jumpForward(backupcounter)) !=
								useparator.read(backupcounter)
							) {
								hasBroken = true
								break
							}
							backupcounter = backupcounter.next()
						}

						if (!hasBroken) indexes.pushback(currcounter)
						hasBroken = false
						currcounter = currcounter.jumpForward(backupcounter)
						backupcounter = this.init()
						continue
					}
				}
				return indexes
			}),
			firstIndex: _FUNCTION(function (ustring) {
				const indexes = this.indexesOf(ustring, true, this.one())
				if (indexes.length().get().compare(this.init()))
					return indexes.read(this.init())
				return this.this.this.this.class.template.unfound
			}),
			includes: refactor.classes.includes,
			// Shall change the entirety of the UnlimitedString's order in such a way, so as to maximize the sizes of the finite Strings that compose the UnlimitedString;
			// * Most memory- and that-from-the-standpoint-of-execution, efficient option;
			order: _FUNCTION(function () {
				const newstr = this.copy()
				let bigind = this.init()
				let smallind = 0
				for (const x of this) {
					if (smallind == MAX_STRING_LENGTH) {
						bigind = bigind.next()
						smallind = 0
						newstr.pushback("")
					}
					newstr.write(biding, newstr.read(bigind) + x)
					++smallind
				}
				this.this.this = newstr.this
				return this.this
			}),
			// The precise opposite of 'order': minimizes the length of each and every string available within the underlying GeneralArray;
			// * Makes loops and [generally] execution of any manner of loops longer, because native API is not used anymore, less memory efficient option, but allows for a slightly more intuitive underlying 'GeneralArray' [best for representation/reading the unlimited string]; Also - produces more manageable code;
			symbolic: _FUNCTION(function () {
				const symstr = this.this.this.this.class.class()
				for (const sym of this) symstr.pushback(sym)
				this.this.this = symstr.this
				return this.this
			}),
			pushback: _FUNCTION(function (ustring) {
				if (is.str(ustring)) return this.this.this.genarr.pushback(ustring)
				return this.concat(ustring)
			}),
			pushfront: _FUNCTION(function (ustring) {
				if (is.str(ustring)) {
					this.this.this.genarr.pushfront(ustring)
					return this.this
				}
				this.this.this = ustring.copied("concat", [this.this]).this
				return this.this
			}),
			[Symbol.iterator]: function* () {
				for (const str of this.this.this.genarr) for (const sym of str) yield sym
			},
			suchthat: refactor.classes.suchthat,
			any: refactor.classes.any,
			every: refactor.classes.every,
			forEach: refactor.classes.forEach,
			multcall: refactor.classes.multcall
		},
		static: (() => {
			const R = {}

			R.fromString = _FUNCTION(function (str = "") {
				return this.this.class(str)
			}).bind(R)

			return R
		})(),
		transform: general.StaticThisTransform,
		recursive: true
	})
}

general.DEFAULT_USTRCLASS = UnlimitedString()

export const tnumbers = {
	TrueInteger: function (parentclass = general.DEFAULT_ICCLASS) {
		return EXTENSION({
			defaults: {
				parentclass: parentclass,
				names: ["value"]
			},
			methods: {
				add: _FUNCTION(function (added = this.one()) {
					return this.this.this.this.class.class(
						this.this.this.value.jumpDirection(added.value)
					)
				}),
				multiply: _FUNCTION(function (multiplied = this.one()) {
					return multiplied.value.class.static.whileloop(
						multiplied.value,
						(x) => x.add(this.this.this),
						multiplied.class.template.parentclass.class(),
						undefined,
						undefined,
						this.this.this
					)
				}),
				// * Raise 'this.this.this' to the integer power of 'x' (works with negatives too...);
				power: _FUNCTION(function (x = this.one()) {
					if (!this.class.template.icclass.direction(x))
						return TrueRatio(this.template.icclass).class([
							this.class.template.icclass.class().next(),
							this.power(x.reverse())
						])
					return repeatedApplication(
						(y) => y.multiply(this.this.this),
						x,
						this.this.this
					)
				}),
				modulo: _FUNCTION(function (d = this.one()) {
					let curr = this.this.this.this.class.class()
					while (!(curr = curr.add(d)).compare(this.this.this.value)) {}
					return curr.difference(this.this.this)
				}),
				// * Returns the additive inverse
				invadd: _FUNCTION(function () {
					return this.this.this.this.class(
						this.value.map(this.class.template.icclass.static.reverse()).value
					)
				}),
				// * Returns the multiplicative inverse (TrueRatio type);
				invmult: _FUNCTION(function () {
					return TrueRatio(this.this.this.this.class)(
						this.this.this.this.class.static.one(),
						this.this.this
					)
				}),
				compare: _FUNCTION(function (compared = this.zero()) {
					return this.this.this.value.compare(compared.value)
				}),
				difference: _FUNCTION(function (d = this.one()) {
					return this.this.this.add(d.invadd())
				}),
				// ? Generalize the 'divide' and 'roots'-kinds of methods to a uniform template-method 'inverse'? [GREAT IDEA! Where to put the method?]
				divide: _FUNCTION(function (d) {
					let r = this.this.this.this.class.class()
					let copy = this.copy()
					while (copy.compare(d)) {
						copy = copy.difference(d)
						r = r.add()
					}
					return r
				}),
				copy: _FUNCTION(function () {
					return this.this.this.this.class.class(
						native.copy.deepCopy(this.this.this.value.value)
					)
				}),
				equal: _FUNCTION(function (x = this.one()) {
					return (
						this.this.this.value.compare(x.value) &&
						x.value.compare(this.this.this.value)
					)
				}),
				root: _FUNCTION(function (x = this.two(), ceil = false) {
					let r = this.this.this.this.class.class()
					let temp
					while (!(temp = r.power(x)).compare(this)) r = r.add()
					if (temp.equal(this) || ceil) return r
					return r.difference()
				}),
				zero: _FUNCTION(function () {
					return this.this.this.this.class.static.zero()
				}),
				one: refactor.classes.oneadd,
				two: refactor.classes.twoadd
			},
			static: (() => {
				const R = {}

				R.zero = refactor.classes.zero.bind(R)
				R.one = refactor.classes.oneadd.bind(R)
				R.two = refactor.classes.twoadd.bind(R)

				// ! PROBLEM [general]: the CLASS and EXTENSION do __not__ currently handle templates in the '.static' field! Pray do something about it...
				// ? Allow for '.static' extension?
				R.fromNumber = _FUNCTION(function (num = 1) {
					return this.this.class(
						alinative.number.iterations({
							iterated: this.this.template.parentclass.template
						})(num)
					)
				}).bind(R)

				R.fromCounter = _FUNCTION(function (ic) {
					return number.TrueInteger(ic.class)(ic.value)
				}).bind(R)

				return R
			})(),
			transform: general.StaticThisTransform,
			recursive: true,
			toextend: []
		})
	},
	TrueRatio: function (parentclass = general.DEFAULT_TINTCLASS) {
		const nameslist = ["numerator", "denomenator"]
		return EXTENSION({
			defaults: {
				parentclass: parentclass,
				names: nameslist,
				inter: cdieach,
				defaults: {
					constructor: alarray.native.generate(2).map(
						alinative.function.const(
							_FUNCTION(function () {
								return this.template.parentclass.static.one()
							})
						)
					)
				}
			},
			methods: {
				add: _FUNCTION(function (
					addratio = this.this.this.this.class.static.one()
				) {
					return this.this.this.this.class.static.simplified(
						this.this.this.this.class.class(
							this.this.this.numerator
								.multiply(addratio.denomenator)
								.add(
									addratio.numerator.multiply(
										this.this.this.denomenator
									)
								),
							this.this.this.denomenator.multiply(addratio.denomenator)
						)
					)
				}),
				multiply: _FUNCTION(function (
					multratio = this.this.this.class.static.one()
				) {
					return this.this.this.this.class.class(
						this.numerator.multiply(multratio.numenator),
						this.denomenator.multiply(multratio.denomenator)
					)
				}),
				invadd: _FUNCTION(function () {
					return this.this.this.this.class.class(
						this.this.this.numerator.invadd(),
						this.this.this.denomenator
					)
				}),
				invmult: _FUNCTION(function () {
					return this.this.this.this.class.class(
						...nameslist.map((x) => this.this.this[x]).reverse()
					)
				}),
				isWhole: _FUNCTION(function () {
					return this.this.this.denomenator.equal(
						this.this.this.this.class.template.parentclass.static.one()
					)
				}),
				copy: _FUNCTION(function () {
					return this.this.this.this.class.class(
						...nameslist.map((x) => this.this.this[x])
					)
				}),
				naivesum: _FUNCTION(function (ratio = this.this.this.this.class.class()) {
					return this.this.this.this.class.class(
						...nameslist.map((x) => this.this.this[x].add(ratio[x]))
					)
				}),
				// ? Wonder - how about allowing for extended-methods of this general form [using the parent class variable instances list];
				equal: _FUNCTION(function (ratio = this.this.this.this.class.class()) {
					return nameslist.every((x) => this.this.this[x].equal(ratio[x]))
				})
			},
			static: (() => {
				const R = {}

				R.simplified = _FUNCTION(function (ratio) {
					ratio = ratio.copy()
					const m = ratio.numerator.compare(ratio.denomenator)
						? "numerator"
						: "denomenator"
					const l = m === ratio.numerator ? "denomenator" : "numerator"
					for (const x of integer.allFactors().function(m))
						if (this.this.class().equal(ratio[l].modulo(x))) {
							ratio[m] = ratio[m].divide(x)
							ratio[l] = ratio[l].divide(x)
						}
					return ratio
				}).bind(R)

				return R
			})(),
			transform: general.StaticThisTransform,
			recursive: true,
			// ! work more on this list...Decide if it ought to remain empty for the time being...;
			toextend: []
		})
	}
}

general.DEFAULT_TINTCLASS = tnumbers.TrueInteger()
general.DEFAULT_TRATIOCLASS = tnumbers.TrueRatio()

// Utilizes the fact that JS passes objects by reference;
export const Pointer = TEMPLATE({
	defaults: { label: "", nullptr: undefined },
	function: _FUNCTION(function (value = this.template.nullptr) {
		return { [this.template.label]: value }
	}),
	word: "class"
}).function

export const InfiniteArray = CLASS({
	defaults: {
		index: ID,
		genarrclass: general.DEFAULT_GENARRCLASS,
		icclass: general.DEFAULT_ICCLASS
	},
	properties: {
		f: _FUNCTION(function (arrfunc = this.template.index) {
			return arrfunc
		})
	},
	methods: {
		read: _FUNCTION(function (i = this.class.template.icclass.class()) {
			return this.f(i)
		}),
		// ? Question: make 'index' separate from '.read' - get rid of the default values for it? [To allow for usage of 'undefined' in the counters used?];
		index: _FUNCTION(function (i) {
			return this.read(i)
		}),
		write: _FUNCTION(function (i, v) {
			const x = this.f
			this.f = function (I) {
				if (I.equal(i)) return v
				return x(I)
			}
			return this
		}),
		subarr: _FUNCTION(function (predicate = TRUTH) {
			x = this.f
			this.f = _FUNCTION(function (i = this.class.template.icclass.class()) {
				let subind = this.class.template.icclass.class()
				let fi = this.class.template.icclass.class()
				while (!subind.equal(i)) {
					if (predicate(x(i), i)) subind = subind.next()
					fi = fi.next()
				}
				return this.f(fi)
			})
			return this
		}),
		copy: _FUNCTION(function () {
			return this.class.class(this.f)
		}),
		copied: refactor.classes.copied,
		map: _FUNCTION(function (g) {
			const x = this.f
			this.f = _FUNCTION(function (i) {
				return g(x(i))
			})
			return this
		}),
		slice: _FUNCTION(function (inind, enind) {
			const genarr = this.class.template.genarrclass.static.empty()
			for (let i = inind; !i.compare(enind); i = i.next())
				genarr.pushback(this.f(i))
			return genarr
		}),
		init: _FUNCTION(function () {
			return this.class.template.genarrclass.init()
		}),
		// ^ NOTE: this is an INFINITE LOOP. The user has to break out of it on their own... Things like `for (const x of infarr) {}` run endlessly.
		[Symbol.iterator]: function* () {
			let c = this.class.template.icclass.static.zero()
			while (true) {
				yield this.read(c)
				c = next(c)
			}
		}
	},
	recursive: false
}).function

general.DEFAULT_INFARR = InfiniteArray()

export const InfiniteString = (parentclass = general.DEFAULT_INFARR, ensure = false) => {
	const _class = EXTENSION({
		defaults: {
			parentclass: parentclass,
			ustrclass: general.DEFAULT_USTRCLASS,
			names: ["infarr"],
			deff: TRUTH,
			defaults: {
				inter: _FUNCTION(function (f = this.template.deff) {
					return (i) => str(f(i))
				})
			}
		},
		methods: {
			copy: _FUNCTION(function () {
				return this.this.this.this.class.class(this.this.this.infarr.f)
			}),
			copied: refactor.classes.copied,
			slice: _FUNCTION(function (beg = this.init(), end) {
				// ! generalize this;
				if (arguments.length === 1) {
					end = beg
					beg = this.init()
				}
				let c = beg
				const r = this.this.this.this.class.template.ustrclass.class()
				for (; lesser(c, end); c = next(c)) r.pushback(this.read(c))
				return
			})
		},
		recursive: false,
		toextend: ["init", "subarr", "read", "index"]
	})
	return (
		ensure
			? (x) =>
					Ensurer(x, undefined, {
						// ! Not efficient - wastes a single '.write' call; (If just used the EXTENSION, this wouldn't happen...); But using EXTENSION means (largely), using exactly the same code;
						// ? work on EXTENSION to allow for compact in- and out-wrappers for methods of derived class, like here;
						write: _FUNCTION(function (_tr, thisarg, args) {
							return thisarg.write(args[0], str(args[1]))
						}),
						map: _FUNCTION(function (_tr, thisarg, _args) {
							return thisarg.map(str)
						})
					})
			: ID
	)(_class)
}

export const TreeNode = (parentclass = general.DEFAULT_GENARRCLASS) => {
	return EXTENSION({
		defaults: {
			parentclass: parentclass,
			names: ["children"],
			defaults: {
				inter: _FUNCTION(function (args, _i, instance) {
					return [
						args[0].copy((x) =>
							this.class(
								this.template.parentclass.static.empty(),
								x,
								instance
							)
						)
					]
				})
			},
			defaultnode: undefined,
			unfound: undefined
		},
		properties: {
			// ! Generalize these functions/make aliases [ID_n, or some such... - returns the n'th arguments value as-is];
			node: _FUNCTION(function (_children, n = this.template.defaultnode) {
				return n
			}),
			root: function (_children, _node, r = null) {
				return r
			}
		},
		methods: {
			getall: _FUNCTION(function (nodes = true) {
				const transform = nodes ? alinative.function.index("node") : ID
				const f = this.this.this.this.class.template.parentclass.static.fromArray(
					[transform(this.this.this)]
				)
				for (const x of this.this.this.children) {
					f.pushback(transform(x))
					f.concat(x.getall(nodes))
				}
				return f
			}),
			getpart: _FUNCTION(function (beg, end, nodes = true) {
				// note: the .slice(.one()) is to get rid of the 'undefined' in the leading node...;
				return this.this.this.this
					.class(this.this.this.children.copied("slice", [beg, end]), undefined)
					.getall(nodes)
					.slice(this.this.this.children.one())
			}),
			// ! Generalize these (see, '.pushfront' and '.pushback') kinds of methods [both for the 'TreeNode' and the CLASSes in 'macros.mjs'];
			pushback: _FUNCTION(function (v) {
				this.this.this.children.pushback(
					this.this.this.this.class.class(undefined, v, this)
				)
				return this.this
			}),
			pushfront: _FUNCTION(function (v) {
				this.this.this.children.pushfront(
					this.this.this.this.class.class(undefined, v, this)
				)
				return this.this
			}),
			firstIndex: _FUNCTION(function (v) {
				return this.indexesOf(v, true, this.one())
			}),
			indexesOf: _FUNCTION(function (v, halt = false, haltAfter = Infinity) {
				if (this.this.this.children.isEmpty())
					return comparison(this.this.this.node, v)
						? this.this.this.children.empty()
						: false
				const indexes = this.this.this.children.empty()
				for (x of this.this.this.children) {
					const ci = indexes.read()
					const r = x.indexesOf(ci.copied("slice", [this.one()]))
					if (r) indexes.concat(r.pushfront(ci))
				}
				return (
					halt ? (x) => x.slice(this.init(), haltAfter.previous()) : ID
				)(indexes)
			}),
			copy: _FUNCTION(function (
				f = ID,
				isclass = false,
				template = isclass
					? this.this.this.this.class.template.parentclass
					: this.this.this.this.class.template.parentclass.template
			) {
				// ! Issue - should one copy the 'node' value as well? [One ought at least allow the option...];
				return this.this.this.this.class.class(
					this.this.this.this.children.copy(
						function (x) {
							return f(x.node, ...arguments)
						},
						isclass,
						template
					),
					this.this.this.node,
					this.this.this.root
				)
			}),
			copied: refactor.classes.copied,
			map: _FUNCTION(function (
				f = ID,
				isclass = false,
				template = isclass
					? this.this.this.this.class.template.parentclass
					: this.this.this.this.class.template.parentclass.template
			) {
				this.this.this = this.copy(f, isclass, template).this
				return this.this
			}),
			insert: _FUNCTION(function (multindex, v) {
				if (multindex.length().get().equal(this.this.this.children.one())) {
					this.this.this.children.insert(
						multindex.read(),
						this.this.this.this.class.class(undefined, v, this)
					)
					return this.this
				}
				this.this.this.children
					.read(multindex.read())
					.insert(multindex.slice(multindex.one()), v)
				return this.this
			}),
			delval: _FUNCTION(function (v) {
				return this.this.this.children.delval(v, {
					comparison: (x, y) => comparison(x.node, y)
				})
			}),
			prune: _FUNCTION(function (multindex) {
				if (multindex.length().get().equal(this.this.this.children.one())) {
					this.this.this.children.delete(multindex.read())
					return this.this
				}
				this.this.this.children
					.read(multindex.read())
					.prune(multindex.slice(multindex.one()), v)
				return this.this
			}),
			*[Symbol.iterator]() {
				for (const x of this.keys()) yield this.read(x)
			},
			*keys() {
				for (const x of this.getall().keys()) yield x
			},
			// This one can be especially useful for things like NTreeNode (due to 'multi' and known indicies distribution...);
			read: _FUNCTION(function (
				index = this.this.this.children.init(),
				multi = false,
				nodes = true,
				first = true
			) {
				if (first) index = index.copy()
				if (!multi) return this.getall(nodes).read(index)
				const r = this.this.this.children.read(index.read())
				if (index.length().get().compare(index.two()))
					return r.read(index.slice(index.one()), multi, nodes, false)
				return (nodes ? alinative.function.index("node") : ID)(r)
			}),
			findRoots: _FUNCTION(function (v) {
				return this.indexesOf(v).map((x) => this.read(x).root)
			}),
			depth: _FUNCTION(function () {
				// ! use 'isEmpty()' more oftenly (generally - see which methods there are, whether they can be applied somewhere, refactor-elementarize...);
				if (this.this.this.children.isEmpty())
					return this.this.this.children.init()
				// ! problem here is the default 'uevaluate' table, which doesn't currently have any predefined operations on the infinite Counters (add them, pray...);
				return this.this.this.children.one().jumpForward(
					uevaluate().function(
						Expression(
							"jumpForward",
							this.this.this.this.class.parentclass.static.empty(),
							this.this.this.children.copy((x) => x.depth())
						)
					)
				)
			}),
			// ! Allow for non-multiindex arguments here as well!
			write: _FUNCTION(function (mindex, value) {
				if (mindex.length().get().equal(mindex.one()))
					return this.this.this.children.write(
						mindex.read(),
						this.this.this.this.class.class(
							this.this.this.this.class.template.parentclass.static.empty(),
							value,
							this.this.this
						)
					)
				return this.this.this.children
					.read(mindex.read())
					.write(mindex.slice(mindex.one()), value)
			}),
			// ? Generalize/refactor? [possibly, repeatedApplication]
			findAncestors: _FUNCTION(function (x) {
				const froots = this.this.this.children.empty()
				let currroots = this.findRoots(x)
				while (!currroots.every((x) => x === null)) {
					currroots = currroots.copy(this.findRoots)
					froots.concat(currroots)
				}
				return froots
			}),
			commonAncestors: _FUNCTION(function (
				values = this.this.this.this.class.template.parentclass.static.empty()
			) {
				return alarray
					.common({ f: (x) => this.findAncestors(x) })
					.function(values)
			}),
			swap: _FUNCTION(function (ind1, ind2 = this.init(), multi = false) {
				const n1val = this.read(ind1, multi)
				this.write(ind1, this.read(ind2, multi))
				this.write(in2, n1val)
				return this.this
			}),
			order: _FUNCTION(function () {
				return dim({ form: treeForm(this.this.this.this.class) }).function(this)
			}),
			multitoflat: _FUNCTION(function (
				multi = this.this.this.this.class.template.parentclass.static.empty(),
				first = true
			) {
				if (first) multi = multi.copy()
				let res = this.this.this.this.class.template.icclass.static.one()
				if (
					multi
						.length()
						.get()
						.compare(
							this.this.this.this.class.template.parentclass.static.one()
						)
				)
					res = multi
						.read()
						.jumpForward(
							this.this.this.children
								.read(multi.read())
								.multitoflat(multi.slice(multi.one())),
							false
						)
				return res
			}),
			flattomulti: _FUNCTION(function (index = this.init(), first = true) {
				let currindex = (copy ? (x) => x.copy() : ID)(index)
				const multi =
					this.this.this.this.class.template.parentclass.static.empty()
				for (const x of this.this.this.children.keys()) {
					if (
						!currindex.compare(this.this.this.children.read(x).length().get())
					) {
						if (!first) break
						multi.pushback(x)
						continue
					}
					currindex = currindex.jumpBackward(
						this.this.this.children.read(x).length().get()
					)
					currindex = this.this.this.children
						.read(x)
						.flattomulti(currindex, false)
				}
				return first ? multi : currindex
			})
		},
		recursive: true
	})
}
general.DEFAULT_TREENODECLASS = TreeNode()

export const UnlimitedSet = (parentclass = general.DEFAULT_GENARRCLASS) => {
	return EXTENSION({
		defaults: {
			parentclass: parentclass,
			names: ["genarr"],
			defaults: {
				inter: _FUNCTION(function (
					genarr = this.template.genarrclass.static.empty()
				) {
					return [ensureSet(genarr)]
				})
			}
		},
		methods: {
			ni: _FUNCTION(function (el) {
				return this.includes(el)
			}),
			add: _FUNCTION(function (el) {
				if (!this.includes(el)) this.this.this.genarr.pushback(el)
				return this.this
			}),
			delval: _FUNCTION(function (el) {
				return this.this.this.genarr.delval(el)
			}),
			copy: _FUNCTION(function (
				f = ID,
				isclass = false,
				template = isclass
					? this.this.this.this.class
					: this.this.this.this.class.template
			) {
				return this.this.this.this.class.class(
					this.this.this.genarr.copy(f, isclass, template)
				)
			}),
			copied: refactor.classes.copied,
			union: refactor.classes.usetmeth("concat"),
			intersection: refactor.classes.usetmeth("intersection"),
			complement: _FUNCTION(function (
				uset = this.this.this.this.class.static.empty()
			) {
				return this.suchthat((x) => !uset.ni(x))
			}),
			subsets: _FUNCTION(function (fix = false) {
				if (fix) this.fix()
				const subs = this.this.this.this.class.template.parentclass.static.empty()
				for (const i of this.keys()) {
					const c = this.copied("delete", [i])
					subs.pushback(c)
					subs.concat(c.subsets().genarr)
				}
				return this.this.this.this.class.class(subs)
			}),
			// * manually 'fixes' a potentially 'broken' set - allows usage of sets as arrays in algorithms, then returning them to their desired state (and also - explicit manipulation of orders on sets);
			fix: _FUNCTION(function () {
				// ? Dilemma - use 'ensureSet' directly, or keep as this? [that way, reference is 'linked', whereas otherwise it is 'parallel']
				this.this.this.genarr = this.this.this.this.class.class(
					this.this.this.genarr
				).genarr
				return this.this
			}),
			map: _FUNCTION(function (
				f = ID,
				isclass = false,
				template = isclass
					? this.this.this.this.class
					: this.this.this.this.class.template
			) {
				this.this.this = this.copy(f, isclass, template).this
				this.fix()
				return this.this
			})
		},
		static: (() => {
			const R = {}
			// ! REFACTOR THE '_FUNCTION's! (due to infinite Bindability, this can be done easily...);
			R.empty = _FUNCTION(function () {
				return this.this.class()
			}).bind(R)
			return R
		})(),
		recursive: true
	})
}

export const InfiniteSet = (template = {}) => {
	const x = InfiniteArray.function(template).class()
	const y = x.copy()
	return y.subarr((el, i) => !x.slice(x.init(), i.previous()).includes(el))
}

export const ustr = UnlimitedString
export const genarr = GeneralArray
export const umap = UnlimitedMap
export const infarr = InfiniteArray
export const infstr = InfiniteString
export const infset = InfiniteSet
export const ic = InfiniteCounter
export const liarr = garrays.LastIndexArray
export const darr = garrays.DeepArray
export const carr = garrays.CommonArray
export const tint = tnumbers.TrueInteger
export const tratio = tnumbers.TrueRatio
export const tn = TreeNode
export const uset = UnlimitedSet
export const p = Pointer

// Extends 'TreeNode';
export const NTreeNode = TEMPLATE({
	defaults: [
		function () {
			return {
				parentclass: general.DEFAULT_TREENODECLASS,
				icclass: general.DEFAULT_ICCLASS
			}
		},
		function () {
			return {
				n: this.template.icclass.static.two()
			}
		}
	],
	function: alinative.function.const(function (
		parentclass = this.template.parentclass
	) {
		return Ensurer(
			parentclass,
			(_r, _this) =>
				this.template.n.compare(_this.this.this.children.length().get()),
			{
				// ? Question: how to choose the index for the child, to which the element from 'args' is pushed?
				pushback(_r, _t, args) {
					this.this.this.children.delete()
					this.this.this.children.read().pushback(args[0])
					return this.this
				},
				pushfront(_r, _t, args) {
					this.this.this.children.delete(this.init())
					this.this.this.children.read().pushfront(args[0])
					return this.this
				},
				insert(_r, _t, args) {
					const ind = args[0].copied("delete")
					const lastind = args[0].read(args[0].finish())
					const x = this.read(ind, false, false)
					x.delete(lastind)
					x.read(lastind).insert(
						x.class.template.parentclass.staic.fromArray([x.init()]),
						args[1]
					)
					return this.this
				}
			}
		)
	}),
	word: "class",
	isthis: true
}).function

// * NOTE: as the Graph allows for dynamically defined graphs (namely, the graphs with different values of 'edges', this doesn't necessarily always make sense);
// ^ NOTE: this class also allows for finite computation of infinitely large graphs;
// ^ NOTE: the verticies in the graph DON'T HAVE TO BE CONNECTED - one can use one Graph instance as a combination of two unrelated graphs
// ? Add some such 'concat/combine/unite/union' method for it, then?
export const Graph = (parentclass = general.DEFAULT_GENARRCLASS) => {
	return EXTENSION({
		defaults: {
			parentclass: parentclass,
			names: ["verticies"],
			defaults: function () {
				return {
					constructor: [this.template.parentclass.static.empty],
					inter: function (args, _i) {
						return [
							ensureSet(args[0].copy((x, i) => Vertex(x, args[1].read(i))))
						]
					}
				}
			}
		},
		methods: {
			getAdjacent: _FUNCTION(function (index = this.init()) {
				return this.this.this.verticies
					.read(index)
					.edges.copy(alinative.function.call)
			}),
			addvertex: _FUNCTION(function (
				value,
				edges = this.this.this.this.class.template.parentclass.static.empty()
			) {
				this.this.this = this.copied("pushback", [Vertex(value, edges)])
				return this.this
			}),
			addedge: _FUNCTION(function (
				index = this.init(),
				edge = alinative.function.const(this.this.this.verticies.read(index))
			) {
				this.this.this = this.this.this.verticies.read(index).edges.pushback(edge)
				return this.this
			}),
			computevertex: _FUNCTION(function (indexv, indexe) {
				return this.pushback(
					this.this.this.verticies.read(indexv).edges.read(indexe)
				)
			}),
			write: _FUNCTION(function (index, value) {
				this.this.this.verticies.read(index).value = value
				return this.this
			}),
			read: _FUNCTION(function (index = this.init()) {
				return this.this.this.verticies.read(index).value()
			}),
			deledge: _FUNCTION(function (indv, inde) {
				return this.this.this.verticies.read(indv).edges.delete(inde)
			}),
			delete: _FUNCTION(function (
				index,
				comparison = this.this.this.this.class.template.parentclass.template
					.comparison
			) {
				const deleted = this.this.this.verticies.read(index)
				this.this.this.verticies.delete(index)
				const todelete =
					this.this.this.this.class.template.paretnclass.static.empty()
				for (const x of this.this.this.verticies.keys()) {
					const read = this.this.this.verticies.read(x)
					for (const e of read.edges.keys())
						if (comparison(deleted, read.edges.read(e)()))
							todelete.pushback([x, e])
				}
				for (const td of todelete)
					this.this.this.verticies.read(td[0]).edges.delete(td[1])
				return this.this
			}),
			copy: _FUNCTION(function (
				f = ID,
				isclass = false,
				template = isclass
					? this.this.this.this.class
					: this.this.this.this.class.template
			) {
				// ! THIS IS THE 'DE-INTERFACING' procedure... Pray, when starting to work on Interfaces (post v1.0), add this...
				return this.this.this.this.class.class(
					this.this.this.verticies.copy(
						(x) => f(alinative.function.index("value")(x)),
						isclass,
						template
					),
					this.this.this.verticies.copy(
						(x) => f(alinative.function.index("edges")(x)),
						isclass,
						template
					)
				)
			}),
			// ! ISSUE - with infinite computability+dynamicness, how does it get handled here (generally)? The thing in question only checks one layer... Should it check even this much? [Current decision, no, it shouldn't... - either do it recursively for a chosen level (wanted)]
			suchthat: _FUNCTION(function (predicate = TRUTH) {
				return this.this.this.this.class(
					this.this.this.verticies.copied("suchthat", [
						(x) =>
							predicate(x.value()) &&
							x.edges().every((y) => predicate(y().value()))
					])
				)
			}),
			[Symbol.iterator]: function* () {
				for (const x of this.keys()) yield this.read(x)
			},
			// ? Add 'comparison' template variable to the 'Graph'? (generally, avoid using the 'parentclass' template variables, allow setting one's own for each class?);
			// ! NOTE: this thing works ONLY with finite/static graphs that have 'const EDGEGARR = GeneralArray(...).class(...); edges = alinative.function.const(EGEARR)'; (When it references a single separately allocated array); For such situations, pray make an alias, + consider generalizing this method to be more general... (same with 'edges', more work is needed on them...);
			deledgeval: _FUNCTION(function (
				index,
				value,
				comparison = this.this.this.this.class.template.parentclass.template
					.comparison
			) {
				const todelinds =
					this.this.this.this.class.template.parentclass.static.empty()
				const edges = this.this.this.verticies.read(index).edges()
				for (const x of edges.keys())
					if (comparison(x().value(), value)) todelinds.pushback(x)
				for (const ind of todelinds) edges.delete(ind)
				return this.this
			})
		},
		recursive: true
	})
}

export const Vertex = (value, edges) => ({ value, edges })

general.DEFAULT_GRAPHCLASS = Graph()

// ? General issue [small] - currently, the niether TreeNode nor Heaps support the lacking '.value'; Pray think more on it... (implement a solution)
// ! Add copy to each one of those...
export const heaps = {
	PairingHeap(parentclass = general.DEFAULT_TREENODECLASS) {
		return EXTENSION({
			defaults: refactor.defaults.heap(parentclass),
			methods: {
				merge: _FUNCTION(function (
					heaps = this.this.this.this.class.template.parentclass.template.parentclass.static.empty()
				) {
					if (heaps.length().get().compare(heaps.one())) {
						if (!heaps.one().compare(heaps.length().get()))
							return this.merge(
								this.this.this.this.class.template.parentclass.template.parentclass.static.fromArray(
									[heaps.read()]
								)
							).merge(heaps.slice(heaps.one()))
						function X(ac, a, b, checked = false) {
							if (
								checked ||
								this.this.this.this.class.template.predicate(
									[a, b].map((x) => x.treenode.value)
								)
							) {
								const t = a.treenode.value
								// ? A copying procedure of sorts? [namely - how safe/general is it to do this kind of direct referencing?]
								ac.treenode.value = b.treenode.value
								ac.pushback(t)
								return ac
							}
							return X(ac, b, a, true)
						}
						return X(this, this.this.this, heaps[0])
					}
					return this.this
				}),
				top: _FUNCTION(function () {
					return this.this.this.treenode.value
				}),
				add: refactor.classes.add,
				topless: _FUNCTION(function () {
					const topelem = this.top()
					this.merge(this.this.this.treenode.children)
					return topelem
				})
			},
			recursive: true
		})
	},
	NAryHeap(parentclass = general.DEFAULT_TREENODECLASS) {
		return EXTENSION({
			defaults: refactor.defaults.heap(parentclass),
			methods: {
				top: _FUNCTION(function () {
					return this.this.this.treenode.value
				}),
				add: _FUNCTION(function (elem) {
					// ! Generalize this, pray... [the 'index'-repetition... + the 'heap-property' restoration];
					// * note: this ought to be fixed on the level of the constructor (implemented in such a way so as to be compatible with the methods in-usage)
					let ind =
						this.this.this.this.class.template.parentclass.template.parentclass.static.fromArray(
							[this.init()]
						)
					ind.repeat(this.this.this.this.treenode.depth())
					this.this.this.treenode.insert(ind, elem)

					let t
					while (
						this.this.this.this.class.template.predicate(
							elem,
							this.this.read(
								(t = ind.copied("slice", [
									ind.init(),
									ind.finish().previous()
								])),
								true,
								false
							)
						)
					) {
						this.swap(ind, t)
						ind = t
					}

					return this.this
				}),
				topless: _FUNCTION(function () {
					const top = this.top()
					this.this.this = this.this.this.this.class(
						this.read(this.init()),
						this.this.this.treenode.children.slice(this.one())
					).this
					return top
				})
			},
			recursive: true
		})
	},
	BinomialHeap: function (parentclass = general.DEFAULT_GENARRCLASS) {
		let bintreeform = treeForm(parentclass)
		return EXTENSION({
			defaults: {
				treenodeclass: general.DEFAULT_TREENODECLASS,
				parentclass: parentclass,
				names: ["trees"],
				defaults: {
					inter: function (args, _i) {
						const heapensured = args[0].copy()
						for (const tree of heapensured)
							ensureHeap(tree, this.template.predicate)
						return heapensured
					}
				}
			},
			methods: {
				add: refactor.classes.add,
				ordersort: _FUNCTION(function () {
					// ! later, check if this sorts it from smallest-to-largest, or the reverse...
					this.sort((x, y) => greateroe(...[x, y].map((x) => x.order())))
					return this.this
				}),
				order: _FUNCTION(function (i) {
					if (!arguments.length) {
						const n = this.this.this.this.class(
							this.this.this.this.class.template.parentclass.static.fromArray(
								[this]
							)
						)
						return n.order(n.init())
					}
					return this.this.this.trees.read(i).order()
				}),
				merge: _FUNCTION(function (
					heaps = this.template.parentclass.static.empty()
				) {
					if (heaps.length().get().equal(heaps.class.static.one())) {
						function treemerge(affected, a, b, checked = false) {
							if (
								checked ||
								this.this.this.this.class.template.predicate(
									a.node,
									b.node
								)
							) {
								affected.children.pushback(b)
								return affected
							}
							return treemerge(affected, b, a, true)
						}
						const heap = heaps.read()
						const hbmerged = heap.trees.copy(F)
						const horders = heap.trees.copy((x) => x.order())
						const torders = this.this.this.trees.copy((x) => x.orders())
						for (const i of this.keys())
							for (const j of heap.keys())
								if (
									!hbmerged.read(j) &&
									horders.read(j).equal(torders.read(i))
								) {
									this.write(
										i,
										treemerge(
											this.this.this.this.class.template.treenodeclass.class(),
											this.read(i),
											heap.read(j)
										)
									)
									torders.write(i, torders.read(i).next())
									hbmerged.write(j, true)
								}
						return this.this
					}
					for (const x of heaps)
						this.merge(this.template.parentclass.static.fromArray([x]))
					return this.this
				}),
				copy: _FUNCTION(function (f = ID) {
					return this.this.this.this.class.class(this.this.this.trees.copy(f))
				}),
				copied: refactor.classes.copied,
				top: _FUNCTION(function () {
					return orders
						.most({
							predicate: this.this.this.this.class.template.predicate
						})
						.function(this.this.this.this.trees.copy((x) => x.node))
				}),
				topless: _FUNCTION(function () {
					const top = this.top()
					const firsttop = this.suchthat((x) =>
						this.this.this.this.class.template.parentclass.template.comparison(
							x.node,
							top
						)
					).read()
					const ind = this.firstIndex(firsttop)
					this.write(ind, this.this.this.this.class.class(firsttop.children))
					return top
				})
				// ? 1. decrease;
				// ? 2. delete;
			},
			recurisve: true,
			transform: function (_class) {
				bintreeform = bintreeform(_class.template)
			}
		})
	}
}

general.DEFAULT_HEAPCLASS = heaps.PairingHeap()

export const PriorityQueue = (heapclass = general.DEFAULT_HEAPCLASS) => {
	return EXTENSION({
		defaults: defaults.basicheap(heapclass),
		methods: {
			// ? Create a shorter EXTENSION-based expression for the self-referencing method-aliases;
			pull: _FUNCTION(function () {
				return this.this.this.heap.topless()
			})
		},
		recursive: true
	})
}

general.DEFAULT_PRIORITYQUEUE = PriorityQueue()

export const sort = {
	heap: TEMPLATE({
		defaults: {
			heapclass: general.DEFAULT_HEAPCLASS,
			genarrclass: general.DEFAULT_GENARRCLASS
		},
		function: function (garr = this.template.genarrclass.static.empty()) {
			const pqueue = PriorityQueue(this.template.heapclass).class(garr)
			const final = this.template.genarrclass.static.empty()
			for (const _x of pqueue) final.pushback(pqueue.pull())
			return final
		}
	}).function,
	radix: TEMPLATE({
		defaults: [
			function () {
				return {
					ustrclass: general.DEFAULT_USTRCLASS,
					genarrclass: general.DEFAULT_GENARRCLASS,
					tintclass: general.DEFAULT_TINTCLASS
				}
			},
			function () {
				return { alphabet: this.template.genarrclass.static.empty() }
			}
		],
		function: alinative.function.const(function (
			garr = this.template.genarrclass.static.empty()
		) {
			const polyconverted = garr
				.copy(this.template.tintclass.static.fromCounter)
				.map(numeric.toPolystring(this.template).function)
			const maxsize = numeric.sameLength(this.template).function(polyconverted)
			const toorder = (ordered, i) =>
				this.template.alphabet
					.copy((l) => ordered.suchthat((y) => y.read(i) === l))
					.suchthat((x) => !x.isEmpty())
					.join()
			let ordered = polyconverted.copy()
			for (const x of maxsize) ordered = toorder(ordered, x)
			return ordered
		}),
		isthis: true
	}).function,
	bucket: TEMPLATE({
		defaults: [
			function () {
				return {
					genarrclass: general.DEFAULT_GENARRCLASS,
					tintclass: general.DEFAULT_TINTCLASS,
					sortingf: sort.merge(this.template).function
				}
			},
			function () {
				return {
					buckets: this.template.tintclass.static.two()
				}
			}
		],
		function: alinative.function.const(function (
			garr = this.this.this.genarrclass.static.empty(),
			bucketsnum = this.template.buckets
		) {
			const k = general.maxkey.bind(this)(garr)
			const buckets = this.this.this.genarrclass
				.fromCounter(bucketsnum)
				.map(garr.empty())

			for (const x of garr)
				buckets.write(
					this.template.tinclass.static
						.fromCounter(bucketsnum)
						.multiply(this.template.predicate(x).divide(k), x)
				)

			for (const b of buckets.keys())
				buckets.write(b, this.template.sortingf(buckets.read(b)))

			return array.concat(this.template).function(buckets)
		}),
		isthis: true
	}).function,
	counting: TEMPLATE({
		defaults: {
			genarrclass: general.DEFAULT_GENARRCLASS,
			predicate: lesser
		},
		function: function (garr = this.template.genarrclass.static.empty()) {
			// * note: it's FAR more efficient for the user to provide the '.maxkey' on their own instead of having to calculate it...;
			const k = general.maxkey.bind(this)(garr)
			const count = this.template.genarrclass.static
				.fromCounter(k.next())
				.map(alinative.function.const(k.class.init()))
			const output = garr.copy(alinative.function.const(udef))

			for (const x of garr) {
				const j = this.template.predicate(x)
				count.write(j, count.read(j).next())
			}

			for (let i = k.one(); !i.compare(k.next()); i = i.next())
				count.write(i, count.read(i).jumpDirection(count.read(i.previous())))

			for (let i = garr.finish(); i.compare(garr.init()); i = i.previous()) {
				const j = this.template.predicate(garr.read(i))
				output.write(count.read(j).previous(), garr.read(i))
			}

			return output
		}
	}).function,
	quick: TEMPLATE({
		defaults: {
			genarrclass: general.DEFAULT_GENARRCLASS
		},
		function: function (garr = this.template.genarrclass.static.empty()) {
			if (
				this.template.genarrclass.static.two().next().compare(garr.length().get())
			) {
				if (this.template.icclass.static.one().compare(garr.length().get()))
					return garr
				const X = () => {
					if (
						this.template.predicate(
							garr.read(this.template.icclass.static.one()),
							garr.read()
						)
					)
						garr.swap(
							this.template.icclass.static.zero(),
							this.template.icclass.one()
						)
				}
				X()
				if (this.template.icclass.static.two().compare(garr.length().get()))
					return garr
				if (
					this.template.predicate(
						garr.read(this.template.icclass.static.one()),
						garr.read(this.template.icclass.static.two())
					)
				)
					garr.swap(
						this.template.icclass.static.one(),
						this.template.icclass.static.two()
					)
				X()
				return garr
			}

			// ! future improvements - make the 'MIDDLE_ELEMENT' equal something more efficient...;
			const MIDDLE_ELEMENT = garr.read(garr.finish())
			return this.function(
				garr.copied("suchthat", [
					(x) => this.template.predicate(MIDDLE_ELEMENT, x)
				])
			)
				.pushback(MIDDLE_ELEMENT)
				.concat(
					this.function(
						garr.copied("suchthat", [
							(x) => this.template.predicate(x, MIDDLE_ELEMENT)
						])
					)
				)
		}
	}).function,
	insertion: TEMPLATE({
		defaults: {
			genarrclass: general.DEFAULT_GENARRCLASS
		},
		function: function (garr = this.template.genarrclass.static.empty()) {
			garr = garr.copy()
			for (let i = garr.one(); !i.compare(garr.length().get()); i = i.next()) {
				for (let j = garr.init(); !j.compare(i); j = j.next()) {
					if (this.template.predicate(garr.read(i), garr.read(j))) continue
					garr.insert(j, garr.read(i))
					break
				}
			}
			return garr
		}
	}).function,
	bubble: TEMPLATE({
		defaults: {
			genarrclass: general.DEFAULT_GENARRCLASS
		},
		function: function (garr = this.template.genarrclass.static.empty()) {
			garr = garr.copy()
			// ! use the 'lesser/greater' aliases A LOT...; The code uses them all over the place;
			// ! create corresponding finite versions of them (for >, >=, <, <=);
			for (let i = garr.init(); !i.compare(garr.length().get()); i = i.next())
				for (
					let j = garr.init();
					!j.compare(garr.length().get().jumpBackward(i));
					j = j.next()
				)
					if (!this.template.predicate(garr.read(i), garr.read(j)))
						garr.swap(i, j)
			return garr
		}
	}).function,
	selection: TEMPLATE({
		defaults: {
			genarrclass: general.DEFAULT_GENARRCLASS
		},
		function: function (garr = this.template.genarrclass.static.empty()) {
			const listArr = garr.copy()
			const sorted = garr.empty()
			const f = orders.most({ comparison: this.template.predicate })
			for (const _t of garr) {
				const extreme = f(listArr)
				sorted.pushback(extreme)
				listArr.delval(extreme)
			}
			return sorted
		}
	}).function,
	merge: TEMPLATE({
		defaults: {
			genarrclass: general.DEFAULT_GENARRCLASS
		},
		function: function (array = this.template.genarrclass.static.empty()) {
			const CONSTOBJ = {}
			function split(a) {
				return a.copied("splitlen", [a.one()]).map((x) => [CONSTOBJ, x])
			}
			function merge(a) {
				if (a.init().compare(a.length().get())) return a.read()[1]
				const b = a.empty()
				a.loop()._full(
					(t) => {
						if (t.object().currindex.next().compare(t.length().get())) return
						const fn = t.object().read(t.object().currindex.next())[1]
						const ca = t.object().currelem[1]
						const newarr = t.object().empty()
						let fc = t.object().init(),
							sc = t.object().init()
						for (
							;
							!fc
								.jump(sc)
								.compare(
									t
										.object()
										.currelem.length()
										.get()
										.jump(fn.length().get())
								);

						) {
							let m = CONSTOBJ
							const firarrel = ca.read(fc)
							const secarrel = fn.read(sc)

							if (this.template.predicate(firarrel, secarrel)) {
								m = firarrel
								fc = fc.next()
							}
							if (m === CONSTOBJ) {
								m = secarrel
								sc = sc.next()
							}

							newarr.pushback(m)
						}
						b.pushback([CONSTOBJ, newarr])
					},
					alinative.function.const((x) => x.next().next())
				)
				return merge(b)
			}
			return merge(split(array))
		}
	}).function
}

// ? Add search algorithms: metabinary? (maybe sometime later, after BinaryArray has been implemented...), fibonacci? (if doing that, add the number sequences to the library...);
export const search = {
	sentinel: TEMPLATE({
		defaults: { defelem: undefined, unfound: undefined },
		function: function (
			sought = this.template.defelem,
			garr = this.template.genarrclass.static.empty()
		) {
			const c = garr.copied("pushback", [sought])
			for (
				let i = garr.init();
				!this.template.comparison(c.read(i), sought);
				i = i.next()
			) {}
			return this.template.comparison(garr.length().get(), i)
				? this.template.unfound
				: i
		}
	}).function,
	exponential: TEMPLATE({
		// ! set the 'defaults' to have the 'factor' as '.fromNumber(2)' by default;
		defaults: {
			defelem: undefined
		},
		function: function (
			sought = this.template.defelem,
			garr = this.template.genarrclass.static.empty()
		) {
			let i = this.template.tintclass.class()
			let p
			for (
				;
				!i.value.compare(garr.length().get());
				p = i, i = i.multiply(this.template.factor)
			)
				if (this.predicate(garr.read(i), sought)) break
			return search
				.binary(this.template)
				.function(sought, garr.copied("slice", [p.value, i.value]))
		}
	}).function,
	interpolation: TEMPLATE({
		defaults: {
			defelem: undefined,
			comparison: valueCompare,
			unfound: undefined
		},
		function: function (
			sought = this.template.defelem,
			garr = this.template.genarrclass.static.empty(),
			original = true
		) {
			if (this.template.icclass.static.zero().compare(garr.length().get()))
				return this.template.unfound

			// ! Issue - with using the 'value' for the TrueInteger; Pray consider more carefully its design in regard to cases like these...;
			const initint = this.template.tintlclass.static.fromCounter(garr.init())
			const finishint = this.template.tintclass.static.fromCounter(garr.finish())

			const interpolated = initint.add(
				finishint
					.difference(initint)
					.divide(
						this.template
							.predicate(garr.read(finishint))
							.difference(this.template.predicate(garr.read()))
					)
					.multiply(this.template.predicate(sought).difference(garr.read()))
			)
			const inelem = garr.index(interpolated)
			if (this.template.comparison(inelem, sought)) return interpolated
			return (original ? (x) => x.value : ID)(
				interpolated.add(
					this.function(
						sought,
						garr.copied(
							"slice",
							this.template.predicate(inelem, sought)
								? [garr.init(), interpolated.previous()]
								: [interpolated.next()]
						),
						false
					)
				)
			)
		}
	}).function,
	jump: typeConst((FORBIDDEN_) => {
		const FORBIDDEN = FORBIDDEN_[0]
		return TEMPLATE({
			defaults: { defelem: undefined },
			function: function (
				sought = this.template.defelem,
				garr = this.template.genarrclass.static.empty()
			) {
				const sqrtlen = this.template.tintclass.class(garr.length().get()).root()
				let tempres = FORBIDDEN
				for (
					let i = this.tintclass.class();
					!i.compare(garr.length().get());
					i = i.add(sqrtlen)
				) {
					const curr = garr.read(i)
					if (
						((...x) =>
							alinative.function.dor(
								[this.template.predicate, this.template.comparison].map(
									alinative.function.rexparr(x)
								)
							))(curr, sought)
					) {
						tempres = i
						break
					}
				}
				if (tempres === FORBIDDEN) return this.template.unfound
				return search.linear(this.template)(
					garr.copied(
						"slice",
						[i.difference(sqrtlen), i].map((x) => x.value)
					)
				)
			}
		}).function
	}, 1),
	linear: TEMPLATE({
		defaults: { defelem: undefined, unfound: undefined },
		function: function (
			sought = this.template.defelem,
			garr = this.template.genarrclass.static.empty()
		) {
			for (const a of garr.keys())
				if (this.template.comparison(garr.read(a), sought)) return a
			return this.template.unfound
		}
	}).function,
	// ? Generalize? (can be generalized to an 'n-ary' search); Consider...
	binary: TEMPLATE({
		defaults: {
			defelem: undefined,
			comparison: valueCompare,
			unfound: undefined
		},
		function: function (
			sought = this.template.defelem,
			garr = this.template.genarrclass.static.empty(),
			original = true
		) {
			if (this.template.icclass.static.zero().compare(garr.length().get()))
				return this.template.unfound
			const lenint = this.template.tintclass.class(garr.length().get().value)
			const middleind = lenint
				.divide(this.template.icclass.static.two())
				.add(
					btic(
						lenint
							.modulo(this.template.icclass.static.two())
							.equal(this.template.icclass.static.one())
					)
				)
			const midelem = garr.index(middleind)
			if (this.template.comparison(midelem, sought)) return middleind
			return (original ? (x) => x.value : ID)(
				middleind.add(
					this.function(
						sought,
						garr.copied(
							"slice",
							this.template.predicate(midelem, sought)
								? [garr.init(), middleind.previous()]
								: [middleind.next()]
						),
						false
					)
				)
			)
		}
	}).function
}

// ? Want to 'de-objectivise' these, pray? [user may want to get the methods as-are...];
export const integer = {
	native: {
		primesBefore: function (x = 1) {
			return alarray.generate(x).filter(this.isPrime)
		}
	},

	factorOut: TEMPLATE({
		defaults: {
			tintclass: general.DEFAULT_TINTCLASS,
			genarrclass: general.DEFAULT_GENARRCLASS
		},
		function: function (tint = this.template.tintclass.class()) {
			const tintc = tint.copy()
			const factors = this.template.genarrclass.class()
			for (
				let currDivisor = this.template.tintclass.static.two();
				!this.template.icclass.static.one().compare(tintc);
				currDivisor = currDivisor.add(
					this.template.icclass.static
						.two()
						.difference(
							currDivisor.equal(this.template.icclass.static.two())
								? this.template.icclass.static.one()
								: this.template.icclass.static.zero()
						)
				)
			) {
				while (number % currDivisor === 0) {
					factors.pushback(currDivisor)
					tintc = tintc.divide(currDivisor)
				}
			}
			return factors
		}
	}).function,

	isPrime: TEMPLATE({
		defaults: {
			icclass: general.DEFAULT_ICCLASS
		},
		function: function (x) {
			return this.template.icclass.static
				.two()
				.compare(integer.factorOut(this.template)(x).length().get())
		}
	}).function,

	primesBefore: TEMPLATE({
		defaults: { icclass: general.DEFAULT_ICCLASS },
		function: function (x = this.template.icclass.class()) {
			return array.generate(this.template)(x).suchthat(integer.isPrime)
		}
	}).function,

	multiples: TEMPLATE({
		default: { includezero: false },
		function: function (
			n = this.template.tintclass.static.one(),
			range = this.template.tintclass.static.one()
		) {
			return array
				.generate()
				.function(
					(this.template.includezero ? ID : next)(n.class.class()).value,
					range.value,
					this.template.step
				)
				.map((a) => this.template.tintclass(a.value).multiply(n))
		}
	}).function,

	multiplesBefore: TEMPLATE({
		defaults: {
			tintclass: general.DEFAULT_TINTCLASS
		},
		function: function (
			n = this.template.tintclass.static.one(),
			x = this.template.tintclass.static.one()
		) {
			return number.multiples(n, x.divide(n))
		}
	}).function,

	commonDivisors: TEMPLATE({
		defaults: {},
		function: function (...tints) {
			return array
				.common({ f: integer.factorOut, ...this.template })
				.function(tints)
		}
	}).function,

	commonMultiples: TEMPLATE({
		defaults: {},
		function: function (...nums) {
			return array
				.common({
					f: (x) => integer.native.multiples(x, this.template.range)
				})
				.function(nums)
		}
	}).function,

	lcm: TEMPLATE({
		defaults: {},
		function: function (...nums) {
			return orders.min(this.template).function(integer.commonMultiples(...nums))
		}
	}).function,

	lcd: TEMPLATE({
		defaults: {},
		function: function (...nums) {
			return orders
				.min(this.template)
				.function(integer.commonDivisors(this.template)(...nums))
		}
	}).function,

	areCoprime: TEMPLATE({
		defaults: {
			genarrclass: general.DEFAULT_GENARRCLASS
		},
		function: function (...tints) {
			return this.template.genarrclass.static
				.empty()
				.length()
				.get()
				.compare(
					integer.commonDivisors(this.template).function(tints).length().get()
				)
		}
	}).function,

	allFactors: TEMPLATE({
		defaults: {
			icclass: general.DEFAULT_ICCLASS,
			tintclass: general.DEFAULT_TINTCLASS
		},
		function: function (number = this.template.tintclass.class()) {
			// ? Question [general]: shall one be 'saving' the time like this, or not? (this way, a little less time is required for the performance due to reduced garbage collection, but the memory occupied gets to be used constantly throughout the function, WITHOUT any de- and re-allocations)
			const z = this.template.icclass.static.zero()

			const factors = [othis.template.icclass.static.one()]
			const l = number.divide(this.template.icclass.static.two()())
			for (
				let currFactor = this.template.icclass.static.two()();
				l.compare(currFactor);
				currFactor.add()
			)
				if (number.modulo(currFactor).equal(z)) factors.push(currFactor)
			return factors
		}
	}).function,

	isPerfect: TEMPLATE({
		defaults: {
			tintclass: general.DEFAULT_TINTCLASS
		},
		function: function (number = this.template.tintclass.class()) {
			return expressions
				.uevaluate()
				.function(
					expressions.Expression(
						"+",
						[],
						integer.allFactors(this.template)(number)
					)
				)
				.equal(number)
		}
	}).function,

	factorial: TEMPLATE({
		defaults: { tintclass: general.DEFAULT_TINTCLASS },
		function: function (tint = this.template.tintclass.class()) {
			const numbers = this.template.genarrclass.static.fromArray([
				this.template.tintclass.static.one()
			])

			for (
				let i = this.template.tintclass.static.one();
				tint.compare(i);
				i = i.add()
			)
				numbers.pushback(i)

			return expressions
				.uevaluate()
				.function(expressions.Expression("*", [], numbers))
		}
	}).function,

	binomial: TEMPLATE({
		defaults: {
			tintclass: general.DEFAULT_TINTCLASS
		},
		function: function (n, k) {
			return (
				expressions.uevaluate()(
					expressions.Expression(
						"*",
						[],
						array
							.generate(this.template.tintclass.static.zero(), k.previous())
							.map(n.difference)
					)
				) / this.factorial(k)
			)
		}
	}).function,

	sumRepresentations: TEMPLATE({
		defaults: {
			icclass: general.DEFAULT_ICCLASS,
			genarrclass: general.DEFAULT_GENARRCLASS,
			tintclass: general.DEFAULT_TINTCLASS
		},
		function: function (
			endval = this.template.tintclass.static.one(),
			nterms = this.template.icclass.static.one(),
			minval = this.template.tintclass.static.one()
		) {
			if (this.template.icclass.static.zero().compare(nterms))
				return this.template.genarrclass.static.empty()
			if (nterms.equal(this.template.icclass.static.one()))
				return this.template.genarrclass.static.fromArray([
					this.template.genarrclass.static.fromArray([endval])
				])
			const res = this.template.genarrclass.static.empty()
			for (let i = minval; i < endval.difference(minval); i = i.add())
				for (const r of this.function(
					endval.difference(i),
					nterms.previous(),
					minval
				))
					res.push(this.template.genarrclass.static.fromArray([i]).concat(r))
			return res
		}
	}).function
}

integer.native.commonDivisors = function (...nums) {
	return alarray.common({ f: integer.native.factorOut }).function(nums)
}

integer.native.commonMultiples = TEMPLATE({
	defaults: { range: 100 },
	function: function (...nums) {
		return array
			.common({ f: (x) => integer.native.multiples(x, this.template.range) })
			.function(nums)
	}
}).function

// ! fix the missing in- and out-'sequences' for the determination of the types conversion at the beginning and ending...;
integer.native = {
	...integer.native,
	...general.finiteobj(
		integer,
		[
			"factorOut",
			"isPrime",
			"multiples",
			"multiplesBefore",
			"lcm",
			"lcd",
			"areCoprime",
			"allFactors",
			"isPerfect",
			"factorial",
			"binomial",
			"sumRepresentations"
		],
		{ integer: true },
		[],
		[],
		[alarray.native.generate(obj.keys(integer).length).map(TRUTH)]
	)
}
integer.native.primesBefore = finite().function(integer.primesBefore)

export const alnumber = {
	farey: TEMPLATE({
		defaults: {
			tratioclass: general.DEFAULT_TRATIOCLASS,
			genarrclass: general.DEFAULT_GENARRCLASS,
			icclass: general.DEFAULT_ICCLASS
		},
		function: function (
			startRatio = this.template.tratioclass.class(),
			endRatio = this.template.tratioclass.class(),
			iterations = this.template.icclass.class()
		) {
			const gotten = this.template.genarrclass.fromArray([
				this.template.genarrclass.static.fromArray([startRatio, endRatio])
			])
			for (let i = this.template.icclass.class(); i < iterations; i = i.next()) {
				gotten.pushback(this.template.genarrclass.static.empty())
				for (
					let j = this.template.icclass.class();
					!j.compare(gotten.read(i).length().get());
					j = j.next()
				) {
					gotten.read(i.next()).pushback(gotten.read(i).read(j))
					if (!j.compare(gotten.read(i).length().get().previous()))
						gotten
							.read(i.next())
							.push(
								gotten
									.read(i)
									.read(j)
									.naivesum(gotten.read(i).read(j.next()))
							)
				}
			}
			return gotten
		}
	}).function
}

export const READONLY = (x) =>
	Object.freeze({
		get: x
	})

// ? Has no in-library use. Still keep?
// % See how it fares in v1.1, after introduction of Interfaces, then - if it has come to become redundant, delete, otherwise - uncomment and, if needed, repair/refactor;
/* export function INHERIT(x, X) {
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
} */

export function DEOBJECT(obj = {}) {
	return [Object.keys, Object.values].map((x) => x(obj))
}

export function OBJECT(keys = [], values = []) {
	const length = nanumber.min(
		Array.from(arguments).map(alinative.function.index("length"))
	)
	const returned = {}
	for (let i = 0; i < length; ++i) returned[keys[i]] = values[i]
	return returned
}

export function NOMODULE(moduleobj) {
	return OBJECT(Object.keys(moduleobj), Object.values(moduleobj))
}

// ! Note [on reassembling the code by pieces so as for it to work...]: Uses such as this must be moved to the end...
alarray.native = {
	...alarray.native,
	...general.finiteobj(
		alarray,
		[
			"intersection",
			"permutations",
			"indexesOf",
			"norepetitions",
			"isSub",
			"join",
			"common",
			"concat",
			"split"
		],
		{ integer: true }
	)
}

// * Constructs a counter from an InfiniteCounter class;
export const cfromIcc = refactor.general.counterFrom([
	"jumpForward",
	"jumpBackward"
]).function

// * Constructs a counter from a TrueInteger class (additive);
export const tintAdditive = refactor.general.counterFrom(
	["add", "difference"],
	tnumbers.TrueInteger().static.fromCounter
).function

// ? Add tint-based counters for other operations as well? [same goes for the native JS Number...];
export const tintMultiplicative = (() => {
	const X = refactor.general.counterFrom(
		["multiply", "divide"],
		tnumbers.TrueInteger().static.fromCounter
	)
	// * setting a different default for the 'forth' and 'back';
	X.template.defaults[1] = _FUNCTION(function () {
		return {
			forth: this.template.wrapper(this.template.icclass.static.two()),
			back: this.template.wrapper(this.template.icclass.static.two())
		}
	})
	return X.function
})()
