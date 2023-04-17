import { valueCompare } from "../infinite/util.mjs"

function UniversalMap(notfound) {
	return template({ notfound: notfound }, function (keys = [], values = []) {
		return {
			keys: keys,
			values: values,
			class: this,
			get(key, comparison = valueCompare, number = 1) {
				const indexes = indexOfMult(this.keys, key, comparison)
				if (indexes.length === 0) return this.notFound
				return indexes.slice(0, number).map((i) => this.values[i])
			},
			set(key, value, comparison = valueCompare) {
				const index = indexOfMult(this.keys, key, comparison)
				if (index.length !== 0) {
					for (const _index of index) this.values[_index] = value
					return value
				}
				this.keys.push(key)
				this.values.push(value)
				return value
			}
		}
	})
}

// TODO: work with the idea! Create nestedTemplate and so on...
// * Create the Universal and infinite versions for this...
// * Same todo stands for the infinite and universal versions...
function template(defaultobject, classObj) {
	return { ...defaultobject, class: classObj }
}

// * For iteration over an array; this thing is index-free; handles them for the user;
// * By taking different permutations of an array, one may cover all the possible ways of accessing a new element from a new one with this class;
// ! This thing isn't infinite though. For infinite version, InfiniteArray could be used instead...
class IterableSet {
	curr() {
		return Array.from(this.elements.values())[this.currindex]
	}
	next() {
		// ? should self be creating a new method "updateIndex()"? This could be more useful than this... Saves time, one don't always have to have the output...
		// * Current decision: yes, let it be.
		// TODO: pray do that...
		this.currindex = (this.currindex + 1) % this.elements.size
		return this.curr()
	}
	add(x) {
		return this.elements.add(x)
	}
	has(x) {
		return this.elements.has(x)
	}
	get size() {
		return this.elements.size
	}
	delete(x) {
		return this.elements.delete(x)
	}
	constructor(elems = new Set([])) {
		this.currindex = 0
		this.elements = elems
	}
}

export { UniversalMap, template, IterableSet }
