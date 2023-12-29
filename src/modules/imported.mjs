// * A file with no imports in it... [supposed to fix the importing issues of the package...]
// % NOTE: due to the fact that the 'ESM' import system implementation in question DOES NOT have the ability to separate the imports/definitions inside a file and by necessity load them (instead reading the whole bleeding thing...), to preserve the integrity of the rest of the library, some of the modules' used items had to be given simplified versions used once/twice in essential everywhere-imported parts of the library (namely, macros.mjs...);
// ? Give a better name to the file?

export const id = (a) => a
export const n = (x) => !x

export const _const = (c) => () => c
export const _void = () => {}

export const INTERSECTION = (arra, arrb) => {
	const r = []
	for (const x of arra) for (const y of arrb) if (x === y && !r.includes(x)) r.push(x)
	return r
}

export const repeatedApplication = function (
	initial,
	times,
	f,
	offset = 0,
	iter = (x) => x + 1
) {
	let r = initial
	for (let i = 0; i < times; i = iter(i)) r = f(r, i - offset)
	return r
}

export const isfn = (x) => x instanceof Function
export const cdieach = (x, i) => [x[i]]
export const empty = () => ({})
export const index = (i) => (x) => x[i]
export const isobj = (x) => typeof x === "object" && x instanceof Object

export const wrapper = {
	template: {
		inarr: false,
		in: id,
		out: id,
		deff: id
	},
	function: function (f = this.template.deff) {
		return this.template.inarr
			? (x) => this.template.out(f(...this.template.in(x)))
			: (x) => this.template.out(f(this.template.in(x)))
	}
}

export const negate = wrapper.function({
	out: n
})

export const hasFunction = (x, m) => x.hasOwnProperty(m) && typeof x[m] === "function"
