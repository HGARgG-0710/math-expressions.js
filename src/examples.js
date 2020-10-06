import * as expjs from "./expressions"

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

// repeatExp() examples
console.log(expjs.repeatExp()) // 4
console.log(expjs.repeatExp({ nums: [6, 9, 6, 10], operators: ["*", "+", "/"] }, 3)) // 18
console.log(expjs.repeatExp({ nums: [4, 80, 2], operators: ["*", "/"] }, 3, "/")) // 0.625
