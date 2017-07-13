import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

const state = {
  showShadowBox: false, //显示阴影盒
  showMoneyBTCModal: false, //显示比特币提现的弹窗
  showMoneyZECModal: false,	//显示零币币提现的弹窗
  showMoneyETCModal: false, //显示以太经典提现的弹窗
  showMoneyETHModal: false //显示以太坊提现的弹窗
}

export default{
  state,
  actions,
  getters,
  mutations
}
