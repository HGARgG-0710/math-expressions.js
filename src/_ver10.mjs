// TODO: finish this introduction note [later...];
/**
 * * API source code, version 1.0 alpha (in work).
 * @copyright HGARgG-0710 (Igor Kuznetsov), 2020-2023
 */

// Space for the local constants...
const ID = (a) => a

// TODO [most recent agenda]: WORK ON THE BASIC MODULE STRUCTURE...
// * Works like so - exports an 'activate' function returning the object of the module, on which the given transformation has first been applied; By default the transformation is 'id';
// The module
export function activate(transformation = ID) {
	const RESULT = {}

	// * PART OF THE CURRENT AGENDA:
	// [it'll be written here, at the top of the file, for the moment...]:
	// ? What is the agenda? As in, what does one want to do first? Many things to choose from...
	// * 1 [code re-styling, efficiency, minor bugfix, minor feature introduction]. Do the 'replace functional with imperative' todo, along the way fixing the stack and other problems [partially or fully...];
	// * 2 [cleaning] (in work). Continue with the 'templates' - that being, make it all nice and tidy, 1-variable object, that is then destructurized [like in the example below...];
	// * 	2.5. PLUS: go through all the 'make a template' kinds of todos, generalize completely...;
	// * 3 [code update, minor bugfix, tuning]. Look at the 'Pointer' code + IterArray [make them work well finally...];
	// * 4. Particular attention for the GeneralArray; Working on it further still... Finishing the sketched out methods implementations...;

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

	// TODO: create the structure for setting values to the arbitrary elements of the library.....
	// ^ IDEA: the library has one single big export of Module, which is an object; To it, a pre-transformation can be applied [so it can be used like so: 'import * as module from `math-expressions.js`; module.activate(transformation)'];
	// * By default, 'transformation=id';

	// todo [general]: make all the defaults for ALL the functions configurable useing the 'templates'...

	// TODO [general] : check the correspondence of use with the definition of the methods within the library...

	// [Parts of the Grand Cleanup]:
	// % 1. (get rid of)/refactor the repeating notes;
	// % 2. Form for the templates; All functions of the library have the same templates form; Example:
	// 		function X(template) {
	// 			return {tempalatelabelname: {...defaults, ...template} , thereturnedlabelname: ...}
	// 		}
	// todo: work on the names for the objects in question [should this not be under the 'names' todo done before?]
	// * That'd be the general structure of any templated method within the library...
	// % 3. Notation/Conventions; [Currently - nigh the second biggest problem after not working code, one yet without a solution] Decide on notation and conventions - what should library use, where in particular;
	// % 4. Generalization; Note completeion;
	// * One completes all the notes, related to 'generalize'/'fix'/'complete', and so on... All the unfinished stuff that is separate of all else ['modular'], gets completed;
	// % 5. Stuff related to forming the particular picture of the library in question...

	// TODO: replace all the functional implementations of functions with imperative ones; for: 1. they may run forever; 2 [of which 1 is a consequence, really]. they do not rely on JS stack;
	// * The functional ones ought to be then commented out and left as some sort of 'memento' (probably best if put into a different file, one separate from the lib source code...);

	// TODO [very-very general; later-stage]: Pray conduct a thorough read-through of all the code, once the in-editor documentation has been written and the first sketches has been written;
	// * Also, note - base the new GitHub Wiki-documentation on the in-editor documentation...

	// TODO [cleaning up]: create short-hands for things [where possible; stuff like 'this.this.this.this.class.template.class.template.icclass.comparison' don't get to be shortened (functional concerns)]...

	// TODO: during the generalization procedures a lot of stuff have become terminally broken. Make another such "round" through the code, fixing anything that's broken due to generalizaiton [as always, probably won't fix all the cases, but some/most];

	// TODO: think about errors - which, where, when and how to throw; What error messages, whether it could be generalized instead in a fashion that one would within one's chosen interpretation consider favorable, and on and on...

	// TODO [general]: where appropriate, replace the native API usage with the library API usage...
	// TODO [general]: use the introduced notation/aliases/shorthand-methods everywhere where want to...

	// todo [general]: work on the lists of static methods for classes; Make implementation for them all...

	// TODO [general; later-stage]: re-work the 'defaults' system; allow for setting a function for the default value of a certain variable for a function;
	// Used within the code like so: 'funcname(paramName=this.template.defaults.paramName())';
	// * There will be default settings for those default-functions... For them, pray use the currently decided stuff...

	// TODO: restore the old order of following within the library -- aliases, constants, classes, functions, one big export; Currently, it's a mess...
	// TODO: compare the final '_ver10.mjs' file with the previous version 'math-expressions.js' file; make it a complete superset [if ever anything got completely thrown out - revive as a generalized version with an archaic special-case alias]

	// TODO: work on the names a lot; make it sound plausible to oneself...
	// TODO: work on the error messages...

	// TODO: test this thouroughly [for every function, every class, check every possibility and write tests runnable by the user; run them, mr. flesh];
	// TODO: add more default parameter values, make code look and be [whatever that for self would mean...] tidy and to one's complete liking...

	// TODO: do micro-optimizations; Spend some time on making the code generally more performant [without sacrificing any of the style or shortness/simlicity of it, of course];

	// TODO: check that all the functions/classes/methods/definitions are exported properly; order stuff within the file to match the theme better; add micro-sections; make everything nicer, prettier, tidier...

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

	// TODO: use these as default arguments [where considered appropriate, that is];
	// TODO: create a function paramDecide(), that would wrap the function in question in the condition of certain kind, and if it is not fullfilled, call something else given instead...
	// TODO: create a derived function ensureParam(), that too would take a function, expected number of non-undefined args and a bunch of arguments (either an array of them, or directly -- just like that...); let it ensure that all the given arguments are non-undefined...; in case it is not so, call different given function;
	RESULT.MAX_ARRAY_LENGTH = 2 ** 32 - 1
	RESULT.MAX_INT = 2 ** 53 - 1

	// todo: new things to add:
	// * 1. more beautiful in their simplicity number-theoretic functions...;

	// TODO: things to do (generally):
	// * 1. Pick out the "too specific" or "number-oriented" methods and rewrite them to be more general; then, add a version for numbers (for backward compatibility),
	// *    or, just add the old alias (like in the case of sameOperator...)
	// *    1.1. Special cases of it:
	// *        1.1.1. repeatedArithmetic -- rename to repeated (add a ton of new possibilities of use for this...)
	// * 2. Write the in-editor JSDoc documentation (most would, probably, be done from scratch...)...
	// * 3. Make code more permissive (get rid of all the "safety" things, get rid of some of the Error throws -- replace them with special function values, where want to);
	// * 4. Simplify and generalize function argument lists; get rid of booleans functions of which can be subsued by the default values of the other parameters without loss of generality... Add more arbitrary-length spread arguments;
	// * 5. After having finished all else, pray do check that all the things that are being wanted to be exported are, in fact, being exported...
	// * 6. tidy up [round after round of read-through+change, with new notes and ideas, until one is happy enough to proceed further...] and, finally, test [implement the proper testing system for the user to have locally after having gotten the package...];

	// Global variables

	/**
	 *
	 * * This variable characterizes how many fixed numbers are outputted.
	 * * You can change it freely using setPrecision() function, if you want a more "precise" output of some of the functions.
	 */
	// ? create various numeric constants within the library (besides, some of ones functions' definitions may use it;)...
	RESULT.globalPrecision = 16

	// Defaults

	// ? Add more stuff here? (This table is supposed to be like a small calculator for binary things...)
	// TODO: change the architecture of these tables -- they should contain information concerning the Arity of the stuff that is within them...
	// * That is one's solution to the problem of the "all functions that work with them currently support only binary operations..., et cetera"
	// TODO: use this thing as the default for the functions using these kinds of tables...
	RESULT.defaultTable = {
		"+": [(a, b) => realAddition(a, b)[0], 2],
		"-": [(a, b) => realAddition(a, -b)[0], 2],
		"/": [(a, b) => a / b, 2],
		"*": [(a, b) => a * b, 2],
		"**": [(a, b) => a ** b, 2],
		"^": [(a, b) => a ** b, 2],
		xor: [(a, b) => a ^ b, 2],
		">>": [(a, b) => a >> b, 2],
		"<<": [(a, b) => a << b, 2],
		"&": [(a, b) => a & b, 2],
		"|": [(a, b) => a | b, 2],
		"%": [(a, b) => a % b, 2],
		"&&": [(a, b) => a && b, 2],
		"||": [(a, b) => a || b, 2]
	}

	RESULT.defaultAlphabet = [
		"0",
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
		"a",
		"b",
		"c",
		"d",
		"e",
		"f",
		"j",
		"h",
		"i",
		"j",
		"k",
		"l",
		"m",
		"n",
		"o",
		"p",
		"q",
		"r",
		"s",
		"t",
		"u",
		"v",
		"w",
		"x",
		"y",
		"z",
		"A",
		"B",
		"C",
		"D",
		"E",
		"F",
		"J",
		"H",
		"I",
		"J",
		"K",
		"L",
		"M",
		"N",
		"O",
		"P",
		"Q",
		"R",
		"S",
		"T",
		"U",
		"V",
		"W",
		"X",
		"Y",
		"Z"
	]

	// Submodules
	// TODO: that's where the 'returnless' is going...

	// * IDEA to the organization of the duality of library's codebase: have a finite version of something, then precisely after it, a definition of infinite.[thing's name] -- its infinite counterpart; For stuff that don't have an explicit finite/infinite counterpart it is left alone/put into the original definition of the 'infinite'
	// ^ These ones would use templates + general version of InfintieArray/InfiniteMap
	RESULT.infinite = {
		// TODO: pray order the definitions within the 'infinite' object;

		// TODO [about GeneralArray; come back a tad later]: isEnd must work differently... it ought to rely on index and array, not the value of it; this way far more general... [must work like in the IterArray]

		// ^ IDEA [for a solution; about the 'elem' method for assigning an array element to an index]: give the methods in question [special cases of GeneralArray] the access to the index generator in question [the template ones];
		// TODO: create a MultiGeneralArray, which [in essence], behaves exactly like the GeneralArray, but is "based" on it (has 'the same' methods set and template...) and allows for an infinite number of counters [uses the MultiInfiniteCounter alternative...]
		GeneralArray(template) {
			// TODO: complete the GeneralArray algorithms!
			const B = {
				template: {
					empty: [],
					isEnd: template.isUndefined,
					...template
				},
				static: {
					// * Just a convinient static [instance-independent, id est] alias for creation of an 'empty' array...
					// ! PROBLEM : the definition of the 'empty' array DOES in the end depend upon the instyance of the class in the question!!!
					// This is because explicit changes to the decided reference for the template object "this.this.this.this.class" would alter the template as well!
					// ^ SOLUTION [sort of]: keep the both of them...
					// ? PROBLEM [2] : which one of the two should be used for creation of the 'empty' array by default???
					// * Perhaps, one'd just let the user choose??? Think about it deeply, pray ...
					// ^ SOLUTION [complete] : The instance version would be just an alias for the static version, with itself corresponding to the local [instance's] reference to the template in the question;  just keep the instance's, with an appropriate generalization
					// pray clear these notes after having commited them at least once and done the stuff outlined in them...
					empty(template) {
						return this.this.class(template).class()
					}
				},
				class: function (template) {
					// TODO: the decided templates shape - {...defaults, ...usertemplate, ...overrides}; (Like here...) Pray ensure it...
					// ! DECISION: never override the user input; Allow for user to manually interfere with the library's workflow [there's essentially no one 'intended' workflow...]...
					// Id est, 'overrides = {}' is ALWAYS true; Ensure that as well...
					return {
						template: {
							isLabel: false,
							label: "",
							class: this,
							...template
						},
						class: function (
							array = this.template.class.template.empty
						) {
							// TODO: ensure that all the objects within the library possess this style [uniformity; so that it's more intuitive to work with (under certain particular interpretation of 'intuitive' + it has more features...)]; Allows for changing the 'this' dynamically easily [something that plain JS 'this' don't really allow];
							const A = { class: this }
							A.this = {
								array: array,
								currindex:
									this.template.class.template.icclass.class(),
								next() {
									return (this.this.this.currindex =
										this.this.this.currindex.next())
								},
								previous() {
									return (this.this.this.currindex =
										this.this.this.currindex.previous())
								},
								// ? Do the same thing with the 'currelem' as with the '.length()' (the 'get-set-object' kind of structure???)?
								get currelem() {
									// ^ CONCLUSION: yes, let it be; All the user-functions would have access to the entirety of the object's properties...
									// todo [general] : pray do just that...
									return (
										this.this.this.this.class.template.isLabel
											? (x) =>
													x[
														this.this.this.this.class
															.template.label
													]
											: RESULT.id
									)(
										this.this.this.this.class.template.class.template.elem(
											this.this.this,
											this.this.this.this.class.template.class.template.isUndefined(
												this.this.this
											)
										)
									)
								},
								set currelem(newval) {
									// % note: for thigs to work here properly for both the non-labeled arrays, one ought to have the 'newvalue' method being such as to set the value to an index regardless of whethere it is or is not undefined...
									if (
										!this.this.this.this.class.template
											.isLabel ||
										this.this.this.this.class.template.class.template.isUndefined(
											this.this.this
										)
									)
										return this.this.this.this.class.template.class.template.newvalue(
											this.this.this,
											(this.this.this.this.class.template
												.isLabel
												? Pointer({
														label: this.this.this.this
															.class.template.label
												  })
												: RESULT.id)(newval)
										)

									return (this.this.this.this.class.template.class.template.elem(
										this.this.this
									)[this.this.this.this.class.template.label] =
										newval)
								},
								// * For loops; Allows to loop over an array, with a changing index; Usage examples may be found across the default GeneralArray methods definitions:
								// * pray notice, that '.full()' changes the 'this.object.currindex' by default, whilst
								loop: function (template) {
									// ? Generalize to a separate class???
									const a = {
										template: {
											indexiter: (x) => x.object.next(),
											end: this.this.this.this.class.template
												.isEnd,
											icclass:
												this.this.this.this.class.template
													.class.template.icclass,
											...template
										},
										object: this.this.this,
										restart: function () {
											this.counter = a.template.icclass.class()
										},
										yield: function (
											_indexiter = this.template.indexiter,
											end = this.template.end,
											iter = true
										) {
											const isend = end(this.object)
											if (!isend && iter) {
												_indexiter(this)
												this.counter = this.counter.next()
											}
											return isend
										},
										_full(
											each,
											iter = RESULT._const(
												this.template.indexiter
											),
											end = RESULT._const(this.template.end),
											// todo: for '._full()' and 'full()', pray make a templated default for that thing...
											begin = (x) => x.object.begin()
										) {
											const index = this.object.currindex
											begin(this)
											let r = undefined
											let is = this.yield(null, end(), false)
											while (!is) {
												r = each(this, r)
												is = this.yield(iter(), end())
												if (this.broke) break
											}
											this.restart()
											this.broke = false
											this.object.currindex = index
											return r
										},
										// * The difference between '.full()' and '._full()' is that the former is based on later and allows for 'break' and 'continue'...
										// TODO: work on their names...
										// TODO: generalize to a function for a truly general loop (the 'while', that'd use this system for the 'separation' of an iteration into a GeneralArray of functions suceptible to inner 'this.break()' or 'this.continue()' calls...)
										full(
											each = this.template.each,
											iter = RESULT._const(
												this.template.indexiter
											),
											end = RESULT._const(this.template.end),

											begin = (x) => x.object.begin()
										) {
											const index = this.object.currindex
											begin(this)
											let r = undefined
											// * Having done that, the problem appears to be [largely] solved...
											// ? Question: does one really want to do that 'dissolve generalLoop' thingy??? Pray think on it...
											let is = this.yield(null, end(), false)
											while (!is) {
												const x = each(this)
												let goOn = true
												r = x.loop()._full(() => {
													if (goOn) {
														if (
															this.broke ||
															this.continued
														) {
															goOn = false
															return
														}
														return x.currelem()
													}
												})
												is = this.yield(iter(), end())
												if (this.broke) break
												goOn = true
												this.continued = false
											}
											this.restart()
											this.broke = false
											this.object.currindex = index
											return r
										},
										break: function () {
											this.broke = true
										},
										continue: function () {
											this.continued = true
										},
										broke: false,
										continued: false
									}
									a.restart()
									return a
								},
								// ! shorten the code with these 3...
								begin() {
									// TODO [general]: use '_const' where want to...
									return this.this.this.go(
										this.this.this.init(),
										RESULT._const(true)
									)
								},
								// * NOTE: the '.length()' is NOT the last '!isEnd'-kind-of index, but the one after it...
								end() {
									// * skipping the check because one knows that it would be 'true' anyway...
									return this.this.this.go(
										this.this.this.length().get().previous(),
										RESULT._const(true)
									)
								},
								init() {
									return this.this.this.this.class.template.class.template.icclass.class()
								},
								// * A far simpler, yet non-slowed down for corresponding tasks, direction independent alternative to '.move';
								// Note, that 'move' hasn't a 'range' check; it is purposed to work with properties of indexes; [For instance, walk a sub-array of an array with the same cardinality as some particularly chosen array, or some such other thing...]
								go(
									index,
									range = this.this.this.this.class.template.class
										.template.icclass.template.range
								) {
									if (!range(index))
										throw new RangeError(
											"Range error in the '.go' method 'index' argument whilst calling."
										)

									return (this.this.this.currindex = index)
								},
								// ? What about static methods??? Make this thing [other such similar ones???] static, rewrite in terms of the static class member?

								// TODO: pray decide about the question of dependence/independence of methods from mutual definition...
								// * For instance, if one has a thing relying on another thing, should user's interference with the definition also affect the behaviour of the thing that relies on it??? Or should contents of definitions be copied to their dependencies instead??? If so, pray create some general mechanism for organization of that manner of a procedure...
								move(
									index,
									preface = () => {},
									comparison = this.this.this.this.class.template
										.class.template.icclass.template.comparison,
									each = (x) => x.next(),
									stop = (x) =>
										comparison(x.length().get(), x.currindex)
								) {
									preface(arguments, this.this.this)
									while (
										!comparison(
											this.this.this.currindex,
											index
										) &&
										!stop(this.this.this)
									)
										each(this.this.this)
									return this.this.this.currindex
								},
								moveforward(
									index,
									begin = false,
									comparison = this.this.this.this.class.template
										.class.template.icclass.template.comparison,
									stop = (x) =>
										comparison(x.length().get(), x.currindex)
								) {
									return this.this.this.move(
										index,
										(args, x) => {
											if (begin) x.currindex = x.init()
										},
										comparison,
										(x) => x.next(),
										stop
									)
								},
								// TODO [GENERAL]: work on the order of arguments of various methods and functions... Update things in correspondence with them.
								movebackward(
									index,
									end = false,
									comparison = this.this.this.this.class.template
										.class.template.icclass.template.comparison,
									stop = (x) => comparison(x.currindex, x.init())
								) {
									return this.this.this.move(
										index,
										(args, x) => {
											if (end) x.currindex = x.length().get()
										},
										comparison,
										(x) => x.previous(),
										stop
									)
								},
								movedirection(
									index,
									comparison = this.this.this.this.class.template
										.class.template.icclass.template.comparison,
									stop
								) {
									return this.this.this.currindex.compare(index)
										? this.moveforward(
												index,
												false,
												comparison,
												(stop =
													stop ||
													((x) =>
														comparison(
															x.currindex,
															x.length().get()
														)))
										  )
										: this.movebackward(
												index,
												false,
												comparison,
												(stop =
													stop ||
													((x) =>
														comparison(
															x.currindex,
															x.init()
														)))
										  )
								},
								jump(
									index,
									comparison = this.this.this.this.class.template
										.class.template.icclass.comparison,
									range = this.this.this.this.class.template.class
										.template.icclass.range
								) {
									return (this.this.this.currindex =
										this.this.this.currindex.jumpDirection(
											index,
											comparison,
											range
										))
								},
								/**
								 * * Hello, Wilbur!
								 * ? Does that thing work even???
								 * * might...
								 * TODO: pray check if these kinds of 'nested'ly stuctured objects' methods even get their in-editor JSDoc documentation properly... [Quite a jolly surprise if they do!]
								 */
								read(
									index,
									fast = false,
									range = this.this.this.this.class.template.class
										.template.icclass.template.range,
									comparison = this.this.this.this.class.template
										.class.template.icclass.template.comparison
								) {
									const ind = this.this.this.currindex
									if (fast) this.this.this.go(index, range)
									else
										this.this.this.moveforward(
											index,
											true,
											comparison
										)
									this.this.this.currindex = ind
									const c = this.this.this.currelem
									return c
								},
								write(
									index,
									value,
									fast = false,
									range = this.this.this.this.class.template.class
										.template.icclass.template.range,
									comparison = this.this.this.this.class.template
										.class.template.icclass.template.comparison
								) {
									const ind = this.this.this.currindex
									if (fast) this.this.this.go(index, range)
									else
										this.this.this.moveforward(
											index,
											true,
											comparison
										)
									const returned = (this.this.this.currelem =
										value)
									this.this.this.currindex = ind
									return returned
								},
								length() {
									// ? QUESTION: does one want the '.length().get' to work like a function [current - finding the length]; or like a static value changed by transformations?
									// * pray think on it...
									// ? QUESTION: now that one has gotten rid of all the ridiculous stuff regarding the .begin, .end, 'comparisons' and yada yada yada, won't one come back to the previous .length model???
									return {
										object: () => this.this.this,
										get: () => {
											const index = this.this.this.currindex
											this.this.this.begin()
											while (
												!this.this.this.this.class.template.class.template.isEnd(
													this.this.this
												)
											)
												this.this.this.next()
											const returned = this.this.this.currindex
											this.this.this.currindex = index
											return returned
										},
										set: (
											value,
											comparison = this.this.this.this.class
												.template.class.template.icclass
												.template.comparison,
											range = this.this.this.this.class
												.template.class.template.icclass
												.template.range
										) => {
											if (!range(value))
												throw new RangeError(
													"Index range error for array length setting"
												)

											if (
												comparison(
													this.this.this.length().get(),
													value
												)
											)
												return

											if (
												this.this.this
													.length()
													.get()
													.compare(
														value,
														undefined,
														() => true
													)
											) {
												// Decrease the length
												this.this.this.deleteMult(
													this.this.this.init(),
													this.this.this
														.length()
														.get()
														.jumpDirection(
															this.this.this
																.length()
																.get()
																.difference(value)
														)
												)
											} else {
												// Increase the length
												// TODO: finish the sketch...
												// * Sketch: .pushback() some 'default()' element(s) [settable as a default-template by the user] for the required number of items...
												// The number of items is supposed to be given by the InfiniteCounter.difference(ic) method... would essentially take an 'InfiniteCounter' instance, find the difference between it and the current index;
												// * note: the returned difference would be non-absolute and by the chosen generator, that being, one would 'jump' on the appropritate number of times;
											}
										}
									}
								},
								// TODO: implement the sketches of the algorithms listed here...
								// TODO[old, vague; later, when feel like partially solved - remove]: there are a lot of tiny-details-inconsistencies of conventional nature. Resolve them. Decide how certain things handle certain other things particularly.

								// TODO: get rid of all the methods that employ use of self-copying; Let all the present methods all work on-self; Then, there'd be [separately], the copying method;
								// * Yes, do that!!! One then could do: 'arrobj.this.copy()....(whatever method one desires to have...)';
								// ... Now having thought about that a bit ... Perhaps, one does want to keep these methods after all??? But on a different basis - the reverse of the current situation...
								// ^ IDEA [for a solution] : create a single method .copied, taking one argument - the method decided, which'd do 'const c = this.this.this.copy(); c[method]; return c;'
								// * The ones 'copying' methods, on the other hand, that are more naturally [minimalistically, id est] defined in this fashion [excellent example - .appendfront()], get to have their own identifiers...
								// * In process of being done; once has been, delete these notes...
								appendfront(x) {
									const newArr = this.this.this.empty()
									newArr.pushback(x)
									return newArr.concat(this.this.this)
								},
								copied(
									method,
									_arguments = [],
									f = RESULT.id,
									fast = false,
									range = this.this.this.this.class.template.class
										.template.icclass.template.range,
									comparison = this.this.this.this.class.template
										.class.template.icclass.template.comparison
								) {
									const c = this.this.this.copy(
										f,
										fast,
										range,
										comparison
									)
									c[method](..._arguments)
									return c
								},
								// ! Leftovers of a note... [DO NOT DELETE YET!!! KEEP FOR NOW, ONLY WHEN WRITING DOCUMENTATION AND CLEANING UP]
								// Shape of the modifiable 'this' objects...
								// const A = {this: {...[the actual object]}}; A.this.reference = A.this;
								// * The user would access the object by means of 'obj.this';
								// TODO: after having semi-completed the first stage of prototyping the library's contents and architechture, pray create the documentation for all that stuff...
								// TODO: spread this 'this.this.this' architecture throughout the project...
								pushback(
									value,
									fast = false,
									range = this.this.this.this.class.template.class
										.template.icclass.template.range,
									comparison = this.this.this.this.class.template
										.class.template.icclass.template.comparison
								) {
									return this.this.this.write(
										this.this.this.length().get(),
										value,
										fast,
										range,
										comparison
									)
								},
								pushfront(
									value,
									fast = false,
									range = this.this.this.this.class.template.class
										.template.icclass.template.range,
									comparison = this.this.this.this.class.template
										.class.template.icclass.template.comparison
								) {
									return (this.this.this =
										this.this.this.appendfront(
											value,
											fast,
											range,
											comparison
										))
								},
								// TODO: think deeply on the return values for the GeneralArray algorithms...
								concat(
									array,
									fast = false,
									range = this.this.this.this.class.template.class
										.template.icclass.template.range,
									comparison = this.this.this.this.class.template
										.class.template.icclass.template.comparison
								) {
									// ? This thing:
									// (t) =>
									// 		copied.pushback(
									// 			t.object.currelem,
									// 			fast,
									// 			range,
									// 			comparison
									// 		)
									// ? Appears rather frequently through this GeneralArray's implementation....
									// * Pray generalize;
									// todo: create a plausible to oneself a way for doing it...
									// ? Make a static generalized template??? Like it
									// ^ IDEA: make the 'fast' a template argument - let the functions change in accordance with it... Change the structure [AGAIN....]
									return array
										.loop()
										._full((t) =>
											this.this.this.pushback(
												t.object.currelem,
												fast,
												range,
												comparison
											)
										)
								},
								empty(
									template = this.this.this.this.class.template
								) {
									return this.this.this.this.class.template.class.static.empty(
										template
									)
								},
								copy(
									f = ID,
									fast = false,
									range = this.this.this.this.class.template.class
										.template.icclass.template.range,
									comparison = this.this.this.this.class.template
										.class.template.icclass.template.comparison
								) {
									const copied = this.this.this.empty()
									this.this.this
										.loop()
										._full((t) =>
											copied.pushback(
												f(t.object.currelem),
												fast,
												range,
												comparison
											)
										)
									return copied
								},
								slice(
									begin = this.this.this.init(),
									end = this.this.this.length().get(),
									fast = false,
									range = this.this.this.this.class.template.class
										.template.icclass.template.range,
									comparison = this.this.this.this.class.template
										.class.template.icclass.template.comparison
								) {
									if (!range(end))
										throw new RangeError(
											"Bad range in the 'end' argument passed to the 'GeneralArray.slice()' function call!"
										)

									// TODO: generalize the uses of the 'this.this.this.empty'... in accordance with the newly created implementation...
									const sliced = this.this.this.empty()

									this.this.this.loop()._full(
										(t) =>
											sliced.pushback(
												t.object.currelem,
												fast,
												range,
												comparison
											),
										undefined,
										// ? QUESTION: should one use '.compare + same InfiniteCounter' or 'comparison()'???
										// TODO: decide generally.... Also, decide about inclusiveness/exclusiveness of indexes used within the algorithms' implementations in question...
										// * Currenty, inclusiveness is more prevalent...
										RESULT._const((t) =>
											end.compare(t.object.currindex)
										),
										(t) => {
											t.object.begin()
											t.object.go(begin, range)
										}
									)
									return sliced
								},
								fillfrom(
									index,
									value,
									range = this.this.this.this.class.template.class
										.template.icclass.template.range
								) {
									// * This could be re-implement thing using '.project() + InfiniteCounter.difference() + Creating an empty GeneralArray...'
									// ? Does one want to ??? Pray think on it...
									this.this.this.go(index, range)
									while (
										!comparison(
											this.this.this.currindex,
											this.this.this.length().get().previous()
										)
									) {
										this.this.this.currelem = value
										this.this.this.next()
									}
								},
								convert(
									templates = [
										this.this.this.this.class.template.class
											.template,
										this.this.this.this.class.template
									],
									fast = false,
									range = templates[0].icclass.template.range,
									comparison = templates[0].icclass.template
										.comparison
								) {
									const newArr = RESULT.GeneralArray(templates[0])(
										templates[1]
									)()
									this.this.this
										.loop()
										._full((t) =>
											newArr.pushback(
												t.object.currelem,
												fast,
												range,
												comparison
											)
										)
									return newArr
								},
								delete(
									index,
									fast = false,
									range = this.this.this.this.class.template.class
										.template.icclass.template.range,
									comparison = this.this.this.this.class.template
										.class.template.icclass.template.comparison
								) {
									return this.this.this.deleteMult(
										index,
										index,
										fast,
										range,
										comparison
									)
								},
								deleteMult(
									startindex,
									endindex = startindex,
									fast = false,
									range = this.this.this.this.class.template.class
										.template.icclass.template.range,
									comparison = this.this.this.this.class.template
										.class.template.icclass.template.comparison
								) {
									return (this.this.this = this.this.this
										.slice(
											this.this.this.init(),
											startindex.previous(),
											fast,
											range,
											comparison
										)
										.concat(
											this.this.this.slice(
												endindex.next(),
												fast,
												range,
												comparison
											)
										))
								},
								projectComplete(
									array,
									index,
									fast = false,
									range = this.this.this.this.class.template.class
										.template.icclass.template.range,
									comparison = this.this.this.this.class.template
										.class.template.icclass.template.comparison
								) {
									const _index = this.this.this.currindex
									this.this.this.go(index, range)
									array.loop()._full((t) => {
										this.this.this.write(
											this.this.this.currindex,
											t.object.currelem,
											fast,
											range,
											comparison
										)
										this.this.this.next()
									})
									this.this.this.currindex = _index
								},
								// TODO: add appropriate leftover arguments everywhere [the fast/range/comparison]...
								// TODO: expand the list of those arguments; Look for vast generalization possibilities;
								projectFit() {},
								insert(index, value) {
									// * sketch [not the actual code]:
									// * 1. this = this.slice(index, indexgenerator(index)).concat(new GeneralArray(...)(value)).concat(this.slice(indexgenerator(index)));
								},
								// TODO: later, rewrite in terms of the 'indexesOf' function...
								has(x) {
									// ? generalize this double-array construction
									// * Old;
									// let c = [this.array.currindex, this.array.currelem]
									// let u
									// while (!comparison(c[1], x) && (u = !isEnd(c[1])))
									// 	c = this.array.next()
									// return u
									// * Sketch [not the actual code]:
									// * return this.firstIndex(x) == someUnFoundConstantPrayChooseItAlready;
								},
								// * Just an alias...
								index(i) {
									return this.this.this.read(i)
								},
								// * Write in terms of 'firstIndex' + 'slice'; just collect the indexes from corresponding index (found index) after having pushed it to the GeneralArray of the indexes of the same type, then return the result...
								indexesOf(x) {
									// * Sketch [perephrase of what's above...; not actual code]:
									// TODO: problem: decide how to [generally] define an empty array...
									// * 1. let newarr = GeneralArray(...)([]);
									// * 2. let curr
									// * 3. while ((curr = this.firstIndex(x)) != someUnfoundConstantToBeChosen)
									// * 4. 	newarr.push(curr)
									// * 5. return newarr
								},
								// ? Question[1]: should one template all the methods of this class?
								// ? Question[2]: should one add a (potentially, a template?) 'comparison' defaulting to the class's/instance's comparison[s]?
								// * Something like 'comparison = this.comparison || this.class.comparison'?
								firstIndex(x) {
									// * Sketch:
									// * 1. Run through the array, checking for whether current element 'is' x, via the 'comparison';
									// * 2. On find [from within the loop], return the 'currindex';
									// * 3. On failure [outside the loop], return the 'unfoundConstant';
								},
								shiftForward(times, generator, baseelem) {
									// * Sketch [change the '[]' for GeneralArray constructor]:
									// * 1. return [baseelem].repeat(times, generator).concat(this);
								},
								shiftBackward(times, generator) {
									// * Sketch:
									// * 0. let curr;
									// * 1. while (!comparison(curr = generator(curr), times))
									// * 2. 	this = this.slice(indexgenerator(this.array.initindex))
								},
								// ? Again, the question about the 'comparison'; it probably alludes to all the methods that use it...
								repeat(times, generator) {
									// * Sketch [not the actual code]:
									// * 1. let newarr = GeneralArray(...)()
									// * 2. let curr = generator()
									// * 3. do {curr = generator(curr); newarr.concat(this)} while (!comparison(curr, times));
									// * 4. return newarr
								}
								// TODO: pray add more new algorithms here...
							}
							A.this.this = A
							return A
						}
					}
				}
			}
			B.static.this = B
			return B
		},

		// TODO: give a better name to this thing... After having generalized the 'numberCounter', maybe call it that...
		// ? Question: generalize for an arbitrary combination of 'range + conversion function'; here, they are native JS - namely '!isNaN + Number';
		// * Pray think on it as well...
		// todo: CHANGE THE USES OF THE fromNumber() TO 'InfiniteCounter(number())(thing).map(someothertemplate)';
		number(template) {
			return {
				template: { start: 0, ...template },
				generator(x = this.template.start) {
					return Number(x) + 1
				},
				inverse(x = this.template.start) {
					return Number(x) - 1
				},
				range: RESULT.negate(isNaN)
			}
		},

		PointerArray(template) {
			return {
				template: { label: "", ...template },
				function: function (iterarr) {
					let newiterarr = iterarr.class.template.class.class()
					iterarr.loop()._full(() => {
						// ! Pointer and PointerArray have the same template [again!]
						// * Pray, when working on the templates of all the templated functions/classes, create the corresponding template connections; Simplify small things such as this here...
						newiterarr.currelem = Pointer({
							label: this.template.label
						})(iterarr.currelem)
					})
					// ? Is that [the copying of the .class] required for it to work properly??? Pray check... Oughta be
					newiterarr.class = flatCopy(newiterarr.class)
					newiterarr.class.template = flatCopy(newiterarr.class.template)

					newiterarr.class.template.isLabel = true
					newiterarr.class.template.label = this.template.label

					return newiterarr
				}
			}
		},

		// TODO: create a very general class of infinite arrays called DeepArray [most modifiable, works based on recursion];
		// ! [as a followup to the note about GeneralArray]; Then, the InfiniteArray would simply be the 'combiner class' [which contains all the algorithms, generalized, without reference to the actual inside-definitions...];

		// TODO: decide which particular definitions from the 'infinite' are to be defined post-createm for it...
		// What one meaans is 'const infinite = {.., def: ..., ....}' -> 'const infinite = {.., ....}; infinite.def = ...';

		copy() {
			// TODO: create an alias of 'trim' from the function in the Symbol-copying operation, with the argument for number of symbols/elements from String/Array, in question (here, only 1);
			return {
				array: (a, method = RESULT.id) => a.map(method),
				object: (a, method = RESULT.id) => objFmap(a, method),
				function: (a) => a.bind({}),
				symbol: (a) =>
					Symbol(((x) => x.slice(0, x.length - 1))(a.toString().slice(7))),
				arrayFlat: (a) => [...a],
				objectFlat: (a) => ({ ...a })
			}
		},
		// TODO: generalize later with a _switch() from a different library of self's...
		// ? Wonder if one want to put it into this one package instead???
		// ! make a more general template...
		copyFunction(template) {
			// TODO: do something about that inner one; shouldn't be there...
			function typeTransform(x) {
				if (x === "array" || x === "arrayFlat")
					return (p) => p instanceof Array
				if (x === "objectFlat") return (p) => typeof p === "object"
				return (p) => typeof p === x
			}
			return {
				template: template,
				function: function (a) {
					for (const x of this.template.list)
						if (typeTransform(x).function(a))
							return RESULT.infinite.copy()[x](a, this.function)
					return a
				}
			}
		},

		// * A useful algorithm from a different project of mine; value-wise comparison of two arbitrary things...
		// ? GENERAL QUESTION [over the 'infinite' object - for each and every method referencing it, pray decide...]: should one use "this" instead of "infinite"? This'd allow for some neat object-related stuff...
		// * [Previous] Current decision: yes, why not; works by itself + allows user to instantiate this structure partially for their own purposes conviniently... So, one'd just make it 'this' everywhere! Or not?
		// ! On the other hand - if there are dependencies of certain methods and user does decide to instantiate something, then they'd have to instantiate dependencies as well...
		// ^ IDEA [solution]: create an 'instantiation structure' for this thing; distribute as some instance of an InstantiableObject class, which creates instantiable objects; It allows to set dependencies,
		// ^ which would 'by default' add the stuff required; [The default instantiation could, of course, be turned off - flag for it;]

		// ! PROBLEM: with the currently chosen solution for the handling of the funciton arguments;
		// * List of 'problems' (1. and 3. especially; the 2. is more curious);
		// 		1. Function Size [the 'String' won't work with large enough functions' code...];
		// 		2. Notation [stuff like (a) => {return a} and (b) => {return b}; won't be considered "the same"];
		// 		3. Formatting [stuff like (a) => {return a} and (a   ) => {   return   a;  }; won't be considered "the same"];
		// * This does work for stuff like template classes and methods of different objects that have the exactly same code;
		// TODO [about the 1.]: after having created the InfiniteString, pray allow for a function/String to be transformed into it; The function - to get all of its code...
		// ? About the formatting [3.] stuff [and, possbily notation, 2.], one ideally ought to parse functions, then compoare their ASTs; For that sort of stuff, one'd do
		// ? something like 'Parser(InfiniteString(a)) === Parser(InfiniteString(b))';
		// ! All that'd be required is a JS parser...
		// todo: having created the JSONF, for the 1.1 [or even the 1.2] release, pray add this there too...
		valueCompare(a, b, oneway = false) {
			if (typeof a !== typeof b) return false
			switch (typeof a) {
				case "object":
					for (const a_ in a)
						if (!RESULT.infinite.valueCompare(b[a_], a[a_])) return false
					if (!oneway) return RESULT.infinite.valueCompare(b, a, true)
					return true
				case "function":
					return String(a) === String(b)
				default:
					return a === b
			}
		},

		// * Probably the simplest infinite counter one would have in JS;
		arrayCounter(template) {
			return {
				template: {
					start: null,
					...template
				},
				generator(a = this.template.start) {
					if (!this.range(a)) this.template.start = a
					return [a]
				},
				inverse: function (a) {
					return a[0]
				},
				range: function (a) {
					return (
						a === this.template.start ||
						(a instanceof Array && this.range(this.inverse(a)))
					)
				}
			}
		},

		// * Generalization of the thing above (arrayCounter)...
		objCounter(template) {
			return {
				template: { field: "", start: null, ...template },
				generator: function (a = this.template.start) {
					if (!this.range(a)) this.template.start = a
					return { [this.template.field]: a }
				},
				inverse: function (a) {
					return a[this.template.field]
				},
				range: function (a) {
					return (
						(typeof a === "object" && this.range(this.inverse(a))) ||
						a === this.template.start
					)
				}
			}
		},

		// TODO: create a generalization of string's order as an argument and on it -- this thing...
		// * make the InfiniteString a special case of the GeneralArray + use strings;
		// ? make very modifiable? make a template? [current: yes]
		// * Make a default version of this thing '_a' such that: stringCounter_a() = [""]; stringCounter_a("") = ["1"]; stringCounter_a("1") = "2" ..., then [when one hits the 'big numbers', one uses arrays similar to the numberCounter];
		// * Make a special case of the numberCounter generalization...
		stringCounter(a) {},

		// * Two methods from the current numberCounter definition [findDeepUnfilledNum and findDeepUnfilledArr] generalized...
		// One uses it for the generalizations like so: the 'curriter.currelem' function [on success; 'r[0] === true'] changes the 'comparetemplate' passed based on the last argument - the current 'comparetemplate'
		generalLoop(template) {
			const A = {
				function: function (
					a,
					prevcounter = this.template.icclass.class(),
					comparetemplate = this.template.icclass
				) {
					let currcounter = this.template.copyfunction(prevcounter)
					for (
						;
						RESULT.infinite
							.fromNumber(comparetemplate)(a.length)
							.compare(currcounter);
						currcounter = currcounter.next()
					) {
						// ??? DOES THIS WORK AS INTENDED??? [NOT LOOKS MUCH LIKE IT...]
						// * NAH, NOT WORTH IT; BETTER OFF JUST REPLACED...
						// TODO: pray just replace the generalLoop's uses; Think it through carefully regarding the consequences on the functional level...
						// Previous [for reference]:
						// 		const curriter = this.template.iteration(currcounter)
						// 		const loop = curriter.loop()
						// 		while (loop.full()) {
						// 			const r = curriter.currelem(
						// 				a,
						// 				currcounter,
						// 				this.template.self,
						// 				comparetemplate
						// 			)
						// 			if (r[0] === true) return r[1]
						// 			if (r[0] === false) break
						// 			// 'anything else' would essentially mean continuation of the list of things to 'check' within the current iteration...
						// 		}
						let shouldReturn = false
						let res = undefined
						this.template
							.iteration(currcounter)
							.loop()
							.full(() => {
								const empty = this.template.arrayclass.class()
								empty.pushback(() => {
									const r = curriter.currelem(
										a,
										currcounter,
										this.template.self,
										comparetemplate
									)
									shouldReturn = !!r[0]
									// 'anything else' would essentially mean continuation of the list of things to 'check' within the current iteration...
									if (typeof r[0] === "boolean") {
										if (shouldReturn) res = r[1]
										this.break()
									}
								})
								return empty
							})
						if (shouldReturn) return res
					}

					return this.template.defaultvalue()
				}
			}
			// * note: 'self' here is to allow the user to choose a different manner of an object for 'recursion'; Also to allow to change its value and stuff...
			A.template = { self: A, ...template }
			return A
		},

		// TODO: also, add stuff for different numeral systems; create one's own, generalize to a class for their arbitrary creation...

		// * That's an example of an infinite counter;
		// * btw, it is non-linear, that is one can give to it absolutely any array, like for example [[[0, 1234566643]]], and it won't say word against it; will continue in the asked fashion...
		// * This particular nice feature allows to build different InfiniteCounters with different beginnings on it...
		// ! but its output should not be used for reference-checking things, it creates entirely new objects when being called...
		numberCounter(template) {
			// TODO: this is the now generally chosen structure for the library; make all the 'template-generator-inverse-range' quartets to be written in it...
			return {
				// TODO: make more flexible and 'laid-off'... (with {...template} + ensureProperty + other such methods)
				template: {
					maxint: RESULT.MAX_INT,
					maxarrlen: RESULT.MAX_ARRAY_LENGTH,
					...template
				},
				generator: function (a) {
					const _this = this
					if (!this.range(a)) return [0]

					// * Old notes; will get deleted soon enough...
					// TODO: once handled all the below stuff [the active numberCounter generalization process], pray do...
					//// _TODO : generalize these greately, use here as special cases; put outside the function's context...
					//// _! PROBLEM [with generalization of recursion]: how does one go about it???
					//// _* This might be a solution to both the problem above [generalization] and the matter of choosing the array-index model...
					//// _^ IDEA [for a solution]: have the things generalized in the next fashion : let the second argument (prevArr=[]), be actually belonging to some 'indexing class';
					//// _^ The functions within the 'for' might be templated + be such:
					//// _* Consist of an array of [f], such that:
					//// _		'f: (currarr, currindex, mainfunction) => [booleanval, returnval]', with 'booleanval=true <-> "return returnval" && booleanval=false <-> continue && booleanval=null <-> nextf(f)()'
					//// _* where 'currarr' is the first argument ['a', the array]; 'currindex' is 'i' - the indexing thing; 'mainfunction' is the function called [to permit recursion...];
					//// _^ Finishing with the 'defreturn' argument - in these cases 'false' - the stuff that gets returned at any case...

					//// _! PROBLEM [still] : even after having solved this thing [still not resolved what is the 'indexing thing' is supposed to be yet..., the lower Problem still hangs],
					//// _* There still remains the problem of the stack; This particular manner of abstraction of things, though truly beautiful, requires an additional stack frame for each and every array layer...
					//// _* This'd reduce the capacity of the final version of the counter by a half;
					//// _^ Solution: JS fault, not the library or the style; Still going with it;
					//// _TODO: make a very big note about all this stuff inside the docs for the 1.0 version... [That the 'unlimited' stuff is merely structurally unlimited; not V8-permitted-stack-frame-memory-wise];

					//// _! PROBLEM [after all!] : difficulty with all that stuff GeneralArray/(native JS Array) after all...
					//// _* It is roughly such: though the native arrays permit [within THIS PARTICULAR VERSION OF THE LIBRARY ONLY] to have a far more powerful counter...
					//// _* Within any other, it would be still as limited, whereas with the counters, it would be un-limited!
					//// _? So, what ought one do for this version - prefer the matter of having the memory-level unlimitedness, even though stack-level-wise, in this particular case it is far more wise to pick a different counter?
					//// _^ Solution: use [generally] the InfiniteCounter for the indexing model...
					//// _? Although, could one not dress the native JS array into a [false] InfiniteCounter???
					//// _! As a default ONLY! That being, the user still is able to choose their own one, for instance; The function has the InfiniteCounter class as a part of its template...
					//// _! That being, choose as a part of the numberCounter template and as a part of this template, one'd have this 'false' generator as a default for the use of the 2 generalized functions...
					//// _* It'd just have: generator(x) := [...x, 0]? (Like in this thing)
					//// _* Yes, pray do that!

					// TODO: bring these special cases into the outer scope as well later... As aliases [similar to the thing done to the 'copying' functions... There's one general version for them, rest are kept as special cases + aliases...]
					// TODO: Create the template for the 'GeneralArray' to choose here... pray; Same for the 'icclass' and 'copyfunction'... For both the functions...
					const ArrNum = RESULT.infinite.GeneralArray({})
					const ArrArr = RESULT.infinite.GeneralArray({})
					const findDeepUnfilledNum = RESULT.infinite.generalLoop({
						icclass: {},
						copyfunction() {},
						iteration: RESULT._const(ArrNum)
					}).function
					const findDeepUnfilledArr = RESULT.infinite.generalLoop({
						icclass: {},
						copyfunction() {},
						iteration: RESULT._const(ArrArr)
					}).function
					// * function findDeepUnfilledNum(a, prevArr = []) {
					// * 	const i = [...prevArr, 0]
					// * 	for (; i[i.length - 1] < a.length; i[i.length - 1]++) {
					// * 		if (a[i[i.length - 1]] instanceof Array) {
					// * 			const temp = findDeepUnfilledNum(a, i)
					// * 			if (temp) return temp
					// * 			continue
					// * 		}
					// * 		if (a[i[i.length - 1]] < _this.template.maxint)
					// * 			return i
					// * 	}
					// * 	return false
					// * }
					//
					// * function findDeepUnfilledArr(a, prevArr = []) {
					// * 	const i = [...prevArr, 0]
					// * 	for (; i[i.length - 1] < a.length; i[i.length - 1]++) {
					// * 		if (a[i[i.length - 1]] instanceof Array) {
					// * 			if (
					// * 				a[i[i.length - 1]].length <
					// * 				_this.template.maxarrlen
					// * 			)
					// * 				return i
					// * 			const temp = findDeepUnfilledArr(a, i)
					// * 			if (temp) return temp
					// * 		}
					// * 	}
					// * 	return false
					// * }
					let resultIndexes = findDeepUnfilledNum(a)
					const _result = util.deepCopy(a)
					let result = _result
					if (!resultIndexes) {
						resultIndexes = findDeepUnfilledArr(a)
						if (!resultIndexes) return [a]

						// TODO: get rid of such object-parameters... within both this library and others...
						result = RESULT.recursiveIndexation({
							object: result,
							fields: resultIndexes.slice(0, resultIndexes.length - 1)
						})

						// TODO: THIS DOESN'T WORK; oldapi dim() handles only finitely deep arrays (id est, it's useless...); do the thing manually here... newapi 'dim' will use the numberCounter...
						// ! As well -- resultIndexes IS A FINITE ARRAY; Wouldn't allow one do more than (2**53 - 1)**(2 ** 32 - 1) with this; Using InfiniteArray instead would allow for this thing to work properly...
						// * Actually, not necessarily... One would just write one recursive and that would work just as well...
						// ^ Idea: use a two-index system -- compare each and every index sequence within the array in question...
						// ! Problem: that would require InfiniteArray...
						// * Conclusion: first finish the InfiniteArray...
						const finalDimension = dim(a) - resultIndexes.length
						// ? whilst refactoring, one have noticed a funny thing... -- doing so makes the code LONGER, not shorter...
						// * Does one truly want these kinds of pieces refactored (those simple enough, but when refactored become longer?)
						// * Pray decide...
						// ! This is the finite version... Infinite one is required for the thing anyway...
						result = RESULT.repeatedApplication(
							(value) => {
								value.push([])
								return value[value.length - 1]
							},
							finalDimension,
							result
						)
						result.push(0)
						return _result
					}

					result = recursiveIndexation({
						object: result,
						field: resultIndexes.slice(0, resultIndexes.length - 1)
					})
					result[resultIndexes[resultIndexes.length - 1]]++
					return _result
				},
				// TODO: finish the inverse
				// * Supposed to be something like this:
				// 		1. numberCounterInverse(numberCounter(x)) = x; for all x: x != undefined
				// 		2. numberCounterInverse(numberCounter()) = [-1];
				// 		3. numberCounterInverse([x]) = [x - 1]; for all MIN_INT < x < MAX_INT;
				// 		4. numberCounterInverse([MAX_INT]) = [MAX_INT, -1]
				// 		...
				// * And so on; Basically, same as the numberInverse, except the numbers are negative...
				// ? Does one really want to rewrite all that stuff completely???
				// ^ idea [for a plan]: first, patch up the numberCounter, fix all the problems and decide how it's going to look like,
				// ^ then think of a way to beautifully generalize the both of them (the counter and its inverse; + maybe some additional method);
				// * Then, create the method in question, write the two of those as a special case of it...
				// ^ One could start with generalizing the two inner methods of the numberCounter; Then, having generalized them, brought onto the higher scope,
				// ^ one could work exclusively on the numberCounter part...
				// ? Mayhaps, allow for a creation of a template, that'd use some particular manner of generator for generation of elements within such a nested array, with these two being '(x) => {if (!x) return [0]; return x +- 1}' corespondently?
				// ^ Additionally, generalize the 'range' too...
				// * Current decision: yes, excellent; just that... pray do
				inverse: function (a) {},
				range: function (a) {
					return (
						a instanceof Array &&
						a.length &&
						!!RESULT.min(
							a.map(
								(x) =>
									typeof x === "number" ||
									x instanceof Number ||
									this.range(x)
							)
						)
					)
				}
			}
		},

		// * It checks for the same array structure... That being, if array are precisely isomorphic...
		isSameStructure(arr1, arr2, comparison) {
			// ? create an alias for the 'instanceof' instruction? [idea: 'is', example: is(obj, ObjClass)]
			if (arr1 instanceof Array != arr2 instanceof Array)
				return comparison(arr1, arr2)

			return !!RESULT.min(
				generate(1, max([arr1, arr2].map((a) => a.length))).map(
					(i) => !!this.isSameStructure(arr1[i], arr2[i])
				)
			)
		},

		// ? Question: generalize for multiple inverses??? [Excellent; Decide how to do this better;]
		// TODO: make it work with the 'InfiniteCounter'(s); Let there only be 1 single element within the template: 'icclass';
		fromNumber(template) {
			return {
				template: template,
				value: function (n) {
					// ? make this an alias ('(x) => Number(x) || Number(!isNaN(x))'); this'd return 0 in case when argument is 'NaN'; in other cases, it'd perform a Number-conversion;
					n = Number(n) || Number(!isNaN(Number(n)))
					if (n < 0)
						return fromNumber({ generator: this.template.inverse })(-n)
					return repeatedApplication(
						(r) => r.next(),
						BigInt(n),
						// ? Shouldn't they really share the templates? [Yup, they do... Pray fix when finishing them...]
						InfiniteCounter({
							generator: this.template.generator,
							inverse: this.template.inverse
						})()
					)
				}
			}
		},

		// TODO: pray re-order the library's new API again (don't seem to completely like the way it looks like currently...)
		// * copies the array structure in question precisely;
		// ! PROBLEM [same as with the isSameStructure]: there is no distinction between whether something is an element or an object!
		// ^ IDEA: introduce a specialized function for this stuff - 'form'; it'd take the array and map [in accordance with the decided form], whether it's an element or a part of the structure; continuation is a second element;
		// * Example (for some 'form'): form([a, [b, [c, d, e]]]) = [[0], [1, [0, 0]]];
		// * Then, the isSameStructure would just compare forms;
		// ^ IDEA: create a 'ArrayForm', which would be the array embedded with this sturcture...

		// ? QUESTION [general]: should such inter-call arguments required to pass the intermidiate execution values between the two recursive calls be available to user? Or does one want them to be obstructed instead???
		// TODO: pray think in each individual case on this stuff, make it correspondent...
		sameStructure(
			array,
			generator,
			currval = undefined,
			copy = true,
			subcall = false
		) {
			const copied = copy ? util.deepCopy(array) : array
			for (let i = 0; i < copied.length; i++) {
				if (copied[i] instanceof Array) {
					currval = sameStructure(
						copied[i],
						generator,
						currval,
						false,
						true
					)
					continue
				}
				// * Found out that in JS, 'a(undefined) = a()';
				currval = generator(currval)
				copied[i] = currval
			}
			return !subcall ? currval : copied
		},

		// TODO: for this thing, pray first introduce max() for an array of InfiniteCounters(generator) [that is a static method, so depend only upon chosen 'generator', not 'this.generator']...
		// ! Make this array-type-independent; a general algorithm for arbitrary arrays, working with the use of InfiniteCounter(s);
		// * Sketch (takes in an 'icclass', to allow for working with generator and uniformity of output...; 'prev', to allow for getting the previously calculated value for counter...):
		// ! not complete yet... problems met;
		// 		ic = (array instanceof Array ? (x) => x.jump(ic.template.generator().jump()) : id)(prev)
		// ? Note: this thing [probably] wouldn't actually be able to work well anyway due to JS stack limitations...
		// * The 'returnless' (v1.1) version, though, would work like intended;
		// ! PROBLEM: with the InfiniteCounter... and the 'jump' method; What is the convention one chooses - does .generator() (also, known as 'initial') count as a 1-jump (same as 'next'?);
		// * The problem is with the symbolic '0'-jump; how does one designate it???
		// * One could choose a different convention - taking the jump FROM the 'initial', then jumping up to BUT NOT INCLUDING the given 'jump-destination'; Then, 'a.jump(a.template.generator()) = a'
		// TODO: yes, do that; it solves the problem well...
		// ? These kinds of small 'convention cases' are all over the spot within the library currently (especially regarding counters, arrays and generators...); they all ought to be fixed;
		dim(recarr) {},

		// TODO: add the circular counters (too, an infiniteCounter, just one that is looped)
		// TODO [general; old; vague; needs further looking into; do a tad later...]: finish this thing (add orders, other things from the previous file)...
		// TODO: add a way of transforming the given InfiniteCounter into a TrueInteger on-the-go and back again; This allows to use them equivalently to built-in numbers (their only difference currently is counter arithmetic...)
		// ^ idea [for an implementation...]: add a pair of static method: TrueInteger<...>.fromCounter(...), TrueInteger<...>.toCounter(); One could also add the corresponding structures to the InfiniteCounter [as a sugar, for instance?]
		InfiniteCounter(template) {
			const A = {
				// ^ IDEA [for a solution over 'static' methods]: the class object would contain the field 'static' with the appropriate methods...
				// TODO: pray do them...
				static: {
					direction(ic) {
						return ic.compare(this.this.class())
					},
					// TODO: clean that one up a bit later...
					forloop(i, comparison, jumping, obstructed) {
						// TODO: create a generalization of the repeatedApplicationWhilst, which'd be a function, accomplishing an application of functions onto a certain initial object consequently [like here],
						// * ; with the functions being generated by a different function passed, one of a current index; With '(i) => f', for some 'f', one'd get this thing...
						return repeatedApplicationWhilst(
							(r) => {
								i = i.next()
								return jumping(r)
							},
							() => !i.compare(obstructed, comparison, () => true),
							{
								// TODO: use the 'deepCopy' and 'dataCopy' at appropriate places... Work some on determining those...
								...infinite.deepCopy(this),
								class: this.class
							}
						)
					}
				},
				template: { comparison: infinite.valueCompare, ...template },
				class: function (previous) {
					return {
						class: this,
						value: !previous
							? this.template.generator()
							: this.template.generator(previous.value),
						next() {
							// * An observation: this is one of the ways to be able to reference a function from within itself...
							return this.class.class(this)
						},
						// _? 'previous'? or 'prev'? Or something else?
						// _* Current decision: let it be 'prev'...
						// ? GENERAL QUESTION: should one prefer complete words to abbriviations/shortenings, or vice versa? Or should one use both? Should there be a clearly decided [semi-static] general distinction between the cases of uses of each one of them or ought they be handled arbitrarily?
						previous() {
							return this.class.template.inverse(this)
						},
						// * 'true' means 'this >= ic'
						// * 'false' means 'this < ic'
						// * 'null' means 'no strict following  in appearance (no linear order) under chosen pair of generators';
						// it's a bit like a 'greater than' relation...
						compare(
							ic,
							comparison = this.class.template.comparison,
							range = this.class.template.range
						) {
							// TODO: ENSURE the use of 'range(ic.value)' instead of 'range(ic)' everywhere! Far more universal, allows to neglect the presence/non-presence of the 'InfiniteCounter'-wrapper...
							if (!range(ic.value)) return null

							let pointerfor = ic
							let pointerback = ic

							// TODO: generalize this thing...
							// ? QUESTION: DOES ONE DO 'comparison(ic.value, otheric.value)' or simply 'comparison(ic, otheric)'?
							// * CURRENT DECISION: 'comparison(ic.value, otheric.value)';
							// Far more general this way...
							// TODO: again, do the same thing - get rid of the 'InfiniteCounter' wrapper's influence on the workflow of the methods that use it... (this time with 'comparison')
							// TODO [general]: Do the above thing generally...
							while (
								!comparison(pointerfor, this) &&
								!comparison(pointerback, this)
							) {
								pointerfor = pointerfor.next()
								pointerback = pointerback.previous()
							}

							return comparison(pointerfor, this)

							// ! Old code;

							// Note:
							// There had also been a line:
							// 		let isIt = false
							// Used to be the return result. It got deleted...

							// TODO: pray work on it properly a bit later; something there was left unfinished...

							// ? Generalize this thing somehow? One ends up repeating the same code twice for two different values and methods...
							// * Something like 'searchUntil', for instance?
							// ? Same for the arguments... Does one really want to have 2 different values?
							// %
							// while (!(isIt = comparison(pointer.value, this.value)))
							// 	pointer = pointer.previous()
							// if (isIt) return true

							// ! PROBLEM: these 2 ought to be generalized somehow, BUT...
							// * They don't work; not really; for instance, if one has that a certain counter is in certain 'moving direction' from another one, then checking the wrong one
							// * still causes an infinite loop!
							// ^ Solution: one just checks for each one at a time!
							// * So, for example, they have loop with 2 infinite counters for each direction advancing at the same time; Then, they're both checked and the first one to be gotten to be the one sought gets to be compared with!
							// %
							// pointer = ic
							// while (!(isIt = comparison(pointer.value, this.value)))
							// 	pointer = pointer.next()
							// if (isIt) return false
						},
						// TODO: finish...
						difference(ic) {},
						jumpDirection(
							ic,
							comparison = this.class.template.comparison,
							range = this.class.template.range,
							// ! PROBLEM : with the 'obstructors'....
							// ? Does one really want those???
							// * Current decision: either - a. No, not at all [they're just form-changing...]; b. Yes, But First Generalize Them properly...
							obstructor = typeof x === "number"
								? infinite.fromNumber({
										generator: this.class.template.generator,
										inverse: this.class.template.inverse
								  })
								: RESULT.id
						) {
							const d = this.class.static.direction(ic)
							return d
								? this.jumpForward(
										ic,

										comparison,
										range,
										obstructor
								  )
								: d === null
								? this
								: this.jumpBackward(
										ic,
										comparison,
										range,
										obstructor
								  )
						},
						// TODO [general]: at a certain desired point, pray make some good and thorough work on the precise definitions for the template-structures for each and every templated thing...
						jump(
							x,
							jumping = (k) => k.next(),
							comparison = this.class.template.comparison,
							range = this.class.template.range,
							obstructor = typeof x === "number"
								? infinite.fromNumber({
										generator: this.class.template.generator,
										inverse: this.class.template.inverse
								  })
								: RESULT.id,
							counterclass = this.class
						) {
							// TODO [general]: one don't like that 'function' style for elimination of 'const's and 'let's; Get rid of it; Make things pretty and simple again;
							// * Do not overdo that either, though; miss not the opportunities for generalizing/(bringing into the larger scope) something
							// What one means is:
							// 		`const a = ...; f(a); c(a); ...` -> `((a) => {f(a); c(a); ...})(...)`
							// Really just replaces 'const' with these brackets and an arrow...
							const obstructed = obstructor(x)
							if (!range(obstructed)) return this
							return this.class.static.forloop(
								infinite.InfiniteCounter(counterclass)(),
								comparison,
								jumping,
								obstructed
							)
						},
						jumpForward(
							x,
							comparison = this.class.template.comparison,
							range = this.class.template.range,
							obstructor = typeof x === "number"
								? infinite.fromNumber({
										generator: this.class.template.generator,
										inverse: this.class.template.inverse
								  })
								: RESULT.id
						) {
							return this.jump(
								x,
								(a) => a.next(),
								comparison,
								range,
								obstructor
							)
						},
						jumpBackward(
							x,
							comparison = this.class.template.comparison,
							range = this.class.template.range,
							obstructor = typeof x === "number"
								? infinite.fromNumber({
										generator: this.class.template.generator,
										inverse: this.class.template.inverse
								  })
								: RESULT.id
						) {
							return this.jump(
								x,
								(k) => k.previous(),
								comparison,
								range,
								obstructor
							)
						},
						map(
							icClass = this.class,
							comparison = this.class.template.comparison
						) {
							let current = this.class.class()
							let alterCurrent = icClass.class()
							while (!comparison(current, this))
								alterCurrent = alterCurrent.next()
							return alterCurrent
						}
					}
				}
			}

			// TODO: that's how one does add a self-reference to the 'static' member of the class's object. Pray ensure that this is used and all the classes have their own 'static.this'
			A.static.this = A
			return A
		},

		MultiInfiniteCounter(template) {
			// ? Question: does one really want just a SINGLE ONE comparison? One does have multiple generators...
			// * Perhaps, one would have multiple comparisons assigned to each and every one index of the array in question? [But, that'd require using the same manner of array-templates for them...]
			// ! Pray think and decide...
			ensureProperty(template, "comparison", infinite.valueCompare)
			return {
				template: template,
				class: function (
					previous,
					index,
					generators = this.template.generators
				) {
					return {
						class: this,
						generators: generators,
						value: previous
							? this.generator(index)(previous.value)
							: this.generator(index)(),
						generator(index) {
							return this.generators.read(index)
						},
						next(index) {
							return this.generator(index)(this)
						},
						// TODO: pray consider the fate of all the other methods within the structure in question....
						// * What about '.compare()'? Because of greatness of variaty of manner of things possible within the structure in question, one would [if at all, that being] not have it the same way as it is within the InfiniteCounter!
						// One might do this by only choosing some one particular generator of the entire bunch; Or [more general], perhaps, creating some manner of way for the user to set the order by which to 'judge' the return value of the 'compare', with it serving as merely a wrapper for the essential part of the order in question???
						// * For '.jump()', one would require the 'ranges' + also the index of the generator that is to be used for the jump...
						// ! About the ranges: does one really want them to be an argument for this stuff??? [Perhaps, make them arguments for other things too, then???]
						// ^ Implementation of '.jump()';
						jump(x, index, ranges = this.class.template.ranges) {
							if (!ranges.read(index)(x)) return this
							// TODO: generalize the InfiniteCounter.jump(), then use the stuff here [essentially the same code]...
						}
						// * For '.map()'... What does one do about '.map()'???
						// * Due to the fact that there is not one single direction to continue in [and there is an infinite number of different permutations of operators...]
						// * There's no way to know generally how does one get from a certain thing 'x' to a 'y' using the Multi; Thus, CANNOT BE IMPLEMENTED TO BE THE SAME WAY...
						// ! However.... If one was to somehow remember the path taken [starting from the decided position...];
						// * One may as well do it...
						// ! Or better, make a general method which would accept a GeneralArray of indexes, that'd correspond to indexes of the 'this.generators';
						// * Then, one'd just iterate over the array in question, applying the '=.next(currindex)' to the chosen 'beginindex'!
						// ? Would this not better be off as a static method, though?
						// * CURRENT DECISION: yes!
						// TODO: work on the static methods for the class-like structures in question...
					}
				}
			}
		},

		// TODO: redo completely as GeneralArray(s)... instead;
		LastIndexArray(comparison, indexgenerator, notfound) {
			return infinite.InfiniteArray(...arguments)()
		},
		DeepArray(comparison, indexgenerator, notfound) {
			return infinite.InfiniteArray(...arguments)()
		},

		// _? Should one make the arguments for this sort of thing named (using a single object-argument, containing all the info instead of the separate ones containing information on each particular topic) ???
		// _* Pray think about it...
		// _! Again, the thing with choosing between null/undefined...
		// _TODO: after having written InfiniteMap and InfiniteArray wrappers, pray write some implementations of it all... Align different methods to work with them particularly...
		// _? Should one choose 'null' as a default, the '(a, b) => a === b' or the valueCompare?
		// _* Documentation, Documentation, Documentation. This thing badly needs it [which properties are in it, yada, yada, yada];
		// _TODO: finish the InfiniteMap class; the UniversalMap has a limitation of 2**32 - 1 elements on it, whilst the InfiniteMap would have no such limitation...
		// _TODO: let the InfiniteMap and UniversalMap have the capabilities of adding getters/setters (or better: create their natural extensions that would do it for them)
		// _? Question: store the pointer to the 'infinite' structure within the thing in question.
		// * Return a bit later...
		// ! Re-assess the old notes...
		// ? What is it even (the 'keyorder')? Pray re-assess carefully later...
		InfiniteMap(keyorder) {
			return {
				template: { keyorder },
				value: function (
					set,
					get,
					entries,
					every,
					forof,
					forin,
					generator = null,
					comparison = null
				) {
					return {
						template: {
							generator,
							comparison,
							set,
							get,
							entries,
							every,
							// ? Again, Forof? Rename?
							forof,
							forin,
							// TODO: this stuff [naming conventions] should really be re-thought; gets confusing with property names like that...
							class: this.class
						},
						value: function (keys, values) {
							if (
								!(keys instanceof Array) &&
								typeof keys === "object"
							) {
								// TODO: isn't this code already used somewhere??? [UniversalMap, check if redundant...]
								// ? use the objArr() here?
								values = Object.values(keys)
								keys = Object.keys(keys)
							}

							// ! This code with the templates is very beautiful and useful, but with this syntax -- rather confusing (namely, the feature of having the 'this' equal to the parent object variable)
							// * Check it thouroughly...
							return {
								keys,
								values,
								class: this,
								set(comparison = this.class.comparison) {
									return {
										template: { comparison },
										value: this.class.set(comparison)
									}
								},
								get(comparison = this.class.comparison) {
									return {
										template: { comparison },
										value: this.class.get(comparison)
									}
								},
								entries(generator = this.class.generator) {
									return {
										template: { generator: generator },
										value: this.class.entries(generator)
									}
								},
								// TODO: this one is more troublesome -- one requires to know what kind of an InfiniteMap is it that one is in fact mapping to (first creating, then setting corresponding things...)
								// ? Return back to the question of how are the arguments handled within this thing...
								map() {},
								every: this.class.every,
								[Symbol.iterator]: this.class.forof,
								forin: this.class.forin
							}
						}
					}
				}
			}
		}

		// ? Mayhaps, one would want to add it back after all [after having renamed, patched the holes?]
		// i * Sketchy... tiny details to be fixed, decided for the library... general ought to be... most general...
		// i TODO: templates; second-level functions...
		// i ? That thing is... good??? But... sort of... also... useless;
		// i TODO: redo for the IterArray(s), then perhaps delete the GeneralArray version...
		// _PointerArray(label, genarray) {
		// 	genarray.begin()
		// 	// ? Again, the defaults for the empty array??? A lot of these tiny things to decide through the library...
		// 	const newgenarr = genarray.class.class()
		// 	for (
		// 		let i = genarray.array.initindex;
		// 		!genarray.class.comparison(i, genarray.class.length());
		// 		i = genarray.array.forindexgenerator(i)
		// 	)
		// 		newgenarr.push(Pointer(label)(genarray.read(i)))
		// 	return newgenarr
		// },

		// ! all the old [potentially dead or half-dead or required-for-reworking/generalizing code ought to be looked at later (when the definitely dead stuff has been eliminated, problems solved on conceptual level, simple stuff done, and the most fundamental aspects of the cleanup have been made...)]
		// // TODO: currently, work with the RecursiveArrays is such a pain; Do something about it;
		// // * The matter of recursiveIndexation and other such library things (code re-doing) would solve a considerable part of the problem;
		// // * Also, the library (probably) should export this thing from the different library as well (would give the user a way of getting less dependencies...)
		// // TODO: finish this thing... (as well as others...)
		// InfiniteArray: class {
		// 	currIndex() {
		// 		return this.index
		// 	}
		// 	next() {
		// _* Same as below...
		// _TODO: these recursive functions should get generalizations that would become dependencies...
		// _? perhaps, the library function that does this kind of stuff should too be rewritten (after adding math-expressions.js as a dependency) to work with InfiniteCounter(s)
		// function recursive(array, index, path) {
		// 	for (let i = 0; i < path.length; i++) {
		// 		const indexed = path[i]
		// 		if (typeof indexed !== "number") {
		// 			;[array, index] = recursive(array, index, indexed)
		// 			continue
		// 		}
		// 		const indexindexed = index[indexed]
		// 		const arrayindexed = array[indexed]
		// 		if (typeof indexindexed === "boolean") break
		// 		index = indexindexed
		// 		array = arrayindexed
		// 	}
		// 	return [array, index]
		// }
		// const path = this.currElement()
		// let [array, index] = recursive(this.array, this.index, path)
		// const lastIndex = path[path.length - 1]
		// if (typeof lastIndex === "number") index[lastIndex] = false
		// _TODO: as one have decided that the InfiniteArrays can have user-defined, there comes the question of finding and marking the next index... do this;
		// _* There is a strong feeling for far more advanced API for working with the RecursiveArrays; This API is to be added
		// _! Pray do walk the code up and down and decide what to do about this...
		// 	}
		// 	currElement() {
		// _* Again, an algorithm. Should be a wrapper AROUND AN ARBITRARY algorithm...
		// let current = this.index
		// function recursive() {
		// 	const prevCurrent = current
		// 	let temp = false
		// 	if (prevCurrent instanceof Array) {
		// 		for (let i = 0; i < prevCurrent.length; i++) {
		// 			current = prevCurrent[i]
		// 			if (typeof current === "boolean") {
		// 				if (current) return [i]
		// 				continue
		// 			}
		// 			temp = recursive()
		// 			if (temp !== false) {
		// 				if (temp.length < MAX_ARRAY_LENGTH)
		// 					return [i, ...temp]
		// 				return [i, temp]
		// 			}
		// 		}
		// 		current = prevCurrent
		// 	}
		// 	return temp
		// }
		// return recursive()
		// 	}
		// 	// ! this thing should get some documentation. very very much should...
		// 	// * finds the first index and sets the thing to it...
		// 	// TODO: should work differently... This thing (along with most of the infinite API) is poorly planned and designed...
		// 	first(shouldSet = true) {
		// _^ These are nice algorithms, they should get their own functions -- this is a wrapper for algorithms of the user.
		// _* Library should provide general wrappers and particular algorithms separately from each other, this way alowing for infinitely greater diversity in the final code in question
		// _* (not necesserily neglecting presence of defaults...)
		// _TODO: create defaults for all manner of these things...
		// this.index = sameStructure(this.index, () => false)
		// const index = []
		// let indexpointer = index
		// let current = this.index
		// // TODO: create a function in a different library for general dealing with these things... Later, pray do change this for that too...
		// while (true) {
		// 	if (typeof current[0] !== "boolean") {
		// 		const isFull = indexpointer.length === MAX_ARRAY_LENGTH - 1
		// 		indexpointer.push(isFull ? [] : 0)
		// 		const lastPointer = indexpointer[indexpointer.length - 1]
		// 		if (isFull && lastPointer instanceof Array)
		// 			indexpointer = lastPointer
		// 		current = current[0]
		// 		continue
		// 	}
		// 	break
		// }
		// if (shouldSet) current[0] = true
		// return index
		// 	}
		// 	// * IDEAS FOR UNITED API OF WORKING WITH THE RECURSIVEARRAYS:
		// 	// * 1. Function for indexation by means of some RecursiveArray<number>; There should be a way to establish the order of following (DECIDE HOW IT WOULD BE IMPLEMENTED WITHIN THIS LIBRARY);
		// 	// * 2. Function for setting values to an array value based on a RecursiveArray<number>-index, with the same kind of "order" thing as in 1.
		// 	// ? Currently, that's just the stuff that the InfiniteArray implementation is concerned with;
		// 	// ! Now, if one was to write it for the InfiniteArray<Type>, one would then generalize the stuff to an arbitrary RecursiveArray<Type> and then just define InfiniteArray as a convinient in-built wrapper around the stuff...
		// 	// ? This still don't solve the problem of generalizing the specific cases of recursive functions that are a part of the InfiniteArray methods, though;
		// 	// * This would have in it the ideas of the order, structure of the given array (ways of copying it, changing it flexibly, reading via some handy InfiniteMap-structure);
		// 	// * Also, should be ways of assigning to it an "index-array" with the same structure, which would contain various kinds of datatypes in it, allowing to read the array in various ways (simplest example -- boolean for marking an element; one could have one type with some "n" different modes, allowing for different ways of accessing it...);
		// 	// * The "index-arrays" along with the orders and different comparison functions should be useable to read something from a recursive array...
		// 	// ! Then, the InfiniteArray would simply become a special case of all this with it having the index array being boolean, or something (or it would become a truly general wrapper with 'boolean' as merely a default case...);
		// 	// ! There is also another small trouble preventing the swift generalization of all these things -- lack of singular form for checking the same stuff (somewhere, 'typeof' is used and somewhere else 'instanceof', for example);
		// 	// * Also: to avoid "if-else" (branching), one uses 'if-continue' or 'if-break';
		// 	// * Different things are checked and the return types are not unanimous (they differ, though could (probably) be made to be in the same general form);
		// 	// * Different loops are used;
		// 	// ! Also, there should be ways of transforming a non-infinite Array into an Infinite one;
		// 	last() {}
		// 	// * retuns if the current index is the last...
		// 	isLast() {}
		// 	// TODO: implement a safe-check that the last element of the last of the last ... of the last array IS, in fact, a RecursiveArray<Type>; if not, pray do change the structure of the final array,
		// 	constructor(objects, order) {
		// 		this.array = objects
		// 		// ! AGAIN: particular implementation, instead use the one given by the user here, set this [or something else] of self as default and then ...
		// 		// ? Should indexes work this way?
		// 		// this.index = sameStructure(this.array, () => false)
		// 		this.first(true)
		// 	}
		// },

		// TODO: generalize.... Make this a template... Let the arbitrary positional function 'k' be chosen, instead of current default `k := (_x) => MAX_ARRAY_LENGTH - 1`
		// TODO: generalize even further -- give a number of different indexes to be pursued, add a pattern for choosing between them...
		// TODO: generalize even further -- give the 'max_index=MAX_ARRAY_LENGTH' -- after this index, it would behave as if there's no index space left within the current level of recursive array...
		// ! Obsolete code; rewrite as LastIndexArray - special case of the GeneralArray;
		// lastIndexArray: function (arrays, currArr = [], deepen = true) {
		// 	let arr = currArr

		// 	if (arr.length === MAX_ARRAY_LENGTH) {
		// 		if (
		// 			(deepen && !(deepen instanceof Array)) ||
		// 			(deepen instanceof Array && deepen[0])
		// 		)
		// 			arr = [...arr.slice(0, arr.length - 1), [arr[arr.length - 1]]]
		// 		// TODO: use the alias last() for arrays [simplify code with it...];
		// 		// TODO: create a generalization orderIndex(arr, indexes, i = 0) := arr[indexes[i]]
		// 		// ! Problem: with the 'deepen' argument -- it's not general enough...
		// 		// TODO: generalize it to encompass any possible pattern...
		// 		// ? Should one even have that one???
		// 		// * Many difficulties as to how the API should look like precisely...
		// 		return infinite.lastIndexArray(
		// 			arrays,
		// 			arrays[arrays.length - 1],
		// 			deepen instanceof Array && deepen.length > 1
		// 				? deepen.slice(1)
		// 				: deepen
		// 		)
		// 	}

		// 	for (let i = 0; i < arrays.length; i++) {
		// 		for (let j = 0; j < arrays[i].length; j++) {
		// 			if (arr.length < MAX_ARRAY_LENGTH - 1) {
		// 				arr.push(arrays[i][j])
		// 				continue
		// 			}
		// 			if (arr.length === MAX_ARRAY_LENGTH - 1) arr.push([])
		// 			return infinite.lastIndexArray(
		// 				arrays.slice(i).map((a, t) => (t > 0 ? a : a.slice(j))),
		// 				arr[arr.length - 1]
		// 			)
		// 		}
		// 	}

		// 	return arr
		// },

		// lastIndexArrayHas(array, thing, comparison) {
		// 	for (let i = 0; i < array.length - 1; i++)
		// 		if (comparison(array[i], thing)) return true
		// 	if (array[array.length - 1] instanceof Array)
		// 		return this.lastIndexArrayHas(
		// 			array[array.length - 1],
		// 			thing,
		// 			comparison
		// 		)
		// 	return comparison(array[array.length - 1], thing)
		// },

		// mergeLastIndexArrs(arrs) {},

		// TODO: implement -- depthOrder([[[0], [1], 2], 3, [[4, [5]]]]) := lastIndexArray([1,2,3,4,5])
		// ! Currently commented out, later pray revisit and do properly...
		// _TODO: let these thing NOT rely upon lastIndexArray, but rather allow to give some different infinite indexing structure [decide how should it work -- first write like that, then vastly generalize];
		// _? generalize this thing too?
		// _! THIS DOESN'T WORK. Because:
		// _* There should be an API within this thing for 'mergeing' different kinds of recursive arrays -- that is the main problem. THEY AREN'T FLUID, like the way they are supposed to be.
		// _^ IDEAS for doing it:
		// _* 1. Turn them to the same format (example: lastIndexArray);
		// _* 2. Provide ways for user to define 'conversion' function-parameters for these kinds of things.
		// _! Problems with 1:
		// _* One could easily define conversion to lastIndexArray (because they're one format), but what about the reverse? If one chooses this, there should be recursiveRecerse function for this kind of stuff on emphasis of 'how does one keep the recursive pattern'...
		// _! Problems with 2:
		// _* This'd work, but would complicate ALL pieces of the 'infinite' api, not just some 1, like in the first one;
		// _* CURRENT DECISION: unless one creates some better idea for it, 1 will be the way...
		// _TODO: after having done that, pray rewrite and fix.
		// depthOrder(array, isElement = (x) => !(x instanceof Array), first = true) {
		// 	let currarr = []
		// 	// TODO: the library is in bad need of a very powerful and thorough clean-up... Both code, comments and TODOS. Do it, pray
		// 	const notAdd = (x) => x instanceof Array && !isElement(x)
		// 	for (
		// 		let copied = first ? this.deepCopy(array) : array;
		// 		copied.length;
		// 		copied = copied.slice(1)
		// 	) {
		// 		if (notAdd(copied[0])) {
		// 			currarr = margeLastIndexArrs(
		// 				currarr,
		// 				this.lastIndexArray(copied[0], isElement)
		// 			)
		// 			continue
		// 		}
		// 		// ! These structural things are supposed to have their API just like arrays, but defined in terms of user functions;
		// 		// TODO: create a GeneralArray template-class, that would do that thing; Then, pray do generalize powerfully, like one did intend...
		// 		pushToLastIndexArray(currarr, copied[0])
		// 		currarr = this.lastIndexArray([currarr])
		// 	}

		// 	return currarr
		// },

		// _! PROBLEM: this thing don't actually use the 'notfound' in definitions...
		// _TOdo : let the particulars [implementations] use it instead [after having written some that do, pray delete the todo];
		// ! Problem: this thing don't appear to be used anymore...
		// * After GeneralArray came in to be, it became obsolete... The stuff that it's doing is now generalized by it [and again, it's really the UnlimitedArray, not InfiniteArray];
		// TODO: commented out for now, later - pray rewrite to be actual InfiniteArray [not UnlimitedArray]; Also, don't throw out right away - make it so that the stuff from it makes its way into the GeneralArray too [stuff that didn't already, that be...]
		// InfiniteArray(comparison, indexgenerator, notfound) {
		// 	return {
		// 		template: { comparison, indexgenerator, notfound },
		// 		value: function (
		// 			pushback,
		// 			pushfront,
		// 			index,
		// 			_delete,
		// 			// ? names: forof, forin
		// 			forof,
		// 			forin,
		// 			reverse,
		// 			map,
		// 			sort,
		// 			length,
		// 			concat,
		// 			copyWithin,
		// 			every,
		// 			any,
		// 			reduce,
		// 			slice,
		// 			property,
		// 			indexesOf,
		// 			entries,
		// 			each,
		// 			fillfrom,
		// 			has
		// 		) {
		// 			return {
		// 				template: {
		// 					pushback,
		// 					pushfront,
		// 					index,
		// 					delete: _delete,
		// 					forof,
		// 					forin,
		// 					reverse,
		// 					map,
		// 					sort,
		// 					length,
		// 					concat,
		// 					copyWithin,
		// 					every,
		// 					any,
		// 					reduce,
		// 					slice,
		// 					property,
		// 					indexesOf,
		// 					entries,
		// 					each,
		// 					fillfrom,
		// 					has,
		// 					template: this
		// 				},
		// 				value: function (array) {
		// 					return {
		// 						array,
		// 						class: this,
		// 						pushback: this.pushback,
		// 						pushfront: this.pushfront,
		// 						// TODO: another [general] problem -- the classes are generally supposed to hide things like: push(arr, elem) -> arr.push(elem) [the methods should have the first 'this' argument replaced by the 'this.array'];
		// 						// * There's a couple of other problems concerning the function definitions within the InfiniteArray, InfiniteMap and InfiniteCounter; pray check them, and change throughout the entire code...;
		// 						// TODO: 'initial' should be given for generators everywhere as a conditional parameter [by default undefined -- calls generator(), like the way it is now...]
		// 						index(
		// 							indexgenerator = this.class.template
		// 								.indexgenerator,
		// 							comparison = this.class.template.comparison
		// 						) {
		// 							// todo: here, the 'this' feature with changing templates mid-stream don't really work [because the functionTemplate 'this' is not really used...]
		// 							// * Pray scan all the code that uses the in-library templates on the matter of having it working...
		// 							// ? Question: should the function templates within the methods in question also have the 'class' thing, or not???; Would seem appropriate...
		// 							// * Answer: yes; add that to all the things of the sort as well...
		// 							// ! Pray tidy up this todo/note from redundacies later...
		// 							return {
		// 								template: {
		// 									indexgenerator,
		// 									comparison,
		// 									object: this
		// 								},
		// 								value: function (_index) {
		// 									return this.object.class.index(
		// 										this.indexgenerator,
		// 										comparison
		// 									)(this.object.array, _index)
		// 								}
		// 							}
		// 						},
		// 						delete(
		// 							indexgenerator = this.class.template
		// 								.indexgenerator
		// 						) {
		// 							return {
		// 								template: { indexgenerator, object: this },
		// 								value: function (_index) {
		// 									return this.object.class.delete(
		// 										this.indexgenerator
		// 									)(this.object.array, _index)
		// 								}
		// 							}
		// 						},
		// 						[Symbol.iterator]: this.forof,
		// 						forin: this.forin,
		// 						reverse: this.reverse,
		// 						map: this.map,
		// 						sort: this.sort,
		// 						length: this.length,
		// 						concat: this.concat,
		// 						copyWithin(
		// 							indexgenerator = this.class.template
		// 								.indexgenerator
		// 						) {
		// 							return {
		// 								template: { indexgenerator, object: this },
		// 								value: function (
		// 									beginind,
		// 									endind,
		// 									targetind
		// 								) {
		// 									return this.object.class.copyWithin(
		// 										this.indexgenerator
		// 									)(
		// 										this.object.array,
		// 										beginind,
		// 										endind,
		// 										targetind
		// 									)
		// 								}
		// 							}
		// 						},
		// 						every: this.every,
		// 						any: this.any,
		// 						reduce(
		// 							indexgenerator = this.class.template
		// 								.indexgenerator
		// 						) {
		// 							return {
		// 								template: { indexgenerator, object: this },
		// 								value: function (
		// 									initial,
		// 									direction,
		// 									callback
		// 								) {
		// 									return this.object.class.reduce(
		// 										this.indexgenerator
		// 									)(
		// 										this.object.array,
		// 										initial,
		// 										direction,
		// 										callback
		// 									)
		// 								}
		// 							}
		// 						},
		// 						slice(
		// 							indexgenerator = this.class.template
		// 								.indexgenerator
		// 						) {
		// 							return {
		// 								template: { indexgenerator, object: this },
		// 								value: function (start, end) {
		// 									return this.object.class.slice(
		// 										this.indexgenerator
		// 									)(this.object.array, start, end)
		// 								}
		// 							}
		// 						},
		// 						property: this.property,
		// 						indexesOf(
		// 							comparison = this.class.template.comparison,
		// 							indexgenerator = this.class.template
		// 								.indexgenerator
		// 						) {
		// 							return {
		// 								template: {
		// 									indexgenerator,
		// 									comparison,
		// 									object: this
		// 								},
		// 								value: function (ele) {
		// 									return this.object.class.indexesOf(
		// 										this.indexgenerator
		// 									)(this.object.array, ele)
		// 								}
		// 							}
		// 						},
		// 						entries(
		// 							indexgenerator = this.class.template
		// 								.indexgenerator
		// 						) {
		// 							return {
		// 								template: { indexgenerator, object: this },
		// 								value: function () {
		// 									return this.object.class.entries(
		// 										this.indexgenerator
		// 									)(this.object.array)
		// 								}
		// 							}
		// 						},
		// 						each(
		// 							indexgenerator = this.class.template
		// 								.indexgenerator
		// 						) {
		// 							return {
		// 								template: { indexgenerator, object: this },
		// 								value: function (callback) {
		// 									return this.object.class.each(
		// 										this.indexgenerator
		// 									)(this.object.array, callback)
		// 								}
		// 							}
		// 						},
		// 						fillfrom(
		// 							indexgenerator = this.class.template
		// 								.indexgenerator,
		// 							comparison = this.class.template.comparison
		// 						) {
		// 							return {
		// 								template: {
		// 									indexgenerator,
		// 									comparison,
		// 									object: this
		// 								},
		// 								value: function (index, value) {
		// 									return this.class.fillfrom(
		// 										this.indexgenerator,
		// 										this.comparison
		// 									)(this.object.array, index, value)
		// 								}
		// 							}
		// 						},
		// 						has(comparison = this.class.template.comparison) {
		// 							return {
		// 								template: { comparison, object: this },
		// 								value: function (elem) {
		// 									return this.class.has(this.comparison)(
		// 										this.object.array,
		// 										elem
		// 									)
		// 								}
		// 							}
		// 						}
		// 					}
		// 				}
		// 			}
		// 		}
		// 	}
		// },

		// _? Should one not then write the InfiniteArray class, then use it in the InfiniteString class (not to repeat the same things all over again)?
		// _TODO: finish the InfiniteString class; It would allow work like with a string, though would be based on the InfiniteCounter/TrueInteger classes...
		// _* Let it have all the capabilities (methods, properties) of a string and more -- let there be a way to reverse() it natively...;
		// * Return to this a bit later...
		// ! Get fundamentally redone; followup in the previous notes + the UnlimitedString idea...;
		// InfiniteString: class {
		// 	append(x) {
		// 		// ? generalize and then make an export ?
		// 		function appendStrRecursive(str, thisArg, i = 0) {
		// 			// TODO: replace with repeatedApplication or recursiveIndexation or something such within a different library...
		// 			let currLevel = thisArg.string
		// 			for (let j = 0; j < i; j++) {
		// 				const indexed = currLevel[currLevel.length - 1]
		// 				if (typeof indexed === "string") break
		// 				currLevel = indexed
		// 			}
		// 			if (currLevel.length < MAX_ARRAY_LENGTH - 1) {
		// 				thisArg.length = thisArg.length.next()
		// 				currLevel.push(str)
		// 				return
		// 			}
		// 			if (currLevel.length === MAX_ARRAY_LENGTH - 1)
		// 				currLevel.push([])
		// 			return appendStrRecursive(str, thisArg, i + 1)
		// 		}
		// 		function appendInfStringRecursive(arr, thisArg) {
		// 			for (let i = 0; i < arr.string.length - 1; i++) {
		// 				const currStr = arr.string[i]
		// 				if (typeof currStr !== "string") break
		// 				appendStrRecursive(currStr, thisArg)
		// 			}
		// 			if (arr.string.length === MAX_ARRAY_LENGTH) {
		// 				appendInfStringRecursive(
		// 					new InfiniteString(
		// 						arr.string[arr.string.length - 1],
		// 						arr.indexGenerator
		// 					),
		// 					this
		// 				)
		// 			}
		// 		}
		// 		if (typeof x === "string") return appendStrRecursive(x, this)
		// 		return appendInfStringRecursive(x, this)
		// 	}
		// 	copy() {
		// 		return util.deepCopy(this)
		// 	}
		// 	// TODO: allow for use of the InfiniteString as an argument... (That is, copying an InfiniteString; new instance is by default its extension...)
		// 	// TODO: allow for use of the RecursiveArray<string>... (for this, generalize the last element-safety check...)
		// 	constructor(initial, indexGenerator) {
		// 		if (typeof initial === "string") {
		// 			this.string = [initial]
		// 			return
		// 		}
		// 		this.string = initial
		// 		// TODO: use the util.gut... and util.encircle... functions for the finalized check (make it all the same form -- [string, ...., pointer to RecursiveArray<string>])
		// 		if (initial.length === MAX_ARRAY_LENGTH) {
		// 			this.string[this.string.length - 1] = [
		// 				this.string[this.string.length - 1]
		// 			]
		// 		}
		// 		this.length = fromNumber(indexGenerator)(initial.length)
		// 		this.indexGenerator = indexGenerator
		// 	}
		// },

		// _TODO: delete or greatly rework after having finished with the GeneralArray stuff...;
		// algorithms: {
		// 	recarrays: {
		// 		pushback: {
		// 			// TODO: generalize the 'lastIndex' arrays to a 'recursivePoints' arrays [sets of recursive (not lastIndex, then generalization won't work...)-array index arrays for the indexes of the 'recursion points'; lastIndex is trivial case -- with the 'points' being [MAX_ARRAY_LENGTH]];
		// 			// * then, add this one as a special case...
		// 			lastIndex(
		// 				MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH,
		// 				isUndefined = (a) => a === undefined
		// 			) {
		// 				return functionTemplate(
		// 					{ MAX_ARRAY_LENGTH, isUndefined },
		// 					function (arr, elem) {
		// 						for (let i = 0; i < MAX_ARRAY_LENGTH - 1; i++) {
		// 							if (this.isUndefined(arr[i])) {
		// 								arr[i] = elem
		// 								return elem
		// 							}
		// 						}
		// 						if (!arr[MAX_ARRAY_LENGTH - 1]) {
		// 							arr.push([elem])
		// 							return elem
		// 						}
		// 						return infinite.algorithms.recarrays.pushback.lastIndex(
		// 							MAX_ARRAY_LENGTH,
		// 							isUndefined
		// 						)(arr[arr.length - 1], elem)
		// 					}
		// 				)
		// 			}
		// 		},
		// 		// TODO: implement [perhaps as .concat([pushedelem], arr)?]; which would really be ".shiftForward(array, pushedelem)"
		// 		pushfront: {},
		// 		// TODO : pray add as a method for the InfiniteArray(s); Same goes for all the unadded methods from the 'algorithms'...
		// 		shiftForward: {
		// 			lastIndex(MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH) {
		// 				return functionTemplate(
		// 					{ MAX_ARRAY_LENGTH },
		// 					function (array, baseelem = undefined) {
		// 						return infinite.algorithms.recarrays.concat.lastIndex(
		// 							MAX_ARRAY_LENGTH
		// 						)([baseelem], array)
		// 					}
		// 				)
		// 			}
		// 		},
		// 		shiftForwardMult: {
		// 			lastIndex(
		// 				generator,
		// 				shiftValue,
		// 				comparison = infinite.valueCompare,
		// 				MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH,
		// 				baseelemfunc = () => undefined
		// 			) {
		// 				return functionTemplate(
		// 					{ MAX_ARRAY_LENGTH },
		// 					function (array) {
		// 						const newArr = []
		// 						let currGenerated
		// 						while (
		// 							!comparison(
		// 								((currGenerated = generator()), shiftValue)
		// 							)
		// 						)
		// 							infinite.algorithms.recarrays.push.lastIndex(
		// 								newArr,
		// 								baseelemfunc(currGenerated)
		// 							)
		// 						return infinite.algorithms.recarrays.concat.lastIndex(
		// 							MAX_ARRAY_LENGTH,
		// 							false
		// 						)(newArr, array)
		// 					}
		// 				)
		// 			}
		// 		},
		// 		// TODO: implement; this thing is like the 'insert' alias...;
		// 		insert: {},
		// 		slice: {
		// 			lastIndex(
		// 				MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH,
		// 				generator,
		// 				comparison = valueCompare,
		// 				undefinedSymbol = undefined,
		// 				isUndefined = (x) => x === undefined
		// 			) {
		// 				return functionTemplate(
		// 					{
		// 						MAX_ARRAY_LENGTH,
		// 						generator,
		// 						comparison,
		// 						undefinedSymbol
		// 					},
		// 					function (
		// 						array,
		// 						begind,
		// 						enind,
		// 						currIndex = undefinedSymbol,
		// 						haveReached = false,
		// 						baseArr = []
		// 					) {
		// 						let newArr = baseArr
		// 						let curr = undefinedSymbol
		// 						let i = 0

		// 						// ? generalize???
		// 						// TODO: the code should be looked through thoroughly in search for generalizations, simplifications, making things more tangible [stuff like this.MAX_ARRAY_LENGTH, instead of JUST MAX_ARRAY_LENGTH and on and on and on...]
		// 						// * Mayhaps, do it only after the very first sketches of algorithms implementations have been written...
		// 						if (!haveReached) {
		// 							let isBegin = false
		// 							// TODO: repeatedApplication... replace with... refactor...
		// 							for (; i < MAX_ARRAY_LENGTH - 1; i++)
		// 								if (
		// 									(isBegin = comparison(
		// 										(curr = generator(curr)),
		// 										begind
		// 									)) ||
		// 									isUndefined(array[i])
		// 								)
		// 									break

		// 							if (!isBegin) {
		// 								if (
		// 									!isUndefined(
		// 										array[MAX_ARRAY_LENGTH - 2]
		// 									) &&
		// 									!isUndefined(
		// 										array[MAX_ARRAY_LENGTH - 1]
		// 									)
		// 								)
		// 									return infinite.algorithms.recarrays.slice.lastIndex(
		// 										MAX_ARRAY_LENGTH,
		// 										generator,
		// 										comparison,
		// 										curr
		// 									)(
		// 										array[MAX_ARRAY_LENGTH - 1],
		// 										begind,
		// 										enind,
		// 										currIndex
		// 									)

		// 								return baseArr
		// 							}
		// 						}

		// 						let isEnd = false
		// 						let j = i

		// 						// ! This thing with repeated 'loop for checking for element undefinedness' should really be generalized...
		// 						// TODO: pray do so...
		// 						// ? Shouldn't one place the 'if' within the "for"'s condition???
		// 						// * Pray think a bit on it...
		// 						for (; j < MAX_ARRAY_LENGTH - 1; j++) {
		// 							if (
		// 								(isEnd = comparison(
		// 									(curr = generator(curr)),
		// 									enind
		// 								)) ||
		// 								isUndefined(array[j])
		// 							)
		// 								break
		// 							infinite.algorithms.recarrays.pushback.lastIndex(
		// 								MAX_ARRAY_LENGTH,
		// 								isUndefined
		// 							)(newArr, array[j])
		// 						}

		// 						if (isEnd || isUndefined(array[j])) return newArr
		// 						return infinite.algorithms.recarrays.concat.lastIndex(
		// 							MAX_ARRAY_LENGTH,
		// 							false
		// 						)(newArr, array[j])
		// 					}
		// 				)
		// 			}
		// 		},
		// 		// * Projects a piece of an array onto another array of the same recursive type after and before having met certain index of the generator with a certain 'compared' property...;
		// 		// ^ IDEA: into the docs, pray introduce the idea of 'array recursive type'; It'd allow to [more explicitly and structuredly on documentation level] separate all the 'recarrays' things from each other on a type level, not only the concept-level...
		// 		// ! MORE AND MORE OF THESE THINGS TEND TO BE ARRAY-TYPE-INDEPENDENT!
		// 		// TODO: create a list of array methods that are defining of the structure of it, then make them into separate algorithms, the general ones make into 'templated' methods [that being, just add a 'arrtypelabel' parameter];
		// 		// TODO: create the generalized templated elementary recursive functions for dealing with the recursive arrays [those that could be used by the user on a general basis for construction of new array types];
		// 		// TODO: after having done so, pray make the already available recursive array algorithms into the combinations of these elementary methods...
		// 		project: {},
		// 		concat: {
		// 			lastIndex(MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH, copy = true) {
		// 				return functionTemplate(
		// 					{ MAX_ARRAY_LENGTH, copy },
		// 					function (...arrays) {
		// 						if (arrays.length < 2) return arrays[0]
		// 						if (arrays.length > 2)
		// 							return infinite.algorithms.recarrays.concat.lastIndex(
		// 								MAX_ARRAY_LENGTH,
		// 								false
		// 							)(
		// 								infinite.algorithms.recarrays.concat.lastIndex(
		// 									MAX_ARRAY_LENGTH,
		// 									arrays.length === 3
		// 								)(arrays.slice(0, arrays.length - 1)),
		// 								arrays[arrays.length - 1]
		// 							)

		// 						// todo: problem with using the 'deepCopy' on recursive arrays: fix;
		// 						// * Problem is such -- one wants only a ARRAY-STRUCTURAL copy, not the object copies;
		// 						// * SOLUTION: have a copying algorithm for each and every kind of recursive array [infinite.algorithms.recarrays.copy]...
		// 						// TODO: implement it...
		// 						const copied = copy
		// 							? infinite.deepCopy(arrays[0])
		// 							: arrays[0]

		// 						for (let i = 0; i < arrays[1].length - 1; i++)
		// 							infinite.algorithms.recarrays.pushback.lastIndex(
		// 								MAX_ARRAY_LENGTH
		// 							)(copied, arrays[1][i])

		// 						// ? Now, this decision about the notation for the 'infinite' 'algorithms' subobject, one is happy. HOWEVER...
		// 						// * It does look raaather cumbersome. What to do?
		// 						// ^ IDEA: provide a 'shortcuts' object;
		// 						// ! PROBLEM: it either won't be meaningfully named [like the way one would want] or it would be in essence the same thing, but uglier
		// 						// * CONCLUSION: this thing shouldn't be done on the library level
		// 						// later, pray delete this note...
		// 						if (
		// 							arrays[1][arrays[1].length - 1] instanceof Array
		// 						)
		// 							return infinite.algorithms.recarrays.concat.lastIndex(
		// 								copied,
		// 								arrays[1][arrays[1].length - 1]
		// 							)

		// 						infinite.algorithms.recarrays.pushback.lastIndex(
		// 							copied,
		// 							arrays[1][arrays[1].length - 1]
		// 						)
		// 						return copied
		// 					}
		// 				)
		// 			}
		// 		},
		// 		// ? Question: about the matter of whether to affect the arrays in question??? How should methods be implemented?
		// 		// TODO: think on it and decide [currently preferred: copying];
		// 		delete: {
		// 			lastIndex(
		// 				MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH,
		// 				generator,
		// 				comparison = valueCompare,
		// 				undefinedSymbol = undefined,
		// 				isUndefined = (x) => x === undefined
		// 			) {
		// 				return functionTemplate(
		// 					{
		// 						MAX_ARRAY_LENGTH,
		// 						generator,
		// 						comparison,
		// 						isUndefined,
		// 						undefinedSymbol
		// 					},
		// 					function (array, index, currIndex = undefinedSymbol) {
		// 						let curr = currIndex
		// 						let haveFound = false
		// 						// TODO: again, refactor...
		// 						for (
		// 							let i = 0;
		// 							i < MAX_ARRAY_LENGTH &&
		// 							!(haveFound = comparison(
		// 								(curr = generator(curr)),
		// 								index
		// 							)) &&
		// 							!isUndefined(array[i]);
		// 							i++
		// 						) {}
		// 						// ! PROBLEM [format];
		// 						// * The ()() notation actually isn't correct. One forgot about the '.function' bit.
		// 						// TODO: for now, write like that, then fix everywhere else. These are rough sketches for now...
		// 						if (!haveFound)
		// 							return infinite.algorithms.recarrays.delete.lastIndex(
		// 								MAX_ARRAY_LENGTH,
		// 								generator,
		// 								comparison,
		// 								undefinedSymbol,
		// 								isUndefined
		// 							)(array, index, curr)

		// 						infinite.algorithms.recarrays.shiftBackward.lastIndex(
		// 							MAX_ARRAY_LENGTH
		// 						)(array)
		// 						return
		// 					}
		// 				)
		// 			}
		// 		},
		// 		shiftBackward: {
		// 			// ! PROBLEM: arrays like [..., [...]] would be treated ambigiously always when choosing between the arr.length - 1 and MAX_ARRAY_LENGTH as a 'recursion point'!
		// 			// * CONCLUSION: DON'T DO THAT 'choose the min-length' thing; keeping for this commit, but generally...
		// 			// TODO: GET RID OF IT. Make the 'place of recursion' static [like the way it is!]! Make algorithms implementations [generally] more internally integral and coherent.
		// 			// TODO: again, the 'object' thing -- this don't use the template's value; it's not useful for writing here; Rewrite all the stuff that ever uses templates in a manner which DOES use this...
		// 			lastIndex(MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH) {
		// 				return functionTemplate(
		// 					{ MAX_ARRAY_LENGTH },
		// 					function (array) {
		// 						// TODO: micro-optimize the library harshly; little things like "change all the 'i++' to '++i'" or "use 'p[p.length] = ...' instead of 'p.push(...)'"[that's just a tiny bit faster...]
		// 						// ^ IDEA: an alias 'fpush' for 'fast push' 'fpush := (a, e) => (a[a.length] = e);';
		// 						// * Add;
		// 						for (let i = 0; i < array.length - 2; ++i)
		// 							array[i] = array[i + 1]
		// 						if (array[MAX_ARRAY_LENGTH - 1]) {
		// 							array[MAX_ARRAY_LENGTH - 2] =
		// 								array[MAX_ARRAY_LENGTH - 1][0]
		// 							infinite.algorithms.recarrays.shiftBackward.lastIndex(
		// 								MAX_ARRAY_LENGTH
		// 							)(array[MAX_ARRAY_LENGTH - 1])
		// 							return
		// 						}
		// 						delete array[array.length - 1]
		// 					}
		// 				)
		// 			}
		// 		},
		// 		// * Here, all the 'conversion' arrays go; This thing assumes an input to be either a 'flat' [id est, finite native to JS] array or its recursive extension used by the 'backward' methods...
		// 		convertForward: {},
		// 		// * Here, all the 'inverse-conversions' go; they convert all the supported types of the recursive arrays into the universal form used by the library which is an extension of the 'flat' arrays...
		// 		// TODO: create such a format;
		// 		// ! PROBLEM: may not turn out it to be an 'extension'; same problem as before -- format ambiguity -- questions like "is the array that is an element merely a part of the recursive structure or an actual element?";
		// 		convertBackward: {}
		// 	}
		// },
	}

	// * Copies an object/array deeply...
	RESULT.infinite.deepCopy = RESULT.infinite.copyFunction({
		list: ["array", "object", "function", "symbol", "primitive"]
	})

	// * Keeps the functions references intact whilst copying...
	RESULT.infinite.dataCopy = RESULT.infinite.copyFunction({
		list: ["array", "object", "symbol"]
	})

	// * Does a flat copy of something;
	RESULT.infinite.flatCopy = RESULT.infinite.copyFunction({
		list: ["arrayFlat", "objectFlat", "function", "symbol"]
	})

	// TODO: rewrite the docs...
	// ! Start by deleting the old docs [those that are completely off what the thing in question is about now...]; the rest - pray rewrite [either on-the-spot, or a tad later...]
	// * Begin with small and simple stuff that's been mostly finished on conceptual level ; Things like copying functions, examplified...
	// ^ IDEA: let each and every in-editor documentation bit possess a link to the definition of the thing in question [in GitHub repo, for instance???], along with the similar link to the GitHub Wiki-s and a brief unique description of its purpose [along with using full spectre of JSDoc notation, perhaps???];
	// Wiki, then, would go into greater depths as to the purposes, possible uses, examples, definitions and technicalities of each and every abstraction in the question...
	// ? Question: what about aliases? Should one simply leave the 'REFER TO THAT...'-kind of messages for them, repeat the same information???
	// * Current decision: no, do the 'refer'-thing instead; Cleaner;

	// TODO: work on the within-the-library subtype-system;
	// * Let aliases be only aliases; The rest of this stuff qualifies to be a proper function [they were just created for shortening frequently repeated general constructions - refactoring]...
	// Starting to do just that...
	// ^ IDEA: modularize the library further...
	// * Let it be divided like so:
	// RESULT = {
	// 		submodules : {infinite: {...}},
	// 		aliases: {...},
	// 		functions (or 'methods' better?): {...},
	// 		classes : {...},
	// 		constants: {...},
	// 		globals: {...}
	// 	}
	// ? Only question would be - how would one oneself qualify each and every element of the library in accordance with the system of such a kind???
	// * CURRENT CONCLUSION AS TO THE PROGRESS: wonderful! first, however, one ought to work on the particular matters - such as cleaning up, documentation, move things about, finish other related stuff;
	// For the change would affect each and every single aspect of the module requiring self-reference [and it does it all the time...], it would be [under one's interpretation] a far less prone--to--re-doing--the--bits--of--progress--established--insofar--from--null kind of approach;
	// TODO: also - work on the 'global's structure... They're supposed to be {get() {...}, set () {...}, object: ...} kind of structures... (akin to the GeneralArray.length())

	// Aliases

	RESULT.exp = op
	RESULT.repeatedArithmetic = repeatedOperation
	RESULT.sameOperator = repeatedArithmetic
	RESULT.mostPopularElem = mostPopular
	RESULT.mostPopularNum = mostPopular
	RESULT.repeatedApplicationWhile = repeatedApplicationWhilst

	// TODO: use these things in appropriate places within the code. Give it a good shortening session: walk about making aliases for repeating expressions and then replace those with the newly introduced names...
	// ? work on renaming the aliases properly....; pay particular attention to the "_" counterparts...
	RESULT.bind = (a, f, fieldName) => (a[fieldName] = f.bind(a))
	// * What about 'firstSuch' and 'lastSuch' instead??? Then, '_first' and '_last' would be just 'first' and 'last' correspondently...
	RESULT.last = (arr, obj, comparison = valueCompare) => {
		return max(indexOfMult(arr, obj, comparison))
	}
	RESULT.first = (arr, obj, comparison = valueCompare) => {
		return min(indexOfMult(arr, obj, comparison))
	}
	RESULT._last = (arr) => arr[arr.length - 1]
	RESULT._first = (arr) => arr[0]
	RESULT.insert = (arr, index, values) =>
		arr.slice(0, index).concat(values).concat(arr.slice(index))
	RESULT._insert = (arr, index, val) => insert(arr, index, [val])
	RESULT.remove = (arr, start, end) =>
		arr.slice(0, start).concat(arr.slice(end + 1))
	RESULT._remove = (arr, index) => remove(arr, index, index)
	RESULT.minlen = (...arrs) => flen(min, ...arrs)
	RESULT.maxlen = (...arrs) => flen(max, ...arrs)
	RESULT.flen = (f, ...arrs) => {
		return f(arrs.map((a) => a.length))
	}
	RESULT.flenarrs = (f, ...arrs) => {
		const _f = f(...arrs)
		return arrs.filter((a) => a.length === _f)
	}
	RESULT.minlenarrs = (...arrs) => flenarrs(minlen, ...arrs)
	RESULT.maxlenarrs = (...arrs) => flenarrs(maxlen, ...arrs)
	RESULT.propertymap = (prop) => (objs) => objs.map((a) => a[prop])
	RESULT.refCompare = (a, b) => a === b

	// TODO: work on the phrasing; A lot of work is required on the phrasing....
	/**
	 * * Returns a constant-function based on the argument;
	 *
	 * DEFINITION:
	 *
	 * WIKI:
	 */
	RESULT._const = (c) => () => c

	/**
	 * * An alias for the 'infinite.flatCopy' function;
	 *
	 * REFER TO THAT...
	 */
	RESULT.copy = infinite.flatCopy

	// * Identity map (just a nice piece of notation, that's all);
	/**
	 * * The identity map;
	 *
	 * DEFINITION:
	 *
	 * WIKI:
	 */
	RESULT.id = ID

	/**
	 * * Returns the function returning the logical negation of the output of the function passed relative to the input of the newly passed argument;
	 *
	 * In short, performs logical negation of a function;
	 *
	 * DEFINITION:
	 *
	 * WIKI:
	 */
	RESULT.negate = (f) => (x) => !f(x)

	/**
	 *
	 */
	RESULT.compose = (fs) => {
		if (!fs.length) return undefined
		return fs[fs.length - 1](RESULT.compose())
	}

	// Classes

	/**
	 * This class represents an assembly of various statistics on the array of numeric data given.
	 *
	 * Useful when needing a lot of info about data in one place.
	 */
	RESULT.Statistics = class {
		static isNumeric(data) {
			for (let i = 0; i < data.length; i++)
				if (typeof data[i] !== "number") return false
			return true
		}
		/**
		 * Takes nums array and creates a Statistics object, containing statistic about the row of numeric data.
		 * @param {number[]} nums An array of numbers passed to the function.
		 * @param {boolean} forward Tells the constructor should, or should not array be structured in order from the least to the largest num or not in case if it is not structured.
		 */
		constructor(nums = [], forward = true, nullValue = "None") {
			if (Statistics.isNumeric(nums)) {
				this.min = min(nums)
				this.max = max(nums)
				this.sorted = sort(nums, forward)
				this.range = range(nums)
				this.interquartRange = range(nums, true)
				this.median = median(nums)
				this.average = average(nums)
				this.truncatedAverage = average(nums, true)
				this.deviations = deviations(nums)
				this.populationVariance = dispersion(nums)
				this.populationStandDev = standardDeviation(nums)
				this.standardError = standardError(nums)
			} else {
				this.min = null
				this.max = null
				this.sorted = null
				this.range = null
				this.interquartRange = null
				this.median = null
				this.average = null
				this.truncatedAverage = null
				this.deviations = null
				this.populationVariance = null
				this.populationStandDev = null
				this.standardError = null
			}
			this.mostPopular = mostPopular(nums, nullValue)
			this.length = nums.length
			this.dim = dim(nums)
		}
	}

	// TODO: add the user interface to the window of the Surface.draw(), such that it would be possible to modify a surface given right there....
	// TODO: get rid of the inLimits: let the thing be scalable: that is, if there is
	/**
	 * This class represents a geometric surface with dots, segments and lines on it.
	 * They are represented via coordinates.
	 */
	RESULT.Surface = class {
		static n = 0
		// TODO: add capability to have the initial Surface not being empty (unlike it is at the moment...)
		// TODO: use the Tuple type from one's library for the [number...] arrays...
		/**
		 * Takes two objects(or just numeric arrays) with properties from 0 to 2 and creates a Surface object.
		 *
		 * !!! NOTE: Be careful, when choosing step in your limits objects(or arrays), because after Surface.x and Surface.y properties of your object are generated
		 * you can work with this object, providing only dots' coordinates, that exist in these arrays, otherwise you get an error. !!!
		 *
		 * @param {object | number[]} xInit Object(or an array) containing number properties for the x axis of your surface. First number - the start position(the smallest number) of your surface's axis, second numder - the end position of your surafce's x axis and the third is that step, with which an array of numbers will be assembled.
		 * @param {object | number[]} yInit The same as xLimits, but for y axis of your surface.
		 */
		constructor(xInit, yInit) {
			this.n = 0
			this.x = [...xInit]
			this.y = [...yInit]
			this.width = range(this.x)
			this.height = range(this.y)
			this.dots = []
			this.lines = []
			this.segments = []
			this.n = ++Surface.n
		}
		// ? make the "line" have the same shape as a segment? This way, one could have lines that are "not full" in the middle...
		// * CURRENT DECISION: sure, why not?
		add(type, data) {
			if (
				indexOfMult(this[`${type}s`], data, infinite.valueCompare).length !==
				0
			)
				return this[`${type}s`].length
			const returned =
				type === "segment"
					? this.segments.push(data)
					: this[`${type}s`].push(data)
			const minIndex = indexOfMult(this.x, min(this.x))[0]
			let maxIndex = indexOfMult(this.x, max(this.x))[0]
			if (minIndex === maxIndex) maxIndex++
			let minData = 0
			let maxData = 0
			if (type === "segment") {
				const copy = gutInnerArrs([...data])
				const maxs = []
				const mins = []
				for (let i = 0; i < copy.length; i++) {
					maxs.push(max(copy[i]))
					mins.push(min(copy[i]))
				}
				minData = min(mins)
				maxData = max(maxs)
			} else {
				minData = min(data)
				maxData = max(data)
			}
			this.x[minIndex] = min([minData, this.x[minIndex]])
			this.x[maxIndex] = max([maxData, this.x[maxIndex]])
			this.y[minIndex] = min([minData, this.y[minIndex]])
			this.y[maxIndex] = max([maxData, this.y[maxIndex]])
			return returned
		}
		// ? question: should the x and y automatically shrink with the deletion of border objects? Or no?
		// * Current decision: no, let it stay...
		delete(type, data) {
			return (this[`${type}s`] =
				indexOfMult(this[`${type}s`], data, infinite.valueCompare).length ===
				0
					? this[`${type}s`]
					: clearRepetitions(
							this[`${type}s`],
							data,
							0,
							infinite.valueCompare
					  )).length
		}
		draw(width, height, title = `Surface ${this.n}`) {
			// TODO: this is to be written ; the decision to use the "ntk" was scratched; an alternative solution is currently sought;
		}
	}

	/**
	 * This class represents a mathematical arithmetic expression.
	 *
	 * It can also come in helpful when evaluating the same expression various number of times.
	 */
	RESULT.Expression = class {
		/**
		 * Takes two arrays, one of which contains numbers, used in the expression and the other one contains strings, containing operators, using which expression shall be executed (only after calling one of functions, working with expressions: exp(), repeatedArithmetic(), fullExp(), repeatExp().)
		 * @param {string[]} objects An array, containing numbers of expression.
		 * @param {string[]} operators An array, containing operators of expression.
		 */
		constructor(objects = [], operators = [], table = defaultTable) {
			this.objects = objects
			this.operators = operators
			this.table = table
		}
		/**
		 * Just a wrapper for fullExp() function. Watch documentation for it.
		 */
		execute() {
			return fullExp(this)
		}
		// TODO: create a new kind of "repeat": repeat (just repeat) and repeatCompose (the current repeat), also make the repeatCompose take an array of arguments for an operator;
		// TODO: then, add the repeatComposeSame as the current repeat (special case of the repeatCompose)...
		/**
		 * Wrapper for repeatExp() function. Watch documentation for it.
		 * @param {number} times A number, representing how many times should current expression be repeated (By default 1).
		 * @param {string} operator A string, representing the operator, with which ariphmetic operation upon the expression result will be done a several times.
		 */
		repeat(operator, times = 1) {
			return repeatExp(this, operator, times)
		}
	}

	// TODO: look through this stuff; rename, refactor/shorten, generalize code where want to;
	/**
	 * This a class that contains various statistical tests.
	 * It is a static class, i.e. it is supposed to be like this:
	 * * Tests.testName();
	 */
	RESULT.Tests = class {
		constructor() {
			throw new TypeError("Tests is not a constructor")
		}
		/**
		 * Takes an array and a number and checks if the length of the given array equals the given number. If not, throws new Error. Otherwise returns void.
		 * @param {any[]} arr An array, size of which is to be checked for being equal to size parameter.
		 * @param {number} size A number, equality to which is checked.
		 * @throws Error, if the length of given array is not equal to the size parameter.
		 */
		static sizecheck(arr, size) {
			if (arr.length !== size)
				throw new Error(
					`Expected ${size} elements inside of the passed array, got ${arr.length}.`
				)
		}
		/**
		 * Takes a two-dimensional numeric array, containing two other arrays, and returns the number, representing the value of Student's t-test.
		 * @param {number[]} rows Numeric array, containing two arrays, for which value of Student's t-test is to be found.
		 */
		static t_Students_test(...rows) {
			Tests.sizecheck(rows, 2)
			const averages = [average(rows[0]), average(rows[1])]
			const errors = [
				Math.pow(standardError(rows[0]), 2),
				Math.pow(standardError(rows[1]), 2)
			]
			return floor(
				exp(
					[
						Math.abs(exp([averages[0], averages[1]], "-")),
						Math.sqrt(exp([errors[0], errors[1]], "+"))
					],
					"/"
				),
				globalPrecision
			)
		}
		// ? question: should one keep the runtime checks if the compile-time check is already there?
		// TODO: make a decision and change/keep correspondently;
		// * CURRENT DECISION: nah, let it stay; one likes it, that is cute;
		/**
		 * Takes a two-dimensional array, containing two arrays, and a number and returns the numeric value of f-test for the equality of dispersions of two sub-arrays.
		 * @param {number[]} rows Two one-dimensional arrays, the equality of dispersions of which shall be found.
		 */
		static F_test(...rows) {
			Tests.sizecheck(rows, 2)
			const dispersions = [
				dispersion(rows[0], true),
				dispersion(rows[1], true)
			]
			const biggerDispersionIndex = dispersions[0] > dispersions[1] ? 0 : 1
			const difference = exp(
				[
					dispersions[biggerDispersionIndex],
					dispersions[Number(!biggerDispersionIndex)]
				],
				"/"
			)
			return floor(difference, globalPrecision)
		}
		/**
		 * Takes a two-dimensional array of numbers and returns the number, representing the results of the Mann-Whitney U-test.
		 * !NOTE: For now be careful, when using, because the method does not work with the arrays, that have repeating numbers in them.
		 * @param {number[][]} rows Two one-dimensional arrays, using which the u-test is to be done.
		 */
		static U_test(...rows) {
			Tests.sizecheck(rows, 2)
			let firstSum = 0
			let secondSum = 0
			let tempNum = 0
			const general = []
			const ranks = []
			;`${rows[0]},${rows[1]}`
				.split(",")
				.forEach((str) => general.push(Number(str)))
			const final = sort(general)
			final.forEach((num, index) => {
				if (num != final[index - 1] && num != final[index + 1]) {
					ranks.push(index + 1)
					tempNum = 0
				} else {
					//! NOT WORKING! FIX!
					if (num === final[index + 1]) {
						ranks.push(index + 1.5) //! Reason is in this thing!
						tempNum = index + 1.5 //! And in this one also. Instead of putting 1.5 here I need to somehow rank the repeating numbers the correct way (but how ???).
					} else {
						ranks.push(tempNum)
					}
				}
			})
			final.forEach((num, index) => {
				if (rows[0].includes(num)) firstSum += ranks[index]
				if (rows[1].includes(num)) secondSum += ranks[index]
			})
			const firstResult =
				rows[0].length * rows[1].length +
				(rows[0].length * (rows[0].length + 1)) / 2 -
				firstSum
			const secondResult =
				rows[0].length * rows[1].length +
				(rows[1].length * (rows[1].length + 1)) / 2 -
				secondSum
			return min([firstResult, secondResult])
		}
		/**
		 * Takes a number and an array of numbers and returns the Z-score for the given number.
		 * @param {number} testedNum A number for which the Z-score is to be found.
		 * @param {number[]} numbers An array of numbers, required to calculate the Z-score for the given number.
		 */
		static Z_score(testedNum, numbers) {
			return exp(
				[testedNum - average(numbers), standardDeviation(numbers)],
				"/"
			)
		}
	}

	// TODO: Add the runtime type-safety to all the data-keeping types...
	// ? Suggestion: Add the runtime type-safety to all the things within the library...
	/**
	 * This class represents a length-safe array with some nice stuff added to it.
	 * It also may behave like a mathematical vector.
	 */
	RESULT.Vector = class {
		// TODO: make this thing into a separate type or something... It is very big and clumsy (though, useful...)
		constructor(vectorargs) {
			// TODO: let there be way for user to give their own defaults for this thing...
			ensureProperties(vectorargs, {
				vector: [],
				defaultelement: () => null,
				transform: null,
				vectortypes: [
					"number",
					"string",
					"boolean",
					"function",
					"object",
					"bigint",
					"any",
					"undefined",
					"symbol"
				],
				typefunction: (x) => typeof x,
				type: ["any"],
				typecheck: (item) => {
					if (
						!this.type.includes(typeof item) &&
						!this.type.includes("any")
					) {
						if (this.transform) return this.transform(item)
						throw new Error(
							`Type of item ${item} is not equal to vector type: [${this.type
								.map((a) => `"${a}"`)
								.join(",")}]. Item type: ${typeof item}`
						)
					}
				}
			})
			this._vector = vectorargs.vector
			this._length = vectorargs.vector.length
			this.type = vectorargs.type
			this.default = vectorargs.defaultelement
			this.transform = vectorargs.transform
			this.vectortypes = vectorargs.vectortypes
			this.typefunction = vectorargs.typefunction
			this.typecheck = vectorargs.typecheck
			this.typefail = vectorargs.typefail
		}
		// TODO: there should be a "defaultReturn" function for the cases like these (what should be returned on the failing of the typecheck?);
		static typecheck(item, vector) {
			if (!vector.typecheck(item)) {
				if (!vector.transform) {
					vector.typefail()
					return
				}
				return vector.transform(item)
			}
			return item
		}
		delete(index) {
			const deleted = this._vector[index]
			if (index < this._length - 1)
				for (let i = index; i < this._length - 1; i++)
					this._vector[i] = this._vector[i + 1]
			this._length--
			this._vector.pop()
			return deleted
		}
		// TODO: make arbitrary indexes writeable...
		add(item) {
			if (!this.transform) Vector.typecheck(item, this)
			this._length++
			return this.vector.push(this.transform ? this.transform(item) : item) - 1
		}
		swap(index1, index2) {
			if (
				typeof index1 !== "number" ||
				typeof index2 !== "number" ||
				this._vector[index1] === undefined ||
				this._vector[index2] === undefined
			)
				throw new Error("Invalid indexes passed. ")
			const temp = this._vector[index1]
			this._vector[index1] = this._vector[index2]
			this._vector[index2] = temp
		}
		fill(item) {
			Vector.typecheck(item, this)
			this._vector.fill(item)
			return this
		}
		// TODO: here, implement a beautiful construction way for arbitrary Vectors;
		construct() {}
		set(index, value) {
			if (this._vector[index] === undefined)
				throw new Error("Invalid index passed into the set function.")
			this._vector[index] = value
		}
		index(i) {
			return this._vector[i]
		}
		slice(start, end = this.vector.length) {
			const sliced = this._vector.slice(start, end)
			return new Vector({
				vectortypes: this._type,
				typefunction: sliced.length,
				type: sliced
			})
		}
		indexof(element) {
			return this._vector.indexOf(element)
		}
		indexes(element) {
			const indexes = [this._vector.indexOf(element)]
			if (indexes[0] >= 0)
				for (let i = indexes[0] + 1; i < this._length; i++)
					if (this._vector[i] === element) indexes.push(i)
			return indexes
		}
		concat(vector) {
			return this.vector.concat(vector.vector)
		}
		map(f = (x) => x, type = this.type) {
			return new Vector({
				vectortypes: type,
				typefunction: this.vector.map(f)
			})
		}
		byElement(vector, operation) {
			const newVec = this.copy()
			for (let i = 0; i < Math.min(vector.length, this.length); i++)
				newVec.set(i, operation(this.vector[i], vector.vector[i]))
			return newVec
		}
		copy() {
			return new Vector({
				vectortypes: infinite.deepCopy(this.vectortypes),
				typefunction: this.typefunction,
				type: infinite.deepCopy(this.vector),
				vector: copy(this.type),
				defaultelement: this.default
			})
		}
		static type(array) {
			if (!array.length) return ["any"]
			// TODO: create a function called uniqueValues (or uniqueMap) for getting all the unique values of a certain function for an array of values into a new array in an order of following...
			const type = [typeof array[0]]
			for (const element of array)
				if (!type.includes(typeof element)) type.push(typeof element)
			return type
		}
		get length() {
			return this._length
		}
		get vector() {
			return this._vector
		}
		get type() {
			return this._type
		}
		set type(newType) {
			// TODO: create an isSubset array function; would check if one array is having all the elements of the other using some chosen 'comparison'; then, define isSuperset as its arguments' permutation...
			// TODO: the 'includes' don't work; change for something that is actually working generally (namely, add a 'comparison' type, use the library's new api stuff then...)...
			// * Again, if the current design decision is to be implemented, types will be capable of being changed more or less freely (more or less, because if the typecheck is not appropriate, error would ocurr...)
			// for (let i = 0; i < newType.length; i++)
			// 	if (!this.vectortypes.includes(newType[i]))
			// 		throw new Error(`Unknown vector type: ${newType}`)
			// TODO: fix... Give the entire code a very good look-through once have fixed the TypeErrors...
			// * Apply the generics where want to...
			this._type = newType
			this._vector = this.vector.map((a) => Vector.typecheck(a, this))
		}
		set length(newLength) {
			if (newLength < 0)
				throw new Error(`Passed negative length: ${newLength}`)
			if (newLength < this._length)
				for (let i = this._length; i > newLength; i--) this._vector.pop()
			if (newLength > this._length)
				for (let i = this._length; i < newLength; i++)
					this._vector[i] = this.default(this.type)
			this._length = newLength
		}
		set vector(newVector) {
			const type = Vector.type(newVector)
			this._vector = newVector
			this.length = newVector.length
			if (!infinite.valueCompare(type, this.type)) this._type = type
		}
	}

	// TODO: rewrite; finish...
	// * Current idea for a list of features:
	// * 1. All number-related methods and features;
	// * 2. Based on number-version of the Vector
	RESULT.NumberVector = class extends RESULT.Vector {
		vectorScalarMultiply(vector) {
			const main =
				Math.max(this.length, vector.length) == vector.length ? vector : this
			const other = main.vector == vector.vector ? this : vector
			return repeatedArithmetic(
				other.vector.map((el, i) => el * main.vector[i]),
				"+"
			)
		}
		crossProduct(vector) {
			if (this.length != 3 && this.length != 7)
				throw new Error(
					"Cross product is not defined for vectors, which lengths aren't 3 or 7. "
				)
			if (this.length != vector.length)
				throw new Error(
					"Trying to cross product vectors with different lengths. "
				)
			if (vector.length === 3)
				return new Vector({
					vectortypes: ["number"],
					typefunction: 3,
					type: [
						this.vector[1] * vector.vector[2] -
							vector.vector[1] * this.vector[2],
						vector.vector[0] * this.vector[2] -
							this.vector[0] * vector.vector[2],
						this.vector[0] * vector.vector[1] -
							this.vector[1] * vector.vector[0]
					]
				})
			// TODO: Use the RectMatrix product formula on wikipedia page.
		}
		scalarMultiply(scalar) {
			for (let i = 0; i < this._vector.length; i++) this._vector[i] *= scalar
		}
		scalarAdd(scalar) {
			for (let i = 0; i < this._vector.length; i++) this._vector[i] += scalar
		}
		// TODO: add vector addition...
	}
	// * Current idea for the list of features:
	// * 1. Arbitrarily shaped;
	// * 2. Full of numbers;
	// * 3. Can have user-defined operations for doing certain things with numbers;
	// TODO: finish work on the number-related matricies... Fix the errors... Adapt the old code...
	RESULT.NumberMatrix = class extends RESULT.Vector {}

	// * Current idea for the list of features:
	// * 1. Only numbers ;
	// * 2. Number-related methods present (they are classically defined by default, can be re-defined by the user...);
	// * 3. Rectangular-shaped;
	RESULT.RectNumberMatrix = class extends RESULT.NumberMatrix {
		matrixMultiply(matrix) {
			if (this.sidelen[0] !== matrix.sidelen[1])
				throw new Error(
					`Trying to multiply rectangular matrices with different values for width and height ${this.sidelen[0]} and ${matrix.sidelen[1]} correspondently. They must be equal.`
				)
			const copy = this.toArray()
			const matrixCopy = matrix.toArray()
			const result = copy.map(() => matrixCopy[0].map(() => 0))
			for (let i = 0; i < this.sidelen[1]; i++)
				for (let j = 0; j < matrix.sidelen[0]; j++)
					for (let k = 0; k < this.sidelen[0]; k++)
						result[i][j] += copy[i][k] * matrix[k][j]
			return new RectMatrix([matrix.sidelen[0], this.sidelen[1]], result)
		}
		// ! does one not want this to become a more generalized thing, like matrixOperator for example (one could attach this to op, then)?
		addMatrix(matrix) {
			// ! This should be thrown out, for user to implement...
			// * The library should have 2 different "kinds" matricies -- generalized generic ones and those for Numbers (based on the first ones);
			// * As an example: NumberRectMatrix and RectMatrix; NumberRectMatrix extends RectMatrix;
			if (!arrayEquality(matrix.sidelen, this.sidelen))
				throw new Error("Trying to add matrices with different lengths. ")
			// ! This here should be replaced with copying the thing (Question: should this be achieved via the constructor or via the deepCopy?)
			// ? funny, this oughtn't have worked before... Is it another one of those bugs that didn't get fixed in math-expressions.js 0.8?
			// * Current decision: use a deepCopy; That is because the constructor also checks for validity of a thing and one don't really care for that all that much...
			// * Current decision: do not copy (ignore the previous one :D); This thing (general version) should simply run the 'op' with corresponding operator definitions table, operator and also Matricies;
			// ! Considering the current development of things... Is it not best one gets rid of the old 'op' thing for good? As in... It all just comes down to getting a thing from a table
			// * No, let it stay; one will do the next: try to change the operators tables definitions to (TODO: refactor this with other libraries later) {[a: string | symbol | number]: <anything extends any[], type = any>(x: anything) => type}
			const thisCopy = new RectMatrix(this.sidelen, this.dimentions)
			for (let i = 0; i < matrix.sidelen[0]; i++)
				thisCopy.matrix[i].addVector(matrix.matrix[i])
			return thisCopy
		}
		scalarAdd(scalar) {
			for (let i = 0; i < this.sidelen[0]; i++)
				this.matrix.index(i).scalarAdd(scalar)
		}
		scalarMultiply(scalar) {
			for (let i = 0; i < this.sidelen[0]; i++)
				this.matrix.index(i).scalarMultiply(scalar)
		}
	}

	// * Current idea for the list of features:
	// * 1. Only numbers ;
	// * 2. Number-related methods present (they are classically defined by default, can be re-defined by the user...);
	// * 3. Square-shaped;
	RESULT.SquareNumberMatrix = class extends RESULT.RectNumberMatrix {
		/**
		 * Finds the determinant of a square matrix it's invoked onto.
		 */
		determinant() {
			function findAdditional(matrix, i, j) {
				const final = matrix.matrix.slice(1).vector.map(() => [])
				for (let index = 0; index < matrix.sidelen; index++)
					for (let jndex = 0; jndex < matrix.sidelen; jndex++)
						if (index !== i && jndex !== j)
							final[index > i ? index - 1 : index].push(
								matrix.toArray()[index][jndex]
							)
				return new SquareMatrix(final.length, final).determinant()
			}
			if (this.sidelen[0] < 2) {
				if (this.sidelen[0] === 1) return this.navigate([0, 0])
				return 0
			}
			if (this.sidelen[0] > 2) {
				if (this.sidelen[0] === 1) return this.matrix.index(0).index(0)
				const matricesDeterminants = {}
				let n = 0
				let finale = 0
				for (let j = 0; j < this.sidelen[0]; j++)
					matricesDeterminants[this.navigate([0, j])] = findAdditional(
						this,
						0,
						j
					)
				for (const pair in matricesDeterminants) {
					finale += matricesDeterminants[pair] * Number(pair) * (-1) ** n
					n++
				}
				return finale
			}
			return (
				this.navigate([0, 0]) * this.navigate([1, 1]) -
				this.navigate([1, 0]) * this.navigate([0, 1])
			)
		}
	}

	// TODO (reminder): create the "True"(Infinite) Number types for the 'newapi'; Let they be based on InfiniteCounters and also there be: (True/Infinite)Natural (which turns into Integer), (True/Infinite)Integer (which flows into Ratio), (True/Infinite)Ratio, and InfiniteSum;
	// TODO (reminder): create all sorts of implementations of mathematical functions like log, exponent, roots and others that would employ these; (Equally, create stuff for arbitrary logical systems and also finite PowerSeries Ratio/Integer/Natural representations)
	/**
	 * This class represents a mathematical ratio of two rational numbers (as a special case - integers).
	 */
	RESULT.Ratio = class {
		constructor(numerator, denomenator) {
			this.numerator = numerator
			this.denomenator = denomenator
		}
		evaluate() {
			return this.numerator / this.denomenator
		}
		add(ratio) {
			return Ratio.simplify(
				new Ratio(
					this.numerator * ratio.denomenator +
						ratio.numerator * this.denomenator,
					this.denomenator * ratio.denomenator
				)
			)
		}
		static simplify(ratio) {
			const len = Math.max(
				allFactors(ratio.numerator).length,
				allFactors(ratio.denomenator).length
			)
			let currDivisor
			for (let i = 0; i < len; i++) {
				currDivisor = leastCommonDivisor(ratio.numerator, ratio.denomenator)
				if (!currDivisor) break
				ratio.numerator /= currDivisor
				ratio.denomenator /= currDivisor
			}
			return ratio
		}
		array() {
			return [this.numerator, this.denomenator]
		}
		divide(ratio) {
			return this.multiply(ratio.multinverse())
		}
		multinverse() {
			return new Ratio(this.denomenator, this.numerator)
		}
		addinverse() {
			return new Ratio(-this.numerator, this.denomenator)
		}
		multiply(ratio) {
			return Ratio.simplify(
				new Ratio(
					this.numerator * ratio.numerator,
					this.denomenator * ratio.denomenator
				)
			)
		}
		subtract(ratio) {
			return this.add(ratio.addinverse())
		}
		power(exponent) {
			return new Ratio(
				this.numerator ** exponent,
				this.denomenator ** exponent
			)
		}
		root(exponent) {
			return this.power(1 / exponent)
		}
	}

	/**
	 * This class has a bunch of useful algorithms.
	 * This is one of the static classes, it contains only methods,
	 * i.e. it's supposed to be used like this:
	 * * Algorithms.algorithmName(arg_1, ..., arg_n);
	 */
	RESULT.Algorithms = class {
		constructor() {
			throw new TypeError("Algorithms is not a constructor")
		}
		static BinarySearch(array, number) {
			// * For getting the middle index of the array.
			const middle = (arr) => floor(median(arr.map((_a, i) => i)), 0)
			const copyArray = sort(array)
			let index = middle(copyArray)
			let copyArr = copy(copyArray)
			let copyIndex = index
			for (let i = 0; ; i++) {
				if (number === copyArray[index]) return index
				if (copyArr.length === 1) break
				const isBigger = number > copyArray[index]
				copyArr = isBigger
					? copyArr.slice(copyIndex + 1, copyArr.length)
					: copyArr.slice(0, copyIndex)
				copyIndex = middle(copyArr)
				index = isBigger ? index + copyIndex : index - copyIndex
			}
			return -1
		}
		/**
		 * Runs the Farey Algorithm with given ratios and number of iterations. Returns the resulting array of ratios.
		 * @param {Ratio} startRatio Ratio, from which the Farey Algorithm should start.
		 * @param {Ratio} endRatio Ratio, that is used as an upper bound in the algorithm.
		 * @param {number} iterations Number of iterations (integer).
		 */
		static Farey(startRatio, endRatio, iterations = 0) {
			// ? add as an operation to the Ratio class?
			function formNewRatio(first, second) {
				return new Ratio(
					first.numerator + second.numerator,
					first.denomenator + second.denomenator
				)
			}
			const gotten = [[startRatio, endRatio]]
			for (let i = 0; i < iterations; i++) {
				gotten.push([])
				for (let j = 0; j < gotten[i].length; j++) {
					gotten[i + 1].push(gotten[i][j])
					if (j !== gotten[i].length - 1)
						gotten[i + 1].push(
							formNewRatio(gotten[i][j], gotten[i][j + 1])
						)
				}
			}
			return gotten
		}
	}
	// ! Rename this thing; it's pretty general (so not Polynomial, for instance), but it's not JUST an equation; it's one involving numbers
	// * CURRENT IDEA FOR A NAME: NumberEquation...
	/**
	 * This class's purpose is to represent a mathematical equation of multiple variables.
	 * * Temporary note: for now it can be used only with simplest arithmetical operators (+, -, ^(exponentiation), /, *).
	 */
	RESULT.Equation = class {
		/**
		 * A static method for parsing an equation with various mappings applied.
		 * @param {string} equationLine A line, containing an equation.
		 * @param {VarMapping} mappings A mapping of variables to their values.
		 * @param {string[]} variables Additional variable names.
		 */
		static ParseEquation(equationLine, origmappings, variables) {
			const operators = ["+", "*", "/", "-", "^"]
			const brackets = ["[", "]", "(", ")", "{", "}"]
			const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."]
			let metEquality = false
			const mappings = { ...origmappings.varmap } // for simplicity of use
			function eliminateSpaces() {
				return equationLine.split(" ").join("")
			}
			function parse(line) {
				const result = { right: "", left: "" }
				for (let i = 0; i < line.length; i++) {
					switch (line[i]) {
						case "=":
							if (metEquality)
								throw new Error(
									"Met equality sign in the parsed string already!"
								)
							metEquality = true
							break
						default:
							if (line[i] === "^") {
								line = Equation.replaceIndex(line, i, "**")
								continue
							}
							if (mappings.variables.includes(line[i])) {
								line = Equation.replaceIndex(
									line,
									i,
									mappings.mappings[
										mappings.variables.indexOf(line[i])
									]
								)
								continue
							}
							if (brackets.includes(line[i])) {
								line = Equation.replaceIndex(
									line,
									i,
									brackets.indexOf(line[i]) % 2 === 0 ? "(" : ")"
								)
								continue
							}
							if (
								operators.includes(line[i]) ||
								digits.includes(line[i]) ||
								variables.includes(line[i])
							)
								continue
							throw new Error(`Unknown symbol detected: ${line[i]}`)
					}
				}
				for (let i = 0; i < line.length; i++) {
					if (line[i] === "=") {
						result.right = line.slice(0, i)
						result.left = line.slice(i + 1)
						break
					}
				}
				return result
			}
			return parse(eliminateSpaces())
		}
		/**
		 * This static method replaces a given index in a given string by a given value and returns the result.
		 * Note: Original string is NOT mutated.
		 *
		 * @param {string} string String, index in which is to be changed.
		 * @param {number} index Index.
		 * @param {number | string | boolean} val Value to be inserted on a place of index "index", thereby replacing it.
		 */
		static replaceIndex(string, index, val) {
			return string.substring(0, index) + val + string.substring(index + 1)
		}
		/**
		 * Parses an equation, that it's invoked onto.
		 * @param {VarMapping} mappings Various mappings for variables.
		 */
		parse(mappings) {
			return Equation.ParseEquation(this.equation, mappings, this.variables)
		}
		constructor(equationText = "", vars = ["x"], defaultMappings = []) {
			this.variables = []
			this.equation = ""
			this.defaultParsed = null
			this.defaultMappings = null
			this.variables = vars
			this.equation = equationText
			this.defaultMappings = defaultMappings
			this.defaultParsed = []
			for (let i = 0; i < defaultMappings.length; i++)
				this.defaultParsed.push(this.parse(defaultMappings[i]))
		}
		// TODO: Currently, plugging works correctly only with variables of length 1. Fix it.
		static plug(origparsed, varname, varvalue) {
			const parsed = { ...origparsed } // Making a copy.
			for (let i = 0; i < parsed.right.length; i++)
				if (parsed.right[i] === varname)
					parsed.right = Equation.replaceIndex(parsed.right, i, varvalue)
			for (let i = 0; i < parsed.left.length; i++)
				if (parsed.left[i] === varname)
					parsed.left = Equation.replaceIndex(parsed.left, i, varvalue)
			return parsed
		}
		/**
		 * Difference in between the right and left sides of the equation with mappings for different variables.
		 * @param {VarMapping} mappings Mapping of variables to their values.
		 * @param {string} varname Additional mapping, can be used with a variable, that is being searched for in an algorithm.
		 * @param {number} varvalue Addtional value.
		 */
		differRightLeft(mappings, varname, varvalue) {
			if (typeof varname !== "string")
				throw new Error(
					`Expected string as an input of variable name, got ${typeof varname}}`
				)
			const plugged = Equation.plug(this.parse(mappings), varname, varvalue)
			return eval(plugged.right) - eval(plugged.left)
		}
		/**
		 * This method searches for the solution of an equation it's invoked onto.
		 *
		 * ! WARNING 1 !
		 *
		 * This method performs only numerical search, i.e. it doesn't search for the precise solution.
		 * Just an approximation. (Namely, the one number of all given that is the closest to the solution.)
		 * (However, if the root is rational, then it could even be exactly it.)
		 *
		 * ! WARNING 2 !
		 *
		 * DO NOT set the precision to be more than 5 or 6, because otherwise the JavaScript stack won't handle it (unless, you extended it).
		 *
		 * PARAMETRES
		 *
		 * @param {VarMapping} mappings Mapping for all the variables in the equation except one for which search is invoked.
		 * @param {string} varname Name of the variable for which search is invoked.
		 * @param {number} startvalue Value, from which search is invoked.
		 * @param {number} pathlength The length of the search path.
		 * @param {number} precision The depth of the search, i.e. how accurate the final result shall be.
		 */
		searchSolution(mappings, varname, startvalue, pathlength, precision = 4) {
			const differences = generate(
				startvalue,
				startvalue + pathlength,
				floor(10 ** -precision, precision),
				precision
			).map((i) => {
				return Math.abs(this.differRightLeft(mappings, varname, i))
			})
			return (
				startvalue +
				differences.indexOf(min(differences)) *
					floor(10 ** -precision, precision)
			)
		}
		defaultDifferRightLeft(index, varname, varvalue) {
			if (typeof varname !== "string")
				throw new Error(
					`Expected string as an input of variable name, got ${typeof varname}}`
				)
			const plugged = Equation.plug(
				this.defaultParsed[index],
				varname,
				varvalue
			)
			return eval(plugged.right) - eval(plugged.left)
		}
		/**
		 * This method searches for the solution of an equation it's invoked onto using default mappings.
		 * It's technically supposed to be much faster because of the data preparation.
		 *
		 * ! WARNING 1 !
		 *
		 * This method performs only numerical search, i.e. it doesn't search for the precise solution.
		 * Just an approximation. (Namely, the one number of all given that is the closest to the solution.)
		 * (However, if the root is rational, then it could even be exactly it.)
		 *
		 * ! WARNING 2 !
		 *
		 * DO NOT set the precision to be more than 5 or 6, because otherwise the JavaScript stack won't handle it (unless, you extended it).
		 *
		 * PARAMETRES
		 * @param {number} index Index of the default mapping to be used.
		 * @param {string} varname Name of the variable for which search is invoked.
		 * @param {number} startvalue Value, from which search is invoked.
		 * @param {number} pathlength The length of the search path.
		 * @param {number} precision The depth of the search, i.e. how accurate the final result shall be.
		 */
		defaultSearchSolution(index, varname, startvalue, pathlength, precision) {
			const differences = generate(
				startvalue,
				startvalue + pathlength,
				floor(10 ** -precision, precision),
				precision
			).map((i) => {
				return Math.abs(this.defaultDifferRightLeft(index, varname, i))
			})
			return (
				startvalue +
				differences.indexOf(min(differences)) *
					floor(10 ** -precision, precision)
			)
		}
	}
	/**
	 * This class represents a mapping of variables to numeric values.
	 * It can be used separately or in combination with the Equation class.
	 * (It's original purpose was the second)
	 */
	RESULT.VarMapping = class {
		/**
		 * Constructs a new mapping based on the data inputted.
		 * @param {string[]} vars Variable names in a mapping.
		 * @param {number[]} maps Numerical values for them.
		 */
		constructor(vars = [], maps = []) {
			this.varmap = { variables: [], mappings: [] }
			function hasLetters(thing) {
				return thing.toLowerCase() !== thing.toUpperCase()
			}
			// ? what is this? deal with this thing later... Seems to have been inteded to be different from that...
			if (!(vars instanceof String) && !(maps instanceof Array))
				if (vars.length !== maps.length)
					throw new Error(
						"Arrays of different lengths passed to VarMapping constructor. "
					)
			for (let i = 0; i < vars.length; i++) {
				if (!hasLetters(vars[i]))
					throw new Error(
						`Varname without letters is being passed: ${vars[i]}`
					)
				for (let j = i + 1; j < vars.length; j++)
					if (vars[j] === vars[i])
						throw new Error(
							"Given repeating variable maps in the VarMapping constructor. "
						)
			}
			this.varmap.variables = vars
			this.varmap.mappings = maps
		}
		/**
		 * Adds a new pair of name-number to the mapping.
		 * Useful when using some sort of numerical function in a big cycle.
		 * @param {string} name Name of the new (or old) property.
		 * @param {number} value Numerical value to be set to the name.
		 */
		add(name, value) {
			if (typeof value !== "number")
				throw new Error("Given non-numeric data as a value for mapping. ")
			this.varmap.variables.push(name)
			this.varmap.mappings.push(value)
		}
		/**
		 * Deletes a property from varmap by the given name.
		 * @param {string} name Name to be used for deletion.
		 */
		delete(name) {
			for (
				let i = this.varmap.variables.indexOf(name);
				i < this.varmap.variables.length;
				i++
			) {
				this.varmap.variables[i] = this.varmap.variables[i + 1]
				this.varmap.mappings[i] = this.varmap.mappings[i + 1]
			}
			this.varmap.mappings.pop()
			this.varmap.variables.pop()
		}
	}

	// * For iteration over an array; this thing is index-free; handles them for the user;
	// * By taking different permutations of an array, one may cover all the possible ways of accessing a new element from a new one with this class;
	// ! This thing isn't infinite though. For infinite version, InfiniteArray could be used instead...
	RESULT.IterableSet = class {
		curr() {
			return Array.from(this.elements.values())[this.currindex]
		}
		updateIndex(change = 1) {
			this.currindex = (this.currindex + change) % this.elements.size
		}
		prev() {
			this.updateIndex(-1)
			return this.curr()
		}
		next() {
			this.updateIndex()
			return this.curr()
		}
		add(x) {
			return this.elements.add(x)
		}
		has(x) {
			return this.elements.has(x)
		}
		get size() {
			return this.elements.size
		}
		delete(x) {
			return this.elements.delete(x)
		}
		constructor(elems = new Set([])) {
			this.currindex = 0
			this.elements = elems
		}
	}

	// Functions

	RESULT.ensureProperty = function (object, property, value) {
		if (!object.hasOwnProperty(property)) object[property] = value
	}

	// * A convinient general-version...
	RESULT.ensureProperties = function (object, defaultobj) {
		for (const x in defaultobj) ensureProperty(object, x, defaultobj[x])
	}

	// ? Should one also add one that is related to shape-things? (Consider)
	RESULT.Matrix = function (
		vector,
		typechecker,
		defaultMatrix = [() => null, () => null],
		defaultTransform = [null, null]
	) {
		return nestedVector(
			vector,
			typechecker,
			defaultMatrix,
			defaultTransform,
			2,
			0
		)
	}

	// This thing is flexible; it adapts the output to input -- the result is a vector of corresponding depth (the input's inside arrays that are not the given type are all turned into vectors; all else is left untouched...)
	// Depth of the final vector is equal to the depth of the original array...
	RESULT.nestedVector = function (
		vector,
		typechecker,
		defaultElems = vector.map(() => () => null),
		transform = vector.map(() => null),
		dimensions = Infinity,
		currDim = 0
	) {
		return new Vector({
			vectortypes: ["any"],
			vector: vector.map((el) =>
				el instanceof Array && !typechecker(el) && currDim < dimensions
					? nestedVector(
							el,
							typechecker,
							defaultElems.slice(1),
							transform.slice(1),
							dimensions,
							currDim + 1
					  )
					: el
			),
			type: defaultElems[0],
			transform: transform[0]
		})
	}

	// * Counts all non-array elements within a multidimensional array passed...
	RESULT.nonArrElems = function (array) {
		return array instanceof Array
			? repeatedArithmetic(array.map(nonArrElems), "+")
			: 1
	}

	// Counts all the elements within a multi-dimensional array (including the arrays themselves...)
	RESULT.totalElems = function (array) {
		return array instanceof Array
			? array.length + repeatedArithmetic(array.map(totalElems), "+")
			: 0
	}

	// TODO: this thing it to be rewritten (both the JSDoc and the function...)
	/**
	 * Executes an arithmetic expression with two numbers
	 *
	 * * Note: with it you can even build a very simple calculator.
	 * * Plus, it's more secure an allows only aritmetic (for now, at least).
	 *
	 * @param {number} firstObj  First number.
	 * @param {number} secondObj Second number.
	 * @param {string} operator  String, containing an ariphmetic operator(+, -, /, *, ** or %).
	 * @returns {number} Result of a mathematical expression.
	 */
	RESULT.op = function (objects, operator, operatorTable = defaultTable) {
		// TODO: in a different library of mr. body, there's a _switch function that works on a passed object like a generalized switch; use this here, when code-reworking for 1.1;
		const values = Object.values(operatorTable)
		const keys = Object.keys(operatorTable)
		for (let i = 0; i < values.length; i++)
			if (operator === keys[i]) return values[i](...objects)
		throw new Error(`Undefined operator ${operator}!`)
	}

	// ? make the Expressions' api more complex? Add orders of following, arities, that sort of thing?
	// TODO: rewrite this later, as a repeated application of the same function on itself...
	// * Example of how one's future Code might look like (currrently, won't work; no dependency):
	// const repeatedOperation = (objects: string[], operator: string) =>
	// {
	// let i = 1
	// let result = objects[0]
	// const repeated = () => {result = exp(result, objects[i++], operator)}
	// return repeatedApplication(repeated, objects.length)
	// }
	/**
	 * Executes mathematical expression with the same operator repeating, but different numbers.
	 * @param {number[]} objects An array of numbers(or strings) using which expression will be executed.
	 * @param {string} operator - A string, containing an operator, with which expression will be executed.
	 */
	RESULT.repeatedOperation = function (
		objects = [],
		operator,
		table = defaultTable
	) {
		return new Expression(
			objects,
			objects.map(() => operator),
			table
		).execute()
	}

	// * Rework this thing capitally...
	// TODO: make this more configurable -- let there be ways for user to set at which index is the things concatenated together (currently, the 'operated' argument is always the first to be passed)...
	/**
	 * Executes mathematical expression with different operators and numbers.
	 *
	 * ! NOTE: passed operators[] array must be shorter than the passed numbers[] array for one element or the same length
	 * ! (b   ut in this case  last element of the operators[] array will be ignored).
	 *
	 * @param {Expression} expression An object, containing two array properties, one of which is for numbers(or strings) using which expression will be executed and the second is for strings, each of which contains an ariphmetic operator, using which expression shall be executed.
	 */
	RESULT.fullExp = function (expression) {
		// TODO: decide which one value to use as a "default" for library's "unknown value" -- null or undefined;
		// * Let this agree with the way other of self's libraries agree with this -- achieve the synonymity of style...
		return repeatedApplicationIndex(
			(double) => [
				exp(
					[
						double[0],
						generate(
							0,
							expression.table[expression.operators[i]][1] - 2
						).map((j) => expression.objects[double[1] + j])
					],
					expression.operators[i],
					expression.table
				),
				double[1] + expression.table[expression.operators[i]][2] - (i > 0)
			],
			expression.operators.length,
			[expression.objects[0], 0]
		)[0]
	}

	// TODO: same difficulty as above. WORKS ONLY WITH BINARY OPERATORS...
	// * This can be rewritten as a repeatedApplication of fullExp...
	/**
	 * Repeats an expression a bunch of times and returns you the result of making an ariphmetic actions between them.
	 *
	 * ! NOTE: keys of the key-value pairs of the passed object must have the next names: nums, operators.
	 * ! Wrong names of keys will cause an Error.
	 *
	 * @par   am {Expression} exssion An object, that contains two key-value pairs, where each value is an array. First array contains nums, second - operators.
	 * @param {number} timesRepeat   A number of repeats of ariphmetic operation.
	 * @param {string} repeatOperator   A string, containing an operator, with which ariphmetic operation upon the expression result will be done a several times.
	 */
	RESULT.repeatExp = function (expression, repeatOperator, timesRepeat = 1) {
		const tempRes = fullExp(expression)
		let result = deepCopy(tempRes)
		for (let i = 0; i < timesRepeat - 1; i++)
			result = exp([result, ...generate()], repeatOperator)
		return result
	}

	/**
	 * Takes the number array and rerturns an average of it.
	 * @par   am {number[]} nuAn array of numbers passed to the function.
	 * @param {boolean} isTruncated A boolean saying does or does not the average will be truncated. By default false.
	 * @param {number} percents A number, that is used as a multiplier for two, when shortening the numeric array.
	 */
	RESULT.average = function (nums = [], isTruncated = false, percents = 10) {
		return (function (newArr) {
			return floor(
				repeatedArithmetic(newArr, "+") /
					(nums.length + ((nums.length === newArr.length) - 1)),
				globalPrecision
			)
		})(isTruncated && percents > 0 ? truncate(nums, percents) : nums)
	}

	/**
	 * Take   s an array oumbers and returns the smallest of thems.
	 * @param {number[]} nums An array of numbers passed to the function.
	 * @returns {number} The smallest number of the passed array.
	 */
	RESULT.min = function (nums = []) {
		return arrApply(Math.min, nums)
	}

	/**
	 * Takes an array of numbers and returns the largest of them.
	 * @param {number[]} nums An array of numbers passed to the function.
	 * @returns {number} The largest number in passed numerical array.
	 */
	RESULT.max = function (nums = []) {
		return arrApply(Math.max, nums)
	}

	/**
	 * Takes an array of numbers, which length can be odd or even and returns the median of it.
	 * @param {number[]} nums An array of numbers, passed to the function.
	 */
	RESULT.median = function (nums = []) {
		return (function (sorted) {
			return (
				nums.length % 2 === 1
					? RESULT.id
					: (firstIndex) => average([firstIndex, sorted[nums.length / 2]])
			)(sorted[Math.round(nums.length / 2) - 1])
		})(sort(nums))
	}

	// TODO: create a type definition for this '(a: any, b: any) => boolean' thing; Replace it everywhere in the codebase...
	// * The same way, pray name all the redundant (appearing more than once) types;
	/**
	 * Takes an array and returns most "popular" number in it.
	 * @param {number[]} elems An array of numbers passed to the function.
	 * @param {any} noneValue A value, returned if the array doesn't have a most popular number. String "None" by default.
	 */
	RESULT.mostPopular = function (
		elems = [],
		noneValue = null,
		comparison = (a, b) => a === b
	) {
		if (elems.length === 0) return noneValue
		const freq = new UniversalMap(
			elems,
			elems.map((el) => countAppearences(elems, el, 0, comparison))
		)
		return indexOfMult(freq.values, max(freq.values), comparison).map(
			(a) => freq.keys[a]
		)
	}

	RESULT.leastPopular = function (
		elems = [],
		noneValue = null,
		comparison = (a, b) => a === b
	) {
		if (elems.length === 0) return noneValue
		const freq = new UniversalMap(
			elems,
			elems.map((el) => countAppearences(elems, el, 0, comparison))
		)
		return indexOfMult(freq.values, min(freq.values), comparison).map(
			(a) => freq.keys[a]
		)
	}

	// TODO: make the range of truncation an argument too... Generalize...
	/**
	 * @param {number[]} nums An array of numbers passed to the function.
	 * @param {boolean} isInterquartile A boolean, representing shall the range to be gotten be interquartille or not. By deafault false.
	 * @returns the range of the numeric array (if passed [-5, 10] returns 15).
	 */
	RESULT.range = function (nums = [], isInterquartile = false) {
		const newArr = isInterquartile ? truncate(nums, 25) : copy(nums)
		return floor(max(newArr) - min(newArr))
	}

	// TODO: what's below (star)...
	// * Make this thing into an object: let this be put under "bubble" (for bubble sort, if that's what this thing is...);
	/**
	 * Takes an array of numbers and returns sorted version of it.
	 * @param {number[]} nums An array of numbers, passed to the function to sort.
	 * @param {boolean} forward A boolean, on which value depends will the function sort an array from least to the largest or from largest to the least. By default true.
	 */
	RESULT.sort = function (nums = [], forward = true) {
		const listArr = copy(nums)
		const sorted = []
		if (forward) {
			for (let i = 0; i < nums.length; i++) {
				const least = min(listArr)
				listArr.splice(listArr.indexOf(least), 1)
				sorted.push(least)
			}
		} else {
			for (let i = 0; i < nums.length; i++) {
				const largest = max(listArr)
				listArr.splice(listArr.indexOf(largest), 1)
				sorted.push(largest)
			}
		}
		return sorted
	}

	/**
	 * Takes three numbers: the start position, the end position and the step, generates a numeric array using them and returns it.
	 * @param {number} start Start number in array(it's supposed to be the least number in it)
	 * @param {number} end End number in array(the creation of the array is going until end value + 1 number is reached).
	 * @param {number} step Value, by which the count is incremented every iteration.
	 * @param {number} precision Precision of a step, by default set to 1. (If your array is of integers, it's not necessary.)
	 */
	RESULT.generate = function (start, end, step = 1, precision = 1) {
		const generated = []
		const upper = realAddition(
			end,
			(-1) ** step < 0 * (Number.isInteger(step) ? 1 : 10 ** -precision)
		)[0]
		const proposition = step > 0 ? (i) => i < upper : (i) => i > upper
		for (let i = start; proposition(i); i += step)
			generated.push(floor(i, precision))
		return generated
	}

	// TODO: this should also separate onto findValue and findReference;
	// * Better just add a "comparison" bit, and default it to (a, b) => a === b like everywhere else with such situations...
	// TODO: this don't do what one did expect it to do... It should do the next take an array and an arbitrary thing and seek if it is in the array; If it is, return indexes where it is;
	// TODO: create a findMany function which would return a UniversalMap that would tell how many times and what had been found...
	/**
	 * Takes an array(or a string) and a number(or a one-dimensional array of numbers or a substring), that must be found in this array. If the value is found returns true and a count of times this number was found, otherwise false.
	 * @param {number[] | number[][] | string} searchArr Array in which queried value is being searched.
	 * @param {number | number[] | string} searchVal Searched value.
	 * @returns {[boolean, number, number[]]} An array, containig boolean(was the needed number, numeric array or string found in searchArr or not), a number(frequency) and an array of numbers(indexes, where the needed number or string characters were found), but the last one is only when the searchVal is not an array and searchArr is not a two-dimensional array.
	 */
	RESULT.find = function (searchArr, searchVal) {
		let result = false
		let foundTimes = 0
		const foundIndexes = []
		if (searchVal instanceof Array && searchArr instanceof Array)
			searchVal.forEach((value) =>
				searchArr.forEach((arr, index) =>
					arr.forEach((obj) => {
						if (value === obj) {
							result = true
							foundTimes++
							if (!foundIndexes.includes(index))
								foundIndexes.push(index)
						}
					})
				)
			)
		else
			for (let i = 0; i < searchArr.length; i++)
				searchArr[i] === searchVal
					? ((result = true), foundTimes++, foundIndexes.push(i))
					: null
		return [result, foundTimes, foundIndexes]
	}

	// todo: generalize -- let 'readable' be something that is definable by the user -- allow for an arbitrary separator, different patterns for indentation and so on... The current version would become a default...
	/**
	 * Takes a number and returns a string, containing it's readable variant. (Like 12345 and 12 345)
	 * @param {number} num A number, from which to make a better-looking version of it.
	 */
	RESULT.readable = function (num) {
		const arr = String(num).split("")
		let changeStr = ""
		while (arr.length % 3 > 0) {
			changeStr += arr[0]
			if ((arr.length - 1) % 3 === 0) changeStr += " "
			arr.shift()
		}
		arr.forEach((number, index) => {
			index % 3 === 0 && index > 0
				? (changeStr += ` ${number}`)
				: (changeStr += `${number}`)
		})
		return changeStr
	}

	RESULT.permutations = function (array) {
		if (array.length < 2) return [[...array]]

		const pprev = permutations(array.slice(0, array.length - 1))
		const pnext = []

		for (let i = 0; i < array.length; i++)
			for (let j = 0; j < pprev[i].length; j++)
				pnext.push([
					pprev[i].slice(0, i),
					array[array.length - 1],
					pprev[i].slice(i, pprev.length)
				])

		return pnext
	}

	RESULT.whileFunctional = function (prop, body, endElem = null) {
		return prop() ? [body(), whileFunctional(prop, body, endElem)] : endElem
	}

	/**
	 * Factors out a passed number to the prime numbers. Works quite quickly.
	 * @param {number} num Number, to be factored out.
	 * @returns {number[]} Prime factors array.
	 */
	RESULT.factorOut = function (number) {
		const factors = []
		for (
			let currDevisor = 2;
			number !== 1;
			currDevisor += currDevisor === 2 ? 1 : 2
		) {
			while (number % currDevisor === 0) {
				factors.push(currDevisor)
				number /= currDevisor
			}
		}
		return factors
	}

	RESULT.isPrime = function (x) {
		return factorOut(x).length === 1
	}

	RESULT.primesBefore = function (x) {
		return generate(1, x).filter(isPrime)
	}

	// * Brings whatever is given within the given base to base 10;
	// TODO: generalize this "alphabet" thing... Put this as a default of some kind somewhere...
	RESULT.nbase = function (nstr, base, alphabet = defaultAlphabet) {
		return repeatedArithmetic(
			generate(0, nstr.length - 1).map(
				(i) => alphabet.indexOf(nstr[i]) * base ** i
			),
			"+"
		)
	}

	// * Brings whatever in base 10 to whatever in whatever base is given...
	RESULT.nbasereverse = function (n, base, alphabet = defaultAlphabet) {
		const coefficients = []
		// TODO: call this thing nrepresentation(), then use here...
		// TODO: change this for either one's own implementation of log, or this, as an alias...
		let i = Math.floor(Math.log(n) / Math.log(base))
		while (n !== 0) {
			// TODO: add an operator for that to the defaultTable...
			n = (n - (n % base ** i)) / base
			coefficients.push(n)
			i--
		}
		// TODO: create a generalized map() function that would map to both functions, arrays and objects;
		return coefficients.map((i) => alphabet[i]).join("")
	}

	RESULT.strMap = function (str, symb) {
		return str.split("").map(symb)
	}

	RESULT.baseconvert = function (a, basebeg, baseend) {
		return nbasereverse(nbase(a, basebeg), baseend)
	}

	/**
	 * Takes a numeric array and a number and truncates the passed array, using the second paramater as a count of percents of numbers, that shall be deleted.
	 * @param {number[]} nums An array to be truncated.
	 * @param {number} percents A number, that is multiplied by two(if you passed 10, then it is 20) and represents count of percents of numbers to be deleted from the edges of the passed array.
	 */
	RESULT.truncate = function (nums, percents = 10) {
		const shortened = sort(copy(nums))
		const len = shortened.length
		const toDelete = Number(Math.trunc((len / 100) * percents))
		for (let i = 0; i < toDelete; i++) {
			shortened.shift()
			shortened.pop()
		}
		return shortened
	}

	// TODO: let all the non-alias-exports be handled by the export {...} piece of code, instead of it being done on-the-spot, like here...
	// ? This thing don't include 0. Should it include 0?
	RESULT.multiples = function (n, range) {
		return generate(1, range).map((a) => a * n)
	}

	// TODO: generalize for negative numbers, pray ['generate' does work with them, actually!]...
	// ? That is, if that is desired... Is it? Pray think...
	RESULT.multiplesBefore = function (n, x) {
		return multiples(n, floor(x / n))
	}

	// TODO: generalize to leastCommon when working on the general 'orders' api for 'newapi';
	// TODO: generalize all the number-theoretic functions implementations that take a particular number of arguments to them taking an arbitrary amount (kind of like here and in the newapi.util.arrIntersections)
	/**
	 * Takes three numbers, thwo of which are numbers for which least common multiple shall be found and the third one is a search range for them.
	 * @param {number} firstNum First number.
	 * @param {number} secondNum Second number.
	 */
	RESULT.leastCommonMultiple = function (...nums) {
		if (nums.length === 0) return undefined
		if (nums.length === 1) return nums[0]
		if (nums.length === 2)
			return min(
				arrIntersections([
					multiples(nums[0], nums[1]),
					multiples(nums[1], nums[0])
				])
			)
		return leastCommonMultiple(nums[0], leastCommonMultiple(...nums.slice(1)))
	}

	RESULT.commonMultiples = function (range, ...nums) {
		if (nums.length === 0) return undefined
		if (nums.length === 1) return nums[0]
		if (nums.length === 2) {
			const found = arrIntersections([
				multiples(nums[0], range[range.length - 1]),
				multiples(nums[1], nums[range[range.length - 2]])
			])
			range.pop()
			range.pop()
			return found
		}
		const rest = commonMultiples(range, ...nums.slice(1))
		return arrIntersections([multiples(nums[0], range[range.length - 1]), rest])
	}

	RESULT.leastCommonDivisor = function (...nums) {
		// TODO: like this style; rewrite some bits of the library to have it -- replaceing 'const's with nameless (anonymous) functions as a way of "distributing" certain value;
		return ((x) =>
			typeof x === "number" || typeof x === "undefined" ? x : min(x))(
			commonDivisors(...nums)
		)
	}

	RESULT.commonDivisors = function (...nums) {
		if (nums.length === 0) return undefined
		if (nums.length === 1) return nums[0]
		if (nums.length === 2)
			return arrIntersections([factorOut(nums[0]), factorOut(nums[1])])
		return arrIntersections([
			factorOut(nums[0]),
			commonDivisors(...nums.slice(1))
		])
	}

	/**
	 * Takes an a array(or a row, if you prefer) and returns an array of all deviations from its average.
	 * @param {number[]} row An array, in which deviations should be found.
	 * @param {boolean} isSquare A boolean, representing should or should not every found deviation be powered by two or else it shall be absolute. By default false.
	 * @param {boolean} isTruncated A boolean, representing, should or should not an array be truncated, during the process of searching for its average. By default false.
	 * @param {number} percents A number, representing count of percents of numbers, for which this array shall be truncated, while searching for its average. Pased value will be doubled. Works only if isTruncated equals true. By default 10.
	 */
	RESULT.deviations = function (
		row,
		isSquare = false,
		isTruncated = false,
		percents = 10
	) {
		const rowAverage = average(row, isTruncated, percents)
		const deviations = []
		row.forEach((num) => {
			isSquare
				? deviations.push(
						floor(Math.pow(num - rowAverage, 2), globalPrecision)
				  )
				: deviations.push(floor(Math.abs(num - rowAverage), globalPrecision))
		})
		deviations.length = row.length
		return deviations
	}

	/**
	 * Returns a dispersion of a numeric array(or a row, if you prefer). It can be of a population variance or a sample variance, depending on the second parameter.
	 * @param {number[]} row A numeric array, dispersion for which is to be found and returned.
	 * @param {boolean} isSquare A boolean, representing should or should not result of the deviations() function be found powering found deviations by two or not. If false(what is a default value), then instead of doing that it uses absolute values of found deviations.
	 * @param {boolean} isGeneral A boolean value representing whether or not the variance returned is either the population or the sample. By default true.
	 * @param {number[]} indexes A numeric array of indexes, using which, inside of a first argument needed values will be taken for a sample population(only if second parameter is false).
	 */
	RESULT.dispersion = function (
		row = [],
		isSquare = false,
		isGeneral = true,
		indexes = []
	) {
		const newRow = []
		!isGeneral
			? row.forEach((num, index) => {
					indexes.forEach((checkIndex) => {
						index === checkIndex ? newRow.push(num) : null
					})
			  })
			: row.forEach((num) => newRow.push(num))
		newRow.length = row.length
		// ? what's that, a hack?
		// TODO: if don't like, pray do something about...
		return floor(average(deviations(newRow, isSquare), true, 0)) // ! DO NOT DO LIKE THIS, WHEN USING THE LIBRARY(I mean the last two arguments of average()).
	}

	/**
	 * Takes an array of numbers and returns (general or sample) standard deviation of it depending on the second parameter. (Indexes of sample, if it's a sample, are set using the last argument.)
	 * @param {number[]} row Row(or an array if you prefer) of numbers, (sample or population) standard deviation for which shall be found.
	 * @param {boolean} isPopulation A boolean, representing should function return the population standard deviation or sample standard deviation.
	 * @param {number[]} indexes An array of numbers, representing indexes of the sample, sample standard deviation deviation for which shall be found.
	 */
	RESULT.standardDeviation = function (
		row = [],
		isPopulation = true,
		indexes = []
	) {
		return floor(
			Math.sqrt(dispersion(row, true, isPopulation, indexes)),
			globalPrecision
		)
	}

	/**
	 * Takes an array of numbers and returns the standard error of it.
	 * @param {number[]} row An array of numbers, standard error for which is to be found.
	 * @param {boolean} isDispersion A boolean, that characterizes, should it be dispersion, found through absolute values of diviations in the row or standard deviation(found common way). By default false(standard deviation is used).
	 * @param {boolean} isPopulation A boolean, representing should or not standart error be population(true) or sample(false). By default true.
	 * @param {number[]} indexes An array of numbers, representing indexes using which sample of the original row should be made. Works only if isPopulation equals true.
	 */
	RESULT.standardError = function (
		row = [],
		isDispersion = false,
		isPopulation = true,
		indexes = []
	) {
		const newArr = []
		isPopulation
			? row.forEach((num) => newArr.push(num))
			: row.forEach((num, index) => {
					indexes.forEach((checkIndex) => {
						index === checkIndex ? newArr.push(num) : null
					})
			  })
		return isDispersion
			? floor(
					exp([dispersion(row, false), Math.sqrt(newArr.length)], "/"),
					globalPrecision
			  )
			: floor(
					exp([standardDeviation(row), Math.sqrt(newArr.length)], "/"),
					globalPrecision
			  )
	}

	/**
	 * Takes a two-dimensional array, containing one dimensional number arrays and returns the number of degrees of freedom for all of them.
	 * @param {number[]} numRows Multiple one-dimensional arrays for which the degree of freedom is to be found.
	 */
	RESULT.degreeOfFreedom = function (...numRows) {
		let lenSum = 0
		for (let i = 0; i < numRows.length; i++) lenSum += numRows[i].length
		return lenSum - numRows.length
	}

	/**
	 * Takes a numbers array and an array of probabilities for each of the given numbers to appear and returns expected value for them.
	 * @param {number[]} numbers A number array, expected value for which is to be found.
	 * @param {number[]} probabilities An array of probabilitiles for certain numbers from numbers array to appear.
	 */
	RESULT.expectedValue = function (numbers, probabilities) {
		const values = []
		if (numbers.length > probabilities.length)
			throw new Error(
				"The length of probability array is smaller than the length of the numbers array. No possibility to compute the expectedValue."
			)
		for (let i = 0; i < numbers.length; i++)
			values.push(numbers[i] * probabilities[i])
		return floor(repeatedArithmetic(values.map(String), "+"))
	}

	// TODO: generalize this thing -- make it possible for afterDot < 0; Then, it would truncate even the stuff before the point! (using this, one could get a character-by-character representation of a JS number...)
	// TODO: write such a function as well for both old api and new api!
	// ? also -- conversion between the number systems for both old and new api too...; Generalize the thing for it as well (as well as the character-by-character function and many more others...);
	/**
	 * Floors the given number to the needed level of precision.
	 * @param {number} number Number to be floored.
	 * @param {number} afterDot How many positions after dot should there be.
	 * @returns {number}
	 */
	RESULT.floor = function (number, afterDot = globalPrecision) {
		return Number(number.toFixed(afterDot))
	}

	// TODO: generalize to allow for arbitrary "random" function...
	/**
	 * Takes the max length of the random array, it's max value, the flag, characterizing whether numbers in it should be integers.
	 * @param {number} maxLength The largest count of numbers, that can appear in the random array. (It can be different from the given value).
	 * @param {number} maxValue The max value, that can be found in the randomly generated array.
	 * @param {boolean} integers The boolean flag, that represents whether all numbers in the array should be integers or not. By default false.
	 */
	RESULT.randomArray = function (maxLength, maxValue, integers = false) {
		const length = Math.floor(Math.random() * maxLength)
		const storage = []
		for (let i = 0; i < length; i++)
			storage.push(
				integers
					? floor(Math.random() * maxValue, 0)
					: floor(Math.random() * maxValue, globalPrecision)
			)
		return storage
	}

	/**
	 * Checks whether the number passed is perfect or not.
	 * @param {number} number Number, perfectness of which is to be checked.
	 */
	RESULT.isPerfect = function (number) {
		return repeatedArithmetic(allFactors(number).map(String), "+") === number
	}

	/**
	 * Takes one integer and returns all of its factors (not only primes, but others also).
	 * @param {number} number An integer, factors for which are to be found.
	 */
	RESULT.allFactors = function (number) {
		const factors = [1]
		for (let currFactor = 2; currFactor !== number; currFactor++)
			if (number % currFactor === 0) factors.push(currFactor)
		return factors
	}

	/**
	 * This function calculates the factorial of a positive integer given.
	 * @param {number} number A positive integer, factorial for which is to be calculated.
	 */
	RESULT.factorial = function (number) {
		const numbers = []
		// TODO: after having implemented the Gamma function for the old API (?maybe just extend this one?), pray do make this thing more general...
		if (number < 0)
			throw new Error(
				"factorial() function is not supposed to be used with the negative numbers. "
			)
		for (let i = 1; i <= number; i++) numbers.push(i)
		if (!numbers.length) return 1
		return repeatedArithmetic(numbers.map(String), "*")
	}

	RESULT.sumRepresentations = function (n, m, minval = 1) {
		// TODO: generalize this as well... [either use this or do stuff related to the finite natural power-series arrays + ]
		const itered = generate(minval, n).map((x) =>
			generate(minval, m).map((v, i) => (i == 0 ? x : minval))
		)
		while (itered.length < n ** m) {
			for (let i = 0; i < itered.length; i++) {
				const copied = flatCopy(itered[i])
				for (let j = 0; j < m; j++) {
					copied[j]++
					if (indexOfMult(itered, copied).length) {
						copied[j]--
						continue
					}
					itered.push(copied)
				}
			}
		}

		return itered.filter((x) => repeatedArithmetic(x, "+") == n)
	}

	/**
	 * This function does a fixed addition of two numbers. It decreases error a tiny bit, but with large numbers it may be signigicant.
	 * @param {number} float1 First number to be added.
	 * @param {number} float2 Second number to be added.
	 * @returns {[number, number]} a number with error much less than it would be with JavaScript addition.
	 */
	RESULT.realAddition = function (float1, float2) {
		const sum = float1 + float2
		const fixedB = sum - float1
		const fix = float2 - fixedB
		return [sum + fix, fix]
	}

	/**
	 * This function takes an integer value, representing the new precision of the output and sets fixdSize equal to it.
	 * @param {number} precision The new value of fixedSize.
	 */
	RESULT.setPrecision = function (precision = 0) {
		return (globalPrecision = precision | 0)
	}

	// TODO : separate onto reference-equality (current) and value-equality (for this, one could employ newapi.utils.valueComparison)
	// ! Better - transform into a generalized version for the 'infinite', with a 'comparison' value; make this a special case;
	/**
	 * This funciton takes in n arrays of dimension 1 (dim (arr) = 1) and compares them.
	 * (I.e. returns the boolean value, representing whether they're equal or not).
	 * @param {any[]} arrays An array of one-dimensional array of any length.
	 */
	RESULT.arrayEquality = function (...arrays) {
		function equalBinary(arr1, arr2) {
			if (arr1.length !== arr2.length) return false
			for (let i = 0; i < arr1.length; i++)
				if (arr1[i] !== arr2[i]) return false
			return true
		}
		for (let i = 1; i < arrays.length; i++)
			if (!equalBinary(arrays[i - 1], arrays[i])) return false
		return true
	}

	/**
	 * This function takes in array and determines how nested it is (its dimensions).
	 * If it is not array, dimension is 0.
	 * If it is an empty array, then it's dimension is 1.
	 * If it is an array only with an element which is not an array, then it's dim is 1.
	 * If it is an array with only an array of dim n-1, then it's own dim is n.
	 * If it is an array with a bunch of stuff with different dims, then it's dim is the highest of the ones of it's elements + 1.
	 * This function is defined recursively.
	 * @param {any[] | any} array An array with any data in it. It doesn't have to be an array, though.
	 */
	// * Alternative implementation (second one):
	RESULT.dim = function (array) {
		if (array instanceof Array)
			return 1 + (array.length === 0 ? 0 : max(array.map(dim)))
		return 0
	}

	// function dim(array: any) {
	// 	const d = (elem) => (elem instanceof Array ? t(elem) : 0)
	// 	const t = (arr) =>
	// 		1 + (arr.length === 0 ? 0 : max(arr.map(d))
	// 	return d(array)
	// }
	// ? They're both so good... Which one should be?
	// * first is 4 function calls per level;
	// * second is 3 function calls per level;
	// * CURRENT DECISION: both shall stay, but the first one will be commented out...

	/**
	 * Takes two numbers (one rational and other - integer) and calculates the value of combinatorics choose function for them.
	 * (What it actually does is it takes their binomial coefficient, but never mind about that. )
	 * @param {number} n First number (any rational number).
	 * @param {number} k Second number (integer).
	 */
	RESULT.binomial = function (n, k) {
		if (
			(typeof n !== "number" || typeof k !== "number") &&
			(isNaN(Number(n)) || isNaN(Number(k)))
		)
			throw new Error(
				"Input given to the choose function could not be converted to a number. "
			)

		// Rounding down just in case.
		n = Number(n)
		k = Number(k) | 0
		return floor(
			repeatedArithmetic(
				generate(0, k - 1, 1).map((num) => String(n - num)),
				"*"
			) / factorial(k)
		)
	}

	// TODO: Implement the compareUniversal(...arrays), which uses dim;

	// ! PROBLEM:
	// ? Does one want to be unifying those with the arrays methods for doing so?
	// TODO [thing mr. flesh has forgotten]: implement the replacement methods for arrays...
	// ? Are there any manner of performance advantages in general separation of algorithms for native JS strings [don't seem to find anything on it... pray make one's own mini-research]?

	// % LOCAL AGENDA: these two issues would get addressed in the order of original writing...

	// * 1.
	// * Replaces at 1 index;
	RESULT.stringReplaceIndex = function (string, ind, value) {
		return `${string.slice(0, ind)}${value}${string.slice(ind + 1)}`
	}
	RESULT.stringReplaceIndexesDiff = function (string, inds, values) {
		return repeatedApplicationIndex(
			(val, i) => stringReplaceIndex(val, inds[i], values[i]),
			Math.min(inds.length, values.length),
			string
		)
		// * Previous: before refactoring (check that they are the same thing...)
		// let copy = string
		// for (let i = 0; i < inds.length; i++)
		// 	copy = replaceStrInd(copy, inds[i], values[i])
		// return copy
	}

	// * 2.
	// * Replace the first occurence of a given value within a string...
	RESULT.stringReplaceFirst = function (string, x, y) {
		// ? Question: which definition to keep? The original: [below]
		// const split = string.split(x)
		// return split[0] + y + split.slice(1).join(x)
		// ? or the current one:
		return stringReplaceIndexes(string, x, y)
	}
	// * replaces occurences of a value within a string at the given posiitons...
	// TODO: write a generalization for multiple values and index-positions...
	RESULT.stringReplaceIndexes = function (string, x, y, indexes = [0]) {
		return string
			.split(x)
			.map((a, i) => [a, indexes.includes(i) ? y : x])
			.flat()
			.join("")
	}
	// * Replaces all occurences of 'x' with 'y';
	RESULT.stringReplace = function (string, x, y) {
		return string.split(x).join(y)
	}
	// * Replaces all occurences of all 'a: a in x' with 'y[x.indexOf(a)]' for each and every such 'a';
	RESULT.replaceStrMany = function (string, x, y) {
		return repeatedApplicationIndex(
			(v, i) => replaceStr(v, x[i], y[i]),
			Math.min(x.length, y.length),
			string
		)
		// * Previous: before refactoring (check that they are, indeed, the same in functionality)
		// let final = string
		// for (let i = 0; i < x.length; i++) final = replaceStr(final, x[i], y[i])
		// return final
	}

	// * Replaces values within an array and returns the obtained copy...
	RESULT.replaceArr = function (array, x, y, transformation = (a) => a) {
		const resArray = [...array]
		for (let i = 0; i < array.length; i++) {
			const index = x.indexOf(array[i])
			if (index !== -1) resArray[i] = transformation(y[index])
		}
		return resArray
	}

	// * just a convinient syntax...
	RESULT.arrThisApply = function (f, arr, thisArg = null) {
		return f.apply(thisArg, arr)
	}

	RESULT.arrApply = function (f, arr) {
		return f(...arr)
	}

	RESULT.countAppearences = function (
		array,
		element,
		i = 0,
		comparison = (a, b) => a === b
	) {
		return i < array.length
			? Number(comparison(array[i], element)) +
					countAppearences(array, element, i + 1, comparison)
			: 0
	}

	RESULT.indexOfMult = function (array, el, comparison = (a, b) => a === b) {
		const indexes = []
		for (let i = 0; i < array.length; i++)
			if (comparison(array[i], el)) indexes.push(i)
		return indexes
	}

	// ? which one to use as an export? (they will both be kept in any case...)
	// * Current decision: the newer one (one below);
	// * Alternative implementation (this time, with a searchIndex -- i parameter):
	//  const indexOfMult = (
	// 	array: any[],
	// 	el: any,
	// 	comparison: (a: any, b: any) => boolean = (a: any, b: any) => a === b,
	//  i: number = 0
	// ) => {
	//		if (i >= array.length) return []
	// 		const next = indexOfMult(array, el, comparison, i + 1)
	// 		return comparison(array[i], el) ? [i, ...next]: [...next]
	// }
	// * clears all but the first `tokeep` repetition of `el`
	RESULT.clearRepetitions = function (
		arr,
		el,
		tokeep = 0,
		comparison = (a, b) => a === b
	) {
		const firstMet = indexOfMult(arr, el, comparison)
		return firstMet.length
			? arr.filter(
					(a, i) => firstMet.indexOf(i) < tokeep || !comparison(a, el)
			  )
			: [...arr]
	}

	RESULT.splitArr = function (arr, el, comparison) {
		const segments = []
		let begInd = 0
		let endInd = 0
		for (let i = 0; i < arr.length; i++)
			if (comparison(el, arr[i])) {
				begInd = endInd + Number(Boolean(endInd))
				endInd = i
				segments.push([begInd, endInd])
			}
		return segments.map((seg) => arr.slice(...seg))
	}

	// * "guts" the first layer inner arrays into the current one...
	RESULT.gutInnerArrs = function (array) {
		const returned = []
		for (let i = 0; i < array.length; i++) {
			if (array[i] instanceof Array) {
				array[i].forEach(returned.push)
				continue
			}
			returned.push(array[i])
		}
		return returned
	}

	// TODO: also -- repeatedApplication, code-rework...
	// TODO: this thing don't copy an array; It changes the existing one (namely, changes the reference)...
	// * Rewrite so that it returns a new one...
	RESULT.gutInnerArrsRecursive = function (array) {
		while (hasArrays(array)) array = gutInnerArrs(array)
		return array
	}

	RESULT.hasArrays = function (array) {
		return max(array.map((a) => Number(a instanceof Array))) === 1
	}

	// * "reverses" the gutInnerArrs (only once, at a given place)
	// TODO: generalize; make a version of multiple encirclements;
	// todo [general]: do that thing to literally every algorithm that there be within the library [that is, all that are wanted to be]; have a more general counterpart which is supposed to work with multiple cases in question; a repetition of the algorithm in question;
	RESULT.arrEncircle = function (a, from = 0, to = a.length) {
		const copied = []
		for (let i = 0; i < a.length; i++) {
			if (i >= from && i <= to) {
				copied.push(a.slice(from, to + 1))
				i = to
			}
			copied.push(a[i])
		}
		return copied
	}

	// todo: generalize (using the notion of 'level' -- capability to copy up to an arbitrary level... rest is either referenced or ommited (depends on a flag, for instance?)); Having generalized, pray get rid of this special case...
	// * copies array's structure deeply without copying the elements
	// ? create one similar such, except an even largetly generalized? (using the notion of 'objectType' and whether something matches it, for example?)
	// ! Problem: same as with the isSameStructure - introduce forms; keeps this one separate... also, rename; make the absence of element copying apparent in the name...
	RESULT.arrStructureCopy = function (thing) {
		if (thing instanceof Array) return thing.map(arrStructureCopy)
		return thing
	}
	// TODO: write the gutInnerObjs function, as well as guttInnerObjsRecursive; principle is same as the array functions;
	// TODO: the same way, write objEncircle; there'd also be an argument for the key;
	// TODO: the same way, write "encircle" functions for the UniversalMaps and InfiniteMaps (maybe, make these a method of theirs (too?)?)
	// TODO: write the same one for the UniversalMap(s) and InfiniteMap(s) (they would differ cruelly...)
	// TODO: write methods for encircling a piece of an array with an object (also takes the keys array...) and a piece of an object with an array;
	// * Same permutations for the InfiniteMap and UniversalMap...
	// TODO : for each and every array/object function available, pray do write the InfiniteMap and UnversalMap versions for them...
	// TODO: same goes for the old api -- let every single thing from there have an infinite counterpart here...
	// TODO: add more methods to UniversalMap and InfiniteMap;
	// * Create the .map methods for them -- let they be ways of mapping one set of keys-values to another one;

	// ! There is something I do not like about the 'comparison' parameter...
	// * It is only of 2 variables...
	// TODO: think about generalizing to arbitrary number of variables...
	// * IDEA: a recursive function-building type!

	// ! By repeatedly calling them, one would obtain expressions equivalent to some n number of variables...: func(a)(b)(c) instead of func(a, b, c);
	RESULT.arrIntersections = function (arrs, comparison = (a, b) => a === b) {
		if (arrs.length === 0) return []
		if (arrs.length === 1) return arrs[1]
		if (arrs.length === 2) {
			const result = []
			for (let i = 0; i < arrs[0].length; i++) {
				for (let j = 0; j < arrs[1].length; j++) {
					// TODO: change for the use of indexOfMult... the .includes thing...
					if (
						comparison(arrs[0][i], arrs[1][j]) &&
						!result.includes(arrs[0][i])
					) {
						// ? Problem: this thing is not very useful (as in, general); It throws out the information concerning the arrs[1][j];
						// * This is not good...
						// TODO: fix; restructure it somehow...
						result.push(arrs[0][i])
					}
				}
			}
			return result
		}
		return arrIntersections(
			[arrs[0], arrIntersections(arrs.slice(1), comparison)],
			comparison
		)
	}

	RESULT.repeatedApplication = function (a, n, initial) {
		n = BigInt(n)
		let curr = initial
		for (let i = 0n; i < n; i++) curr = a(curr)
		return curr
		// * Old recursive definition [replaced with the new one...]
		// TODO: clean these up later - save somewhere for good memory...
		// if (BigInt(n) <= 0) return initial
		// if (BigInt(n) === 1n) return a(initial)
		// return a(repeatedApplication(a, n - 1))
	}

	// ? (Reminder) -- the imperative versions of functional code [for the sake of the stack]; Write and separate within the library, similar to the way finite and infinite versions get separated...
	RESULT.repeatedApplicationIndex = function (a, n, initial, offset = 0n) {
		n = BigInt(n)
		let curr = initial
		for (let i = 0n; i < n; i++) curr = a(curr, i + offset)
		return curr
		// * Old recursive definition [replaced with the new one; these are better on the stack];
		// ! clean up later... [save somewhere for good memory]
		// if (BigInt(n) <= 0) return initial
		// if (BigInt(n) === 1) return a(initial, n - offset)
		// return a(
		// 	repeatedApplicationIndex(a, n - 1, initial, offset),
		// 	n - offset
		// )
	}

	// * This can create infinite loops... Equiv. of `function () {let a = initial; while (property()) {a = b(a)}; return a}`; (Should one not also add this one thing?)
	RESULT.repeatedApplicationWhilst = function (
		function_,
		property,
		initial = undefined
	) {
		let curr = initial
		while (property()) curr = function_(curr)
		return curr
		// ? Allow for input of (function_, property)? this'd allow for greater diversity of uses...
		// ? GENERAL QUESTION: about diversity of uses: does one want it truly?
		// * Current decision: YEEEEEASS! (Do it...)

		// ! Old recursive definition; Being replaced; later, save somewhere for good memory, yada-yada...
		// return property()
		// 	? repeatedApplicationWhilst(function_, property, function_(initial))
		// 	: initial
	}

	// TODO: create a repeatedApplicationFor...

	// ? should this be kept? It is a special case of the function below....
	// * Current decision: let it stay; it may be nice to just "get it"; without taking the first index...
	RESULT._multmap = function (a, fs) {
		return multmap([a], fs)[0]
	}

	// * Finds use in Mr. Body's code all the time.
	// ^ Note: The first index stays for the elements, the second one stays for the function...
	RESULT.multmap = function (a, fs) {
		return a.map((el) => fs.map((f) => f(el)))
	}

	// TODO: match the order of the definitions with the order of exports... Do the same for all the files...
	// * Also, match with the original "math-expressions.js" file...

	RESULT.UniversalMap = function (notfound, treatUniversal = false) {
		return {
			template: { notfound, treatUniversal },
			value: function (
				keys = [],
				values = [],
				treatUniversal = this.treatUniversal
			) {
				// * Conversion from a non-array object...
				if (!(keys instanceof Array)) {
					if (keys.keys && keys.values && treatUniversal) {
						values = values.values
						keys = keys.keys
					} else {
						keys = Object(keys)
						values = Object.values(keys)
						keys = Object.keys(keys)
					}
				}
				return {
					keys: keys,
					values: values,
					index: 0,
					class: this,
					// ? Question: should this work like that? Should 'comparison' be an argument of .get or should it be one of the template layer???
					// TODO: pray decide here, and for each individual case throughout the library...
					// * Current decision: no, it should be templated pretty much everywhere (and everywhere -- independently)...
					get(key, comparison = infinite.valueCompare, number = 1) {
						const indexes = indexOfMult(this.keys, key, comparison)
						if (indexes.length === 0) return this.class.notfound
						return indexes.slice(0, number).map((i) => this.values[i])
					},
					set(key, value, comparison = infinite.valueCompare) {
						const index = indexOfMult(this.keys, key, comparison)
						if (index.length !== 0) {
							for (const _index of index) this.values[_index] = value
							return value
						}
						this.keys.push(key)
						this.values.push(value)
						return value
					},
					// TODO: define the [Symbol.iterator] for all the types of all objects;
					// * Similarly, define 'forin'
					// ^ Funny, that reminds oneself:
					// Thorin
					// Fili
					// Kili
					// Oin
					// Gloin
					// Forin
					// Balin
					// Dwalin
					// Ori
					// Dori
					// Nori
					// Bifur
					// Bofur
					// Bombur
					// * Noticed anything different? :D
					// * hahaha!
					// ? Should it become for_in() or _for_in() or _forin() or forIn() or FOR_IN() or something else instead of 'forin'?
					[Symbol.iterator]: function* () {
						for (
							this.index = 0;
							this.index < this.keys.length;
							this.index++
						)
							yield this.get(this.keys[this.index])
					},
					forin(body) {
						for (
							this.index = 0;
							this.index < this.keys.length;
							this.index++
						)
							body(this.keys[this.index])
					},

					// ! This thing assumes that the conversion in question is, in fact, a valid one
					// * Example: [if there are objects for keys -- it will convert them to the JSON string of the object in question]...
					// ? Shouldn't one instead of giving some basic default safe-behaviour, give user the ability to choose/decide it? Also, one could create an .isValidObject() method for the class...
					// * Current decision: yes, do that...
					// TODO: provide the InfiniteMap with this thing too -- there will [too] be a thing -- it will only alow first 2 **
					toObject() {
						const a = {}
						for (let i = 0; i < this.keys.length; i++)
							a[
								(!["symbol", "number"].includes(typeof this.keys[i])
									? JSON.stringify
									: RESULT.id)(this.keys[i])
							] = this.values[i]
						return a
					}
				}
			}
		}
	}

	// TODO: change this thing (recursiveIndexation and recusiveSetting): make 'fields' a far more complex and powerful argument -- let it be capable of taking the form [a:string,b:string,c:number, ...] with different (and different number of them too!) a,b and c, which would virtiually mean obj[a][b]...(c-2 more times here)[a][b], then proceeding as follows;
	// * This would allow for a more powerful use of the function generally and lesser memory-time consumption (also, add support for InfiniteCounters...; as everywhere else around this and other librarries)
	// * May be very useful in parsing of nested things. Used it once for an algorithm to traverse an arbitrary binary sequence...
	// TODO: extend this thing (add more stuff to it, create powerful extensions)
	RESULT.recursiveIndexation = function ({ object, fields }) {
		let res = object
		for (const f of fields) res = res[f]
		return res
	}

	RESULT.recursiveSetting = function ({ object, fields, value }) {
		return (recursiveIndexation({
			object: object,
			fields: fields.slice(0, fields.length - 1)
		})[fields[fields.length - 1]] = value)
	}

	RESULT.objInverse = function (notfound, treatUniversal = false) {
		return {
			template: { notfound, treatUniversal },
			value: function (obj, treatUniversal = this.treatUniversal) {
				return ((a) =>
					((universal) => a(universal.values, universal.keys))(
						a(obj, treatUniversal)
					))(UniversalMap(this.notfound))
			}
		}
	}

	// TODO: for all these things pray do add the infinite counterpart as well [still strong does it stay -- for EACH AND EVERY thing to be an infinite counterpart]...

	RESULT.obj = function (keys, values) {
		let length = min([keys.length, values.length])
		const returned = {}
		for (let i = 0; i < length; i++) returned[keys[i]] = values[i]
		return returned
	}

	RESULT.objMap = function (obj, keys, id = true) {
		const newobj = {}
		for (const key in keys) newobj[keys[key]] = obj[key]
		if (id)
			for (const key in obj)
				if (!Object.values(keys).has(key)) newobj[key] = obj[key]
		return newobj
	}

	RESULT.objFmap = function (obj, f) {
		const newobj = {}
		for (const a in obj) newobj[a] = f(obj[a])
		return newobj
	}

	RESULT.objArr = function (obj) {
		return [Object.keys(obj), Object.values(obj)]
	}

	RESULT.objSwap = function (obj1, obj2) {
		;((obj1Copy, obj2Copy) => {
			objClear(obj1, obj1Copy)
			objClear(obj2, obj2Copy)
			objInherit(obj1, obj2Copy)
			objInherit(obj2, obj1Copy)
		})(...arguments.map(flatCopy))
	}

	RESULT.objClear = function (obj, objCopy = flatCopy(obj)) {
		for (const dp in objCopy) delete obj[dp]
	}

	RESULT.objInherit = function (obj, parObj) {
		for (const ap in parObj) obj[ap] = parObj[ap]
	}

	RESULT.propSwap = function (obj, prop1, prop2) {
		const temp = obj[prop1]
		obj[prop1] = obj[prop2]
		obj[prop2] = temp
	}

	// * checks whether 2 objects' keys lists are the same; Essentially same as 'infinite.valueCompare(Object.keys(a1),Object.keys(a2))';
	// ? Wonder if one should rewrite as this, or use 'boolmap' to make this this already present version tidier???
	RESULT.ismapped = function (a1, a2) {
		return min(
			min(Object.keys(a1).map((_a1) => !!a2[_a1])),
			min(Object.keys(a2).map((_a2) => !!a1[_a2]))
		)
	}

	// * The 'recognizedl' and 'recognizedv' arguments are supposed to be template arguments; they are for the user to have the ability to make the Pointer objects recognizable...
	// ^ IDEA: Change some of self's APIs to allow for the work with various user-defined Pointer(s), which would also fix the problems with the API not being general enough...I
	// Utilizes the simple matter of fact that JS creates a "pointer" (the object reference) to a certain object implicitly, then using it to pass it...
	// TODO: make more dynamic; work on those...
	RESULT.Pointer = function (template) {
		return {
			template: template,
			class: function (value) {
				return { [template.label]: value }
			}
		}
	}

	// TODO: create a function like (a: [key, value][]) => a.map(([key, value]) => [key, objInverse(value).toObject()]);
	// * Would come in handy in one of one's projects...

	// TODO: generalize further (f, obj, depth) => ... [would with depth 'depth', map 'f' to keys/values of an object...]

	// * Module Export
	return transformation(RESULT)
}
