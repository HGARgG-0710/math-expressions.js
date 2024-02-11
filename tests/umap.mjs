// * Testing of the UnlimitedMap

import { refCompare } from "../src/modules/exports/comparisons.mjs"
import { sym } from "../src/modules/exports/aliases.mjs"
import { arrays, UnlimitedMap } from "../src/modules/exports/types.mjs"
import { testmultcases as tmc, multtestobjmethod as mtom, test, testOn } from "./test.mjs"

const outmap = (umap) => {
	console.log()
	console.log(umap.keys.array)
	console.log(umap.values.array)
	console.log()
}

tmc(
	["LastIndexArray", "DeepArray", "CommonArray"].map((x) => UnlimitedMap(arrays[x]())),
	(umclass) => {
		tmc(
			[
				umclass.static.fromObject({
					a: "hellooououou",
					b: 898,
					ddds: false,
					tarara: sym("a")
				}),
				umclass.class(
					...[
						[10, false, "hallalaoioi", sym("this is a symbol key!")],
						[true, null, 77, "maoilifff"]
					].map((x) => umclass.parentclass.static.fromArray(x).array)
				)
			],
			(insta) => {
				mtom(
					insta,
					"read",
					["a", false, 10, 11].map((x) => [x]),
					[]
				)
				throw new Error("Wait a tick, wait a tick...")
				// ! Add arguments...
				testOn(insta, ["write", "deleteKey", "suchthat"], [], [], outmap)
				mtom(insta, "copy", [[], [(x) => typeof x]], outmap)
				test(refCompare, [insta, insta.copy()])
				mtom(insta, "copied", [[]])
				mtom(insta, "map", [[]])
				mtom(insta, "deleteKeys", [[]])
				mtom(insta, "multcall", [[]])
				tmc(insta)
				tmc(insta.keys)
				tmc(insta.values)
			}
		)
		test(umclass.static.empty)
	}
)
