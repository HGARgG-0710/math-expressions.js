// * Tests of contents of 'expressions.mjs'

import { evaluate, Expression, uevaluate } from "../src/modules/exports/expressions.mjs"

// ! List [from "expressions.mjs"]:
// ! Add the templates, pray... [two need to be empty to check the default tables for 'expression' and 'uexpression'...];
const templates = [{}, {}, {}, {}, {}, {}]

// ! Add the Expression-s definitions...
const expressions = [[Expression()], [Expression()], [Expression()]]
const uexpressions = [[Expression()], [Expression()], [Expression()]]
for (const i of expressions.keys())
	console.log(evaluate(templates[i]).function(expressions[i]))
for (const i of uexpressions.keys())
	console.log(uevaluate(templates[expressions.length + i]).function(uexpressions[i]))

// ! FOR THESE TWO - No need to test (just add the 'composition' where desired throughout the library and run the other tests... It ought to be good...);
// expressions.composition
// expressions.FunctionCall - same as 'composition'...;
