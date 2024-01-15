// * Tests of contents of 'expressions.mjs'

import { evaluate, Expression, uevaluate } from "../src/modules/exports/expressions.mjs"
import { multtests as mt } from "./test.mjs"

// ! Add the tests' definitions...
mt(evaluate, [].map((x) => Expression(...x)), [])
mt(uevaluate, [].map((x) => Expression(...x)), [])

// ! FOR THESE TWO - No need to test (just add the 'composition' where desired throughout the library and run the other tests... It ought to be good...);
// expressions.composition
// expressions.FunctionCall - same as 'composition'...;
