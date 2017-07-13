<template>
  <div class="trade_table"
       id="trade_table">
    <div class="list_header">
      <div class="layout">
        <label class="for_input">
          <input type="checkbox" class="g_i_check input_select"><span></span>
          <span class="g_lable">全选</span>
        </label>
      </div>
      <div class="trade_del layout"><span>del图标</span></div>
    </div>

    <!--列表-->
    <div class="list_cont">
      <ul class="mes_group">
        <li class="list_select">
          <label class="for_input">
            <input type="checkbox" class="g_i_check input_select"><span></span>
            <span class="g_lable">系统</span></label>
        </li>
        <li class="mes_content">
          <div class="time">2016/02/05 16:24</div>
          <div class="paragraph">
            <div class="par_title">尊敬的用户：</div>
            <p>
              刚刚过去的2015年，数字货币行业经历了最为跌宕起伏的一年。刚刚过去的2015年，数字货币行业经历了最为跌宕起伏的一年。刚刚过去的2015年，数字货币行业经历了最为跌宕起伏的一年。刚刚过去的2015年，数字货币行业经历了最为跌宕起伏的一年。刚刚过去的2015年，数字货币行业经历了最为跌宕起伏的一年。刚刚过去的2015年，数字货币行业经历了最为跌宕起伏的一年。刚刚过去的2015年，数字货币行业经历了最为跌宕起伏的一年。刚刚过去的2015年，数字货币行业经历了最为跌宕起伏的一年。刚刚过去的2015年，数字货币行业经历了最为跌宕起伏的一年。刚刚过去的2015年，数字货币行业经历了最为跌宕起伏的一年。刚刚过去的2015年，数字货币行业经历了最为跌宕起伏的一年。刚刚过去的2015年，数字货币行业经历了最为跌宕起伏的一年。刚刚过去的2015年，数字货币行业经历了最为跌宕起伏的一年。
            </p>
          </div>
        </li>
        <li class="del_box"><span>del图标</span></li>
      </ul>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'trade_table',
    computed: {},
    data() {
      return {
        title: '',
      }
    }, //定义变量
    components: {}, //注册组件
    methods: {},
    mounted() {

    },
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
  .trade_table {
    margin-top: 30px;
    .list_header {
      padding: 10px 20px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      border-bottom: 1px solid #979797;
      font-size: 0;
      .layout {
        color: #0093F1;
        font-size: 12px;
        display: inline-block;
        vertical-align: middle;
        width: 50%;
      }
      .input_select {
        margin-right: 15px;
      }
      .for_input {
        cursor: pointer;
      }
      .trade_del {
        text-align: right;
        span {
          cursor: pointer;
        }
      }
    }
    .list_cont {
      color: #999;
      font-size: 12px;
      .mes_group {
        position: relative;
        border-bottom: 1px solid #D7D7D7;
        .mes_content {
          width: 80%;
          margin: 0 auto;
          padding: 12px 0 40px 0;
        }
        .list_select,
        .del_box {
          position: absolute;
          top: 10px;
        }
        .list_select {
          left: 20px;
          label {
            cursor: pointer;
          }
          .input_select {
            margin-right: 15px;
          }
        }
        .del_box {
          right: 20px;
          cursor: pointer;
        }
      }
      .mes_content {
        letter-spacing: 0.3px;
        .time {
          margin-bottom: 20px;
        }
        .paragraph {
          .par_title {
            margin-bottom: 15px;
          }
          p {
            line-height: 20px;
            text-align: justify;
          }
        }
      }
    }
  }
</style>
