// * Tests for the Pointer class

import { sym } from "../src/modules/exports/aliases.mjs"
import { refCompare } from "../src/modules/exports/comparisons.mjs"
import { Pointer } from "../src/modules/exports/types.mjs"

import { test, testmultcases as tmc } from "./test.mjs"

tmc([{ label: "abbbeii", nullptr: true }, { label: "!!", nullptr: {} }, {}], (pt) => {
	const pclass = Pointer(pt)
	test(() => pclass)
	const insts = [
		10,
		"Howdy!",
		false,
		92,
		undefined,
		{ s: "Hello Johny! How are you today?" }
	].map(pclass.class)
	const vs = ["Wududubooolooohaiii", null, sym(""), 10, 443, 100, "fhfhd"]
	tmc(insts.keys(), (i) => {
		console.log("\n")
		test(() => insts[i][pclass.template.label])
		const prevval = insts[i][pclass.template.label]
		test(() => (insts[i][pclass.template.label] = vs[i]))
		test(refCompare, [insts[i][pclass.template.label], prevval])
		test(refCompare, [insts[i][pclass.template.label], vs[i]])
		console.log("\n")
	})
})
