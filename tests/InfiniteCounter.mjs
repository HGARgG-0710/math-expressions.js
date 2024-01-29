// * Testing of the InfiniteCounter classes

import {
	numberCounter,
	stringCounter,
	addnumber
} from "../src/modules/exports/counters.mjs"
import { native } from "../src/modules/exports/aliases.mjs"
import { refCompare } from "../src/modules/exports/comparisons.mjs"
import { InfiniteCounter } from "../src/modules/exports/types.mjs"
import { testobjmethod as tom, testmultcases as tmc, test } from "./test.mjs"

// ^ IDEA: add a 'testing' module to the package to allow for quick creation of different testing procedures? (Or, make into another package that would be dependent upon the current one?);
const templates = [
	{ ...numberCounter() },
	{
		...stringCounter()
		// ^ Sum of digits - fun stuff. Unfortunately, lacking proper tests for it (maybe, write them a bit later...)
		// unacceptable: "Feeeffffffa",
		// initialcheck: (x, y) =>
		// 	y
		// 		.slice(0, y.length - 1)
		// 		.split("")
		// 		.map((x) => parseInt(`0x${x}`))
		// 		.reduce((r, i) => r + i) <= x
	},
	{ ...addnumber() },
	undefined
]

const outval = (x) => console.log(x.value)

tmc(templates.keys(), (t) => {
	const icc = InfiniteCounter(templates[t])
	const convert = native.number.fromNumber({ icclass: icc }).function

	// ! MY GOD, IT'S SLOW! Even with numbers like 100, already chokes to death on relatively simple operations...
	const ics = [
		convert(-20),
		convert(30),
		icc.class(),
		icc.static.one(),
		icc.static.two()
	]
	tmc(ics, (ic) => {
		test(
			() => ic,
			[],
			false,
			(x) => {
				outval(x)
				console.log("\n\n")
			}
		)

		tom(ic, "next", [], false, outval)
		tom(ic, "previous", [], false, outval)

		tom(ic, "direction")
		tom(ic.reverse(), "direction")
		tom(ic, "reverse", [], false, outval)
		tom(icc.static, "reverse", [], false)

		tmc([convert(11), convert(-25), icc.static.negone(), icc.static.zero()], (d) => {
			tom(d, "compare", [ic])
			tom(d, "difference", [ic], false, outval)
			tom(ic, "difference", [d], false, outval)
		})

		const pjvals = [convert(1), convert(2), convert(-10), convert(17)]
		const njvals = [convert(-23), convert(-6), convert(1), convert(19)]
		tmc(pjvals, (pj) => tom(ic, "jumpDirection", [pj], false, outval))
		tmc(njvals, (nj) => tom(ic, "jumpReverse", [nj], false, outval))

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
		test(refCompare, [ic, ic.copy()])

		const mapped = ic.map(InfiniteCounter(templates[(t + 1) % templates.length]))
		test(() => mapped, [], false, outval)
		tom(ic, "equal", [mapped])

		tom(
			ic,
			"loop",
			[(_init, nextone) => {
				const t = nextone.jumpDirection(icc.static.two())
				outval(t)
				return t
			}, icc.static.zero(), ic.one() ],
			false,
			outval
		)	
		console.log("\n\n")
	})
})
