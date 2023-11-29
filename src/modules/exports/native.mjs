import { TEMPLATE, HIERARCHY } from "./../macros.mjs"

// ? [name...] How about something related to 'native': RESULT.main.native? One'd also add more of the functions for it ('transfer' them from the 'aliases.native', for they are too large to qualify as aliases...);
// ? Make the list of keys for the object containing the copying methods more flexible? [Create a way for the user to map the default ones to the ones that they desire instead?]
export const copy = TEMPLATE({
	defaults: {
		objdefmeth: ID,
		arrdefmeth: ID,
		// TODO: make an alias for this...
		defcontext: () => ({})
	},
	function: function (
		arrmeth = this.template.arrdefmeth,
		ometh = this.template.objdefmeth,
		dcontext = this.template.defcontext
	) {
		return {
			array: (a, method = arrmeth) => a.map(method),
			object: (a, method = objmeth) => objFmap(a, method),
			function: (a, context = dcontext()) => a.bind(context),
			symbol: (a) => Symbol(RESULT.aliases.trim(7)(RESULT.aliases.str(a))),
			arrayFlat: (a) => [...a],
			objectFlat: (a) => ({ ...a })
		}
	}
})

// TODO: find the definition for the general _switch() from a different library of self's, place in this one, then use here...
export const copyFunction = TEMPLATE({
	defaults: { list: [] },
	function: function (a) {
		// TODO: do something about that inner one; shouldn't be there...
		// ^ IDEA [for a solution]: create a function for generation of functions like such based off objects [for instance: switch-case-like ones (objects, that is)!];
		function typeTransform(x) {
			if (x === "array" || x === "arrayFlat") return (p) => p instanceof Array
			if (x === "objectFlat") return (p) => typeof p === "object"
			return (p) => typeof p === x
		}
		for (const x of this.template.list)
			if (typeTransform(x)(a))
				return RESULT.main.copy().function()[x](a, this.function)
		return a
	}
})

// * Copies an object/array deeply...
native.deepCopy = RESULT.main.copyFunction({
	list: ["array", "object", "function", "symbol"]
})

// * Keeps the functions references intact whilst copying...
native.dataCopy = RESULT.main.copyFunction({
	list: ["array", "object", "symbol"]
})

// * Does a flat copy of something;
native.flatCopy = RESULT.main.copyFunction({
	list: ["arrayFlat", "objectFlat", "function", "symbol"]
})
