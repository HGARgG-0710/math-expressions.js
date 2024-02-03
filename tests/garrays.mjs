// * Testing of GeneralArray and its instances

// TODO: check the 'is' methods for arrays... (particularly, the GeneralArray, InfiniteCounter, UnlimitedString and other types...)

// ! List [from 'types.mjs']:
import { greateroe, lesser, next } from "../src/modules/exports/predicates.mjs"
import { arrays, InfiniteCounter } from "./../src/modules/exports/types.mjs"
import { numberCounter } from "../src/modules/exports/counters.mjs"
import {
	testmultcases as tmc,
	multtestobjmethod as mtom,
	testobjmethod as tom,
	testOn,
	test
} from "./test.mjs"
import { refCompare, _valueCompare } from "../src/modules/exports/comparisons.mjs"
import { id, native, sym, boundMethod } from "../src/modules/exports/aliases.mjs"

const outarr = (arr) => test(native.function.const(arr.array))
const outval = (x) => console.log(x.value)
const outindex = (x) => outval(x.currindex)
const convert = (icc) => native.number.fromNumber({ icclass: icc }).function

const arrs = ["LastIndexArray", "DeepArray", "CommonArray"].map((x) => arrays[x]())

tmc(arrs.keys(), (gkey) => {
	const garrclass = arrs[gkey]
	tmc(
		[
			[],
			[345, "gggeieieododisoooooooiii....", null],
			[true, false, true, false, undefined],
			[{}, {}, { c: 33 }, { g: 1777 }]
		],
		(garrvalue) => {
			console.log("\n\n")
			const cuelarr = garrclass.static.fromArray(garrvalue)
			for (; lesser(cuelarr.currindex, cuelarr.length().get()); next(cuelarr))
				test(cuelarr.currelem().get)

			for (
				cuelarr.currindex = cuelarr.finish();
				greateroe(cuelarr.currindex, cuelarr.init());
				cuelarr.previous()
			)
				tom(cuelarr.currelem(), "get")

			mtom(
				cuelarr,
				"pushback",
				[48, 113, "???", undefined, false].map((x) => [x]),
				[],
				id
			)
			outarr(cuelarr)
			mtom(
				cuelarr,
				"pushfront",
				[true, 11, 27, sym("aS"), sym("__fsVvz__")].map((x) => [x]),
				[],
				id
			)
			outarr(cuelarr)

			testOn(cuelarr, ["init", "finish"], [], [], outval)

			outindex(cuelarr)
			tom(cuelarr, "begin", [], false, outval)
			tom(cuelarr.currelem(), "get")
			tom(cuelarr, "end", [], false, outval)
			tom(cuelarr.currelem(), "get")

			outindex(cuelarr)
			tom(cuelarr, "go", [cuelarr.one()], false, id)
			outindex(cuelarr)

			tom(cuelarr, "jump", [cuelarr.two()], false, id)
			outindex(cuelarr)

			mtom(
				cuelarr,
				"read",
				[cuelarr.init(), cuelarr.two(), cuelarr.length().get().previous()].map(
					(x) => [x]
				)
			)
			outarr(cuelarr)
			mtom(cuelarr, "write", [
				[cuelarr.length().get().previous().previous(), "1000brouhahas"],
				[cuelarr.two(), 0b10101]
			])
			outarr(cuelarr)

			tom(cuelarr.length(), "get", [], false, outval)
			tom(
				cuelarr.length(),
				"set",
				[cuelarr.length().get().previous().previous()],
				false,
				outarr
			)
			tom(
				cuelarr.length(),
				"set",
				[cuelarr.length().get().next().next()],
				false,
				outarr
			)

			// TODO: later - try it with different array structures (explicitly defined, for instance of 'LastIndexArray a: a.length > MAX_ARRAY_LENGTH')
			tmc(
				[
					[10],
					["fffda", {}],
					[false, 1234243, "fasasa", {}, { d: {} }, { d: { c: {} }, a: 19 }]
				],
				(c) => outarr(garrclass.class(c))
			)

			testOn(garrclass.static, ["zero", "one", "two"], [], [], outval)

			test(boundMethod("toString", garrclass.static.pushfrontLoop({}).function))
			test(boundMethod("toString", garrclass.static.pushbackLoop({}).function))

			mtom(
				garrclass.static,
				"fromCounter",
				[
					cuelarr.one(),
					cuelarr.two(),
					convert(InfiniteCounter(numberCounter()))(10)
				].map((x) => [x]),
				[],
				outarr
			)

			tom(cuelarr, "one", [], false, outval)
			tom(cuelarr, "two", [], false, outval)

			tmc(cuelarr)
			tmc(cuelarr.keys(), outval)

			const e = garrclass.static.empty()
			outarr(e)
			tom(e, "isEmpty")
			tom(cuelarr, "isEmpty")

			tom(cuelarr, "swap", [cuelarr.init(), cuelarr.finish()], false, id)
			outarr(cuelarr)
			tom(
				cuelarr,
				"swap",
				[cuelarr.finish(), cuelarr.finish().previous()],
				false,
				id
			)
			outarr(cuelarr)

			testOn(
				cuelarr,
				["firstIndex", "includes", "indexesOf"],
				[
					["???", 48, true, 27].map((x) => [x]),
					[27, 345, null, "???"].map((x) => [x]),
					[undefined, "???", false].map((x) => [x])
				],
				[],
				(x) => {
					if (x && typeof x === "object" && "value" in x) {
						console.log(x.value)
						return
					}
					if (x && typeof x === "object" && "array" in x) {
						console.log(
							x.array.map((y) => {
								if ("value" in y) return y.value
								return y
							})
						)
						return
					}
					console.log(x)
				}
			)

			test(refCompare, [cuelarr.copy(), cuelarr])

			testOn(
				cuelarr,
				["any", "every"],
				[
					[
						(x) => typeof x === "undefined",
						(x) => typeof x === "number" && x > 100,
						(x) => x instanceof Object
					].map((x) => [x]),
					[(x) => typeof x === "number", (x) => x !== null].map((x) => [x])
				]
			)

			const permarr = garrclass.static.fromArray(["A Jugg?", false, sym("HI")])
			tom(permarr, "permutations", [], false, (x) => outarr(x.copy((y) => y.array)))

			const joinarr = garrclass.static.fromArray(
				[[10, "'"], [null]].map(garrclass.static.fromArray)
			)

			tom(joinarr, "join", [], false, outarr)
			tom(
				garrclass.static.fromArray(
					[[true], [{}], [{}, { cc: "t" }, []]].map(garrclass.static.fromArray)
				),
				"join",
				[],
				false,
				outarr
			)

			for (const a of [
				[cuelarr.init(), cuelarr.two()],
				[cuelarr.finish()],
				[cuelarr.finish().previous().previous().previous()]
			])
				tom(cuelarr.copy(), "slice", a, false, outarr)

			tom(cuelarr, "concat", [joinarr], false, (x) => {
				outarr(x)
				outarr(joinarr)
			})

			// TODO[general]: add the ability for dynamic evaluation (as a function) of values of variables into the current 'testing' API (a very rough sketch, not a part of the library yet...);
			// * Here, the indexes are done very dirtily (counted off manually...);
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
				[
					[cuelarr.two(), cuelarr.finish().previous()].map((x) => [x]),
					[11, 48].map((x) => [x]),
					[
						[cuelarr.init(), cuelarr.one()],
						[cuelarr.two().next(), cuelarr.two().next().next().next()]
					],
					[cuelarr.two(), cuelarr.init(), cuelarr.one()].map((x) => [x]),
					[[cuelarr.two(), cuelarr.init()]],
					[[(x) => console.log(x)]]
				],
				[],
				outarr
			)

			mtom(
				cuelarr,
				"map",
				[[], [(x) => ["boolean", "string"].includes(typeof x)]],
				[],
				outarr
			)
			tom(cuelarr, "reverse", [], false, outarr)

			const ccuelarr = cuelarr.copy()

			testOn(
				ccuelarr,
				["copied", "repeat", "splice"],
				[
					[
						["repeat", [cuelarr.two()]],
						["repeat", [cuelarr.init()]]
					],
					[[cuelarr.two()]],
					[
						[cuelarr.finish().previous()],
						[
							cuelarr.finish().previous().previous().previous(),
							cuelarr.two().next()
						]
					]
				],
				[],
				outarr
			)
			// ! NOTE: 'split's are SOOOOOOUOUOUOU SLOOOOOOOOOUUUUUOOOUOUOUOUWWWWWWWWW.....
			tom(ccuelarr, "split", [true], false, (x) => outarr(x.copy((x) => x.array)))

			tom(cuelarr, "sort", [(x, y) => x > y], false, outarr)
			tom(cuelarr, "sort", [(x, y) => x < y], false, outarr)

			tom(
				cuelarr,
				"multcall",
				[
					"swap",
					[
						[cuelarr.init(), cuelarr.finish()],
						[cuelarr.init().next(), cuelarr.finish().previous()]
					],
					true
				],
				false,
				outarr
			)

			mtom(
				cuelarr,
				"copied",
				[
					["suchthat", [(x) => x]],
					["suchthat", [(x) => !x]]
				],
				[],
				outarr
			)

			const karr = [1, 2, 0].map((x) => arrs[(gkey + x) % arrs.length])

			mtom(
				cuelarr,
				"convert",
				karr.map((x) => [x.template]),
				[],
				outarr
			)
			mtom(
				cuelarr,
				"switchclass",
				karr.map((x) => [x]),
				[],
				outarr
			)

			mtom(
				cuelarr,
				"copied",
				[
					cuelarr.one(),
					cuelarr.two(),
					cuelarr.two().next(),
					cuelarr.two().next().next()
				].map((x) => ["splitlen", [x]]),
				[],
				(x) => console.log(x.array.map((y) => y.array))
			)
			mtom(
				cuelarr,
				["fillfrom"],

				[
					[cuelarr.two().next(), "It is I, LeClerc!"],
					[cuelarr.two().next().next().next(), 443]
				],
				[],
				outarr
			)

			const projarr = garrclass.static.fromArray([
				100,
				"adfa",
				true,
				null,
				sym(";lksdjf"),
				function () {}
			])
			tom(
				cuelarr,
				"projectFit",
				[projarr, cuelarr.two().next().next()],
				false,
				outarr
			)
			tom(cuelarr, "projectComplete", [projarr, cuelarr.finish()], false, outarr)

			// ^ IDEA : for a static GeneralArray method [v1.1] - recursive 'fromArray' (would take a recursive array like, say, [[a, [b, c, [d]]], [[[[[[[e]]]]]]]] and return its counterpart, which would be General on every layer;);
			mtom(
				garrclass.static.fromArray(["11", 22, true, null, false, null]),
				"intersection",
				[
					["11", null, 41, "Seiiieieieiegrin", false, null],
					["11", null, 41, "Seiiieieieiegrin"]
				].map((x) => [garrclass.static.fromArray(x)]),
				[],
				outarr
			)

			// ^ All good at least 'til here...;

			// ? After the UnlimitedString has been completely tested?
			// ! TEST:
			// "strjoin",
		}
	)
})

// ! LATER [when have the appropriate machine/time, spend enough thought on all this, optimize everything...] - create tests that would check for capabilities of LastIndexArray and DeepArray (as well as other, new recursive unlimited array models' definitions inside the library...), namely - whether they're currently able to store the new values (test for errors related to recursion usage in them...);

// ! tests list for TypedArray: create 1-3 class examples, that would ensure that the types in question are preserved...
