// * Tests related to methods, concerning the search inside recursive arrays

import {
	generalSearch,
	findDeepUnfilled,
	findDeepUnfilledArr,
	findDeepLast
} from "../src/modules/exports/structure.mjs"

import { multtests as mt } from "./test.mjs"

const outarr = (x) => console.log(x.array)

// ! Add test arguments for these...
mt(generalSearch, [], [], outarr)
mt(findDeepUnfilled, [], [], outarr)
mt(findDeepUnfilledArr, [], [], outarr)
mt(findDeepLast, [], [], outarr)
