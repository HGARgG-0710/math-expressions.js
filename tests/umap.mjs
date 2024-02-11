// * Testing of the UnlimitedMap

import { refCompare } from "../src/modules/exports/comparisons.mjs"
import { sym, id } from "../src/modules/exports/aliases.mjs"
import { arrays, UnlimitedMap } from "../src/modules/exports/types.mjs"
import { testmultcases as tmc, multtestobjmethod as mtom, test, testOn } from "./test.mjs"
import { T } from "../src/modules/exports/predicates.mjs"

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
					["a", "b", false, 10, 11].map((x) => [x]),
					[]
				)
				testOn(
					insta,
					["write", "deleteKey", "suchthat"],
					[
						[
							["a", 4443],
							[true, false],
							[{}, 111]
						],
						[{}, "a", "tarara"].map((x) => [x]),
						[[[(x) => ["string", "symbol"].includes(typeof x) || x > 0, T]]]
					],
					[],
					outmap
				)
				mtom(insta, "copy", [[], [[(x) => typeof x, id]]], [], outmap)
				test(refCompare, [insta, insta.copy()])
				testOn(
					insta,
					["copied", "map", "deleteKeys", "multcall", "deleteValues"],
					[
						[["write", [null, 11]]],
						[
							[
								[
									(x) => (typeof x !== "symbol" ? x + 1 : x),
									(x) => x.toString()
								]
							]
						],
						[[umclass.parentclass.static.fromArray(["b1", 11])]],
						[
							[
								"write",
								[
									[null, 99],
									[77, "hljl"],
									[999, false]
								],
								true
							]
						],
						[[umclass.parentclass.static.fromArray(["false", false])]]
					],
					[],
					outmap
				)
				testOn(
					insta,
					["every", "any"],
					[
						[[[(x) => !!x, T]], [[T, (x) => !!x]]],
						[[[(x) => !x, T]], [[(x) => !x, (x) => !x]]]
					],
					[]
				)
				tmc(insta)
				tmc(insta.keys)
				tmc(insta.values)
			}
		)
		test(umclass.static.empty, [], false, outmap)
	}
)
