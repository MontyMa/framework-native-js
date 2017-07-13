import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'
const state = {
  rise_and_fall: '',	//货币的涨跌幅
  multi_platform: '', //多平台行情
  spot_latest_volume_price: 0,
  sub_customer_asset: 0,
  sub_spot_btc_cny_dailydata: '',
  sub_spot_btc_cny_depth: '',
  sub_spot_zec_cny_dailydata: '',
  sub_spot_zec_cny_depth: '',
  sub_spot_etc_cny_dailydata: '',
  sub_spot_etc_cny_depth: '',
  sub_spot_eth_cny_dailydata: '',
  sub_spot_eth_cny_depth: '',
  sub_spot_btc_cny_depth_d: '',
  sub_spot_zec_cny_depth_d: '',
  sub_spot_eth_cny_depth_d: '',
  sub_spot_etc_cny_depth_d: '',
  sub_spot_btc_cny_kline: '',
  sub_spot_btc_cny_kline_indicator: '',

  sub_spot_btc_trades: '',
  sub_spot_zec_trades: '',
  sub_spot_eth_trades: '',
  sub_spot_etc_trades: '',
};

window.channels = {};

export default{
  state,
  actions,
  getters,
  mutations
}
