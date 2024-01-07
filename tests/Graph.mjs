// * Tests for the 'Graph' and 'Vertex' classes

import { Graph, Vertex } from "../src/modules/exports/algorithms.mjs"

// ! Tests:
// 1. Vertex - create a vertex (later, create a bunch...); 
// 2. Graph - create graphs, based off verticies for each and every single 
// 		2.1. getAdjacent() - two tests, one for each graph (check that the defined Vertex corresponds to the output); 
// 		2.2. addvertex() - add two verticies for two different graphs (2*2 = 4); 
// 		2.3. addedge()  - add two edges for two different graphs (2*2= 4), test they work (with 'getAdjacent', printing out the 'edges'); 
// 		2.4. computevertex() - compute for two different graphs, their verticies' edges; 
// 		2.5. write() - write to two different graphs at different indexes; 
// 		2.6. read() - read from two different graphs at two different indexes; 
// 		2.7. deledge() - again, 2*2 cases, for two different calls and two graphs...
// 		2.8. copy() - copy two different arrays (once); 
// 		2.9. suchthat() - for two different 
// 		2.10. [Symbol.iterator] - walk through two different graphs, printing out the nodes; 
// 		2.11. deledgeval() - do for twice two different Graphs (2*2=4); 
// ! NOTE: each one of the tests must be accompanied by the check of coherence of the shape of the object in question...; 

