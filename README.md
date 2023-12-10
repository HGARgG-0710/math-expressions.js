# math-expressions.js

math-expressions.js is a general-purpose abstract-type JavaScript programming library with a vast variety of covered areas of interest.

Amongst them are: very handy utilities, basic statistics, abstract objects,
orders, multi-dimensional arrays, equation parsing, unlimited recursion-based (including numeric) types
and highly configurable macros for elementary representations of powerful in-program
types based off the native JavaScript Objects;

The library's two ultimate goals are to provide to the user:

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

The current version (v1.0) is not built upon the concepts of
continuation-passing and tailpipe recursion, instead using the plain JS stack, so its present implementations' final
computational power is still (sadly) limited (so, the library's final objectives are still not quite yet reached);

There are, however, plans for the addition of this feature (and the consequent rewriting of the library)
in one of the nearest future versions.

## Installation

Math-expressions.js can be installed using npm.
Install math-expressions.js using npm:

    npm install math-expressions.js@[version]

## Documentation

<!-- * Planned: each version has its own documentation... Though stuff >= 0.8 is marked as 'not recommended for use (bugs)' -->

[Wikis on GitHub repo](https://github.com/HGARgG-0710/math-expressions.js/wiki)

The library also supports basic in-editor JSDoc documentation.

## Source

A brief repository organization guide:

<!-- * Funnote: later (when ready to publish on GitHub, and go write the docs) - count the definitions throughout the files; -->

-   src - source code directory
    -   math-expressions.js - the main exports file
    -   modules/ - directory with modules used by 'math-expressions.js'
        -   exports - directory with the contents of the library, divided into thematically decided submodules
            -   algorithms.mjs - various exportable algorithms, many used by the library itself
            -   aliases.mjs - collection of aliases for often-recurring (in practice) JS expressions
            -   comparisons.mjs - default comparisons provided by the library (sufficient for the proper handling most of the "casual" cases)
            -   counters.mjs - a file with "counters" definitions, they are 'generator-inverse-range' triples on which the InfiniteCounter type is based
            -   expressions.mjs - module for execution, as well as simple and convinient representation of arbitrary expressions using the user-defined table (historically, the origin of the library)
            -   multidim.mjs - module for general working with recursion, repeated function calls and multidimensional structures
            -   native.mjs - module with methods purposed for usage with the JS elementary types and abstractions
            -   numeric.mjs - short list of simple functions and utilities for working with different numeric writing systems and number-strings
            -   orders.mjs - set of methods for rapid and effective creation and property manipulation of order predicates and array-orders based off user arguments
            -   printing.mjs - general printing utilities for unlimited types
            -   structure.mjs - module for 'structures', recursive object-based user-defined structures useful for checking for different kinds of object-isomorphicity and immediate object-construction
            -   types.mjs - the main library module, contains types definitions
            -   variables.mjs - various
        -   instance.mjs - module with the 'instance' function, providing means of convinient import/manipulation of the library
        -   macros.mjs - module which provides exported macros (and which are also extensively used by the rest of the package's code)
        -   refactor.mjs - module, which was originally made for refactoring purposes
        -   transforms.mjs - module containing some transforms, that can be used with the 'instance' function's structure, so as to ease the user's experience in its structure manipulation
    -   test.mjs (file that executes the 'test's in a certain given order; based upon a local file ignored by the 'git')
-   tests/\* - the tests' directory, withing which for each and every abstraction and definition of the library, there is an individual test script (the examples.mjs)
-   README.mjs - this file
-   LICENSE - the MIT license

For examples of library's usage, one may want to see the 'tests' directory or the documentation.

## Modules

The package uses ES modules.

<!-- ? Why only them? It could also support the CommonJS modules...; -->
<!-- TODO: add support for those - after finishing the testing procedures, compile to CJS with tsc and then add the appropriate 'export-require' fields in the 'package.json', decide which extensions one'd rather use... -->

## Current Status

It is currently in development, so many things may (and most probably will) change.

The previous versions all had terrible amount of bugs due to not having been tested thoroughly enough (though later ones have slightly less...).

From version 1.0 onwards, one explicitly breaks backward compatibility for versions <=0.8, as well as all the future ones.
Each and every version is independent from all the others (so, one has to be extremely specific regarding the version of the package).

This way, one would not be 'bound' by keeping code that run on different version of the library alive, allowing for far more vast area of
experementation and new ideas.
