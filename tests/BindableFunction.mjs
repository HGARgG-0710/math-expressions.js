// * Tests of 'BindableFunction' export
// import { BindableFunction } from "../src/modules/exports/types.mjs"
import { FUNCTION } from "./../src/modules/macros.mjs"

const f = FUNCTION.function(function () {
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


// ! To test (BindableFunction methods, further progress): 
// * 1. bind (with arguments, this time...): 
// * 2. binArr (repeat the stuff for bind, but with Arrays); 
// * 3. apply (repeat call, but with arrays); 
// * 4. call - new functions (2-3), different 'this' contexts; 
// * 5. switchclass - create new BindableFunction instances with a certain class, then change their class...; 
// * 6. toString - call for various methods a couple of times...