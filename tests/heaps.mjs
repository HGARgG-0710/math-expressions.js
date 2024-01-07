// * Tests of various heap-implementations, as well as PriorityQueue

// ! List [from "algorithms.mjs"]: 
// algorithms.heaps.PairingHeap
// algorithms.heaps.NAryHeap
// algorithms.heaps.BinomialHeap
// algorithms.PrioriteeQueue

// % For each and every heap-class, tests: 
// 1. top - construct a heap, then get its top (repeat 2 times for a class); 
// 2. add - construct a heap, then add a new heap to it (repeat 2 times for a class); 
// 3. topless - construct a heap, then call 'topless' (repeat twice for a class); 
// 4. copy - copy a heap 

// % For PrioriteeQueue: 
// 1. pull () - construct a PrioriteeQueue from a heap, then get an item from it using 'pull' (maybe, check the 'Extended methods'); Repeat twice for each heap and heap-class; 

// ! NOTE: the tests must be conducted in such amount so as to ensure the presence of 'heap' property in heap-class instances; 