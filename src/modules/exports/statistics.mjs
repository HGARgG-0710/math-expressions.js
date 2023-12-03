import * as comparisons from "./comparisons.mjs"

// * This module defines various basic statistical tests and measures implementations;

// ? Generalize using the TrueNumber(s); 
// * Don't know if one wants to generalize this after all... [maybe, keep for after the v1.0? Do it during the v1.1? Think. For now - just work on this old finite types code]; 

/**
 * This class represents an assembly of various statistics on the array of numeric data given.
 *
 * Useful when needing a lot of info about data in one place.
 */
export class Statistics {
	static isNumeric(data) {
		for (let i = 0; i < data.length; i++)
			if (typeof data[i] !== "number") return false
		return true
	}
	/**
	 * Takes nums array and creates a Statistics object, containing statistic about the row of numeric data.
	 * @param {number[]} nums An array of numbers passed to the function.
	 * @param {boolean} forward Tells the constructor should, or should not array be structured in order from the least to the largest num or not in case if it is not structured.
	 */
	constructor(nums = [], forward = true, nullValue = "None") {
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

// TODO: look through this stuff; rename, refactor/shorten, generalize code where want to;
/**
 * This a class that contains various statistical tests.
 * It is a static class, i.e. it is supposed to be like this:
 * * Tests.testName();
 */
export class Tests {
	constructor() {
		throw new TypeError("Tests is not a constructor")
	}
	/**
	 * Takes an array and a number and checks if the length of the given array equals the given number. If not, throws new Error. Otherwise returns void.
	 * @param {any[]} arr An array, size of which is to be checked for being equal to size parameter.
	 * @param {number} size A number, equality to which is checked.
	 * @throws Error, if the length of given array is not equal to the size parameter.
	 */
	static sizecheck(arr, size) {
		if (arr.length !== size)
			throw new Error(
				`Expected ${size} elements inside of the passed array, got ${arr.length}.`
			)
	}
	/**
	 * Takes a two-dimensional numeric array, containing two other arrays, and returns the number, representing the value of Student's t-test.
	 * @param {number[]} rows Numeric array, containing two arrays, for which value of Student's t-test is to be found.
	 */
	static t_Students_test(...rows) {
		Tests.sizecheck(rows, 2)
		const averages = [average(rows[0]), average(rows[1])]
		const errors = [
			Math.pow(standardError(rows[0]), 2),
			Math.pow(standardError(rows[1]), 2)
		]
		return floor(
			exp(
				[
					Math.abs(exp([averages[0], averages[1]], "-")),
					Math.sqrt(exp([errors[0], errors[1]], "+"))
				],
				"/"
			),
			globalPrecision
		)
	}
	// ? question: should one keep the runtime checks if the compile-time check is already there?
	// TODO: make a decision and change/keep correspondently;
	// * CURRENT DECISION: nah, let it stay; one likes it, that is cute;
	/**
	 * Takes a two-dimensional array, containing two arrays, and a number and returns the numeric value of f-test for the equality of dispersions of two sub-arrays.
	 * @param {number[]} rows Two one-dimensional arrays, the equality of dispersions of which shall be found.
	 */
	static F_test(...rows) {
		Tests.sizecheck(rows, 2)
		const dispersions = [dispersion(rows[0], true), dispersion(rows[1], true)]
		const biggerDispersionIndex = dispersions[0] > dispersions[1] ? 0 : 1
		const difference = exp(
			[
				dispersions[biggerDispersionIndex],
				dispersions[Number(!biggerDispersionIndex)]
			],
			"/"
		)
		return floor(difference, globalPrecision)
	}
	/**
	 * Takes a two-dimensional array of numbers and returns the number, representing the results of the Mann-Whitney U-test.
	 * !NOTE: For now be careful, when using, because the method does not work with the arrays, that have repeating numbers in them.
	 * @param {number[][]} rows Two one-dimensional arrays, using which the u-test is to be done.
	 */
	static U_test(...rows) {
		Tests.sizecheck(rows, 2)
		let firstSum = 0
		let secondSum = 0
		let tempNum = 0
		const general = []
		const ranks = []
		;`${rows[0]},${rows[1]}`.split(",").forEach((str) => general.push(Number(str)))
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
		return exp([testedNum - average(numbers), standardDeviation(numbers)], "/")
	}
}

/**
 * Takes the number array and rerturns an average of it.
 * @param {number[]} nums An array of numbers passed to the function.
 * @param {boolean} isTruncated A boolean saying does or does not the average will be truncated. By default false.
 * @param {number} percents A number, that is used as a multiplier for two, when shortening the numeric array.
 */
export function average(nums = [], isTruncated = false, percents = 10) {
	return (function (newArr) {
		return floor(
			repeatedArithmetic(newArr, "+") /
				(nums.length + ((nums.length === newArr.length) - 1)),
			globalPrecision
		)
	})(isTruncated && percents > 0 ? truncate(nums, percents) : nums)
}

/**
 * Takes an array of numbers and returns the smallest of thems.
 * @param {number[]} nums An array of numbers passed to the function.
 * @returns {number} The smallest number of the passed array.
 */
export function min(nums = []) {
	return arrApply(Math.min, nums)
}

/**
 * Takes an array of numbers and returns the largest of them.
 * @param {number[]} nums An array of numbers passed to the function.
 * @returns {number} The largest number in passed numerical array.
 */
export function max(nums = []) {
	return arrApply(Math.max, nums)
}

/**
 * Takes an array of numbers, which length can be odd or even and returns the median of it.
 * @param {number[]} nums An array of numbers, passed to the function.
 */
export function median(nums = []) {
	return (function (sorted) {
		return (
			nums.length % 2 === 1
				? id
				: (firstIndex) => average([firstIndex, sorted[nums.length / 2]])
		)(sorted[Math.round(nums.length / 2) - 1])
	})(sort(nums))
}

// TODO: create a type definition for this '(a: any, b: any) => boolean' thing; Replace it everywhere in the codebase...
// * The same way, pray name all the redundant (appearing more than once) types;
/**
 * Takes an array and returns most "popular" number in it.
 * @param {number[]} elems An array of numbers passed to the function.
 * @param {any} noneValue A value, returned if the array doesn't have a most popular number. String "None" by default.
 */
export const mostPopular = TEMPLATE({
	defaults: {
		comparison: comparisons.refCompare
	},
	function: function (elems = [], noneValue = null) {
		if (elems.length === 0) return noneValue
		const freq = new UniversalMap(
			elems,
			elems.map((el) => countAppearences(elems, el, 0, comparison))
		)
		return aliases.native.array
			.indexesOf({ comparison: this.template.comparison })
			.function(freq.values, max(freq.values))
			.map((a) => freq.keys[a])
	}
})

export const leastPopular = TEMPLATE({
	defaults: {
		comparison: comparisons.refCompare
	},
	function: function (elems = [], noneValue = null) {
		if (elems.length === 0) return noneValue
		const freq = new UniversalMap(
			elems,
			elems.map((el) => countAppearences(elems, el, 0, comparison))
		)
		return aliases.native.array
			.indexesOf({ comparison: this.template.comparison })
			.function(freq.values, min(freq.values))
			.map((a) => freq.keys[a])
	}
})

// TODO: make the range of truncation an argument too... Generalize...
/**
 * @param {number[]} nums An array of numbers passed to the function.
 * @param {boolean} isInterquartile A boolean, representing shall the range to be gotten be interquartille or not. By deafault false.
 * @returns the range of the numeric array (if passed [-5, 10] returns 15).
 */
export const range = function (nums = [], isInterquartile = false) {
	const newArr = isInterquartile ? truncate(nums, 25) : copy(nums)
	return floor(max(newArr) - min(newArr))
}

/**
 * Takes a numeric array and a number and truncates the passed array, using the second paramater as a count of percents of numbers, that shall be deleted.
 * @param {number[]} nums An array to be truncated.
 * @param {number} percents A number, that is multiplied by two(if you passed 10, then it is 20) and represents count of percents of numbers to be deleted from the edges of the passed array.
 */
export function truncate(nums = [], percents = 10) {
	const shortened = sort(copy(nums))
	const toDelete = Number(Math.trunc((shortened.length / 100) * percents))
	for (let i = 0; i < toDelete; i++) {
		shortened.shift()
		shortened.pop()
	}
	return shortened
}

/**
 * Takes an a array(or a row, if you prefer) and returns an array of all deviations from its average.
 * @param {number[]} row An array, in which deviations should be found.
 * @param {boolean} isSquare A boolean, representing should or should not every found deviation be powered by two or else it shall be absolute. By default false.
 * @param {boolean} isTruncated A boolean, representing, should or should not an array be truncated, during the process of searching for its average. By default false.
 * @param {number} percents A number, representing count of percents of numbers, for which this array shall be truncated, while searching for its average. Pased value will be doubled. Works only if isTruncated equals true. By default 10.
 */
export function deviations(row, isSquare = false, isTruncated = false, percents = 10) {
	const rowAverage = average(row, isTruncated, percents)
	const deviations = []
	row.forEach((num) => {
		isSquare
			? deviations.push(floor(Math.pow(num - rowAverage, 2), globalPrecision))
			: deviations.push(floor(Math.abs(num - rowAverage), globalPrecision))
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
export function dispersion(row = [], isSquare = false, isGeneral = true, indexes = []) {
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
export function standardDeviation(row = [], isPopulation = true, indexes = []) {
	return floor(Math.sqrt(dispersion(row, true, isPopulation, indexes)), globalPrecision)
}

/**
 * Takes an array of numbers and returns the standard error of it.
 * @param {number[]} row An array of numbers, standard error for which is to be found.
 * @param {boolean} isDispersion A boolean, that characterizes, should it be dispersion, found through absolute values of diviations in the row or standard deviation(found common way). By default false(standard deviation is used).
 * @param {boolean} isPopulation A boolean, representing should or not standart error be population(true) or sample(false). By default true.
 * @param {number[]} indexes An array of numbers, representing indexes using which sample of the original row should be made. Works only if isPopulation equals true.
 */
export function standardError(
	row = [],
	isDispersion = false,
	isPopulation = true,
	indexes = []
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
				exp([dispersion(row, false), Math.sqrt(newArr.length)], "/"),
				globalPrecision
		  )
		: floor(
				exp([standardDeviation(row), Math.sqrt(newArr.length)], "/"),
				globalPrecision
		  )
}

/**
 * Takes a two-dimensional array, containing one dimensional number arrays and returns the number of degrees of freedom for all of them.
 * @param {number[]} numRows Multiple one-dimensional arrays for which the degree of freedom is to be found.
 */
export function degreeOfFreedom(...numRows) {
	let lenSum = 0
	for (let i = 0; i < numRows.length; i++) lenSum += numRows[i].length
	return lenSum - numRows.length
}

/**
 * Takes a numbers array and an array of probabilities for each of the given numbers to appear and returns expected value for them.
 * @param {number[]} numbers A number array, expected value for which is to be found.
 * @param {number[]} probabilities An array of probabilitiles for certain numbers from numbers array to appear.
 */
export function expectedValue(numbers, probabilities) {
	const values = []
	if (numbers.length > probabilities.length)
		throw new Error(
			"The length of probability array is smaller than the length of the numbers array. No possibility to compute the expectedValue."
		)
	for (let i = 0; i < numbers.length; i++) values.push(numbers[i] * probabilities[i])
	return floor(repeatedArithmetic(values.map(String), "+"))
}

// TODO: generalize to allow for arbitrary "random" function...
/**
 * Takes the max length of the random array, it's max value, the flag, characterizing whether numbers in it should be integers.
 * @param {number} maxLength The largest count of numbers, that can appear in the random array. (It can be different from the given value).
 * @param {number} maxValue The max value, that can be found in the randomly generated array.
 * @param {boolean} integers The boolean flag, that represents whether all numbers in the array should be integers or not. By default false.
 */
export function randomArray(maxLength, maxValue, integers = false) {
	const length = Math.floor(Math.random() * maxLength)
	const storage = []
	for (let i = 0; i < length; i++)
		storage.push(
			integers
				? floor(Math.random() * maxValue, 0)
				: floor(Math.random() * maxValue, globalPrecision)
		)
	return storage
}
