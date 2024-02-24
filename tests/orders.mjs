// * Tests of 'orders.mjs' source file contents

import { array } from "../src/modules/exports/algorithms.mjs"
import * as aliases from "../src/modules/exports/aliases.mjs"
import { arrays, InfiniteCounter } from "../src/modules/exports/types.mjs"
import { linear, fixLinear, nonlinear, fromIcc } from "../src/modules/exports/orders.mjs"
import { numberCounter, stringCounter } from "../src/modules/exports/counters.mjs"

import { test, multtests as mt } from "./test.mjs"

const outarr = (x) => console.log(x.array)

const { LastIndexArray } = arrays
const genarrclass = LastIndexArray()

const lintestgarrays = [
	genarrclass.static.fromArray([1234, "faelum", true]),
	genarrclass.static.fromArray(["#ffffff", "#12cafa", "#443399"])
]

mt(
	linear,
	lintestgarrays.map((x) => [x]),
	[false, true].map((x) => ({
		reflexive: x
	})),
	(x) => console.log(x.toString())
)
mt(
	(e1, e2, f) => {
		test(f, [e1, e2])
		test(f, [e2, e1])
		test(f, [e1, e1])
	},
	lintestgarrays.map((x, i) => [
		x.read(
			aliases.native.number
				.fromNumber({ icclass: x.class.template.icclass })
				.function(i)
		),
		x.read(
			aliases.native.number
				.fromNumber({ icclass: x.class.template.icclass })
				.function(i + 1)
		),
		linear({ reflexive: !!i }).function(x)
	]),
	[],
	aliases.id
)
const fixlingarrays = [
	genarrclass.static.fromArray(["12132", "12132", true, false, null, 11, 79, "12132"]),
	genarrclass.static.fromArray(["1", "2", "3"]),
	genarrclass.static.fromArray([80808, 80808, 9, 80808])
]
mt(
	fixLinear,
	fixlingarrays.map((x) => [x]),
	{ genarrclass },
	outarr
)

mt(
	nonlinear,
	fixlingarrays.map((x) => [x]),
	array.native
		.generate(3)
		.map((x, i) => !!i)
		.map((x) => ({
			reflexive: x
		})),
	(x) => console.log(x.toString())
)
mt(
	(e1, e2, f) => {
		test(f, [e1, e2])
		test(f, [e2, e1])
		test(f, [e1, e1])
		test(f, [e2, e2])
	},
	fixlingarrays.map((arr, i) => [
		arr.read(arr.init()),
		arr.read(arr.two()),
		nonlinear({ reflexive: !!i }).function(arr)
	]),
	[],
	aliases.id
)

mt(
	(ordnung, counter) => {
		console.log(ordnung.toString())
		counter = counter()
		test(ordnung, [counter.generator(), counter.generator(counter.generator())])
		test(ordnung, [
			counter.generator(counter.generator()),
			counter.generator(counter.generator())
		])
		test(ordnung, [counter.generator(counter.generator()), counter.generator()])
	},
	[numberCounter, stringCounter].map((x, i) => [fromIcc(InfiniteCounter(x()), !!i), x]),
	[],
	aliases.id
)

// * note: 'min' and 'max' are without tests, because their usage is already highly present in the library's sources;
