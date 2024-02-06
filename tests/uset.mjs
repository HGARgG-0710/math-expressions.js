// * Tests for the UnlimitedSet

import { sym, obj } from "../src/modules/exports/aliases.mjs"
import { arrays, UnlimitedSet } from "../src/modules/exports/types.mjs"
import { testmultcases as tmc, test, testOn } from "./test.mjs"

// ! SOME SERIOUSLY STRANGE SHIT IS HAPPENING WITH THE 'EXTENSION' macro... Reconsider it again...; 
const outset = (x) => {
	console.log(x.genarr.array)
}

// ! That is the way that all the tests must look from now on...
// ? Refactor further? [just .forEach an array of 'methods-names' with the corresponding arguments?];
tmc(
	["LastIndexArray", "DeepArray", "CommonArray"].map((x) => UnlimitedSet(arrays[x]())),
	(usclass) => {
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
				outset(instance)
				testOn(
					instance,
					[
						"ni",
						// "add",
						// "delval",
						// "copy",
						// "copied",
						// "union",
						// "intersection",
						// "complement",
						// "subsets",
						// "fix"
					],
					[["Villia", true, 11]],
					[],
					outset
				)
			}
		)
		test(usclass.static.empty, [], false, outset)
	}
)
