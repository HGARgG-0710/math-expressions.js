// * Tests for the UnlimitedSet

import { UnlimitedSet } from "../src/modules/exports/types.mjs"
import { testmultcases as tmc, test, testOn } from "./test.mjs"

// ! That is the way that all the tests must look from now on...
// ? Refactor further? [just .forEach an array of 'methods-names' with the corresponding arguments?];
tmc([undefined].map(UnlimitedSet), (usclass) => {
	// ! Create instances for it (2-3 will do)
	tmc([], (i) => {
		// ! Add arguments... (where needed/wanted)
		testOn(
			i,
			[
				"ni",
				"add",
				"delval",
				"copy",
				"copied",
				"union",
				"intersection",
				"complement",
				"subsets",
				"fix"
			],
			[]
		)
	})
	test(usclass.static.empty)
})
