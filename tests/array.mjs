// * Various tests related to arrays methods

import { oldCompare } from "../src/modules/exports/comparisons.mjs"
import * as aliases from "../src/modules/exports/aliases.mjs"
import { array } from "../src/modules/exports/native.mjs"
import { test, formatOut } from "./test.mjs"

const arr = [334, false, true, "Mee too...", false, true]
const toencirc = [1234, "Sigmund", false, true]
const toencircl = ["ppparrrrr", true, 1095554, 11, aliases.sym("jjj"), {}, [], [34455]]
const n = ["f34", "eedd", "ffda", "kp", "ffda", false, null, undefined]

formatOut(undefined, [
	() => {
		test(array.replace.replaceIndex, [arr, 3, "Wonder what it's like out there?"])
		test(array.replace.replaceIndex, [arr, 0, "Wonder what it's like out there?"])
	},
	() => {
		test(array.replace.replaceIndexes, [arr, false, "???", [1]])
		test(array.replace.replaceIndexes, [arr, false, true])
	},
	() =>
		test(array.replace.replaceArr, [
			arr,
			(x) => arr.includes(x) && x !== false,
			aliases.native.function.const(42)
		]),

	() => test(array.replace.replaceIndexesMult, [arr, [2, 3], ["100", {}]]),

	() => test(array.replace.replaceMany, [arr, [true, false, 334], [0, 1, 12]]),
	() => {
		test(array.arrEncircle, [toencirc, 1, 2])
		test(array.arrEncircle, [toencirc, 0, 2])
		test(array.arrEncircle, [toencirc, 1, 3])
		test(array.arrEncircle, [toencirc])
	},
	() => {
		test(array.arrEncircleMult, [
			toencircl,
			[
				[1, 4],
				[5, 7]
			]
		])
	},
	() => {
		test(array.countAppearences, [n, "ffda"], [{}])
		test(array.countAppearences, [n, null], [{ comparison: oldCompare }])
	}
])
