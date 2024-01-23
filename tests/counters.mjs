// * Various tests of counters

// ! Refactor this one slightly later...

import { abs } from "../src/modules/exports/aliases.mjs"
import {
	number,
	addnumber,
	multnumber,
	arrayCounter,
	objCounter,
	numberCounter,
	stringCounter,
	circularCounter,
	arrCircCounter,
	finiteCounter
} from "../src/modules/exports/counters.mjs"

const firstN = (n, c, counter) => {
	const f = n >= 0 ? "generator" : "inverse"
	n = abs(n)
	for (let i = 0; i < n; i++) c = counter[f](c)
	return c
}

// const ncounter = number()
// console.log(ncounter)
// console.log()

// const ancounter = addnumber({}, { start: -2 })
// console.log(ancounter)
// console.log(firstN(1000, ancounter.generator(), ancounter))
// console.log()

// const mncounter = multnumber()
// console.log(mncounter)
// const mnth = firstN(1000, mncounter.generator(), mncounter)
// console.log(mnth)
// console.log(mncounter.inverse(mnth))
// console.log()

// const acounter = arrayCounter()
// console.log(acounter)
// const actth = firstN(10000, acounter.generator(), acounter)
// console.log(actth)
// console.log(firstN(-9999, actth, acounter))
// console.log()

// const occounter = objCounter()
// console.log(occounter)
// const och = firstN(100, occounter.generator(), occounter)
// console.log(och)
// console.log(firstN(-98, och, occounter))
// console.log()

const nccounter = numberCounter()
console.log(nccounter)
console.log(firstN(-20, [-(2**53 - 1) + 6], nccounter))
console.log(firstN(-4, nccounter.generator(), nccounter))
console.log(firstN(10, [2 ** 53 - 1, 2 ** 53 - 1], nccounter))
console.log(firstN(40, [-21], nccounter))
console.log()

// const scounter = stringCounter()
// console.log(scounter)
// console.log(firstN(-1000, scounter.generator(), scounter))
// console.log(firstN(200, scounter.generator(), scounter))

// TODO: make more tests specifically for different kinds of flat forms...
// ? Suggestion: generalize forms to flatForms? [So, as to mimic the interfaces for GeneralArray-like behaviour (structure-wise, only)?] Consider it for the v1.1. [along with the Interface(s) introduction]
// const cccounter = circularCounter()
// console.log(cccounter)
// console.log()

// // ! For v1.1. - fix issue with lacking properly generalized finite/infinite user-defined type systems... (and typeConst-basedness...); 
// const accounter = arrCircCounter({ values: [0, 1, 2, "Hello!"] })
// console.log(accounter)
// console.log(accounter.generator())
// console.log(accounter.inverse())
// console.log(firstN(1, accounter.generator(), accounter))
// console.log(firstN(2, accounter.generator(), accounter))
// console.log(firstN(3, accounter.generator(), accounter))
// console.log(firstN(4, accounter.generator(), accounter))
// console.log()

// ^ TESTED SUCCESSFULLY

// const fcounter = finiteCounter()
// console.log()

// ! [AFTER ICCLASS]: counters.cfromIcc
// ! [AFTER TRUEINTEGER]: counters.tintAdditive
// ! [AFTER TRUEINTEGER]: counters.tintMultiplicative
