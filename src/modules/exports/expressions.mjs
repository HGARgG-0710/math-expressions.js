// * The 'Expressions' API module, historically the earliest part of the library to emerge (differs violently from the first prototypes)

import * as variables from "./variables.mjs"
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

// ? Make into a template to allow for general-types defaults? [another minor general dilemma]
export const Expression = function (operator, expressions = [], objects = []) {
	return {
		operator: operator,
		expressions: expressions,
		objects: objects
	}
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

// ? Create an alias here for the different kinds of 'repeatedApplication' of Expression upon itself? [so as to be able to build recursive Expressions from various user-given data quickly and not by-hand?]
