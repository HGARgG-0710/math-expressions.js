// * Tests of 'orders.mjs' source file contents

import {
	linear,
	fixLinear,
	nonlinear,
	most,
	min,
	max,
	fromIcc
} from "../src/modules/exports/orders.mjs"

// ! pick different templates + arguments for this
console.log(linear().function())
console.log(linear().function())
console.log(linear().function())
console.log(linear().function())

// ! Choose different templates, arguments
console.log(fixLinear().function())
console.log(fixLinear().function())
console.log(fixLinear().function())
console.log(fixLinear().function())

// ! Choose different templates and arguments
console.log(nonlinear().function())
console.log(nonlinear().function())
console.log(nonlinear().function())
console.log(nonlinear().function())
console.log(nonlinear().function())
console.log(nonlinear().function())

// ! Choose two different predicates, templates and arrays;
console.log(most().function())
console.log(most().function())

// ! Choose different templates and arrays;
console.log(max().function())
console.log(max().function())
console.log(max().function())

// ! Choose different templates and arrays;
console.log(min().function())
console.log(min().function())
console.log(min().function())

// ! Choose templates, values for arguments...
console.log(fromIcc().function())
console.log(fromIcc().function())
console.log(fromIcc().function())
