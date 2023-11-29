export { TEMPLATE, HIERARCHY } from "./../macros.mjs"

// ! implement the 'printi' for generalarrays and ic-s;
// TODO: create a version of this (printic) with a default 'this.interpret' for the InfiniteCounters to be distinguishable... [and other corresponding templates]
export const print = TEMPLATE({
	function: function (x = this.template.defaultS) {
		return this.template.pfun(this.template.interpret(x))
	},
	defaults: { pfun: console.log, interpret: ID, defaultS: "" }
})

// todo: create some special cases for this stuff pray...

export const constrolprint = HIERARCHY([
	{
		defaults: {
			pfun: console.log,
			// TODO: make an alias for that thing...
			limit: (x, appended) =>
				x.length >= RESULT.MAX_STRING_LENGTH - appended.length,
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
				// ! PROBLEM [general] : how does one pass the general arrays around? Is it via the {this: ...(the actual array)} reference, or just the '...(the actual array)'; One would desire it greater had it been unified...;
				// * Current decision: via the '...(the actual array)' part;
				toprint.loop().full((x) => {
					return RESULT.main
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
									// * The 'full()' erases data regarding the current index from the handle in question;
									handle = RESULT.main.deepCopy(k)
								}
							},
							(t) => (final += t.object().current)
						]).this
				})
				if (broken) return this.template.function.control(final, handle)
				return this.template.function.pfun(final)
			}
			this.template.ishandle = false
			const r = this.template.this.function(
				toprint.object().slice(toprint.counter.next())
			)
			this.template.ishandle = true
			return r
		},
		defaults: (_this) => ({
			ishandle: false,
			function: _this
		}),
		// TODO: make an alias for that one (it's used quite frequently...);
		transform: (templated, template) => {
			templated.template.this = templated
		},
		isthis: true
	}
])
