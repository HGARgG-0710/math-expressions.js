// * The file features various transforms that the user may desire to use to create an instance of the library.

// TODO[1]: finish once the structure of the library has stabilized... [MUST ERASE ALL THE TEMPLATE STRUCTURES FROM DEFINITIONS... And also - not touch the ones that are NOT TEMPLATE-templates... This thing is supposed to be very closely modelled on the library object's structure]
// TODO[2]: generalize for an arbitrary TEMPLATE 'word' (not necessarily 'function') and so on...
export const templatesErase = function (instance) {
	instance = { ...instance }
	for (const y of ["alias", "main"])
		for (const x in instance[y]) instance[y][x] = instance[y][x].function
	return instance
}
