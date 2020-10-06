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
 * @param {array} numbers An array of numbers(or strings) using which expression will be executed.
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
 * 	@param {array} numbers    An array of numbers(or strings) using which expression will be executed.
 * 	@param {array} operators  An array of strings, containing operators, with which expression will be executed.
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
 * 	@param {object} expression 	 	 An object, that contains two key-value pairs, where value is an array. First array contains nums, second - operators.
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

export { exp, sameOperator, fullExp, repeatExp }
