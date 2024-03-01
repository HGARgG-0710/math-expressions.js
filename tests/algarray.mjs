// * Tests related to the 'algorithms.array' algorithms

import { id, native, is } from "../src/modules/exports/aliases.mjs"
import { numberCounter } from "../src/modules/exports/counters.mjs"
import { arrays, InfiniteCounter } from "../src/modules/exports/types.mjs"
import { array } from "../src/modules/exports/algorithms.mjs"
import { testmultcases as tmc, multtestobjmethod as mtom, testOn } from "./test.mjs"

const icclass = InfiniteCounter(numberCounter())
const { LastIndexArray } = arrays
const genarrclass = LastIndexArray()

const outarr = (x) => {
	console.log("\n--")
	for (const y of x) console.log(y && is.obj(y) && "value" in y ? y.value : y)
	console.log("--\n")
}
const outdarr = (x) => {
	console.log("\n---")
	for (const y of x) {
		console.log("\n--")
		for (const z of y) console.log(z)
		console.log("--\n")
	}
	console.log("---\n")
}

const f = (b) => (b ? native.function.index("native") : id)

tmc([false, true], (bool) => {
	const scope = f(bool)(array)
	const sf = bool ? id : genarrclass.static.fromArray
	testOn(
		scope,
		["permutations", "split"],
		[
			[[[10, 443, 39]]].map((x) => x.map((x) => x.map(sf))),
			[[[13, 331, 11, 29, 77, 331, 331, 331], 331]].map((x) => [sf(x[0]), x[1]])
		],
		{},
		outdarr
	)

	testOn(
		scope,
		[
			"intersection",
			"generate",
			"indexesOf",
			"norepetitions"
			// ! NOTE: 'native.join' and 'native.concat' DO NOT WORK YET... That is due to the fact of just how immensely broken the type system of the library is as of 1.0alpha;
			// "join",
			// "concat"
		],
		[
			[
				[
					[120, 443, "sa"],
					[9804, 120, 443],
					[false, null, 120, 443, 443, null]
				]
			].map((x) => x.map(bool ? id : genarrclass.static.fromArray)),
			[
				[1, 11, 3],
				[9, -2, -1]
			].map((x) =>
				x.map(bool ? id : native.number.fromNumber({ icclass }).function)
			),
			[
				[[10, 33, 234, 33, 33, 10], 33],
				[[10, 11], 199]
			].map((x) => [sf(x[0]), x[1]]),
			[
				[[10, 11, 12, 10, 13, 14], 10],
				[[1, 2, 3, 4, 5, 7, 9, 9, 9], 2]
			].map((x) => [sf(x[0]), x[1]]),
			[
				[
					[
						genarrclass.static.fromArray([123, 4432, 10292]),
						genarrclass.static.fromArray([990, "asfa", "Siijla", null]),
						genarrclass.static.fromArray([true])
					]
				],
				[
					[
						genarrclass.static.fromArray([0, 1, 0, 0, 0, 1]),
						genarrclass.static.fromArray([0, 10, "T", null]),
						genarrclass.static.fromArray([0, 0, false, null, 0])
					],
					[null, true, false]
				]
			].map((x) => x.map(sf)),
			[
				[
					genarrclass.static.fromArray([
						genarrclass.static.fromCounter(
							native.number.fromNumber({ icclass }).function(10)
						),
						genarrclass.static.fromArray(["bababaBABAbA", false, true]),
						genarrclass.static.fromArray([1, 2, 1, 0])
					])
				]
			]
		],
		array.native.generate(6).map((x) => (x === 2 && bool ? false : {})),
		outarr
	)

	mtom(
		scope,
		"isSub",
		[
			[
				[2, 1],
				[1, 2, 3]
			],
			[
				[2, 1, 11],
				[1, 2, 3]
			]
		].map((x) => x.map(sf)),
		{}
	)
})
