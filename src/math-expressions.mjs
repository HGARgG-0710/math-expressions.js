/**
 * * math-expressions.js API source code main file, version 1.0 alpha (in work).
 * @copyright HGARgG-0710 (Igor Kuznetsov), 2020-2023
 */

export * from "./modules/macros.mjs"
export * from "./modules/instance.mjs"
export * from "./modules/refactor.mjs"
export * from "./modules/transforms.mjs"
export * from "./modules/exports.mjs"

// TODO [for versions >=1.1], pray create a 'returnless' (continuation-style-tailpipe-infinite-stack) version of the 'instance' function;
// * This way, for this thing, pray separate the 'returnless' version COMPLETELY into a different file [so that, one has the definition of it being one according...]

// TODO: later, consider deeply the use of each and every type of abstraction/notation; Think through how things are affected by it...
// 		* Example: use of '() => {}' (arrow-functions), or 'function () {}' (plain anonymous functions); Or, use of 'class' or 'function'; Degree and cases of use of native JS 'this' variable...
// TODO [general]: change the stuff like 'function A (a) {return B({...sometemplatehere})(a)}' to 'const A = B({...sometemplatehere})'
// todo [general]: ensure presence of templates in all the independent library functions [MAKE THEM GENERAL];
// TODO [general]: check the correspondence of use with the definition of the methods within the library...
// TODO: replace all the functional implementations of functions with imperative ones; for: 1. they must be able to run forever; 2 [of which 1 is a consequence, really]. the must not rely on JS stack (except when necessary for refactoring/structure/recursion-in-structure purposes);
// * note: base the new GitHub Wiki-documentation on the in-editor documentation...
// TODO [cleaning up]: create short-hands for things [where possible; expressions akin to 'this.this.this.this.class.template.class.template.icclass.comparison' don't get to be shortened (functional concerns)]...
// TODO [general]: replace most (if not all) instances of native API usage with library API usage (excepting only the cases, when the library API is directly based off the native API);
// todo [general]: work on the lists of static/non-static methods of different library classes;
// * REMINDER: for fun - after having completed the library, pray compare its 1.0 version with the last one (v0.8);
// TODO: work on the errors, their messages, and the handling...
// TODO: test this thoroughly [for every function, class and method, check every possibility and write tests runnable by the user; run them; before doing so - re-assess the state of the abstraction in question];
// TODO: do micro-optimizations; Spend some time on making the code generally more performant [without sacrificing any of the style or shortness/simlicity of it, of course]; If necessary, rewrite methods completely from scratch;
// TODO: read all the library's code all over and make it such as to be to one's liking -- utter and complete;
// 		* Get rid of unwanted (and unneeded) explicit type conversions...
// 		* Get rid of unwanted "const"'s
// 		* Get rid of 'let's that can become 'const's [and one wants them to]
// 		* Get rid of 'const's that can become results of doing ((c1, ...) => {...[code]})(...arrOfPrevConsts);
// 		* Generalize the code [along with making it more compact], simplify constructs...
// * Make good use of stack; [Id est, try to save it; use elementary tools not relying upon it; This will allow to make better use of the methods, whose 'power/usefulness' relies upon the stack...]
// ? more beautiful-in-their-simplicity-and-usefulness-true-integer-based number-theoretic functions?
// TODO: Write the in-editor JSDoc documentation (don't use the JSDoc types, they're not effective in the present circumstances);
// TODO [general]: change the unwanted old names to something else;
// TODO: rewrite the docs...
// 		! start by reworking the old documentation greatly [look through the definitions find, bugged functions, mark them with 'BUGGED' in the GitHub Wiki-s];
// 		* let each and every in-editor documentation bit possess a link to the definition of the thing in question [GitHub repo], along with the similar link to the GitHub Wiki-s and a brief unique description of its purpose;
// 		Wiki, then, would go into greater depths as to the purposes, possible uses, examples, definitions and technicalities of each and every abstraction in the question...
// 		* The Aliases would have the information going more like 'REFER TO: ...' or something; Just refering to the information from a different definition [not as convinient within the editor, though];
// ? create a function like (a: [key, value][]) => a.map(([key, value]) => [key, objInverse(value).toObject()]);
// TODO: generalize further (f, obj, depth) => ... [would with depth 'depth', map 'f' to keys/values of an object...]
// TODO: generalize the above even further, at 'depth=Infinity', would do a complete recursive mapping;
// TODO [general]: normalization of recurring name themes;
// 		* Similar to 'template:' label, normalize the names for the same things (like 'defstr' and 'defaultS' - let the library use one single convention in each such trivial case, to make it simpler);
// TODO [generally]: pray ensure that the 'InfiniteCounter' uses '.compare' everywhere, instead of the 'template.comparison'; The '.compare' is supposed to be serving as the wrapper around it...
// * DECIDED [on names]: full words are preferred to shortenings and shortenings are preferred to abbreviations...
// 		One-worded names are preferred to all the other ones...
// 		flatcase (submodules, methods, varnames, general ids) is generally preferred to camelCase (methods, varnames), which is preferred to PascalCase ("classes" and some templated functions), which is prefereed to UPPERCASE, which is preferred to all else...
// 		TODO [general]: pray ensure that the desired naming conventions are implemented - walk through the code, seeking things unwanted and fix them... Create new things desired...
// TODO: after having finished the project's v1.0 [and written the documentation], pray work on creating some meaningful comments to it [notes, and such - point out certain perculiar aspects of the way that the code works...]
// ! Refactor the library hardcorely; use the 'refactor.mjs' far-reachingly;
// TODO [GENERAL] : add the ability for certain methods to take arbitrary number of arguments from the user... Let it use the '...something' operator for Arguments-to-Array conversion...
// 		Like the way one's done with the 'comparisons.valueCompare'...
// 		? Rewrite them to permit usage of GeneralArrays [arbitrarily long arguments sequences, that being]?
// 			^ Idea: what about the following - in the cases when there are at least 2 arguments necessary (as in valueCompare), the 1-lenghted arguments array will be reserved for the passed GeneralArray with multiple different values! [And it will be treated like the actual arguments list];
// ? [suggestion, under consideration...]: create a MultiGeneralArray, which [in essence], behaves exactly like the GeneralArray, but is "based" on it (has 'the same' methods set and template...) and allows for an infinite (arbitrary) number of counters [uses the MultiInfiniteCounter alternative...]
// TODO: expand the 'numeric' (in particular, with varying numeric systems...); generalize to a class for their arbitrary creation...
// ! REMINDER: a total consistency check across the entire library... [GRAND CLEANUP...]; Current code are all mere sketches, not yet functional [largely, only due to the faults in cross-referencing];
// Todo: [minor, general]: format the code manually;
// TODO: consider in some detail the list of the "leftover" arguments [the fast/range/comparison] + ensure their presence everywhere...; Look for vast generalization possibilities [so as not to trail them all around like that, maybe?...];
// ^ Decided: almost all the class methods within the library will return the instance ('return this.this.this'); This way, one is able to do things like 'a.b().c()...' without having to create copies all the time; Instead, they are assigned to the handler and the originals are disposed of;
// TODO [general]: after having finished the library and prepared it [mostly] for publication on GitHub, complete the messages/comments at the beginning of each one of the modules [clear all the TODOS, and unwanted comments, and so on...]; Make it perfect.
// TODO [general]: check that the code is sound '.function'-wise and 'this.this.this'-wise and that there is a unanimous approach to the thing...;
// TODO [later]: after all is done - relook through each and every file of the project feverishly, seek anything undone and uncompleted;
// TODO [later]: do some micro-optimizations of the library; Choose more memory- and time- performant solutions and native types, where possible;
// TODO [general]: create a proper '.copy' method for each and every class...
// TODO [generally]: make a one whole new round regarding the workability of the code, when having finished the generalization procedures, fix everything, tune everything totally...
// TODO [general]: do proper work on the functions' defaults;
// TODO [general]: add 'leftovers' all over the place (wherever possible and are not already templates present); 