# Math-expressions.js

Math-expressions.js is a JavaScript library, allowing you to work with mathematical expressions, statistics and 2D surfaces.
For now, the list of functions and classes provided is quite thin, but in the future library will become a REALLY powerful instrument to work with. And even now, when functionality is very limited, it's quite nice to use the lib.

## Installation

Math-expressions.js can be installed using node.js.
Install math-expressions.js using npm:

    npm install math-expressions.js

or

    npm i math-expressions.js

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
18. [leastCommonMultiple](#18leastcommonmultiple)

### 1.exp()

Firstly, it's the exp() function. With it you can execute a mathematical expression upon two numbers.
By default uses + operator.

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

This function takes an array of numbers and returns the biggest value from it.

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

This function allows you to factor out a number to the prime numbers. It might be VE-E-ERY handy, but not quite productive. That's why it takes not only a number, that shall be factored out, but also a boolean, representing the state of the function call(should or should it not be productive). If the number you try to factor out is bigger, than 10000, then I GREATLY recommend you to pass true as the second argument to the function, because without it function's running too slow. 

### 17.truncate()

Truncates a passed numeric array(the first parameter) by count of numbers, that is equal function's second parameter(it is a number) multiplied by 2. Array is being truncated from it's "edges"(only stated count of percents of the biggest and the smallest numbers are deleted).

#### Notice: 

Before truncating an array truncate() function sorts it from smallest to largest way.

### 18.leastCommonMultiple()

Finds the least common multiple between two numbers(first and second arguments) in given search range(third argument). Search range is not a number to which the search will be continued, it is a number of iterations, each of which similiar value is searched(100 by default). If the search range is too small, then returns null, otherwise the least common multiple.

## Classes

1. [Statistics](#1statistics)
2. [Surface](#2surface)
3. [Expression](#3expression)

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

Actually, Statistics.countOfElements property is just a copy of Array.length property of passed array, but I thought, that it might be useful for someone to have all this beautiful data and an array length property in one object.

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

#### Class Methods:

    Surface.prototype.inLimits(...dots: number[]): void
    Surface.prototype.dot(...dots: number[]): void
    Surface.prototype.line(...dots: number[]): void
    Surface.prototype.segment(...dots: number[]): void

### 3.Expression

Constructor of this class takes two arrays, one of which contains numbers of expression, that this object represents, other contains strings, containing operators of this expression.

#### Class Properties:

    Expression.nums: number[] | string[];
    Expression.operators: string[];

This class has no methods, but can be very comfortly used with functions, that work with math expressions.
They are exp(), sameOperator(), fullExp() and repeatExp().

## Note:

The full documentation for all of these functions and classes may be seen by you in the math-expression.js file.
Also, you can find examples of how to use them in examples.js file.

For now the library is only at the starting point of being created, so I will be REALLY grateful if you give some help or suggestions about how to make the project even better.
