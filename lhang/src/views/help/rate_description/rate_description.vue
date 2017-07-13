<template>
  <div class="rate_escription">
    <!--<div class="rate_title">费率说明</div>-->
    <div class="rate_cont">
      <template v-if="status">
        <img src="./img/rate_img_new.png" style="width: 100%">
      </template>
      <template v-else="status">
        <img src="./img/rate_img.png" style="width: 100%">
      </template>
      <!--费率标准：不同的VIP会员应对不同的汇率   以后放出-->
      <!--<p class="tit">费率标准：不同的VIP会员应对不同的汇率</p>-->
      <!--<table class="rate">
        <tr>
          <td>VIP会员级别</td>
          <td>VIP1</td>
          <td>VIP2</td>
          <td>VIP3</td>
          <td>VIP4</td>
          <td>VIP5</td>
          <td>超级会员</td>
        </tr>
        <tr>
          <td>对应积分</td>
          <td>0</td>
          <td>2,000</td>
          <td>6,000</td>
          <td>20,000</td>
          <td>50,000</td>
          <td rowspan="10" class="buy"><a href="javascript:void (0)">需要联系购买</a></td>
        </tr>
        <tr>
          <td>CNY提现费率</td>
          <td>0.50%</td>
          <td>0.45%</td>
          <td>0.38%</td>
          <td>0.30%</td>
          <td>0.20%</td>
        </tr>
        <tr>
          <td>BTC提现费率</td>
          <td colspan="5">可选区块手续费：(0.00005, 0.0001, 0.0002, 0.0003, 0.0004, 0.0005) BTC</td>
        </tr>
        <tr>
          <td>ZEC提现费率</td>
          <td colspan="5">区块手续费：0.0001ZEC</td>
        </tr>
        <tr>
          <td>ETH提现费率</td>
          <td colspan="5">区块手续费：0.01ETH</td>
        </tr>
        <tr>
          <td>ETC提现费率</td>
          <td colspan="5">区块手续费：0.01ETC</td>
        </tr>
        <tr>
          <td>BTC交易手续费</td>
          <td>0.00%</td>
          <td>0.00%</td>
          <td>0.00%</td>
          <td>0.00%</td>
          <td>0.00%</td>
        </tr>
        <tr>
          <td>ZEC交易手续费</td>
          <td>0.10%</td>
          <td>0.10%</td>
          <td>0.10%</td>
          <td>0.10%</td>
          <td>0.10%</td>
        </tr>
        <tr>
          <td>ETH交易手续费</td>
          <td>0.10%</td>
          <td>0.10%</td>
          <td>0.10%</td>
          <td>0.10%</td>
          <td>0.10%</td>
        </tr>
        <tr>
          <td>ETC交易手续费</td>
          <td>0.10%</td>
          <td>0.10%</td>
          <td>0.10%</td>
          <td>0.10%</td>
          <td>0.10%</td>
        </tr>
      </table>-->
      <!--<div class="group_2">

        <p class="tit">提现额度</p>
        <table class="quota">
          <tr>
            <td>币种</td>
            <td>单笔最小提现额</td>
            <td>单笔最大提现额</td>
            <td>每日最高提现额</td>
          </tr>
          <tr>
            <td>CNY</td>
            <td>100CNY</td>
            <td>200,000CNY</td>
            <td>2,000,000CNY</td>
          </tr>
          <tr>
            <td>BTC</td>
            <td>0.01BTC</td>
            <td>50BTC</td>
            <td>500BTC</td>
          </tr>
          <tr>
            <td>ZEC</td>
            <td>0.01ZEC</td>
            <td>500ZEC</td>
            <td>5,000ZEC</td>
          </tr>
          <tr>
            <td>ETH</td>
            <td>0.01ETH</td>
            <td>2,000ETH</td>
            <td>20,000ETH</td>
          </tr>
          <tr>
            <td>ETC</td>
            <td>0.01ETC</td>
            <td>20,000ETC</td>
            <td>200,000ETC</td>
          </tr>
        </table>
      </div>-->
    </div>
  </div>
</template>
<script>
  export default{
    name: 'rate_escription',
    data(){
      return {
        status: false,
      }
    },
    computed: {},
    methods: {
      onlineTimer(){
        let nowTime = +new Date() / 1000;
        let interVal = setInterval(() => {
          nowTime++;
          let condition = nowTime >= 1498838399;
          this.status = condition;
          if (condition) {
            clearInterval(interVal);
          }
        }, 1000);
      },
    },
    beforeMount(){
      this.onlineTimer();
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .rate_escription {
    text-align: left;
    /*.rate_title {*/
    /*font-size: 26px;*/
    /*color: #1B1E23;*/
    /*line-height: 58px;*/
    /*background-color: #F4F4F4;*/
    /*padding-left: 20px;*/
    /*-webkit-box-sizing: border-box;*/
    /*-moz-box-sizing: border-box;*/
    /*box-sizing: border-box;*/
    /*}*/
    .rate_cont {
      margin-top: 10px;
      .tit {
        line-height: 40px;
        font-size: 16px;
        color: #494949;
        margin-bottom: 10px;
      }
    }
    table {
      text-align: center;
      line-height: 60px;
      font-size: 14px;
      width: 100%;
      border-collapse: collapse;
      border: 1px solid #F2F9FE;
      color: #494949;
    }
    table.rate {
      tr {
        td {
          font-weight: 300;
          a {
            color: #0093F1;
          }
          &.buy {
            border-left: 1px solid #F2F9FE;
          }
        }
        td:first-child {
          font-weight: 600;
        }

        &:nth-child(2n-1) {
          background-color: #F2F9FE;
        }
      }
    }
    table.quota {
      tr {
        font-weight: 300;
      }
      td {
        font-size: 13px;
      }
      tr:first-child {
        font-weight: 600;
      }
      tr:nth-child(2n) {
        background-color: #F2F9FE;
      }
    }
    .group_2 {
      margin-top: 50px;
    }
  }
</style>
