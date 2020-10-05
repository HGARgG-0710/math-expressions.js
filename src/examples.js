import * as expjs from "./expressions"

// exp() function examples
console.log(expjs.exp("2", "3")) // 5
console.log(expjs.exp(5, 3)) // 8
console.log(expjs.exp(2, 7, "**")) // 128
console.log(expjs.exp(10, 10, "/")) // 1
console.log(expjs.exp(3, 2, "%")) // 1

// oneOperatorExp() function examples
console.log(expjs.oneOperatorExp(["4", "5", "6"])) // 15
console.log(expjs.oneOperatorExp([10, 2, 5, 9], "*")) // 900
console.log(expjs.oneOperatorExp([27, 3, 9], "/")) // 1

// manyOperatorsExp() fucntion examples
console.log(expjs.manyOperatorsExp(["2", "3", "5"])) // 40
console.log(expjs.manyOperatorsExp([5, 90, 30], ["+", "-"])) // 65
console.log(expjs.manyOperatorsExp([40, 2, 10, 6], ["/", "*", "%"])) // 2
