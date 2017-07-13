const mutations = {

//	rise_and_fall (state,msg) {
//	  state.rise_and_fall = msg;
//	},

  ////多平台行情
  multi_platform_btc_cny_ticker (state, msg) {
    state.multi_platform = msg;
  },
  multi_platform_zec_cny_ticker (state, msg) {
    state.multi_platform = msg;
  },
  multi_platform_eth_cny_ticker (state, msg) {
    state.multi_platform = msg;
  },
  multi_platform_etc_cny_ticker (state, msg) {
    state.multi_platform = msg;
  },
  multi_platform_lhang_tickers (state, msg) {
    state.multi_platform = msg;
  },

  ////累计成交
  spot_latest_volume_price (state, msg) {
    state.spot_latest_volume_price = msg;
  },

  ////时实资产
  sub_customer_asset (state, msg) {
    state.sub_customer_asset = msg;
  },

  ////交易
  sub_spot_btc_cny_dailydata (state, msg) {
    state.sub_spot_btc_cny_dailydata = msg;
  },
  sub_spot_btc_cny_depth (state, msg) {
    state.sub_spot_btc_cny_depth = msg;
  },
  sub_spot_zec_cny_dailydata (state, msg) {
    state.sub_spot_zec_cny_dailydata = msg;
  },
  sub_spot_zec_cny_depth (state, msg) {
    state.sub_spot_zec_cny_depth = msg;
  },
  sub_spot_etc_cny_dailydata (state, msg) {
    state.sub_spot_etc_cny_dailydata = msg;
  },
  sub_spot_etc_cny_depth (state, msg) {
    state.sub_spot_etc_cny_depth = msg;
  },
  sub_spot_eth_cny_dailydata (state, msg) {
    state.sub_spot_eth_cny_dailydata = msg;
  },
  sub_spot_eth_cny_depth (state, msg) {
    state.sub_spot_eth_cny_depth = msg;
  },

  //// k
  // 面积图
  sub_spot_btc_cny_depth_d (state, msg) {
    state.sub_spot_btc_cny_depth_d = msg;
  },
  sub_spot_zec_cny_depth_d (state, msg) {
    state.sub_spot_zec_cny_depth_d = msg;
  },
  sub_spot_eth_cny_depth_d (state, msg) {
    state.sub_spot_eth_cny_depth_d = msg;
  },
  sub_spot_etc_cny_depth_d (state, msg) {
    state.sub_spot_etc_cny_depth_d = msg;
  },
  // kxian btc
  sub_spot_btc_cny_kline_1minute (state, msg) {
    state.sub_spot_btc_cny_kline = msg.data[0];
  },
  sub_spot_btc_cny_kline_5minute (state, msg) {
    state.sub_spot_btc_cny_kline = msg.data[0];
  },
  sub_spot_btc_cny_kline_15minute (state, msg) {
    state.sub_spot_btc_cny_kline = msg.data[0];
  },
  sub_spot_btc_cny_kline_30minute (state, msg) {
    state.sub_spot_btc_cny_kline = msg.data[0];
  },
  sub_spot_btc_cny_kline_1hour (state, msg) {
    state.sub_spot_btc_cny_kline = msg.data[0];
  },
  sub_spot_btc_cny_kline_1day (state, msg) {
    state.sub_spot_btc_cny_kline = msg.data[0];
  },
  sub_spot_btc_cny_kline_1week (state, msg) {
    state.sub_spot_btc_cny_kline = msg.data[0];
  },
  sub_spot_btc_cny_kline_1month (state, msg) {
    state.sub_spot_btc_cny_kline = msg.data[0];
  },
  // kxian zec
  sub_spot_zec_cny_kline_1minute (state, msg) {
    state.sub_spot_zec_cny_kline = msg.data[0];
  },
  sub_spot_zec_cny_kline_5minute (state, msg) {
    state.sub_spot_zec_cny_kline = msg.data[0];
  },
  sub_spot_zec_cny_kline_15minute (state, msg) {
    state.sub_spot_zec_cny_kline = msg.data[0];
  },
  sub_spot_zec_cny_kline_30minute (state, msg) {
    state.sub_spot_zec_cny_kline = msg.data[0];
  },
  sub_spot_zec_cny_kline_1hour (state, msg) {
    state.sub_spot_zec_cny_kline = msg.data[0];
  },
  sub_spot_zec_cny_kline_1day (state, msg) {
    state.sub_spot_zec_cny_kline = msg.data[0];
  },
  sub_spot_zec_cny_kline_1week (state, msg) {
    state.sub_spot_zec_cny_kline = msg.data[0];
  },
  sub_spot_zec_cny_kline_1month (state, msg) {
    state.sub_spot_zec_cny_kline = msg.data[0];
  },
  // kxian etc
  sub_spot_etc_cny_kline_1minute (state, msg) {
    state.sub_spot_etc_cny_kline = msg.data[0];
  },
  sub_spot_etc_cny_kline_5minute (state, msg) {
    state.sub_spot_etc_cny_kline = msg.data[0];
  },
  sub_spot_etc_cny_kline_15minute (state, msg) {
    state.sub_spot_etc_cny_kline = msg.data[0];
  },
  sub_spot_etc_cny_kline_30minute (state, msg) {
    state.sub_spot_etc_cny_kline = msg.data[0];
  },
  sub_spot_etc_cny_kline_1hour (state, msg) {
    state.sub_spot_etc_cny_kline = msg.data[0];
  },
  sub_spot_etc_cny_kline_1day (state, msg) {
    state.sub_spot_etc_cny_kline = msg.data[0];
  },
  sub_spot_etc_cny_kline_1week (state, msg) {
    state.sub_spot_etc_cny_kline = msg.data[0];
  },
  sub_spot_etc_cny_kline_1month (state, msg) {
    state.sub_spot_etc_cny_kline = msg.data[0];
  },
  // kxian eth
  sub_spot_eth_cny_kline_1minute (state, msg) {
    state.sub_spot_eth_cny_kline = msg.data[0];
  },
  sub_spot_eth_cny_kline_5minute (state, msg) {
    state.sub_spot_eth_cny_kline = msg.data[0];
  },
  sub_spot_eth_cny_kline_15minute (state, msg) {
    state.sub_spot_eth_cny_kline = msg.data[0];
  },
  sub_spot_eth_cny_kline_30minute (state, msg) {
    state.sub_spot_eth_cny_kline = msg.data[0];
  },
  sub_spot_eth_cny_kline_1hour (state, msg) {
    state.sub_spot_eth_cny_kline = msg.data[0];
  },
  sub_spot_eth_cny_kline_1day (state, msg) {
    state.sub_spot_eth_cny_kline = msg.data[0];
  },
  sub_spot_eth_cny_kline_1week (state, msg) {
    state.sub_spot_eth_cny_kline = msg.data[0];
  },
  sub_spot_eth_cny_kline_1month (state, msg) {
    state.sub_spot_eth_cny_kline = msg.data[0];
  },
  // 副指标 btc
  sub_spot_btc_cny_kline_1minute_indicator (state, msg) {
    state.sub_spot_btc_cny_kline_indicator = msg;
  },
  sub_spot_btc_cny_kline_5minute_indicator (state, msg) {
    state.sub_spot_btc_cny_kline_indicator = msg;
  },
  sub_spot_btc_cny_kline_15minute_indicator (state, msg) {
    state.sub_spot_btc_cny_kline_indicator = msg;
  },
  sub_spot_btc_cny_kline_30minute_indicator (state, msg) {
    state.sub_spot_btc_cny_kline_indicator = msg;
  },
  sub_spot_btc_cny_kline_1hour_indicator (state, msg) {
    state.sub_spot_btc_cny_kline_indicator = msg;
  },
  sub_spot_btc_cny_kline_1day_indicator (state, msg) {
    state.sub_spot_btc_cny_kline_indicator = msg;
  },
  sub_spot_btc_cny_kline_1week_indicator (state, msg) {
    state.sub_spot_btc_cny_kline_indicator = msg;
  },
  sub_spot_btc_cny_kline_1month_indicator (state, msg) {
    state.sub_spot_btc_cny_kline_indicator = msg;
  },
  // 副指标 zec
  sub_spot_zec_cny_kline_1minute_indicator (state, msg) {
    state.sub_spot_zec_cny_kline_indicator = msg;
  },
  sub_spot_zec_cny_kline_5minute_indicator (state, msg) {
    state.sub_spot_zec_cny_kline_indicator = msg;
  },
  sub_spot_zec_cny_kline_15minute_indicator (state, msg) {
    state.sub_spot_zec_cny_kline_indicator = msg;
  },
  sub_spot_zec_cny_kline_30minute_indicator (state, msg) {
    state.sub_spot_zec_cny_kline_indicator = msg;
  },
  sub_spot_zec_cny_kline_1hour_indicator (state, msg) {
    state.sub_spot_zec_cny_kline_indicator = msg;
  },
  sub_spot_zec_cny_kline_1day_indicator (state, msg) {
    state.sub_spot_zec_cny_kline_indicator = msg;
  },
  sub_spot_zec_cny_kline_1week_indicator (state, msg) {
    state.sub_spot_zec_cny_kline_indicator = msg;
  },
  sub_spot_zec_cny_kline_1month_indicator (state, msg) {
    state.sub_spot_zec_cny_kline_indicator = msg;
  },
  // 副指标 etc
  sub_spot_etc_cny_kline_1minute_indicator (state, msg) {
    state.sub_spot_etc_cny_kline_indicator = msg;
  },
  sub_spot_etc_cny_kline_5minute_indicator (state, msg) {
    state.sub_spot_etc_cny_kline_indicator = msg;
  },
  sub_spot_etc_cny_kline_15minute_indicator (state, msg) {
    state.sub_spot_etc_cny_kline_indicator = msg;
  },
  sub_spot_etc_cny_kline_30minute_indicator (state, msg) {
    state.sub_spot_etc_cny_kline_indicator = msg;
  },
  sub_spot_etc_cny_kline_1hour_indicator (state, msg) {
    state.sub_spot_etc_cny_kline_indicator = msg;
  },
  sub_spot_etc_cny_kline_1day_indicator (state, msg) {
    state.sub_spot_etc_cny_kline_indicator = msg;
  },
  sub_spot_etc_cny_kline_1week_indicator (state, msg) {
    state.sub_spot_etc_cny_kline_indicator = msg;
  },
  sub_spot_etc_cny_kline_1month_indicator (state, msg) {
    state.sub_spot_etc_cny_kline_indicator = msg;
  },
  // 副指标 eth
  sub_spot_eth_cny_kline_1minute_indicator (state, msg) {
    state.sub_spot_eth_cny_kline_indicator = msg;
  },
  sub_spot_eth_cny_kline_5minute_indicator (state, msg) {
    state.sub_spot_eth_cny_kline_indicator = msg;
  },
  sub_spot_eth_cny_kline_15minute_indicator (state, msg) {
    state.sub_spot_eth_cny_kline_indicator = msg;
  },
  sub_spot_eth_cny_kline_30minute_indicator (state, msg) {
    state.sub_spot_eth_cny_kline_indicator = msg;
  },
  sub_spot_eth_cny_kline_1hour_indicator (state, msg) {
    state.sub_spot_eth_cny_kline_indicator = msg;
  },
  sub_spot_eth_cny_kline_1day_indicator (state, msg) {
    state.sub_spot_eth_cny_kline_indicator = msg;
  },
  sub_spot_eth_cny_kline_1week_indicator (state, msg) {
    state.sub_spot_eth_cny_kline_indicator = msg;
  },
  sub_spot_eth_cny_kline_1month_indicator (state, msg) {
    state.sub_spot_eth_cny_kline_indicator = msg;
  },

  //
  sub_spot_btc_cny_trades (state, msg) {
    state.sub_spot_btc_trades = msg;
  },
  sub_spot_zec_cny_trades (state, msg) {
    state.sub_spot_zec_trades = msg;
  },
  sub_spot_eth_cny_trades (state, msg) {
    state.sub_spot_eth_trades = msg;
  },
  sub_spot_etc_cny_trades (state, msg) {
    state.sub_spot_etc_trades = msg;
  },

};
export default mutations
