// * Tests for the contents of the 'numeric.mjs'

import { ID } from "../src/modules/macros.mjs"
import { array } from "../src/modules/exports/algorithms.mjs"
import {
	stringCounter,
	numberCounter,
	arrayCounter,
	addnumber
} from "../src/modules/exports/counters.mjs"
import {
	InfiniteCounter,
	numbers,
	arrays,
	UnlimitedString
} from "../src/modules/exports/types.mjs"
import {
	polystring,
	fromPolystring,
	sameLength,
	baseconvert,
	native
} from "../src/modules/exports/numeric.mjs"

const { TrueInteger } = numbers

import { testmultcases as tmc, testOn, multtests as mt } from "./test.mjs"
import { defaultAlphabet } from "../src/lib.mjs"

const usual = {
	polystring,
	fromPolystring,
	baseconvert
}
const { LastIndexArray } = arrays

// ! HACK - these sorts of things work only with 'short' (!.length().get().compare(MAX_STRING_LENGTH))
const outstr = (x) => {
	let fs = ""
	for (const s of x) fs += s
	console.log(fs)
}
const outint = (x) => console.log(x.value.value)
const outval = (x) => console.log(x.value)
const outstrarr = (x) => {
	for (const y of x) outstr(y)
}

const f = (isnative) => (isnative ? native : usual)

const counters = [numberCounter, arrayCounter, stringCounter]
const iccs = counters.map(InfiniteCounter)
const genarrclass = LastIndexArray()
const tintclasses = iccs.map(TrueInteger)
const alphabets = [
	undefined,
	genarrclass.static.fromArray(array.native.generate(0, 9).map(String)),
	genarrclass.static.fromArray(["r", "k", "z"])
]

tmc([false, true], (bv) => {
	const scope = f(bv)
	tmc(tintclasses.keys(), (i) => {
		const template = bv
			? {
					alphabetto: alphabets[(i + 1) % alphabets.length]
						? alphabets[(i + 1) % alphabets.length].array
						: ["0", "!"]
			  }
			: {
					icclass: iccs[i],
					tintclass: tintclasses[i],
					genarrclass,
					alphabetto: alphabets[(i + 1) % alphabets.length]
						? alphabets[(i + 1) % alphabets.length]
						: genarrclass.static.fromArray(["0", "!"])
			  }
		if (i > 0) {
			// ! hack (with .array...);
			template.alphabet = !bv ? alphabets[i] : alphabets[i].array
			template.alphabetfrom = !bv ? alphabets[i] : alphabets[i].array
		}
		testOn(
			scope,
			["polystring", "fromPolystring", "baseconvert"],
			[
				[100, 3, 44].map((x) => [
					(!bv ? tintclasses[i].static.fromNumber : ID)(x)
				]),
				[15, 77, 29].map((x) => [
					scope
						.polystring(template)
						.function((!bv ? tintclasses[i].static.fromNumber : ID)(x))
				]),
				[22, 91, 41].map((x) => [
					scope
						.polystring(template)
						.function((!bv ? tintclasses[i].static.fromNumber : ID)(x))
				])
			],
			template,
			!bv
				? (x) => {
						if (x.value)
							console.log(x.value.map(InfiniteCounter(addnumber())).value)
						else outstr(x)
				  }
				: console.log
		)
	})
})

const sltgarrs = [
	genarrclass.static.fromArray(
		["affdadsfb", "2309470397vkl", "4332"].map(
			UnlimitedString(genarrclass).static.fromString
		)
	),
	genarrclass.static.fromArray(
		["2", "3"].map(UnlimitedString(genarrclass).static.fromString)
	),
	genarrclass.static.fromArray(
		["", "kkl", "Seventy seven!", "3fada"].map(
			UnlimitedString(genarrclass).static.fromString
		)
	)
]

mt(
	sameLength,
	sltgarrs.map((x) => [x]),
	{ genarrclass, alphabet: alphabets[2] },
	outval
)
for (const t of sltgarrs) outstrarr(t)
