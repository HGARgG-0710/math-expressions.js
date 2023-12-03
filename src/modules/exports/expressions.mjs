// * The 'Expressions' API module, historically the earliest part of the library to emerge (differs violently from the first prototypes)

import * as variables from "./variables.mjs"

// % This is the 'expressions' main expression-evaluation function;
export const evaluate = TEMPLATE({
	defaults: {
		table: variables.defaultTable.get
	},
	function: function (expression) {
		if (expression.expressions.length)
			return this.template.table[expression.operator](
				...expression.expressions.map(this.function)
			)
		return this.template.table[expression.operator](...expression.objects)
	}
})

export const Expression = function (operator, expressions = [], objects = []) {
	return {
		operator: operator,
		expressions: expressions,
		objects: objects
	}
}

// ? Create an alias here for the different kinds of 'repeatedApplication' of Expression upon itself? 
