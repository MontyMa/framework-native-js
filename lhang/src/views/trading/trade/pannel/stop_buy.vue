<template>
  <div class="stop_buy">

    <div class="input_right">
      <div class="placeholder">委托金额 CNY</div>
      <input type="text" v-model="planOrder_p.price"/>
    </div>

    <div class="input_right">
      <div class="placeholder">止盈触发价 CNY</div>
      <input type="text" v-model="planOrder_p.stop_success_trigger_price"/>
    </div>

    <div class="input_right">
      <div class="placeholder">止盈委托价 CNY</div>
      <input type="text" v-model="planOrder_p.stop_success_order_price"/>
    </div>

    <div>
      <p>
        <label style="float: left;">预估止盈买入{{type}}数量</label>
        <label style="float: right;">0.00BTC</label>
      </p>
    </div>
    <div class="input_right">
      <div class="placeholder">止损触发价 CNY</div>
      <input type="text" v-model="planOrder_p.stop_less_trigger_price"/>
    </div>
    <div class="input_right">
      <div class="placeholder">止损委托价 CNY</div>
      <input type="text" v-model="planOrder_p.stop_less_order_price"/>
    </div>

    <div>
      <p>
        <label style="float: left;">预估止损卖出{{type}}数量</label>
        <label style="float: right;">0.00BTC</label>
      </p>
    </div>

    <div class="input_right" v-if="tradepaypwd">
      <div class="placeholder">请输入资金密码</div>
      <input type="password" v-model="planOrder_p.paypwd"/>
    </div>
    <div v-if="tradepaypwd">
      <p>
      	<router-link to="/user/settings/funding_edit">
      		<span class="link_style" style="float: left;">忘记资金密码？</span>
      	</router-link>
      	<router-link to="/user/policy/bind/modify_trade_check">
        	<span class="link_style" style="float: right;">免输资金密码</span class="link_style">
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
  import trade from './trade';
  export default {
    data() {
      return {
        planOrder_p: {
          price: null,
          stop_success_trigger_price: null,
          stop_success_order_price: null,
          stop_less_trigger_price: null,
          stop_less_order_price: null,
          paypwd: "",
          type: "buy",
          category: this.$route.params.type + "_cny",
        },
        type: this.$route.params.type.toUpperCase(),
      }
    },
    components: {
      range
    },
    computed: {
      account() {
        return this.$store.getters.account;
      },
      closingPrice() {
        return this.$store.getters.closingPrice;
      },
      tradepaypwd() {
        return this.$store.getters.trade;
      },
    },
    mounted() {
    },
    methods: {
      buy() {
        lh_http("post", "order/profitAndLossOrder", this.planOrder_p).done(function (res) {
          if (res.status) {
            alert("挂单完成");
            //记住资金密码两小时
            //cookie().rememberPayPwd("rememberPaypwd", true);
          } else {
            alert(res.data)
          }
        });
      },
    },
    watch: {
      '$route' (to, from) {
        this.type = this.$route.params.type.toUpperCase();
        this.planOrder_p = {
          price: null,
          stop_success_trigger_price: null,
          stop_success_order_price: null,
          stop_less_trigger_price: null,
          stop_less_order_price: null,
          paypwd: "",
          type: "buy",
          category: this.$route.params.type + "_cny",
        }
      },
      'planOrder_p.price' (val, oldval) {
        this.planOrder_p.price = val > this.account.cny_usable ? this.account.cny_usable : val;
        this.planOrder_p.price = trade.getNumber(this.planOrder_p.price, oldval, 2)
      },
      'planOrder_p.stop_success_trigger_price' (val, oldval) {
        this.planOrder_p.stop_success_trigger_price = trade.getNumber(this.planOrder_p.stop_success_trigger_price, oldval, 2)
      },
      'planOrder_p.stop_success_order_price' (val, oldval) {
        this.planOrder_p.stop_success_order_price = trade.getNumber(this.planOrder_p.stop_success_order_price, oldval, 2)
      },
      'planOrder_p.stop_less_trigger_price' (val, oldval) {
        this.planOrder_p.stop_less_trigger_price = trade.getNumber(this.planOrder_p.stop_less_trigger_price, oldval, 2)
      },
      'planOrder_p.stop_less_order_price' (val, oldval) {
        this.planOrder_p.stop_less_order_price = trade.getNumber(this.planOrder_p.stop_less_order_price, oldval, 2)
      }
    }
  };
</script>

<style lang="scss">
  .stop_buy {
    font-size: 12px;
    width: 260px;
    /*padding: 0px 12px;*/
    float: left;
    color: #1B1E23;
    padding-right: 40px;
    -webkit-box-sizing: content-box;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
    border-right: 1px dashed #d7d7d7;
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
        text-align: right;
      }
    }
    p {
      overflow: auto;
      height: 20px;
      line-height: 20px;
      margin: 5px 0;
      color: #494949;
    }
    .market-tip {
      background-color: #ebebeb;
      border: 1px solid #d1d2d4;
      color: #5e5e5e;
      font-size: 12px;
      height: 35px;
      line-height: 33px;
      margin-bottom: 14px;
      padding-left: 10px;
      position: relative;
      .v-tooltip {
        color: #3392d6;
        line-height: 34px;
        right: -141px;
        position: relative;
        top: 0;
        display: inline;
        cursor: pointer;
        .tooltip-title {
          display: none;
          margin-left: -328px;
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
    input[type='password'],
    input[type='text'] {
      height: 45px;
      width: 100%;
      font-size: 14px;
      padding: 0px 10px;
      border: 1px solid #cbcbcb;
      margin: 10px 0;
    }
    button {
      width: 100%;
      height: 50px;
      font-size: 14px;
      color: white;
      margin-top: 20px;
      /*margin-bottom: 41px;*/
    }
  }
</style>
