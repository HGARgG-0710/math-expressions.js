import * as expjs from "./math-expressions"
import { Statistics } from "./math-expressions"
import { Surface } from "./math-expressions"
import { Expression } from "./math-expressions"

// exp() function examples
console.log(expjs.exp("2", "3")) // 5
console.log(expjs.exp(5, 3)) // 8
console.log(expjs.exp(2, 7, "**")) // 128
console.log(expjs.exp(10, 10, "/")) // 1
console.log(expjs.exp(3, 2, "%")) // 1

// sameOperator() function examples
console.log(expjs.sameOperator(["4", "5", "6"])) // 15
console.log(expjs.sameOperator([10, 2, 5, 9], "*")) // 900
console.log(expjs.sameOperator([27, 3, 9], "/")) // 1

// fullExp() fucntion examples
console.log(expjs.fullExp(["2", "3", "5"])) // 40
console.log(expjs.fullExp([5, 90, 30], ["+", "-"])) // 65
console.log(expjs.fullExp([40, 2, 10, 6], ["/", "*", "%"])) // 2

// repeatExp() function examples
console.log(expjs.repeatExp()) // 4
console.log(expjs.repeatExp({ nums: [6, 9, 6, 10], operators: ["*", "+", "/"] }, 3)) // 18
console.log(expjs.repeatExp({ nums: [4, 80, 2], operators: ["*", "/"] }, 3, "/")) // 0.00625

// average() function examples
console.log(expjs.average([5, 5, 5, 4])) // 4.75
console.log(expjs.average([0, 5, 10, 15, 20])) // 10
console.log(expjs.average([1, 2, 3, 3])) // 2.25

// min() function examples
console.log(expjs.min([-5, -10, -100])) // -100
console.log(expjs.min([20, 30, 15])) // 15

// max() function examples
console.log(expjs.max([5, 10, 100])) // 100
console.log(expjs.max([-16, -8, 8, 16])) // 16

// median() function examples
console.log(expjs.median([1, 3, 5, 3, 1])) // 5
console.log(expjs.median([4, 6, 8, 10, 12, 14])) // 9
console.log(expjs.median([3, 6, 9, 12, 15, 18], false)) // 10.5

// mostPopularNum() function examples
console.log(expjs.mostPopularNum()) // "None"
console.log(expjs.mostPopularNum([1, 2, 3, 3])) // 3
console.log(expjs.mostPopularNum([2, 2, 1, 5, 4, 3, 4, 6, 8, 9, 4, 0])) // 4

// range() function examples
console.log(expjs.range([100, 6, -1, -100])) // 200
console.log(expjs.range([-10000, 0, 10000])) // 20000

// sort() function examples
console.log(expjs.sort([5, 2, 4, 9, 1, 8])) // [1, 2, 4, 5, 8, 9]
console.log(expjs.sort([2, 7, 0, -1, 100], false)) // [100, 7, 2, 0, -1]

// copy() function examples
const arr = [1, 2, 3]
const arr2 = expjs.copy(arr)

arr2.shift()
console.log(`${arr} and ${arr2}`) // 1,2,3 and 2,3

// generate() function examples
const generated = expjs.generate(0, 100, 5)
console.log(generated) // [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100]

// find() functon examples
expjs.find([1, 2, 3, 4, 5], 6) // [false, 0]
expjs.find([1, 5, 2, 5, 3, 5, 4, 5], 5) // [true, 4]
expjs.find("Hello, World!", "l") // [true, 3]

// Statistics class examples
const numArr = [10, 50, -10]
const stats = new Statistics(numArr)

console.log(stats.min) // -10
console.log(stats.mostPopularNum) // "None"
console.log(stats.range) // 60
console.log(stats) // Logs Statistics object

// Surface class exmples
const surface = new Surface([-30, 30], [-20, 40])
console.log(surface) // Logs Surface object

const dot1 = [2, 1]
const dot2 = [-19, 31]

surface.dot(dot1, dot2) // Adds one dot to the Surface.dots
console.log(surface) // Object changed

surface.line(dot1, dot2) // Adds a line to the Surface.lines
console.log(surface) // Object changed(again)

// readable() function example
console.log(expjs.readable(BigInt(1234027340287346230478))) // 1 234 027 340 287 346 212 864
console.log(expjs.readable(123456)) // 123 456
console.log(expjs.readable(45000000)) // 45 000 000

// factorOut() function examples
console.log(expjs.factorOut(1000)) // [2, 2, 2, 5, 5, 5]
console.log(expjs.factorOut(50000)) // (Takes a minute time to run) [2, 2, 2, 2, 5, 5, 5, 5, 5]
console.log(expjs.factorOut(50000, true)) //  (Takes 55 seconds to run) [2, 2, 2, 2, 5, 5, 5, 5]

// truncate() function examples
console.log(expjs.truncate([-100, -200, 1, 2, 3, 4, 5, 100, 200])) // [1, 2, 3, 4, 5]
console.log(expjs.truncate([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 5)) // [1, 2, 3, 4, 5, 6, 7, 8]
console.log(expjs.truncate([-1, 0, 200, 300, 400, 500, 600, 700, 1, 2]), 10) // [1, 2, 200, 300, 400, 500] Notice - truncate sorts array before truncating it.

// leastCommonMultiply() function examples
console.log(expjs.leastCommonMultiple(6, 8)) // 24
console.log(expjs.leastCommonMultiple(423, 87, 200)) // 12267
console.log(expjs.leastCommonMultiple(1521, 2842)) // null - This means the search range was too small
console.log(expjs.leastCommonMultiple(1521, 2842, 4000)) // 4322682

// Expression class examples
const expression = new Expression([2, 3, 4], ["**", "**"])

console.log(expjs.exp(expression.nums[0], expression.nums[2], expression.operators[1])) // 16
console.log(expjs.sameOperator(expression.nums, expression.operators[0])) // 4096
console.log(expjs.fullExp(expression)) // 4096 - Just shortened the last example.
console.log(expjs.repeatExp(expression, 4)) // 16384

// deviations() function examples
console.log(expjs.deviations([1, 2, 2, 3, 4, 5])) // [1.8, 0.8, 0.8, 0.2, 1.2, 2.2]
console.log(expjs.deviations([10, 10, 10, 9, 8, 7, 6, 5])) // [1.9, 1.9, 1.9, 0.9, 0.1, 1.1, 2.1, 3.1]

// dispersion() function examples
console.log(expjs.dispersion([1, 2, 2, 2, 2, 2, 3, 4, 5])) // 1
console.log(expjs.dispersion([8, 8, 8, 9, 9, 9])) // 0.5
console.log(expjs.dispersion([8, 8, 8, 9, 9, 9], false, [2, 3])) // 2 - not very representative :)
