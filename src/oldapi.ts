// deno-lint-ignore-file no-explicit-any ban-types no-inferrable-types
import { util, abstract } from "./newapi"

// TODO: add all of those functions that seem fit from the new api into the old one...
const {
	flatCopy,
	countAppearences,
	arrApply,
	indexOfMult,
	valueCompare,
	clearRepetitions,
} = util
const { UniversalMap } = abstract.types

// TODO: finish;
// ! These things had previously been the math-expressions.js 0.8; They are now being updated using TypeScript;

// todo: new things to add:
// * 1. more number-theoretic functions...;
// * 2. an entirely new system for the definition of the "op" function -- current operator set won't do; one wants user to be capable of adding their own ones...
// ? 	2.1?. Maybe some kind of object type OperatorDefinitions, that would get taken? And have some default one that is used and can be changed by the user as well?

// TODO: things to do (generally):
// * 1. Pick out the "too specific" or "number-oriented" methods and rewrite them to be more general; then, add a version for numbers (for backward compatibility),
// *    or, just add the old alias (like in the case of sameOperator...)
// *    1.1. Special cases of it:
// *        1.1.1. repeatedArighmetic -- rename to repeated (add a ton of new possibilities of use for this...)
// * 2. Rewrite the in-editor JSDoc documentation (most probably, from scratch...)...
// * 3. Add proper types to everywhere in the code (especially, places with dots...);
// * 4. Fix all the TypeErrors...
// * 5. Make code more permissive (get rid of Object.freeze and other such "safety" things, get rid of the Error throws...);
// * 6. Simplify function argument lists; get rid of booleans functions of which can be subsued by the default values of the other parameters without loss of generality...
// * 7. Add new in-editor documentation for the new definitions...
// * 8. After having finished all else, pray do check that all the things that are being wanted to be exported are, in fact, being exported...

/**
 * * This is the Old API source code, version pre-1.0 (in work).
 * @copyright HGARgG-0710(Igor Kuznetsov), 2020-2023
 */

// Global variables

/**
 *
 * * This variable characterizes how many fixed numbers are outputted.
 * * You can change it freely using setPrecision() function, if you want a more "precise" output of some of the functions.
 */
export let fixedSize: number = 11

// Aliases

export const exp = op
export const repeatedArithmetic = repeatedOperation
export const sameOperator = repeatedArithmetic

// Classes

/**
 * This class represents an assembly of various statistics on the array of numeric data given.
 *
 * Useful when needing a lot of info about data in one place.
 */
class Statistics {
	min: number | null
	max: number | null
	median: number | null
	range: number | null
	interquartRange: number | null
	average: number | null
	truncatedAverage: number | null
	sorted: number[] | null
	deviations: number[] | null
	populationVariance: number | null
	populationStandDev: number | null
	standardError: number | null

	mostPopular: any[]
	length: number
	dim: number

	// ? use the newapi.isNumber for this thing (they are the same, just less repetition...)
	static isNumeric(data: any[]): data is number[] {
		for (let i = 0; i < data.length; i++)
			if (typeof data[i] !== "number") return false
		return true
	}

	/**
	 * Takes nums array and creates a Statistics object, containing statistic about the row of numeric data.
	 * @param {number[]} nums An array of numbers passed to the function.
	 * @param {boolean} forward Tells the constructor should, or should not array be structured in order from the least to the largest num or not in case if it is not structured.
	 */
	constructor(
		nums: any[] = [],
		forward: boolean = true,
		nullValue: string = "None"
	) {
		if (Statistics.isNumeric(nums)) {
			this.min = min(nums)
			this.max = max(nums)

			this.sorted = sort(nums, forward)
			this.range = range(nums)
			this.interquartRange = range(nums, true)

			this.median = median(nums)
			this.average = average(nums)
			this.truncatedAverage = average(nums, true)

			this.deviations = deviations(nums)

			this.populationVariance = dispersion(nums)
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

			this.deviations = null

			this.populationVariance = null
			this.populationStandDev = null
			this.standardError = null
		}

		this.mostPopular = mostPopular(nums, nullValue)
		this.length = nums.length
		this.dim = dim(nums)
	}
}

// TODO: add the user interface to the window of the Surface.draw(), such that it would be possible to modify a surface given right there....
// TODO: get rid of the inLimits: let the thing be scalable: that is, if there is
/**
 * This class represents a geometric surface with dots, segments and lines on it.
 * They are represented via coordinates.
 */
class Surface {
	static _n: number = 0
	n: number = 0

	x: [number, number]
	y: [number, number]

	width: number
	height: number

	dots: [number, number][]
	lines: [number, number][]
	segments: number[][][]

	// TODO: add capability to have the initial Surface not being empty (like it is at the moment...)
	// TODO: create a new function splitArray() for splitting an array based on a comparison of a kind and a value...
	/**
	 * Takes two objects(or just numeric arrays) with properties from 0 to 2 and creates a Surface object.
	 *
	 * !!! NOTE: Be careful, when choosing step in your limits objects(or arrays), because after Surface.x and Surface.y properties of your object are generated
	 * you can work with this object, providing only dots' coordinates, that exist in these arrays, otherwise you get an error. !!!
	 *
	 * @param {object | number[]} xInit Object(or an array) containing number properties for the x axis of your surface. First number - the start position(the smallest number) of your surface's axis, second numder - the end position of your surafce's x axis and the third is that step, with which an array of numbers will be assembled.
	 * @param {object | number[]} yInit The same as xLimits, but for y axis of your surface.
	 */
	constructor(xInit: [number, number], yInit: [number, number]) {
		this.x = [...xInit]
		this.y = [...yInit]

		this.width = range(this.x)
		this.height = range(this.y)

		this.dots = []
		this.lines = []
		this.segments = []

		this.n = ++Surface._n
	}

	// TODO: expand the x, y upon insertion; 
	add(
		type: "segment" | "dot" | "line",
		data: [number, number] | number[][]
	): number {
		if (indexOfMult(this[`${type}s`], data, valueCompare).length !== 0)
			return this[`${type}s`].length
		return type === "segment"
			? this.segments.push(data as number[][])
			: this[`${type}s`].push(data as [number, number])
	}

	delete(type: "segment" | "dot" | "line", data: number[]): number {
		return (this[`${type}s`] =
			indexOfMult(this[`${type}s`], data, valueCompare).length === 0
				? this[`${type}s`]
				: clearRepetitions(this[`${type}s`], data, valueCompare)).length
	}

	// TODO: all that stuff (except for "draw" is obsolete; when adding support for expanding bounds on the Surface, pray delete...)
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
		// TODO: this is to be written ; the decision to use the "ntk" was scratched; an alternative solution is currently sought;
	}
}

/**
 * This class represents a mathematical arithmetic expression.
 *
 * It can also come in helpful when evaluating the same expression various number of times.
 */
class Expression {
	objects: string[] = []
	operators: string[] = []

	/**
	 * Takes two arrays, one of which contains numbers, used in the expression and the other one contains strings, containing operators, using which expression shall be executed (only after calling one of functions, working with expressions: exp(), repeatedArithmetic(), fullExp(), repeatExp().)
	 * @param {string[]} objects An array, containing numbers of expression.
	 * @param {string[]} operators An array, containing operators of expression.
	 */

	constructor(objects: string[] = [], operators: string[] = []) {
		this.objects = objects
		this.operators = operators
	}

	/**
	 * Just a wrapper for fullExp() function. Watch documentation for it.
	 */
	execute() {
		return fullExp(this)
	}

	// TODO: create a new kind of "repeat": repeat (just repeat) and repeatCompose (the current repeat), also make the repeatCompose take an array of arguments for an operator;
	// TODO: then, add the repeatComposeSame as the current repeat (special case of the repeatCompose)...
	/**
	 * Wrapper for repeatExp() function. Watch documentation for it.
	 * @param {number} times A number, representing how many times should current expression be repeated (By default 1).
	 * @param {string} operator A string, representing the operator, with which ariphmetic operation upon the expression result will be done a several times.
	 */
	repeat(operator: string, times: number = 1) {
		return repeatExp(this, operator, times)
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

	addMatrix(matrix) {
		if (!arrayEquality(matrix.sidelen, this.sidelen))
			throw new Error("Trying to add matrices with different lengths. ")

		const thisCopy = new RectMatrix(this.sidelen, this.dimentions)

		for (let i = 0; i < matrix.sidelen[0]; i++)
			thisCopy.matrix[i].addVector(matrix.matrix[i])

		return thisCopy
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

	static allowedTypes = [
		"number",
		"string",
		"boolean",
		"function",
		"object",
		"bigint",
		"any",
	]

	static default = {
		string: "",
		number: 0,
		object: null,
		boolean: false,
		bigint: 0n,
		function: () => {},
		any: null,
	}

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
		if (this._vector[index] === undefined)
			throw new Error("Invalid index passed into the set function.")

		this._vector[index] = value
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

	crossProduct(vector) {
		if (this.length != 3 && this.length != 7)
			throw new Error(
				"Cross product is not defined for vectors, which lengths aren't 3 or 7. "
			)
		if (this.length != vector.length)
			throw new Error(
				"Trying to cross product vectors with different lengths. "
			)

		if (vector.length === 3)
			return new Vector("number", 3, [
				this.vector[1] * vector.vector[2] -
					vector.vector[1] * this.vector[2],
				vector.vector[0] * this.vector[2] -
					this.vector[0] * vector.vector[2],
				this.vector[0] * vector.vector[1] -
					this.vector[1] * vector.vector[0],
			])

		// TODO: Use the RectMatrix product formula on wikipedia page.
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

	addVector(vector) {
		const vecCopy = copy(this.vector)
		this.elementByElement(vector, "+")

		const retCopy = copy(this.vector)
		this.vector = vecCopy

		return new Vector(
			this.type,
			Math.max(this.length, vector.length),
			retCopy
		)
	}

	vectorScalarMultiply(vector) {
		const main =
			Math.max(this.length, vector.length) == vector.length
				? vector
				: this
		const other = main.vector == vector.vector ? this : vector
		return repeatedArithmetic(
			other.vector.map((el, i) => el * main.vector[i])
		)
	}

	map(f = (x) => x, type = this.type) {
		return new Vector(type, this.length, this.vector.map(f))
	}

	elementByElement(vector, operation) {
		for (let i = 0; i < Math.min(vector.length, this.length); i++)
			this.set(
				i,
				eval(`this.vector[${i}] ${operation} vector.vector[${i}]`)
			)
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

	static BinarySearch(array: number[], number: number): number {
		// * For getting the middle index of the array.
		const middle = (arr: number[]) =>
			floor(median(arr.map((_a, i) => i)), 0)
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
	static Farey(startRatio: Ratio, endRatio: Ratio, iterations: number = 0) {
		// ? add as an operation to the Ratio class?
		function formNewRatio(first: Ratio, second: Ratio): Ratio {
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

// ! Rename this thing; it's pretty general (so not Polynomial, for instance), but it's not JUST an equation; it's one involving numbers; ALSO -- decide what to do about the matter of numbers within the library;
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

// TODO: this thing it to be rewritten (both the JSDoc and the function...)
/**
 * Executes an arithmetic expression with two numbers
 *
 * * Note: with it you can even build a very simple calculator.
 * * Plus, it's more secure an allows only aritmetic (for now, at least).
 *
 * @param {number} firstObj  First number.
 * @param {number} secondObj Second number.
 * @param {string} operator  String, containing an ariphmetic operator(+, -, /, *, ** or %).
 * @returns {number} Result of a mathematical expression.
 */
function op(firstObj: any, secondObj: any, operator: string): any {
	// TODO: make this nice...
	switch (operator) {
		case "+":
			return realAddition(firstObj, secondObj)[0]
		case "-":
			return realAddition(firstObj, -secondObj)[0]

		case "/":
		case "*":
		case "**":
		case "^":
		case "%":
			return eval(
				`${firstObj} ${operator === "^" ? "**" : operator} ${secondObj}`
			)

		default:
			throw new Error("Unknown airphmetic operator passed!")
	}
}

// TODO: rewrite this later, as a repeated application of the same function on itself...
// * Example of how one's future Code might look like (currrently, won't work; no dependency):
// const repeatedOperation = (objects: string[], operator: string) =>
// {
// let i = 1
// let result = objects[0]
// const repeated = () => {result = exp(result, objects[i++], operator)}
// return repeatedApplication(repeated, objects.length)
// }
/**
 * Executes mathematical expression with the same operator repeating, but different numbers.
 * @param {number[]} objects An array of numbers(or strings) using which expression will be executed.
 * @param {string} operator - A string, containing an operator, with which expression will be executed.
 */
function repeatedOperation(objects: string[] = [], operator: string) {
	return new Expression(
		objects,
		objects.map(() => operator)
	).execute()
}

// TODO: same as the function above -- use the repeatedApplication...
/**
 * Executes mathematical expression with different operators and numbers.
 *
 * ! NOTE: passed operators[] array must be shorter than the passed numbers[] array for one element or the same length
 * ! (but in this case the last element of the operators[] array will be ignored).
 *
 * @param {Expression} expression An object, containing two array properties, one of which is for numbers(or strings) using which expression will be executed and the second is for strings, each of which contains an ariphmetic operator, using which expression shall be executed.
 */
function fullExp(expression: Expression): any {
	if (expression.objects.length === 0) return null
	let result: any = expression.objects[0]

	for (let i = 0; i < expression.objects.length - 1; i++)
		result = exp(result, expression.objects[i + 1], expression.operators[i])

	return result
}

/**
 * Repeats an expression a bunch of times and returns you the result of making an ariphmetic actions between them.
 *
 * ! NOTE: keys of the key-value pairs of the passed object must have the next names: nums, operators.
 * ! Wrong names of keys will cause an Error.
 *
 * @param {Expression} expression An object, that contains two key-value pairs, where each value is an array. First array contains nums, second - operators.
 * @param {number} timesRepeat   A number of repeats of ariphmetic operation.
 * @param {string} repeatOperator   A string, containing an operator, with which ariphmetic operation upon the expression result will be done a several times.
 */
function repeatExp(
	expression: Expression,
	repeatOperator: string,
	timesRepeat = 1
): any {
	let tempRes = null
	let result = (tempRes = fullExp(expression))

	for (let i = 0; i < timesRepeat - 1; i++)
		result = exp(result, tempRes, repeatOperator)

	return result
}

/**
 * Takes the number array and rerturns an average of it.
 * @param {number[]} nums An array of numbers passed to the function.
 * @param {boolean} isTruncated A boolean saying does or does not the average will be truncated. By default false.
 * @param {number} percents A number, that is used as a multiplier for two, when shortening the numeric array.
 */
function average(
	nums: number[] = [],
	isTruncated: boolean = false,
	percents: number = 10
): number {
	const len = nums.length
	const newArr =
		isTruncated && percents > 0 ? truncate(nums, percents) : copy(nums)

	percents === 0 && isTruncated
		? newArr.filter((num) => num != null && num != undefined)
		: null

	const modif = len === newArr.length ? 0 : -1
	return floor(
		repeatedArithmetic(
			newArr.map((a: number) => String(a)),
			"+"
		) /
			(len + modif),
		fixedSize
	)
}

/**
 * Takes an array of numbers and returns the smallest of thems.
 * @param {number[]} nums An array of numbers passed to the function.
 * @returns {number} The smallest number of the passed array.
 */
function min(nums: number[] = []): number {
	return arrApply(Math.min, nums)
}

/**
 * Takes an array of numbers and returns the largest of them.
 * @param {number[]} nums An array of numbers passed to the function.
 * @returns {number} The largest number in passed numerical array.
 */
function max(nums: number[] = []): number {
	return arrApply(Math.max, nums)
}

/**
 * Takes an array of numbers, which length can be odd or even and returns the median of it.
 * @param {number[]} nums An array of numbers, passed to the function.
 */
function median(nums: number[] = []): number {
	const sorted = sort(nums)
	const firstIndex = sorted[Math.round(nums.length / 2) - 1]
	return nums.length % 2 === 1
		? firstIndex
		: average([firstIndex, sorted[nums.length / 2]])
}

/**
 * Takes an array and returns most "popular" number in it.
 * @param {number[]} elems An array of numbers passed to the function.
 * @param {any} noneValue A value, returned if the array doesn't have a most popular number. String "None" by default.
 */
function mostPopular(
	elems: any[] = [],
	noneValue: any = null,
	comparison: (a: any, b: any) => boolean = (a: any, b: any): boolean =>
		a === b
): any[] {
	if (elems.length === 0) return noneValue
	const freq = new UniversalMap(
		elems,
		elems.map((el) => countAppearences(elems, el, 0, comparison))
	)
	return indexOfMult(freq.values, max(freq.values), comparison).map(
		(a: number) => freq.keys[a]
	)
}

export const mostPopularElem = mostPopular
export const mostPopularNum = mostPopular

function leastPopular(
	elems: any[] = [],
	noneValue: any = null,
	comparison: (a: any, b: any) => boolean = (a: any, b: any): boolean =>
		a === b
): any {
	if (elems.length === 0) return noneValue
	const freq = new UniversalMap(
		elems,
		elems.map((el) => countAppearences(elems, el, 0, comparison))
	)
	return indexOfMult(freq.values, min(freq.values), comparison).map(
		(a: number) => freq.keys[a]
	)
}

// TODO: make the range of truncation an argument too... Generalize...
/**
 * @param {number[]} nums An array of numbers passed to the function.
 * @param {boolean} isInterquartile A boolean, representing shall the range to be gotten be interquartille or not. By deafault false.
 * @returns the range of the numeric array (if passed [-5, 10] returns 15).
 */
function range(nums: number[] = [], isInterquartile: boolean = false) {
	const newArr = isInterquartile ? truncate(nums, 25) : copy(nums)
	return floor(max(newArr) - min(newArr))
}

/**
 * Takes an array of numbers and returns sorted version of it.
 * @param {number[]} nums An array of numbers, passed to the function to sort.
 * @param {boolean} forward A boolean, on which value depends will the function sort an array from least to the largest or from largest to the least. By default true.
 */
function sort(nums: number[] = [], forward: boolean = true): number[] {
	const listArr = copy(nums)
	const sorted = []

	if (forward) {
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

// TODO: rewrite the docs...
/**
 * Copies an array without referencing its object.
 * @param {any[]} nums An array that needs to be copied.
 * @returns {number[]} Copy of a passed array, without referencing its object.
 */
const copy = flatCopy
// * Previous definition (later, clear?)
// function copy(nums = [1, 2, 3, 4, 5]) {
// 	return nums.map((i) => i)
// }

/**
 * Takes three numbers: the start position, the end position and the step, generates a numeric array using them and returns it.
 * @param {number} start Start number in array(it's supposed to be the least number in it)
 * @param {number} end End number in array(the creation of the array is going until end value + 1 number is reached).
 * @param {number} step Value, by which the count is incremented every iteration.
 * @param {number} precision Precision of a step, by default set to 1. (If your array is of integers, it's not necessary.)
 */
function generate(
	start: number,
	end: number,
	step: number = 1,
	precision: number = 1
): number[] {
	const generated = []
	const modif = Number.isInteger(step) ? 1 : 10 ** -precision

	const proposition = step > 0 ? (i, m) => i < m : (i, m) => i > m
	const coeff = (-1) ** Number(step < 0)
	const upper = end + coeff * modif

	for (let i = start; proposition(i, upper); i += step)
		generated.push(floor(i, precision))

	return generated
}

// TODO: this should also separate onto findValue and findReference;
// TODO: this don't do what one did expect it to do... It should do the next take an array and an arbitrary thing and seek if it is in the array; If it is, return indexes where it is;
// TODO: create a findMany function which would return a UniversalMap that would tell how many times and what had been found...
/**
 * Takes an array(or a string) and a number(or a one-dimensional array of numbers or a substring), that must be found in this array. If the value is found returns true and a count of times this number was found, otherwise false.
 * @param {number[] | number[][] | string} searchArr Array in which queried value is being searched.
 * @param {number | number[] | string} searchVal Searched value.
 * @returns {[boolean, number, number[]]} An array, containig boolean(was the needed number, numeric array or string found in searchArr or not), a number(frequency) and an array of numbers(indexes, where the needed number or string characters were found), but the last one is only when the searchVal is not an array and searchArr is not a two-dimensional array.
 */
function find(
	searchArr: any[] | string,
	searchVal: any | any[]
): [boolean, number, number[]] {
	let result = false
	let foundTimes = 0
	const foundIndexes = []

	if (isArray(searchVal) && isArray(searchArr))
		searchVal.forEach((value) =>
			searchArr.forEach((arr, index) =>
				arr.forEach((obj: number) => {
					if (value === obj) {
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
function readable(num: number[]): string {
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
function factorOut(number: number): number[] {
	const factors: number[] = []

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
function truncate(nums: number[], percents: number = 10): number[] {
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
function leastCommonMultiple(
	firstNum: number,
	secondNum: number,
	searchRange: number = 100
) {
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
function deviations(
	row: number[],
	isSquare: boolean = false,
	isTruncated: boolean = false,
	percents: number = 10
) {
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
	row: number[] = [],
	isSquare: boolean = false,
	isGeneral: boolean = true,
	indexes: number[] = []
): number {
	const newRow = []

	!isGeneral
		? row.forEach((num, index) => {
				indexes.forEach((checkIndex) => {
					index === checkIndex ? newRow.push(num) : null
				})
		  })
		: row.forEach((num) => newRow.push(num))

	newRow.length = row.length

	// ? what's that, a hack?
	// TODO: if don't like, pray do something about...
	return floor(average(deviations(newRow, isSquare), true, 0)) // ! DO NOT DO LIKE THIS, WHEN USING THE LIBRARY(I mean the last two arguments of average()).
}

/**
 * Takes an array of numbers and returns (general or sample) standard deviation of it depending on the second parameter. (Indexes of sample, if it's a sample, are set using the last argument.)
 * @param {number[]} row Row(or an array if you prefer) of numbers, (sample or population) standard deviation for which shall be found.
 * @param {boolean} isPopulation A boolean, representing should function return the population standard deviation or sample standard deviation.
 * @param {number[]} indexes An array of numbers, representing indexes of the sample, sample standard deviation deviation for which shall be found.
 */
function standardDeviation(
	row: number[] = [],
	isPopulation: boolean = true,
	indexes: number[] = []
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
	row: number[] = [],
	isDispersion: boolean = false,
	isPopulation: boolean = true,
	indexes: number[] = []
): number {
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
function degreeOfFreedom(...numRows: number[][]) {
	let lenSum = 0
	for (let i = 0; i < numRows.length; i++) lenSum += numRows[i].length
	return lenSum - numRows.length
}

/**
 * Takes a numbers array and an array of probabilities for each of the given numbers to appear and returns expected value for them.
 * @param {number[]} numbers A number array, expected value for which is to be found.
 * @param {number[]} probabilities An array of probabilitiles for certain numbers from numbers array to appear.
 */
function expectedValue(numbers: number[], probabilities: number[]): number {
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
function floor(number: number, afterDot: number = fixedSize): number {
	return Number(number.toFixed(afterDot))
}

/**
 * Takes the max length of the random array, it's max value, the flag, characterizing whether numbers in it should be integers.
 * @param {number} maxLength The largest count of numbers, that can appear in the random array. (It can be different from the given value).
 * @param {number} maxValue The max value, that can be found in the randomly generated array.
 * @param {boolean} integers The boolean flag, that represents whether all numbers in the array should be integers or not. By default false.
 */
function randomArray(
	maxLength: number,
	maxValue: number,
	integers: boolean = false
): number[] {
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
function isPerfect(number: number): boolean {
	return repeatedArithmetic(allFactors(number)) === number
}

/**
 * Takes one integer and returns all of its factors (not only primes, but others also).
 * @param {number} number An integer, factors for which are to be found.
 */
function allFactors(number: number): number[] {
	const factors = [1]

	for (let currFactor = 2; currFactor !== number; currFactor++)
		if (number % currFactor === 0) factors.push(currFactor)

	return factors
}

/**
 * This function calculates the factorial of a positive integer given.
 * @param {number} number A positive integer, factorial for which is to be calculated.
 */
function factorial(number: number): number {
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
function realAddition(float1: number, float2: number): [number, number] {
	const sum = float1 + float2
	const fixedB = sum - float1
	const fix = float2 - fixedB

	return [sum + fix, fix]
}

/**
 * This function takes an integer value, representing the new precision of the output and sets fixdSize equal to it.
 * @param {number} newPrecision The new value of fixedSize.
 */
function setPrecision(newPrecision: number = 0): number {
	return (fixedSize = newPrecision | 0) // in case someone malisciously decides to put floats in there, hehe :D
}

// TODO : separate onto reference-equality (current) and value-equality (for this, one could employ newapi.utils.valueComparison)
/**
 * This funciton takes in n arrays of dimension 1 (dim (arr) = 1) and compares them.
 * (I.e. returns the boolean value, representing whether they're equal or not).
 * @param {any[]} arrays An array of one-dimensional array of any length.
 */
function arrayEquality(...arrays: any[][]): boolean {
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
 * If it is an empty array, then it's dimension is 1.
 * If it is an array only with an element which is not an array, then it's dim is 1.
 * If it is an array with only an array of dim n-1, then it's own dim is n.
 * If it is an array with a bunch of stuff with different dims, then it's dim is the highest of the ones of it's elements + 1.
 * This function is defined recursively.
 * @param {any[] | any} array An array with any data in it. It doesn't have to be an array, though.
 */
// * Alternative implementation (second one):
function dim(array: any): number {
	if (array instanceof Array)
		return 1 + (array.length === 0 ? 0 : max(array.map((a: any) => dim(a))))
	return 0
}

// function dim(array: any): number {
// 	const d = (elem: any) => (elem instanceof Array ? t(elem) : 0)
// 	const t = (arr: any[]) =>
// 		1 + (arr.length === 0 ? 0 : max(arr.map((el) => d(el))))
// 	return array instanceof Array ? t(array) : 0
// }

// ? They're both so good... Which one should be?
// * first is 4 function calls per level;
// * second is 3 function calls per level;
// * CURRENT DECISION: both shall stay, but the first one will be commented out...

/**
 * Takes two numbers (one rational and other - integer) and calculates the value of combinatorics choose function for them.
 * (What it actually does is it takes their binomial coefficient, but never mind about that. )
 * @param {number} n First number (any rational number).
 * @param {number} k Second number (integer).
 */
function binomial(n: number, k: number): number {
	if (typeof n !== "number" || typeof k !== "number")
		throw new Error("Requiring a number to calculate the choose function. ")

	// Rounding down just in case.
	k = k | 0

	return floor(
		repeatedArithmetic(
			generate(0, k - 1, 1).map((num) => String(n - num)),
			"*"
		) / factorial(k)
	)
}

// TODO: later, pray generalize for it to be just a Table<Function> (from the other self's package...)
/**
 * * This type will (most likely) not last for a long amount of time in the library, being replaced by Table (same, but generalized);
 * ! DO NOT USE...
 */
type OperatorDefinitions = { [opname: string]: Function }

export function isArray(x: any): x is any[] {
	return x instanceof Array
}

// TODO: Implement the compareUniversal(...arrays), which uses dim;

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
	op,
	repeatedOperation,
	fullExp,
	repeatExp,
	average,
	min,
	max,
	median,
	mostPopular,
	leastPopular,
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
	OperatorDefinitions,
}
