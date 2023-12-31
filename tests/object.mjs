// * Various methods related to objects;

// ^ IDEA [for a project] - write a package for simplification of test creation process and tests output + output-formatting...
import { sym } from "../src/modules/exports/aliases.mjs"
import { object, copy } from "../src/modules/exports/native.mjs"

const obj = {
	p: 44,
	subobja: {
		subobjb: {
			h: "Hello!"
		},
		k: true
	},
	subobjc: {}
}

console.log(object.subobjects(obj))
console.log()

const robj = {
	a: 91,
	klute: {
		s: "Hello there again!",
		f: {
			p: BigInt(3)
		}
	},
	l: {}
}
robj.o = robj
robj.another = { dl: robj, ddl: { naus: { u: robj, s: 11 } } }

console.log(object.subobjects(robj))
console.log()

console.log(object.subobjectsFlat(obj))
console.log()

console.log(object.isRecursive(obj))
console.log(object.isRecursive(robj))
console.log()

console.log(
	object.obj(
		["hello!", sym("symbolk"), 553, "todloo"],
		[10, true, ["ffd"], { pp: 112 }]
	)
)
console.log()

const a = {
	p: 14,
	b: 445,
	x: "s",
	ff: false
}
const t = {
	p: "ff",
	b: "n",
	x: "llaalalalaa",
	ff: "p"
}
console.log(object.objMap(a, t, false))
console.log(object.objMap(a, t))
console.log()

console.log(object.objFmap(a, (x) => x + "soooossaaa"))
console.log()

console.log(object.objArr(obj))
console.log()

const ao = { p: 112, c: {} }
const bo = { ff: 343, 34: false }
const aoc = copy.flatCopy(ao)
object.objSwap(ao, bo)
console.log(ao)
console.log(bo)
console.log()

const aco = { tark: "blue", c: "turquiose" }
const bco = copy.flatCopy(aco)
object.objClear(aco)
object.objClear(bco, ["tark"])
console.log(aco)
console.log(bco)
console.log()

object.objInherit(aoc, ao)
console.log(aoc)
console.log()

object.propSwap(ao, "ff", "34")
console.log(ao)
console.log()

const aob = {
	k: 14,
	c: 3334
}
const bob = {
	k: "mapped",
	c: "yup, yup, definitely mapped..."
}
const l = {
	nf: 10,
	tt: "not mapped"
}
console.log(object.ismapped(aob, bob))
console.log(object.ismapped(aob, l))
console.log(object.ismapped(bob, l))
console.log()

const nbobjex = {
	func: function () {
		return this.func
	}
}
const bobjex = object.boundObj(copy.flatCopy(nbobjex))
console.log(nbobjex)
console.log(bobjex)
console.log()

const nenciobj = {
	c: 12323,
	dd: {
		sun: "praise!",
		bar: "caelum"
	}
}
nenciobj.ffuuunnndaaiis = nenciobj
const enciobj1 = object.objEncircle(nenciobj, "nkey", ["c", "dd"])
const enciobj2 = object.objEncircle(nenciobj, "nkey", ["ffuuunnndaaiis"])
console.log(enciobj1)
console.log(enciobj2)
console.log()

console.log(object.gutInnerObjs(enciobj2, ["nkey"]))
console.log(object.gutInnerObjs(enciobj2))
console.log()
