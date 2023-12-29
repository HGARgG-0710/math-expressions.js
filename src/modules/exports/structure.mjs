// * This is the 'Structure API' part of the package - it contains means of working with arbitrary multilayered recursive forms, the shape of which is defined by the user;
// % note: the module is, in many ways, central to the library from the dependency- and generality- standpoints of view, for its methods and definitions can be applied to nigh every part of the package that works with recursion and nested objects;

export {
	form,
	structure,
	typeConst,
	constForm,
	propertyForm,
	objectForm,
	arrayForm,
	classForm,
	garrayForm,
	treeForm,
	arrElems,
	nonArrElems,
	totalElems,
	dim,
	generalSearch,
	findDeepUnfilled,
	findDeepUnfilledArr,
	recursiveIndexation,
	recursiveSetting,
	repeatedApplication,
	repeatedApplicationWhilst,
	stnative
} from "../../lib.mjs"
