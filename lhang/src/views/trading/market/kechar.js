//// X
let k_x_ = []
//let k_x_ = []
//// VOLUMN
let volumn_ = []
let volumn_color = []
//// MACD
let macd_ = []
let dif_ = []
let dea_ = []
let macd_color_ = []
//// KDJ
let k_ = []
let d_ = []
let j_ = []
//// RSI
let rsi_ = []
//// CCI
let cci_ = []
//// K线
let k_s_ = []
let k_d_f_ = []
let k_d_s_ = []
let k_d_bak_ = []
////
let option = {}
let quota_s_ = [];

const k = {
  get_option_init: function (name, type) {
    ////
    if (name == '分时') {
      k_s_ = {
        name: 'K线',
        type: 'line',
        data: [],
        axisLabel: {
          show: false
        }
      }
    } else {
      k_s_ = {
        name: 'K线',
        type: 'candlestick',
        data: [],
        itemStyle: {
          normal: {
            color: 'white',
            color0: '#14b143',
            borderColor: '#ef232a',
            borderColor0: '#14b143'
          }
        },
      }
    }
    ////
    this.option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line'
        },
        formatter: function (a) {
          var name = '';
          for (var i of a) {
            if (i.seriesName != 'DIF' && i.seriesName != 'DEA') {
              name = i.seriesName
            }
          }
          switch (name) {
            case 'K线':
              if (a[0].data.length) {
                var val = k_d_s_[a[0].dataIndex]
                return '时间：' + val.time + '<br/>' + '开盘价：' + val.opening_price + '<br/>' + '最高价：' + val.max_price + '<br/>' + '最低价：' + val.min_price + '<br/>' + '收盘价：' + val.closing_price + '<br/>' + '交易量：' + val.volume_quantity;
              } else {
                var val = k_d_f_[a[0].dataIndex]
                return '时间：' + val.time + '<br/>' + '开盘价：' + val.opening_price + '<br/>' + '最高价：' + val.max_price + '<br/>' + '最低价：' + val.min_price + '<br/>' + '收盘价：' + val.closing_price + '<br/>' + '交易量：' + val.volume_quantity;
              }
              break;
            case 'VOLUMN':
              return '时间：' + a[0].name + '<br/>' + '交易量：' + a[0].value;
              break;
            case 'MACD':
              var index = a[0].dataIndex;
              return '时间：' + a[0].name + '<br/>' + 'DIF：' + dif_[index] + '<br/>' + 'DEA：' + dea_[index] + '<br/>' + 'MACD_BAR：' + macd_[index];
              break;
            case 'J':
            	 var index = a[0].dataIndex;
              return '时间：' + a[0].name + '<br/>' + 'K：' + k_[index] + '<br/>' + 'D：' + d_[index] + '<br/>' + 'J：' + j_[index];
              break;
            case 'RSI':
            	 var index = a[0].dataIndex;
              return '时间：' + a[0].name + '<br/>' + 'RSI：' + rsi_[index];
              break;
            case 'CCI':
              var index = a[0].dataIndex;
              return '时间：' + a[0].name + '<br/>' + 'CCI：' + cci_[index];
              break;
          }

        }
      },
      axisPointer: {
        link: {
          xAxisIndex: [0, 1, 2],
          mapper: function (a, b, c) {
            alert(1)
          }
        },
        label: {
          backgroundColor: 'red'
        }
      },
      grid: [{
        // left: '6%',
        // right: '0%',
        // top:'30px',
        // height: '43%',
        // width: '98%',
        left: '5.5%',
        top:'4%',
        width: '95%',
        height: '40%',
        // height: '50%',
      }, {
        left: '5.5%',
        top: '51%',
        height: '12%',
        width: '95%'
      }, {
        left: '5.5%',
        right: '0%',
        top: '73%',
        height: '15%',
        width: '95%'
      }],
      xAxis: [{
        type: 'category',
        data: [],
        scale: true,
        //	boundaryGap: false,
        axisLine: {
          onZero: true
        },
        splitLine: {
          show: false
        },
        //	splitNumber: 20,
        //	min: 'dataMin',
        //	max: 'dataMax'
        axisPointer: {
          z: 100
        }
      }, {
        type: 'category',
        //	boundaryGap: false,
        gridIndex: 1,
        data: [],
        axisLabel: {
          show: false
        },
        axisPointer: {
          label: {
            formatter: function (params) {
              return 'sdsd'
            }
          }
        }
      }, {
        type: 'category',
        gridIndex: 2,
        data: [],
        axisLabel: {
          show: false
        }
      }],
      yAxis: [{
        type: 'value',
        scale: true,
        //				min: 'dataMin',
        //				max: 'dataMax',
      }, {
        gridIndex: 1,
        splitNumber: 1,
        axisLine: {
          onZero: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          show: true
        }
      }, {
        gridIndex: 2,
        type: 'value',
        splitNumber: 2,
      }],
      dataZoom: [{
        throttle: 10,
        type: 'inside',
        xAxisIndex: [0, 0],
        start: 80,
        end: 100
      }, {
        throttle: 10,
        //				show: true,
        type: 'slider',
        xAxisIndex: [0, 1],
        //				top: '97%',
        start: 80,
        end: 100
      }, {
        throttle: 10,
        //				show: false,
        type: 'slider',
        xAxisIndex: [0, 2],
        start: 80,
        end: 100
      }],
      series: [k_s_, {
        name: 'VOLUMN',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        data: [],
        axisLabel: {
          show: false
        }
      }]
    }

    ////
    switch (type) {
      case 'MACD':
        this.option.series.push({
          name: 'MACD',
          type: 'bar',
          xAxisIndex: 2,
          yAxisIndex: 2,
          data: [],
          itemStyle: {
            normal: {
              color: function (params) {
                var colorList;
                if (params.data >= 0) {
                  colorList = '#ef232a';
                } else {
                  colorList = '#14b143';
                }
                return colorList;
              },
            },
          }
        })
        this.option.series.push({
          name: 'DIF',
          type: 'line',
          xAxisIndex: 2,
          yAxisIndex: 2,
          //					showSymbol: false,
          hoverAnimation: false,
          data: [],
          itemStyle: {
            normal: {
              //							color: 'blue'
            }
          },
          lineStyle: {
            normal: {
              width: 1,
              type: 'solid',
              shadowOffsetX: 0,
              shadowOffsetY: 0,
            },
          },
        })
        this.option.series.push({
          name: 'DEA',
          type: 'line',
          xAxisIndex: 2,
          yAxisIndex: 2,
          //					showSymbol: false,
          hoverAnimation: false,
          data: [],
          itemStyle: {
            normal: {
              //							color: 'blue'
            }
          },
          lineStyle: {
            normal: {
              width: 1,
              type: 'solid',
              shadowOffsetX: 0,
              shadowOffsetY: 0,
            },
          },
        })
        break;
      case 'KDJ':
        this.option.series.push({
          name: 'K',
          type: 'line',
          xAxisIndex: 2,
          yAxisIndex: 2,
          //					showSymbol: false,
          hoverAnimation: false,
          data: [],
          itemStyle: {
            normal: {
              color: '#14B143'
            }
          },
          lineStyle: {
            normal: {
              width: 1,
              type: 'solid',
              shadowOffsetX: 0,
              shadowOffsetY: 0,
            },
          },
        })
        this.option.series.push({
          name: 'D',
          type: 'line',
          xAxisIndex: 2,
          yAxisIndex: 2,
          //					showSymbol: false,
          hoverAnimation: false,
          data: [],
          itemStyle: {
            normal: {
              color: '#F1E720'
            }
          },
          lineStyle: {
            normal: {
              width: 1,
              type: 'solid',
              shadowOffsetX: 0,
              shadowOffsetY: 0,
            },
          },
        })
        this.option.series.push({
          name: 'J',
          type: 'line',
          xAxisIndex: 2,
          yAxisIndex: 2,
          //					showSymbol: false,
          hoverAnimation: false,
          data: [],
          itemStyle: {
            normal: {
              color: '#EE18F5'
            }
          },
          lineStyle: {
            normal: {
              width: 1,
              type: 'solid',
              shadowOffsetX: 0,
              shadowOffsetY: 0,
            },
          },
        })
        break;
      case 'RSI':
        this.option.series.push({
          name: 'RSI',
          type: 'line',
          xAxisIndex: 2,
          yAxisIndex: 2,
          //					showSymbol: false,
          hoverAnimation: false,
          data: [],
          itemStyle: {
            normal: {
              color: 'red'
            }
          },
          lineStyle: {
            normal: {
              width: 1,
              type: 'solid',
              shadowOffsetX: 0,
              shadowOffsetY: 0,
            },
          },
        })
        break;
      case 'CCI':
        this.option.series.push({
          name: 'CCI',
          type: 'line',
          xAxisIndex: 2,
          yAxisIndex: 2,
          //					showSymbol: false,
          hoverAnimation: false,
          data: [],
          itemStyle: {
            normal: {
              color: 'red'
            }
          },
          lineStyle: {
            normal: {
              width: 1,
              type: 'solid',
              shadowOffsetX: 0,
              shadowOffsetY: 0,
            },
          },
        })
        break;
    }
    return this.option;
  },
  // k线和volumn的初始
  get_k_v_init: function (name, val) {
    k_d_f_ = [];
    k_d_s_ = [];
    k_x_ = [];
    volumn_ = [];
    volumn_color = [];
    for (var i of val) {
      let fmt = '';
      switch (name) {
        case '分时':
          fmt = 'hh:mm'
          break;
        case '1分':
          fmt = 'hh:mm'
          break;
        case '5分':
          fmt = 'MM-dd hh:mm'
          break;
        case '15分':
          fmt = 'MM-dd hh:mm'
          break;
        case '30分':
          fmt = 'MM-dd hh:mm'
          break;
        case '60分':
          fmt = 'MM-dd hh:mm'
          break;
        case '日线':
          fmt = 'MM-dd'
          break;
        case '周线':
          fmt = 'MM-dd'
          break;
        case '月线':
          fmt = 'yyyy-MM'
          break;
      }
      // var time1 = new Date(i.time_stamp).Format(fmt);
      var time1 = window.format(i.time_stamp, fmt);
      if (name == '分时') {
        k_d_f_.push({
          key: i.time_stamp,
          time: time1,
          opening_price: i.opening_price,
          closing_price: i.closing_price,
          min_price: i.min_price,
          max_price: i.max_price,
          volume_quantity: i.volume_quantity
        });
      } else {
        k_d_s_.push({
          key: i.time_stamp,
          time: time1,
          opening_price: i.opening_price,
          closing_price: i.closing_price,
          min_price: i.min_price,
          max_price: i.max_price,
          volume_quantity: i.volume_quantity,
        });
      }
      k_x_.push(time1)
      volumn_.push(i.volume_quantity)
      if ((i.opening_price >= i.closing_price) && (i.volume_quantity != 0)) {
        volumn_color.push('#14b143')
      } else {
        volumn_color.push('#ef232a')
      }
    }
  },
  // k线和volumn的实时
  get_k_v_n: function (type, val) {
    function curtail(ar) {
      var i = 0;
      var newArray = [];
      for (i = 0; i < ar.length; i++) {
        if (i !== 0) {
          newArray.push(ar[i]);
        }
      }
      return newArray;
    }

    let fmt = '';
    switch (type) {
      case '分时':
        fmt = 'hh:mm'
        break;
      case '1分':
        fmt = 'hh:mm'
        break;
      case '5分':
        fmt = 'MM-dd hh:mm'
        break;
      case '15分':
        fmt = 'MM-dd hh:mm'
        break;
      case '30分':
        fmt = 'MM-dd hh:mm'
        break;
      case '60分':
        fmt = 'MM-dd hh:mm'
        break;
      case '日线':
        fmt = 'MM-dd'
        break;
      case '周线':
        fmt = 'MM-dd'
        break;
      case '月线':
        fmt = 'yyyy-MM'
        break;
    }
    // var time1 = new Date(val[0]).Format(fmt);
    var time1 = window.format(val[0], fmt);

    var tag = $.inArray(time1, k_x_);
    if (tag >= 0) {
      if (type == '分时') {
        k_d_f_.pop()
        k_d_f_.push({
          key: val[0],
          time: time1,
          closing_price: val[4]
        });
      } else {
        k_d_s_.pop()
        k_d_s_.push({
          key: val[0],
          time: time1,
          opening_price: val[1],
          closing_price: val[4],
          min_price: val[3],
          max_price: val[2],
          volume_quantity: val[5],
        });
      }
      k_x_.pop()
      k_x_.push(time1)

      volumn_.pop()
      volumn_.push(val[5])

      volumn_color.pop()
      if ((val[1] >= val[4]) && (val[5] != 0)) {
        volumn_color.push('#14b143')
      } else {
        volumn_color.push('#ef232a')
      }

    } else {
      if (type == '分时') {
        k_d_f_ = curtail(k_d_f_)
        k_d_f_.push({
          key: val[0],
          time: time1,
          closing_price: val[4]
        });
      } else {
        k_d_s_ = curtail(k_d_s_)
        k_d_s_.push({
          key: val[0],
          time: time1,
          opening_price: val[1],
          closing_price: val[4],
          min_price: val[3],
          max_price: val[2],
          volume_quantity: val[5],
        });
      }
      k_x_ = curtail(k_x_)
      k_x_.push(time1)
      volumn_ = curtail(volumn_)
      volumn_.push(val[5])
      volumn_color.splice(0, 1);
      if ((val[1] >= val[4]) && (val[5] != 0)) {
        volumn_color.push('#14b143')
      } else {
        volumn_color.push('#ef232a')
      }
    }
  },
  get_p_init: function (type, val) {
    macd_ = [];
    dif_ = [];
    dea_ = [];
    k_ = [];
    d_ = [];
    j_ = [];
    rsi_ = [];
    cci_ = [];
    switch (type) {
      case 'MACD':
        for (var i of val.macd.resultMap.MACD_BAR) {
          macd_.push(i[1])
        }
        for (var i of val.macd.resultMap.DIF) {
          dif_.push(i[1])
        }
        for (var i of val.macd.resultMap.DEA) {
          dea_.push(i[1])
        }
        break;
      case 'KDJ':
        for (var i of val.kdj.resultMap.k) {
          k_.push(i[1])
        }
        for (var i of val.kdj.resultMap.d) {
          d_.push(i[1])
        }
        for (var i of val.kdj.resultMap.j) {
          j_.push(i[1])
        }
        break;
      case 'RSI':
        for (var i of val.rsi.resultMap.rsi) {
          rsi_.push(i[1])
        }
        break;
      case 'CCI':
        for (var i of val.cci.resultMap.cci) {
          cci_.push(i[1])
        }
        break;
    }
  },
  get_p_n: function (name, type, val) {
    function curtail(ar) {
      var i = 0;
      var newArray = [];
      for (i = 0; i < ar.length; i++) {
        if (i !== 0) {
          newArray.push(ar[i]);
        }
      }
      return newArray;
    }

    let fmt = '';
    switch (name) {
      case '分时':
        fmt = 'hh:mm'
        break;
      case '1分':
        fmt = 'hh:mm'
        break;
      case '5分':
        fmt = 'MM-dd hh:mm'
        break;
      case '15分':
        fmt = 'MM-dd hh:mm'
        break;
      case '30分':
        fmt = 'MM-dd hh:mm'
        break;
      case '60分':
        fmt = 'MM-dd hh:mm'
        break;
      case '日线':
        fmt = 'MM-dd'
        break;
      case '周线':
        fmt = 'MM-dd'
        break;
      case '月线':
        fmt = 'yyyy-MM'
        break;
    }
    switch (type) {
      case 'macd_':
        // var time1 = new Date(val.macd.resultMap.MACD_BAR[0][0]).Format(fmt);
        var time1 = window.format(val.macd.resultMap.MACD_BAR[0][0], fmt);

        var tag = $.inArray(time1, k_x_);
        if (tag >= 0) {
          macd_.pop()
          macd_.push(val.macd.resultMap.MACD_BAR[0][1])
          dif_.pop()
          dif_.push(val.macd.resultMap.DIF[0][1])
          dea_.pop()
          dea_.push(val.macd.resultMap.DEA[0][1])
        } else {
          curtail(macd_)
          macd_.push(val.macd.resultMap.MACD_BAR[0][1])
          curtail(dif_)
          dif_.push(val.macd.resultMap.DIF[0][1])
          curtail(dea_)
          dea_.push(val.macd.resultMap.DEA[0][1])
        }
        break;
    }
  },
  get_k: function (type) {
    if (!type) {
      return [];
    }
    let newarr = new Array();
    newarr = eval(type).concat();
    let rarr = new Array();
    switch (type) {
      case 'k_x_':
        for (var i = 0; i < 3; i++) {
          var times = [];
          for (var j of newarr) {
            times.push(j)
          }
          rarr.push({
            data: times
          })
        }
        break;
      case 'k_d_f_':
        for (var i of newarr) {
          rarr.push(i.closing_price)
        }
        break;
      case 'k_d_s_':
        for (var i of newarr) {
          rarr.push(
            [
              i.opening_price,
              i.closing_price,
              i.min_price,
              i.max_price,
              i.volume_quantity
            ]
          )
        }
        break;
      case 'volumn_':
        for (var i of newarr) {
          rarr.push(i)
        }
        break;
      case 'volumn_color':
        for (var i of newarr) {
          rarr.push(i)
        }
        break;
      case 'macd_':
        for (var i of newarr) {
          rarr.push(i)
        }
        break
      case 'dif_':
        for (var i of newarr) {
          rarr.push(i)
        }
        break
      case 'dea_':
        for (var i of newarr) {
          rarr.push(i)
        }
        break
      case 'k_':
        for (var i of newarr) {
          rarr.push(i)
        }
        break
      case 'd_':
        for (var i of newarr) {
          rarr.push(i)
        }
        break
      case 'j_':
        for (var i of newarr) {
          rarr.push(i)
        }
        break
      case 'rsi_':
        for (var i of newarr) {
          rarr.push(i)
        }
        break
      case 'cci_':
        for (var i of newarr) {
          rarr.push(i)
        }
        break
    }
    return rarr
  }
}

export default k;
