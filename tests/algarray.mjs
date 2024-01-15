// * Tests related to the 'algorithms.array' algorithms

import { obj, id, native } from "../src/modules/aliases.mjs"
import { arrays } from "../src/modules/exports/types.mjs"
import { array } from "../src/modules/exports/algorithms.mjs"
import {
	oldCompare,
	refCompare,
	valueCompare
} from "../src/modules/exports/comparisons.mjs"
import { testmultcases as tmc, multtests as mt } from "./test.mjs"

const testargs = { native: { generate: [[10], [-8, 29, 3], [100, 99, -0.1]] } }

tmc(obj.values(arrays), (arrc) => {
	// ! Add templates list...
	tmc([].map(arrc), (arrclass) => {
		tmc([id, native.function.index("native")], (f) => {
			// ! Add the arguments for tests... ['arrclass' instances...] - redefine the 'testargs' bit...;
			mt(f(array).split, f(testargs).split, [
				[
					{ comparison: refCompare },
					{ comparison: valueCompare },
					{ comparison: oldCompare }
				]
			])
			mt(f(array).generate, f(testargs).generate, [])
			mt(f(array).permutations, f(testargs).permutations, [])
			mt(f(array).indexesOf, f(testargs).indexesOf, [])
			mt(f(array).norepetitions, f(testargs).norepetitions, [
				{ comparison: valueCompare },
				{ comparison: refCompare },
				{ comparison: oldCompare },
				{ comparison: valueCompare }
			])
			mt(f(array).isSub, f(testargs).isSub, [])
			mt(f(array).join, f(testargs).join, [])
			mt(f(array).common, f(testargs).common, [])
			mt(f(array).concat, f(testargs).concat, [])
		})
	})
})
