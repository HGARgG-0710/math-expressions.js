// * Various methods related to strings

import * as aliases from "../src/modules/exports/aliases.mjs"
import { string } from "../src/modules/exports/native.mjs"
import { multtests as mt, test, testOn } from "./test.mjs"

const { strmethod, reverse, map, replace, UTF16 } = string

const tostr = (x) => x.toString()

mt(
	tostr,
	[strmethod, reverse, map].map((x) => [x])
)
mt(
	reverse,
	["ABASDA", "Siblien"].map((x) => [x])
)
mt(map, [
	["0123456678", (x) => `1${x}3`],
	["4431fas", () => "ffd"]
])

testOn(
	replace,
	[
		"sreplaceFirst",
		"sreplaceIndex",
		"sreplaceIndexes",
		"sreplace",
		"sreplacePredicate",
		"sreplaceIndexesMult",
		"sreplaceMany"
	],
	[
		[
			["ffffa", "f", "8090"],
			["14334231", "3", "2"]
		],
		[
			["sigbrau", 1, "ie"],
			["234234", 3, "504da"]
		],
		[["eeararaaraaaaeeaaeeee", "e", "Quil", [1, 4, 7]]],
		[["karraraaaaaeeeeeeeerrrr", "a", "10 Th. Miles away"]],
		[
			[
				"Evening!",
				(x) => aliases.native.string.cca(x) < 97,
				(x) => aliases.native.string.fcc(aliases.native.string.cca(x) + 332)
			]
		],
		[["1232123aasdKddfaal;", [3, 17, 11], ["Shun", "Tundar", "asfas"]]],
		[["KeinDtaadgadfsadfasfavlK", ["K", "a"], ["12v", "Trrr"]]]
	]
)

mt(UTF16, [
	[3341, 34],
	[97, 33],
	[65, 443],
	[3332342, 12]
])
