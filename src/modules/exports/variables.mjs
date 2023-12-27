// TODO [general]: later, after having finished most of the stuff within the package, pray do minimize the in-imports [namely, don't do things like '* as', instead only importing the stuff necessary]; This file is an brilliant example...
import { RECURSIVE_VARIABLE, VARIABLE } from "./../macros.mjs"
import * as aliases from "./aliases.mjs"
import * as native from "./native.mjs"
import { general } from "./../refactor.mjs"

// ? More methods? [later, maybe...]
export const deftable = RECURSIVE_VARIABLE({
	"+": general.recursiveOperation("+", aliases.native.binary.add),
	"-": function (...args) {
		return this.get["+"](
			...(args.length ? [args[0]].concat(args.slice(1).map((x) => -x)) : [])
		)
	},
	"/": function (...args) {
		return args.length >= 2 ? args[0] / this.get["*"](...args.slice(1)) : args[0]
	},
	"*": general.recursiveOperation("*", aliases.native.binary.mult),
	"**": general.recursiveOperation("**", aliases.native.binary.power),
	"^": general.recursiveOperation("^", aliases.native.binary.xor),
	">>": general.recursiveOperation(">>", aliases.native.binary.rshift),
	"<<": general.recursiveOperation("<<", aliases.native.binary.lshift),
	"&": general.recursiveOperation("&", aliases.native.binary.and),
	"|": general.recursiveOperation("|", aliases.native.binary.or),
	"%": general.recursiveOperation("%", aliases.native.binary.modulo),
	"&&": general.recursiveOperation("&&", aliases.native.binary.dand),
	"||": general.recursiveOperation("||", aliass.native.binary.dor)
})
export const udeftable = RECURSIVE_VARIABLE({
	"+": general.recursiveOperation("+", (a, b) => a.add(b)),
	"-": function (...args) {
		return this.get["+"](
			...(args.length ? [args[0]].concat(args.slice(1).map((x) => x.invadd())) : [])
		)
	},
	// ! the '/' division must return a TrueRation-al value;
	"#": function (...args) {
		return (args.length >= 2 ? (x) => x.divide(this.get["*"](...args.slice(1))) : ID)(
			args[0]
		)
	},
	"*": general.recursiveOperation("*", (a, b) => a.multiply(b)),
	"**": general.recursiveOperation("**", (a, b) => a.power(b)),
	"%": general.recursiveOperation("%", (a, b) => a.modulo(b))
})

export const libPrecision = VARIABLE(16)
export const MAX_ARRAY_LENGTH = VARIABLE(2 ** 32 - 1)
export const MAX_INT = VARIABLE(2 ** 53 - 1)

const ccf = property("concat")
export const defaultAlphabet = VARIABLE(
	ccf("")(
		[
			// 0-9
			[48, 9],
			// a-z
			[97, 25],
			// A-Z
			[65, 25]
		].map(aliases.native.function.exparr(native.string.UTF16))
	)
)

export const MAX_STRING_LENGTH = MAX_INT
