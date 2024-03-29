// * Various comparisons tests

import { sym } from "../src/modules/exports/aliases.mjs"
import { valueCompare, refCompare } from "../src/modules/exports/comparisons.mjs"
import { copy } from "../src/modules/exports/native.mjs"
import { formatOut, test } from "./test.mjs"

// ! NOTE: without the explicit 'bind', this thing don't work as wanted to! CONCLUSION - CREATE AN ALIAS FOR 'bound' objects...
const aob = {
	f: function () {}
}
aob.f = aob.f.bind(aob)
const bob = copy.deepCopy(aob)

const s = sym("t")
const sco = copy.flatCopy(s)

const xarr = ["hello!"]
const xanarr = copy.flatCopy(xarr)

const anxanarr = ["ppu"]

const recarr = []
recarr.push(recarr)
const arecarr = []
arecarr.push(arecarr)

formatOut("", [
	() => {
		test(
			refCompare,
			[bob, aob].map((x) => x.f)
		)
		test(valueCompare, [aob, bob], {})
	},
	() => {
		test(refCompare, [s, sco])
		test(valueCompare, [s, sco], {})
	},
	() => {
		test(refCompare, [xarr, xanarr])
		test(valueCompare, [xarr, xanarr], {})
	},
	() => {
		test(valueCompare, [xarr, anxanarr], {})
		// todo: TEST MORE THROROUGHLY WITH RECURSIVE OBJECTS. THIS IS NOT ENOUGH...
		// ! There may be a bug associated with it somewhere in the library (apparently, with comparing the InfiniteCounter objects as-are via 'valueCompare(ic1, ic2)'; The source of the bug seems to be treatment of recursive objects (and, particularly, the 'this.this.this'...)); 
		test(valueCompare, [recarr, arecarr], {})
	}
])
