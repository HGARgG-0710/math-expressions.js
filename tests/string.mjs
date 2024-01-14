// * Various methods related to strings

import { string } from "../src/modules/exports/native.mjs"

const { strmethod, reverse, map, replace, UTF16 } = string

console.log(strmethod.toString())
console.log(reverse.toString())
console.log(map.toString())

// ! add arguments
console.log(reverse())
console.log(reverse())
console.log(reverse())
console.log(reverse())

// ! add arguments
console.log(map())
console.log(map())
console.log(map())
console.log(map())

// ! Add arguments
console.log(replace.sreplaceFirst())
console.log(replace.sreplaceFirst())
console.log(replace.sreplaceFirst())
console.log(replace.sreplaceFirst())

// ! Add arguments
console.log(replace.sreplaceIndex())
console.log(replace.sreplaceIndex())
console.log(replace.sreplaceIndex())
console.log(replace.sreplaceIndex())

// ! Add arguments
console.log(replace.sreplaceIndexes())
console.log(replace.sreplaceIndexes())
console.log(replace.sreplaceIndexes())
console.log(replace.sreplaceIndexes())

// ! Add arguments [include the 'exotic' value ranges, single symbols, latin, non-latin, everything...];
console.log(UTF16())
console.log(UTF16())
console.log(UTF16())
console.log(UTF16())
console.log(UTF16())
console.log(UTF16())
console.log(UTF16())
console.log(UTF16())

// ! Add arguments
console.log(replace.sreplace())
console.log(replace.sreplace())
console.log(replace.sreplace())
console.log(replace.sreplace())

// ! Add arguments
console.log(replace.sreplaceArr())
console.log(replace.sreplaceArr())
console.log(replace.sreplaceArr())
console.log(replace.sreplaceArr())

// ! Add arguments for the test
console.log(replace.sreplaceIndexesMult())
console.log(replace.sreplaceIndexesMult())
console.log(replace.sreplaceIndexesMult())
console.log(replace.sreplaceIndexesMult())
console.log(replace.sreplaceIndexesMult())

// ! Add arguments for the test
console.log(replace.replaceMany())
console.log(replace.replaceMany())
console.log(replace.replaceMany())
