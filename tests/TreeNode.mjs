// * Tests of methods and predicates related to TreeNode

import { TreeNode } from "../src/modules/exports/types.mjs"

// ! List [TreeNode] (make 2-3 tests for different GeneralArray classes - applies for all of these...):
// 1.  getall - create 2*3 tests cases (3 different TreeNode instances, with/without 'nodes' for each one...); See that the structure of each is preserved (recursive ones included):
// 2.  getpart - create 2*3 tests for different a, b (arguments - two of the same tests with/without 'nodes' argument...) and node instancesa;
// 3.  pushback - create 2*3 tests at least (3 instances, at least 2 times called for each one, ensure structure preservation...);
// 4.  pushfront - same as 'pushback';
// 5.  firstIndex - create 2-3 tests for 3-4 different instances;
// 6.  indexesOf - same as 'firstIndex', only (maybe) change the instances...;
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
