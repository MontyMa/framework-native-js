import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

const state = {
	//交易价格，后面打算改成货币对的形式感觉更加严谨
  closingPrice: 0,
  //交易状态
  trade_status: {
  		category: '',//货币对
  		broadcast: '',//广播
  },
  tradPrice: 0,
  zecChange: 0,
}

export default{
  state,
  actions,
  getters,
  mutations
}
