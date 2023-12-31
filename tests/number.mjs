// * Testing of various methods related to numbers

import { number } from "../src/modules/exports/native.mjs"

console.log(number.readable({ mod: 4 }).function("433183309746"))
console.log(number.readable({ mod: 2 }).function("123456789010"))
console.log(number.readable({ mod: 10 }).function("1234567890100000"))
console.log(number.readable().function("100000000"))
console.log()

console.log(number.floor().function(10.455334097, 1))
console.log(number.floor({ defacc: 3 }).function(0.443532123))
console.log(number.floor().function(254 + 1 / 3, -2))
console.log()

console.log(number.ceil(2.445))
console.log(number.ceil(1))
console.log()

console.log(number.min([1234, 34.4, 98639]))
console.log()

console.log(number.max([-443, 7/3, 98**2]))
console.log()

console.log(number.isWhole(10))
console.log(number.isWhole(4445.34))
console.log()