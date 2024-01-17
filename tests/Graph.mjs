// * Tests for the 'Graph' and 'Vertex' classes

import { refCompare } from "../src/modules/exports/comparisons.mjs"
import { Graph } from "../src/modules/exports/types.mjs"
// ! later:
// import { Vertex } from "../src/modules/exports/algorithms.mjs"
import {
	test,
	testmultcases as tmc,
	testobjmethod as tom,
	multtestobjmethod as mtom,
	testOn
} from "./test.mjs"

const outarr = (x) => console.log(x.verticies.array)

// ! Choose classes, for which to test (possibly, only 1-2, no more...);
tmc([].map(Graph), (graphclass) => {
	// ! Fill the graph... (with Verticies...)
	const graph = graphclass.class()

	// ! Add arguments...
	tom(graph, "getAdjacent")
	testOn(graph, ["addvertex", "addedge", "computevertex"], [], [], outarr)
	mtom(graph, "read")
	testOn(graph, ["write", "deledge"], [], [], outarr)

	test(refCompare, [graph.copy(), graph])
	// ! Add arguments...
	testOn(graph, ["copy", "suchthat"])
	tmc(graph)
	// ! Add arguments...
	mtom(graph, "deledgeval")
})
