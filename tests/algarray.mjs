// * Tests related to the 'algorithms.array' algorithms

import { obj, id, native, is } from "../src/modules/exports/aliases.mjs"
import { numberCounter } from "../src/modules/exports/counters.mjs"
import { arrays, numbers, InfiniteCounter } from "../src/modules/exports/types.mjs"
import { array } from "../src/modules/exports/algorithms.mjs"
import { testmultcases as tmc, multtestobjmethod as mtom, testOn } from "./test.mjs"

const { TrueInteger } = numbers
const icclass = InfiniteCounter(numberCounter())
const tintclass = TrueInteger()
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

// ! TEST FOR THE 'native' as well!
tmc([id /* , native.function.index("native") */], (f) => {
	const scope = f(array)	
	testOn(
		scope,
		[
			/* "permutations", "split"*/
		],
		[
			// [[genarrclass.static.fromArray([10, 443, 39])]],
			// [[genarrclass.static.fromArray([13, 331, 11, 29, 77, 331, 331, 331]), 331]]
		],
		{},
		outdarr
	)

	testOn(
		scope,
		[
			/* "generate", "indexesOf", "norepetitions", "join", "concat"*/
		],
		[
			// [
			// 	[1, 11, 3],
			// 	[9, -2, -1]
			// ].map((x) => x.map(native.number.fromNumber({ icclass }).function)),
			// [
			// 	[genarrclass.static.fromArray([10, 33, 234, 33, 33, 10]), 33],
			// 	[genarrclass.static.fromArray([10, 11], 199)]
			// ],
			// [
			// 	[genarrclass.static.fromArray([10, 11, 12, 10, 13, 14]), 10],
			// 	[genarrclass.static.fromArray([1, 2, 3, 4, 5, 7, 9, 9, 9]), 2]
			// ],
			// [
			// 	[
			// 		genarrclass.static.fromArray([
			// 			genarrclass.static.fromArray([123, 4432, 10292]),
			// 			genarrclass.static.fromArray([990, "asfa", "Siijla", null]),
			// 			genarrclass.static.fromArray([true])
			// 		])
			// 	],
			// 	[
			// 		genarrclass.static.fromArray([
			// 			genarrclass.static.fromArray([0, 1, 0, 0, 0, 1]),
			// 			genarrclass.static.fromArray([0, 10, "T", null]),
			// 			genarrclass.static.fromArray([0, 0, false, null, 0])
			// 		]),
			// 		genarrclass.static.fromArray([null, true, false])
			// 	]
			// ],
			// [
			// 	[
			// 		genarrclass.static.fromArray([
			// 			genarrclass.static.fromCounter(
			// 				native.number.fromNumber({ icclass }).function(10)
			// 			),
			// 			genarrclass.static.fromArray(["bababaBABAbA", false, true]),
			// 			genarrclass.static.fromArray([1, 2, 1, 0])
			// 		])
			// 	]
			// ]
		],
		{},
		outarr
	)

	// mtom(
	// 	scope,
	// 	"isSub",
	// 	[
	// 		[
	// 			genarrclass.static.fromArray([2, 1]),
	// 			genarrclass.static.fromArray([1, 2, 3])
	// 		],
	// 		[
	// 			genarrclass.static.fromArray([2, 1, 11]),
	// 			genarrclass.static.fromArray([1, 2, 3])
	// 		]
	// 	],
	// 	{}
	// )
})
