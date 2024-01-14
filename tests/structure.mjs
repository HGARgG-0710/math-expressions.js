// * Tests of methods from 'structure.mjs' source file

// ! REFACTOR TESTS HARDCORELY - create a separate module in 'tests' directory with the definitions for the testing scripts;

import {
	countrecursive,
	arrElems,
	nonArrElems,
	dim,
	recursiveIndexation,
	recursiveSetting,
	repeatedApplication,
	repeatedApplicationWhilst,
	native,
	totalElems
} from "../src/modules/exports/structure.mjs"

// ! Fill the templates' array (they include the forms' setting);
const templates = []

for (const t of templates) {
	// ! Add argument values to this
	console.log(countrecursive(t).function())
	console.log(countrecursive(t).function())
	console.log(countrecursive(t).function())
	console.log(countrecursive(t).function())

	// ! Add argumetnts for this
	console.log(arrElems(t).function())
	console.log(arrElems(t).function())
	console.log(arrElems(t).function())
	console.log(arrElems(t).function())

	// ! Add arguments
	console.log(nonArrElems(t).function())
	console.log(nonArrElems(t).function())
	console.log(nonArrElems(t).function())
	console.log(nonArrElems(t).function())

	// ! Add arguments
	console.log(totalElems(t).function())
	console.log(totalElems(t).function())
	console.log(totalElems(t).function())
	console.log(totalElems(t).function())

	// ! Add arguments
	console.log(dim(t).function())
	console.log(dim(t).function())
	console.log(dim(t).function())
	console.log(dim(t).function())
	console.log(dim(t).function())

	// ! Add arguments
	console.log(recursiveIndexation(t).function())
	console.log(recursiveIndexation(t).function())
	console.log(recursiveIndexation(t).function())
	console.log(recursiveIndexation(t).function())
	console.log(recursiveIndexation(t).function())

	// ! Add arguments
	console.log(recursiveSetting(t).function())
	console.log(recursiveSetting(t).function())
	console.log(recursiveSetting(t).function())
	console.log(recursiveSetting(t).function())
	console.log(recursiveSetting(t).function())

	// ! Add arguments
	console.log(repeatedApplication(t).function())
	console.log(repeatedApplication(t).function())
	console.log(repeatedApplication(t).function())

	// ! Add arguments
	console.log(repeatedApplicationWhilst(t).function())
	console.log(repeatedApplicationWhilst(t).function())
	console.log(repeatedApplicationWhilst(t).function())
}

console.log(native.repeatedApplication(t).function())
console.log(native.repeatedApplication(t).function())
console.log(native.repeatedApplication(t).function())
