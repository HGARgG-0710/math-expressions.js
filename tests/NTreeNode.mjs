// * Testing of NTreeNode data structure

import {  NTreeNode } from "../src/modules/exports/algorithms.mjs"
import { testmultcases as tmc, testOn } from "./test.mjs"

const q =
	(queue, name = "front") =>
	(x) =>
		console.log(queue[name]())

// ! Add the templates...
tmc([], (t) => {
	const ntnc = NTreeNode(t)
	// ! add values for those (maybe, extend the tests instances list... as all this is simply renaming mostly, little necessity for that...);
	const ntreenode = ntnc.class()
	// ! [ABOUT NTREENODE tests] Add arguments. Generalize - check for different values of 'n' what this ought to look like... [and, generalize the number of cases of 'insert' for each iteration - this is too little...];
	testOn(ntreenode, ["insert", "pushback", "pushfront"], [], [])
})
