// * Tests of methods and predicates related to TreeNode

import { refCompare } from "../src/modules/exports/comparisons.mjs"
import { TreeNode } from "../src/modules/exports/types.mjs"
import { testobjmethod as tom, testmultcases as tmc, testOn } from "./test.mjs"

// ! Define the test-cases array... [instances of 'tnclass'];
// ? Add more TreeNode classes?
tmc([undefined].map(TreeNode), (_class) => {
	tmc([], (c) => {
		// ! Later, unite the 'tom' and 'tmc' calls with the others in testOn...
		tom(c, "getall")

		// ! Argument values for tests... [check each and every, which need them...];
		testOn(c, ["getpart", "pushback", "pushfront", "firstIndex", "indexesOf"], [])

		tom(c, "copy", [], false, (x) => console.log(refCompare(x, c)))
		tom(c, "copy")

		testOn(c, ["copied", "map", "insert", "delval", "prune"], [])

		tmc(c)
		tmc(c.keys())

		testOn(
			c,
			[
				"read",
				"findRoots",
				"depth",
				"write",
				"findAncestors",
				"commonAncestors",
				"swap"
			],
			[]
		)

		tom(c, "order")

		testOn(c, ["multitoflat", "flattomulti"], [])
	})
})
