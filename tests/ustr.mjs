// * Testing of the UnlimitedString

import { UnlimitedString, arrays } from "../src/modules/exports/types.mjs"
import {
	testmultcases as tmc,
	multtestobjmethod as mtom,
	testOn,
	testobjmethod as tom
} from "./test.mjs"

const outstr = (x) => {
	console.log()
	for (const e of x.genarr) console.log(e)
	console.log()
}
const outarr = (x) => {
	console.log(x.array.map((x) => (typeof x === "object" ? x.genarr.array : x)))
}

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
				tom(ustring, "copy", [], false, outstr)
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
				// ! Add arguments... (where needed/wanted)
				throw new Error("That's where we stop!")
				testOn(
					ustring,
					[
						// "read",
						// "write",
						// "tototalindex",
						// "fromtotalindex",
						// "init",
						// "finish",
						// "go",
						// "begin",
						// "end",
						// "concat",
						// "currelem",
						// "next",
						// "previous"
					],
					[[]],
					[],
					outstr
				)
				testOn(ustring.length(), ["get", "set"], [])
				testOn(
					ustring,
					[
						"insert",
						"remove",
						"join",
						"reverse",
						"map",
						"copy",
						"isEmpty",
						"sort",
						"isSorted",
						"indexesOf",
						"includes",
						"order",
						"symbolic",
						"pushback",
						"pushfront"
					],
					[]
				)
				tmc(ustring)
				tmc(ustring.keys())
				testOn(ustring, ["suchthat", "any", "every", "forEach", "multcall"], [])
			}
		)
		test(ustrclass.static.empty)
	}
)
