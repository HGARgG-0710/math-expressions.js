// deno-lint-ignore-file no-namespace no-explicit-any ban-types no-inferrable-types
/**
 * * This is the New API source code, version pre-1.0;
 * @copyright HGARgG-0710 (Igor Kuznetsov, 2023
 */

// TODO: create here a UniversalMap class; let it be virtually a mapwhich can have arbitrary values for both the key and the value of a key...

import { dim, max, generate } from "./oldapi"

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
		// * do code-update...
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
		i: number = 0,
		comparison: (a: any, b: any) => boolean = (a: any, b: any): boolean =>
			a === b
	): number =>
		i < array.length
			? Number(comparison(array[i], element)) +
			  countAppearences(array, element, i + 1, comparison)
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

	// ? which one to use as an export? (they will both be kept in any case...)
	// * Current decision: the newer one (one below);
	// * Alternative implementation (this time, with a searchIndex -- i parameter):
	// export const indexOfMult = (
	// 	array: any[],
	// 	el: any,
	// 	comparison: (a: any, b: any) => boolean = (a: any, b: any) => a === b,
	//  i: number = 0
	// ) => {
	//		if (i >= array.length) return []
	// 		const next = indexOfMult(array, el, comparison, i + 1)
	// 		return comparison(array[i], el) ? [i, ...next]: [...next]
	// }

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

	// TODO: this thing don't copy an array; It changes the existing one (namely, changes the reference)...
	// * Rewrite so that it returns a new one...
	export function gutInnerArrsRecursive(array: any[]): any[] {
		while (hasArrays(array)) array = gutInnerArrs(array)
		return array
	}

	// TODO: another one's library has a method for this thing (boolmapMult; maps a set of boolean functions to a set of values forming a 2d boolean array...)
	// * code-update...
	export const hasArrays = (array: any[]): boolean =>
		max(array.map((a: any) => Number(a instanceof Array))) === 1

	// * "reverses" the gutInnerArrs (only once, at a given place)
	export function arrEncircle(
		a: any[],
		from: number = 0,
		to: number = a.length
	): any[] {
		const copied: any[] = []

		for (let i = 0; i < a.length; i++) {
			if (i >= from && i <= to) {
				copied.push(a.slice(from, to + 1))
				i = to
			}
			copied.push(a[i])
		}

		return copied
	}

	// todo: generalize (using the notion of 'level'); Having generalized, pray get rid of this thing...
	// * copies array's structure deeply without copying the elements
	// ? create one similar such, except an even largetly generalized? (using the notion of 'objectType' and whether something matches it, for example?)
	export function arrStructureCopy(thing: any): any {
		if (thing instanceof Array) return thing.map(arrStructureCopy)
		return thing
	}

	// TODO: write the gutInnerObjs function, as well as guttInnerObjsRecursive; principle is same as the array functions;
	// TODO: the same way, write objEncircle; there'd also be an argument for the key;
	// TODO: the same way, write "encircle" functions for the UniversalMaps and InfiniteMaps (maybe, make these a method of theirs (too?)?)
	// TODO: write the same one for the UniversalMap(s) and InfiniteMap(s) (they would differ cruelly...)

	// TODO: write methods for encircling a piece of an array with an object (also takes the keys array...) and a piece of an object with an array;
	// * Same permutations for the InfiniteMap and UniversalMap...

	// TODO: add more methods to UniversalMap and InfiniteMap;
	// * Create the .map methods for them -- let they be ways of mapping one set of keys-values to another one;
}

export namespace numbers {
	// TODO: add all the generic infinite number classes one had been thinking about (based on the InfiniteCounter...);
}

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
					// ? should this be submitted to their Issues? (one didn't check if this was an actual thing with the compiler, though Linter's behaviour suggests that it is)
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

				// TODO: THIS DOESN'T WORK; oldapi dim() handles only finitely deep arrays (id est, it's useless...); do the thing manually here... newapi 'dim' will use the numberCounter...
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

		// TODO: add the circular counters (too, an infiniteCounter, just one that is looped)

		// TODO: finish this thing (add orders, other things from the previous file)...
		// TODO: add ways of 'jumping' forward onto a 'number | InfiniteCounter' of steps, along with an order of some kind (which would map the wanted thing to the wanted quantity of steps);
		// TODO: add a way of transforming the given InfiniteCounter into a TrueInteger on-the-go and back again; This allows to use them equivalently to built-in numbers (their only difference currently is counter arithmetic...)

		// ! There is a problem with this class: The array is used for "InfiniteCounter.previous"; Because of this, there is only limited number of previous members that can be;
		// TODO: create an InfiniteArray type and put it there (not just an `InfiniteArray<T = any> := InfiniteMap<InfiniteCounter<number>, T, undefined>)...
		// * With the approach outlined in the brackets, there is a difficulty -- infinite recursion (dependency); So, instead, one should pick an alternative one...
		// * Example of an implementation -- same, but the InfiniteCounter of an InfiniteArray is hardcoded into itself (uses the numberCounter, for example...);
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
			// TODO: add the 'comparison' argument here. One may want to abstract from the references (current thing in certain circumstances don't work)...
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

		// TODO document what does this do properly...
		// TODO: pray re-order the library's new API again (don't seem to completely like the way it looks like currently...)
		export function sameStructure<T = any>(
			array: types.RecursiveArray<T>,
			generator: (x?: any) => any,
			currval: any = undefined,
			copy: boolean = true,
			subcall: boolean = false
		): any {
			const copied = copy ? util.deepCopy(array) : array

			for (let i = 0; i < copied.length; i++) {
				const index = copied[i]
				if (index instanceof Array) {
					currval = sameStructure<T>(
						index,
						generator,
						currval,
						false,
						true
					)
					continue
				}
				currval =
					currval === undefined ? generator() : generator(currval)
				copied[i] = currval
			}

			return !subcall ? currval : copied
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

		// TODO: currently, work with the RecursiveArrays is such a pain; Do something about it;
		// * The matter of recursiveIndexation and other such library things (code re-doing) would solve a considerable part of the problem;
		// TODO: finish this thing... (as well as others...)
		export class InfiniteArray<Type = any> {
			private index: RecursiveArray<boolean>
			private array: RecursiveArray<Type>

			currIndex() {
				return this.index
			}

			next() {
				const path: number[] = this.currElement()
				let index: RecursiveArray<boolean> | boolean = this.index
				let array: RecursiveArray<Type> | Type = this.array
				// TODO: library... repeatedIndexation... refactor...(these todos are just markers for the future...)
				for (let i = 0; i < path.length - 1; i++) {
					index = index[path[i]]
					array = array[path[i]]
				}
				index[path[path.length - 1]] = 0
				// TODO: as one have decided that the InfiniteArrays can have user-defined, there comes the question of finding and marking the next index... do this
			}

			currElement(): number[] {
				let current: RecursiveArray<boolean> | boolean = this.index

				function recursive(): number[] | false {
					let prevCurrent = current
					let temp: number[] | boolean = false

					if (prevCurrent instanceof Array) {
						for (let i = 0; i < prevCurrent.length; i++) {
							current = prevCurrent[i]

							if (typeof current === "boolean") {
								if (current) return [i]
								continue
							}

							temp = recursive()
							if (temp !== false) return [i, ...temp]
						}

						current = prevCurrent
					}

					return false
				}

				// * shutting TypeScript up...
				return recursive() as number[]
			}

			// TODO: implement a safe-check that the last element of the last of the last ... of the last array IS, in fact, a RecursiveArray<Type>; if not, pray do change the structure of the final array,
			constructor(objects: RecursiveArray<Type>) {
				this.array = objects
				counters.sameStructure<Type>(this.array, () => false)
				if (this.index.length >= 1) this.index[0] = true
			}
		}

		// ? Should one not then write the InfiniteArray class, then use it in the InfiniteString class (not to repeat the same things all over again)?
		// TODO: finish the InfiniteString class; It would allow work like with a string, though would be based on the InfiniteCounter/TrueInteger classes...
		// * Let it have all the capabilities (methods, properties) of a string and more -- let there be a way to reverse() it natively...;
		export class InfiniteString<IndexType = number> {
			private string: RecursiveArray<string>
			length: counters.InfiniteCounter<IndexType>
			indexGenerator: (a?: IndexType) => IndexType

			append(x: string | InfiniteString<IndexType>) {
				// ? generalize and then make an export ?
				function appendStrRecursive(
					str: string,
					thisArg: InfiniteString<IndexType>,
					i: number = 0
				): void {
					// TODO: replace with repeatedApplication or recursiveIndexation or something such within a different library...
					let currLevel = thisArg.string

					for (let j = 0; j < i; j++) {
						// * again, TypeScript...
						const indexed = currLevel[currLevel.length - 1]
						if (typeof indexed === "string") break
						currLevel = indexed
					}

					if (currLevel.length < constants.js.MAX_ARRAY_LENGTH - 1) {
						thisArg.length = thisArg.length.next()
						currLevel.push(str)
						return
					}

					if (currLevel.length === constants.js.MAX_ARRAY_LENGTH - 1)
						currLevel.push([])

					return appendStrRecursive(str, thisArg, i + 1)
				}

				function appendInfStringRecursive(
					arr: InfiniteString<IndexType>,
					thisArg: InfiniteString<IndexType>
				) {
					for (let i = 0; i < arr.string.length - 1; i++) {
						const currStr = arr.string[i]
						if (typeof currStr !== "string") break
						appendStrRecursive(currStr, thisArg)
					}
					if (arr.string.length === constants.js.MAX_ARRAY_LENGTH) {
						appendInfStringRecursive(
							new InfiniteString<IndexType>(
								arr.string[arr.string.length - 1],
								arr.indexGenerator
							),
							this
						)
					}
				}

				if (typeof x === "string") return appendStrRecursive(x, this)
				return appendInfStringRecursive(x, this)
			}

			copy() {
				return util.deepCopy(this)
			}

			// TODO: allow for use of the InfiniteString as an argument... (That is, copying an InfiniteString; new instance is by default its extension...)
			// TODO: allow for use of the RecursiveArray<string>... (for this, generalize the last element-safety check...)
			constructor(
				initial: string | RecursiveArray<string>,
				indexGenerator: (x?: IndexType) => IndexType
			) {
				if (typeof initial === "string") {
					this.string = [initial]
					return
				}

				this.string = initial
				// TODO: use the util.gut... and util.encircle... functions for the finalized check (make it all the same form -- [string, ...., pointer to RecursiveArray<string>])
				if (initial.length === constants.js.MAX_ARRAY_LENGTH) {
					this.string[this.string.length - 1] = [
						this.string[this.string.length - 1],
					]
				}
				this.length = counters.fromNumber(
					initial.length,
					indexGenerator
				)
				this.indexGenerator = indexGenerator
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
