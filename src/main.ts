export namespace statistics {}
export namespace util {}

export namespace linear {}
export namespace algorithms {
	export namespace sort {}
}
export namespace abstract {
	export namespace counters {
		// TODO: finish this thing (add orders, other things from the previous file), continue rewriting the previous implementation of this into TypeScript...
		// TODO: add one's previous example-implementation of one such infinite-counter; 
		export class InfiniteCounter<Type> {
			generator: (something?: Type) => Type
			previous: Type[]
			next(): InfiniteCounter<Type> {
				return new InfiniteCounter<Type>(
					[...this.previous, this.value],
					this.generator
				)
			}
			value: Type
			prev(): Type {
				return this.previous[this.previous.length - 1]
			}
			constructor(previous: Type[] = [], generator: (a?: Type) => Type) {
				this.generator = generator
				this.previous = previous
				this.value = previous.length
					? generator(previous[previous.length - 1])
					: generator()
			}
		}
	}

	export namespace orders {}

	// * This is pretty. In C would probably be more explicit with all the manual dynamic allocations, de-allocations...
	export type RecursiveNumberArray = (RecursiveNumberArray | number)[]

	export namespace constants {
		// TODO: add all sorts of nice programming-language-related constants here... They'd be useful in different projects;
		// * From now on, the math-expressions.js library doesn't anymore include what it had included before...
		// * Now, it's also including constants about different things, that may be useful and interesting...

		export namespace js {
			export const MAX_ARRAY_LENGTH = 2 ** 32 - 1
			export const MAX_NUMBER = Number.MAX_VALUE
			export const MAX_INT = 2 ** 53 - 1
			export const MIN_INT = -MAX_INT
			export const MIN_NUMBER = 2 ** -1074
		}

		// TODO: add all the corresponding constants for all these languages too; for CPP -- add type-specific, for each compiler...
		export namespace cpp {}

		export namespace java {}

		export namespace python {}

		export namespace lua {}
	}
}
