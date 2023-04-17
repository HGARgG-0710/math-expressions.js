/**
 * * This is the New API source code, version pre-1.0;
 * @copyright HGARgG-0710 (Igor Kuznetsov, 2023)
 */
// TODO: add all sorts of nice programming-language-related constants here... They'd be useful in different projects;
// * From now on, the math-expressions.js library doesn't anymore include only what it had included before...
// * Now, it's also including constants about different things, that may be useful
// TODO: add all the corresponding constants for all these languages too; for CPP -- add type-specific, for each compiler, architecture...
// TODO: also, separate onto versions (where relevant;)...
// * Currently, this thing ain't very descriptive; though, it's a wonderful idea...
// ? decide what to do with this ? Should this truly be kept, and if, then how ordered and managed?
// ! On one hand, one has that these things tend to be implementation-specific (and one wouldn't like to just add constants that 'happen' to be the same as these things);
// * On the other, some of this stuff would be quite useful when dealing with various limitations of different tools and programmatically getting rid of them (like with InfiniteCounter, for instance)...
// ? what should one do? as to the numberCounter's use of it, one could simply add an in-library constant that would be used (then, perhaps, make it smaller, to make more independent of how the used JavaScript's implementation work in particular?)...
export const constants = {
	js: {
		MAX_ARRAY_LENGTH: 2 ** 32 - 1,
		MAX_NUMBER: Number.MAX_VALUE,
		MAX_INT: 2 ** 53 - 1,
		MIN_INT: -(2 ** 53 - 1),
		MIN_NUMBER: 2 ** -1074,
		MAX_STRING_LENGTH: 2 ** 53 - 1,
		MAX_VARIABLE_NAME_LENGTH: 254
	},
	cpp: {
		MAX_ARRAY_LENGTH: Infinity,
		MAX_VARIABLE_NAME_LENGTH: 255
	},
	java: {
		MAX_ARRAY_LENGTH: 2 ** 31 - 1,
		MAX_VARIABLE_NAME_LENGTH: 64
	},
	python: {
		MAX_INT: Infinity,
		MIN_INT: -Infinity,
		MAX_VARIABLE_NAME_LENGTH: 79
	},
	lua: {
		MAX_VARIABLE_NAME_LENGTH: Infinity
	},
	c: {
		MAX_VARIABLE_NAME_LENGTH: Infinity
	}
}

export * as types from "./modules/types.mjs"
export * as util from "./modules/util.mjs"