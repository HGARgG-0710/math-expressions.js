// * The file that covers various aliases of the library's entities;

// todo: work extensively on the precise list of aliases... Also, their names...
// TODO [general] : perform hardcore alias-reusage ['alias-relinkage'] procedure, thus shortening and simplifying code using newly/previously introduced aliases...
// ^ DECISION: DO NOT delete the native algorithms implementations; Keep them under 'native' instead [so as to avoid the 'wrapper' conversion, in situations when it would be necessary, the user has the appropriate ability...];

import * as types from "./types.mjs"
import * as counters from "./counters.mjs"
import * as multidim from "./multidim.mjs"
import { ID } from "./../macros.mjs"

// ! Everything here ought to have a generalized version for the Infinite Types in the '.main' part of the library;
// TODO [general, minor detail] : work on the spacing - all the definition lines must have a 1-spacing between each other [for readability]; The non-definition lines ('a:b' - pure aliases) ought to be 'grouped' without such a spacing;
export const native = {
	number: {
		numconvert: (x) => (isNaN(x) ? 0 : Number(x)),

		fromNumber: TEMPLATE({
			function(x = this.template.start) {
				return main
					.InfiniteCounter(counters.addnumber(this.template))
					.class(x)
					.map(this.template.icclass)
			}
		}),

		iterations: TEMPLATE({
			defaults: { iterated: counters.arrayCounter(), defnum: 1 },
			function(n = this.template.defnum) {
				return multidim.native.repeatedApplication(
					undefined,
					nneg(n),
					this.template.iterated[n > 0 ? "generator" : "inverse"]
				)
			}
		})
	},

	string: {
		stoa(x = "") {
			return x.split("")
		},

		atos(x = []) {
			return x.join("")
		},

		fcc: String.fromCharCode,

		strMap: function (str, symb = ID, isStrOut = false) {
			return (isStrOut ? (x) => x.join("") : id)(str.split("").map(symb))
		}
	},

	array: {
		// * What about 'firstSuch' and 'lastSuch' instead??? Then, '_first' and '_last' would be just 'first' and 'last' correspondently...
		last: (arr, obj, comparison = valueCompare) => {
			return max(
				native.array
					.indexesOf({ comparison: comparison })
					.function(arr, obj, comparison)
			)
		},
		first: (arr, obj, comparison = valueCompare) => {
			return min(
				native.array
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
		_insert: (arr, index, val) => insert(arr, index, [val]),
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
			return array.filter(negate(aliases.is.arr))
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
		hasArrays: function (array = []) {
			return array.any(aliases.is.arr)
		}
	},

	function: {
		_const: (c) => () => c,
		void: () => {},
		bind: (a, f, fieldName) => (a[fieldName] = f.bind(a)),
		// TODO: pray finish [generalize to an arbitrary position for each and every function + additional arguments' lists...]
		compose: (fs = []) => {
			if (!fs.length) return undefined
			return fs[fs.length - 1](compose(fs.slice(0, fs.length - 1)))
		},
		// ! Use this one extensively...
		wrapper: TEMPLATE({
			function: function (f = this.template.deff) {
				return (x) => this.template.out(f(this.template.in(x)))
			},
			defaults: {
				in: id,
				out: id,
				deff: id
			}
		})
	},

	object: {
		ensureProperty: function (object, property, value = undefined) {
			if (!object.hasOwnProperty(property)) object[property] = value
		},
		// * A convinient general-version...
		ensureProperties: function (object, defaultobj) {
			for (const x in defaultobj) ensureProperty(object, x, defaultobj[x])
		}
	},

	boolean: {
		n: (x) => !x,
		t: true,
		f: false
	}
}

// * Identity map (just a nice piece of notation, that's all);
/**
 * * The identity map;
 *
 * DEFINITION:
 *
 * WIKI:
 */
export const id = ID

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

export const ustr = types.UnlimitedString
export const genarr = types.GeneralArray

// TODO: work more on the structure of the 'aliases' module; In particular - distribute those ones definitions somehwere more appropriate ['function', for instance?];
// ! USE THIS ONE ESPECIALLY...
export const property =
	(p) =>
	(x) =>
	(...args) =>
		x[p](...args)
export const trim =
	(n = 1) =>
	(x) =>
		x.slice(0, x.length - n)
// ! Use throughout the library...;
export const paramDecide =
	(cond) =>
	(a = ID, b = ID) =>
	(...args) =>
		(cond() ? a : b)(...args)
export const exparr = (f) => (arr) => f(...arr)

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
	nan: isNaN
}

/**
 * * Returns the function returning the logical negation of the output of the function passed relative to the input of the newly passed argument;
 *
 * In short, performs logical negation of a function;
 *
 * DEFINITION:
 *
 * WIKI:
 */
// * in this case, rewrite this via a wrapper...
export const negate = wrapper({
	out: n
}).function
export const TRUTH = native.function._const(true)
export const T = TRUTH
export const FALLACY = native.function._concat(false)
export const F = FALLACY
export const VOID = native.function.void

// ! use these four a lot...
// ! use the aliases even in the aliases definitions... Refactor very greatly indeed...
export const lesser = (a, b) => !a.compare(b)
export const greater = (a, b) => !b.compare(a)
export const lesseroe = (a, b) => b.compare(a)
export const greateroe = (a, b) => a.compare(b)

export const cdieach = (x, i) => [x[i]]
export const negind = (x, arr) => (x < 0 ? arr.length + x : x)
export const nneg = (x) => (x < 0 ? -x : x)

export const next = (x) => x.next()