// * Tests of 'BindableFunction' export
import { BindableFunction } from "../src/modules/exports/types.mjs"

const f = BindableFunction(function () {
	return this
})

const a = {}
const b = { ch: 455 }
const c = { tutu: true }

const fa = f.bind(a)
const fb = fa.bind(b)
const fc = fb.bind(c)

console.log(fa() === a)
console.log(fb() === b)
console.log(fc() === c)
console.log(f.origin === fa.origin && fa.origin === fb.origin && fb.origin === fc.origin)
