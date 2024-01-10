// * Tests of 'BindableFunction' export

import { BindableFunction } from "../src/modules/exports/types.mjs"
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

// ! Add the templates array...
const templates = []

for (const t of templates) {
	const bfc = BindableFunction(t).function
	console.log(bfc)

	// ! Add a function...
	const f = bfc.function()
	// ! Add a function + 'this' context...
	const tf = bfc.function()

	console.log(bfc === f.class)
	console.log(bfc === tf.class)

	// ! Create a definition for context 'c'
	const c = {}

	const _f = f.bind(c)
	console.log(_f.origin === f.origin)
	console.log(_f())

	// ! ADD arguments this time...
	const _farg = f.bind(c)
	console.log(_farg.origin === f.origin)
	console.log(_farg.this === f.this)
	console.log(_farg())

	// ! ADD arguments this time...
	const _farr = f.bindArr(c)
	console.log(_farr.origin === f.origin)
	console.log(_farr())

	// ! ADD arguments this time...
	const _fargarr = f.bindArr(c)
	console.log(_fargarr.origin === f.origin)
	console.log(_fargarr.this === f.this)
	console.log(_fargarr())

	// ! Create different test contexts, argument lists and classes...;
	// TODO [general]: refactor the tests, pray...
	const contexts = [{}, {}, {}]
	const args = [[], [], []]
	const classes = [{}, {}, {}]

	for (i of contexts.keys()) {
		console.log(f.apply(contexts[i], args[i]))
		console.log(f.call(contexts[i], ...args[i]))
		const fclass = f.switchclass(classes[i])

		console.log(fclass.class)
		console.log(fclass.class === f.class)
	}

	console.log(f.toString())
	console.log(_f.toString())
}
