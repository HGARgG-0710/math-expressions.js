// * Tests for the UnlimitedSet

import { sym } from "../src/modules/exports/aliases.mjs"
import { arrays, UnlimitedSet } from "../src/modules/exports/types.mjs"
import { testmultcases as tmc, test, testOn, multtestobjmethod as mtom } from "./test.mjs"

// ! SOME SERIOUSLY STRANGE SHIT IS HAPPENING WITH THE 'EXTENSION' macro... Reconsider it again...;
const outset = (x) => console.log(x.genarr.array)

// ! That is the way that all the tests must look from now on...
// ? Refactor further? [just .forEach an array of 'methods-names' with the corresponding arguments?];
tmc(
	["LastIndexArray", "DeepArray", "CommonArray"].map((x) => UnlimitedSet(arrays[x]())),
	(usclass) => {
		console.log("\n")
		tmc(
			[
				["aaklfa;", true, null, false, sym("ddfas"), false, null],
				[true, false, true, null],
				[
					"ddd",
					"ddd",
					"aada",
					"juuliissss",
					"Julianos",
					"Janos",
					"aada",
					"Villia",
					"Imaginario"
				],
				[11, 25, 11]
			].map(usclass.static.fromArray),
			(instance) => {
				console.log("\n")
				outset(instance)
				mtom(
					instance,
					"ni",
					["Villia", true, 11].map((x) => [x])
				)
				// ! BUUUUUUUUUUUGGGGGG [with GeneralArray] - passing those arrays with 'null' to 'GeneralArray.class' SOMEWHY causes the 'null's to transform to {}! Investigate; 
				// testOn(
				// 	instance,
				// 	[
				// 		"add",
				// 		"delval",
				// 		"copy",
				// 		"copied",
				// 		"union",
				// 		"intersection",
				// 		"complement",
				// 		"subsets",
				// 		"fix"
				// 	],
				// 	[],
				// 	[],
				// 	outset
				// )
			}
		)
		test(usclass.static.empty, [], false, outset)
	}
)

// TODO: add test for 'Symbol.iterator' (see, whether symbols' instantiation via EXTENSIONs in CLASSes works, or not)
