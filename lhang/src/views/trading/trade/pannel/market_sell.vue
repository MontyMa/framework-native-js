<template>
  <div class="market_shell">
    <div class="market-tip"> 以市场价上最优价格卖出
      <div class="v-tooltip at-top"> [?]
        <tooltip :title="'当使用市价卖出时，系统会根据您预留的数量在市场上从高到低进行扫单，直至'+moneyType+'卖完为止。'"></tooltip>
      </div>
    </div>
    <div class="input_right">
      <!--<div class="placeholder">卖出量 {{type}}</div>-->
      <input type="text" v-model="quantity" placeholder='卖出量' id="market_q_buy"/>
    </div>
    <div style="margin-top:10px">
      <range @thisvalue="getRangeVal" :value="rangeValue" :min="0" :max="100" :step="25" theme="danger"></range>
    </div>
    <div style="margin: 0 0 20px;">
      <p>
        <label style="float: left;color: #1B1E23">预估交易额</label>
        <label style="float: right;color: #1B1E23">{{quantity * closingPrice | number(2)}} CNY</label>
      </p>
      <p>
        <font style="color: #3AC569;padding: 0 5px 0 0;">*</font>以实际卖出量为准，以上仅为预估值</p>
    </div>

    <div class="input_right" v-if="tradepaypwd">
      <!--<div class="placeholder">请输入资金密码</div>-->
      <input type="password" placeholder='请输入资金密码' v-model="paypwd"/>
    </div>

    <div v-if="tradepaypwd">
      <p style="color: #494949">
        <router-link to="/user/settings/funding_edit">
          <span class="link_style" style="float: left;">忘记资金密码？</span>
        </router-link>
        <router-link to="/user/policy/bind/modify_trade_check">
          <span class="link_style" style="float: right;">免输资金密码</span>
        </router-link>
      </p>
    </div>
    <button style="background: #3AC569;" @click="shell">
      卖出{{type}}
    </button>
  </div>
</template>
<script>
  import range from './pannel/range';
  import tooltip from './pannel/tooltip';
  import store from '../../../../vuex/store';
  import trade from './trade';
  export default {
    name: "market_shell",
    data () {
      return {
        amount: 0,
        quantity: null,
        paypwd: "",
        type: this.$route.params.type.toUpperCase(),
        moneyType: "比特币",
      }
    },
    props: ['clickTypeAmount'],
    computed: {
      uuid() {
        return this.$store.getters.uuid;
      },
      closingPrice() {
        return this.$store.getters.closingPrice;
      },
      account() {
        return this.$store.getters.account;
      },
      rangeValue() {
        let a = (this.quantity / this.account[this.$route.params.type + '_usable']) * 100;
        return a ? a : 0;
      },
      tradepaypwd() {
        return this.$store.getters.trade;
      },
    },
    components: {
      range,
      tooltip,
    },
    methods: {
      shell() {
        //传给后台的参数
        let options = {
          "useruuid": this.uuid,
          "price": this.closingPrice,
          "quantity": this.quantity,
          "amount": this.amount,
          "type": "sell_market",
          "paypwd": this.paypwd,
          "category": this.$route.params.type + "_cny"
        };
        lh_http("post", "order/createorder", options).done((res) => {
          if (res.status) {
            alert("挂单完成");
            store.dispatch('account', this.uuid);
            this.amount = null;
            this.rangeValue = 0;
            this.quantity = null;
            store.dispatch('trade_status', options.category);
            //记住资金密码两小时
            cookie().rememberPayPwd("rememberPaypwd", false);
            store.dispatch('changeTrade');
          } else {
            alert(res.data)
          }
        });
      },
      getRangeVal(value) {
        if ($("#market_q_buy").is(":focus")) {
          return;
        } else {
          this.rangeValue = value ? value : 0;
          this.quantity = value ? ((value * this.account[this.$route.params.type + '_usable']) / 100).toFixed(4) : null;
          this.amount = this.quantity * this.closingPrice
        }
      }
    },
    mounted () {
    },
    watch: {
      clickTypeAmount(val){
        this.quantity = val[0];
      },
      quantity(val, oldval) {
        if ($("#market_q_buy").is(":focus") && val) {
          val = isNaN(val) ? oldval : val;
          val = val < 0 ? -val : val;
          this.quantity = val > this.account[this.$route.params.type + '_usable'] ? this.account[this.$route.params.type + '_usable'] : val;
          this.quantity = trade.getNumber(this.quantity, oldval, 4)
        }
      },
      $route () {
        this.type = this.$route.params.type.toUpperCase();
        this.amount = null;
        this.quantity = null;
        this.price = null;
        this.paypwd = "";
      },
      type (val) {
        if (val == 'BTC') {
          this.moneyType = "比特币";
        } else if (val == "ZEC") {
          this.moneyType = "零币";
        }
      }
    }
  };
</script>
<style lang="scss">
  .market_shell {
    font-size: 12px;
    width: 260px;
    padding: 0 40px;
    border-right: 1px dashed #e1e1e1;
    box-sizing: content-box;
    float: left;
    color: #1B1E23;
    p {
      overflow: auto;
      height: 20px;
      line-height: 20px;
      margin: 5px 0;
    }
    .market-tip {
      background-color: #ebebeb;
      border: 1px solid #d1d2d4;
      color: #5e5e5e;
      font-size: 12px;
      height: 45px;
      line-height: 45px;
      margin-bottom: 21px;
      padding-left: 10px;
      position: relative;
      .v-tooltip {
        color: #3392d6;
        line-height: 34px;
        right: -85px;
        position: relative;
        top: 0;
        display: inline;
        cursor: pointer;
        .tooltip-title {
          display: none;
          margin-left: -270px;
          line-height: 15px;
          height: 53px;
          &:after {
            left: 180px;
          }
        }
      }
      .v-tooltip:hover {
        .tooltip-title {
          display: block;
        }
      }
    }
    .input_right {
      position: relative;
      color: #999;
      .placeholder {
        position: absolute;
        top: 50%;
        font-size: 14px;
        line-height: 20px;
        margin-top: -10px;
        left: 10px;
      }
      input[type='text'], input[type='password'] {
        /*text-align: right;*/
      }
    }
    input[type='text'],
    input[type='password'] {
      height: 45px;
      width: 260px;
      font-size: 14px;
      padding: 0 10px;
      border: 1px solid #cbcbcb;
    }
    button {
      width: 260px;
      height: 50px;
      font-size: 14px;
      color: white;
      margin-top: 20px;
      /*margin-bottom: 41px;*/
      cursor: pointer;
    }
    .v-range-danger .items span.on {
      background-color: #3AC569;
    }
    .v-range-danger .items div {
      background-color: #3AC569;
    }
    .v-range-danger input:active + .items div:after {
      border-color: #3AC569;
    }
    .link_style {
      cursor: pointer;
    }
  }
</style>
