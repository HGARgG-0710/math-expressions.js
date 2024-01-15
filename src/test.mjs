import { execSync } from "child_process"
import { readdirSync } from "fs"
import { TEMPLATE } from "./modules/macros.mjs"

// ? Relocate somewhere (not quite this library's domain, although absolutely magnificent...);
// ? This is synchronous (uses readdirSync and execSync), write the asynchronous version?
export const generalCall = TEMPLATE({
	defaults: {
		dir: "",
		command: (fname) => `node ${fname}`,
		isdir: (fname) => fname.split(".").length === 1,
		execopts: { stdio: "inherit" }
	},
	function: function (dirname = this.template.dir) {
		const read = readdirSync(dirname)
		let r = null
		for (const file of read) {
			if (this.template.isdir(file)) {
				r = this.function(file)
				continue
			}
			r = execSync(this.template.command(file), this.template.execopts)
		}
		return r
	}
}).function

generalCall.function("../test/")
