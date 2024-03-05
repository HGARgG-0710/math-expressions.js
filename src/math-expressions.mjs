/**
 * * math-expressions.js API source code main exported file, version 1.0alpha
 * @copyright HGARgG-0710 (Igor Kuznetsov), 2020-2024
 */

export * from "./modules/macros.mjs"
export * from "./modules/exports.mjs"

// TODO [for versions >=1.1], pray create a 'returnless' version of the library [NOTE: THE ISSUES THAT DO NOT RELATE TO THE JS Stack's finiteness (namely, the library-structure related must be solved first)];
// * This way, for this thing, pray separate the 'returnless' version COMPLETELY into a different part of the package [so that, one has the definition of it being one according...]

// ! replace all the functional implementations of functions with imperative ones; for: 1. they must be able to run forever; 2 [of which 1 is a consequence, really]. the must not rely on JS stack (except when necessary for refactoring/structure/recursion-in-structure purposes);
// ? Write the in-editor JSDoc documentation (don't use the JSDoc types, they're not effective in the present circumstances);
// TODO: rewrite the docs...
// 		! start by reworking the old documentation greatly [look through the definitions find, bugged functions, mark them with 'BUGGED' in the GitHub Wiki-s];
// 		* let each and every in-editor documentation bit possess a link to the definition of the thing in question [GitHub repo], along with the similar link to the GitHub Wiki-s and a brief unique description of its purpose;
// 		Wiki, then, would go into greater depths as to the purposes, possible uses, examples, definitions and technicalities of each and every abstraction in the question...
// 		* The Aliases would have the information going more like 'REFER TO: ...' or something; Just refering to the information from a different definition [not as convinient within the editor, though];
// TODO: work on creating some meaningful comments to the current version [notes, and such - point out certain perculiar aspects of the way that the code works...]
// TODO [GENERAL] : add the ability for certain methods to take arbitrary number of arguments from the user... Let it use the '...something' operator for Arguments-to-Array conversion...
// 		? Rewrite them to permit usage of GeneralArrays [arbitrarily long arguments sequences, that being]?
// 			^ Idea: what about the following - in the cases when there are at least 2 arguments necessary (as in valueCompare), the 1-lenghted arguments array will be reserved for the passed GeneralArray with multiple different values! [And it will be treated like the actual arguments list];
// TODO [general]: complete the messages/comments at the beginning of each one of the modules [clear all the TODOS, and unwanted comments, and so on...]; Make it all perfect.
// TODO [general]: do proper work on the functions' defaults;
