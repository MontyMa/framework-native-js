<template>
  <div class="limit_buy">
    <ul class="trade_container">
      <li>
        <p>买入价格</p>
        <input type="text" placeholder="CNY" v-model="price" id="limit_p_buy"/>
      </li>
      <li>
        <p>数量</p>
        <input type="text" :placeholder="type" v-model="quantity" id="limit_q_buy"/>
      </li>
      <li>
        <range @thisvalue="getRangeVal" :value="rangeValue" :min="0" :max="100" :step="25" theme="danger"></range>
      </li>
      <li>
        <p>交易金额<span class="trade_tip">(交易金额 = 买入价格 x 数量)</span></p>
        <input type="text" placeholder="CNY" v-model="amount" id="limit_a_buy"/>
      </li>
    </ul>
    <div style="margin-top:10px;" v-if="tradepaypwd">
      <div class="input_right">
        <!--<div class="placeholder"></div>-->
        <input type="password" v-model="paypwd" placeholder="请输入资金密码"/>
      </div>
      <p>
        <router-link to="/user/settings/funding_edit">
          <span class="link_style" style="float: left;">忘记资金密码？</span>
        </router-link>
        <router-link to="/user/policy/bind/modify_trade_check">
          <span class="link_style" style="float: right;">免输资金密码</span>
        </router-link>
      </p>
    </div>
    <div style="height: 40px;" v-if="!tradepaypwd">
    </div>
    <button style="background: #E93C6F;" @click="limit_buy()">
      买入{{type}}
    </button>
  </div>
</template>
<script>
  import range from './pannel/range';
  import trade from './trade';
  import store from '../../../../vuex/store';
  export default {
    data () {
      return {
        amount: null,
        quantity: null,
        price: null,
        paypwd: "",
        type: this.$route.params.type.toUpperCase(),
        autoPrice: true,
      }
    },
    props: ['clickCny'],
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
      tradPrice() {
        return this.$store.getters.tradPrice;
      }
    },
    components: {range},
    methods: {
      limit_buy() {
        //传给后台的参数
        let options = {
          "useruuid": this.uuid,
          "price": this.price,
          "quantity": this.quantity,
          "amount": this.amount,
          "type": "buy",
          "paypwd": this.paypwd,
          "category": this.$route.params.type + "_cny"
        };
        lh_http("post", "order/createorder", options).done((res) => {
          if (res.status) {
            alert("挂单完成");
            this.price = null;
            this.quantity = 0;
            this.amount = null;
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
        if ($("#limit_q_buy").is(":focus") || $("#limit_a_buy").is(":focus") || $("#limit_p_buy").is(":focus")) {
          return
        }
        if ((!this.price || this.price == 0) && value != 0) {
          this.price = this.closingPrice;
        }
        this.rangeValue = value ? value : 0;
        this.amount = value ? ((value * this.account.cny_usable) / 100).toFixed(4) : null;
        this.quantity = value ? (this.amount / this.price).toFixed(4) : null;
      },
      renderPrice(){  //解决切换过后不能填充价格的问题
        if (this.closingPrice) {
          this.price = (Math.floor(+this.closingPrice * 100) / 100).toFixed(2);
        }
      }
    },
    mounted(){
      this.renderPrice();
    },
    watch: {
      closingPrice(val){  //自动填充买入价格
        if (this.autoPrice) {
          this.price = (Math.floor(+val * 100) / 100).toFixed(2);
          this.autoPrice = false;
        }
      },
      clickCny(val){ //监听父组件传递的点击后的 cny
        this.amount = val[0];
      },
      tradPrice(val) {
        this.price = val;
      },
      quantity: function (val, oldvalue) {
        if (!($("#limit_q_buy").is(":focus") || $("#limit_a_buy").is(":focus") || $("#limit_p_buy").is(":focus"))) {
          return;
        }
        if ($("#limit_q_buy").is(":focus") && val) {
          if (val < 0) val = -val;
          if (!this.price || this.price == 0) {
            this.price = this.closingPrice;
          }
          this.quantity = (val * this.price) > this.account.cny_usable ? (this.account.cny_usable / this.price) : val;
          this.quantity = trade.getNumber(this.quantity, oldvalue, 4);
          this.amount = this.price * this.quantity;
          this.amount = this.amount > this.account.cny_usable ? 0 : this.amount;
        }
      },
      price: function (val, oldvalue) {
        if (!($("#limit_q_buy").is(":focus") || $("#limit_a_buy").is(":focus") || $("#limit_p_buy").is(":focus"))) {
          return;
        }
        if ($("#limit_p_buy").is(":focus") && val) {
          if (val < 0) val = -val;
          this.price = (val * this.quantity) > this.account.cny_usable ? (this.account.cny_usable / this.quantity) : val;
          this.price = trade.getNumber(this.price, oldvalue, 2);
          this.amount = this.price * this.quantity;
        }
      },
      amount: function (val, oldvalue) {
        if (!($("#limit_q_buy").is(":focus") || $("#limit_a_buy").is(":focus") || $("#limit_p_buy").is(":focus"))) {
          return;
        }
        if ($("#limit_a_buy").is(":focus") && val) {
          if (val < 0) val = -val;
          if (!this.price || this.price == 0) {
            this.price = this.closingPrice;
          }
          this.amount = this.amount > this.account.cny_usable ? this.account.cny_usable : val;
          this.amount = trade.getNumber(this.amount, oldvalue, 2);
          this.quantity = (this.amount / this.price).toFixed(4);
        }
      },
      $route() {
        this.type = this.$route.params.type.toUpperCase();
        this.amount = null;
        this.quantity = null;
        this.price = null;
        this.autoPrice = true;
        this.paypwd = "";
      }
    }
  };
</script>
<style lang="scss">
  .limit_buy {
    font-size: 12px;
    width: 260px;
    padding-right: 40px;
    border-right: 1px dashed #d7d7d7;
    -webkit-box-sizing: content-box;
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
        /*text-align: right;*/
      }
    }
    p {
      overflow: auto;
      height: 20px;
      color: #494949;
      font-size: 12px;
      line-height: 20px;
      margin: 5px 0;
    }
    .trade_container {
      margin-bottom: 8px;
      font-size: 14px;
      .trade_tip {
        color: #999;
        margin-left: 5px;
      }
      li {
        input {
          width: 100%;
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
      margin-bottom: 21px;
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
    input[type='text'],
    input[type='password'] {
      height: 45px;
      width: 100%;
      font-size: 14px;
      padding: 0 10px;
      border: 1px solid #cbcbcb;

    }
    button {
      width: 100%;
      height: 50px;
      font-size: 14px;
      color: white;
      margin-top: 20px;
      /*margin-bottom: 41px;*/
    }
    .link_style {
      cursor: pointer;
    }
  }
</style>
