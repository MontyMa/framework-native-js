<!--Created by monty.ma on 17/7/4.-->
<!--当前委托-->
<template>
  <div class="intrust_current">
    <div class="batch_btn" @click="revokedOrder({data:batchRevokedData,revokedType:1})">
      批量撤单
    </div>
    <ul class="table_tit" :class="{padding:listRenderData.length>=10}">
      <li class="list_time">
        <div>
          <input type="checkbox" v-model='allChecked' class="check_box"/>
          <span class="time">委托时间</span>
        </div>
      </li>
      <li>类型</li>
      <li>委托量</li>
      <li>委托价</li>
      <li>平均成交价</li>
      <li>剩余委托量</li>
      <li>交易状态</li>
      <li>操作</li>
    </ul>
    <div class="table_lay">
      <no-data v-if="empty"></no-data>
      <ul class="table_body" v-for="item in listRenderData">
        <li class="list_time">
          <input type="checkbox" class="check_box"
                 v-model='checked' :value="item.uuid"/>
          <span class="time">{{item.spotOrderTime}}</span>
        </li>
        <li>{{item._type}}</li>
        <li>{{item._tradeTypeUnit}} {{item.amount}}</li>
        <li>{{item._price}}</li>
        <li>￥ {{item.avgPrice.toFixed(2)}}</li>
        <li>{{item._unit}} {{item.surplusAmount}}</li>
        <li :style="{color:item._color}">{{item._status_txt}}</li>
        <li class="revoke_btn" @click="revokedOrder({data:item.uuid,revokedType:0})">撤单</li>
      </ul>
    </div>
    <!--弹窗-->
    <alert-window v-if="alertStatus" :revokedData="revokedData"
                  :request="runRequest" @windowStatus="getBoxStatus"/>
  </div>
</template>
<script>
  import alertWindow from './alert_window.vue';
  export default {
    name: 'current_intrust',
    data() {
      return {
        empty: false,
        checked: [],
        listRenderData: [], //渲染列表
        batchRevokedData: [], //全选后的数组
        myUuid: this.$store.getters.uuid,
        alertStatus: false,     //当前弹窗状态
        revokedData: {},
      }
    },
    components: {alertWindow},
    computed: {
      currentType(){  //当前货币对
        return this.$route.params.type;
      },
      allChecked: { //全选
        get(){
          return this.checkedCount === 0 && this.getResultListLength === 0 ?
            false : this.checkedCount === this.getResultListLength;
        },
        set(val){
          if (val) {
            this.checked = this.listRenderData.map(elem => {
              return elem.uuid;
            })
          } else {
            this.checked = [];
          }
        }
      },
      checkedCount(){ //获取已选列表数据的length
        return this.checked.length;
      },
      getResultListLength(){
        return this.listRenderData.length
      },
    },
    methods: {
      processData(res){  //处理数据
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

          elem._color = elem.orderStatus !== 0 ? '#494949' : '#E93C6F';
        });

        this.$nextTick(() => this.listRenderData = resultList);
      },
      runRequest(){ //发起请求
        let params = {
          category: `${this.currentType}_cny`,
          type: 'ordering'
        };

        lh_http("post", "order/list", params).done((res) => {
          if (!res.status) {
            alert(res.data);
            return;
          }

          let leng = res.data.list.resultList.length;
          if (leng === 0) {
            console.log(res);
            this.listRenderData = [];
            this.$nextTick(() => this.empty = true);
            return;
          }
          this.$nextTick(() => this.empty = false);
          this.processData(res);  //处理数据
        });
      },
      revokedOrder(orderMsg){  //撤单 orderMsg:订单信息  revokedType:撤销类型
        let data = orderMsg.data;
        let isArray = Object.prototype.toString.call(data) === '[object Array]';

        if (isArray && orderMsg.data.length === 0)return;

        orderMsg.category = `${this.currentType}_cny`;
        orderMsg.myUuid = this.myUuid;
        this.revokedData = orderMsg;
        this.alertStatus = true;
      },
      getBoxStatus(val){
        this.alertStatus = val;
      },
    },
    watch: {
      checked(val){
        this.batchRevokedData = val;
      },
    },
    beforeMount(){
      this.runRequest();
    },
    mounted(){
      this.$emit('curRequest', this.runRequest);
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .intrust_current {
    width: 100%;
    height: 244px;
    border: 1px solid #6F8EA1;
    text-align: center;
    font-size: 12px;
    line-height: 22px;
    position: relative;
    margin-top: -1px;
    .batch_btn {
      position: absolute;
      top: 0;
      right: 0;
      color: #0093F1;
      cursor: pointer;
      -webkit-transform: translateY(-25px);
      -moz-transform: translateY(-25px);
      -ms-transform: translateY(-25px);
      -o-transform: translateY(-25px);
      transform: translateY(-25px);
    }
    .check_box {
      cursor: pointer;
    }
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
