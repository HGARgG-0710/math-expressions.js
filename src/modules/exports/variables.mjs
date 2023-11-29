import { VARIABLE } from "./../macros.mjs"
import * as aliases from "./aliases.mjs"

// ? Add more stuff here? (This table was originally supposed to be like a small calculator for binary things...)
// TODO: change the architecture of these tables -- they should contain information concerning the Arity of the stuff that is within them...
// * That is one's solution to the problem of the "all functions that work with them currently support only binary operations..., et cetera"
// TODO: use this thing as the default for the functions using these kinds of tables...
export const defaultTable = VARIABLE({
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
})

/**
 *
 * * This variable characterizes how many fixed numbers are outputted.
 * * You can change it freely using setPrecision() function, if you want a more "precise" output of some of the functions.
 */
// ? create various numeric constants within the library (besides, some of ones functions' definitions may use it;)...
// ! Make this thing more useful - when using unlimited types, use it to the full extent...
export const globalPrecision = VARIABLE(16)
export const MAX_ARRAY_LENGTH = VARIABLE(2 ** 32 - 1)
export const MAX_INT = VARIABLE(2 ** 53 - 1)

const UTF16 = aliases.native.string.UTF16

// TODO: generalize even further - using the repeatedApplication...;
const ccf = property("concat")
const coorarrs = [
	[48, 9],
	[97, 25],
	[65, 25]
]
// TODO: create the alias for mapping arrays to functions as arguments' lists...;
// * alias sketch [alias-re-link pray...]: (f) => (a) => f(...a);
export const defaultAlphabet = VARIABLE(ccf([])(coorarrs.map((a) => UTF16(...a))))

export const MAX_STRING_LENGTH = MAX_INT
