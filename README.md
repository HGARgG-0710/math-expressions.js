# Math-expressions.js

Math-expressions.js is a JavaScript library, allowing you to work with mathematical expressions, statistics, 2D surfaces, item (especially numbers) collections, multi-dimensional arrays, linear algebra and equation parsing/solving.  
For now, the list of functions and classes provided is quite thin, but in the future library may become a truly powerful and indeed irreplacable tool, which may save you many hours of coding in just few seconds.

## Installation

Math-expressions.js can be installed using npm.
Install math-expressions.js using npm:

    npm install math-expressions.js

or

    npm i math-expressions.js

## Global Variables (links)

1. [fixedSize](#1fixedsize)

## Functions (links)

1. [exp()](#1exp)
2. [repeatedArithmetic()](#2repeatedarithmetic)
3. [fullExp()](#3fullexp)
4. [repeatExp()](#4repeatexp)
5. [average()](#5average)
6. [min()](#6min)
7. [max()](#7max)
8. [median()](#8median)
9. [mostPopularNum()](#9mostpopularnum)
10. [range()](#10range)
11. [sort()](#11sort)
12. [copy()](#12copy)
13. [generate()](#13generate)
14. [find()](#14find)
15. [readable()](#15readable)
16. [factorOut()](#16factorout)
17. [truncate()](#17truncate)
18. [leastCommonMultiple()](#18leastcommonmultiple)
19. [deviations()](#19deviations)
20. [dispersion()](#20dispersion)
21. [standardDeviation()](#21standarddeviation)
22. [standardError()](#22standarderror)
23. [degreeOfFreedom()](#23degreeoffreedom)
24. [expectedValue()](#24expectedvalue)
25. [floor()](#25floor)
26. [randomArray()](#26randomarray)
27. [isPerfect()](#27isperfect)
28. [allFactors()](#28allfactors)
29. [factorial()](#29factorial)
30. [realAddition()](#30realaddition)
31. [setPrecision()](#31setprecision)
32. [arrayEquality()](#32arrayequality)
33. [dim()](#33dim)
34. [binomial()](#34binomial)
35. [mostPopularElem()](#35mostpopularelem)

## Classes (links)

1. [Statistics](#1statistics)
2. [Surface](#2surface)
3. [Expression](#3expression)
4. [Tests](#4tests)
5. [Ratio](#5ratio)
6. [Algorithms](#6algorithms)
7. [Vector](#7vector)
8. [Matrix](#8matrix)
9. [RectMatrix](#9rectmatrix)
10. [Equation](#10equation)
11. [VarMapping](#11varmapping)

## Global Variables

### 1.fixedSize

This variable characterizes how accurate is function output going to be. By default set to 11.
(Cannot be modidified directly, only through the setPrecision() function)

From math-expressions.js:

```js
/**
 *
 * * This variable characterizes how many fixed numbers are outputted.
 * * You can change it freely using setPrecision() function, if you want a more "precise" output of some of the functions.
 */
export let fixedSize = 11
```

## Functions

### 1.exp()

With it you can execute a mathematical expression upon two numbers.
For now, arithmetic only is available.
Takes two numbers and a string with an operator. By default uses + operator.

From math-expressions.js:

```js
/**
 * 	Executes an expression with two numbers
 *  @param {number} firstNum  First number.
 *  @param {number} secondNum Second number.
 *  @param {string} operator  String, containing an ariphmetic operator(+, -, /, *, ** or %).
 *  @returns {number} Result of a mathematical expression.
 */
function exp(firstNum = 2, secondNum = 2, operator = "+")
```

### 2.repeatedArithmetic()

This function allows you to perform an expression, that uses the same mathematic action, but different numbers.
By default uses + operator.

Before the version 0.7 it was called sameOperator() (you can still use the old name, though).

From math-expressions.js:

```js
/**
 * Executes mathematical expression with the same operator repeating, but different numbers.
 * @param {number[]} numbers An array of numbers(or strings) using which expression will be executed.
 * @param {string} operator - A string, containing an operator, with which expression will be executed.
 */
function repeatedArithmetic(numbers = [], operator = "+");
```

### 3.fullExp()

This function allows you to perform different mathematic actions upon a bunch of different numbers.
By default uses \*\* and \* operators.

From math-expressions.js:

```js
/**
 * Executes mathematical expression with different operators and numbers.
 *
 * ! NOTE: passed operators[] array must be shorter than the passed numbers[] array for one element or the same length
 * ! (but in this case the last element of the operators[] array will be ignored).
 *
 * @param {Expression} expression An object, containing two array properties, one of which is for numbers(or strings) using which expression will be executed and the second is for strings, each of which contains an ariphmetic operator, using which expression shall be executed.
 */
function fullExp(expression = { nums: [], operators: [] }) {
```

### 4.repeatExp()

This function allows you to repeat an expression a bunch of times, then perform an ariphmetic
operation upon all of its results and return the final result.

From math-expressions.js:

```js
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
)
```

### 5.average()

This function takes a numeric array and returns an average of all its values. An average may be truncated or not, depending upon the fact was a second argument (a boolean) passed(as true) or not(or passed, but as false). This may be useful, when you want to get a truncated average.

From math-expressions.js:

```js
/**
 * Takes the number array and rerturns an average of it.
 * @param {number[]} nums An array of numbers passed to the function.
 * @param {boolean} isTruncated A boolean saying does or does not the average will be truncated. By default false.
 * @param {number} percents A number, that is used as a multiplier for two, when shortening the numeric array.
 */
function average(nums = [1, 2, 3, 4, 5], isTruncated = false, percents = 10) {
```

### 6.min()

This function takes an array of numbers and returns the least value from it.

```js
/**
 * Takes an array of numbers and returns the smallest of thems.
 * @param {number[]} nums An array of numbers passed to the function.
 * @returns {number} The smallest number of the passed array.
 */
function min(nums = [1, 2, 3, 4, 5])
```

### 7.max()

This function takes an array of numbers and returns the largest value in it.

From math-expressions.js:

```js
/**
 * Takes an array of numbers and returns the largest of them.
 * @param {number[]} nums An array of numbers passed to the function.
 * @returns {number} The largest number in passed numerical array.
 */
function max(nums = [1, 2, 3, 4, 5])
```

### 8.median()

This function takes an array of numbers, which length must be odd, and returns the middle value from it(a median).

From math-expressions.js:

```js
/**
 * Takes an array of numbers, which length can be odd or even and returns the median of it.
 * @param {number[]} nums An array of numbers, passed to the function.
 */
function median(nums = [1, 2, 3, 4, 5])
```

### 9.mostPopularNum()

This function takes an array of numbers and an arbitrary something. Then returns the most frequent number in the array or the arbitrary something if there is not such. (By default, arbitrary something = "None")

From math-expressions.js:

```js
/**
 * Takes an array and returns most "popular" number in it.
 * @param {number[]} nums An array of numbers passed to the function.
 * @param {any} noneValue A value, returned if the array doesn't have a most popular number. String "None" by default.
 */
function mostPopularNum(nums = [], noneValue = "None")
```

### 10.range()

This function takes an array of numbers and returns the difference between the max and the min values.

From math-expressions.js:

```js
/**
 * @param {number[]} nums An array of numbers passed to the function.
 * @param {boolean} isInterquartile A boolean, representing shall the range to be gotten be interquartille or not. By deafault false.
 * @returns the range of the numeric array (if passed [-5, 10] returns 15).
 */
function range(nums = [1, 2, 3, 4, 5], isInterquartile = false)
```

### 11.sort()

This function takes a numeric array and returns it sorted from smallest to largest(or opposite, from largest to smallest) number, depending on second parameter(that is a boolean).

From math-expressions.js:

```js
/**
 * Takes an array of numbers and returns sorted version of it.
 * @param {number[]} nums An array of numbers, passed to the function to sort.
 * @param {boolean} fromSmallToLarge A boolean, on which value depends will the function sort an array from least to the largest or from largest to the least. By default true.
 */
function sort(nums = [2, 4, 3, 5, 1], fromSmallToLarge = true)
```

### 12.copy()

This function takes an array and returns a copy of it without referencing object of an original array. It might be useful, when doing a duplicate of row of data to work with it(change) and leaving an original array as a reserve copy.

From math-expressions.js:

```js
/**
 * Copies an array without referencing its object.
 * @param {any[]} nums An array that needs to be copied.
 * @returns {number[]} Copy of a passed array, without referencing its object.
 */
function copy(nums = [1, 2, 3, 4, 5])
```

### 13.generate()

This function allows you to generate a row of data by giving it three numbers: firstly - the start position(the smallest number in the row), secondly - the end position(the largest position in the row), thirdly - step number or the difference between each of row's numbers and fourthly - the precision of the step (if your have all else as integers, then 0), which is how many digits after dot does your step have. The last one is required in order to avoid an error, when calculating the next value (good old floating-point arithmetic).

From math-expressions.js:

```js
/**
 * Takes three numbers: the start position, the end position and the step, generates a numeric array using them and returns it.
 * @param {number} start Start number in array(it's supposed to be the least number in it)
 * @param {number} end End number in array(the creation of the array is going until end value + 1 number is reached).
 * @param {number} step Value, by which the count is incremented every iteration.
 * @param {number} precision Precision of a step, by default set to 1. (If your array is of integers, it's not necessary.)
 */
function generate(start, end, step = 1, precision = 1)
```

### 14.find()

This function takes a numeric array(one- or two-dimensional) or a string and a number(or a one-dimensional array of numbers) or a substring, that will be found in this array(or string). Returns an array, that, if the value is found, contains true and a count of times this number(or a one-dimensional array, or a substring) was found, otherwise false and 0.

From math-expressions.js:

```js
/**
 * Takes an array(or a string) and a number(or a one-dimensional array of numbers or a substring), that must be found in this array. If the value is found returns true and a count of times this number was found, otherwise false.
 * @param {number[] | number[][] | string} searchArr Array in which queried value is being searched.
 * @param {number | number[] | string} searchVal Searched value.
 * @returns {[boolean, number, number[]]} An array, containig boolean(was the needed number, numeric array or string found in searchArr or not), a number(frequency) and an array of numbers(indexes, where the needed number or string characters were found), but the last one is only when the searchVal is not an array and searchArr is not a two-dimensional array.
 */
function find(searchArr, searchVal)
```

### 15.readable()

This function takes a number and returns a string value of it, that is much better readable.

From math-expressions.js:

```js
/**
 * Takes a number and returns a string, containing it's readable variant. (Like 12345 and 12 345)
 * @param {number} num A number, from which to make a better-looking version of it.
 */
function readable(num)
```

### 16.factorOut()

This function allows you to factor numbers. Previously, I wrote how terribly slow it was. Now it has become SO productive, that it cracks a number like 10000000000 in second or even less (I have not checked precisely, but it was already good enough)! Seems like my previous algorithm was a complete crap and the current one is much better.

From math-expressions.js:

```js
/**
 * Factors out a passed number to the prime numbers. Works quite quickly.
 * @param {number} num Number, to be factored out.
 * @returns {readonly number[]} Prime factors array.
 */
function factorOut(number)
```

### 17.truncate()

Truncates a passed numeric array(the first parameter) by count of numbers, that is equal function's second parameter(it is a number) multiplied by 2. Array is being truncated from it's "edges"(only stated count of percents of the biggest and the smallest numbers are deleted).

From math-expressions.js:

```js
/**
 * Takes a numeric array and a number and truncates the passed array, using the second paramater as a count of percents of numbers, that shall be deleted.
 * @param {number[]} nums An array to be truncated.
 * @param {number} percents A number, that is multiplied by two(if you passed 10, then it is 20) and represents count of percents of numbers to be deleted from the edges of the passed array.
 */
function truncate(nums, percents = 10)
```

#### Notice:

Before truncating an array truncate() function sorts it from-smallest-to-largest way.

### 18.leastCommonMultiple()

Finds the least common multiple between two numbers(first and second arguments) in given search range(third argument). Search range is not a number to which the search will be continued, it is a number of iterations, each of which similiar value is searched (100 by default). If the search range is too small, then returns null, otherwise the least common multiple.

From math-expressions.js:

```js
/**
 * Takes three numbers, thwo of which are numbers for which least common multiple shall be found and the third one is a search range for them.
 * @param {number} firstNum First number.
 * @param {number} secondNum Second number.
 * @param {number} searchRange A number, representing range of searches(if you get null from this function, then try to make range bigger). By default 100.
 */
function leastCommonMultiple(firstNum, secondNum, searchRange = 100)
```

### 19.deviations()

Takes an array of numbers, two booleans and a number and returns an array of deviative numbers(comparing to the average) of the passed array. First boolean represents should or not all found deviations be powered by two or not. If it is false(what is a default value), then instead of powering all deviative numbers by two function just makes them an absolutes of original selves. Second boolean represents, should or should not array be truncated while searching for its average. The fourth parameter(number) represents count of percents, for which array should be truncated. It works only if third argument is true (by default it is false).

From math-expressions.js:

```js
/**
 * Takes an a array(or a row, if you prefer) and returns an array of all deviations from its average.
 * @param {number[]} row An array, in which deviations should be found.
 * @param {boolean} isSquare A boolean, representing should or should not every found deviation be powered by two or else it shall be absolute. By default false.
 * @param {boolean} isTruncated A boolean, representing, should or should not an array be truncated, during the process of searching for its average. By default false.
 * @param {number} percents A number, representing count of percents of numbers, for which this array shall be truncated, while searching for its average. Pased value will be doubled. Works only if isTruncated equals true. By default 10.
 */
function deviations(row, isSquare = false, isTruncated = false, percents = 10)
```

### 20.dispersion()

Takes an array of numbers, two booleans and another number array and returns a number - dispersion of a first argument. Second parameter represents should, in process of finding the dispersion, deviations be powered by two or not. If false(what is a default value), then instead of doing that, while searching for dispersion, will just use absolute values of all the found deviations. Third parameter represents the fact does the variance is sample variance or population variance. If it is false, then it is sample variance (by default second parameter is true). If it's false, then sample dispersion is returned, from the sample, made using numbers from the third argument, that represent needed indexes of the first argument.

From math-expressions.js:

```js
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
)
```

### 21.standardDeviation()

Takes an array of numbers, boolean, another array of numbers and returns standard deviation of the numeric array, passed as the first argument. Second argument represents should standard deviation be of population or sample (By default - true, population). Third argument represents indexes of the sample, standard deviation of which shall be found (Works only if second argument is true).

From math-expressions.js:

```js
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
)
```

### 22.standardError()

Takes an array of numbers, two booleans, another array of numbers and returns standard error of the first numeric array. Second argument represents, should dispersion(found using absolute values of deviations) be used as a number, divided by the length of the sample(or the whole array, if it is population) (By default false, standard deviation). Third argument represents should the return value be the standard error of population or sample (By default true, standard error of population). Fourth argument represents an array of indexes, using which sample, standard error of which shall be found, will be constructed. (Works only if the third argument equals false).

From math-expressions.js:

```js
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
)
```

### 23.degreeOfFreedom()

Takes a two-dimensional array of numbers and returns the degree of freedom for it.

From math-expressions.js:

```js
/**
 * Takes a two-dimensional array, containing one dimensional number arrays and returns the number of degrees of freedom for all of them.
 * @param {number[][]} numRows Multiple one-dimensional arrays for which the degree of freedom is to be found.
 */
function degreeOfFreedom(...numRows)
```

### 24.expectedValue()

Takes two number arrays(first of whicn is for numbers and the second is for their probabilities to appear) and returns an expected value based on this data.

From math-expressions.js :

```js
/**
 * Takes a numbers array and an array of probabilities for each of the given numbers to appear and returns expected value for them.
 * @param {number[]} numbers A number array, expected value for which is to be found.
 * @param {number[]} probabilities An array of probabilitiles for certain numbers from numbers array to appear.
 */
function expectedValue(numbers, probabilities)
```

### 25.floor()

Takes two numbers: the "target" number and the level of precision to be used on it. Second argument represents count of digits to be existent after the dot.

From math-expressions.js:

```js
/**
 * Floors the given number to the needed level of precision.
 * @param {number} number Number to be floored.
 * @param {number} afterDot How many positions after dot should there be.
 * @returns {number}
 */
function floor(number, afterDot = fixedSize)
```

### 26.randomArray()

Takes the number, one number, a boolean and returns a random array, based on this data. The first argument is the max length that the new randomly-generated array can have, second one is the max value that can be detected in the array and the third one is the boolean, representing whether the numbers in the array should all be integers or not (By default false).

From math-expressions.js:

```js
/**
 * Takes the max length of the random array, it's max value, the flag, characterizing whether numbers in it should be integers.
 * @param {number} maxLength The largest count of numbers, that can appear in the random array. (It can be different from the given value).
 * @param {number} maxValue The max value, that can be found in the randomly generated array.
 * @param {boolean} integers The boolean flag, that represents whether all numbers in the array should be integers or not. By default false.
 */
function randomArray(maxLength, maxValue, integers = false)
```

### 27.isPerfect()

Takes a number and checks whether it is perfect or not. Returns boolean.

From math-expressions.js:

```js
/**
 * Checks whether the number passed is perfect or not.
 * @param {number} number Number, perfectness of which is to be checked.
 */
function isPerfect(number)
```

### 28.allFactors()

Takes a number and returns a number array consisting of all of its factors (do not confuse with factorOut() function, that returns only prime factors).

From math-expressions.js:

```js
/**
 * Takes one integer and returns all of its factors (not only primes, but others also).
 * @param {number} number An integer, factors for which are to be found.
 */
function allFactors(number)
```

### 29.factorial()

Classic! Good old integer-only factorial() function. You know what it does if you know what factorial is. Takes a integer in and and spits factorial of it out.

From math-expressions.js:

```js
/**
 * This function calculates the factorial of a positive integer given.
 * @param {number} number A positive integer, factorial for which is to be calculated.
 */
function factorial(number)
```

### 30.realAddition()

This function is a fix of classical addition in computer languages. It is very helpful when adding big numbers in which the error might go straight up.
Of course, it wouldn't help completely, but a useful thing for quite specific cases.
It returns an array of two values: 1. the achieved result, 2. the error (it may be helpful in case of rounding up again)

From math-expressions.js:

```js
/**
 * This function does a fixed addition of two numbers. It decreases error a tiny bit, but with large numbers it may be signigicant.
 * @param {number} float1 First number to be added.
 * @param {number} float2 Second number to be added.
 * @returns a number with error much less than it would be with JavaScript addition.
 */
function realAddition(float1, float2)
```

### 31.setPrecision()

This function sets a new value to the fixedSize global variable. It apparently had to be implemented because of the fact that exported variables, defined with let cannot be modified directly, but rather through a function.
Takes an integer and sets fixedSize equal to it.

From math-expressions.js:

```js
/**
 * This function takes an integer value, representing the new precision of the output and sets fixdSize equal to it.
 * @param {number} newPrecision The new value of fixedSize.
 */
function setPrecision(newPrecision = 0)
```

### 32.arrayEquality()

Takes any n arrays as it's input and returns a boolean value representing fact of truthness of their equality amongst themselves. Broadly speacking, checks whether they are equal or not and if not returns false otherwise true. It cares about order and lengths too.

From math-expressions.js:

```js
/**
 * This funciton takes in n arrays of dimension 1 (dim (arr) = 1) and compares them.
 * (I.e. returns the boolean value, representing whether they're equal or not).
 * @param {number[]} arrays An array of one-dimensional array of any length.
 */
function arrayEquality(...arrays)
```

### 33.dim()

Takes an array and measures it's maximum dim (how nested it actually is). For example dim of a number/string or anything that is not an Array is 0 as well as of an array with no elements in it. Dim of array with n >= 1 arrays, which have something else in them is n+1.

From math-expressions.js:

```js
/**
 * This function takes in array and determines how nested it is (its dimensions).
 * If it is not array, dimension is 0.
 * If it is an array with only empty array, then it's dimension is 0.
 * It it is an array with array inside itself, which dimension is n-1, then the dimension is n.
 * This function is defined recursively.
 * @param {any[] | any} array An array with any data in it. It doesn't have to be an array, though.
 */
function dim(array)
```

### 34.binomial()

Takes in two numbers and calculates the binomial coefficient for them. (Works not only with integers, if one passes rational number for the first (but not second) argument, it works fine. However, if the second argument is rational, then it gets rounded down to the nearest integer.)

From math-expressions.js:

```js
/**
 * Takes two numbers (one rational and other - integer) and calculates the value of combinatorics choose function for them.
 * (What it actually does is it takes their binomial coefficient, but never mind about that. )
 * @param {number} n First number (any rational number).
 * @param {number} k Second number (integer).
 */
function binomial(n, k)
```

### 35.mostPopularElem()

Takes an array of arbitrary objects and returns the most frequent of them. A generalisation of mostPopularNum function.
Also, as a second argument it accepts the value, that should be returned in case if there isn't most frequent element. By default, the second parameter is equal to null. 

From math-expressions.js:

```js
/**
 * Takes and array and returns the most frequently appearing element in it or null, if there isn't one.
 * @param {any[]} array An array of ... pretty much anything, for as long as it's not null.
 * @param
 */
function mostPopularElem(array = [], noneValue = null)
```

## Classes

### 1.Statistics

Constructor of this class takes an array of numbers and creates a Statistics object.
This object has a statistic information about passed number array.
(For now, only, I hope) this class only has a constructor and properties.

#### Class Properties:

    Statistics.min: number;
    Statistics.max: number;

    Statistics.range: number;
    Statistics.interquartRange: number;
    Statistics.countOfElements: number;

    Statistics.median: number;
    Statistics.average: number;
    Statistics.truncatedAverage: number;
    Statistics.mostPopular: string | number;

    Statistics.sorted: number[];
    Statistics.deviations: number[];

    Statistics.populationVarience: number;
    Statistics.populationStandDev: number;
    Statistics.standardError: number;

#### Class Methods

    Statistics(array: number[]): Statistics;

Actually, Statistics.countOfElements property is just a copy of Array.length property of passed array, but I thought, that it might be useful for someone to have all this beautiful data and a row(or an array, if you prefer) length property in one object.

#### Notice:

After defining a Statistics object all of its existing data is immutable by default. You can add new properties to it, though.

### 2.Surface

Constructor of this class takes two objects(or arrays), that contain three values: start position, end position and step. Each of these numbers are taken and given to the generate() function to generate the limits of x and y axises for the Surface object.

Surface object itself represents a surface on which geometric figures are placed.
From the beginning this is an empty surface, that has width(x axis min and max numbers), height(y axis min and max numbers), two arrays for x and y axises, representing possible values, being placed on both of axises and a zero point in Surface.dots ([0, 0]).

#### Class properties:

    Surface.x: number[];
    Surface.y: number[];

    Surface.width: number;
    Surface.height: number;

    Surface.dots: number[][];
    Surface.lines: number[][][];
    Surface.segments: number[][][];

#### Class Methods

    Surface(xLimits: number[], yLimits:number[]): Surface;

#### Class Methods:

    Surface.prototype.inLimits(...dots: number[][][]): boolean
    Surface.prototype.dot(...dots: number[][]): void
    Surface.prototype.line(...dots: number[][]): void
    Surface.prototype.segment(...dots: number[][]): void

### 3.Expression

Constructor of this class takes two arrays, one of which contains numbers of expression, that this object represents, other contains strings, containing operators of this expression.

#### Class Properties:

    Expression.nums: number[];
    Expression.operators: string[];

#### Class Methods:

    Expression(numbers: number[], operators: string[]): Expression;
    Expression.execute(): number;
    Expression.repeat(times: any, operator: any): number;

This class can be very comfortly used with functions, that work with math expressions.
These are exp(), sameOperator(), fullExp() and repeatExp(). Even though, I would recommend you using Expression.execute() and Expression.repeat() instead of the last two functions.

#### Notice:

After defining an Expression object its data(already existing) is immutable by default. You can add new properties, though.

### 4.Tests

This class represents a bunch of statistics test(like Fisher's f-test, for example).
It can be called "fully static", 'cause all of its methods are static and so it has no constructor.

##### Temporary note:

If you want to try using this class, than be careful with the Tests.U_test() method, that is used for Mann-Whitney U-test, because for now it does not work with the arrays, that have repeating numbers in them. In future, I hope, it will be fixed. (Even though it works perfectly with arrays that have no repeating number in them).

#### Class Methods

    Tests.checkArrSize(arr: arr[], size: number): void; (static)

    Tests.t_Students_test(...rows: number[]): number; (static)
    Tests.F_test(...rows: number[]): number; (static)
    Tests.U_test(...rows: number[]): number; (static)
    Test.Z_score(testedNum: number, numbers: number[]): number; (static)

### 5.Ratio

This class represents a ratio of two numbers.

#### Class Properties

    Ratio.numerator: number;
    Ratio.denomenator: number;

#### Class Methods

    Ratio(numerator: number, denomenator: number): Ratio;
    Ratio.evaluate(): number;
    Ratio.simplify(ratio: Ratio): Ratio; (static) // Note: original ratio is mutated and then returned.
    Ratio.add(ratio: Ratio): Ratio;
    Ratio.subtract(ratio: Ratio): Ratio;
    Ratio.multiply(ratio: Ratio): Ratio;
    Ratio.divide(ratio: Ratio): Ratio;
    Ratio.root(base: number): Ratio;

### 6.Algorithms

That is another static class, this time containing algorithms instead of statistical tests.

#### Class Methods

    Algorithms.Farey(startRatio: Ratio, endRatio: Ratio, iterations: number): Ratio[][]; (static)
    Algorithms.BinarySearch(array: number[], element: number): number; // returns index of sorted array

### 7.Vector

This class represents a type-safe and length-safe version of array, that also has controllable length.

#### Class Methods

    Vector(type: string, length: number, vector: any[]): Vector;
    Vector.typeCheck(item: any): void; (static)
    Vector.add(item: any): number; // Returns vector's previous length
    Vector.delete(index: number): any;
    Vector.index(item: any): number; // Allows to find the index of some element in vector.
    Vector.indexes(item: any): number[]; // version of Vector.index() for elements that appear multiple times.
    Vector.byIndex(index: number): any; // Gives the element being passed in the index of it.
    Vector.slice(start: number, end: number): Vector;
    Vector.fill(item: number): void;
    Vector.getArrType(array): string; (static)
    Vector.swap(index1: number, index2: number): void;
    Vector.set(index: number, value: any): void;

#### Class Properties

    Vector.vector: any[];
    Vector.length: number;
    Vector.type: string;
    Vector.allowedTypes: string[]; (static)

### 8.Matrix

This class represents a Vector of Vectors or a mathematical SQUARE (that's important) matrix.
It's only possible necessety and advantage over RectMatrix is the determinant method, that allows you to find a determinant of a square matrix.

#### Class Methods

    Matrix(sidelen: number, dimensions: number[][]): Matrix;
    Matrix.dimensionCheck(sidelen, dimensions): void; (static) (inherited from RectMatrix)
    RectMatrix.navigate(coordinate: number[]): Vector; (inherited from RectMatrix)
    Matrix.toArray(): number[][]; (inherited from RectMatrix)
    Matrix.scalarMultiply(scalar: number): void; (inherited from RectMatrix)
    Matrix.scalarAdd(scalar: number): void; (inherited from RectMatrix)
    Matrix.matrixMultiply(matrix: Matrix): Matrix; (inherited from RectMatrix)
    Matrix.determinant(): number;

#### Class Properties

    Matrix.matrix: Vector;
    Matrix.sidelen: number;

### 9.RectMatrix

This class represents a rectangular (that's important) mathematical matrix.

#### Class Methods:

    RectMatrix(sidelen: number, dimensions: number[][]): RectMatrix;
    RectMatrix.dimensionCheck(sidelens: number[], dimensions: number[][]);
    RectMatrix.navigate(coordinate: number[]): Vector;
    RectMatrix.toArray(): number[][];
    RectMatrix.scalarAdd(scalar: number): void;
    RectMatrix.scalarMultiply(scalar: number): void;
    RectMatrix.matrixMultiply(matrix: RectMatrix): Matrix;

#### Class Properties:

    RectMatrix.matrix: Vector;
    RectMatrix.sidelen: number[]; // first's the width (number of vectors) , second's the height (number of numbers in vectors)

### 10.Equation

This class represents a mathematical equation. It allows you to equip a particular string, containing
most basic mathematical equality and arithmetic with tools to approximate solutions to it on a given interval.

But, before this actually happens the string has to be parsed by certain rules.
They are listed here:

1.  The equation has to have two sides, separated by a "=" sign;
2.  Allowed arithmetical operators are:

        2.1. "a+b" - addition of b to a,
        2.2. "a-b" - subtraction of b from a (or additive inverse, if put before something),
        2.3. "a*b" - multiplication of a by b,
        2.4. "a/b" - division of a by b,
        2.5  "a^b" - exponentiation of a to the b.

    (Later there will be more, but for now - that's it)

3.  One can use brackets: "(" and ")", "[" and "]", "{" and "}". They will all be interpreted as the same.
4.  The order of operations is as in BOMDAS.
5.  You can use different variable names, that are lengthed as 1 (sadly, bigger names don't work yet).

Also, the computation of the root for the given equation is purely numerical and depends on the given search ranges.
And I would highly recommend NOT to make the search area too big and to make the solutions less accurate than 9 ('cause otherwise JS might blow up due to the overflow).

#### Class Properties

    Equation.variables: string[];
    Equation.equation: string;
    Equation.defaultMappings: VarMapping[]
    Equation.defaultParsed: {right: string, left: string}[]

#### Class Methods

    Equation(equationText: string, vars: string[]): Equation;
    Equation.parse(mappings: VarMapping): { right: string, left: string };
    Equation.ParseEquation(equationLine: string, mappings: VarMapping, varibales: string[]): { right: string, left: string };  (static)
    Equation.differRightLeft(mappings: VarMapping, varname: string, varvalue: number);
    Equation.searchSolution(mappings: VarMapping, varname: string, startvalue: number, pathlength: number, precision: number = 4);
    Equation.replaceIndex(string: string, index: number, val: string): string; (static)
    Equation.defaultDifferRightLeft(index: number, varname: string, varvalue: number);
    Equation.defaultsearchSolution(index: number, varname: string, startvalue: number, pathlength: number, precision: number);
    Equation.plug(origparsed: { right: string, left: string }, varname: string, varvalue: number): { right: string, left: string }; (static)

### 11.VarMapping

This class is mostly neccesary for the use with Equation class.

It represents a mapping from variables to their values, that are gonna be plugged into the final equation object after parsing and plugging in.

By the way, it works not just with variables, which have length 1. In fact, the variable names can even have numbers in them (there must be at least one letter, however). This current problem is in the Equation class only. In order to fix it, one would have to rewrite the plugging procedure completely.

#### Class Properties

    VarMapping.varmap: { variables: string[], mappings: number[] };

#### Class Methods

    VarMapping (vars: string[], maps: number[]): VarMapping;
    VarMapping.add(name: string, value: number): void;
    VarMapping.delete(name: string): void;

## Notes:

### 1.

The full documentation for all of these functions and classes is present in README.md (which you currently are reading).
You can find examples of how to use them in examples.js file.

For now the library is only at the starting point of being created, so any suggestions on the improvement of the project are only appreciated.

### 2.

The package uses ES6 modules (import/export) and not CommonJS modules(require() / module.exports), so it might not work in the old versions of Node.js. Recommended versions to use with this package are 15.x.x or higher. Also, don't forget that you shouldn't use the require() with it, use import instead (unless you have a CommonJS module (for some reason) and it happens to work (for some reason)).
