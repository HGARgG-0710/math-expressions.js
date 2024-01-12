// * Tests for the contents of the 'numeric.mjs'

import {
	polystring,
	fromPolystring,
	sameLength,
	baseconvert,
	native
} from "../src/modules/exports/numeric.mjs"

// ! Add templates
const templates = []

for (const t of templates) {
	// ! Add arguments
	console.log(polystring(t).function())
	console.log(polystring(t).function())
	console.log(polystring(t).function())

	// ! Add arguments (reverse the previous one...)
	console.log(fromPolystring(t).function())
	console.log(fromPolystring(t).function())
	console.log(fromPolystring(t).function())

	// ! Add arguments
	console.log(sameLength(t).function())
	console.log(sameLength(t).function())
	console.log(sameLength(t).function())

	// ! Add different values here (for varying bases...);
	console.log(baseconvert(t).function())
	console.log(baseconvert(t).function())
	console.log(baseconvert(t).function())
	console.log(baseconvert(t).function())
	console.log(baseconvert(t).function())
}

const nativetemplates = []

for (const t of nativetemplates) {
	// ! Add arguments
	console.log(nativetemplates.polystring(t).function())
	console.log(nativetemplates.polystring(t).function())
	console.log(nativetemplates.polystring(t).function())

	// ! Add arguments (reverse the previous one...)
	console.log(nativetemplates.fromPolystring(t).function())
	console.log(nativetemplates.fromPolystring(t).function())
	console.log(nativetemplates.fromPolystring(t).function())

	// ! Add different values here (for varying bases...);
	console.log(nativetemplates.baseconvert(t).function())
	console.log(nativetemplates.baseconvert(t).function())
	console.log(nativetemplates.baseconvert(t).function())
	console.log(nativetemplates.baseconvert(t).function())
	console.log(nativetemplates.baseconvert(t).function())
}
