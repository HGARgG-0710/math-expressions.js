import * as expjs from "./expressions"
import { Statistics } from "./expressions"

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
console.log(expjs.repeatExp({ nums: [4, 80, 2], operators: ["*", "/"] }, 3, "/")) // 0.625

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

// middleNum() function examples
console.log(expjs.middleNum([1, 3, 5, 3, 1])) // 5
console.log(expjs.middleNum([4, 6, 8, 10, 12, 14])) // Uncaught Error
console.log(expjs.middleNum([3, 6, 9, 12, 15, 18], false)) // "None"

// mostPopularNum() function examples
console.log(expjs.mostPopularNum()) // "None"
console.log(expjs.mostPopularNum([1, 2, 3, 3])) // 3
console.log(expjs.mostPopularNum([2, 2, 1, 5, 4, 3, 4, 6, 8, 9, 4, 0])) // 4

// range() function examples 
console.log(expjs.range([100, -100])) // 200
console.log(expjs.range([-10000, 0, 10000])) // 20000

// Statistics class examples
let numArr = [10, 50, -10]
let stats = new Statistics(numArr)

console.log(stats.middleNum) // 50
console.log(stats.min) // -10
console.log(stats.mostPopularNum) // "None"
console.log(stats.range) // 60
