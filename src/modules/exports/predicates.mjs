// * This sourcefile possesses aliases for the commonly used elementary predicates' generalizations (allow for greater simplification of the code);

import * as aliases from "./aliases.mjs"
import * as orders from "./orders.mjs"
import { general } from "../refactor.mjs"

// ! Extend this - refactor the library hardcorely in the sense of repeating expressions and distribute all the appropriate ones in here;

// ! use these four a lot...
export const greateroe = (a, b) => a.compare(b)
export const lesseroe = (a, b) => greateroe(b, a)
export const lesser = (a, b) => !greateroe(a, b)
export const greater = (a, b) => lesser(b, a)

export const next = (x) => x.next()
export const inc =
	(a = 1) =>
	(x) =>
		x + a
export const dec =
	(a = 1) =>
	(x) =>
		x - a

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
	out: aliases.native.boolean.n
}).function
export const TRUTH = aliases.native.function.const(true)
export const T = TRUTH
export const FALLACY = aliases.native.function.const(false)
export const F = FALLACY
export const VOID = aliases.native.function.void

// * Ensures the 'heap' property upon a given tree;
// TODO: rewrite the previous parts of the library in such a way so as to use this... [namely, algorithms.heaps]
export const ensureHeap = (
	tree,
	predicate,
	comparison = tree.class.template.parentclass.template.comparison
) => {
	const node = tree.node
	const most = orders
		.most({ predicate: predicate })
		.function(tree.children.copied("pushfront", tree.node))
	if (!comparison(node, most)) {
		tree.node = most
		tree.children.write(tree.children.firstIndex(most), node)
	}
	for (const c of tree.children) ensureHeap(c)
	return tree
}

export const ensureSet = (genarr = general.DEFAULT_GENARRCLASS.static.empty()) => {
	return genarr.copied("suchthat", [predicates.allUnique])
}
