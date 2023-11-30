// * The 'Expressions' API module, historically the earliest part of the library to emerge (differs violently from the first prototypes)

import * as variables from "./variables.mjs"

// ! Currently, incomplete... Finish...

// * Creates a function for execution of operations based on the given operations table...;
export const op = TEMPLATE({
	function: function (operator = this.template.defop, objects = this.template.defobjs) {
		// ? Create some kind of a shortcut (alias) for this thing?
		return Object.values(this.template.optable)
			.map((x) => x[0])
			[Object.keys(this.template.optable).indexOf(operator)](...objects)
	},
	defaults: {
		defop: undefined,
		defobjs: [],
		optable: variables.defaultTable.get
	}
})

/**
 * This class represents a mathematical arithmetic expression.
 *
 * It can also come in helpful when evaluating the same expression various number of times.
 */
export const Expression = TEMPLATE({
	function: function (
		objects = [],
		operators = [],
		indexes = operators.map(aliases._const(0))
	) {
		return {
			this: this,
			objects: objects,
			operators: operators,
			indexes: indexes,
			/**
			 * Just a wrapper for fullExp() function. Watch documentation for it.
			 */
			execute() {
				return fullExp(this.this.template).function(
					this.operators,
					this.objects,
					this.indexes
				)
			},
			// TODO: create a new kind of "repeat": repeat (just repeat) and repeatCompose (the current repeat), also make the repeatCompose take an array of arguments for an operator;
			// TODO: then, add the repeatComposeSame as the current repeat (special case of the repeatCompose)...
			/**
			 * Wrapper for repeatExp() function. Watch documentation for it.
			 * @param {number} times A number, representing how many times should current expression be repeated (By default 1).
			 * @param {string} operator A string, representing the operator, with which ariphmetic operation upon the expression result will be done a several times.
			 */
			repeat(operator, times = 1) {
				return repeatExp(this, operator, times)
			},
			// ! Problem: how does one handle different-table merges? What about naming conflicts? How should they be resolved [if at all?];
			merge(expression) {
				for (const x of ["operators", "objects", "indexes"])
					this[x] = this[x].concat(expression[x])
			}
		}
	},
	defaults: {
		optable: variables.defaultTable.get
	}
})

// Executes an expression;
// ! INCOMPLETE - does not seem to work with expressions of the type 'a(b(p2, p3, p4), c(d(p), pdash), p1)', where a,b,c,d - are operators [in short - don't support multi-directed operators...];
// * This must be fixed before proceeding with the NumberEquation...
export const fullExp = TEMPLATE({
	function: function (
		operators = [],
		objects = [],
		indexes = operators.map(aliases._const(0))
	) {
		// TODO [general; a known runtime bug]: the BigInt usage across the library will cause problems with the Number- and Boolean-based indexation; Pray convert;
		return repeatedApplication(
			(double, i) => {
				let hasMet = false
				return [
					// ? Should it use 'this.template' for 'exp' here instead?;
					// * Consider more generally on the library-scale...

					// ! Write an alias for this 'argument-compilation' procedure from the 'fullExpr'...
					exp({
						optable: this.template.optable
					}).function(
						operators[i],
						generate(0, this.template.optable[operators[i]][1] - 1).map(
							(j) => {
								if (j == indexes[i]) {
									hasMet = i > 0
									return double[0]
								}
								return objects[double[1] + j - hasMet]
							}
						)
					),
					double[1] + this.template.optable[operators[i]][1] - 1
				]
			},
			operators.length,
			[objects[0], 1]
		)[0]
	},
	defaults: {
		optable: variables.defaultTable.get
	}
})

// ? Consider refactoring [couldn't it be rewritten via fullExp];
export const repeatExp = TEMPLATE({
	function: function (args, indexes, roperator, repetitions = 1) {
		return repeatedApplication(
			(r, i) => {
				let hasMet = false
				return aliases.native.op(this.template).function(
					roperator,
					generate(0, this.optable[roperator][1] - 1).map((x) => {
						if (x == indexes[i]) {
							hasMet = i > 0
							return r
						}
						return otherargs[i][x - hasMet]
					})
				)
			},
			repetitions,
			args[0][0]
		)
	},
	defaults: {
		optable: variables.defaultTable.get
	}
})

export const repeatedOperation = TEMPLATE({
	function: function (
		operator,
		objects = [],
		indexes = objects.map(aliases._const(0))
	) {
		return Expression(this.template)
			.class(objects, objects.map(_const(operator), indexes))
			.execute()
	},
	defaults: {
		optable: variables.defaultTable.get
	}
})
