export const classes = {
	finish: function () {
		return this.this.this.length().get().previous()
	},
	begin: function () {
		return this.this.this.go(this.this.this.init(), RESULT.aliases._const(true))
	},
	end: function () {
		return this.this.this.go(this.this.this.finish(), RESULT.aliases._const(true))
	}
}
