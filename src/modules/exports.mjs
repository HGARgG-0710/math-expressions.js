// * This file handles all the exports from the project's separate modules

// todo [GENERAL]: CHECK THE SPELLING OF THINGS!!! So much text, there could have been a couple of occasional mistakes (maybe even more...);

export * as algorithms from "./exports/algorithms.mjs"
export * as aliases from "./exports/aliases.mjs"
export * as comparisons from "./exports/comparisons.mjs"
export * as counters from "./exports/counters.mjs"
export * as expressions from "./exports/expressions.mjs"
export * as native from "./exports/native.mjs"
export * as numeric from "./exports/numeric.mjs"
export * as orders from "./exports/orders.mjs"
export * as predicates from "./exports/predicates.mjs"
export * as printing from "./exports/printing.mjs"
export * as structure from "./exports/structure.mjs"
export * as types from "./exports/types.mjs"
export * as variables from "./exports/variables.mjs"

export * from "../lib.mjs"

const { integer, array, search, sort, number } = algorithms

// ? Wonder, if there's a more elegant solution to this dilemma, or not?
// ? Ought one make the namesof exports different for all the things exported in this way, I wonder?
export const {
	factorOut,
	isPrime,
	primesBefore,
	multiples,
	multiplesBefore,
	commonDivisors,
	commonMultiples,
	lcm,
	lcd,
	areCoprime,
	allFactors,
	isPerfect,
	factorial,
	binomial,
	sumRepresentations,
	native: inative
} = integer

export const {
	intersection,
	permutations,
	indexesOf,
	norepetitions,
	isSub,
	join,
	generate,
	common,
	concat,
	native: anative
} = array

export const {
	sentinel: sentinelSearch,
	exponential: exponentialSearch,
	interpolation: interpolationSearch,
	jump: jumpSearch,
	linear: linearSearch,
	binary: binarySearch
} = search

export const {
	heap: heapSort,
	radix: radixSort,
	bucket: bucketSort,
	counting: countingSort,
	quick: quickSort,
	insertion: insertionSort,
	bubble: bubbleSort,
	selection: selectionSort,
	merge: mergeSort
} = sort

export const { farey: Farey } = number
