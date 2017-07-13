<template>
  <div class="vis_modules_gap">
    <ul class="vis_title">
      <li class="vis_line"></li>
      <li class="vis_txt">
        <div class="vis_txt_tit">资产占比总览</div>
        <div class="vis_txt_icon">
          <span>&#xe658;</span>
          <div class="hover_content_box">
            <div class="hover_content">
              统计您的各项数字资产所占的比例，所有数据更新至上一日的24：00
            </div>
          </div>
        </div>
      </li>

      <li class="vis_line"></li>
    </ul>
    <div class="vis_pie_charts">
      <div class="vis_message">
        <ul class="message_ul lay_v">
          <li @click="tagClick(0)" :class="{ active: isActive===0}">CNY</li>
          <li @click="tagClick(1)" :class="{ active: isActive===1}">换算为USD</li>
        </ul>
        <p class="rate lay_v">汇率：<span>{{frate}}</span></p>
      </div>
      <!--饼图-->
      <div class="pie_chart" ref="j_pie_chart"></div>
    </div>
  </div>
</template>
<script>

  export default{
    name: 'pie_chart',
    props: ['echarts', 'ajax'],
    data(){
      return {
        frate_ajax: lh_http('get', 'getFrate', {}),
        frate: '--',
        isActive: 0
      }
    },
    methods: {
      tagClick(index){
        let _this = this;
        this.isActive = index;

        let transform_fn = [
          function () {
            _this.ajax.done(res => {
              if (!res.status) {
                alert('获取数据失败,请重试...');
                return
              }
              _this.setOptionVal(res.data.account, null)
            });
          },
          function () {
            _this.ajax.done(res => {
              if (!res.status) {
                alert('获取数据失败,请重试...');
                return
              }
              _this.frate_ajax.done(frate => _this.setOptionVal(res.data.account, frate.data.frateCnyToUsd));
            });
          }
        ];

        transform_fn[index]();
      },

      setOptionVal(val, frate){
        let val_key = Object.getOwnPropertyNames(val),
          need_key = ['cny_cny', 'btc_cny', 'zec_cny', 'etc_cny', 'eth_cny'],
          need_name = ['CNY', 'BTC', 'ZEC', 'ETC', 'ETH'],
          legend_data = [],
          series_data = [];

        val_key.forEach((elem) => {
          if (val[elem] === 0 || need_key.indexOf(elem) === -1)return;
          legend_data.push(need_name[need_key.indexOf(elem)]);
          series_data.push({value: val[elem], name: need_name[need_key.indexOf(elem)]})
        });

        let pie_data = {};
        pie_data.legend_data = legend_data;

        if (frate === null) {
          pie_data.subtext = `￥ ${val.all_cny}`;
          pie_data.series_data = series_data;
        } else {
          pie_data.subtext = `$ ${(val.all_cny / frate).toFixed(2)}`;
          series_data.forEach(elem => elem.value = (elem.value / frate).toFixed(2));
          pie_data.series_data = series_data;
        }

        this.createCharts(pie_data);

      },
      createCharts(val){
        const PIE_CHART = this.$refs.j_pie_chart;

        let option = {
          title: {
            text: '总资产',
            subtext: val.subtext,
            x: '50%',
            y: '44%',
            textAlign: "center",
            textStyle: {
              fontWeight: 'normal',
              fontSize: 14,
              color: '#283138'
            },
            subtextStyle: {
              fontWeight: 'normal',
              fontSize: 12,
              color: '#283138'
            }
          },
          color: ['#426b9e', '#fdc332', '#47a899', '#b4dafe', '#fd524f'],
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            x: 'center',
            y: 'bottom',
            itemGap: 20,
            selectedMode: true,
            textStyle: {
              color: '#303940',
            },
            data: val.legend_data
//            data: ['CNY占比', 'BTC占比', 'ZEC占比', 'ETC占比', 'ETH占比']
          },
          toolbox: {
            show: true,
            feature: {
              magicType: {
                show: true,
                type: ['pie', 'funnel']
              },
              saveAsImage: {show: false}
            }
          },
          series: [
            {
              name: '资产占比',
              type: 'pie',
              radius: [70, 120],
              center: ['50%', '50%'],
              selectedMode: 'single',
              label: {},
              data: val.series_data
            }
          ]
        };

        this.echarts.init(PIE_CHART).setOption(option);
      }
    },
    mounted(){
      this.tagClick(0);
      this.frate_ajax.done(res => this.frate = res.data.frateCnyToUsd.toFixed(2));

//
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

  /*饼图区域*/
  .vis_pie_charts {
    position: relative;
    .vis_message {
      position: absolute;
      font-size: 10px;
      text-align: left;
      left: 50px;
      top: 80px;
    }
    .lay_v {
      display: inline-block;
      vertical-align: bottom;
    }
    .message_ul {
      li {
        width: 70px;
        font-size: 12px;
        text-align: center;
        line-height: 20px;
        border-radius: 3px;
        border: 1px solid #0093F1;
        color: #0093F1;
        cursor: pointer;
        &:not(:last-child) {
          margin-bottom: 5px;
        }
        &.active {
          background-color: #0093F1;
          color: #ffffff;
        }
      }
    }
    .rate {
      margin-left: 5px;
      color: #303940;
    }
    .pie_chart {
      width: 600px;
      height: 450px;
      margin: 0 auto;
    }
  }
</style>
