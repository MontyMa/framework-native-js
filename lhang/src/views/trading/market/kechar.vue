<template>
  <div class="k_echar">
    <div id="main" style="width: 778px;height:383px;"></div>
    <div class="work2">
      <div v-for="(i,$index) in work_list" :class="{ active1: $index == work_style}" @click="work_style = $index">
        {{i}}
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts';
  import store from '../../../vuex/store'
  import k from './kechar'
  export default {
    data() {
      return {
        type: this.$route.params.type,
        ////chart对象
        kChart: {},
        ////用于副指标的切换
        work_list: ['MACD', 'KDJ', 'RSI', 'CCI'],
        work_style: null,
        option: {},
        zoom: {
          type: 'inside',
          xAxisIndex: [0, 0],
          start: 80,
          end: 100,
          startValue: 0,
          endValue: 0
        },
        init_tag: true,
        data_tag: true,
        timer: null,
      };
    },
    props: ['name', 'tag', 'channel'],
    computed: {
      //停止订阅 一切走接口
//			sub_spot_btc_cny_kline() {
//				return this.$store.getters.sub_spot_btc_cny_kline;
//			},
//			sub_spot_btc_cny_kline_indicator() {
//				return this.$store.getters.sub_spot_btc_cny_kline_indicator;
//			}
    },
    methods: {
      get_K(type) {
        ////初始K线和深度
        lh_http('post', "kline/klineList", {
          currencyPair: this.$route.params.type + '_cny',
          type: this.tag ? this.tag : 'minute1'
        }).done((res) => {
          if (res.data.kline.length != 0) {
            k.get_k_v_init(this.name, res.data.kline);
          }
          this.get_quota(type);
        })
      },
      get_quota(type) {
        if (this.init_tag) {
          this.init_tag = false;
          return;
        }
        ////初始副指标
        var channels = this.channel.split('_');
        var channel_ = this.channel.replace(channels[2], this.$route.params.type);
        lh_http('post', "indicator/indicatorHistory", {
          channel: channel_,
          indicatorName: this.work_list[this.work_style].toLowerCase(),
          period: '',
        }).done((res) => {
          if (res.status) {
            if (type == 2 || !this.kChart.id) {
              this.kChart = echarts.init(document.getElementById('main'));
              this.option = k.get_option_init(this.name, this.work_list[this.work_style])
              this.setZoom();
              if (this.option.series[0].data) {
                this.kChart.setOption(this.option);
              }
              k.get_p_init(this.work_list[this.work_style], res.data.indicatorHistory);
            }
            switch (this.work_list[this.work_style]) {
              case 'MACD':
                this.kChart.setOption({
                  series: [{
                    name: 'MACD',
                    data: k.get_k('macd_'),
                  }, {
                    name: 'DIF',
                    data: k.get_k('dif_'),
                  }, {
                    name: 'DEA',
                    data: k.get_k('dea_'),
                  }]
                })
                break;
              case 'KDJ':
                this.kChart.setOption({
                  series: [{
                    name: 'K',
                    data: k.get_k('k_'),
                  }, {
                    name: 'D',
                    data: k.get_k('d_'),
                  }, {
                    name: 'J',
                    data: k.get_k('j_'),
                  }]
                })
                break;
              case 'RSI':
                this.kChart.setOption({
                  series: [{
                    name: 'RSI',
                    data: k.get_k('rsi_'),
                  }]
                })
                break;
              case 'CCI':
                this.kChart.setOption({
                  series: [{
                    name: 'CCI',
                    data: k.get_k('cci_'),
                  }]
                })
                break;
            }
            if (this.name == '分时') {
              this.kChart.setOption({
                series: [{
                  name: 'K线',
                  data: k.get_k('k_d_f_')
                }]
              });
            } else {
              this.kChart.setOption({
                series: [{
                  name: 'K线',
                  data: k.get_k('k_d_s_')
                }]
              });
            }
            this.kChart.setOption({
              xAxis: k.get_k('k_x_'),
              series: [{
                name: 'VOLUMN',
                data: k.get_k('volumn_'),
                itemStyle: {
                  normal: {
                    color: function (params) {
                      return k.get_k('volumn_color')[params.dataIndex];
                    },
                  }
                }
              }]
            })
          }
        })
      },
      getZoom(type) {
        if (this.kChart.getOption && type == 1) {
          let option = this.kChart.getOption();
          this.zoom.start = option.dataZoom[0].start;
          this.zoom.end = option.dataZoom[0].end;
          this.zoom.startValue = option.dataZoom[0].startValue;
          this.zoom.endValue = option.dataZoom[0].endValue;
        } else {
          this.zoom.start = 80;
          this.zoom.end = 100;
          this.zoom.startValue = null;
          this.zoom.endValue = null;
        }
      },
      setZoom() {
        for (var i = 0; i < 3; i++) {
          this.option.dataZoom[i].start = this.zoom.start;
          this.option.dataZoom[i].end = this.zoom.end;
          this.option.dataZoom[i].startValue = this.zoom.startValue;
          this.option.dataZoom[i].endValue = this.zoom.endValue;
        }
      },
      curtail(arr) {
        return arr.slice(1);
      }
    },
    mounted() {
      ////
      this.work_style = 0;
      this.init_tag = true;
      var that = this;
      this.timer = setInterval(function () {
        if (!(that.$route.path.split('/').length > 1 && (that.$route.path.split('/')[3] == 'market' || that.$route.path.split('/')[3] == 'trade'))) {
          clearInterval(that.timer);
        } else {
          that.get_K(1);
        }
      }, 5000);

    },
    watch: {
      '$route' (to, from) {
        if (to.path.split('/').length > 1 && (to.path.split('/')[3] == 'market' || to.path.split('/')[3] == 'trade')) {
          this.getZoom(2);
          this.get_K(2);
        } else {
          clearInterval(this.timer);
        }
      },
      name(val) {
        this.getZoom(2);
        this.get_K(2);
      },
      channel(val, oldval) {
        if (oldval != null) {
          store.dispatch('send', {
            channel: oldval,
            isClose: true
          });
        }
        store.dispatch('send', {
          channel: val,
        });
      },
      work_style(val, oldval) {
        this.getZoom(1);
        this.get_quota(2);
//				store.dispatch('send', {
//					channel: this.channel + '_indicator',
//					indicatorName: this.work_list[val].toLowerCase()
//				});
//				if(oldval != null) {
//					store.dispatch('send', {
//						channel: this.channel + '_indicator',
//						indicatorName: this.work_list[oldval].toLowerCase(),
//						isClose: true
//					});
//				}
      },
//			sub_spot_btc_cny_kline(val, oldval) {
//				return;
//				if(oldval) {
//					if(this.kChart.getOption) {
//						k.get_k_v_n(this.name, val)
//						if(this.name == '分时') {
//							this.kChart.setOption({
//								xAxis: k.get_k('k_x_'),
//								series: [{
//									name: 'K线',
//									data: k.get_k('k_d_f_')
//								}]
//							});
//						} else {
//							this.kChart.setOption({
//								xAxis: k.get_k('k_x_'),
//								series: [{
//									name: 'K线',
//									data: k.get_k('k_d_s_')
//								}]
//							});
//						}
//						this.kChart.setOption({
//							series: [{
//								name: 'VOLUMN',
//								data: k.get_k('volumn_'),
//								itemStyle: {
//									normal: {
//										color: function(params) {
//											return k.get_k('volumn_color')[params.dataIndex];
//										},
//									}
//								}
//							}]
//						})
//					}
//				}
//			},
//			sub_spot_btc_cny_kline_indicator(val) {
//				return;
//
//				switch(this.work_list[this.work_style]) {
//					case 'MACD':
//						k.get_p_n(this.name, 'macd_', val.data)
//
//						this.kChart.setOption({
//							series: [{
//								name: 'MACD',
//								data: k.get_k('macd_'),
//							},{
//								name: 'DIF',
//								data: k.get_k('dif_'),
//							},{
//								name: 'DEA',
//								data: k.get_k('dea_'),
//							}]
//						})
//						break;
//				}
//
//			},
//			sub_spot_zec_cny_kline(val) {
//			},
    }
  };
</script>

<style lang="scss">
  .k_echar {
    .work2 {
      text-align: left;
      position: absolute;
      left: 59px;
      font-size: 12px;
      width: 90.8%;
      top: 50%;
      transform: translateY(70px);
      line-height: 20px;
      border: 1px solid black;
      div {
        border-right: 1px solid black;
        width: 60px;
        float: left;
        /*height: 28px;*/
        text-align: center;
        background-color: #fff;
        color: #8a8a8a;
        cursor: pointer;
      }
      .active1 {
        background-color: #8a8a8a;
        color: #fff;
      }
    }
  }
</style>
