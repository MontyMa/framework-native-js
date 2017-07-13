<template>
  <div class="alert_window">
    <div class="alert_box">
      <div class="title">撤单</div>
      <div class="cont">
        <div class="cont_txt">撤单之后不可恢复，确认撤单?</div>
        <ul class="btn_box">
          <li class="submit" @click="runRequst">确认</li>
          <li class="cancel" @click="cancel">取消</li>
        </ul>
      </div>
    </div>
    <div class="v_center"></div>
  </div>
</template>
<script>
  import store from '../../../vuex/store';
  export default{
    name: 'alert_window',
    data(){
      return {}
    },
    props: {
      revokedData: {type: Object, required: true},  //传过来的数据
      request: {type: Function},  //请求接口函数
    },
    methods: {
      runRequst(){
        /*        { //如果不上止盈止损即可删掉
         'order/revokeplanorder',    //计划委托
         'order/batchRevokePlanOrder',    //计划委托批量撤单
         'order/revokeprofitorder',    //止盈止损委托
         'order/batchRevokeProfitAndLossOrder',    //止盈止损批量撤单
         }*/
        let revokedData = this.revokedData;
        let requestUrl = [
          'order/revokeorder',   //普通单个撤单
          'order/batchrevoke',    //普通批量撤单
        ];

        let msg = {
          category: revokedData.category,
          useruuid: revokedData.myUuid,
        };

        let getRevokedUuids = [
          msg => {  //普通单个撤单
            msg.uuid = revokedData.data;
            return msg;
          },
          msg => {  //普通批量撤单
            msg.uuids = revokedData.data.join(',');
            return msg;
          }
        ];

        let url = requestUrl[revokedData.revokedType];
        let sendParam = getRevokedUuids[revokedData.revokedType](msg);

        lh_http('post', url, sendParam).done(res => {
          if (!res.status) {
            alert(res.data);
            this.$emit('windowStatus', false);
            return
          }
          store.dispatch('trade_status', this.$route.params.type);
          this.request && this.request();
          this.$emit('windowStatus', false);
        });
      },
      cancel(){
        this.$emit('windowStatus', false);
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .alert_window {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    text-align: center;
    z-index: 10;
    font-size: 0;
    .alert_box {
      width: 360px;
      height: 192px;
      border-radius: 10px;
      font-size: 16px;
      overflow: hidden;
      text-align: left;
      background-color: #ffffff;
      .title {
        line-height: 46px;
        padding-left: 28px;
        color: #0093F1;
        background-color: #ffffff;
        font-size: 18px;
        border-bottom: 1px solid #D7D7D7;
        margin-bottom: 0;
      }
      .cont {
        padding: 28px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
        /*height: 100%;*/
      }
      .cont_txt {
        color: #494949;
        font-size: 16px;
      }
      .btn_box {
        font-size: 0;
        position: absolute;
        bottom: -45px;
        right: 28px;
        li {
          text-align: center;
          font-size: 14px;
          display: inline-block;
          vertical-align: middle;
          line-height: 32px;
          user-select: none;
          width: 70px;
          border-radius: 2px;
          cursor: pointer;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
        }
        .submit {
          background-color: #0093F1;
          color: #ffffff;
        }
        .cancel {
          border: 1px solid #999999;
          color: #666666;
          margin-left: 14px;
        }
      }
    }
    .v_center {
      height: 100%;
    }
    .v_center, .alert_box {
      display: inline-block;
      vertical-align: middle;
    }
  }
</style>
