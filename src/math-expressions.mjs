/**
 * * math-expressions.js API source code main file, version 1.0 alpha (in work).
 * @copyright HGARgG-0710 (Igor Kuznetsov), 2020-2023
 */

export * from "./modules/macros.mjs"
export * from "./modules/refactor.mjs"
export * from "./modules/exports.mjs"

// TODO [for versions >=1.1], pray create a 'returnless' (continuation-style-tailpipe-infinite-stack) version of the 'instance' function;
// * This way, for this thing, pray separate the 'returnless' version COMPLETELY into a different file [so that, one has the definition of it being one according...]

// TODO: replace all the functional implementations of functions with imperative ones; for: 1. they must be able to run forever; 2 [of which 1 is a consequence, really]. the must not rely on JS stack (except when necessary for refactoring/structure/recursion-in-structure purposes);
// * note: base the new GitHub Wiki-documentation on the in-editor documentation...
// TODO [cleaning up]: create short-hands for things [where possible; expressions akin to 'this.this.this.this.class.template.class.template.icclass.comparison' don't get to be shortened (functional concerns)]...
// * REMINDER: for fun - after having completed the library, pray compare its 1.0 version with the last one (v0.8);
// TODO: test this thoroughly [for every function, class and method, check every possibility and write tests runnable by the user; run them; before doing so - re-assess the state of the abstraction in question];
// * Make good use of stack; [Id est, try to save it; use elementary tools not relying upon it; This will allow to make better use of the methods, whose 'power/usefulness' relies upon the stack...]
// ? Write the in-editor JSDoc documentation (don't use the JSDoc types, they're not effective in the present circumstances);
// TODO: rewrite the docs...
// 		! start by reworking the old documentation greatly [look through the definitions find, bugged functions, mark them with 'BUGGED' in the GitHub Wiki-s];
// 		* let each and every in-editor documentation bit possess a link to the definition of the thing in question [GitHub repo], along with the similar link to the GitHub Wiki-s and a brief unique description of its purpose;
// 		Wiki, then, would go into greater depths as to the purposes, possible uses, examples, definitions and technicalities of each and every abstraction in the question...
// 		* The Aliases would have the information going more like 'REFER TO: ...' or something; Just refering to the information from a different definition [not as convinient within the editor, though];
// TODO: after having finished the project's v1.0 [and written the documentation], pray work on creating some meaningful comments to it [notes, and such - point out certain perculiar aspects of the way that the code works...]
// TODO [GENERAL] : add the ability for certain methods to take arbitrary number of arguments from the user... Let it use the '...something' operator for Arguments-to-Array conversion...
// 		Like the way one's done with the 'comparisons.valueCompare'...
// 		? Rewrite them to permit usage of GeneralArrays [arbitrarily long arguments sequences, that being]?
// 			^ Idea: what about the following - in the cases when there are at least 2 arguments necessary (as in valueCompare), the 1-lenghted arguments array will be reserved for the passed GeneralArray with multiple different values! [And it will be treated like the actual arguments list];
// ^ Decided: almost all the class methods within the library will return the instance ('return this.this.this'); This way, one is able to do things like 'a.b().c()...' without having to create copies all the time; Instead, they are assigned to the handler and the originals are disposed of;
// TODO [general]: after having finished the library and prepared it [mostly] for publication on GitHub, complete the messages/comments at the beginning of each one of the modules [clear all the TODOS, and unwanted comments, and so on...]; Make it perfect.
// TODO [later]: after all is done - relook through each and every file of the project feverishly, seek anything undone and uncompleted;
// TODO [later]: do some micro-optimizations of the library; Choose more memory- and time- performant solutions and native types, where possible and desired, without style severing;
// TODO [general]: do proper work on the functions' defaults;