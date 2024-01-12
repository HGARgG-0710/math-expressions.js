// * Testing of GeneralArray and its instances

// ! List [from 'types.mjs']:
import { greateroe, lesser, next } from "../src/modules/exports/predicates.mjs"
import { arrays } from "./../src/modules/exports/types.mjs"

for (const garrclassname of ["LastIndexArray", "DeepArray", "CommonArray"]) {
	const garrclass = arrays[garrclassname]()

	// ! Create a new array for the '.currelem() + .next()' and '.previous()' tests;
	const cuelarr = garrclass.class()
	for (; lesser(cuelarr.currindex, cuelarr.length().get()); next(cuelarr))
		console.log(cuelarr.currelem().get())

	for (
		cuelarr.currindex = cuelarr.finish();
		greateroe(cuelarr.currindex, cuelarr.init());
		cuelarr.previous()
	)
		console.log(cuelarr.currelem().get())

	// ! Add new elements! [for .pushback() and .pushfront() tests here...];
	cuelarr.pushback()
	cuelarr.pushback()
	console.log(cuelarr.array)

	cuelarr.pushfront()
	cuelarr.pushfront()
	console.log(cuelarr)

	console.log(cuelarr.finish())
	console.log(cuelarr.init())

	cuelarr.begin()
	console.log(cuelarr.currelem().get())
	cuelarr.end()
	console.log(cuelarr.currelem().get())

	cuelarr.go(cuelarr.one())
	console.log(cuelarr.array)

	cuelarr.jump(cuelarr.two())
	console.log(cuelarr.array)

	// ! add indexes, values for tests
	console.log(cuelarr.read())
	console.log(cuelarr.read())
	console.log(cuelarr.write())
	console.log(cuelarr.write())

	// ! add new lengths (smaller, greater..)
	console.log(cuelarr.length().get())
	cuelarr.length().set()
	console.log(cuelarr.array)
	cuelarr.length().set()
	console.log(cuelarr.array)

	// ! Create arrays for these...
	console.log(garrclass.static.fromArray())
	console.log(garrclass.static.fromArray())
	console.log(garrclass.static.fromArray())

	console.log(garrclass.static.zero())
	console.log(garrclass.static.one())
	console.log(garrclass.static.two())

	console.log(garrclass.pushfrontLoop.toString())
	console.log(garrclass.pushbackLoop.toString())

	// ! Add examples for these...
	console.log(garrclass.static.fromCounter())
	console.log(garrclass.static.fromCounter())
	console.log(garrclass.static.fromCounter())

	console.log(cuelarr.one())
	console.log(cuelarr.two())

	for (const x of cuelarr) console.log(x)
	for (const x of cuelarr.keys()) console.log(x)

	const e = garrclass.static.empty()
	console.log(e.array)
	console.log(e.isEmpty())
	console.log(cuelarr.isEmpty())

	// ! Choose the i,j to be swapped...
	cuelarr.swap()
	console.log(cuelarr)
	cuelarr.swap()
	console.log(cuelarr)

	// ! Add arguments...
	console.log(cuelarr.firstIndex())
	console.log(cuelarr.firstIndex())
	console.log(cuelarr.firstIndex())

	// ! Add arguments [exactly same as in the 'firstIndex'];
	console.log(cuelarr.includes())
	console.log(cuelarr.includes())
	console.log(cuelarr.includes())

	// ! Add arguments...
	console.log(cuelarr.indexesOf())
	console.log(cuelarr.indexesOf())
	console.log(cuelarr.indexesOf())
	console.log(cuelarr.indexesOf())
	console.log(cuelarr.indexesOf())

	console.log(cuelarr === cuelarr)
	console.log(cuelarr.copy() === cuelarr)

	// ! Add predicates for these two tests...
	console.log(cuelarr.any())
	console.log(cuelarr.any())
	console.log(cuelarr.every())
	console.log(cuelarr.every())

	// ! fill the array...
	const permarr = genarrclass.class()
	console.log(cuelarr.permutations())
	console.log(permarr.permutations())

	// ! Add array definitions and arguments...
	const joinarr1 = genarrclass.class()
	const joinarr2 = genarrclass.class()
	console.log(joinarr1.join())
	console.log(joinarr2.join())

	// ! Add indicies
	cuelarr.slice()
	console.log(cuelarr.array)
	cuelarr.concat(joinarr1)
	console.log(cuelarr.array)
	console.log(joinarr1.array)

	// ! Add values for tests...
	cuelarr.delete()
	console.log(cuelarr.array)
	cuelarr.delval()
	console.log(cuelarr.array)
	cuelarr.delval()
	console.log(cuelarr.array)

	// ! Add values for the test...
	cuelarr.deleteMult()
	console.log(cuelarr.array)

	// ! add infinite counters for arguments...
	cuelarr.shiftForward()
	console.log(cuelarr.array)
	cuelarr.shiftBackward()
	console.log(cuelarr.array)

	// ! decide two interesting function-examples...
	cuelarr.forEach()
	console.log(cuelarr.array)
	cuelarr.forEach()
	console.log(cuelarr.array)

	// ! Add methods and arguments arrays...
	const methods = []
	const args = []
	for (const m of methods.keys()) {
		const c = cuelarr.copied(methods[m], args[m])
		console.log(c != cuelarr)
		console.log(c.array)
	}

	// ! add the values to the mapargs...
	const mapargs = []
	for (const marg of mapargs) {
		cuelarr.map(...marg)
		console.log(cuelarr.array)
	}

	cuelarr.reverse()
	console.log(cuelarr.array)

	// ! Choose two different infinite counters;
	const repeated = cuelarr.copied("repeat", [])
	console.log(repeated.array)
	cuelarr.repeat()
	console.log(cuelarr.array)

	// ! Choose arguments for this...
	cuelarr.splice()
	console.log(cuelarr.array)
	cuelarr.splice()
	console.log(cuelarr.array)

	// ! Choose how to 'split'...
	cuelarr.split()
	console.log(cuelarr.array)

	// ! decide 2 differing predicates for this test...
	cuelarr.sort()
	console.log(cuelarr.array)
	console.log(cuelarr.isSorted()) // same as before -> true
	cuelarr.sort()
	console.log(cuelarr.array)
	console.log(cuelarr.isSorted()) // same as before -> true
	console.log(cuelarr.isSorted()) // original one -> false

	// ! Add the index, value arguments...
	cuelarr.insert()
	console.log(cuelarr.array)
	cuelarr.insert()
	console.log(cuelarr.array)

	// ! Choose methods, choose arguments...
	const multmethods = []
	const margs = []
	for (const m of multmethods.keys()) {
		cuelarr.multcall(multmethods[m], margs[m])
		console.log(cuelarr)
	}

	// ! Pick 2 varying predicates-functions for this...
	const x = cuelarr.copied("suchthat", [])
	console.log(x.array)
	cuelarr.suchthat()
	console.log(cuelarr.array)

	// ! Define the two arrays...
	const pfitarr = garrclass.class()
	const pcompletearr = garrclass.class()
	cuelarr.projectFit(pfitarr)
	console.log(cuelarr.array)
	cuelarr.projectComplete(pcompletearr)
	console.log(cuelarr.array)

	// ! Add arguments...
	cuelarr.fillfrom()
	console.log(cuelarr.array)

	// ! Choose two classes (class and a template) to convert to and to switch to...
	cuelarr.convert()
	console.log(cuelarr.array)
	cuelarr.switchclass()
	console.log(cuelarr.array)

	// ! fill the intersarr with things...
	const intersarr = genarrclass.class()
	console.log(cuelarr.intersection(intersarr).array)

	// ! Choose an arbitrary string...
	console.log(cuelarr.strjoin())
	
	// ! Choose a length, onto which the thing should be split...
	cuelarr.splitlen()
	console.log(cuelarr.array)

	// ! Add the arguments for these function calls...
	cuelarr.begin()
	cuelarr.move()
	console.log(cuelarr.currindex)
	cuelarr.movdirection()	
	console.log(cuelarr.currindex)
	cuelarr.movebackward()	
	console.log(cuelarr.currindex)
	cuelarr.moveforward()
}

// TODO: [for DeepArray, LastIndexArray only] for potence - check (allocating additional memory for Node) if they go beyond the MAX_ARRAY_LENGTH lenght-point for lengths of their array instances, using '.pushback()';
// 	! NOTE: this means having values that would (potentially) cause the array to 'use' a new level...;
// ^ DO THE THING FOR MULTIPLE DIFFERENT LEVELS, CHECKING EACH...; [mayhaps, better add these whilst already having done the rest of the testing?]; 

// ! tests list for TypedArray: create 1-3 class examples, that would ensure that the types in question are preserved...
