import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

const state = {
	account: {
		all_cny: 0,
		all_freeze: 0,
		all_usable: 0,
		btc_amt: 0,
		btc_freeze: 0,
		btc_percent: 0,
		btc_usable: 0,
		cny_amt: 0,
		cny_freeze: 0,
		cny_percent: 0,
		cny_usable: 0,
		etc_amt: 0,
		etc_freeze: 0,
		etc_percent: 0,
		etc_usable: 0,
		eth_amt: 0,
		eth_freeze: 0,
		eth_percent: 0,
		eth_usable: 0,
		zec_amt: 0,
		zec_freeze: 0,
		zec_percent: 0,
		zec_usable: 0
	}
};

export default {
	state,
	actions,
	getters,
	mutations
}
