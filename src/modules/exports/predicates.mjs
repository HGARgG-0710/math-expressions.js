// * This sourcefile possesses aliases for the commonly used elementary predicates' generalizations (allow for greater simplification of the code);
// ! Extend this - refactor the library hardcorely in the sense of repeating expressions and distribute all the appropriate ones in here; 

// ! use these four a lot...
// ! use the aliases even in the aliases definitions... Refactor very greatly indeed...
export const lesser = (a, b) => !a.compare(b)
export const greater = (a, b) => !b.compare(a)
export const lesseroe = (a, b) => b.compare(a)
export const greateroe = (a, b) => a.compare(b)

export const allUnique = (el, _key, _arr, subset) => !subset.includes(el)
