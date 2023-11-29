# math-expressions.js

math-expressions.js is a general-purpose abstract-type JavaScript programming library with a vast variety of covered areas of interest.

Amongst them are: very handy utilities, basic statistics, abstract objects, 
orders, multi-dimensional arrays, equation parsing, unlimited recursion-based (including numeric) types 
and highly configurable macros for elementary representations of powerful in-program 
types based off the native JavaScript Objects;

The library's two ultimate goals are to provide: 

1. A complete abstract wrapper-interface, sufficient for 
working with various unlimited objects (and to provide an 
implementation of a type system with immidiate freedom of 
expression greater than that of native JavaScript). 

2. An programmatic implementation of an interface for working with 
the most elementary mathematical abstractions 
(such as orders, maps, numbers, sets) on a numerically unlimited 
level (which would effectively enable one to perform computations
arbitrary in nature or in size, without having to alter one's 
code for it too greatly)

The current version (v1.0) is not built upon the concepts of 
continuations, instead using the plain JS stack, so its final 
computational power is still (sadly) limited (so, the library's final objectives are still not quite reached); 

There are, however, plans for the addition of this feature (and the consequent rewriting of the library)
in one of the nearest future versions. 

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

<!-- * Funnote: later (when ready to publish on GitHub, and go write the docs) - count the definitions throughout the files; -->
<!-- ! UPDATE THIS!!! Each and every file in the chain ought to have its purpose described here... -->

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
