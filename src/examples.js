import * as expjs from "./math-expressions.js"
import {
	Statistics,
	Expression,
	Surface,
	Tests,
	Ratio,
	Matrix,
	Vector,
	Algorithms,
	Equation,
	VarMapping,
} from "./math-expressions.js"

// exp() function examples
console.log(expjs.exp(2, 3)) // 5
console.log(expjs.exp(5, 3)) // 8
console.log(expjs.exp(2, 7, "**")) // 128
console.log(expjs.exp(10, 10, "/")) // 1
console.log(expjs.exp(3, 2, "%")) // 1

// sameOperator() function examples
console.log(expjs.sameOperator([4, 5, 6])) // 15
console.log(expjs.sameOperator([10, 2, 5, 9], "*")) // 900
console.log(expjs.sameOperator([27, 3, 9], "/")) // 1

// fullExp() fucntion examples
console.log(expjs.fullExp({ nums: [2, 3, 5], operators: ["+", "+"] })) // 40
console.log(expjs.fullExp({ nums: [5, 90, 30], operators: ["+", "-"] })) // 65
console.log(expjs.fullExp({ nums: [40, 2, 10, 6], operators: ["/", "*", "%"] })) // 2

// repeatExp() function examples
console.log(expjs.repeatExp()) // 4
console.log(
	expjs.repeatExp({ nums: [6, 9, 6, 10], operators: ["*", "+", "/"] }, 3)
) // 18
console.log(
	expjs.repeatExp({ nums: [4, 80, 2], operators: ["*", "/"] }, 3, "/")
) // 0.00625

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
console.log(expjs.find([1, 2, 3, 4, 5], 6)) // [false, 0, []]
console.log(expjs.find([1, 5, 2, 5, 3, 5, 4, 5], 5)) // [true, 4, [1, 3, 5, 7]]
console.log(expjs.find("Hello, World!", "l")) // [true, 3, [2, 3, 10]]

// Statistics class examples
const numArr = [10, 50, -10]
const stats = new Statistics(numArr)
const nonNumeric = new Statistics(["Howdy!", "Again, i said...", "Howdy!"])

console.log(stats.min) // -10
console.log(stats.mostPopular) // "None"
console.log(stats.range) // 60
console.log(stats) // Logs Statistics object

console.log(nonNumeric.mostPopular) // "Howdy!"

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
console.log(expjs.factorOut(50000)) // [2, 2, 2, 2, 5, 5, 5, 5, 5]

// truncate() function examples
console.log(expjs.truncate([-100, -200, 1, 2, 3, 4, 5, 100, 200])) // [1, 2, 3, 4, 5]
console.log(expjs.truncate([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 5)) // [1, 2, 3, 4, 5, 6, 7, 8]
console.log(expjs.truncate([-1, 0, 200, 300, 400, 500, 600, 700, 1, 2]), 10) // [1, 2, 200, 300, 400, 500] Notice - truncate sorts array before truncating it.

// leastCommonMultiply() function examples
console.log(expjs.leastCommonMultiple(6, 8)) // 24
console.log(expjs.leastCommonMultiple(423, 87, 200)) // 12267
console.log(expjs.leastCommonMultiple(1521, 2842)) // null - This means the search range was too small
console.log(expjs.leastCommonMultiple(1521, 2842, 2842)) // 4322682

// Expression class examples
const expression = new Expression([2, 3, 4], ["**", "**"])

console.log(
	expjs.exp(expression.nums[0], expression.nums[2], expression.operators[1])
) // 16
console.log(expjs.repeatedArithmetic(expression.nums, expression.operators[0])) // 4096
console.log(expjs.fullExp(expression)) // 4096 - Just shortened the last example.
console.log(expjs.repeatExp(expression, 4)) // 16384

// deviations() function examples
console.log(expjs.deviations([1, 2, 2, 3, 4, 5])) // [1.8, 0.8, 0.8, 0.2, 1.2, 2.2]
console.log(expjs.deviations([10, 10, 10, 9, 8, 7, 6, 5])) // [1.9, 1.9, 1.9, 0.9, 0.1, 1.1, 2.1, 3.1]

// dispersion() function examples
console.log(expjs.dispersion([1, 2, 2, 2, 2, 2, 3, 4, 5])) // 0.96296
console.log(expjs.dispersion([8, 8, 8, 9, 9, 9])) // 0.5
console.log(expjs.dispersion([8, 8, 8, 9, 9, 9], false, false, [2, 3])) // 2.04 - not very representative :)

// standardDeviation() function examples
console.log(expjs.standardDeviation([1, 2, 3, 4, 5])) // 1.41421
console.log(expjs.standardDeviation([10, 30, 80, 1000])) // 416.47329
console.log(expjs.standardDeviation([-140, 45, 80, 99, 1])) // 85.30182

// standardError() function examples
console.log(expjs.standardError([1, 2, 3, 4, 5], false)) // 0.63245
console.log(expjs.standardError([1, 2, 3, 4, 5], true)) // 0.53665
console.log(expjs.standardError([80, 180, -80, -180])) // 69.64194
console.log(expjs.standardError([80, 180, -80, -180], true)) // 65

// Tests class example
// t_Students_test() method
console.log(Tests.t_Students_test([1, 2, 3, 4, 5], [6, 7, 8, 9, 10])) // 5.5901702
console.log(
	Tests.t_Students_test([60, 70, 10, 20, 30, 40, 80], [11, 56, 40, 80])
) // 0.1583112

// F_test() method
console.log(Tests.F_test([11, 22, 34, 50], [32, 42, 88])) // 2.8359662
console.log(Tests.F_test([30, 40, 50], [300, 80, 9])) // 230.2033332

// Z_score() method
console.log(Tests.Z_score(30, [10, 20, 30, 40, 50])) // 0
console.log(Tests.Z_score(40, [5, 5, 8, 9, 22])) // 4.789429177909865

// U_test() method
console.log(Tests.U_test([200, 40, 70], [11, 450, 30])) // 3

// degreeOfFreedom() and randomArray() functions example
console.log(expjs.degreeOfFreedom(expjs.randomArray(15, 21, true))) // 13

// floor() function example
console.log(0.1 + 0.2) // 0.30000000000000004 ("whaaat?!" hehe...)
console.log(expjs.floor(0.1 + 0.2, 1)) // 0.3

// expectedValue() function example
console.log(expjs.floor(expjs.expectedValue([1, 2, 3], [0.44, 0.21, 0.35]), 0)) // 2

// isPerfect() function example
console.log(expjs.isPerfect(6)) // true
console.log(expjs.isPerfect(18)) // false
console.log(expjs.isPerfect(28)) // true

// allFactors() function example
console.log(expjs.allFactors(28)) // [1, 2, 4, 7, 14]
console.log(expjs.allFactors(90)) // [1, 2, 3, 5, 6, 9, 10, 15, 18, 30, 45]

// factorial () function example
console.log(expjs.factorial(6))
console.log(expjs.factorial(10))

// realAddition () function example
console.log(expjs.realAddition(0.2, 0.1))
console.log(expjs.realAddition(0.1, 0.019)) // will return error and the final result

// Algorithms and Ratio classes example
// For now, it isn't quite rich enough with the algorithms, just the Farey's and Binary Search.
// This will generate the numbers in the Farey's number rows, from 0 to 10 (end and start val you can set yourself).
console.log(Algorithms.Farey(new Ratio(1, 5), new Ratio(3, 10), 10)) // (11) [Array(2), Array(3), Array(5), Array(9), Array(17), Array(33), Array(65), Array(129), Array(257), Array(513), Array(1025)]
console.log(Algorithms.BinarySearch([1, 2, 3], 2)) // 1
console.log(Algorithms.BinarySearch([2, 10, 3, 1, 7], 7)) // 3 (it sorts it in a from-smaller-to-bigger way)
console.log(Algorithms.BinarySearch([81, 90, 100], 42)) // -1

// Vector class example
const vector = new Vector("number", 10, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

console.log(vector.length) // 10
console.log(vector.byIndex(4)) // 5
console.log(vector.index(10)) // 9

const binvec1 = new Vector("number", 5, [0, 1, 0, 1, 1])
const binvec2 = new Vector("number", 5, [1, 0, 1, 0, 0])

binvec1.elementByElement(binvec2, "^")
console.log(binvec1.vector) // [1, 1, 1, 1, 1]

// And so on with the other methods...
// You can look at them in the source code or in brief README.md "documentation".

// Matrix class example
const matrix = new Matrix(10)

console.log(matrix.sidelen) // 10
console.log(matrix.toArray()) // 10 arrays with 10 zeros in each of 'em.
console.log(matrix.navigate([0, 1])) // 0, by default matrix is all zeroes.
console.log(matrix.determinant()) // 0, the matrix is singular.

// The class was somewhat useless, but now is much more helpful.
// It's generelesation and parent is RectMatrix. It's quite similiar, so i won't show it here.

// setPrecision() function example
expjs.setPrecision(14)
console.log(expjs.fixedSize) // 14

// This function had to be implemented because of a bug with the global fixedSize variable.
// Now it's settled, the precision CAN be changed.

// arrayEquality() function example
console.log(expjs.arrayEquality([1, 2, 3], [1, 2, 3], [1, 2, 3])) // true
console.log(expjs.arrayEquality([1, 2, 3], [1, 2, 3], [1, 2, 4])) // false

// dim() funciton example
console.log(expjs.dim([])) // 0
console.log(expjs.dim("Hallo")) // 0
console.log(expjs.dim([1])) // 1
console.log(expjs.dim([[1, [5]]])) // 3

// binomial() function example
console.log(expjs.binomial(10, 2)) // 45
console.log(expjs.binomial(10 * Math.E, 3)) // 2987.1976216796083

// Equation and VarMapping classes example 1
const sextic = new Equation("a*x^{6}-b*x^{5}+c*x^{2}-d*x=0", ["x"]) // A randomly typed sextic polynomial equation.
const varmap = new VarMapping()

console.log(varmap)

varmap.add("a", 10)
varmap.add("b", 3)
varmap.add("c", 91)
varmap.add("d", 30)

console.log(varmap)

console.log(
	"Approximation: x = " + sextic.searchSolution(varmap, "x", 0.3, 0.05, 6)
) // Approximation: x = 0.329632

// Equation and VarMapping example 2
// * Here I'll show an alternative solution using default mappings.
// * Clearly theoritecally, it's supposed to be much faster because of the preparation of parsed data.
// * Still, I haven't done any tests on the same equation so trying to say is quite error-prone.

const varmap_2 = new VarMapping(["x"], [Math.sqrt(2)])
const eq = new Equation("t^{t^x} - x = 0", ["t"], [varmap_2])

console.log("Approximation: t = " + eq.defaultSearchSolution(0, "t", 1, 0.5, 5)) // Approximation: t = 1.2777
