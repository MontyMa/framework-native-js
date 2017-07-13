const mutations = {
	closingPrice(state, val) {
		state.closingPrice = val;
	},
	trade_status(state,val){
		state.trade_status.category = val;
		state.trade_status.broadcast = new Date();
	},
	tradPrice(state,val){
		state.tradPrice = val;
	},
	zecChange(state,val){
		state.zecChange = val;
	}
};
export default mutations
