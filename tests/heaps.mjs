// * Tests of various heap-implementations, as well as PriorityQueue

import { DEFAULT_PRIORITYQUEUE } from "../src/modules/exports/algorithms.mjs"
import { native } from "../src/modules/exports/aliases.mjs"
import { heaps } from "../src/modules/exports/algorithms.mjs"

const heapclasses = ["Pairing", "NAry", "Binomial"]
	.map((x) => `${x}Heap`)
	.map(native.function.rindex(heaps))
// ! Add templates list...
const templates = []

// % NOTE: the tests must be conducted in such amount so as to ensure the presence of 'heap' property in heap-class instances;
for (const i of heapclasses.keys()) {
	const heapclass = heapclasses[i](templates[i])
	// ! Construct a heap array... [use the 'heapclass' in question for that...]
	const heaps = []

	for (const h of heaps) {
		// ! Add arguments to these...
		console.log(h.top())
		console.log(h.add())
		console.log(h.topless())
		// ! fix the 'console.log's - see the desired way to print out (check structure) of a heap-tree/heap-trees;
		console.log(h)
		console.log(h.copy() === h)
		// ! Print out properly (checkably) + choose some interesting function
		console.log(h.copy())
	}
}

// ? Check for inhertied (extended) methods as well?
const pqclass = DEFAULT_PRIORITYQUEUE
// ! Create instances of the 'pqclass';
const pqs = []

for (const pq of pqs) {
	console.log(pq.pull())
	// ! print out the desired part of the strcutre here... (same 'fix console.log' thing as before...)
	console.log(pq)
}
