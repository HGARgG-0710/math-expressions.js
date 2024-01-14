// * Testing of the UnlimitedString

import { UnlimitedString } from "../src/modules/exports/types.mjs"
import { testmultcases as tmc, multtestobjmethod as mtom, testOn } from "./test.mjs"

tmc([undefined].map(UnlimitedString), (ustrclass) => {
	// ! Create instances for it (2-3 will do)
	tmc([], (ustring) => {
		// ! Add arguments... (where needed/wanted)
		testOn(
			ustring,
			[
				"split",
				"tototalindex",
				"fromtotalindex",
				"init",
				"finish",
				"go",
				"begin",
				"end",
				"read",
				"write",
				"concat",
				"currelem",
				"next",
				"previous"
			],
			[]
		)
		testOn(ustring.length(), ["get", "set"], [])
		testOn(
			ustring,
			[
				"copied",
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
	})
	test(ustrclass.static.fromString)
})
