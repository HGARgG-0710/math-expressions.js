// * The 'Expressions' API module, historically the earliest part of the library to emerge (differs violently from the first prototypes)

export { evaluate, uevaluate, Expression, composition, FunctionCall } from "../../lib.mjs"

// ? Create an alias here for the different kinds of 'repeatedApplication' of Expression upon itself? [so as to be able to build recursive Expressions from various user-given data quickly and not by-hand?]
