// * Testing of the InfiniteCounter classes

import { InfiniteCounter } from "../src/modules/exports/types.mjs"

// ! methods [tests sketches' list] (repeat for 2-4 classes by-choice with different templates): 
// * 1. next - for three different counters of each class (3*2-4), call a 'next' once-twice (1-2*3*2-4 = 6-24); 
// * 2. previous - same as 'next', reverse the operations chosen for it, ensure that they really are the same...; 
// * 3. direction - create, for each class 3 counters (one - .zero(), another with .direction()=false, another, with .direction()=true), then print out their '.direction()'; 
// * 4. compare - compare for each class 2 different counters; verify the results by means of printing out; 
// * 5. difference - same as 'compare', but with 3 different counters; 
// * 6. jumpDirection - for 2 different counters for each class, jump in two different directions; check that it works...
// * 7. jump() - [either don't test at all, instead check the 'whileloop', or test like the following]: for 1-2 different counters for each class, create some 'exotic' jumping conditions, then check with those...
// * 8. loop() - for 2-3 different classes of those present, create a loop over a newly created counter; 
// * 9. jumpForward() - check same as jumpDirection() for 'non-negative' values; 
// * 10. jupmBackward() - check same as jumpDirection() for 'negative' values; 
// * 11. map() - map each one of the class insatnces to all the others (2-4*(1-3) cases... ranges are dependant); 
// * 12. reverse() - run once for each instance of each one of the classes; 
// * 13. copy() - copy each one of the counters in question (once for each class), then ensure that those are, indeed, copies (print out if 'refCompare' for them and their components are true or not...); 
// * 14. equal() - check once for each class on copies, check once for each class on '.mapped()' values for each one other class; 
// * 15. [Symbol.iterator] - run over different classes' 
// * 16. zero, one, two - print out the results for each one of the class instances, check their correctness; 
// ! '.static': 
// 1. direction() - make sure it still works (print out the result of it's calling for three different counters from before, compare with the original results...); 