const trade = {
	getNumber: function(val, oldvalue, type) {
		if(!val){
			return val;
		}
		let ql = val.toString().split(".");
		let rval = val;
		if(ql.length > 1) {
			if(ql[1].length > type) {
				rval = Number(val).toFixed(type)
			}
		}
		if(!isNaN(val)) {
			return rval;
		} else {
			if(isNaN(val)){
				return null;
			}else{
				return oldvalue;
			}
		}
	},
}

export default trade;