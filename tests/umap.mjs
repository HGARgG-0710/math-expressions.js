// * Testing of the UnlimitedMap

import { UnlimitedMap } from "../src/modules/exports/types.mjs"

// ! List [to test] (test all for 2-3 different GeneralArray classes):
// * 'methods':
// 1. read - read 2-3 times (in different indeexes) for 2-3 varying class instances; 
// 2. write - same as 'read'; 
// 3. deleteKey - same as 'write'; 
// 4. suchthat - do 1-2 times for different predicates for 3 instances; 
// 5. copy - do once for each instance, ensure that copying is successful; 
// 6. copied - same as 'copied', except different copying functions 'f' and also methods...; 
// 7. map - same as 'copied', but without methods (only 'f' functions) for each 3 instances; 
// 8. deleteKeys - do 2-4 times for each one of the 3 instances (differing key-arrays); 
// 9. multcall - do 1-2 times on various methods (just to make sure it works...); 
// 10. [Symbol.iterator] - run over each one of the objects; 
// ? Try accessing the EXTENSION variables + all the 'properties' in CLASS tests? [consider, whilst writing/editing...]: 
// * 'static': 
// 1. fromObject - do 2-3 times; 
// 2. empty - do once; 