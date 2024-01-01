// * Various tests of counters

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
const nctth = firstN(3, nccounter.generator() , nccounter)
console.log(nctth)
console.log()

// const scounter = stringCounter()
// console.log()

// const cccounter = circularCounter()
// console.log()

// const accounter = arrCircCounter()
// console.log()

// const fcounter = finiteCounter()
// console.log()

// ! [AFTER ICCLASS]: counters.cfromIcc
// ! [AFTER TRUEINTEGER]: counters.tintAdditive
// ! [AFTER TRUEINTEGER]: counters.tintMultiplicative
