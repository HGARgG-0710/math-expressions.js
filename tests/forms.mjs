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

for (const f of forms) console.log(f)
for (const f of forms.keys()) {
	// ! construct the example for the form;
	const formex = forms[f].new()
	// ! Fill the 'structure' values...
	const struct = structure({ form: forms[f] }).function(formex)
	console.log(struct.equivalent(forms[(f + 1) % forms.length]))
	console.log(struct.recisomorphic(struct.equivalent(forms[(f + 1) % forms.length])))
	// ! Different form (not isomorphic...)
	const difform = forms[(f + 1) % forms.length].new()
	console.log(struct.recisomorphic(difform))
}
