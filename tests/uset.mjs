// * Tests for the UnlimitedSet

import { sym } from "../src/modules/exports/aliases.mjs"
import { arrays, UnlimitedSet } from "../src/modules/exports/types.mjs"
import {
	testmultcases as tmc,
	test,
	testOn,
	multtestobjmethod as mtom,
	testobjmethod as tom
} from "./test.mjs"
import { refCompare } from "../src/modules/exports/comparisons.mjs"

const outset = (x) => console.log(x.genarr.array)

// ! Apparently, some problem with the 'DeepArray' test; See what it is exactly and fix; 
tmc(
	[/* "LastIndexArray" */, "DeepArray", "CommonArray"].map((x) => UnlimitedSet(arrays[x]())),
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
				testOn(
					instance,
					["add", "delval"],
					[
						["Javdajava", "Javdajava", "Javdajava", 343, 11, null].map(
							(x) => [x]
						),
						[null, 25, false].map((x) => [x])
					],
					[],
					outset
				)
				tom(instance, "copy", [(x) => !!x], false, outset)
				test(refCompare, [instance, instance.copy()])
				mtom(
					instance,
					"copied",
					[
						["union", [instance]],
						[
							"union",
							[usclass.static.fromArray([10, "abababababababbbafadfs", 25])]
						],
						["union", [usclass.static.empty()]],
						[
							"intersection",
							[["Javdajava", "aaklfa;", 343, "ddd"]].map(
								usclass.static.fromArray
							)
						],
						["intersection", [usclass.static.empty()]],
						[
							"complement",
							[
								usclass.static.fromArray([
									343,
									"ddd",
									"aaklfa;",
									"Javdajava"
								])
							]
						],
						["complement", [usclass.static.empty()]]
					],
					[],
					outset
				)
				outset(instance)
				for (let i = 0; i < 5; i++) instance.pushback(10 + i)
				outset(instance)
				tom(instance, "fix", [], false, outset)
				tmc(instance)
				tmc(instance.keys(), (x) => console.log(x.value))
			}
		)
		test(usclass.static.empty, [], false, (x) => {
			console.log()
			outset(x)
		})
	}
)
