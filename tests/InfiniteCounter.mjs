// * Testing of the InfiniteCounter classes

import { refCompare } from "../src/modules/exports/comparisons.mjs"
import { InfiniteCounter } from "../src/modules/exports/types.mjs"
import { testobjmethod as tom, testmultcases as tmc, test } from "./test.mjs"

// ! Define the templates list for the InfiniteCounter classes to use...
// ^ IDEA: add a 'testing' module to the package to allow for quick creation of different testing procedures? (Or, make into another package that would be dependent upon the current one?);
const templates = []

const outval = (x) => console.log(x.value)

tmc(templates.keys(), (t) => {
	const icc = InfiniteCounter(templates[t])

	// ! Give a value to the new infinite counter...
	const ics = [].map(icc.class)
	tmc(ics, (ic) => {
		test(() => ic, [], false, outval)
		tom(ic, "next", [], {}, outval)
		tom(ic, "previous", [], {}, outval)

		tom(ic, "direction")
		tom(ic.reverse(), "direction")
		test(() => ic.reverse().value, [], false, outval)
		test(() => icc.static.reverse(ic).value, [], false, outval)

		// ! Define the array of new infinite counters...
		tmc([], (d) => {
			tom(d, "compare", [ic])
			tom(d, "difference", [ic], false, outval)
			tom(ic, "difference", [d], false, outval)
		})

		// ! Define arrays for positive jump directions and negative jump directions.
		const pjvals = []
		const njvals = []
		tmc(pjvals, (pj) => tom(ic, "jumpForward", [pj], false, outval))
		tmc(njvals, (nj) => tom(ic, "jumpBackward", [nj], false, outval))

		// * Note: the results ought to be the same as with the previous tests...
		tmc(pjvals.concat(njvals.map((x) => x.reverse())), (j) => {
			tom(ic, "jumpDirection", [j], false, outval)
		})

		tom(ic, "zero", [], false, outval)
		tom(ic.zero(), "direction")
		tom(ic, "one", [], false, outval)
		tom(ic, "two", [], false, outval)
		tom(icc.static, "negone", [], false, outval)
		tom(icc.static.negone(), "direction")

		tmc(ic, outval)

		tom(ic, "equal", [ic.copy()])
		tom(ic, "equal", [ic.next()])
		tom(ic, "equal", [ic.previous()])
		tom(ic, "equal", [ic], false)
		tom(refCompare, [ic, ic.copy()])

		const mapped = ic.map(InfiniteCounter(templates[(t + 1) % t.length]))
		test(() => mapped, [], false, outval)
		tom(ic, "equal", [mapped])

		// ! Add more values to the loop... (replace the 'undefined', and the VOID function there with proper start, body and everything...)
		ic.loop(() => {}, undefined, undefined)
		ic.loop(() => {}, undefined, undefined)
		ic.loop(() => {}, undefined, undefined)
	})
})
