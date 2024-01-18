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
import { testmultcases as tmc, multtests as mt } from "./test.mjs"

// ! Fill the templates' array (they include the forms' setting);
const templates = []

// ? Later [possibly in v1.1], refactor the tests even more hardcorely?
tmc(templates, (t) => {
	// ! Add arguments...
	mt(countrecursive, [], t)
	mt(arrElems, [], t)
	mt(nonArrElems, [], t)
	mt(totalElems, [], t)
	mt(dim, [], t)
	mt(recursiveIndexation, [], t)
	mt(recursiveSetting, [], t)
	mt(repeatedApplication, [], t)
	mt(repeatedApplicationWhilst, [], t)
})

mt(native.repeatedApplication, [], t)
