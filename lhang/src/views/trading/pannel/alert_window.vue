<template>
  <div class="alert_window">
    <!--<div class="alert_box">-->
    <!--<div class="title">撤单</div>-->
    <!--<div class="cont">-->
    <!--<div class="cont_txt">撤单之后不可恢复，确认撤单?</div>-->
    <!--<ul class="btn_box">-->
    <!--<li class="submit" @click="runRequst">确认</li>-->
    <!--<li class="cancel" @click="cancel">取消</li>-->
    <!--</ul>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="v_center"></div>-->
  </div>
</template>
<!--<script>-->
<!--import store from '../../../vuex/store';-->
<!--export default{-->
<!--name: 'alert_window',-->
<!--data(){-->
<!--return {-->
<!--window_status: ''-->
<!--}-->
<!--},-->
<!--props: ['alert_data'],-->
<!--methods: {-->
<!--runRequst(){-->
<!--//console.log(this.alert_data);-->

<!--let send_msg = {-->
<!--category: this.alert_data.category,-->
<!--useruuid: this.alert_data.useruuid,-->
<!--};-->

<!--//说明是普通委托的批量委托-->
<!--if (this.alert_data.tip === 'ordinary' && Object.prototype.toString.call(this.alert_data.uuid) === '[object Array]') {-->
<!--send_msg.uuids = this.alert_data.uuid.join(',');-->
<!--}-->

<!--if (this.alert_data.triggerPrice) {-->
<!--send_msg.triggerPrice = this.alert_data.triggerPrice;-->
<!--}-->

<!--if (typeof this.alert_data.uuid === 'string') {-->
<!--send_msg.uuid = this.alert_data.uuid;-->
<!--} else if (!this.alert_data.tip) {-->
<!--let uuids = [], triggerPrice = [];-->

<!--this.alert_data.uuid.forEach(elem => {-->
<!--uuids.push(elem.uuid);-->
<!--triggerPrice.push(elem.triggerPrice)-->
<!--});-->
<!--send_msg.uuids = uuids.join(',');-->
<!--send_msg.triggerPrice = triggerPrice.join(',');-->
<!--}-->

<!--//        如果为真说明是止盈止损-->
<!--if (this.alert_data.tip === 'stop') {-->
<!--if (this.alert_data.stop_obj) {   //说明是单个撤销-->
<!--let stop_obj = this.alert_data.stop_obj;-->
<!--send_msg.stopLessTriggerPrice = stop_obj.stopLessTriggerPrice;-->
<!--send_msg.stopSuccessTriggerPrice = stop_obj.stopSuccessTriggerPrice;-->
<!--} else {-->
<!--let uuids = [], stopLessTriggerPrice = [], stopSuccessTriggerPrice = [];-->
<!--this.alert_data.uuid.forEach(elem => {-->
<!--uuids.push(elem.uuid);-->
<!--stopLessTriggerPrice.push(elem.stopLessTriggerPrice);-->
<!--stopSuccessTriggerPrice.push(elem.stopSuccessTriggerPrice)-->
<!--});-->

<!--send_msg.uuids = uuids.join(',');-->
<!--send_msg.stopLessTriggerPrice = stopLessTriggerPrice.join(',');-->
<!--send_msg.stopSuccessTriggerPrice = stopSuccessTriggerPrice.join(',');-->
<!--}-->
<!--}-->

<!--let type = this.alert_data.type;-->
<!--//console.log(type);-->
<!--let request_url = [-->
<!--'order/revokeorder',   //普通委托-->
<!--'order/revokeplanorder',    //计划委托-->
<!--'order/revokeprofitorder',    //止盈止损委托-->
<!--'order/batchrevoke',    //普通批量撤单-->
<!--'order/batchRevokePlanOrder',    //计划委托批量撤单-->
<!--'order/batchRevokeProfitAndLossOrder',    //止盈止损批量撤单-->
<!--];-->

<!--let url;-->
<!--if (request_url[type]) url = request_url[type];-->

<!--lh_http('post', url, send_msg).done(res => {-->
<!--if (!res.status) {-->
<!--alert(res.data);-->
<!--return-->
<!--}-->
<!--store.dispatch('trade_status', this.$route.params.type);-->
<!--this.window_status = false;-->
<!--this.alert_data.parent_getJson();-->
<!--})-->
<!--},-->
<!--cancel(){-->
<!--this.window_status = false;-->
<!--}-->
<!--},-->
<!--watch: {-->
<!--window_status(val){-->
<!--this.$emit('window_status', val);-->
<!--}-->
<!--}-->
<!--}-->
<!--</script>-->
<!--<style lang="scss" rel="stylesheet/scss" scoped>-->
<!--.alert_window {-->
<!--position: fixed;-->
<!--left: 0;-->
<!--top: 0;-->
<!--width: 100%;-->
<!--height: 100%;-->
<!--background-color: rgba(0, 0, 0, .5);-->
<!--text-align: center;-->
<!--z-index: 10;-->
<!--font-size: 0;-->
<!--.alert_box {-->
<!--width: 360px;-->
<!--height: 192px;-->
<!--border-radius: 10px;-->
<!--font-size: 16px;-->
<!--overflow: hidden;-->
<!--text-align: left;-->
<!--background-color: #ffffff;-->
<!--.title {-->
<!--line-height: 46px;-->
<!--padding-left: 28px;-->
<!--color: #0093F1;-->
<!--background-color: #ffffff;-->
<!--font-size: 18px;-->
<!--border-bottom: 1px solid #D7D7D7;-->
<!--margin-bottom: 0;-->
<!--}-->
<!--.cont {-->
<!--padding: 28px;-->
<!-- -webkit-box-sizing: border-box;-->
<!-- -moz-box-sizing: border-box;-->
<!--box-sizing: border-box;-->
<!--position: relative;-->
<!--/*height: 100%;*/-->
<!--}-->
<!--.cont_txt {-->
<!--color: #494949;-->
<!--font-size: 16px;-->
<!--}-->
<!--.btn_box {-->
<!--font-size: 0;-->
<!--position: absolute;-->
<!--bottom: -45px;-->
<!--right: 28px;-->
<!--li {-->
<!--text-align: center;-->
<!--font-size: 14px;-->
<!--display: inline-block;-->
<!--vertical-align: middle;-->
<!--line-height: 32px;-->
<!--user-select: none;-->
<!--width: 70px;-->
<!--border-radius: 2px;-->
<!--cursor: pointer;-->
<!-- -webkit-box-sizing: border-box;-->
<!-- -moz-box-sizing: border-box;-->
<!--box-sizing: border-box;-->
<!--}-->
<!--.submit {-->
<!--background-color: #0093F1;-->
<!--color: #ffffff;-->
<!--}-->
<!--.cancel {-->
<!--border: 1px solid #999999;-->
<!--color: #666666;-->
<!--margin-left: 14px;-->
<!--}-->
<!--}-->
<!--}-->
<!--.v_center {-->
<!--height: 100%;-->
<!--}-->
<!--.v_center, .alert_box {-->
<!--display: inline-block;-->
<!--vertical-align: middle;-->
<!--}-->
<!--}-->
<!--</style>-->
