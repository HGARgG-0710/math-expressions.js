/**
 * * This is the New API source code, version pre-1.0;
 * @copyright HGARgG-0710 (Igor Kuznetsov, 2023
 */

// TODO: create here a UniversalMap class; let it be virtually a map which can have arbitrary values for both the key and the value of a key...

export namespace statistics {}
export namespace util {
	// ? considering the fact that there is now the deepCopy() function (which is a generalization of copy)
	export function deepCopy(a: any): any {
		if (a instanceof Array) return a.map((el) => deepCopy(el))

		if (typeof a === "object") {
			const aCopy: object = {}
			for (const b in a) aCopy[b] = deepCopy(a[b])
			return aCopy
		}

		return a
	}

	// * A useful algorithm from a different project of mine; value-wise comparison of two arbitrary things...
	export function valueCompare(
		a: any,
		b: any,
		oneway: boolean = false
	): boolean {
		if (typeof a !== typeof b) return false
		switch (typeof a) {
			case "object":
				for (const a_ in a)
					if (!valueCompare(b[a_], a[a_])) return false
				if (!oneway) return valueCompare(b, a, true)
				return true

			default:
				return a === b
		}
	}

	// * Does a flat copy of something;
	export function flatCopy(a: any): any {
		return a instanceof Array
			? [...a]
			: typeof a === "object"
			? { ...a }
			: a
	}

	// * Replaces a value within a string...
	export function replaceStr(string: string, x: string, y: string): string {
		return string.split(x).join(y)
	}

	export function replaceStrMany(
		string: string,
		x: string[],
		y: string[]
	): string {
		// TODO: again, the repeatedApplication from a different library could do this in 1 line... Same thing with the versions...
		let final = string
		for (let i = 0; i < x.length; i++) final = replaceStr(final, x[i], y[i])
		return final
	}

	// * Replaces values within an array...
	export function replaceArr<X = any>(
		array: X[],
		x: X[],
		y: X[],
		transformation: (something: X) => X = (a: any) => a
	): X[] {
		let resArray: X[] = [...array]

		for (let i = 0; i < array.length; i++) {
			const index: number = x.indexOf(array[i])
			if (index !== -1) resArray[i] = transformation(y[index])
		}

		return resArray
	}

	// * just a convinient syntax...
	export function arrThisApply(
		f: Function,
		arr: any[],
		thisArg: any = null
	): any {
		return f.apply(thisArg, arr)
	}

	export function arrApply(f: Function, arr: any[]): any {
		return f(...arr)
	}

	export const countAppearences = (
		array: any[],
		element: any,
		i: number,
		comparison: (a: any, b: any) => boolean = (a: any, b: any): boolean =>
			a === b
	): number =>
		i < array.length
			? Number(comparison(array[i], element)) +
			  countAppearences(array, element, i + 1)
			: 0

	export function indexOfMult(
		array: any[],
		el: any,
		comparison: (a: any, b: any) => boolean = (a: any, b: any) => a === b
	): number[] {
		const indexes = []
		for (let i = 0; i < array.length; i++)
			if (comparison(array[i], el)) indexes.push(i)
		return indexes
	}
}

export namespace numbers {}

export namespace linear {}
export namespace algorithms {
	export namespace sort {}
}
export namespace abstract {
	export namespace counters {
		// * That's an example of an infinite counter;
		// * btw, it is non-linear, that is one can give to it absolutely any array, like for example [[[0, 1234566643]]], and it won't say word against it; will continue in the asked fashion...
		// * This particular nice feature allows to build different InfiniteCounters with different beginnings on it...
		// ! but its output should not be used for reference-checking things, it creates entirely new objects when being called...
		export function numberCounter(
			a?: types.RecursiveArray<number>
		): types.RecursiveArray<number> {
			if (a === undefined) return [0]

			function findDeep(
				a: types.RecursiveArray<number>,
				prevArr: number[] = []
			): number[] | false {
				let i: number[] = [...prevArr, 0]

				for (; i[i.length - 1] < a.length; i[i.length - 1]++) {
					if (a[i[i.length - 1]] instanceof Array) {
						const temp: number[] | false = findDeep(a, i)
						if (temp) return temp
					}
					if (a[i[i.length - 1]] < abstract.constants.js.MAX_INT)
						return i
				}

				return false
			}

			const resultIndexes: number[] | false = findDeep(a)
			if (!resultIndexes) return [a]

			let result: types.RecursiveArray<number> = util.deepCopy(a)

			// * Hmmm... That's a very interesting thing there...
			// * See, that thing is already in one of the unpublished projects that depend upon the math-expressions.js;
			// ? Solution: if the versions of the dependant and the dependee are different, then it's alright...;
			// TODO: implement, later, after publishing both the math-expressions.js 1.0 and the new thing...;
			for (let i = 0; i < resultIndexes.length - 1; i++) {
				const indexed: types.RecursiveArray<number> | number =
					result[resultIndexes[i]]

				if (isRecursiveArray(indexed, isNumber)) {
					result = indexed
					continue
				}

				break
			}

			let finalIndexed = result[resultIndexes[resultIndexes.length - 1]]
			if (isNumber(finalIndexed)) finalIndexed++

			return a
		}

		export function isNumber(x: any): x is number {
			return typeof x === "number"
		}

		// * an example of a typechecker for the recursive arrays...
		export function isRecursiveArray<Type>(
			x: any,
			typechecker: (a: any) => a is Type
		): x is types.RecursiveArray<Type> {
			return !typechecker(x)
		}

		// TODO: finish this thing (add orders, other things from the previous file)...
		// TODO: add the circular counters (too, an infiniteCounter, just one that is looped)

		export class InfiniteCounter<Type = types.RecursiveArray<number>> {
			next(): InfiniteCounter<Type> {
				return new InfiniteCounter<Type>(
					[...this.previous, this],
					this.generator
				)
			}
			prev(): InfiniteCounter<Type> {
				return this.previous[this.previous.length - 1]
			}

			previous: InfiniteCounter<Type>[]
			value: Type
			generator: (something?: Type) => Type

			// * 'true' means 'follows after'
			// * 'false' means 'is followed after'
			// * 'null' means 'no following';
			compare(ic: InfiniteCounter<Type>): ternary {
				return this.previous.includes(ic)
					? true
					: ic.previous.includes(this)
					? false
					: null
			}

			constructor(
				previous: InfiniteCounter<Type>[] = [],
				generator: (a?: Type) => Type
			) {
				this.generator = generator
				this.previous = previous
				this.value = previous.length
					? generator(previous[previous.length - 1].value)
					: generator()
			}
		}

		// TODO: in a library of oneself, there is a piece of code that does precisely this kind of a thing (recursiveApplication);
		// * Again, the issue with inter-dependency; solution is the same -- first publish like so, then rewrite differently...
		export function fromNumber<Type>(
			n: number | bigint,
			generator: (a?: Type) => Type
		): InfiniteCounter<Type> | undefined {
			if (n <= 0) return undefined
			let result: InfiniteCounter<Type> = new InfiniteCounter<Type>(
				[],
				generator
			)

			n = BigInt(n) - 1n
			for (let i = 0n; i < n; i++) result = result.next()
			return result
		}

		export function isBigInt(x: any): x is BigInt {
			return typeof x === "bigint"
		}

		export type ternary = true | false | null

		export namespace numerals {
			// TODO: here, add stuff for different numeral systems; create one's own, generalize to a class for their arbitrary creation...
		}
	}

	export namespace orders {
		// * For iteration over an array; this thing is index-free; handles them for the user;
		// * By taking different permutations of an array, one may cover all the possible ways of accessing a new element from a new one with this class;
		export class IterableSet<Type = any> {
			elements: Set<Type>
			typechecker: (x: any) => x is Type

			private currindex: number = 0

			curr(): Type {
				return this.elements[this.currindex]
			}

			next(): Type {
				this.currindex = (this.currindex + 1) % this.elements.size
				return Array.from(this.elements.values())[this.currindex]
			}

			add(x: Type): Set<Type> {
				return this.elements.add(x)
			}

			// TODO: I like this thing far more than any of the ways TypeScript tends to do stuff ususally in;
			// * It checks out all the trivial-to-handle type-dependant cases, but gives little ways of actually resulving them
			// * apart from explicitly telling it to shut up using a type-checker function;
			// * That's not one's way, functions arguments and generally behaviour should handle all the possible cases, using types as transformations, not TypeError invokers...
			// That's exactly the only 1 thing I don't like TypeScript for, apart from it not generalizing some concepts (like generics) into something creative...
			has(x: any): boolean {
				if (!this.typechecker(x)) return false
				return this.elements.has(x)
			}

			get size(): number {
				return this.elements.size
			}

			delete(x: any): boolean {
				if (!this.typechecker(x)) return false
				return this.elements.delete(x)
			}

			constructor(
				elems: Set<Type> = new Set<Type>([]),
				typechecker?: (x: any) => x is Type
			) {
				this.elements = elems
				this.typechecker = typechecker
			}
		}
	}

	export namespace types {
		// * This is pretty. In C would probably be more explicit with all the manual dynamic allocations, de-allocations...
		export type RecursiveArray<ElementType> = (
			| RecursiveArray<ElementType>
			| ElementType
		)[]

		export class UniversalMap<
			KeyType = any,
			ValueType = any,
			NotFoundType = any
		> {
			keys: KeyType[]
			values: ValueType[]
			notFound: NotFoundType
			notFoundChecker: (a: any) => a is NotFoundType

			referenceGet(key: KeyType): ValueType {
				return this.values[this.keys.indexOf(key)]
			}

			valueGet(key: KeyType): NotFoundType | ValueType {
				let index: NotFoundType | number = this.notFound
				let i = 0

				for (const x of this.keys) {
					if (util.valueCompare(x, key)) {
						index = i
						break
					}
					i++
				}

				return this.notFoundChecker(index) ? index : this.values[index]
			}

			set(key: KeyType, value: ValueType): ValueType {
				const index: number = this.keys.indexOf(key)
				if (index !== -1) {
					this.values[index] = value
					return value
				}

				this.keys.push(key)
				this.values.push(value)
			}

			constructor(
				keys: KeyType[],
				values: ValueType[],
				notFoundCode: NotFoundType = undefined,
				notFoundChecker: (a: any) => a is NotFoundType = (
					x: any
				): x is NotFoundType => x === undefined
			) {
				this.keys = keys
				this.values = values
				this.notFound = notFoundCode
				this.notFoundChecker = notFoundChecker
			}
		}
	}

	// TODO: add all sorts of nice programming-language-related constants here... They'd be useful in different projects;
	// * From now on, the math-expressions.js library doesn't anymore include what it had included before...
	// * Now, it's also including constants about different things, that may be useful an
	// TODO: add all the corresponding constants for all these languages too; for CPP -- add type-specific, for each compiler, architecture...
	// TODO: also, separate onto versions (where relevant;)...
	// * Currently, this thing ain't very descriptive; though, it's a wonderful idea...
	export const constants = {
		js: {
			MAX_ARRAY_LENGTH: 2 ** 32 - 1,
			MAX_NUMBER: Number.MAX_VALUE,
			MAX_INT: 2 ** 53 - 1,
			MIN_INT: -(2 ** 53 - 1),
			MIN_NUMBER: 2 ** -1074,
			MAX_STRING_LENGTH: 2 ** 53 - 1,
			MAX_VARIABLE_NAME_LENGTH: 254,
		},
		cpp: {
			MAX_ARRAY_LENGTH: Infinity,
			MAX_VARIABLE_NAME_LENGTH: 255,
		},
		java: {
			MAX_ARRAY_LENGTH: 2 ** 31 - 1,
			MAX_VARIABLE_NAME_LENGTH: 64,
		},
		python: {
			MAX_INT: Infinity,
			MIN_INT: -Infinity,
			MAX_VARIABLE_NAME_LENGTH: 79,
		},
		lua: {
			MAX_VARIABLE_NAME_LENGTH: Infinity,
		},
		c: {
			MAX_VARIABLE_NAME_LENGTH: Infinity,
		},
	}
}
