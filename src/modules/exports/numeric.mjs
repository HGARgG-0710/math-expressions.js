// * Function definitions related to different number systems representations and alphabets;

import { general } from "../refactor.mjs"
import { TEMPLATE } from "./../macros.mjs"
import { max, min } from "./orders.mjs"
import * as expressions from "./expressions.mjs"
import * as variables from "./variables.mjs"

export const polystring = TEMPLATE({
	defaults: {
		alphabet: variables.defaultAlphabet.get,
		ustrclass: general.DEFAULT_USTRCLASS,
		tintclass: general.DEFAULT_TINTCLASS,
		icclass: general.DEFAULT_ICCLASS
	},
	function: function (counter = this.template.icclass.class()) {
		const converted = this.template.tintclass.fromCounter(
			this.template.alphabet.length().get()
		)

		let copy = counter.copy()
		const representation = this.template.ustrclass.class()
		const copyZero = copy.class.class()

		for (
			let index = this.template.icclass.class();
			copy.compare(copyZero);
			index = index.next()
		) {
			const modulo = this.template.tintclass.static
				.fromCounter(copy)
				.modulo(
					converted.power(this.template.tintclass.static.fromCounter(index))
				)
			representation.write(index, this.template.alphabet.read(modulo))
			copy = copy.add(modulo.invadd())
		}

		return representation
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

export const baseconvert = TEMPLATE({
	defaults: function () {
		return {
			ustrclass: general.DEFAULT_USTRCLASS,
			tintclass: general.DEFAULT_TINTCLASS,
			genarrclass: general.DEFAULT_GENARRCLASS,
			shrink: false
		}
	},
	function() {
		return {
			alphabetfrom: this.template.genarrclass.static.empty(),
			alphabetto: this.template.genarrclass.static.empty(),
			empty: this.template.ustrclass.class()
		}
	},
	function: function (numstr = this.tepmlate.empty) {
		return polystring({
			...this.template,
			alphabet: this.template.alphabettos
		}).function(
			fromPolystring({
				...this.template,
				alphabet: this.template.alphabetfrom
			}).function(numstr)
		)
	}
})

export const native = {
	// * Brings whatever is given within the given base to base 10;
	fromPolystring: TEMPLATE({
		defaults: {
			alphabet: variables.defaultAlphabet.get,
			defstr: ""
		},
		function: function (nstr = this.template.defstr) {
			return expressions.evaluate(
				expressions.Expression(
					"+",
					[],
					generate(0, nstr.length - 1).map(
						(i) =>
							this.template.alphabet.indexOf(nstr[i]) * alphabet.length ** i
					)
				)
			)
		}
	}),

	// * Brings whatever in base 10 to whatever in whatever base is given...
	polystring: TEMPLATE({
		defaults: {
			alphabet: variables.defaultAlphabet
		},
		function: function (n, base = this.template.base) {
			const coefficients = []
			const base = this.template.alphabet.length
			let i = Math.floor(Math.log(n) / Math.log(base))
			while (n !== 0) {
				const k = (n - (n % base ** i)) / base ** i
				n -= k * base ** i
				coefficients.push(k)
				i--
			}
			return coefficients.map((i) => this.template.alphabet[i]).join("")
		}
	}),

	// * Convert a numeric string in one base to a base string in another;
	baseconvert: TEMPLATE({
		defaults: {
			alphabet: variables.defaultAlphabet,
			from: 2,
			to: 16
		},
		function: function (a, basefrom = this.template.from, baseto = this.template.to) {
			return native
				.polystring({ alphabet: this.template.alphabet })
				.function(
					native.fromPolystring({ alphabet: this.template.alphabet })(
						a,
						basefrom
					),
					baseto
				)
		}
	})
}
