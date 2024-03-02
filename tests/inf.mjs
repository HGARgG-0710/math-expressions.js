// * Tests for the InfiniteArray, InfiniteString and InfiniteSet

import { native } from "../src/modules/exports/aliases.mjs"
import { addnumber } from "../src/modules/exports/counters.mjs"
import { ID } from "../src/modules/macros.mjs"
import { integer } from "../src/modules/exports/algorithms.mjs"
import { refCompare } from "../src/modules/exports/comparisons.mjs"
import { is } from "../src/modules/exports/aliases.mjs"
import {
	InfiniteString,
	InfiniteSet,
	InfiniteCounter,
	InfiniteArray,
	numbers
} from "../src/modules/exports/types.mjs"
import {
	testmultcases as tmc,
	testobjmethod as tom,
	multtestobjmethod as mtom,
	multtests as mt,
	test,
	testOn
} from "./test.mjs"

const { TrueInteger } = numbers
const tintclass = TrueInteger()

// ? Add one more test for the 'InfiniteSet' to check whether it is
const classes = [InfiniteArray /* , InfiniteString, InfiniteSet */].map((x) => x())
const predicates = [ID, is.str, ID]

const outint = (x) => console.log(x.value.map(InfiniteCounter(addnumber())).value)

const instances = [
	[
		(x) => tintclass.static.fromCounter(x),
		(x) => tintclass.static.fromCounter(x.next().next().next().next())
	]
]
const sargs = [[0, 1, 2, 3, 6].map((x) => [integer.isPrime().function, x])]
const outf = [outint, console.log, console.log]

const icc = InfiniteCounter()

// ! Add tests for InfiniteString and InfiniteSet, as well..; 
tmc(classes.keys(), (i) => {
	tmc(instances[i].map(classes[i].class), (infarr) => {
		console.log("\nNEXT INSTANCE:")
		// mtom(
		// 	infarr,
		// 	"write",
		// 	[
		// 		[
		// 			icc.static.two(),
		// 			tintclass.static.fromNumber(19)
		// 		],
		// 		[
		// 			icc.static.zero(),
		// 			tintclass.static.fromNumber(7)
		// 		]
		// 	],
		// 	[],
		// 	ID
		// )
		// mtom(
		// 	infarr,
		// 	"read",
		// 	[
		// 		icc.static.zero(),
		// 		icc.static.two(),
		// 		icc.static.one(),
		// 		icc.static.two().next().next().next()
		// 	].map((x) => [x]),
		// 	[],
		// 	(x) => outf[i](x)
		// )
		// mt(
		// 	(p, ind) => predicates[i](p.read(ind)),
		// 	sargs[i].map((x) => {
		// 		return [
		// 			infarr.copied("subarr", [x[0]]),
		// 			native.number.fromNumber({ icclass: icc }).function(x[1])
		// 		]
		// 	}),
		// 	[],
		// 	outf[i]
		// )

		// test(refCompare, [infarr.copy(), infarr])

		// mt(
		// 	(f, ind) => {
		// 		infarr.map(f)
		// 		return predicates[i](infarr.read(ind))
		// 	},
		// 	[[(x) => x.add(x.two().add().add()), icc.static.two()]],
		// 	[],
		// 	outf[i]
		// )

		// mtom(
		// 	infarr,
		// 	"slice",
		// 	[
		// 		[icc.static.zero(), icc.static.two()],
		// 		[icc.static.two().next().next(), icc.static.two().next().next().next().next()]
		// 	],
		// 	[],
		// 	(x) => {
		// 		for (const y of x)
		// 			outf[i](y)
		// 	}
		// )
	})
})
