<template>
  <div class="bind_phone">
    <!--<div class="st_t1">重置资金密码</div>-->
    <div class="title">
      <p class="account">您正在为账户<span>{{account | encrypt(accountType) }}</span>重置资金密码</p>
    </div>
    <ul class="container">
      <!--			<li>
                      <span>您正在为账户</span>
                      <div class="box">
                          <p class="account"><span>{{account | encrypt(accountType) }}</span>绑定手机</p>
                      </div>
                  </li>-->
      <li>
        <span>新资金密码</span>
        <div class="box">
          <input type="password" :class="{wrong_pwd: showWrongPwd1 == true}"
                 autocomplete="off"
                 value=""
                 placeholder="请输入资金密码" v-model="save_p.password"/>
          <span class="red" v-show="showWrongPwd1 == true">密码不能少于八位</span>
          <div class="hint" v-show="showHint == 1">
            <div class="active"></div>
            <div></div>
            <div></div>
            <span>安全系数低</span>
          </div>
          <div class="hint_2" v-show="showHint == 2">
            <div class="active"></div>
            <div class="active"></div>
            <div></div>
            <span>安全系数中</span>
          </div>
          <div class="hint_3" v-show="showHint == 3">
            <div class="active"></div>
            <div class="active"></div>
            <div class="active"></div>
            <span>安全系数高</span>
          </div>
        </div>
      </li>
      <li>
        <span>确认资金密码</span>
        <div class="box">
          <input type="password" :class="{wrong_pwd: showWrongPwd2 == true}"
                 autocomplete="off"
                 value=""
                 placeholder="请再次输入资金密码" v-model="save_p.cfmpwd"/>
          <span class="red" v-show="showWrongPwd2 == true">两次输入密码不一致,请重新输入</span>
        </div>
      </li>
      <!--			<li>
                      <span>手机号码</span>
                      <div class="box">
                          <p class="account"><span>{{account | encrypt(accountType)}}</span></p>
                      </div>
                  </li>
                  <li>
                      <span>短信验证码</span>
                      <div class="box">
                          <sms-code @smsMsg="getMcode" :type="msg_type"></sms-code>
                      </div>
                  </li>-->
      <li class="reset_style">
        <google-set @g_token="get_g_token" :smsType="msg_type" @getMcode="get_sms_code"></google-set>
      </li>
      <li>
        <span></span>
        <div class="box">
          <button type="button" @click="save">确认</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import googleSet from './pannel/google_set'
  export default {
    data() {
      return {
        showWrongPwd1: false,
        showWrongPwd2: false,
        msg_type: 'updatePayPwd',
        account: '',
        accountType: '',
        showHint: 0,
        save_p: {
          type: 'updatePayPwd',
          password: '',
          cfmpwd: '',
          mcode: '',
          token: '',
        }
      }
    },
    components: {
      googleSet
    },
    computed: {},
    methods: {
      save() {
        //console.log(this.save_p)
        lh_http('post', 'account/resetasset', this.save_p).done((res) => {
          //console.log(res)
          if (res.status) {
            this.$router.push({
              path: '/user/settings'
            });
          } else {
            alert(res.data)
          }
        })
      },
      get_sms_code(val) {
        this.save_p.mcode = val;
      },
      get_g_token (val) {
        this.save_p.token = val;
      },
    },
    watch: {},
    mounted() {
      if (this.$store.getters.getUser.customerInfo) {
        let user = this.$store.getters.getUser.customerInfo;
        //console.log(user)
        if (user.mobile) {
          this.accountType = 'mobile';
          this.account = user.mobile;
        } else if (user.email) {
          this.accountType = 'email';
          this.account = user.email;
        }
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .bind_phone {
    font-size: 14px;
    margin-bottom: 70px;
    text-align: left;
    .title {
      margin: 45px 0 0 44px;
      .account {
        font-size: 16px;
        text-align: left;
        span {
          text-align: left;
          margin-right: 0;
          width: initial;
          color: #0093F1
        }
      }
    }
    .st_t1 {
      padding: 15px 20px;
      background: #f4f4f4;
      width: 100%;
      font-size: 24px;
    }
    .container {
      margin-top: 57px;
      text-align: center;
      padding: 0 50px;
      li {
        margin-bottom: 30px;
        span {
          display: inline-block;
          width: 96px;
          text-align: right;
          margin-right: 32px;
          font-size: 16px;
        }
        .sound {
          @extend .account;
          position: absolute;
        }
        .box {
          width: 412px;
          display: inline-block;
          text-align: left;
          position: relative;
          vertical-align: middle;
          .code {
            position: absolute;
            right: 15px;
            top: 15px;
          }
          .check_box {
            position: absolute;
          }
          .sms_msg {
            display: inline-block;
            span {
              width: initial;
              color: #f35809;
            }
          }
          .codeIcon {
            position: absolute;
            top: 2px;
            right: 10px;
            width: 100px;
            height: 40px;
            background: #ccc;
          }
          input {
            width: 412px;
            padding: 0 10px;
            height: 45px;
            border: 1px solid #9b9b9b;
            border-radius: 3px;
            &.wrong_pwd {
              background: #ffeef6;
              border-color: #FF4FA1;
            }
          }
          button {
            width: 412px;
            height: 45px;
            line-height: 45px;
            margin-top: 60px;
            background: #0093F1;
            color: #fff;
            text-align: center;
            cursor: pointer;
            font-size: 18px;
            &:hover {
              background: #26a8fb;
            }
            &:active {
              background: #0084d9;
            }
          }
          .red {
            width: inherit;
            position: absolute;
            text-align: left;
            margin-left: 10px;
            top: 48px;
            color: #FF4FA1;
          }
          .hint {
            position: absolute;
            top: 48px;
            width: 412px;
            div {
              display: inline-block;
              width: 78px;
              height: 10px;
              border: 1px solid #FF4FA1;
              margin-right: 5px;
              &.active {
                background: #FF4FA1;
              }
            }
            span {
              position: absolute;
              right: 0;
              top: 0;
              color: #FF4FA1;
              margin: 0;
            }
          }
          .hint_2 {
            @extend .hint;
            div {
              border-color: #29e2b9;
              &.active {
                background: #29e2b9;
              }
            }
            span {
              color: #29e2b9;
            }
          }
          .hint_3 {
            @extend .hint;
            div {
              border-color: #00bb91;
              &.active {
                background: #00bb91;
              }
            }
            span {
              color: #00bb91;
            }
          }
        }
      }
      .reset_style {
        border-top: 1px solid #ccc;
        .google_set {
          margin-top: 0;
          margin-left: -70px;
          border: none;
        }
      }
    }
  }
</style>
