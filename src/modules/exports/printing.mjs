import { general } from "../refactor.mjs"
import * as types from "./types.mjs"

export { TEMPLATE, HIERARCHY } from "./../macros.mjs"

// ! implement the 'printi' for generalarrays and ic-s;
// TODO: create a version of this (printic) with a default 'this.interpret' for the InfiniteCounters to be distinguishable... [and other corresponding templates]
export const print = TEMPLATE({
	function: function (x = this.template.defaultS) {
		return this.template.pfun(this.template.interpret(x))
	},
	defaults: { pfun: console.log, interpret: ID, defaultS: "" }
}).function()

// todo: create some special cases for this stuff pray...

export const constrolprint = HIERARCHY([
	{
		defaults: {
			pfun: console.log,
			// TODO: make an alias for that thing...
			limit: (x, appended) => x.length >= MAX_STRING_LENGTH - appended.length,
			// * By default, will finish the printing of the thing using the function chosen [REGARDLESS OF SIZE!];
			control: function (current, loophandle) {
				this.pfun(current)
				return this.this.function({ ishandle: true }).function(loophandle)
			}
		},
		transform: (templated, template) => {
			templated.template.this = templated
			templated.template.defstr = templated.template.ustrclass("")
			templated.template = { ...templated, ...template }
			return templated
		}
	},
	{
		function: function (toprint = this.template.function.defstr) {
			if (!this.template.ishandle) {
				let final = ""
				let broken = false
				let handle = null
				toprint.loop().full((x) => {
					return types
						.CommonArray()
						.class({ treatfinite: true })
						.class([
							(k) => {
								if (
									this.template.function.limit(
										final,
										x.object().current
									)
								) {
									k.break()
									broken = true
									// * Without copying, the 'full()' erases data regarding the current index from the handle in question;
									handle = deepCopy(k)
								}
							},
							(t) => (final += t.object().current)
						]).this
				})
				if (broken) return this.template.function.control(final, handle)
				return this.template.function.pfun(final)
			}
			return general.fix([this.template], ["ishandle"], () => {
				this.template.ishandle = false
				return this.template.this.function(
					toprint.object().slice(toprint.counter.next())
				)
			})
		},
		defaults: function () {
			return {
				ishandle: false,
				function: this
			}
		},
		// TODO: make an alias for that one (it's used quite frequently...);
		transform: (templated) => {
			templated.template.this = templated
		},
		isthis: true
	}
])
