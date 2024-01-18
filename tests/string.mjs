// * Various methods related to strings

import { string } from "../src/modules/exports/native.mjs"
import { multtests as mt, test, testOn } from "./test.mjs"

const { strmethod, reverse, map, replace, UTF16 } = string

const tostr = (x) => x.toString()

mt(tostr, [strmethod, reverse, map])
// ! Add arguments...
mt(reverse, [])
mt(map, [])
testOn(replace, [
	"sreplaceFirst",
	"sreplaceIndex",
	"sreplaceIndexes",
	"sreplace",
	"sreplaceArr",
	"sreplaceIndexesMult",
	"replaceMany"
])
mt(UTF16, [])
