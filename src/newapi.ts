// deno-lint-ignore-file no-namespace no-explicit-any ban-types no-inferrable-types
/**
 * * This is the New API source code, version pre-1.0;
 * @copyright HGARgG-0710 (Igor Kuznetsov, 2023
 */

// TODO: create here a UniversalMap class; let it be virtually a mapwhich can have arbitrary values for both the key and the value of a key...

import { dim, max } from "./oldapi"

export namespace statistics {}
export namespace util {
	// ? some of these things are quite good with the arrays.... Question: should Mr. Body be adding those for some kind of "uniter" structure? (Like the Statistics and other such classes from the oldapi, other classes from other packages?)

	// ? considering the fact that there is now the deepCopy() function (which is a generalization of copy)
	export function deepCopy(a: any): any {
		if (a instanceof Array) return a.map((el) => deepCopy(el))

		if (typeof a === "object") {
			// TODO: use the Key type from a different library of self's...
			// * After the release, there will be a very big lot of code-updating to be done... Looking forward to it...
			const aCopy: { [key: symbol | string | number]: any } = {}
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
		const resArray: X[] = [...array]

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

	// * clears all but the first `tokeep` repetition of `el`
	export function clearRepetitions(
		arr: any[],
		el: any,
		tokeep: number = 0,
		comparison: (a: any, b: any) => boolean = (a: any, b: any) => a === b
	): any[] {
		const firstMet = indexOfMult(arr, el, comparison)
		return firstMet.length
			? arr.filter(
					(a, i) => firstMet.indexOf(i) < tokeep || !comparison(a, el)
			  )
			: [...arr]
	}

	export function splitArr(
		arr: any[],
		el: any,
		comparison: (a: any, b: any) => boolean
	): any[][] {
		const segments: [number, number][] = []
		let begInd = 0
		let endInd = 0

		for (let i = 0; i < arr.length; i++)
			if (comparison(el, arr[i])) {
				begInd = endInd + Number(Boolean(endInd))
				endInd = i
				segments.push([begInd, endInd])
			}

		return segments.map((seg: [number, number]) => arr.slice(...seg))
	}

	// * "guts" the first layer inner arrays into the current one...
	export function gutInnerArrs(array: any[]): any[] {
		const returned: any[] = []

		for (let i = 0; i < array.length; i++) {
			if (array[i] instanceof Array) {
				array[i].forEach(returned.push)
				continue
			}
			returned.push(array[i])
		}

		return returned
	}

	export function gutInnerRecursive(array: any[]): any[] {
		while (hasArrays(array)) array = gutInnerArrs(array)
		return array
	}

	// TODO: another one's library has a method for this thing (boolmapMult; maps a set of boolean functions to a set of values forming a 2d boolean array...)
	// * code-update...
	export const hasArrays = (array: any[]): boolean =>
		max(array.map((a: any) => Number(a instanceof Array))) === 1
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

			// ? put these two out of the function's context?
			function findDeepUnfilledNum(
				a: types.RecursiveArray<number>,
				prevArr: number[] = []
			): number[] | false {
				const i: number[] = [...prevArr, 0]

				for (; i[i.length - 1] < a.length; i[i.length - 1]++) {
					const indexed = a[i[i.length - 1]]
					if (indexed instanceof Array) {
						const temp: number[] | false = findDeepUnfilledNum(a, i)
						if (temp) return temp
						continue
					}
					if (indexed < abstract.constants.js.MAX_INT) return i
				}

				return false
			}

			function findDeepUnfilledArr(
				a: types.RecursiveArray<number>,
				prevArr: number[] = []
			): number[] | false {
				const i: number[] = [...prevArr, 0]

				for (; i[i.length - 1] < a.length; i[i.length - 1]++) {
					// ! noticed another "percularity" about TypeScript (one of those things that had been previously called "stupidity");
					// * When an expression is being checked for something without the value of that expression changeing...
					// * The thing won't react to the type-check! This is a very bright example: one would not call the thing in question 'indexed' had it worked without it;
					// ? should this be submitted to their Issues?
					const indexed = a[i[i.length - 1]]
					if (indexed instanceof Array) {
						if (indexed.length < abstract.constants.js.MAX_INT)
							return i
						const temp: number[] | false = findDeepUnfilledArr(a, i)
						if (temp) return temp
					}
				}

				return false
			}

			let resultIndexes: number[] | false = findDeepUnfilledNum(a)
			const _result: types.RecursiveArray<number> = util.deepCopy(a)
			let result = _result

			if (!resultIndexes) {
				resultIndexes = findDeepUnfilledArr(a)
				if (!resultIndexes) return [a]

				// TODO: again, the same thing as below...
				for (let i = 0; i < resultIndexes.length - 1; i++) {
					const indexed: types.RecursiveArray<number> | number =
						result[resultIndexes[i]]

					if (indexed instanceof Array) {
						result = indexed
						continue
					}

					break
				}

				const finalDimension = dim(a) - resultIndexes.length
				// todo: again, the same thing as below...
				for (let i = 0; i < finalDimension; i++) {
					result.push([])
					const last = result[result.length - 1]
					if (!isNumber(last)) result = last
				}

				result.push(0)
				return _result
			}

			// * Hmmm... That's a very interesting thing there...
			// * See, that thing is already in one of the unpublished projects that depend upon the math-expressions.js;
			// ? Solution: if the versions of the dependant and the dependee are different, then it's alright...;
			// TODO: implement, later, after publishing both the math-expressions.js 1.0 and the new thing...;
			// ! the check is, again, only for TS to shut up...
			for (let i = 0; i < resultIndexes.length - 1; i++) {
				const indexed: types.RecursiveArray<number> | number =
					result[resultIndexes[i]]

				if (indexed instanceof Array) {
					result = indexed
					continue
				}

				break
			}

			let finalIndexed = result[resultIndexes[resultIndexes.length - 1]]
			if (isNumber(finalIndexed)) finalIndexed++ // this is for TypeScript to shut up only...

			return _result
		}

		export function isNumber(x: any): x is number {
			return typeof x === "number"
		}

		// TODO: the thing with the booleans used can also be replaced by a function from a different unpublshed library...
		// * an example of a typechecker for the recursive arrays...
		export function isRecursiveArray<Type>(
			x: any,
			typechecker: (a: any) => a is Type
		): x is types.RecursiveArray<Type> {
			return (
				x instanceof Array &&
				Math.min(
					...x.map((a: any) =>
						Number(
							isRecursiveArray<Type>(a, typechecker) ||
								typechecker(a)
						)
					)
				) === 1
			)
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
				return Array.from(this.elements.values())[this.currindex]
			}

			next(): Type {
				// ? should self be creating a new method "updateIndex()"? This could be more useful than this... Saves time, one don't always have to have the output...
				// * Current decision: yes, let it be.
				// TODO: pray do that...
				this.currindex = (this.currindex + 1) % this.elements.size
				return this.curr()
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
				typechecker: (x: any) => x is Type = (x: any): x is Type => true
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

		export type map<KeyType, ValueType, NotFoundType> = {
			keys: KeyType
			values: ValueType
			notFound: NotFoundType
			notFoundChecker: (a: any) => a is NotFoundType
		}

		export class UniversalMap<
			KeyType = any,
			ValueType = any,
			NotFoundType = any
		> implements map<KeyType[], ValueType[], NotFoundType>
		{
			keys: KeyType[]
			values: ValueType[]
			notFound: NotFoundType
			notFoundChecker: (a: any) => a is NotFoundType

			get(
				key: KeyType,
				comparison: (a: any, b: any) => boolean = (a: any, b: any) =>
					a === b,
				number: number = 1
			): ValueType[] | NotFoundType {
				const indexes = util.indexOfMult(this.keys, key, comparison)
				if (indexes.length === 0) return this.notFound
				return indexes
					.slice(0, number)
					.map((i: number) => this.values[i])
			}

			set(
				key: KeyType,
				value: ValueType,
				comparison: (a: any, b: any) => boolean = (a: any, b: any) =>
					a === b
			): ValueType {
				const index: number[] = util.indexOfMult(
					this.keys,
					key,
					comparison
				)

				if (index.length !== 0) {
					for (const _index of index) this.values[_index] = value
					return value
				}

				this.keys.push(key)
				this.values.push(value)
				return value
			}

			constructor(
				keys: KeyType[],
				values: ValueType[],
				notFound: NotFoundType | undefined = undefined,
				notFoundChecker: (a: any) => a is NotFoundType = (
					x: any
				): x is NotFoundType => x === undefined
			) {
				this.keys = keys
				this.values = values
				this.notFound = notFound
				this.notFoundChecker = notFoundChecker
			}
		}

		// TODO: add an InfiniteMap class; the UniversalMap has a limitation of 2**32 - 1 elements on it, whilst the InfiniteMap would have no such limitation...
		export class InfiniteMap<
			KeyType = any,
			ValueType = any,
			NotFoundType = any
		> implements
				map<
					RecursiveArray<KeyType>,
					RecursiveArray<ValueType>,
					NotFoundType
				>
		{
			keys: RecursiveArray<KeyType>
			values: RecursiveArray<ValueType>
			notFound: NotFoundType
			notFoundChecker: (a: any) => a is NotFoundType

			isKeyType: (x: any) => x is KeyType
			isValueType: (x: any) => x is ValueType

			// TODO: finish this later... Mr. Body feels tired...
			// * Here, one should implement the algorithms for setting an index of interest (which depends on the current length of the array), to a given value; It comes down to finding the first free index, restructuring the array recursively and creating one, if there isn't...;
			set(key: KeyType, value: ValueType): ValueType {}

			// * Here, one finds the fitting keys, returns an array of their values;
			get(
				key: RecursiveArray<KeyType>,
				comparison: (a: any, b: any) => boolean = (a: any, b: any) =>
					a === b,
				number: number
			): ValueType[] | NotFoundType {}

			constructor(
				keys: RecursiveArray<KeyType>,
				values: RecursiveArray<ValueType>,
				notFound: NotFoundType | undefined = undefined,
				notFoundChecker: (a: any) => a is NotFoundType = (
					x: any
				): x is NotFoundType => x === undefined,
				keyTypeChecker: (x: any) => x is KeyType,
				valuetypeChecker: (x: any) => x is ValueType
			) {
				this.keys = keys
				this.values = values
				this.notFound = notFound
				this.notFoundChecker = notFoundChecker
				this.isValueType = valuetypeChecker
				this.isKeyType = keyTypeChecker
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
