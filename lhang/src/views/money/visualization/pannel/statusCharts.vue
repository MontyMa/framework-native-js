<template>
  <div class="vis_modules_gap">
    <ul class="vis_title">
      <li class="vis_line"></li>
      <li class="vis_txt">
        <div class="vis_txt_tit">盈亏状况</div>
        <div class="vis_txt_icon">
          <span>&#xe658;</span>
          <div class="hover_content_box">
            <div class="hover_content">
              统计您的每日净资产对前一日净资产的增长比例，所有数据更新至上一日的24：00
            </div>
          </div>
        </div>

      </li>
      <li class="vis_line"></li>
    </ul>

    <div class="vis_status_charts">
      <!--状况图-->
      <div class="status_charts" ref="j_status_charts"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'status-charts',
    props: ['echarts', 'ajax'],
//    watch: {
//      status_data(res) {
//        this.status_data = res;
//        this.setOptionVal(this.status_data);
//      }
//    },
    methods: {
      setOptionVal(val) {
        let date = [], assets = [];

        val.forEach((elem) => {
          date.push(elem['date']);
          assets.push(elem['balance'])
        });

        this.createCharts(date, assets);
      },
      createCharts(x_data, y_data){
        const STATUS_CHARTS = this.$refs.j_status_charts;

        let option_status = {
          tooltip: {
            trigger: 'axis',
            formatter: function (params) {
              let res = '<div><p>' + params[0].name + '</p></div>';
              for (let i = 0; i < params.length; i++) {
                res += `<p>
<div style="display:inline-block;margin-right: 5px;vertical-align:middle;width: 10px;height: 10px;border-radius: 50%;background-color:${params[i].color}"></div>
<div style="display:inline-block;vertical-align:middle">${params[i].seriesName}:${params[i].data}%</div></p>`
              }
              return res;
            },
            position: function (pt) {
              return [pt[0], '10%'];
            }
          },
          legend: {
            top: 'bottom',
            data: ['意向']
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: x_data
          },
          yAxis: {
            type: 'value',
            boundaryGap: [0, 0.2],
            axisLabel: {
              show: true,
              interval: 'auto',
              formatter: '{value} %'
            }
          },
          visualMap: {
            bottom: 10,
            y: 'bottom',
            x: 'center',
            orient: 'horizontal',
            showLabel: true,
            splitNumber: 2,
            pieces: [
              {
                gte: 0,
                label: '盈',
                color: '#FA5E5B'
              },
              {
                lte: -0.0000001,
                label: '亏',
                color: '#5AB1A3'
              }]
          },
          series: [{
            name: '盈亏状况',
            type: 'line',
            smooth: true,
            symbol: 'emptyCircle',
            sampling: 'average',
            itemStyle: {
              normal: {
                //                color: 'rgb(255, 70, 131)'
              }
            },
            data: y_data
          }]
        };

        this.echarts.init(STATUS_CHARTS).setOption(option_status);
      }
    },
    mounted(){
      this.ajax.done(res => this.setOptionVal(res.data.balanceDetail.detail))
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
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

  /*状况图*/
  .vis_status_charts {
    .status_charts {
      width: 100%;
      height: 439px;
    }
  }
</style>
