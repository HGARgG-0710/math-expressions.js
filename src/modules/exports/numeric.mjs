import { general } from "../refactor.mjs"
import { TEMPLATE } from "./../macros.mjs"
import { max, min } from "./orders.mjs"

// * Stuff related to number systems and alphabets;
// here, various predefined string-functions for representations of numbers would go;
export const polystring = TEMPLATE({
	defaults: {
		alphabet: variables.defaultAlphabet.get,
		ustrclass: general.DEFAULT_USTRCLASS,
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

export const fromPolystring = TEMPLATE({
	defaults: [
		function () {
			return {
				ustrclass: general.DEFAULT_USTRCLASS,
				tintclass: general.DEFAULT_TINTCLASS,
				genarrclass: general.DEFAULT_GENARRCLASS
			}
		},
		function () {
			return { alphabet: this.template.genarrclass.static.empty() }
		}
	],
	function: function (ustr = this.template.ustrclass.class()) {
		const r = this.template.tintclass.class()
		let i = ustr.init()
		for (k of ustr.keys())
			r.add(
				this.tintclass.static
					.fromCounter(this.template.alphabet.firstIndex(ustr.read(k)))
					.multiply(
						this.template.tintclass.static
							.fromCounter(k)
							.power(
								this.template.tintclass.static
									.fromCounter(ustr.length().get())
									.difference(i)
							)
					)
			)
		return r
	},
	isthis: true
})

export const sameLength = TEMPLATE({
	defaults: [
		function () {
			return {
				ustrclass: general.DEFAULT_USTRCLASS,
				tintclass: general.DEFAULT_TINTCLASS,
				genarrclass: general.DEFAULT_GENARRCLASS,
				shrink: false
			}
		},
		function () {
			return { alphabet: this.template.genarrclass.static.empty() }
		}
	],
	function: function (strs = this.template.genarrclass.static.empty()) {
		const endsize = (this.template.shrink ? min : max)().function(
			strs.copy((str) => str.length().get())
		)
		for (const str of strs)
			str.length().set(endsize, { basestr: this.template.alphabet.read() })
		return endsize
	},
	isthis: true
})

export const native = {
	// * Brings whatever is given within the given base to base 10;
	// TODO: generalize this "alphabet" thing... Put this as a default of some kind somewhere...
	fromPolystring: function (nstr, alphabet = defaultAlphabet) {
		return repeatedArithmetic(
			generate(0, nstr.length - 1).map(
				(i) => alphabet.indexOf(nstr[i]) * alphabet.length ** i
			),
			"+"
		)
	},

	// * Brings whatever in base 10 to whatever in whatever base is given...
	polystring: function (n, base, alphabet = defaultAlphabet) {
		const coefficients = []
		// TODO: call this thing nrepresentation(), then use here...
		// TODO: change this for either one's own implementation of log, or this, as an alias...
		let i = Math.floor(Math.log(n) / Math.log(base))
		while (n !== 0) {
			// TODO: add an operator for that to the defaultTable...
			n = (n - (n % base ** i)) / base
			coefficients.push(n)
			i--
		}
		// TODO: create a generalized map() function that would map to both functions, arrays and objects;
		return coefficients.map((i) => alphabet[i]).join("")
	},

	baseconvert: function (a, basebeg, baseend) {
		return nbasereverse(nbase(a, basebeg), baseend)
	}
}
