// * Tests of various heap-implementations, as well as PriorityQueue

import { aliases } from "../src/modules/exports.mjs"
import { refCompare } from "../scr/modules/exports/comparisons.mjs"
import { DEFAULT_PRIORITYQUEUE } from "../src/modules/exports/algorithms.mjs"
import { native } from "../src/modules/exports/aliases.mjs"
import { heaps } from "../src/modules/exports/algorithms.mjs"
import {
	testmultcases as tmc,
	multtestobjmethod as mtom,
	testobjmethod as tom
} from "./test.mjs"

const heapclasses = ["Pairing", "NAry", "Binomial"]
	.map((x) => `${x}Heap`)
	.map(native.function.rindex(heaps))
// ! Add templates list...
const templates = []

// % NOTE: the tests must be conducted in such amount so as to ensure the presence of 'heap' property in heap-class instances;
tmc(heapclasses.keys(), (i) => {
	const heapclass = heapclasses[i](templates[i])
	// ! Construct a heap array... [use the 'heapclass' in question for that...]
	const heaps = [].map(heapclass.class)
	tmc(heaps, (h) => {
		// ! Add arguments to these...
		mtom(h, "top")
		mtom(h, "add")
		mtom(h, "topless")
		// ! fix the 'console.log's - see the desired way to print out (check structure) of a heap-tree/heap-trees;
		test(aliases.native.function.const(h))
		test(refCompare, [h.copy(), h])
		// ! Print out properly (checkably) + choose some interesting function
		tom(h, "copy")
	})
})

// ! Create instances of a PriorityQueue class... (choose which...);
const pqs = []

tmc(pqs, (pq) => {
	tom(pq, "pull")
	test(aliases.native.function.const(pq))
})
