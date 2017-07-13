<template>
  <div class="trade">
    <!--第一部分-->
    <div class="group_1">
      <!--标题-->
      <trade-title></trade-title>
      <!--行情及介绍-->
      <div class="quotes">
        <!--按钮-->
        <trade-button :val="btn_param" :width="90" @buttonIndex="getBtnIndex"></trade-button>
        <div class="quotes_content">
          <!--todo 不可删除，暂时隐掉-->
          <market :dshow="false" v-if="quotesIndex===0"></market>
          <!--<div >K线</div>-->
          <trade-introdution v-if="quotesIndex===1"/>
        </div>
      </div>
      <div class="new_price_box">
        <!--最新价格-->
        <new-price @newPrice="getNewPriceObj"></new-price>
      </div>
    </div>
    <div class="trade_work">
      <div class="work_left">
        <!--交易主体-->
        <div class="trade_left_group">
          <!--按钮-->
          <trade-button :val="workBtnParams" :width="65" @buttonIndex="getWorkBtnIndex"></trade-button>
          <div class="price_box">
            <template v-if="workPriceIndex===0">
              <limit-price :newPriceObj="newPriceObj" :newPrice="newPrice"
                           :tradetype="'buy'" :requestObj="modRequestPool"/>
              <limit-price :newPriceObj="newPriceObj" :newPrice="newPrice"
                           :tradetype="'sell'" :requestObj="modRequestPool"/>
            </template>
            <template v-if="workPriceIndex===1">
              <market-price :newPriceObj="newPriceObj" :tradetype="'buy'"
                            :requestObj="modRequestPool"/>
              <market-price :newPriceObj="newPriceObj" :tradetype="'sell'"
                            :requestObj="modRequestPool"/>
            </template>
          </div>
        </div>
        <!--委托管理-->
        <div class="trade_left_group">
          <!--按钮-->
          <trade-button :val="ordinaryBtnParams" :width="90" @buttonIndex="getIntrustBtnIndex"></trade-button>
          <!--当前委托-->
          <intrust-current v-if="intrustBtnIndex===0" @curRequest="getCurRequest"></intrust-current>
          <!--历史委托-->
          <intrust-history v-if="intrustBtnIndex===1" @hisRequest="getHisRequest"></intrust-history>
        </div>
        <!--深度 K线-->
        <div class="trade_left_group">
          <div class="depth_chart">
            <depth-echar v-if="dshow === false"></depth-echar>
          </div>
        </div>
      </div>
      <div class="work_right">
        <depth @price="getNewPrice"></depth>
        <new-price-list></new-price-list>
      </div>
    </div>
    <!--、、、、、、、-->
    <!--<div class="trade_work g_c_f">-->
    <!--<div class="work_left">-->
    <!--<div class="account">-->
    <!--<div class="title">-->
    <!--<span v-on:click="trade(2)" :class="{ 'active': trade_index == 2 }">限价</span>-->
    <!--<span v-on:click="trade(1)" :class="{ 'active': trade_index == 1 }">市价</span>-->
    <!--&lt;!&ndash;<span v-on:click="trade(3)" :class="{ 'active': trade_index == 3 }">止盈止损</span>-->
    <!--<span v-on:click="trade(4)" :class="{ 'active': trade_index == 4 }">计划委托</span>&ndash;&gt;-->
    <!--</div>-->
    <!--<div class="g_c_f">-->
    <!--<div class="conunt">-->
    <!--<div class="div">-->
    <!--<label>可用CNY:</label>-->
    <!--<span class="trade_cny" @click="cnyClick">{{account.cny_usable}} CNY</span>-->
    <!--<a href="#/money/recharge">充值</a>-->
    <!--</div>-->
    <!--<div class="div">-->
    <!--<label>市价可买{{type}}:</label>-->
    <!--<span>{{getMarketPrice | number(4)}} {{type}}</span>-->
    <!--&lt;!&ndash;<span>{{account.cny_usable / closingPrice | number(4)}} {{type}}</span>&ndash;&gt;-->
    <!--</div>-->
    <!--<div class="div">-->
    <!--<label>平均持仓成本:</label>-->
    <!--<span v-if="type=='BTC'">{{average}} CNY/BTC</span>-->
    <!--<span v-if="type=='ZEC'">{{average}} CNY/ZEC</span>-->
    <!--<span v-if="type=='ETC'">{{average}} CNY/ETC</span>-->
    <!--<span v-if="type=='ETH'">{{average}} CNY/ETH</span>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="conunt conunt_pad">-->
    <!--<div class="div">-->
    <!--<label>可用{{type}}:</label>-->
    <!--<span class="trade_type" @click="typeClick"-->
    <!--v-if="type=='BTC'">{{account.btc_usable}} {{type}}</span>-->
    <!--<span class="trade_type" @click="typeClick"-->
    <!--v-if="type=='ZEC'">{{account.zec_usable}} {{type}}</span>-->
    <!--<span class="trade_type" @click="typeClick"-->
    <!--v-if="type=='ETC'">{{account.etc_usable}} {{type}}</span>-->
    <!--<span class="trade_type" @click="typeClick"-->
    <!--v-if="type=='ETH'">{{account.eth_usable}} {{type}}</span>-->
    <!--<a v-if="type=='BTC'" href="#/money/recharge?chargeType=btc">充币</a>-->
    <!--<a v-if="type=='ZEC'" href="#/money/recharge?chargeType=zec">充币</a>-->
    <!--<a v-if="type=='ETC'" href="#/money/recharge?chargeType=etc">充币</a>-->
    <!--<a v-if="type=='ETH'" href="#/money/recharge?chargeType=eth">充币</a>-->
    <!--</div>-->
    <!--<div class="div">-->
    <!--<label>市价可卖CNY:</label>-->
    <!--<span v-if="type=='BTC'">{{(account.btc_usable * closingPrice) | number(2)}} CNY</span>-->
    <!--<span v-if="type=='ZEC'">{{(account.zec_usable * closingPrice) | number(2)}} CNY</span>-->
    <!--<span v-if="type=='ETC'">{{(account.etc_usable * closingPrice) | number(2)}} CNY</span>-->
    <!--<span v-if="type=='ETH'">{{(account.eth_usable * closingPrice) | number(2)}} CNY</span>-->
    <!--</div>-->
    <!--<div class="div">-->
    <!--<label>平均持仓成本:</label>-->
    <!--<span v-if="type=='BTC'">{{average | number(2)}} CNY/BTC</span>-->
    <!--<span v-if="type=='ZEC'">{{average | number(2)}} CNY/ZEC</span>-->
    <!--<span v-if="type=='ETC'">{{average | number(2)}} CNY/ETC</span>-->
    <!--<span v-if="type=='ETH'">{{average | number(2)}} CNY/ETH</span>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->

    <!--<div v-if="trade_index == 1" class="trade_box g_c_f">-->
    <!--<marketbuy :clickCny="sendCny"></marketbuy>-->
    <!--<marketshell :clickTypeAmount="sendTypeAmount"></marketshell>-->
    <!--</div>-->
    <!--<div v-if="trade_index == 2" class="trade_box g_c_f">-->
    <!--<limitbuy :clickCny="sendCny"></limitbuy>-->
    <!--<limitshell :clickTypeAmount="sendTypeAmount"></limitshell>-->
    <!--</div>-->
    <!--<div v-if="trade_index == 3" class="trade_box g_c_f">-->
    <!--<stopbuy></stopbuy>-->
    <!--<stopshell></stopshell>-->
    <!--</div>-->
    <!--<div v-if="trade_index == 4" class="trade_box g_c_f">-->
    <!--<planbuy></planbuy>-->
    <!--<planshell></planshell>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="trade_right">-->
    <!--<marketdepth></marketdepth>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div>-->
    <!--<consignationtable></consignationtable>-->
    <!--</div>-->
  </div>
</template>
<script>
  import tradeTitle from './trade_title.vue'; //标题
  import tradeButton from './trade_button.vue'; //按钮
  import tradeIntrodution from './trade_introdution.vue'; //资产介绍
  import newPrice from './new_price.vue'; //最新价格
  import limitPrice from './limit_price.vue'; //限价交易
  import marketPrice from './market_price.vue'; //限价交易
  import depth from './depth.vue'; //深度
  import intrustCurrent from './intrust_current.vue'; //当前委托
  import intrustHistory from './intrust_history.vue'; //历史委托
  import newPriceList from './new_price_list.vue'; //最新成交价列表
  import market from '../market/market.vue';  //K线
  import depthEchar from '../market/depth.vue';  //深度K线

  //  、、、、、、、、、、、、
  //  import marketbuy from '../trade/pannel/market_buy';
  //  import marketshell from '../trade/pannel/market_sell';
  //  import limitbuy from '../trade/pannel/limit_buy';
  //  import limitshell from '../trade/pannel/limit_sell';
  //  import marketdepth from '../trade/pannel/depth/depth';
  //  import stopbuy from '../trade/pannel/stop_buy';
  //  import stopshell from '../trade/pannel/stop_sell';
  //  import planbuy from '../trade/pannel/plan_buy';
  //  import planshell from '../trade/pannel/plan_sell';
  //  import consignationtable from '../pannel/consignation_table'
  //  import store from '../../../vuex/store'
  export default {
    name: 'trade',
    computed: {
//      isLogged() {
//        return this.$store.getters.isLogged;
//      },
//      uuid() {
//        return this.$store.getters.uuid ? this.$store.getters.uuid : 0;
//      },
//      getMarketPrice(){
//        return this.closingPrice ? this.account.cny_usable / this.closingPrice : 0;
//      },
//      account() {
//        return this.$store.getters.account;
//      },
//      closingPrice() {
//        return this.$store.getters.closingPrice;
//      },
    },
    data() {
      return {
//    ////// new trade
        btn_param: ['行情', '资产介绍'],  //传给 button 组件参数
        workBtnParams: ['限价', '市价'],
        ordinaryBtnParams: ['当前委托', '历史委托'],
        quotesIndex: 0, //控制行情和资产的切换
        workPriceIndex: 0, //控制行情和资产的切换
        intrustBtnIndex: 0,//控制当前和历史委托的切换
        newPriceObj: {}, //最新成交价传递给限价交易
        newPrice: 0, //最新成交价传递给限价交易
        modRequestPool: {
          hisRequest: null,
          curRequest: null,
        },
        dshow: false,

//        、、、、、、
//        trade_index: 2,
//        type: this.$route.params.type.toUpperCase(),
//        average: 0,
//        sendCny: null, //发送给子组件的 cny
//        sendTypeAmount: null, //发送给子组件的 type数量
//        status: true,
      }
    },
    components: {
//    ////// new trade
      tradeTitle, //标题
      tradeButton,  //按钮
      tradeIntrodution,   //资产介绍
      newPrice, //最新价格
      limitPrice, //限价交易
      marketPrice, //限价交易
      depth,//深度
      intrustCurrent,//当前委托
      intrustHistory,//历史委托
      newPriceList, //最新成交价列表
      market, //k线
      depthEchar, //深度k线

//      \\\\\\\\\
//      marketbuy,
//      marketshell,
//      limitbuy,
//      limitshell,
//      marketdepth,
//      stopbuy,
//      stopshell,
//      planbuy,
//      planshell,
//      consignationtable,
    },
    methods: {
      //    ////// new trade
      getBtnIndex(index){ //控制行情和资产的切换
        this.quotesIndex = index;
      },
      getWorkBtnIndex(index){  //控制市价和限价切换
        this.workPriceIndex = index;
      },
      getIntrustBtnIndex(index){ //控制当前和历史委托的切换
        this.intrustBtnIndex = index;
      },
      getNewPriceObj(res){ //获取最新价格
        this.newPriceObj = res;
      },
      getNewPrice(price){ //获取最新价格
        this.newPrice = price;
      },
      getCurRequest(request){ //获取当前委托请求方法
        this.modRequestPool.curRequest = request;
      },
      getHisRequest(request){ //获取历史委托请求方法
        this.modRequestPool.hisRequest = request;
      },

//      /////////

//      trade: function (index) {
//        this.get_cnyAccount();
//        this.trade_index = index;
//      },
//      get_cnyAccount: function () {
//        if (store)
//          store.dispatch('account', this.uuid);
//      },
//      get_average() {
//        lh_http("post", "customerAsset/cnySpotAssetQuery", {}).done((res) => {
//          if (res.status) {
//            for (var i of res.data.list) {
//              if (this.$route.params.type == i.assetCode) {
//                this.average = (i.hasOwnBalance / 1).toFixed(2);
//              }
//            }
//          } else {
//            alert(res.data)
//          }
//        });
//      },
//      cnyClick(){ //点击发送父组件 cny
//        this.sendCny = [this.account.cny_usable];
//      },
//      typeClick(){  //点击发送父组件 type数量
//        let type = this.type.toLowerCase();
//        this.sendTypeAmount = [this.account[`${type}_usable`]];
//      }
    },
    mounted() {
      //获取用户账户金钱信息
//      this.get_cnyAccount();
//      setInterval(() => {
//        this.get_cnyAccount();
//      }, 1000);
//      this.get_average();
//      store.dispatch('changeTrade');
    },
    watch: {
//      '$route' (to, from) {
//        // 对路由变化作出响应...
//        this.type = this.$route.params.type.toUpperCase();
//        this.get_cnyAccount();
//        this.get_average();
//      },
    }
  }
</script>
<style lang="scss" scoped>
  .trade {
    text-align: left;
    padding-bottom: 30px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    .group_1 {
      width: 810px;
      position: relative;
    }
    /*行情及介绍*/
    .quotes {
      margin-top: 3px;
      .quotes_content {
        height: 430px;
        overflow-y: auto;
        padding: 14px 16px;
        border: 1px solid #6F8EA1;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        -webkit-transform: translateY(-1px);
        -moz-transform: translateY(-1px);
        -ms-transform: translateY(-1px);
        -o-transform: translateY(-1px);
        transform: translateY(-1px);
      }
    }

    /*最新价格*/
    .new_price_box {
      position: absolute;
      top: 0;
      right: 0;
      width: 580px;
      height: 55px;
    }

    /*交易主体部分*/
    .trade_work {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      .work_left {
        width: 810px;
        .price_box {
          display: flex;
          justify-content: space-between;
          -webkit-transform: translateY(-1px);
          -moz-transform: translateY(-1px);
          -ms-transform: translateY(-1px);
          -o-transform: translateY(-1px);
          transform: translateY(-1px);
        }
      }
      .trade_left_group:not(:first-child) {
        margin-top: 20px;
      }
      .title {
        background: #ffffff;
        height: 33px;
        border-bottom: 3px solid #D7D7D7;
        font-size: 0;
        margin-bottom: 30px;
        span {
          font-size: 14px;
          &:not(:last-child) {
            margin-right: 70px;
          }
          border-bottom: 3px solid transparent;
          display: inline-block;
          text-align: center;
          line-height: 30px;
          box-sizing: content-box;
          cursor: pointer;
          &.active {
            color: #0093F1;
            font-weight: 600;
            border-color: #0093F1;
          }
        }
      }
      .trade_box {
        border-top: none;
        background: white;
      }
      .trade_right {
        display: inline-block;
        vertical-align: top;
        border-top: none;
        background: white;
      }
    }
    /*深度图*/
    .depth_chart {
      border: 1px solid #6F8EA1;
      height: 183px;
      /*overflow: hidden;*/
    }
    /*.tip {*/
    /*font-size: 26px;*/
    /*line-height: 58px;*/
    /*height: 58px;*/
    /*background-color: #f4f4f4;*/
    /*padding-left: 15px;*/
    /*img {*/
    /*height: 28px;*/
    /*width: 28px;*/
    /*top: 3px;*/
    /*margin-right: 5px;*/
    /*position: relative;*/
    /*}*/
    /*}*/

    /*.account {*/
    /*font-size: 12px;*/
    /*color: #1B1E23;*/
    /*display: inline-block;*/
    /*overflow: auto;*/
    /*.conunt {*/
    /*&.conunt_pad {*/
    /*padding-left: 40px;*/
    /*}*/
    /*float: left;*/
    /*border-right: 1px dashed #e1e1e1;*/
    /*padding-right: 40px;*/
    /*box-sizing: content-box;*/
    /*width: 260px;*/
    /*.div {*/
    /*height: 30px;*/
    /*line-height: 30px;*/
    /*label {*/
    /*width: 85px;*/
    /*display: inline-block;*/
    /*color: #9b9b9b;*/
    /*}*/
    /*.trade_cny, .trade_type {*/
    /*cursor: pointer;*/
    /*-webkit-user-select: none;*/
    /*-moz-user-select: none;*/
    /*-ms-user-select: none;*/
    /*user-select: none;*/
    /*&:hover {*/
    /*color: #0093F1;*/
    /*}*/
    /*}*/
    /*a {*/
    /*float: right;*/
    /*color: #0093f1;*/
    /*}*/
    /*}*/
    /*}*/
    /*}*/
  }
</style>
