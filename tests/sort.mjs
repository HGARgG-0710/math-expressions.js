// * Tests for various sorting algorithms

import {
	heapSort,
	radixSort,
	bucketSort,
	countingSort,
	quickSort,
	insertionSort,
	bubbleSort,
	selectionSort,
	mergeSort
} from "../src/modules/exports.mjs"

import { testmultcases as tmc, multtests as mt } from "./test.mjs"

// ! Add templates...
tmc([], (t) => {
	// ! Add arguments for this..
	mt(heapSort, [], t)
	mt(radixSort, [], t)
	mt(bucketSort, [], t)
	mt(countingSort, [], t)
	mt(quickSort, [], t)
	mt(insertionSort, [], t)
	mt(bubbleSort, [], t)
	mt(selectionSort, [], t)
	mt(mergeSort, [], t)
})
