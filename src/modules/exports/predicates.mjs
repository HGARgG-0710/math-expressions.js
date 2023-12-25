// * This sourcefile possesses aliases for the commonly used elementary predicates' generalizations (allow for greater simplification of the code);

import * as aliases from "./aliases.mjs"

// ! Extend this - refactor the library hardcorely in the sense of repeating expressions and distribute all the appropriate ones in here;

// ! use these four a lot...
export const greateroe = (a, b) => a.compare(b)
export const lesseroe = (a, b) => greateroe(b, a)
export const lesser = (a, b) => !greateroe(a, b)
export const greater = (a, b) => lesser(b, a)

export const next = (x) => x.next()

export const allUnique = (el, _key, _arr, subset) => !subset.includes(el)

export const Ensurer = (_class, predicate = T, responses = {}) => {
	const X = {}
	for (const m of _class.methods)
		X[m] = function (...args) {
			const tempr = _class.methods[m].bind(this)(...args)
			if (predicate(tempr, this) && aliases.hasFunction(responses, m))
				return responses[m].bind(this)(tempr, this, args)
			return tempr
		}
	return { ..._class, methods: X }
}

// ^ IDEA [for a future project]: JSpace - a package for alias and function namespaces from various programming languages implementations (they'd work in an exactly the same fashion, but work in JavaScript);
export const negate = wrapper({
	out: aliases.n
}).function
export const TRUTH = native.function._const(true)
export const T = TRUTH
export const FALLACY = native.function._const(false)
export const F = FALLACY
export const VOID = native.function.void
