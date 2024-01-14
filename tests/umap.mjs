// * Testing of the UnlimitedMap

import { UnlimitedMap } from "../src/modules/exports/types.mjs"
import { testmultcases as tmc, multtestobjmethod as mtom, test } from "./test.mjs"

tmc([undefined].map(UnlimitedMap), (umclass) => {
	// ! Create instances for it (2-3 will do)
	tmc([], (i) => {
		// ! Add arguments...
		mtom(i, "read")
		mtom(i, "write")
		mtom(i, "deleteKey")
		mtom(i, "suchthat")
		mtom(i, "copy")
		mtom(i, "copied")
		mtom(i, "map")
		mtom(i, "deleteKeys")
		mtom(i, "multcall")
		tmc(i)
	})
	// ! Arguments
	mtom(umclass.static, "fromObject")
	test(umclass.static.empty)
})
