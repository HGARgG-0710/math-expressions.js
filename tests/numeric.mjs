// * Tests for the contents of the 'numeric.mjs'

import {
	polystring,
	fromPolystring,
	sameLength,
	baseconvert,
	native
} from "../src/modules/exports/numeric.mjs"

import {
	testmultcases as tmc,
	multtestobjmethod as mtom,
	multtests as mt
} from "./test.mjs"

const usual = {
	polystring,
	fromPolystring,
	baseconvert
}

const f = (isnative = false) => (isnative ? native : usual)

tmc([false, true].map(f), (scope) => {
	// ! Add templates...
	tmc([], (t) => {
		// ! Add arguments
		mtom(scope, "polystring", [], t)
		mtom(scope, "fromPolystring", [], t)
		mtom(scope, "baseconvert", [], t)
	})
})

// ! Add templates and arguments...
mt(sameLength, [], [])
