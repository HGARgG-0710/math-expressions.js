import { TEMPLATE } from "./../macros.mjs"

// * Stuff related to number systems and alphabets;
// here, various predefined string-functions for representations of numbers would go;
export const polystring = TEMPLATE({
	defaults: {
		alphabet: variables.defaultAlphabet.get,
		separator: ""
	},
	function: function (counter = this.template.icclass.class()) {
		// ? Consider - does one really want these things to be saved into a variable...
		const TIClass = TrueInteger(this.template.icclass).class
		// ? Make this thing an 'alias'?
		const iccmap = (x) => x.map(this.template.icclass)
		const converted = TIClass(iccmap(this.template.alphabet.length))

		let copy = deepCopy(counter)
		let index = this.template.ustrclass.template.icclass()
		const representation = this.template.ustrclass.class()
		const copyZero = copy.class.class()

		for (; copy.compare(copyZero); index = index.next()) {
			const modulo = copy.modulo(converted.power(TIClass(iccmap(index))))
			representation.write(index, this.template.alphabet.read(modulo))
			copy = copy.add(modulo.invadd())
		}

		return representation.join(this.template.separator)
	}
})
