// * Tests of methods and predicates related to TreeNode

import { DEFAULT_TREENODECLASS } from "../src/modules/exports/general.mjs"

const tnclass = DEFAULT_TREENODECLASS

// ! Define the test-cases array... [instances of 'tnclass'];
const cases = []
for (const c of cases) {
	console.log(c.getall())
	
	// ! Create arguments, structure for their organization...
	console.log(c.getpart())
	console.log(c.getpart())
	console.log(c.getpart())
	console.log(c.getpart())

	// ! Arguments, structure for them...
	console.log(c.pushback())
	console.log(c.pushback())
	console.log(c.pushback())
	console.log(c.pushback())
	console.log(c.pushback())

	// ! Arguments, structure for them...
	console.log(c.pushfront())
	console.log(c.pushfront())
	console.log(c.pushfront())
	console.log(c.pushfront())
	console.log(c.pushfront())
	
	// ! Arguments, structure for them...
	console.log(c.firstIndex())
	console.log(c.firstIndex())	
	console.log(c.firstIndex())	
	console.log(c.firstIndex())	
	console.log(c.firstIndex())	

	// ! args...
	console.log(c.indexesOf())
	console.log(c.indexesOf())
	console.log(c.indexesOf())
	console.log(c.indexesOf())

	console.log(c.copy() === c)
	console.log(c.copy())


}

// ! List [TreeNode] (make 2-3 tests for different GeneralArray classes - applies for all of these...):
// 7.  copy - run once for 2-3 different instances;
// 8.  copied - same as 'copy', for two arbitrarily chosen methods...;
// 9.  map - same as 'copy' for various functions;
// 10. insert - same as 'firstIndex';
// 11. delval - same as 'insert';
// 12. prune - perform twice for each one of the 3 instances;
// 13. [Symbol.iterator] - iterate over 3 different instances, check all for correctness;
// 14. keys - iterate over the keys of the 2 instances, make sure it is all correct;
// 15. read - perform 2-3 reading operations for each of the 3 different instances of a class;
// 16. findRoots - perform 2-3 times for each of the three instances' different nodes, check correctness;
// 17. depth - perform once for each one of the 3 instances;
// 18. write - same as 'read';
// 19. findAncestors - same as 'findRoots';
// 20. commonAncestors - same as 'findAncestors', except (possibly) choose different instances, check correctness...
// 21. swap - run 3-4 times for each one of the 3 instances;
// 22. order - create one test for each one of the instances; (maybe, check for their subnodes as well...);
// 23. multitoflat - create 3-4 cases for each one of the 3 instances;
// 24. flattomulti - same as 'multitoflat';
