/**
 * Takes nums array andcreates an object, containing only statistic properties.
 * @param {number[]} nums An array of numbers passed to the function.
 */
function Statistics(nums = [1, 2, 3, 4, 5]) {
	;(this.min = min(nums)),
		(this.max = max(nums)),
		(this.range = range(nums)),
		(this.averageNum = average(nums)),
		(this.arrLength = nums.length),
		(this.middleNum = middleNum(nums, false)),
		(this.mostPopularNum = mostPopularNum(nums))
}

/**
 * 	Executes an expression with two numbers
 *  @param {number} firstNum  First number(or string).
 *  @param {number} secondNum Second number(or string).
 *  @param {string} operator  String, containing an ariphmetic operator.
 */
function exp(firstNum, secondNum, operator = "+") {
	return eval(`${firstNum} ${operator} ${secondNum}`)
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
 * 	@param {number[]} numbers    An array of numbers(or strings) using which expression will be executed.
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
 * 	@param {object: {number[], string[]}} expression 	 	 An object, that contains two key-value pairs, where value is an array. First array contains nums, second - operators.
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
 * Takes an array of numbers and returns the least of them.
 * @param {number[]} nums An array of numbers passed to the function.
 */
function min(nums = [1, 2, 3, 4, 5]) {
	return Math.min.apply(null, nums)
}

/**
 * Takes an array of numbers and returns the biggest of them.
 * @param {number[]} nums An array of numbers passed to the function.
 */
function max(nums = [1, 2, 3, 4, 5]) {
	return Math.max.apply(null, nums)
}

/**
 * Takes an array of numbers, which length must be odd and returns the middle number in it.
 * Also has an optional boolean parameter, that can stop the throw of the error.
 * @param {number[]} nums An array of numbers passed to the function.
 * @param {boolean} throwError A boolean, that, if passed false, can stop the throw of the error in case the length of the passed array is even.
 */
function middleNum(nums = [1, 2, 3, 4, 5], throwError = true) {
	if (nums.length % 2 == 1) {
		return nums[Math.round(nums.length / 2) - 1]
	} else {
		if (!throwError) {
			return "None"
		} else {
			throw Error(
				'Length of the passed array is even (it must be odd or you should pass false as the second argument to the function, but in this case you\'ll get a "None" string instead of number).'
			)
		}
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
 * Returns the numeric range of the numeric array (if passed [-5, 10] returns 15).
 * @param {number[]} nums An array of numbers passed to the function.
 */
function range(nums = [1, 2, 3, 4, 5]) {
	return max(nums) - min(nums)
}

export {
	exp,
	sameOperator,
	fullExp,
	repeatExp,
	average,
	min,
	max,
	middleNum,
	mostPopularNum,
	range,
	Statistics,
}
