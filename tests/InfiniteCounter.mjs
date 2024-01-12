// * Testing of the InfiniteCounter classes

import { InfiniteCounter } from "../src/modules/exports/types.mjs"

// ! Define the templates list for the InfiniteCounter classes to use...
// ^ IDEA: add a 'testing' module to the package to allow for quick creation of different testing procedures? (Or, make into another package that would be dependent upon the current one?);
const templates = []

for (const t of templates.keys()) {
	const icc = InfiniteCounter(templates[t])
	// ! Give a value to the new infinite counter...
	const ic = icc.class()
	console.log(ic.value)
	console.log(ic.next().value)
	console.log(ic.next().value)
	ic = ic.previous().previous()
	console.log(ic.previous().value)
	console.log(ic.previous().value)

	console.log(ic.direction())
	console.log(ic.reverse().direction())
	console.log(ic.reverse().value)
	console.log(icc.static.reverse(ic).value)

	// ! Define the array of new infinite counters...
	const diffics = []
	for (const d of diffics) {
		console.log(d.compare(ic))
		console.log(d.difference(ic).value)
		console.log(ic.difference(d).value)
	}

	// ! Define arrays for positive jump directions and negative jump directions.
	const pjvals = []
	const njvals = []
	for (const pj of pjvals) console.log(ic.jumpForward(pj).value)
	for (const nj of njvals) console.log(ic.jumpBackward(nj).value)

	// * Note: the results ought to be the same as with the previous tests...
	const jvals = pjvals.concat(njvals.map((x) => x.reverse()))
	for (const j of jvals) console.log(ic.jumpDirection(j).value)

	console.log(ic.zero().value)
	console.log(ic.zero().direction())
	console.log(ic.one().value)
	console.log(ic.two().value)
	console.log(icc.static.negone().value)
	console.log(icc.static.negone().direction())

	for (const x of ic) console.log(x.value)

	console.log(ic.equal(ic.copy()))
	console.log(ic.equal(ic.next()))
	console.log(ic.equal(ic.previous()))
	console.log(ic === ic.copy())

	const mapped = ic.map(InfiniteCounter(templates[(t + 1) % t.length]))
	console.log(mapped.value)
	console.log(ic.equal(mapped))

	// ! Add more values to the loop... (replace the 'undefined', and the VOID function there with proper start, body and everything...)
	ic.loop(() => {}, undefined, undefined)
	ic.loop(() => {}, undefined, undefined)
	ic.loop(() => {}, undefined, undefined)
}
