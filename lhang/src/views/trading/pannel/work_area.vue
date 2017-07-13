<template>
  <div class="work_area" id="work_area">
    <!--<div class="work">-->
      <!--<div class="title">-->
        <!--<span v-on:click="trade(1)" :class="{ 'active': trade_index == 1 }">普通委托</span>-->
        <!--&lt;!&ndash;<span v-on:click="trade(2)" :class="{ 'active': trade_index == 2 }">止盈止损委托</span>-->
        <!--<span v-on:click="trade(3)" :class="{ 'active': trade_index == 3 }">计划委托</span>&ndash;&gt;-->
      <!--</div>-->
      <!--<div v-if="trade_index == 1">-->
        <!--<ordinarytabel :tradeType=tradeType></ordinarytabel>-->
      <!--</div>-->
      <!--<div v-if="trade_index == 2">-->
        <!--<stoptabel :tradeType=tradeType></stoptabel>-->
      <!--</div>-->
      <!--<div v-if="trade_index == 3">-->
        <!--<plantabel :tradeType=tradeType></plantabel>-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>

<!--<script>-->
  <!--import ordinarytabel from './ordinary_table';-->
  <!--import plantabel from './plan_table';-->
  <!--import stoptabel from './stop_table';-->

  <!--export default {-->
    <!--name: 'work_area',-->
    <!--computed: {},-->
    <!--data() {-->
      <!--return {-->
        <!--title: '',-->
        <!--trade_index: 1,-->
      <!--}-->
    <!--},-->
    <!--props: ['tradeType'],//1 当前委托 、 2 历史委托-->
    <!--components: {-->
      <!--ordinarytabel,-->
      <!--plantabel,-->
      <!--stoptabel,-->
    <!--}, //注册组件-->
    <!--methods: { //方法都在这里-->
      <!--trade: function (index) {-->
        <!--this.trade_index = index;-->
      <!--}-->
    <!--},-->
    <!--mounted() {-->
    <!--},-->
  <!--}-->
<!--</script>-->
<!--<style lang="scss" rel="stylesheet/scss">-->
  <!--.work_area {-->
    <!--text-align: left;-->
    <!--h1 {-->
      <!--text-align: left;-->
      <!--font-size: 24px;-->
      <!--font-weight: normal;-->
      <!--background: #ECECEC;-->
      <!--padding: 15px 0 15px 60px;-->
      <!--margin-bottom: 20px;-->
    <!--}-->
    <!--.work {-->
      <!--padding: 20px;-->
      <!--.title {-->
        <!--background: #ffffff;-->
        <!--height: 44px;-->
        <!--font-size: 14px;-->
        <!--color: #494949;-->
        <!--border-bottom: 2px solid #d7d7d7;-->
        <!--margin-bottom: 30px;-->
        <!--span {-->
          <!--line-height: 42px;-->
          <!--border-bottom: 2px solid transparent;-->
          <!--display: inline-block;-->
          <!--text-align: center;-->
          <!--cursor: pointer;-->
          <!--&:not(:first-child) {-->
            <!--margin-left: 70px;-->
          <!--}-->
          <!--&.active {-->
            <!--background-color: #fff;-->
            <!--color: #0093f1;-->
            <!--font-size: 14px;-->
            <!--font-weight: 600;-->
            <!--border-color: #0093F1;-->
          <!--}-->
        <!--}-->
      <!--}-->

      <!--.market_work {-->
      <!--}-->
    <!--}-->
  <!--}-->
<!--</style>-->
