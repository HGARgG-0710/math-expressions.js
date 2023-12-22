// * This module provides an export structure-interface for the user to be able to access different parts of the API in accordance with their theme [also - to be able to consider the package in its generality];

import { ID, NOMODULE } from "./macros.mjs"

import * as algorithms from "./exports/algorithms.mjs"
import * as aliases from "./exports/aliases.mjs"
import * as comparisons from "./exports/comparisons.mjs"
import * as counters from "./exports/counters.mjs"
import * as expressions from "./exports/expressions.mjs"
import * as native from "./exports/native.mjs"
import * as numeric from "./exports/numeric.mjs"
import * as orders from "./exports/orders.mjs"
import * as predicates from "./exports/predicates.mjs"
import * as printing from "./exports/printing.mjs"
import * as structure from "./exports/structure.mjs"
import * as types from "./exports/types.mjs"
import * as variables from "./exports/variables.mjs"

export function instance(transformation = ID) {
	// * Module instance Export
	return transformation({
		algorithms: NOMODULE(algorithms),
		aliases: NOMODULE(aliases),
		comparisons: NOMODULE(comparisons),
		counters: NOMODULE(counters),
		expressions: NOMODULE(expressions),
		multidim: NOMODULE(multidim),
		native: NOMODULE(native),
		numeric: NOMODULE(numeric),
		orders: NOMODULE(orders),
		predicates: NOMODULE(predicates), 
		printing: NOMODULE(printing),
		structure: NOMODULE(structure),
		types: NOMODULE(types),
		variables: NOMODULE(variables)
	})
}
