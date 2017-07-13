<template>
  <div class="more_type">
    <ion-content12>
      <div class="header header_more">
        <div class="title">优选多种数字资产交易类型</div>
        <div class="img_body">
          <div class="img_layout img_1"></div>
          <div class="img_layout img_2">
            <ul class="cont_box box_1">
              <li class="tit">BTC</li>
              <li class="txt">首个基于区块链的数字资产，加密、透明。</li>
            </ul>
          </div>
          <div class="img_layout img_3"></div>
          <div class="img_layout img_4">
            <ul class="cont_box box_2">
              <li class="tit">ZEC</li>
              <li class="txt">“零知识证明”，更安全，更具隐蔽性。</li>
            </ul>
          </div>
          <div class="img_layout img_5">
            <ul class="cont_box box_3">
              <li class="tit">ETC</li>
              <li class="txt">源自以太坊区块链分叉，实现智能合约。</li>
            </ul>
          </div>
          <div class="img_layout img_6">
            <ul class="cont_box box_4">
              <li class="tit">ETH</li>
              <li class="txt">新一代密码学账本，区块链数字资产2.0的代表，智能合约应用。</li>
            </ul>
          </div>
          <div class="img_layout img_7">
            <a href="#/help/introduction" class="more_link"></a>
            <ul class="cont_box box_5">
              <li class="tit">More</li>
              <li class="txt">了解更多</li>
            </ul>
          </div>
        </div>
      </div>
    </ion-content12>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
  .more_type {
    text-align: center;
    .header_more {
      padding-bottom: 30px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      border-bottom: 1px solid #E6E6E6;
    }
    .title {
      margin: 40px auto;
      color: #494949;
      font-size: 18px;
    }

    .img_body {
      display: inline-block;
      width: 988px;
      height: 464px;
      margin-top: 30px;
      position: relative;
      color: #ffffff;
      .img_1 {
        left: 0;
        top: 250px;
        width: 142px;
        height: 123px;
        background-image: url("./img/btc_bg.png");
      }
      .img_2 {
        width: 259.1px;
        height: 224.64px;
        top: 87px;
        left: 91px;
        background-image: url("./img/hexagon.svg");
      }
      .img_3 {
        width: 174px;
        height: 223px;
        top: 42px;
        left: 315px;
        background-image: url("./img/combineds_shape.png");
      }
      .img_4 {
        width: 260px;
        height: 225px;
        top: 119px;
        left: 436px;
        background-image: url("./img/hexagon.svg");
      }
      .img_5 {
        width: 260px;
        height: 225px;
        top: 0;
        left: 643px;
        background-image: url("./img/hexagon.svg");
      }
      .img_6 {
        width: 260px;
        height: 225px;
        bottom: 0;
        left: 643px;
        background-image: url("./img/hexagon_empty.svg");
      }
      .img_7 {
        width: 142px;
        height: 123px;
        top: 170px;
        left: 847px;
        padding: 0 25px !important;
        background-image: url("./img/more_bg.png");
        position: relative;
        cursor: pointer;
        transition: 200ms;
        .more_link {
          display: inline-block;
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
          z-index: 3;
        }
        &:hover {
          background-image: url("./img/hexagon.svg");
        }
      }
      .img_layout {
        position: absolute;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
        padding: 0 55px;
        text-align: justify;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
      }
      .cont_box {
        position: relative;
        &.box_1 {
          /*top: 48px;*/
          top: 77px;
        }
        &.box_2 {
          /*top: 87px;*/
          top: 77px;
        }
        &.box_3 {
          /*top: 37px;*/
          top: 77px;
        }
        &.box_4 {
          /*top: 60px;*/
          top: 77px;
          color: #0093F1;
        }
        &.box_5 {
          top: 31px;
          .txt {
            margin-top: 4px;
            /*line-height: 15px;*/
          }
        }
      }
      .tit {
        font-size: 18px;
      }
      .txt {
        margin-top: 10px;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: 0;
      }
    }

  }


</style>

<script>
  export default {
    name: 'login_pannel',
    data() {
      return {
        show: false,
      }
    },
    components: {}, //这里注册
    methods: {
      over() {
        this.show = true;
      },
      out() {
        this.show = false;
      },
    },
    mounted() {
      var that = this;
    },
  }
</script>

