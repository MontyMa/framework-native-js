<template>
  <div class="market_information">
    <ion-content12>
      <div class="header">
        <div class="market_icon_bar">&#xe60c;</div>
        <div class="mes_title">行情信息</div>
        <div class="right">
          <a target="_blank" class="market_right_icon" :href="myUrl+'fullScreen.html'">专业交易</a>
        </div>
      </div>
      <div class="body">
        <div class="tabs">
          <span v-on:click="change_l_m_s('lhang_tickers')" :class="{ 'active': lhang_market_type == 'lhang_tickers' }">链行行情</span>
          <span v-on:click="change_l_m_s('multi_platform_btc_cny_ticker')"
                :class="{ 'active': lhang_market_type == 'multi_platform_btc_cny_ticker' }">多平台BTC行情</span>
          <span v-on:click="change_l_m_s('multi_platform_zec_cny_ticker')"
                :class="{ 'active': lhang_market_type == 'multi_platform_zec_cny_ticker' }">多平台ZEC行情</span>
          <span v-on:click="change_l_m_s('multi_platform_eth_cny_ticker')"
                :class="{ 'active': lhang_market_type == 'multi_platform_eth_cny_ticker' }">多平台ETH行情</span>
          <span v-on:click="change_l_m_s('multi_platform_etc_cny_ticker')"
                :class="{ 'active': lhang_market_type == 'multi_platform_etc_cny_ticker' }">多平台ETC行情</span>
        </div>
        <div>
          <!--<lhang-market></lhang-market>-->
          <div v-if="lhang_market_type == 'lhang_tickers'">
            <ul class="lm_ul">
              <li class="title">
                <span>交易对</span>
                <span>最新成交价</span>
                <span>涨幅</span>
                <span>最高价/最低价</span>
                <span>24小时成交量</span>
              </li>
              <li v-for="(item,index) in lhhq">
                <a :href="item.url" class="lhang_mes_link">
                  <span>{{item.symbol}}</span>
                  <span>￥{{item.lastPrice}}</span>
                  <span class="increase" :class="item.change>0?'increase_up':'increase_down'">
                  <i class="increase_data">{{item.change}} %</i></span>
                  <span>￥{{item.highPrice}} / ￥{{item.lowPrice}}</span>
                  <span class="def_icon hover">
									  <span :class="'data_'+index" class="data">{{item.vol}}</span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
          <div v-if="lhang_market_type == 'multi_platform_btc_cny_ticker'">
            <ul class="lm_ul">
              <li class="title">
                <span>交易平台</span>
                <span>最新成交价</span>
                <span>涨幅</span>
                <span>最高价/最低价</span>
                <span>24小时成交量</span>
              </li>
              <li v-for="item in hq_btc">
                <span>{{item.platform}}</span>
                <span>￥{{item.lastPrice}}</span>
                <span class="increase" :class="item.change>0?'increase_up':'increase_down'">
                  <i class="increase_data">{{item.change}} %</i></span>
                <span>￥{{item.highPrice}}/￥{{item.lowPrice}}</span>
                <span class="hover">
									<span class="data data_BTC">{{item.vol}}</span></span>
              </li>
            </ul>
          </div>
          <div v-if="lhang_market_type == 'multi_platform_zec_cny_ticker'">
            <ul class="lm_ul">
              <li class="title">
                <span>交易平台</span>
                <span>最新成交价</span>
                <span>涨幅</span>
                <span>最高价/最低价</span>
                <span>24小时成交量</span>
              </li>
              <li v-for="item in hq_zec">
                <span>{{item.platform}}</span>
                <span>￥{{item.lastPrice}}</span>
                <span class="increase" :class="item.change>0?'increase_up':'increase_down'">
                  <i class="increase_data">{{item.change}} %</i>
                </span>
                <span>￥{{item.highPrice}}/￥{{item.lowPrice}}</span>
                <span class="hover">
                  <span class="data data_ZEC">{{item.vol}}</span>
								</span>
              </li>
            </ul>
          </div>
          <div v-if="lhang_market_type == 'multi_platform_etc_cny_ticker'">
            <ul class="lm_ul">
              <li class="title">
                <span>交易平台</span>
                <span>最新成交价</span>
                <span>涨幅</span>
                <span>最高价/最低价</span>
                <span>24小时成交量</span>
              </li>
              <li v-for="item in hq_etc">
                <span>{{item.platform}}</span>
                <span>￥{{item.lastPrice}}</span>
                <span class="increase" :class="item.change>0?'increase_up':'increase_down'">
                  <i class="increase_data">{{item.change}} %</i>
                </span>
                <span>￥{{item.highPrice}}/￥{{item.lowPrice}}</span>
                <span class="hover">
                  <span class="data data_ETH">{{item.vol}}</span>
								</span>
              </li>
            </ul>
          </div>

          <div v-if="lhang_market_type == 'multi_platform_eth_cny_ticker'">
            <ul class="lm_ul">
              <li class="title">
                <span>交易平台</span>
                <span>最新成交价</span>
                <span>涨幅</span>
                <span>最高价/最低价</span>
                <span>24小时成交量</span>
              </li>
              <li v-for="item in hq_eth">
                <span>{{item.platform}}</span>
                <span>￥{{item.lastPrice}}</span>
                <span class="increase" :class="item.change>=0&&(+item.change)?'increase_up':'increase_down'">
                  <i class="increase_data">{{item.change}} %</i>
                </span>
                <span>￥{{item.highPrice}} / ￥{{item.lowPrice}}</span>
                <span class="hover">
									<span class="data data_ETC">{{item.vol}}</span>
								</span>
              </li>
            </ul>
          </div>
        </div>
        <!--more-->
        <div class="more_area">
          <router-link to="/trading/btc/trade">查看更多行情</router-link>
        </div>
      </div>
    </ion-content12>
  </div>
</template>

<script>
  //	import lhangMarket from './lhang_market'
  import store from '../../../vuex/store'
  export default {
    name: 'login_pannel',
    data() {
      return {
        lhang_market_type: "lhang_tickers",
        lhhq_type: 'BTC/CNYZEC/CNYETC/CNYETH/CNY',
        lhhq: [{
          symbol: 'BTC/CNY',
          lastPrice: '--.--',
          change: '--.--',
          highPrice: '--.--',
          lowPrice: '--.--',
          vol: '--.--',
          url: '#/trading/btc/trade'
        }, {
          symbol: 'ZEC/CNY',
          lastPrice: '--.--',
          change: '--.--',
          highPrice: '--.--',
          lowPrice: '--.--',
          vol: '--.--',
          url: '#/trading/zec/trade'
        },
          {
            symbol: 'ETH/CNY',
            lastPrice: '--.--',
            change: '--.--',
            highPrice: '--.--',
            lowPrice: '--.--',
            vol: '--.--',
            url: '#/trading/eth/trade'
          },
          {
            symbol: 'ETC/CNY',
            lastPrice: '--.--',
            change: '--.--',
            highPrice: '--.--',
            lowPrice: '--.--',
            vol: '--.--',
            url: '#/trading/etc/trade'
          }],
        hq_btc_type: '链行OKCoin火币中国比特币',
        hq_btc: [{
          platform: '链行',
          lastPrice: '--.--',
          change: '--.--',
          highPrice: '--.--',
          lowPrice: '--.--',
          vol: '--.--'
        }, {
          platform: 'OKCoin',
          lastPrice: '--.--',
          change: '--.--',
          highPrice: '--.--',
          lowPrice: '--.--',
          vol: '--.--'
        }, {
          platform: '火币',
          lastPrice: '--.--',
          change: '--.--',
          highPrice: '--.--',
          lowPrice: '--.--',
          vol: '--.--'
        }, {
          platform: '中国比特币',
          lastPrice: '--.--',
          change: '--.--',
          highPrice: '--.--',
          lowPrice: '--.--',
          vol: '--.--'
        }],
        hq_zec_type: '链行云币元宝Bitfinex',
        hq_zec: [{
          platform: '链行',
          lastPrice: '--.--',
          change: '--.--',
          highPrice: '--.--',
          lowPrice: '--.--',
          vol: '--.--'
        }, {
          platform: '云币',
          lastPrice: '--.--',
          change: '--.--',
          highPrice: '--.--',
          lowPrice: '--.--',
          vol: '--.--'
        }, {
          platform: '元宝',
          lastPrice: '--.--',
          change: '--.--',
          highPrice: '--.--',
          lowPrice: '--.--',
          vol: '--.--'
        }, {
          platform: 'Bitfinex',
          lastPrice: '--.--',
          change: '--.--',
          highPrice: '--.--',
          lowPrice: '--.--',
          vol: '--.--'
        }],
        hq_etc_type: '链行云币CHBTCBitfinex',
        hq_etc: [{
          platform: '链行',
          lastPrice: '--.--',
          change: '--.--',
          highPrice: '--.--',
          lowPrice: '--.--',
          vol: '--.--'
        }, {
          platform: '云币',
          lastPrice: '--.--',
          change: '--.--',
          highPrice: '--.--',
          lowPrice: '--.--',
          vol: '--.--'
        }, {
          platform: 'Bitfinex',
          lastPrice: '--.--',
          change: '--.--',
          highPrice: '--.--',
          lowPrice: '--.--',
          vol: '--.--'
        }],
        hq_eth_type: '链行云币CHBTCBitfinex',
        hq_eth: [{
          platform: '链行',
          lastPrice: '--.--',
          change: '--.--',
          highPrice: '--.--',
          lowPrice: '--.--',
          vol: '--.--'
        }, {
          platform: '云币',
          lastPrice: '--.--',
          change: '--.--',
          highPrice: '--.--',
          lowPrice: '--.--',
          vol: '--.--'
        }, {
          platform: 'Bitfinex',
          lastPrice: '--.--',
          change: '--.--',
          highPrice: '--.--',
          lowPrice: '--.--',
          vol: '--.--'
        }],

        myUrl: '',
      }
    },
    computed: {
      socket() {
        return this.$store.getters.multi_platform;
      }
    },
    components: {}, //这里注册
    methods: {
      change_l_m_s: function (type) {
        this.lhang_market_type = type;
      }
    },
    mounted() {
      store.dispatch('send', {
        channel: 'multi_platform_zec_cny_ticker'
      });
      store.dispatch('send', {
        channel: 'multi_platform_btc_cny_ticker'
      });
      store.dispatch('send', {
        channel: 'multi_platform_etc_cny_ticker'
      });
      store.dispatch('send', {
        channel: 'multi_platform_eth_cny_ticker'
      });
      this.myUrl = window.config.api;
    },
    watch: {
      // 如果 question 发生改变，这个函数就会运行
      socket: function (res) {
        var that = this;
        switch (res.channel) {
          case 'multi_platform_lhang_tickers':
            if (this.lhhq_type.indexOf(res.data.symbol) >= 0) {
              for (var i in that.lhhq) {
                if (this.lhhq[i].symbol == res.data.symbol) {
                  if (res.data.lastPrice) {
                    this.lhhq[i].lastPrice = res.data.lastPrice;
                    this.lhhq[i].change = res.data.change;
                    this.lhhq[i].highPrice = res.data.highPrice;
                    this.lhhq[i].lowPrice = res.data.lowPrice;
                    this.lhhq[i].vol = res.data.vol;
                    if(this.lhhq[i].symbol == 'ZEC/CNY'){
                    		this.$store.dispatch("zecChange", this.lhhq[i].change);
                    }
                  }
                }
              }
            } else {
              that.lhhq.push(res.data);
              that.lhhq_type += res.data.symbol;
            }
            break;
          case 'multi_platform_btc_cny_ticker':
            if (this.hq_btc_type.indexOf(res.data.platform) >= 0) {
              for (var i in that.hq_btc) {
                if (this.hq_btc[i].platform == res.data.platform) {
                  if (res.data.lastPrice) {
                    this.hq_btc[i].lastPrice = res.data.lastPrice;
                    this.hq_btc[i].change = res.data.change;
                    this.hq_btc[i].highPrice = res.data.highPrice;
                    this.hq_btc[i].lowPrice = res.data.lowPrice;
                    this.hq_btc[i].vol = res.data.vol;
                  }
                }
              }
            } else {
              that.hq_btc.push(res.data);
              that.hq_btc_type += res.data.platform;
            }
            break;
          case 'multi_platform_zec_cny_ticker':
            if (this.hq_zec_type.indexOf(res.data.platform) >= 0) {
              for (var i in that.hq_zec) {
                if (this.hq_zec[i].platform == res.data.platform) {
                  if (res.data.lastPrice) {
                    this.hq_zec[i].lastPrice = res.data.lastPrice;
                    this.hq_zec[i].change = res.data.change;
                    this.hq_zec[i].highPrice = res.data.highPrice;
                    this.hq_zec[i].lowPrice = res.data.lowPrice;
                    this.hq_zec[i].vol = res.data.vol;
                  }
                }
              }
            } else {
              that.hq_zec.push(res.data)
              that.hq_zec_type += res.data.platform;
            }
            break;
          case 'multi_platform_etc_cny_ticker':
            if (this.hq_etc_type.indexOf(res.data.platform) >= 0) {
              for (var i in that.hq_etc) {
                if (this.hq_etc[i].platform == res.data.platform) {
                  if (res.data.lastPrice) {
                    this.hq_etc[i].lastPrice = res.data.lastPrice;
                    this.hq_etc[i].change = res.data.change;
                    this.hq_etc[i].highPrice = res.data.highPrice;
                    this.hq_etc[i].lowPrice = res.data.lowPrice;
                    this.hq_etc[i].vol = res.data.vol;
                  }
                }
              }
            } else {
              that.hq_etc.push(res.data)
              that.hq_etc_type += res.data.platform;
            }
            break;
          case 'multi_platform_eth_cny_ticker':
            if (this.hq_eth_type.indexOf(res.data.platform) >= 0) {
              for (var i in that.hq_eth) {
                if (this.hq_eth[i].platform == res.data.platform) {
                  if (res.data.lastPrice) {
                    this.hq_eth[i].lastPrice = res.data.lastPrice;
                    this.hq_eth[i].change = res.data.change;
                    this.hq_eth[i].highPrice = res.data.highPrice;
                    this.hq_eth[i].lowPrice = res.data.lowPrice;
                    this.hq_eth[i].vol = res.data.vol;
                  }
                }
              }
            } else {
              that.hq_eth.push(res.data);
              that.hq_eth_type += res.data.platform;
            }
            break;
          default:
            break;
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
  .market_information {
    .more_area {
      font-size: 12px;
      a {
        color: #0093F1;
      }
      margin-top: 30px;
    }
    /*涨幅*/
    .increase {
      &.increase_up:after {
        content: '\e606';
        color: #FF4FA1;
      }
      &.increase_down:after {
        content: '\e647';
        color: #0093F1;
      }
      .increase_data {
        width: 100px;
        font-style: normal;
        display: inline-block;
      }
    }
    .lhang_mes_link {
      display: inline-block;
      width: 100%;
      height: 100%;
    }
    .def_icon:after {
      content: '\e619';
      margin-left: 15px;
      color: #999;
      display: inline-block;
      vertical-align: middle;
      font-size: 18px;
    }

    .data {
      width: 90px !important;
      margin: 0 !important;
      text-align: left;
    }

    .data {
      display: inline-block;
      vertical-align: middle;
      &:before {
        margin-right: 3px;
        font-size: 15px;
      }
    }

    .data_0, .data_BTC {
      &:before {
        content: '\e621';
      }
    }

    .data_1, .data_ZEC {
      &:before {
        content: '\e629';
      }
    }

    .data_3, .data_ETH {
      &:before {
        content: '\e628';
      }
    }

    .data_2, .data_ETC {
      &:before {
        content: '\e627';
      }
      /*}*/
    }

    .body {
      margin-top: 17px;
      padding-bottom: 48px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      border-bottom: 1px solid #E6E6E6;
      .tabs {
        overflow: auto;
        span {
          cursor: pointer;
          float: left;
          padding: 9.5px 33px;
          color: #0093f1;
        }
        .active {
          background: #0093f1;
          color: white;
        }
      }
      .lm_ul {
        li {
          height: 45px;
          span {
            height: 45px;
            line-height: 45px;
            width: 200px;
            display: inline-block;
            margin-left: 45px;
            font-size: 14px;
            color: #494949;
          }
          span:first-child {
            margin: 0;
          }
          &.title {
            span {
              color: #999999;
            }
            &:hover {
              background: #fff;
            }
          }
        }
        li:hover {
          background: #F2F9FE;
          .def_icon {
            &.hover:after {
              content: '\e613';
              color: #0093F1;
            }
          }
        }

      }

      .title {
        span {
          border-bottom: solid 2px #0093F1;
          color: #9B9B9B;
        }

      }
    }

    .header {
      width: 100%;
      height: 47px;
      line-height: 47px;
      vertical-align: middle;
      padding-left: 20px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      background: linear-gradient(to bottom, #fff 1%, rgba(0, 147, 241, .12));
      text-align: left;
      .market_icon_bar {
        font-size: 33px;
        color: #0093F1;
        line-height: 40px;
        display: inline-block;
        vertical-align: bottom;
      }
      .mes_title {
        font-size: 28px;
        padding-left: 20px;
        margin: 0;
        font-weight: normal;
        display: inline-block;
        vertical-align: middle;
      }
      .right {
        float: right;
        padding-right: 10px;

        .market_right_icon {
          line-height: 40px;
          color: #0093F1;
          cursor: pointer;
          padding-right: 10px;
          font-size: 13px;
          &:after {
            content: '\e614';
            font-size: 22px;
            margin-left: 5px;
            display: inline-block;
            vertical-align: middle;
          }
        }
      }
    }

  }
</style>
