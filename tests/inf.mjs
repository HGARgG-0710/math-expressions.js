// * Tests for the InfiniteArray, InfiniteString and InfiniteSet

import { is } from "../src/modules/exports/aliases.mjs"
import { next } from "../src/modules/exports/predicates.mjs"
import { DEFAULT_INFARR } from "../src/modules/exports/general.mjs"
import { InfiniteString, InfiniteSet } from "../src/modules/exports/types.mjs"

// ? Add one more test for the 'InfiniteSet' to check whether it is
const classes = [DEFAULT_INFARR, InfiniteString, InfiniteSet]
const predicates = [ID, is.str, ID]

for (const i in classes) {
	// ! Create instances for this...
	// ! Fix all the tests (refactor them in this fashion - use arrays instead of variables, do not repeat code, put everything in loops + Beautify and add arguments - complete the tests...)
	const instances = []

	for (const infarr of instances) {
		// ! Add indicies
		console.log(infarr.read())
		console.log(infarr.read())

		// ! Add indicies, values
		console.log(infarr.write())
		console.log(infarr.write())

		// ! Add predicates + indicies (same as in the previous 'read')
		console.log(predicates[i](infarr.subarr().read()))
		console.log(predicates[i](infarr.subarr().read()))

		console.log(infarr.copy() === infarr)

		// ! add two different sets of arguments here...
		console.log(infarr.copied())
		console.log(infarr.copied())

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
	}
}
