// TODO: test this thouroughly;
// TODO: add defaults, make code tidy and to one's complete liking...

// TODO: read all the library's code all over and make it such as to be to one's liking -- utter and complete;
// * Get rid of unwanted explicit type conversions...
// * Get rid of unwanted "const"'s
// * Get rid of 'let's that can become 'const's [and one wants them to]
// * Get rid of 'const's that can become results of doing ((c1, ...) => {...[code]})(...arrOfPrevConsts);
// * Generalize the code [along with making it more compact], simplify constructs...

// TODO: make places that use these constants more general and flexible;
// (Later, one may expect to use this particular version in a different language transpiled -- for this, pray, do add ways of changing the number limit used here; EVEN IF, for JavaScript that would not be truly possible to use some of them...)
// * Instead of entirely rewriting it then, one would far more prefer simply "choosing" a different version -- substituting a different argument or so...
// ! Delete after fullfilling the TODO...
// TODO: no, don't. Keep them as exported constants for the library (just don't use them apart as default arguments);
// TODO: create a function paramDecide(), that would wrap the function in question in the condition of certain kind, and if it is not fullfilled, call something else given instead...
// TODO: create a derived function ensureParam(), that too would take a function, expected number of non-undefined args and a bunch of arguments (either an array of them, or directly -- just like that...); let it ensure that all the given arguments are non-undefined...; in case it is not so, call different given function;
const MAX_ARRAY_LENGTH = 2 ** 32 - 1
const MAX_INT = 2 ** 53 - 1

/**
 * * This is the Old API source code, version pre-1.0 (in work).
 * @copyright HGARgG-0710 (Igor Kuznetsov), 2020-2023
 */
// TODO: finish;

// todo: new things to add:
// * 1. more number-theoretic functions...;
// TODO: things to do (generally):
// * 1. Pick out the "too specific" or "number-oriented" methods and rewrite them to be more general; then, add a version for numbers (for backward compatibility),
// *    or, just add the old alias (like in the case of sameOperator...)
// *    1.1. Special cases of it:
// *        1.1.1. repeatedArithmetic -- rename to repeated (add a ton of new possibilities of use for this...)
// * 2. Rewrite the in-editor JSDoc documentation (most probably, from scratch...)...
// * 3. Add proper types to everywhere in the code (especially, places with dots...);
// * 4. Fix all the compilers' TypeErrors...
// * 5. Make code more permissive (get rid of all the "safety" things, get rid of some of the Error throws -- replace them with special function values, where want to);
// * 6. Simplify and generalize function argument lists; get rid of booleans functions of which can be subsued by the default values of the other parameters without loss of generality... Add more arbitrary-length spread arguments;
// * 7. Add new in-editor documentation for the new definitions...
// * 8. After having finished all else, pray do check that all the things that are being wanted to be exported are, in fact, being exported...

// Global variables

/**
 *
 * * This variable characterizes how many fixed numbers are outputted.
 * * You can change it freely using setPrecision() function, if you want a more "precise" output of some of the functions.
 */
// ? should this thing be kept even? (Consider)
// TODO: create various numeric constants within the library (besides, some of ones functions' definitions may use it;)...
// * A nice thing to have...
let globalPrecision = 16

// Objects

// ? Add more stuff here? (This table is supposed to be like a small calculator for binary things...)
// TODO: change the architecture of these tables -- they should contain information concerning the Arity of the stuff that is within them...
// * That is one's solution to the problem of the "all functions that work with them currently support only binary operations..., et cetera"
// TODO: add the defaults to these functions...
const defaultTable = {
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

const defaultAlphabet = [
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

// * IDEA to the organization of the duality of library's codebase: have a finite version of something, then precisely after it, a definition of infinite.[thing's name] -- its infinite counterpart; For stuff that don't have an explicit finite/infinite counterpart it is left alone/put into the original definition of the 'infinite'
// ^ These ones would use templates + general version of InfintieArray/InfiniteMap
const infinite = {
	// TODO: pray order the definitions within the 'infinite' object;

	GeneralArray(
		forindexgenerator,
		backindexgenerator,
		forelem,
		backelem,
		initindex,
		setmethod,
		comparison,
		isUndefined = (x) => x === undefined,
		isEnd = isUndefined
	) {
		// ? Wonder: should one not 'separate' the part of the template object that is being passed to the 'template' function???
		// * Current decision: yes, do that! Would be very nice and convinient. Allows for more comfortable 'general' access to all that stuff...
		// TODO: next thing on the agenda [probably] -- tidying up the old, new and code of the new library's version generally;
		return classTemplate(
			{
				forindexgenerator,
				backindexgenerator,
				forelem,
				backelem,
				initindex,
				setmethod,
				isUndefined,
				isEnd
			},
			function (array) {
				return {
					array: infinite
						.IterArray(
							forindexgenerator,
							backindexgenerator,
							forelem,
							backelem,
							initindex,
							setmethod
						)
						.class(array),
					class: this,
					begin(comparison) {
						return this.array.begin(comparison)
					},
					moveforward(index, begin = false) {
						return this.array.moveforward(
							this.class.comparison,
							index,
							begin
						)
					},
					movebackward(index, begin = false) {
						return this.array.movebackward(
							this.class.comparison,
							index,
							begin
						)
					},
					read(index) {
						const returned = this.moveforward(index, true)
						this.array.begin(comparison)
						return returned
					},
					write(index, value) {
						this.moveforward(index, true)
						const returned = this.array.setcurr(value)
						this.begin(comparison)
						return returned
					},
					// TODO: implement the algorithms listed here...
					// ? Make an IterArray method? Think about it...
					// TODO: there are a lot of tiny-details-inconsistencies of conventional nature. Resolve them. Decide how certain things handle certain other things particularly.
					// ? Question: should one not make this a changed variable???
					// * Then, one'd just add a setter and a getter and that's it, no?;
					length() {
						let curr = this.array.begin(comparison)
						while (!isEnd((curr = this.array.next())[1])) {}
						return curr[0]
					},
					pushback(value) {
						// * Sketch [decided to write sketches for these first, then let mr. flesh implement]:
						// * 1. get the .length();
						// * 2. write() 'value' at .length();
					},
					pushfront(value) {
						// * Sketch [not actual code]:
						// * 1. this.array = .concat([value], this.array)
					},
					concat(array) {
						// * Sketch [pray note that 'array' is same GeneralArray template as the 'this']:
						// * 1. define a new array [copy of 'array'; 'concatenated'];
						// * 2. run through 'this', pushing all the elements of it into the array in question; ['concatenated.push(this.array.currelem)']
						// * 3. return concatenated;
					},
					copy(f = (x) => x) {
						// * Sketch:
						// * 1. create a new empty array of the same template-array-type as 'this' ['newarray'];
						// * 2. run through the 'this' array [until hitting .length()]; each iteration, 'newarray.push(f(this.array.currelem))';
						// * 3. return newarray
					},
					// TODO: 'end' should default to 'end=this.length()'
					slice(begin, end) {
						// * Sketch:
						// * 1. go until meeting begin; if had already met 'end' before 'begin', make a flag for it;
						// * 2. until meeting 'end' or hitting the flag [which could be 'true' already], add elements to the GeneralArray of the same structure as this one [using .push()]...
						// * 3. return the finally obtained array;
						// ? Question: should it be inclusive to 'end'?
						// * Current decision: yes.
					},
					fillfrom(index, value) {
						// * Sketch:
						// * 1. move to 'index';
						// * 2. until 'isEnd(currvalue)', do 'this.write(currindex, value)';
					},
					convert(template) {
						// TODO: re-organize the templates API [this one and the other 'tiny details' shall probably occupy the next element of the agenda;]...
						// * Sketch:
						// * 1. Create a new GeneralArray with the given template;
						// * 2. walk the current array and '.push()' every element in the new one;
						// * 3. return the new array;
					},
					delete(index) {
						// * Sketch [not the actual code]:
						// * 1. this = this.slice(index, indexgenerator(index))
						// ? Note: one could do it otherwise, as well -- deleting the index not the value;
						// * IDEA: create a method for this too!
						// TODO: yes. pray do;
					},
					deleteMult(startindex, endindex) {
						// * sketch:
						// * 1. this = this.slice(startindex, endindex)
						// ? Question(idea): rewrite the '.delete' through 'deleteMult'?
					},
					project(array, index) {
						// * sketch:
						// * 1. move to the index 'index';
						// * 2. walk the passed general array [array], until reaching either its or the "this"'s .length(), 'this.write(array.array.currelem)'
					},
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
						return this.read(i)
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
						// * 1. return this.concat([baseelem].repeat(times, generator));
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
			}
		)
	},

	IterArray(
		forindexgenerator,
		backindexgenerator,
		forelem,
		backelem,
		initindex,
		setmethod
	) {
		return classTemplate(
			{
				initindex,
				forindexgenerator,
				backindexgenerator,
				forelem,
				backelem,
				setmethod
			},
			function (array) {
				return {
					class: this,
					currindex: this.initindex,
					currelem: this.forelem(array, initindex),
					array: array,
					next() {
						this.currindex = this.class.forindexgenerator(
							this.currindex
						)
						this.currelem = this.class.forelem(
							this.array,
							this.currindex
						)
						return [this.currindex, this.currelem]
					},
					setcurr(newval) {
						// ! PROBLEM: the thing in question COULD work by means of putting in the "setting" method's definition right in there...
						// * But! JS don't have pointers; In a language where they are (exampli gratia C/C++), one could just do `*this.class.currelem = newval`, for instance;
						// * Unfortunately, with JS, this is not the case; it WOULD work on the object-elements, but not the number elements;
						// * So, yes; unless one is writing a wrapper around the JS values for the sake of adding pointers, this kind of thing is not very possible within it generallyv...
						// ^ IDEA: do just that; write a Pointer class for managing pointers within JS.
						return this.class.setmethod(
							this.array,
							this.currindex,
							newval
						)
					},
					prev() {
						this.currindex = this.class.backindexgenerator(
							this.currindex
						)
						this.currelem = this.class.backelem(
							this.array,
							this.currindex
						)
						return [this.currindex, this.currelem]
					},
					// TODO: generalize; generally, about these things here... all very-very rough a sketch...
					// * Bring the rest of the code in proper order... Ger rid of old unrelated stuff, comment out the stuff that is for reworking and tag it correspondently...
					begin(comparison) {
						let curr
						while (
							!comparison(
								this.class.currindex,
								this.class.initindex
							)
						)
							curr = this.prev()
						return curr
					},
					moveforward(comparison, index, begin = false) {
						let currelem = null
						if (begin) currelem = this.begin(comparison)
						while (!comparison(index, this.currindex))
							currelem = this.next()
						return currelem
					},
					// ? Question: should these things become the part of the IterArray instead???
					// * Currently decided: yes, let it be so...They would fit noticeably better there. Add wrappers for them into the thing in question...
					movebackward(comparison, index) {
						let currelem = null
						let isFirst = false
						while (
							!comparison(index, this.array.currindex) &&
							!(isFirst = comparison(
								this.class.initial,
								this.currelem
							))
						)
							currelem = this.prev()
						// TODO: add some sort of configuration for 'special user-defined primitives' for these things; they ought to depend on the user; This is just a placeholder...
						if (isFirst) return false
						return currelem
					}
				}
			}
		)
	},

	// TODO: delete or greatly rework after having finished with the GeneralArray stuff...;
	algorithms: {
		recarrays: {
			pushback: {
				// TODO: generalize the 'lastIndex' arrays to a 'recursivePoints' arrays [sets of recursive (not lastIndex, then generalization won't work...)-array index arrays for the indexes of the 'recursion points'; lastIndex is trivial case -- with the 'points' being [MAX_ARRAY_LENGTH]];
				// * then, add this one as a special case...
				lastIndex(
					MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH,
					isUndefined = (a) => a === undefined
				) {
					return functionTemplate(
						{ MAX_ARRAY_LENGTH, isUndefined },
						function (arr, elem) {
							for (let i = 0; i < MAX_ARRAY_LENGTH - 1; i++) {
								if (this.isUndefined(arr[i])) {
									arr[i] = elem
									return elem
								}
							}
							if (!arr[MAX_ARRAY_LENGTH - 1]) {
								arr.push([elem])
								return elem
							}
							return infinite.algorithms.recarrays.pushback.lastIndex(
								MAX_ARRAY_LENGTH,
								isUndefined
							)(arr[arr.length - 1], elem)
						}
					)
				}
			},
			// TODO: implement [perhaps as .concat([pushedelem], arr)?]; which would really be ".shiftForward(array, pushedelem)"
			pushfront: {},
			// TODO : pray add as a method for the InfiniteArray(s); Same goes for all the unadded methods from the 'algorithms'...
			shiftForward: {
				lastIndex(MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH) {
					return functionTemplate(
						{ MAX_ARRAY_LENGTH },
						function (array, baseelem = undefined) {
							return infinite.algorithms.recarrays.concat.lastIndex(
								MAX_ARRAY_LENGTH
							)([baseelem], array)
						}
					)
				}
			},
			shiftForwardMult: {
				lastIndex(
					generator,
					shiftValue,
					comparison = infinite.valueCompare,
					MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH,
					baseelemfunc = () => undefined
				) {
					return functionTemplate(
						{ MAX_ARRAY_LENGTH },
						function (array) {
							const newArr = []
							let currGenerated
							while (
								!comparison(
									((currGenerated = generator()), shiftValue)
								)
							)
								infinite.algorithms.recarrays.push.lastIndex(
									newArr,
									baseelemfunc(currGenerated)
								)
							return infinite.algorithms.recarrays.concat.lastIndex(
								MAX_ARRAY_LENGTH,
								false
							)(newArr, array)
						}
					)
				}
			},
			// TODO: implement; this thing is like the 'insert' alias...;
			insert: {},
			slice: {
				lastIndex(
					MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH,
					generator,
					comparison = valueCompare,
					undefinedSymbol = undefined,
					isUndefined = (x) => x === undefined
				) {
					return functionTemplate(
						{
							MAX_ARRAY_LENGTH,
							generator,
							comparison,
							undefinedSymbol
						},
						function (
							array,
							begind,
							enind,
							currIndex = undefinedSymbol,
							haveReached = false,
							baseArr = []
						) {
							let newArr = baseArr
							let curr = undefinedSymbol
							let i = 0

							// ? generalize???
							// TODO: the code should be looked through thoroughly in search for generalizations, simplifications, making things more tangible [stuff like this.MAX_ARRAY_LENGTH, instead of JUST MAX_ARRAY_LENGTH and on and on and on...]
							// * Mayhaps, do it only after the very first sketches of algorithms implementations have been written...
							if (!haveReached) {
								let isBegin = false
								// TODO: repeatedApplication... replace with... refactor...
								for (; i < MAX_ARRAY_LENGTH - 1; i++)
									if (
										(isBegin = comparison(
											(curr = generator(curr)),
											begind
										)) ||
										isUndefined(array[i])
									)
										break

								if (!isBegin) {
									if (
										!isUndefined(
											array[MAX_ARRAY_LENGTH - 2]
										) &&
										!isUndefined(
											array[MAX_ARRAY_LENGTH - 1]
										)
									)
										return infinite.algorithms.recarrays.slice.lastIndex(
											MAX_ARRAY_LENGTH,
											generator,
											comparison,
											curr
										)(
											array[MAX_ARRAY_LENGTH - 1],
											begind,
											enind,
											currIndex
										)

									return baseArr
								}
							}

							let isEnd = false
							let j = i

							// ! This thing with repeated 'loop for checking for element undefinedness' should really be generalized...
							// TODO: pray do so...
							// ? Shouldn't one place the 'if' within the "for"'s condition???
							// * Pray think a bit on it...
							for (; j < MAX_ARRAY_LENGTH - 1; j++) {
								if (
									(isEnd = comparison(
										(curr = generator(curr)),
										enind
									)) ||
									isUndefined(array[j])
								)
									break
								infinite.algorithms.recarrays.pushback.lastIndex(
									MAX_ARRAY_LENGTH,
									isUndefined
								)(newArr, array[j])
							}

							if (isEnd || isUndefined(array[j])) return newArr
							return infinite.algorithms.recarrays.concat.lastIndex(
								MAX_ARRAY_LENGTH,
								false
							)(newArr, array[j])
						}
					)
				}
			},
			// * Projects a piece of an array onto another array of the same recursive type after and before having met certain index of the generator with a certain 'compared' property...;
			// ^ IDEA: into the docs, pray introduce the idea of 'array recursive type'; It'd allow to [more explicitly and structuredly on documentation level] separate all the 'recarrays' things from each other on a type level, not only the concept-level...
			// ! MORE AND MORE OF THESE THINGS TEND TO BE ARRAY-TYPE-INDEPENDENT!
			// TODO: create a list of array methods that are defining of the structure of it, then make them into separate algorithms, the general ones make into 'templated' methods [that being, just add a 'arrtypelabel' parameter];
			// TODO: create the generalized templated elementary recursive functions for dealing with the recursive arrays [those that could be used by the user on a general basis for construction of new array types];
			// TODO: after having done so, pray make the already available recursive array algorithms into the combinations of these elementary methods...
			project: {},
			concat: {
				lastIndex(MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH, copy = true) {
					return functionTemplate(
						{ MAX_ARRAY_LENGTH, copy },
						function (...arrays) {
							if (arrays.length < 2) return arrays[0]
							if (arrays.length > 2)
								return infinite.algorithms.recarrays.concat.lastIndex(
									MAX_ARRAY_LENGTH,
									false
								)(
									infinite.algorithms.recarrays.concat.lastIndex(
										MAX_ARRAY_LENGTH,
										arrays.length === 3
									)(arrays.slice(0, arrays.length - 1)),
									arrays[arrays.length - 1]
								)

							// todo: problem with using the 'deepCopy' on recursive arrays: fix;
							// * Problem is such -- one wants only a ARRAY-STRUCTURAL copy, not the object copies;
							// * SOLUTION: have a copying algorithm for each and every kind of recursive array [infinite.algorithms.recarrays.copy]...
							// TODO: implement it...
							const copied = copy
								? infinite.deepCopy(arrays[0])
								: arrays[0]

							for (let i = 0; i < arrays[1].length - 1; i++)
								infinite.algorithms.recarrays.pushback.lastIndex(
									MAX_ARRAY_LENGTH
								)(copied, arrays[1][i])

							// ? Now, this decision about the notation for the 'infinite' 'algorithms' subobject, one is happy. HOWEVER...
							// * It does look raaather cumbersome. What to do?
							// ^ IDEA: provide a 'shortcuts' object;
							// ! PROBLEM: it either won't be meaningfully named [like the way one would want] or it would be in essence the same thing, but uglier
							// * CONCLUSION: this thing shouldn't be done on the library level
							// later, pray delete this note...
							if (
								arrays[1][arrays[1].length - 1] instanceof Array
							)
								return infinite.algorithms.recarrays.concat.lastIndex(
									copied,
									arrays[1][arrays[1].length - 1]
								)

							infinite.algorithms.recarrays.pushback.lastIndex(
								copied,
								arrays[1][arrays[1].length - 1]
							)
							return copied
						}
					)
				}
			},
			// ? Question: about the matter of whether to affect the arrays in question??? How should methods be implemented?
			// TODO: think on it and decide [currently preferred: copying];
			delete: {
				lastIndex(
					MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH,
					generator,
					comparison = valueCompare,
					undefinedSymbol = undefined,
					isUndefined = (x) => x === undefined
				) {
					return functionTemplate(
						{
							MAX_ARRAY_LENGTH,
							generator,
							comparison,
							isUndefined,
							undefinedSymbol
						},
						function (array, index, currIndex = undefinedSymbol) {
							let curr = currIndex
							let haveFound = false
							// TODO: again, refactor...
							for (
								let i = 0;
								i < MAX_ARRAY_LENGTH &&
								!(haveFound = comparison(
									(curr = generator(curr)),
									index
								)) &&
								!isUndefined(array[i]);
								i++
							) {}
							// ! PROBLEM [format];
							// * The ()() notation actually isn't correct. One forgot about the '.function' bit.
							// TODO: for now, write like that, then fix everywhere else. These are rough sketches for now...
							if (!haveFound)
								return infinite.algorithms.recarrays.delete.lastIndex(
									MAX_ARRAY_LENGTH,
									generator,
									comparison,
									undefinedSymbol,
									isUndefined
								)(array, index, curr)

							infinite.algorithms.recarrays.shiftBackward.lastIndex(
								MAX_ARRAY_LENGTH
							)(array)
							return
						}
					)
				}
			},
			shiftBackward: {
				// ! PROBLEM: arrays like [..., [...]] would be treated ambigiously always when choosing between the arr.length - 1 and MAX_ARRAY_LENGTH as a 'recursion point'!
				// * CONCLUSION: DON'T DO THAT 'choose the min-length' thing; keeping for this commit, but generally...
				// TODO: GET RID OF IT. Make the 'place of recursion' static [like the way it is!]! Make algorithms implementations [generally] more internally integral and coherent.
				// TODO: again, the 'object' thing -- this don't use the template's value; it's not useful for writing here; Rewrite all the stuff that ever uses templates in a manner which DOES use this...
				lastIndex(MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH) {
					return functionTemplate(
						{ MAX_ARRAY_LENGTH },
						function (array) {
							// TODO: micro-optimize the library harshly; little things like "change all the 'i++' to '++i'" or "use 'p[p.length] = ...' instead of 'p.push(...)'"[that's just a tiny bit faster...]
							// ^ IDEA: an alias 'fpush' for 'fast push' 'fpush := (a, e) => (a[a.length] = e);';
							// * Add;
							for (let i = 0; i < array.length - 2; ++i)
								array[i] = array[i + 1]
							if (array[MAX_ARRAY_LENGTH - 1]) {
								array[MAX_ARRAY_LENGTH - 2] =
									array[MAX_ARRAY_LENGTH - 1][0]
								infinite.algorithms.recarrays.shiftBackward.lastIndex(
									MAX_ARRAY_LENGTH
								)(array[MAX_ARRAY_LENGTH - 1])
								return
							}
							delete array[array.length - 1]
						}
					)
				}
			},
			// * Here, all the 'conversion' arrays go; This thing assumes an input to be either a 'flat' [id est, finite native to JS] array or its recursive extension used by the 'backward' methods...
			convertForward: {},
			// * Here, all the 'inverse-conversions' go; they convert all the supported types of the recursive arrays into the universal form used by the library which is an extension of the 'flat' arrays...
			// TODO: create such a format;
			// ! PROBLEM: may not turn out it to be an 'extension'; same problem as before -- format ambiguity -- questions like "is the array that is an element merely a part of the recursive structure or an actual element?";
			convertBackward: {}
		}
	},

	// ? some of these things are quite good with the arrays.... Question: should Mr. Body be adding those for some kind of "uniter" structure? (Like the Statistics and other such classes from the oldapi, other classes from other packages?)
	// ? considering the fact that there is now the deepCopy() function (which is a generalization of copy)
	// TODO: create some sort of 'form-object's class for shaping which precise 'kind' of 'DeepArray' the templated version is...
	// ^ IDEA: create a 'GeneralArray' kind of InfiniteArray, which would generalize all such; it would [in essence], provide a way of defining the accessing and writing procedures for the next element;
	// ! Then, the InfiniteArray would simply be the 'combiner class' [which contains all the algorithms, generalized, without reference to the actual inside-definitions...];
	// * This way, one would avoid all this stuff with 'algorithm copying' and write it both generally, quickly and to one's utter liking!
	// TODO : YES, PRAY DO THAT...
	deepCopy(a) {
		if (a instanceof Array) return a.map((el) => infinite.deepCopy(el))
		if (typeof a === "object") {
			const aCopy = {}
			for (const b in a) aCopy[b] = infinite.deepCopy(a[b])
			return aCopy
		}
		return a
	},
	// * A useful algorithm from a different project of mine; value-wise comparison of two arbitrary things...
	// ? should one use "this" instead of "infinite"? This'd allow for some neat object-related stuff...
	// * Current decision: yes, why not
	valueCompare(a, b, oneway = false) {
		if (typeof a !== typeof b) return false
		switch (typeof a) {
			case "object":
				for (const a_ in a)
					if (!infinite.valueCompare(b[a_], a[a_])) return false
				if (!oneway) return infinite.valueCompare(b, a, true)
				return true
			default:
				return a === b
		}
	},
	// * Does a flat copy of something;
	flatCopy(a) {
		return a instanceof Array
			? [...a]
			: typeof a === "object"
			? { ...a }
			: a
	},

	// * Probably the simplest infinite one would have in JS;
	arrayCounter(a) {
		return [a]
	},

	// * Generalization of the thing above...
	objCounter(fieldname) {
		return (a) => ({ [fieldname]: a })
	},

	// TODO: create a generalization of string's order as an argument and on it -- this thing...
	stringCounter(a) {},

	// TODO: also, add stuff for different numeral systems; create one's own, generalize to a class for their arbitrary creation...
	// * That's an example of an infinite counter;
	// * btw, it is non-linear, that is one can give to it absolutely any array, like for example [[[0, 1234566643]]], and it won't say word against it; will continue in the asked fashion...
	// * This particular nice feature allows to build different InfiniteCounters with different beginnings on it...
	// ! but its output should not be used for reference-checking things, it creates entirely new objects when being called...
	// TODO: create an inverse for this thing...;
	numberCounter(MAX_INT = 2 ** 53 - 1, MAX_ARRAY_LENGTH = 2 ** 32 - 1) {
		return functionTemplate(
			{
				maxint: MAX_INT,
				maxarrlen: MAX_ARRAY_LENGTH
			},
			function (a) {
				if (a === undefined) return [0]
				// ? put these two out of the function's context?
				// TODO : generalize these greately, use here as special cases;
				function findDeepUnfilledNum(a, prevArr = []) {
					const i = [...prevArr, 0]
					for (; i[i.length - 1] < a.length; i[i.length - 1]++) {
						const indexed = a[i[i.length - 1]]
						if (indexed instanceof Array) {
							const temp = findDeepUnfilledNum(a, i)
							if (temp) return temp
							continue
						}
						if (indexed < MAX_INT) return i
					}
					return false
				}
				function findDeepUnfilledArr(a, prevArr = []) {
					const i = [...prevArr, 0]
					for (; i[i.length - 1] < a.length; i[i.length - 1]++) {
						const indexed = a[i[i.length - 1]]
						if (indexed instanceof Array) {
							if (indexed.length < this.maxarrlen) return i
							const temp = findDeepUnfilledArr(a, i)
							if (temp) return temp
						}
					}
					return false
				}
				let resultIndexes = findDeepUnfilledNum(a)
				const _result = util.deepCopy(a)
				let result = _result
				if (!resultIndexes) {
					resultIndexes = findDeepUnfilledArr(a)
					if (!resultIndexes) return [a]

					// TODO: get rid of such object-parameters... within both this library and others...
					result = recursiveIndexation({
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
					// result = repeatedApplication(
					// 	(value) => {
					// 		value.push([])
					// 		return value[value.length - 1]
					// 	},
					// 	finalDimension,
					// 	result
					// )
					for (let i = 0; i < finalDimension; i++) {
						result.push([])
						result = result[result.length - 1]
					}
					result.push(0)
					return _result
				}

				// ? Again! The resulting piece is longer than the original! (Try after having gotten rid of those braces, object notation...)
				// result = recursiveIndexation({
				// 	object: result,
				// 	field: resultIndexes.slice(0, resultIndexes.length - 1)
				// })
				for (let i = 0; i < resultIndexes.length - 1; i++)
					result = result[resultIndexes[i]]
				result[resultIndexes[resultIndexes.length - 1]]++
				return _result
			}
		)
	},

	isSameStructure(arr1, arr2, comparison) {
		// ? create an alias for the 'instanceof' instruction?
		if (arr1 instanceof Array != arr2 instanceof Array)
			return comparison(arr1, arr2)

		// todo: PROPERTY-map? (or was this todo not made somwhere already???)
		return min(
			generate(1, max([arr1, arr2].map((a) => a.length))).map(
				(i) => !!this.isSameStructure(arr1[i], arr2[i])
			)
		)
	},

	// TODO: in a library of oneself, there is a piece of code that does precisely this kind of a thing (recursiveApplication);
	// * Again, the issue with inter-dependency; solution is the same -- first publish like so, then rewrite differently...
	// ? Generalize for negatives? [one does have an inverse now...]
	// ? Question: generalize for multiple inverses??? [Excellent; Decide how to do this better;]
	fromNumber(generator) {
		return functionTemplate({ generator: generator }, function (n) {
			if (n < 0) return undefined
			// let result = InfiniteCounter(this.generator)()
			// n = BigInt(n)
			return repeatedApplication(
				(r) => r.next(),
				BigInt(n),
				InfiniteCounter(this.generator)()
			)
			// ? Again; It is more complex [as in -- consisting of more parts] a construct, but takes less space...
			// for (let i = 0n; i < n; i++) result = result.next()
			// return result
		})
	},
	// TODO: document what does this do exactly... Along with everything else...
	// TODO: pray re-order the library's new API again (don't seem to completely like the way it looks like currently...)
	sameStructure(
		array,
		generator,
		currval = undefined,
		copy = true,
		subcall = false
	) {
		const copied = copy ? util.deepCopy(array) : array
		for (let i = 0; i < copied.length; i++) {
			const index = copied[i]
			if (index instanceof Array) {
				currval = sameStructure(index, generator, currval, false, true)
				continue
			}
			currval = currval === undefined ? generator() : generator(currval)
			copied[i] = currval
		}
		return !subcall ? currval : copied
	},

	// // TODO: currently, work with the RecursiveArrays is such a pain; Do something about it;
	// // * The matter of recursiveIndexation and other such library things (code re-doing) would solve a considerable part of the problem;
	// // * Also, the library (probably) should export this thing from the different library as well (would give the user a way of getting less dependencies...)
	// // TODO: finish this thing... (as well as others...)
	// InfiniteArray: class {
	// 	currIndex() {
	// 		return this.index
	// 	}
	// 	next() {
	// * Same as below...
	// TODO: these recursive functions should get generalizations that would become dependencies...
	// ? perhaps, the library function that does this kind of stuff should too be rewritten (after adding math-expressions.js as a dependency) to work with InfiniteCounter(s)
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
	// TODO: as one have decided that the InfiniteArrays can have user-defined, there comes the question of finding and marking the next index... do this;
	// * There is a strong feeling for far more advanced API for working with the RecursiveArrays; This API is to be added
	// ! Pray do walk the code up and down and decide what to do about this...
	// 	}
	// 	currElement() {
	// * Again, an algorithm. Should be a wrapper AROUND AN ARBITRARY algorithm...
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
	// ^ These are nice algorithms, they should get their own functions -- this is a wrapper for algorithms of the user.
	// * Library should provide general wrappers and particular algorithms separately from each other, this way alowing for infinitely greater diversity in the final code in question
	// * (not necesserily neglecting presence of defaults...)
	// TODO: create defaults for all manner of these things...
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
	// TODO: generalize.... Make this a template()... Let the arbitrary positional function 'k' be chosen, instead of current default `k := (_x) => MAX_ARRAY_LENGTH - 1`
	// TODO: generalize even further -- give a number of different indexes to be pursued, add a pattern for choosing between them...
	// TODO: generalize even further -- give the 'max_index=MAX_ARRAY_LENGTH' -- after this index, it would behave as if there's no index space left within the current level of recursive array...
	// * After this is done, let the lastIndexArray() become a special case of this 'general' "indexArray" function...
	lastIndexArray: function (arrays, currArr = [], deepen = true) {
		let arr = currArr

		if (arr.length === MAX_ARRAY_LENGTH) {
			if (
				(deepen && !(deepen instanceof Array)) ||
				(deepen instanceof Array && deepen[0])
			)
				arr = [...arr.slice(0, arr.length - 1), [arr[arr.length - 1]]]
			// TODO: use the alias last() for arrays [simplify code with it...];
			// TODO: create a generalization orderIndex(arr, indexes, i = 0) := arr[indexes[i]]
			// ! Problem: with the 'deepen' argument -- it's not general enough...
			// TODO: generalize it to encompass any possible pattern...
			// ? Should one even have that one???
			// * Many difficulties as to how the API should look like precisely...
			return infinite.lastIndexArray(
				arrays,
				arrays[arrays.length - 1],
				deepen instanceof Array && deepen.length > 1
					? deepen.slice(1)
					: deepen
			)
		}

		for (let i = 0; i < arrays.length; i++) {
			for (let j = 0; j < arrays[i].length; j++) {
				if (arr.length < MAX_ARRAY_LENGTH - 1) {
					arr.push(arrays[i][j])
					continue
				}
				if (arr.length === MAX_ARRAY_LENGTH - 1) arr.push([])
				return infinite.lastIndexArray(
					arrays.slice(i).map((a, t) => (t > 0 ? a : a.slice(j))),
					arr[arr.length - 1]
				)
			}
		}

		return arr
	},

	lastIndexArrayHas(array, thing, comparison) {
		for (let i = 0; i < array.length - 1; i++)
			if (comparison(array[i], thing)) return true
		if (array[array.length - 1] instanceof Array)
			return this.lastIndexArrayHas(
				array[array.length - 1],
				thing,
				comparison
			)
		return comparison(array[array.length - 1], thing)
	},

	// TODO: for this thing, pray first introduce max() for an array of InfiniteCounters(generator) [that is a static method, so depend only upon chosen 'generator', not 'this.generator']...
	// ! Make this array-type-independent; a general algorithm for arbitrary arrays, working with the use of InfiniteCounter(s);
	dim(recarr) {},

	// TODO: implement -- depthOrder([[[0], [1], 2], 3, [[4, [5]]]]) := lastIndexArray([1,2,3,4,5])
	// TODO: let these thing NOT rely upon lastIndexArray, but rather allow to give some different infinite indexing structure [decide how should it work -- first write like that, then vastly generalize];
	// ? generalize this thing too?
	// ! THIS DOESN'T WORK. Because:
	// * There should be an API within this thing for 'mergeing' different kinds of recursive arrays -- that is the main problem. THEY AREN'T FLUID, like the way they are supposed to be.
	// ^ IDEAS for doing it:
	// * 1. Turn them to the same format (example: lastIndexArray);
	// * 2. Provide ways for user to define 'conversion' function-parameters for these kinds of things.
	// ! Problems with 1:
	// * One could easily define conversion to lastIndexArray (because they're one format), but what about the reverse? If one chooses this, there should be recursiveRecerse function for this kind of stuff on emphasis of 'how does one keep the recursive pattern'...
	// ! Problems with 2:
	// * This'd work, but would complicate ALL pieces of the 'infinite' api, not just some 1, like in the first one;
	// * CURRENT DECISION: unless one creates some better idea for it, 1 will be the way...
	// TODO: after having done that, pray rewrite and fix.
	depthOrder(array, isElement = (x) => !(x instanceof Array), first = true) {
		let currarr = []
		// TODO: the library is in bad need of a very powerful and thorough clean-up... Both code, comments and TODOS. Do it, pray
		const notAdd = (x) => x instanceof Array && !isElement(x)
		for (
			let copied = first ? this.deepCopy(array) : array;
			copied.length;
			copied = copied.slice(1)
		) {
			if (notAdd(copied[0])) {
				currarr = margeLastIndexArrs(
					currarr,
					this.lastIndexArray(copied[0], isElement)
				)
				continue
			}
			// ! These structural things are supposed to have their API just like arrays, but defined in terms of user functions;
			// TODO: create a GeneralArray template-class, that would do that thing; Then, pray do generalize powerfully, like one did intend...
			pushToLastIndexArray(currarr, copied[0])
			currarr = this.lastIndexArray([currarr])
		}

		return currarr
	},

	// todo: have some wrapper for all these "recursive structural" methods [to make the organization of all this simpler, it looks very dirty - having so many of these things flaying about];
	// * the more general ones stay aside, not included...
	mergeLastIndexArrs(arrs) {},

	// ? Should one not then write the InfiniteArray class, then use it in the InfiniteString class (not to repeat the same things all over again)?
	// TODO: finish the InfiniteString class; It would allow work like with a string, though would be based on the InfiniteCounter/TrueInteger classes...
	// * Let it have all the capabilities (methods, properties) of a string and more -- let there be a way to reverse() it natively...;
	InfiniteString: class {
		append(x) {
			// ? generalize and then make an export ?
			function appendStrRecursive(str, thisArg, i = 0) {
				// TODO: replace with repeatedApplication or recursiveIndexation or something such within a different library...
				let currLevel = thisArg.string
				for (let j = 0; j < i; j++) {
					const indexed = currLevel[currLevel.length - 1]
					if (typeof indexed === "string") break
					currLevel = indexed
				}
				if (currLevel.length < MAX_ARRAY_LENGTH - 1) {
					thisArg.length = thisArg.length.next()
					currLevel.push(str)
					return
				}
				if (currLevel.length === MAX_ARRAY_LENGTH - 1)
					currLevel.push([])
				return appendStrRecursive(str, thisArg, i + 1)
			}
			function appendInfStringRecursive(arr, thisArg) {
				for (let i = 0; i < arr.string.length - 1; i++) {
					const currStr = arr.string[i]
					if (typeof currStr !== "string") break
					appendStrRecursive(currStr, thisArg)
				}
				if (arr.string.length === MAX_ARRAY_LENGTH) {
					appendInfStringRecursive(
						new InfiniteString(
							arr.string[arr.string.length - 1],
							arr.indexGenerator
						),
						this
					)
				}
			}
			if (typeof x === "string") return appendStrRecursive(x, this)
			return appendInfStringRecursive(x, this)
		}
		copy() {
			return util.deepCopy(this)
		}
		// TODO: allow for use of the InfiniteString as an argument... (That is, copying an InfiniteString; new instance is by default its extension...)
		// TODO: allow for use of the RecursiveArray<string>... (for this, generalize the last element-safety check...)
		constructor(initial, indexGenerator) {
			if (typeof initial === "string") {
				this.string = [initial]
				return
			}
			this.string = initial
			// TODO: use the util.gut... and util.encircle... functions for the finalized check (make it all the same form -- [string, ...., pointer to RecursiveArray<string>])
			if (initial.length === MAX_ARRAY_LENGTH) {
				this.string[this.string.length - 1] = [
					this.string[this.string.length - 1]
				]
			}
			this.length = fromNumber(indexGenerator)(initial.length)
			this.indexGenerator = indexGenerator
		}
	},

	// TODO: add the circular counters (too, an infiniteCounter, just one that is looped)
	// TODO: finish this thing (add orders, other things from the previous file)...
	// TODO: add a way of transforming the given InfiniteCounter into a TrueInteger on-the-go and back again; This allows to use them equivalently to built-in numbers (their only difference currently is counter arithmetic...)
	InfiniteCounter(generator, inversegenerator) {
		return classTemplate(
			{ generator: generator, inverse: inversegenerator },
			function (previous) {
				return {
					class: this,
					value: !previous
						? this.generator()
						: this.generator(previous.value),
					next() {
						return this.class.class(this)
					},
					// ? 'previous'? or 'prev'? Or something else?
					// * Current decision: let it be 'prev'...
					previous() {
						return this.class.inverse(this)
					},
					// * 'true' means 'this follows ic'
					// * 'false' means 'ic follows this'
					// * 'null' means 'no following';
					compare(
						ic,
						isendfro = () => false,
						isendto = () => false,
						comparison = infinite.valueCompare
					) {
						// ! PROBLEM: infinite types! Without any 'first' or 'last', one won't know until when to check!
						// * Currently solved this with a 'hack' -- user gives their own way of telling this [isendto, isendfro];
						// TODO: pray think on it and if do create something that is more wanted, pray implement it so...
						// ? Thinking... Maybe that's not so much of a hack after all??? Perhaps one would even keep it...
						let pointer = ic
						let isIt = false

						// ? Generalize this thing somehow? One ends up repeating the same code twice for two different values and methods...
						// * Something like 'searchUntil', for instance?
						while (
							!isendfro(pointer) &&
							!(isIt = comparison(pointer.value, this.value))
						)
							pointer = pointer.previous()
						if (isIt) return true

						pointer = ic
						while (
							!isendto(pointer) &&
							!(isIt = comparison(pointer.value, this.value))
						)
							pointer = pointer.next()
						if (isIt) return false

						return null
					},
					jump(
						x,
						jumping = (k) => k.next(),
						comparison = infinite.valueCompare,
						isendto = () => false,
						isendfro = () => false
					) {
						return ((x) => {
							if (x === undefined) return this
							return ((i) =>
								repeatedApplicationWhilst(
									(r) => {
										i = i.next()
										return jumping(r)
									},
									() =>
										x.compare(
											i,
											isendfro,
											isendto,
											comparison
										),
									{ ...deepCopy(this), class: this.class }
								))(
								// TODO: numberCounter inverse -- write; For now -- null
								infinite.InfiniteCounter(
									infinite.numberCounter,
									null
								)()
							)
						})(
							typeof x === "number"
								? infinite.fromNumber(infinite.numberCounter)(x)
								: x
						)
					},
					jumpForward(x) {
						return this.jump(x)
					},
					jumpBackward(x) {
						return this.jump(x, (k) => k.previous())
					},
					map(icClass, comparison = infinite.valueCompare) {
						let current = this.class.class()
						let alterCurrent = icClass.class()
						while (!comparison(current, this))
							alterCurrent = alterCurrent.next()
						return alterCurrent
					}
				}
			}
		)
	},

	// ! PROBLEM: this thing don't actually use the 'notfound' in definitions...
	// TOdo : let the particulars [implementations] use it instead [after having written some that do, pray delete the todo];
	InfiniteArray(comparison, indexgenerator, notfound) {
		return template(
			{ comparison, indexgenerator, notfound },
			function (
				pushback,
				pushfront,
				index,
				_delete,
				// ? names: forof, forin
				forof,
				forin,
				reverse,
				map,
				sort,
				length,
				concat,
				copyWithin,
				every,
				any,
				reduce,
				slice,
				property,
				indexesOf,
				entries,
				each,
				fillfrom,
				has
			) {
				return classTemplate(
					{
						pushback,
						pushfront,
						index,
						delete: _delete,
						forof,
						forin,
						reverse,
						map,
						sort,
						length,
						concat,
						copyWithin,
						every,
						any,
						reduce,
						slice,
						property,
						indexesOf,
						entries,
						each,
						fillfrom,
						has,
						template: this
					},
					function (array) {
						return {
							array,
							class: this,
							pushback: this.pushback,
							pushfront: this.pushfront,
							// TODO: another [general] problem -- the classes are generally supposed to hide things like: push(arr, elem) -> arr.push(elem) [the methods should have the first 'this' argument replaced by the 'this.array'];
							// * There's a couple of other problems concerning the function definitions within the InfiniteArray, InfiniteMap and InfiniteCounter; pray check them, and change throughout the entire code...;
							// TODO: 'initial' should be given for generators everywhere as a conditional parameter [by default undefined -- calls generator(), like the way it is now...]
							index(
								indexgenerator = this.class.template
									.indexgenerator,
								comparison = this.class.template.comparison
							) {
								// todo: here, the 'this' feature with changing templates mid-stream don't really work [because the functionTemplate 'this' is not really used...]
								// * Pray scan all the code that uses the in-library templates on the matter of having it working...
								// ? Question: should the function templates within the methods in question also have the 'class' thing, or not???; Would seem appropriate...
								// * Answer: yes; add that to all the things of the sort as well...
								// ! Pray tidy up this todo/note from redundacies later...
								return functionTemplate(
									{
										indexgenerator,
										comparison,
										object: this
									},
									function (_index) {
										return this.object.class.index(
											this.indexgenerator,
											comparison
										)(this.object.array, _index)
									}
								)
							},
							delete(
								indexgenerator = this.class.template
									.indexgenerator
							) {
								return functionTemplate(
									{ indexgenerator, object: this },
									function (_index) {
										return this.object.class.delete(
											this.indexgenerator
										)(this.object.array, _index)
									}
								)
							},
							[Symbol.iterator]: this.forof,
							forin: this.forin,
							reverse: this.reverse,
							map: this.map,
							sort: this.sort,
							length: this.length,
							concat: this.concat,
							copyWithin(
								indexgenerator = this.class.template
									.indexgenerator
							) {
								return functionTemplate(
									{ indexgenerator, object: this },
									function (beginind, endind, targetind) {
										return this.object.class.copyWithin(
											this.indexgenerator
										)(
											this.object.array,
											beginind,
											endind,
											targetind
										)
									}
								)
							},
							every: this.every,
							any: this.any,
							reduce(
								indexgenerator = this.class.template
									.indexgenerator
							) {
								return functionTemplate(
									{ indexgenerator, object: this },
									function (initial, direction, callback) {
										return this.object.class.reduce(
											this.indexgenerator
										)(
											this.object.array,
											initial,
											direction,
											callback
										)
									}
								)
							},
							slice(
								indexgenerator = this.class.template
									.indexgenerator
							) {
								return functionTemplate(
									{ indexgenerator, object: this },
									function (start, end) {
										return this.object.class.slice(
											this.indexgenerator
										)(this.object.array, start, end)
									}
								)
							},
							property: this.property,
							indexesOf(
								comparison = this.class.template.comparison,
								indexgenerator = this.class.template
									.indexgenerator
							) {
								return functionTemplate(
									{
										indexgenerator,
										comparison,
										object: this
									},
									function (ele) {
										return this.object.class.indexesOf(
											this.indexgenerator
										)(this.object.array, ele)
									}
								)
							},
							entries(
								indexgenerator = this.class.template
									.indexgenerator
							) {
								return functionTemplate(
									{ indexgenerator, object: this },
									function () {
										return this.object.class.entries(
											this.indexgenerator
										)(this.object.array)
									}
								)
							},
							each(
								indexgenerator = this.class.template
									.indexgenerator
							) {
								return functionTemplate(
									{ indexgenerator, object: this },
									function (callback) {
										return this.object.class.each(
											this.indexgenerator
										)(this.object.array, callback)
									}
								)
							},
							fillfrom(
								indexgenerator = this.class.template
									.indexgenerator,
								comparison = this.class.template.comparison
							) {
								return functionTemplate(
									{
										indexgenerator,
										comparison,
										object: this
									},
									function (index, value) {
										return this.class.fillfrom(
											this.indexgenerator,
											this.comparison
										)(this.object.array, index, value)
									}
								)
							},
							has(comparison = this.class.template.comparison) {
								return functionTemplate(
									{ comparison, object: this },
									function (elem) {
										return this.class.has(this.comparison)(
											this.object.array,
											elem
										)
									}
								)
							}
						}
					}
				)
			}
		)
	},

	// TODO: write the implementation for these two...
	LastIndexArray(comparison, indexgenerator, notfound) {
		return infinite.InfiniteArray(...arguments)()
	},

	DeepArray(comparison, indexgenerator, notfound) {
		return infinite.InfiniteArray(...arguments)()
	},

	// ? Should one make the arguments for this sort of thing named (using a single object-argument, containing all the info instead of the separate ones containing information on each particular topic) ???
	// * Pray think about it...
	// ! Again, the thing with choosing between null/undefined...
	// TODO: after having written InfiniteMap and InfiniteArray wrappers, pray write some implementations of it all... Align different methods to work with them particularly...
	// ? Should one choose 'null' as a default, the '(a, b) => a === b' or the valueCompare?
	// * Documentation, Documentation, Documentation. This thing badly needs it [which properties are in it, yada, yada, yada];
	// TODO: finish the InfiniteMap class; the UniversalMap has a limitation of 2**32 - 1 elements on it, whilst the InfiniteMap would have no such limitation...
	// TODO: let the InfiniteMap and UniversalMap have the capabilities of adding getters/setters (or better: create their natural extensions that would do it for them)
	// ? Question: store the pointer to the 'infinite' structure within the thing in question.
	InfiniteMap(keyorder) {
		return classTemplate(
			{ keyorder },
			function (
				set,
				get,
				entries,
				every,
				forof,
				forin,
				generator = null,
				comparison = null
			) {
				return classTemplate(
					{
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
					function (keys, values) {
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
								return functionTemplate(
									{ comparison },
									this.class.set(comparison)
								)
							},
							get(comparison = this.class.comparison) {
								return functionTemplate(
									{ comparison },
									this.class.get(comparison)
								)
							},
							entries(generator = this.class.generator) {
								return functionTemplate(
									{ generator: generator },
									this.class.entries(generator)
								)
							},
							// TODO: this one is more troublesome -- one requires to know what kind of an InfiniteMap is it that one is in fact mapping to (first creating, then setting corresponding things...)
							// ? Return back to the question of how are the arguments handled within this thing...
							map() {},
							every: this.class.every,
							[Symbol.iterator]: this.class.forof,
							forin: this.class.forin
						}
					}
				)
			}
		)
	}
}

// Aliases

const exp = op
const repeatedArithmetic = repeatedOperation
const sameOperator = repeatedArithmetic
const mostPopularElem = mostPopular
const mostPopularNum = mostPopular
const repeatedApplicationWhile = repeatedApplicationWhilst

// TODO: use the aliases in appropriate places within the code. Give it a good shortening session: walk about making aliases for repeating expressions and then replace those with the newly introduced names...
const bind = (a, f, fieldName) => (a[fieldName] = f.bind(a))
const last = (arr, obj, comparison = valueCompare) => {
	return max(indexOfMult(arr, obj, comparison))
}
const first = (arr, obj, comparison = valueCompare) => {
	return min(indexOfMult(arr, obj, comparison))
}
const _last = (arr) => arr[arr.length - 1]
const _first = (arr) => arr[0]
// todo: to EXPORT
const insert = (arr, index, values) =>
	arr.slice(0, index).concat(values).concat(arr.slice(index))
const _insert = (arr, index, val) => insert(arr, index, [val])
const remove = (arr, start, end) =>
	arr.slice(0, start).concat(arr.slice(end + 1))
const _remove = (arr, index) => remove(arr, index, index)
const minlen = (...arrs) => flen(min, ...arrs)
const maxlen = (...arrs) => flen(max, ...arrs)
const flen = (f, ...arrs) => {
	return f(arrs.map((a) => a.length))
}
const flenarrs = (f, ...arrs) => {
	const _f = f(...arrs)
	return arrs.filter((a) => a.length === _f)
}
const minlenarrs = (...arrs) => flenarrs(minlen, ...arrs)
const maxlenarrs = (...arrs) => flenarrs(maxlen, ...arrs)

// TODO: rewrite the docs...
/**
 * Copies an array without referencing its object.
 * @param {any[]} nums An array that needs to be copied.
 * @returns {number[]} Copy of a passed array, without referencing its object.
 */
const copy = infinite.flatCopy
// * Previous definition (later, clear?)
// function copy(nums = [1, 2, 3, 4, 5]) {
// 	return nums.map(id)
// }

// * Identity map (just a nice piece of notation, that's all);
const id = (a) => a

// Classes

/**
 * This class represents an assembly of various statistics on the array of numeric data given.
 *
 * Useful when needing a lot of info about data in one place.
 */
class Statistics {
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
class Surface {
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
			indexOfMult(this[`${type}s`], data, infinite.valueCompare)
				.length !== 0
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
			indexOfMult(this[`${type}s`], data, infinite.valueCompare)
				.length === 0
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
class Expression {
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
class Tests {
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
class Vector {
	// TODO: make this thing into a separate type or something... It is very big and clumsy (though, useful...)
	constructor(vectorargs) {
		// TODO: let there be way for user to give their own defaults for this thing...
		ensureProperty(vectorargs, "vector", [])
		ensureProperty(vectorargs, "defaultelement", () => null)
		ensureProperty(vectorargs, "transform", null)
		ensureProperty(vectorargs, "vectortypes", [
			"number",
			"string",
			"boolean",
			"function",
			"object",
			"bigint",
			"any",
			"undefined",
			"symbol"
		])
		ensureProperty(vectorargs, "typefunction", (x) => typeof x)
		ensureProperty(vectorargs, "type", ["any"])
		// TODO: when having fixed all errors, give many things in the library a good renaming... Some of this stuff just don't sound right...
		ensureProperty(vectorargs, "typecheck", (item) => {
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
		return (
			this.vector.push(this.transform ? this.transform(item) : item) - 1
		)
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
class NumberVector extends Vector {
	vectorScalarMultiply(vector) {
		const main =
			Math.max(this.length, vector.length) == vector.length
				? vector
				: this
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
class NumberMatrix extends Vector {}

// * Current idea for the list of features:
// * 1. Only numbers ;
// * 2. Number-related methods present (they are classically defined by default, can be re-defined by the user...);
// * 3. Rectangular-shaped;
class RectNumberMatrix extends NumberMatrix {
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
class SquareNumberMatrix extends RectNumberMatrix {
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
class Ratio {
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
class Algorithms {
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
class Equation {
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
class VarMapping {
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
class IterableSet {
	curr() {
		return Array.from(this.elements.values())[this.currindex]
	}
	next() {
		// ? should self be creating a new method "updateIndex()"? This could be more useful than this... Saves time, one don't always have to have the output...
		// * Current decision: yes, let it be.
		// TODO: pray do that...
		this.currindex = (this.currindex + 1) % this.elements.size
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

// ? Question: how does one want to be ordering all this stuff within a file???
function ensureProperty(object, property, value) {
	if (!object.hasOwnProperty(property)) object[property] = value
}

// ? Should one also add one that is related to shape-things? (Consider)
function Matrix(
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
function nestedVector(
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

// TODO: restore the old order of following within the library -- aliases, constants, classes, functions, one big export; Currently, it's a mess...
// * Counts all non-array elements within a multidimensional array passed...
function nonArrElems(array) {
	return array instanceof Array
		? repeatedArithmetic(array.map(nonArrElems), "+")
		: 1
}

// Counts all the elements within a multi-dimensional array (including the arrays themselves...)
function totalElems(array) {
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
function op(objects, operator, operatorTable = defaultTable) {
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
function repeatedOperation(objects = [], operator, table = defaultTable) {
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
 * ! (but in this case the last element of the operators[] array will be ignored).
 *
 * @param {Expression} expression An object, containing two array properties, one of which is for numbers(or strings) using which expression will be executed and the second is for strings, each of which contains an ariphmetic operator, using which expression shall be executed.
 */
function fullExp(expression) {
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
 * @param {Expression} expression An object, that contains two key-value pairs, where each value is an array. First array contains nums, second - operators.
 * @param {number} timesRepeat   A number of repeats of ariphmetic operation.
 * @param {string} repeatOperator   A string, containing an operator, with which ariphmetic operation upon the expression result will be done a several times.
 */
function repeatExp(expression, repeatOperator, timesRepeat = 1) {
	const tempRes = fullExp(expression)
	let result = deepCopy(tempRes)
	for (let i = 0; i < timesRepeat - 1; i++)
		result = exp([result, ...generate()], repeatOperator)
	return result
}

/**
 * Takes the number array and rerturns an average of it.
 * @param {number[]} nums An array of numbers passed to the function.
 * @param {boolean} isTruncated A boolean saying does or does not the average will be truncated. By default false.
 * @param {number} percents A number, that is used as a multiplier for two, when shortening the numeric array.
 */
function average(nums = [], isTruncated = false, percents = 10) {
	return (function (newArr) {
		return floor(
			repeatedArithmetic(newArr, "+") /
				(nums.length + ((nums.length === newArr.length) - 1)),
			globalPrecision
		)
	})(isTruncated && percents > 0 ? truncate(nums, percents) : nums)
}

/**
 * Takes an array of numbers and returns the smallest of thems.
 * @param {number[]} nums An array of numbers passed to the function.
 * @returns {number} The smallest number of the passed array.
 */
function min(nums = []) {
	return arrApply(Math.min, nums)
}

/**
 * Takes an array of numbers and returns the largest of them.
 * @param {number[]} nums An array of numbers passed to the function.
 * @returns {number} The largest number in passed numerical array.
 */
function max(nums = []) {
	return arrApply(Math.max, nums)
}

/**
 * Takes an array of numbers, which length can be odd or even and returns the median of it.
 * @param {number[]} nums An array of numbers, passed to the function.
 */
function median(nums = []) {
	return (function (sorted) {
		return (
			nums.length % 2 === 1
				? id
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
function mostPopular(
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

function leastPopular(
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
function range(nums = [], isInterquartile = false) {
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
function sort(nums = [], forward = true) {
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
function generate(start, end, step = 1, precision = 1) {
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
function find(searchArr, searchVal) {
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
function readable(num) {
	const arr = num.toString().split("")
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

function permutations(array) {
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

function whileFunctional(prop, body, endElem = null) {
	return prop() ? [body(), whileFunctional(prop, body, endElem)] : endElem
}

/**
 * Factors out a passed number to the prime numbers. Works quite quickly.
 * @param {number} num Number, to be factored out.
 * @returns {number[]} Prime factors array.
 */
function factorOut(number) {
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

function isPrime(x) {
	return factorOut(x).length === 1
}

function primesBefore(x) {
	return generate(1, x).filter((a) => isPrime(a))
}

// * Brings whatever is given within the given base to base 10;
// TODO: generalize this "alphabet" thing... Put this as a default of some kind somewhere...
function nbase(nstr, base, alphabet = defaultAlphabet) {
	return repeatedArithmetic(
		generate(0, nstr.length - 1).map(
			(i) => alphabet.indexOf(nstr[i]) * base ** i
		),
		"+"
	)
}

// * Brings whatever in base 10 to whatever in whatever base is given...
function nbasereverse(n, base, alphabet = defaultAlphabet) {
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

function strMap(str, symb) {
	return str.split("").map(symb)
}

function baseconvert(a, basebeg, baseend) {
	return nbasereverse(nbase(a, basebeg), baseend)
}

/**
 * Takes a numeric array and a number and truncates the passed array, using the second paramater as a count of percents of numbers, that shall be deleted.
 * @param {number[]} nums An array to be truncated.
 * @param {number} percents A number, that is multiplied by two(if you passed 10, then it is 20) and represents count of percents of numbers to be deleted from the edges of the passed array.
 */
function truncate(nums, percents = 10) {
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
function multiples(n, range) {
	return generate(1, range).map((a) => a * n)
}

function multiplesBefore(n, x) {
	return multiples(
		n,
		(() => {
			let i = 0
			while (n * i < x) i++
			return i
		})()
	)
}

// TODO: generalize to leastCommon when working on the general 'orders' api for 'newapi';
// TODO: generalize all the number-theoretic functions implementations that take a particular number of arguments to them taking an arbitrary amount (kind of like here and in the newapi.util.arrIntersections)
/**
 * Takes three numbers, thwo of which are numbers for which least common multiple shall be found and the third one is a search range for them.
 * @param {number} firstNum First number.
 * @param {number} secondNum Second number.
 */
function leastCommonMultiple(...nums) {
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

function commonMultiples(range, ...nums) {
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

function leastCommonDivisor(...nums) {
	// TODO: like this style; rewrite some bits of the library to have it -- replaceing 'const's with nameless (anonymous) functions as a way of "distributing" certain value;
	return ((x) =>
		typeof x === "number" || typeof x === "undefined" ? x : min(x))(
		commonDivisors(...nums)
	)
}

function commonDivisors(...nums) {
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
function deviations(row, isSquare = false, isTruncated = false, percents = 10) {
	const rowAverage = average(row, isTruncated, percents)
	const deviations = []
	row.forEach((num) => {
		isSquare
			? deviations.push(
					floor(Math.pow(num - rowAverage, 2), globalPrecision)
			  )
			: deviations.push(
					floor(Math.abs(num - rowAverage), globalPrecision)
			  )
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
function dispersion(
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
function standardDeviation(row = [], isPopulation = true, indexes = []) {
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
function standardError(
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
function degreeOfFreedom(...numRows) {
	let lenSum = 0
	for (let i = 0; i < numRows.length; i++) lenSum += numRows[i].length
	return lenSum - numRows.length
}

/**
 * Takes a numbers array and an array of probabilities for each of the given numbers to appear and returns expected value for them.
 * @param {number[]} numbers A number array, expected value for which is to be found.
 * @param {number[]} probabilities An array of probabilitiles for certain numbers from numbers array to appear.
 */
function expectedValue(numbers, probabilities) {
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
function floor(number, afterDot = globalPrecision) {
	return Number(number.toFixed(afterDot))
}

// TODO: generalize to allow for arbitrary "random" function...
/**
 * Takes the max length of the random array, it's max value, the flag, characterizing whether numbers in it should be integers.
 * @param {number} maxLength The largest count of numbers, that can appear in the random array. (It can be different from the given value).
 * @param {number} maxValue The max value, that can be found in the randomly generated array.
 * @param {boolean} integers The boolean flag, that represents whether all numbers in the array should be integers or not. By default false.
 */
function randomArray(maxLength, maxValue, integers = false) {
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
function isPerfect(number) {
	return repeatedArithmetic(allFactors(number).map(String), "+") === number
}

/**
 * Takes one integer and returns all of its factors (not only primes, but others also).
 * @param {number} number An integer, factors for which are to be found.
 */
function allFactors(number) {
	const factors = [1]
	for (let currFactor = 2; currFactor !== number; currFactor++)
		if (number % currFactor === 0) factors.push(currFactor)
	return factors
}

/**
 * This function calculates the factorial of a positive integer given.
 * @param {number} number A positive integer, factorial for which is to be calculated.
 */
function factorial(number) {
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

/**
 * This function does a fixed addition of two numbers. It decreases error a tiny bit, but with large numbers it may be signigicant.
 * @param {number} float1 First number to be added.
 * @param {number} float2 Second number to be added.
 * @returns {[number, number]} a number with error much less than it would be with JavaScript addition.
 */
function realAddition(float1, float2) {
	const sum = float1 + float2
	const fixedB = sum - float1
	const fix = float2 - fixedB
	return [sum + fix, fix]
}

/**
 * This function takes an integer value, representing the new precision of the output and sets fixdSize equal to it.
 * @param {number} newPrecision The new value of fixedSize.
 */
function setPrecision(newPrecision = 0) {
	return (globalPrecision = newPrecision | 0) // in case someone malisciously decides to put floats in there, hehe :D
}

// TODO : separate onto reference-equality (current) and value-equality (for this, one could employ newapi.utils.valueComparison)
/**
 * This funciton takes in n arrays of dimension 1 (dim (arr) = 1) and compares them.
 * (I.e. returns the boolean value, representing whether they're equal or not).
 * @param {any[]} arrays An array of one-dimensional array of any length.
 */
function arrayEquality(...arrays) {
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
function dim(array) {
	if (array instanceof Array)
		return 1 + (array.length === 0 ? 0 : max(array.map((a) => dim(a))))
	return 0
}

// function dim(array: any): number {
// 	const d = (elem: any) => (elem instanceof Array ? t(elem) : 0)
// 	const t = (arr: any[]) =>
// 		1 + (arr.length === 0 ? 0 : max(arr.map((el) => d(el))))
// 	return array instanceof Array ? t(array) : 0
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
function binomial(n, k) {
	if (typeof n !== "number" || typeof k !== "number")
		throw new Error("Requiring a number to calculate the choose function. ")
	// Rounding down just in case.
	k = k | 0
	return floor(
		repeatedArithmetic(
			generate(0, k - 1, 1).map((num) => String(n - num)),
			"*"
		) / factorial(k)
	)
}

// TODO: Implement the compareUniversal(...arrays), which uses dim;

// * Replaces a value within a string...
// TODO: this replaces All -- write replaceFirst(n: number) function, which would only replace first appearing...
function replaceStr(string, x, y) {
	return string.split(x).join(y)
}

function replaceStrInd(string, ind, value) {
	return `${string.slice(0, ind)}${value}${string.slice(ind)}`
}

function replaceStrIndMany(string, inds, values) {
	// TODO: use the min() instead of Math.min here...
	return repeatedApplicationIndex(
		(val, i) => replaceStrInd(val, inds[i], values[i]),
		Math.min(inds.length, values.length),
		string
	)
	// * Previous: before refactoring (check that they are the same thing...)
	// let copy = string
	// for (let i = 0; i < inds.length; i++)
	// 	copy = replaceStrInd(copy, inds[i], values[i])
	// return copy
}

function replaceStrMany(string, x, y) {
	// TODO: use min() instead of Math.min() here...
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
function replaceArr(array, x, y, transformation = (a) => a) {
	const resArray = [...array]
	for (let i = 0; i < array.length; i++) {
		const index = x.indexOf(array[i])
		if (index !== -1) resArray[i] = transformation(y[index])
	}
	return resArray
}

// * just a convinient syntax...
function arrThisApply(f, arr, thisArg = null) {
	return f.apply(thisArg, arr)
}

function arrApply(f, arr) {
	return f(...arr)
}

function countAppearences(
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

function indexOfMult(array, el, comparison = (a, b) => a === b) {
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
function clearRepetitions(arr, el, tokeep = 0, comparison = (a, b) => a === b) {
	const firstMet = indexOfMult(arr, el, comparison)
	return firstMet.length
		? arr.filter(
				(a, i) => firstMet.indexOf(i) < tokeep || !comparison(a, el)
		  )
		: [...arr]
}

function splitArr(arr, el, comparison) {
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
function gutInnerArrs(array) {
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
function gutInnerArrsRecursive(array) {
	while (hasArrays(array)) array = gutInnerArrs(array)
	return array
}

function hasArrays(array) {
	return max(array.map((a) => Number(a instanceof Array))) === 1
}

// * "reverses" the gutInnerArrs (only once, at a given place)
function arrEncircle(a, from = 0, to = a.length) {
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
function arrStructureCopy(thing) {
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
// * IDEA: a recursive function-building type: RecursiveFunctionType<ArgType, Type> = (a: ArgType) => RecursiveFunctionType<Type> | Type
// ! By repeatedly calling them, one would obtain expressions equivalent to some n number of variables...: func(a)(b)(c) instead of func(a, b, c);
function arrIntersections(arrs, comparison = (a, b) => a === b) {
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

function repeatedApplication(a, n, initial = undefined) {
	if (BigInt(n) <= 0) return initial
	if (BigInt(n) === 1n) return a(initial)
	return a(repeatedApplication(a, n - 1))
}

function repeatedApplicationIndex(
	a,
	n,
	initial = undefined,
	offset = typeof n === "bigint" ? 1n : 1
) {
	if (BigInt(n) <= 0) return initial
	if (BigInt(n) === 1) return a(initial, n - offset)
	return a(repeatedApplicationIndex(a, n - 1, initial, offset), n - offset)
}

// * This can create infinite loops... Equiv. of `function () {let a = initial; while (property()) {a = b(a)}; return a}`; (Should one not also add this one thing?)
function repeatedApplicationWhilst(function_, property, initial = undefined) {
	return property()
		? repeatedApplicationWhilst(function_, property, function_(initial))
		: initial
}

// TODO: create a repeatedApplicationFor...

// ? should this be kept? It is a special case of the function below....
// * Current decision: let it stay; it may be nice to just "get it"; without taking the first index...
function _multmap(a, fs) {
	return multmap([a], fs)[0]
}

// * Finds use in Mr. Body's code all the time.
// ^ Note: The first index stays for the elements, the second one stays for the function...
function multmap(a, fs) {
	return a.map((el) => fs.map((f) => f(el)))
}

// TODO: match the order of the definitions with the order of exports... Do the same for all the files...
// * Also, match with the original "math-expressions.js" file...

// TODO: ORDER THE stuff further -- separate the "classTemplate" functions from other ones (those that are made as object generators, that is...)
function UniversalMap(notfound, treatUniversal = false) {
	return classTemplate(
		{ notfound, treatUniversal },
		function (
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
				// TODO: provide the InfiniteMap with this thing too -- there will [too] be a thing -- it will only alow first 2 **
				toObject() {
					const a = {}
					for (let i = 0; i < this.keys.length; i++)
						a[
							(!["symbol", "number"].includes(this.keys[i])
								? JSON.stringify
								: id)(this.keys[i])
						] = this.values[i]
					return a
				}
			}
		}
	)
}

// TODO: replace all the ambigious templates (where neither 'class' nor 'function' do) with this thing without the argument;
// ! Alright... Breaking it all now; No code that has relied on it works anymore. All of it - fix.
function template(
	defobj,
	finObj,
	label = "templated",
	templatelable = "template"
) {
	return { [templatelable]: { ...defobj }, [label]: finObj }
}

// TODO: work with the idea! Create nestedTemplate and so on...
// * Create the Universal and infinite versions for this...
// * Same todo stands for the infinite and universal versions...
function classTemplate(defaultobject, classObj) {
	return template(defaultobject, classObj, "classtemplate", "class")
}

function functionTemplate(defObj, functionObj) {
	return template(defObj, functionObj, "functiontemplate", "function")
}

// TODO: change this thing (recursiveIndexation and recusiveSetting): make 'fields' a far more complex and powerful argument -- let it be capable of taking the form [a:string,b:string,c:number, ...] with different (and different number of them too!) a,b and c, which would virtiually mean obj[a][b]...(c-2 more times here)[a][b], then proceeding as follows;
// * This would allow for a more powerful use of the function generally and lesser memory-time consumption (also, add support for InfiniteCounters...; as everywhere else around this and other librarries)
// * May be very useful in parsing of nested things. Used it once for an algorithm to traverse an arbitrary binary sequence...
// TODO: extend this thing (add more stuff to it, create powerful extensions)
function recursiveIndexation({ object, fields }) {
	let res = object
	for (const f of fields) res = res[f]
	return res
}

function recursiveSetting({ object, fields, value }) {
	return (recursiveIndexation({
		object: object,
		fields: fields.slice(0, fields.length - 1)
	})[fields[fields.length - 1]] = value)
}

function objInverse(notfound, treatUniversal = false) {
	return functionTemplate(
		{ notfound, treatUniversal },
		function (obj, treatUniversal = this.treatUniversal) {
			return ((a) =>
				((universal) => a(universal.values, universal.keys))(
					a(obj, treatUniversal)
				))(UniversalMap(this.notfound))
		}
	)
}

// TODO: for all these things pray do add the infinite counterpart as well [still strong does it stay -- for EACH AND EVERY thing to be an infinite counterpart]...

function obj(keys, values) {
	let length = min([keys.length, values.length])
	const returned = {}
	for (let i = 0; i < length; i++) returned[keys[i]] = values[i]
	return returned
}

function objMap(obj, keys, id = true) {
	const newobj = {}
	for (const key in keys) newobj[keys[key]] = obj[key]
	if (id)
		for (const key in obj)
			if (!Object.values(keys).has(key)) newobj[key] = obj[key]
	return newobj
}

function objArr(obj) {
	return [Object.keys(obj), Object.values(obj)]
}

function objSwap(obj1, obj2) {
	;((obj1Copy, obj2Copy) => {	
		objClear(obj1, obj1Copy)	
		objClear(obj2, obj2Copy)
		objInherit(obj1, obj2Copy)
		objInherit(obj2, obj1Copy)
	})(...arguments.map(flatCopy))
}

function objClear(obj, objCopy = flatCopy(obj)) {
	for (const dp in objCopy) delete obj[dp]
}

function objInherit(obj, parObj) {
	for (const ap in parObj) obj[ap] = parObj[ap]
}

function propSwap(obj, prop1, prop2) {
	const temp = obj[prop1]
	obj[prop1] = obj[prop2]
	obj[prop2] = temp
}

// * The 'recognizedl' and 'recognizedv' arguments are supposed to be template arguments; they are for the user to have the ability to make the Pointer objects recognizable...
// ^ IDEA: Change some of self's APIs to allow for the work with various user-defined Pointer(s), which would also fix the problems with the API not being general enough...I
// ? document; like everything else...
// TODO: make a template out of that thing...
function Pointer(value, recognizedl, recognizedv) {
	return {
		value: value,
		[recognizedl]: recognizedv
	}
}

// TODO: create a function like (a: [key, value][]) => a.map(([key, value]) => [key, objInverse(value).toObject()]);
// * Would come in handy in one of one's projects...

// TODO: generalize further (f, obj, depth) => ... [would with depth 'depth', map 'f' to keys/values of an object...]

// * Exports (constants are being exported separately).

// ? decide formatting?
export { globalPrecision }

export { defaultTable, defaultAlphabet, infinite }

export {
	exp,
	repeatedArithmetic,
	sameOperator,
	mostPopularElem,
	mostPopularNum,
	repeatedApplicationWhile,
	bind,
	last
}

export {
	Statistics,
	Surface,
	Expression,
	Tests,
	Vector,
	NumberVector,
	NumberMatrix,
	RectNumberMatrix,
	SquareNumberMatrix,
	Ratio,
	Algorithms,
	Equation,
	VarMapping,
	IterableSet
}

export {
	ensureProperty,
	Matrix,
	nestedVector,
	nonArrElems,
	totalElems,
	op,
	repeatedOperation,
	fullExp,
	repeatExp,
	average,
	min,
	max,
	median,
	mostPopular,
	leastPopular,
	range,
	sort,
	generate,
	find,
	readable,
	permutations,
	whileFunctional,
	factorOut,
	isPrime,
	primesBefore,
	nbase,
	nbasereverse,
	strMap,
	baseconvert,
	truncate,
	multiples,
	multiplesBefore,
	leastCommonMultiple,
	commonMultiples,
	leastCommonDivisor,
	commonDivisors,
	deviations,
	dispersion,
	standardDeviation,
	standardError,
	degreeOfFreedom,
	expectedValue,
	floor,
	randomArray,
	isPerfect,
	allFactors,
	factorial,
	realAddition,
	setPrecision,
	arrayEquality,
	dim,
	binomial,
	replaceStr,
	replaceStrInd,
	replaceStrIndMany,
	replaceStrMany,
	replaceArr,
	arrThisApply,
	arrApply,
	countAppearences,
	indexOfMult,
	clearRepetitions,
	splitArr,
	gutInnerArrs,
	gutInnerArrsRecursive,
	hasArrays,
	arrEncircle,
	arrStructureCopy,
	arrIntersections,
	repeatedApplication,
	repeatedApplicationIndex,
	repeatedApplicationWhilst,
	_multmap,
	multmap,
	UniversalMap,
	template,
	classTemplate,
	functionTemplate,
	recursiveIndexation,
	recursiveSetting,
	objInverse,
	obj,
	objMap,
	objArr,
	objSwap,
	objClear,
	objInherit,
	propSwap, 
	Pointer
}
