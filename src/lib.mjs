// * The library's source code file (due to ESM's almost total ineffectiveness in handling anyhow complex recursive imports, the library's inner representation format was changed)

// ? Create a 'types.native' for types that extend the native JS types functionality directly? (the BindableFunction is a wonderful candidate for it...);

// ^ idea: how about seeking to minimize the number of class methods? For instance, getting rid of things like 'next()', instead replacing them with definition of 'jump()' with default being such, so as to mimic 'next'? (Consider, whether this general design pattern ought to become part of the library's style in v1.1. or later...)

export const greateroe = (a, b) => a.compare(b)
export const lesseroe = (a, b) => greateroe(b, a)
export const lesser = (a, b) => !greateroe(a, b)
export const greater = (a, b) => lesser(b, a)

export const boundMethod = (mn, object) => object[mn].bind(object)

export const equal = (x, y) => x.equal(y)
export const divides = (x, d) => refCompare(x % d, 0)

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

export const oldCompare = (a, b) => a == b
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

// ? Relocate to 'native?' (preferably, there ought to be very few exports of 'aliases' outside of it; particularly, non-general specific-type-associated ones...);
export const abs = Math.abs
export const poststr = (s) => (x) => `${x}${s}`
export const prestr = (s) => (x) => `${s}${x}`

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

export const object = {
	obj: OBJECT,

	objMap: function (obj_, keys = {}, id = true) {
		const newobj = {}
		for (const key in keys) newobj[keys[key]] = obj_[key]
		if (id) {
			const newkeys = new Set(obj.values(keys))
			for (const key in obj_) if (!newkeys.has(key)) newobj[key] = obj_[key]
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

	// * Note: no, they're not the same! The 'Object.assign' uses all the enumerable own properties, while this
	objInherit: function (obj, parObj = {}) {
		for (const ap in parObj) obj[ap] = parObj[ap]
	},

	// TODO: generalize such constructions of 'applying' a given set of methods based off the passed booleans (create special signature-infused methods class for the library...);
	boundObj(o, c = false) {
		if (c) o = copy.deepCopy(o)
		for (const x in o) if (is.fun(o[x])) o[x] = o[x].bind(o)
		return o
	}
}

// ^ IDEA: do this sort of thing all-around the library...
export const istype = function (x, typename) {
	return refCompare(typeof x, typename)
}
export const is = function (instance, instanced) {
	return instance instanceof instanced
}
object.objInherit(is, {
	bool: (x) => refCompare(x, true) || refCompare(x, false) || is(x, bool),
	str: (x) => istype(x, "string") || is(x, str),
	num: (x) => istype(x, "number") || is(x, num),
	obj: (x) => istype(x, "object") && is(x, obj),
	sym: (x) => istype(x, "symbol"),
	udef: (x) => refCompare(x, undefined),
	null: (x) => refCompare(x, null),
	nil: (x) => refCompare(x, null),
	set: (x) => is(x, set),
	arr: (x) => is(x, arr),
	fn: (x) => is(x, fun),
	fun: (x) => istype(x, "function"),
	bi: (x) => istype(x, "bigint") || is(x, bi),
	nan: isNaN,
	class: (v, cl) => cl.is(v)
})

// ? NOTE: a minor limitation - the function passed MUST NOT BE ALREADY BOUND!!! [see if there's a desireable way to check besides '.hasOwn("prototype")'...];
// ^ IDEA [note]: THIS ALLOWS FOR CLASS-INSTANCE-INHERITANCE! IMPLEMENT IT... ('toClass' method for turning a class instance into a class + 'sameClass/fromInstance' method for creating an instance of the same class as that of the passed one..);
export const BindableFunction = TEMPLATE({
	// ? Decide for a better placeholder function?
	defaults: { origin: ID, defaultThis: null },
	function: function (f = null, thisObj = this.template.defaultThis, ...defargs) {
		// ! ISSUE: with the purely template-based approach for functions - it doesn't work, functions (generally) don't have means of accessing themselves...;
		// TODO: this keeps popping up when 'console.log'ing the FUNCTIONs. Rename into something more... presentable? Or simply, change the way that BindableFunction-s are outputted... [more fiddling with native Symbol[...] constants on objects...];
		const newfun = function (...args) {
			return (
				is.fun(ownerobj.f.origin) ? ownerobj.f.origin : ownerobj.f.class.origin
			).call(ownerobj.f.this, ...defargs, ...args)
		}

		// * note: private variable 'ownerobj' is needed because without it, the function has no means of accessing its own data from within its own calls...
		const ownerobj = { f: newfun }

		// * this is so as to allow for 'single-separation' from a class...
		newfun.class = this
		// ^ IDEA [for general reimplementation of the default-defaults- system throughout the library]: instead of just linking the passed args to 'this.this...(.class, or whatever).template.varname', one checks for whether it is non-null EVERYWHERE WHERE IT'S USED (namely, dynamic replacement instead of static);
		// % That kind of generalization would allow to EXPLICITLY create classes-based variables and AS EXPLICITLY, to separate them...
		// ? But does one want that behaviour everywhere?
		// * Answer: no, probably not. Hence, CONCLUSION - add this behaviour everywhere, where desired to the library, but in other places - keep things as they are (namely, separate the semantics of terms 'defaults-defaults' and 'templates').
		newfun.origin = f
		newfun.this = thisObj

		// ! NOTE: there is an issue related to using '= function' - the resulting function CANNOT be passed around without binding it first with 'this'; Problem becomes - if it's bound, then there's no need to post-bind it after, but no way to specify a new context...;
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
	for (const x of a)
		for (const y of b) if (refCompare(x, y) && !f.includes(x)) f[f.length] = x
	return f
}

// ? Again - export or not?
export const NAMED_TEMPLATE = (f, index, dinstance, classvar, rest = {}) =>
	TEMPLATE({
		defaults: { index: index, instance: dinstance, class: classvar },
		function: f,
		...rest
	}).function()

export const alinative = {
	number: {
		numconvert: (x) => (isNaN(x) ? 0 : Number(x)),
		negind: (x, arr) => (x < 0 ? arr.length + x : x)
	},

	string: {
		stoa(x = "") {
			return x.split("")
		},
		atos(x = []) {
			return x.join("")
		},
		fcc: String.fromCharCode,
		cca: (x, i = 0) => x.charCodeAt(i)
	},

	array: {
		// * What about 'firstSuch' and 'lastSuch' instead??? Then, '_first' and '_last' would be just 'first' and 'last' correspondently...
		last: (arr, obj, comparison = _valueCompare) => {
			return max(
				alarray.native
					.indexesOf({ comparison: comparison })
					.function(arr, obj, comparison)
			)
		},
		first: (arr, obj, comparison = _valueCompare) => {
			return min(
				alarray.native.indexesOf({ comparison: comparison }).function(arr, obj)
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
		_remove: (arr, index) => alinative.array.remove(arr, index, index),
		minlen: (...arrs) => flen(min, ...arrs),
		maxlen: (...arrs) => flen(max, ...arrs),
		flen: (f, ...arrs) => {
			return f(arrs.map((a) => a.length))
		},
		flenarrs: (f, ...arrs) => {
			const _f = f(...arrs)
			return arrs.filter((a) => refCompare(a.length, _f))
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
		// ? Add the possibility of using with Genarrclasses?
		wrapper: TEMPLATE({
			defaults: {
				inarr: false,
				in: id,
				out: id,
				deff: id
			},
			function: _FUNCTION(function (f = this.template.deff) {
				const inofi = is.arr(this.template.in)
					? (i) => this.template.in[i] || ID
					: alinative.function.const(this.template.in)
				return this.template.inarr
					? (...vals) => this.template.out(f(vals.map((x, i) => inofi(i)(x))))
					: (...vals) =>
							this.template.out(f(...vals.map((x, i) => inofi(i)(x))))
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
			if (!obj.hasOwn(object, property)) object[property] = value
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
		// ! Starting to doubt the usefulness of these two... (only, maybe, if passing the second argument as a function, id est: (x, y) => x && y())?
		dand: (a, b) => a && b,
		dor: (a, b) => a || b
	}
}

// ^ IDEA [for a future project]: JSpace - a package for alias and function namespaces from various programming languages implementations (they'd work in an exactly the same fashion, but work in JavaScript);
export const TRUTH = alinative.function.const(true)
export const T = TRUTH
export const FALLACY = alinative.function.const(false)
export const F = FALLACY
export const VOID = alinative.function.void

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
export const hasFunction = (x, m) => obj.hasOwn(x, m) && istype(x[m], "function")
export const inarr = (x) => [x]

// ! THESE TWO MUST GET THEIR OWN PROPER MODEL STRUCTURE IMPLEMENTATIONS (not just rely upon GeneralArray mindlessly...);
export const Stack = (parentclass = general.DEFAULT_GENARRCLASS) => {
	return EXTENSION(parentclass, {
		toextend: { methods: [], symbols: true },
		methods: {
			// ! work on such 'renamed' methods, pray; The possibilities for extension, currently, are, extremely narrow-cased;
			push: _FUNCTION(function (element) {
				return this.this.this.genarr.pushback(element)
			}),
			pop: refactor.classes.pop,
			peek: refactor.classes.peek,
			copy: refactor.classes.copy
		},
		recursive: true,
		names: ["genarr"]
	})
}
export const Queue = (parentclass = general.DEFAULT_GENARRCLASS) => {
	return EXTENSION(parentclass, {
		toextend: { methods: [], symbols: true },
		methods: {
			enqueue: _FUNCTION(function (element) {
				return this.this.this.genarr.pushfront(element)
			}),
			dequeue: refactor.classes.pop,
			front: refactor.classes.peek,
			copy: refactor.classes.copy
		},
		recursive: true,
		names: ["genarr"]
	})
}

const refactor = {
	// ! essential: before publishing or doing anything else - make another round through the ENTIRE codebase, checking for each and every single thing, refactoring madly...;
	// ? Later - try to redistribute all this somewhere accordingly?
	classes: {
		sign: _FUNCTION(function () {
			return this.direction()
		}),
		empty: _FUNCTION(function (template = this.this.this.this.class.template) {
			return this.this.this.this.class.static.empty(template)
		}),
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
			const subset = this.this.this.this.class.class()
			for (const key of this.keys())
				if (predicate(this.read(key), key, this, subset))
					subset.pushback(this.read(key))
			this.this.this = subset.this
			return this.this
		}),
		any: _FUNCTION(function (predicate = TRUTH) {
			return lesser(
				this.init(),
				this.copied("suchthat", [predicate]).length().get()
			)
		}),
		every: _FUNCTION(function (predicate = TRUTH) {
			return this.copied("suchthat", [predicate])
				.length()
				.get()
				.equal(this.length().get())
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
				: this.this.this.this.class.template
		) {
			const empty = this.this.this.this.class.class()
			empty.genarr = this.this.this.genarr.copy(f, isclass, template)
			return empty
		}),
		peek: _FUNCTION(function () {
			return this.this.this.genarr.read(this.this.this.genarr.finish())
		}),
		pop: _FUNCTION(function () {
			return this.this.this.genarr.delete()
		}),
		// * Note: the 'args' does __not__ have to be a native JS array; (This uses the Symbol.iterator...);
		multcall: _FUNCTION(function (method, args = [], arrs = false) {
			for (let x of args) {
				if (!arrs) x = [x]
				this[method](...x)
			}
			return this.this
		}),
		add: _FUNCTION(function (elem) {
			return this.merge(
				this.this.this.this.class.parentclass.parentclass.static.fromArray([
					this.this.this.this.class.class(elem)
				])
			)
		}),
		zero: _FUNCTION(function () {
			return this.this.class()
		}),
		one: _FUNCTION(function () {
			return next(this.zero())
		}),
		two: _FUNCTION(function () {
			return next(this.one())
		}),
		twoadd: _FUNCTION(function () {
			return this.one().add()
		}),
		copied: (highlevel = true) =>
			_FUNCTION(function (
				method,
				_arguments = [],
				f = id,
				isclass = false,
				template = highlevel
					? undefined
					: isclass
					? this.this.this.this.class
					: this.this.this.this.class.template
			) {
				const c = this.copy(f, isclass, template)
				// ? Note: what should one do in cases, when a method is missing? (Currently, just runs silently; For future library versions - enable type-assertions;)
				if (hasFunction(c, method)) c[method](..._arguments)
				return c
			}),
		usetmeth: function (name) {
			return _FUNCTION(function (uset = this.this.this.this.class.static.empty()) {
				this.this.this = this.this.this.this.class.class(
					this.this.this.genarr.copied(name, [uset.genarr]).array
				).this
				return this.this
			})
		}
	},

	general: {
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
			return obj.hasOwn(this.template, "maxkey")
				? this.template.maxkey
				: most({ comparison: this.template.subpredicate }).function(
						garr.copy(this.template.predicate)
				  )
		}
	},

	defaults: {
		heap: () => ({
			check: true,
			defaults: {
				outer: _FUNCTION(function (trNode) {
					return ensureHeap(trNode, this.template.predicate)
				})
			},
			predicate: general.DEFAULT_PREDICATE
		}),
		// ! SEE IF (and when) ONE CAN REPLACE THESE KINDS OF THINGS WITH '.const' (ECMAScript standard does not permit implicit processing-on-request, only explicit, like so...)
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
	recursiveGeneral(opname, binaryver, nullval) {
		return _FUNCTION(function (args) {
			return greateroe(args.length().get(), args.two())
				? binaryver(
						args.read(),
						this.get[opname](args.copied("slice", [args.one()]))
				  )
				: !args.isEmpty()
				? args.read()
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
		const xf = is.arr(templates)
			? (x) => templates[x]
			: alinative.function.const(templates)
		for (const x in names)
			newobj[names[x]] = (
				aretemplates[x]
					? (f) =>
							TEMPLATE({
								defaults: ftemplates[x] || {
									genarrclass: garrays.CommonArray(),
									icclass: InfiniteCounter(addnumber()),
									tintclass: tnumbers.TrueInteger(
										InfiniteCounter(addnumber())
									)
								},
								function: f
							}).function
					: ID
			)(function (...args) {
				return finite(xf(x)).function(
					(aretemplates[x] ? (f) => f(this.template).function : ID)(
						target[names[x]]
					),
					outtransform[x],
					insequences[x]
				)(...args)
			})
		return newobj
	},

	DEFAULT_PREDICATE: lesser
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
			return refCompare(i, -1)
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
			..._class[this.template.templateword],
			...K(this.template.defaults, -1),
			...template
		}
		_class[this.template.word] = (this.template.isthis ? (x) => x() : ID)(
			this.template.function
		).bind(_class)
		this.template.tobind = new Set(this.template.tobind)
		for (const x in this.template.rest)
			_class[x] =
				is.obj(this.template.rest[x]) && !is.arr(this.template.rest[x])
					? (this.template.tobind.has(x) ? object.boundObj : ID)({
							...this.template.rest[x]
					  })
					: (this.template.tobind.has(x) ? (y) => y.bind(tobind()) : ID)(
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
		integer: false,
		inarr: false
	},
	function: _FUNCTION(function (
		f,
		out = this.template.defout,
		inseq = this.template.definseq
	) {
		const fu = this.template.integer
			? general.DEFAULT_TINTCLASS.static.fromCounter
			: ID
		// ? Does one want to save these somewhere additionally or simply keep here as-is? [may be useful for the user...];
		const tin = (out) =>
			refCompare(out, -1)
				? (x) =>
						general.DEFAULT_TINTCLASS.static.fromCounter(
							InfiniteCounter(addnumber()).class(x)
						)
				: refCompare(out, true)
				? (x) => fu(InfiniteCounter(addnumber()).class(x))
				: refCompare(out, false)
				? garrays.CommonArray().class
				: ID
		const tout = (out) =>
			refCompare(out, true)
				? (x) => x && x.map(InfiniteCounter(addnumber())).value
				: refCompare(out, false)
				? (x) => x && x.copied("switchclass", [garrays.CommonArray()]).array
				: ID

		return alinative.function
			.wrapper({
				out: tout(out),
				in: is.arr(inseq) ? inseq.map(tin) : tin(inseq),
				inarr: this.template.inarr
			})
			.function(f)
	})
}).function

export function NOREST(labels = [], btemplate = {}) {
	labels = new Set(labels)
	return function (template = {}) {
		const X = { ...btemplate }
		// ? refactor? [make a method for array disjunction...];
		for (const a in template) if (!labels.has(a)) X[a] = template[a]
		X.rest = {}
		// ! refactor!
		for (const l of labels) if (l in template) X.rest[l] = template[l]
		X.rest = { ...X.rest, ...template.rest }
		return TEMPLATE(X)
	}
}

export const GENERATOR = NOREST(["inverse", "range"], {
	word: "generator",
	isthis: true,
	tobind: ["inverse", "range"]
})

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
		"isname",
		"symbols",
		"parentclass",
		"names"
	],
	{ tobind: ["static"] }
)

// ! Generlization to another macro is required (for the sake of refactoring...);
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
		isgeneral: { methods: {}, symbols: {} },
		properties: {},
		symbols: {},
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
					[this.selfname]: {
						...V
					}
				}
				V[this.selfname][this.subselfname] = V
			}

			V[this.classref] = this

			const K = this.recursive ? V[this.selfname] : V

			// TODO: this thing does not (generally) expect a TEMPLATE-method (an object in type, not a result of a 'TEMPLATE(...).function'); Pray think of those, and how one'd love to have them implemented...
			for (const x in this.methods) {
				// ! THIS IS BAD. AGAIN, THE 'EXTENSION' variables' values must be made into a 'properties' case;
				if ("names" in this && this.names.includes(x)) continue
				// ! THIS IS A HACK [with this.methods[x] being an Array in cases such as, for example, EXTENSION...]. ACCEPTABLE ONLY TEMPORARILY! FIX IT...
				const isarr = is.arr(this.methods[x])
				if (isarr || obj.hasOwn(this.isgeneral.methods, x)) {
					const B = isarr
						? this.methods[x]
						: [this.isgeneral.methods[x], this.methods[x]]
					const A = B[1]
					A.template.instance = K
					A.template.class = this
					K[x] = B[0] ? A.function.bind(A) : A.function()
					continue
				}
				K[x] = this.methods[x].bind(K)
			}

			// ! DON'T LIKE THE 'methods'-symbols separation (?allow the user to create their own 'class-sections', that'd be extended in such a fashion? Then, just genearalize the 'CLASS' macro...);
			// ^ NOTE: the code is nigh-exactly-the-same. For v1.1 - this is the first place that the new-refactoring phase ought to start...
			for (const s in this.symbols) {
				const isarr = is.arr(this.symbols[s])
				const foundSym = s in sym ? sym[s] : sym(s)
				if (isarr || obj.hasOwn(this.isgeneral.symbols, s)) {
					const B = isarr
						? this.symbols[s]
						: [this.isgeneral.symbols[s], this.symbols[s]]
					const A = B[1]
					A.template.instance = K
					A.template.class = this
					K[foundSym] = B[0] ? A.function.bind(A) : A.function()
					continue
				}
				K[foundSym] = this.symbols[s]
			}

			// ! CREATE THE ABILITY TO DEFINE CONSTANTS ON CLASS INSTANCES!!! [using obj.defineProperty(..., ..., { writable: false, value: ... }, or manually throwing an error in the higher-level getter-setter structure...)]
			const O = this.recursive ? V[this.selfname] : V
			for (const pr in this.properties)
				O[pr] = this.properties[pr].bind(this)(...args)

			// ! NOTE: 'names' MUST BE REDONE AS 'properties'! THE ENTIRE CODE OF 'EXTENSION's is VERY REPETITIOUS!!!
			if ("names" in this && this.recursive) {
				for (const x of this.names) {
					obj.defineProperty(V, x, {
						get() {
							return V[this.class.selfname][x]
						},
						set(v) {
							return (V[this.class.selfname][x] = v)
						}
					})
				}
			}

			// ? refactor...
			if (this.recursive) {
				for (const x in V[this.selfname])
					if (
						!obj.hasOwn(V, x) &&
						!(x in this.properties) &&
						(!("names" in this) || !this.names.includes(x))
					)
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
				for (const s in this.symbols) {
					// ? Generalize this? [Useful for treating functions as extensions of object-tables and pre-computing values, as '()' is more general and, hence, computationally and time-wise, more costly];
					const foundSym = s in sym ? sym[s] : sym(s)
					obj.defineProperty(V, foundSym, {
						get() {
							return V[this.class.selfname][foundSym]
						},
						set(v) {
							return (V[this.class.selfname][foundSym] = v)
						}
					})
				}
			}

			return V
		}).bind(p)
		p[p.isname] = _FUNCTION(function (x, classword = this.classref) {
			return obj.hasOwn(x, classword) && _valueCompare(this, x[classword])
		}).bind(p)
		// * Note: this __doesn't__ (and isn't supposed to) check for presence of methods within the class in question - only for the presence of it in the recursive 'names-chain';
		p[Symbol.hasInstance] = _FUNCTION(function (x) {
			return (
				this.is(x) ||
				(x.class.names && x.class.names.any((n) => x[n] instanceof this))
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
// ! Add proper templates to 'EXTENSIONs' (generally, re-work and re-do them...);
// ^ NOTE: wondering about the general structure of EXTENSIONs - ought that change (or an alternative be created) as well? Instead of storing the parentclass's instance (and, thus, causing the variable-space) to shrink, how about simply "dumping" all the desired properties of the parent inside the child, then, reassigning them? The information regarding the parentclass still remains in the 'template'.
// ^ NOTE: what the 'EXTENSION' is implementing looks VERY-VERY much like a TEMPLATE-ing layer that uses a single 'parentclass' parameter, So why not just replace with that? The 'PRECLASS' will get scoured, instead being replaced with Interfaces, while this whole 'packing-unpacking' procedure will get hidden more thoroughly behind more different functions;
export const EXTENSION = (parentclass, template = {}) => {
	// ? refactor this repeating 'ensureProperties';
	// ! NOTE: about the 'toextend' - create an alias for some sort of a 'recursive ensureProperties...' (can be done manually, look at the potential use-cases...);
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
		isgeneral: { methods: {}, symbols: {} },
		toextend: { methods: true, symbols: true },
		defaults: {},
		index: {}
	})
	const ftemplate = {
		function: (template.isthis ? alinative.function.const : ID)(
			_FUNCTION(function (...args) {
				alinative.object.ensureProperties(
					args,
					this.template.defaults.constructor.map((x) => x.bind(this)())
				)
				const X = {}
				let i = 0
				for (const y of this.names)
					X[y] = this.template.defaults.outer(
						this.parentclass.class(
							...this.template.defaults.inter.bind(this)(args, i, X)
						),
						++i
					)
				return X
			})
		),
		names: ["sub"],
		parentclass: parentclass,
		...template,
		defaults: {
			...template.defaults,
			defaults: {
				constructor: [],
				inter: cdieach,
				outer: ID,
				...template.defaults.defaults
			}
		},
		symbols: {
			...((x) => {
				return OBJECT(
					x,
					x.map((a) => [
						template.isgeneral.symbols[x] || false,
						NAMED_TEMPLATE(
							_FUNCTION(function (
								instance = this.template.instance,
								index = this.template.index,
								classvar = this.template.class
							) {
								return _FUNCTION(function (...args) {
									if (obj.hasOwn(classvar.template.defaults, a))
										alinative.object.ensureProperties(
											args,
											classvar.template.defaults[a]
										)
									// ! This is not general. Reconsider deeply. First - should be ability to return arbitrary 'this'-bound expression (including 'this' itself); Second - think of whether this does the job for recursive classes as well [test, in other words...]; Third - look through the code and consider some powerful generalization cases which would be desired by one's code...
									return (
										classvar.recursive
											? (x) => x[classvar.subselfname]
											: ID
									)(this)[classvar.names[index]][
										a in sym ? sym[a] : sym(a)
									](...args)
								}).bind(instance)
							}),
							template.index[a] || 0
						)
					])
				)
			})(
				((y) =>
					refCompare(template.toextend.symbols, true)
						? y
						: INTERSECTION(y, template.toextend.symbols))(
					obj.keys(parentclass.symbols || [])
				)
			),
			...template.symbols
		},
		// ! NOTE: don't quite like the separation onto 'Symbols/methods' due to the fact that they are (in effect), in possession of EXACTLY the same code for method/symbol-inheritance...
		// ^ GENERALIZE AND REFACTOR...
		methods: {
			...((x) => {
				return OBJECT(
					x,
					x.map((a) => [
						template.isgeneral.methods[x] || false,
						NAMED_TEMPLATE(
							_FUNCTION(function (
								instance = this.template.instance,
								index = this.template.index,
								classvar = this.template.class
							) {
								return _FUNCTION(function (...args) {
									if (obj.hasOwn(classvar.template.defaults, a))
										alinative.object.ensureProperties(
											args,
											classvar.template.defaults[a]
										)
									// ! This is not general. Reconsider deeply. First - should be ability to return arbitrary 'this'-bound expression (including 'this' itself);  Second - look through the code and consider some powerful generalization cases which would be desired by one's code...
									return (
										classvar.recursive
											? (x) => x[classvar.subselfname]
											: ID
									)(this)[classvar.names[index]][a](...args)
								}).bind(instance)
							}),
							template.index[a] || 0
						)
					])
				)
			})(
				((y) =>
					refCompare(template.toextend.methods, true)
						? y
						: // ! was - alarray.native.intersection - FIX! [decide when to PROPERLY define them...];
						  INTERSECTION(y, template.toextend.methods))(
					Object.keys(parentclass.methods || [])
				)
			),
			...template.methods
		}
	}
	// ! CONSIDER, whether to change this to letting the '.toextend' stay + making it more flexible [id est, either adding another abstraction layer or changing the way that the '.toextend' is treated here...];
	return CLASS(ftemplate).function()
}

// * A useful algorithm from a different project of mine; value-wise comparison of two arbitrary things...
//
// ! Problem: with the currently chosen solution for the handling of the function arguments;
// * It's not good. For this sort of thing, one ought instead compare the ASTs of the functions in question;
// TODO: once having implemented the JSONF and parser libraries for the 1.1 or 1.2 release of the library, pray do;
// ? Wonder - how about trying to compare the 'prototypes' chains? (in particular - does the function work with the prototype of objects? Technically (from the code), ought to be - _valueCompare({a: b}, {__proto__: {a: b}}) == true)
// ^ IDEA: implement its more general version - one for the Map (instead of x: typeof x == 'object'), and another yet - generalization of the two (it would work with arbitrary collection that implements the '.keys()' interface, instead of just 'objects', add an implementation of a special Interface for this...);
// ^ IDEA: implement a generalization, which would only look for a particular set of fields in an object (that being, only certain fields would be rendered needed to determine this particular type of equivalence);
// ? Optimize this further (without caching yet, only short-term for now)? [The Array->Set conversion has made a GREAT improvement...]
// ! PROBLEM - this uses an array ('objs') for remembering recursion. Not good, it is only applicable to objects, which are MAX_ARRAY_LENGTH-deep, or less... (for this, generalize the thing...);
export const valueCompare = TEMPLATE({
	defaults: {
		oneway: false
	},
	function: _FUNCTION(function (...args) {
		const T = this
		function TWOCASE(oneway = false, objs = []) {
			return (a, b) => {
				if (refCompare(a, b)) return true
				if (!istype(a, typeof b)) return false
				switch (typeof a) {
					case "object":
						if (oldCompare(a, null) || oldCompare(b, null))
							return refCompare(a, b)
						if (!objs.some((x) => x.has(a) && x.has(b))) {
							objs[objs.length] = new Set([a, b])
							for (const a_ in a)
								if (!TWOCASE(false, objs)(a[a_], b[a_])) return false
							if (!oneway) return TWOCASE(true, objs)(b, a)
						}
						return true
					case "function":
						return (
							(!oneway && refCompare(a, b)) ||
							("origin" in a &&
								(T.function(a.origin, b) ||
									("origin" in b &&
										T.function(
											[a, b].map(alinative.function.index("origin"))
										)))) ||
							(!oneway && TWOCASE(true)(b, a))
						)
					case "symbol":
						return refCompare(
							...[a, b].map(alinative.object.rproperty("toString")())
						)
					default:
						return false
				}
			}
		}
		return args
			.slice(0, args.length - 1)
			.every((x, i) => TWOCASE(this.template.oneway)(x, args[i + 1]))
	})
}).function

// ? Keep this [as an export]? Or not?
export const _valueCompare = valueCompare().function
general.DEFAULT_COMPARISON = _valueCompare

export const alarray = {
	native: {
		generate: function (start, end, step = 1, precision = 1) {
			// ! find more places for this operation's application (refactor to an alias, mayhaps?)
			if (refCompare(arguments.length, 1)) {
				end = start
				start = 1
			}
			const generated = []
			const upper =
				end + (-1) ** (step < 0) * (Number.isInteger(step) ? 1 : 10 ** -precision)
			const proposition = step > 0 ? (i) => i < upper : (i) => i > upper
			for (let i = start; proposition(i); i += step)
				generated[generated.length] = nanumber.floor().function(i, precision)
			return generated
		}
	},
	// ? Question [general]: which one should the library prefer the 'GeneralArray'-based multiple arguments, or the spread syntax? (GeneralArray permits unlimited number of arguments for a function that uses it...);
	// ! THE 'finite' is not currently suited to transform methods such as this... PRAY FIX IT... [allow for arguments-arrays transformations..., such as here...];
	intersection: TEMPLATE({
		defaults: [
			function () {
				return {
					comparison: general.DEFAULT_COMPARISON,
					preferred: (fel, sel, comp, farr, sarr, find, sind) => fel,
					genarrclass: general.DEFAULT_GENARRCLASS,
					icclass: general.DEFAULT_ICCLASS
				}
			}
		],
		function: alinative.function.const(
			_FUNCTION(function (...arrs) {
				if (!arrs.length) return this.template.genarrclass.empty()
				if (refCompare(arrs.length, 1)) return arrs[0].copy()
				if (refCompare(arrs.length, 2)) {
					const inter = this.template.genarrclass.static.empty()
					arrs = arrs.map(ensureSet)
					for (
						let i = this.template.icclass.class();
						lesser(i, arrs[0].length().get());
						i = next(i)
					) {
						const x = arrs[0].read(i)
						for (
							let j = this.template.icclass.class();
							lesser(j, arrs[1].length().get());
							j = next(j)
						) {
							const y = arrs[1].read(j)
							if (this.template.comparison(x, y))
								inter.pushback(
									this.template.preferred(
										x,
										y,
										this.template.comparison,
										...arrs,
										i,
										j
									)
								)
						}
					}
					return ensureSet(inter)
				}
				return this.function(arrs[0], this.function(...arrs.slice(1)))
			})
		),
		isthis: true
	}).function,
	indexesOf: TEMPLATE({
		defaults: [
			_FUNCTION(function () {
				return {
					unfound: undefined,
					comparison: general.DEFAULT_COMPARISON,
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
			arr = arr.copy()
			return general.fix([arr], ["currindex"], () => {
				const inds = arr.empty()
				const cond = halt
					? (inds) => lesser(inds.length().get(), haltAfter)
					: TRUTH
				let currind = search.linear(this.template).function(el, arr)
				let c = arr.init()
				while (!refCompare(currind, this.template.unfound) && cond(inds)) {
					inds.pushback(currind.jumpDirection(c))
					currind = search
						.linear(this.template)
						.function(el, arr.delete(currind))
					c = next(c)
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
					comparison: general.DEFAULT_COMPARISON,
					copy: false,
					genarrclass: general.DEFAULT_GENARRCLASS,
					icclass: general.DEFAULT_ICCLASS,
					defelem: undefined
				}
			}),
			_FUNCTION(function () {
				return {
					tokeep: this.template.icclass.static.one()
				}
			})
		],
		function: alinative.function.const(
			_FUNCTION(function (
				arr = this.template.genarrclass.empty(),
				el = this.template.defelem,
				tokeep = this.template.tokeep
			) {
				const firstMet = alarray.indexesOf(this.template).function(arr, el)
				const pred = (_a, i) =>
					!firstMet.includes(i, this.template.comparison) ||
					lesser(firstMet.firstIndex(i, this.template.comparison), tokeep)

				return (
					this.template.copy
						? (x) => x.copied("suchthat", [pred])
						: (x) => x.suchthat(pred)
				)(arr)
			})
		),
		isthis: true
	}).function,
	join: TEMPLATE({
		defaults: [
			function () {
				return {
					genarrclass: general.DEFAULT_GENARRCLASS
				}
			},
			function () {
				return {
					separators: this.template.genarrclass.static.fromArray([])
				}
			}
		],
		function: alinative.function.const(
			_FUNCTION(function (
				arrs = this.template.genarrclass.static.empty(),
				separators = this.template.separators
			) {
				return repeatedApplication(this.template).function(
					this.template.genarrclass.static.empty(),
					arrs.length().get(),
					(x, i) =>
						x.concat(
							(i.equal(arrs.finish())
								? id
								: (x) => x.copied("concat", [separators]))(arrs.read(i))
						)
				)
			})
		),
		isthis: true
	}).function,
	common: TEMPLATE({
		defaults: {
			f: ID
		},
		function: _FUNCTION(function (...args) {
			return alarray
				.intersection(this.template)
				.function(...args.map(this.template.f))
		})
	}).function,
	split: TEMPLATE({
		defaults: {
			comparison: general.DEFAULT_COMPARISON,
			genarrclass: general.DEFAULT_GENARRCLASS,
			separator: undefined
		},
		function: _FUNCTION(function (
			array = this.template.genarrclass.static.empty(),
			separator = this.template.separator
		) {
			const farr = array.empty()
			let prev = array.init()
			for (let x = array.init(); lesser(x, array.length().get()); ) {
				if (this.template.comparison(separator, array.read(x))) {
					farr.pushback(array.copied("slice", [prev, x.previous()]))
					x = next(x)
					prev = x
					continue
				}
				x = next(x)
			}
			farr.pushback(array.copied("slice", [prev]))
			return farr
		})
	}).function
}

// ! GENERALIZE THE ARRAYCOUNTER TO A 'formCounter' (a counter, whose elements are forms...);
// ^ GENERAL NOTE : in regard to the 'counters' of the library - they're not general enough. Require MANUAL ensurance of properties in regard to domain-integrity; Fix it somehow?
// * Probably the "simplest" infinite counter one would have in JS is based off this generator;
export const arrayCounter = GENERATOR({
	defaults: {
		start: null,
		label: ""
	},
	function: alinative.function.const(
		_FUNCTION(function (a) {
			if (!this.range(a)) return this.template.start
			return refCompare(a, this.template.start) || is.arr(a)
				? [a]
				: a[this.template.label]
		})
	),
	// ? How about a default argument for this one? [Generally - pray look for such "unresolved" tiny things, such as missing default arguments' values];
	inverse: function (a) {
		if (!is.arr(a) || !obj.hasOwn(a, 0))
			return { [this.template.label]: this.range(a) ? a : this.template.start }
		return a[0]
	},
	range: _FUNCTION(function (a) {
		return (
			refCompare(a, this.template.start) ||
			(is.arr(a) && this.range(this.inverse(a))) ||
			(is.obj(a) && this.template.label in a)
		)
	})
}).function

general.DEFAULT_COUNTER = arrayCounter()
alinative.number.iterations = TEMPLATE({
	defaults: {
		iterated: general.DEFUAULT_COUNTER,
		defnum: 1
	},
	function: _FUNCTION(function (n = this.template.defnum) {
		return stnative.repeatedApplication(
			undefined,
			abs(n),
			this.template.iterated[n > 0 ? "generator" : "inverse"]
		)
	})
}).function

export const InfiniteCounter = (() => {
	// * Note: 'this.template.unacceptable' is thrown out of the function's scope for the sake of providing the 'InfiniteCounter(...).class()' syntax for simplified zero-creation;
	return CLASS({
		defaults: {
			comparison: general.DEFAULT_COMPARISON,
			unacceptable: undefined,
			initialcheck: refCompare,
			...general.DEFAULT_COUNTER
		},
		properties: {
			value: _FUNCTION(function (previous) {
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
				return greateroe(ic, this.zero())
			}).bind(R)
			// ? do the thing with the first n 'conditional' arguments - that being, if length of passed args array is 'n<k', where 'k' is maximum length, then the first 'k-n' recieve prescribed default values
			R.whileloop = _FUNCTION(function (
				end,
				each,
				start = this.zero(),
				iter = next,
				comparison = this.this.template.comparison,
				init = undefined
			) {
				let curr = start.copy()
				let r = init
				while (!curr.equal(end, comparison)) {
					r = each(curr, r)
					curr = iter(curr)
				}
				return r
			}).bind(R)
			R.reverse = _FUNCTION(function () {
				const _this = this
				return InfiniteCounter({
					generator: function (x) {
						if (refCompare(x, undefined))
							return _this.this.template.generator()
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
				return this.this.this.this.class.static.direction(this.this)
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
					!pointerfor.equal(this.this, comparison) &&
					!pointerback.equal(this.this, comparison)
				) {
					pointerfor = next(pointerfor)
					pointerback = previous(pointerback)
				}

				return pointerfor.equal(this.this, comparison)
			}),
			difference: _FUNCTION(function (
				ic,
				comparison = this.this.this.this.class.template.comparison
			) {
				// ! CONSIDER - whether to extend the 'greateroe, lesser, lesseroe, greater' methods to allow for arbitrary comparison (greateroe(x,y)->greateroe(x,y,comparison=refCompare)) or not...
				const nextf = ic.compare(this.this, comparison) ? previous : next
				return this.this.this.this.class.static.whileloop(
					this.this.this.copy(),
					(_x, y) => nextf(y),
					ic,
					nextf,
					comparison,
					this.this.this.this.class.static.zero()
				)
			}),
			jumpDirection: _FUNCTION(function (
				ic,
				comparison = this.this.this.this.class.template.comparison
			) {
				return this.jump(ic, ic.direction() ? next : previous, comparison)
			}),
			jumpReverse: _FUNCTION(function (
				ic,
				comparison = this.this.this.this.class.template.comparison
			) {
				return this.jumpDirection(ic.reverse(), comparison)
			}),
			jump: _FUNCTION(function (
				x,
				jumping = next,
				comparison = this.this.this.this.class.template.comparison,
				counterclass = this.this.this.this.class
			) {
				return this.this.this.this.class.static.whileloop(
					x,
					(_x, y) => jumping(y),
					counterclass.class(),
					jumping,
					comparison,
					this.copy()
				)
			}),
			loop: _FUNCTION(function (
				body = VOID,
				start = this.this.this.this.class.class(),
				init = udef
			) {
				return this.this.this.this.class.static.whileloop(
					this.this.this,
					body,
					start,
					this.compare(start) ? next : previous,
					udef,
					init
				)
			}),
			map: _FUNCTION(function (
				icClass = this.this.this.this.class,
				comparison = this.this.this.this.class.template.comparison
			) {
				if (refCompare(this.this.this.this.class, icClass)) return this.copy()
				const nextf = this.direction() ? next : previous
				let current = this.this.this.this.class.class()
				let alterCurrent = icClass.class()
				while (!comparison(current.value, this.this.this.value)) {
					alterCurrent = nextf(alterCurrent)
					current = nextf(current)
				}
				return alterCurrent
			}),
			reverse: _FUNCTION(function () {
				return this.zero().difference(this.this)
			}),
			copy: _FUNCTION(function () {
				return this.this.this.this.class.class(this.this.this.value)
			}),
			equal: _FUNCTION(function (
				x,
				comparison = this.this.this.this.class.template.comparison
			) {
				x = x.map(this.this.this.this.class)
				return comparison(
					...[this.this, x].map(alinative.function.index("value"))
				)
			}),
			zero: _FUNCTION(function () {
				return this.this.this.this.class.static.zero()
			}),
			one: refactor.classes.one,
			two: refactor.classes.two
		},
		symbols: {
			// ? Consider the matter of making generator-functions bindable like this...
			// ! NOTE: one may have a need to rewrite their definitions using the bare 'Generator' protocol, without the usage of the 'function*' syntax sugar...;
			// ^ For this, just 'copy' the Generator structure ({ next: () => {value: any, done: boolean}, return: () => void, throw: (error) => never, suspeneded: boolean, closed: boolean }), then the [Symbol.iterator] as a thing that returns the Gsenerator object, when called;
			// * Slightly too complicated (requires manually keeping track of all the variables' states from the last call (even though the structure itself can be preserved easily...)); Think about it for the v1.1.
			// ! IF THE CODE STILL DOESN'T WORK BECAUSE OF LACK OF 'BIND', THEN DO [checked, it ought to...];
			// ! SEMI-PROBLEM : the 'iterator's all have a different context from the rest of the methods - they GET COPIED AND REASSIGNED THEIR CONTEXT; So, for instance, it CAN work, one just needs to get rid or add a '.this' here and there
			// TODO: [later, v1.1] try to find a way to bypass this (without the need to force user to abandon the pretty and universal 'for-of' syntax of GeneralArray iteration...);
			iterator: function* () {
				const [predicate, change] = this.direction()
					? [lesser, next]
					: [greater, previous]
				for (
					let i = this.this.this.class.class();
					predicate(i, this);
					i = change(i)
				)
					yield i
			}
		},
		recursive: true
	}).function
})()

general.DEFAULT_ICCLASS = InfiniteCounter()
alinative.number.fromNumber = TEMPLATE({
	defaults: {
		start: 0,
		nstart: 0,
		icclass: general.DEFAULT_ICCLASS
	},
	function: _FUNCTION(function (x = this.template.nstart) {
		return InfiniteCounter(addnumber({}, this.template))
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
				// ^ For now - a 'compromise' - the functions that are effectively the same (use the native JS '.bind' will NOT be recognized as equivalent in the sense of valueCompare...);
				function: (a, context = dcontext()) => _FUNCTION(a).bind(context),
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
			// TODO: refactor the constant expressions as well...;
			if (new Set(["array", "arrayFlat"]).has(x)) return is.arr
			if (new Set(["objectFlat", "object"]).has(x)) return is.obj
			return (p) => istype(p, x)
		}
		return TEMPLATE({
			defaults: { list: [] },
			function: _FUNCTION(function (a) {
				for (const x of this.template.list)
					if (typeTransform(x)(a))
						return copy
							.copy()
							.function()
							[x](
								a,
								(refCompare(x, "object") && a && obj.keys(a).length) ||
									(refCompare(x, "array") && a.length)
									? this.function
									: undefined
							)

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
			const arr = str(num).split("")
			let affecteds = ""
			while (arr.length % this.template.mod > 0) affecteds += arr.shift()
			arr.forEach((number, index) => {
				affecteds +=
					(index && divides(index, this.template.mod) ? ` ` : ``) + number
			})
			return affecteds
		})
	}).function,

	// TODO: generalize [then put into the 'numerics', use with 'polystring'];
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
		return refCompare(num(str(x).split(".")[0]), x)
	},
	min(numarr = []) {
		return Math.min(...numarr)
	},
	max(numarr = []) {
		return Math.max(...numarr)
	}
}

object.objInherit(object, {
	subobjects(object = {}, prev = [], first = true) {
		let returned = []
		if (!first && prev.includes(object)) return returned
		if (is.obj(object)) {
			if (!first) prev[prev.length] = object
			for (const a in object)
				if (is.obj(object[a]) && !prev.includes(object[a])) {
					returned[returned.length] = object[a]
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

	propSwap: function (obj, prop1, prop2) {
		const temp = obj[prop1]
		obj[prop1] = obj[prop2]
		obj[prop2] = temp
	},

	ismapped: function (...args) {
		return _valueCompare(...args.map(obj.keys))
	},

	gutInnerObjs(obj_ = {}, keys = obj.keys(obj_)) {
		let gutted = {}
		keys = new Set(keys)
		const ok = obj.keys(obj_)
		for (const y of ok) {
			if (is.obj(obj_[y]) && keys.has(y)) {
				gutted = { ...gutted, ...obj_[y] }
				continue
			}
			gutted[y] = obj_[y]
		}
		return gutted
	},

	objEncircle(obj_, newkey, keys = []) {
		const encircled = { [newkey]: {} }
		keys = new Set(keys)
		for (const y of obj.keys(obj_)) {
			if (keys.has(y)) {
				encircled[newkey][y] = obj_[y]
				continue
			}
			encircled[y] = obj_[y]
		}
		return encircled
	},

	// method for converting objects into a JSON-like String format
	toString(object, separator = ", ", padding = " ") {
		const k = obj.keys(object)
		const p = k.length ? padding : ""
		return `{${p}${k
			.map((x) => `"${x.toString()}": ${object[x].toString()}`)
			.join(separator)}${p}}`
	}
})

export const naarray = {
	replace: {
		replaceIndex: function (arr = [], index = 0, value = undefined) {
			return [...arr.slice(0, index), value, ...arr.slice(index + 1)]
		},

		replaceIndexes: function (_arr, x, y, indexes = naarray.keys(_arr)) {
			indexes = new Set(indexes)
			return alarray.native
				.split()
				.function(_arr, x)
				.map((seg, i, r) =>
					(refCompare(i, r.length - 1)
						? ID
						: (t) => t.concat([indexes.has(i) ? y : x]))(seg.array)
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
		replacePredicate: function (array, p, transformation = ID) {
			const resArray = copy.flatCopy(array)
			for (let i = 0; i < array.length; ++i)
				if (p(array[i])) resArray[i] = transformation(array[i])
			return resArray
		}
	},

	keys(array = []) {
		const fk = []
		for (const k of array.keys()) fk[fk.length] = k
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
				copied[copied.length] = a.slice(from, to + 1)
				i = to
				continue
			}
			copied[copied.length] = a[i]
		}
		return copied
	},

	// ? Generalize such usages of 'repeatedApplication' with some special alias of 'multiple' (works exclusively with arrays, for example?);
	// ! This can be optimized [repeated 'evaluate()'];
	arrEncircleMult(arr = [], coors = []) {
		return stnative.repeatedApplication(copy.flatCopy(arr), coors.length, (r, i) =>
			naarray.arrEncircle(
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
		function: _FUNCTION(function (array = [], element = this.template.defelem) {
			return array.filter((x) => this.template.comparison(x, element)).length
		})
	}).function
}

// ! BUG ! with using the 'strmethod' representation - due to the fcact that strings are transformed to arrays symbol-by-symbol, it's impossible to do things like 'replaceIndexes(str, "..." [more than 1], "..." (any length))'; with accent being on the search string's length; THIS MUST BE FIXED!
export const string = {
	strmethod: alinative.function.wrapper({
		in: [alinative.string.stoa],
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
	defaults: [
		function () {
			return {
				ustrclass: general.DEFAULT_USTRCLASS,
				tintclass: general.DEFAULT_TINTCLASS,
				icclass: general.DEFAULT_ICCLASS
			}
		},
		function () {
			return { alphabet: this.template.genarrclass.static.fromArray(["0", "1"]) }
			// ! RETURN BACK LATER!
			// return {
			// 	alphabet: this.template.genarrclass.static.fromArray(defaultAlphabet.get)
			// }
		}
	],
	function: alinative.function.const(
		_FUNCTION(function (integer = this.template.tintclass.class()) {
			// ! Explicit caching! bad
			const convertedN = this.template.tintclass.static.fromCounter(
				this.template.alphabet.length().get()
			)
			const representation = this.template.ustrclass.static.empty()

			for (
				let index = this.template.icclass.static.zero();
				greater(integer, this.template.tintclass.static.zero());
				index = next(index)
			) {
				const modulo = integer.modulo(convertedN)
				representation.write(index, this.template.alphabet.read(modulo.value))
				integer = integer.difference(modulo)
				integer = integer.divide(convertedN)
			}

			return representation.reverse()
		})
	),
	isthis: true
}).function

export const fromPolystring = TEMPLATE({
	defaults: [
		alinative.function.const({
			ustrclass: general.DEFAULT_USTRCLASS,
			tintclass: general.DEFAULT_TINTCLASS,
			genarrclass: general.DEFAULT_GENARRCLASS
		}),
		_FUNCTION(function () {
			return {
				alphabet: this.template.genarrclass.static.fromArray(["0", "1"])
			}
			// ! RETURN BACK!
			// return { alphabet: this.template.genarrclass.static.fromArray(defaultAlphabet.get) }
		})
	],
	function: alinative.function.const(
		_FUNCTION(function (ustr = this.template.ustrclass.class()) {
			let r = this.template.tintclass.class()
			// ! manual length-caching. bad;
			const len = this.template.tintclass.static.fromCounter(
				this.template.alphabet.length().get()
			)
			const uslenmone = ustr.length().get().previous()
			for (const k of ustr.keys())
				r = r.add(
					this.template.tintclass.static
						.fromCounter(this.template.alphabet.firstIndex(ustr.read(k)))
						.multiply(
							len.power(
								this.template.tintclass.static.fromCounter(
									uslenmone.jumpReverse(k)
								)
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
		function () {
			return {
				alphabet: this.template.genarrclass.static.fromArray(["0", "1"])
				// ! RETURN BACK LATER!
				// alphabet: this.template.genarrclass.static.fromArray(defaultAlphabet.get)
			}
		}
	],
	function: alinative.function.const(
		_FUNCTION(function (strs = this.template.genarrclass.static.empty()) {
			const copy = strs.copy((str) => str.length().get())
			const endsize = (this.template.shrink ? min : max)().function(copy)
			for (const str of strs) {
				str.reverse()
				str.length().set(endsize, this.template.alphabet.read())
				str.reverse()
			}
			return endsize
		})
	),
	isthis: true
}).function

export const baseconvert = TEMPLATE({
	defaults: [
		refactor.defaults.polyd1,
		function () {
			return {
				alphabetfrom: this.template.genarrclass.static.fromArray(["0", "1"]),
				// ! return back!
				// alphabetfrom: this.template.genarrclass.static.fromArray(
				// 	defaultAlphabet.get
				// ),
				alphabetto: this.template.genarrclass.static.fromArray([
					"0",
					"1",
					"2",
					"3"
				]),
				empty: this.template.ustrclass.class()
			}
		}
	],
	function: alinative.function.const(
		_FUNCTION(function (numstr = this.template.empty) {
			return polystring({
				...this.template,
				alphabet: this.template.alphabetto
			}).function(
				fromPolystring({
					...this.template,
					alphabet: this.template.alphabetfrom
				}).function(numstr)
			)
		})
	),
	isthis: true
}).function

// ?[this doesn't use 'finite'? why?];
export const ponative = {
	// * Brings whatever is given within the given base to base 10;
	fromPolystring: TEMPLATE({
		defaults: {
			alphabet: /* defaultAlphabet.get */ ["0", "1"],
			defstr: ""
		},
		function: _FUNCTION(function (nstr = this.template.defstr) {
			return evaluate().function(
				Expression(
					"+",
					[],
					alarray.native
						.generate(0, nstr.length - 1)
						.map(
							(i) =>
								this.template.alphabet.indexOf(nstr[i]) *
								this.template.alphabet.length ** (nstr.length - 1 - i)
						)
				)
			)
		})
	}).function,

	// * Brings whatever in base 10 to whatever in whatever base is given...
	polystring: TEMPLATE({
		defaults: {
			alphabet: /* defaultAlphabet.get */ ["0", "1"]
		},
		function: _FUNCTION(function (n) {
			const coefficients = []
			const base = this.template.alphabet.length
			for (let i = 0; n > 0; i++) {
				coefficients.push(n % base)
				n -= coefficients[coefficients.length - 1]
				n /= base
			}
			return coefficients
				.reverse()
				.map(alinative.function.rindex(this.template.alphabet))
				.join("")
		})
	}).function,

	// * Convert a numeric string in one base to a base string in another;
	baseconvert: TEMPLATE({
		defaults: {
			alphabetto: defaultAlphabet.get,
			alphabetfrom: ["0", "1"]
			// alphabetfrom: defaultAlphabet.get,
		},
		function: _FUNCTION(function (
			a,
			basefrom = this.template.from,
			baseto = this.template.to
		) {
			return ponative
				.polystring({ alphabet: this.template.alphabetto })
				.function(
					ponative
						.fromPolystring({ alphabet: this.template.alphabetfrom })
						.function(a, basefrom),
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
	// ! PROBLEM : this is bugged. What kind of a modulo does one want instead? [Suggestion - use a function for the argument of 'refursiveOperation']?
	"%": general.recursiveOperation("%", alinative.binary.modulo, 1),
	// ? Isn't this bugged? [Due to usage of 'dand' - see for oneself whether desired for rewriting...]
	"&&": general.recursiveOperation("&&", alinative.binary.dand, false),
	"||": general.recursiveOperation("||", alinative.binary.dor, false)
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

// * Generalization of the 'Expression':
export function composition(fcall) {
	return (...args) => {
		return fcall.f(
			...integer.native
				.generate(nanumber.max([fcall.functions.length, fcall.args.length]))
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
		_FUNCTION(function (x) {
			if (is.udef(x)) return this.template.start
			return this.template.forward(num(x))
		})
	),
	inverse(x) {
		if (is.udef(x)) return this.template.start
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

// ? Generalize with the usage of 'forms'? [the present implementation uses the 'DEFAULT_FORM...'];
// * A counter based on array recursion and finite orders;
// ! Note: the counters are way too slow as of present (seeking potential ways of remedying it...).
export function recursiveCounter(template = {}) {
	const returned = {
		defaults: {
			comparison: general.DEFAULT_COMPARISON,
			maxarrlen: MAX_ARRAY_LENGTH.get,
			type: TRUTH,
			...template
		},
		range(x) {
			return (
				is.arr(x) &&
				!!x.length &&
				x.every((y) =>
					alinative.binary.dor(
						...[this.template.type, (y) => is.arr(x) && this.range(y)].map(
							alinative.function.argscall(y)
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
				soughtProp: returned.template.type,
				bound: t ? returned.template.upper : returned.template.rupper,
				comparison: returned.template.comparison
			}).function()
	const findDeepUnfilledArr_ = (returned) =>
		findDeepUnfilledArr({
			bound: returned.template.maxarrlen
		})()
	const findDeepLast_ = (returned) =>
		findDeepLast({
			soughtProp: returned.template.type
		})

	// ! In the default value of the 't' as an 'undefined-like' value, generalize to allow for ranges that include 'undefined'...
	const keys = ["inverse", "function"]
	keys.map(
		(x, i) =>
			(returned[x] = (refCompare(x, "function") ? alinative.function.const : ID)(
				_FUNCTION(function (t) {
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
					result = repeatedApplication().function(
						result,
						dim({
							icclass: indexes.class.template.icclass
						})
							.function(x)
							.difference(indexes.length().get())
							.previous(),
						(value) => {
							value[value.length] = []
							return value[value.length - 1]
						}
					)
					result[result.length] = thisobject.template.lower
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
					!findDeepUnfilledArr_(thisobject)(x) &&
					refCompare(x.length, 1)
				)
					return x[0]

				let isSingle = false
				let lastIndexes = findDeepLast_(thisobject)(x)

				if (lastIndexes.length().get().equal(lastIndexes.one())) {
					isSingle = true
					lastIndexes.pushfront(0)
					x = [x]
				}

				const finind = lastIndexes.finish()
				const ffinind = finind.previous()

				let ppointer = rindexation(
					x,
					lastIndexes.copied("slice", [undefined, ffinind.previous()])
				)
				let pointer = rindexation(
					x,
					lastIndexes.copied("slice", [undefined, ffinind])
				)

				const lindex = lastIndexes.read(finind)
				if (
					!thisobject.template.comparison(
						thisobject.template.lower,
						pointer[lindex]
					)
				) {
					pointer[lindex] = thisobject.template[sign ? "forward" : "backward"](
						pointer[lindex]
					)
					return (isSingle ? (x) => x[0] : ID)(x)
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

				return (isSingle ? (x) => x[0] : ID)(x)
			}
		}
	}

	const sat = signedAdd(true),
		saf = signedAdd(false),
		sdt = signedDelete(true),
		sdf = signedDelete(false)

	// TODO: problem - currently, does not work with 'broken' (outside) values, like 'generator([POS, NEG])' - here, it will start with increasing POS, instead of 'fixing' the NEG (this isn't supposed to happen...); Fix later...;
	function boolfunctswitch(fsign, signbool) {
		return fsign ? (signbool ? sat : sdt) : signbool ? sdf : saf
	}

	function generalgenerator(x, bool, thisobj) {
		if (!thisobj.range(x)) return thisobj.template.init(thisobj)
		const r = copy.deepCopy(x)
		// ? Think on whether the '_valueCompare' is a good choice here... [or if one ought to generalize, for instance...];
		const globsign = thisobj.template.globalsign(r)
		const isinit =
			_valueCompare(x, thisobj.template.init(thisobj)) || is.null(globsign)
		return boolfunctswitch(bool, isinit ? bool : globsign)(thisobj)(r)
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
		// ! PROBLEM WITH 'globalsign' - it must work for BOTH positive and negative sign, namely, it must check for whether they are COMPLETE (this way, there's actually 3 types - complete negative, complete positive and incomplete; Incomplete gets a different treatment from complete types, which get equivalent treatment, but have different function sets...);
		sign: (x) => x > 0,
		globalsign: function (x, pr = true) {
			let r = pr
			const final =
				is.arr(x) &&
				x.every((a) => {
					if (refCompare(a, this.lower)) return (r = null)
					const gs = this.globalsign(a, r)
					return gs ? gs : this.sign(a)
				})
			if (refCompare(r, null)) return r
			return final
		},
		type: negate(is.nan),
		forward: inc(),
		backward: dec(),
		init: (thisobj) => [thisobj.template.lower],
		...template
	})
}

// TODO: some (many) of the templates have their dependencies of variables messed up completely (some are fluid - relying upon 'this', whilst others - upon 'template' or such others local variables, that are to be used for definition of the context-ones...);
// A special case of 'recusiveCounter';
// * Uses array-orders (by default);
export function orderCounter(template = {}) {
	return recursiveCounter({
		upper: template.order[template.order.length - 1],
		lower: template.order[Math.floor(template.order.length / 2)],
		rupper: template.order[0],
		forward: (x) => template.order[inc()(template.order.indexOf(x))],
		backward: (x) => template.order[dec()(template.order.indexOf(x))],
		// ? Wonder - should one not make take this thing out of the 'template' that gets passed to the 'recursiveCounter'?
		globalsign: function (x, pr = true) {
			let r = pr
			const final =
				is.arr(x) &&
				x.every((a) => {
					if (refCompare(a, this.lower)) return (r = null)
					const gs = this.globalsign(a, r)
					return gs ? gs : this.sign(a)
				})
			if (refCompare(r, null)) return r
			return final
		},
		// ! Bugged - must rely upon 'this', not 'template'...
		sign: (x) => template.order.indexOf(x) >= Math.floor(template.order.length / 2),
		init: (thisobj) => [thisobj.template.lower],
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
	init = (x) => x.init(),
	length = (x) => x.length().get()
) => {
	// ? Should one be using the 'arrow-functions' like that, or will 'form->this+function' be a more prefereable option?
	const X = { new: _new, is, index, isomorphic }
	X.init = (x) => init(x)
	X.flatmap = (x, f) => X.new(copy(X.index(x), f))
	X.read = (x, i = X.init(x)) => read(X.index(x), i)
	X.write = (x, i, v) => write(X.index(x), i, v)
	X.keys = (x) => keys(X.index(x))
	X.length = (x) => length(X.index(x))
	return X
}

// * An SUPERBLY useful technique for recursive type-creation and working with layers; Allows one to separate one layer from another using 'refCompare' and the out-of-scope object constant;
export function typeConst(f = ID, n = 1) {
	return f(Object.freeze(alarray.native.generate(n).map(alinative.object.empty)))
}

// * Some forms aliases for immidiate work with the 'structure';

export function constForm(
	fieldname = "",
	contentsname = "contents",
	n = true,
	defaultval = [],
	...rest
) {
	return typeConst((c) => {
		let _new = (x = defaultval) => ({ [contentsname]: x })
		let _is = (checked) => is.obj(checked) && obj.hasOwn(checked, contentsname)
		const index = (x) => x[contentsname]
		let isomorphic = undefined
		if (n) {
			c = c[0]
			_new = (x = defaultval) => ({ [fieldname]: c, [contentsname]: x })
			_is = (checked) =>
				is.obj(checked) &&
				refCompare(checked[fieldname], c) &&
				obj.hasOwn(checked, contentsname)
			isomorphic = (x, y) =>
				refCompare(x, y.map(alinative.function.index(fieldname)))
		}
		return form(_new, _is, index, isomorphic, ...rest)
	}, n)
}

export function propertyForm(contentsname = "", defaultval = {}, ...rest) {
	return constForm("", contentsname, false, defaultval, ...rest)
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
	(x) => obj.keys(x)[0],
	(x) => obj.keys(x).length
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
	alinative.function.const(0),
	(x) => x.length
)

general.DEFAULT_FORM = arrayForm

// ! note: slightly flawed - the 'keys' is poor defined - too great a type variety there; Be more concrete regarding its contents + attach the information of comparison to their mutual type (type of one of them...); 
export const structure = TEMPLATE({
	defaults: {
		form: general.DEFAULT_FORM,
		comparison: general.DEFAULT_COMPARISON,
		// * Note: this is a complex example - for 1 argument, it must return the expected 'equivalent', but for 2 - whether they are, in fact, equivalent, (id est: compequiv(a, compequiv(a)) == true);
		compequiv: function (...args) {
			if (refCompare(args.length, 1)) return args[1]
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

export const classForm =
	(_class) =>
	(template = {}, index = ID, additional = []) => {
		const Class = _class(template)
		return form(Class.class, Class.is, index, TRUTH, ...additional)
	}

export const circularCounter = (() => {
	const final = {
		defaults: {
			form: general.DEFAULT_FORM,
			values: [],
			hop: 1
		},
		range(x) {
			return this.template.values.includes(x)
		}
	}

	const generalized = (name, sign) =>
		(refCompare(name, "function") ? alinative.function.const : ID)(
			_FUNCTION(function (x) {
				if (this.template.form.is(x))
					return this.template.form.flatmap(x, this[name])
				const vals = alarray.native
					.indexesOf()
					.function(this.template.values, x)
					.map(
						(i) =>
							this.template.values[
								(i.value + sign * this.template.hop) %
									this.template.values.length
							]
					)
				if (!vals.length) return this.template.values[0]
				if (refCompare(vals.length, 1)) return vals[0]
				return this.template.form.new(vals)
			})
		)
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

// ? Make a nice out-of-scope error message/special value, that it gets "stuck" on?
export const finiteCounter = (() => {
	const F = {}
	const keys = ["function", "inverse"]
	const labels = ["next", "previous"]
	for (const x in keys)
		F[keys[x]] = (refCompare(keys[x], "function") ? alinative.function.const : ID)(
			function (item) {
				return this.template.values.read(
					this.template.values.firstIndex(item)[labels[x]]()
				)
			}
		)
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

// ? 'Ensurer' somehow feels like a bit of a hack (largely, because it makes necessery the addition of the list of methods to be checked... See if want to do anything about it.)
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

// * Ensures the 'heap' property upon a given tree;
// TODO: rewrite the previous parts of the library in such a way so as to use this... [namely, algorithms.heaps]
export const ensureHeap = (
	tree,
	predicate,
	comparison = tree.class.parentclass.template.comparison
) => {
	const node = tree.node
	const most = most({ predicate: predicate }).function(
		tree.children.copied("pushfront", tree.node)
	)
	if (!comparison(node, most)) {
		tree.node = most
		tree.children.write(tree.children.firstIndex(most), node)
	}
	for (const c of tree.children) ensureHeap(c)
	return tree
}

export const ensureSet = _FUNCTION(function (
	genarr = general.DEFAULT_GENARRCLASS.static.empty()
) {
	return genarr.copied("suchthat", [allUnique])
})

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

// ^ IDEA [suggestion]: create GeneralArray models, that'd allow writing on negative (!.direction()) indexes? [And fix the way that 'length' is defined, maybe?];
// * Possibly, replace the single 'length()' with two other functions - 'maxind' and 'minind'; They'd be defined in the same fashion as the 'length', but 'maxind=length' as with current length, whilst the 'minind' would work in the opposite direction...;
export const GeneralArray = (() => {
	return CLASS({
		defaults: {
			empty: [],
			unfound: undefined,
			treatfinite: false,
			// ! (was) used for 'move' methods... [to be reintroduced in v1.1];
			// fast: false,
			default: alinative.function.const(undefined),
			icclass: general.DEFAULT_ICCLASS,
			comparison: refCompare
		},
		properties: {
			array: _FUNCTION(function (array = this.template.empty) {
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
				return next(this.zero())
			}).bind(R)

			R.two = _FUNCTION(function () {
				return next(this.one())
			}).bind(R)

			// ? Does one like this? [Consider, whether to keep the 'template' here...];
			R.empty = _FUNCTION(function (template = this.this.template) {
				return GeneralArray(template).class()
			}).bind(R)

			// ? use the alias for empty array all over the place;
			R.fromArray = _FUNCTION(function (arr = []) {
				const generalized = this.empty({
					...this.this.template,
					treatfinite: false
				})
				for (const a of arr) generalized.pushback(a)
				return generalized
			}).bind(R)

			R.fromCounter = _FUNCTION(function (counter) {
				const narr = this.empty()
				counter.loop(() => narr.pushback(this.this.template.default()))
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
						get: () => this.this.this.this.class.template.elem(this.this),
						set: (newval) =>
							this.this.this.this.class.template.newvalue(this.this, newval)
					}
				}),
				// * For loops; Allows to loop over an array, with a changing index; Usage examples may be found across the default GeneralArray methods definitions:
				// * pray notice, that '.full()' changes the 'this.object.currindex' by default, whilst
				loop: _FUNCTION(function (template = {}) {
					const a = {
						template: {
							indexiter: (x) => next(x.object()),
							end: (x) => x.object().class.template.isEnd(x.object()),
							begin: (x) => x.object().begin(),
							icclass: this.this.this.this.class.template.icclass,
							after: ID,
							...template
						},
						object: alinative.function.const(this.this),
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
						if (!isend && iter) this.counter = next(this.counter)
						return isend
					}).bind(a)
					a._full = _FUNCTION(function (
						each,
						iter = alinative.function.const(this.template.indexiter),
						end = alinative.function.const(this.template.end),
						begin = this.template.begin,
						after = this.template.after
					) {
						const t = general.fix([this.object()], ["currindex"], () => {
							begin(this)
							let r = undefined
							let is = this.yield(
								alinative.function.const(null),
								end(),
								false
							)
							while (!is) {
								r = each(this, r)
								is = this.yield(iter(), end())
								if (this.broke) break
							}
							this.restart()
							this.broke = false
							return r
						})
						after(this)
						return t
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
				// ^ These are WONDERFUL ideas for methods!
				// * Unfortunately, the user can't apply them in their full force (due to the 'leftovers' design problem), so they are getting cut out of the v1.0;
				// ! RETURN BACK IN V1.1 IN FULL FORCE!
				// move: _FUNCTION(function (
				// 	index = this.init(),
				// 	preface = VOID,
				// 	comparison = equal,
				// 	each = next,
				// 	stop = (x) => comparison(x.length().get(), x.currindex)
				// ) {
				// 	preface(arguments, this.this.this)
				// 	while (
				// 		!comparison(this.this.this.currindex, index) &&
				// 		!stop(this.this.this)
				// 	)
				// 		each(this.this.this)
				// 	return this.this.this.currindex
				// }),
				// // TODO: check these (move, moveforward, movebackward, movedirection...) for correctness...
				// moveforward: _FUNCTION(function (
				// 	index = this.init(),
				// 	begin = false,
				// 	comparison = equal,
				// 	stop = (x) => comparison(next(x.length().get()), x.currindex)
				// ) {
				// 	return this.move(
				// 		index,
				// 		(args, x) => {
				// 			if (begin) x.currindex = x.init()
				// 		},
				// 		comparison,
				// 		next,
				// 		stop
				// 	)
				// }),
				// movebackward: _FUNCTION(function (
				// 	index = this.init(),
				// 	end = false,
				// 	comparison = equal,
				// 	stop = (x) => comparison(x.init(), x.currindex)
				// ) {
				// 	return this.move(
				// 		index,
				// 		(args, x) => {
				// 			if (end) x.currindex = x.length().get()
				// 		},
				// 		comparison,
				// 		previous,
				// 		stop
				// 	)
				// }),
				// movedirection: _FUNCTION(function (
				// 	index,
				// 	init = false,
				// 	comparison = equal,
				// 	stop
				// ) {
				// 	return greateroe(this.this.this.currindex, index)
				// 		? this.moveforward(
				// 				index,
				// 				init,
				// 				comparison,
				// 				is.fun(stop) ||
				// 					((x) => comparison(x.currindex, x.length().get()))
				// 		  )
				// 		: this.movebackward(
				// 				index,
				// 				init,
				// 				comparison,
				// 				is.fun(stop) || ((x) => comparison(x.currindex, x.init()))
				// 		  )
				// }),
				jump: _FUNCTION(function (
					index = this.init(),
					comparison = this.this.this.this.class.template.icclass.template
						.comparison
				) {
					return (this.this.this.currindex =
						this.this.this.currindex.jumpDirection(index, comparison))
				}),
				// TODO: in ALL the library algorithms, pray create ways to ensure user choice between fast/not-fast and all the appropriate 'move'-related arguments (by default, always make 'fast=true'... AND ALSO - try not to use the 'leftovers', or do something about them - dangling there always like so... unnerving);
				read: _FUNCTION(function (
					index = this.init()
					/* fast = this.this.this.this.class.template.fast */
				) {
					return general.fix([this.this.this], ["currindex"], () => {
						/* if (fast) */ this.go(index)
						// else this.moveforward(index, true)
						return this.currelem().get()
					})
				}),
				// ? Question: mayhaps, return 'this.this' for that one as well?
				write: _FUNCTION(function (index, value /* , fast = true */) {
					return general.fix([this.this.this], ["currindex"], () => {
						/* if (fast) */ this.go(index)
						// else this.moveforward(index, true)
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
									next(this)

								return this.this.this.currindex
							})
						},
						set: (value) => {
							if (this.length().get().equal(value)) return this.this
							return greateroe(this.length().get(), value)
								? this.deleteMult(value, this.finish())
								: this.concat(
										this.this.this.this.class.static.fromCounter(
											this.length().get().difference(value)
										)
								  )
						}
					}
				}),
				copied: refactor.classes.copied(false),
				// ? Add capability to pass multiple values? [was in other places as well...];
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
					array.loop()._full(
						this.pushbackLoop({
							arguments: []
						}).function
					)
					return this.this
				}),
				multcall: refactor.classes.multcall,
				clear: _FUNCTION(function () {
					this.this.this = this.empty().this
					return this
				}),
				empty: refactor.classes.empty,
				copy: _FUNCTION(function (
					f = ID,
					isclass = false,
					template = isclass
						? this.this.this.this.class
						: this.this.this.this.class.template
				) {
					const copied = isclass ? template.class() : this.empty(template)
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
					if (!refCompare(x, this.this.this.this.class.template.unfound))
						return this.delete(x)
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
							lesser(end, t.object().currindex)
						),
						(t) => {
							t.object().begin()
							t.object().go(begin)
						}
					)
					this.this.this = sliced.this
					return this.this
				}),
				keys: _FUNCTION(function () {
					const keyarr = this.empty()
					for (let c = this.init(); lesser(c, this.length().get()); c = next(c))
						keyarr.pushback(c)
					return keyarr
				}),
				// ? refactor using the other GeneralArray methods;
				// * Do it using '.project() + InfiniteCounter.difference() + repeat()...';
				// Sketch: 'this.this.this.projectComplete(index, this.this.this.static.fromArray([value]).repeat(this.this.this.length().get().difference(index)))'
				fillfrom: _FUNCTION(function (index, value) {
					general.fix([this.this.this], ["currindex"], () => {
						this.go(index)
						for (const x of this.keys().copied("slice", [index]))
							this.write(x, value)
					})
					return this.this
				}),
				convert: _FUNCTION(function (
					template = this.this.this.this.class.template
				) {
					const c = this.copy(ID, false, template)
					this.this.this = c.this
					this.this.class = c.class
					return this.this
				}),
				// * NOTE: the difference between this thing and the '.convert' is the fact that '.switchclass' is capable of preserving "reference-connections" of different objects to the same one object class's instance;
				switchclass: _FUNCTION(function (arrclass = this.this.this.this.class) {
					const c = this.copy(ID, true, arrclass)
					this.this.this = c.this
					this.this.class = c.class
					return this.this
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
					const x = this.copied("slice", [next(endindex)], undefined)
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
								next(x.object())
								next(this)
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
								next(array)
							},
							undefined,
							alinative.function.const(
								(x) =>
									x.object().class.template.isEnd(x.object()) ||
									array.class.template.isEnd(array)
							),
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
					return search.linear({ comparison }).function(x, this)
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
				// TODO: the usage of 'isEnd' and other 'template'-methods ought to be explicitly bound to 'this.this.this.this.class.template'
				// ? Does one not want to make this a part of the 'LastIndexArray/DeepArray' (or other particular unlimitedly-sized array models' definitions?)
				// * Possibly, make them into _FUNCTIONs;
				isEmpty: _FUNCTION(function (
					isend = this.this.this.this.class.template.isEnd.bind(
						this.this.this.this.class.template
					)
				) {
					return general.fix([this.this.this], ["currindex"], () => {
						this.begin()
						return isend(this.this)
					})
				}),
				sort: _FUNCTION(function (predicate = T) {
					this.this.this = sort
						.merge({
							predicate
						})
						.function(this.this.this).this
					return this.this
				}),
				// TODO: there must be an array-wise equality defined upon GeneralArrays; Not this. (Either not general enough or too general, possibly in-structure dependant);
				// ^ THIS IS AN AMAZING IDEA FOR A METHOD...
				// ! Unfortunately, adding it requires also the inclusion of a class-independent array-equivalence relation into the library (and this was noticed on the late stage of testing of the v1.0 version of it...); So, implementation of this goes into the v1.1 (along with the said equivalence);
				// isSorted: _FUNCTION(function (
				// 	predicate,
				// 	comparison = this.this.this.this.class.template.comparison
				// ) {
				// 	return comparison(
				// 		this.this.this,
				// 		this.copied("sort", [predicate], undefined)
				// 	)
				// }),
				includes: refactor.classes.includes,
				suchthat: refactor.classes.suchthat,
				any: refactor.classes.any,
				every: refactor.classes.every,
				forEach: refactor.classes.forEach,
				// ! Change to allow for multiple different arrays [take out the 'comparison' somewhere in a desireable fashion];
				intersection: _FUNCTION(function (
					arr = this.empty(),
					comparison = this.this.this.this.class.template.comparison
				) {
					this.this.this = alarray
						.intersection({ comparison })
						.function(this.this, arr).this
					return this.this
				}),
				permutations: _FUNCTION(function () {
					this.this.this = alarray
						.permutations({
							genarrclass: this.this.this.this.class
						})
						.function(this.this).this
					return this.this
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
					separator,
					comparison = this.this.this.this.class.template.comparison
				) {
					this.this.this = alarray
						.split({ comparison })
						.function(this.this, separator).this
					return this.this
				}),
				splitlen: _FUNCTION(function (length = this.length().get()) {
					const arrs = this.empty()
					const currarr = this.copy()
					while (greateroe(currarr.length().get(), length)) {
						arrs.pushback(
							currarr.copied("slice", [this.init(), length.previous()])
						)
						currarr.slice(length)
					}
					if (!currarr.isEmpty()) arrs.pushback(currarr)
					this.this.this = arrs.this
					return this.this
				}),
				splice: _FUNCTION(function (index = this.init(), times = this.one()) {
					const c = this.copy()
					this.this.this = c
						.slice(c.init(), index.previous())
						.concat(this.slice(index.jumpDirection(times))).this
					return this.this
				}),
				one: _FUNCTION(function () {
					return next(this.init())
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
		symbols: {
			iterator: function* () {
				for (let c = this.init(); lesser(c, this.length().get()); c = next(c))
					yield this.read(c)
			}
		},
		recursive: true,
		isthis: true
	})
})().function

export const garrayForm = classForm(GeneralArray)
export const treeForm = (parentclass = general.DEFAULT_GENARRCLASS) =>
	classForm(TreeNode(parentclass), alinative.function.index("children"))

// Counts all the array-elements within a multi-dimensional array;
export function arrElems(template = {}) {
	// ? .. Let function-related aliases like this one be repositioned into the 'expressions.mjs' codefile;
	return (x) =>
		(
			(a, b) => (y) =>
				a(y).difference(b(y))
		)(...[totalElems, nonArrElems].map((t) => t(template).function))(x)
}

// Counts all non-array elements within a multidimensional array passed... [recursively so]
export function nonArrElems(template = {}) {
	template.form = template.form || general.DEFAULT_FORM
	return countrecursive({
		predicate: (x) => num(!is.arr(x) && !template.form.is(x)),
		...template
	})
}

// Counts all the elements within a multi-dimensional array (including the arrays themselves...)
export function totalElems(template = {}) {
	template.form = template.form || general.DEFAULT_FORM
	return countrecursive({
		predicate: (x) => num(!template.form.is(x)),
		...template
	})
}

export const MAX_ARRAY_LENGTH = VARIABLE(2 ** 32 - 1)
export const MAX_INT = VARIABLE(2 ** 53 - 1)

export const MAX_STRING_LENGTH = MAX_INT

export const garrays = {
	LastIndexArray(template = {}, garrtemplate = {}) {
		const T = {
			icclass: general.DEFAULT_ICCLASS,
			maxarrlen: MAX_ARRAY_LENGTH.get,
			filling: null,
			...template,
			bound: function (i) {
				return i < this.maxarrlen - 1
			},
			...template
		}
		return GeneralArray({
			this: { template: T },
			elem: function (
				arrobj,
				array = arrobj.array,
				pointer = false,
				beginningobj = arrobj.init(),
				beginningind = 0
			) {
				let currarr = array
				let ic = beginningobj
				let index = beginningind
				let isReturn = [false, index]
				for (; lesser(ic, arrobj.currindex); ic = next(ic)) {
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
				return isReturn[0]
					? pointer
						? [isReturn[1], currarr, index, ic]
						: undefined
					: !pointer
					? currarr[index]
					: [currarr, index]
			},
			newvalue: function (array, value) {
				let pointer = this.elem(array, undefined, true)
				while (oldCompare(pointer[0], null)) {
					pointer[1][pointer[2]] = (is.udef(pointer[0]) ? (x) => [x] : id)(
						this.this.template.filling
					)
					pointer = this.elem(array, pointer[1], true, pointer[3], pointer[2])
				}
				return (pointer[0][pointer[1]] = value)
			},
			isEnd: function (array) {
				const pointer = this.elem(array, undefined, true)
				return !pointer[0] || !(pointer[1] in pointer[0])
			},
			icclass: T.icclass,
			...garrtemplate
		})
	}
}

general.DEFAULT_GENARRCLASS = garrays.LastIndexArray()

export const countrecursive = TEMPLATE({
	defaults: {
		// ^ IDEA [for an application of a refactoring technique]: create such 'DEFAULT' template-variable values for every single one recurring element of the library, so that different pieces may use them (not only classes, but items like forms, predicates and so on...)
		form: general.DEFAULT_FORM,
		icclass: general.DEFAULT_ICCLASS,
		genarrclass: general.DEFAULT_GENARRCLASS
	},
	function: _FUNCTION(function (something = this.template.form.new()) {
		// console.log("\n?")
		// console.log(something)
		// console.log(this.template.form.is(something))
		// console.log(this.template.predicate(something))
		if (this.template.form.is(something)) {
			// console.log("\n!!")
			// console.log(
			// 	this.template.form.flatmap(something, (x) => this.template.form.is(x))
			// )
			// console.log(
			// 	(() => {
			// 		// ! AGAIN! The need for 'GeneralArray.static.fromForm' method...; Also - FORM-CONVERSION!!!;
			// 		const garr = this.template.genarrclass.class()
			// 		for (const x of this.template.form.index(
			// 			this.template.form.flatmap(something, this.function)
			// 		))
			// 			garr.pushback(x)
			// 		return garr
			// 	})().array.map((x) => x.value)
			// )
			// console.log("SIEGBRAU!")
		}
		const t = alinative.number
			.fromNumber({ icclass: this.template.icclass })
			.function(this.template.predicate(something))
			.jumpDirection(
				this.template.form.is(something)
					? uevaluate().function(
							Expression(
								"jumpDirection",
								this.template.genarrclass.class(),
								(() => {
									// ! AGAIN! The need for 'GeneralArray.static.fromForm' method...; Also - FORM-CONVERSION!!!;
									const garr = this.template.genarrclass.class()
									for (const x of this.template.form.index(
										this.template.form.flatmap(
											something,
											this.function
										)
									))
										garr.pushback(x)
									return garr
								})()
							)
					  )
					: this.template.icclass.static.zero()
			)
		// console.log("RETURNED!")
		// console.log(t.value)
		return t
	})
}).function

alarray.permutations = TEMPLATE({
	defaults: {
		genarrclass: general.DEFAULT_GENARRCLASS
	},
	// ? In cases such as these (when there are 2 or more ways of doing exactly the same thing) - ought '.static.empty()' or '.class()' be called?
	function: _FUNCTION(function (array = this.template.genarrclass.static.empty()) {
		if (equal(array.one(), array.length().get()))
			return this.template.genarrclass.static.fromArray([array.copy()])

		const pprev = this.function(
			array.copied("slice", [array.init(), array.finish().previous()])
		)
		const l = array.end(false)
		const pnext = this.template.genarrclass.static.empty()

		for (const i of pprev.keys())
			for (
				let j = pprev.init();
				lesseroe(j, pprev.read(i).length().get());
				j = next(j)
			)
				pnext.pushback(pprev.read(i).copied("insert", [j, l]))

		return pnext
	})
}).function
alarray.generate = TEMPLATE({
	defaults: {
		icclass: general.DEFAULT_ICCLASS,
		genarrclass: general.DEFAULT_GENARRCLASS,
		ic: false
	},
	function: _FUNCTION(function (
		start = this.template.icclass.static.one(),
		end = this.template.icclass.static.one(),
		step = this.template.icclass.static.one()
	) {
		if (refCompare(arguments.length, 1)) {
			end = start
			start = this.template.icclass.static.one()
		}
		const generated = this.template.genarrclass.static.empty()
		const proposition = (
			(f) => (i) =>
				f(i, end)
		)(step.direction() ? lesseroe : greateroe)
		const wrap = this.template.ic ? ID : alinative.function.index("value")
		for (let i = start; proposition(i); i = i.jumpDirection(step))
			generated.pushback(wrap(i))
		return generated
	})
}).function
alarray.concat = TEMPLATE({
	defaults: {
		genarrclass: general.DEFAULT_GENARRCLASS
	},
	function: _FUNCTION(function (arrays = this.template.genarrclass.static.empty()) {
		if (arrays.isEmpty()) return arrays.empty()
		if (arrays.length().get().equal(arrays.one())) return arrays.read()
		if (arrays.length().get().equal(arrays.two()))
			return arrays.read().concat(arrays.read(arrays.one()))
		// ? refactor using repeatedApplication?
		let r = arrays.read()
		for (const x of arrays.copied("slice", [arrays.one()]))
			r = this.function(this.template.genarrclass.static.fromArray([r, x]))
		return r
	})
}).function
alarray.isSub = TEMPLATE({
	// ! Refactor also the usage of the 'defaults' like here - give the commonly appearing objects names and then, copy them each time {...DefaultsName};
	defaults: {
		genarrclass: general.DEFAULT_GENARRCLASS,
		comparison: general.DEFAULT_COMPARISON
	},
	function: _FUNCTION(function (
		arrsub = this.template.genarrclass.static.empty(),
		arr = this.template.genarrclass.static.empty()
	) {
		for (const x of arrsub)
			if (!arr.any((y) => this.template.comparison(x, y))) return false
		return true
	})
}).function

// ? Suggestion: connect the constructed orders with domains on which they are defined by the user? Generally, create a type of Order?
export const linear = TEMPLATE({
	defaults: {
		reflexive: true,
		genarrclass: general.DEFAULT_GENARRCLASS
	},
	function: _FUNCTION(function (
		array = this.template.genarrclass.static.empty(),
		reflexive = this.template.reflexive
	) {
		// ^ NOTE: these can be easily generalized...
		const f = reflexive ? lesseroe : lesser
		return (a, b) => f(...[a, b].map((x) => array.firstIndex(x)))
	})
}).function

// "fixes" a linear order, by means of excluding all the repeating elements from it...
// ? DOESN'T THIS JUST GET RID OF REPETITIONS??? [pray consider, whether to do something about it - ensureSet, fixLinear and algorithms.array.norepetitions seem all to do the exactly same thing, even though for different purposes...];
// ^ IDEA: a method for deleting (n>1)th appearences of any item (either particularly given, or arbitrary belonging to the initial structure) in forms (generalization of the 'ensureSet' in regard to recursive structures);
// * Currently, in plans, to generalize the 'norepetions' to include ensureSet and fixLinear, then re-do those as aliases of 'norepetitions'...
export const fixLinear = TEMPLATE({
	defaults: {
		genarrclass: general.DEFAULT_GENARRCLASS
	},
	function: _FUNCTION(function (array = this.template.genarrclass.static.empty()) {
		const copy = array.copy()
		for (let i = copy.init(); lesser(i, copy.length().get()); i = next(i)) {
			const x = copy.copied("slice", [next(i)])
			while (x.includes(copy.read(i)))
				copy.slice(undefined, i).concat(x.delval(copy.read(i)))
		}
		return copy
	})
}).function

// ? check if this describes all possible nonlinear relationships on Z! If not, add more stuff to the 'orders' module...;
export const nonlinear = TEMPLATE({
	defaults: {
		reflexive: true,
		genarrclass: general.DEFAULT_GENARRCLASS
	},
	function: _FUNCTION(function (
		array = this.template.genarrclass.static.empty(),
		reflexive = this.template.reflexive
	) {
		const f = reflexive ? lesseroe : lesser
		return (a, b) => {
			const binds = array.indexesOf(b)
			return array.indexesOf(a).every((x) => binds.every((y) => f(x, y)))
		}
	})
}).function

// ! ISSUEEEEEE: this doesn't work with native JS arrays yet it is called with them. WHAT-TO-DO? WHAT-USAGE-WAS-EVEN-INTENDED? [idea 1 for resolution: use the 'CommonArray()' as the target form for the present special case of the recursiveCounter... instead...];
export const most = TEMPLATE({
	defaults: {
		genarrclass: general.DEFAULT_GENARRCLASS,
		comparison: general.DEFAULT_COMPARISON
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
export function ofromIcc(icclass = general.DEFAULT_ICCLASS, reflexive = true) {
	const f = reflexive ? lesseroe : lesser
	return (x, y) => f(icclass.class(x), icclass.class(y))
}

export const dim = TEMPLATE({
	defaults: {
		icclass: general.DEFAULT_ICCLASS,
		genarrclass: general.DEFAULT_GENARRCLASS,
		form: general.DEFAULT_FORM
	},
	function: _FUNCTION(function (recarr = this.template.form.new()) {
		if (this.template.form.is(recarr)) {
			const copied = this.template.form.copy(recarr, this.function)
			const togarr = this.template.genarrclass.static.empty()

			// ! Create a GeneralArray method - fromForm (generalization of this...);
			// * Note: the need to use the 'GeneralArray' PARTICULARLY arises due to the presence of knowledge that this is, indeed, GeneralArray-specific. (that being, that one would not need another form...); Here, desire for code repetition is shown semantically...;
			for (const x of this.template.form.keys(copied))
				togarr.pushback(this.template.form.read(copied, x))

			return this.template.icclass.static
				.one()
				.jumpDirection(max(this.template).function(togarr))
		}
		return this.template.icclass.static.zero()
	})
}).function

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
			// TODO: extend the '.soughtProp' to allow for working with the index 'i.currelem().get()';
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
			comparison: general.DEFAULT_COMPARISON,
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
	}).function
})

export const findDeepLast = _FUNCTION(function (template = {}) {
	return generalSearch({
		reversed: true,
		...template
	}).function
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
			this.template.form.read(x, fields.read(i))
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
				object,
				fields.copied("slice", [fields.init(), fields.finish().previous()])
			)
			this.template.form.write(indexed, fields.read(fields.finish()))
		}
		return object
	})
}).function

export const repeatedApplication = TEMPLATE({
	defaults: { iter: next, icclass: general.DEFAULT_ICCLASS },
	function: _FUNCTION(function (
		initial = this.template.initial,
		times = this.template.times,
		f = this.template.f,
		offset = this.template.icclass.class(),
		iter = this.template.iter
	) {
		let r = initial
		for (let i = this.template.icclass.class(); lesser(i, times); i = iter(i))
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
	const daform = constForm(
		"TOKEN",
		"arr",
		1,
		[],
		(x, f = ID) => x.map(f),
		(x, i = 0) => x[i],
		(x, i, v) => (x[i] = v),
		naarray.keys,
		alinative.function.const(0)
	)
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
		// ? [old todo...] make defaults for the 'newvalue' work here, pray... (so that the user can 'initialize' the index without actually assigning an 'acceptable' value to it...);
		newvalue: function (array, value) {
			let e = this.elem(array, true)
			if (oldCompare(e[0], undefined)) {
				if (refCompare(e[0], null)) {
					const flayer = findDeepUnfilledArr({ form: daform })()(array.array)
					if (flayer) {
						// ? repeatedApplication refactoring?
						// ? General refactoring of these kinds of operations (namely - finding the multiindex of the first unfilled flat array in a recursive array, then getting access to it?);
						let p = array.array
						for (const x of flayer) p = daform.read(p, x)
						const indexed = daform.index(p)
						indexed[indexed.length] = value
						return value
					}
				}
				for (const y of e[1].previous()) {
					general.fix([array], ["currindex"], () => {
						array.currindex = array.currindex.jumpReverse(
							e[1].previous().jumpReverse(y)
						)
						this.newvalue(array, this.this.template.filling)
					})
				}
			}
			return daform.write(e[0], e[1], value)
		},
		elem: function (array, pointer = false) {
			const T = this
			// ? Take this out of the local context? [Decompose, generalize? Pray consider...]
			function walkDeep(
				currarray,
				fi = 0,
				i = T.this.template.icclass.static.zero(),
				endind = T.this.template.icclass.static.zero(),
				fis = T.this.template.genarrclass.static.empty()
			) {
				let farr = currarray
				let isEmergency = false
				if (!daform.is(daform.read(farr, fi)))
					return [fi, next(i), farr, isEmergency]
				for (const t of daform.keys(daform.read(currarray, fi))) {
					if (greateroe(i, endind)) {
						isEmergency = true
						break
					}
					;[fi, i, farr, isEmergency] = walkDeep(
						daform.read(currarray, fis.read(fis.finish())),
						fi,
						i,
						fis.copied("pushback", [t])
					)
					if (isEmergency) break
					++fi
					i = next(i)
				}
				return [fi, i, farr, isEmergency]
			}
			let i = array.init()
			let fi = 0
			let currarray = array.array
			let isem = false
			for (; lesser(i, array.currindex); ++fi) {
				isem = false
				// ! [general] Create aliases for ALL standard native JS operations (both binary and unary...);
				if (fi < daform.index(currarray).length) {
					;[fi, i, currarray, isem] = walkDeep(
						currarray,
						fi,
						i,
						array.currindex
					)
					if (isem) {
						const rx = array.currindex.difference(i)
						return pointer
							? [rx.equal(array.one()) ? null : undefined, rx]
							: undefined
					}
				}
			}
			return pointer ? [currarray, fi] : daform.read(currarray, fi)
		},
		isEnd: function (array) {
			return oldCompare(this.elem(array), undefined)
		},
		icclass: X.template.icclass,
		...garrtemplate
	})
}

garrays.CommonArray = function (template = {}, garrtemplate = {}) {
	// ? Generalize the 'InfiniteCounter' class used here ? [Or, at least, refactor? Repeated usage of InfiniteCounter(addnumber()) all over...];
	// ^ generally - alias the combinations of 'InfiniteCounter(someCounterf(...))' for the library functions?
	const T = { offset: 0, ...template }
	return GeneralArray({
		this: { template: T },
		newvalue: function (arr, value) {
			return (arr.array[
				arr.currindex.map(InfiniteCounter(addnumber(this.this.template))).value
			] = value)
		},
		elem: function (arr) {
			return arr.array[
				arr.currindex.map(InfiniteCounter(addnumber(this.this.template))).value
			]
		},
		isEnd: function (arr) {
			return (
				arr.array.length <=
				arr.currindex.map(InfiniteCounter(addnumber(this.this.template))).value
			)
		},
		icclass: InfiniteCounter(addnumber(T)),
		...garrtemplate
	})
}

// ! In future versions of the library - will get generalized (and abolished in current form);
// * This thing will allow to create function-based types on top of an Array;
// Usage Example 1: use the 'typefunction' as a mean of identifying if the 'type' of the thing is right, with 'typefail' defined as a result of .newval(+typeconversion);
// Usage Example 2: in 'typefail', throw an Exception, whilst in typefunction, do whatever it is one desires to do with the pre-checking of elements' properties;
garrays.TypedArray = CLASS({
	defaults: {
		empty: [],
		typefunction: TRUTH,
		typefail: (x) => {
			throw x
		}
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

// ^ IDEA: use 'UnlimitedSets' instead of the 'GeneralArrays' as models for keys; That'll enable one to be certain that there's no space 'wasted' on unavailable keys (+ it's clenaer from design perspective);
// * Make a note of this somewhere - the current API ALREADY ALLOWS FOR IT [theoretically]! The only possible issues may be related to the templates' shape (and the things used from there...);
export const UnlimitedMap = (parentclass = general.DEFAULT_GENARRCLASS) => {
	const sh1 = (key, _this, f, args = [], name = "keys") => {
		const ind = _this.this.this[name].firstIndex(key)
		if (refCompare(ind, _this.this.this[name].class.template.unfound))
			return _this.this.this.this.class.template.unfound
		return f(ind, ...args)
	}
	const [TT, II] = [T, ID].map((f) =>
		alarray.native.generate(2).map(alinative.function.const(f))
	)
	const NAMESLIST = ["keys", "values"]
	return EXTENSION(parentclass, {
		defaults: {
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
				const tres = sh1(key, this, this.this.this.values.write, [value])
				if (refCompare(tres, this.this.this.this.class.template.unfound)) {
					this.this.this.keys.pushback(key)
					this.this.this.values.pushback(value)
				}
				return this.this
			}),
			deleteKey: _FUNCTION(function (key = this.this.this.keys.read()) {
				sh1(key, this, this.this.this.values.delete)
				sh1(key, this, this.this.this.keys.delete)
				return this.this
			}),
			deleteValues: _FUNCTION(function (
				values = this.this.this.class.parentclass.static.empty()
			) {
				for (const v of values)
					NAMESLIST.forEach((name) =>
						this.this.this[name].multcall(
							"delete",
							this.this.this.values.indexesOf(v)
						)
					)
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
			copy: _FUNCTION(function (f = II, isclass = false, template) {
				return this.this.this.this.class.class(
					...NAMESLIST.map(
						(name, i) =>
							this.this.this[name].copy(f[i], isclass, template).array
					)
				)
			}),
			copied: refactor.classes.copied(),
			map: _FUNCTION(function (f = II, isclass = false, template) {
				this.this.this = this.copy(f, isclass, template).this
				return this.this
			}),
			deleteKeys: _FUNCTION(function (
				keys = this.this.this.this.class.parentclass.static.empty()
			) {
				for (const k of keys)
					NAMESLIST.reverse().forEach((name) =>
						this.this.this[name].multcall(
							"delete",
							this.this.this.keys.indexesOf(k)
						)
					)
				return this.this
			}),
			multcall: refactor.classes.multcall,
			// ? Such a pair (n-tuple) of items (here, predicates) ought to be given their own type, maybe?
			every: _FUNCTION(function (predicates = TT) {
				return this.this.this.keys.every(
					(key, keyind) =>
						predicates[0](key) &&
						predicates[1](this.this.this.values.read(keyind))
				)
			}),
			any: _FUNCTION(function (predicates = TT) {
				return this.this.this.keys.any(
					(key, keyind) =>
						predicates[0](key) &&
						predicates[1](this.this.this.values.read(keyind))
				)
			})
		},
		symbols: {
			iterator: function* () {
				for (const x of this.this.this.keys) yield [x, this.read(x)]
			}
		},
		static: (() => {
			const R = {}

			R.fromObject = _FUNCTION(function (object = {}, finite = true) {
				return this.this.class(
					...DEOBJECT(object).map(
						finite
							? (x) => this.this.parentclass.static.fromArray(x).array
							: ID
					)
				)
			}).bind(R)

			R.empty = _FUNCTION(function () {
				return this.fromObject()
			}).bind(R)

			return R
		})(),
		transform: general.StaticThisTransform,
		recursive: true,
		names: NAMESLIST
	})
}

// ^ NOTE: in v1.1, many of this thing's aspects are to be reconsidered...; [Namely, the way that writing/reading is done - it always prepends a '' in the internal string representation - can unnecessarily increase the internal array's length (and hence, affect performance noticeably..)];
export const UnlimitedString = (parent = general.DEFAULT_GENARRCLASS) => {
	return EXTENSION(parent, {
		defaults: {
			// ! UTILIZE IT PROPERLY! FOR NOW - ONLY LIMITED USE...;
			comparison: refCompare,
			tintclass: general.DEFAULT_TINTCLASS,
			unfound: undefined,
			basestr: " "
		},
		properties: {
			currindex: function (_ustrarr, index = 0) {
				return index
			}
		},
		// ? Refactor the 'methods' with 'OBJECT(...(methods' names), ...(methods' list).map(_FUNCTION))'?
		methods: {
			split: _FUNCTION(function (useparator = "") {
				if (is.str(useparator))
					return this.split(
						this.this.this.this.class.static.fromString(useparator)
					)
				if (useparator.isEmpty()) return this.copied("symbolic", []).genarr
				const _this = this.copy()
				const sliceIndexes = this.this.this.this.indexesOf(useparator)
				const strarr = this.this.this.this.class.parentclass.static.empty()
				let pind = this.init()
				for (const ind of sliceIndexes) {
					const copySlice = _this.copied("slice", [pind, ind])
					strarr.pushback(copySlice)
					_this.slice([ind])
					pind = ind
				}
				strarr.pushback(_this)
				return strarr
			}),
			empty: refactor.classes.empty,
			// * Note: this transformation is the reverse of the thing that all the functions working with the data of the string must perform upon the indexes passed by the user...
			tototalindex: _FUNCTION(function (
				ind = this.this.this.genarr.currindex,
				subind = this.this.this.currindex
			) {
				let final = this.init()
				for (const x of this.this.this.genarr
					.copied("slice", [this.init(), previous(ind)])
					.keys())
					final = final.jumpDirection(
						alinative.number
							.fromNumber({ icclass: final.class })
							.function(
								((a) =>
									is.udef(a)
										? alinative.function.const(1)()
										: alinative.function.index("length")(a))(
									this.this.this.genarr.read(x)
								)
							)
					)
				return final.jumpDirection(alinative.number.fromNumber().function(subind))
			}),
			finish: refactor.classes.finish,
			go: _FUNCTION(function (index = this.init()) {
				const nind = this.fromtotalindex(index)
				this.this.this.genarr.currindex = nind[0]
				this.this.this.currindex = nind[1]
				return this.this
			}),
			fromtotalindex: _FUNCTION(function (index = this.init()) {
				let present = this.init()
				let inarrind = this.init()
				let currstrlen = this.init()
				for (const x of this.this.this.genarr.copy((str) =>
					alinative.number.fromNumber().function(str.length)
				)) {
					inarrind = next(inarrind)
					currstrlen = x
					present = present.jumpDirection(x)
					if (greateroe(present, index)) break
				}
				const isnewstrbeg = !equal(index, present)
				return [
					(isnewstrbeg ? previous : ID)(inarrind),
					isnewstrbeg
						? currstrlen.map(InfiniteCounter(addnumber())).value -
						  present.difference(index).map(
								// ? make an alias for that thing (generally, so that there is a way for shorthand of an reverse-conversion...);
								InfiniteCounter(addnumber())
						  ).value
						: 0
				]
			}),
			begin: refactor.classes.begin,
			end: refactor.classes.end,
			slice: _FUNCTION(function (
				beginning = this.init(),
				end = this.finish(),
				orderly = false
			) {
				return general.fix(
					[this.this.this, this.this.this.genarr],
					alarray.native.generate(2).map(alinative.function.const("currindex")),
					() => {
						const newstr = this.this.this.this.class.class()
						this.go(beginning)
						for (; lesseroe(this.tototalindex(), end); next(this)) {
							// ? This 'auto-optimization' gets rid of the internal "", when slicing the string (improves future speed overall, and so forth), but is it really desired? Consider, pray...;
							const ce = this.currelem().get()
							if (ce) newstr.pushback(ce)
						}
						this.this.this = (orderly ? (x) => x.order() : ID)(newstr).this
						return this.this
					}
				)
			}),
			read: _FUNCTION(function (index = this.init()) {
				return general.fix(
					[this.this.this.genarr, this.this.this],
					alarray.native.generate(2).map(alinative.function.const("currindex")),
					() => this.go(index).currelem().get()
				)
			}),
			write: _FUNCTION(function (index, value) {
				return general.fix(
					[this.this.this.genarr, this.this.this],
					alarray.native.generate(2).map(alinative.function.const("currindex")),
					() => {
						this.go(index)
						this.currelem().set(value)
						return this.this
					}
				)
			}),
			concat: _FUNCTION(function (
				ustring = this.this.this.this.class.static.empty()
			) {
				if (is.str(ustring)) this.pushback(ustring)
				else this.this.this.genarr.concat(ustring.genarr)
				return this.this
			}),
			currelem: _FUNCTION(function () {
				return {
					get: () => {
						const tres = this.this.this.genarr.currelem().get()
						// TODO: generalize this construction throughout, pray... - type-defaulting (allowing "undefined" operations upon a certain type, by means of replacing them with an ID/other-function);
						return (
							!is.str(tres)
								? alinative.function.const(udef)
								: (x) => tres[x]
						)(this.this.this.currindex)
					},
					set: (char) => {
						return this.this.this.genarr
							.currelem()
							.set(
								string.replace.sreplaceIndex(
									this.this.this.genarr.currelem().get(),
									this.this.this.currindex,
									char
								)
							)
					}
				}
			}),
			// ! PROBLEM: THE OUT-OF-BOUND CASES ARE NOT DEFINED GENERALLY!
			// * Here, one will use the 'undefined' for it (due to the obvious type discrepancy, it makes great sense), but typically - the 'missing' value for indexation IS NOT GENERALIZED (add in the v1.1);
			// * And something like 'unfound' CANNOT BE USED due to the matter of difference between purposes of the two constants (the 'missing' one is a value, while 'unfound' is an index...);
			next: _FUNCTION(function () {
				if (is.str(this.this.this.genarr.currelem().get())) {
					if (!this.this.this.genarr.currelem().get().length) {
						while (!this.this.this.genarr.currelem().get().length) {
							next(this.this.this.genarr)
							this.this.this.currindex = 0
						}
						return this.this.this.genarr.currelem().get()[
							this.this.this.currindex
						]
					}
					if (
						this.this.this.genarr.currelem().get().length >
						this.this.this.currindex
					)
						return this.this.this.genarr.currelem().get()[
							++this.this.this.currindex
						]
				}
				next(this.this.this.genarr)
				// ^ NOTE: IF ONE HAS THE 'MISSING VALUE' OF THE GENERAL-ARRAY CLASS TO BE A NATIVE JS STRING, THEN THE FUNCTION WOULD WORK WITH IT AS-IS! (Return the result in terms of the value for the missing string!);
				const tres = this.this.this.genarr.currelem().get()
				return (
					!is.str(tres) ? alinative.function.const(udef) : (x) => tres[x]
				)((this.this.this.currindex = 0))
			}),
			previous: _FUNCTION(function () {
				if (is.str(this.this.this.genarr.currelem().get())) {
					if (!this.this.this.genarr.currelem().get().length) {
						while (!this.this.this.genarr.currelem().get().length) {
							previous(this.this.this.genarr)
							this.this.this.currindex =
								this.this.this.genarr.currelem().get().length - 1
						}
						return this.this.this.genarr.currelem().get()[
							this.this.this.currindex
						]
					}
					if (this.this.this.currindex > 0)
						return this.this.this.genarr.currelem().get()[
							--this.this.this.currindex
						]
				}
				this.this.this.genarr.previous()
				return this.this.this.genarr
					.currelem()
					.get()[(this.this.this.currindex = this.this.this.genarr.currelem().get().length - 1)]
			}),
			length: _FUNCTION(function () {
				return {
					get: () => {
						if (this.this.this.genarr.isEmpty()) return this.init()
						return this.tototalindex(
							this.this.this.genarr.length().get().difference(this.one()),
							this.this.this.genarr.read(this.this.this.genarr.finish())
								.length
						)
					},
					set: (
						newlen,
						basestr = this.this.this.this.class.template.basestr[0]
					) => {
						if (greateroe(newlen, this.length().get())) {
							newlen
								.difference(this.length().get())
								.loop(() => this.pushback(basestr))
							return this.this
						}

						return this.slice(this.init(), newlen.previous())
					}
				}
			}),
			copied: refactor.classes.copied(),
			insert: _FUNCTION(function (
				index = this.init(),
				value = this.this.this.this.class.template.basestr
			) {
				this.this.this = this.copied("slice", [this.init(), index.previous()])
					.concat(value)
					.concat(this.copied("slice", [index])).this
				return this.this
			}),
			// ? Was appearing somewhere already? (refactoring?);
			remove: _FUNCTION(function (index = this.init()) {
				this.this.this = this.copied("slice", [
					this.init(),
					index.previous()
				]).concat(this.slice(index.next())).this
				return this.this
			}),
			join: _FUNCTION(function (
				separator = this.this.this.this.class.template.basestr,
				frequency = alinative.function.const(
					this.this.this.this.class.template.tintclass.static.one()
				),
				order = false
			) {
				const r = this.this.this.genarr.empty()
				let inserted = this.init()
				let cfreq = frequency(inserted)
				for (let i = this.init(); lesser(i, this.length().get()); i = next(i)) {
					r.pushback(this.read(i))
					if (
						this.this.this.this.class.template.tintclass.static
							.fromCounter(next(i))
							.modulo(cfreq)
							.equal(
								this.this.this.this.class.template.tintclass.static.zero()
							)
					) {
						r.pushback(separator)
						inserted = next(inserted)
						cfreq = frequency(inserted)
					}
				}
				this.this.this = (order ? (x) => x.order() : ID)(
					this.this.this.this.class.class(r.array)
				).this
				return this.this
			}),
			reverse: _FUNCTION(function () {
				this.this.this.genarr.reverse()
				// ! THIS IS 'native.string.reverse()' here... (refactoring);
				for (const x of this.this.this.genarr.keys())
					this.this.this.genarr.write(
						x,
						this.this.this.genarr.read(x).split("").reverse().join("")
					)
				return this.this
			}),
			map: _FUNCTION(function (f = ID) {
				this.this.this = this.copy(f).this
				return this.this
			}),
			copy: _FUNCTION(function (f = ID) {
				return general.fix(
					[this.this.this, this.this.this.genarr],
					alarray.native.generate(2).map(alinative.function.const("currindex")),
					() => {
						this.go(this.init())
						const emptystr = this.this.this.this.class.static.empty()
						for (const k of this.keys())
							emptystr.write(k, f(this.read(k), k, this))
						return emptystr
					}
				)
			}),
			// ? Make a GeneralArray out of it instead?
			keys: function* () {
				for (
					let curr = this.init();
					lesser(curr, this.length().get());
					curr = next(curr)
				)
					yield curr
			},
			isEmpty: _FUNCTION(function () {
				for (const x of this.this.this.genarr)
					if (!refCompare(x, "")) return false
				return true
			}),
			sort: _FUNCTION(function (predicate = T) {
				this.this.this = this.this.this.this.class.class(
					this.split("").sort(predicate).array
				).this
				return this.this
			}),
			// * Note: the complexity of answering the question of whether the thing in question is sorted is THE SAME as performing the sorting itself. So, it's only useful if you need to keep the array in question UNCHANGED by the sorting!
			// ! TAKING OUT (for the same reasons as the GeneralArray version...);
			// isSorted: _FUNCTION(function (
			// 	predicate,
			// 	comparison = this.this.this.this.class.parentclass.comparison
			// ) {
			// 	return comparison(this.copied("sort", [predicate]), this.this.this)
			// }),
			// ? Unoptimized algortihm? Look for fixes, if any...;
			indexesOf: _FUNCTION(function (
				ustring = this.this.this.this.class.template.basestr,
				halt = false,
				haltAfter = Infinity
			) {
				if (is.str(ustring))
					return this.indexesOf(
						this.this.this.this.class.static.fromString(ustring),
						halt,
						haltAfter
					)
				if (this.this.this.this.class.is(ustring)) {
					const indexes = this.this.this.this.class.parentclass.class()
					// ? NOTE: (partially) the same code as in the 'split'; (Possibly) If it's really the same, and can be refactored elegantly - do that...;
					let currcounter = this.init()
					let hasBroken = false
					const first = ustring.read()
					while (lesser(currcounter, this.length().get())) {
						if (!refCompare(this.read(currcounter), first)) {
							currcounter = next(currcounter)
							continue
						}
						let backupcounter = this.init()
						while (!backupcounter.equal(ustring.length().get())) {
							if (
								this.read(currcounter.jumpDirection(backupcounter)) !=
								ustring.read(backupcounter)
							) {
								hasBroken = true
								break
							}
							backupcounter = next(backupcounter)
						}
						if (!hasBroken) {
							indexes.pushback(currcounter)
							currcounter = currcounter.jumpDirection(backupcounter)
							if (halt && greateroe(indexes.length().get(), haltAfter))
								break
						}
						hasBroken = false
						currcounter = next(currcounter)
					}
					return indexes
				}
			}),
			firstIndex: _FUNCTION(function (ustring = "") {
				const indexes = this.indexesOf(ustring, true, this.one())
				if (greateroe(indexes.length().get(), this.init())) return indexes.read()
				return this.this.this.this.class.template.unfound
			}),
			includes: refactor.classes.includes,
			// Shall change the entirety of the UnlimitedString's order in such a way, so as to maximize the sizes of the finite Strings that compose the UnlimitedString;
			// * Most memory- and that-from-the-standpoint-of-execution, efficient option;
			// ! Due to memory- and time- concerns, this does not get a (proper) test - checked for 'UnlimitedString s: s.length > MAX_STRING_LENGTH' only in >=v1.1;
			order: _FUNCTION(function () {
				const newstr = this.empty()
				let bigind = this.init()
				let smallind = 0
				for (const x of this) {
					if (refCompare(smallind, MAX_STRING_LENGTH)) {
						bigind = next(bigind)
						smallind = 0
						newstr.pushback("")
					}
					newstr.write(bigind, this.read(bigind) + x)
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
				if (is.str(ustring)) {
					this.this.this.genarr.pushback(ustring)
					return this.this
				}
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
			suchthat: refactor.classes.suchthat,
			any: refactor.classes.any,
			every: refactor.classes.every,
			forEach: refactor.classes.forEach,
			multcall: refactor.classes.multcall
		},
		symbols: {
			iterator: function* () {
				for (const str of this.this.this.genarr) for (const sym of str) yield sym
			}
		},
		static: (() => {
			const R = {}

			R.fromString = _FUNCTION(function (str = "") {
				return this.this.class(
					this.this.parentclass.static.fromArray([str]).array
				)
			}).bind(R)
			R.empty = _FUNCTION(function () {
				return this.fromString()
			}).bind(R)

			return R
		})(),
		transform: general.StaticThisTransform,
		recursive: true,
		names: ["genarr"]
	})
}

general.DEFAULT_USTRCLASS = UnlimitedString()

export const tnumbers = {
	TrueInteger: function (parentclass = general.DEFAULT_ICCLASS) {
		return EXTENSION(parentclass, {
			methods: {
				add: _FUNCTION(function (added = this.one()) {
					return this.this.this.this.class.class(
						this.this.this.value.jumpDirection(added.value).value
					)
				}),
				multiply: _FUNCTION(function (multiplied = this.one()) {
					return multiplied.value.class.static.whileloop(
						multiplied.value,
						(_i, x) =>
							x[multiplied.sign() ? "add" : "difference"](this.this.this),
						multiplied.class.parentclass.class(),
						multiplied.sign() ? next : previous,
						undefined,
						this.zero()
					)
				}),
				// * Raise 'this.this.this' to the integer power of 'x' (works with negatives too...);
				power: _FUNCTION(function (x = this.one()) {
					if (!x.sign()) return this.power(x.invadd()).invmult()
					return repeatedApplication({
						icclass: this.this.this.this.class.parentclass
					}).function(this.one(), x.value, (y) => y.multiply(this.this))
				}),
				// * Note: not quite sure one is happy with this particular chosen 'mod' definition; The output sign depends directly on that of the input, while oneself would (instead) have it map into the {1, ..., n} set of positive integers REGARDLESS of signs...
				modulo: _FUNCTION(function (d = this.one()) {
					if (this.sign() != d.sign()) return this.modulo(d.invadd())
					let curr = this.zero()
					const absval = this.abs()
					const dabs = d.abs()
					while (lesseroe((curr = curr.add(dabs)), absval)) {}
					return d.difference(
						(!this.sign() ? (x) => x.invadd() : ID)(curr.difference(absval))
					)
				}),
				// * Returns the additive inverse
				invadd: _FUNCTION(function () {
					return this.this.this.this.class.class(
						this.this.this.value.reverse().value
					)
				}),
				abs: _FUNCTION(function () {
					return this.sign() ? this.copy() : this.invadd()
				}),
				// * Returns the multiplicative inverse (TrueRatio type);
				invmult: _FUNCTION(function () {
					return tnumbers
						.TrueRatio(this.this.this.this.class)
						.class(...[this.one(), this.this].map((x) => x.value.value))
				}),
				compare: _FUNCTION(function (compared = this.zero()) {
					return this.this.this.value.compare(compared.value)
				}),
				difference: _FUNCTION(function (d = this.one()) {
					return this.add(d.invadd())
				}),
				// ? Generalize the 'divide' and 'roots'-kinds of methods to a uniform template-method 'inverse'? [GREAT IDEA! Where to put the method?]
				divide: _FUNCTION(function (d = this.one()) {
					if (!this.sign()) return this.invadd().divide(d).invadd()
					if (!d.sign()) return this.divide(d.invadd()).invadd()
					let r = this.zero()
					let copy = this.copy()
					while (greateroe(copy, d)) {
						copy = copy.difference(d)
						r = r.add()
					}
					return r
				}),
				copy: _FUNCTION(function () {
					return this.this.this.this.class.class(
						this.this.this.value.copy().value
					)
				}),
				// ! Think about generalizing methods-extensions like this one: (name) => (...x) => this[name](...x.map(alinative.function.index(name)))
				equal: _FUNCTION(function (x = this.one()) {
					return this.this.this.value.equal(x.value)
				}),
				// ! Note [currently]: THIS CANNOT FIND ROOTS OF NEGATIVES! [Because integers are not closed over them, yet the algorithm needs for it to be closed in order to have finite execution time...];
				root: _FUNCTION(function (x = this.two(), ceil = false) {
					if (!x.sign()) return this.root(x.invadd()).invmult()
					let r = this.zero()
					let temp
					while (lesser((temp = r.power(x)), this.this)) r = r.add()
					if (temp.equal(this.this) || ceil) return r
					return r.difference()
				}),
				zero: _FUNCTION(function () {
					return this.this.this.this.class.static.zero()
				}),
				one: _FUNCTION(function () {
					return this.this.this.this.class.static.one()
				}),
				two: refactor.classes.twoadd,
				sign: refactor.classes.sign
			},
			static: (() => {
				const R = {}

				R.zero = refactor.classes.zero.bind(R)
				R.one = _FUNCTION(function () {
					return this.this.class(this.this.parentclass.static.one().value)
				}).bind(R)
				R.two = refactor.classes.twoadd.bind(R)

				// ! PROBLEM [general]: the CLASS and EXTENSION do __not__ currently handle templates in the '.static' field! Pray do something about it...
				// ? Allow for '.static' extension?
				R.fromNumber = _FUNCTION(function (num = 1) {
					return this.this.class(
						alinative.number
							.iterations({
								iterated: this.this.parentclass.template
							})
							.function(num + (-1) ** (num < 0))
					)
				}).bind(R)

				R.fromCounter = _FUNCTION(function (
					ic = this.this.parentclass.static.zero()
				) {
					return tnumbers.TrueInteger(ic.class).class(ic.value)
				}).bind(R)

				return R
			})(),
			transform: general.StaticThisTransform,
			recursive: true,
			toextend: { methods: true, symbols: true },
			names: ["value"]
		})
	},
	// ? a little too too thin on the aliases?
	// ? transform the TrueIntegers to TrueRatio-s on input for methods? [allows greater compatibility between classes type-wise...];
	TrueRatio: function (parentclass = general.DEFAULT_TINTCLASS) {
		const nameslist = ["numerator", "denomenator"]
		return EXTENSION(parentclass, {
			defaults: {
				inter: cdieach,
				defaults: {
					constructor: alarray.native.generate(2).map(
						alinative.function.const(
							_FUNCTION(function () {
								return this.parentclass.static.one().value.value
							})
						)
					)
				}
			},
			methods: (() => {
				const M = {
					add: _FUNCTION(function (
						addratio = this.this.this.this.class.static.one()
					) {
						return this.this.this.this.class
							.class(
								this.this.this.numerator
									.multiply(addratio.denomenator)
									.add(
										addratio.numerator.multiply(
											this.this.this.denomenator
										)
									).value.value,
								this.this.this.denomenator.multiply(addratio.denomenator)
									.value.value
							)
							.simplify()
					}),
					multiply: _FUNCTION(function (
						multratio = this.this.this.class.static.one()
					) {
						return this.this.this.this.class
							.class(
								...nameslist.map(
									(name) =>
										this.this.this[name].multiply(multratio[name])
											.value.value
								)
							)
							.simplify()
					}),
					invadd: _FUNCTION(function () {
						return this.this.this.this.class.class(
							this.this.this.numerator.invadd().value.value,
							this.this.this.denomenator.value.value
						)
					}),
					invmult: _FUNCTION(function () {
						return this.this.this.this.class.class(
							...nameslist
								.map((x) => this.this.this[x].value.value)
								.reverse()
						)
					}),
					isWhole: _FUNCTION(function () {
						return this.this.this
							.simplify()
							.denomenator.equal(
								this.this.this.this.class.parentclass.static.one()
							)
					}),
					copy: _FUNCTION(function () {
						return this.this.this.this.class.class(
							...nameslist.map((x) => this.this.this[x].value.value)
						)
					}),
					naivesum: _FUNCTION(function (
						ratio = this.this.this.this.class.class()
					) {
						return this.this.this.this.class.class(
							...nameslist.map(
								(x) => this.this.this[x].add(ratio[x]).value.value
							)
						)
					}),
					// ? Wonder - how about allowing for extended-methods of this general form [using the parent class variable instances list];
					equal: _FUNCTION(function (
						ratio = this.this.this.this.class.class()
					) {
						return nameslist.every((x) => this.this.this[x].equal(ratio[x]))
					}),
					direction: _FUNCTION(function () {
						return refCompare(
							...nameslist.map((name) => this.this.this[name].direction())
						)
					}),
					sign: refactor.classes.sign,
					abs: _FUNCTION(function () {
						return this.this.this.this.class.class(
							...nameslist.map(
								(name) => this.this.this[name].abs().value.value
							)
						)
					}),
					// todo: THE RATIONAL-CHECK HERE IS FLAWED! SUPPOSED TO USE '.is', BUT THAT IS COMPROMISED (DUE TO HOW UNRELIABLE IT IS FROM THE SIMILAR-CLASS-STRUCTURE STANDPOINT...); [And the fact that it don't really fit in here...];
					power: _FUNCTION(function (r = this.one()) {
						const ratiovals = nameslist.map((name) => {
							return (
								r.numerator && r.denomenator
									? (x) => x.power(r.numerator).root(r.denomenator)
									: (x) => x.power(r)
							)(this.this.this[name])
						})
						if (!ratiovals[0].value || !ratiovals[1].value)
							return ratiovals[0].divide(ratiovals[1])
						return this.this.this.this.class.class(
							...ratiovals.map((x) => x.value.value)
						)
					}),
					root: _FUNCTION(function (rv = this.one()) {
						return this.power(rv.invmult())
					}),
					compare: _FUNCTION(function (ratio = this.one()) {
						const signs = [this.this, ratio].map((x) => x.direction())
						if (!refCompare(...signs)) return signs[0] > signs[1]
						const abs = [this.this, ratio].map((x) => x.simplify().abs())
						return (
							signs[0] ? greateroe : lesseroe
						)(abs[0].numerator.multiply(abs[1].denomenator), abs[0].denomenator.multiply(abs[1].numerator))
					}),
					divide: _FUNCTION(function (ratio = this.one()) {
						return this.multiply(ratio.invmult())
					}),
					equal: _FUNCTION(function (ratio = this.one()) {
						const simplified = [this, ratio].map((x) => x.simplify())
						return (
							simplified[0].numerator.equal(simplified[1].numerator) &&
							simplified[1].denomenator.equal(simplified[1].denomenator)
						)
					}),
					simplify: _FUNCTION(function () {
						return this.this.this.this.class.static.simplified(this.this)
					}),
					difference: _FUNCTION(function (ratio = this.one()) {
						return this.add(ratio.invadd())
					}),
					half: _FUNCTION(function () {
						return this.two().invmult()
					}),
					third: _FUNCTION(function () {
						return this.two().add().invmult()
					})
				}
				for (const n of ["zero", "one", "two"])
					M[n] = _FUNCTION(function () {
						return this.this.this.this.class.static[n]()
					})

				return M
			})(),
			static: (() => {
				const R = {}

				R.simplified = _FUNCTION(function (ratio = this.one()) {
					const isn = !ratio.sign()
					ratio = ratio.abs()
					const m = greateroe(ratio.numerator, ratio.denomenator)
						? "numerator"
						: "denomenator"
					const l = refCompare(m, "numerator") ? "denomenator" : "numerator"
					const factors = integer.allFactors().function(ratio[l])
					factors.slice(factors.one())
					for (const x of factors)
						while (
							this.this.parentclass.static
								.zero()
								.equal(ratio[m].modulo(x)) &&
							this.this.parentclass.static.zero().equal(ratio[l].modulo(x))
						) {
							ratio[m] = ratio[m].divide(x)
							ratio[l] = ratio[l].divide(x)
						}
					return (isn ? (x) => x.invadd() : ID)(ratio)
				}).bind(R)

				R.fromCounter = _FUNCTION(function (
					counter = this.this.parentclass.parentclass.static.one()
				) {
					return this.this.class(
						counter.value,
						this.this.parentclass.parentclass.static.one().value
					)
				}).bind(R)

				R.fromInteger = _FUNCTION(function (
					integer = this.this.parentclass.static.one()
				) {
					return this.this.class(
						integer.value.value,
						this.this.parentclass.parentclass.static.one().value
					)
				}).bind(R)

				for (const n of ["zero", "one", "two"])
					R[n] = _FUNCTION(function () {
						return this.this.class(
							...[n, "one"].map(
								(nn) => this.this.parentclass.static[nn]().value.value
							)
						)
					}).bind(R)

				return R
			})(),
			transform: general.StaticThisTransform,
			recursive: true,
			toextend: { methods: true, symbols: true },
			names: nameslist
		})
	}
}

general.DEFAULT_TINTCLASS = tnumbers.TrueInteger()
general.DEFAULT_TRATIOCLASS = tnumbers.TrueRatio()

export const udeftable = RECURSIVE_VARIABLE({
	"+": general.recursiveGeneral(
		"+",
		(a, b) => a.add(b),
		general.DEFAULT_TINTCLASS.static.zero()
	),
	"-": _FUNCTION(function (args) {
		return this.get["+"](
			...(greater(args.length().get(), args.init())
				? [args.read()].concat(args.slice(args.one()).map((x) => x.invadd()))
				: [])
		)
	}, general.DEFAULT_TINTCLASS.static.zero()),
	// ! the '/' division must return a TrueRation-al value;
	"#": _FUNCTION(function (args) {
		return (
			greateroe(args.length().get(), args.two())
				? (x) => x.divide(this.get["*"](args.copied("slice", [args.one()])))
				: ID
		)(args[0])
	}, general.DEFAULT_TINTCLASS.static.zero()),
	"*": general.recursiveGeneral(
		"*",
		(a, b) => a.multiply(b),
		general.DEFAULT_TINTCLASS.static.one()
	),
	"**": general.recursiveGeneral(
		"**",
		(a, b) => a.power(b),
		general.DEFAULT_TINTCLASS.static.one()
	),
	// ! BUGGED! SAME PROBLEM AS WITH THE 'deftable...';
	"%": general.recursiveGeneral(
		"%",
		(a, b) => a.modulo(b),
		general.DEFAULT_TINTCLASS.static.one()
	),
	jumpDirection: general.recursiveGeneral(
		"jumpDirection",
		(a, b) => a.jumpDirection(b),
		general.DEFAULT_ICCLASS.class()
	)
})

export const uevaluate = TEMPLATE({
	defaults: {
		table: udeftable.get
	},
	function: _FUNCTION(function (expression) {
		if (
			greater(
				expression.expressions.length().get(),
				expression.expressions.class.template.icclass.static.zero()
			)
		)
			return this.template.table.read(expression.operator)(
				expression.expressions.map(this.function)
			)
		return this.template.table[expression.operator](expression.objects)
	})
}).function

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
			this.f = _FUNCTION(function (I = this.class.template.icclass.class()) {
				if (I.equal(i)) return v
				return x(I)
			}).bind(this)
			return this
		}),
		subarr: _FUNCTION(function (predicate = TRUTH) {
			const x = this.f
			this.f = _FUNCTION(function (i = this.class.template.icclass.class()) {
				let subind = this.class.template.icclass.static.negone()
				let fi = this.class.template.icclass.class()
				while (true) {
					if (predicate(x(fi), fi)) subind = next(subind)
					if (subind.equal(i)) break
					fi = next(fi)
				}
				return x(fi)
			}).bind(this)
			return this
		}),
		copy: _FUNCTION(function () {
			return this.class.class(this.f)
		}),
		copied: refactor.classes.copied(),
		map: _FUNCTION(function (g = id) {
			const x = this.f
			this.f = _FUNCTION(function (i = this.class.template.icclass.class()) {
				return g(x(i))
			}).bind(this)
			return this
		}),
		slice: _FUNCTION(function (inind = this.init(), enind) {
			if (!enind) {
				enind = inind
				inind = this.init()
			}
			const genarr = this.class.template.genarrclass.static.empty()
			for (let i = inind; lesser(i, enind); i = next(i))
				genarr.pushback(this.read(i))
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
	const _class = EXTENSION(parentclass, {
		defaults: {
			ustrclass: general.DEFAULT_USTRCLASS,
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
			copied: refactor.classes.copied(),
			slice: _FUNCTION(function (beg = this.init(), end) {
				// ? generalize this;
				if (refCompare(arguments.length, 1)) {
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
		toextend: { methods: ["init", "subarr", "read", "index"], symbols: true },
		names: ["infarr"]
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

// ! NOTE: this doesn't work properly yet (consider a sketch...); 
// ^ Defining Problem for testing is lack of proper libary type/semantics/terminology for the argument of 'children' (it's supposed to be an argument of GeneralArray, YET, one NEEDS the '.copy')
// * more precisely - the inability to 'replace' the value of the empty array there with anything general (as this is a Template-dependent variable, not an element of a given GeneralArray model...); SO IT'S NOT EMPLOYABLE HERE...
// Due to this, heaps (too) remain untested...; 
export const TreeNode = (parentclass = general.DEFAULT_GENARRCLASS) => {
	return EXTENSION(parentclass, {
		defaults: {
			defaults: {
				inter: _FUNCTION(function (args, _i, instance) {
					return [
						args[0].copy((x) =>
							this.class(this.parentclass.static.empty(), x, instance)
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
				const f = this.this.this.this.class.parentclass.static.fromArray([
					transform(this.this.this)
				])
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
				return this.indexesOf(v, true, this.one()).read()
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
					? this.this.this.this.class.parentclass
					: this.this.this.this.class.parentclass.template
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
			copied: refactor.classes.copied(),
			map: _FUNCTION(function (
				f = ID,
				isclass = false,
				template = isclass
					? this.this.this.this.class.parentclass
					: this.this.this.this.class.parentclass.template
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
				this.this.this.children.delval(v, {
					comparison: (x, y) => comparison(x.node, y)
				})
				return this.this
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
				if (greateroe(index.length().get(), index.two()))
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
				return this.this.this.children.one().jumpDirection(
					uevaluate().function(
						Expression(
							"jumpDirection",
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
							this.this.this.this.class.parentclass.static.empty(),
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
				while (!currroots.every(is.null)) {
					currroots = currroots.copy(this.findRoots)
					froots.concat(currroots)
				}
				return froots
			}),
			commonAncestors: _FUNCTION(function (
				values = this.this.this.this.class.parentclass.static.empty()
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
				multi = this.this.this.this.class.parentclass.static.empty(),
				first = true
			) {
				if (first) multi = multi.copy()
				let res = this.this.this.this.class.template.icclass.static.one()
				if (
					greateroe(
						multi.length().get(),
						this.this.this.this.class.parentclass.static.one()
					)
				)
					res = multi
						.read()
						.jumpDirection(
							this.this.this.children
								.read(multi.read())
								.multitoflat(multi.slice(multi.one())),
							false
						)
				return res
			}),
			flattomulti: _FUNCTION(function (index = this.init(), first = true) {
				let currindex = (copy ? (x) => x.copy() : ID)(index)
				const multi = this.this.this.this.class.parentclass.static.empty()
				for (const x of this.this.this.children.keys()) {
					if (
						lesser(currindex, this.this.this.children.read(x).length().get())
					) {
						if (!first) break
						multi.pushback(x)
						continue
					}
					currindex = currindex.jumpReverse(
						this.this.this.children.read(x).length().get()
					)
					currindex = this.this.this.children
						.read(x)
						.flattomulti(currindex, false)
				}
				return first ? multi : currindex
			})
		},
		recursive: true,
		names: ["children"]
	})
}
general.DEFAULT_TREENODECLASS = TreeNode()

export const UnlimitedSet = (parentclass = general.DEFAULT_GENARRCLASS) => {
	return EXTENSION(parentclass, {
		defaults: {
			defaults: {
				inter: _FUNCTION(function (args) {
					alinative.object.ensureProperty(
						args,
						0,
						this.parentclass.template.empty
					)
					return [args[0]]
				}),
				outer: ensureSet
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
				this.this.this.genarr.delval(el)
				return this.this
			}),
			copy: _FUNCTION(function (f = ID, isclass = false, template) {
				return this.this.this.this.class.class(
					this.this.this.genarr.copy(f, isclass, template).array
				)
			}),
			copied: refactor.classes.copied(),
			union: refactor.classes.usetmeth("concat"),
			intersection: refactor.classes.usetmeth("intersection"),
			complement: _FUNCTION(function (
				uset = this.this.this.this.class.static.empty()
			) {
				return this.suchthat((x) => !uset.ni(x))
			}),
			empty: refactor.classes.empty(),
			// ^ Another absolutely marvelous method taken out of v1.0; Reason - in order to consistently (and cleanly) ensure subset-uniqueness (and without rewriting the algorithm in a 'hacky' ad-hoc manner), one has to first implement the GeneralArray equivalences (which are scheduled for v1.1);
			// subsets: _FUNCTION(function (fix = false) {
			// 	if (fix) this.fix()
			// 	const subs = this.this.this.this.class.parentclass.static.empty()
			// 	for (const i of this.keys()) {
			// 		const c = this.copied("delete", [i])
			// 		subs.pushback(c)
			// 		subs.concat(c.subsets(false).genarr)
			// 	}
			// 	this.this.this = this.this.this.this.class.class(subs.array).this
			// 	return this.this
			// }),
			// * manually 'fixes' a potentially 'broken' set - allows usage of sets as arrays in algorithms, then returning them to their desired state (and also - explicit manipulation of orders on sets);
			fix: _FUNCTION(function () {
				// ? Dilemma - use 'ensureSet' directly, or keep as this? [that way, reference is 'linked', whereas otherwise it is 'parallel']
				this.this.this.genarr = this.this.this.this.class.class(
					this.this.this.genarr.array
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
			// ? Refactor the '_FUNCTION's? (due to infinite Bindability, this can be done easily...);
			R.empty = _FUNCTION(function () {
				return this.this.class()
			}).bind(R)
			// TODO: generalize - create a general interface for different kinds of types'-to-types' transitions (instead of creating a static 'from' method for each and every type/class for another type/class);
			R.fromArray = _FUNCTION(function (array) {
				return this.this.class(
					this.this.parentclass.static.fromArray(array).array
				)
			}).bind(R)
			R.fromCounter = _FUNCTION(function (
				counter = this.this.parentclass.static.zero()
			) {
				return this.this.class(
					this.this.parentclass.static.fromCounter(counter).array
				)
			})
			// ? Use in different places?
			R.fromGarray = _FUNCTION(function (
				garray = this.this.parentclass.static.empty()
			) {
				return this.this.class(garray.array)
			})
			return R
		})(),
		transform: general.StaticThisTransform,
		recursive: true,
		names: ["genarr"]
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
	function: alinative.function.const(function (parentclass = this.template.parentclass) {
		return Ensurer(
			parentclass,
			(_r, _this) =>
				greateroe(this.template.n, _this.this.this.children.length().get()),
			{
				// ? Question: how to choose the index for the child, to which the element from 'args' is pushed?
				pushback: _FUNCTION(function (_r, _t, args) {
					this.this.this.children.delete()
					this.this.this.children.read().pushback(args[0])
					return this.this
				}),
				pushfront: _FUNCTION(function (_r, _t, args) {
					this.this.this.children.delete(this.init())
					this.this.this.children.read().pushfront(args[0])
					return this.this
				}),
				insert: _FUNCTION(function (_r, _t, args) {
					const ind = args[0].copied("delete")
					const lastind = args[0].read(args[0].finish())
					const x = this.read(ind, false, false)
					x.delete(lastind)
					x.read(lastind).insert(
						x.class.parentclass.staic.fromArray([x.init()]),
						args[1]
					)
					return this.this
				})
				// ? Question: beside these methods, there are others that the TreeNode inherits from the GeneralArray class (namely, '.concat', '.write' and others...) - should they also be checked, or not?
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
// ! Untested in 1.0alpha too, for it feels like (slightly) too early (employing a lot of presently undefined library concepts, such as States...); 
export const Graph = (parentclass = general.DEFAULT_GENARRCLASS) => {
	return EXTENSION(parentclass, {
		defaults: [
			function () {
				return {
					defaults: function () {
						return {
							constructor: [this.parentclass.static.empty],
							inter: function (args, _i) {
								return [
									ensureSet(
										args[0].copy((x, i) => Vertex(x, args[1].read(i)))
									)
								]
							}
						}
					}
				}
			}
		],
		methods: {
			getAdjacent: _FUNCTION(function (index = this.init()) {
				return this.this.this.verticies
					.read(index)
					.edges.copy(alinative.function.call)
			}),
			addvertex: _FUNCTION(function (
				value,
				edges = this.this.this.this.class.parentclass.static.empty()
			) {
				this.this.this = this.copied("pushback", [Vertex(value, edges)]).this
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
				comparison = this.this.this.this.class.parentclass.template.comparison
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
			// ? Add 'comparison' template variable to the 'Graph'? (generally, avoid using the 'parentclass' template variables, allow setting one's own for each class?);
			// ! NOTE: this thing works ONLY with finite/static graphs that have 'const EDGEGARR = GeneralArray(...).class(...); edges = alinative.function.const(EGEARR)'; (When it references a single separately allocated array); For such situations, pray make an alias, + consider generalizing this method to be more general... (same with 'edges', more work is needed on them...);
			deledgeval: _FUNCTION(function (
				index,
				value,
				comparison = this.this.this.this.class.parentclass.template.comparison
			) {
				const todelinds = this.this.this.this.class.parentclass.static.empty()
				const edges = this.this.this.verticies.read(index).edges()
				for (const x of edges.keys())
					if (comparison(x().value(), value)) todelinds.pushback(x)
				for (const ind of todelinds) edges.delete(ind)
				return this.this
			})
		},
		symbol: {
			iterator: function* () {
				for (const x of this.keys()) yield this.read(x)
			}
		},
		recursive: true,
		isthis: true,
		names: ["verticies"]
	})
}

export const Vertex = (value, edges) => ({ value, edges })

general.DEFAULT_GRAPHCLASS = Graph()

// ? General issue [small] - currently, the niether TreeNode nor Heaps support the lacking '.value'; Pray think more on it... (implement a solution)
// ! Add '.copy' to each one of those...
// TODO: check if any of them have a 'difficulty' with detemining 'what ought to be where' (namely, with the '.treenode' and '.value' properties of heapclasses and TreeNode...);
export const heaps = {
	PairingHeap(parentclass = general.DEFAULT_TREENODECLASS) {
		return EXTENSION(parentclass, {
			defaults: refactor.defaults.heap(),
			methods: {
				merge: _FUNCTION(function (
					heaps = this.this.this.this.class.parentclass.parentclass.static.empty()
				) {
					if (greateroe(heaps.length().get(), heaps.one())) {
						if (greateroe(heaps.one(), heaps.length().get()))
							return this.merge(
								this.this.this.this.class.parentclass.parentclass.static.fromArray(
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
						return X(this, this.this.this, heaps.read())
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
			recursive: true,
			names: ["treenode"]
		})
	},
	NAryHeap(parentclass = general.DEFAULT_TREENODECLASS) {
		return EXTENSION(parentclass, {
			defaults: refactor.defaults.heap(),
			methods: {
				top: _FUNCTION(function () {
					return this.this.this.treenode.value
				}),
				add: _FUNCTION(function (elem) {
					// ! Generalize this, pray... [the 'index'-repetition... + the 'heap-property' restoration];
					// * note: this ought to be fixed on the level of the constructor (implemented in such a way so as to be compatible with the methods in-usage)
					let ind =
						this.this.this.this.class.parentclass.parentclass.static.fromArray(
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
			recursive: true,
			names: ["treenode"]
		})
	},
	BinomialHeap: function (parentclass = general.DEFAULT_GENARRCLASS) {
		let bintreeform = treeForm(parentclass)
		return EXTENSION(parentclass, {
			defaults: {
				treenodeclass: general.DEFAULT_TREENODECLASS,
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
							this.this.this.this.class.parentclass.static.fromArray([this])
						)
						return n.order(n.init())
					}
					return this.this.this.trees.read(i).order()
				}),
				merge: _FUNCTION(function (heaps = this.parentclass.static.empty()) {
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
									torders.write(i, next(torders.read(i)))
									hbmerged.write(j, true)
								}
						return this.this
					}
					for (const x of heaps)
						this.merge(this.parentclass.static.fromArray([x]))
					return this.this
				}),
				copy: _FUNCTION(function (f = ID) {
					return this.this.this.this.class.class(this.this.this.trees.copy(f))
				}),
				copied: refactor.classes.copied(),
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
						this.this.this.this.class.parentclass.template.comparison(
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
			},
			names: ["trees"]
		})
	}
}

general.DEFAULT_HEAPCLASS = heaps.PairingHeap()

export const PriorityQueue = (heapclass = general.DEFAULT_HEAPCLASS) => {
	return EXTENSION(heapclass, {
		methods: {
			// ? Create a shorter EXTENSION-based expression for the self-referencing method-aliases;
			pull: _FUNCTION(function () {
				return this.this.this.heap.topless()
			})
		},
		recursive: true,
		names: ["heap"]
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
					genarrclass: general.DEFAULT_GENARRCLASS
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
				.copy(this.template.predicate)
				.map(polystring(this.template).function)
			const maxsize = sameLength(this.template).function(polyconverted)
			// ? Generalize the usage of 'refCompare' here?
			const toorder = (ordered, i) =>
				this.template.alphabet
					.copy((l) => ordered.suchthat((y) => refCompare(y.read(i), l)))
					.suchthat((x) => !x.isEmpty())
					.join()
			// ? Use repeatedApplication
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
					icclass: general.DEFAULT_ICCLASS,
					tintclass: general.DEFAULT_TINTCLASS,
					sortingf: this.function
				}
			},
			function () {
				return {
					buckets: this.template.icclass.static.two()
				}
			}
		],
		function: alinative.function.const(function (
			garr = this.template.genarrclass.static.empty(),
			bucketsnum = this.template.buckets
		) {
			if (garr.isEmpty()) return garr
			const k = refactor.general.maxkey.bind(this)(garr)
			const buckets = this.template.genarrclass.static
				.fromCounter(bucketsnum)
				.map(garr.empty)

			for (const x of garr.keys())
				buckets
					.read(
						this.template.tintclass.static
							.fromCounter(bucketsnum)
							.multiply(this.template.predicate(garr.read(x), x, garr))
							.divide(k).value
					)
					.pushback(garr.read(x))

			for (const b of buckets.keys())
				buckets.write(b, this.template.sortingf(buckets.read(b)))

			return alarray.concat(this.template).function(buckets)
		}),
		isthis: true
	}).function,
	counting: TEMPLATE({
		defaults: {
			genarrclass: general.DEFAULT_GENARRCLASS,
			predicate: general.DEFAULT_PREDICATE
		},
		function: function (garr = this.template.genarrclass.static.empty()) {
			// * note: it's FAR more efficient for the user to provide the '.maxkey' on their own instead of having to calculate it...;
			const k = general.maxkey.bind(this)(garr)
			const count = this.template.genarrclass.static
				.fromCounter(next(k))
				.map(k.class.init)
			const output = garr.copy(alinative.function.const(udef))

			for (const x of garr) {
				const j = this.template.predicate(x)
				count.write(j, next(count.read(j)))
			}

			for (let i = k.one(); lesseroe(i, k); i = next(i))
				count.write(i, count.read(i).jumpDirection(count.read(i.previous())))

			for (let i = garr.finish(); greateroe(i, garr.init()); i = previous(i)) {
				const j = this.template.predicate(garr.read(i))
				count.write(j, count.read(j).previous())
				output.write(count.read(j), garr.read(i))
			}

			return output
		}
	}).function,
	// ! PROBLEM: DOES NOT work with reflexive linear order predicates - will add the middle item TWICE per a call (those, that have 'predicate(x, x) == true');
	// ? Choose proper order-orientation for 'predicate' variables that are passed...;
	quick: TEMPLATE({
		defaults: {
			genarrclass: general.DEFAULT_GENARRCLASS,
			predicate: general.DEFAULT_PREDICATE
		},
		function: function (garr = this.template.genarrclass.static.empty()) {
			if (greateroe(garr.two().next(), garr.length().get())) {
				if (greateroe(garr.one(), garr.length().get())) return garr
				const X = (x = garr.init(), y = garr.one()) => {
					if (!this.template.predicate(garr.read(x), garr.read(y)))
						garr.swap(x, y)
				}
				X()
				if (greateroe(garr.two(), garr.length().get())) return garr
				X(garr.one(), garr.two())
				X(garr.init(), garr.two())
				return garr
			}

			const MIDDLE_ELEMENT = garr.read(
				general.DEFAULT_TINTCLASS.static
					.fromCounter(garr.finish())
					.divide(general.DEFAULT_TINTCLASS.static.fromCounter(garr.two()))
					.value
			)

			const prev = this.function(
				garr.copied("suchthat", [
					(x) => this.template.predicate(x, MIDDLE_ELEMENT)
				])
			)
			prev.pushback(MIDDLE_ELEMENT)
			return prev.concat(
				this.function(
					garr.copied("suchthat", [
						(x) => this.template.predicate(MIDDLE_ELEMENT, x)
					])
				)
			)
		}
	}).function,
	// ? Pray see if this is optimal...
	insertion: TEMPLATE({
		defaults: {
			genarrclass: general.DEFAULT_GENARRCLASS,
			predicate: general.DEFAULT_PREDICATE
		},
		function: function (garr = this.template.genarrclass.static.empty()) {
			garr = garr.copy()
			const resarr = garr.empty()
			let hasBroken
			if (!garr.isEmpty()) resarr.pushback(garr.read())
			for (let i = garr.one(); lesser(i, garr.length().get()); i = next(i)) {
				hasBroken = false
				let j = garr.init()
				for (; lesser(j, resarr.length().get()); j = next(j)) {
					if (!this.template.predicate(garr.read(i), resarr.read(j))) continue
					hasBroken = true
					resarr.insert(j, garr.read(i))
					break
				}
				if (!hasBroken) resarr.insert(j, garr.read(i))
			}
			return resarr
		}
	}).function,
	bubble: TEMPLATE({
		defaults: {
			genarrclass: general.DEFAULT_GENARRCLASS,
			predicate: general.DEFAULT_PREDICATE
		},
		function: function (garr = this.template.genarrclass.static.empty()) {
			garr = garr.copy()
			for (let i = garr.init(); lesser(i, garr.length().get()); i = next(i))
				for (let j = next(i); lesser(j, garr.length().get()); j = next(j))
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
			const f = most({ comparison: this.template.predicate }).function
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
			// TODO: replace the forms' 'default' with a dynamically evaluated function. This way, such 'allocation conondrums' need not happen...;
			const mergeForm = constForm(0, 1, 1, this.template.genarrclass.static.empty())

			function split(a) {
				return a.copied("splitlen", [a.one()]).map(mergeForm.new)
			}
			function merge(a) {
				if (a.length().get().equal(a.one())) return mergeForm.index(a.read())
				const b = a.empty()
				a.loop()._full(
					(t) => {
						if (
							greateroe(
								t.object().currindex,
								t.object().length().get().previous()
							)
						) {
							b.pushback(t.object().currelem().get())
							return
						}

						const ca = mergeForm.index(t.object().currelem().get())
						const fn = mergeForm.index(
							t.object().read(next(t.object().currindex))
						)
						const newarr = t.object().empty()
						let fc = t.object().init(),
							sc = t.object().init()
						let ffit = lesser(fc, ca.length().get()),
							sfit = lesser(sc, fn.length().get())

						while (
							(sfit && lesseroe(fc, ca.length().get())) ||
							(ffit && lesseroe(sc, fn.length().get()))
						) {
							// ? Oughtn't one be using 'mergeForm.read' instead of the GeneralArray class methods? [yes, later - fix that as well...]
							let m = {}

							const firarrel = ffit ? ca.read(fc) : null
							const secarrel = sfit ? fn.read(sc) : null

							if (
								!sfit ||
								(ffit && this.template.predicate(firarrel, secarrel))
							) {
								m = firarrel
								fc = next(fc)
							}
							if (!refCompare(m, firarrel)) {
								m = secarrel
								sc = next(sc)
							}

							ffit = ffit && lesser(fc, ca.length().get())
							sfit = sfit && lesser(sc, fn.length().get())

							newarr.pushback(m)
						}
						b.pushback(mergeForm.new(newarr))
					},
					alinative.function.const((x) => {
						const t = x.object()
						t.next()
						t.next()
						return t
					})
				)
				return merge.call(this, b)
			}
			return merge.call(this, split(array))
		}
	}).function
}

// ? [For future]: Add search algorithms: metabinary? (maybe sometime later, after BinaryArray has been implemented...), fibonacci? (if doing that, add the number sequences to the library...);
export const search = {
	sentinel: TEMPLATE({
		defaults: {
			defelem: undefined,
			unfound: undefined,
			genarrclass: general.DEFAULT_GENARRCLASS,
			comparison: general.DEFAULT_COMPARISON
		},
		function: _FUNCTION(function (
			sought = this.template.defelem,
			garr = this.template.genarrclass.static.empty()
		) {
			const c = garr.copied("pushback", [sought])
			let i = garr.init()
			for (; !this.template.comparison(c.read(i), sought); i = next(i)) {}
			return this.template.comparison(garr.length().get(), i)
				? this.template.unfound
				: i
		})
	}).function,
	exponential: TEMPLATE({
		defaults: [
			function () {
				return {
					defelem: undefined,
					genarrclass: general.DEFAULT_GENARRCLASS,
					icclass: general.DEFAULT_ICCLASS,
					tintclass: general.DEFAULT_TINTCLASS,
					predicate: general.DEFAULT_PREDICATE
				}
			},
			function () {
				return { factor: this.template.tintclass.static.two() }
			}
		],
		function: alinative.function.const(
			_FUNCTION(function (
				sought = this.template.defelem,
				garr = this.template.genarrclass.static.empty()
			) {
				let i = this.template.tintclass.static.one()
				let p = this.template.tintclass.static.zero()
				for (
					;
					lesser(i.value, garr.length().get());
					p = i, i = i.multiply(this.template.factor)
				)
					if (this.template.predicate(sought, garr.read(i.value))) break
				return p.add(
					this.template.tintclass.static.fromCounter(
						search
							.binary(this.template)
							.function(
								sought,
								garr.copied(
									"slice",
									[p, i].map(alinative.function.index("value"))
								)
							)
					)
				).value
			})
		),
		isthis: true
	}).function,
	interpolation: TEMPLATE({
		defaults: {
			defelem: undefined,
			comparison: general.DEFAULT_COMPARISON,
			unfound: undefined,
			genarrclass: general.DEFAULT_GENARRCLASS,
			tintclass: general.DEFAULT_TINTCLASS
		},
		function: _FUNCTION(function (
			sought = this.template.defelem,
			garr = this.template.genarrclass.static.empty(),
			original = true
		) {
			if (garr.isEmpty()) return this.template.unfound

			const initint = this.template.tintclass.static.fromCounter(garr.init())
			const finishint = this.template.tintclass.static.fromCounter(garr.finish())

			const interpolated = initint.add(
				finishint
					.difference(initint)
					.divide(
						this.template
							.predicate(garr.read(garr.finish()))
							.difference(this.template.predicate(garr.read()))
					)
					.multiply(
						this.template
							.predicate(sought)
							.difference(this.template.predicate(garr.read()))
					)
			)
			const inelem = garr.index(interpolated)
			if (this.template.comparison(sought, inelem)) return interpolated
			return (original ? (x) => x.value : ID)(
				interpolated.add(
					this.function(
						sought,
						garr.copied(
							"slice",
							this.template.predicate(sought, inelem)
								? [garr.init(), previous(interpolated)]
								: [next(interpolated)]
						),
						false
					)
				)
			)
		})
	}).function,
	jump: typeConst((FORBIDDEN) => {
		FORBIDDEN = FORBIDDEN[0]
		return TEMPLATE({
			defaults: {
				defelem: undefined,
				genarrclass: general.DEFAULT_GENARRCLASS,
				comparison: general.DEFAULT_COMPARISON,
				predicate: general.DEFAULT_PREDICATE,
				unfound: undefined,
				tintclass: general.DEFAULT_TINTCLASS
			},
			function: _FUNCTION(function (
				sought = this.template.defelem,
				garr = this.template.genarrclass.static.empty()
			) {
				const sqrtlen = this.template.tintclass.static
					.fromCounter(garr.length().get())
					.root()
				let tempres = FORBIDDEN
				for (
					let i = this.template.tintclass.class();
					lesser(i.value, garr.length().get());
					i = i.add(sqrtlen)
				) {
					// ! MANUAL CACHING! BAD! FIX IN V1.1....;
					const curr = garr.read(i)
					if (
						this.template.predicate(sought, curr) ||
						this.template.comparison(sought, curr)
					) {
						tempres = i
						break
					}
				}
				if (refCompare(tempres, FORBIDDEN)) return this.template.unfound
				return (
					tempres.compare(sqrtlen)
						? tempres.difference(sqrtlen)
						: tempres.zero()
				).jumpDirection(
					search.linear(this.template).function(
						sought,
						garr.copied(
							"slice",
							[
								tempres.compare(sqrtlen)
									? tempres.difference(sqrtlen)
									: tempres.zero(),
								tempres
							].map((x) => x.value)
						)
					)
				)
			})
		}).function
	}, 1),
	linear: TEMPLATE({
		defaults: {
			defelem: undefined,
			unfound: undefined,
			genarrclass: general.DEFAULT_GENARRCLASS,
			comparison: general.DEFAULT_COMPARISON
		},
		function: _FUNCTION(function (
			sought = this.template.defelem,
			garr = this.template.genarrclass.static.empty()
		) {
			for (const a of garr.keys())
				if (this.template.comparison(garr.read(a), sought)) return a
			return this.template.unfound
		})
	}).function,
	// ? Generalize? (can be generalized to an 'n-ary' search); Consider...
	binary: TEMPLATE({
		defaults: {
			defelem: undefined,
			predicate: general.DEFAULT_PREDICATE,
			unfound: undefined,
			genarrclass: general.DEFAULT_GENARRCLASS,
			tintclass: general.DEFAULT_TINTCLASS,
			comparison: general.DEFAULT_COMPARISON
		},
		function: _FUNCTION(function (
			sought = this.template.defelem,
			garr = this.template.genarrclass.static.empty()
		) {
			if (garr.isEmpty()) return this.template.unfound
			const lenint = this.template.tintclass.static.fromCounter(garr.length().get())
			const middleind = lenint
				.difference(
					alinative.boolean.btic(
						lenint
							.modulo(this.template.tintclass.static.two())
							.equal(this.template.tintclass.static.one()),
						this.template.tintclass
					)
				)
				.divide(this.template.tintclass.static.two()).value
			const midelem = garr.index(middleind)
			if (this.template.comparison(midelem, sought)) return middleind
			const islesser = this.template.predicate(sought, midelem)
			return (islesser ? ID : (x) => middleind.jumpDirection(x).next())(
				this.function(
					sought,
					garr.copied(
						"slice",
						islesser ? [garr.init(), previous(middleind)] : [next(middleind)]
					),
					false
				)
			)
		})
	}).function
}

export const integer = {
	native: {},
	factorOut: TEMPLATE({
		defaults: {
			tintclass: general.DEFAULT_TINTCLASS,
			genarrclass: general.DEFAULT_GENARRCLASS
		},
		function: function (tint = this.template.tintclass.class()) {
			const factors = this.template.genarrclass.class()
			for (
				let currDivisor = this.template.tintclass.static.two();
				lesser(this.template.tintclass.static.one(), tint);
				currDivisor = currDivisor.add(
					this.template.tintclass.static
						.two()
						.difference(
							this.template.tintclass.static[
								currDivisor.equal(this.template.tintclass.static.two())
									? "one"
									: "zero"
							]()
						)
				)
			) {
				while (tint.modulo(currDivisor).equal(tint.zero())) {
					factors.pushback(currDivisor)
					tint = tint.divide(currDivisor)
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
			return equal(
				this.template.icclass.static.one(),
				integer.factorOut(this.template).function(x).length().get()
			)
		}
	}).function,

	multiples: TEMPLATE({
		defaults: {
			includezero: false,
			tintclass: general.DEFAULT_TINTCLASS,
			step: general.DEFAULT_ICCLASS.static.one()
		},
		function: function (
			n = this.template.tintclass.static.one(),
			range = this.template.tintclass.static.one()
		) {
			return alarray
				.generate({ ...this.template, ic: false })
				.function(
					(this.template.includezero ? ID : (x) => x.add())(n.zero()).value,
					range.value,
					this.template.step
				)
				.map((a) => this.template.tintclass.class(a).multiply(n))
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
			return integer.multiples(this.template).function(n, x.difference().divide(n))
		}
	}).function,

	lcm: TEMPLATE({
		defaults: {},
		function: function (...nums) {
			return min(this.template).function(
				integer.commonMultiples(this.template).function(...nums)
			)
		}
	}).function,

	lcd: TEMPLATE({
		defaults: {},
		function: function (...nums) {
			return min(this.template).function(
				integer.commonDivisors(this.template).function(...nums)
			)
		}
	}).function,

	areCoprime: TEMPLATE({
		defaults: {
			genarrclass: general.DEFAULT_GENARRCLASS
		},
		function: function (...tints) {
			return integer
				.commonDivisors(this.template)
				.function(...tints)
				.isEmpty()
		}
	}).function,

	allFactors: TEMPLATE({
		defaults: {
			icclass: general.DEFAULT_ICCLASS,
			tintclass: general.DEFAULT_TINTCLASS,
			genarrclass: general.DEFAULT_GENARRCLASS
		},
		function: function (number = this.template.tintclass.class()) {
			if (!number.sign()) {
				const pr = this.function(number.invadd())
				pr.pushfront(this.template.tintclass.static.one().invadd())
				return pr
			}

			// ! BAD! WHEN CACHING COMES - GET RID OF!
			const z = this.template.tintclass.static.zero()
			const factors = this.template.genarrclass.static.fromArray([
				this.template.tintclass.static.one()
			])
			const l = number.divide(
				number.class.static.fromCounter(this.template.icclass.static.two())
			)
			for (
				let currFactor = this.template.tintclass.static.two();
				greateroe(l, currFactor);
				currFactor = currFactor.add()
			)
				if (number.modulo(currFactor).equal(z)) factors.pushback(currFactor)
			if (greater(number, this.template.tintclass.static.one()))
				factors.pushback(number)
			return factors
		}
	}).function,

	isPerfect: TEMPLATE({
		defaults: {
			tintclass: general.DEFAULT_TINTCLASS,
			genarrclass: general.DEFAULT_GENARRCLASS
		},
		function: function (number = this.template.tintclass.class()) {
			return uevaluate()
				.function(
					Expression(
						"+",
						this.template.genarrclass.static.empty(),
						integer.allFactors(this.template).function(number).delete()
					)
				)
				.equal(number)
		}
	}).function,

	factorial: TEMPLATE({
		defaults: {
			tintclass: general.DEFAULT_TINTCLASS,
			genarrclass: general.DEFAULT_GENARRCLASS
		},
		function: function (tint = this.template.tintclass.class()) {
			const numbers = this.template.genarrclass.static.fromArray([
				this.template.tintclass.static.one()
			])

			for (
				let i = this.template.tintclass.static.one();
				greateroe(tint, i);
				i = i.add()
			)
				numbers.pushback(i)

			return uevaluate().function(
				Expression("*", this.template.genarrclass.static.empty(), numbers)
			)
		}
	}).function,

	binomial: TEMPLATE({
		defaults: {
			tintclass: general.DEFAULT_TINTCLASS,
			genarrclass: general.DEFAULT_GENARRCLASS
		},
		function: function (n, k = this.template.tintclass.static.one()) {
			return uevaluate()
				.function(
					Expression(
						"*",
						this.template.genarrclass.static.empty(),
						alarray
							.generate(this.template)
							.function(
								this.template.tintclass.static.zero().value,
								k.difference().value
							)
							.map((x) => n.difference(this.template.tintclass.class(x)))
					)
				)
				.divide(integer.factorial(this.template).function(k))
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
			if (greateroe(this.template.icclass.static.zero(), nterms))
				return this.template.genarrclass.static.empty()
			if (nterms.equal(this.template.icclass.static.one()))
				return this.template.genarrclass.static.fromArray([
					this.template.genarrclass.static.fromArray([endval])
				])
			const res = this.template.genarrclass.static.empty()
			for (let i = minval; lesseroe(i, endval.difference(minval)); i = i.add())
				for (const r of this.function(
					endval.difference(i),
					nterms.previous(),
					minval
				))
					res.pushback(
						this.template.genarrclass.static.fromArray([i]).concat(r)
					)
			return res
		}
	}).function,

	commonDivisors: TEMPLATE({
		defaults: {},
		function: function (...tints) {
			return alarray
				.common({
					f: integer.factorOut(this.template).function,
					...this.template
				})
				.function(...tints)
		}
	}).function,

	commonMultiples: TEMPLATE({
		defaults: {
			// ? Increase? [the very first library's prototypes had it as 100...];
			range: general.DEFAULT_TINTCLASS.static.fromNumber(10)
		},
		function: function (...nums) {
			return alarray
				.common({
					f: (x) =>
						integer.multiples(this.template).function(x, this.template.range)
				})
				.function(...nums)
		}
	}).function,

	primesBefore: TEMPLATE({
		defaults: {
			icclass: general.DEFAULT_ICCLASS,
			tintclass: general.DEFAULT_TINTCLASS
		},
		function: function (x = this.template.icclass.class()) {
			return alarray
				.generate({ ...this.template, ic: false })
				.function(x.previous())
				.map((x) =>
					this.template.tintclass.static.fromCounter(
						this.template.icclass.class(x)
					)
				)
				.suchthat(integer.isPrime(this.template).function)
		}
	}).function
}

// ? Generalize these two as well using the 'finiteobj'?
integer.native.commonDivisors = function (...nums) {
	return alarray.native.common({ f: integer.native.factorOut }).function(nums)
}

integer.native.commonMultiples = TEMPLATE({
	defaults: { range: 100 },
	function: function (...nums) {
		return alarray.native
			.common({ f: (x) => integer.native.multiples(x, this.template.range) })
			.function(nums)
	}
}).function

const methNames = [
	"factorOut",
	"isPrime",
	"multiples",
	"multiplesBefore",
	"primesBefore",
	"lcm",
	"lcd",
	"areCoprime",
	"allFactors",
	"isPerfect",
	"factorial",
	"binomial",
	"sumRepresentations"
]

// ! PROBLEM: the '{integer: true}' here. IT MUST BE ASSIGNED INDIVIDUALLY [for 'sumRepresentations' and such, in particular...];
// ? Add this '[true, ...]' information to specialized objects designed for storing method signature-related items? [Consider making a Method type/class/Interface...];
integer.native = {
	...integer.native,
	...general.finiteobj(
		integer,
		methNames,
		alarray.native
			.generate(4)
			.map(alinative.function.const({ integer: true }))
			.concat([{ integer: false }])
			.concat(
				alarray.native
					.generate(methNames.length - 6)
					.map(alinative.function.const({ integer: true }))
			)
			.concat([{ integer: false }]),
		[
			[true],
			[true],
			[true, true],
			[true, true],
			true,
			true,
			true,
			true,
			[true],
			[true],
			[true],
			[true, true],
			[-1, true, -1]
		],
		[
			false,
			null,
			false,
			false,
			false,
			true,
			true,
			null,
			false,
			null,
			true,
			true,
			false
		],
		methNames.map(TRUTH)
	)
}

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
			const gotten = this.template.genarrclass.static.fromArray([
				this.template.genarrclass.static.fromArray([startRatio, endRatio])
			])
			for (
				let i = this.template.icclass.class();
				lesser(i, iterations);
				i = next(i)
			) {
				gotten.pushback(this.template.genarrclass.static.empty())
				for (
					let j = this.template.icclass.class();
					lesser(j, gotten.read(i).length().get());
					j = next(j)
				) {
					gotten.read(next(i)).pushback(gotten.read(i).read(j))
					if (lesser(j, gotten.read(i).finish()))
						gotten.read(next(i)).pushback(
							gotten
								.read(i)
								.read(j)
								.naivesum(gotten.read(i).read(next(j)))
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

export function DEOBJECT(object = {}) {
	return ["keys", "values"].map((x) => obj[x](object))
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

const arrmethNames = [
	"intersection",
	"permutations",
	"indexesOf",
	"norepetitions",
	"isSub",
	"join",
	"common",
	"concat",
	"split"
]

// TODO: fix the way that the 'icclass' and 'genarrclass' 'defaults'-variables are treated; They must not have such 'significance' (generalize greatly to a proper finite-infinite type systems... Consider how else to do this...);
// ! DESSSSSSSSSSSSSSSSSSSSSSSIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIGNNNNNNNNNNNNNNNNN ISSSUEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE: (Seeeeeemingly, of unfixable nature currently)
// ^ 'Recursively infinite' types, such as a GeneralArray of InfiniteCounters DO NOT HAVE A GOOD REPRESENTATION...
// * Current solution [not a solution; Doesn't solve it... At all...]: do nothing about it. Add this as a part of the library, fix in the v1.1;
// ^ For the v1.1. solution - create a PROPER __RECURSIVE__ transformation procedures for finite and non-finite types, based off the typeConst typesystems (particularly - make EVERYTHING generalizable as a context - create a TypeSystem class for creation of a sequence of constants for finite/infinite types, that would work desireably...);
alarray.native = {
	...alarray.native,
	...general.finiteobj(
		alarray,
		arrmethNames,
		{ integer: false },
		[
			false,
			[false],
			[false, null, null, true],
			[false, null, true],
			[false, false],
			[false, false],
			false,
			[false],
			[false, null]
		],
		[false, false, false, false, null, false, false, false],
		arrmethNames.map(TRUTH)
	)
}

// * Constructs a counter from an InfiniteCounter class;
export const cfromIcc = refactor.general.counterFrom([
	"jumpDirection",
	"jumpReverse"
]).function

// * Constructs a counter from a TrueInteger class (additive);
export const tintAdditive = refactor.general.counterFrom(
	["add", "difference"],
	tnumbers.TrueInteger().static.fromCounter
).function

// ? Add tint-based counters for other operations as well? [same goes for the native JS Number...];
export const tintMultiplicative = () => {
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
}
