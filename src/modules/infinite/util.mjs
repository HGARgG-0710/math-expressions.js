// ? some of these things are quite good with the arrays.... Question: should Mr. Body be adding those for some kind of "uniter" structure? (Like the Statistics and other such classes from the oldapi, other classes from other packages?)
// ? considering the fact that there is now the deepCopy() function (which is a generalization of copy)
function deepCopy(a) {
	if (a instanceof Array) return a.map((el) => deepCopy(el))
	if (typeof a === "object") {
		// TODO: use the Key type from a different library of self's...
		// * After the release, there will be a very big lot of code-updating to be done... Looking forward to it...
		const aCopy = {}
		for (const b in a) aCopy[b] = deepCopy(a[b])
		return aCopy
	}
	return a
}
// * A useful algorithm from a different project of mine; value-wise comparison of two arbitrary things...
// ? is this really finite?
function valueCompare(a, b, oneway = false) {
	if (typeof a !== typeof b) return false
	switch (typeof a) {
		case "object":
			for (const a_ in a) if (!valueCompare(b[a_], a[a_])) return false
			if (!oneway) return valueCompare(b, a, true)
			return true
		default:
			return a === b
	}
}
// * Does a flat copy of something;
function flatCopy(a) {
	return a instanceof Array ? [...a] : typeof a === "object" ? { ...a } : a
}

export { deepCopy, valueCompare, flatCopy }
