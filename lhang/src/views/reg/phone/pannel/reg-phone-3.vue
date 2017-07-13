<template>
  <div class="reg-phone-3">
    <step :step="step"></step>
    <div class="tip">注册成功，您需要完成<span>C1身份认证</span>才能进行交易哦！</div>

    <ul class="button_box">
      <li class="c1_attest"><a href="#/user/auth">立即去C1身份认证</a></li>
      <li class="ignore"><a href="#/trading/btc/trade">暂时跳过</a></li>
    </ul>
  </div>
</template>

<script>
  import step from './step/step'
  export default {
    name: 'reg-phone-3',
    components: {
      step,
    },
    data() {
      return {
        step: 3
      };
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .reg-phone-3 {
    .tip {
      padding: 65px 0;
      font-size: 18px;
      color: #5B5B5B;
      span {
        color: #EF8037;
        margin: 0 5px;
      }
    }

    .button_box {
      font-size: 0;
      margin-bottom: 65px;
      li {
        width: 220px;
        font-size: 18px;
        display: inline-block;
        vertical-align: middle;
        border-radius: 3px;
        line-height: 50px;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        &:not(:first-child) {
          margin-left: 30px;
        }
        a {
          color: inherit;
          display: inline-block;
          width: 100%;
          height: 100%;
        }
      }
      .c1_attest {
        a {
          background-color: #0093F1;
          &:hover {
            background-color: #26a8fb;
          }
          &:active {
            background-color: #0084d9;
          }
        }
        color: #ffffff;
      }
      .ignore {
        border: 1px solid #0093F1;
        color: #0093F1;
      }
    }
  }
</style>
