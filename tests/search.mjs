// * Tests for various search algorithms implementations

import {
	sentinelSearch,
	exponentialSearch,
	interpolationSearch,
	jumpSearch,
	linearSearch,
	binarySearch
} from "../src/modules/exports.mjs"

const templates = []

for (const t of templates) {
	// ! Add arguments;
	console.log(sentinelSearch(t).function())
	console.log(sentinelSearch(t).function())
	console.log(sentinelSearch(t).function())
	console.log(sentinelSearch(t).function())

	// ! Add arguments;
	console.log(exponentialSearch(t).function())
	console.log(exponentialSearch(t).function())
	console.log(exponentialSearch(t).function())
	console.log(exponentialSearch(t).function())

	// ! Add arguments
	console.log(interpolationSearch(t).function())
	console.log(interpolationSearch(t).function())
	console.log(interpolationSearch(t).function())
	console.log(interpolationSearch(t).function())

	// ! Add arguments
	console.log(jumpSearch(t).function())
	console.log(jumpSearch(t).function())
	console.log(jumpSearch(t).function())
	console.log(jumpSearch(t).function())

	// ! Add arguments
	console.log(linearSearch(t).function())
	console.log(linearSearch(t).function())
	console.log(linearSearch(t).function())
	console.log(linearSearch(t).function())

	// ! Add arguments
	console.log(binarySearch(t).function())
	console.log(binarySearch(t).function())
	console.log(binarySearch(t).function())
	console.log(binarySearch(t).function())
}
