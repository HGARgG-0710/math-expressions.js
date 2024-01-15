// * Tests of 'BindableFunction' export

import { native } from "../src/modules/exports/aliases.mjs"
import { BindableFunction } from "../src/modules/exports/types.mjs"
import { FUNCTION } from "./../src/modules/macros.mjs"
import { refCompare } from "../src/modules/exports/comparisons.mjs"
import { testmultcases as tmc, test } from "./test.mjs"

const f = FUNCTION.function(function () {
	return this
})

const abc = [{}, { ch: 455 }, { tutu: true }]
const fabc = [f.bind(abc[0])]
abc.slice(1).forEach((x, i) => fabc.push(fabc[i - 1].bind(x)))
const isF = (o) => (d) => refCompare(d(), o)

for (const x in abc) test(isF(abc[x]), [fabc[x]])
for (let i = 0; i < fabc.length; i++)
	test((y) => refCompare((i > 0 ? fabc[i] : f).origin, y), [fabc[i].origin])

const isClass = (c) => (f) => refCompare(f.class, c)
const sameOrigin = (a, b) => refCompare([a, b].map((x) => x.origin))
const sameThis = (a, b) => refCompare([a, b].map((x) => x.this))

// ! Create different test contexts, argument lists and classes...;
const contexts = [{}, {}, {}]
const args = [[], [], []]
const classes = [{}, {}, {}]

// ! Add the templates array...
tmc([], (t) => {
	const bfc = BindableFunction(t).function
	test(native.function.const(bfc))

	// ! Add a function...
	const f = bfc.function()
	// ! Add a function + 'this' context...
	const tf = bfc.function()
	tmc([t, tf], (x) => test(isClass(bfc), [x]))

	// ! Create a definition for context 'c'
	const c = {}

	const _f = f.bind(c)
	test(sameOrigin, [_f, f])
	test(_f)

	// ! ADD arguments this time...
	const _farg = f.bind(c)
	test(sameOrigin, [_farg, f])
	test(sameThis, [_farg, f])
	test(_farg)

	// ! ADD arguments this time...
	const _farr = f.bindArr(c)
	test(sameOrigin, [_farr, f])
	test(_farr)

	// ! ADD arguments this time...
	const _fargarr = f.bindArr(c)
	test(sameOrigin, [_fargarr, f])
	test(sameThis, [_fargarr, f])
	test(_fargarr)

	for (i of contexts.keys()) {
		test(f.apply, [contexts[i], args[i]])
		test(f.call, [contexts[i], ...args[i]])

		const fclass = f.switchclass(classes[i])

		test(native.function.const(fclass.class))
		test(sameClass(fclass), [f])
	}

	test(f.toString)
	test(_f.toString)
})
