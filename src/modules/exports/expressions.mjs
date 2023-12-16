// * The 'Expressions' API module, historically the earliest part of the library to emerge (differs violently from the first prototypes)

import * as variables from "./variables.mjs"
import * as algorithms from "./algorithms.mjs"
import * as native from "./native.mjs"
import { TEMPLATE } from "./../macros.mjs"

// % This is the 'expressions' main expression-evaluation function;
export const evaluate = TEMPLATE({
	defaults: {
		table: variables.deftable.get
	},
	function: function (expression) {
		if (expression.expressions.length)
			return this.template.table[expression.operator](
				...expression.expressions.map(this.function)
			)
		return this.template.table[expression.operator](...expression.objects)
	}
})

// ? Generalize within the library's context the objects of n-properties?
// ? Make into a template to allow for general-types defaults? [another minor general dilemma]
export const Expression = function (operator = "", expressions = [], objects = []) {
	return { operator, expressions, objects }
}

export const uevaluate = TEMPLATE({
	defaults: {
		deftable: variables.udeftable
	},
	function: function (expression) {
		if (
			expression.expressions.class.template.parentclass.template.icclass
				.class()
				.compare(expression.expressions.length().get())
		)
			return this.template.table.read(expression.operator)(
				expression.expressions.map(this.function)
			)
		return this.template.table.read(expression.operator)(expression.objects)
	}
})

// * Generalization of the 'Expression':
export const composition = function (fcall) {
	return (...args) => {
		return fcall.f(
			...algorithms.integer.native
				.generate(native.number.max([fcall.functions.length, fcall.args.length]))
				.map((x) => {
					// ! PROBLEM - does ___not__ currently allow for things like: (a,b,c) => d(a, e(b, f, g(c))); Fix that...
					if (fcall.functions[x] !== undefined) return this.composition(x)()
					if (!fcall.args) return args[x]
					return fcall.args[x]
				})
		)
	}
}

export const FunctionCall = function (f, functions = [], args = []) {
return { f, functions, args }
}

// ? Create an alias here for the different kinds of 'repeatedApplication' of Expression upon itself? [so as to be able to build recursive Expressions from various user-given data quickly and not by-hand?]
