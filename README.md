# math-expressions.js

math-expressions.js is a general-purpose abstract-type JavaScript programming library with a vast variety of covered areas of interest.

Amongst them are: very handy utilities, abstract objects, large aliases space of common expressions,
orders, multi-dimensional arrays, equation parsing, unlimited recursion-based (including numeric) types
and highly configurable macros for elementary representations of powerful in-program
types based off the native JavaScript Objects;

The library's three ultimate goals are to provide to the user:

1. A complete abstract wrapper-interface, sufficient for
   working with various unlimited objects (and to provide an
   implementation of a type system with immidiate freedom of
   expression greater than that of native JavaScript).

2. A programmatic implementation of an interface for working with
   various elementary mathematical abstractions
   (such as orders, maps, numbers, sets) on a numerically unlimited
   level (which would effectively enable one to perform computations
   arbitrary in nature or in size, without having to alter one's
   code for it too greatly)

3. Creation of an alias-space allowing for a reduction of expression of
   most (if not all) trivial or frequent programmatic tasks' implementations
   in supported JavaScript environments to the functional-declaractive
   (or, at least, semi-functional-declarative) style utilizing nothing save
   for the elementarized library definitions and the property access operator '.'.
   Examples of the code in question can be found throughout the package's own code.

The current version (v1.0) is not built upon the concepts of
continuation-passing and tailpipe recursion, instead using the plain JS stack, so its present implementations' final
computational power is still (sadly) limited (so, the library's first two of the final objectives are, as of present, not quite yet reached);

There are, however, plans for the addition of this feature (and the consequent rewriting of the library)
in one of the nearest future versions.

Correspondently, some of the fundamental macro-API of it is not (as of yet) quite well-determeined, so may have a noticeable degree of 'edginess' and 'sketchiness' (which the future versions also aim to remedy). Although finally some aspects of its progress direction are already decided, the library still has a long way to develop.

Note: the v1.0 version is the very-very first major release. While employing the library anywhere in practice, it's important to understand that, despite far more extensive testing efforts than before (as well as better understanding of its purpose and goals), it still may have bugs, incompletenesses, some few doubtful early-stage design decisions and other such qualities which could prevent one to be able to apply it with the benefit of full usage of all its potential benefits. Between v1.0 and v1.1, intermediate releases related to fixing such small design difficulties or minor issues may be anticipated. Due to all that, the usage of the v1.0 is still (by far) not wholly recommended in applications where reliability, generality and speed are of any sufficient priority. (Particular difficulties are related to optimization matters.) Issues reports are appreciated.  

In view of all that, the present version ought be viewed as nothing more than a basic sketch of what the library intends to be in the future. 

## Installation

Math-expressions.js can be installed with npm.
Install math-expressions.js using npm:

    npm install math-expressions.js@[version]

## Documentation

<!-- * Planned: each version has its own documentation... Though stuff >= 0.8 is marked as 'not recommended for use (bugs)' -->

[Wikis on GitHub repo](https://github.com/HGARgG-0710/math-expressions.js/wiki)

The library also supports basic in-editor JSDoc documentation (as of present - yet undone).

## Source

A brief repository organization guide:

<!-- * Funnote: later (when ready to publish on GitHub, and go write the docs) - count the definitions throughout the files; -->

-   src - source code directory
    -   math-expressions.js - the main exports file
    -   modules/ - directory with modules used by 'math-expressions.js'
        -   exports - directory with the contents of the library, divided into thematically decided submodules
            -   algorithms.mjs - various exportable algorithms, many used by the library itself
            -   aliases.mjs - collection of aliases for often-recurring expressions
            -   comparisons.mjs - default comparisons provided by the library (sufficient for the proper handling most of the "casual" cases)
            -   counters.mjs - a file with "counters" definitions, they are 'generator-inverse-range' triples on which the InfiniteCounter type is based
            -   expressions.mjs - module for execution, as well as simple and convinient representation of arbitrary expressions using the user-defined table (historically, the origin of the library)
            -   native.mjs - module with methods purposed for usage with the JS elementary types and abstractions
            -   numeric.mjs - short list of simple functions and utilities for working with different numeric writing systems and number-strings
            -   orders.mjs - set of methods for rapid and effective creation and property manipulation of order predicates and array-orders based off user arguments
            -   predicates.mjs - module of predicates, frequently used throughout the library's code and in various applications of its contents (made largely for refactoring and repetitious code simplification/refactoring purposes);
            -   structure.mjs - module for 'structures', recursive object-based user-defined structures useful for checking for different kinds of object-isomorphicity and immediate object-construction
            -   types.mjs - the main library module, contains types definitions
            -   variables.mjs - various
        -   macros.mjs - module which provides exported macros (and which are also extensively used by the rest of the package's code)
    -   test.mjs (file that executes the 'test's in a certain given order; based upon a local file ignored by the 'git')
-   tests/\* - the tests' directory, withing which for each and every abstraction and definition of the library has a test (thematically ordered, some are identical to the source files' names); If you find documentation absent/confusing, this may be the place to check out for further explanation.
-   README.md - this file
-   LICENSE - the MIT license
-   todos.txt - text file with unfinished 'TODO's of more general nature
-   package.json - the JSON file with information needed by the npm
-   entities.txt - text file with library entities (possibly temporary)
-   currtodo.txt - file with currently considered development problems of the project (temporary)

For examples of library's usage, one may want to see the 'tests' directory or the documentation.

## Modules

The package uses ES modules.

<!-- TODO: add support for CommonJS modules - after testing, compile to CJS with tsc and add the appropriate 'export-require' fields into the 'package.json' file, decide which extensions one'd rather use... -->

## Current Status

It is currently in late-development, testing, documentation and polishing stages (v1.0).

The previous versions all had terrible amount of bugs due to not having been tested thoroughly enough (though later ones have slightly less...).

From version 1.0 onwards, oneself explicitly breaks backward compatibility for versions <=0.8, as well as all the future ones.
Each and every version is independent from all the others (so, one has to be extremely specific regarding the version of the package).

This way, one would not be 'bound' by keeping code that run on different version of the library alive, allowing for far more vast area of
experementation, new ideas, refactoring and code simplification. It also permits one to fix the elements of the library that are [for whatever reasons]
no longer seem as fit for further presence in it and generally stimulates a more fluid and creative development process.
