// Classes

/**
 * Takes nums array and creates a Statistics object, containing statistic about the row of numeric data.
 * @param {number[]} nums An array of numbers passed to the function.
 * @param {boolean} toLarge Tells the constructor should, or should not array be structured in order from the least to the largest num or not in case if it is not structured.
 */
function Statistics(nums = [1, 2, 3, 4, 5], toLarge = true) {
	this.min = min(nums)
	this.max = max(nums)

	this.range = range(nums)
	this.arrLength = nums.length

	this.median = median(nums, toLarge)
	this.averageNum = average(nums)
	this.mostPopularNum = mostPopularNum(nums)

	this.sorted = sort(nums, toLarge)
}

/**
 * Takes two objects(or just numeric arrays) with properties from 0 to 2 and creates a Surface object.
 *
 * !!! NOTE: Be careful, when choosing step in your limits objects(or arrays), because after Surface.x and Surface.y properties of your object are generated
 * you can work with this object, providing only dots' coordinates, that exist in these arrays, otherwise you get an error.
 *
 * @param {object | number[]} xLimits Object(or an array) containing number properties for the x axis of your surface. First number - the start position(the smallest number) of your surface's axis, second numder - the end position of your surafce's x axis and the third is the number, that represents step, with which an array of numbers will be assembled.
 * @param {object | number[]} yLimits The same as xLimits, but for y axis of your surface.
 */
/*
 */
function Surface(xLimits, yLimits) {
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
 * This method of Surface class is not supposed to be used directly by the library user, because it needs to get an array of arrays(two-dimensional array) and has a bit unpredictable results.
 * @param {number[][][]} dots A bunch of arrays with different dots' coordinates.
 * @returns {boolean} True if all of dots are in x and y limits or false if they are not.
 */
Surface.prototype.inLimits = function (...dots) {
	let isHere = true

	dots.forEach((dot) => {
		dot.forEach((coordinate) => {
			if (!find(this.x, coordinate[0])[0] || !find(this.y, coordinate[1])[0]) {
				isHere = false
			}
		})
	})

	return isHere
}

/**
 * Adds a dot coordinate to Surface.dots property array.
 * @param {number[]} dots A bunch of arrays with different dots' coordinates.
 */
Surface.prototype.dot = function (...dots) {
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
 * @param {number[]} dots A bunch of arrays with different dots' coordinates(two dots, otherwise throws an error).
 */
Surface.prototype.line = function (...dots) {
	if (this.inLimits(dots)) {
		if (
			dots.length == 2 &&
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
 * @param {number[]} dots A bunch of arrays with different dots' coordinates(two dots, otherwise throws an error).
 */
Surface.prototype.segment = function (...dots) {
	if (this.inLimits(dots)) {
		dots.length == 2
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

// Functions

/**
 * 	Executes an expression with two numbers
 *  @param {number | string} firstNum  First number(or string).
 *  @param {number | string} secondNum Second number(or string).
 *  @param {string} operator  String, containing an ariphmetic operator.
 *  @returns {number} Result of a mathematical expression.
 */
function exp(firstNum, secondNum, operator = "+") {
	return eval(`${firstNum} ${operator} ${secondNum}`)
}

/**
 * Executes mathematical expression with the same operator repeating, but different numbers.
 * @param {number[] | string[] | any[]} numbers An array of numbers(or strings) using which expression will be executed.
 * @param {string} operator - A string, containing an operator, with which expression will be executed.
 */
function sameOperator(numbers = [], operator = "+") {
	let result = 0
	let tempRes = 0

	for (let i = 0; i < numbers.length; i++) {
		if (i == 0) {
			tempRes = exp(numbers[0], numbers[1], operator)
		} else if (i == numbers.length - 1) {
			break
		} else {
			tempRes = exp(tempRes, numbers[i + 1], operator)
		}
		result = tempRes
	}

	return result
}

/**
 * 	Executes mathematical expression with different operators and numbers.
 * 	@param {number[] | string[] | any[]} numbers    An array of numbers(or strings) using which expression will be executed.
 * 	@param {string[]} operators  An array of strings, containing operators, with which expression will be executed.
 */
/*
 ! NOTE: passed operators[] array must be shorter than the passed numbers[] array for one element or the same length,
 ! but in this case the last element of the opperators[] array will be ignored.
 */
function fullExp(numbers, operators = ["**", "*"]) {
	let result = 0
	let tempRes = 0

	if (numbers.length - operators.length > 1) {
		throw Error(
			"Passed operators[] array length is less than passed number[] array for more than one element \
(operators[] arr must be shorter for one element)."
		)
	} else {
		for (let i = 0; i < numbers.length; i++) {
			if (i == 0) {
				tempRes = exp(numbers[0], numbers[1], operators[0])
			} else if (i == numbers.length - 1) {
				break
			} else {
				tempRes = exp(tempRes, numbers[i + 1], operators[i])
			}
			result = tempRes
		}

		return result
	}
}

/**
 * 	Repeats an expression a bunch of times and returns you the result of making an ariphmetic actions between them.
 * 	@param {object} expression An object, that contains two key-value pairs, where value is an array. First array contains nums, second - operators.
 * 	@param {number} countOfRepeats   A number of repeats of ariphmetic operation.
 * 	@param {string} repeatOperator   A string, containing an operator, with which ariphmetic operation upon the expression result will be done a several times.
 */
/*
! NOTE: keys of the key-value pairs of the passed object must have the next names: nums, operators.
! Wrong names of keys will cause an Error. 
*/
function repeatExp(
	expression = { nums: [2, 2], operators: ["*"] },
	countOfRepeats = 1,
	repeatOperator = "+"
) {
	let result
	let tempRes

	if (expression.nums === undefined || expression.operators === undefined) {
		throw Error(
			"You have passed expression object with the wrong names of its keys in key-value pairs! \
They must have next names: nums, operators."
		)
	} else {
		tempRes = fullExp(expression.nums, expression.operators)
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
 */
function average(nums = [1, 2, 3, 4, 5]) {
	return sameOperator(nums) / nums.length
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
 * Takes an array of numbers, which length can be odd or even and returns the middle number in it.
 * @param {number[]} nums An array of numbers passed to the function.
 * @param {boolean} fromLargeToSmall A boolean, that points how to sort numeric array in case it is unstructured.
 */
function median(nums = [1, 2, 3, 4, 5], fromLargeToSmall = true) {
	let isStructured = true
	let structured

	for (let i = 0, biggerCount = 0, lessCount = 0; i < nums.length - 1; i++) {
		if (nums[i + 1] >= nums[i]) {
			biggerCount++
		} else {
			lessCount++
		}

		isStructured = !(lessCount == biggerCount && biggerCount > 0)
	}

	if (nums.length % 2 == 1 && isStructured) {
		return nums[Math.round(nums.length / 2) - 1]
	} else {
		structured = isStructured ? nums : sort(nums, fromLargeToSmall)
		return nums.length % 2 == 0
			? (structured[structured.length / 2 - 1] +
					structured[structured.length / 2]) /
					2
			: structured[Math.round(structured.length / 2) - 1]
	}
}

/**
 * Takes an array and returns most "popular" number in it.
 * @param {number[]} nums An array of numbers passed to the function.
 */
function mostPopularNum(nums = [1, 2, 3, 4, 5]) {
	let repeats = []
	let sameNum = false
	let countOfRepeats = 0

	for (let i = 0; i < nums.length; i++, countOfRepeats = 0) {
		for (let j = i; j < nums.length; j++) {
			if (nums[i] == nums[j]) {
				countOfRepeats++
			}

			if (i < nums.length) {
				sameNum = nums[i - 1] == nums[i] && nums[i] == nums[i + 1]
			} else {
				sameNum = nums[i - 1] == nums[i]
			}
		}

		if (!sameNum || i == nums.length - 1) {
			repeats.push(countOfRepeats)
		}
	}

	const maxNum = max(repeats)
	return maxNum == 1 ? "None" : nums[repeats.indexOf(maxNum)]
}

/**
 * Returns the range of the numeric array (if passed [-5, 10] returns 15).
 * @param {number[]} nums An array of numbers passed to the function.
 */
function range(nums = [1, 2, 3, 4, 5]) {
	return max(nums) - min(nums)
}

/**
 * Takes an array of numbers and returns sorted version of it.
 * @param {number[]} nums An array of numbers, passed to the function to sort.
 * @param {boolean} fromSmallToLarge A boolean, on which value depends will the function sort an array from least to the largest or from largest to the least.
 */
function sort(nums = [2, 4, 3, 5, 1], fromSmallToLarge = true) {
	let listArr = copy(nums)
	let sortArr = []

	if (fromSmallToLarge) {
		for (let i = 0; i < nums.length; i++) {
			const least = min(listArr)

			listArr.splice(listArr.indexOf(least), 1)
			sortArr.push(least)
		}
	} else {
		for (let i = 0; i < nums.length; i++) {
			const largest = max(listArr)

			listArr.splice(listArr.indexOf(largest), 1)
			sortArr.push(largest)
		}
	}

	return sortArr
}

/**
 * Copies an array without referencing its object.
 * @param {number[]} nums A numeric array, thatneeds to be copied.
 * @returns {number[]} Copy of a passed array, without referencing its object.
 */
function copy(nums = [1, 2, 3, 4, 5]) {
	let copyArr = []
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
	let generated = []

	for (let i = start; i < end + 1; i += step) {
		generated.push(i)
	}

	return generated
}

/**
 * Takes an array(or a string) and a number(or a one-dimensional array of numbers or a substring), that must be found in this array. If the value is found returns true and a count of times this number was found, otherwise false.
 * @param {number[] | number[][] | string} searchArr Array in which queried value is being searched.
 * @param {number | number[] | string} searchVal Searched value.
 * @returns {(boolean & number)[]} An array, containig boolean(was the needed number or numeric array found in searchArr or not) and a number(If it was found, then how many times).
 */
function find(searchArr, searchVal) {
	let result = false
	let foundTimes = 0

	if (searchVal instanceof Array) {
		searchVal.forEach((value) =>
			searchArr.forEach((arr) =>
				arr.forEach((num) =>
					value == num ? ((result = true), foundTimes++) : null
				)
			)
		)
	} else {
		if (typeof searchArr == "string") {
			const str = searchArr.slice(0) // copying a string using String.prototype.slice()

			for (let i = 0; i < str.length; i++) {
				str[i] == searchVal ? ((result = true), foundTimes++) : null
			}
		} else {
			searchArr.forEach((value) =>
				value == searchVal ? ((result = true), foundTimes++) : null
			)
		}
	}

	return [result, foundTimes]
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

		if ((arr.length - 1) % 3 == 0) {
			changeStr += " "
		}

		arr.shift()
	}

	arr.forEach((number, index) => {
		index % 3 == 0 && index > 0
			? (changeStr += ` ${number}`)
			: (changeStr += `${number}`)
	})

	return changeStr
}

export {
	Statistics,
	Surface,
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
}
