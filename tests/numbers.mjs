// * Tests related to TrueInteger and TrueRatio classes.

// todo: before putting out all the tested stuff as an alpha, pray do a inal test run through every single one file and test, check there are no infinite loops, and that everything works smoothly...;

import { obj } from "../src/modules/exports/aliases.mjs"
import { refCompare } from "../src/modules/exports/comparisons.mjs"
import {
	arrayCounter,
	stringCounter,
	numberCounter
} from "../src/modules/exports/counters.mjs"
import { numbers, InfiniteCounter } from "../src/modules/exports/types.mjs"
import { test, testmultcases as tmc, testOn, testobjmethod as tom } from "./test.mjs"

const outint = (x) => console.log(x.value.value)
const outratio = (x) => {
	for (const v of ["numerator", "denomenator"]) {
		console.log(`${v}:`)
		outint(x[v])
	}
}

const counters = [/* arrayCounter, stringCounter, */ numberCounter].map((x) => x())
const tintclasses = counters.map((x) => numbers.TrueInteger(InfiniteCounter(x)))
const tratioclasses = tintclasses.map((c) => numbers.TrueRatio(c))

// tmc(tintclasses.keys(), (i) => {
// 	const tintclass = tintclasses[i]
// 	tmc(
// 		[
// 			tintclass.class(counters[i].generator()),
// 			tintclass.static.fromCounter(
// 				InfiniteCounter(counters[i]).static.two().next().next().next()
// 			),
// 			tintclass.static.fromNumber(27),
// 			tintclass.static.zero(),
// 			tintclass.static.two(),
// 			tintclass.static.one().add().add().invadd()
// 		],
// 		(instance) => {
// 			outint(instance)
// 			outint(instance.copy())
// 			test(refCompare, [instance.copy(), instance])
// 			testOn(
// 				instance,
// 				[
// 					// "add",
// 					// "multiply",
// 					// "power"
// 					// "modulo",
// 					// "zero",
// 					// "one",
// 					// "two",
// 					// "abs",
// 					// "invadd",
// 					// "difference",
// 					// "divide",
// 					// "root"
// 				],
// 				[
// 					[
// 						tintclass.static.fromNumber(2),
// 						tintclass.static.fromNumber(12),
// 						tintclass.static.fromNumber(-5),
// 						tintclass.static.fromNumber(0)
// 					].map((x) => [x]),
// 					[
// 						tintclass.static.fromNumber(2),
// 						tintclass.static.fromNumber(-1),
// 						tintclass.static.fromNumber(3),
// 						tintclass.static.fromNumber(0)
// 					].map((x) => [x]),
// 					[
// 						tintclass.static.fromNumber(-2),
// 						tintclass.static.fromNumber(2),
// 						tintclass.static.fromNumber(1),
// 						tintclass.static.fromNumber(0)
// 					].map((x) => [x]),
// 					[
// 						tintclass.static.fromNumber(6),
// 						tintclass.static.fromNumber(7),
// 						tintclass.static.fromNumber(4),
// 						tintclass.static.fromNumber(1),
// 						tintclass.static.fromNumber(-2),
// 						!instance.equal(instance.zero()) ? instance : instance.add()
// 					],
// 					[[]],
// 					[[]],
// 					[[]],
// 					[[]],
// 					[[]],
// 					[
// 						instance.one(),
// 						instance.two(),
// 						instance.two().add().add().add()
// 					].map((x) => [x]),
// 					[
// 						tintclass.static.fromNumber(4),
// 						tintclass.static.fromNumber(1),
// 						tintclass.static.fromNumber(-10),
// 						!instance.zero().equal(instance)
// 							? instance.invadd()
// 							: instance.add()
// 					].map((x) => [x]),
// 					[
// 						tintclass.static.two(),
// 						tintclass.static.fromNumber(3),
// 						tintclass.static.fromNumber(4),
// 						tintclass.static.one()
// 					].map((x) => [x])
// 				],
// 				[],
// 				(x) => {
// 					if (!("numerator" in x)) outint(x)
// 					else outratio(x)
// 				}
// 			)
// 			testOn(
// 				instance,
// 				["sign", "equal", "compare"],
// 				[
// 					[[]],
// 					[instance, instance.copy(), instance.add(instance.two())].map((x) => [
// 						x
// 					]),
// 					[
// 						instance.add(),
// 						instance.difference(),
// 						instance.difference(instance.two().add())
// 					].map((x) => [x])
// 				],
// 				false
// 			)
// 			tom(instance, "invmult", [], false, outratio)
// 			console.log("\n")
// 		}
// 	)
// })

tmc(tratioclasses.keys(), (i) => {
	const tratioclass = tratioclasses[i]
	tmc(
		[
			tratioclass.class(
				tratioclass.parentclass.parentclass.static.two().value,
				tratioclass.parentclass.parentclass.static.two().next().value
			),
			tratioclass.class(
				tratioclass.parentclass.parentclass.static.two().value,
				tratioclass.parentclass.parentclass.static.two().next().next().value
			),
			tratioclass.class(
				tratioclass.parentclass.parentclass.static.two().next().next().next()
					.value,
				tratioclass.parentclass.parentclass.static
					.two()
					.next()
					.next()
					.next()
					.next()
					.next().value
			),
			tratioclass.static.two(),
			tratioclass.static.one(),
			tratioclass.static.zero(),
			tratioclass.static.fromCounter(
				tratioclass.parentclass.parentclass.static.negone()
			),
			tratioclass.class(
				tratioclass.parentclass.static.one().value.value,
				tratioclass.parentclass.static.fromNumber(-11).value.value
			)
		],
		(instance) => {
			console.log("\n")
			outratio(instance)
			test(refCompare, [instance, instance.copy()])
			testOn(
				instance,
				[
					// * "add", "simplify", "invadd", "invmult", "abs", "copy", "zero", "one", "two" work...
					// "add",
					// "simplify",	
					// "invadd",	
					// "invmult",
					// "abs",	
					// "copy",	
					// "zero",
					// "one",
					// "two",	
					// ! In testing:
					// "multiply",
					// "naivesum",
					// "power",
					// "root",
					// "divide",
					// "difference",
				],
				[
					// [
					// 	[instance.half()],
					// 	[instance.third()],
					// 	[
					// 		tratioclass.static
					// 			.fromInteger(
					// 				tratioclass.parentclass.static.two().add().add()
					// 			)
					// 			.invmult()
					// 			.multiply(
					// 				tratioclass.static.fromInteger(
					// 					tratioclass.parentclass.static.two().add()
					// 				)
					// 			)
					// 	]
					// ],
					// [[]],
					// [[]],
					// [[]],
					// [[]],
					// [[]],
					// [[]],
					// [[]],
					// [[]],
					[[], [], []],
					[[], []],
					[[], [], []],
					[[], [], []],
					[[], [], []],
					[[], [], []],
					[[], []]
				],
				[],
				outratio
			)
			// testOn(
			// 	instance,
			// 	["equal", "direction", "compare", "isWhole"],
			// 	[[], [[]], [], [[]]],
			// 	[]
			// )
		}
	)
})
