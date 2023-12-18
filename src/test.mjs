import { execSync } from "child_process"
import { readdirSync } from "fs"

// TODO: generalize with the .split(...) thing being a way of identifying a directory name...

// ^ idea: create a method for doing this thing more generally based on a GeneralArray/finite array [two versions] of filenames;
// * Then, here, merely use the method, taking the values from a file, which [if rendered inexistent], is defaulted by a list of one's own [right here, within the file itself]...
// Then, one passes the newfound list, described by adding '../test', to the finite version: `callFinite(NAMELIST.map((x) => "../test/" + x))`

// * And this thing... Either ut it into some other project, or keep in this one...
// TODO: do that...
export const call = (dirname = "../test/") => {
	const read = readdirSync(dirname)
	for (const file of read) {
		if (file.split(".").length === 1) {
			call(file)
			continue
		}
		execSync(`node ${file}`, { stdio: "inherit" })
	}
}

call()
