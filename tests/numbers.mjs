// * Tests related to TrueInteger and TrueRatio classes.

import { refCompare } from "../src/modules/exports/comparisons.mjs"
import {
	arrayCounter,
	stringCounter,
	numberCounter
} from "../src/modules/exports/counters.mjs"
import { numbers, InfiniteCounter } from "../src/modules/exports/types.mjs"
import { test, testmultcases as tmc, testOn } from "./test.mjs"

const outint = (x) => console.log(x.value.value)

// ! These are the TrueInteger tests - make one for the TrueRatio-s;
const counters = [/* arrayCounter, stringCounter, */ numberCounter].map((x) => x())
const tintclasses = counters.map((x) => numbers.TrueInteger(InfiniteCounter(x)))
tmc(tintclasses.keys(), (i) => {
	const tintclass = tintclasses[i]
	tmc(
		[
			tintclass.class(counters[i].generator()),
			tintclass.static.fromCounter(
				InfiniteCounter(counters[i]).static.two().next().next().next()
			),
			tintclass.static.fromNumber(27),
			tintclass.static.zero(),
			tintclass.static.two(),
			tintclass.static.one().add().add().invadd()
		],
		(instance) => {
			outint(instance)
			outint(instance.copy())
			test(refCompare, [instance.copy(), instance])
			testOn(
				instance,
				[
					/*
					"add",
					"multiply",
					"power", 
					"modulo", 
					"zero",
					"one",
					"two",
					"abs",
					"invadd",
					"difference", 	
					"divide",	
					"root"
					*/
				],
				[
					// [
					// 	tintclass.static.fromNumber(2),
					// 	tintclass.static.fromNumber(12),
					// 	tintclass.static.fromNumber(-5),
					// 	tintclass.static.fromNumber(0)
					// ].map((x) => [x]),
					// [
					// 	tintclass.static.fromNumber(2),
					// 	tintclass.static.fromNumber(-1),
					// 	tintclass.static.fromNumber(3),
					// 	tintclass.static.fromNumber(0)
					// ].map((x) => [x]),
					// [
					// 	// ! ADD THE NEGATIVE POWERS HERE AS WELL!!! [the method was extended into the rational numbers field...];
					// 	tintclass.static.fromNumber(2),
					// 	tintclass.static.fromNumber(1),
					// 	tintclass.static.fromNumber(0)
					// ],
					// [
					// 	tintclass.static.fromNumber(6),
					// 	tintclass.static.fromNumber(7),
					// 	tintclass.static.fromNumber(4),
					// 	tintclass.static.fromNumber(1),
					// 	tintclass.static.fromNumber(-2),
					// 	!instance.equal(instance.zero()) ? instance : instance.add()
					// ],
					// [[]],
					// [[]],
					// [[]],
					// [[]],
					// [[]],
					// [
					// 	instance.one(),
					// 	instance.two(),
					// 	instance.two().add().add().add()
					// ].map((x) => [x]),
					// [
					// 	tintclass.static.fromNumber(4),
					// 	tintclass.static.fromNumber(1),
					// 	tintclass.static.fromNumber(-10),
					// 	!instance.zero().equal(instance) ? instance.invadd() : instance.add()
					// ].map((x) => [x]),
					// [
					// 	tintclass.static.two(),
					// 	tintclass.static.fromNumber(3),
					// 	tintclass.static.fromNumber(4),
					// 	tintclass.static.one()
					// ].map((x) => [x])
				],
				[],
				outint
			)
			// testOn(
			// 	instance,
			// 	["sign", "equal", "compare"],
			// 	[
			// 		[[]],
			// 		[instance, instance.copy(), instance.add(instance.two())].map((x) => [
			// 			x
			// 		]),
			// 		[
			// 			instance.add(),
			// 			instance.difference(),
			// 			instance.difference(instance.two().add())
			// 		].map((x) => [x])
			// 	],
			// 	false
			// )
			// ! Complete the test; Only 'invmult()' is left to do...;
			console.log("\n")
		}
	)
})
