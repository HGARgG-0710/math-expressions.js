// * Various algorithms for the library that one considered potentially useful;

// TODO: extend this thing - create new algorithms implementations for the library...
// ! Generalize this [use General types...];

export function BinarySearch(array, number) {
	// * For getting the middle index of the array.
	const middle = (arr) => floor(median(arr.map((_a, i) => i)), 0)
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
export function Farey(startRatio, endRatio, iterations = 0) {
	// ? Add a 'fareyAddition' general function?
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
				gotten[i + 1].push(formNewRatio(gotten[i][j], gotten[i][j + 1]))
		}
	}
	return gotten
}
