// * Tests related to forms

import {
	constForm,
	propertyForm,
	objectForm,
	classForm,
	arrayForm,
	garrayForm,
	treeForm,
	structure
} from "../src/modules/exports/structure.mjs"
import { test, testmultcases as tmc } from "./test.mjs"

// ? structure.form - construct a new form, print it out; print out all the kinds of ready library forms;
const forms = [
	constForm,
	propertyForm,
	objectForm,
	arrayForm,
	classForm,
	garrayForm,
	treeForm
]

tmc(forms)
tmc(forms.keys(), (f) => {
	// ! construct the example for the form;
	const formex = forms[f].new()
	// ! Fill the 'structure' values...
	const struct = structure({ form: forms[f] }).function(formex)
	test(struct.equivalent, [forms[(f + 1) % forms.length]])
	test(struct.recisomorphic, [struct.equivalent(forms[(f + 1) % forms.length])])
	// ! Different form (not isomorphic...)
	const difform = forms[(f + 1) % forms.length].new()
	test(struct.recisomorphic, [difform])
})
