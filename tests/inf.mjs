// * Tests for the InfiniteArray, InfiniteString and InfiniteSet

import {
	InfiniteArray,
	InfiniteString,
	InfiniteSet
} from "../src/modules/exports/types.mjs"

// Tests:
// 1. InfiniteArray (instances belong to different classes)
//		1.1. read - read twice from each of the three different classes' instances (2*3 = 6); 
// 		1.2. write - write twice to each of the three instances (2*3 = 6); 
// 		1.3. subarr - for each of the instances, call '.subarr' twice, then print out some of their elements; 
// 		1.4. copy - copy each one of the infinite array instances once; 
// 		1.5. copied - choose a (different) method for each one of the classes' instances, perform 'copied' with each once...
// 		1.6. map - map an infinite array to another 3 times, each print out; 
// 		1.7. slice - create 3 different infinite arrays, for each print out a 'slice' (different)
// 		1.8. init - return the value, print it out
// 		1.9. [Symbol.iterator] - run through a given number of infinite array entries in each one of the three cases; 
// 2. InfiniteString - same as 'InfiniteArray', but ENSURE THAT THE RESULTS OF THE METHODS ARE ALL STRINGS...; 
// 3. InfiniteSet - same as 'InfiniteArray', but with re-determining that it is (indeed), a set...; 