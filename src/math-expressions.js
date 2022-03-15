/**
 * * Hello and welcome into the source code of the mathematical JavaScript library math-expressions.js.
 * * This is the version 0.8.
 * * I tried to comment everything that may be somewhat confusing along with most of the elements of library.
 * * Hope this helps. Any contributions are highly appriciated!
 * * (After this note comes the code)
 *
 * @copyright HGARgG-0710(Igor Kuznetsov), 2020-2022
 */

// Imports

import ntk from "ntk"

// Global variables

/**
 *
 * * This variable characterizes how many fixed numbers are outputted.
 * * You can change it freely using setPrecision() function, if you want a more "precise" output of some of the functions.
 */
export let fixedSize = 11

// Aliases

// * sameOperator was a really-really bad name, and so I decided to change it.
// * Still, for backwards compatebility reasons I left it.
// * (Library has a lot of bugs already, why add more? XD Better just fix the old ones and try not to add new. )
export const sameOperator = repeatedArithmetic

// Classes

/**
 * This class represents an assembly of various statistics on the array of numeric data given.
 *
 * Useful when needing a lot of info about data in one place.
 */
class Statistics {
	#setCount = 0

	static isNumeric(data) {
		for (let i = 0; i < data.length; i++)
			if (typeof data[i] !== "number") return false
		return true
	}

	/**
	 * Takes nums array and creates a Statistics object, containing statistic about the row of numeric data.
	 * @param {number[]} nums An array of numbers passed to the function.
	 * @param {boolean} toLarge Tells the constructor should, or should not array be structured in order from the least to the largest num or not in case if it is not structured.
	 */
	constructor(nums, toLarge = true, nullValue = "None") {
		if (Statistics.isNumeric(nums)) {
			this.min = min(nums)
			this.max = max(nums)

			this.sorted = sort(nums, toLarge)
			this.range = range(nums)
			this.interquartRange = range(nums, true)

			this.median = median(nums, toLarge)
			this.average = average(nums)
			this.truncatedAverage = average(nums, true)
			this.mostPopular = mostPopularNum(nums, nullValue)

			this.deviations = deviations(nums)

			this.populationVarience = dispersion(nums)
			this.populationStandDev = standardDeviation(nums)
			this.standardError = standardError(nums)
		} else {
			this.min = null
			this.max = null

			this.sorted = null
			this.range = null
			this.interquartRange = null

			this.median = null
			this.average = null
			this.truncatedAverage = null
			this.mostPopular = mostPopularElem(nums, nullValue)

			this.deviations = null

			this.populationVarience = null
			this.populationStandDev = null
			this.standardError = null
		}

		this.countOfElements = nums.length
		this.dim = dim(nums)

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

	set dim(d) {
		this.#set(() => {
			this._dim = d
		})
	}

	get dim() {
		return this._dim
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

/**
 * This class represents a geometric surface with dots, segments and lines on it.
 * They are represented via coordinates.
 */
class Surface {
	static _n = 0
	n = 0

	/**
	 * Takes two objects(or just numeric arrays) with properties from 0 to 2 and creates a Surface object.
	 *
	 * !!! NOTE: Be careful, when choosing step in your limits objects(or arrays), because after Surface.x and Surface.y properties of your object are generated
	 * you can work with this object, providing only dots' coordinates, that exist in these arrays, otherwise you get an error. !!!
	 *
	 * @param {object | number[]} xLimits Object(or an array) containing number properties for the x axis of your surface. First number - the start position(the smallest number) of your surface's axis, second numder - the end position of your surafce's x axis and the third is that step, with which an array of numbers will be assembled.
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

		n = ++Surface._n
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

	draw(width, height, title = `Surface ${this.n}`) {
		function plot(contex) {
			this.dots.forEach((el) => {
				contex.point({ x: el[0], y: el[1] })
			})
			this.segments.forEach((el) => {
				contex.polyline([
					{ x: el[0][0], y: el[0][1] },
					{ x: el[1][0], y: el[1][1] },
				])
			})
			this.lines.forEach((el) => {}) // TODO: Fix the fact, that lines currently do not represent. 
		}

		ntk.createClient((error, application) => {
			const window = application.createWindow({
				height: height,
				width: width,
			})
			window.setTitle(title)
			const contex = window.getContext("x11")

			plot(window, contex)

			window.map()
		})
	}
}

/**
 * This class represents a mathematical arithmetic expression.
 *
 * It can also come in helpful when evaluating the same expression various number of times.
 */
class Expression {
	#setCount = [0, 0]
	nums = []
	operators = []

	/**
	 * Takes two arrays, one of which contains numbers, used in the expression and the other one contains strings, containing operators, using which expression shall be executed (only after calling one of functions, working with expressions: exp(), repeatedArithmetic(), fullExp(), repeatExp().)
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

	/**
	 * @param {number[]} numbers Numbers, which take place in the expression.
	 */
	set nums(numbers) {
		if (this.#setCount[0] === 0) this._nums = numbers
		else throw new Error("You can't set nums property for the second time!")
		this.#setCount[0]++
	}

	get operators() {
		return this._operators
	}

	set operators(operators) {
		if (this.#setCount[1] === 0) this._operators = operators
		else
			throw new Error(
				"You can't set operators property for the second time!"
			)

		this.#setCount[1]++
	}
}

/**
 * This a class that contains various statistical tests.
 * It is a static class, i.e. it is supposed to be like this:
 * * Tests.testName();
 */
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
	 * @param {number[][]} rows Two one-dimensional arrays, using which the u-test is to be done.
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

/**
 * This class represents a mathematical rectangular matrix.
 */
class RectMatrix {
	_matrix = new Vector("object")
	_sidelen = [0, 0]

	constructor(sidelens = [0, 0], dimensions = []) {
		RectMatrix.dimensionCheck(sidelens, dimensions)

		this._sidelen = sidelens
		for (let i = 0; i < dimensions.length; i++)
			this._matrix.add(new Vector("number", sidelens[0], dimensions[i]))
	}

	static dimensionCheck(sidelens = [0, 0], dimensions = []) {
		while (sidelens[0] < dimensions.length) dimensions.pop()
		while (sidelens[0] > dimensions.length)
			dimensions.push(generate(1, sidelens[1]).map(() => 0))

		for (let i = 0; i < sidelens[0] - 1; i++)
			if (dimensions[i].length !== dimensions[i + 1].length) {
				const biggerDimIndex =
					dimensions[i].length < dimensions[i + 1].length ? i + 1 : i
				const smallerDimIndex = biggerDimIndex === i ? i + 1 : i

				for (let j = 0; j < dimensions.length[biggerDimIndex]; j++)
					dimensions[smallerDimIndex].push(0)
			}

		for (let i = 0; i < sidelens[0]; i++)
			while (dimensions[i].length > sidelens[1]) dimensions[i].pop()
	}

	get sidelen() {
		return this._sidelen
	}

	set sidelen(sides = [0, 0]) {
		RectMatrix.dimensionCheck(sides)
		this._sidelen = copy(sides)
	}

	get matrix() {
		return this._matrix
	}

	scalarAdd(scalar) {
		for (let i = 0; i < this.sidelen[0]; i++)
			this.matrix.byIndex(i).scalarAdd(scalar)
	}

	scalarMultiply(scalar) {
		for (let i = 0; i < this.sidelen[0]; i++)
			this.matrix.byIndex(i).scalarMultiply(scalar)
	}

	toArray() {
		const final = []
		for (let i = 0; i < this._sidelen[0]; i++) {
			final.push(this.matrix.byIndex(i).vector)
		}
		return final
	}

	matrixMultiply(matrix) {
		if (this.sidelen[0] !== matrix.sidelen[1])
			throw new Error(
				`Trying to multiply rectangular matrices with different values for width and height ${this.sidelen[0]} and ${matrix.sidelen[1]} correspondently. They must be equal.`
			)

		const copy = this.toArray()
		const matrixCopy = matrix.toArray()
		const result = copy.map(() => matrixCopy[0].map(() => 0))

		for (let i = 0; i < this.sidelen[1]; i++)
			for (let j = 0; j < matrix.sidelen[0]; j++)
				for (let k = 0; k < this.sidelen[0]; k++)
					result[i][j] += copy[i][k] * matrix[k][j]

		return new RectMatrix([matrix.sidelen[0], this.sidelen[1]], result)
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

/**
 * This class represents a square mathematical matrix.
 * It allows only numbers in itself.
 */
class Matrix extends RectMatrix {
	constructor(sidelen = 0, dimensions = []) {
		super([sidelen, sidelen], dimensions)
	}

	static dimensionCheck(sidelen, dimensions) {
		RectMatrix.dimensionCheck([sidelen, sidelen], dimensions)
	}

	/**
	 * Sets the siedelen of a square matrix.
	 * @param {number} newSidelen New sidelen.
	 */
	set sidelen(newSidelen) {
		Matrix.dimensionCheck(newSidelen)
		this._sidelen = [newSidelen, newSidelen]
	}

	get sidelen() {
		return this._sidelen[0]
	}

	/**
	 * Finds the determinant of a square matrix it's invoked onto.
	 */
	determinant() {
		function findAdditional(matrix, i, j) {
			const final = matrix.matrix.slice(1).vector.map(() => [])

			for (let index = 0; index < matrix.sidelen; index++)
				for (let jndex = 0; jndex < matrix.sidelen; jndex++)
					if (index !== i && jndex !== j)
						final[index > i ? index - 1 : index].push(
							matrix.toArray()[index][jndex]
						)

			return new Matrix(final.length, final).determinant()
		}

		if (this.sidelen < 2) {
			if (this.sidelen[0] === 1) return this.navigate([0, 0])
			return 0
		}

		if (this.sidelen > 2) {
			if (this.sidelen === 1) return this.matrix.byIndex(0).byIndex(0)
			const matricesDeterminants = {}

			let n = 0
			let finale = 0

			for (let j = 0; j < this.sidelen; j++)
				matricesDeterminants[this.navigate([0, j])] = findAdditional(
					this,
					0,
					j
				)

			for (const pair in matricesDeterminants) {
				finale += matricesDeterminants[pair] * pair * (-1) ** n
				n++
			}

			return finale
		}

		return (
			this.navigate([0, 0]) * this.navigate([1, 1]) -
			this.navigate([1, 0]) * this.navigate([0, 1])
		)
	}
}

/**
 * This class represents a length-safe array with some nice stuff added to it.
 * It also may behave like a mathematical vector.
 */
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
		function: () => {},
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

	slice(start, end = this.vector.length) {
		const sliced = this._vector.slice(start, end)
		return new Vector(this._type, sliced.length, sliced)
	}

	index(element) {
		return this._vector.indexOf(element)
	}

	scalarMultiply(scalar) {
		for (let i = 0; i < this._vector.length; i++) this._vector[i] *= scalar
	}

	scalarAdd(scalar) {
		for (let i = 0; i < this._vector.length; i++) this._vector[i] += scalar
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

/**
 * This class represents a mathematical ratio of two rational numbers (as a special case - integers).
 */
class Ratio {
	#beenSet = 0

	constructor(numerator, denomenator) {
		this.numerator = numerator
		this.denomenator = denomenator
		this.#beenSet++
	}

	evaluate() {
		return this.numerator / this.denomenator
	}

	add(ratio) {
		return Ratio.simplify(
			new Ratio(
				this.numerator * ratio.denomenator +
					ratio.numerator * this.denomenator,
				this.denomenator * ratio.denomenator
			)
		)
	}

	static simplify(ratio) {
		const len = Math.max(
			allFactors(ratio.numerator).length,
			allFactors(ratio.denomenator).length
		)

		let currMultiple

		for (let i = 0; i < len; i++) {
			if (
				(currMultiple = leastCommonMultiple(
					ratio.numerator,
					ratio.denomenator
				)) !== null
			) {
				ratio.numerator /= currMultiple
				ratio.denomenator /= currMultiple
			}
		}

		return ratio
	}

	divide(ratio) {
		return Ratio.simplify(
			new Ratio(
				ratio.denomenator * this.numerator,
				this.denomenator * ratio.numerator
			)
		)
	}

	multiply(ratio) {
		return Ratio.simplify(
			new Ratio(
				this.numerator * ratio.numerator,
				this.denomenator * ratio.denomenator
			)
		)
	}

	subtract(ratio) {
		return Ratio.simplify(
			new Ratio(
				this.numerator * ratio.denomenator -
					this.denomenator * ratio.numerator,
				this.denomenator * ratio.denomenator
			)
		)
	}

	root(base) {
		return new Ratio(
			this.numerator ** (1 / base),
			this.denomenator ** (1 / base)
		)
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

/**
 * This class has a bunch of useful algorithms.
 * This is one of the static classes, it contains only methods,
 * i.e. it's supposed to be used like this:
 * * Algorithms.algorithmName(arg_1, ..., arg_n);
 */
class Algorithms {
	constructor() {
		throw new TypeError("Algorithms is not a constructor")
	}

	static BinarySearch(array, number) {
		// * For getting the middle index of the array.
		const middle = (arr) => floor(median(arr.map((a, i) => i)), 0)
		const copyArray = sort(array)
		let index = middle(copyArray)

		let copyArr = copy(copyArray)
		let copyIndex = index

		for (let i = 0; ; i++) {
			if (number === copyArray[index]) return index
			if (copyArr.length === 1) break

			const isBigger = number > copyArray[index]

			copyArr = isBigger
				? copyArr.slice(copyIndex + 1, copyArr.length)
				: copyArr.slice(0, copyIndex)
			copyIndex = middle(copyArr)
			index = isBigger ? index + copyIndex : index - copyIndex
		}

		return -1
	}

	/**
	 * Runs the Farey Algorithm with given ratios and number of iterations. Returns the resulting array of ratios.
	 * @param {Ratio} startRatio Ratio, from which the Farey Algorithm should start.
	 * @param {Ratio} endRatio Ratio, that is used as an upper bound in the algorithm.
	 * @param {number} iterations Number of iterations (integer).
	 */
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

/**
 * This class's purpose is to represent a mathematical equation of multiple variables.
 * * Temporary note: for now it can be used only with simplest arithmetical operators (+, -, ^(exponentiation), /, *).
 */
class Equation {
	variables = []
	equation = ""
	defaultParsed = null
	defaultMappings = null

	/**
	 * A static method for parsing an equation with various mappings applied.
	 * @param {string} equationLine A line, containing an equation.
	 * @param {VarMapping} mappings A mapping of variables to their values.
	 * @param {string[]} variables Additional variable names.
	 */
	static ParseEquation(equationLine, origmappings, variables) {
		const operators = Object.freeze(["+", "*", "/", "-", "^"])
		const brackets = Object.freeze(["[", "]", "(", ")", "{", "}"])
		const digits = Object.freeze([
			"0",
			"1",
			"2",
			"3",
			"4",
			"5",
			"6",
			"7",
			"8",
			"9",
			".",
		])

		let metEquality = false

		const mappings = { ...origmappings.varmap } // for simplicity of use

		function eliminateSpaces() {
			return equationLine.split(" ").join("")
		}

		function parse(line) {
			const result = { right: "", left: "" }

			for (let i = 0; i < line.length; i++) {
				switch (line[i]) {
					case "=":
						if (metEquality)
							throw new Error(
								"Met equality sign in the parsed string already!"
							)
						metEquality = true
						break

					default:
						if (line[i] === "^") {
							line = Equation.replaceIndex(line, i, "**")
							continue
						}

						if (mappings.variables.includes(line[i])) {
							line = Equation.replaceIndex(
								line,
								i,
								mappings.mappings[
									mappings.variables.indexOf(line[i])
								]
							)
							continue
						}

						if (brackets.includes(line[i])) {
							line = Equation.replaceIndex(
								line,
								i,
								brackets.indexOf(line[i]) % 2 === 0 ? "(" : ")"
							)
							continue
						}

						if (
							operators.includes(line[i]) ||
							digits.includes(line[i]) ||
							variables.includes(line[i])
						)
							continue

						throw new Error(`Unknown symbol detected: ${line[i]}`)
				}
			}

			for (let i = 0; i < line.length; i++) {
				if (line[i] === "=") {
					result.right = line.slice(0, i)
					result.left = line.slice(i + 1)
					break
				}
			}

			return result
		}

		return parse(eliminateSpaces())
	}

	/**
	 * This static method replaces a given index in a given string by a given value and returns the result.
	 * Note: Original string is NOT mutated.
	 *
	 * @param {string} string String, index in which is to be changed.
	 * @param {number} index Index.
	 * @param {number | string | boolean} val Value to be inserted on a place of index "index", thereby replacing it.
	 */
	static replaceIndex(string, index, val) {
		return string.substring(0, index) + val + string.substring(index + 1)
	}

	/**
	 * Parses an equation, that it's invoked onto.
	 * @param {VarMapping} mappings Various mappings for variables.
	 */
	parse(mappings) {
		return Equation.ParseEquation(this.equation, mappings, this.variables)
	}

	constructor(equationText = "", vars = ["x"], defaultMappings = []) {
		this.variables = vars
		this.equation = equationText
		this.defaultMappings = defaultMappings
		this.defaultParsed = []

		for (let i = 0; i < defaultMappings.length; i++)
			this.defaultParsed.push(this.parse(defaultMappings[i]))
	}
	// TODO: Currently, plugging works correctly only with variables of length 1. Fix it.
	static plug(origparsed, varname, varvalue) {
		const parsed = { ...origparsed } // Making a copy.

		for (let i = 0; i < parsed.right.length; i++)
			if (parsed.right[i] === varname)
				parsed.right = Equation.replaceIndex(parsed.right, i, varvalue)

		for (let i = 0; i < parsed.left.length; i++)
			if (parsed.left[i] === varname)
				parsed.left = Equation.replaceIndex(parsed.left, i, varvalue)

		return parsed
	}

	/**
	 * Difference in between the right and left sides of the equation with mappings for different variables.
	 * @param {VarMapping} mappings Mapping of variables to their values.
	 * @param {string} varname Additional mapping, can be used with a variable, that is being searched for in an algorithm.
	 * @param {number} varvalue Addtional value.
	 */
	differRightLeft(mappings, varname, varvalue) {
		if (typeof varname !== "string")
			throw new Error(
				`Expected string as an input of variable name, got ${typeof varname}}`
			)

		const plugged = Equation.plug(this.parse(mappings), varname, varvalue)
		return eval(plugged.right) - eval(plugged.left)
	}

	/**
	 * This method searches for the solution of an equation it's invoked onto.
	 *
	 * ! WARNING 1 !
	 *
	 * This method performs only numerical search, i.e. it doesn't search for the precise solution.
	 * Just an approximation. (Namely, the one number of all given that is the closest to the solution.)
	 * (However, if the root is rational, then it could even be exactly it.)
	 *
	 * ! WARNING 2 !
	 *
	 * DO NOT set the precision to be more than 5 or 6, because otherwise the JavaScript stack won't handle it (unless, you extended it).
	 *
	 * PARAMETRES
	 *
	 * @param {VarMapping} mappings Mapping for all the variables in the equation except one for which search is invoked.
	 * @param {string} varname Name of the variable for which search is invoked.
	 * @param {number} startvalue Value, from which search is invoked.
	 * @param {number} pathlength The length of the search path.
	 * @param {number} precision The depth of the search, i.e. how accurate the final result shall be.
	 */
	searchSolution(mappings, varname, startvalue, pathlength, precision = 4) {
		const differences = generate(
			startvalue,
			startvalue + pathlength,
			floor(10 ** -precision, precision),
			precision
		).map((i) => {
			return Math.abs(this.differRightLeft(mappings, varname, i))
		})

		return (
			startvalue +
			differences.indexOf(min(differences)) *
				floor(10 ** -precision, precision)
		)
	}

	defaultDifferRightLeft(index, varname, varvalue) {
		if (typeof varname !== "string")
			throw new Error(
				`Expected string as an input of variable name, got ${typeof varname}}`
			)

		const plugged = Equation.plug(
			this.defaultParsed[index],
			varname,
			varvalue
		)
		return eval(plugged.right) - eval(plugged.left)
	}

	/**
	 * This method searches for the solution of an equation it's invoked onto using default mappings.
	 * It's technically supposed to be much faster because of the data preparation.
	 *
	 * ! WARNING 1 !
	 *
	 * This method performs only numerical search, i.e. it doesn't search for the precise solution.
	 * Just an approximation. (Namely, the one number of all given that is the closest to the solution.)
	 * (However, if the root is rational, then it could even be exactly it.)
	 *
	 * ! WARNING 2 !
	 *
	 * DO NOT set the precision to be more than 5 or 6, because otherwise the JavaScript stack won't handle it (unless, you extended it).
	 *
	 * PARAMETRES
	 * @param {number} index Index of the default mapping to be used.
	 * @param {string} varname Name of the variable for which search is invoked.
	 * @param {number} startvalue Value, from which search is invoked.
	 * @param {number} pathlength The length of the search path.
	 * @param {number} precision The depth of the search, i.e. how accurate the final result shall be.
	 */
	defaultSearchSolution(index, varname, startvalue, pathlength, precision) {
		const differences = generate(
			startvalue,
			startvalue + pathlength,
			floor(10 ** -precision, precision),
			precision
		).map((i) => {
			return Math.abs(this.defaultDifferRightLeft(index, varname, i))
		})

		return (
			startvalue +
			differences.indexOf(min(differences)) *
				floor(10 ** -precision, precision)
		)
	}
}

/**
 * This class represents a mapping of variables to numeric values.
 * It can be used separately or in combination with the Equation class.
 * (It's original purpose was the second)
 */
class VarMapping {
	varmap = { variables: [], mappings: [] }

	/**
	 * Constructs a new mapping based on the data inputted.
	 * @param {string[]} vars Variable names in a mapping.
	 * @param {number[]} maps Numerical values for them.
	 */
	constructor(vars = [], maps = []) {
		function hasLetters(thing) {
			return thing.toLowerCase() !== thing.toUpperCase()
		}

		if (!(vars instanceof String) && !(maps instanceof Array))
			if (vars.length !== maps.length)
				throw new Error(
					"Arrays of different lengths passed to VarMapping constructor. "
				)

		for (let i = 0; i < vars.length; i++) {
			if (!hasLetters(vars[i]))
				throw new Error(
					`Varname without letters is being passed: ${vars[i]}`
				)
			for (let j = i + 1; j < vars.length; j++)
				if (vars[j] === vars[i])
					throw new Error(
						"Given repeating variable maps in the VarMapping constructor. "
					)
		}

		this.varmap.variables = vars
		this.varmap.mappings = maps
	}

	/**
	 * Adds a new pair of name-number to the mapping.
	 * Useful when using some sort of numerical function in a big cycle.
	 * @param {string} name Name of the new (or old) property.
	 * @param {number} value Numerical value to be set to the name.
	 */
	add(name, value) {
		if (typeof value !== "number")
			throw new Error("Given non-numeric data as a value for mapping. ")

		this.varmap.variables.push(name)
		this.varmap.mappings.push(value)
	}

	/**
	 * Deletes a property from varmap by the given name.
	 * @param {string} name Name to be used for deletion.
	 */
	delete(name) {
		for (
			let i = this.varmap.variables.indexOf(name);
			i < this.varmap.variables.length;
			i++
		) {
			this.varmap.variables[i] = this.varmap.variables[i + 1]
			this.varmap.mappings[i] = this.varmap.mappings[i + 1]
		}

		this.varmap.mappings.pop()
		this.varmap.variables.pop()
	}
}

// Functions

/**
 * Executes an arithmetic expression with two numbers
 *
 * * Note: with it you can even build a very simple calculator.
 * * Plus, it's more secure an allows only aritmetic (for now, at least).
 *
 * @param {number} firstNum  First number.
 * @param {number} secondNum Second number.
 * @param {string} operator  String, containing an ariphmetic operator(+, -, /, *, ** or %).
 * @returns {number} Result of a mathematical expression.
 */
function exp(firstNum = 2, secondNum = 2, operator = "+") {
	if (!(typeof firstNum === "number" && typeof secondNum === "number"))
		throw new Error(
			"First and second arguments of exp() function must be numbers!"
		)

	switch (operator) {
		case "+":
			return realAddition(firstNum, secondNum)[0]
		case "-":
			return realAddition(firstNum, -secondNum)[0]

		case "/":
		case "*":
		case "**":
		case "^":
		case "%":
			return eval(
				`${firstNum} ${operator === "^" ? "**" : operator} ${secondNum}`
			)

		default:
			throw new Error("Unknown airphmetic operator passed!")
	}
}

/**
 * Executes mathematical expression with the same operator repeating, but different numbers.
 * @param {number[]} numbers An array of numbers(or strings) using which expression will be executed.
 * @param {string} operator - A string, containing an operator, with which expression will be executed.
 */
function repeatedArithmetic(numbers = [], operator = "+") {
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
 * Repeats an expression a bunch of times and returns you the result of making an ariphmetic actions between them.
 *
 * ! NOTE: keys of the key-value pairs of the passed object must have the next names: nums, operators.
 * ! Wrong names of keys will cause an Error.
 *
 * @param {Expression} expression An object, that contains two key-value pairs, where each value is an array. First array contains nums, second - operators.
 * @param {number} countOfRepeats   A number of repeats of ariphmetic operation.
 * @param {string} repeatOperator   A string, containing an operator, with which ariphmetic operation upon the expression result will be done a several times.
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

	result = tempRes = fullExp(expression)
	if (repeatOperator === "+") return (result *= countOfRepeats)

	for (let i = 0; i < countOfRepeats - 1; i++)
		result = exp(result, tempRes, repeatOperator)

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
	return floor(repeatedArithmetic(newArr) / (len + modif), fixedSize)
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
 * @param {any} noneValue A value, returned if the array doesn't have a most popular number. String "None" by default.
 */
function mostPopularNum(nums = [], noneValue = "None") {
	const t = (e, i) =>
		i < nums.length ? Number(nums[i] === e) + t(e, i + 1) : 0
	const e = (j) => nums[j]
	const freq = {}

	for (let i = 0; i < nums.length; i++)
		if (freq[nums[i]] === undefined) freq[nums[i]] = t(e(i), i)

	const freq_vals = Object.values(freq)
	const maxRepetition = max(freq_vals)
	const mostFrequent = nums[freq_vals.indexOf(maxRepetition)]

	for (let i = 0; i < nums.length; i++)
		if (maxRepetition === freq[nums[i]] && nums[i] !== mostFrequent)
			return noneValue

	return maxRepetition !== -Infinity ? mostFrequent : noneValue
}

/**
 * @param {number[]} nums An array of numbers passed to the function.
 * @param {boolean} isInterquartile A boolean, representing shall the range to be gotten be interquartille or not. By deafault false.
 * @returns the range of the numeric array (if passed [-5, 10] returns 15).
 */
function range(nums = [1, 2, 3, 4, 5], isInterquartile = false) {
	const newArr = isInterquartile ? truncate(nums, 25) : copy(nums)
	return floor(max(newArr) - min(newArr))
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
 * @param {any[]} nums An array that needs to be copied.
 * @returns {number[]} Copy of a passed array, without referencing its object.
 */
function copy(nums = [1, 2, 3, 4, 5]) {
	return nums.map((i) => i)
}

/**
 * Takes three numbers: the start position, the end position and the step, generates a numeric array using them and returns it.
 * @param {number} start Start number in array(it's supposed to be the least number in it)
 * @param {number} end End number in array(the creation of the array is going until end value + 1 number is reached).
 * @param {number} step Value, by which the count is incremented every iteration.
 * @param {number} precision Precision of a step, by default set to 1. (If your array is of integers, it's not necessary.)
 */
function generate(start, end, step = 1, precision = 1) {
	const generated = []
	const modif = Number.isInteger(step) ? 1 : 10 ** -precision
	for (let i = start; i < end + modif; i += step)
		generated.push(floor(i, precision))
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

	return factors
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
				result = multiple1
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

	return floor(average(deviations(newRow, isSquare), true, 0)) // ! DO NOT DO LIKE THIS, WHEN USING THE LIBRARY(I mean the last two arguments of average()).
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
 * @param {number[]} numRows Multiple one-dimensional arrays for which the degree of freedom is to be found.
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

	if (numbers.length > probabilities.length)
		throw new Error(
			"The length of probability array is smaller than the length of the numbers array. No possibility to compute the expectedValue."
		)

	for (let i = 0; i < numbers.length; i++)
		values.push(numbers[i] * probabilities[i])

	return floor(repeatedArithmetic(values))
}

/**
 * Floors the given number to the needed level of precision.
 * @param {number} number Number to be floored.
 * @param {number} afterDot How many positions after dot should there be.
 * @returns {number}
 */
function floor(number, afterDot = fixedSize) {
	return Number(number.toFixed(afterDot))
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
 * Checks whether the number passed is perfect or not.
 * @param {number} number Number, perfectness of which is to be checked.
 */
function isPerfect(number) {
	return repeatedArithmetic(allFactors(number)) === number
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

	for (let i = 1; i <= number; i++) numbers.push(i)
	if (!numbers.length) return 1

	return repeatedArithmetic(numbers, "*")
}

/**
 * This function does a fixed addition of two numbers. It decreases error a tiny bit, but with large numbers it may be signigicant.
 * @param {number} float1 First number to be added.
 * @param {number} float2 Second number to be added.
 * @returns {[number, number]} a number with error much less than it would be with JavaScript addition.
 */
function realAddition(float1, float2) {
	const sum = float1 + float2
	const fixedB = sum - float1
	const fix = float2 - fixedB

	return [sum + fix, fix]
}

/**
 * This function takes an integer value, representing the new precision of the output and sets fixdSize equal to it.
 * @param {number} newPrecision The new value of fixedSize.
 */
function setPrecision(newPrecision = 0) {
	fixedSize = newPrecision | 0 // in case someone malisciously decides to put floats in there, hehe :D
}

/**
 * This funciton takes in n arrays of dimension 1 (dim (arr) = 1) and compares them.
 * (I.e. returns the boolean value, representing whether they're equal or not).
 * @param {any[]} arrays An array of one-dimensional array of any length.
 */
function arrayEquality(...arrays) {
	function equalBinary(arr1, arr2) {
		if (arr1.length !== arr2.length) return false

		for (let i = 0; i < arr1.length; i++)
			if (arr1[i] !== arr2[i]) return false

		return true
	}

	for (let i = 1; i < arrays.length; i++)
		if (!equalBinary(arrays[i - 1], arrays[i])) return false

	return true
}

/**
 * This function takes in array and determines how nested it is (its dimensions).
 * If it is not array, dimension is 0.
 * If it is an empty array, then it's dimension is 0.
 * If it is an array only with an element which is not an array, then it's dim is 1.
 * If it is an array with only an array of dim n-1, then it's own dim is n.
 * If it is an array with a bunch of stuff with different dims, then it's dim is the highest of the ones of it's elements + 1.
 * This function is defined recursively.
 * @param {any[] | any} array An array with any data in it. It doesn't have to be an array, though.
 */
function dim(array) {
	const d = (elem) => (elem instanceof Array ? 1 + t(elem) : 1)
	const t = (arr) => (arr.length === 0 ? 0 : max(arr.map((el) => d(el))))
	return array instanceof Array ? t(array) : 0
}

/**
 * Takes two numbers (one rational and other - integer) and calculates the value of combinatorics choose function for them.
 * (What it actually does is it takes their binomial coefficient, but never mind about that. )
 * @param {number} n First number (any rational number).
 * @param {number} k Second number (integer).
 */
function binomial(n, k) {
	if (typeof n !== "number" || typeof k !== "number")
		throw new Error("Requiring a number to calculate the choose function. ")

	// Rounding down just in case.
	k = k | 0

	return floor(
		repeatedArithmetic(
			generate(0, k - 1, 1).map((num) => n - num),
			"*"
		) / factorial(k)
	)
}

/**
 * Takes and array and returns the most frequently appearing element in it or null, if there isn't one.
 * @param {any[]} array An array of ... pretty much anything, for as long as it's not null.
 * @param {any} noneValue The value that is to be returned in case there is no most popular element.
 */
function mostPopularElem(array = [], noneValue = null) {
	const most_popular_index = mostPopularNum(
		generate(0, array.length).map((i) => array.indexOf(array[i]))
	)
	if (most_popular_index === "None") return noneValue
	return array[most_popular_index]
}

// TODO: Implement the compareUniversal(...arrays), which uses dim

// * Exports (constants are being exported separately).

export {
	Statistics,
	Surface,
	Expression,
	Tests,
	Ratio,
	Algorithms,
	Vector,
	Matrix,
	RectMatrix,
	VarMapping,
	Equation,
	exp,
	repeatedArithmetic,
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
	realAddition,
	setPrecision,
	arrayEquality,
	dim,
	binomial,
	mostPopularElem,
}
