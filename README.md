# math-expressions.js

math-expressions.js is a JavaScript library with a vast variety of covered areas of interest.
<!-- TODO: this is temporary, after having added more beautiful things to the 1.0, pray make this more full... -->
Amongst those: very handy utilities, basic statistics, collections, abstract objects, 
multi-dimensional arrays, some simple linear algebra, equation parsing, unlimited types;

<!-- * About the compatibility changes: -->
<!-- * The compatibility is broken in 3 places: 1. the imports and 2. the default arguments of functions... 3. (sometimes) The precise argument lists and definitions of functions (though, the changes were always only generalizing, expansive and constructive...) -->
<!-- * Also, some elements of the old API change entirely (this touches classes especially much...): certain things change names, disappear or (far more usually) get (immensely) generalized; -->

## Installation

Math-expressions.js can be installed using npm.
Install math-expressions.js using npm:

    npm install math-expressions.js@[version]

## Documentation 

<!-- * Planned: each version has its own documentation... Though stuff >= 0.8 is marked as 'not recommended for use (bugs)' -->
[Wikis on GitHub repo](https://github.com/HGARgG-0710/math-expressions.js/wiki)

The library also supports basic in-editor JSDoc documentation. 

## Source

Files [purpose stated]: 

1. src/math-expressions.js (the source code; this is a one-file library)
2. src/examples.mjs (file that executes the 'test's in a certain given order; based upon a local file ignored by the 'git')
3. test/* (the tests' directory; for each and every abstraction, there is a test; all separated)
4. README.md (this file)
5. LICENSE (the license)


## Modules

The package uses ES modules. 

## Current Status 

It is currently in development, so many things may (and most probably will) change. 

The previous versions all had terrible amount of bugs due to not having been tested thoroughly enough (though later ones have slightly less...). 

From version 1.0 onwards, one plans to break backward compatibility for versions <=0.8, as well as the future ones. 
Each and every version is independent from all the others. 
This way, one would not be 'bound' by keeping code that run on different version of the library alive, allowing for far more vast area of 
experementation and new ideas in old places. 
At the same time, it would require the user to update manually for each new version (if they want to update, that being). 

<!-- * idea : within the /wiki, for each and every thing, add a link to the definition of its' (even the bugged ones; if there's a bug in one, document it...) -->

<!-- ## Global Variables (links)

1. [fixedSize](#1fixedsize)

## Functions (links)

1. [exp](#1exp)
2. [repeatedArithmetic](#2repeatedarithmetic)
3. [fullExp](#3fullexp)
4. [repeatExp](#4repeatexp)
5. [average](#5average)
6. [min](#6min)
7. [max](#7max)
8. [median](#8median)
9. [mostPopularNum](#9mostpopularnum)
10. [range](#10range)
11. [sort](#11sort)
12. [copy](#12copy)
13. [generate](#13generate)
14. [find](#14find)
15. [readable](#15readable)
16. [factorOut](#16factorout)
17. [truncate](#17truncate)
18. [leastCommonMultiple](#18leastcommonmultiple)
19. [deviations](#19deviations)
20. [dispersion](#20dispersion)
21. [standardDeviation](#21standarddeviation)
22. [standardError](#22standarderror)
23. [degreeOfFreedom](#23degreeoffreedom)
24. [expectedValue](#24expectedvalue)
25. [floor](#25floor)
26. [randomArray](#26randomarray)
27. [isPerfect](#27isperfect)
28. [allFactors](#28allfactors)
29. [factorial](#29factorial)
30. [realAddition](#30realaddition)
31. [setPrecision](#31setprecision)
32. [arrayEquality](#32arrayequality)
33. [dim](#33dim)
34. [binomial](#34binomial)
35. [mostPopularElem](#35mostpopularelem)

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
export let fixedSize: number = 11
```

## Functions

### 1.exp

With it you can execute a mathematical expression upon two numbers.
For now, arithmetic only is available.
Takes two numbers and a string with an operator. By default uses + operator.

From math-expressions.js:

```js
/**
 * Executes an expression with two numbers
 * @param {number} firstNum  First number.
 * @param {number} secondNum Second number.
 * @param {string} operator  String, containing an ariphmetic operator(+, -, /, *, **, ^ (exponentiation) or %).
 * @returns {number} Result of a mathematical expression.
 */
function exp(firstNum: number = 2, secondNum: number = 2, operator: string = "+"): number;
```

### 2.repeatedArithmetic

This function allows you to perform an expression, that uses the same arithmetic operator, but different numbers.
By default uses + operator.

It allows to quickly sum, multiply and so on a bunch of numerics. 

From math-expressions.js:

```js
/**
 * Executes mathematical expression with the same operator repeating, but different numbers.
 * @param {number[]} numbers An array of numbers(or strings) using which expression will be executed.
 * @param {string} operator - A string, containing an operator, with which expression will be executed.
 */
function repeatedArithmetic(numbers: number[] = [], operator: string = "+"): number;
```

#### Note: 

Before the version 0.7 it was called sameOperator() (you can still use the old name, though).

### 3.fullExp

This function allows you to perform different mathematic actions upon a bunch of different numbers.
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
function fullExp(expression: { nums: number[], operators: string[] } | Expression): number;
```

### 4.repeatExp

This function repeats an arithmetic expression a bunch of times, then perform an ariphmetic
operation upon all of its results and return the final result.

From math-expressions.js:

```js
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
	expression: { nums: number[], operators: string[] },
	countOfRepeats = 1,
	repeatOperator = "+"
): number;
```

### 5.average

This function takes a numeric array and returns an arithmetic mean of all its values. 
The average may be truncated or not, depending upon the fact whether the second argument (a boolean) was passed (as true) or not (or passed, but as false). 

From math-expressions.js:

```js
/**
 * Takes the number array and rerturns an arithmetic mean of it.
 * @param {number[]} nums An array of numbers passed to the function.
 * @param {boolean} isTruncated A boolean saying does or does not the average will be truncated. By default false.
 * @param {number} percents A number, that is used as a multiplier for two, when shortening the numeric array.
 */
function average(nums: number[], isTruncated:boolean = false, percents:number = 10): number;
```

### 6.min

Returns a minimum of a passed array.

```js
/**
 * Takes an array of numbers and returns the smallest of thems.
 * @param {number[]} nums An array of numbers passed to the function.
 * @returns {number} The smallest number of the passed array.
 */
function min(nums: number[]): number;
```

### 7.max

Returns a maximum of given array. 

From math-expressions.js:

```js
/**
 * Takes an array of numbers and returns the largest of them.
 * @param {number[]} nums An array of numbers passed to the function.
 * @returns {number} The largest number in passed numerical array.
 */
function max(nums:number[]): number;
```

### 8.median

Returns a median of passed array. 

From math-expressions.js:

```js
/**
 * Takes an array of numbers, which length and returns the median of it.
 * @param {number[]} nums An array of numbers, passed to the function.
 */
function median(nums: number[]): number;
```

### 9.mostPopularNum

This function takes an array of numbers and an arbitrary something. Then returns the most frequent number in the array or the arbitrary something if there is not such. (By default, arbitrary something = "None")

From math-expressions.js:

```js
/**
 * Takes an array and returns most "popular" number in it.
 * @param {number[]} nums An array of numbers passed to the function.
 * @param {any} noneValue A value, returned if the array doesn't have a most popular number. String "None" by default.
 */
function mostPopularNum(nums: number[], noneValue:any = "None"): number;
```

### 10.range

This function takes an array of numbers and returns the difference between the max and the min values.

From math-expressions.js:

```js
/**
 * @param {number[]} nums An array of numbers passed to the function.
 * @param {boolean} isInterquartile A boolean, representing shall the range to be gotten be interquartille or not. By deafault false.
 * @returns the range of the numeric array (if passed [-5, 10] returns 15).
 */
function range(nums: number[], isInterquartile: boolean = false): number;
```

### 11.sort

Returns an array sorted. 
It could be sorted forwards or backwards depending on the second argument.  

From math-expressions.js:

```js
/**
 * Takes an array of numbers and returns sorted version of it.
 * @param {number[]} nums An array of numbers, passed to the function to sort.
 * @param {boolean} fromSmallToLarge A boolean, on which value depends will the function sort an array from least to the largest or from largest to the least. By default true.
 */
function sort(nums:number[], fromSmallToLarge:boolean = true): number;
```

### 12.copy

Copies a given array. 

From math-expressions.js:

```js
/**
 * Copies an array without referencing its object.
 * @param {any[]} nums An array that needs to be copied.
 * @returns {number[]} Copy of a passed array, without referencing its object.
 */
function copy(nums: any[]): any[];
```

### 13.generate

Generates an array based on given data. 
First argument - start, from which the array is to be made. 
Second - when it shall end. 
Third - the generation step. 
Fourth - the precision of step (necessary iff third argument is a float).  

#### Note: 

It can also be done backwards, like in Python. 

From math-expressions.js:

```js
/**
 * Takes three numbers: the start position, the end position and the step, generates a numeric array using them and returns it.
 * @param {number} start Start number in array(it's supposed to be the least number in it)
 * @param {number} end End number in array(the creation of the array is going until end value + 1 number is reached).
 * @param {number} step Value, by which the count is incremented every iteration.
 * @param {number} precision Precision of a step, by default set to 1. (If your array is of integers, it's not necessary.)
 */
function generate(start: number, end: number, step: number = 1, precision: number = 1): number[];
```

### 14.find

This function takes a numeric array(one- or two-dimensional) or a string and a number(or a one-dimensional array of numbers) or a substring, that will be found in this array(or string). Returns an array, that, if the value is found, contains true and a count of times this number(or a one-dimensional array, or a substring) was found, otherwise false and 0.

From math-expressions.js:

```js
/**
 * Takes an array(or a string) and a number(or a one-dimensional array of numbers or a substring), that must be found in this array. If the value is found returns true and a count of times this number was found, otherwise false.
 * @param {number[] | number[][] | string} searchArr Array in which queried value is being searched.
 * @param {number | number[] | string} searchVal Searched value.
 * @returns {[boolean, number, number[]]} An array, containig boolean(was the needed number, numeric array or string found in searchArr or not), a number(frequency) and an array of numbers(indexes, where the needed number or string characters were found), but the last one is only when the searchVal is not an array and searchArr is not a two-dimensional array.
 */
function find(searchArr: number[] | number[][] | string, searchVal: number | number[] | string): [boolean, number, number[]];
```

### 15.readable

Returns a better readable string version of given integer. 

From math-expressions.js:

```js
/**
 * Takes in an integer and returns a string, containing it's readable version. (Like 12345 and 12 345)
 * @param {number} num A number, from which to make a better-looking version of it.
 */
function readable(num: number): string;
```

### 16.factorOut

Factors a given integer and returns it's factorization in an unmodifiable array. 

From math-expressions.js:

```js
/**
 * Factors out a passed number to the prime numbers.
 * @param {number} num Number, to be factored out.
 * @returns {number[]} Prime factors array.
 */
function factorOut(number: number): number[];
```

### 17.truncate

Truncates a passed numeric array(the first parameter) by count of numbers, that is equal function's second parameter(it is a number) multiplied by 2. Array is being truncated from it's "edges"(only stated count of percents of the biggest and the smallest numbers are deleted).

From math-expressions.js:

```js
/**
 * Takes a numeric array and a number and truncates the passed array, using the second paramater as a count of percents of numbers, that shall be deleted.
 * @param {number[]} nums An array to be truncated.
 * @param {number} percents A number, that is multiplied by two(if you passed 10, then it is 20) and represents count of percents of numbers to be deleted from the edges of the passed array.
 */
function truncate(nums: number[], percents: number = 10): number[];
```

#### Notice:

Before truncating an array truncate() function sorts it from-smallest-to-largest way.

### 18.leastCommonMultiple

Finds the least common multiple between two numbers(first and second arguments) in given search range(third argument). Search range is not a number to which the search will be continued, it is a number of iterations, each of which similiar value is searched (100 by default). If the search range is too small, then returns null, otherwise the least common multiple.

From math-expressions.js:

```js
/**
 * Takes three numbers, thwo of which are numbers for which least common multiple shall be found and the third one is a search range for them.
 * @param {number} firstNum First number.
 * @param {number} secondNum Second number.
 * @param {number} searchRange A number, representing range of searches(if you get null from this function, then try to make range bigger). By default 100.
 */
function leastCommonMultiple(firstNum: number, secondNum: number, searchRange: number = 100): number; 
```

### 19.deviations

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
function deviations(row: number[], isSquare: boolean = false, isTruncated: boolean = false, percents: number = 10): number[];
```

### 20.dispersion

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
	row: number[],
	isSquare: boolean = false,
	isGeneral: boolean = true,
	indexes: number[] // only needed if isGeneral = false
): number; 
```

### 21.standardDeviation

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
	row: number[],
	isPopulation: boolean = true,
	indexes: number[] // needed only if isPopulation = false
): number;
```

### 22.standardError

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
	row: number[],
	isDispersion: boolean = false,
	isPopulation: boolean= true,
	indexes: number[]
): number;
```

### 23.degreeOfFreedom

Takes a two-dimensional array of numbers and returns the degree of freedom for it.

From math-expressions.js:

```js
/**
 * Takes a two-dimensional array, containing one dimensional number arrays and returns the number of degrees of freedom for all of them.
 * @param {number[]} numRows Multiple one-dimensional arrays for which the degree of freedom is to be found.
 */
function degreeOfFreedom(...numRows: number[]): number;
```

### 24.expectedValue

Takes two number arrays(first of whicn is for numbers and the second is for their probabilities to appear) and returns an expected value based on this data.

From math-expressions.js :

```js
/**
 * Takes a numbers array and an array of probabilities for each of the given numbers to appear and returns expected value for them.
 * @param {number[]} numbers A number array, expected value for which is to be found.
 * @param {number[]} probabilities An array of probabilitiles for certain numbers from numbers array to appear.
 */
function expectedValue(numbers: number[], probabilities: number[]): number;
```

### 25.floor

Takes two numbers: the "target" number and the level of precision to be used on it. Second argument represents count of digits to be existent after the dot.

From math-expressions.js:

```js
/**
 * Floors the given number to the needed level of precision.
 * @param {number} number Number to be floored.
 * @param {number} afterDot How many positions after dot should there be.
 * @returns {number}
 */
function floor(number: number, afterDot: number = fixedSize): number;
```

### 26.randomArray

Takes the number, one number, a boolean and returns a random array, based on this data. The first argument is the max length that the new randomly-generated array can have, second one is the max value that can be detected in the array and the third one is the boolean, representing whether the numbers in the array should all be integers or not (By default false).

From math-expressions.js:

```js
/**
 * Takes the max length of the random array, it's max value, the flag, characterizing whether numbers in it should be integers.
 * @param {number} maxLength The largest count of numbers, that can appear in the random array. (It can be different from the given value).
 * @param {number} maxValue The max value, that can be found in the randomly generated array.
 * @param {boolean} integers The boolean flag, that represents whether all numbers in the array should be integers or not. By default false.
 */
function randomArray(maxLength: number, maxValue: number, integers: boolean = false): number[];
```

### 27.isPerfect

Takes a number and checks whether it is perfect or not. Returns boolean.

From math-expressions.js:

```js
/**
 * Checks whether the number passed is perfect or not.
 * @param {number} number Number, perfectness of which is to be checked.
 */
function isPerfect(number: number): boolean;
```

### 28.allFactors

Takes a number and returns a number array consisting of all of its factors (do not confuse with factorOut() function, that returns only prime factors).

From math-expressions.js:

```js
/**
 * Takes one integer and returns all of its factors (not only primes, but others also).
 * @param {number} number An integer, factors for which are to be found.
 */
function allFactors(number: number): number[];
```

### 29.factorial

Classic! Good old integer-only factorial() function. You know what it does if you know what factorial is. Takes a integer in and and spits factorial of it out.

From math-expressions.js:

```js
/**
 * This function calculates the factorial of a positive integer given.
 * @param {number} number A positive integer, factorial for which is to be calculated.
 */
function factorial(number: number): number;
```

### 30.realAddition

This function is a fix of classical addition in computer languages. It is very helpful when adding big numbers in which the error might go straight up.
Of course, it wouldn't help completely, but a useful thing for quite specific cases.
It returns an array of two values: 1. the achieved result, 2. the error (it may be helpful in case of rounding up again)

From math-expressions.js:

```js
/**
 * This function does a fixed addition of two numbers. It decreases error a tiny bit, but with large numbers it may be signigicant.
 * @param {number} float1 First number to be added.
 * @param {number} float2 Second number to be added.
 * @returns {[number, number]} a number (first) with error less than it would be with JavaScript addition.
 */
function realAddition(float1: number, float2: number): [number, number];
```

### 31.setPrecision

From math-expressions.js:

```js
/**
 * This function takes an integer value, representing the new precision of the output and sets fixdSize equal to it.
 * @param {number} newPrecision The new value of fixedSize.
 */
function setPrecision(newPrecision: number = 0): void;
```

### 32.arrayEquality

From math-expressions.js:

```js
/**
 * This funciton takes in n arrays of dimension 1 (dim (arr) = 1) and compares them.
 * (I.e. returns the boolean value, representing whether they're equal or not).
 * @param {any[]} arrays An array of one-dimensional array of any length.
 */
function arrayEquality(...arrays: any[]): boolean;
```

### 33.dim

From math-expressions.js:

```js
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
function dim(array: any);
```

### 34.binomial

Takes in two numbers and calculates the binomial coefficient for them. (Works not only with integers, if one passes rational number for the first (but not second) argument, it works fine. However, if the second argument is rational, then it gets rounded down to the nearest integer.)

From math-expressions.js:

```js
/**
 * Takes two numbers (one rational and other - integer) and calculates the value of combinatorics choose function for them.
 * (What it actually does is it takes their binomial coefficient, but never mind about that. )
 * @param {number} n First number (any rational number).
 * @param {number} k Second number (integer).
 */
function binomial(n: number, k: number): number;
```

### 35.mostPopularElem

Takes an array of arbitrary objects and returns the most frequent of them. A generalisation of mostPopularNum function.
Also, as a second argument it accepts the value, that should be returned in case if there isn't most frequent element. By default, the second parameter is equal to null.

From math-expressions.js:

```js
/**
 * Takes and array and returns the most frequently appearing element in it or null, if there isn't one.
 * @param {any[]} array An array of ... pretty much anything, for as long as it's not null.
 * @param {any} noneValue The value that is to be returned in case there is no most popular element.
 */
function mostPopularElem(array: any[], noneValue: any = null): any;
```

## Classes

### 1.Statistics

Constructor of this class takes an array of numbers and creates a Statistics object.
This object has a statistic information about passed number array.
This class only has a constructor, properties and one static method.

```js

class Statistics {
    // Methods
    static isNumeric(data: any[]): boolean; // returns. whether the given row of data consists of numbers only.
    Statistics(array: number[], smallerToBigger: boolean, nullValue: any): Statistics;

    // Properties
    min: number | null;
    max: number | null;
    range: number | null;
    interquartRange: number | null;
    countOfElements: number;
    median: number | null;
    average: number | null;
    truncatedAverage: number | null;
    mostPopular: string | number | any;
    sorted: number[] | null;
    deviations: number[] | null;
    populationVarience: number | null;
    populationStandDev: number | null;
    standardError: number | null;
}
```

Actually, Statistics.countOfElements property is just a copy of Array.length property of passed array, but I thought, that it might be useful for someone to have all this beautiful data and a row(or an array, if you prefer) length property in one object.

#### Notice:

After defining a Statistics object all of its existing data is immutable by default. You can add new properties to it, though.

### 2.Surface

Constructor of this class takes two objects(or arrays), that contain three values: start position, end position and step. Each of these numbers are taken and given to the generate() function to generate the limits of x and y axises for the Surface object.

Surface object itself represents a surface on which geometric figures are placed.
From the beginning this is an empty surface, that has width(x axis min and max numbers), height(y axis min and max numbers), two arrays for x and y axises, representing possible values, being placed on both of axises and a zero point in Surface.dots ([0, 0]).

```js
class Surface {
    // Methods
    Surface(xLimits: number[], yLimits:number[]): Surface;
    inLimits(...dots: number[][][]): boolean
    dot(...dots: number[][]): void
    line(...dots: number[][]): void
    segment(...dots: number[][]): void

    // Properties
    x: number[];
    y: number[];
    width: number;
    height: number;
    dots: number[][];
    lines: number[][][];
    segments: number[][][];
}
```

### 3.Expression

Constructor of this class takes two arrays, one of which contains numbers of expression, that this object represents, other contains strings, containing operators of this expression.

```js
class Expression {
    // Methods
    Expression(numbers: number[], operators: string[]): Expression;
    execute(): number;
    repeat(times: number, operator: string): number;

    // Properties
    nums: number[];
    operators: string[];
}
```

This class can be very comfortly used with arithmetic functions: exp(), sameOperator(), fullExp() and repeatExp(). Even though, the use of Expression.execute() and Expression.repeat() instead of the last two functions is recommended.

#### Notice:

After defining an Expression object its data(already existing) is immutable by default. You can add new properties, though.

### 4.Tests

This class represents a bunch of statistics test(like Fisher's f-test, for example).
It can be called "fully static", 'cause all of its methods are static and so it has no constructor.

##### Temporary note:

If you want to try using this class, than be careful with the Tests.U_test() method, that is used for Mann-Whitney U-test, because for now it does not work with the arrays, that have repeating numbers in them. In future, I hope, it will be fixed. (Even though it works perfectly with arrays that have no repeating number in them).

```js
class Tests {
    // Methods only here
    static checkArrSize(arr: arr[], size: number): void;
    static t_Students_test(...rows: number[]): number;
    static F_test(...rows: number[]): number;
    static U_test(...rows: number[]): number;
    static Z_score(testedNum: number, numbers: number[]): number;
}
```

### 5.Ratio

This class represents a ratio of two numbers.

```js
class Ratio {
    // Methods
    static simplify(ratio: Ratio): Ratio;  // Note: original ratio is mutated and then returned.
    Ratio(numerator: number, denomenator: number): Ratio;
    evaluate(): number;
    add(ratio: Ratio): Ratio;
    subtract(ratio: Ratio): Ratio;
    multiply(ratio: Ratio): Ratio;
    divide(ratio: Ratio): Ratio;
    root(base: number): Ratio;

    // Properties
    numerator: number;
    denomenator: number;
}
```

### 6.Algorithms

That is another static class, this time containing algorithms instead of statistical tests.

```js
class Algorithms {
    // Again, methods only here.
    static Farey(startRatio: Ratio, endRatio: Ratio, iterations: number): Ratio[][];
    static BinarySearch(array: number[], element: number): number; // returns index of sorted array
}
```

### 7.Vector

This class represents a mathematical vector. 
You can do all sorts of operations on it, most of the ones of vector algebra. 

```js
class Vector {
    // Methods
    static typeCheck(item: any): void;
    static getArrType(array): string;

    Vector(type: string, length: number, vector: any[]): Vector;
    add(item: any): number; // Returns vector's previous length
    delete(index: number): any;
    index(item: any): number; // Allows to find the index of some element in vector.
    indexes(item: any): number[]; // version of Vector.index() for elements that appear multiple times.
    byIndex(index: number): any; // Gives the element being passed in the index of it.
    slice(start: number, end: number): Vector;
    fill(item: number): void;
    swap(index1: number, index2: number): void;
    set(index: number, value: any): void;
    elementByElement(vector: Vector, operator: string): void; // does a given operation on each of elements of this and vector (in pairs). 
    map(type: string, f: (element, index, arr) => any): Vector; 
    addVector(vec: Vector): Vector; 
    vectorScalarMultiply(vector): number;  
    

    // Properties
    vector: any[];
    length: number;
    type: string;

    static allowedTypes: readonly string[] = [
		"number",
		"string",
		"boolean",
		"function",
		"object",
		"bigint",
		"any"
    ]
}
```

### 8.Matrix

This class represents a Vector of Vectors or a mathematical square (that's important) matrix.
It's only possible necessety and advantage over RectMatrix is the determinant method, that allows you to find a determinant of a square matrix.

This way, they are almost equivalent (below only the exclusive methods and properties of Matrix class are listed, not the ones of RectMatrix).

```js
    class Matrix extends RectMatrix {
        // Methods
        Matrix(sidelen: number, dimentions: number[][]): Matrix;
        determinant(): number;

        // Properties
        sidelen: number;
    }
```

### 9.RectMatrix

This class represents a rectangular (that's important) mathematical matrix.

```js
    class RectMatrix {
        // Methods
        static dimensionCheck(sidelens: number[], dimensions: number[][]): void;

        RectMatrix(sidelen: number, dimensions: number[][]): RectMatrix;
        navigate(coordinate: number[]): Vector;
        toArray(): number[][];
        scalarAdd(scalar: number): void;
        scalarMultiply(scalar: number): void;
        matrixMultiply(matrix: RectMatrix): Matrix;
        addMatrix(matrix: RectMatrix): RectMatrix; 

        // Properties
        matrix: Vector; // Vector consists of Vectors.
        sidelen: number[]; // first's the width (number of vectors) , second's the height (number of numbers in vectors)
    }
```

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
And I would highly recommend NOT to make the search area too big and to make the solutions less accurate than 6 ('cause otherwise JS might blow up due to the overflow).

```js

    class Equation {
        // Methods
        static ParseEquation(equationLine: string, mappings: VarMapping, varibales: string[]): { right: string, left: string };
        static replaceIndex(string: string, index: number, val: string): string;

        Equation(equationText: string, vars: string[]): Equation;
        parse(mappings: VarMapping): { right: string, left: string };
        differRightLeft(mappings: VarMapping, varname: string, varvalue: number);
        searchSolution(mappings: VarMapping, varname: string, startvalue: number, pathlength: number, precision: number = 4);
        defaultDifferRightLeft(index: number, varname: string, varvalue: number);
        defaultsearchSolution(index: number, varname: string, startvalue: number, pathlength: number, precision: number);
        plug(origparsed: { right: string, left: string }, varname: string, varvalue: number): { right: string, left: string };

        // Properties
        variables: string[];
        equation: string;
        defaultMappings: VarMapping[]
        defaultParsed: {right: string, left: string}[]
    }

```

### 11.VarMapping

This class is mostly neccesary for the use with Equation class.

It represents a mapping from variables to their values, that are gonna be plugged into the final equation object after parsing and plugging in.

By the way, it works not just with variables, which have length 1. In fact, the variable names can even have numbers in them (there must be at least one letter, however). This current problem is in the Equation class only. In order to fix it, one would have to rewrite the plugging procedure completely.

```js
    class VarMapping {
        // Methods
        VarMapping (vars: string[], maps: number[]): VarMapping;
        add(name: string, value: number): void;
        delete(name: string): void;

        // Properties
        varmap: { variables: string[], mappings: number[] };
    }
``` -->

