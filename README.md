# The official repository of expressions.js JavaScript library

## Functions

1. exp()
2. sameOperator()
3. fullExp()
4. repeatExp()
5. average()
6. min()
7. max()
8. middleNum()
9. mostPopularNum()
10. range()

### 1. exp()

Firstly, it's the exp() function. With it you can execute a mathematical expression upon two numbers.
By default uses + operator.

### 2. sameOperator()

This function allows you to perform an expression, that uses the same mathematic action, but different numbers.
By default uses + operator.

### 3. fullExp()

This function allows you to perform different mathematic actions upon a bunch of different numbers.
By default uses \*_ and _ operators.

### 4. repeatExp()

This function allows you to repeat an expression a bunch of times, then perform an ariphmetic
operation upon all of its results and return the final result.

### 5. average()

This function takes a numeric array and returns an average of all its values.

### 6. min()

This function takes an array of numbers and returns the least value from it.

### 7. max()

This function takes an array of numbers and returns the biggest value from it.

### 8. middleNum()

This function takes an array of numbers, which length must be odd, and returns the middle value from it.

### 9. mostPopularNum()

This function takes an array of numbers and returns one of them, that is the most frequent of all.

### 10. range()

This function takes an array of numbers and returns the residual between the max and the min values.

## Classes

1. Statistics

### 1. Statistics

Constructor of this class takes an array of numbers, creates a Statistics object and returns it.
This object has a statistic information about this array.
For now this class only has a constructor and properties.

#### Class Properties:

    Statistics.min: number;
    Statistics.max: number;

    Statistics.range: number;
    Statistics.averageNum: number;
    Statistics.arrLength: number;

    Statistics.middleNum: string | number;
    Statistics.mostPopularNum: string | number;

Actually, Statistics.arrLength property is just a copy of Array.length property, but I thought, that it might be useful for someone to have all this beautiful data and an array length property in one object.

## Note:

The full documentation for all of these functions and classes may be seen by you in the expression.js file.
Also, you can find examples of how to use them in examples.js file.

For now the library is only at the starting point of being created, so amount of its functionality is quite small.
But in future it will become much bigger and more useful.
