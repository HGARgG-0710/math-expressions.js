// * Tests for various sorting algorithms

import { arrays } from "../src/modules/exports/types.mjs"
import {
	heapSort,
	quickSort,
	insertionSort,
	bubbleSort,
	selectionSort,
	mergeSort
} from "../src/modules/exports.mjs"

import { testmultcases as tmc, multtests as mt } from "./test.mjs"

const { LastIndexArray } = arrays

const genarrclass = LastIndexArray()

const testargs = [
	[1, 443, 17, 9, 332, 11, 14, 1, 3342],
	[19, 19, 19, 19, 11, 27, 11, 0, -1]
].map((x) => [genarrclass.static.fromArray(x)])

const template = { predicate: (x, y) => x > y }

const outarr = (x) => console.log(x.array)

mt(bubbleSort, testargs, template, outarr)
mt(selectionSort, testargs, template, outarr)
mt(insertionSort, testargs, template, outarr)
// ! This 'kind of' works, but not yet totally - difficulty with Predicate-categorization based off properties (will be fixed in v1.1);
mt(quickSort, testargs, template, outarr)
mt(mergeSort, testargs, template, outarr)

// ! Due to difficulties in testing, bucket-sort, counting-sort and radix-sort were left out (for now - later, revise it, make the generalization more intuitive to use, well-designed/defined...);

// * note: for this, first finish the 'heaps' testing...;
// mt(heapSort, [], t)
