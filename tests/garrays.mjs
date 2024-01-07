// * Testing of GeneralArray and its instances

// ! List [from 'types.mjs']:
import { arrays } from "./../src/modules/exports/types.mjs"

for (const garrclassname of ["LastIndexArray", "DeepArray", "CommonArray"]) {
	const garrclass = arrays[garrclassname]()
	const e = garrclass.static.empty()
	console.log(e.array)
	// * List [tests' sketches/descriptions] - performed on the 'e' array and others (NOTE: EACH ONE MUST BE ALSO RUN WITH DEFAULTS TO CHECK THEM FOR VALIDITY...): 
	// 1. currelem(), next(); Test Description: get the '.currelem()' of the array, while going over it with 'arr.next()'; 
	// 2. previous(); same as the tests before...; 
	// 3. pushback(); Add a couple of new elements to the array in question; 
	// 4. pushfront(); Same as 'pushback'; 
	// 5. begin(); run it with/without false, print out the .currindex/.currelem(); 
	// 6. end(); same as begin()
	// 7. init(); print out the result of the function
	// 8. finish(); same as 'init()'; 
	// 9. go(); run, print out the .currindex, .currelem(); 
	// 10. jump(); same as 'go'; 
	// 12. move(), movedirection(), movebackward(), moveforward(); decide some interesting (result not same as in '.go()') + standard (result same as '.go') arguments for these, run, all else - same as '.go' test; 
	// 13. read(), write(); read, write for two separate indexes, print out the results; 
	// 14. length(); print out the length, then do some different length-altering operations on it (.concat, .pushback, .delete, .delval), print out after each operation
	// 15. copied(); run with a method, check that arrays aren't the same; 
	// 16. multcall; choose a method, run it with 'multcall' (2 times is enough); 
	// 17. copy(); choose two functions, run with them, then change a 'template' twice - once with isclass=true, another with isclass=false; 
	// 18. delval(); choose 2 different values for a pair of different comparisons, run with each ;
	// 19. shiftForward(); choose 2 different counter values, shift by each one of them;  
	// 20. shiftBackward(); reverse the 'shiftForward' test, plus delete some additional elements with a 3rd test; 
	// 21. repeat(); choose two arbitrary counters, repeat() the array for them; 
	// 22. reverse(); reverse two different arrays; 
	// 23. map(); map the current array to another one twice (each result to be printed out separately...), then - once with a new template, and another time - with a new class (same as '.copy'); 
	// 24. isEmpty(); create an empty array, run on it, again - on a non-empty array; 
	// 25. sort(); -  sort two arrays given wanted predicates; 
	// 26. isSorted() - check six times - once, on an array sorted with one of the predicates (from 'sort' test), then - different predicate (same array), then same predicate (different array) and different predicate (different array), then check for both predicates on a completely new array that isn't supposed to be sorted over either of them...; 
	// 27. slice() - do multiple 'copied("slice")' of the same array, print them, then do the same thing on the array in question (3rd - new slice); 
	// 28. keys() - iterate over 'keys' for two arrays, print each key out via '.read()'; 
	// 29. fillfrom() - twice, fill the arrays from differently decided points with distinct elements; 
	// 30. convert() - choose two different templates for the array in question...;
	// 31. [Symbol.iterator] - print out each of the elements of the array obtained in a loop (twice, 2 varying arrays); 
	// 32. switchclass() - same as 'convert()', but with classes; 
	// 33. swap() - 2 times swap elements of two distinct arrays (2*2 = 4 tests...); 
	// 34. delete() - for an array, delete an element by the index twice (different indexes); 
	// 35. deleteMult() - for two sections of array, perform twice...
	// 36. projectComplete() - project one array on another, 2 times; 
	// 37. projectFit() - same as 'projectComplete'; 
	// 38. insert() - insert a new value inside two different arrays twice; 
	// 39. indexesOf() - do thrice - once for 'halt=false', and two more for 'halt=true' and different values for haltAfter; 
	// 40. firstIndex() - do two times on one array, first with default comparison, then with another one...
	// 41. includes() - same as 'firstIndex'; 
	// 42. suchthat() - get 2 array property-slices; 
	// 43. any() - do two times on one array using two different predicates (one would return false, another - true); 
	// 44. every() - same as 'any'; 
	// 45. forEach() - take two functions to perform + do the defaults run (with VOID); 
	// 46. intersection() - do twice, for two different arrays of arrays; 
	// 47. permutations() - run twice for two different arrays
	// 48. join() - join 2 arrays of arrays with different separators; 
	// 49. strjoin () - join 2 unequal arrays into strings; 
	// 50. split () - split an array twice using two different separators; 
	// 51. splitlen() - split an array twice using two different lengths; 
	// 52. splice() - from two different indexes and different times values, same array; 
	// 53. one () - print out the result; 
	// 54. two () - print out the result; 
	// 55 [for DeepArray, LastIndexArray only] for potence - check (allocating additional memory for Node) if they go beyond the MAX_ARRAY_LENGTH lenght-point for lengths of their array instances, using '.pushback()'; 
	// 	! NOTE: this means having values that would (potentially) cause the array to 'use' a new level...; 

	// ! .static: 
	// 1. fromArray - return garrclass.static.fromArray() for arrays of different sizes (1-2 samples is enough, see that they behave adequately...)
	// 2. zero(), one(), two() - print out the results for each one of the classes; 
	// 3. empty() - done at the beginning, at least once for each of the classes; print out the call's results; 
	// 4. fromCounter() - for each one of the classes do twice-thrice for two different counters (2-3*3 = 6-9 cases); print out the results; 
	// 5. pushbackLoop(), pushfrontLoop() - already tested in the '.copy()' and '.reverse()'; No need to add those, just in case - print out the .toString() values to ensure all's valid...; 
}

// ! tests list for TypedArray: create 1-3 class examples, that would ensure that the types in question are preserved...