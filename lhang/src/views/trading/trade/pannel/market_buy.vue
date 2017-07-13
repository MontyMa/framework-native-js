<template>
  <div class="market_buy">
    <div class="market-tip"> 以市场价上最优价格买入
      <div class="v-tooltip at-top"> [?]
        <tooltip title="当使用市价买入时，系统会根据您预留的数量在市场上从高到低进行扫单，直至人民币用完为止。"></tooltip>
      </div>
    </div>
    <div class="input_right">
      <input type="text" v-model="amount" placeholder='买入金额' id="market_a_buy"/>
    </div>
    <div style="margin-top:10px">
      <range @thisvalue="getRangeVal" :value="rangeValue" :min="0" :max="100" :step="25" theme="danger"
             ref="child_rang"></range>
    </div>
    <div style="margin: 0 0 20px;">
      <p>
        <label style="float: left;color: #1B1E23">预估买入量</label>
        <label style="float: right;color: #1B1E23">{{amount / closingPrice | number(4)}} {{type}}</label>
      </p>
      <p>
        <font style="color: #E11853;padding: 0 5px 0 0;">*</font>以实际买入量为准，以上仅为预估值</p>
    </div>
    <div class="input_right" v-if="tradepaypwd">
      <!--<div class="placeholder">请输入资金密码</div>-->
      <input type="password" placeholder='请输入资金密码' v-model="paypwd"/>
    </div>
    <div v-if="tradepaypwd">
      <p>
        <router-link to="/user/settings/funding_edit">
          <span class="link_style" style="float: left;">忘记资金密码？</span>
        </router-link>
        <router-link to="/user/policy/bind/modify_trade_check">
          <span class="link_style" style="float: right;">免输资金密码</span>
        </router-link>
      </p>
    </div>
    <button style="background: #E93C6F;" @click="buy">
      买入{{type}}
    </button>
  </div>
</template>
<script>
  import range from './pannel/range';
  import store from '../../../../vuex/store';
  import tooltip from './pannel/tooltip';
  import trade from './trade';
  export default {
    name: "market_buy",
    data() {
      return {
        amount: null,
        quantity: 0,
        paypwd: "",
        zjtype: false,
        type: this.$route.params.type.toUpperCase(),
      }
    },
    props: ['clickCny'],
    components: {
      range,
      tooltip,
    },
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
        let a = (this.amount / this.account.cny_usable) * 100;
        return a ? a : 0;
      },
      tradepaypwd() {
        return this.$store.getters.trade;
      },
    },
    methods: {
      buy() {
        //传给后台的参数
        let options = {
          "useruuid": this.uuid,
          "price": this.closingPrice,
          "quantity": this.quantity,
          "amount": this.amount,
          "type": "buy_market",
          "paypwd": this.paypwd,
          "category": this.$route.params.type + "_cny"
        };
        lh_http("post", "order/createorder", options).done((res) => {
          if (res.status) {
            alert("挂单完成");
            this.amount = null;
            this.rangeValue = 0;
            this.quantity = null;
            this.paypwd = null;
            store.dispatch('account', this.uuid);
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
        if ($("#market_a_buy").is(":focus")) {
          return;
        }
        this.rangeValue = value ? value : 0;
        this.amount = value ? ((value * this.account.cny_usable) / 100).toFixed(2) : null;
        this.quantity = value ? this.amount / this.closingPrice : null;
      },
    },
    mounted() {
    },
    watch: {
      clickCny(val){ //监听父组件传递的点击后的 cny
        this.amount = val[0];
      },
      amount(val, oldval) {
        if ($("#market_a_buy").is(":focus") && val) {
          val = isNaN(val) ? oldval : val;
          val = val < 0 ? -val : val;
          this.amount = val > this.account.cny_usable ? this.account.cny_usable : val;
          this.amount = trade.getNumber(this.amount, oldval, 2);
          this.quantity = this.amount / this.closingPrice;
        }
      },
      $route() {
        this.paypwd = "";
        this.amount = null;
        this.quantity = null;
        this.price = null;
        this.zjtype = false;
        this.type = this.$route.params.type.toUpperCase();
      }
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss">
  .market_buy {
    font-size: 12px;
    width: 260px;
    /*margin-right: 40px;*/
    padding-right: 40px;
    box-sizing: content-box;
    border-right: 1px dashed #E1E1E1;
    /*padding: 0px 12px;*/
    float: left;
    color: #1B1E23;
    p {
      overflow: auto;
      height: 20px;
      color: #494949;
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
      padding: 0px 10px;
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
    .link_style {
      cursor: pointer;
    }
  }
</style>
