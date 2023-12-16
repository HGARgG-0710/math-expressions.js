// * This is the 'Structure API' part of the package - it contains means of working with arbitrary multilayered recursive forms, the shape of which is defined by the user;

import * as algorithms from "./algorithms.mjs"

// ! Use this extensively! [scan the code for any places where forms are used implicitly and refactoring is in place...]
export function objStructure(template = {}) {
	return {
		template: {
			form: aliases.is.obj,
			// * Note: this is a complex example - for 1 argument, it must return the expected 'equivalent', but for 2 - whether they are, in fact, equivalent, (id est: compequiv(a, compequiv(a)) == true);
			compequiv: function (...args) {
				if (args.length === 1) return args[1]
				return true
			},
			...template
		},
		function: function (obj = {}) {
			return {
				template: {
					template: this.template,
					compequiv: this.template.compequiv,
					form: this.template.form,
					object: obj
				},
				equivalent: function () {
					const o = {}
					// ? Just what arguments instead of 'this.template.template' does one desire for the objStructure in this one case, pray tell?
					for (const x in this.template.object)
						o[x] = this.template.form(this.template.obj[x])
							? objStructure(this.template.template)
									.function(this.template.obj[x])
									.equivalent()
							: this.template.compequiv(obj[x])
					return o
				},
				isisomorphic(object, current = this.template.object) {
					if (!this.template.form(object)) {
						return (
							!this.template.form(current) &&
							this.template.compequiv(object, current)
						)
					}
					const keys = Object.keys(object)
					return (
						valueCompare(keys, Object.keys(current)) &&
						!!min(keys.map((k) => this.isisomorphic(object[k], current[k])))
					)
				}
			}
		}
	}
}

export function arrStructure(template = {}) {
	return this.objStructure({
		form: aliases.is.arr,
		...template
	})
}

// * An SUPERBLY useful technique for recursive type-creation and working with layers; Allows one to separate one layer from another using 'comparisons.refCompare' and the out-of-scope object constant;
export function typeConst(f, n = 1) {
	const TCONST = {}
	// ! make an alias for the function in the map;
	const arr = [TCONST].append(
		algorithms.array.native.generate(n - 1).map(() => ({ ...TCONST }))
	)
	return f(Object.freeze(arr))
}
