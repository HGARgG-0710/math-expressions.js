// * Tests for the Pointer class

import { refCompare } from "../src/modules/exports/comparisons.mjs"
import { Pointer } from "../src/modules/exports/types.mjs"

import { test, testmultcases as tmc } from "./test.mjs"

// ! Tests: create various kinds of pointers, access them (2-3 cases is enough);

// ! Add templates
tmc([], (pt) => {
	// ! Add instances definitions and also the 'vs' values...
	const pclass = Pointer(pt)
	const insts = [].map(pclass.function)
	const vs = []
	tmc(insts.keys(), (i) => {
		test(() => insts[i][pt.label])
		const prevval = insts[i][pt.label]
		test(() => (insts[i][pt.label] = vs[i]))
		test(refCompare, [insts[i][pt.label], prevval])
		test(refCompare, [insts[i][pt.label], vs[i]])
	})
})
