/**
 * Executes an expression with two numbers
 *  @param firstNum - first number(or string)
 *  @param secondNum - second number(or string)
 *  @param operator - string, containing an operator
 */

function exp(firstNum, secondNum, operator = "+") {
	return eval(`${firstNum} ${operator} ${secondNum}`)
}

/**
 * Executes mathematical expression with the same operator repeating, but different numbers.
 * @param operator - string, containing an operator, with which expression will be executed
 * @param numbers - an array of numbers(or strings) using which expression will be executed
 */

function oneOperatorExp(numbers = [], operator = "+") {
	let result = 0
	let tempRes = 0

	for (let i = 0; i < numbers.length; i++) {
		if (i == 0) {
			tempRes = expression(numbers[0], numbers[1], operator)
		} else if (i == numbers.length - 1) {
			break
		} else {
			tempRes = expression(tempRes, numbers[i + 1], operator)
		}
		result = tempRes
	}

	return result
}

/**
 * Executes mathematical expression with different operators and numbers.
 * @param operators - an array of strings, containing operators, with which expression will be executed
 * @param numbers - an array of numbers(or strings) using which expression will be executed.
 * * Note: passed operators[] array must be shorter than the passed numbers[] array for one element or the same length,
 *   but in this case the last element of the opperators[] array will be ignored.
 */

function manyOperatorsExp(numbers, operators = ["**", "*"]) {
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
				tempRes = expression(numbers[0], numbers[1], operators[0])
			} else if (i == numbers.length - 1) {
				break
			} else {
				tempRes = expression(tempRes, numbers[i + 1], operators[i])
			}
			result = tempRes
		}

		return result
	}
}

export { exp, oneOperatorExp, manyOperatorsExp }
