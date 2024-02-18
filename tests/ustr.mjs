// * Testing of the UnlimitedString

import { refCompare } from "../src/modules/exports/comparisons.mjs"
import { native } from "../src/modules/exports/aliases.mjs"
import { addnumber } from "../src/modules/exports/counters.mjs"
import {
	UnlimitedString,
	arrays,
	InfiniteCounter
} from "../src/modules/exports/types.mjs"
import {
	testmultcases as tmc,
	multtestobjmethod as mtom,
	testOn,
	testobjmethod as tom,
	test
} from "./test.mjs"

const outstr = (x) => {
	console.log()
	console.log(x.genarr.array)
	for (const e of x.genarr) console.log(e)
	console.log()
}
const outarr = (x) => {
	console.log(x.array.map((x) => (typeof x === "object" ? x.genarr.array : x)))
}
const outval = (x) => console.log(x.value)

tmc(
	["LastIndexArray", "DeepArray", "CommonArray"].map((x) =>
		UnlimitedString(arrays[x]())
	),
	(ustrclass) => {
		tmc(
			[
				ustrclass.static.fromString("ABABAALALASIFJJJJJJJLO"),
				ustrclass.class(
					ustrclass.parentclass.static.fromArray([
						"141234",
						"???",
						"What about this?"
					]).array
				)
			],
			(ustring) => {
				outstr(ustring)
				mtom(
					ustring,
					"copy",
					[[], [(s) => native.string.fcc(native.string.cca(s) + 42)]],
					[],
					outstr
				)
				mtom(
					ustring.copy(),
					"split",
					[
						"A",
						"4",
						"about",
						ustrclass.static.fromString("???"),
						ustrclass.static.fromString("AALALASI")
					].map((x) => [x]),
					[],
					outarr
				)
				mtom(
					ustring,
					"read",
					[ustring.init(), ustring.finish(), ustring.one()].map((x) => [x]),
					[]
				)
				testOn(ustring, ["init", "finish"], [[[]], [[]], [[]]], [], outval)
				testOn(
					ustring,
					["end", "begin", "next", "previous"],
					[[[]], [[]], [[], [], []], [[], []]],
					[],
					() => console.log(ustring.currindex)
				)
				testOn(
					ustring,
					["write", "concat"],
					[
						[
							[ustring.init(), "_"],
							[ustring.finish(), "Kddads"]
						],
						[
							["1000aa"],
							[
								ustring.class.class(
									ustring.class.parentclass.static.fromArray([
										"ddasdl",
										"Tururhaljkfl"
									]).array
								)
							]
						]
					],
					[],
					outstr
				)
				testOn(ustring.currelem(), ["get", "set"], [[[]], [["KKF"]]], false)
				tom(ustring.length(), "get", [], false, outval)
				testOn(
					ustring,
					["includes", "isEmpty"],
					[[["a"], ["?"], [ustring.class.static.fromString("FAB")]], [[]]],
					[]
				)
				mtom(
					ustring.length(),
					"set",
					[
						[ustring.length().get().previous().previous()],
						[ustring.length().get().next().next()]
					],
					[],
					outstr
				)
				testOn(
					ustring,
					[
						"copied",
						// ^ The UnlimitedString class needs the caching MOST OF ALL - so slow it's practically dysfunctional... (even though the code DOES WORK, but can be so much better from performance standpoint);
						"insert",
						"remove",
						"reverse",
						"join",
						"map",
						"symbolic",
						"sort",
						"pushback",
						"pushfront",
						"order"
					],
					[
						[["slice", [ustring.init(), ustring.two().next().next()]]],
						[[ustring.two(), "Tereereii"]],
						[[], [ustring.finish()]],
						[[]],
						[["ta_"]],
						[[(k) => native.string.fcc(native.string.cca(k) + 42)], []],
						[[]],
						[[(x, y) => native.string.cca(x) > native.string.cca(y)]],
						["kkkjl?", "ataara", "bubub"].map((x) => [x]),
						["ffaa", "lululu", "1341324"].map((x) => [x]),
						[[]]
					],
					[],
					outstr
				)
				// ? Later - change these predicates-arguments to something else?
				mtom(ustring, "indexesOf", [["A"]], [], (x) => {
					for (const y of x) outval(y.map(InfiniteCounter(addnumber())))
				})
				tmc(ustring)
				tmc(ustring.keys(), outval)
				testOn(
					ustring,
					["any", "every"],
					[
						[
							[(x) => native.string.cca(x) > 1000],
							[(x) => refCompare(x.toLowerCase(), "a")]
						],
						[
							[(x) => native.string.cca(x) < 1000],
							[(x) => !refCompare(x.toLowerCase(), "b")]
						]
					],
					[]
				)
				// ! In testing:
				testOn(
					ustring,
					["suchthat", "forEach", "multcall"],
					[
						[[(x) => native.string.cca(x) > native.string.cca("h")]],
						[[(x) => console.log(x)]],
						[
							[
								"write",
								[
									[ustring.init(), "Trurualsj"],
									[ustring.finish(), "akaiol"],
									[ustring.init().next(), "Rta"]
								],
								true
							]
						]
					],
					[],
					outstr
				)
				mtom(ustring, "firstIndex", [["J"], ["ALAABABA"]], [], (x) => {
					if (x) outval(x)
					else console.log(x)
				})
			}
		)
		test(ustrclass.static.empty, [], false, outstr)
	}
)
