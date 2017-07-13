<template>
  <div class="characteristic_common">
    <div class="main">
      <div v-if="title" class="title">{{title}}</div>

      <div class="characteristic_cont">
        <div class="char_group">
          <ul class="char_group_list">
            <li class="img_box img_box1"></li>
            <li class="char_tit">安全</li>
            <li class="char_txt">领先的分布式集群技术；多层安全架构设计；动态冷热钱包机制；充分保障账户及信息安全</li>
          </ul>
        </div>
        <div class="char_group">
          <ul class="char_group_list">
            <li class="img_box img_box2"></li>
            <li class="char_tit">专业</li>
            <li class="char_txt">自主研发的海量并发撮合引擎；多服务器支持高并发交易；强稳定性运行</li>
          </ul>
        </div>
        <div class="char_group">
          <ul class="char_group_list">
            <li class="img_box img_box3"></li>
            <li class="char_tit">贴心</li>
            <li class="char_txt">优化的委托页面；及时的行情提示；定期的专业投研报告；7*17小时客服服务；多终端操作支持</li>
          </ul>
        </div>
        <div class="char_group">
          <ul class="char_group_list">
            <li class="img_box img_box4"></li>
            <li class="char_tit">便捷</li>
            <li class="char_txt">快速下单，及时把握行情；智能交易设计，可视化账户资金查询界面，交易明细一目了然</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
  .characteristic_common {
    position: relative;
    overflow: auto;
    /*background-color: #ffffff;*/
    padding: 20px 0 60px 0;
    .main {
      width: 1200px;
      margin: 0 auto;
    }
    .title {
      text-align: center;
      font-size: 18px;
      height: 100px;
      line-height: 100px;
      color: #494949;
    }
    .characteristic_cont {
      font-size: 0;
      margin-top: 50px;
      .char_group {
        font-size: 13px;
        color: #666666;
        width: 25%;
        display: inline-block;
        vertical-align: top;
        text-align: center;
        .char_group_list {
          display: inline-block;
          text-align: justify;
          width: 65%;
        }
        .img_box {
          width: 100%;
          height: 162px;
          &.img_box1 {
            background: url("./img/safety.svg") no-repeat center center;
            background-size: 85%;
          }
          &.img_box2 {
            background: url("./img/profession.svg") no-repeat center center;
            background-size: 90%;
          }
          &.img_box3 {
            background: url("./img/intimate.svg") no-repeat center center;
          }
          &.img_box4 {
            background: url("./img/convenient.svg") no-repeat center center;
          }
        }
        .char_tit {
          text-align: center;
          font-size: 20px;
          font-weight: 600;
          color: #494949;
          line-height: 50px;
        }
        .char_txt {
          letter-spacing: 1px;
          line-height: 22px;
        }
      }
    }
  }
</style>
