<template>
  <div class="plan_shell" v-if="picked == 'limit_sell'">
    <div class="authorization_method">
      <div>计划委托方式：</div>
      <label>
        <input type="radio" name="r_sell" value="limit_sell" v-model="picked"/> <span>计划限价单</span>
      </label>
      <label>
        <input type="radio" name="r_sell" value="market_sell" v-model="picked"/> <span>计划市价单</span>
      </label>
    </div>
    <input type="text" placeholder="触发价格 CNY" v-model="profitAndLossOrder_p.triggerPrice"/>
    <ul class="trade_container">
      <li>
        <p>卖出价格</p>
        <input type="text" placeholder="CNY" v-model="profitAndLossOrder_p.price" id="plan_p_sell"/>
      </li>
      <li>
        <span class="mark">&times;</span>
      </li>
      <li>
        <p>数量</p>
        <input type="text" :placeholder="type" v-model="profitAndLossOrder_p.quantity" id="plan_q_sell"/>
      </li>
      <li>
        <span class="mark">=</span>
      </li>
      <li>
        <p>交易金额</p>
        <input type="text" placeholder="CNY" v-model="profitAndLossOrder_p.amount" id="plan_a_sell"/>
      </li>
    </ul>
    <div style="margin-bottom:11px">
      <range :value="rangeValue" @thisvalue="getRangeVal" :min="0" :max="100" :step="25" theme="danger"></range>
    </div>

    <div class="input_right" v-if="tradepaypwd == 5">
      <div class="placeholder">请输入资金密码</div>
      <input type="password" v-model="profitAndLossOrder_p.paypwd"/>
    </div>

    <div v-if="tradepaypwd == 5">
      <p>
        <!--<label style="float: left;">忘记资金密码？</label>-->
      	<router-link to="/user/settings/funding_edit">
      		<span class="link_style" style="float: left;">忘记资金密码？</span>
      	</router-link>
        <label style="float: right;">免输资金密码</label>
      </p>
    </div>
    <button style="background: #3AC569;" @click="sell">
      卖出{{type}}
    </button>
  </div>
  <!-------------------->
  <div class="plan_shell" v-else-if="picked == 'market_sell'">
    <div class="authorization_method">
      <div>计划委托方式：</div>
      <label>
        <input type="radio" name="r_sell" value="limit_sell" v-model="picked"/> <span>计划限价单</span>
      </label>
      <label>
        <input type="radio" name="r_sell" value="market_sell" v-model="picked"/> <span>计划市价单</span>
      </label>
    </div>
    <input type="text" placeholder="触发价格 CNY" v-model="profitAndLossOrder_p.triggerPrice" id="plan_p_sell"/>
    <input style="margin-top:38px" type="text" :placeholder="'卖出数量 '+type" v-model="profitAndLossOrder_p.quantity"
           id="plan_q_sell"/>
    <div style="margin-bottom: 12px;">
      <p>
        <label style="float: left;color: #1B1E23">预估交易额</label>
        <label
          style="float: right;color: #1B1E23">{{profitAndLossOrder_p.quantity * profitAndLossOrder_p.triggerPrice | number(4)}}CNY</label>
      </p>
      <p>
        <font style="color: #E11853;padding: 0 5px 0 0;">*</font>以实际买入量为准，以上仅为预估值</p>
    </div>
    <div class="input_right" v-if="tradepaypwd">
      <div class="placeholder">请输入资金密码</div>
      <input type="password" v-model="profitAndLossOrder_p.paypwd"/>
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
    <button style="background: #3AC569;" @click="sell">
      卖出{{type}}
    </button>
  </div>
</template>

<script>
  import range from './pannel/range';
  import tooltip from './pannel/tooltip';
  import trade from './trade';
  export default {
    data() {
      return {
        picked: 'limit_sell',
        profitAndLossOrder_p: {
          triggerPrice: '',
          price: '',
          quantity: '',
          amount: '',
          type: "",
          paypwd: '',
          category: ""
        },
        type: this.$route.params.type.toUpperCase(),
      }
    },
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
        return (this.profitAndLossOrder_p.quantity / this.account.btc_usable) * 100;
      },
      tradepaypwd() {
        return this.$store.getters.trade;
      },
    },
    methods: {
      sell() {
        this.profitAndLossOrder_p.type = this.picked == 'sell_limit' ? 'sell' : 'sell_market';
        this.profitAndLossOrder_p.category = this.$route.params.type + '_cny';
        lh_http("post", "order/planOrder", this.profitAndLossOrder_p).done(function (res) {
          if (res.status) {
            alert("挂单完成");
            //记住资金密码两小时
            //cookie().rememberPayPwd("rememberPaypwd", true);
          } else {
            alert(res.data)
          }
        });
      },
      getRangeVal(value) {
        if ($("#plan_q_sell").is(":focus") || $("#plan_a_sell").is(":focus") || $("#plan_p_sell").is(":focus")) {
          //console.log('用户在手动操作，不再操作滚动条')
          return;
        } else {
          if (!this.profitAndLossOrder_p.price) {
            this.profitAndLossOrder_p.price = this.closingPrice;
          }
          this.rangeValue = value ? value : 0;
          this.profitAndLossOrder_p.quantity = value ? ((value * this.account.btc_usable) / 100).toFixed(4) : null;
          this.profitAndLossOrder_p.amount = value ? ((this.profitAndLossOrder_p.quantity * this.profitAndLossOrder_p.price) / 100).toFixed(2) : null;
        }
      },
    },
    mounted() {
    },
    watch: {
      'picked' (val) {
        this.profitAndLossOrder_p = {
          triggerPrice: '',
          price: '',
          quantity: '',
          amount: '',
          type: "",
          paypwd: '',
          category: ""
        }
        this.rangeValue = 0;
      },
      'profitAndLossOrder_p.quantity': function (val, oldvalue) {
        if (!($("#plan_q_sell").is(":focus") || $("#plan_a_sell").is(":focus") || $("#plan_p_sell").is(":focus"))) {
          return;
        }
        if ($("#plan_q_sell").is(":focus") && val) {
          if (val < 0) val = -val;
          if (!this.profitAndLossOrder_p.price || this.profitAndLossOrder_p.price == 0) {
            this.profitAndLossOrder_p.price = this.closingPrice;
          }
          this.profitAndLossOrder_p.quantity = (this.profitAndLossOrder_p.quantity) > this.account.btc_usable ? (this.account.btc_usable) : val;
          this.profitAndLossOrder_p.quantity = trade.getNumber(this.profitAndLossOrder_p.quantity, oldvalue, 4)
          this.profitAndLossOrder_p.amount = this.profitAndLossOrder_p.price * this.profitAndLossOrder_p.quantity;
        }
      },
      'profitAndLossOrder_p.price': function (val, oldvalue) {
        if (!($("#plan_q_sell").is(":focus") || $("#plan_a_sell").is(":focus") || $("#plan_p_sell").is(":focus"))) {
          return;
        }
        if ($("#plan_p_sell").is(":focus") && val) {
          if (val < 0) val = -val;
          this.profitAndLossOrder_p.price = (val * this.profitAndLossOrder_p.quantity) > this.account.cny_usable ? (this.account.cny_usable / this.profitAndLossOrder_p.quantity) : val;
          this.profitAndLossOrder_p.price = trade.getNumber(this.profitAndLossOrder_p.price, oldvalue, 2)
          this.profitAndLossOrder_p.amount = this.profitAndLossOrder_p.price * this.profitAndLossOrder_p.quantity;
        }
      },
      'profitAndLossOrder_p.amount': function (val, oldvalue) {
        if (!($("#plan_q_sell").is(":focus") || $("#plan_a_sell").is(":focus") || $("#plan_p_sell").is(":focus"))) {
          return;
        }
        if ($("#plan_a_sell").is(":focus") && val) {
          if (val < 0) val = -val;
          if (!this.profitAndLossOrder_p.price || this.profitAndLossOrder_p.price == 0) {
            this.profitAndLossOrder_p.price = this.closingPrice;
          }
          this.profitAndLossOrder_p.amount = this.profitAndLossOrder_p.amount > this.account.cny_usable ? this.account.cny_usable : val;
          this.profitAndLossOrder_p.amount = trade.getNumber(this.profitAndLossOrder_p.amount, oldvalue, 2)
          this.profitAndLossOrder_p.quantity = (this.profitAndLossOrder_p.amount / this.profitAndLossOrder_p.price).toFixed(4);
        }
      },
      'profitAndLossOrder_p.triggerPrice': function (val, oldvalue) {
        this.profitAndLossOrder_p.triggerPrice = trade.getNumber(val, oldvalue, 2)
      },
      '$route' (to, from) {
        this.type = this.$route.params.type.toUpperCase();
        this.profitAndLossOrder_p = {
          triggerPrice: '',
          price: '',
          quantity: '',
          amount: '',
          type: "",
          paypwd: '',
          category: ""
        }
      }
    }
  };
</script>

<style lang="scss">
  .plan_shell {
    font-size: 12px;
    width: 260px;
    padding: 0 40px;
    -webkit-box-sizing: content-box;
    border-right: 1px dashed #d7d7d7;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
    float: left;
    color: #1B1E23;
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
    .authorization_method {
      margin-bottom: 10px;
      font-size: 14px;
      color: #494949;
      label {
        margin-top: 3px;
        display: inline-block;
      }
      label:not(:last-child) {
        margin-right: 21px;
      }
      input[type='radio'] {
        vertical-align: middle;
      }
    }
    p {
      overflow: auto;
      font-size: 12px;
      height: 20px;
      color: #494949;
      line-height: 20px;
      margin: 5px 0;
    }
    .trade_container {
      overflow: hidden;
      margin-bottom: 7px;
      font-size: 14px;
      min-width: 300px;
      margin-top: 8px;
      li {
        float: left;
        text-align: center;
        input {
          width: 72.6px;
        }
        .mark {
          display: inline-block;
          font-size: 200%;
          margin-top: 32px;
        }
      }
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
    }
    button {
      width: 100%;
      height: 50px;
      font-size: 14px;
      color: white;
      margin-top: 20px;
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
    .link_style{
    	cursor: pointer;
    }
  }
</style>
