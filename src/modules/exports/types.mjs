// * The most essential part of the library - the types definitions;

import * as aliases from "./aliases.mjs"
import * as variables from "./variables.mjs"
import * as comparisons from "./comparisons.mjs"
import * as counters from "./counters.mjs"
import * as algorithms from "./algorithms.mjs"
import * as native from "./native.mjs"

import { general, classes } from "../refactor.mjs"
import { CLASS, TEMPLATE, EXTENSION, DEOBJECT } from "../macros.mjs"
import { StaticThisTransform } from "../refactor.mjs"

// TODO [general]: create a proper '.copy' method for each and every class...

export const InfiniteCounter = (() => {
	const sh1 = (_this, leftovers) =>
		ensureProperties(leftovers, {
			comparison: _this.this.class.template.comparison,
			range: _this.this.class.template.range,
			unfound: _this.this.class.template.unfound
		})
	// * Note: a minor 'trick' about the entire thing is that the value that is assigned to 'template.unacceptable' is thrown out of the function's value scopes [because that is the value from which it starts to count]; However, there are several ways of going around it. One is also replacing the value for the 'template.initialcheck';
	return CLASS({
		defaults: {
			comparison: comparisons.valueCompare,
			unfound: null,
			unacceptable: undefined,
			initialcheck: comparisons.refCompare
		},
		properties: {
			value: function (previous = this.template.unacceptable) {
				return this.template.initialcheck(previous, this.template.unacceptable)
					? this.template.generator()
					: previous
			}
		},
		transform: StaticThisTransform,
		static: {
			direction(ic) {
				return ic.compare(this.this.class())
			},
			// TODO: do the thing with the first n 'conditional' arguments - that being, if length of passed args array is 'n<k', where 'k' is maximum length, then the first 'k-n' recieve prescribed default values
			// * Pray make it work generally, put all the methods into this one form;
			// TODO [general]: ensure the use of 'leftover' argument objects across the library...
			whileloop(
				end,
				each,
				start = this.this.class(),
				iter = (x) => x.next(),
				comparison = (x, y) => x.compare(y),
				init = undefined
			) {
				let curr = deepCopy(start)
				let r = init
				while (comparison(curr, end)) {
					r = each(curr, r)
					curr = iter(curr)
				}
				return curr
			},
			// ! Pray think a little more on the details of implementation of this static method [namely, the "generator"'s definition]...;
			reverse() {
				const _this = this
				return InfiniteCounter({
					generator(x) {
						if (x === undefined) return _this.this.template.generator()
						return _this.this.template.inverse(x)
					},
					inverse: this.this.template.generator(x),
					range: this.this.template.range
				})
			}
		},
		methods: {
			next: function () {
				// * An observation: this is one of the ways to be able to reference a function from within itself...
				return this.this.this.class.class(
					this.this.class.template.generator(this.this.this.value)
				)
			},
			previous: function () {
				return this.this.this.class.class(
					this.this.class.template.inverse(this.this.this.value)
				)
			},
			direction() {
				return this.this.this.this.class.static.direction(this)
			},
			/**
			 *
			 * * DEFINE:
			 *
			 *		length(x, a) := number of iterations of 'generator' required to get to 'a' from 'x';
			 *
			 * Positive - of generator;
			 * Negative - of inverse;
			 *
			 * Then, the boolean case ( return { true | false } ) function is equivalent to evaluating
			 *
			 *		length(this, a) >= 0;
			 *
			 * * 'null' means 'no strict following in appearance (no linear order) under chosen pair of generators';
			 *
			 * ! NOTE: this thing is pretty much useless... The new API DON'T WORK WITH JSDoc NOTATION VERY WELL... INSTEAD, RESERVE TO SIMPLE DESCRIPTIONS WHEN IT COMES DOWN TO WRITING THE DOCS...
			 * @return { any }
			 */
			compare(ic, leftovers = {}) {
				sh1(this, leftovers)
				// TODO: Pray think deeply and create a sequence of similar todo-s regarding use of counters in relation to presence/lack of InfiniteCounter-wrapper and other such similar objects...

				// ? Mayhaps, one ought to generalize this to a function, to allow exceptions? [And only as a default - return that thing???]
				if (!leftovers.range(ic.value)) return leftovers.unfound

				let pointerfor = ic
				let pointerback = ic

				// TODO: again, do the same thing - get rid of the 'InfiniteCounter' wrapper's influence on the workflow of the methods that use it... (this time with 'comparison(x.value, t.value)')
				// TODO [general]: Do the above thing [InfiniteCounter wrapper influence removal] generally...

				// TODO: generalize this loop thing...
				while (
					!leftovers.comparison(pointerfor.value, this.this.this.value) &&
					!leftovers.comparison(pointerback.value, this.this.this.value)
				) {
					pointerfor = pointerfor.next()
					pointerback = pointerback.previous()
				}

				return leftovers.comparison(pointerfor.value, this.this.this.value)
			},
			difference(ic, leftovers = {}) {
				sh1(this, leftovers)
				let current = this.this.class.class()
				const next = aliases.property(
					ic.compare(this.this.this, leftovers) ? "previous" : "next"
				)
				// TODO: Work on all the 'functions' and 'default args' stuff... Review the previously made todos, notes, do it...
				this.this.class.static.whileloop(
					deepCopy(this.this.this),
					ic,
					() => (current = next(current)()),
					next,
					leftovers.comparison
				)
				return current
			},
			jumpDirection(ic, leftovers = {}) {
				sh1(this, leftovers)
				const d = this.this.class.static.direction(ic)
				// ? Question: should one ever return 'this' like that??? Or should one instead do {...this} (or just 'copy(this)', or some other copying-function?);
				// TODO [general] : pray consider this and other such small (a) detail(s) over any manner of a 'return' statement of any piece of code ;
				return d
					? this.this.this.jumpForward(ic, leftovers)
					: d === null
					? this
					: this.this.this.jumpBackward(ic, leftovers)
			},
			jump(x, jumping = (k) => k.next(), leftovers = {}) {
				ensureProperties(leftovers, {
					range: this.this.class.template.range,
					counterclass: this.this.class
				})
				if (!leftovers.range(x.value)) return this
				returnthis.this.class.static.whileloop(
					x,
					jumping,
					InfiniteCounter(leftovers.counterclass)(),
					jumping,
					undefined,
					deepCopy(this.this.this)
				)
			},
			loop(body = () => {}, start = this.this.class.class()) {
				return this.this.this.class.static.whileloop(
					this.this.this,
					body,
					start,
					undefined,
					undefined,
					undefined
				)
			},
			// ? QUESTION [general]: should one make it as 'this.this.class', or 'this.this.this.this.class'? In the former of the cases, the '.class' doesn't change with the 'this.this.this', whereas in the latter it does...
			jumpForward(x, leftovers = {}) {
				sh1(this, leftovers)
				return this.jump(x, (a) => a.next(), leftovers)
			},
			jumpBackward(x, leftovers = {}) {
				sh1(this, leftovers)
				return this.jump(x, (k) => k.previous(), leftovers)
			},
			map(icClass = this.class, leftovers = {}) {
				sh1(this, leftovers)
				let current = this.this.class.class()
				let alterCurrent = icClass.class()
				while (!leftovers.comparison(current, this))
					alterCurrent = alterCurrent.next()
				return alterCurrent
			},
			// ! Rewrite and simplify using the 'static.reverse()';
			reverse() {
				const zero = this.this.class.class()
				// ? Maybe, add a local version of 'this.direction', defined as that thing for an InfiniteCounter 'this'?
				const dirfunc = (
					(p) => (x) =>
						x[p]
				)(this.this.class.static.direction(this) ? "previous" : "next")
				let a = this.this.class.class()
				let copy = deepCopy(this)
				while (!this.this.class.template.comparison(zero, copy)) {
					copy = copy.previous()
					a = dirfunc(a)
				}
				return a
			},
			// ? Generalize for the 'refactor.classes'? [Say, using the 'this.this.this.this.class.properties' property? But that has to assume that 'inter: cdieach' has been used...];
			copy() {
				return this.this.this.this.class.class(this.this.this.value)
			},
			equal(x) {
				return this.compare(x) && x.compare(this)
			}
		},
		recursive: true
	})
})()

// TODO: Current list of methods to add to GeneralArray:
// % 	1. split(separator); - GeneralArray of GeneralArrays; [here - separator is an arbitrary object]
// % 	2. splice(index, times); Same as Array.splice();
// % 	3. spliceMult(indexes, ntimes); repeated spliceMult [both args are arrays...];
// % 	4. splitlen(length); split the array onto subarrays of given length 'length'; If not possible to factor in such a way as to have them all being precisely 'length', then the last one is made shorter...;
// ? Question: about the 'move' methods... Should all the other datatypes implement the interfaces for their versions?
// * Current decision [not full]: undeteremined, in later versions one may add them; Presently - not, nor will the '.move' methods will ever be deleted;
export const GeneralArray = (() => {
	// * Shortcuts [for refactoring...];
	const sh1 = (_this, leftovers) =>
		ensureProperties(leftovers, {
			fast: false,
			range: _this.this.this.this.class.template.icclass.template.range,
			comparison: _this.this.this.this.class.template.icclass.template.comparison
		})
	const sh1static = (_this, leftovers) =>
		ensureProperties(leftovers, {
			fast: false,
			range: _this.this.template.icclass.template.range,
			comparison: _this.this.template.icclass.template.comparison
		})

	return CLASS({
		defaults: {
			empty: [],
			unfound: undefined,
			treatfinite: false,
			default: aliases._const(undefined)
		},
		properties: {
			array: function (array = this.template.empty) {
				return this.template.treatfinite ? this.static.fromArray(array) : array
			},
			currindex: function (_arr, startindex = this.template.icclass.class()) {
				return startindex
			}
		},
		// ? Should this also become a part of the new CLASS definition? [a default, for instance?]
		transform: StaticThisTransform,
		static: (() => {
			const R = {
				empty(template = this.this.template) {
					return this.this.class(template).class()
				},
				// TODO: look through the GeneralArray code looking for places this thing might get used handily... (Just like in the '.appendfront()' case...);
				fromArray(arr, leftovers = {}) {
					sh1static(this, leftovers)
					const generalized = this.empty()
					for (const a of arr) generalized.pushback(a, leftovers)
					return generalized
				},
				fromCounter(counter, leftovers = {}) {
					sh1static(this, leftovers)
					const narr = this.empty()
					counter.loop(() =>
						narr.pushback(this.this.this.class.template.default())
					)
					return narr
				}
			}
			for (const x of ["back", "front"]) {
				R[`push${x}Loop`] = TEMPLATE({
					defaults: {
						arguments: [],
						transform: id
					},
					function: function (b) {
						// ? Perhaps, provide just 'b' in its stead? Pray consider...
						// * The advantages of this thing is that it allows for a far more beautiful, convinient and native-JS-compatible syntax along with shorter identity names...;
						// * The advantages of the alternative approach is the total number of arguments and the greater structural elegance...;
						return this.template.target[`push${x}Loop`](
							this.template.transform(
								b.object().currelem().get(),
								b.object().currindex,
								b.object(),
								b
							),
							...this.template.arguments
						)
					}
				})
			}
			return R
		})(),
		methods: (() => {
			const X = {
				currelem() {
					return {
						get: () =>
							this.this.this.this.class.template.elem(this.this.this),
						set: (newval) =>
							this.this.this.this.class.template.newvalue(
								this.this.this,
								newval
							)
					}
				},
				// * For loops; Allows to loop over an array, with a changing index; Usage examples may be found across the default GeneralArray methods definitions:
				// * pray notice, that '.full()' changes the 'this.object.currindex' by default, whilst
				loop(template = {}) {
					const a = {
						template: {
							indexiter: (x) => x.object().next(),
							end: (x) => x.object().this.class.template.isEnd(x.object()),
							begin: (x) => x.object().begin(),
							icclass: this.this.class.template.icclass,
							after: ID,
							...template
						},
						object: _const(this),
						restart: function () {
							this.counter = this.template.icclass.class()
						},
						yield: function (
							_indexiter = this.template.indexiter,
							end = this.template.end,
							iter = true
						) {
							if (iter) _indexiter(this)
							const isend = end(this)
							if (!isend && iter) this.counter = this.counter.next()
							return isend
						},
						_full(
							each,
							iter = _const(this.template.indexiter),
							end = _const(this.template.end),
							begin = this.template.begin,
							after = this.template.after
						) {
							const index = this.object().this.this.currindex
							begin(this)
							let r = undefined
							let is = this.yield(_const(null), end(), false)
							while (!is) {
								r = each(this, r)
								is = this.yield(iter(), end())
								if (this.broke) break
							}
							this.restart()
							this.broke = false
							this.object().currindex = index
							after(this)
							return r
						},
						// * The difference between '.full()' and '._full()' is that the former is based on latter and allows for 'break' and 'continue'...
						// TODO: generalize to a function for a truly general loop (the 'while', that'd use this system for the 'separation' of an iteration into a GeneralArray of functions suceptible to inner 'this.break()' or 'this.continue()' calls...)
						full(
							each = this.template.each,
							iter = _const(this.template.indexiter),
							end = _const(this.template.end),
							begin = this.template.begin,
							after = this.template.after
						) {
							const index = this.object().currindex
							begin(this)
							let r = undefined
							let is = this.yield(null, end(), false)
							while (!is) {
								const x = each(this)
								let goOn = true
								r = x.loop()._full((t) => {
									if (goOn) {
										if (this.broke || this.continued) {
											goOn = false
											return
										}
										return t.object().currelem().get()(t)
									}
								})
								is = this.yield(iter(), end())
								if (this.broke) break
								goOn = true
								this.continued = false
							}
							this.restart()
							this.broke = false
							this.object().currindex = index
							after(this)
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
				begin: classes.begin,
				end: classes.end,
				init() {
					return this.this.this.this.class.template.icclass.class()
				},
				// * NOTE: the '.length()' is NOT the last '!isEnd'-kind-of index, but the one after it...
				finish: classes.finish,
				// * A far simpler (hence, less capable with performance of complex walking tasks), faster, direction independent alternative to '.move';
				go(
					index = this.init(),
					range = this.this.this.this.class.template.icclass.template.range
				) {
					if (!range(index.value))
						throw new RangeError(
							"Range error in the '.go' method 'index' argument whilst calling."
						)
					return (this.this.this.currindex = index)
				},
				move(
					index = this.init(),
					preface = aliases.VOID,
					comparison = this.this.this.this.class.template.icclass.template
						.comparison,
					each = (x) => x.next(),
					stop = (x) => comparison(x.length().get(), x.currindex)
				) {
					preface(arguments, this.this.this)
					while (
						!comparison(this.this.this.currindex, index) &&
						!stop(this.this.this)
					)
						each(this.this.this)
					return this.this.this.currindex
				},
				moveforward(index, leftovers = {}) {
					ensureProperties(leftovers, {
						begin: false,
						comparison:
							this.this.this.this.class.template.icclass.template
								.comparison,
						stop: (x) =>
							leftovers.comparison(x.length().get().next(), x.currindex)
					})
					return this.move(
						index,
						(args, x) => {
							if (leftovers.begin) x.currindex = x.init()
						},
						leftovers.comparison,
						(x) => x.next(),
						leftovers.stop
					)
				},
				movebackward(index, leftovers = {}) {
					ensureProperties(leftovers, {
						end: false,
						comparison:
							this.this.this.this.class.template.icclass.template
								.comparison,
						stop: (x) => leftovers.comparison(x.init(), x.currindex)
					})
					return this.move(
						index,
						(args, x) => {
							if (leftovers.end) x.currindex = x.length().get()
						},
						leftovers.comparison,
						(x) => x.previous(),
						leftovers.stop
					)
				},
				movedirection(index, leftovers = {}) {
					ensureProperty(
						leftovers,
						"comparison",
						this.this.this.this.class.template.icclass.template.comparison
					)
					return this.this.this.currindex.compare(index)
						? this.moveforward(index, {
								begin: false,
								comparison: leftovers.comparison,
								stop: (leftovers.stop =
									leftovers.stop ||
									((x) =>
										leftovers.comparison(
											x.currindex,
											x.length().get()
										)))
						  })
						: this.movebackward(index, {
								end: false,
								comparison: leftovers.comparison,
								stop: (leftovers.stop =
									leftovers.stop ||
									((x) => leftovers.comparison(x.currindex, x.init())))
						  })
				},
				jump(index, leftovers = {}) {
					sh1(this, leftovers)
					return (this.this.this.currindex =
						this.this.this.currindex.jumpDirection(
							index,
							leftovers.comparison,
							leftovers.range
						))
				},
				read(index = this.init(), leftovers = {}) {
					sh1(this, leftovers)
					return general.fix([this.this.this], ["currindex"], () => {
						if (leftovers.fast) this.go(index, leftovers.range)
						else this.moveforward(index, true, leftovers.comparison)
						return this.currelem().get()
					})
				},
				write(index, value, leftovers = {}) {
					sh1(this, leftovers)
					return general.fix([this.this.this], ["currindex"], () => {
						if (leftovers.fast) this.go(index, leftovers.range)
						else
							this.moveforward(index, {
								begin: true,
								...leftovers
							})
						return this.currelem().set(value)
					})
				},
				length() {
					return {
						get: () => {
							// ? Could this [the 'length.get()' method] not be rewritten by the means of the '.loop()' method??? Pray consider...
							// * Yes, indeed! Pray do...
							// TODO: refactor...
							const index = this.currindex
							this.begin()
							while (
								!this.this.this.this.class.template.isEnd(this.object())
							)
								this.next()
							const returned = this.currindex
							this.currindex = index
							return returned
						},
						set: (value, leftovers = {}) => {
							sh1(this, leftovers)
							if (!leftovers.range(value.value))
								throw new RangeError(
									"Index range error for array length setting"
								)

							if (leftovers.comparison(this.object().length().get(), value))
								return

							return this.length()
								.get()
								.compare(value, undefined, _const(true))
								? this.deleteMult(
										this.init(),
										this.length()
											.get()
											.jumpDirection(
												this.length().get().difference(value)
											)
								  )
								: this.concat(
										this.this.this.class.static.fromCounter(
											this.length().get().difference(value)
										)
								  )
						}
					}
				},
				copied(
					method,
					_arguments = [],
					f = id,
					template = this.this.this.this.class.template,
					isclass = false,
					leftovers = {}
				) {
					sh1(this, leftovers)
					const c = this.copy(f, template, isclass, leftovers)
					if (c.hasOwnProperty(method) && typeof c[method] === "function")
						c[method](..._arguments)
					return c
				},
				pushback(value, leftovers = {}) {
					sh1(this, leftovers)
					return this.write(this.length().get(), value, leftovers)
				},
				pushfront(x, leftovers = {}) {
					sh1(this, leftovers)
					this.this.this = this.this.this.this.class.static
						.fromArray([x], leftovers)
						.concat(this, leftovers)
					return this
				},
				concat(array = this.empty(), leftovers = {}) {
					sh1(this, leftovers)
					return array.loop()._full(
						this.pushbackLoop({
							arguments: [leftovers]
						}).function
					)
				},
				multcall: classes.multcall,
				empty(template = this.this.this.this.class.template) {
					return this.this.this.this.class.static.empty(template)
				},
				copy(
					f = ID,
					isclass = false,
					template = isclass
						? this.this.this.this.class
						: this.this.this.this.class.template,
					leftovers = {}
				) {
					sh1(this, leftovers)
					const copied = this.empty()
					copied.class = isclass
						? template
						: { ...copied.class, template: { ...template } }
					this.loop()._full(
						copied.pushbackLoop({
							transform: f,
							arguments: [leftovers]
						}).function
					)
					return copied
				},
				delval(value, leftovers = {}) {
					const x = this.this.this.firstIndex(value, leftovers)
					if (!(x === this.this.this.template.unfound))
						return this.delete(x, leftovers)
					return this
				},
				slice(begin = this.init(), end = this.finish(), leftovers = {}) {
					sh1(this, leftovers)
					if (!leftovers.range(end.value))
						throw new RangeError(
							"Bad range in the 'end' argument passed to the 'GeneralArray.slice()' function call!"
						)

					// TODO: generalize [add the corresponding argument to the methods and employ it] the uses of the 'this.this.this.empty'... in accordance with the newly created implementation...
					const sliced = this.empty()
					this.loop()._full(
						sliced.pushbackLoop({
							arguments: [leftovers]
						}).function,
						undefined,
						_const((t) => end.compare(t.object().currindex)),
						(t) => {
							t.object().begin()
							t.object().go(begin, leftovers.range)
						}
					)
					return (this.this.this = sliced)
				},
				*keys() {
					for (
						let c = this.init();
						!c.compare(this.length().get());
						c = c.next()
					)
						yield c
				},
				*[Symbol.iterator](leftovers = {}) {
					sh1(this, leftovers)
					for (
						let c = this.init();
						!c.compare(this.length().get());
						c = c.next()
					)
						yield this.read(c, leftovers)
				},
				// ? refactor using the other GeneralArray methods;
				// * Do it using '.project() + InfiniteCounter.difference() + repeat()...';
				// Sketch: 'this.this.this.projectComplete(index, this.this.this.static.fromArray([value]).repeat(this.this.this.length().get().difference(index)))'
				fillfrom(index, value, leftovers = {}) {
					sh1(this, leftovers)
					const indexsaved = this.this.this.currindex
					this.go(index, leftovers.range)
					while (
						!leftovers.comparison(this.this.this.currindex, this.finish())
					) {
						this.currelem().set(value)
						this.next()
					}
					this.this.this.currindex = indexsaved
					// * It must always return 'this', not 'this.this.this';
					return this
				},
				convert(template = this.this.this.this.class.template, leftovers = {}) {
					return (this.this.this = this.copy(ID, false, template, leftovers))
				},
				// * NOTE: the difference between this thing and the '.convert' is the fact that '.switchclass' is capable of preserving "reference-connections" of different objects to the same one object class's instance;
				switchclass(arrclass = this.this.this.this.class, leftovers = {}) {
					return (this.this.this = this.copy(ID, true, arrclass, leftovers))
				},
				swap(i, j) {
					const ival = this.read(i)
					this.write(i, this.read(j))
					this.write(j, ival)
					return this
				},
				delete(index = this.finish(), leftovers = {}) {
					sh1(this, leftovers)
					return this.deleteMult(index, index, leftovers)
				},
				deleteMult(startindex, endindex = startindex, leftovers = {}) {
					sh1(this, leftovers)
					const x = this.copied(
						"slice",
						[endindex.next()],
						undefined,
						leftovers
					)
					return this.slice(
						this.init(),
						startindex.previous(),
						leftovers
					).concat(x)
				},
				projectComplete(array, index, leftovers = {}) {
					sh1(this, leftovers)
					const _index = this.this.this.currindex
					array.loop()._full(
						(t) => {
							// TODO: refactor this as well - some '.currwriteLoop(value, fast, range, comparison)', or something...
							this.write(
								this.this.this.currindex,
								t.object().currelem().get(),
								leftovers
							)
						},
						_const((x) => {
							x.object().next()
							this.next()
						}),
						undefined,
						(x) => {
							x.object().begin()
							this.go(index, leftovers.range)
						},
						(_x) => {
							// ! Problem : generally , one might want to implement a sort of a multi-array loop function [so that the 'index' could be changed and then restored for multiple of them...]...
							// * Problem with this is this '.loop' is attached to one array and one don't seem to want to generalize it much further than that...
							// ? Where to stick it? Should it be a '.static'? Or ought one take it out of the GeneralArray completely???
							this.this.this.currindex = _index
						}
					)
				},
				projectFit(array, index, leftovers = {}) {
					sh1(this, leftovers)
					general.fix([array], ["currindex"], () => {
						this.loop()._full(
							(t) => {
								t.object().write(
									t.object().currindex,
									array.currelem().get(),
									leftovers
								)
								array.next()
							},
							undefined,
							(x) =>
								x.object().this.class.template.isEnd(x.object()) ||
								array.this.class.template.isEnd(array),
							(t) => t.object().go(index, leftovers.range)
						)
					})
					return this
				},
				insert(index, value, leftovers = {}) {
					sh1(this, leftovers)
					const x = this.copied(
						"slice",
						[undefined, index.previous()],
						undefined,
						leftovers
					)
					x.pushback(value, leftovers)
					x.concat(this.copied("slice", [index], undefined, leftovers))
					this.this.this = x
					return this
				},
				index(i = this.init(), leftovers = {}) {
					sh1(this, leftovers)
					return this.read(i, leftovers)
				},
				indexesOf(x, halt = false, haltAfter = Infinity, leftovers = {}) {
					sh1(this, leftovers)
					// ! ISSUE - with 'THIS'-passing: it must be passed via 'this.this', and also with 'A = {[classref]: {...}, this: {this: A, ...}}' more generally; This way, one won't have to worry about the contexting...;
					return algorithms.array
						.indexesOf({ leftovers, halt: halt, haltAfter: haltAfter })
						.function(this, x)
				},
				firstIndex(x, leftovers = {}) {
					sh1(this, leftovers)
					return algorithms.search.linear(leftovers).function(this, x)
				},
				shiftForward(times, leftovers = {}) {
					sh1(this, leftovers)
					const x = this.this.this.this.class.static.fromCounter(times)
					this.this.this = x.concat(this.this.this, leftovers)
					return this
				},
				// TODO [general]: do proper work on the functions' defaults;
				shiftBackward(times = this.init(), leftovers = {}) {
					sh1(this, leftovers)
					return this.slice(
						times.map(this.this.this.this.template.class.template.icclass),
						undefined,
						leftovers
					)
				},
				repeat(
					times = this.init(),
					icclass = this.this.this.this.class.template.icclass,
					leftovers = {}
				) {
					// TODO: ration the usage of these throughout the code - namely, get rid of all the places that they aren't necessary...
					sh1(this, leftovers)
					const newarr = this.empty()
					icclass.static.whileloop(icclass.class(), times, () =>
						newarr.concat(this, leftovers)
					)
					return newarr
				},
				reverse(leftovers = {}) {
					const reversedArr = this.empty()
					this.loop()._full(
						reversedArr.pushfrontLoop({
							arguments: [leftovers]
						}).function
					)
					this.this.this = reversedArr
					return this
				},
				map(
					f = id,
					template = this.this.this.this.class.template,
					isclass = false,
					leftovers = {}
				) {
					sh1(this, leftovers)
					this.this.this = this.copy(f, template, isclass, leftovers)
					return this
				},
				isEmpty(isend = this.this.this.this.class.template.isEnd) {
					return general.fix([this.this.this], ["currindex"], () => {
						this.begin()
						return isend(this)
					})
				},
				sort(predicate) {
					return (this.this.this = algorithms.Sort.merge({
						predicate: predicate
					}).function(this.this.this))
				},
				isSorted(predicate, leftovers = {}) {
					sh1(this, leftovers)
					return leftovers.comparison(
						this.this.this,
						this.copied("sort", [predicate], undefined, leftovers)
					)
				},
				includes: classes.includes,
				suchthat: classes.suchthat,
				any: classes.any,
				every: classes.every,
				forEach: classes.forEach,
				intersection: function (arr = this.empty(), leftovers = {}) {
					this.this.this = algorithms.array
						.intersection(leftovers)
						.function(this, arr)
					return this
				},
				permutations: function (leftovers = {}) {
					return algorithms.array.permutations({
						genarrclass: this.this.this.this.class,
						...leftovers
					})(this)
				},
				// For an array of arrays only;
				join: function (leftovers = {}) {
					this.this.this = algorithms.array.join(leftovers).function(this)
					return this
				},
				strjoin: function (separator = "", leftovers = {}) {
					return UnlimitedString(this.this.this.this.class)
						.function()
						.class(this.copy(aliases.str, undefined, undefined, leftovers))
						.join(separator)
				}
			}
			// ! Generalize this construction... [appears several times throughout the library; add to 'refactor'...];
			for (const x of ["next", "previous"])
				X[x] = function () {
					return (this.this.this.currindex = this.this.this.currindex[x]())
				}
			for (const x of ["front", "back"])
				X[x] = function (template = {}) {
					const origin =
						this.this.this.this.class.static[`push${x}Loop`](template)
					const T = {
						template: {
							target: this,
							...origin.template
						}
					}
					T.function = origin.function.bind(T)
					return T
				}
			return X
		})(),
		recursive: true
	})
})()

// ? Was... that such a good idea to implement this here after all? [Meaning - will one go through with it?]
// * If the answer is to be affirmative, pray convert to a CLASS;
export function MultiInfiniteCounter(template = {}) {
	// ? Question: does one really want just a SINGLE ONE comparison? One does have multiple generators...
	// * Perhaps, one would have multiple comparisons assigned to each and every one index of the array in question? [But, that'd require using the same manner of array-templates for them...]
	// ! Pray think and decide...
	return {
		template: {
			comparison: valueCompre,
			...template
		},
		class: function (previous, index, generators = this.template.generators) {
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
					if (!ranges.read(index)(x.value)) return this
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
}

// ? What about the submodules of modules? [shall they stay as-is?];
export const arrays = {
	// TODO [general]: polish [look for small issues and solve them] and tidy [make the thing as of itself look more liked by oneself]...
	LastIndexArray(template = {}) {
		const A = {
			template: {
				icclass: InfiniteCounter(counters.numberCounter()),
				maxarrlen: constants.MAX_ARRAY_LENGTH,
				filling: null,
				...template,
				bound: function (i) {
					return i < this.template.maxarrlen - 1
				},
				...template
			}
		}

		A.class = GeneralArray({
			this: A,
			elem: function (
				arrobj,
				array = arrobj.array,
				pointer = false,
				beginningobj = array.init(),
				beginningind = 0
			) {
				let currarr = array
				let ic = beginningobj
				let isReturn = [false, undefined]
				let index = beginningind
				for (
					;
					!arrobj.this.class.template.icclass.template.comparison(
						ic,
						arrobj.currindex
					);
					ic = ic.next()
				) {
					const withinbounds = this.this.template.bound(index)

					if (!(index in currarr)) {
						isReturn[0] = true
						if (withinbounds) isReturn[1] = null
						break
					}

					if (withinbounds) {
						index++
						continue
					}

					currarr = currarr[index]
					index = 0
				}
				const returned = arrobj.currindex
				return isReturn[0]
					? pointer
						? [isReturn[1], currarr, index, returned]
						: undefined
					: !pointer
					? currarr[index]
					: [currarr, index]
			},
			newvalue: function (array, value) {
				let pointer = this.elem(array, undefined, true)
				while (!pointer[0]) {
					pointer[1][pointer[2]] = (
						pointer[0] === undefined ? (x) => [x] : aliases.id
					)(this.this.template.filling)
					pointer = this.elem(array, pointer[1], true, pointer[3], pointer[2])
				}
				return (pointer[0][pointer[1]] = value)
			},
			isEnd: function (array) {
				return !!this.elem(array, undefined, true)[0]
			},
			icclass: A.template.icclass
		})

		return A
	},
	// * This is the 'arr.length > MAXLENGTH -> arr = [arr] ELSE arr.push([recursively, until hitting the 'min-depth']) THEN arr.push(newvalue)'-kind of an array [the one that is very resourceful and with slowly growin layers...]
	// ! finish
	// ? Just how complex does one want this to be, pray?
	DeepArray(template = {}) {
		// TODO: provide the template;
		return {
			template: {
				icclass: InfiniteCounter(counters.numberCounter())
			},
			class: GeneralArray({
				newvalue: function (array, value) {},
				elem(array) {},
				icclass: this.template.icclass
			})
		}
	},
	// ! ANOTHER SUCH CASE - how does one want to generalize the usage of 'template' outside the '.template' field?
	// * More thought regarding the generalization procedures of the library is required...
	CommonArray(template = {}) {
		return {
			template: { offset: -1, ...template },
			class: GeneralArray({
				newvalue: function (arr, value) {
					return (arr.array[arr.currindex] = value)
				},
				elem: function (arr) {
					return arr.array[arr.currindex]
				},
				isEnd: function (arr) {
					return arr.array.length <= arr.currindex
				},
				icclass: InfiniteCounter(
					addnumber({
						start: this.template.offset
					})
				),
				...template
			})
		}
	}
}

export function UnlimitedMap(parentclass) {
	const sh1 = (key, _this, f, args = [], name = "keys") => {
		const ind = _this.this.this[name].firstIndex(key)
		if (ind === _this.this.this[name].class.template.unfound)
			return _this.this.this.this.class.template.unfound
		return f(ind, ...args)
	}
	return EXTENSION({
		defaults: {
			names: ["keys", "values"],
			parentclass: parentclass,
			defaults: {
				constructor: number.native.generate(2).map(
					aliases._const(function () {
						return this.template.empty
					})
				),
				inter: aliases.cdieach
			},
			unfound: undefined
		},
		methods: {
			read(key) {
				return sh1(key, this, this.this.this.values.read)
			},
			write(key, value) {
				sh1(key, this, this.this.this.values.write, [value])
				return this
			},
			deleteKey(key) {
				sh1(key, this, this.this.this.values.delete)
				sh1(key, this, this.this.this.keys.delete)
				return this
			},
			deleteValues(values) {
				for (const v of values) {
					const inds = this.this.this.values.indexesOf(v)
					this.this.this.keys.multcall("delete", inds)
					this.this.this.keys.multcall("delete", inds)
				}
				return this
			},
			suchthat(predicates) {
				this.this.this.keys.suchthat(predicates[0])
				this.this.this.values.suchthat(predicates[1])
				return this
			},
			copy(
				f = ID,
				isclass = false,
				template = isclass
					? this.this.this.this.class
					: this.this.this.this.class.template,
				leftovers = {}
			) {
				return this.this.this.this.class.class(
					this.this.this.keys.copy(f, isclass, template, leftovers),
					this.this.this.values.copy(f, isclass, template, leftovers)
				)
			},
			// ! Problem discovered - the almost-exactly-the-same-but-not-quite kinds of methods methods of distinct classes have to be homogenized and quickly;
			copied(
				method,
				_arguments = [],
				f = id,
				template = undefined,
				isclass = false,
				leftovers = {}
			) {
				const c = this.copy(f, template, isclass, leftovers)
				if (c.hasOwnProperty(method) && typeof c[method] === "function")
					c[method](..._arguments)
				return c
			},
			map(
				f = ID,
				isclass = false,
				template = isclass
					? this.this.this.this.class
					: this.this.this.this.class.template,

				leftovers = {}
			) {
				this.this.this = this.copy(f, isclass, template, leftovers)
				return this
			},
			deleteKeys(keys) {
				for (const k of keys) {
					const inds = this.this.this.keys.indexesOf(k)
					this.this.this.values.multcall("delete", inds)
					this.this.this.keys.multcall("delete", inds)
				}
				return this
			},
			multcall: classes.multcall
			// ? Adding any more?
		},
		static: {
			fromObject(object = {}, finite = false) {
				return this.this.class(
					...DEOBJECT(object).map(
						finite ? this.this.template.parentclass.static.fromArray : ID
					)
				)
			}
		},
		transform: StaticThisTransform,
		recursive: true,
		// ! Consider the precise list;
		toextend: []
	})
}

// * Currently missing:
// 	% 1. join();
// 	% 2. length().set();
export function UnlimitedString(parent = arrays.LastIndexArray) {
	// TODO: refactor the cases like such - when there is EXACTLY the same function used in two or more places, but the difference is in the '.'-spaces;
	const ALIAS = (_this) =>
		aliases.native.number.fromNumber({
			icclass: _this.this.this.this.class.template.parentclass.template.icclass,
			start: -1
		}).function
	return EXTENSION({
		defaults: {
			parentclass: parent,
			empty: "",
			names: ["genarr"],
			unfound: undefined
		},
		properties: {
			currindex: aliases._const(0)
		},
		methods: {
			split(useparator = "") {
				const strarr = this.this.this.this.class.template.parentclass.class()
				if (aliases.is.str(useparator)) {
					let carryover = ""
					for (const str of this.this.this.genarr) {
						const postsplit = str.split(useparator)
						for (let i = 0; i < postsplit.length; i++) {
							if (i === 0) {
								general
									.lengthSafeConcat(carryover, postsplit[i])
									.map(strarr.pushback)
								continue
							}
							if (
								i === postsplit.length - 1 &&
								!this.this.this.this.class.template.parentclass.template.icclass.template.comparison(
									this.this.this.genarr.currindex,
									this.this.this.genarr.finish()
								)
							) {
								carryover = postsplit[i]
								continue
							}
							strarr.pushback(postsplit[i])
						}
					}
				}
				if (this.this.this.this.class.is(useparator)) {
					// ! This thing re-appears throughout the class twice! Pray refactor...
					let prevcounter = this.init()
					let currcounter = this.init()
					let backupcounter = this.init()
					let hasBroken = false
					const first = useparator.read(useparator.init())

					// ! Pray generalize and re-scope this thing later...
					const FUNC = function (strarr, prevcounter, currcounter) {
						return strarr.pushback(
							this.copied("slice", [prevcounter, currcounter])
						)
					}

					for (
						;
						!currcounter.length().get().compare(this.length().get());
						currcounter = currcounter.next()
					) {
						while (this.read(currcounter) !== first) continue
						backupcounter = backupcounter.next()
						while (
							!this.this.this.this.class.template.parentclass.template.icclass.template.comparison(
								backupcounter,
								useparator
									.tototalindex()
									.map(
										this.this.this.class.template.parentclass.template
											.icclass
									)
							)
						) {
							// ! ISSUE [general]: with the passed instances of recursive classes - decide which parts of them are to be passed, how they should be read, and so on...
							// * Current decision: by the 'this.this.this->.class' part... [the inner, that is...];
							if (
								this.read(currcounter.jumpForward(backupcounter)) !=
								useparator.read(
									backupcounter.map(
										useparator.this.class.template.parenclass.template
											.icclass
									)
								)
							) {
								hasBroken = true
								break
							}
							backupcounter = backupcounter.next()
						}

						if (!hasBroken) {
							FUNC.bind(this)(strarr, prevcounter, currcounter)
							prevcounter = native.deepCopy(currcounter)
						}
						hasBroken = false
						currcounter = currcounter.jumpForward(backupcounter)
						backupcounter = this.init()
						continue
					}

					// * The last one is also needed due to the fact that the 'end' is 'open' in the sense that there is no more separators after it (hence, it follows that the end may also be equal to "");
					FUNC.bind(this)(strarr, prevcounter, currcounter)
				}
				return strarr
			},
			// * Note: this transformation is the reverse of the thing that all the functions working with the data of the string must perform upon the indexes passed by the user...
			tototalindex(
				ind = this.this.this.genarr.currindex,
				subind = this.this.this.currindex
			) {
				const _ALIAS = ALIAS(this)
				let final = this.init()
				for (const x of this.this.this.genarr
					.copied("slice", [this.init(), ind.previous()])
					.keys())
					final = final.jumpForward(
						types
							.InfiniteCounter(
								counters.this.this.this.addnumber({
									start: -1
								})
							)(genarr.read(x).length)
							.map(final.class)
					)
				return final.jumpForward(_ALIAS(subind))
			},
			finish: classes.finish,
			go(
				index,
				range = this.this.this.this.class.template.parentclass.template.icclass
					.template.range
			) {
				if (!range(index.value))
					throw new RangeError(
						"Range error in the '.go' method 'index' argument whilst calling."
					)
				const nind = this.fromtotalindex(index)
				this.this.this.genarr.currindex = nind[0]
				this.this.this.currindex = nind[1]
				return this
			},
			fromtotalindex(index) {
				const _ALIAS = ALIAS(this)
				let present = this.init()
				let inarrind = this.init()
				index = index.map(present.class)
				let currstr = ""
				for (const x of this.genarr.copy((str) => _ALIAS(str.length))) {
					inarrind = inarrind.next()
					currstr = x
					present = present.jumpForward(x)
					if (present.compare(index)) break
				}
				return [
					inarrind,
					currstr.length -
						present.difference(index).map(
							types.InfiniteCounter(
								counters.addnumber({
									start: -1
								})
							)
						).value
				]
			},
			begin: classes.begin,
			end: classes.end,
			// TODO: generally - perform all the required '.map's! DO NOT ASSUME THAT THE THING PASSED IS THE INFINITECOUNTER OF THE CORRESPONDING CLASS, ONLY ASSUME IT IS ___A___ COUNTER...;
			// * This'll make InfiniteCounters (generally) EXTREMELY useful; All the inner information will be 'semi-hidden' (unneccessary to operate the thing), yet accessible (and hence, alterable, hence flexible) to the user;
			slice(beginning = this.init(), end = this.finish(), orderly = false) {
				const newstr = this.this.this.this.class.class()
				this.go(beginning)
				for (; !this.tototalindex().compare(end); this.next())
					newstr.pushback(this.currelem().get())
				this.this.this = (orderly ? (x) => x.order() : ID)(newstr)
				return this
			},
			read(index = this.init()) {
				return this.copied("symbolic", []).genarr.read(index)
			},
			write(index, value) {
				general.fix(
					[this.this.this.genarr, this.this.this],
					algorithms.number.native.generate(2).map(aliases._const("currindex")),
					() => {
						this.go(index, aliases._const(true))
						this.currelem().set(value)
					}
				)
				return this
			},
			concat(ustring) {
				if (aliases.is.str(ustring)) return this.pushback(ustring)
				this.this.this.genarr.concat(ustring.genarr)
				return this
			},
			currelem() {
				return {
					get: () => {
						return this.this.this.genarr.currelem().get()[
							this.this.this.currindex
						]
					},
					set: (char) => {
						return this.this.this.genarr
							.currelem()
							.set(
								aliases.native.string.sreplaceIndex(
									this.this.this.genarr.currelem().get(),
									this.this.this.currindex,
									char
								)
							)
					}
				}
			},
			next() {
				if (
					this.this.this.genarr.currelem().get().length >
					this.this.this.currindex
				)
					return this.this.this.genarr.currelem().get()[
						++this.this.this.currindex
					]
				this.this.this.genarr.next()
				return this.this.this.genarr.currelem().get()[
					(this.this.this.currindex = 0)
				]
			},
			previous() {
				if (this.this.this.currindex > 0)
					return this.this.this.genarr.currelem().get()[
						--this.this.this.currindex
					]
				this.this.this.genarr.previous()
				return this.this.this.genarr.currelem().get()[
					(this.this.this.currindex =
						this.this.this.genarr.currelem().get().length - 1)
				]
			},
			length() {
				return {
					get: () => {
						return this.tototalindex(
							this.this.this.genarr.length().get(),
							this.this.this.genarr.read(this.this.this.genarr.finish())
						)
					},
					set: (newlen) => {
						const _ALIAS = ALIAS(this)
						// ! THIS IS BROKEN! Pray fix the thing so that it could work in the following fashion...
						const __ALIAS = ALIAS(newlen.class)
						if (
							!this.this.this.this.class.template.parentclass.template.icclass.template.range(
								newlen.value
							)
						)
							throw new RangeError(
								"Index range error for array length setting"
							)

						// TODO: pray finish this thing...
						if (newlen.compare(this.length().get())) {
							// * Length increase;
							if (
								newlen
									.difference(this.length().get().map(newlen.class))
									.compare(
										__ALIAS(
											variables.MAX_STRING_LENGTH -
												this.this.this.genarr.read(
													this.this.this.genarr.finish()
												)
										)
									)
							) {
								// * Length increase; Involves '.pushback()' of base strings of correspondent lengths...; Return before leaving the 'if'...
							}
						}
						// * Length decrease;

						if (
							this.length()
								.get()
								.difference(newlen.map(this.length().get().class))
								.compare(
									_ALIAS(
										variables.MAX_STRING_LENGTH -
											this.this.this.genarr.read(
												this.this.this.genarr.finish()
											)
									)
								)
						) {
						}
					}
				}
			},
			copied(method, _arguments = [], f = ID) {
				const acopy = this.copy(f)
				if (
					acopy.this.hasOwnProperty(method) &&
					typeof acopy[method] === "function"
				)
					acopy[method](..._arguments)
				return acopy
			},
			insert(index, value) {
				this.this.this = this.copied("slice", [this.init(), index.previous()])
					.concat(value)
					.concat(this.copied("slice", [index]))
				return this
			},
			remove(index) {
				return this.slice(index, index)
			},
			join(
				separator,
				frequency = aliases._const(
					this.this.this.this.class.template.parentclass.template.icclass.next()
				)
			) {
				// % Sets every a 'separator' substring every 'frequency()' steps (each time it is inserted, the interval function is called yet again);
				// * Requires work with True numbers;
			},
			reverse() {
				this.this.this.genarr.reverse()
				for (x in this.this.this.genarr)
					this.write(x, x.split("").reverse().join(""))
				return this
			},
			map(f = ID) {
				this.this.this = this.copy(f)
				return this
			},
			copy(f = ID) {
				const emptystr = this.this.this.this.class.class()
				emptystr.this.genarr = this.this.this.genarr.copy()
				for (const x of emptystr.keys())
					emptystr.write(x, f(emptystr.read(x), x, emptystr))
				return emptystr
			},
			*keys() {
				let curr = this.init()
				for (; !curr.compare(this.length().get()); curr = curr.next()) yield curr
			},
			isEmpty() {
				for (const x of this.this.this.genarr) if (x !== "") return false
				return true
			},
			sort(predicate) {
				return this.split("").genarr.sort(predicate)
			},
			isSorted(predicate) {
				return this.this.this.this.class.template.parentclass.template.icclass.template.comparison(
					this.copied("sort", [predicate]),
					this.this.this
				)
			},
			indexesOf(ustring, halt = false, haltAfter = Infinity) {
				const indexes = this.this.this.this.class.template.parentclass.class()
				if (aliases.is.str(ustring))
					return this.indexesOf(this.this.this.this.class.class(ustring))
				if (this.this.this.class.is(ustring)) {
					// ! NOTE: (partially) the same code as in the 'split'; Pray, after further work on it - refactor...
					let currcounter = this.init()
					let backupcounter = this.init()
					let hasBroken = false
					const first = useparator.read(useparator.init())

					for (
						;
						!currcounter.length().get().compare(this.length().get());
						currcounter = currcounter.next()
					) {
						if (halt && indexes.length().get().compare(haltAfter)) break
						while (this.read(currcounter) !== first) continue
						backupcounter = backupcounter.next()
						while (
							!this.this.this.this.class.template.parentclass.template.icclass.template.comparison(
								backupcounter,
								useparator
									.tototalindex()
									.map(
										this.this.this.class.template.parentclass.template
											.icclass
									)
							)
						) {
							if (
								this.read(currcounter.jumpForward(backupcounter)) !=
								useparator.read(
									backupcounter.map(
										useparator.this.class.template.parenclass.template
											.icclass
									)
								)
							) {
								hasBroken = true
								break
							}
							backupcounter = backupcounter.next()
						}

						if (!hasBroken) indexes.pushback(currcounter)
						hasBroken = false
						currcounter = currcounter.jumpForward(backupcounter)
						backupcounter = this.init()
						continue
					}
				}
				return indexes
			},
			firstIndex(ustring) {
				const indexes = this.indexesOf(ustring, true, this.init().next())
				if (indexes.length().get().compare(this.init()))
					return indexes.read(this.init())
				return this.this.this.this.class.template.unfound
			},
			includes: classes.includes,
			// Shall change the entirety of the UnlimitedString's order in such a way, so as to maximize the sizes of the finite Strings that compose the UnlimitedString;
			// * Most memory- and that-from-the-standpoint-of-execution, efficient option;
			order() {
				const newstr = this.copy()
				let bigind = this.init()
				let smallind = 0
				for (const x of this) {
					if (smallind == MAX_STRING_LENGTH) {
						bigind = bigind.next()
						smallind = 0
						newstr.pushback("")
					}
					newstr.write(biding, newstr.read(bigind) + x)
					smallind++
				}
				this.this.this = newstr
				return this
			},
			// The precise opposite of 'order': minimizes the length of each and every string available within the underlying GeneralArray;
			// * Makes loops and [generally] execution of any manner of loops longer, because native API is not used anymore, less memory efficient option, but allows for a slightly more intuitive underlying 'GeneralArray' [best for representation/reading the unlimited string]; Also - produces more manageable code;
			symbolic() {
				const symstr = this.this.this.this.class()
				for (const sym of this) symstr.pushback(sym)
				this.this.this = symstr
				return this
			},
			pushback(ustring) {
				if (aliases.is.str(ustring))
					return this.this.this.genarr.pushback(ustring)
				return this.concat(ustring)
			},
			pushfront(ustring) {
				if (aliases.is.str(ustring)) {
					this.this.this.genarr.pushfront(ustring)
					return this
				}
				this.this.this = ustring.copied("concat", [this.this.this])
				return this
			},
			*[Symbol.iterator]() {
				for (const str of this.this.this.genarr) for (const sym of str) yield sym
			},
			suchthat: classes.suchthat,
			any: classes.any,
			every: classes.every,
			forEach: classes.forEach,
			multcall: classes.multcall
		},
		static: {
			fromString(str = "") {
				return this.this.class(str)
			}
		},
		transform: StaticThisTransform,
		recursive: true
	})
}

export const numbers = {
	// TODO: do some great generalizational work on this thing... [add 'leftovers'; same for the rest of this stuff...]; also, complete it properly... add all the desired stuff...
	// TODO [GENERALLY] : first, whenever working on some one thing, pray first just implement the rawest simplest version of it, then do the 'leftovers' and hardcore generalizations...
	// ! The 'numbers' API (and ALL THE OTHER ONES in 'types') must be independent of the underlying InfiniteCounter classes and generators [meaning, one uses '.map' MOST extensively];
	TrueInteger: (function (parentclass) {
		const ONE = (_this) =>
			_this.this.this.this.class(
				_this.this.this.this.class.template.icclass.class().next()
			)
		const TWO = (_this) => ONE(_this).add()
		return EXTENSION({
			defaults: {
				parenclass: parentclass,
				names: ["value"]
			},
			methods: {
				// * Would return added value;
				// ? Question: does one add 0, or 1 by default? [if do 0, then it will fit with the other methods defaults in the sense that calling without arguments makes no effect upon it...];
				// * Current decision: 1;
				add(added = ONE(this)) {
					return this.this.this.this.class.class(
						this.this.this.value.jumpDirection(
							added.map(this.this.this.this.class.template.parentclass)
						)
					)
				},
				// * Would return multiplied value
				multiply(multiplied = ONE(this)) {
					multiplied = multiplied.map(
						this.this.this.this.class.template.icclass
					)
					return multiplied.value.class.static.whileloop(
						multiplied.value,
						(x) => x.add(this.this.this),
						multiplied.class.template.parentclass.class(),
						undefined,
						undefined,
						this.this.this
					)
				},
				// * Raise 'this.this.this' to the integer power of 'x' (works with negatives too...);
				power(x = ONE(this)) {
					if (!this.class.template.icclass.direction(x))
						return TrueRatio(this.template.icclass).class([
							this.class.template.icclass.class().next(),
							this.power(x.reverse())
						])
					return repeatedApplication(
						(y) => y.multiply(this.this.this),
						x,
						this.this.this
					)
				},
				modulo(d = ONE(this)) {
					d = d.map(this.value.class.template.icclas)
					let curr = this.this.this.this.class.class()
					while (!(curr = curr.add(d)).compare(this.this.this.value)) {}
					return curr.difference(this.this.this)
				},
				// * Returns the additive inverse
				invadd() {
					return this.value.map(this.class.template.icclass.static.reverse())
				},
				// * Returns the multiplicative inverse (TrueRatio type);
				invmult() {
					return TrueRatio(this.this.this.this.class)(ONE(this), this.this.this)
				},
				map(icclass = this.this.this.this.class.template.icclass) {
					return this.this.this.this.class(this.this.this.value.map(icclass))
				},
				compare(compared) {
					return this.this.this.value.compare(
						compared.map(this.this.this.this.class.template.icclass).value
					)
				},
				difference(d = ONE(this)) {
					return this.this.this.add(d.invadd())
				},
				divide(d) {
					let r = this.this.this.this.class.class()
					let copy = this.copy()
					while (copy.compare(d)) {
						copy = copy.difference(d)
						r = r.add()
					}
					return r
				},
				copy() {
					return this.this.this.this.class(
						native.copy.deepCopy(this.this.this.value.value)
					)
				},
				// ? Wonder whether one'd love to generalize these methods too? [further work on advancing the CLASS macro - would be very useful as a pattern of the library];
				equal(x) {
					return this.value.compare(x.value)
				},
				// ! NOT AWFULLY EFFICIENT - find a more time and memory-efficient way of computing the (floor/ceil)(xroot(this));
				root(x = TWO(this), ceil = false) {
					let r = this.this.this.this.class()
					let temp
					while (!(temp = r.power(x)).compare(this)) r = r.add()
					if (temp.equal(this) || ceil) return r
					return r.difference()
				}
			},
			static: {
				// ! PROBLEM [general]: the CLASS and EXTENSION do __not__ currently handle templates in the '.static' field! Pray do something about it...
				fromNumber: function (num = 1) {
					return this.this.class(
						aliases.native.number.iterations({
							iterated: this.this.template.parentclass.template
						})(num)
					)
				},
				fromCounter: function (ic) {
					return number.TrueInteger(ic.class)(ic.value)
				}
			},
			transform: StaticThisTransform,
			recursive: true,
			toextend: []
		})
	})(),
	TrueRatio: function (parentclass) {
		return EXTENSION({
			defaults: {
				parentclass: parentclass,
				names: ["numerator", "denomenator"],
				inter: aliases.cdieach,
				defaults: {
					constructor: number.native.generate(2).map(function () {
						return this.template.parentclass.class().add()
					})
				}
			},
			methods: {
				// ! add the defaults...
				add(addratio) {
					return this.this.this.this.class.static.simplified(
						this.this.this.this.class(
							this.this.this.numerator
								.multiply(addratio.denomenator)
								.add(
									addratio.numerator.multiply(
										this.this.this.denomenator
									)
								),
							this.this.this.denomenator.multiply(addratio.denomenator)
						)
					)
				},
				multiply(multratio) {
					return TrueRatio().class(
						this.value[0].multiply(multratio.value[0]),
						this.value[1].multiply(multratio.value[1])
					)
				},
				invadd() {
					return this.this.this.this.class.class(
						this.numerator.invadd(),
						this.denomenator
					)
				},
				invmult() {
					return this.this.this.this.class(
						this.this.this.numerator,
						this.this.this.denomenator
					)
				},
				isWhole() {
					return this.this.this.this.class.template.parentclass.template.parentclass.template.comparison(
						this.this.this.denomenator,
						this.this.this.this.class.template.parentclass().add()
					)
				},
				copy() {
					return this.this.this.this.class(
						this.this.this.numerator,
						this.this.this.denomenator
					)
				},
				naivesum(ratio) {
					return this.this.this.this.class(
						this.this.this.numerator.add(ratio.numerator),
						this.this.this.denomenator.add(ratio.denomenator)
					)
				}
			},
			static: {
				simplified(ratio) {
					ratio = ratio.copy()
					const m = ratio.numerator.compare(ratio.denomenator)
						? "numerator"
						: "denomenator"
					const l = m === ratio.numerator ? "denomenator" : "numerator"
					for (const x of algorithms.integer.allFactors().function(m))
						if (this.this.class().equal(ratio[l].modulo(x))) {
							ratio[m] = ratio[m].divide(x)
							ratio[l] = ratio[l].divide(x)
						}
					return ratio
				}
			},
			transform: StaticThisTransform,
			recursive: true,
			// ! work more on this list...Decide if it ought to remain empty for the time being...;
			toextend: []
		})
	},
	InfiniteSum(template = {}) {
		return {
			template: { ...template },
			class: function (f = template.f) {
				return {
					f: f,
					// * Sums up to a given point 'point'; The 'template' has an index-'generator' in it... That's used for index-generation, and 'point' is of the same icounter-type...
					// uses 'f' for it...
					sum(point) {
						let added = TrueInteger(this.template.icclass).class()
						this.template.icclass.static.whileloop(
							this.template.icclass.class(),
							point,
							(i) => {
								added = added.add(this.f(i))
							}
						)
						return added
					},
					add(is) {
						return InfiniteSum(this.class.template).class((i) =>
							this.f(i).add(is.f(i))
						)
					}
					// ? Does one want to implement anything else for this thing???
				}
			}
		}
	}
}

// ? Finish the 'CLASS'-ification of the thing (use the 'methods:' and the 'properties:' more actively);
export const UniversalMap = CLASS({
	defaults: {
		notfound: undefined,
		treatUniversal: false,
		comparison: comparisons.valueCompare,
		defkeys: [],
		defvals: []
	},
	function: function (
		keys = this.template.defkeys,
		values = this.template.defvals,
		// ? Keep this argument or not? [Thiking about removing currently...];
		treatUniversal = this.template.treatUniversal
	) {
		// * Conversion from a non-array object...
		if (!aliases.is.arr(keys)) {
			if (keys.keys && keys.values && (treatUniversal || values === true)) {
				values = keys.values
				keys = keys.keys
			} else {
				values = aliases.obj.values(keys)
				keys = aliases.obj.keys(keys)
			}
		}
		return {
			keys: keys,
			values: values,
			index: 0,
			class: this,
			get(key, number = 1) {
				const indexes = aliases.native.array
					.indexesOf({
						comparison: this.class.template.comparison
					})
					.function(this.keys, key)
				if (indexes.length === 0) return this.class.template.notfound
				return indexes.slice(0, number).map((i) => this.values[i])
			},
			set(key, value) {
				const index = aliases.native.array.indexesOf(
					this.keys,
					key,
					this.class.template.comparison
				)
				if (index.length !== 0)
					for (const _index of index) this.values[_index] = value
				else {
					this.keys.push(key)
					this.values.push(value)
				}
				return value
			},
			[Symbol.iterator]: function* () {
				for (this.index = 0; this.index < this.keys.length; this.index++)
					yield this.get(this.keys[this.index])
			},
			*getkeys() {
				for (this.index = 0; this.index < this.keys.length; this.index++)
					yield this.keys[this.index]
			},
			// ? create an alias for checking if this kind of conversion is valid, perhaps? 'isValidObj', for instance...
			toObject() {
				const a = {}
				for (let i = 0; i < this.keys.length; i++)
					a[
						(!["symbol", "number"].includes(typeof this.keys[i])
							? JSON.stringify
							: id)(this.keys[i])
					] = this.values[i]
				return a
			}
		}
	}
})

// Utilizes the fact that JS passes objects by reference;
export const Pointer = TEMPLATE({
	defaults: { label: "", nullptr: undefined },
	function: function (value = this.template.nullptr) {
		return { [this.template.label]: value }
	},
	word: "class"
})
// * This thing will allow to create function-based types on top of an Array;
// Usage Example 1: use the 'typefunction' as a mean of identifying if the 'type' of the thing is right, with 'typefail' defined as a result of .newval(+typeconversion);
// Usage Example 2: in 'typefail', throw an Exception, whilst in typefunction, do whatever it is one desires to do with the pre-checking of elements' properties;
export function TypedArray(template = {}) {
	const C = {
		template: {
			empty: [],
			typefunction: aliases._const(true),
			...template
		}
	}

	C.class = function (array = C.template.empty) {
		return GeneralArray({
			this: C,
			...C.template,
			newvalue: function (arr, val) {
				if (this.this.template.typefunction(val))
					return this.this.template.newval(arr, val)
				return this.this.template.typefail(arr, val)
			}
		}).class(array)
	}

	return C
}

// ^ CONCLUSION: the NumberEquation requires a more general construct to be implemented in the first place to be operable within the chosen path of development.
// * One ought to implement the EquationParser, which would be a very configurable function, purpose of which would be to interpret UnlimitedString(s), then
// 	return the Expression executable via the 'Expression' API (or fullExp function);
// % The UnlimitedString wihtin the question is governed by the EquationForm object class
// ! PRAY DEFINE IT... [Generally, templated, so that the user is able to make their own forms];
// * Tasks list before continuing with the NumberEquation:
// 		1. Finish (fix) the fullExp [AND FIND IT ITS OWN SPACE...];
// 		2. Finish the UnlimitedString implementation;
// 		3. Genereralize the '.static.ParseEquation' to a user-defined function;

export function NumberEquation(template = {}) {
	const X = {
		template: {
			operators: variables.defaultAlphabet.get,
			// ! make a default variable...
			brackets: [
				["(", ")"],
				["[", "]"],
				["{", "}"]
			],
			// ! make a default variable...
			// ! generalize, make more user- and format- friendly...
			separator: ",",
			...template
		},
		static: {
			/**
			 * A static method for parsing an equation with various mappings applied.
			 * @param {string} equationLine A line, containing an equation.
			 * @param {VarMapping} mappings A mapping of variables to their values.
			 * @param {string[]} variables Additional variable names.
			 */
			ParseEquation(eqline = this.this.template.ustrclass.template.empty) {
				const brackets = this.this.template.brackets
				const ops = Object.keys(this.this.template.operators)
				const separator = this.this.template.separator

				const result = [
					this.this.template.genarrclass.static.empty(),
					this.this.template.genarrclass.static.empty()
				]

				eqline = aliases.native.string.sreplace(eqline, " ", "")
				// TODO: make an alias for the previously intended operation ['partial' str/arr-splitting: 'x = x.split(y); x = [...x.slice(0, t), x.slice(t)];']
				eqline = eqline.split("=")
				// ? QUESTION: enable arbitrary user-defined syntaxes?

				// TODO: redefine the 'looping' method for the UnlimitedString class...
				// ! Complete the sketch of the parsing method [after tuning the stuff, and so on...];
				// 		% In particular:
				// 			1. Make it safer [working even when invalid strings are provided];
				// 			2. Ensure it working [to each and every small detail see...];
				// ! Generalize, make the decided parsing method a default, establish the requirements for a user-created parsing method for an equation...;
				eqline.loop()._full((side) => {
					while (true) {
						let i = side.firstIndex(op[0])
						let co = op[0]
						let cb = brackets[0]

						for (const o of ops.slice(1)) {
							let pi = i
							i = min([i, side.firstIndex(o)])
							cb = min([cb[0], side.firstIndex(cb)])
							if (pi != i) co = o
						}

						result[0].pushback(co)
						// TODO: perform corresponding transformations to the ic-format of the .genarrclass;
						side = side.slice(co.length)
						side = side.slice(cb[0].length)
						side = side.slice(0, side.length - cb[1].length)
						side = side.split(separator)

						// * Sketch: look for operators symbols, followed by one of the 'brackets' symbols;
					}
				})

				return result
			},
			// TODO: Currently, plugging works correctly only with variables of length 1. Fix it.
			plug(origparsed, varname, varvalue) {
				const parsed = [...origparsed]
				for (const pparsed of parsed)
					for (let i = 0; i < pparsed.length; i++)
						if (pparsed[i] === varname)
							pparsed = aliases.native.string.sreplaceIndex(
								pparsed,
								i,
								varvalue
							)
				return parsed
			}
		},
		class: function (equationText = this.this.template.ustrclass.empty, vars = {}) {
			return {
				class: this,
				equation: equationText || this.this.template.ustrclass.empty,
				variables: vars || {},
				parse(mappings = this.variables) {
					return this.class.static.ParseEquation(this.equation, mappings)
				},
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
					// ? What to do with this now? [The thing has mutiple sides of the equation...];
					// * Pray consider alternative [more complex, general, universally useful] strategies to numeric approximation of an equation of the given sorts...
					// ^ IDEA [for a solution]: let the user choose the function using which the arrays from the 'diffs' output will be ordered by value [this way, the user themselves decides the precise output of the function, the way to handle the post-computation data];
					function diffs(mappings, varname, varvalue) {
						// ! PROBLEM: not thought through well enough;
						// * Now, the present process shall be such:
						// 	1. Parsing [DOES NOT INCLUDE PLUGGING IN];
						// 	2. Plugging in [on a number-by-number basis...];
						// 	3. Finding the list of differences [ordered in the same way as the sides of the equality in the originally given equation];
						// 	4. Returning the list;
						// 	5. Have the thing decide the priority of returned lists based off user's function [returnsa an array of arrays of values based off differences chosen by the user];
						// const plugged = this.parse(mappings)
						// return plugged
					}
					const differences = generate(
						startvalue,
						startvalue + pathlength,
						floor(10 ** -precision, precision),
						precision
					).map((i) => {
						return Math.abs(diffs(mappings, varname, i))
					})
					return (
						startvalue +
						differences.indexOf(min(differences)) *
							floor(10 ** -precision, precision)
					)
				}
			}
		}
	}
	X.static.this = X
	return X
}

// TODO: implement those three [they are *truly* infinite, given by a finite user-expression...]
export function InfiniteString() {}
export function InfiniteArray() {}
export function InfiniteNumber() {}

export function TreeNode(parentclass) {
	return EXTENSION({
		defaults: {
			parentclass: parentclass,
			names: ["children"],
			defaultnode: undefined
		},
		properties: {
			// ! Generalize these functions/make aliases [ID_n, or some such... - returns the n'th arguments value as-is];
			node: function (_children, n = this.template.defaultnode) {
				return n
			},
			root: function (_children, _node, r = null) {
				return r
			}
		},
		methods: {
			// * Already has all the methods of GeneralArray, so - the things to implement are:
			// % 1. getall() - recursively walk the tree, gaining any '.node' values, then return the GeneralArray of all of them;
			// % 2. getpart(a, b) - 'this.this.this.this.class(this.this.this.children.copied("slice", [a, b]), undefined).getall().slice([this.this.this.children.init().next()])'; Gets the part of the tree (based off the children's nodes);
			// % 3. firstIndex(x) - recursively applies the 'firstIndex' upon each and every '.children' element of each and every single one Tree-child of the Tree in question; Returns the GeneralArray of indexes; (note: the 'firstIndex' is given a special comparison that checks for the '.node');
			// % 4. copy();
			// % 5. copied();
			// % 6. insert(multindex, elem) - inserts the new element at the given GeneralArray of indexes;
			// % 7. prune(multindex) - deletes the node at the desired multindex;
			// % 8. delval(v) - works like '.delval' in '.children', but uses the '.node' (just use a special 'comparison' for it and that'll be all...);
			// % 9. findRoots(value) - recursively finds the roots for every node value 'value', then returns them in a GeneralArray;
			// % 10. commonAncestors(values) - finds and retuns (in a GeneralArray) the values of all the common ancestors of the nodes in possession of given GeneralArray of 'values'; [One value in the output for each repeated occurence of theirs];
			// % 11. pushback() - same as 'GeneralArray.pushback', but creates a 'TreeNode' child instead;
			// % 12. pushfront();
		},
		recursive: true
	})
}

// ? Question: generalize [replace with a GeneralArray-based 'UnlimitedSet']?
export class IterableSet {
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
		return this.elements.includes(x)
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
