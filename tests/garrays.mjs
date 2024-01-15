// * Testing of GeneralArray and its instances

// ! List [from 'types.mjs']:
import { greateroe, lesser, next, negate } from "../src/modules/exports/predicates.mjs"
import { arrays } from "./../src/modules/exports/types.mjs"
import {
	testmultcases as tmc,
	multtestobjmethod as mtom,
	testobjmethod as tom,
	testOn,
	test
} from "./test.mjs"
import { refCompare, oldCompare } from "../src/modules/exports/comparisons.mjs"
import { id, native } from "../src/modules/exports/aliases.mjs"

const outarr = (arr) => test(native.function.const(arr.array))
const outindex = (x) => console.log(x.currindex)

tmc(
	["LastIndexArray", "DeepArray", "CommonArray"].map((x) => arrays[x]()),
	(garrclass) => {
		// ! Create a new array for the '.currelem() + .next()' and '.previous()' tests;
		const cuelarr = garrclass.class()
		for (; lesser(cuelarr.currindex, cuelarr.length().get()); next(cuelarr))
			test(cuelarr.currelem().get)

		for (
			cuelarr.currindex = cuelarr.finish();
			greateroe(cuelarr.currindex, cuelarr.init());
			cuelarr.previous()
		)
			tom(cuelarr.currelem(), "get")

		// ! Add new argument values!
		mtom(cuelarr, "pushback", [], id)
		outarr(cuelarr)
		mtom(cuelarr, "pushfront", [], id)
		outarr(cuelarr)

		testOn(cuelarr, ["init", "finish"])

		tom(cuelarr, "begin")
		tom(cuelarr.currelem(), "get")
		tom(cuelarr, "end")
		tom(cuelarr.currelem(), "get")

		tom(cuelarr, "go", [cuelarr.one()])
		outarr(cuelarr)

		tom(cuelarr, "jump", [cuelarr.two()])
		outarr(cuelarr)

		mtom(cuelarr, "read", [])
		mtom(cuelarr, "write", [])

		tom(cuelarr.length(), "get")
		tom(cuelarr.length(), "set", [])
		outarr(cuelarr)
		tom(cuelarr.length(), "set", [])
		outarr(cuelarr)

		// ! Create arrays for these...
		tmc([], (c) => outarr(garrclass.static.fromArray(c)))

		testOn(garrclass.static, ["zero", "one", "two"], [])

		test(garrclass.pushfrontLoop.toString)
		test(garrclass.pushbackLoop.toString)

		mtom(garrclass.static, "fromCounter")

		tom(cuelarr, "one")
		tom(cuelarr, "two")

		tmc(cuelarr)
		tmc(cuelarr.keys())

		const e = garrclass.static.empty()
		outarr(e)
		tom(e, "isEmpty")
		tom(cuelarr, "isEmpty")

		tom(cuelarr, "swap", [], id)
		outarr(cuelarr)
		cuelarr.swap(cuelarr, "swap", [], id)
		outarr(cuelarr)

		testOn(cuelarr, ["firstIndex", "includes", "indexesOf"], [])

		test(refCompare, [cuelarr.copy(), cuelarr])

		testOn(cuelarr, ["any", "every"], [])

		// ! fill the array...
		const permarr = garrclass.class()
		tom(permarr, "permutations")

		// ! Add array definitions and arguments...
		const joinarr1 = garrclass.class()
		const joinarr2 = garrclass.class()
		tom(joinarr1, "join", outarr)
		tom(joinarr2, "join", outarr)

		testOn(cuelarr, ["slice", "concat"], [[[]], [[joinarr1]]], [], outarr)
		outarr(joinarr1)

		// ! Add values for tests...
		testOn(
			cuelarr,
			[
				"delete",
				"delval",
				"deleteMult",
				"shiftForward",
				"shiftBackward",
				"forEach"
			],
			[[], []],
			[],
			outarr
		)

		const methods = []
		const args = []
		tmc(methods.keys(), (m) => {
			const c = cuelarr.copied(methods[m], args[m])
			test(negate(oldCompare), [c, cuelarr])
			outarr(c)
		})

		mtom(cuelarr, "map", [], [], outarr)
		tom(cuelarr, "reverse", [], false, outarr)

		testOn(
			cuelarr,
			["copied", "repeat", "splice", "split"],
			[[["repeat", []]], [], []],
			[],
			outarr
		)

		tom(cuelarr, "sort", [], false, outarr)
		tom(cuelarr, "isSorted", [], false)
		tom(cuelarr, "sort", [], false, outarr)
		mtom(cuelarr, "isSorted", [], [])

		testOn(
			cuelarr,
			["insert", "multcall", "copied", "suchthat"],
			[[], [], [["suchthat", []]]],
			false,
			outarr
		)

		// ! add arguments...
		testOn(
			cuelarr,
			[
				"projectFit",
				"projectComplete",
				"fillfrom",
				"convert",
				"switchclass",
				"intersection",
				"strjoin",
				"splitlen"
			],
			[[[garrclass.class()]], [[garrclass.class()]]],
			[],
			outarr
		)

		// ! Add the arguments for these function calls...
		cuelarr.begin()
		testOn(
			cuelarr,
			["move", "movdirection", "movebackward", "moveforward"],
			[],
			[],
			outindex
		)
	}
)

// TODO: [for DeepArray, LastIndexArray only] for potence - check (allocating additional memory for Node) if they go beyond the MAX_ARRAY_LENGTH lenght-point for lengths of their array instances, using '.pushback()';
// 	! NOTE: this means having values that would (potentially) cause the array to 'use' a new level...;
// ^ DO THE THING FOR MULTIPLE DIFFERENT LEVELS, CHECKING EACH...; [mayhaps, better add these whilst already having done the rest of the testing?];

// ! tests list for TypedArray: create 1-3 class examples, that would ensure that the types in question are preserved...
