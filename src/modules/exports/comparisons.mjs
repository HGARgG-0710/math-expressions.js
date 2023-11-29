import { TEMPLATE } from "./../macros.mjs"

// * A useful algorithm from a different project of mine; value-wise comparison of two arbitrary things...
//
// ! [2]: with the currently chosen solution for the handling of the function arguments;
// * It's not good. For this sort of thing, one ought instead compare the ASTs of the functions in question;
// TODO: once having implemented the JSONF and parser libraries for the 1.1 or 1.2 release of the library, pray
// TODO [additionally; maybe, if it's implementable...] - use the UnlimitedString for this stuff... [problem is that the seemingly only way to obtain the code of a function from within the code itself is via '.toString()', which returns the native JS string instead of the UnlimitedString];

// ? Seemingly fixing the problem regarding the infinitely recursive (self-referential) objects?
// * [pray check for it additionally later...];
export const valueCompare = TEMPLATE({
	defaults: {
		oneway: false
	},
	function: function (...args) {
		function TWOCASE(oneway = false, objs = []) {
			return (a, b) => {
				if (typeof a !== typeof b) return false
				switch (typeof a) {
					case "object":
						if (
							!RESULT.max(
								objs.map(
									// TODO: create a nice function-alias for 'f(...) && g(...)'; [so that it may be used with the other ones]
									(x) => x[0].includes(a) && x[0].includes(b)
								)
							)
						) {
							objs.push([a, b])
							for (const a_ in a)
								if (!TWOCASE(false, objs)(b[a_], a[a_])) return false
							if (!oneway) return TWOCASE(true)(b, a)
						}
						return true
					case "function":
						return String(a) === String(b)
					case "symbol":
						return a.toString() === b.toString()
					default:
						return a === b
				}
			}
		}
		return !!RESULT.aliases.native.min(
			args
				.slice(0, args.length - 1)
				.map((x, i) => TWOCASE(this.template.oneway)(x, args[i + 1]))
		)
	}
})

export const refCompare = (a, b) => a === b
export const oldCompare = (a, b) => a == b
