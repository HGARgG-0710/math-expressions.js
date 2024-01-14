// * This file handles all the exports from the project's separate modules

// todo [GENERAL]: CHECK THE SPELLING OF NAMES AND IDENTIFIERS!!! So much text, there could have been a couple of occasional mistakes (maybe even more...);
// ! RECHECK THAT ALL THE ITEMS FROM THE LIBRARY ARE, IN FACT, BEING EXPORTED [during the documentation - feverishly re-check everything, including spelling...];

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

import * as algorithms from "./exports/algorithms.mjs"
import * as types from "./exports/types.mjs"
import * as native from "./exports/native.mjs"

// ! repeat the procedure for ALL the desired sub-modules within the library...
const { integer, array, search, sort, number } = algorithms
const { numbers, arrays } = types
const { number: nnumber, string, object } = native

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
	// ? The more oneself thinks about it, the better it starts to sound - make all of these aliases...
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

export const { TrueInteger, TrueRatio } = numbers
export const { LastIndexArray, DeepArray, CommonArray, TypedArray } = arrays

export const { min: fmin, max: fmax, isWhole, readable, floor } = nnumber
export const {
	UTF16,
	reverse: reverseStr,
	map: mapStr,
	replace: strReplace,
	strmethod
} = string
export const {
	subobjects, 
	subobjectsFlat, 
	isRecursive,
	obj, 
	objMap, 
	objArr, 
	objSwap, 
	objClear, 
	objInherit, 
	
} = object
