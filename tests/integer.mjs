// * Various integer-related algorithms tests

import * as aliases from "../src/modules/exports/aliases.mjs"

import { numberCounter } from "../src/modules/exports/counters.mjs"
import { arrays, InfiniteCounter, numbers } from "../src/modules/exports/types.mjs"

import {
	allFactors,
	areCoprime,
	factorOut,
	isPrime,
	multiples,
	multiplesBefore,
	primesBefore,
	lcm,
	lcd,
	isPerfect,
	factorial,
	binomial,
	sumRepresentations,
	inative as native
} from "../src/modules/exports.mjs"

import { testmultcases as tmc, testOn, multtestobjmethod as mtot } from "./test.mjs"

const usual = {
	allFactors,
	areCoprime,
	factorOut,
	isPrime,
	multiples,
	multiplesBefore,
	primesBefore,
	lcm,
	lcd,
	isPerfect,
	factorial,
	binomial,
	sumRepresentations
}

const outint = (x) => {
	console.log(x.value.value)
}
const outintarr = (arr) => {
	console.log("\n--")
	for (const int of arr) outint(int)
	console.log("--\n")
}
const f = (isnative = false) => (isnative ? native : usual)

const icclass = InfiniteCounter(numberCounter())
const tintclass = numbers.TrueInteger(icclass)

const genarrclass = arrays.LastIndexArray()

tmc([false, true], (boolval) => {
	const scope = f(boolval)
	const template = boolval ? {} : { genarrclass, tintclass, icclass }
	const intf1 = boolval ? aliases.id : tintclass.static.fromNumber
	const intf2 = boolval
		? aliases.id
		: aliases.native.number.fromNumber({ icclass }).function

	testOn(
		scope,
		["factorOut", "allFactors", "primesBefore", "multiples", "multiplesBefore"],
		[
			[35, 54, 2, 1, 0].map((x) => [intf1(x)]),
			[10, 27, 11].map((x) => [intf1(x)]),
			[20, 11, 30].map((x) => [intf2(x)]),
			[
				[4, 3],
				[10, 7],
				[-2, 9]
			]
				.map((x) => x.map(intf1))
				[([11, 30], [3, 12])].map((x) => x.map(intf1))
		],
		template,
		outintarr
	)
	mtot(
		scope,
		"sumRepresentations",
		[
			[14, 3, 2],
			[9, 2, 1]
		].map(
			boolval
				? aliases.id
				: (x) => [
						tintclass.static.fromNumber(x[0]),
						aliases.native.number.fromNumber({ icclass }).function(x[1]),
						tintclass.static.fromNumber(x[2])
				  ]
		),
		template,
		(x) => {
			console.log("\n\n--")
			for (const y of x) {
				console.log("\n--")
				for (const z of y) {
					outint(z)
				}
				console.log("--\n")
			}
			console.log("--\n\n")
		}
	)
	testOn(
		scope,
		["factorial", "binomial", "lcm", "lcd"],
		[
			[1, 2, 3, 4].map((x) => [intf1(x)]),
			[
				[5, 3],
				[4, 4],
				[7, 1]
			].map((x) => x.map(intf1)),
			[[10, 5, 20], [8, 9], [12, 4], [7]].map((x) => x.map(intf1)),
			[
				[2, 3],
				[25, 5, 15]
			].map((x) => x.map(intf1))
		],
		template,
		(x) => (x && !boolval ? outint : console.log)(x)
	)
	testOn(
		scope,
		["isPrime", "isPerfect", "areCoprime"],
		[
			[7, 22, 11, 3, 6, 5].map((x) => [intf1(x)]),
			[1, 3, 6, 28, 19, 30].map((x) => [intf1(x)]),
			[
				[3, 7],
				[10, 2],
				[8, 21],
				[4, 16, 8, 2]
			].map((a) => a.map(intf1))
		],
		template
	)
})
