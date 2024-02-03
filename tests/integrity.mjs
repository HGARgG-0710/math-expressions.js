// * This test is for checking the integrity of values of exports of all library modules 

// ! ADD THINGS HERE... [use 'entities.txt' file]; 
// % Plan for organization: 
// 1. Import all the exports (using different names from all the exporting modules of the library); 
// 2. check each and every one for whether they are undefined [uncomment them first, do it one-by-one...]; 
// 3. fix missing values by need (via changing orders of definitions, other such changes); 

// ! This includes templates-checks (namely, if there are some of them that are still undefined); 
// * 'Colourful' example - the 'algorithms.arrays' using the general.DEFAULT_GENARRCLASS before it's been initialized (and, in the end, causing it to be undefined...); 
// ^ REMEMBER! JS DOES NOT HAVE UNDEFINED VARIABLES' RESOLUTION OPTIONS...; 