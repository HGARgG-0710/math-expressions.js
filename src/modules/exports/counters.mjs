import { GENERATOR, ID } from "./../macros.mjs"
import * as comparisons from "./comparisons.mjs"
import * as variables from "./variables.mjs"
import * as multidim from "./multidim.mjs"
import * as aliases from "./aliases.mjs"

export const number = GENERATOR({
	defaults: { start: 0 },
	generator(x = this.template.start) {
		return this.template.forward(Number(x))
	},
	inverse(x = this.template.start) {
		return this.template.backward(Number(x))
	},
	range: negate(isNaN)
})
// ? QUESTION [1]: the degree to which some such thing may be extended, mayhaps? [Namely, ought one be able to extend the object passed down to the 'number' right there or not?]
// ? QUESTION [2]: does one want to make a macro for this one, or categorize into one of the already existing ones [as a TEMPLATE, perhaps]? Pray consider...
// * Current decision [temporary]: leave alone such cases for now, as are...
// ! notice: should there generally not be a mean to extend BOTH the template's shape {the data} and the template's function {the transformation regulated by the data};
export function addnumber(template = {}) {
	return number({
		template: { fdiff: 1, bdiff: -1, ...template },
		forward(x) {
			return x + this.template.fdiff
		},
		backward(x) {
			return x + this.template.bdiff
		}
	})
}

export function multnumber(template = {}) {
	return number({
		template: { fdiff: 1, bdiff: -1, ...template },
		forward(x) {
			return x * this.template.fdiff
		},
		backward(x) {
			return x * this.template.bdiff
		}
	})
}
// * Probably the "simplest" infinite counter one would have in JS is based off this generator;
export const arrayCounter = GENERATOR({
	defaults: {
		start: null
	},
	generator(a = this.template.start) {
		if (!this.range(a)) this.template.start = a
		return [a]
	},
	// ? How about a default argument for this one? [Generally - pray look for such "unresolved" tiny things, such as missing default arguments' values];
	inverse: function (a) {
		return a[0]
	},
	range: function (a) {
		return (
			a === this.template.start ||
			(a instanceof Array && this.range(this.inverse(a)))
		)
	}
})

// * Generalization of the thing above (arrayCounter)...
export const objCounter = GENERATOR({
	defaults: {
		field: "",
		start: null,
		// ? Does one desire the refCompare? Or valueCompare to be the default?
		comparison: aliases.refCompare
	},
	generator: function (a = this.template.start) {
		if (!this.range(a)) this.template.start = a
		return { [this.template.field]: a }
	},
	inverse: function (a) {
		return a[this.template.field]
	},
	range: function (a) {
		return (
			this.template.comparison(a, this.template.start) ||
			(typeof a === "object" && this.range(this.inverse(a)))
		)
	}
})

// * A maximally efficient structurally counter based on array recursion and finite orders;
export const recursiveCounter = function (template = {}) {
	const returned = {
		defaults: {
			comparison: comparisons.valueCompare,
			maxarrlen: variables.MAX_ARRAY_LENGTH.get,
			type: aliases._const(true),
			...template
		},
		range(x) {
			return (
				aliases.is.arr(x) &&
				!!x.length &&
				!!min(
					x.map(
						(y) =>
							this.template.type(y) || (aliases.is.arr(x) && this.range(y))
					)
				)
			)
		}
	}

	const findDeepUnfilled = (t = true) => {
		return multidim.findDeepUnfilled({
			soughtProp: (x) =>
				returned.template.type(x) &&
				(t ? aliases.id : aliases.n)(returned.template.sign(x)),
			bound: t ? returned.template.upper : returned.template.rupper,
			comparison: returned.template.comparison
		}).function
	}
	const findDeepUnfilledArr = multidim.findDeepUnfilledArr({
		bound: returned.template.maxarrlen
	})
	const findDeepLast = multidim.findDeepLast({ soughtProp: returned.template.type })

	const keys = ["inverse", "generator"]
	keys.map(
		(x, i) =>
			(returned[x] = function (t) {
				return generalgenerator(t, !!i, this)
			}.bind(returned))
	)

	function signedAdd(sign) {
		return function (thisobject) {
			return function (x) {
				let indexes = findDeepUnfilled(sign)(x)
				let result = x

				if (!indexes) {
					indexes = findDeepUnfilledArr(x)
					if (!indexes) return [x]

					result = recursiveIndexationInfFields()(result, indexes)

					// TODO: generalize the construction [[...]] of depth 'n'; Create the simple alias-functions for quick creation of recursive arrays;
					// * Including the infinite versions of them...
					result = repeatedApplication()(
						(value) => {
							value.push([])
							return value[value.length - 1]
						},
						dim({
							icclass: indexes.this.class.template.icclass
						})(a)
							.difference(indexes.length())
							.previous(),
						result
					)
					result.push(thisobject.template.lower)
					return x
				}

				result = recursiveIndexationInfFields()(
					result,
					indexes.slice(undefined, indexes.finish().previous())
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
					!findDeepUnfilled(sign)(x) &&
					findDeepUnfilledArr(x) &&
					x.length === 1
				)
					return x[0]

				// TODO [general]: use the 'recursiveSetting' where appropriate; Create an infinite version for it as well...
				let lastIndexes = findDeepLast(a)
				const finind = lastIndexes.final()
				const ffinind = finind.previous()
				// * Note: the one underneath here is an old note;
				// ! do the 'ppointer' stuff after having made sure that the 'lastNumIndexes.length().compare(lastNumIndexes.init().next().next())'
				let ppointer = recursiveIndexationInfFields()(
					x,
					lastIndexes.slice(undefined, ffinind.previous())
				)
				let pointer = recursiveIndexationInfFields()(
					x,
					lastIndexes.slice(undefined, ffinind)
				)
				const llindex = lastIndexes.read(ffinind)
				const lindex = lastIndexes.read(finind)

				if (thisobject.template.sign(pointer[lindex])) {
					pointer[lindex] = thisobject.template[sign ? "forward" : "backward"](
						pointer[lindex]
					)
					return x
				}

				ppointer[llindex] = aliases._remove(ppointer[llindex], lindex)
				pointer = ppointer[llindex]

				let index = lindex
				let hlindex = llindex

				// TODO [local refactoring]: the pre-while-loop piece of code is nigh exactly the same as that within the loop; Pray re-organize to make this stuff shorter and more concise... [for instance, separate declarations from definitions and on and on...]
				while (!pointer.length) {
					// TODO: now, this is a RECURSIVE step, so, for instance, one accomplishes this same one procedure not just for 'pointer', but for the 'ppointer' and all the other ones such as well...
					// * Consider carefully how to do this precisely...
					// ? Some of these things do tend to re-appear quite some number of times here... Generalize?
					index = index.previous()
					ppointer = recursiveIndexationInfFields()(
						x,
						lastIndexes.slice(undefined, (hlindex = hlindex.previous()))
					)
					ppointer[hlindex] = aliases._remove(ppointer[hlindex], index)
					pointer = recursiveIndexationInfFields()(
						x,
						lastIndexes.slice(undefined, index)
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
		let r = deepCopy(x)
		return boolfunctswitch(thisobj.template.globalsign(r), bool)(thisobj)(r)
	}

	return GENERATOR(returned)
}

// * That's an example of an infinite counter;
// * btw, it is non-linear, that is one can give to it absolutely any array, like for example [[[0, 1234566643]]], and it won't say word against it; will continue in the asked fashion...
// * This particular nice feature allows to build different InfiniteCounters with different beginnings on it...
// note: creates new objects after having been called;
export function numberCounter(template = {}) {
	return recursiveCounter({
		upper: variables.MAX_INT.get,
		lower: 0,
		rupper: -variables.MAX_INT.get,
		sign: (x) => x > 0,
		// TODO: generalize this to an 'alias';
		globalsign: function (x) {
			return !!methods.max(x.map((a) => this.sign(a) || this.globalsign(a)))
		},
		// ? Should this not be replaced with !isNaN(x)? [this'd permit stuff like '[true]' to be recieved by the '.range()'; ]
		// * Also, create an alias for that thing pray...
		type: (x) => typeof x === "number" || x instanceof Number,
		forward: (x) => x + 1,
		backward: (x) => x - 1,
		...template
	})
}

// A special case of 'recusiveCounter';
// * Uses array-orders (by default);
export function orderCounter(template = {}) {
	return recursiveCounter({
		upper: template.order[template.strorder.length - 1],
		lower: template.order[Math.floor(template.order.length / 2)],
		rupper: template.order[0],
		forward: (x) => template.order[template.order.indexOf(x) + 1],
		backward: (x) => template.order[template.order.indexOf(x) - 1],
		globalsign: function (x) {
			return !!methods.max(x.map((a) => this.sign(a) || this.globalsign(a)))
		},
		sign: (x) => strorder.indexOf(x) > Math.floor(template.order.length / 2),
		...template
	})
}

export function stringCounter(template = {}) {
	return orderCounter({
		type: (x) => typeof x === "string" || x instanceof String,
		order: generate(1, variables.MAX_INT).map((x) => nbasereverse(x)),
		...template
	})
}

export const circularCounter = (() => {
	const final = {
		defaults: {
			values: [],
			multitude: { new: null, is: null, map: null },
			hop: 1
		},
		range(x) {
			return this.template.values.includes(x)
		}
	}

	const generalized = (name, sign) =>
		function (x) {
			if (this.template.multitude.is(x))
				return this.template.multitude.map(x, (a) => this[name])
			const vals = aliases.native.array
				.indexesOf(this.template.values, x)
				.map(
					(i) =>
						this.template.values[
							(i + sign * this.template.hop) % this.template.values
						]
				)
			if (vals.length == 1) return vals[0]
			return this.template.multitude.new(vals)
		}
	const arr = ["generator", "range"]
	for (const i of [0, 1]) final[arr[i]] = generalized(arr[i], (-1) ** i)

	return GENERATOR(final)
})()

export function arrCircCounter(template = {}) {
	return circularCounter.function({
		multitude: {
			new: ID,
			is: (x) => x instanceof Array,
			map: (x, f) => x.map(f)
		},
		...template
	})
}

export const finiteCounter = (() => {
	const F = {}
	const keys = ["generator", "inverse"]
	const labels = ["next", "previous"]
	for (const x of keys)
		F[x] = function (item) {
			return this.template.values.read(
				this.template.values.firstIndex(item)[labels]()
			)
		}
	return GENERATOR({
		defaults: {},
		...F, 	
		range(x) {
			return this.template.values.includes(x)
		},
	})
})()
