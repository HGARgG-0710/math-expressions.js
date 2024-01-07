// * Various integer-related algorithms tests

import { integer } from "../src/modules/exports/algorithms.mjs"

const {...a} = integer

// ! List [from "algorithms.mjs"] (CONSIDER THE METHODS IN QUESTION FOR NEGATIVES AFTER HAVING WRITTEN THE POSITIVES TESTS... + THE 'native' ARE ALSO A CHECK OF THE 'finite' method...):
// 	algorithms.integer.native.primesBefore - do twice for different arguments;  (note, all results -- print out...)
// 	algorithms.integer.native.sumRepresentations - do three-four times for different arguments;
// 	algorithms.integer.native.factorOut - do three-four times for different arguments
// 	algorithms.integer.native.isPrime - do four-five times for different numbers (primes and non-primes, including the edge cases, such as 0, 1);
// 	algorithms.integer.native.multiples - do four-five times for primes/non-primes, including special cases (such as 0, 1);
// 	algorithms.integer.native.multiplesBefore - do three-four times for different numbers (primes and non-primes);
// 	algorithms.integer.native.lcm - do three-five times for different arrays of numbers, CHECK THE MULTIPLE (>2) CASES...;
// 	algorithms.integer.native.lcd - same as 'lcm'; Check for 'empty' cases additionally; (Such that, lcm(a1, ..., an) = a1*...*an)
// 	algorithms.integer.native.areCoprime - same as 'lcd';
// 	algorithms.integer.native.allFactors - same as 'factorOut'; 
// 	algorithms.integer.native.isPerfect - same as 'isPrime'; 
// 	algorithms.integer.native.factorial - compute for several (3-5) different values, ensure it works...
// 	algorithms.integer.native.binomial - compute for 4-9 different pairs of numbers; 
// * SAME AS 'native', but do it several times for different classes (2-3 summarily) to make sure...
// 	algorithms.integer.factorOut
// 	algorithms.integer.isPrime
// 	algorithms.integer.primesBefore
// 	algorithms.integer.multiples
// 	algorithms.integer.multiplesBefore
// 	algorithms.integer.lcm
// 	algorithms.integer.lcd
// 	algorithms.integer.areCoprime
// 	algorithms.integer.allFactors
// 	algorithms.integer.isPerfect
// 	algorithms.integer.factorial
// 	algorithms.integer.binomial
// 	algorithms.integer.sumRepresentations
