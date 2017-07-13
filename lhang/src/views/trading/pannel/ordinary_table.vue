<template xmlns="http://www.w3.org/1999/html">
  <div class="ordinary_table" id="ordinary_table">
    <!--<div class="batch_btn" v-if="tradeType === '1'" @click="revokedOrder(batch_revoked_data,3)">-->
      <!--<span>批量撤单</span>-->
    <!--</div>-->
    <!--<table class="false_table">-->
      <!--<tr class="table_title">-->
        <!--<td class="spe_title">-->
          <!--<div><input type="checkbox" v-if="tradeType === '1'" v-model='allChecked'/>-->
            <!--<span>委托时间</span>-->
          <!--</div>-->
        <!--</td>-->
        <!--<td>-->
          <!--<div>类型</div>-->
        <!--</td>-->
        <!--<td>-->
          <!--<div>委托量</div>-->
        <!--</td>-->
        <!--<td>-->
          <!--<div>委托价</div>-->
        <!--</td>-->
        <!--<td>-->
          <!--<div>平均成交价</div>-->
        <!--</td>-->
        <!--<td v-if="tradeType==='1'">-->
          <!--<div>剩余委托量</div>-->
        <!--</td>-->
        <!--<td>-->
          <!--<div>交易状态</div>-->
        <!--</td>-->
        <!--<td>-->
          <!--<div>操作</div>-->
        <!--</td>-->
      <!--</tr>-->
      <!--<tr v-if="empty" style="line-height: 60px;background-color: #f5f5f5;margin-top: 6px">-->
        <!--<td style="text-align: center" colspan="8">暂无数据</td>-->
      <!--</tr>-->
      <!--<tr v-for="item in list_r.resultList" v-else class="tbody_tr">-->
        <!--<td class="spe_title">-->
          <!--<input type="checkbox" v-if="tradeType === '1'"-->
                 <!--v-model='checked'-->
                 <!--:value="item.uuid"/>-->
          <!--<span>{{item.spotOrderTime}}</span>-->
        <!--</td>-->
        <!--<td>{{item._type}}</td>-->
        <!--&lt;!&ndash;{{item.tradeType==='buy_market'||item.tradeType==='sell_market'?}}&ndash;&gt;-->
        <!--<td v-if="type == 'zec'">{{item.tradeType === 'buy_market' ? '￥' : '&#xe629;'}} {{item.amount}}</td>-->
        <!--<td v-if="type == 'btc'">{{item.tradeType === 'buy_market' ? '￥' : '&#xe621;'}} {{item.amount}}</td>-->
        <!--<td v-if="type == 'etc'">{{item.tradeType === 'buy_market' ? '￥' : '&#xe628;'}} {{item.amount}}</td>-->
        <!--<td v-if="type == 'eth'">{{item.tradeType === 'buy_market' ? '￥' : '&#xe627;'}} {{item.amount}}</td>-->
        <!--&lt;!&ndash;<td>{{item.price.toFixed(2)}}</td>&ndash;&gt;-->
        <!--<td>{{item.tradeType === 'buy_market' || item.tradeType === 'sell_market' ? '市价' : `￥ ${item.price.toFixed(2)}`}}</td>-->
        <!--<td>￥ {{item.avgPrice.toFixed(2)}}</td>-->
        <!--<td v-if="tradeType ==='1' && type == 'zec'">&#xe629; {{item.surplusAmount}}</td>-->
        <!--<td v-if="tradeType ==='1' && type == 'btc'">&#xe621; {{item.surplusAmount}}</td>-->
        <!--<td v-if="tradeType ==='1' && type == 'etc'">&#xe628; {{item.surplusAmount}}</td>-->
        <!--<td v-if="tradeType ==='1' && type == 'eth'">&#xe627; {{item.surplusAmount}}</td>-->
        <!--<td :style="{color:item.orderStatus!==0?'#494949':'#E93C6F'}">{{item._status_txt}}</td>-->

        <!--<td v-if="tradeType === '1'">-->
          <!--<div class="revoked" @click="revokedOrder(item.uuid,0)">撤单</div>-->
        <!--</td>-->

        <!--<td v-else="tradeType === '1'">-->
          <!--<div class="revoked" @click="viewList(item.transList)">查看</div>-->
        <!--</td>-->
      <!--</tr>-->
    <!--</table>-->
    <!--<div class="table_foot">-->
      <!--<page v-if="!empty" :totalPages='list_r.totalPages' :totalCount='list_r.totalCount'-->
            <!--:page='list_r.page' @pagego="get_list_r" :pageSize="'5'"></page>-->
    <!--</div>-->
    <!--&lt;!&ndash;弹窗&ndash;&gt;-->
    <!--<alert-window v-if="aler_window_status" :alert_data="revoked_data" @window_status="getBoxStatus"></alert-window>-->
    <!--<alert-view v-if="view_window_status" :view_window="view_window" @cancel_status="getViewWindowStatus"></alert-view>-->
  </div>

</template>

<!--<script>-->
  <!--import store from '../../../vuex/store';-->
  <!--import alertWindow from './alert_window.vue';-->
  <!--import alertView from './alert_view.vue';-->
  <!--export default {-->
    <!--props: ['tradeType'], //1 当前委托 、 2 历史委托-->
    <!--data() {-->
      <!--return {-->
        <!--checked: [],-->
        <!--list_data: [],-->
        <!--batch_revoked_data: [],-->
        <!--empty: false,-->
        <!--aler_window_status: false,     //当前弹窗状态-->
        <!--view_window_status: false,     //历史弹窗状态-->
        <!--revoked_data: {-->
          <!--category: `${this.$route.params.type}_cny`,-->
          <!--parent_getJson: this.get_list_r-->
        <!--},-->
        <!--view_window: {},    //查看窗口数据-->
        <!--list_p: {-->
          <!--useruuid: '',-->
          <!--category: '',-->
          <!--type: 'ordering',-->
        <!--},-->
        <!--list_r: {},-->
        <!--type: this.$route.params.type-->
      <!--}-->
    <!--},-->
    <!--components: {alertWindow, alertView},-->
    <!--computed: {-->
      <!--getResultListLength(){-->
        <!--return this.list_data.length-->
      <!--},-->
      <!--//全选-->
      <!--allChecked: {-->
        <!--get(){-->
          <!--return this.checkedCount === 0 && this.getResultListLength === 0 ? false : this.checkedCount === this.getResultListLength;-->
        <!--},-->
        <!--set(val){-->
          <!--if (val) {-->
            <!--this.checked = this.list_data.map(elem => {-->
              <!--return elem.uuid;-->
            <!--})-->
          <!--} else {-->
            <!--this.checked = [];-->
          <!--}-->
        <!--}-->
      <!--},-->

      <!--//获取已选列表数据的length-->
      <!--checkedCount(){-->
        <!--return this.checked.length;-->
      <!--},-->

      <!--uuid() {-->
        <!--return this.$store.getters.uuid;-->
      <!--},-->
      <!--trade_status() {-->
        <!--return this.$store.getters.trade_status.broadcast;-->
      <!--}-->
    <!--},-->
    <!--watch: {-->
      <!--checked(val){-->
        <!--this.batch_revoked_data = val;-->
      <!--},-->
      <!--'$route'(){-->
        <!--this.revoked_data.category = `${this.$route.params.type}_cny`;-->
        <!--this.get_list_r();-->
        <!--this.type = this.$route.params.type;-->
      <!--},-->
      <!--trade_status(val) {-->
        <!--setTimeout(() => {-->
          <!--this.get_list_r();-->
        <!--}, 1000)-->
      <!--}-->
    <!--},-->
    <!--methods: {-->
      <!--//查看列表-->
      <!--viewList(transList){-->
        <!--transList.forEach(elem => {-->
          <!--elem._alance = elem.transactionPrice * elem.transactionAmount;-->
        <!--});-->

        <!--this.view_window = transList;-->

        <!--/*-->
         <!--* totalBalance    成交总金额（需计算）    金额需要自行计算各自相加得出总金额-->
         <!--*-->
         <!--* showTransactionTime  成交时间-->
         <!--* transactionPrice    单价-->
         <!--*transactionAmount    数量-->
         <!--* */-->

        <!--this.view_window_status = true;-->
      <!--},-->

      <!--getBoxStatus(val){-->
        <!--this.aler_window_status = val;-->
      <!--},-->
      <!--getViewWindowStatus(val){-->
        <!--this.view_window_status = val;-->
      <!--},-->
      <!--//撤单-->
      <!--revokedOrder(_uuid, type, triggerPrice){-->

        <!--//如果批量撤单并且 值为空的时候不执行-->
        <!--if (Object.prototype.toString.call(_uuid) === '[object Array]' && _uuid.length === 0) {-->
          <!--return-->
        <!--}-->

        <!--this.revoked_data.uuid = _uuid;-->
        <!--this.revoked_data.useruuid = this.uuid;-->
        <!--this.revoked_data.type = type;-->
        <!--this.revoked_data.tip = 'ordinary';-->

        <!--//如果是计划委托或者是止盈止损委托，triggerPrice-->
        <!--if (triggerPrice) {-->
          <!--this.revoked_data.triggerPrice = triggerPrice;-->
        <!--}-->

        <!--this.aler_window_status = true;-->
      <!--},-->
      <!--//        查询类型-->
      <!--inquireTradeType(type){-->
        <!--let _inquireTradeType = {-->
          <!--sell_market: '市价卖出',-->
          <!--buy_market: '市价买入',-->
          <!--sell: '限价卖出',-->
          <!--buy: '限价买入',-->
        <!--};-->
        <!--return _inquireTradeType[type];-->
      <!--},-->
      <!--//   查询订单状态字段-->
      <!--inquireOrderStatus(status){-->
        <!--let getStatusTxt = ['已撤销', '未成交', '部分成交', '已成交', '撤单中'];-->
        <!--return getStatusTxt[status + 1]-->
      <!--},-->

      <!--processData(res){-->
        <!--let data_list = res.data.list.resultList;-->
        <!--let tradeType, orderStatus, type, status_txt;-->

        <!--data_list.forEach(elem => {-->
          <!--tradeType = elem.tradeType;-->
          <!--orderStatus = elem.orderStatus;-->

          <!--if (tradeType) {-->
            <!--type = this.inquireTradeType(tradeType);-->
          <!--}-->
          <!--if (orderStatus !== 'undefined') {-->
            <!--status_txt = this.inquireOrderStatus(orderStatus);-->
          <!--}-->
          <!--elem._type = type;-->
          <!--elem._status_txt = status_txt;-->
        <!--});-->

        <!--if (res.data.list.totalPages === 0) {-->
          <!--res.data.list.totalPages = 1-->
        <!--}-->

        <!--this.list_r = res.data.list;-->
        <!--this.list_data = res.data.list.resultList;-->
      <!--},-->

      <!--get_list_r(page) {-->
        <!--//获取当前委托-->
        <!--this.list_p.category = this.$route.params.type + "_cny";-->

        <!--let func_arr = [-->
          <!--() => {-->
            <!--//          this.list_p.useruuid = this.uuid;-->
            <!--lh_http("post", "order/list", this.list_p, page).done((res) => {-->
              <!--if (!res.status) {-->
                <!--alert(res.data);-->
                <!--return-->
              <!--}-->

              <!--let leng = res.data.list.resultList.length;-->
              <!--if (leng === 0) {-->
                <!--this.empty = true;-->
                <!--return;-->
              <!--}-->
              <!--this.empty = false;-->

              <!--//处理数据-->
              <!--this.processData(res);-->
            <!--})-->
          <!--},-->
          <!--() => {-->
            <!--//          this.list_p.useruuid = this.uuid;-->
            <!--lh_http("post", "order/recordList", this.list_p, page).done((res) => {-->
              <!--if (!res.status) {-->
                <!--alert(res.data);-->
                <!--return-->
              <!--}-->
              <!--let leng = res.data.list.resultList.length;-->

              <!--if (leng === 0) {-->
                <!--this.empty = true;-->
                <!--return;-->
              <!--}-->
              <!--this.empty = false;-->
              <!--//处理数据-->
              <!--this.processData(res);-->
            <!--})-->
          <!--}-->
        <!--];-->
        <!--func_arr[parseInt(this.tradeType) - 1]();-->
      <!--}-->
    <!--},-->
    <!--mounted() {-->
    <!--},-->
  <!--};-->
<!--</script>-->
<!--<style lang="scss" rel="stylesheet/scss" scoped>-->
  <!--.ordinary_table {-->
    <!--position: relative;-->
    <!--.batch_btn {-->
      <!--position: absolute;-->
      <!--right: 0;-->
      <!--top: -60px;-->
      <!--font-size: 14px;-->
      <!--color: #0093F1;-->
      <!--cursor: pointer;-->
      <!--&:hover {-->
        <!--color: #FF4FA1;-->
      <!--}-->
    <!--}-->
    <!--.revoked {-->
      <!--color: #0093F1;-->
      <!--cursor: pointer;-->
    <!--}-->
    <!--.false_table {-->
      <!--width: 100%;-->
      <!--text-align: center;-->
      <!--font-size: 12px;-->
      <!--border-collapse: collapse;-->
      <!--.table_title {-->
        <!--border-bottom: 1px dashed #d7d7d7;-->
        <!--td {-->
          <!--line-height: 40px;-->
          <!--font-size: 14px;-->
          <!--color: #999999;-->
        <!--}-->
      <!--}-->
      <!--.tbody_tr {-->
        <!--line-height: 44px;-->
        <!--color: #494949;-->
        <!--font-size: 12px;-->
        <!--border-bottom: 1px solid transparent;-->
        <!--&:hover {-->
          <!--border-bottom-color: #0093F1;-->
        <!--}-->
      <!--}-->
      <!--tr td:first-child {-->
        <!--width: 200px;-->
        <!--text-align: left;-->
        <!--padding-left: 20px;-->
        <!--span {-->
          <!--text-align: center;-->
          <!--display: inline-block;-->
          <!--width: 160px;-->
        <!--}-->
      <!--}-->
    <!--}-->
    <!--.table_foot {-->
      <!--height: 50px;-->
      <!--margin-top: 10px;-->
    <!--}-->
  <!--}-->
<!--</style>-->
