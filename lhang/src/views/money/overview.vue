<template>
  <div class="overview" id="overview">
    <div class="st_title">
      <span class="my_title">人民币现货资产</span>
    </div>
  
    <div class="assets_nav">
      <ul class="ul_header">
        <li>币种</li>
        <li>可用</li>
        <li>冻结</li>
        <li>小计</li>
        <li>平均持仓成本</li>
        <li class="operating">操作</li>
      </ul>
  
      <div class="table_body">
        <ul v-for="i in lists">
          <li>{{i.assetCode | toUpper}}</li>
          <li v-if="i.assetCode == 'cny'">{{i.usableAmt | number(2)}}</li>
          <li v-if="i.assetCode != 'cny'">{{i.usableAmt | number(4)}}</li>
          <li v-if="i.assetCode == 'cny'">{{i.freezeAmt | number(2)}}</li>
          <li v-if="i.assetCode != 'cny'">{{i.freezeAmt | number(4)}}</li>
          <li v-if="i.assetCode == 'cny'">{{i.usableAmt + i.freezeAmt | number(2)}}</li>
          <li v-if="i.assetCode != 'cny'">{{i.usableAmt + i.freezeAmt | number(4)}}</li>
          <li v-if="i.assetCode == 'cny'">{{i.hasOwnBalance | number(2)}}</li>
          <li v-if="i.assetCode != 'cny'">{{i.hasOwnBalance | number(4)}}</li>
          <li class="operating operate_clr">
            <a v-if="i.assetCode=='cny'" href="javascript:void (0)" @click="goToWithdraw(i.assetCode)">提现</a>
            <a v-else href="javascript:void (0)" @click="goToWithdraw(i.assetCode)">提币</a>
            <a v-if="i.assetCode=='cny'" class="my_btn" href="javascript:void (0)" @click="goToCharge(i.assetCode)">充值</a>
            <a v-else class="my_btn" href="javascript:void (0)" @click="goToCharge(i.assetCode)">充币</a>
          </li>
        </ul>
        <!--        <ul>
                                                <li>2222</li>
                                                <li>3423</li>
                                                <li>3423</li>
                                                <li>3423</li>
                                                <li>3423</li>
                                                <li class="operating operate_clr">
                                                  <a href="javascript:void (0)">充值</a> / <a href="javascript:void (0)">提现</a>
                                                </li>
                                              </ul>-->
      </div>
      <!--增加总资产折合CNY-->
      <div class="account_all_cny">总资产折合CNY：
        <span class="unit">￥</span>
        <span class="money">{{getAccountAllCny}}</span>
      </div>
    </div>
  
    <!--账单历史明细-->
    <history-customer></history-customer>
  </div>
</template>
<script>
import historyCustomer from './pannel/history-customer/history_customer.vue';
export default {
  name: 'policy',
  computed: {
    getAccountAllCny() {
      return (Math.floor(this.$store.getters.account.all_cny * 100) / 100).toFixed(2);
    }
  },
  data() {
    return {
      title: '',
      span_tag: false,
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
      lists: []
    }
  }, //定义变量
  components: {
    //账单历史明细
    historyCustomer
  }, //注册组件
  methods: { //方法都在这里
    ddd: function () {
      this.span_tag = !this.span_tag;
    },
    getCNYAccount() {
      lh_http("post", 'customerAsset/cnySpotAssetQuery', {}).done((res) => {
        if (res.status) {
          let tmpArr = res.data.list;
          let new_arr = [];
          tmpArr.forEach(elem => {
//          if (elem.assetCode === 'etc') {
//            return;
//          }
            if (elem.assetCode === 'cny') {
              new_arr.unshift(elem);
            } else {
              new_arr.push(elem);
            }
          });
          this.lists = new_arr;
        }
      });
    },
    //链接去充值
    goToCharge(val) {
      this.$router.push({
        path: '/money/recharge'
      });
      //console.log(val)
      this.$store.dispatch("tocharge", val);
    },
    //链接去提现
    goToWithdraw(val) {
      this.$router.push({
        path: '/money/cashIn'
      });
      this.$store.dispatch("towithdraw", val);
    }
  },
  mounted() {
    //获取banner
    this.getCNYAccount();
  },
  filters: {
    toUpper(val) {
      return val.toString().toUpperCase();
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
.overview {
  text-align: left;
}

.account_all_cny {
  background-color: #F8F8F8;
  line-height: 35px;
  box-sizing: border-box;
  border-top: 1px solid #D7D7D7;
  font-size: 14px;
  padding-left: 35px;
  color: #999999;
  margin-top: 10px;
  .unit,
  .money {
    color: #0093F1;
  }
  .money {
    font-weight: bold;
  }
}

.st_title {
  background-color: #f8f8f8;
  color: #0093F1;
  font-size: 14px;
  height: 30px;
  line-height: 30px;
  .my_title {
    margin-left: 10px;
    font-weight: bold;
  }
}

.assets_nav {
  margin-top: 15px;
  /*列表公共样式*/
  ul {
    li {
      display: inline-block;
      text-align: center;
      font-size: 13px;
      box-sizing: border-box;
      width: (100%-20%)/5;
      &.operating {
        width: 17%;
      }
      &.operate_clr,
      a {
        color: #0093F1;
        &.my_btn {
          display: inline-block;
          width: 40px;
          height: 22px;
          line-height: 22px;
          background: #0093F1;
          color: #fff;
          border-radius: 3px;
          margin-left: 5px;
        }
      }
    }
  }
  .ul_header {
    border-bottom: 1px solid #d7d7d7;
    li {
      font-size: 14px;
      color: #9B9B9B;
      box-sizing: border-box;
      padding: 10px 0;
    }
  }
  .table_body {
    color: #1B1E23;
    ul:hover {
      background-color: #F2F9FE;
    }
    li {
      margin: 20px 0;
    }
  }
}
</style>
