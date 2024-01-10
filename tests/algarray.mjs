// * Tests related to the 'algorithms.array' algorithms

import { arrays } from "../src/modules/exports/types.mjs"
import { array } from "../src/modules/exports/algorithms.mjs"
import {
	oldCompare,
	refCompare,
	valueCompare
} from "../src/modules/exports/comparisons.mjs"

// ? Wondering, if one ought to make additional test-cases for the edge-situations of user's input? (for, instance, isSub(a, a) = true...);
// ? Does one want to keep the arguments related to 'test-organization' throughout the file?
// ! List [from "algorithms.mjs"]:

// 	array.native.split - split using different separators (each - only once...);
// ! NOTE: add the arrays of choice here...
console.log(array.native.split({ comparison: refCompare }).function())
console.log(array.native.split({ comparison: valueCompare }).function())
console.log(array.native.split({ comparison: oldCompare }).function())

console.log(array.native.generate(10))
console.log(array.native.generate(-8, 29, 3))
console.log(array.native.generate(100, 99, -0.1))

// 	array.native.intersection - find two intersections of two different array sets
// ! Insert the arrays + different kinds of preferred...;
console.log(array.native.intersection({ comparison: valueCompare }).function())
console.log(array.native.intersection({ comparison: refCompare }).function())
console.log(array.native.intersection({ comparison: oldCompare }).function())

// 	array.native.permutations
// ! NOTE: add the arguments for tests...
console.log(array.native.permutations())
console.log(array.native.permutations())
console.log(array.native.permutations())
console.log(array.native.permutations())

// 	array.native.indexesOf - find indexes of an element in an array three times - one 'halt=false', others - halt=true with two different stopping times...;
// ! Insert arguments
console.log(array.native.indexesOf())
console.log(array.native.indexesOf())
console.log(array.native.indexesOf())
console.log(array.native.indexesOf())

// 	array.native.norepetitions - run on different arrays and comparisons;
// ! Insert arguments
console.log(array.native.norepetitions({ comparison: valueCompare }).function())
console.log(array.native.norepetitions({ comparison: refCompare }).function())
console.log(array.native.norepetitions({ comparison: oldCompare }).function())
console.log(array.native.norepetitions({ comparison: valueCompare }).function())

// 	array.native.isSub - run twice, on two different arrays;
// ! Insert arguments and template arguments
console.log(array.native.isSub({}).function())
console.log(array.native.isSub({}).function())
console.log(array.native.isSub({}).function())

// 	array.native.join
// ! Insert arguments and template-arguments...
console.log(array.native.join({}).function())
console.log(array.native.join({}).function())
console.log(array.native.join({}).function())

// 	array.native.common - twice on two different arrays of arrays
// ! Insert the argument and template-arguments... [if needed...]
console.log(array.native.common({}).function())
console.log(array.native.common({}).function())
console.log(array.native.common({}).function())

// 	array.native.concat - same as "common";
// ! Insert arguments...
console.log(array.native.concat({}).function())
console.log(array.native.concat({}).function())
console.log(array.native.concat({}).function())

// ! Non-native:
// 	array.intersection - same as 'native', but try different templates...
const interarr1 = arrays.LastIndexArray().class()
const interarr2 = arrays.DeepArray().class()

// ! Insert the template-arguments and define the arrays...
console.log(array.intersection({ comparison: valueCompare }).function(interarr1).array)
console.log(array.intersection({ comparison: refCompare }).function(interarr2).array)

// 	array.permutations - same as 'native';
const permarr1 = arrays.LastIndexArray().class()
const permarr2 = arrays.DeepArray().class()

// ! Insert the template-arguments and define the arrays...
console.log(array.permutations({}).function(permarr1))
console.log(array.permutations({}).function(permarr2))

// 	array.indexesOf - same as 'native';
const indarr1 = arrays.LastIndexArray().class()
const indarr2 = arrays.DeepArray().class()

// ! Add different templates for this, pray...
console.log(array.indexesOf({}).function(indarr1))
console.log(array.indexesOf({}).function(indarr1))
console.log(array.indexesOf({}).function(indarr2))
console.log(array.indexesOf({}).function(indarr2))

// 	array.norepetitions - same as 'native';
const noreparr1 = arrays.LastIndexArray().class()
const noreparr2 = arrays.DeepArray().class()

// ! Insert template-arguments and define arrays;
console.log(array.norepetitions().function(noreparr1))
console.log(array.norepetitions().function(noreparr2))

// 	array.isSub - same as 'native';
const issubarr1 = arrays.LastIndexArray().class()
const issubarr2 = arrays.DeepArray().class()

// ! Insert template-arguments and define arrays
console.log(array.isSub({}).function(issubarr1))
console.log(array.isSub({}).function(issubarr2))

// 	array.join - same as 'native';
const joinarr1 = arrays.LastIndexArray().class()
const joinarr2 = arrays.DeepArray().class()

// ! Insert template-arguments and define arrays
console.log(array.join({}).function(joinarr1))
console.log(array.join({}).function(joinarr2))

// 	array.generate - same as 'native';
// ! Insert InfiniteCounters and template-arguments...;
console.log(array.generate().function())
console.log(array.generate().function())
console.log(array.generate().function())
console.log(array.generate().function())

// 	array.common - same as 'native';
const commarr1 = arrays.LastIndexArray().class()
const commarr2 = arrays.DeepArray().class()

// ! Define arrays, insert template-arguments...
console.log(array.common().function(commarr1))
console.log(array.common().function(commarr2))

// 	array.concat - same as 'native';
const conarr1 = arrays.LastIndexArray().class()
const conarr2 = arrays.DeepArray().class()

// ! Insert template-arguments and define the arrays; 
console.log(array.concat(conarr1))
console.log(array.concat(conarr2))
