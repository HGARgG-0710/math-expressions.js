// TODO: pray finish the sketch for the 'Structure' API... (used for extended work with native JS object/array-forms...)
export function objStructure(template = {}) {
	return {
		template: {
			form: RESULT.aliases.is.obj,
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
						RESULT.valueCompare(keys, Object.keys(current)) &&
						!!RESULT.min(
							keys.map((k) => this.isisomorphic(object[k], current[k]))
						)
					)
				}
			}
		}
	}
}

export function arrStructure(template = {}) {
	return this.objStructure({
		form: RESULT.aliases.is.arr,
		...template
	})
}
