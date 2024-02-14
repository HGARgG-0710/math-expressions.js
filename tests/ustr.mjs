// * Testing of the UnlimitedString

import { native } from "../src/modules/exports/aliases.mjs"
import { UnlimitedString, arrays } from "../src/modules/exports/types.mjs"
import {
	testmultcases as tmc,
	multtestobjmethod as mtom,
	testOn,
	testobjmethod as tom
} from "./test.mjs"

const outstr = (x) => {
	console.log()
	console.log(x.genarr.array)
	for (const e of x.genarr) console.log(e)
	console.log()
}
const outarr = (x) => {
	console.log(x.array.map((x) => (typeof x === "object" ? x.genarr.array : x)))
}
const outval = (x) => console.log(x.value)

tmc(
	["LastIndexArray", "DeepArray", "CommonArray"].map((x) =>
		UnlimitedString(arrays[x]())
	),
	(ustrclass) => {
		tmc(
			[
				ustrclass.static.fromString("ABABAALALASIFJJJJJJJLO"),
				ustrclass.class(
					ustrclass.parentclass.static.fromArray([
						"141234",
						"???",
						"What about this?"
					]).array
				)
			],
			(ustring) => {
				outstr(ustring)
				mtom(
					ustring,
					"copy",
					[[], [(s) => native.string.fcc(native.string.cca(s) + 42)]],
					[],
					outstr
				)
				mtom(
					ustring.copy(),
					"split",
					[
						"A",
						"4",
						"about",
						ustrclass.static.fromString("???"),
						ustrclass.static.fromString("AALALASI")
					].map((x) => [x]),
					[],
					outarr
				)
				mtom(
					ustring,
					"read",
					[ustring.init(), ustring.finish(), ustring.one()].map((x) => [x]),
					[]
				)
				testOn(ustring, ["init", "finish"], [[[]], [[]], [[]]], [], outval)
				testOn(
					ustring,
					["end", "begin", "next", "previous"],
					[[[]], [[]], [[], [], []], [[], []]],
					[],
					() => console.log(ustring.currindex)
				)
				testOn(
					ustring,
					["write", "concat"],
					[
						[
							[ustring.init(), "_"],
							[ustring.finish(), "Kddads"]
						],
						[
							["1000aa"],
							[
								ustring.class.class(
									ustring.class.parentclass.static.fromArray([
										"ddasdl",
										"Tururhaljkfl"
									]).array
								)
							]
						]
					],
					[],
					outstr
				)
				testOn(ustring.currelem(), ["get", "set"], [[[]], [["KKF"]]], false)
				tom(ustring.length(), "get", [], false, outval)
				mtom(
					ustring,
					"includes",
					[["a"], ["?"], [ustring.class.static.fromString("FAB")]],
					[]
				)
				mtom(
					ustring.length(),
					"set",
					[
						// ! works, BUT TOO SLOOOOWWW! [make a notice about just how slow the 'UnlimitedString' class really is...];
						// [ustring.length().get().previous().previous()],
						[ustring.length().get().next().next()]
					],
					[],
					outstr
				)
				// ! Add arguments... (where needed/wanted)
				testOn(
					ustring,
					[
						"copied",
						// ! (these two) works, but WAAAAAY too long (again, cause - 'symbolic' and TERRIBLY un-optimized code...);
						// "insert"
						// "remove"
						"reverse",	
						// * currently tested (REQUIRES WORK WITH TrueIntegers); 
						"join",
						// "map",
						// "copy",
						// "isEmpty",
						// "sort",
						// "isSorted",
						// "indexesOf",
						// "symbolic",
						// "pushback",
						// "pushfront",
					],
					[
						[["slice", [ustring.init(), ustring.two().next().next()]]], 
						// [[ustring.two(), "Tereereii"]]	
						// [[], [ustring.finish()]], 	
						[[]]
						// [[]], 
					],
					[],
					outstr
				)
				throw new Error("That's where we stop!")
				tmc(ustring)
				tmc(ustring.keys())
				testOn(ustring, ["suchthat", "any", "every", "forEach", "multcall"], [])
			}
		)
		test(ustrclass.static.empty)
	}
)
