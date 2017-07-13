<template>
  <div class="common_table" id="common_table">
    <!--<div class="batch_btn" v-if="tradeType == 1 " @click="revokedOrder(batch_revoked_data,5)"-->
         <!--:class="{click_btn:checkedCount>=1}">-->
      <!--<span>批量撤单</span>-->
    <!--</div>-->

    <!--<table class="false_table">-->
      <!--<tr class="table_title" :class="{layout:tradeType==='2'}">-->
        <!--<td class="spe_title">-->
          <!--<div>-->
            <!--<input type="checkbox" v-if="tradeType === '1'" v-model='allChecked'/>-->
            <!--<span>委托时间</span>-->
          <!--</div>-->
        <!--</td>-->
        <!--<td>-->
          <!--<div>类型</div>-->
        <!--</td>-->
        <!--<td>-->
          <!--<div>委托价</div>-->
        <!--</td>-->
        <!--<td>-->
          <!--<div>止盈触发价</div>-->
        <!--</td>-->
        <!--<td>-->
          <!--<div>止盈委托价</div>-->
        <!--</td>-->
        <!--<td>-->
          <!--<div>止损触发价</div>-->
        <!--</td>-->
        <!--<td>-->
          <!--<div>止损委托价</div>-->
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
        <!--<td v-if="tradeType === '1'" style="text-align: center" colspan="10">暂无数据</td>-->
        <!--<td v-else="tradeType === '1'" style="text-align: center" colspan="9">暂无数据</td>-->
      <!--</tr>-->
      <!--<tr v-for="item in list_r" v-else="empty" :class="{layout:tradeType==='2'}" class="tbody_tr">-->
        <!--<td class="spe_title">-->
          <!--<input type="checkbox" v-if="tradeType === '1'"-->
                 <!--v-model='checked'-->
                 <!--:value="{uuid:item.uuid,stopSuccessTriggerPrice:item.stopSuccessTriggerPrice,stopLessTriggerPrice:item.stopLessTriggerPrice}"/><span>{{item._time}}</span>-->
        <!--</td>-->
        <!--<td>止盈止损</td>-->
        <!--<td>{{item.price || item.quantity}}</td>-->
        <!--<td>{{item.stopSuccessTriggerPrice}}</td>-->
        <!--<td>{{item.stopSuccessOrderPrice}}</td>-->
        <!--<td>{{item.stopLessTriggerPrice}}</td>-->
        <!--<td>{{item.stopLessOrderPrice}}</td>-->
        <!--<td v-if="tradeType ==='1'">{{item.price || item.quantity}}</td>-->
        <!--<td :style="{color:item.orderStatus!==0?'#494949':'#E93C6F'}">{{item._status_txt}}</td>-->

        <!--<td v-if="tradeType === '1'">-->
          <!--<div class="revoked"-->
               <!--@click="revokedOrder(item.uuid,2,{stopSuccessTriggerPrice:item.stopSuccessTriggerPrice,stopLessTriggerPrice:item.stopLessTriggerPrice})">-->
            <!--<span>撤单</span>-->
          <!--</div>-->
        <!--</td>-->

        <!--<td v-else="tradeType === '1'">-->
          <!--<div class="revoked revoked2" @click="viewList(item.transList)">查看</div>-->
        <!--</td>-->

      <!--</tr>-->
    <!--</table>-->
    <!--<div class="table_foot">-->
      <!--&lt;!&ndash;<button v-if="tradeType == 1 " @click="revokedOrder(batch_revoked_data,5)" :class="{click_btn:checkedCount>=1}">&ndash;&gt;-->
      <!--&lt;!&ndash;<span>批量撤单</span>&ndash;&gt;-->
      <!--&lt;!&ndash;</button>&ndash;&gt;-->
      <!--<page v-if="!empty" :totalPages='paging_data.pageTotal'-->
            <!--:page='paging_data.page' @pagego="get_list"></page>-->
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
        <!--empty: false,-->
        <!--paging_data: {},-->
        <!--view_window: {},    //查看窗口数据-->
        <!--revoked_data: {-->
          <!--category: 'btc_cny',-->
          <!--parent_getJson: this.get_list-->
        <!--},-->
        <!--aler_window_status: false,     //当前弹窗状态-->
        <!--view_window_status: false,     //历史弹窗状态-->
        <!--checked: [],-->
        <!--batch_revoked_data: [],-->

        <!--list_p: {-->
          <!--useruuid: '',-->
          <!--category: this.$route.params.type + "_cny",-->
          <!--type: 'ordering',-->
          <!--pageNo: 1,-->
          <!--pageSize: 5-->
        <!--},-->
        <!--list_r: [],-->

      <!--}-->
    <!--}, //定义变量-->
    <!--components: {alertWindow, alertView},-->
    <!--computed: {-->
      <!--getResultListLength(){-->
        <!--return this.list_r.length-->
      <!--},-->
      <!--//全选-->
      <!--allChecked: {-->
        <!--get(){-->
          <!--return this.checkedCount === this.getResultListLength-->
        <!--},-->
        <!--set(val){-->
          <!--if (val) {-->
            <!--this.checked = this.list_r.map(elem => {-->
              <!--return {-->
                <!--uuid: elem.uuid,-->
                <!--stopSuccessTriggerPrice: elem.stopSuccessTriggerPrice,-->
                <!--stopLessTriggerPrice: elem.stopLessTriggerPrice-->
              <!--};-->
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
    <!--},-->
    <!--watch: {-->
      <!--checked(val){-->
        <!--//console.log(val);-->
        <!--this.batch_revoked_data = val;-->
      <!--},-->
      <!--'$route' (to, from) {-->
        <!--this.get_list();-->
      <!--}-->
    <!--},-->
    <!--methods: {-->
      <!--viewList(transList){-->
        <!--//console.log(transList);-->
<!--//        if (transList.length === 0) return;-->
        <!--/*-->
         <!--* totalBalance    成交总金额（需计算）    金额需要自行计算各自相加得出总金额-->
         <!--*-->
         <!--* showTransactionTime  成交时间-->
         <!--* transactionPrice    单价-->
         <!--*transactionAmount    数量-->
         <!--* */-->

        <!--transList.forEach(elem => {-->
          <!--elem._alance = elem.transactionPrice * elem.transactionAmount;-->
        <!--});-->

        <!--this.view_window = transList;-->
        <!--this.view_window_status = true;-->
      <!--},-->
      <!--getBoxStatus(val){-->
        <!--this.aler_window_status = val-->
      <!--},-->
      <!--getViewWindowStatus(val){-->
        <!--//console.log(val);-->
        <!--this.view_window_status = val;-->
      <!--},-->
      <!--//撤单-->
      <!--revokedOrder(_uuid, type, obj){-->

        <!--//如果批量撤单并且 值为空的时候不执行-->
        <!--if (Object.prototype.toString.call(_uuid) === '[object Array]' && _uuid.length === 0) {-->
          <!--return-->
        <!--}-->

        <!--this.revoked_data.uuid = _uuid;-->
        <!--this.revoked_data.useruuid = this.uuid;-->
        <!--this.revoked_data.type = type;-->
        <!--this.revoked_data.tip = 'stop';-->


        <!--this.revoked_data.stop_obj = obj;-->

        <!--this.aler_window_status = true;-->
      <!--},-->
<!--//      查询订单状态字段-->
      <!--inquireOrderStatus(status){-->
        <!--let getStatusTxt = ['已撤销', '未成交', '部分成交', '已成交', '撤单中'];-->
        <!--return getStatusTxt[status + 1]-->
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
      <!--processData(res){-->
        <!--let data_list = res.data.list;-->
        <!--let orderTime, time, orderStatus, status_txt;-->

        <!--data_list.forEach(elem => {-->
          <!--orderTime = elem.orderTime;-->
          <!--orderStatus = elem.orderStatus;-->

          <!--if (orderTime) {-->

<!--//            time = new Date(orderTime).Format('yyyy/MM/dd hh:mm:ss');-->
            <!--time = window.format(orderTime, 'yyyy/MM/dd hh:mm:ss');-->
          <!--}-->

          <!--if (orderStatus !== 'undefined') {-->
            <!--status_txt = this.inquireOrderStatus(orderStatus);-->
          <!--}-->

          <!--elem._status_txt = status_txt;-->
          <!--elem._time = time;-->
        <!--});-->

        <!--this.list_r = res.data.list;-->
      <!--},-->
      <!--get_list(page){-->
        <!--if (this.tradeType === '1') {-->
          <!--this.list_p.useruuid = this.uuid;-->
          <!--this.list_p.category = this.$route.params.type + "_cny";-->
          <!--lh_http("post", "order/listprofitAndLossOrder", this.list_p, page).done((res) => {-->
            <!--if (!res.status) {-->
              <!--alert(res.data);-->
              <!--return-->
            <!--}-->
            <!--//console.log(res);-->
            <!--if (res.data.list.length === 0) {-->
              <!--this.empty = true;-->
              <!--return-->
            <!--}-->

            <!--//组建分页插件-->
            <!--this.paging_data = {-->
              <!--currentPage: res.data.currentPage,-->
              <!--pageTotal: res.data.pageTotal,-->
              <!--page: {-->
                <!--pageNo: res.data.currentPage,-->
                <!--pageSize: 5-->
              <!--}-->
            <!--};-->

<!--//            this.list_r = res.data.list;-->
            <!--//处理数据-->
            <!--this.processData(res);-->
          <!--})-->
        <!--} else {-->
          <!--if (this.tradeType === '2') {-->
            <!--this.list_p.useruuid = this.uuid;-->
            <!--this.list_p.category = this.$route.params.type + "_cny";-->
            <!--lh_http("post", "order/profitAndLossOrderHistroy", this.list_p, page).done((res) => {-->
              <!--if (!res.status) {-->
                <!--alert(res.data);-->
                <!--return;-->
              <!--}-->

              <!--//console.log(res);-->
              <!--let leng = res.data.list.length;-->

              <!--if (leng === 0) {-->
                <!--this.empty = true;-->
                <!--return;-->
              <!--}-->

              <!--//组建分页插件-->
              <!--this.paging_data = {-->
                <!--currentPage: res.data.currentPage,-->
                <!--pageTotal: res.data.pageTotal,-->
                <!--page: {-->
                  <!--pageNo: res.data.currentPage,-->
                  <!--pageSize: 5-->
                <!--}-->
              <!--};-->

              <!--//处理数据-->
              <!--this.processData(res);-->
            <!--})-->
          <!--}-->
        <!--}-->
      <!--}-->
    <!--},-->
    <!--mounted() {-->
    <!--},-->
  <!--};-->
<!--</script>-->
<!--<style lang="scss" rel="stylesheet/scss" scoped>-->
  <!--.common_table {-->
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
      <!--/*width: 960px;*/-->
      <!--height: 50px;-->
      <!--margin-top: 10px;-->
      <!--button {-->
        <!--width: 100px;-->
        <!--cursor: pointer;-->
        <!--line-height: 40px;-->
        <!--border-radius: 2px;-->
        <!--background-color: #D8D8D8;-->
        <!--color: #494949;-->
        <!--border: none;-->
        <!--float: left;-->
      <!--}-->
      <!--.page {-->
        <!--width: 170px;-->
        <!--height: 10px;-->
        <!--float: right;-->
        <!--ol {-->
          <!--width: 170px;-->
          <!--height: 20px;-->
          <!--li {-->
            <!--width: 20px;-->
            <!--height: 20px;-->
            <!--float: left;-->
            <!--line-height: 20px;-->
            <!--text-align: center;-->
            <!--margin-right: 5px;-->
          <!--}-->
          <!--li.current {-->
            <!--background: #007AFF;-->
            <!--color: #fff;-->
            <!--border-radius: 2px;-->
          <!--}-->
          <!--li:last-child {-->
            <!--margin: 0;-->
          <!--}-->
        <!--}-->
      <!--}-->
    <!--}-->
  <!--}-->
<!--</style>-->
