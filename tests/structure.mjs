// * Tests of methods from 'structure.mjs' source file

import { addnumber } from "../src/modules/exports/counters.mjs"
import { InfiniteCounter } from "../src/modules/exports/types.mjs"
import { array } from "../src/modules/exports/native.mjs"
import { native } from "../src/modules/exports/aliases.mjs"
import { propertyForm } from "../src/modules/exports/structure.mjs"
import { arrElems } from "../src/modules/exports/structure.mjs"
import { multtests as mt } from "./test.mjs"

const outval = (x) => console.log(x.map(InfiniteCounter(addnumber())).value)

// ^ Note: the 'structure' tests are done only for the methods that do not (already) get an in-library test...;
// ^ Note: the 'arrElems', 'nonArrElems' are a special case of 'countrecursive', hence one does not need to worry about them...; Also - 'totalElems'
// ^ Note: the 'repeatedApplicationWhilst' was not tested (because of simplicity)...

// ! Note: one sees little sense in conducting thorough testing of 'forms', due to their (as of present) immaturity;

const testForm = propertyForm(
	"Good day to you now, did a stranger exclaim!",
	[],
	(x, f) => x.map(f),
	(x, i) => x[i],
	(x, i, v) => (x[i] = v),
	array.keys,
	undefined,
	native.function.const(0),
	(x) => x.length
)

mt(
	arrElems({ form: testForm }),
	[
		[testForm.new(["Hello!", [], [], [], testForm.new([])])],
		[testForm.new([testForm.new([testForm.new([testForm.new([])])])])]
	],
	[],
	outval
)
