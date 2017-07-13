<template>
  <div class="alert_view">
    <div class="cont">
      <div class="data_wrap">
        <div class="total">成交总金额：<span>{{(getPageParame.total).toFixed(2)}}</span></div>
        <div class="alert_view_wrap">
          <table class="alert_view_table alert_view_table_1">
            <tr>
              <td>成交时间</td>
              <td>单价</td>
              <td>数量</td>
              <td>金额</td>
              <td>手续费率</td>
              <td>手续费</td>
            </tr>
          </table>

          <div class="table_2_wrap">
            <table class="alert_view_table alert_view_table_2">
              <tr v-for="item in getPageParame.viewTransList">
                <td>{{item.showTransactionTime}}</td>
                <td>{{item.transactionPrice}}</td>
                <td>{{item.transactionAmount}}</td>
                <td>{{item._alance.toFixed(2)}}</td>
                <td>{{item.tradeFeeRate ? item.tradeFeeRate : 0}}</td>
                <td>{{item.tradeFee ? item.tradeFee : 0}}</td>
              </tr>
            </table>
          </div>
        </div>

      </div>
      <div class="close" @click="cancel">
        <div class="close_box"></div>
      </div>
    </div>
    <div class="v_center"></div>
  </div>
</template>
<script>
  export default{
    name: 'alert_view',
    props: {
      viewTransList: {type: Array, required: true},  //传入的原始数据
    },
    data(){
      return {}
    },
    computed: {
      getPageParame(){
        let viewTransList = this.viewTransList, total = 0;

        viewTransList.forEach(elem => {
          elem._alance = elem.transactionPrice * elem.transactionAmount;
          total += elem._alance;
        });

        return {total, viewTransList};
      }
    },
    methods: {
      cancel(){ //发送关闭窗口信号
        this.$emit('cancelStatus', false);
      }
    },
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .alert_view {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    font-size: 0;
    z-index: 10;
    text-align: center;
    background-color: rgba(0, 0, 0, .5);
    .data_wrap {
      height: 380px;
      width: 100%;
    }

    .v_center, .cont {
      display: inline-block;
      vertical-align: middle;
    }
    .cont {
      font-size: 14px;
      width: 1000px;
      border-radius: 8px;
      padding: 55px 46px;
      box-sizing: border-box;
      max-height: 600px;
      position: relative;
      background-color: #ffffff;
    }
    .v_center {
      height: 100%;
    }
    .total {
      text-align: left;
      color: #494949;
      font-size: 13px;
      margin-bottom: 16px;
      span {
        color: #DD1A53;
        font-weight: 600;
      }
    }
    .alert_view_table {
      width: 100%;
      border-collapse: collapse;
      td {
        width: 16%;
      }
      td:first-child {
        width: 20%;
      }
    }
    .alert_view_table_1 {
      line-height: 35px;
      background-color: #F2F9FE;
      color: #999999;
      font-size: 13px;
    }
    .table_2_wrap {
      overflow: auto;
      height: 330px;
      overflow-scrolling: touch;
    }
    .alert_view_table_2 {
      line-height: 50px;
      color: #494949;
      font-size: 12px;
    }
    .close {
      position: absolute;
      width: 20px;
      height: 20px;
      top: 0;
      right: -30px;
      cursor: pointer;
      &:hover {
        .close_box:after {
          transform: rotate(-135deg);
        }
        .close_box:before {
          transform: rotate(135deg);
        }
      }
      .close_box {
        &:before, &:after {
          content: '';
          width: 2px;
          height: 20px;
          display: block;
          position: absolute;
          transition: 300ms;
          margin-left: 50%;
          background-color: #dedede;
        }
        &:before {
          transform: rotate(45deg);
        }
        &:after {
          transform: rotate(-45deg);
        }
      }
    }
  }
</style>
