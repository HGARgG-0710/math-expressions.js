// * Tests of the 'Farey' algorithm

import { numbers } from "./../src/modules/exports/algorithms.mjs"

const Farey = numbers.farey

// Tests: test for different (in number of 2-4, depending on choice) TrueInteger and TrueRatio classes (2-4 is the number of PAIRS of different classes), and distinct beginning-ending numbers (3-4 per single class) and durations (1-2 per a case); 