// * Tests of 'orders.mjs' source file contents

import {
	linear,
	fixLinear,
	nonlinear,
	most,
	min,
	max,
	fromIcc
} from "../src/modules/exports/orders.mjs"

import { multtests as mt } from "./test.mjs"

// ! Choose templates, arguments
mt(linear, [], [])
mt(fixLinear, [], [])
mt(nonlinear, [], [])
mt(most, [], [])
mt(max, [], [])
mt(min, [], [])
mt(fromIcc, [], [])
