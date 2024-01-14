// ! CLEAN THIS UP LATER... [dirty, not general enough... USE 'composition'!!!!];

import { native } from "../src/modules/exports/aliases.mjs"
import { ID } from "../src/modules/exports/macros.mjs"

const { property } = native.object

export function test(f, args = [], template = false, testf = console.log) {
	return testf((template ? (x) => x(template).function : ID)(f)(...args))
}

export function multtests(f, aargs = [], templates = [], testf = console.log) {
	for (const x in aargs) test(f, aargs[x], templates[x], testf)
}

export function testobjmethod(obj, method, args, template = false, testf = console.log) {
	return test(property(method)(obj), args, template, testf)
}

// * abbreviated - mtom;
export function multtestobjmethod(
	obj,
	method,
	args,
	templates = [],
	testf = console.log
) {
	return multtests(property(method)(obj), args, templates, testf)
}

export function testmultcases(cases, testf = console.log) {
	for (const x of cases) testf(x)
}

export function testOn(
	object,
	methods = [],
	args = [],
	templates = [],
	testf = console.log
) {
	for (const x in methods)
		multtestobjmethod(object, methods[x], args[x], templates[x], testf)
}
