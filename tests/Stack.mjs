// * Testing of Stack, Queue and NTreeNode data structures

import { refCompare } from "../src/modules/exports/comparisons.mjs"
import { Queue, Stack, NTreeNode } from "../src/modules/exports/algorithms.mjs"
import { testmultcases as tmc, multtestobjmethod as mtom, test, testOn } from "./test.mjs"

const q =
	(queue, name = "front") =>
	(x) =>
		console.log(queue[name]())

// ! Add the templates...
tmc([], (t) => {
	const qc = Queue(t)
	const sc = Stack(t)
	const ntnc = NTreeNode(t)

	// ! add values for those (maybe, extend the tests instances list... as all this is simply renaming mostly, little necessity for that...);
	const queue = qc.class()
	const stack = sc.class()
	const ntreenode = ntnc.class()

	mtom(queue, "front")
	// ! Add arguments
	mtom(queue, "enqueue", [], [], q(queue))
	mtom(queue, "dequeue", [], [], q(queue))
	test(refCompare, [queue, queue.copy()])

	mtom(stack, "peek")
	mtom(stack, "push", [], [], q(stack, "peek"))
	mtom(stack, "pop", [], [], q(stack, "peek"))
	test(refCompare, [stack, stack.copy()])

	// ! [ABOUT NTREENODE tests] Add arguments. Generalize - check for different values of 'n' what this ought to look like... [and, generalize the number of cases of 'insert' for each iteration - this is too little...];
	testOn(ntreenode, ["insert", "pushback", "pushfront"], [], [])
})
