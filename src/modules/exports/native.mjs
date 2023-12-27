// * Algorithms and definitions regarding the native (finite) JS types;
// % note: largely reworked from the old library code...

// TODO [for the v1.1.]: using 'forms', generalize ALL the object- and array-algorithms that are generalizable using it.

import { TEMPLATE, ID } from "./../macros.mjs"
import { OBJECT, DEOBJECT } from "../macros.mjs"
import * as aliases from "./aliases.mjs"
import * as variables from "./variables.mjs"
import * as types from "./types.mjs"
import * as comparisons from "./comparisons.mjs"
import * as structure from "./structure.mjs"
import * as algorithms from "./algorithms.mjs"
import { general } from "./refactor.mjs"

export const copy = {
	copy: TEMPLATE({
		defaults: {
			objdefmeth: ID,
			arrdefmeth: ID,
			defcontext: aliases.native.object.empty
		},
		function: function (
			arrmeth = this.template.arrdefmeth,
			objmeth = this.template.objdefmeth,
			dcontext = this.template.defcontext
		) {
			return {
				array: (a, method = arrmeth) => a.map(method),
				object: (a, method = objmeth) => objFmap(a, method),
				function: (a, context = dcontext()) => a.bind(context),
				symbol: (a) =>
					Symbol(aliases.trimBeginning(7)(aliases.trimEnd(1)(aliases.str(a)))),
				arrayFlat: (a) => [...a],
				objectFlat: (a) => ({ ...a })
			}
		}
	}).function,

	// ? find the definition for the general _switch() from a different library of self's, place in this one, then use here...
	copyFunction: (() => {
		// ^ IDEA [for a solution]: create a function for generation of functions like such based off objects [for instance: switch-case-like ones (objects, that is)!];
		function typeTransform(x) {
			if (x === "array" || x === "arrayFlat") return aliases.is.arr
			if (x === "objectFlat") return aliases.is.obj
			return (p) => typeof p === x
		}
		return TEMPLATE({
			defaults: { list: [] },
			function: function (a) {
				for (const x of this.template.list)
					if (typeTransform(x)(a)) return copy().function()[x](a, this.function)
				return a
			}
		}).function
	})()
}

// * Copies an object/array deeply...
copy.deepCopy = copy.copyFunction({
	list: ["array", "object", "function", "symbol"]
})

// * Keeps the functions references intact whilst copying...
copy.dataCopy = copy.copyFunction({
	list: ["array", "object", "symbol"]
})

// * Does a flat copy of something;
copy.flatCopy = copy.copyFunction({
	list: ["arrayFlat", "objectFlat", "function", "symbol"]
})

export const number = {
	// ! Note: this thing, while originally intended for numbers representations, actually is better categorized as an element for the string formatting operations;
	// TODO: later, make either such a package/npm-module, or add such a section to the library; Then, put this there...;
	readable: TEMPLATE({
		defaults: {
			mod: 3
		},
		function: function (num = 0) {
			const arr = String(num).split("")
			let affecteds = ""
			while (arr.length % this.template.mod > 0) affecteds += arr.shift()
			arr.forEach((number, index) => {
				affecteds += (index % this.template.mod === 0 ? ` ` : ``) + number
			})
			return affecteds
		}
	}).function,

	// TODO: generalize [put into the 'numerics', use with 'polystring'];
	// ? also -- conversion between the number systems for both old and new api too...; Generalize the thing for it as well (as well as the character-by-character function and many more others...);
	floor: TEMPLATE({
		defaults: { defacc: 16 },
		function: function (number, afterDot = this.template.defacc) {
			if (afterDot < 0) {
				afterDot = -afterDot
				const inted = aliases.str(this.function(number, 0)).reverse()
				inted = aliases.native.array._insert(inted, afterDot, ".")
				return aliases.num(inted.reverse().split(".")[0])
			}
			return aliases.num(number.toFixed(afterDot))
		}
	}).function,
	ceil(x = 1) {
		return this.floor(x) + 1
	},
	min(numarr = []) {
		return Math.min(...numarr)
	},
	max(numarr = []) {
		return Math.max(...numarr)
	}
}

export const object = {
	subobjects(object = {}, prev = []) {
		let returned = []
		if (object instanceof Object && !prev.includes(object)) {
			prev.push(object)
			for (const a in object)
				if (aliases.is.obj(object[a])) {
					returned.push(object[a])
					returned = returned.concat(this.subobjects(object[a], prev))
				}
		}
		return returned
	},
	subobjectsFlat(object = {}) {
		return aliases.obj.values(object).filter(aliases.is.obj)
	},

	// * Checks if a certain object contains a recursive reference;
	isRecursive(object = {}, prevobjsarr = this.subobjects(object)) {
		if (!aliases.is.obj(object)) return false
		return number.max(
			Object.values(object).map(
				(x) => prevobjsarr.includes(x) || this.isRecursive(x, prevobjsarr)
			)
		)
	},

	objInverse: TEMPLATE({
		defaults: {
			notfound: undefined,
			treatUniversal: false
		},
		function: function (obj = {}, treatUniversal = this.template.treatUniversal) {
			const umclass = types.UniversalMap(this.template)
			const objorig = umclass(obj, treatUniversal)
			return umclass(objorig.values, objorig.keys, false)
		}
	}).function,

	obj: OBJECT,

	objMap: function (obj, keys, id = true) {
		const newobj = {}
		for (const key in keys) newobj[keys[key]] = obj[key]
		if (id) {
			const newkeys = aliases.obj.values(keys)
			for (const key in obj) if (!newkeys.includes(key)) newobj[key] = obj[key]
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
		const [obj1Copy, obj2Copy] = Array.from(arguments).map(native.copy.flatCopy)
		this.objClear(obj1, obj1Copy)
		this.objClear(obj2, obj2Copy)
		this.objInherit(obj1, obj2Copy)
		this.objInherit(obj2, obj1Copy)
	},

	objClear: function (obj, objCopy = native.copy.flatCopy(obj)) {
		for (const dp in objCopy) delete obj[dp]
	},

	objInherit: function (obj, parObj = {}) {
		for (const ap in parObj) obj[ap] = parObj[ap]
	},

	propSwap: function (obj, prop1, prop2) {
		const temp = obj[prop1]
		obj[prop1] = obj[prop2]
		obj[prop2] = temp
	},

	ismapped: function (...args) {
		// ? create an aliase for these sorts of things [length-array ensuring of certain same function's call?]; Similar (special case of) ensureProperty;
		aliases.native.object.ensureProperties(args, [{}, {}])
		return comparisons.valueCompare().function(...args.map(aliases.obj.keys))
	},

	gutInnerObjs(obj = {}) {
		const gutted = {}
		for (const y in obj) {
			if (aliases.is.obj(obj[y])) {
				gutted = { ...gutted, ...obj[y] }
				continue
			}
			gutted[y] = obj[y]
		}
		return gutted
	},

	objEncircle(obj, newkey, keys = []) {
		const encirled = { [newkey]: {} }
		for (const y of aliases.obj.keys(obj)) {
			if (keys.includes(y)) {
				encirled[newkey] = obj[y]
				continue
			}
			encircled[y] = obj[y]
		}
		return encircled
	}
}

export const array = {
	replace: {
		replaceIndex: function (arr = [], index = 0, value = undefined) {
			return [...arr.slice(0, index), value, ...arr.slice(index + 1)]
		},

		replaceIndexes: function (arr, x, y, indexes = [0]) {
			return algorithms.array.native
				.split()
				.function(arr, x)
				.map((seg, i) => seg.concat(indexes.includes(i) ? y : x))
				.flat()
		},

		// * Replaces all occurences of 'x' with 'y';
		replace: function (arr, x, y) {
			return array.replaceIndexes(arr, x, y, algorithms.array.generate(arr.length))
		},

		// * Replaces values within an array and returns the obtained copy...
		replaceArr: function (array, x, y, transformation = ID) {
			const resArray = [...array]
			for (let i = 0; i < array.length; i++) {
				const index = x.indexOf(array[i])
				if (index !== -1) resArray[i] = transformation(y[index])
			}
			return resArray
		}
	},

	// ? What is this even? Fit only to be an alias...;
	// ! decompose onto aliases, then consider what to do with it...
	multArrsRepApp: TEMPLATE({
		defaults: { n: 1, default: null },
		function: function (x = this.template.default) {
			const args = Array.from(arguments).slice(1, this.template.n + 1)

			// ? generalize conviniently...
			const defobj = {}
			for (let i = arguments.length; i < this.template.n + 1; i++) defobj[i] = []
			ensureProperties(args, defobj)

			return repeatedApplication(
				(v, i) =>
					this.template.f(v, ...args.map(aliases.native.function.index(i))),
				number.min(args.map(aliases.native.function.index("length"))),
				x
			)
		}
	}).function,

	// * "reverses" the "Array.flat()";
	arrEncircle: function (a, from = 0, to = a.length) {
		from = aliases.negind(from, a)
		to = aliases.negind(to, a)
		const copied = []
		for (let i = 0; i < a.length; i++) {
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
	arrEncircleMult(arr = [], coors = []) {
		return structure.native.repeatedApplication([...arr], coors.length, (r, i) =>
			this.arrEncircle(r, coors[i])
		)
	},

	// ! Later, (in v1.1, when working on 'statistics', pray relocate 'countAppearences' to there...);
	countAppearences: TEMPLATE({
		defaults: {
			comparison: comparisons.refCompare,
			defelem: undefined
		},
		function: function (array = [], element = this.template.defelem) {
			return array.filter((x) => this.template.comparison(x, element)).length
		}
	}).function
}

// ! make heavy usage of 'strmethod' for this thing, pray...;
export const string = {
	strmethod: aliases.wrapper({
		in: aliases.native.string.stoa,
		out: aliases.native.string.atos
	}).function,
	replace: {}
}
for (const x in array.replace)
	string.replace[`s${x}`] = string.strmethod(array.replace[x])
string.sreplaceFirst = string.sreplaceIndexes

// ? generalize further with the stuff below - create a function for creating a new array from 'cuts coordinates' of another array;
// * Gorgeous. Just gorgeous...
string.UTF16 = (p, l = 0) =>
	algorithms.integer
		.generate(0, l, (-1) ** (l < 0))
		.map((x) => aliases.native.string.fcc(p + x))

array.replace.replaceIndexesMult = array.multArrsRepApp({
	n: 2,
	f: array.replace.replaceIndex,
	default: []
}).function
string.replace.sreplaceIndexesMult = string.strmethod(array.replaceIndexesMult)

array.replace.replaceMany = array.multArrsRepApp({
	n: 2,
	f: array.replace.replace,
	default: []
}).function
string.replace.sreplaceMany = string.strmethod(array.replace.replaceMany)

export const finite = TEMPLATE({
	defaults: {
		definseq: [false],
		defout: false,
		integer: false
	},
	function: function (f, out = this.template.defout, inseq = this.template.definseq) {
		const f = this.template.integer
			? ID
			: general.DEFAULT_TINTCLASS.static.fromCounter
		// ? Does one want to save these somewhere additionally or simply keep here as-is? [may be useful for the user...];
		const tin = (out) =>
			out ? f(native.number.fromNumber) : types.arrays.CommonArray()
		const tout = (out) =>
			out
				? (x) => x.map(types.InfiniteCounter(counters.addnumber())).value
				: (x) => x.copied("switchclass", [types.arrays.CommonArray()]).array
		return aliases.native.function
			.wrapper({
				out: tout(out),
				in: inseq.map(tin),
				inarr: true
			})
			.function(f)
	}
}).function
