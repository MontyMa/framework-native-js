<template>
  <div class="vis_modules_gap">
    <ul class="vis_title">
      <li class="vis_line"></li>
      <li class="vis_txt">
        <div class="vis_txt_tit">净资产走势</div>
        <div class="vis_txt_icon">
          <span>&#xe658;</span>
          <div class="hover_content_box">
            <div class="hover_content">
              统计您的每日净资产数值变化情况，所有数据更新至上一日的24：00
            </div>
          </div>
        </div>
      </li>
      <li class="vis_line"></li>
    </ul>

    <div class="vis_line_charts">
      <div class="line_charts" ref="j_line_charts"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'line-charts',
    props: ['echarts', 'ajax'],
    methods: {
      setOptionVal(val) {
        let date = [],
          assets = [];

        val.forEach((elem) => {
          date.push(elem['date']);
          assets.push(elem['amt'])
        });

        this.createdCharts(date, assets);
      },
      createdCharts(x_data, y_data) {
        let normal_color = new this.echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: 'rgb(243, 48, 46)'
        }, {
          offset: 1,
          color: 'rgb(243, 48, 46)'
        }]);
        let option = {
          legend: { //图例
            x: 'center',
            y: 'bottom',
            data: ['净资产值'],
            textStyle: {
              color: '#303940',
              fontSize: '14px',
            },
          },

          tooltip: { // 线条hover,提示框
            trigger: 'axis',
            position: function (pt) {
              return [pt[0], '10%'];
            }
          },

          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: x_data
          },

          yAxis: {
            type: 'value',
            boundaryGap: [0, 0.05]
          },
          series: [{
            name: '净资产值',
            type: 'line',
            smooth: true,
            symbol: 'emptyCircle',
            itemStyle: {
              normal: {
                color: 'rgb(43,70,101)',
              }
            },
            lineStyle: {
              normal: {
                width: 1,
              }
            },
            areaStyle: {
              normal: {
                color: normal_color
              }
            },
            data: y_data
          }]
        };

        const INE_CHARTS = this.$refs.j_line_charts;
        this.echarts.init(INE_CHARTS).setOption(option);
      }
    },
    mounted() {
      this.ajax.done(res => this.setOptionVal(res.data.asset.realAsset));
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  /*走势图*/
  .vis_modules_gap {
    .vis_txt_tit {
      vertical-align: top;
      display: inline-block;
      line-height: 25px;
    }

    .hover_content_box {
      position: absolute;
      display: none;
      text-align: justify;
      bottom: 25px;
      width: 240px;
      left: 50%;
      -webkit-transform: translateX(-120px);
      -moz-transform: translateX(-120px);
      -ms-transform: translateX(-120px);
      -o-transform: translateX(-120px);
      transform: translateX(-120px);
      font-size: 12px;
      .hover_content {
        padding: 8px;
        border-radius: 2px;
        color: #666;
        border: 0.5px solid #999;
        background-color: #fefedc;
        position: relative;
        &:after {
          content: '';
          display: block;
          width: 10px;
          height: 10px;
          position: absolute;
          bottom: -5px;
          background-color: #fefedc;
          border-right: 1px solid #999;
          border-bottom: 1px solid #999;
          left: 50%;
          margin-left: -5px;
          -webkit-transform: rotate(45deg);
          -moz-transform: rotate(45deg);
          -ms-transform: rotate(45deg);
          -o-transform: rotate(45deg);
          transform: rotate(45deg);
        }
      }
    }
    .vis_txt_icon {
      font-size: 16px;
      display: inline-block;
      vertical-align: top;
      cursor: pointer;
      position: relative;
      &:hover {
        .hover_content_box {
          display: block;
        }
      }
    }
  }

  .vis_line_charts {

    .line_charts {
      width: 100%;
      height: 512px;
    }
  }
</style>
