// * Tests of the 'Farey' algorithm

import { InfiniteCounter, numbers, arrays } from "../src/modules/exports/types.mjs"
import { addnumber, numberCounter } from "../src/modules/exports/counters.mjs"
import { number } from "./../src/modules/exports/algorithms.mjs"
import { multtests as mt } from "./test.mjs"

const { LastIndexArray } = arrays
const genarrclass = LastIndexArray()

const template = {
	tintclass: numbers.TrueInteger(InfiniteCounter(numberCounter())),
	tratioclass: numbers.TrueRatio(numbers.TrueInteger(InfiniteCounter(numberCounter()))),
	icclass: InfiniteCounter(numberCounter()),
	genarrclass
}

const outint = (x) => console.log(x.value.value)
const outratio = (x) => {
	for (const v of ["numerator", "denomenator"]) outint(x[v])
	console.log()
}
const outratioarr = (x) => {
	for (const y of x) {
		for (const z of y) {
			outratio(z)
			console.log()
		}
		console.log("\n")
	}
	console.log("---")
}

const { farey: Farey } = number
mt(
	Farey,
	[
		[
			template.tratioclass.static
				.fromInteger(template.tintclass.static.fromNumber(-2))
				.invmult(),
			template.tratioclass.static
				.fromInteger(template.tintclass.static.fromNumber(7))
				.invmult(),
			InfiniteCounter(addnumber()).class(4).map(template.icclass)
		],
		[
			template.tratioclass.static
				.fromInteger(template.tintclass.static.fromNumber(7))
				.invmult(),
			template.tratioclass.static.fromInteger(
				template.tintclass.static.fromNumber(13)
			),
			InfiniteCounter(addnumber()).class(5).map(template.icclass)
		]
	],
	template,
	outratioarr
)
