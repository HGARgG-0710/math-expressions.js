// * Space for macros and local constants... [used for semantics and simplification of development/code-reading];

// TODO: improve the macros (make them general as well...); Consider self-using the package...;
// ? In particular - later create a General versions of macros (using unlimited types...);
// ? In particular more - create later the 'returnless' versions [namely, the 'infinite stack' function];

// TODO [general]: make a total safe-check for ALL the methods/macros/functions/classes regarding anything concerning parameter values [default values, the transformations used, alternative values and the way that they behave collectively...];
// TODO [general]: think further (and more deeply) on the matter of the publicity of the structure that is presented to the user by the results of the various macros;

export {
	ID,
	TYPED_VARIABLE,
	VARIABLE,
	RECURSIVE_VARIABLE,
	NAMED_TEMPLATE,
	READONLY,
	TEMPLATE,
	INHERIT,
	EXTENSION,
	NOREST,
	PRECLASS,
	CLASS,
	DEOBJECT,
	OBJECT,
	NOMODULE, 
	FUNCTION
} from "../lib.mjs"
