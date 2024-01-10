// * Tests related to forms

import {
	form,
	constForm,
	propertyForm,
	objectForm,
	classForm,
	arrayForm,
	garrayForm,
	treeForm
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

// ! test every method against all present forms (meaning - create an instance of the form, put in the instance + value of the form into the method, run)
//  structure.structure - test for each case two or three times with differing templates;