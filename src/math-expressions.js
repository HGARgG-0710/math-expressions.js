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
		} else {
			throw new Error("Properties of Statistics objects are immutable!")
		}
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

	set populationVariance(disp) {
		this.#set(() => {
			this._populationVariance = disp
		})
	}

	get populationVariance() {
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
	 * This method of Surface class is not supposed to be used directly by the library user, because it needs to get an array of arrays(three-dimensional array) and has a bit unpredictable results.
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
				find(this.dots, dots)[0]
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
				otherwise add another dot's coordinates.`
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
			throw new Error("You can't set operators property for the second time!")
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
	 * @param {Array} arr An array, size of which is to be checked for being equal to size parameter.
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
	 * @param {number[][]} rows Numeric array, containing two arrays, for which value of Student's t-test is to be found.
	 */
	static t_Students_test(rows) {
		Tests.checkArrSize(rows, 2)

		const averages = Object.freeze([average(rows[0]), average(rows[1])])
		const errors = Object.freeze([
			Math.pow(standardError(rows[0]), 2),
			Math.pow(standardError(rows[1]), 2),
		])

		return Number(
			exp(
				Math.abs(exp(averages[0], averages[1], "-")),
				Math.sqrt(exp(errors[0], errors[1])),
				"/"
			).toFixed(7)
		)
	}

	/**
	 * Takes a two-dimensional array, containing two arrays, and a number and returns the numeric value of f-test for the equality of dispersions of two sub-arrays.
	 * @param {number[][]} rows A two-dimensional array, containing two other number arrays, the equality of dispersions of which shall be found.
	 */
	static F_test(rows) {
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

		return Number(difference.toFixed(7))
	}

	/**
	 * Takes a two-dimensional array of numbers and returns the number, representing the results of the Mann-Whitney U-test.
	 * !NOTE: For now be careful, when using, because the method does not work with the arrays, that have repeating numbers in them.
	 * @param {number[][]} rows A two-dimensional array, containing two other numerical arrays, using which the u-test is to be done.
	 */
	static U_test(rows) {
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
			if (typeof firstNum === "number" && typeof secondNum === "number") {
				return eval(`${firstNum} ${operator} ${secondNum}`)
			} else {
				throw new Error(
					"First and second arguments of exp() function must be numbers!"
				)
			}

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
	let result = 0
	let tempRes = 0

	for (let i = 0; i < numbers.length; i++) {
		if (i === 0) {
			tempRes = exp(numbers[0], numbers[1], operator)
		} else if (i === numbers.length - 1) {
			break
		} else {
			tempRes = exp(tempRes, numbers[i + 1], operator)
		}
		result = tempRes
	}

	return result
}

/**
 * Executes mathematical expression with different operators and numbers.
 *
 * ! NOTE: passed operators[] array must be shorter than the passed numbers[] array for one element or the same length
 * ! (but in this case the last element of the operators[] array will be ignored).
 *
 * @param {object} expression    An object, containing two array properties, one of which is for numbers(or strings) using which expression will be executed and the second is for strings, each of which contains an ariphmetic operator, using which expression shall be executed.
 */
function fullExp(expression = { nums: [], operators: [] }) {
	let result = 0
	let tempRes = 0

	if (expression.nums.length - expression.operators.length > 1) {
		throw Error(
			"Passed operators[] array length is less than passed number[] array for more than one element \
(operators[] arr must be shorter for one element)."
		)
	} else {
		for (let i = 0; i < expression.nums.length; i++) {
			if (i === 0) {
				tempRes = exp(
					expression.nums[0],
					expression.nums[1],
					expression.operators[0]
				)
			} else if (i === expression.nums.length - 1) {
				break
			} else {
				tempRes = exp(
					tempRes,
					expression.nums[i + 1],
					expression.operators[i]
				)
			}
			result = tempRes
		}

		return result
	}
}

/**
 * 	Repeats an expression a bunch of times and returns you the result of making an ariphmetic actions between them.
 *
 * ! NOTE: keys of the key-value pairs of the passed object must have the next names: nums, operators.
 * ! Wrong names of keys will cause an Error.
 *
 * 	@param {object} expression An object, that contains two key-value pairs, where each value is an array. First array contains nums, second - operators.
 * 	@param {number} countOfRepeats   A number of repeats of ariphmetic operation.
 * 	@param {string} repeatOperator   A string, containing an operator, with which ariphmetic operation upon the expression result will be done a several times.
 */
function repeatExp(
	expression = { nums: [2, 2], operators: ["*"] },
	countOfRepeats = 1,
	repeatOperator = "+"
) {
	let result = 0
	let tempRes = 0

	if (expression.nums === undefined || expression.operators === undefined) {
		throw Error(
			'You have passed expression object with the wrong names of keys of key-value pairs! \
They must have next names: "nums" form number array, "operators" for operators array.'
		)
	} else {
		tempRes = fullExp(expression)
		result = tempRes

		switch (repeatOperator) {
			case "+":
				result *= countOfRepeats
				break

			default:
				for (let i = 0; i < countOfRepeats - 1; i++) {
					result = exp(result, tempRes, repeatOperator)
				}
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
	return Number((sameOperator(newArr) / (len + modif)).toFixed(5))
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
					? (sameNum = nums[i - 1] === nums[i] && nums[i] === nums[i + 1])
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

	for (let i = start; i < end + modif; i += step) {
		generated.push(Number(i.toFixed(1)))
	}

	return generated
}

/**
 * Takes an array(or a string) and a number(or a one-dimensional array of numbers or a substring), that must be found in this array. If the value is found returns true and a count of times this number was found, otherwise false.
 * @param {number[] | number[][] | string} searchArr Array in which queried value is being searched.
 * @param {number | number[] | string} searchVal Searched value.
 * @returns {[boolean, number] | [boolean, number, number[]]} An array, containig boolean(was the needed number, numeric array or string found in searchArr or not), a number(frequency) and an array of numbers(indexes, where the needed number or string characters were found), but the last one is only when the searchVal is not an array and searchArr is not a two-dimensional array.
 */
function find(searchArr, searchVal) {
	let result = false
	let foundTimes = 0
	const foundIndexes = []

	if (searchVal instanceof Array) {
		searchVal.forEach((value) =>
			searchArr.forEach((arr) =>
				arr.forEach((num) =>
					value === num ? ((result = true), foundTimes++) : null
				)
			)
		)
	} else {
		if (typeof searchArr === "string") {
			const str = searchArr.slice(0) // copying a string using String.prototype.slice()

			for (let i = 0; i < str.length; i++) {
				str[i] === searchVal
					? ((result = true), foundTimes++, foundIndexes.push(i))
					: null
			}
		} else {
			searchArr.forEach((value) =>
				value === searchVal
					? ((result = true), foundTimes++, foundIndexes.push(i))
					: null
			)
		}
	}

	return searchVal instanceof Array
		? [result, foundTimes]
		: [result, foundTimes, foundIndexes]
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

		if ((arr.length - 1) % 3 === 0) {
			changeStr += " "
		}

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
 * Factors out a passed number to the prime numbers.
 * @param {number} num Number, to be factored out.
 * @param {boolean} isProductively A boolean, representing should or should not function work faster. By default false. Recommended to set true, when working with big numbers(bigger, than 10000).
 * @returns {number[]} Prime factors array.
 */
function factorOut(num, isProductively = false) {
	const fromOneToNum = [1]
	const primes = []
	const factors = []

	let tempRes = num
	let timesDivided = 1

	for (let i = 2; i <= num; i++) {
		fromOneToNum.push(i)
	}

	if (isProductively) {
		const len = fromOneToNum.length

		for (let i = 0; i < len; i++) {
			timesDivided = 1

			for (let j = 0; j < len; j++) {
				fromOneToNum[i] % fromOneToNum[j] === 0 &&
				fromOneToNum[i] > 1 &&
				fromOneToNum[j] > 1
					? timesDivided++
					: null
			}

			timesDivided === 2 ? primes.push(fromOneToNum[i]) : null
		}

		const primesLen = primes.length

		for (let i = 0; i < primesLen; i++) {
			for (let j = 0; j < primesLen; j++) {
				if (tempRes % primes[i] === 0 && tempRes > 1) {
					tempRes /= primes[i]
					factors.push(primes[i])
				}
			}
		}
	} else {
		fromOneToNum.forEach((number) => {
			timesDivided = 1

			fromOneToNum.forEach((checkNum) => {
				number % checkNum === 0 && number > 1 && checkNum > 1
					? timesDivided++
					: null
			})

			timesDivided === 2 ? primes.push(number) : null
		})

		primes.forEach((prime) => {
			for (let i = 0; i < num; i++) {
				if (tempRes % prime === 0 && tempRes > 1) {
					tempRes /= prime
					factors.push(prime)
				}
			}
		})
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

	let isEnd = false
	let result = null

	for (
		let i = 0;
		i < searchRange;
		i++, firstCount += firstNum, secondCount += secondNum
	) {
		firstMultiples.push(firstCount)
		secondMultiples.push(secondCount)
	}

	firstMultiples.forEach((multiple1) => {
		secondMultiples.forEach((multiple2) => {
			if (multiple1 === multiple2 && !isEnd) {
				result = multiple1
				isEnd = true
			}
		})
	})

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
			? deviations.push(Number(Math.pow(num - rowAverage, 2).toFixed(5)))
			: deviations.push(Number(Math.abs(num - rowAverage).toFixed(5)))
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
	return Number(Math.sqrt(dispersion(row, true, isPopulation, indexes)).toFixed(7))
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
		? Number(
				exp(dispersion(row, false), Math.sqrt(newArr.length), "/").toFixed(7)
		  )
		: Number(
				exp(standardDeviation(row), Math.sqrt(newArr.length), "/").toFixed(7)
		  )
}

export {
	Statistics,
	Surface,
	Expression,
	Tests,
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
}
