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

export { UniversalMap, template }
