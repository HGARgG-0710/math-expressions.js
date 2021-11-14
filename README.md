# Math-expressions.js

Math-expressions.js is a JavaScript library, allowing you to work with mathematical expressions, statistics, 2D surfaces, item (especially numbers) collections and linear algebra (being added now).  
For now, the list of functions and classes provided is quite thin, but in the future library may become a truly powerful and indeed irreplacable tool, which may save you many hours of coding in just few seconds.

## Installation

Math-expressions.js can be installed using npm.
Install math-expressions.js using npm:

    npm install math-expressions.js

or

    npm i math-expressions.js

## Global Variables

1. [fixedSize](#1fixedsize)

### 1.fixedSize

This variable characterizes how accurate is function output going to be. By default set to 7.
(Cannot be modidified directly, only through the setPrecision() function)

## Functions

1. [exp()](#1exp)
2. [sameOperator()](#2sameoperator)
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

### 1.exp()

With it you can execute a mathematical expression upon two numbers. Takes two numbers and a string with an operator. By default uses + operator.

### 2.sameOperator()

This function allows you to perform an expression, that uses the same mathematic action, but different numbers.
By default uses + operator.

### 3.fullExp()

This function allows you to perform different mathematic actions upon a bunch of different numbers.
By default uses \*\* and \* operators.

### 4.repeatExp()

This function allows you to repeat an expression a bunch of times, then perform an ariphmetic
operation upon all of its results and return the final result.

### 5.average()

This function takes a numeric array and returns an average of all its values. An average may be truncated or not, depending upon the fact was a second argument (a boolean) passed(as true) or not(or passed, but as false). This may be useful, when you want to get a truncated average.

### 6.min()

This function takes an array of numbers and returns the least value from it.

### 7.max()

This function takes an array of numbers and returns the largest value in it.

### 8.median()

This function takes an array of numbers, which length must be odd, and returns the middle value from it(a median).

### 9.mostPopularNum()

This function takes an array of numbers and returns one of them, that is the most frequent of all.

### 10.range()

This function takes an array of numbers and returns the residual between the max and the min values.

### 11.sort()

This function takes a numeric array and returns it sorted from smallest to largest(or opposite, from largest to smallest) number, depending on second parameter(that is a boolean).

### 12.copy()

This function takes an array and returns a copy of it without referencing object of an original array. It might be useful, when doing a duplicate of row of data to work with it(change) and leaving an original array as a reserve copy.

### 13.generate()

This function allows you to generate a row of data by giving it three numbers: firstly - the start position(the smallest number in the row), secondly - the end position(the largest position in the row) and thirdly - step number or the difference between each of row's numbers.

### 14.find()

This function takes a numeric array(one- or two-dimensional) or a string and a number(or a one-dimensional array of numbers) or a substring, that will be found in this array(or string). Returns an array, that, if the value is found, contains true and a count of times this number(or a one-dimensional array, or a substring) was found, otherwise false and 0.

### 15.readable()

This function takes a number and returns a string value of it, that is much better readable.

### 16.factorOut()

This function allows you to factor numbers. Previously, I wrote how terribly slow it was. Now it has become SO productive, that it cracks a number like 10000000000 in second or even less (I have not checked precisely, but it was already good enough)!

### 17.truncate()

Truncates a passed numeric array(the first parameter) by count of numbers, that is equal function's second parameter(it is a number) multiplied by 2. Array is being truncated from it's "edges"(only stated count of percents of the biggest and the smallest numbers are deleted).

#### Notice:

Before truncating an array truncate() function sorts it from smallest to largest way.

### 18.leastCommonMultiple()

Finds the least common multiple between two numbers(first and second arguments) in given search range(third argument). Search range is not a number to which the search will be continued, it is a number of iterations, each of which similiar value is searched(100 by default). If the search range is too small, then returns null, otherwise the least common multiple.

### 19.deviations()

Takes an array of numbers, two booleans and a number and returns an array of deviative numbers(comparing to the average) of the passed array. First boolean represents should or not all found deviations be powered by two or not. If it is false(what is a default value), then instead of powering all deviative numbers by two function just makes them an absolutes of original selves. Second boolean represents, should or should not array be truncated while searching for its average. The fourth parameter(number) represents count of percents, for which array should be truncated. It works only if third argument is true (by default it is false).

### 20.dispersion()

Takes an array of numbers, two booleans and another number array and returns a number - dispersion of a first argument. Second parameter represents should, in process of finding the dispersion, deviations be powered by two or not. If false(what is a default value), then instead of doing that, while searching for dispersion, will just use absolute values of all the found deviations. Third parameter represents the fact does the variance is sample variance or population variance. If it is false, then it is sample variance (by default second parameter is true). If it's false, then sample dispersion is returned, from the sample, made using numbers from the third argument, that represent needed indexes of the first argument.

### 21.standardDeviation()

Takes an array of numbers, boolean, another array of numbers and returns standard deviation of the numeric array, passed as the first argument. Second argument represents should standard deviation be of population or sample (By default - true, population). Third argument represents indexes of the sample, standard deviation of which shall be found (Works only if second argument is true).

### 22.standardError()

Takes an array of numbers, two booleans, another array of numbers and returns standard error of the first numeric array. Second argument represents, should dispersion(found using absolute values of deviations) be used as a number, divided by the length of the sample(or the whole array, if it is population) (By default false, standard deviation). Third argument represents should the return value be the standard error of population or sample (By default true, standard error of population). Fourth argument represents an array of indexes, using which sample, standard error of which shall be found, will be constructed. (Works only if the third argument equals false).

### 23.degreeOfFreedom()

Takes a two-dimensional array of numbers and returns the degree of freedom for it.

### 24.expectedValue()

Takes two number arrays(first of whicn is for numbers and the second is for their probabilities to appear) and returns an expected value based on this data.

### 25.floor()

Takes two numbers: the "target" number and the level of precision to be used on it. Second argument represents count of digits to be existent after the dot.

### 26.randomArray()

Takes the number, one number, a boolean and returns a random array, based on this data. The first argument is the max length that the new randomly-generated array can have, second one is the max value that can be detected in the array and the third one is the boolean, representing whether the numbers in the array should all be integers or not (By default false).

### 27.isPerfect()

Takes a number and checks whether it is perfect or not. Returns boolean.

### 28.allFactors()

Takes a number and returns a number array consisting of all of its factors (do not confuse with factorOut() function, that returns only prime factors).

### 29.factorial()

Classic! Good old integer-only factorial() function! You know what it does if you know what factorial is. Takes a integer in and and spits factorial of it out.

### 30.realAddition()

This function is a fix of classical addition in computer languages. It is very helpful when adding big numbers in which the error might go straight up.
Of course, it wouldn't help completely, but a useful thing for quite specific cases.
It returns an array of two values: 1. the achieved result, 2. the error (it may be helpful in case of rounding up again)

### 31.setPrecision()

This function sets a new value to the fixedSize global variable. It apparently had to be implemented because of the fact that exported variables, defined with let cannot be modified directly, but rather through a function.
Takes an integer and sets fixedSize equal to it.

## Classes

1. [Statistics](#1statistics)
2. [Surface](#2surface)
3. [Expression](#3expression)
4. [Tests](#4tests)
5. [Ratio](#5ratio)
6. [Algorithms](#6algorithms)
7. [Vector](#7vector)
8. [Matrix](#8matrix)
9. [RectMatrix](#9rectmatrix)

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

#### Class Methods

    Matrix(sidelen: number, dimensions: number[][]): Matrix;
    Matrix.dimensionCheck(sidelen, dimensions): void; (static)
    RectMatrix.navigate(coordinate: number[]): Vector; (inherited from RectMatrix) 
    Matrix.toArray(): number[][];
    Matrix.scalarMultiply(scalar: number): void;
    Matrix.scalarAdd(scalar: number): void; 
    Matrix.matrixMultiply(matrix: Matrix): Matrix; 
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
    RectMatrix.scalarAdd(scalar: number): void; 
    RectMatrix.scalarMultiply(scalar: number): void;  


#### Class Properties: 

    RectMatrix.matrix: Vector; 
    RectMatrix.sidelen: number[]; // first's the width, second's the height 

## Notes:

### 1.

The full documentation for all of these functions and classes may be seen by you in the math-expression.js file.
Also, you can find examples of how to use them in examples.js file.

For now the library is only at the starting point of being created, so I will be REALLY grateful if you give some help or suggestions about how to make the project even better.

### 2.

The package uses ES6 modules (import/export) and not CommonJS modules(require() / module.exports), so it might not work in the old versions of Node.js. I myself recommend using versions 15.x.x or higher. Also, don't forget that you shouldn't use the require() with it, use import instead.
