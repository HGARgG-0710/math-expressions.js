// * Various comparisons tests

import { sym } from "../src/modules/exports/aliases.mjs"
import { valueCompare, refCompare } from "../src/modules/exports/comparisons.mjs"
import { copy } from "../src/modules/exports/native.mjs"

// ! NOTE: without the explicit 'bind', this thing don't work as wanted to! CONCLUSION - CREATE AN ALIAS FOR 'bound' objects...
const aob = {
	f: function () {}
}
aob.f = aob.f.bind(aob)
const bob = copy.deepCopy(aob)

console.log(refCompare(bob.f, aob.f))
console.log(valueCompare().function(aob.f, bob.f))
console.log()

const s = sym("t")
const sco = copy.flatCopy(s)
console.log(refCompare(s, sco))
console.log(valueCompare().function(s, sco))
console.log()

const xarr = ["hello!"]
const xanarr = copy.flatCopy(xarr)
console.log(refCompare(xarr, xanarr))
console.log(valueCompare().function(xarr, xanarr))
console.log()

const anxanarr = ["ppu"]
console.log(valueCompare().function(xarr, anxanarr))