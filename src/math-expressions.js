// * This variable characterizes how many fixed numbers are outputted.
// * You can change it freely, if you want a more "precise" output of some of the functions.
export let fixedSize = 7

// Classes
class Statistics {
	#setCount = 0

	/**
	 * Takes nums array and creates a Statistics object, containing statistic about the row of numeric data.
	 * @param {number[]} nums An array of numbers passed to the function.
	 * @param {boolean} toLarge Tells the constructor should, or should not array be structured in order from the least to the largest num or not in case if it is not structured.
	 */
	constructor(nums = [1, 2, 3, 4, 5], toLarge = true) {
		this.min = min(nums)
		this.max = max(nums)

		this.range = range(nums)
		this.interquartRange = range(nums, true)
		this.countOfElements = nums.length

		this.median = median(nums, toLarge)
		this.average = average(nums)
		this.truncatedAverage = average(nums, true)
		this.mostPopular = mostPopularNum(nums)

		this.sorted = sort(nums, toLarge)
		this.deviations = deviations(nums)

		this.populationVarience = dispersion(nums)
		this.populationStandDev = standardDeviation(nums)
		this.standardError = standardError(nums)

		this.#setCount++
	}

	#set(what) {
		if (this.#setCount === 0) {
			what()
			return 1
		}

		throw new Error("Properties of Statistics objects are immutable!")
	}

	set min(min) {
		this.#set(() => {
			this._min = min
		})
	}

	get min() {
		return this._min
	}

	set max(max) {
		this.#set(() => {
			this._max = max
		})
	}

	get max() {
		return this._max
	}

	set range(range) {
		this.#set(() => {
			this._range = range
		})
	}

	get range() {
		return this._range
	}

	set interquartRange(inter) {
		this.#set(() => {
			this._interquartRange = inter
		})
	}

	get interquartRange() {
		return this._interquartRange
	}

	set countOfElements(length) {
		this.#set(() => {
			this._countOfElements = length
		})
	}

	get countOfElements() {
		return this._countOfElements
	}

	set median(median) {
		this.#set(() => {
			this._median = median
		})
	}

	get median() {
		return this._median
	}

	set average(aver) {
		this.#set(() => {
			this._average = aver
		})
	}

	get average() {
		return this._average
	}

	set truncatedAverage(truncAv) {
		this.#set(() => {
			this._truncatedAverage = truncAv
		})
	}

	get truncatedAverage() {
		return this._truncatedAverage
	}

	set mostPopular(mostPop) {
		this.#set(() => {
			this._mostPopular = mostPop
		})
	}

	get mostPopular() {
		return this._mostPopular
	}

	set sorted(sort) {
		this.#set(() => {
			this._sorted = sort
		})
	}

	get sorted() {
		return this._sorted
	}

	set deviations(devi) {
		this.#set(() => {
			this._deviations = devi
		})
	}

	get deviations() {
		return this._deviations
	}

	set populationVarience(disp) {
		this.#set(() => {
			this._populationVarience = disp
		})
	}

	get populationVarience() {
		return this._populationVariance
	}

	set populationStandDev(popStandDev) {
		this.#set(() => {
			this._populationStandDev = popStandDev
		})
	}

	get populationStandDev() {
		return this._populationStandDev
	}

	set standardError(stdErr) {
		this.#set(() => {
			this._standardErr = stdErr
		})
	}

	get standardError() {
		return this._standardErr
	}
}

class Surface {
	/**
	 * Takes two objects(or just numeric arrays) with properties from 0 to 2 and creates a Surface object.
	 *
	 * !!! NOTE: Be careful, when choosing step in your limits objects(or arrays), because after Surface.x and Surface.y properties of your object are generated
	 * you can work with this object, providing only dots' coordinates, that exist in these arrays, otherwise you get an error.
	 *
	 * @param {object | number[]} xLimits Object(or an array) containing number properties for the x axis of your surface. First number - the start position(the smallest number) of your surface's axis, second numder - the end position of your surafce's x axis and the third is the number, that represents step, with which an array of numbers will be assembled.
	 * @param {object | number[]} yLimits The same as xLimits, but for y axis of your surface.
	 */

	constructor(xLimits, yLimits) {
		this.x = generate(xLimits[0], xLimits[1], xLimits[2])
		this.y = generate(yLimits[0], yLimits[1], yLimits[2])

		this.width = range(this.x)
		this.height = range(this.y)

		this.dots = [[0, 0]]
		this.lines = []
		this.segments = []
	}

	/**
	 * Checks if coordinates of the dot are in limits(or borders, if you prefer) of x and y axis.
	 * This method of Surface class is not supposed to be used directly by the library user, because it needs to get an array of arrays(three-dimensional array) and can have a bit unpredictable results.
	 * @param {number[][][]} dots A bunch of arrays with different dots' coordinates.
	 * @returns {boolean} True if all of dots are in x and y limits or false if they are not.
	 */
	inLimits(...dots) {
		let isHere = true

		dots.forEach((dot) => {
			dot.forEach((coordinate) => {
				if (
					!find(this.x, coordinate[0])[0] ||
					!find(this.y, coordinate[1])[0]
				) {
					isHere = false
				}
			})
		})

		return isHere
	}

	/**
	 * Adds a dot coordinate to Surface.dots property array.
	 * @param {number[][]} dots A bunch of arrays with different dots' coordinates.
	 */
	dot(...dots) {
		if (this.inLimits(dots)) {
			dots.forEach((dot) => {
				if (!find(this.dots, dot)[0]) {
					this.dots.push(dot)
				}
			})
		} else {
			throw Error(
				"Provided coordinate is out of limits of x and y properties of your Surface object."
			)
		}
	}

	/**
	 * Adds two dots' coordinates to Surface.lines(technically creates a straight line, that comes through these two dots).
	 * !!! NOTE: If passed dots' coordinates are not in Surface.dots array, then line will not be added to the Surface.lines.
	 * @param {number[][]} dots A bunch of arrays with different dots' coordinates(two dots, otherwise throws an error).
	 */
	line(...dots) {
		if (this.inLimits(dots)) {
			if (
				dots.length === 2 &&
				find(this.lines, dots)[1] <= 1 &&
				find(this.dots, dots[0])[0] &&
				find(this.dots, dots[1])[0]
			) {
				this.lines.push(dots)
				this.segments.push(dots)
			} else {
				console.log(find(this.dots, dots)[0])
				console.log(find(this.lines, dots)[1] <= 1)
				throw Error(
					`You have used use Surface.prototype.line method for adding
				one(or zero) dot(dots) or line you're trying to add already exists
				or there are no needed dots declared in Surface.dots.
				If you've wanted to add only one dot,
				better use Surface.prorotype.dot() method instead of this one,
				otherwise you'll have to add another dot's coordinates.`
				)
			}
		} else {
			throw Error(
				"Provided coordinate is out of limits of x and y properties of your Surface object."
			)
		}
	}

	/**
	 * Adds one segment(two dots' coordinates - segment's beginning and end) to the Surface.segments array property.
	 * @param {number[][]} dots A bunch of arrays with different dots' coordinates(two dots, otherwise throws an error).
	 */
	segment(...dots) {
		if (this.inLimits(dots)) {
			dots.length === 2
				? this.segments.push(dots)
				: () => {
						throw Error(
							"Coordinates of more or less, than two dots were passed to the Surface.prototype.segment. Only two dots for one segment allowed."
						)
				  }
		} else {
			throw Error(
				"Provided coordinate is out of limits of x and y properties of your Surface object."
			)
		}
	}
}

class Expression {
	#setCount = [0, 0]

	/**
	 * Takes two arrays, one of which contains numbers, used in the expression and the other one contains strings, containing operators, using which expression shall be executed (only after calling one of functions, working with expressions: exp(), sameOperator(), fullExp(), repeatExp().)
	 * @param {number[]} nums An array, containing numbers of expression.
	 * @param {string[]} operators An array, containing operators of expression.
	 */

	constructor(nums = [], operators = []) {
		this.nums = nums
		this.operators = operators
	}

	/**
	 * Just a wrapper for fullExp() function. Watch documentation for it.
	 */
	execute() {
		return fullExp(this)
	}

	/**
	 * Wrapper for repeatExp() function. Watch documentation for it.
	 * @param {number} times A number, representing how many times should current expression be repeated (By default 1).
	 * @param {string} operator A string, representing the operator, with which ariphmetic operation upon the expression result will be done a several times.
	 */
	repeat(times = 1, operator = "+") {
		return repeatExp(this, times, operator)
	}

	get nums() {
		return this._nums
	}

	set nums(nums) {
		if (this.#setCount[0] === 0) {
			this._nums = nums
		} else {
			throw new Error("You can't set nums property for the second time!")
		}

		this.#setCount[0]++
	}

	get operators() {
		return this._operators
	}

	set operators(operators) {
		if (this.#setCount[1] === 0) {
			this._operators = operators
		} else {
			throw new Error(
				"You can't set operators property for the second time!"
			)
		}

		this.#setCount[1]++
	}
}

class Tests {
	constructor() {
		throw new TypeError("Tests is not a constructor")
	}

	/**
	 * Takes an array and a number and checks if the length of the given array equals the given number. If not, throws new Error. Otherwise returns void.
	 * @param {any[]} arr An array, size of which is to be checked for being equal to size parameter.
	 * @param {number} size A number, equality to which is checked.
	 * @throws Error, if the length of given array is not equal to the size parameter.
	 */
	static checkArrSize(arr, size) {
		if (arr.length != size) {
			throw new Error(
				`Expected ${size} elements inside of the passed array, got ${arr.length}.`
			)
		}
	}

	/**
	 * Takes a two-dimensional numeric array, containing two other arrays, and returns the number, representing the value of Student's t-test.
	 * @param {number[]} rows Numeric array, containing two arrays, for which value of Student's t-test is to be found.
	 */
	static t_Students_test(...rows) {
		Tests.checkArrSize(rows, 2)

		const averages = Object.freeze([average(rows[0]), average(rows[1])])
		const errors = Object.freeze([
			Math.pow(standardError(rows[0]), 2),
			Math.pow(standardError(rows[1]), 2),
		])

		return floor(
			exp(
				Math.abs(exp(averages[0], averages[1], "-")),
				Math.sqrt(exp(errors[0], errors[1])),
				"/"
			),
			fixedSize
		)
	}

	/**
	 * Takes a two-dimensional array, containing two arrays, and a number and returns the numeric value of f-test for the equality of dispersions of two sub-arrays.
	 * @param {number[]} rows Two one-dimensional arrays, the equality of dispersions of which shall be found.
	 */
	static F_test(...rows) {
		Tests.checkArrSize(rows, 2)

		const dispersions = Object.freeze([
			dispersion(rows[0], true),
			dispersion(rows[1], true),
		])

		const biggerDispersionIndex = dispersions[0] > dispersions[1] ? 0 : 1

		const difference = exp(
			dispersions[biggerDispersionIndex],
			dispersions[Number(!biggerDispersionIndex)],
			"/"
		)

		return floor(difference, fixedSize)
	}

	/**
	 * Takes a two-dimensional array of numbers and returns the number, representing the results of the Mann-Whitney U-test.
	 * !NOTE: For now be careful, when using, because the method does not work with the arrays, that have repeating numbers in them.
	 * @param {number[]} rows Two one-dimensional arrays, using which the u-test is to be done.
	 */
	static U_test(...rows) {
		Tests.checkArrSize(rows, 2)

		let firstSum = 0
		let secondSum = 0
		let tempNum = 0

		const general = []
		const ranks = []

		;`${rows[0]},${rows[1]}`
			.split(",")
			.forEach((str) => general.push(Number(str)))

		const final = sort(general)

		final.forEach((num, index) => {
			if (num != final[index - 1] && num != final[index + 1]) {
				ranks.push(index + 1)
				tempNum = 0
			} else {
				//! NOT WORKING! FIX!
				if (num === final[index + 1]) {
					ranks.push(index + 1.5) //! Reason is in this thing!
					tempNum = index + 1.5 //! And in this one also. Instead of putting 1.5 here I need to somehow rank the repeating numbers the correct way (but how ???).
				} else {
					ranks.push(tempNum)
				}
			}
		})

		final.forEach((num, index) => {
			if (rows[0].includes(num)) firstSum += ranks[index]
			if (rows[1].includes(num)) secondSum += ranks[index]
		})

		const firstResult =
			rows[0].length * rows[1].length +
			(rows[0].length * (rows[0].length + 1)) / 2 -
			firstSum

		const secondResult =
			rows[0].length * rows[1].length +
			(rows[1].length * (rows[1].length + 1)) / 2 -
			secondSum

		return min([firstResult, secondResult])
	}

	/**
	 * Takes a number and an array of numbers and returns the Z-score for the given number.
	 * @param {number} testedNum A number for which the Z-score is to be found.
	 * @param {number[]} numbers An array of numbers, required to calculate the Z-score for the given number.
	 */
	static Z_score(testedNum, numbers) {
		return exp(
			testedNum - average(numbers),
			standardDeviation(numbers),
			"/"
		)
	}
}

// TODO: Add the possibility of creating the Matrix with no array passed and the toArray() method.
class Matrix {
	#setTimes = 0
	_matrix = new Vector("object")
	_sidelen = 0

	constructor(sidelen = 0, dimensions = []) {
		this.sidelen = sidelen
		Matrix.dimensionCheck(sidelen, dimensions)
		dimensions.forEach((dimension) =>
			this._matrix.add(new Vector("number", sidelen, dimension))
		)

		this.#setTimes++
	}

	static dimensionCheck(sidelen, dimensions) {
		const isVector = dimensions instanceof Vector

		if (isVector) {
			dimensions = dimensions.vector
			dimensions.forEach((vector, index) => {
				dimensions[index] = vector.vector
			})
		}

		dimensions.slice(1).forEach((dimension, index) => {
			if (dimension.length !== dimension[index - 1])
				throw new Error(
					"Lengths of given matrix dimensions are different!"
				)
		})

		if (dimensions[0].length < sidelen) {
			for (let i = 0; i < dimensions.length; i++)
				for (let j = dimensions[i].length; j < sidelen; j++)
					dimensions[i][j] = 0

			for (let i = dimensions.length; i < sidelen; i++)
				dimensions.push(generate(1, dimensions[0].length, 1).fill(0))
		} else {
			for (let i = sidelen; i < dimensions[i].length; ) dimensions.pop()
			for (let i = 0; i < sidelen; i++)
				for (let j = sidelen; j < dimensions[i].length; )
					dimensions[i].pop()
		}

		if (isVector) {
			dimensions.forEach((vector, index) => {
				dimensions[index] = new Vector("number", sidelen, vector)
			})
			dimensions = new Vector("object", sidelen, dimensions)
		}
	}

	set sidelen(newSidelen) {
		this.#setTimes ? Matrix.dimensionCheck(newSidelen, this._matrix) : null
		this._sidelen = newSidelen
	}

	get sidelen() {
		return this._sidelen
	}

	get matrix() {
		return this._matrix
	}

	navigate(coordinate) {
		switch (coordinate.length) {
			case 1:
				return this._matrix.byIndex(coordinate[0])
			case 2:
				return this._matrix
					.byIndex(coordinate[0])
					.byIndex(coordinate[1])

			default:
				throw new Error(
					`Coordinate array with invalid length passed. Expected 1 or 2, but got ${coordinate.length}.`
				)
		}
	}
}

class Vector {
	#setTimes = 0

	_type = "number"
	_length = 0
	_vector = []

	static allowedTypes = Object.freeze([
		"number",
		"string",
		"boolean",
		"function",
		"object",
		"bigint",
		"any",
	])

	static default = Object.freeze({
		string: "",
		number: 0,
		object: null,
		boolean: false,
		bigint: 0n,
		function: function () {},
		any: null,
	})

	constructor(type = "number", length = 0, vector = []) {
		this.length = length
		this.type = type
		this.vector = vector

		this.#setTimes++
	}

	static typeCheck(item, type) {
		if (typeof item !== type && type !== "any")
			throw new Error(
				`Type of item ${item} is not equal to vector type: ${type}. Item type: ${typeof item}`
			)
	}

	delete(index) {
		const deleted = this._vector[index]

		if (index < this._length - 1)
			for (let i = index; i < this._length - 1; i++)
				this._vector[i] = this._vector[i + 1]

		this._length--
		this._vector.pop()

		return deleted
	}

	add(item) {
		Vector.typeCheck(item, this._type)
		this._length++

		return this.vector.push(item) - 1
	}

	swap(index1, index2) {
		if (
			typeof index1 !== "number" ||
			typeof index2 !== "number" ||
			this._vector[index1] === undefined ||
			this._vector[index2] === undefined
		)
			throw new Error("Invalid indexes passed. ")

		const temp = this._vector[index1]
		this._vector[index1] = this._vector[index2]
		this._vector[index2] = temp
	}

	fill(item) {
		Vector.typeCheck(item, this._type)
		this._vector.fill(item)
		return this
	}

	set(index, value) {
		if (this._matrix[index] === undefined)
			throw new Error("Invalid index passed into the set function.")

		this._matrix[index] = value
	}

	byIndex(i) {
		return this._vector[i]
	}

	slice(start, end) {
		const sliced = this._vector.slice(start, end)
		return new Vector(sliced.length, this._type, sliced)
	}

	index(element) {
		return this._vector.indexOf(element)
	}

	indexes(element) {
		const indexes = [this._vector.indexOf(element)]

		if (indexes[0] >= 0)
			for (let i = indexes[0] + 1; i < this._length; i++)
				if (this._vector[i] === element) indexes.push(i)

		return indexes
	}

	static getArrType(array) {
		let type = array[0] !== undefined ? typeof array[0] : "nulllength"

		for (const element of array)
			if (typeof element !== type) {
				type = "any"
				break
			}

		return type
	}

	get length() {
		return this._length
	}

	get vector() {
		return this._vector
	}

	get type() {
		return this._type
	}

	set type(newType) {
		if (this.#setTimes === 1)
			throw new Error("Type parameter is not modifyable by default.")
		if (!Vector.allowedTypes.includes(newType))
			throw new Error(`Unknown vector type: ${newType}`)

		this._type = newType
	}

	set length(newLength) {
		if (newLength < 0)
			throw new Error(
				`Length cannot be negative! Passed length: ${newLength}`
			)
		if (newLength < this._length)
			for (let i = this._length; i > newLength; i--) this._vector.pop()

		if (newLength > this._length && this.#setTimes === 1)
			for (let i = this._length; i < newLength; i++)
				this._vector[i] = Vector.default[this._type]

		this._length = newLength
	}

	set vector(newVector) {
		const type = Vector.getArrType(newVector)

		if (this._length < newVector.length && this.#setTimes === 1)
			throw new Error(
				`The length of new vector is too big. Length of current vector: ${this.length}. Length of the new vector: ${newVector.length}`
			)
		if (
			type !== this._type &&
			this._type !== "any" &&
			type !== "nulllength"
		)
			throw new TypeError(
				`Type of the new vector is different to the one to which you are trying to assign. Old type: ${this._type}. New type: ${type}`
			)

		newVector.forEach((element) => Vector.typeCheck(element, this._type))

		this._vector = newVector
		this.length = newVector.length
	}
}

// TODO : Implement the add(), multiply(), subtract(), divide() and root() methods.
class Ratio {
	#beenSet = 0

	constructor(numerator, denomenator) {
		this.numerator = numerator
		this.denomenator = denomenator
		this.#beenSet++
	}

	evaluate() {
		return this._numerator / this._denomenator
	}

	get numerator() {
		return this._numerator
	}

	get denomenator() {
		return this._denomenator
	}

	set numerator(numerator) {
		this.#set(() => {
			this._numerator = numerator
		})
	}

	set denomenator(denomenator) {
		this.#set(() => {
			this._denomenator = denomenator
		})
	}

	#set(handler) {
		if (this.#beenSet === 0) {
			handler()
			return 1
		}

		throw new Error(
			"You are not allowed to modify the fields of Ratio class instance. "
		)
	}
}

class Algorithms {
	constructor() {
		throw new TypeError("Algorithms is not a constructor")
	}

	static Farey(startRatio, endRatio, iterations = 0) {
		function formNewRatio(first, second) {
			return new Ratio(
				first.numerator + second.numerator,
				first.denomenator + second.denomenator
			)
		}

		const gotten = [[startRatio, endRatio]]

		for (let i = 0; i < iterations; i++) {
			gotten.push([])
			for (let j = 0; j < gotten[i].length; j++) {
				gotten[i + 1].push(gotten[i][j])
				if (j !== gotten[i].length - 1)
					gotten[i + 1].push(
						formNewRatio(gotten[i][j], gotten[i][j + 1])
					)
			}
		}

		return gotten
	}
}

// Functions

/**
 * 	Executes an expression with two numbers
 *  @param {number} firstNum  First number(or string).
 *  @param {number} secondNum Second number(or string).
 *  @param {string} operator  String, containing an ariphmetic operator(+, -, /, *, ** or %).
 *  @returns {number} Result of a mathematical expression.
 */
function exp(firstNum = 2, secondNum = 2, operator = "+") {
	switch (operator) {
		case "+":
		case "-":
		case "/":
		case "*":
		case "**":
		case "%":
			if (
				!(typeof firstNum === "number" && typeof secondNum === "number")
			)
				throw new Error(
					"First and second arguments of exp() function must be numbers!"
				)

			return eval(`${firstNum} ${operator} ${secondNum}`)

		default:
			throw new Error("Unknown airphmetic operator passed!")
	}
}

/**
 * Executes mathematical expression with the same operator repeating, but different numbers.
 * @param {number[]} numbers An array of numbers(or strings) using which expression will be executed.
 * @param {string} operator - A string, containing an operator, with which expression will be executed.
 */
function sameOperator(numbers = [], operator = "+") {
	let result = numbers[0] !== undefined ? numbers[0] : 0

	for (let i = 0; i < numbers.length - 1; i++)
		result = exp(result, numbers[i + 1], operator)

	return result
}

/**
 * Executes mathematical expression with different operators and numbers.
 *
 * ! NOTE: passed operators[] array must be shorter than the passed numbers[] array for one element or the same length
 * ! (but in this case the last element of the operators[] array will be ignored).
 *
 * @param {Expression} expression An object, containing two array properties, one of which is for numbers(or strings) using which expression will be executed and the second is for strings, each of which contains an ariphmetic operator, using which expression shall be executed.
 */
function fullExp(expression = { nums: [], operators: [] }) {
	let result = 0

	if (expression.nums.length - expression.operators.length > 1)
		throw Error(
			"Passed operators[] array length is less than passed number[] array for more than one element \
(operators[] arr must be shorter for only one element)."
		)

	for (let i = 0; i < expression.nums.length - 1; i++) {
		result =
			i === 0
				? exp(
						expression.nums[0],
						expression.nums[1],
						expression.operators[0]
				  )
				: exp(result, expression.nums[i + 1], expression.operators[i])
	}

	return result
}

/**
 * 	Repeats an expression a bunch of times and returns you the result of making an ariphmetic actions between them.
 *
 * ! NOTE: keys of the key-value pairs of the passed object must have the next names: nums, operators.
 * ! Wrong names of keys will cause an Error.
 *
 * 	@param {Expression} expression An object, that contains two key-value pairs, where each value is an array. First array contains nums, second - operators.
 * 	@param {number} countOfRepeats   A number of repeats of ariphmetic operation.
 * 	@param {string} repeatOperator   A string, containing an operator, with which ariphmetic operation upon the expression result will be done a several times.
 */
function repeatExp(
	expression = { nums: [2, 2], operators: ["*"] },
	countOfRepeats = 1,
	repeatOperator = "+"
) {
	let [result, tempRes] = [0, 0]

	if (expression.nums === undefined || expression.operators === undefined)
		throw Error(
			'You have passed expression object with the wrong names of keys of key-value pairs! \
They must have next names: "nums" form number array, "operators" for operators array.'
		)
	else {
		result = fullExp(expression)

		switch (repeatOperator) {
			case "+":
				result *= countOfRepeats
				break

			default:
				for (let i = 0; i < countOfRepeats - 1; i++)
					result = exp(result, tempRes, repeatOperator)
		}
	}

	return result
}

/**
 * Takes the number array and rerturns an average of it.
 * @param {number[]} nums An array of numbers passed to the function.
 * @param {boolean} isTruncated A boolean saying does or does not the average will be truncated. By default false.
 * @param {number} percents A number, that is used as a multiplier for two, when shortening the numeric array.
 */
function average(nums = [1, 2, 3, 4, 5], isTruncated = false, percents = 10) {
	const len = nums.length
	const newArr =
		isTruncated && percents > 0 ? truncate(nums, percents) : copy(nums)

	percents === 0 && isTruncated
		? newArr.filter((num) => num != null && num != undefined)
		: null

	const modif = len === newArr.length ? 0 : -1
	return floor(sameOperator(newArr) / (len + modif), fixedSize)
}

/**
 * Takes an array of numbers and returns the smallest of thems.
 * @param {number[]} nums An array of numbers passed to the function.
 * @returns {number} The smallest number of the passed array.
 */
function min(nums = [1, 2, 3, 4, 5]) {
	return Math.min.apply(null, nums)
}

/**
 * Takes an array of numbers and returns the largest of them.
 * @param {number[]} nums An array of numbers passed to the function.
 * @returns {number} The largest number in passed numerical array.
 */
function max(nums = [1, 2, 3, 4, 5]) {
	return Math.max.apply(null, nums)
}

/**
 * Takes an array of numbers, which length can be odd or even and returns the median of it.
 * @param {number[]} nums An array of numbers, passed to the function.
 */
function median(nums = [1, 2, 3, 4, 5]) {
	const sorted = Object.freeze(sort(nums))
	return nums.length % 2 === 1
		? sorted[Math.round(nums.length / 2) - 1]
		: average([sorted[nums.length / 2 - 1], sorted[nums.length / 2]])
}

/**
 * Takes an array and returns most "popular" number in it.
 * @param {number[]} nums An array of numbers passed to the function.
 */
function mostPopularNum(nums = [1, 2, 3, 4, 5]) {
	const repeats = []
	let sameNum = false
	let countOfRepeats = 0

	for (let i = 0; i < nums.length; i++, countOfRepeats = 0) {
		for (let j = i; j < nums.length; j++) {
			if (nums[i] === nums[j]) {
				countOfRepeats++
			}

			sameNum =
				i < nums.length
					? (sameNum =
							nums[i - 1] === nums[i] && nums[i] === nums[i + 1])
					: (sameNum = nums[i - 1] === nums[i])
		}

		if (!sameNum || i === nums.length - 1) {
			repeats.push(countOfRepeats)
		}
	}

	const maxNum = max(repeats)

	return maxNum === 1 ? "None" : nums[repeats.indexOf(maxNum)]
}

/**
 * @param {number[]} nums An array of numbers passed to the function.
 * @param {boolean} isInterquartile A boolean, representing shall the range to be gotten be interquartille or not. By deafault false.
 * @returns the range of the numeric array (if passed [-5, 10] returns 15).
 */
function range(nums = [1, 2, 3, 4, 5], isInterquartile = false) {
	const newArr = isInterquartile ? truncate(nums, 25) : copy(nums)
	return max(newArr) - min(newArr)
}

/**
 * Takes an array of numbers and returns sorted version of it.
 * @param {number[]} nums An array of numbers, passed to the function to sort.
 * @param {boolean} fromSmallToLarge A boolean, on which value depends will the function sort an array from least to the largest or from largest to the least. By default true.
 */
function sort(nums = [2, 4, 3, 5, 1], fromSmallToLarge = true) {
	const listArr = copy(nums)
	const sorted = []

	if (fromSmallToLarge) {
		for (let i = 0; i < nums.length; i++) {
			const least = min(listArr)

			listArr.splice(listArr.indexOf(least), 1)
			sorted.push(least)
		}
	} else {
		for (let i = 0; i < nums.length; i++) {
			const largest = max(listArr)

			listArr.splice(listArr.indexOf(largest), 1)
			sorted.push(largest)
		}
	}

	return sorted
}

/**
 * Copies an array without referencing its object.
 * @param {number[]} nums A numeric array, thatneeds to be copied.
 * @returns {number[]} Copy of a passed array, without referencing its object.
 */
function copy(nums = [1, 2, 3, 4, 5]) {
	const copyArr = []
	nums.forEach((num) => copyArr.push(num))

	return copyArr
}

/**
 * Takes three numbers: the start position, the end position and the step, generates a numeric array using them and returns it.
 * @param {number} start Start number in array(it's supposed to be the least number in it)
 * @param {number} end End number in array(the creation of the array is going until end value + 1 number is reached).
 * @param {number} step Value, by which the count is incremented every iteration.
 */
function generate(start, end, step = 1) {
	const generated = []
	const modif = Number.isInteger(step) ? 1 : 0.1
	for (let i = start; i < end + modif; i += step) generated.push(floor(i, 1))
	return generated
}

/**
 * Takes an array(or a string) and a number(or a one-dimensional array of numbers or a substring), that must be found in this array. If the value is found returns true and a count of times this number was found, otherwise false.
 * @param {number[] | number[][] | string} searchArr Array in which queried value is being searched.
 * @param {number | number[] | string} searchVal Searched value.
 * @returns {[boolean, number, number[]]} An array, containig boolean(was the needed number, numeric array or string found in searchArr or not), a number(frequency) and an array of numbers(indexes, where the needed number or string characters were found), but the last one is only when the searchVal is not an array and searchArr is not a two-dimensional array.
 */
function find(searchArr, searchVal) {
	let result = false
	let foundTimes = 0
	const foundIndexes = []

	if (searchVal instanceof Array)
		searchVal.forEach((value) =>
			searchArr.forEach((arr, index) =>
				arr.forEach((num) => {
					if (value === num) {
						result = true
						foundTimes++

						if (!foundIndexes.includes(index))
							foundIndexes.push(index)
					}
				})
			)
		)
	else
		for (let i = 0; i < searchArr.length; i++)
			searchArr[i] === searchVal
				? ((result = true), foundTimes++, foundIndexes.push(i))
				: null

	return [result, foundTimes, foundIndexes]
}

/**
 * Takes a number and returns a string, containing it's readable variant. (Like 12345 and 12 345)
 * @param {number} num A number, from which to make a better-looking version of it.
 */
function readable(num) {
	const arr = num.toString().split("")
	let changeStr = ""

	while (arr.length % 3 > 0) {
		changeStr += arr[0]
		if ((arr.length - 1) % 3 === 0) changeStr += " "
		arr.shift()
	}

	arr.forEach((number, index) => {
		index % 3 === 0 && index > 0
			? (changeStr += ` ${number}`)
			: (changeStr += `${number}`)
	})

	return changeStr
}

/**
 * Factors out a passed number to the prime numbers. Works quite quickly.
 * @param {number} num Number, to be factored out.
 * @returns {number[]} Prime factors array.
 */
function factorOut(number) {
	const factors = []

	for (
		let currDevisor = 2;
		number !== 1;
		currDevisor += currDevisor === 2 ? 1 : 2
	) {
		while (number % currDevisor === 0) {
			factors.push(currDevisor)
			number /= currDevisor
		}
	}

	return Object.freeze(factors)
}

/**
 * Takes a numeric array and a number and truncates the passed array, using the second paramater as a count of percents of numbers, that shall be deleted.
 * @param {number[]} nums An array to be truncated.
 * @param {number} percents A number, that is multiplied by two(if you passed 10, then it is 20) and represents count of percents of numbers to be deleted from the edges of the passed array.
 */
function truncate(nums, percents = 10) {
	const shortened = sort(copy(nums))
	const len = shortened.length
	const toDelete = Number(Math.trunc((len / 100) * percents))

	for (let i = 0; i < toDelete; i++) {
		shortened.shift()
		shortened.pop()
	}

	return shortened
}

/**
 * Takes three numbers, thwo of which are numbers for which least common multiple shall be found and the third one is a search range for them.
 * @param {number} firstNum First number.
 * @param {number} secondNum Second number.
 * @param {number} searchRange A number, representing range of searches(if you get null from this function, then try to make range bigger). By default 100.
 */
function leastCommonMultiple(firstNum, secondNum, searchRange = 100) {
	const firstMultiples = []
	const secondMultiples = []

	let firstCount = firstNum
	let secondCount = secondNum

	let result = null

	for (
		let i = 0;
		i < searchRange;
		i++, firstCount += firstNum, secondCount += secondNum
	) {
		firstMultiples.push(firstCount)
		secondMultiples.push(secondCount)
	}

	loop1: for (const multiple1 of firstMultiples)
		for (const multiple2 of secondMultiples)
			if (multiple1 === multiple2) {
				retult = multiple1
				break loop1
			}

	return result
}

/**
 * Takes an a array(or a row, if you prefer) and returns an array of all deviations from its average.
 * @param {number[]} row An array, in which deviations should be found.
 * @param {boolean} isSquare A boolean, representing should or should not every found deviation be powered by two or else it shall be absolute. By default false.
 * @param {boolean} isTruncated A boolean, representing, should or should not an array be truncated, during the process of searching for its average. By default false.
 * @param {number} percents A number, representing count of percents of numbers, for which this array shall be truncated, while searching for its average. Pased value will be doubled. Works only if isTruncated equals true. By default 10.
 */
function deviations(row, isSquare = false, isTruncated = false, percents = 10) {
	const rowAverage = average(row, isTruncated, percents)
	const deviations = []

	row.forEach((num) => {
		isSquare
			? deviations.push(floor(Math.pow(num - rowAverage, 2), fixedSize))
			: deviations.push(floor(Math.abs(num - rowAverage), fixedSize))
	})

	deviations.length = row.length

	return deviations
}

/**
 * Returns a dispersion of a numeric array(or a row, if you prefer). It can be of a population variance or a sample variance, depending on the second parameter.
 * @param {number[]} row A numeric array, dispersion for which is to be found and returned.
 * @param {boolean} isSquare A boolean, representing should or should not result of the deviations() function be found powering found deviations by two or not. If false(what is a default value), then instead of doing that it uses absolute values of found deviations.
 * @param {boolean} isGeneral A boolean value representing whether or not the variance returned is either the population or the sample. By default true.
 * @param {number[]} indexes A numeric array of indexes, using which, inside of a first argument needed values will be taken for a sample population(only if second parameter is false).
 */
function dispersion(
	row = [1, 2, 3, 4, 5],
	isSquare = false,
	isGeneral = true,
	indexes = [0, 1, 2]
) {
	const newRow = []

	!isGeneral
		? row.forEach((num, index) => {
				indexes.forEach((checkIndex) => {
					index === checkIndex ? newRow.push(num) : null
				})
		  })
		: row.forEach((num) => newRow.push(num))

	newRow.length = row.length

	return average(deviations(newRow, isSquare), true, 0) // ! DO NOT DO LIKE THIS, WHEN USING THE LIBRARY(I mean the last two arguments of average()).
}

/**
 * Takes an array of numbers and returns (general or sample) standard deviation of it depending on the second parameter. (Indexes of sample, if it's a sample, are set using the last argument.)
 * @param {number[]} row Row(or an array if you prefer) of numbers, (sample or population) standard deviation for which shall be found.
 * @param {boolean} isPopulation A boolean, representing should function return the population standard deviation or sample standard deviation.
 * @param {number[]} indexes An array of numbers, representing indexes of the sample, sample standard deviation deviation for which shall be found.
 */
function standardDeviation(
	row = [1, 2, 3, 4, 5],
	isPopulation = true,
	indexes = [0, 1, 2]
) {
	return floor(
		Math.sqrt(dispersion(row, true, isPopulation, indexes)),
		fixedSize
	)
}

/**
 * Takes an array of numbers and returns the standard error of it.
 * @param {number[]} row An array of numbers, standard error for which is to be found.
 * @param {boolean} isDispersion A boolean, that characterizes, should it be dispersion, found through absolute values of diviations in the row or standard deviation(found common way). By default false(standard deviation is used).
 * @param {boolean} isPopulation A boolean, representing should or not standart error be population(true) or sample(false). By default true.
 * @param {number[]} indexes An array of numbers, representing indexes using which sample of the original row should be made. Works only if isPopulation equals true.
 */
function standardError(
	row = [1, 2, 3, 4, 5],
	isDispersion = false,
	isPopulation = true,
	indexes = [0, 1, 2]
) {
	const newArr = []

	isPopulation
		? row.forEach((num) => newArr.push(num))
		: row.forEach((num, index) => {
				indexes.forEach((checkIndex) => {
					index === checkIndex ? newArr.push(num) : null
				})
		  })

	return isDispersion
		? floor(
				exp(dispersion(row, false), Math.sqrt(newArr.length), "/"),
				fixedSize
		  )
		: floor(
				exp(standardDeviation(row), Math.sqrt(newArr.length), "/"),
				fixedSize
		  )
}

/**
 * Takes a two-dimensional array, containing one dimensional number arrays and returns the number of degrees of freedom for all of them.
 * @param {number[][]} numRows Multiple one-dimensional arrays for which the degree of freedom is to be found.
 */
function degreeOfFreedom(...numRows) {
	let lenSum = 0
	for (let i = 0; i < numRows.length; i++) lenSum += numRows[i].length
	return lenSum - numRows.length
}

/**
 * Takes a numbers array and an array of probabilities for each of the given numbers to appear and returns expected value for them.
 * @param {number[]} numbers A number array, expected value for which is to be found.
 * @param {number[]} probabilities An array of probabilitiles for certain numbers from numbers array to appear.
 */
function expectedValue(numbers, probabilities) {
	const values = []

	if (numbers.length > probabilities.length) {
		throw new Error(
			"The length of probability array is smaller than the length of the numbers array. Cannot compute the expectedValue."
		)
	}

	for (let i = 0; i < numbers.length; i++)
		values.push(numbers[i] * probabilities[i])

	return sameOperator(values)
}

/**
 * Takes the max length of the random array, it's max value, the flag, characterizing whether numbers in it should be integers.
 * @param {number} maxLength The largest count of numbers, that can appear in the random array. (It can be different from the given value).
 * @param {number} maxValue The max value, that can be found in the randomly generated array.
 * @param {boolean} integers The boolean flag, that represents whether all numbers in the array should be integers or not. By default false.
 */
function randomArray(maxLength, maxValue, integers = false) {
	const length = Math.floor(Math.random() * maxLength)
	const storage = []

	for (let i = 0; i < length; i++)
		storage.push(
			integers
				? floor(Math.random * maxValue, 0)
				: floor(Math.random * maxValue, fixedSize)
		)

	return storage
}

/**
 * Floors the given number to the needed level of precision.
 * @param {number} number Number to be floored.
 * @param {number} afterDot How many positions after dot should there be.
 * @returns {number}
 */
function floor(number, afterDot) {
	return Number(number.toFixed(afterDot))
}

/**
 * Checks whether the number passed is perfect or not.
 * @param {number} number Number, perfectness of which is to be checked.
 */
function isPerfect(number) {
	return sameOperator(allFactors(number)) === number
}

/**
 * Takes one integer and returns all of its factors (not only primes, but others also).
 * @param {number} number An integer, factors for which are to be found.
 */
function allFactors(number) {
	const factors = [1]

	for (let currFactor = 2; currFactor !== number; currFactor++)
		if (number % currFactor === 0) factors.push(currFactor)

	return Object.freeze(factors)
}

/**
 * This function calculates the factorial of a positive integer given.
 * @param {number} number A positive integer, factorial for which is to be calculated.
 */
function factorial(number) {
	const numbers = []

	if (number < 0)
		throw new Error(
			"factorial() function is not supposed to be used with the negative numbers. "
		)
	if (!numbers.length) return 1

	for (let i = 1; i <= number; i++) numbers.push(i)
	return sameOperator(numbers, "*")
}

export {
	Statistics,
	Surface,
	Expression,
	Tests,
	Ratio,
	Algorithms,
	Vector,
	Matrix,
	exp,
	sameOperator,
	fullExp,
	repeatExp,
	average,
	min,
	max,
	median,
	mostPopularNum,
	range,
	sort,
	copy,
	generate,
	find,
	readable,
	factorOut,
	truncate,
	leastCommonMultiple,
	deviations,
	dispersion,
	standardDeviation,
	standardError,
	degreeOfFreedom,
	expectedValue,
	randomArray,
	floor,
	isPerfect,
	allFactors,
	factorial,
}
