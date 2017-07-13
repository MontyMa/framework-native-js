<template>
  <div class="recharge_btc_handle">
    <div class="charge_info">
      <ul>
        <li>
          <span>充值金额</span>
          <div class="box">
            <p>843.00</p>
          </div>
        </li>
        <li>
          <span>资产类型</span>
          <div class="box">
            <span>CNY</span>
          </div>
        </li>
        <li>
          <span>使用有效期</span>
          <div class="box">
            <span>2017/02/12 12:34:56 - 2017/02/12 12:45:56</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="password_box">
      <ul>
        <li>
          <span>充值密码</span>
          <div class="box">
            <input
              value=""
              autocomplete="off"
              type="password" placeholder="输入您的充值密码"/>
          </div>
        </li>
        <li>
          <span></span>
          <div class="box">
            <button type="button" @click="exchange">立即兑换</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'rechargeBtcHandle',
    data () {
      return {
        showModal: false
      }
    },
    components: {},
    methods: {
      exchange () {
        this.showModal = true;
      },
      getMsg (val) {
        this.showModal = val;
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .recharge_btc_handle {
    width: 560px;
    border-right: 1px solid #e2e2e2;
    font-size: 13px;
    .charge_info {
      span {
        color: #9B9B9B;
      }
    }
    .password_box {
      border-top: 1px solid #e2e2e2;
      padding-top: 30px;
      margin-left: 55px;
      width: 470px;
      ul {
        margin-left: -55px;
      }
    }
    ul {
      li {
        margin-bottom: 30px;
        span {
          display: inline-block;
          width: 150px;
          text-align: right;
          margin-right: 50px;
        }
        .box {
          width: 320px;
          display: inline-block;
          position: relative;
          input {
            width: 320px;
            padding: 0 10px;
            height: 35px;
            border: 1px solid #9b9b9b;
            border-radius: 3px;
          }
          i {
            display: block;
            font-size: 12px;
            font-style: normal;
            position: absolute;
            top: 38px;
            color: #f06104;
          }
          a {
            @extend i;
            color: #0093F1;
          }
          span {
            text-align: left;
            width: 100%;
            color: #000;
          }
          p {
            font-size: 24px;
            color: #dd1a53;
            span {
              font-size: 13px;
              color: #000;
            }
          }
          .reset_width_220 {
            width: 220px;
            margin-right: 5px;
          }
          .reset_width_90 {
            width: 90px;
            color: #9b9b9b;
          }
          button {
            width: 320px;
            height: 40px;
            line-height: 40px;;
            background: #0093F1;
            color: #fff;
            text-align: center;
            cursor: pointer;
            &:hover {
              background: darken(#0093F1, 10%);
            }
          }
        }
      }
    }
  }
</style>
