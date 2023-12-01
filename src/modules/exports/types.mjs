// * The most essential part of the library - the types definitions;

import * as aliases from "./aliases.mjs"
import * as variables from "./variables.mjs"
import * as comparisons from "./comparisons.mjs"
import * as counters from "./counters.mjs"
import * as algorithms from "./algorithms.mjs"

import { general, classes } from "../refactor.mjs"
import { CLASS, TEMPLATE, EXTENSION, DEOBJECT } from "../macros.mjs"
import { StaticThisTransform } from "../instance.mjs"

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
		// ? Generalize further! In particular, as one has separated the values for the 'methods', maybe do so for the 'properties' (using a different Macro...)
		function: function (previous = this.template.unacceptable) {
			return {
				value: this.template.initialcheck(previous, this.template.unacceptable)
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
					? this.this.this
					: this.this.this.jumpBackward(ic, leftovers)
			},
			jump(x, jumping = (k) => k.next(), leftovers = {}) {
				ensureProperties(leftovers, {
					range: this.this.class.template.range,
					counterclass: this.this.class
				})
				if (!leftovers.range(x.value)) return this.this.this
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
			}
		},
		recursive: true
	})
})()

// ! ABOUT THE '.get-.set' for the 'this.this.this' bound to CLASSes instances' structure... (rethinking);
// * The code works perfectly fine, the only question is whether that is the way one wants it to work:
// 	% 1. If left as-is, the methods of the class's instance will all work with the 'this.this.this', which is the field of 'this.this', which unless changed always stays the same; So, the thing works;
// 	% 2. If changed to the '.get-.set' construction instead, one'll have a more flexible way to change (and affect) the setting of the 'this';
// ? Pray consider which one to do...;

// TODO: Current list of methods to add to GeneralArray:
// % 	1. split(separator); - GeneralArray of GeneralArrays; [here - separator is an arbitrary object]
// % 	2. join(separator); - A template function, will return an UnlimitedString of the GeneralArray class in question;
// % 	3. splice(index, times); Same as Array.splice();
// % 	4. spliceMult(indexes, ntimes); repeated spliceMult [both args are arrays...];
// % 	5. splitlen(length); split the array onto subarrays of given length 'length'; If not possible to factor in such a way as to have them all being precisely 'length', then the last one is made shorter...;
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
				R[`push${x}`] = TEMPLATE({
					defaults: {
						arguments: [],
						transform: id,
						...template
					},
					function: function (b) {
						// ? Perhaps, provide just 'b' in its stead? Pray consider...
						// * The advantages of this thing is that it allows for a far more beautiful, convinient and native-JS-compatible syntax along with shorter identity names...;
						// * The advantages of the alternative approach is the total number of arguments and the greater structural elegance...;
						return this.template.target[`push${x}`](
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
		methods: {
			next() {
				return (this.this.this.currindex = this.this.this.currindex.next())
			},
			previous() {
				return (this.this.this.currindex = this.this.this.currindex.previous())
			},
			currelem() {
				return {
					get: () => this.this.this.this.class.template.elem(this.this.this),
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
						icclass: this.this.this.this.class.template.icclass,
						after: ID,
						...template
					},
					object: _const(this.this.this),
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
						const index = this.object().currindex
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
					// * The difference between '.full()' and '._full()' is that the former is based on later and allows for 'break' and 'continue'...
					// ? work on their names...
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
			go(index, range = this.this.this.this.class.template.icclass.template.range) {
				if (!range(index.value))
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
				preface = aliases.void,
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
						this.this.this.this.class.template.icclass.template.comparison,
					stop: (x) =>
						leftovers.comparison(x.length().get().next(), x.currindex)
				})
				return this.this.this.move(
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
						this.this.this.this.class.template.icclass.template.comparison,
					stop: (x) => leftovers.comparison(x.init(), x.currindex)
				})
				return this.this.this.move(
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
									leftovers.comparison(x.currindex, x.length().get())))
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
				return (this.this.this.currindex = this.this.this.currindex.jumpDirection(
					index,
					leftovers.comparison,
					leftovers.range
				))
			},
			read(index = this.this.this.init(), leftovers = {}) {
				sh1(this, leftovers)
				const ind = this.this.this.currindex
				if (leftovers.fast) this.this.this.go(index, leftovers.range)
				else this.this.this.moveforward(index, true, leftovers.comparison)
				const c = this.this.this.currelem().get()
				this.this.this.currindex = ind
				return c
			},
			write(index, value, leftovers = {}) {
				const ind = this.this.this.currindex
				if (leftovers.fast) this.this.this.go(index, leftovers.range)
				else
					this.this.this.moveforward(index, {
						begin: true,
						comparison: leftovers.comparison
					})
				const returned = this.this.this.currelem().set(value)
				this.this.this.currindex = ind
				return returned
			},
			length() {
				// ? QUESTION: does one want the '.length().get' to work like a function [current - finding the length]; or like a static value changed by transformations?
				// ? Or like a getter? As in: 'get get() {...}'; Then, one'd drop the '()' from '.get()' during the calling procedure...
				// ? OR like a "() => {}"??? Which of the three approaches for this structure is to be chosen?
				// * pray think on it...
				return {
					object: _const(this.this.this),
					get() {
						// ? Could this [the 'length.get()' method] not be rewritten by the means of the '.loop()' method??? Pray consider...
						// * Yes, indeed! Pray do...
						// TODO: refactor...
						const index = this.object().currindex
						this.object().begin()
						while (!this.object().this.class.template.isEnd(this.object()))
							this.object().next()
						const returned = this.object().currindex
						this.object().currindex = index
						return returned
					},
					set(value, leftovers = {}) {
						ensureProperties(leftovers, {
							range: this.object().this.class.template.class.template
								.icclass.template.range,
							comparison:
								this.object().this.class.template.class.template.icclass
									.template.comparison
						})

						if (!leftovers.range(value.value))
							throw new RangeError(
								"Index range error for array length setting"
							)

						if (leftovers.comparison(this.object().length().get(), value))
							return

						if (
							this.object()
								.length()
								.get()
								.compare(value, undefined, _const(true))
						) {
							// Decrease the length
							this.object().deleteMult(
								this.object().init(),
								this.object()
									.length()
									.get()
									.jumpDirection(
										this.object().length().get().difference(value)
									)
							)
						} else {
							// Increase the length
							this.this.this.concat(
								this.this.this.class.static.fromCounter(
									this.object().length().get().difference(value)
								)
							)
						}
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
				const c = this.this.this.copy(f, template, isclass, leftovers)
				if (c.hasOwnProperty(method) && typeof c[method] === "function")
					c[method](..._arguments)
				return c
			},
			pushback(value, leftovers = {}) {
				sh1(this, leftovers)
				return this.this.this.write(
					this.this.this.length().get(),
					value,
					leftovers
				)
			},
			pushfront(x, leftovers = {}) {
				sh1(this, leftovers)
				return (this.this.this = this.this.this.this.class.static
					.fromArray([x], leftovers)
					.concat(this.this.this, leftovers))
			},
			pushfrontLoop(template = {}) {
				const origin = this.this.this.this.class.static.pushfrontkLoop(template)
				const T = {
					template: {
						target: this.this.this,
						...origin.template
					}
				}
				T.function = origin.function.bind(T)
				return T
			},
			pushbackLoop(template = {}) {
				const origin = this.this.this.this.class.static.pushbackLoop(template)
				const T = {
					template: {
						target: this.this.this,
						...origin.template
					}
				}
				T.function = origin.function.bind(T)
				return T
			},
			// TODO: allow for multiple arrays to concat the current one with... [perhaps, an array of arrays?]
			concat(
				// TODO: make the 'array' an '.empty()' by default in such and other similar cases...
				array,
				leftovers = {}
			) {
				sh1(this, leftovers)
				return array.loop()._full(
					this.this.this.pushbackLoop({
						arguments: [leftovers]
					}).function
				)
			},
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
				const copied = this.this.this.empty()
				copied.class = isclass
					? template
					: { ...copied.class, template: { ...template } }
				this.this.this.loop()._full(
					copied.pushbackLoop({
						transform: f,
						arguments: [leftovers]
					}).function
				)
				return copied
			},
			delval(value) {
				const x = this.this.this.firstIndex(value)
				if (!(x === this.this.this.template.unfound))
					return this.this.this.delete(x)
				return this.this.this
			},
			slice(
				begin = this.this.this.init(),
				end = this.this.this.finish(),
				leftovers = {}
			) {
				sh1(this, leftovers)
				if (!leftovers.range(end.value))
					throw new RangeError(
						"Bad range in the 'end' argument passed to the 'GeneralArray.slice()' function call!"
					)

				// TODO: generalize [add the corresponding argument to the methods and employ it] the uses of the 'this.this.this.empty'... in accordance with the newly created implementation...
				const sliced = this.this.this.empty()
				this.this.this.loop()._full(
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
					let c = this.this.this.init();
					!c.compare(this.this.this.length().get());
					c = c.next()
				)
					yield c
			},
			// ! Not effecient; Pray reconsider the implementation...
			*[Symbol.iterator](leftovers = {}) {
				sh1(this, leftovers)

				for (
					let c = this.this.this.init();
					!c.compare(this.this.this.length().get());
					c = c.next()
				)
					yield this.this.this.read(c, leftovers)
			},
			// TODO: refactor using the other GeneralArray methods;
			// * Do it using '.project() + InfiniteCounter.difference() + repeat()...';
			// Sketch: 'this.this.this.projectComplete(index, this.this.this.static.fromArray([value]).repeat(this.this.this.length().get().difference(index)))'
			fillfrom(index, value, leftovers = {}) {
				sh1(this, leftovers)
				const indexsaved = this.this.this.currindex
				this.this.this.go(index, leftovers.range)
				while (
					!leftovers.comparison(
						this.this.this.currindex,
						this.this.this.finish()
					)
				) {
					this.this.this.currelem().set(value)
					this.this.this.next()
				}
				this.this.this.currindex = indexsaved
				return this.this.this
			},
			convert(template = this.this.this.this.class.template, leftovers = {}) {
				return (this.this.this = this.this.this.copy(
					ID,
					false,
					template,
					leftovers
				))
			},
			// * NOTE: the difference between this thing and the '.convert' is the fact that '.switchclass' is capable of preserving "reference-connections" of different objects to the same one object class's instance;
			switchclass(arrclass = this.this.this.this.class, leftovers = {}) {
				// ! same issue as in the '.convert' method;
				return (this.this.this = this.this.this.copy(
					ID,
					true,
					arrclass,
					leftovers
				))
			},
			swap (i, j) {
				const ival = this.this.this.read(i)
				this.this.this.write(i, this.this.this.read(j))
				this.this.this.write(j, ival)
				return this.this.this
			}, 
			delete(index, leftovers = {}) {
				sh1(this, leftovers)
				return this.this.this.deleteMult(index, index, leftovers)
			},
			deleteMult(startindex, endindex = startindex, leftovers = {}) {
				sh1(this, leftovers)
				const x = this.this.this.copied(
					"slice",
					[endindex.next()],
					undefined,
					leftovers
				)
				return this.this.this
					.slice(this.this.this.init(), startindex.previous(), leftovers)
					.concat(x)
			},
			projectComplete(array, index, leftovers = {}) {
				sh1(this, leftovers)
				const _index = this.this.this.currindex
				array.loop()._full(
					(t) => {
						// TODO: generalize this as well - some '.currwriteLoop(value, fast, range, comparison)', or something...
						this.this.this.write(
							this.this.this.currindex,
							t.object().currelem().get(),
							leftovers
						)
					},
					_const((x) => {
						x.object().next()
						this.this.this.next()
					}),
					undefined,
					(x) => {
						x.object().begin()
						this.this.this.go(index, leftovers.range)
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
					this.this.this.loop()._full(
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
				return this.this.this
			},
			insert(index, value, leftovers = {}) {
				sh1(this, leftovers)
				const x = this.this.this.copied(
					"slice",
					[undefined, index.previous()],
					undefined,
					leftovers
				)
				x.pushback(value, leftovers)
				x.concat(this.this.this.copied("slice", [index], undefined, leftovers))
				return (this.this.this = x)
			},
			// * Just an alias...
			index(i = this.this.this.init(), leftovers = {}) {
				sh1(this, leftovers)
				return this.this.this.read(i, leftovers)
			},
			// ? Write in terms of 'firstIndex' + 'slice'; just collect the indexes from corresponding index (found index) after having pushed it to the GeneralArray of the indexes of the same type, then return the result...
			// ^ IDEA: for making the implementation of 'indexesOf' more efficient - one gives it two arguments for enabling halting - 'halt (boolean)' [whether to halt] and 'haltAfter (counter)' [length().get() of the final array, after which to halt...]
			indexesOf(x, leftovers = {}) {
				sh1(this, leftovers)
				const indexes = this.this.this.empty()
				this.this.this.loop()._full((arr) => {
					if (leftovers.comparison(arr.object().currelem().get(), x))
						indexes.pushback(arr.currindex, leftovers)
				})
				return indexes
			},
			firstIndex(x, leftovers = {}) {
				ensureProperties(leftovers, {
					unfound: this.this.this.this.class.template.unfound,
					comparison:
						this.this.this.this.class.template.icclass.template.comparison
				})
				let index = leftovers.unfound
				this.this.this.loop()._full((arr) => {
					if (leftovers.comparison(arr.object().currelem().get(), x)) {
						index = arr.currindex
						arr.break()
					}
				})
				return index
			},
			shiftForward(times, leftovers = {}) {
				sh1(this, leftovers)
				const x = this.this.this.this.class.static.fromCounter(times)
				return (this.this.this = x.concat(this.this.this, leftovers))
			},
			// TODO [general]: do proper work on the functions' defaults;
			shiftBackward(times = this.this.this.init(), leftovers = {}) {
				sh1(this, leftovers)
				return this.this.this.slice(
					times.map(this.this.this.this.template.class.template.icclass),
					undefined,
					leftovers
				)
			},
			repeat(
				times = this.this.this.init(),
				icclass = this.this.this.this.class.template.icclass,
				leftovers = {}
			) {
				// TODO: ration the usage of these throughout the code - namely, get rid of all the places that they aren't necessary...
				sh1(this, leftovers)
				const newarr = this.this.this.empty()
				icclass.static.whileloop(icclass.class(), times, () =>
					newarr.concat(this.this.this, leftovers)
				)
				return newarr
			},
			reverse(leftovers = {}) {
				const reversedArr = this.this.this.empty()
				this.this.this.loop()._full(
					reversedArr.pushfrontLoop({
						arguments: [leftovers]
					}).function
				)
				return (this.this.this = reversedArr)
			},
			map(
				f = id,
				template = this.this.this.this.class.template,
				isclass = false,
				leftovers = {}
			) {
				sh1(this, leftovers)
				return (this.this.this = this.this.this.copy(
					f,
					template,
					isclass,
					leftovers
				))
			},
			isEmpty(isend = this.this.this.this.class.template.isEnd) {
				const index = this.this.this.currindex
				this.this.this.begin()
				const val = isend(this.this.this)
				this.this.this.currindex = index
				return val
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
					this.this.this.copied("sort", [predicate], undefined, leftovers)
				)
			},
			includes: classes.includes,
			suchthat: classes.suchthat,
			any: classes.any,
			every: classes.every,
			forEach: classes.forEach
		},
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
				bound: (i) => i < this.template.maxarrlen - 1,
				...template
			}
		}

		A.class = GeneralArray({
			this: A,
			elem: function (
				arrobj,
				array = arrobj.array,
				pointer = false,
				beginningobj = array.currindex,
				beginningind = 0
			) {
				const begin = arrobj.init()
				let currarr = array
				const original = arrobj.currindex
				array.currindex = beginningobj
				let isReturn = [false, undefined]
				let index = beginningind
				for (
					;
					!arrobj.this.class.template.icclass.template.comparison(
						begin,
						arrobj.currindex
					);
					arrobj.previous()
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
				arrobj.currindex = original
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
	return EXTENSION({
		defaults: {
			names: ["keys", "values"],
			parentclass: parentclass,
			defaults: {
				constructor: aliases.generate(1, 2).map(
					aliases._const(function () {
						return this.template.empty
					})
				),
				inter: function (args, i) {
					return i == 0 ? args : [args[1]]
				}
			},
			unfound: undefined
		},
		methods: {
			// ! Issues:
			// * Methods list outline:
			// 	% 1. read(key); - obtain a value using the key; [note, if the key is missing - returns the 'this.this.this.this.class.template.unfound'];
			// 	% 2. write(key, value); - set a value using the key; [note, if the key is unfound, creates a new key and sets the value to it];
			// ? Operator overloading, maybe?
			// * PROBLEM [language-related]: there isn't a way to implement it in this case because of diversity of arguments...;
			// 	% 3. deleteKey(key); - delete a value by its keys;
			// 	% 4. deleteValues(values); - delete all the key-value pairs that have the given values;
			// 	% 5. suchthat(predicate); - assigns the 'this.this.this' to a submap, based off the given predicate;
			// 	% 6. copy(); - copies the present map;
			// 	% 7. copied(method); same as in 'GeneralArray';
			// 	% 8. map(); - maps the present UnlimitedMap to the new one, replacing the new one with the present one;
			// 	% 9. deleteKeys(keys); - a genarray-looped-over version of the deleteKey;
			// 	todo: pray work more deailedly on the exact list...
		},
		static: {
			fromObject(object = {}, finite = false) {
				return this.this.class(
					...DEOBJECT(object).map(
						finite ? ID : this.this.template.parentclass.static.fromArray
					)
				)
			}
		},
		transform: StaticThisTransform,
		recursive: true
	})
}

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
			basestr: aliases._const(" "),
			unfound: undefined
		},
		properties: {
			currindex: aliases._const(0)
		},
		methods: {
			// * Currently missing:
			// 	% 1. join();
			// 	% 2. length().set();
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
					let prevcounter = this.this.this.init()
					let currcounter = this.this.this.init()
					let backupcounter = this.this.this.init()
					let hasBroken = false
					const first = useparator.read(useparator.init())

					// ! Pray generalize and re-scope this thing later...
					const FUNC = function (strarr, prevcounter, currcounter) {
						return strarr.pushback(
							this.this.this.copied("slice", [prevcounter, currcounter])
						)
					}

					for (
						;
						!currcounter
							.length()
							.get()
							.compare(this.this.this.length().get());
						currcounter = currcounter.next()
					) {
						while (this.this.this.read(currcounter) !== first) continue
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
								this.this.this.read(
									currcounter.jumpForward(backupcounter)
								) !=
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
						backupcounter = this.this.this.init()
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
				let final = this.this.this.init()
				for (const x of this.this.this.genarr
					.copied("slice", [this.this.this.init(), ind.previous()])
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
				const nind = this.this.this.fromtotalindex(index)
				this.this.this.genarr.currindex = nind[0]
				this.this.this.currindex = nind[1]
				return this.this.this
			},
			fromtotalindex(index) {
				const _ALIAS = ALIAS(this)
				let present = this.this.this.init()
				let inarrind = this.this.this.init()
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
			slice(
				beginning = this.this.this.init(),
				end = this.this.this.finish(),
				orderly = false
			) {
				const newstr = this.this.this.this.class.class()
				this.this.this.go(beginning)
				for (; !this.this.this.tototalindex().compare(end); this.this.this.next())
					newstr.pushback(this.this.this.currelem().get())
				return (this.this.this = (orderly ? (x) => x.order() : ID)(newstr))
			},
			read(index) {
				// ^ CONCLUSION: this is __the__ most desired way to do it within the library ONLY when one is intending for the method in question to be non-mutating...
				return this.this.this.copied("symbolic", []).genarr.read(index)
			},
			write(index, value) {
				general.fix(
					[this.this.this.genarr, this.this.this],
					generate(1, 2).map(aliases._const("currindex")),
					() => {
						this.this.this.go(index, aliases._const(true))
						this.this.this.currelem().set(value)
					}
				)
				// TODO: make the alias of '._const(true)' - has appeared several times throughout already...
				this.this.this.genarr.currindex = lgaind
				this.this.this.currindex = lusind
				return this.this.this
			},
			concat(ustring) {
				if (aliases.is.str(ustring)) return this.this.this.pushback(ustring)
				this.this.this.genarr.concat(ustring.genarr)
				return this.this.this
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
						// ! REALLY - refactor those .read(.finish()) and .read(.init())...
						return this.this.this.tototalindex(
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
						if (newlen.compare(this.this.this.length().get())) {
							// * Length increase;
							if (
								newlen
									.difference(
										this.this.this.length().get().map(newlen.class)
									)
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
							this.this.this
								.length()
								.get()
								.difference(
									newlen.map(this.this.this.length().get().class)
								)
								.compare(
									_ALIAS(
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
				}
			},
			copied(method, _arguments = [], f = ID) {
				const acopy = this.this.this.copy(f)
				if (
					acopy.this.hasOwnProperty(method) &&
					typeof acopy[method] === "function"
				)
					acopy[method](..._arguments)
				return acopy
			},
			insert(index, value) {
				// ! Allow the 'concat' and other such functions in the UnlimitedString and GeneralArray to take multiple arguments [generalize from the 1/2-cases];
				return (this.this.this = this.this.this
					.copied("slice", [this.this.this.init(), index.previous()])
					.concat(value)
					.concat(this.this.this.copied("slice", [index])))
			},
			remove(index) {
				return this.this.this.slice(index, index)
			},
			join(
				separator,
				frequency = aliases._const(
					types
						.InfiniteCounter(counters.addnumber({ start: -1 }))
						.class(1)
						.map(
							this.this.this.this.class.template.parentclass.template
								.icclass
						)
				)
			) {
				// % Sets every a 'separator' substring every 'frequency()' steps (each time it is inserted, the interval function is called yet again);
				// * Requires work with True numbers;
			},
			reverse() {
				const x = this.this.this.map()
				x.genarr.reverse()
				for (y in x.genarr) x.write(y, y.split("").reverse().join(""))
				return (this.this.this = x)
			},
			map(f = ID) {
				return (this.this.this = this.this.this.copy(f))
			},
			copy(f = ID) {
				const emptystr = this.this.this.this.class.class()
				emptystr.this.genarr = this.this.this.genarr.copy()
				for (const x of emptystr.keys())
					emptystr.write(x, f(emptystr.read(x), x, emptystr))
				return emptystr
			},
			*keys() {
				let curr = this.this.this.init()
				for (; !curr.compare(this.this.this.length().get()); curr = curr.next())
					yield curr
			},
			isEmpty() {
				for (const x of this.this.this.genarr) if (x !== "") return false
				return true
			},
			sort(predicate) {
				return this.this.this.split("").genarr.sort(predicate)
			},
			isSorted(predicate) {
				return this.this.this.this.class.template.parentclass.template.icclass.template.comparison(
					this.this.this.copied("sort", [predicate]),
					this.this.this
				)
			},
			indexesOf(ustring, halt = false, haltAfter = Infinity) {
				const indexes = this.this.this.this.class.template.parentclass.class()
				if (aliases.is.str(ustring))
					return this.this.this.indexesOf(
						this.this.this.this.class.class(ustring)
					)
				if (this.this.this.class.is(ustring)) {
					// ! NOTE: (partially) the same code as in the 'split'; Pray, after further work on it - refactor...
					let currcounter = this.this.this.init()
					let backupcounter = this.this.this.init()
					let hasBroken = false
					const first = useparator.read(useparator.init())

					for (
						;
						!currcounter
							.length()
							.get()
							.compare(this.this.this.length().get());
						currcounter = currcounter.next()
					) {
						if (halt && indexes.length().get().compare(haltAfter)) break
						while (this.this.this.read(currcounter) !== first) continue
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
								this.this.this.read(
									currcounter.jumpForward(backupcounter)
								) !=
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
						backupcounter = this.this.this.init()
						continue
					}
				}
				return indexes
			},
			firstIndex(ustring) {
				const indexes = this.this.this.indexesOf(
					ustring,
					true,
					this.this.this.init().next()
				)
				if (indexes.length().get().compare(this.this.this.init()))
					return indexes.read(this.this.this.init())
				return this.this.this.this.class.template.unfound
			},
			includes: classes.includes,
			// Shall change the entirety of the UnlimitedString's order in such a way, so as to maximize the sizes of the finite Strings that compose the UnlimitedString;
			// * Most memory- and that-from-the-standpoint-of-execution, efficient option;
			order() {
				const newstr = this.this.this.copy()
				let bigind = this.this.this.init()
				let smallind = 0
				for (const x of this.this.this) {
					if (smallind == MAX_STRING_LENGTH) {
						bindind = bindind.next()
						newstr.pushback("")
					}
					newstr.write(bindind, newstr.read(bigind) + x)
				}
				return (this.this.this = newstr)
			},
			// The precise opposite of 'order': minimizes the length of each and every string available within the underlying GeneralArray;
			// * Makes loops and [generally] execution of any manner of loops longer, because native API is not used anymore, less memory efficient option, but allows for a slightly more intuitive underlying 'GeneralArray' [best for representation/reading the unlimited string]; Also - produces more manageable code;
			symbolic() {
				const symstr = this.this.this.this.class()
				for (const sym of this.this.this) symstr.pushback(sym)
				return symstr
			},
			pushback(ustring) {
				if (aliases.is.str(ustring))
					return this.this.this.genarr.pushback(ustring)
				return this.this.this.concat(ustring)
			},
			pushfront(ustring) {
				if (aliases.is.str(ustring)) {
					this.this.this.genarr.pushfront(ustring)
					// ^ IDEA: let all the affecting object's methods return this.this.this! This way, one'll be able to chain them in a declarative style!
					return this.this.this
				}
				return (this.this.this = ustring.copied("concat", [this.this.this]))
			},
			*[Symbol.iterator]() {
				for (const str of this.this.this.genarr) for (const sym of str) yield sym
			},
			suchthat: classes.suchthat,
			any: classes.any,
			every: classes.every,
			forEach: classes.forEach
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
	TrueInteger(template = {}) {
		return {
			// * 'template' has the 'icclass';
			template: { ...template },
			class: function (v = this.template.icclass.class()) {
				return {
					class: this,
					value: v,
					// * Would return added value;
					add(added) {
						return TrueInteger(this.class.template)(
							this.value
								.jumpDirection(added.value.map(this.value.class))
								.map(this.class.template.icclass)
						)
					},
					// * Would return multiplied value
					multiply(multiplied) {
						return multiplied.class.static.whileloop(
							multiplied.value,
							(x) => x.add(this),
							multiplied.value.class.template.icclass.class(),
							undefined,
							undefined,
							this
						)
					},
					// * Raise 'this' to the integer power of 'x' (works with negatives too...);
					power(x) {
						if (!this.class.template.icclass.direction(x))
							return TrueRatio(this.template.icclass).class([
								this.class.template.icclass.class().next(),
								this.power(x.reverse())
							])
						return repeatedApplication((y) => y.multiply(this), x, this)
					},
					// ? This thing could definitely be optimized... [Though, this appears to be far more 'clean' (in this context, equivalent of 'abstracted' and 'pure') as an algorithm... Think on it...]
					// * For starters, one could '.add()' instead of multiplying by an index + use a '.static.while()' method... Pray consder...
					modulo(divided) {
						let i = TrueInteger(this.value.class.template).class(
							this.value.class.template.icclass.class()
						)
						const d = TrueInteger(this.value.class.template).class(
							divided.map(this.value.class.template.icclas)
						)
						while (!d.multiply(i).value.compare(this.value))
							i.value = i.value.next()
						return d.multiply(i).value.difference(this.value)
					},
					// * Would return the additive inverse;
					invadd() {
						// TODO: generalize this operation as a '.static()' - let it be something like 'ICClass-reversal';
						const ICCLASS = this.class.template.icclass.template
						return this.value.map({
							generator(x) {
								if (x === undefined) return ICCLASS.generator()
								return ICCLASS.inverse(x)
							},
							inverse(x) {
								return ICCLASS.generator(x)
							},
							range(x) {
								return ICCLASS.range(x)
							}
						})
					},
					// * Would return a TrueRatio
					invmult() {
						return TrueRatio(this.class.template)(
							this.class.template.icclass.class(),
							this
						)
					}
				}
			}
		}
	},
	TrueRatio(template = {}) {
		const B = {
			// * 'template' has the 'icclass';
			template: { ...template },
			static: {
				simplify(ratio) {
					let x = deepCopy(ratio)
					const l = minfinite(ratio.value)
					for (
						let i = TrueInteger({
							icclass: this.this.template.icclass
						}).class();
						!i.compare(l);
						i.value = i.value.next()
					) {
						// ! generalize this thing in the condititon... [Basically, this is integer-division with rational output (non-simplified, possibly 'x: x.isWhole()');]
						while (
							TrueRatio()
								.class(
									x.value[0],
									this.this.template.icclass.class().next()
								)
								.multiply(TrueRatio().class(i.invmult()))
								.isWhole() &&
							TrueRatio()
								.class(
									x.value[1],
									this.this.template.icclass.class().next()
								)
								.multiply(TrueRatio().class(i.invmult()))
								.isWhole()
						) {
							x.value[0] = TrueRatio()
								.class(
									x.value[0],
									this.this.template.icclass.class().next()
								)
								.multiply(TrueRatio().class(i.invmult())).value[0]
							x.value[1] = TrueRatio()
								.class(
									x.value[1],
									this.this.template.icclass.class().next()
								)
								.multiply(TrueRatio().class(i.invmult())).value[0]
						}
					}
					return x
				}
			},
			class: function (numer, denom) {
				return {
					class: this,
					value: [numer, denom],
					add(addratio) {
						return this.class.simpilfy(
							TrueRatio().class(
								this.value[0]
									.multiply(addratio.value[1])
									.add(addratio.value[0].multiply(this.value[1])),
								this.value[1].multiply(addratio.value[1])
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
						return TrueRatio().class(this.value[0].invadd(), this.value[1])
					},
					invmult() {
						return TrueRatio().class(...this.value.reverse())
					},
					isWhole() {
						return this.class.template.icclass.template.comparison(
							this.value[1],
							this.class.template.icclass.class().next()
						)
					}
				}
			}
		}
		B.static.this = B
		return B
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
// ? QUESTION [Extension of native JS Map]: Does one put this thing under the 'aliases' for a special case of UnlimitedMap?;
export function UniversalMap(template = {}) {
	return {
		template: {
			// ! DECISION: the template properties that are by default 'undefined' still ARE PRESENT; because it allows for things like '.hasOwnProperty' to work in a greater accordance;
			notfound: undefined,
			treatUniversal: false,
			comparison: comparisons.valueCompares,
			...template
		},
		class: function (
			keys = [],
			values = [],
			treatUniversal = this.template.treatUniversal
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
					for (this.index = 0; this.index < this.keys.length; this.index++)
						yield this.get(this.keys[this.index])
				},
				forin(body) {
					for (this.index = 0; this.index < this.keys.length; this.index++)
						body(this.keys[this.index])
				},

				// TODO: create a method for checking if this kind of conversion is valid; 'isValidObject', for instance...
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
	}
}

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

// TODO: implement InfiniteString [the *truly* infinite one, that is...]
export function InfiniteString() {}

// TODO: pray create an actual InfiniteArray implementation [not that of 'UnlimitedArray' - term for special cases of GeneralArray];
export function InfiniteArray() {}

// ? question: does one want to go implementing the 'InfiniteNumber' as well?
