<template>
  <div class="visualization" id="policy">
    <!--饼图-->
    <pie-charts :echarts="echarts" :ajax="ajax"></pie-charts>
    <!--<pie-charts :echarts="echarts" v-model="charts_data.pie_data"></pie-charts>-->
    <!--走势图-->
    <line-charts :echarts="echarts" :ajax="ajax"></line-charts>
    <!--状态图-->
    <status-charts :echarts="echarts" :ajax="ajax"></status-charts>
    <!--头衔-->
    <range-mod></range-mod>
  </div>
</template>

<script>
  import echarts from 'echarts';
  import pieCharts from './pannel/pieCharts.vue'; //  饼图
  import lineCharts from './pannel/lineCharts.vue'; //  走势图
  import statusCharts from './pannel/statusCharts.vue'; //  状态图
  import rangeMod from './pannel/range.vue'; //  头衔
  export default {
    name: 'visualization',
    computed: {},
    data() {
      return {
        echarts: echarts, //echarts分发
        ajax: lh_http('get', 'customerInfo/getBalanceBrief', {}),
      }
    },
    components: {
      pieCharts, //饼图
      lineCharts, //走势图
      statusCharts, //状态图
      rangeMod //头衔
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
  .visualization {
    font-size: 0;
    text-align: center;
    .vis_modules_gap {
      margin-top: 40px;
      .vis_title {
        font-size: 26px;
        li {
          display: inline-block;
          vertical-align: middle;
        }
        .vis_line {
          width: 180px;
          height: 1px;
          background-color: #40484E;
        }
        .vis_txt {
          color: #0093F1;
          margin: 0 70px;
        }
      }
    }
  }
</style>
