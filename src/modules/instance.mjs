// ^ MARVELOUS IDEA: create methods for creation of methods via 'String/UnlimitedString' patterns + 'eval'; This'll work in any interpreted JS environments that impelement this function accordingly...
import { ID, NOMODULE } from "./macros.mjs"

import * as algorithms from "./exports/algorithms.mjs"
import * as aliases from "./exports/aliases.mjs"
import * as comparisons from "./exports/comparisons.mjs"
import * as counters from "./exports/counters.mjs"
import * as expressions from "./exports/expressions.mjs"
import * as multidim from "./exports/multidim.mjs"
import * as native from "./exports/native.mjs"
import * as numeric from "./exports/numeric.mjs"
import * as orders from "./exports/orders.mjs"
import * as printing from "./exports/printing.mjs"
import * as statistics from "./exports/statistics.mjs"
import * as structure from "./exports/structure.mjs"
import * as types from "./exports/types.mjs"
import * as variables from "./exports/variables.mjs"

// ! PROBLEM: with the native JS 'getters/setters' - namely, the fact that their copying methods seem to differ from the simple good-old '.bind': one ought to create more of the various copying functions for this stuff...
// * SOLUTION: replace all the places where they appear with a '.get()/.set() interface...';
// ^ IDEA: generalize the interface to a macro;

// TODO [generally]: make a one whole new round regarding the workability of the code, when having finished the generalization procedures, fix everything, tune everything totally...

// ? Where to move it? [This is an alias..., to aliases...];
export const StaticThisTransform = (templated, template) => {
	templated.static.this = templated
}

// ? PROBLEM [general]: The user is not able to meaningfully call the '.methods' as they are;

// ? Make a template itself?
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
		printing: NOMODULE(printing),
		statistics: NOMODULE(statistics),
		structure: NOMODULE(structure),
		types: NOMODULE(types),
		variables: NOMODULE(variables)
	})
}
