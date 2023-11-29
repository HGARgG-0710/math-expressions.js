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

export const general = {
	fix: function (objs, keys, operation = () => {}, setfunc = (o, k, v) => (o[k] = v)) {
		const remember = objs.map((obj, i) => objs)
		for (let i = 0 ; i < objs.length ; i ++)
			remember.push(objs[i][keys[i]])		
		const returned = operation()
		for (let i = 0 ; i < remember.length ; i++)
			setfunc(objs[i], keys[i], remember[i])	
		return returned
	}
}
