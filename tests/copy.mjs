// * Testing of all the copying methods.

import { sym, native } from "../src/modules/exports/aliases.mjs"
import {
	refCompare,
	valueCompare,
	_valueCompare
} from "../src/modules/exports/comparisons.mjs"
import { copy } from "./../src/modules/exports/native.mjs"
import { formatOut, test } from "./test.mjs"

const a = [1, 2, 3]
const afc = copy.flatCopy(a)

const b = {
	f: function () {},
	x: sym("siegbrau"),
	anotherstill: 33,
	a: ["p"]
}
const bdc = copy.dataCopy(b)
const bdeepc = copy.deepCopy(b)

const same = (p) => (x, y) => refCompare(...[x, y].map(native.function.index(p)))

const s = sym("hieee!")
const sc = copy.copyFunction({ list: ["symbol"] }).function(s)

formatOut("", [
	() => {
		test(() => afc)
		test(refCompare, [afc, a])
		test(valueCompare, [a, afc], {})
	},
	() => {
		test(() => b)
		test((a, b) => same("x")(a, b) || same("a")(a, b), [b, bdc])
		test(same("f"), [bdc, b])
	},
	() => {
		test(same("f"), [bdeepc, b])
		test(
			_valueCompare,
			[bdeepc, b].map((x) => x.f)
		)
		test(valueCompare, [bdeepc, b], {})
	},
	() => {
		test(refCompare, [s, sc])
		test(_valueCompare, [s, sc])
	}
])
