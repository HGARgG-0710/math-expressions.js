// * Various integer-related algorithms tests

import {
	allFactors,
	areCoprime,
	factorOut,
	isPrime,
	multiples,
	multiplesBefore,
	primesBefore,
	lcm,
	lcd,
	isPerfect,
	factorial,
	binomial,
	sumRepresentations,
	inative as native
} from "../src/modules/exports.mjs"

import { testmultcases as tmc, testOn } from "./test.mjs"

const usual = {
	allFactors,
	areCoprime,
	factorOut,
	isPrime,
	multiples,
	multiplesBefore,
	primesBefore,
	lcm,
	lcd,
	isPerfect,
	factorial,
	binomial,
	sumRepresentations
}

const f = (isnative = false) => (isnative ? native : usual)

// ! Create an alias for this array (consider arrays of elementary items of the native JS typesystem for inclusion into the library, operations on them - as well...);
tmc([false, true].map(f), (scope) => {
	// ! Add templates' list (change it depending on the 'scope'?);
	tmc([], (t) => {
		// ! Add arguments...
		testOn(
			scope,
			[
				"factorOut",
				"isPrime",
				"primesBefore",
				"multiples",
				"multiplesBefore",
				"lcm",
				"lcd",
				"areCoprime",
				"allFactors",
				"isPerfect",
				"factorial",
				"binomial",
				"sumRepresentations"
			],
			[],
			t
		)
	})
})
