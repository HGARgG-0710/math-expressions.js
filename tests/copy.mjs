// * Testing of all the copying methods.

import { copy } from "./../src/modules/exports/native.mjs"

const a = [1, 2, 3]
console.log(copy.flatCopy(a) === a)

// ! List [from native.mjs]:
// 	copy.copy
// 	copy.copyFunction
// 	copy.deepCopy
// 	copy.dataCopy
// 	copy.flatCopy
