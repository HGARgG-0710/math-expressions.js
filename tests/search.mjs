// * Tests for various search algorithms implementations

import { linear } from "../src/modules/exports/orders.mjs"
import { addnumber } from "../src/modules/exports/counters.mjs"
import { arrays, InfiniteCounter, numbers } from "../src/modules/exports/types.mjs"
import {
	sentinelSearch,
	exponentialSearch,
	interpolationSearch,
	jumpSearch,
	linearSearch,
	binarySearch
} from "../src/modules/exports.mjs"
import { multtests as mt, testmultcases as tmc } from "./test.mjs"

const { LastIndexArray } = arrays
const { TrueInteger } = numbers
const genarrclass = LastIndexArray()
const tintclass = TrueInteger()

const outval = (x) => console.log(x ? x.map(InfiniteCounter(addnumber())).value : x)

const testarrs = [
	["sigbrau!", genarrclass.static.fromArray([1, 2, 3, 4, "sigbrau!"])],
	[17, genarrclass.static.fromArray([null, false, true])]
]
const exptest = [
	testarrs[0],
	[
		null,
		genarrclass.static.fromArray([
			"Faust et Mephistopheles",
			1311,
			2944,
			"is",
			false,
			null,
			true,
			11
		])
	]
]

mt(linearSearch, testarrs, {}, outval)
mt(sentinelSearch, testarrs, {}, outval)
mt(
	exponentialSearch,
	exptest,
	exptest.map((x) => ({ predicate: linear().function(x[1]) })),
	outval
)
mt(
	interpolationSearch,
	exptest,
	exptest.map((arr) => ({
		predicate: (x) => tintclass.static.fromCounter(arr[1].firstIndex(x))
	})),
	outval
)
mt(
	jumpSearch,
	exptest,
	exptest.map((x) => ({ predicate: linear().function(x[1]) })),
	outval
)
mt(
	binarySearch,
	exptest,
	exptest.map((x) => ({ predicate: linear().function(x[1]) })),
	outval
)
