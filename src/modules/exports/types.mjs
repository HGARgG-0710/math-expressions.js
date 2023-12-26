// * The (presently) largest most essential part of the library - the types definitions;

import * as aliases from "./aliases.mjs"
import * as comparisons from "./comparisons.mjs"
import * as variables from "./variables.mjs"
import * as counters from "./counters.mjs"
import * as algorithms from "./algorithms.mjs"
import * as native from "./native.mjs"
import * as predicates from "./predicates.mjs"

import { general, classes } from "../refactor.mjs"
import { CLASS, TEMPLATE, EXTENSION, DEOBJECT, OFDKL } from "../macros.mjs"
import { StaticThisTransform } from "../refactor.mjs"

// ^ IDEA: create a class 'Comparable', which would be set by means of the orders and (consequently), can be converted to 'InfiniteCounter'; This way, one would be able to create InfiniteCounters from '.compare' orders!
export const InfiniteCounter = (() => {
	// * Note: a minor 'trick' about the entire thing is that the value that is assigned to 'template.unacceptable' is thrown out of the function's value scopes [because that is the value from which it starts to count]; However, there are several ways of going around it. One is also replacing the value for the 'template.initialcheck';
	return CLASS({
		defaults: {
			comparison: comparisons.valueCompare,
			unacceptable: undefined,
			initialcheck: comparisons.refCompare,
			...counters.arrayCounter()
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
			// ? do the thing with the first n 'conditional' arguments - that being, if length of passed args array is 'n<k', where 'k' is maximum length, then the first 'k-n' recieve prescribed default values
			whileloop(
				end,
				each,
				start = this.this.class(),
				iter = (x) => x.next(),
				comparison = (x, y) => x.compare(y),
				init = undefined
			) {
				let curr = start.copy()
				let r = init
				while (comparison(curr, end)) {
					r = each(curr, r)
					curr = iter(curr)
				}
				return curr
			},
			reverse() {
				const _this = this
				return InfiniteCounter({
					generator(x) {
						if (x === undefined) return _this.this.template.generator()
						return _this.this.template.inverse(x)
					},
					inverse: this.this.template.generator
				})
			},
			zero: classes.zero,
			one: classes.one,
			two: classes.two,
			none() {
				return this.zero().previous()
			}
		},
		methods: {
			next: function () {
				// * An observation: this is one of the ways to be able to reference a function from within itself...
				return this.this.this.this.class.class(
					this.this.this.this.class.template.generator(this.this.this.value)
				)
			},
			previous: function () {
				return this.this.this.this.class.class(
					this.this.class.template.inverse(this.this.this.value)
				)
			},
			direction() {
				return this.this.this.this.class.static.direction(this)
			},
			compare(ic, comparison = this.this.this.this.class.template.comparison) {
				ic = ic.map(this.this.this.this.class)

				let pointerfor = ic
				let pointerback = ic

				while (
					!comparison(pointerfor, this.this.this) &&
					!comparison(pointerback, this.this.this)
				) {
					pointerfor = pointerfor.next()
					pointerback = pointerback.previous()
				}

				return comparison(pointerfor, this.this.this)
			},
			difference(ic, comparison = this.this.this.this.class.template.comparison) {
				const next = aliases.property(
					ic.compare(this.this.this, comparison) ? "previous" : "next"
				)
				this.this.this.this.class.static.whileloop(
					this.this.this.copy(),
					(current) => next(current)(),
					ic,
					(x) => next(x)(),
					comparison,
					this.this.this.this.class.class()
				)
				return current
			},
			jumpDirection(
				ic,
				comparison = this.this.this.this.class.template.comparison
			) {
				return this.this.this.this.class.static.direction(ic)
					? this.this.this.jumpForward(ic, comparison)
					: this.this.this.jumpBackward(ic)
			},
			jump(x, jumping = (k) => k.next(), counterclass = this.this.this.this.class) {
				return this.this.this.this.class.static.whileloop(
					x,
					jumping,
					counterclass.class(),
					jumping,
					undefined,
					deepCopy(this.this.this)
				)
			},
			loop(body = () => {}, start = this.this.this.this.class.class()) {
				return this.this.this.this.class.static.whileloop(
					this.this.this,
					body,
					start,
					undefined,
					undefined,
					undefined
				)
			},
			// ? Question: does one really want the 'comparison' to hang out like that?
			jumpForward(x, comparison = this.this.this.this.class.template.comparison) {
				return this.jump(x, (a) => a.next(), comparison)
			},
			jumpBackward(x, comparison = this.this.this.this.class.template.comparison) {
				return this.jump(x, (k) => k.previous(), comparison)
			},
			map(
				icClass = this.class,
				comparison = this.this.this.this.class.template.comparison
			) {
				let current = this.this.this.this.class.class()
				let alterCurrent = icClass.class()
				while (!comparison(current, this.this.this))
					alterCurrent = alterCurrent.next()
				return alterCurrent
			},
			reverse() {
				const REVERSED = this.this.this.this.class.static.reverse()
				let revres = REVERSED.class()
				this.loop(() => revres.next())
				return revres
			},
			copy() {
				return this.this.this.this.class.class(this.this.this.value)
			},
			equal(x) {
				return this.compare(x) && x.compare(this)
			},
			*[Symbol.iterator]() {
				const predicate = this.direction()
					? predicates.lesser
					: predicates.greater
				const change = this.direction() ? (x) => x.next() : (x) => x.previous()
				for (
					let i = this.this.this.this.class.class();
					predicate(this);
					i = change(i)
				)
					yield i
			},
			zero() {
				return this.this.this.this.class.static.zero()
			},
			one: classes.one,
			two: classes.two
		},
		recursive: true
	})
})()

export const GeneralArray = (() => {
	return CLASS({
		defaults: {
			empty: [],
			unfound: undefined,
			treatfinite: false,
			fast: false,
			default: aliases._const(undefined),
			icclass: general.DEFAULT_ICCLASS,
			comparison: comparisons.refCompare
		},
		properties: {
			array: function (array = this.template.empty) {
				return this.template.treatfinite ? this.static.fromArray(array) : array
			},
			currindex: function (_arr, startindex = this.template.icclass.class()) {
				return startindex
			}
		},
		transform: StaticThisTransform,
		static: (() => {
			const R = {
				zero() {
					return this.this.template.icclass.static.zero()
				},
				one() {
					return this.zero().next()
				},
				two() {
					return this.one().next()
				},
				empty(template = this.this.template) {
					return this.this.class(template).class()
				},
				// TODO: look through the GeneralArray code looking for places this thing might get used handily... (Just like in the '.appendfront()' case...);
				fromArray(arr) {
					const generalized = this.empty()
					for (const a of arr) generalized.pushback(a)
					return generalized
				},
				fromCounter(counter) {
					const narr = this.empty()
					counter.loop(() => narr.pushback(this.this.class.template.default()))
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
							icclass: this.this.this.this.class.template.icclass,
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
				go(index = this.init()) {
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
				moveforward(
					index = this.init(),
					begin = false,
					// ! Fix the '.comparison' argument for this thing, pray...
					comparison = this.this.this.this.class.template.icclass.template
						.comparison,
					stop = (x) => comparison(x.length().get().next(), x.currindex)
				) {
					return this.move(
						index,
						(args, x) => {
							if (begin) x.currindex = x.init()
						},
						comparison,
						(x) => x.next(),
						stop
					)
				},
				movebackward(
					index = this.init(),
					end = false,
					comparison = this.this.this.this.class.template.icclass.template
						.comparison,
					stop = (x) => comparison(x.init(), x.currindex)
				) {
					return this.move(
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
					init = false,
					comparison,
					stop = (x) => comparison(x.init(), x.currindex)
				) {
					return this.this.this.currindex.compare(index)
						? this.moveforward(
								index,
								init,
								comparison,
								stop || ((x) => comparison(x.currindex, x.length().get()))
						  )
						: this.movebackward(
								index,
								init,
								comparison,
								stop || ((x) => comparison(x.currindex, x.init()))
						  )
				},
				jump(index, comparison) {
					return (this.this.this.currindex =
						this.this.this.currindex.jumpDirection(index, comparison))
				},
				read(
					index = this.init(),
					fast = this.this.this.this.class.template.fast
				) {
					return general.fix([this.this.this], ["currindex"], () => {
						if (fast) this.go(index)
						else this.moveforward(index, true, fast)
						return this.currelem().get()
					})
				},
				write(index, value) {
					return general.fix([this.this.this], ["currindex"], () => {
						if (fast) this.go(index)
						else this.moveforward(index, true)
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
						set: (value) => {
							if (this.object().length().get().equal(value)) return
							return this.length().get().compare(value)
								? this.deleteMult(
										this.init(),
										this.length()
											.get()
											.jumpDirection(
												this.length().get().difference(value)
											)
								  )
								: this.concat(
										this.this.this.this.class.static.fromCounter(
											this.length().get().difference(value)
										)
								  )
						}
					}
				},
				copied: classes.copied,
				pushback(value) {
					return this.write(this.length().get(), value)
				},
				pushfront(x) {
					this.this.this = this.this.this.this.class.static
						.fromArray([x])
						.concat(this)
					return this
				},
				concat(array = this.empty()) {
					return array.loop()._full(
						this.pushbackLoop({
							arguments: []
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
						: this.this.this.this.class.template
				) {
					const copied = this.empty()
					copied.class = isclass
						? template
						: { ...copied.class, template: { ...template } }
					this.loop()._full(
						copied.pushbackLoop({
							transform: f,
							arguments: []
						}).function
					)
					return copied
				},
				delval(value) {
					const x = this.this.this.firstIndex(value)
					if (!(x === this.this.this.template.unfound)) return this.delete(x)
					return this
				},
				slice(begin = this.init(), end = this.finish()) {
					// TODO: generalize [add the corresponding argument to the methods and employ it] the uses of the 'this.this.this.empty'... in accordance with the newly created implementation...
					const sliced = this.empty()
					this.loop()._full(
						sliced.pushbackLoop({
							arguments: []
						}).function,
						undefined,
						_const((t) => end.compare(t.object().currindex)),
						(t) => {
							t.object().begin()
							t.object().go(begin)
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
				*[Symbol.iterator]() {
					for (
						let c = this.init();
						!c.compare(this.length().get());
						c = c.next()
					)
						yield this.read(c)
				},
				// ? refactor using the other GeneralArray methods;
				// * Do it using '.project() + InfiniteCounter.difference() + repeat()...';
				// Sketch: 'this.this.this.projectComplete(index, this.this.this.static.fromArray([value]).repeat(this.this.this.length().get().difference(index)))'
				fillfrom(index, value) {
					const indexsaved = this.this.this.currindex
					this.go(index)
					while (!comparison(this.this.this.currindex, this.finish())) {
						this.currelem().set(value)
						this.next()
					}
					this.this.this.currindex = indexsaved
					// * It must always return 'this', not 'this.this.this';
					return this
				},
				convert(template = this.this.this.this.class.template) {
					return (this.this.this = this.copy(ID, false, template))
				},
				// * NOTE: the difference between this thing and the '.convert' is the fact that '.switchclass' is capable of preserving "reference-connections" of different objects to the same one object class's instance;
				switchclass(arrclass = this.this.this.this.class) {
					return (this.this.this = this.copy(ID, true, arrclass))
				},
				swap(i, j) {
					const ival = this.read(i)
					this.write(i, this.read(j))
					this.write(j, ival)
					return this
				},
				delete(index = this.finish()) {
					return this.deleteMult(index, index)
				},
				deleteMult(startindex, endindex = startindex) {
					const x = this.copied("slice", [endindex.next()], undefined)
					return this.slice(this.init(), startindex.previous()).concat(x)
				},
				projectComplete(array, index) {
					const _index = this.this.this.currindex
					array.loop()._full(
						(t) => {
							// TODO: refactor this as well - some '.currwriteLoop(value, fast, comparison)', or something...
							this.write(
								this.this.this.currindex,
								t.object().currelem().get()
							)
						},
						_const((x) => {
							x.object().next()
							this.next()
						}),
						undefined,
						(x) => {
							x.object().begin()
							this.go(index)
						},
						(_x) => {
							// ! Problem : generally , one might want to implement a sort of a multi-array loop function [so that the 'index' could be changed and then restored for multiple of them...]...
							// * Problem with this is this '.loop' is attached to one array and one don't seem to want to generalize it much further than that...
							// ? Where to stick it? Should it be a '.static'? Or ought one take it out of the GeneralArray completely???
							this.this.this.currindex = _index
						}
					)
				},
				projectFit(array, index) {
					general.fix([array], ["currindex"], () => {
						this.loop()._full(
							(t) => {
								t.object().write(
									t.object().currindex,
									array.currelem().get()
								)
								array.next()
							},
							undefined,
							(x) =>
								x.object().this.class.template.isEnd(x.object()) ||
								array.this.class.template.isEnd(array),
							(t) => t.object().go(index)
						)
					})
					return this
				},
				insert(index, value) {
					const x = this.copied(
						"slice",
						[undefined, index.previous()],
						undefined
					)
					x.pushback(value)
					x.concat(this.copied("slice", [index], undefined))
					this.this.this = x
					return this
				},
				index(i = this.init()) {
					return this.read(i)
				},
				indexesOf(x, halt = false, haltAfter = Infinity) {
					// ! ISSUE - with 'THIS'-passing: it must be passed via 'this.this', and also with 'A = {[classref]: {...}, this: {this: A, ...}}' more generally; This way, one won't have to worry about the contexting...;
					return algorithms.array
						.indexesOf({ halt: halt, haltAfter: haltAfter })
						.function(this, x)
				},
				firstIndex(x) {
					return algorithms.search.linear().function(this, x)
				},
				shiftForward(times) {
					const x = this.this.this.this.class.static.fromCounter(times)
					this.this.this = x.concat(this.this.this)
					return this
				},
				shiftBackward(times = this.init()) {
					return this.slice(times, undefined)
				},
				repeat(
					times = this.init(),
					icclass = this.this.this.this.class.template.icclass
				) {
					// TODO: ration the usage of these throughout the code - namely, get rid of all the places that they aren't necessary...
					const newarr = this.empty()
					icclass.static.whileloop(icclass.class(), times, () =>
						newarr.concat(this)
					)
					this.this.this = newarr
					return this
				},
				reverse() {
					const reversedArr = this.empty()
					this.loop()._full(
						reversedArr.pushfrontLoop({
							arguments: []
						}).function
					)
					this.this.this = reversedArr
					return this
				},
				map(
					f = id,
					template = this.this.this.this.class.template,
					isclass = false
				) {
					this.this.this = this.copy(f, template, isclass)
					return this
				},
				isEmpty(isend = this.this.this.this.class.template.isEnd) {
					return general.fix([this.this.this], ["currindex"], () => {
						this.begin()
						return isend(this)
					})
				},
				sort(predicate) {
					this.this.this = algorithms.sort
						.merge({
							predicate
						})
						.function(this.this.this)
					return this
				},
				isSorted(predicate) {
					return comparison(
						this.this.this,
						this.copied("sort", [predicate], undefined)
					)
				},
				includes: classes.includes,
				suchthat: classes.suchthat,
				any: classes.any,
				every: classes.every,
				forEach: classes.forEach,
				intersection: function (arr = this.empty()) {
					this.this.this = algorithms.array.intersection().function(this, arr)
					return this
				},
				permutations: function () {
					return algorithms.array.permutations({
						genarrclass: this.this.this.this.class
					})(this)
				},
				// For an array of arrays only;
				join: function () {
					this.this.this = algorithms.array.join().function(this)
					return this
				},
				strjoin: function (separator = "") {
					return UnlimitedString(this.this.this.this.class)
						.function()
						.class(this.copy(aliases.str, undefined, undefined))
						.join(separator)
				},
				// ? Generalie the '.split' functions? [Using a predicate and an 'algorithms.array' submodule algorithm may the haps?]
				split: function (separator) {
					const farr = this.empty()
					let prev = this.init()
					for (const x of this.keys())
						if (comparison(separator, this.read(x))) {
							farr.pushback(this.copied("slice", [prev, x]))
							prev = x
						}
					this.this.this = farr
					return this
				},
				splitlen: function (length = this.length().get()) {
					let arrs = this.empty()
					let currarr = this.copy()
					while (currarr.length().get().compare(length)) {
						arrs.pushback(currarr.copied("slice", [this.init(), length]))
						currarr.slice(length)
					}
					return arrs.pushback(currarr)
				},
				splice(index, times = this.init().next()) {
					const c = this.copy()
					this.this.this = c
						.slice(c.init(), index.previous())
						.concat(this.slice(index.jumpDirection(times)))
					return this
				},
				one() {
					return this.init().next()
				},
				two: classes.two
			}
			// ? Destructurize this further?
			OFDKL(
				X,
				(name) =>
					function () {
						return (this.this.this.currindex =
							this.this.this.currindex[name]())
					},
				["next", "previous"]
			)
			OFDKL(
				X,
				(name) =>
					function (template = {}) {
						const origin =
							this.this.this.this.class.static[`push${name}Loop`](template)
						const T = {
							template: {
								target: this,
								...origin.template
							}
						}
						T.function = origin.function.bind(T)
						return T
					},
				["front", "back"]
			)
			return X
		})(),
		recursive: true,
		isthis: true
	})
})()

// ! Refactor those heavily...; Also, consider the optimizations matter...
// ? Question: does one want to allow the user to tweak the minimum implementation details for this one, pray?
export const arrays = {
	LastIndexArray(template = {}, garrtemplate = {}) {
		const A = {
			template: {
				icclass: general.DEFAULT_ICCLASS,
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
			icclass: A.template.icclass,
			...garrtemplate
		})
		return A
	},
	// * Note: this one requires another GeneralArray class to be used;
	DeepArray(template = {}, garrtemplate = {}) {
		// ? Is this a form (like in 'structure.mjs')? If so, do generalize...
		// ! Refactor this - add as a common expression for the 'structure.mjs' lib module...;
		const IDENTIFIER = {}
		const ARRFORM = (x = []) => ({ arr: x, TOKEN: IDENTIFIER })
		const isArr = (arr) => arr.TOKEN === IDENTIFIER
		const X = {
			template: {
				icclass: InfiniteCounter(counters.numberCounter()),
				maxlen: variables.MAX_ARRAY_LENGTH.get,
				genarrclass: general.DEFAULT_GENARRCLASS,
				filling: null,
				...template
			},
			class: GeneralArray({
				empty: ARRFORM(),
				newvalue: function (array, value) {
					let e = this.elem(array, true)
					if (e[0] == undefined) {
						if (e[0] === null) {
							const flayer = firstUnfilledLayer(array.array)
							if (flayer) {
								let p = array.array
								for (const x of flayer) p = p[x].arr
								p.push(value)
								return value
							}
						}

						for (const y of e[1].previous())
							general.fix([array], ["currindex"], () => {
								array.currindex = array.currindex.jumpBackward(
									e[1].previous().jumpBackWard(y)
								)
								this.newvalue(array, X.template.filling)
							})
					}
					return (e[0][e[1]] = value)
				},
				elem(array, pointer = false) {
					let i = array.init()
					let fi = 0
					let prevarrs = arrays.LastIndexArray().class()
					let currarray = array.array
					for (; !i.compare(array.currindex); fi++) {
						if (currarray === array.array && fi === array.array.arr.length) {
							const rx = array.currindex.difference(i)
							return [rx.equal(array.init().next()) ? null : undefined, rx]
						}
						const isfibelow = fi < currarray.length
						if (isfibelow) {
							while (isArr(currarray.arr[fi])) {
								prevarrs.pushback(currarray)
								currarray = currarray.arr[fi]
								continue
							}
							i = i.jumpForward(
								aliases.native.number.fromNumber(
									native.number.min([
										this.this.template.maxlen,
										currarray.arr.length
									])
								)
							)
						}
						fi = isfibelow ? fi : 0
						currarray = prevarrs.read(prevarrs.finish())
						prevarrs.delete()
					}
					return pointer ? [[currarray, fi]] : [[currarray[fi]]]
				},
				isEnd(array) {
					return this.elem(array)[0] == undefined
				},
				icclass: this.template.icclass,
				...garrtemplate
			})
		}

		// ! ISSUE [GENERAL]: generalize the multidim API to work with structures;
		// ? Suggestion: generalize, then merge the newly made 'multidim' into 'structure'? (they'd go along excellently)
		function firstUnfilledLayer(
			arrform,
			indexes = X.template.genarrclass.static.empty()
		) {
			for (const x in arrform.arr) {
				if (arrform.arr[x].length < X.template.maxlen) return indexes
				const rrec = firstUnfilledLayer(
					arrform.arr[x],
					indexes.copied("pushback", [x])
				)
				if (rrec) return rrec
			}
			return false
		}

		return X
	},
	CommonArray(template = {}, garrtemplate = {}) {
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
				...garrtemplate
			})
		}
	},
	// * This thing will allow to create function-based types on top of an Array;
	// Usage Example 1: use the 'typefunction' as a mean of identifying if the 'type' of the thing is right, with 'typefail' defined as a result of .newval(+typeconversion);
	// Usage Example 2: in 'typefail', throw an Exception, whilst in typefunction, do whatever it is one desires to do with the pre-checking of elements' properties;
	TypedArray: CLASS({
		defaults: {
			empty: [],
			typefunction: aliases._const(true)
		},
		function: function (array = C.template.empty) {
			const X = this
			return GeneralArray({
				...this.template,
				newvalue: function (arr, val) {
					if (X.template.typefunction(val)) return X.template.newval(arr, val)
					return X.template.typefail(arr, val)
				}
			}).class(array)
		}
	})
}

export function UnlimitedMap(parentclass = general.DEFAULT_GENARRCLASS) {
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
					: this.this.this.this.class.template
			) {
				return this.this.this.this.class.class(
					this.this.this.keys.copy(f, isclass, template),
					this.this.this.values.copy(f, isclass, template)
				)
			},
			copied: classes.copied,
			map(
				f = ID,
				isclass = false,
				template = isclass
					? this.this.this.this.class
					: this.this.this.this.class.template
			) {
				this.this.this = this.copy(f, isclass, template)
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

export function UnlimitedString(parent = general.DEFAULT_GENARRCLASS) {
	// TODO: refactor the cases like such - when there is EXACTLY the same function used in two or more places, but the difference is in the '.'-spaces;
	// ! THIS IS BROKEN! Pray fix the thing so that it could work based of the passed 'icclass' and not instance of UnlimitedString;
	return EXTENSION({
		defaults: {
			parentclass: parent,
			empty: "",
			names: ["genarr"],
			unfound: undefined,
			basestr: " "
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
								useparator.tototalindex()
							)
						) {
							// ! ISSUE [general]: with the passed instances of recursive classes - decide which parts of them are to be passed, how they should be read, and so on...
							// * Current decision: by the 'this.this.this->.class' part... [the inner, that is...];
							if (
								this.read(currcounter.jumpForward(backupcounter)) !=
								useparator.read(backupcounter)
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
				let final = this.init()
				for (const x of this.this.this.genarr
					.copied("slice", [this.init(), ind.previous()])
					.keys())
					final = final.jumpForward(
						aliases.native.number.fromNumber(genarr.read(x).length)
					)
				return final.jumpForward(
					aliases.native.number.fromNumber().function(subind)
				)
			},
			finish: classes.finish,
			go(index) {
				const nind = this.fromtotalindex(index)
				this.this.this.genarr.currindex = nind[0]
				this.this.this.currindex = nind[1]
				return this
			},
			fromtotalindex(index) {
				let present = this.init()
				let inarrind = this.init()
				let currstr = ""
				for (const x of this.genarr.copy((str) =>
					aliases.native.number.fromNumber(str.length)
				)) {
					inarrind = inarrind.next()
					currstr = x
					present = present.jumpForward(x)
					if (present.compare(index)) break
				}
				return [
					inarrind,
					currstr.length -
						present.difference(index).map(
							// ! make an alias for that thing (generally, so that there is a way for shorthand of an reverse-conversion...);
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
			// TODO: generally - perform all the required 'InfiniteCounter.map's! DO NOT ASSUME THAT THE THING PASSED IS THE INFINITECOUNTER OF THE CORRESPONDING CLASS, ONLY ASSUME IT IS ___A___ COUNTER...;
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
					algorithms.array.native.generate(2).map(aliases._const("currindex")),
					() => {
						this.go(index)
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
					set: (
						newlen,
						basestr = this.this.this.this.class.template.basestr[0]
					) => {
						if (newlen.compare(this.length().get())) {
							newlen
								.difference(this.length().get())
								.loop(() => this.pushback(basestr))
							return this
						}

						return this.slice(this.init(), newlen.previous())
					}
				}
			},
			copied: classes.copied,
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
				),
				order = false
			) {
				const r = this.this.this.genarr.empty()
				let inserted = this.init()
				let cfreq = frequency(inserted)
				for (let i = this.init(); !i.compare(this.length().get()); i = i.next()) {
					r.pushback(this.read(i))
					if (
						this.this.this.this.class.template.tintclass.static
							.fromCounter(i.next())
							.modulo(cfreq)
							.equal(
								this.this.this.this.class.template.tintclass.static.zero()
							)
					) {
						r.pushback(separator)
						inserted = inserted.next()
						cfreq = frequency(inserted)
					}
				}
				this.this.this = (order ? (x) => x.order() : ID)(r)
				return this
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
				return this.split("").genarr.sort.merge().function(predicate)
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
				if (this.this.this.this.class.is(ustring)) {
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
								useparator.tototalindex()
							)
						) {
							if (
								this.read(currcounter.jumpForward(backupcounter)) !=
								useparator.read(backupcounter)
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
				const symstr = this.this.this.this.class.class()
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
	TrueInteger: (function (parentclass = general.DEFAULT_ICCLASS) {
		return EXTENSION({
			defaults: {
				parenclass: parentclass,
				names: ["value"]
			},
			methods: {
				add(added = this.one()) {
					return this.this.this.this.class.class(
						this.this.this.value.jumpDirection(added.value)
					)
				},
				multiply(multiplied = this.one()) {
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
				power(x = this.one()) {
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
				modulo(d = this.one()) {
					let curr = this.this.this.this.class.class()
					while (!(curr = curr.add(d)).compare(this.this.this.value)) {}
					return curr.difference(this.this.this)
				},
				// * Returns the additive inverse
				invadd() {
					return this.this.this.this.class(
						this.value.map(this.class.template.icclass.static.reverse()).value
					)
				},
				// * Returns the multiplicative inverse (TrueRatio type);
				invmult() {
					return TrueRatio(this.this.this.this.class)(
						this.this.this.this.class.static.one(),
						this.this.this
					)
				},
				compare(compared = this.zero()) {
					return this.this.this.value.compare(compared.value)
				},
				difference(d = this.one()) {
					return this.this.this.add(d.invadd())
				},
				// ? Generalize the 'divide' and 'roots'-kinds of methods to a uniform template-method 'inverse'? [GREAT IDEA!]
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
					return this.this.this.this.class.class(
						native.copy.deepCopy(this.this.this.value.value)
					)
				},
				equal(x = this.one()) {
					return (
						this.this.this.value.compare(x.value) &&
						x.value.compare(this.this.this.value)
					)
				},
				// ? NOT AWFULLY EFFICIENT - find a more time and memory-efficient way of computing the (floor/ceil)(xroot(this));
				root(x = this.two(), ceil = false) {
					let r = this.this.this.this.class.class()
					let temp
					while (!(temp = r.power(x)).compare(this)) r = r.add()
					if (temp.equal(this) || ceil) return r
					return r.difference()
				},
				zero() {
					return this.this.this.this.class.static.zero()
				},
				one: classes.oneadd,
				two: classes.twoadd
			},
			static: {
				// ! PROBLEM [general]: the CLASS and EXTENSION do __not__ currently handle templates in the '.static' field! Pray do something about it...
				// ? Allow for '.static' extension?
				fromNumber: function (num = 1) {
					return this.this.class(
						aliases.native.number.iterations({
							iterated: this.this.template.parentclass.template
						})(num)
					)
				},
				fromCounter: function (ic) {
					return number.TrueInteger(ic.class)(ic.value)
				},
				zero: classes.zero,
				one: classes.oneadd,
				two: classes.twoadd
			},
			transform: StaticThisTransform,
			recursive: true,
			toextend: []
		})
	})(),
	TrueRatio: function (parentclass = general.DEFAULT_TINTCLASS) {
		const nameslist = ["numerator", "denomenator"]
		return EXTENSION({
			defaults: {
				parentclass: parentclass,
				names: nameslist,
				inter: aliases.cdieach,
				defaults: {
					constructor: number.native.generate(2).map(function () {
						return this.template.parentclass.static.one()
					})
				}
			},
			methods: {
				add(addratio = this.this.this.this.class.static.one()) {
					return this.this.this.this.class.static.simplified(
						this.this.this.this.class.class(
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
				multiply(multratio = this.this.this.class.static.one()) {
					return this.this.this.this.class.class(
						this.numerator.multiply(multratio.numenator),
						this.denomenator.multiply(multratio.denomenator)
					)
				},
				invadd() {
					return this.this.this.this.class.class(
						this.this.this.numerator.invadd(),
						this.this.this.denomenator
					)
				},
				invmult() {
					return this.this.this.this.class.class(
						...nameslist.map((x) => this.this.this[x]).reverse()
					)
				},
				isWhole() {
					return this.this.this.denomenator.equal(
						this.this.this.this.class.template.parentclass.static.one()
					)
				},
				copy() {
					return this.this.this.this.class.class(
						...nameslist.map((x) => this.this.this[x])
					)
				},
				naivesum(ratio = this.this.this.this.class.class()) {
					return this.this.this.this.class.class(
						...nameslist.map((x) => this.this.this[x].add(ratio[x]))
					)
				},
				// ? Wonder - how about allowing for extended-methods of this general form [using the parent class variable instances list];
				equal(ratio = this.this.this.this.class.class()) {
					return nameslist.every((x) => this.this.this[x].equal(ratio[x]))
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

export const InfiniteArray = CLASS({
	defaults: {
		index: ID
	},
	properties: {
		f: function (arrfunc = this.template.index) {
			return arrfunc
		}
	},
	methods: {
		read: function (i = this.class.template.icclass.class()) {
			return this.f(i)
		},
		// ? Question: make 'index' separate from '.read' - get rid of the default values for it? [To allow for usage of 'undefined' in the counters used?];
		index: function (i) {
			return this.read(i)
		},
		write(i, v) {
			const x = this.f
			this.f = function (I) {
				if (I.equal(i)) return v
				return x(I)
			}
			return this
		},
		subarr(predicate = aliases.TRUTH) {
			x = this.f
			this.f = function (i = this.class.template.icclass.class()) {
				let subind = this.class.template.icclass.class()
				let fi = this.class.template.icclass.class()
				while (!subind.equal(i)) {
					if (predicate(x(i), i)) subind = subind.next()
					fi = fi.next()
				}
				return this.f(fi)
			}
			return this
		},
		copy() {
			return this.class.class(this.f)
		},
		copied: classes.copied,
		map(g) {
			const x = this.f
			this.f = function (i) {
				return g(x(i))
			}
			return this
		},
		slice(inind, enind) {
			const genarr = this.class.template.genarrclass.static.empty()
			for (let i = inind; !i.compare(enind); i = i.next())
				genarr.pushback(this.f(i))
			return genarr
		},
		init() {
			return this.class.template.genarrclass.init()
		}
	},
	recursive: false
})
// ? Replace such 'parentclass'-function definitions with simple 'const X = (parentclass) => ...'?
export function InfiniteString(parentclass = general.DEFAULT_INFARR, ensure = false) {
	const _class = EXTENSION({
		defaults: {
			parentclass: parentclass,
			ustrclass: general.DEFAULT_USTRCLASS,
			names: ["infarr"],
			deff: aliases._const(true),
			defaults: {
				inter: function (f = this.template.deff) {
					return (i) => aliases.str(f(i))
				}
			}
		},
		methods: {
			copy() {
				return this.this.this.this.class.class(this.this.this.infarr.f)
			},
			copied: classes.copied,
			// ! if 2nd missing, let end be equal to 'beg';
			slice(beg = this.init(), end) {
				let c = beg
				const r = this.this.this.this.class.template.ustrclass.class()
				for (; predicates.lesser(c, end); c = predicates.next(c))
					r.pushback(this.read(c))
				return
			}
		},
		recursive: false,
		toextend: ["init", "subarr", "read", "index"]
	})
	// ! VERY GENERAL ISSUE [possibly for v1.1]: methods that behave equivalently structurally, but using alternative names/implementations for similar methods/terms/ideas. Create a mean for generalizing the method lists for them, perhaps, refactor such cases hardcorely.
	return (
		ensure
			? (x) =>
					predicates.Ensurer(x, undefined, {
						// ! Not efficient - wastes a single '.write' call; (If just used the EXTENSION, this wouldn't happen...); But using EXTENSION means (largely), using exactly the same code;
						// ? work on EXTENSION to allow for compact wrappers for methods of derived class, like here;
						write: function (_tr, thisarg, args) {
							return thisarg.write(args[0], aliases.str(args[1]))
						},
						map: function (_tr, thisarg, _args) {
							return thisarg.map(aliases.str)
						}
					})
			: ID
	)(_class)
}
// ? Dear, there's still lots of things to do. Take out of v1.0, again? 
export function InfiniteNumber(parentclass = general.DEFAULT_INFARR) {
	return EXTENSION({
		defaults: [
			function () {
				return {
					parentclass: parentclass,
					names: ["infarr"],
					icclass: general.DEFAULT_ICCLASS,
					tintclass: general.DEFAULT_TINTCLASS
				}
			},
			function () {
				return {
					base: this.template.icclass.static.two(),
					wrapper: this.template.tintclass.class.fromCounter,
					defaults: {
						inter: function (f = ID) {
							return (i) => this.template.wrapper(f(i))
						}
					}
				}
			}
		],
		methods: {
			// ! Note: they must be in the same base! Create a function for changing the base of an InfiniteNumber;
			add(inum = this.class.class()) {
				const x = this.f
				const y = inum.f
				this.f = function (index = this.init()) {
					const prev = index.equal(this.init())
						? aliases.native.boolean.btic(
								predicates.greater(
									x(index.next()).add(y(index.next())),
									this.template.base
								),
								this.class.template.icclass
						  )
						: this.template.tintclass.static.zero()
					return x(index).add(y(index)).modulo(this.template.base).add(prev)
				}
				return this
			}
			// * Methods list:
			// ! 1. THINK ABOUT HOW TO GENERALLY TACKLE THE COMPUTATION OF ADDITIVE INVERSES OF SUCH THINGS...
			// % 2. multiply(in): THINK ABOUT THIS ONE ESPECIALLY INTENTLY...
		},
		recursive: false,
		isthis: true
	})
}

export function TreeNode(parentclass = general.DEFAULT_GENARRCLASS) {
	return EXTENSION({
		defaults: {
			parentclass: parentclass,
			names: ["children"],
			defaults: {
				inter: function (args, _i, instance) {
					return [
						args[0].copy((x) =>
							this.class(
								this.template.parentclass.static.empty(),
								x,
								instance
							)
						)
					]
				}
			},
			defaultnode: undefined,
			unfound: undefined
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
			getall(nodes = true) {
				const transform = nodes ? (x) => x.node : ID
				const f = this.this.this.this.class.template.parentclass.static.fromArray(
					[transform(this.this.this)]
				)
				for (const x of this.this.this.children) {
					f.pushback(transform(x))
					f.concat(x.getall(nodes))
				}
				return f
			},
			getpart(beg, end) {
				return this.this.this.this
					.class(this.this.this.children.copied("slice", [beg, end]), undefined)
					.getall()
					.slice([this.this.this.children.init().next()])
			},
			// ! Generalize these (see, '.pushfront' and '.pushback') kinds of methods [both for the 'TreeNode' and the CLASSes in 'macros.mjs'];
			pushback(v) {
				this.this.this.children.pushback(
					this.this.this.this.class.class(undefined, v, this)
				)
				return this
			},
			pushfront(v) {
				this.this.this.children.pushfront(
					this.this.this.this.class.class(undefined, v, this)
				)
				return this
			},
			firstIndex(v) {
				return this.indexesOf(v, true, this.init().next())
			},
			indexesOf(v, halt = false, haltAfter = Infinity) {
				if (this.this.this.children.isEmpty())
					return comparison(this.this.this.node, v)
						? this.this.this.children.empty()
						: false
				const indexes = this.this.this.children.empty()
				for (x of this.this.this.children) {
					const ci = indexes.read()
					const r = x.indexesOf(ci.copied("slice", [this.init().next()]))
					if (r) indexes.concat(r.pushfront(ci))
				}
				return (halt ? (x) => x.slice(this.init(), haltAfter.previous()) : ID)(
					indexes
				)
			},
			copy(
				f = ID,
				isclass = false,
				template = isclass
					? this.this.this.this.class.template.parentclass
					: this.this.this.this.class.template.parentclass.template
			) {
				// ! Issue - should one copy the 'node' value as well? [One ought at least allow the option...];
				return this.this.this.this.class.class(
					this.this.this.this.children.copy(
						function (x) {
							return f(x.node, ...arguments)
						},
						isclass,
						template
					),
					this.this.this.node,
					this.this.this.root
				)
			},
			copied: classes.copied,
			map(
				f = ID,
				isclass = false,
				template = isclass
					? this.this.this.this.class.template.parentclass
					: this.this.this.this.class.template.parentclass.template
			) {
				this.this.this = this.copy(f, isclass, template)
				return this
			},
			insert(multindex, v) {
				if (
					multindex.length().get().equal(this.this.this.children.init().next())
				) {
					this.this.this.children.insert(
						multindex.read(),
						this.this.this.this.class.class(undefined, v, this)
					)
					return this
				}
				this.this.this.children
					.read(multindex.read())
					.insert(multindex.slice(multindex.init().next()), v)
				return this
			},
			delval(v) {
				return this.this.this.children.delval(v, {
					comparison: (x, y) => comparison(x.node, y)
				})
			},
			prune(multindex) {
				if (
					multindex.length().get().equal(this.this.this.children.init().next())
				) {
					this.this.this.children.delete(multindex.read())
					return this
				}
				this.this.this.children
					.read(multindex.read())
					.prune(multindex.slice(multindex.init().next()), v)
				return this
			},
			*[Symbol.iterator]() {
				for (const x of this.keys()) yield this.read(x)
			},
			*keys() {
				for (const x of this.getall().keys()) yield x
			},
			// This one's especially useful for things like NTreeNode (due to 'multi' and known indicies distribution...);
			read(
				index = this.this.this.children.init(),
				multi = false,
				nodes = true,
				first = true
			) {
				if (first) index = index.copy()
				if (!multi) return this.getall(nodes).read(index)
				const r = this.this.this.children.read(index.read())
				if (index.length().get().compare(index.init().next().next()))
					return r.read(index.slice(index.init().next()), multi, nodes, false)
				return (nodes ? (x) => x.node : ID)(r)
			},
			findRoots(v) {
				return this.indexesOf(v).map((x) => this.read(x).root)
			},
			depth() {
				// ! use this one with a somewhat greater frequency;
				if (this.this.this.children.isEmpty())
					return this.this.this.children.init()
				// ! problem here is the default 'uevaluate' table, which doesn't currently have any predefined operations on the infinite Counters (add them, pray...);
				return this.this.this.children
					.init()
					.next()
					.jumpForward(
						expressions.uevaluate(
							expressions.Expression(
								"jumpForward",
								this.this.this.this.class.parentclass.static.empty(),
								this.this.this.children.copy((x) => x.depth())
							)
						)
					)
			},
			// ! Allow for non-multiindex arguments here as well!
			write(mindex, value) {
				if (mindex.length().get().equal(mindex.init().next()))
					return this.this.this.children.write(
						mindex.read(),
						this.this.this.this.class.class(
							this.this.this.this.class.template.parentclass.static.empty(),
							value,
							this.this.this
						)
					)
				return this.this.this.children
					.read(mindex.read())
					.write(mindex.slice(mindex.init().next()), value)
			},
			// ? Generalize?
			findAncestors(x) {
				const froots = this.this.this.children.empty()
				let currroots = this.findRoots(x)
				while (!currroots.every((x) => x === null)) {
					currroots = currroots.copy((x) => this.findRoots(x))
					froots.concat(currroots)
				}
				return froots
			},
			commonAncestors(values) {
				return algorithms.array
					.common({ f: (x) => this.findAncestors(x) })
					.function(values)
			},
			swap(ind1, ind2, multi = false) {
				const n1val = this.read(ind1, multi)
				this.write(ind1, this.read(ind2, multi))
				this.write(in2, n1val)
				return this
			}
		},
		static: {
			// ? Suggestion [idea]: write a (static) 'multitoflat' method implementation for conversion of GeneralArray multiindexes to flat InfiniteCounter indexes?
		},
		recursive: true
	})
}

export function UnlimitedSet(parentclass = general.DEFAULT_GENARRCLASS) {
	return EXTENSION({
		defaults: {
			parentclass: parentclass,
			names: ["genarr"],
			defaults: {
				inter: function (genarr = this.template.genarrclass.static.empty()) {
					return [genarr.copied("suchthat", [predicates.allUnique])]
				}
			}
		},
		methods: {
			ni(el) {
				return this.includes(el)
			},
			add(el) {
				if (!this.includes(el)) this.this.this.genarr.pushback(el)
				return this
			},
			delete(el) {
				return this.this.this.genarr.delval(el)
			},
			copy(
				f = ID,
				isclass = false,
				template = isclass
					? this.this.this.this.class
					: this.this.this.this.class.template
			) {
				return this.this.this.this.class.class(
					this.this.this.genarr.copy(f, isclass, template)
				)
			},
			copied: classes.copied
		},
		recursive: true,
		// ? Consider whether this remains empty, or some things get to be added here after all...
		toextend: ["includes"]
	})
}

export const InfiniteSet = (template = {}) => {
	const x = InfiniteArray.function(template).class()
	const y = x.copy()
	return y.subarr((el, i) => !x.slice(x.init(), i.previous()).includes(el))
}

// * These are to allow work with 'Array'-based forms and unite them with GeneralArray-based ones (note: I know it's considered a horrible practice);
Array.prototype.read = function (index) {
	return this[index]
}
Array.prototype.copy = function (f = ID, thisarg = this) {
	return a.map(f, thisarg)
}
