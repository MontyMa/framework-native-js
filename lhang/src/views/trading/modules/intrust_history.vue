<!--Created by monty.ma on 17/7/6.-->
<!--历史委托-->
<template>
  <div class="intrust_history">
    <ul class="table_tit" :class="{padding:listRenderData.length>=10}">
      <li class="list_time">委托时间</li>
      <li>类型</li>
      <li>委托量</li>
      <li>委托价</li>
      <li>平均成交价</li>
      <li>交易状态</li>
      <li>操作</li>
    </ul>
    <div class="table_lay">
      <no-data v-if="empty"></no-data>
      <ul class="table_body" v-for="item in listRenderData">
        <li class="list_time">{{item.spotOrderTime}}</li>
        <li>{{item._type}}</li>
        <li>{{item._tradeTypeUnit}} {{item.amount}}</li>
        <li>{{item._price}}</li>
        <li>￥ {{item.avgPrice.toFixed(2)}}</li>
        <li>{{item._status_txt}}</li>
        <li class="revoke_btn" @click="viewList(item.transList)">查看</li>
      </ul>
    </div>
    <alert-view v-if="viewWindowStatus" :viewTransList="viewTransList" @cancelStatus="getViewWindowStatus"></alert-view>
  </div>
</template>

<script>
  import alertView from './alert_view.vue';  //查看列表弹窗
  export default {
    name: 'intrust_history',
    data() {
      return {
        empty: false, //控制数据为空的
        listRenderData: [], //渲染列表
        viewTransList: [],  //传入查看窗口的数据
        viewWindowStatus: false, //控制查看窗口的显示与否
      }
    },
    components: {alertView},
    computed: {
      currentType(){  //当前货币对
        return this.$route.params.type;
      },
    },
    methods: {
      runRequest(){
        let params = {
          category: `${this.currentType}_cny`,
          type: 'ordering'
        };

        lh_http("post", "order/recordList", params).done((res) => {
          if (!res.status) {
            alert(res.data);
            return
          }
          let leng = res.data.list.resultList.length;
          if (leng === 0) {
            this.$emit(() => this.empty = true);
            return;
          }

          this.$emit(() => this.empty = false);
          //处理数据
          this.processData(res);
        })
      },
      processData(res){  //处理数据
        console.log(res);
        let resultList = res.data.list.resultList;
        let statusTxt = ['已撤销', '未成交', '部分成交', '已成交', '撤单中'];
        let inquireTradeType = {
          sell_market: '市价卖出',
          buy_market: '市价买入',
          sell: '限价卖出',
          buy: '限价买入',
        };
        let typeUnit = {
          zec: '\ue629',
          btc: '\ue621',
          etc: '\ue628',
          eth: '\ue627',
        };

        resultList.forEach(elem => {
          let tradeType = elem.tradeType;
          elem._type = inquireTradeType[tradeType];
          elem._status_txt = statusTxt[elem.orderStatus + 1];
          elem._unit = typeUnit[this.currentType];

          elem._price = !(tradeType === 'buy_market' || tradeType === 'sell_market') ?
            `￥ ${elem.price.toFixed(2)}` : '市价';

          elem._tradeTypeUnit = tradeType !== 'buy_market' ?
            typeUnit[this.currentType] : '￥';
        });

        this.$nextTick(() => this.listRenderData = resultList);
      },
      viewList(transList){ //查看列表
        this.viewTransList = transList;
        this.viewWindowStatus = true;
      },
      getViewWindowStatus(status){  //接受关闭信号
        this.viewWindowStatus = status;
      }
    },
    beforeMount(){
      this.runRequest();
    },
    mounted() {
      this.$emit('hisRequest', this.runRequest); //传出请求方法
    },
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .intrust_history {
    width: 100%;
    height: 244px;
    border: 1px solid #6F8EA1;
    text-align: center;
    font-size: 12px;
    line-height: 22px;
    position: relative;
    margin-top: -1px;
    .table_tit, .table_body {
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      &.padding {
        padding-right: 35px;
      }
      li {
        width: 11.429%;
        &:last-child {
          width: 5%;
        }
      }
      .list_time {
        text-align: left;
        width: 20%;
      }
    }
    .table_tit {
      background-color: #EAF2FD;
      font-weight: 600;
    }
    .table_body {
      padding-right: 20px;
      &:nth-child(2n) {
        background-color: #F5F7FA;
      }
      .revoke_btn {
        color: #0093F1;
        cursor: pointer;
      }
    }
    .time {
      margin-left: 5px;
    }
    .table_lay {
      overflow-y: auto;
      height: 220px;
    }
  }
</style>
