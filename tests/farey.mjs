// * Tests of the 'Farey' algorithm

import { number } from "./../src/modules/exports/algorithms.mjs"

const Farey = number.farey

// ! Add the appropriate classes to that thing, pray...
const classes = [
	[{}, {}, {}],
	[{}, {}, {}]
]
// ! Add the values for which the function is to be run...
const values = [[null, null, null], [], []]

for (const c of classes) {
	const f = Farey({
		tintclass: c[0],
		tratioclass: c[1],
		icclass: c[2]
	})
	for (const v of values) console.log(f(...v))
}
