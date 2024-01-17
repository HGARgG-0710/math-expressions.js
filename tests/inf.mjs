// * Tests for the InfiniteArray, InfiniteString and InfiniteSet

import { refCompare } from "../src/modules/exports/comparisons.mjs"
import { is } from "../src/modules/exports/aliases.mjs"
import { next } from "../src/modules/exports/predicates.mjs"
import { DEFAULT_INFARR } from "../src/modules/exports/general.mjs"
import { InfiniteString, InfiniteSet } from "../src/modules/exports/types.mjs"
import {
	testmultcases as tmc,
	testobjmethod as tom,
	multtestobjmethod as mtom,
	multtests as mt,
	test
} from "./test.mjs"

// ? Add one more test for the 'InfiniteSet' to check whether it is
const classes = [DEFAULT_INFARR, InfiniteString, InfiniteSet]
const predicates = [ID, is.str, ID]

tmc(classes.keys(), (i) => {
	// ! Create instances for this...
	// ! Fix all the tests (refactor them in this fashion - use arrays instead of variables, do not repeat code, put everything in loops + Beautify and add arguments - complete the tests...)
	const instances = []

	tmc(instances, (infarr) => {
		// ! Add arguments...
		mtom(infarr, "read")
		mtom(infarr, "write")

		// ! add arguments...
		mt((p, ind) => predicates[i](infarr.subarr(p)).read(ind), [])
		test(refCompare, infarr.copy() === infarr)
		tom(infarr, "copied")	
		mt((i) => console.log(predicates[i](infarr.read(j)), []))

		// ! Add some interesting functions (same reading indicies as before...);
		infarr.map()
		console.log(predicates[i](infarr.read()))
		infarr.map()
		console.log(predicates[i](infarr.read()))

		// ! Add the indicies...
		console.log(infarr.slice())
		console.log(infarr.slice())
		console.log(infarr.slice())

		// ! DEFINE THE IC-LIMITS for each one of the instances!
		let limit
		let j = infarr.init()
		console.log(j)
		for (const x of infarr) {
			if (i.equal(limit)) break
			console.log(x)
			j = next(j)
		}
	})
})
