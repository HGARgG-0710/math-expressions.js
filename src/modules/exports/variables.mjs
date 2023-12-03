// TODO [general]: later, after having finished most of the stuff within the package, pray do minimize the in-imports [namely, don't do things like '* as', instead only importing the stuff necessary]; This file is an brilliant example...
import { RECURSIVE_VARIABLE, VARIABLE } from "./../macros.mjs"
import * as aliases from "./aliases.mjs"
import * as native from "./native.mjs"
import { general } from "./../refactor.mjs"

// ? More methods?
const fdtobj = {
	"+": general.recursiveOperation("+", (a, b) => a + b),
	"-": function (...args) {
		return this.get["+"](
			...(args.length ? [args[0]].concat(args.slice(1).map((x) => -x)) : [])
		)
	},
	"/": function (...args) {
		return args.length >= 2 ? args[0] / this.get["*"](...args.slice(1)) : args[0]
	},
	"*": general.recursiveOperation("*", (a, b) => a * b),
	"**": general.recursiveOperation("**", (a, b) => a ** b),
	"^": general.recursiveOperation("^", (a, b) => a ^ b),
	">>": general.recursiveOperation(">>", (a, b) => a >> b),
	"<<": general.recursiveOperation("<<", (a, b) => a << b),
	"&": general.recursiveOperation("&", (a, b) => a & b),
	"|": general.recursiveOperation("|", (a, b) => a | b),
	"%": general.recursiveOperation("%", (a, b) => a % b),
	"&&": general.recursiveOperation("&&", (a, b) => a && b),
	"||": general.recursiveOperation("||", (a, b) => a || b)
}
export const defaultTable = RECURSIVE_VARIABLE(fdtobj)

export const libPrecision = VARIABLE(16)
export const MAX_ARRAY_LENGTH = VARIABLE(2 ** 32 - 1)
export const MAX_INT = VARIABLE(2 ** 53 - 1)

// ? generalize even further - using the repeatedApplication...;
const ccf = property("concat")
export const defaultAlphabet = VARIABLE(
	ccf("")(
		[
			[48, 9],
			[97, 25],
			[65, 25]
		].map(aliases.exparr(native.string.UTF16))
	)
)

export const MAX_STRING_LENGTH = MAX_INT
