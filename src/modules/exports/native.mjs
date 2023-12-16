// * Algorithms and definitions regarding the native (finite) JS types;
// % note: largely reworked from the old library code...

import { TEMPLATE } from "./../macros.mjs"
import { OBJECT, DEOBJECT } from "../macros.mjs"
import * as aliases from "./aliases.mjs"
import * as variables from "./variables.mjs"
import * as expressions from "./expressions.mjs"
import * as types from "./types.mjs"
import * as multidim from "./multidim.mjs"
import * as comparisons from "./comparisons.mjs"

export const copy = {
	copy: TEMPLATE({
		defaults: {
			objdefmeth: ID,
			arrdefmeth: ID,
			// TODO: make an alias for this...
			defcontext: () => ({})
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
				symbol: (a) => Symbol(aliases.trim(7)(aliases.str(a))),
				arrayFlat: (a) => [...a],
				objectFlat: (a) => ({ ...a })
			}
		}
	}),

	// TODO: find the definition for the general _switch() from a different library of self's, place in this one, then use here...
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
		})
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
	/**
	 * Takes a number and returns a string, containing it's readable variant. (Like 12345 and 12 345)
	 * @param {number} num A number, from which to make a better-looking version of it.
	 */
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
	}),

	// TODO: generalize [put into the 'numerics', use with 'polystring'];
	// ? also -- conversion between the number systems for both old and new api too...; Generalize the thing for it as well (as well as the character-by-character function and many more others...);
	/**
	 * Floors the given number to the needed level of precision.
	 * @param {number} number Number to be floored.
	 * @param {number} afterDot How many positions after dot should there be.
	 * @returns {number}
	 */
	floor: TEMPLATE({
		defaults: { defacc: variables.libPrecision.get },
		function: function (number, afterDot = this.template.defacc) {
			if (afterDot < 0) {
				afterDot = -afterDot
				const inted = String(this.function(number, 0)).reverse()
				// ! use the 'insert' alias here...
				inted = inted.slice(0, afterDot).concat(".", inted.slice(afterDot))
				return Number(inted.reverse().split(".")[0])
			}
			return Number(number.toFixed(afterDot))
		}
	}),
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

// TODO: write the gutInnerObjs function - the object-version of the 'Array.flat()'-kind of method;
// 		TODO: the same way, write objEncircle; there'd also be an argument for the key;
// 		? the same way, write "encircle" and "flat" methods/algorihtm-implementations for the GeneralArray and InfiniteMaps?
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
	}),

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
	}
}

export const array = {
	replace: {
		// TODO: RELOOK THROUGH THESE ONES [the array methods for index-replacement procedures] especially carefully! There's probably a lot of repetition going on here...
		replaceIndex: function (arr, index, value) {
			return [...arr.slice(0, index), value, ...arr.slice(index + 1)]
		},

		replaceIndexes: function (arr, x, y, indexes = [0]) {
			return array
				.splitArr(arr, x)
				.map((seg, i) => seg.concat(indexes.includes(i) ? y : x))
				.flat()
		},

		// * Replaces all occurences of 'x' with 'y';
		replace: function (arr, x, y) {
			return array.replaceIndexes(arr, x, y, number.generate(arr.length))
		},

		// * Replaces values within an array and returns the obtained copy...
		replaceArr: function (array, x, y, transformation = (a) => a) {
			const resArray = [...array]
			for (let i = 0; i < array.length; i++) {
				const index = x.indexOf(array[i])
				if (index !== -1) resArray[i] = transformation(y[index])
			}
			return resArray
		}
	},

	// ? What is this even? Fit only to be an alias...;
	multArrsRepApp: TEMPLATE({
		defaults: { n: 1, default: null },
		function: function (x = this.template.default) {
			const args = Array.from(arguments).slice(1, this.template.n + 1)
			// ? generalize this construction somehow conviniently...
			const defobj = {}
			for (let i = arguments.length; i < this.template.n + 1; i++) defobj[i] = []
			ensureProperties(args, defobj)
			return repeatedApplication(
				(v, i) => this.template.f(v, ...args.map((x) => x[i])),
				Math.min(...args.map((a) => a.length)),
				x
			)
		}
	}),

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

	// ! rewrite as an alias for application of 'repeatedApplication' onto this thing...;
	// ? Generalize such usages of 'repeatedApplication' with some special alias of 'multiple' (works exclusively with arrays, for example?);
	arrEncircleMult(arr = [], coors = []) {
		let newarr = [...arr]
		for (const c of coors) newarr = this.arrEncircle(newarr, ...c)
		return newarr
	},

	countAppearences: TEMPLATE({
		defaults: {
			comparison: comparisons.refCompare,
			defelem: undefined
		},
		function: function (array = [], element = this.template.defelem) {
			return array.filter((x) => this.template.comparison(x, element)).length
		}
	})
}

// ! make heavy usage of 'strmethod' for this thing, pray...;
export const string = {}

// todo: generalize further with the stuff below - create a function for creating a new array from 'cuts coordinates' of another array;
// ? Is one really happy with the way this is getting exported?
// * Gorgeous. Just gorgeous...
string.UTF16 = (p, l) =>
	number.generate(0, l).map((x) => aliases.native.string.fcc(p + x))

string.strmethod = aliases.wrapper({
	in: string.stoa,
	out: string.atos
}).function

// ? suggestion: add all the methods of 'array' to string via the 'strmethod'?
string.sreplaceIndexes = string.strmethod(array.replaceIndexes)
// * Replace the first occurence of a given value within a string...
string.sreplaceFirst = string.sreplaceIndexes
string.sreplace = string.strmethod(array.replace)

string.sreplaceIndex = string.strmethod(array.replaceIndex)

// * 1.
// * Replaces at 1 index;
array.replace.replaceIndexesMult = array.multArrsRepApp({
	n: 2,
	f: array.replaceIndex,
	default: []
}).function
string.sreplaceIndexesMult = string.strmethod(array.replaceIndexesMult)

// * 2.
// * Replaces all occurences of all 'a: a in x' with 'y[x.indexOf(a)]' for each and every such 'a';
array.replace.replaceMany = array.multArrsRepApp({
	n: 2,
	f: array.replace,
	default: []
}).function
string.sreplaceMany = string.strmethod(array.replaceMany)

export const finite = TEMPLATE({
	defaults: {
		definseq: [false],
		defout: false
	},
	function: function (f, out = this.template.defout, inseq = this.template.definseq) {
		// ? Does one want to save these somewhere additionally or simply keep here as-is? [may be useful for the user...];
		const tin = (out) => (out ? native.number.fromNumber : types.arrays.CommonArray())
		const tout = (out) =>
			out
				? (x) => x.map(types.InfiniteCounter(counters.addnumber()))
				: (x) => x.copied("switchclass", [types.arrays.CommonArray()])
		return native.function
			.wrapper({
				out: tout(out),
				in: inseq.map(tin),
				inarr: true
			})
			.function(f)
	}
})
