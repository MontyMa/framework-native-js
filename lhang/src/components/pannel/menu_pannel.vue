<template>
  <ion-content12>
    <div class="menu_pannel">
      <div class="column_4">
        <div class="col_title">快速交易</div>
        <div class="col_row">
          <a href="#/trading/btc/trade">BTC/CNY</a>
        </div>
        <div class="col_row">
          <a href="#/trading/zec/trade">ZEC/CNY</a>
        </div>
        <div class="col_row">
          <a href="#/trading/etc/trade">ETC/CNY</a>
        </div>
        <div class="col_row">
          <a href="#/trading/eth/trade">ETH/CNY</a>
        </div>
        <div class="col_row">
          <a target="_blank" :href="myUrl+'fullScreen.html'">专业K线交易</a>
        </div>
      </div>
      <div class="column_4">
        <div class="col_title">
          <a href="#/money/partner" class="a_title">资产理财</a></div>
        <div class="col_row">
          <a href="#/money/overview">资产总览</a>
        </div>
        <div class="col_row">
          <a href="#/money/visualization">可视化分析</a>
        </div>
        <!--<div class="col_row">
                    <a href="#/money/bbao">币宝理财</a>
                </div>-->
        <div class="col_row">
          <a href="#/money/recharge">充值充币</a>
        </div>
        <div class="col_row">
          <a href="#/money/cashIn">提现提币</a>
        </div>
        <div class="col_row">
          <a href="#/money/partner">合伙人计划</a>
        </div>
      </div>
      <div class="column_4">
        <div class="col_title">个人中心</div>
        <div class="col_row">
          <a href="#/user/settings">安全设置</a>
        </div>
        <div class="col_row">
          <a href="#/user/securitylog">安全记录</a>
        </div>
        <div class="col_row">
          <a href="#/user/policy">安全策略</a>
        </div>
        <div class="col_row">
          <a href="#/user/auth">实名认证</a>
        </div>
        <div class="col_row">
          <a href="#/user/notice">我的消息</a>
        </div>
      </div>
      <div class="column_4">
        <div class="col_title">更多</div>
        <div class="col_row">
          <a href="#/help/bulletin">帮助中心</a>
        </div>
        <div class="col_row">
          <a>客户端</a>
        </div>
        <div class="col_row">
          <a href="http://blog.lhang.com/" target="_blank">最新资讯</a>
        </div>
        <!--<div class="col_row">-->
          <!--<a target="_blank" :href="myUrl+'givebtc/givebtc.html'">最新活动</a>-->
        <!--</div>-->
        <div class="col_row">
          <a href="/api/rest_api.html">API文档</a>
        </div>
      </div>
    </div>
  </ion-content12>
</template>

<script>
  export default {
    name: 'menu_pannel',
    data() {
      return {
        menu_pannel: true,
        content: "宝宝是新闻组件",
        myUrl: '',
      }
    },
    components: {}, //这里注册
    methods: {},
    mounted() {
      var that = this;
      this.myUrl = window.config.api;
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .menu_pannel {
    width: 678px;
    height: 226px;
    background: red;
    position: relative;
    left: 522px;
    z-index: 10;
    text-align: left;
    background: #283138;
    margin-top: -1px;
    .column_4 {
      width: 25%;
      float: left;
      padding: 0 40px;
      .col_title {
        font-size: 18px;
        border-bottom: 1px white solid;
        padding: 4px 0px;
        margin-bottom: 10px;
        .a_title {
          font-size: 18px;
        }
      }
      a {
        color: white;
        cursor: pointer;
        font-size: 14px;
      }
      .col_row {
        padding: 4px 0;
      }
    }
  }
</style>
