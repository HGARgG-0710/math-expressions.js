// TODO: finish this introduction note [later...];
/**
 * * math-expressions.js API source code, version 1.0 alpha (in work).
 * @copyright HGARgG-0710 (Igor Kuznetsov), 2020-2023
 */

export * from "./modules/macros.js"
export * from "./modules/instance.js"

// TODO [for versions >=1.1], pray create a 'returnless' (continuation-style-tailpipe-infinite-stack) version of the 'instance' function;
// * This way, for this thing, pray separate the 'returnless' version COMPLETELY into a different file [so that, one has the definition of it being one according...]


// * This is the [temporary] place in the file, where the presently considered OLD CODE goes;

// * A
// ! Old code for the [incomplete] definition of the 'numberCounter' [later used for the recursiveCounter]; The renewed code [in accordance with the general 'recursiveCounter' counter] is above;
// TODO: carefully revise, re-look, and do the stuff mentioned there that one desires for to; [Also, check correspondence with the newer version...]
// // TODO: when putting out into the higher scope [RESULT.submodules.infinite], pray generalize - not just these general array types and counters [these'd get used in this particular version...];
// // ? Keep these 2 as a part of 'submodules.infinite'?
// // * Decided: yes! Add them, here [when generalizing], pray replace with the general constructions for this stuff...
// const findDeepUnfilledNum = RESULT.submodules.infinite.generalSearch({
// 	genarrclass: RESULT.submodules.infinite.LastIndexArray({
// 		icclass: RESULT.submodules.infinite.InfiniteCounter(
// 			RESULT.submodules.infinite.arrayCounter()
// 		)
// 	}),
// 	soughtProp: (x) => typeof x === "number" && x < A.template.maxint
// }).function
// const findDeepUnfilledArr = RESULT.submodules.infinite.generalSearch({
// 	genarrclass: RESULT.submodules.infinite.LastIndexArray({
// 		icclass: RESULT.submodules.infinite.InfiniteCounter(
// 			RESULT.submodules.infinite.arrayCounter()
// 		)
// 	}),
// 	soughtProp: (x) =>
// 		x instanceof Array && x.length < A.template.maxarrlen,
// 	self: true
// }).function

// const findDeepLastNum = RESULT.submodules.infinite.generalSearch({
// 	genarrclass: RESULT.submodules.infinite.LastIndexArray({
// 		icclass: RESULT.submodules.infinite.InfiniteCounter(
// 			RESULT.submodules.infinite.arrayCounter()
// 		)
// 	}),
// 	soughtProp: (x) => typeof x === "number",
// 	reversed: true
// }).function

// ! OLD GENERAL NOTES [previously within the 'instance' function...]:

// ^ IDEA: class extensions;
// * These are just the same plain old classes, with the ability for user to arbitrarily extend them;
// * Everything - the defaults list, the methods list, can be changed, extended;
// todo: pray create a general structure for them and then re-do everything appropriate in a manner allowing for this particular kind of thing;
// ? Mayhaps, merge with the idea for inheritances-extensions of stuff like 'infinite'? [Been a todo there somewhere, pray find...]

// TODO: later, consider deeply the use of each and every type of abstraction/notation; Think through how things are affected by it...
// * Example: use of '() => {}' (arrow-functions), or 'function () {}' (plain anonymous functions); Or, use of 'class' or 'function'; Degree and cases of use of native JS 'this' variable...
//  And some such stuff... Pray consider

// TODO: work extensively on the general possibilities of each and every method/class within the library... make it possible to easily create most exotic manner of things with it...

// TODO [general]: change the stuff like 'function A (a) {return B({...sometemplatehere})(a)}' to 'const A = B({...sometemplatehere})'; In other words, use aliases for pre-computation of the values for things...

// todo [general]: ensure that all the defaults for ALL the [templated] functions configurable useing the 'templates'...

// TODO [general] : check the correspondence of use with the definition of the methods within the library...

// ! Clean-up later;
// [Parts of the Grand Cleanup]:
// % 1. (get rid of)/refactor the repeating notes;
// todo: work on the names for the objects in question [should this not be under the 'names' todo done before?]
// * That'd be the general structure of any templated method within the library...
// % 2. Notation/Conventions; [Currently - nigh the second biggest problem after not working code, one yet without a solution] Decide on notation and conventions - what should library use, where in particular;
// % 3. Generalization; Note completeion;
// * One completes all the notes, related to 'generalize'/'fix'/'complete', and so on... All the unfinished stuff that is separate of all else ['modular'], gets completed;
// % 4. Stuff related to forming the particular picture of the library in question...

// TODO: replace all the functional implementations of functions with imperative ones; for: 1. they may run forever; 2 [of which 1 is a consequence, really]. they do not rely on JS stack;
// * The functional ones get to be kept as a memento within the Git repo's memory...

// TODO [very-very general; later-stage]: Pray conduct a thorough read-through of all the code, once the in-editor documentation has been written and the first sketches has been written;
// * Also, note - base the new GitHub Wiki-documentation on the in-editor documentation...

// TODO [cleaning up]: create short-hands for things [where possible; stuff like 'this.this.this.this.class.template.class.template.icclass.comparison' don't get to be shortened (functional concerns)]...

// TODO: during the generalization procedures a lot of stuff have become terminally broken. Make another such "round" through the code, fixing anything that's broken due to generalizaiton [as always, probably won't fix all the cases, but some/most];

// TODO: think about errors - which, where, when and how to throw; What error messages, whether it could be generalized instead in a fashion that one would within one's chosen interpretation consider favorable, and on and on...

// TODO [general]: where appropriate, replace the native API usage with the library API usage...

// todo [general]: work on the lists of static methods for classes; Make implementation for them all...

// TODO: restore the old order of following within the library -- aliases, constants, classes, functions, one big export; Currently, it's a mess...
// TODO: compare the final '_ver10.mjs' file with the previous version 'math-expressions.js' file; make it a complete superset [if ever anything got completely thrown out - revive as a generalized version with an archaic special-case alias]

// TODO: work on the names a lot; make it sound plausible to oneself...
// TODO: work on the error messages...

// TODO: test this thouroughly [for every function, every class, check every possibility and write tests runnable by the user; run them, mr. flesh];
// TODO: add more default parameter values, make code look and be [whatever that for self would mean...] tidy and to one's complete liking...

// TODO: do micro-optimizations; Spend some time on making the code generally more performant [without sacrificing any of the style or shortness/simlicity of it, of course];

// TODO: read all the library's code all over and make it such as to be to one's liking -- utter and complete;
// * Get rid of unwanted explicit type conversions...
// * Get rid of unwanted "const"'s
// * Get rid of 'let's that can become 'const's [and one wants them to]
// * Get rid of 'const's that can become results of doing ((c1, ...) => {...[code]})(...arrOfPrevConsts);
// * Generalize the code [along with making it more compact], simplify constructs...

// * Make good use of stack; [Id est, try to save it; use elementary tools not relying upon it; This will allow to make better use of the methods, whose 'power/usefulness' relies upon the stack...]

// * Some general independant ideas to add to the project...
// ^ IDEA: perhaps, add a way of setting which methods should and which should not appear within a class???; thing like {[x: string]: [b: 0 | 1]}; if 0, delete, if 1 keep;

// TODO: after having finished most everything within the first prototype, pray create all manner of crazy beautiful ideas and scenarios of use to support for methods in question;
// * Generalize the stuff heavily; [ESPECIALLY] if the use of the methods/functions/classes/objects/structures/whatever in question within the library itself does not require it...

// todo: new things to add:
// * 1. more beautiful in their simplicity number-theoretic functions...;

// TODO: more things to do (generally; in a 'planned' order):
// * 1. Write the in-editor JSDoc documentation (most would, probably, be done from scratch...)...
// * 2. tidy up [round after round of read-through+change, with new notes and ideas, until one is happy enough to proceed further...] and, finally, test [implement the proper testing system for the user to have locally after having gotten the package...];

// TODO [general] : order things within the 'instance' function and the 'RESULT' definition in particularly;
// TODO [general] : pray fix all the names issues [take all the old names and replace them with new ones - same with the old methods definitions - renew, renew, renew!];

// TODO: rewrite the docs...
// ! Start by deleting the old docs [those that are completely off what the thing in question is about now...]; the rest - pray rewrite [either on-the-spot, or a tad later...]
// * Begin with small and simple stuff that's been mostly finished on conceptual level ; Things like copying functions, examplified...
// ^ IDEA: let each and every in-editor documentation bit possess a link to the definition of the thing in question [in GitHub repo, for instance???], along with the similar link to the GitHub Wiki-s and a brief unique description of its purpose [along with using full spectre of JSDoc notation, perhaps???];
// Wiki, then, would go into greater depths as to the purposes, possible uses, examples, definitions and technicalities of each and every abstraction in the question...
// * The Aliases would have the information going more like 'REFER TO: ...' or something; Just refering to the information from a different definition [not as convinient within the editor, though];

// TODO: create a function like (a: [key, value][]) => a.map(([key, value]) => [key, objInverse(value).toObject()]);
// * Would come in handy in one of one's projects...

// TODO: generalize further (f, obj, depth) => ... [would with depth 'depth', map 'f' to keys/values of an object...]

// TODO [general]: normalization of recurring name themes;
// * Similar to 'template:' label, normalize the names for the same things (like 'defstr' and 'defaultS' - let the library use one single convention in each such trivial case, to make it simpler);
