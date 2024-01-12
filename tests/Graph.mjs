// * Tests for the 'Graph' and 'Vertex' classes

import { DEFAULT_GRAPHCLASS } from "../src/modules/exports/general.mjs"
// ! later:
// import { Vertex } from "../src/modules/exports/algorithms.mjs"

// * They are, effectively, the same, so there oughtn't be any difficulty regarding the matter of the workability of the others if the Default works just as well...
const graphclass = DEFAULT_GRAPHCLASS

// ! Fill the graph... (with Verticies...)
const graph = graphclass.class()

// ! Insert indicies for tests...
console.log(graph.getAdjacent())
console.log(graph.getAdjacent())
console.log(graph.getAdjacent())

// ! Add arguments...
graph.addvertex()
console.log(graph.verticies.array)
graph.addvertex()
console.log(graph.verticies.array)
graph.addvertex()
console.log(graph.verticies.array)

// ! Add arguments... + 'console.log()' the appropriate indexes' verticies edges general arrays...
graph.addedge()
console.log()
graph.addedge()
console.log()
graph.addedge()
console.log()

// ! Add arguments...
graph.computevertex()
console.log(graph.verticies.array)
graph.computevertex()
console.log(graph.verticies.array)
graph.computevertex()
console.log(graph.verticies.array)

// ! Add indicies to read from...
console.log(graph.read())
console.log(graph.read())
console.log(graph.read())

// ! Add indicies, values to read-write...
graph.write()
console.log(graph.verticies.array)
graph.write()
console.log(graph.verticies.array)
graph.write()
console.log(graph.verticies.array)

// ! Add arguments...
graph.deledge()
console.log(graph.verticies.array)
graph.deledge()
console.log(graph.verticies.array)
graph.deledge()
console.log(graph.verticies.array)

console.log(graph.copy() === graph)
console.log(graph === graph)
// ! Add some interesting function to the thing in question...
console.log(graph.copy())

// ! Pick two predicates...
console.log(graph.suchthat())
console.log(graph.suchthat())

for (const x of graph) console.log(x)

// ! Choose arguments...
graph.deledgeval()
