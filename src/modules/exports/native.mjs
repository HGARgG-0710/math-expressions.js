// * Algorithms and definitions regarding the native (finite) JS types;
// % note: largely reworked from the old library code...

// TODO [for the v1.1.]: using 'forms', generalize ALL the object- and array-algorithms that are generalizable using it.

export {
	copy,
	nanumber as number,
	object,
	naarray as array,
	string,
	finite
} from "./../../lib.mjs"
