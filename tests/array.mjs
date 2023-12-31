// * Various tests related to arrays methods

import { oldCompare } from "../src/modules/exports/comparisons.mjs"
import * as aliases from "../src/modules/exports/aliases.mjs"
import { array } from "../src/modules/exports/native.mjs"

const arr = [334, false, true, "Mee too...", false, true]
console.log(array.replace.replaceIndex(arr, 3, "Wonder what it's like out there?"))
console.log(array.replace.replaceIndex(arr, 0, "Wonder what it's like out there?"))
console.log()

console.log(array.replace.replaceIndexes(arr, false, "???", [1]))
console.log(array.replace.replaceIndexes(arr, false, true))
console.log()

console.log(
	array.replace.replaceArr(
		arr,
		(x) => arr.includes(x) && x !== false,
		aliases.native.function.const(42)
	)
)
console.log()

console.log(array.replace.replaceIndexesMult(arr, [2, 3], ["100", {}]))
console.log()

console.log(array.replace.replaceMany(arr, [true, false, 334], [0, 1, 12]))
console.log()

const toencirc = [1234, "Sigmund", false, true]
console.log(array.arrEncircle(toencirc, 1, 2))
console.log(array.arrEncircle(toencirc, 0, 2))
console.log(array.arrEncircle(toencirc, 1, 3))
console.log(array.arrEncircle(toencirc))
console.log()

const toencircl = ["ppparrrrr", true, 1095554, 11, aliases.sym("jjj"), {}, [], [34455]]
console.log(
	array.arrEncircleMult(toencircl, [
		[1, 4],
		[5, 7]
	])
)
console.log()

const n = ["f34", "eedd", "ffda", "kp", "ffda", false, null, undefined]
console.log(array.countAppearences().function(n, "ffda"))
console.log(array.countAppearences({ comparison: oldCompare }).function(n, null))
