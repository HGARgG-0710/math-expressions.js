// * The file that covers various aliases of the library's entities;

// todo: work extensively on the precise list of aliases... Also, their names...
// TODO [general] : perform hardcore alias-reusage ['alias-relinkage'] procedure, thus shortening and simplifying code using newly/previously introduced aliases...

import * as types from "./types.mjs"
import * as counters from "./counters.mjs"
import * as Native from "./native.mjs"
import { ID } from "./../macros.mjs"

export const native = {
	number: {
		numconvert: (x) => (isNaN(x) ? 0 : Number(x)),

		fromNumber: TEMPLATE({
			defaults: {
				icclass: general.DEFAULT_ICCLASS
			},
			function(x = this.template.start) {
				return types
					.InfiniteCounter(counters.addnumber(this.template))
					.class(x)
					.map(this.template.icclass)
			}
		}),

		iterations: TEMPLATE({
			defaults: { iterated: counters.arrayCounter(), defnum: 1 },
			function(n = this.template.defnum) {
				return repeatedApplication(
					undefined,
					nneg(n),
					this.template.iterated[n > 0 ? "generator" : "inverse"]
				)
			}
		}),

		negind: (x, arr) => (x < 0 ? arr.length + x : x),
		nneg: (x) => (x < 0 ? -x : x),
		call: (x) => x()
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
		// ! try hard to use arrow functions only for the aliases;
		hasArrays: (array = []) => array.any(aliases.is.arr)
	},

	function: {
		_const: (c) => () => c,
		void: () => {},
		bind: (a, f, fieldName) => (a[fieldName] = f.bind(a)),
		// TODO: pray finish [generalize to an arbitrary position for each and every function + additional arguments' lists...]
		compose: (fc, args = []) => {
			return this.composition(fc)(...args)
		},
		// ! Use this one extensively...
		wrapper: TEMPLATE({
			function: function (f = this.template.deff) {
				return this.template.inarr
					? (x) => this.template.out(f(...this.template.in(x)))
					: (x) => this.template.out(f(this.template.in(x)))
			},
			defaults: {
				inarr: false,
				in: id,
				out: id,
				deff: id
			}
		}),
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

		exparr: (f) => (arr) => f(...arr),
		rexparr: (arr) => (f) => f(...arr)
	},

	object: {
		ensureProperty: function (object, property, value = undefined) {
			if (!object.hasOwnProperty(property)) object[property] = value
		},
		// * A convinient general-version...
		ensureProperties: function (object, defaultobj) {
			for (const x in defaultobj) ensureProperty(object, x, defaultobj[x])
		},
		// ? should this be in the 'object' or in 'function'? 
		property:
			(p) =>
			(x) =>
			(...args) =>
				x[p](...args),
		empty: () => ({})
	},

	boolean: {
		n: (x) => !x,
		t: true,
		f: false,
		btic: (x, _class) => _class.static[x ? "one" : "zero"]()
	}
}

// * Identity map (just a nice piece of notation, that's all);
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

export const trim =
	(n = 1) =>
	(x) =>
		x.slice(0, x.length - n)

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

export const cdieach = (x, i) => [x[i]]

export const hasFunction = (x, m) => x.hasOwnProperty(m) && typeof x[m] === "function"
