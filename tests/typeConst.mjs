// * Test of typeConst

import { typeConst } from "./../src/modules/exports/structure.mjs"

typeConst((r) => {
	console.log(r)
	for (const x of r) console.log(x)
	console.log(r[0] === r[1])
}, 2)
