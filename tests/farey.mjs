// * Tests of the 'Farey' algorithm

import { number } from "./../src/modules/exports/algorithms.mjs"
import { multtests as mt, testmultcases as tmc } from "./test.mjs"

// ! Add the templates...
tmc([[], []], (c) => {
	const f = number.farey
	// ! Add the values for which the function is to be run...
	mt(Farey, [], {
		tintclass: c[0],
		tratioclass: c[1],
		icclass: c[2]
	})
})
