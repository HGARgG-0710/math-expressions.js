// * Testing of all the copying methods.

import { sym } from "../src/modules/exports/aliases.mjs"
import { valueCompare } from "../src/modules/exports/comparisons.mjs"
import { copy } from "./../src/modules/exports/native.mjs"

const a = [1, 2, 3]
const afc = copy.flatCopy(a)

console.log(afc)
console.log(afc === a)
console.log(valueCompare().function(a, afc))
console.log()

const b = {
	f: function () {},
	x: sym("siegbrau"),
	anotherstill: 33,
	a: ["p"]
}
const bdc = copy.dataCopy(b)

console.log(b)
console.log(bdc.x === b.x || b.a === bdc.a)
console.log(bdc.f === b.f)
console.log()

const bdeepc = copy.deepCopy(b)
console.log(bdeepc.f === b.f)
console.log(valueCompare().function(bdeepc, b))
console.log()

const s = sym("hieee!")
const sc = copy.copyFunction({ list: ["symbol"] }).function(s)
console.log(s === sc)
console.log(s === s)
