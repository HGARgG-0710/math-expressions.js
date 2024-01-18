// * Tests for various search algorithms implementations

import {
	sentinelSearch,
	exponentialSearch,
	interpolationSearch,
	jumpSearch,
	linearSearch,
	binarySearch
} from "../src/modules/exports.mjs"
import { multtests as mt, testmultcases as tmc } from "./test.mjs"

// ! ADD TEMPLATES...
const templates = []
tmc(templates, (t) => {
	// ! Add arguments
	mt(sentinelSearch, [], t)
	mt(exponentialSearch, [], t)
	mt(interpolationSearch, [], t)
	mt(jumpSearch, [], t)
	mt(linearSearch, [], t)
	mt(binarySearch, [], t)
})
