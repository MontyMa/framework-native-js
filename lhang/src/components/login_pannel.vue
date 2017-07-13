<template>
  <div class="login_pannel">
    <!--
            作者：846966684@qq.com
            时间：2017-02-22
            描述：已登录
        -->
    <div class="login_on_panel" v-if="isLogged">
      <h3>{{getUserName.content | encrypt(getUserName.type)}}</h3>
      <div class="userLevel">
        <!--vip-->
        <span v-if="(getUser.customerVipLevel)&&(getUser.customerVipLevel.vipLevel)==='VIP1'">&#xe61d;</span>
        <span v-if="(getUser.customerVipLevel)&&(getUser.customerVipLevel.vipLevel)==='VIP2'">&#xe61f;</span>
        <span v-if="(getUser.customerVipLevel)&&(getUser.customerVipLevel.vipLevel)==='VIP3'">&#xe620;</span>
        <span v-if="(getUser.customerVipLevel)&&(getUser.customerVipLevel.vipLevel)==='VIP4'">&#xe61b;</span>
        <span v-if="(getUser.customerVipLevel)&&(getUser.customerVipLevel.vipLevel)==='VIP5'">&#xe61c;</span>
        <span v-if="(getUser.customerVipLevel)&&(getUser.customerVipLevel.vipLevel)==='VIP6'">&#xe61e;</span>
        <!--实名-->
        <span v-if="getUser.customerInfo&&getUser.customerInfo.authType==='C1'">&#xe60f;</span>
        <span v-if="getUser.customerInfo&&getUser.customerInfo.authType==='C2'">&#xe60e;</span>
        <!--<span v-if="getUser.customerInfo.authType"-->
        <!--:class="{C1: getUser.customerInfo.authType == 'C1' ,C2: getUser.customerInfo.authType == 'C2'}"></span>-->
      </div>
      <div class="userProperty">
        <h3>总资产</h3>
        <ul class="total_money">
          <li class="amount hide_amount" v-if="getTotalHide">******</li>
          <li class="amount" v-else="getTotalHide">
            <div class="cny">￥</div>
            <div class="total">{{total}}</div>
          </li>
          <li v-on:click="change_amount_tag" class="eyeShow">{{getTotalHide ? '&#xe61a;' : '&#xe612;'}}</li>
        </ul>
      </div>
      <div class="buttonWrapper">
        <a href="#/trading/btc/trade">快速交易</a>
      </div>
      <div class="otherLink">
        <ul>
          <li>
            <a href="#/money/recharge">充值</a>
          </li>
          <li class="tx">
            <a href="#/money/cashIn">提现</a>
          </li>
          <li>
            <a href="#/money/visualization">资产可视化</a>
          </li>
        </ul>
      </div>
      <div class="security">
        <span class="security_iofo">
          您的安全级别：
          <span class="security_type">
						{{securityLevel}}
					</span>
        </span>
        <a class="security_add" href="#/user/settings">
          立即提高安全级别
        </a>
      </div>
    </div>
    <!--
            作者：846966684@qq.com
            时间：2017-02-22
            描述：未登录
        -->
    <div class="login_out_panel" v-else>
      <h3>
        登录链行
      </h3>
      <div class="form login-form">
        <div class="input-icon">
          <i class="fa">&#xe615;</i>
          <input v-model="username" type="text" autocomplete="off" placeholder="请输入邮箱或手机号"
                 value=""
                 @keydown.enter="!isGoogle?login():loginGoogle()"/>
        </div>
        <div class="input-icon" v-if="isGoogle">
          <i class="fa">&#xe607;</i>
          <input v-model="google_code" type="text" placeholder="请输入谷歌验证器"
                 autocomplete="off"
                 @keydown.enter="!isGoogle?login():loginGoogle()"/>
        </div>
        <div class="input-icon" v-else="isGoogle">
          <i class="fa">&#xe617;</i>
          <input v-model="password" type="password" aria-autocomplete="none" autocomplete="off" placeholder="请输入密码"
                 @keydown.enter="!isGoogle?login():loginGoogle()"/>
        </div>
        <ul class="check_forget">
          <li class="check_forget_list" :style="isLoginPage?{width:'100%','text-align':'left'}:null">
            <label>
              <input class="g_i_check" type="checkbox" v-model="rememberaccount"/>
              <span></span><span class="g_lable span_label">记住此账户名</span>
            </label>
          </li>
          <li class="check_forget_list" v-if="!isLoginPage">
            <router-link to='/findpassword/verifyaccount'>忘记密码?</router-link>
          </li>
        </ul>
        <div class="input-icon g_c_f" :style="isLoginPage?{'margin-top':'-10px'}:null">
					<span class="left" :style="isLoginPage?{'float':'none'}:null">
							<button v-on:click="!isGoogle?login():loginGoogle()"
                      :style="isLoginPage?{'width':'100%'}:null">登录</button>
            <!--:style="isLoginPage?{'width':'100%','transform':'translateY(-10px)'}:null">登录</button>-->
						</span>
          <span class="right" v-if="!isLoginPage">
            <router-link to='/reg/phone/1'><button>注册</button></router-link>
          </span>
        </div>

        <div class="login_custormer" v-if="isLoginPage">
          <router-link to='/reg/phone/1' class="reg">免费注册</router-link>
          <router-link to='/findpassword/verifyaccount' class="find">忘记密码?</router-link>
        </div>

        <!--第三方登录-->
        <!--<div class="login_container">
          <a class="qq_login">
            QQ登录
          </a>
          &lt;!&ndash;微信登录&ndash;&gt;
          <a v-on:click="openwx()" class="wx_login">
            微信登录
          </a>
          &lt;!&ndash;微博登录&ndash;&gt;
          <a class="wb_login"
             href="https://api.weibo.com/oauth2/authorize?client_id=1378573644&response_type=code&redirect_uri=http%3A%2F%2Fwww.lhang.com"
             target="_blank">
            微博登录
          </a>
          <wx ref="wxref"></wx>
        </div>-->
      </div>
    </div>
  </div>
</template>
<script>
  import wx from './pannel/wx'
  import store from '../vuex/store'

  export default {
    name: 'login_pannel',
    data() {
      return {
//        password: 'pc257116',
//        username: '17098075514',
        password: '',
        username: '',
        isGoogle: false,
        google_code: '',
        rememberaccount: true,   //是否勾选记住账号
        total: '--.--', //总资产
        certification_data: []
      }
    },
    computed: {
      isClick(){
        return this.isGoogle ? this.username !== '' && this.google_code !== '' : this.username !== '' && this.password !== '';
      },
      getSendMsg(){
        let send_msg;
        send_msg = this.isGoogle === true ? {
          username: this.username,
          token: this.google_code
        } : {
          username: this.username,
          password: this.password
        };

        return send_msg;
      },
      isLogged() {
        return this.$store.getters.isLogged;
      },
      getUser() {
        return this.$store.getters.getUser;
      },
      isLoginPage() {
        return this.$route.path === '/login';
      },
      getUserName() {
        return this.$store.getters.userName;
      },
      uuid() {
        return this.$store.getters.uuid;
      },
      socket() {
        return this.$store.getters.sub_customer_asset.data;
      },
      securityLevel () {
        return this.$store.getters.mySecurityLevel;
      },
      getTotalHide(){
        return this.$store.getters.is_hide_tatol
      }
    },
    components: {wx}, //这里注册
    methods: {
      certificationLogo() {   //暂时保留
        let auth_type = this.getUser.customerInfo.authType;
        customer_level = this.getUser.customerVipLevel.vipLevel;
        const LEVEL = {
            VIP1: '&#xe61d;',
            VIP2: '&#xe61f;',
            VIP3: '&#xe620;',
            VIP4: '&#xe61b;',
            VIP5: '&#xe61c;',
            VIP6: '&#xe61e;'
          },
          AUTH = {
            C1: '&#xe60f;',
            C2: '&#xe60e;'
          };
        if (auth_type !== null) {
          this.certification_data[1] = AUTH[auth_type];
        }
        this.certification_data[0] = LEVEL[customer_level];
      },
      loginCallBack(res){
        this.$store.commit('logon', res.data);
        this.$router.push({path: '/'});
        //登录时获取策略信息
        this.$store.dispatch("getPolicy", res.data);
        //记住账户名
        if (this.rememberaccount) {
          cookie().rememberAccount('curusername', this.username);
        }
        this.get_sub_customer_asset();
      },
      loginGoogle(){      //有谷歌验证器登录
        if (!this.isClick)return;

        lh_http('post', "oauth", this.getSendMsg).done(res => {
          if (!res.status) {
            alert(res.data);
            return;
          }

          this.loginCallBack(res);
        })
      },
      login(){    //无谷歌验证器登录
        if (!this.isClick)return;

        lh_http('post', "login", this.getSendMsg).done(res => {
          if (!res.status) {
            alert(res.data);
            return;
          }
          if (res.data.oauth === 1) {
            this.isGoogle = true;
            return
          }

          this.loginCallBack(res);
        })
      },
      openwx: function () {
        this.$refs.wxref.aaa();
      },

      //总资产显示与隐藏
      change_amount_tag() {
        let state = !this.getTotalHide;
        store.dispatch('is_hide_tatol', state);

        let state_obj = {
          state: state,
          time: +new Date()
        };

        localStorage.setItem('total_hide_state', JSON.stringify(state_obj))
      },

      get_sub_customer_asset() {
        store.dispatch('send', {
          channel: 'sub_customer_asset',
          uuid: this.uuid
        })
      },
    },
    beforeMount(){
    },
    mounted() {
      let that = this;
      if (cookie().status('user')) {
        that.get_sub_customer_asset();
      }

      if (cookie().status('curusername')) {
        this.username = cookie().get('curusername');
      }

      if (localStorage.getItem('rememberStatus') == "true") {
        this.rememberaccount = true;
      } else if (localStorage.getItem('rememberStatus') == "false") {
        this.rememberaccount = false;
      }

      //			第三方登录
      //			lh_http('post', "thirdLogin", {
      //				state: '1111',
      //				code: '222'
      //			}).done(function(res) {
      //
      //					if(res.status) {
      //						that.$store.commit('logon', res.data)
      //						that.$router.push({
      //							path: '/'
      //						})
      //				  }
      //			 })

    },
    watch: {
      // 如果 question 发生改变，这个函数就会运行
      socket: function (res) {
        this.total = res.total;
      },
      rememberaccount (val) {
        localStorage.setItem('rememberStatus', val);
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .check_forget {
    font-size: 0;
    margin-top: 10px;
    margin-bottom: 20px;
    .check_forget_list {
      width: 50%;
      font-size: 14px;
      color: #ffffff;
      display: inline-block;
      vertical-align: middle;
      box-sizing: border-box;
      &:first-child {
        text-align: left;
      }
      &:last-child {
        text-align: right;
      }
    }
  }

  .login_pannel {
    height: 320px;
    width: 280px;
    background-color: rgba(40, 44, 50, .87);
    padding: 20px;
    box-sizing: border-box;
    z-index: 9;
    .login_custormer {
      font-size: 0;
      margin-top: 4px;
      a {
        width: 50%;
        font-size: 12px;
        display: inline-block;
        vertical-align: middle;
      }
      .reg {
        text-align: left;
      }
      .find {
        text-align: right;
      }
    }
    a {
      color: white;
    }
    h3 {
      font-size: 16px;
      color: #fff;
      font-weight: 400;
      text-align: left;
    }
    /*}*/
    .login_out_panel {

      .login_container {
        position: absolute;
        left: 50%;
        margin-left: -105px;
        bottom: 20px;
        a {
          color: #fff;
          font-size: 14px;
          cursor: pointer;
          &:not(:last-child) {
            &:after {
              content: '|';
              margin: 0 6px;
            }
          }
        }
      }

      .form {
        .input-icon {
          position: relative;
          input[type='password'], input[type='text'] {
            width: 100%;
            height: 45px;
            border-radius: 2px;
            padding: 7px 30px 7px 36px;
            font-size: 14px;
          }
          i {
            color: #ececec;
            font-size: 22px;
            left: 8px;
            float: left;
            top: 33px;
            position: relative;
            text-align: left;
            z-index: 1;
          }
          .fa {
            line-height: 18px;
            color: #ccc;
            font-style: normal;
          }
          &:hover .fa {
            color: #0093f1;
          }
          .left {
            float: left;
            button {
              background-color: #0093f1;
              color: #fff;
              cursor: pointer;
              width: 173px;
              height: 45px;
              border-radius: 2px;
              font-size: 16px;
              &.action_btn {
                background-color: #f0f0f0;
                color: #a5a5a5;
              }
            }
          }
          .right {
            float: right;
            a {
              display: inline-block;
            }
            button {
              background-color: #f06103;
              color: #fff;
              width: 60px;
              height: 45px;
              border-radius: 2px;
              font-size: 16px;
              cursor: pointer;

            }
          }

        }
      }
    }
    /*登陆后*/
    .login_on_panel {
      .userLevel {
        line-height: 30px;
        margin-top: 10px;
        border-bottom: 1px solid #0093F1;
        text-align: left;
        span {
          color: #0093F1;
          font-size: 22px;
          margin-right: 10px;
        }
      }
      .userProperty {
        margin: 0 auto;
        height: 110px;
        padding-top: 15px;
        h3 {
          font-size: 16px;
          color: #D0D0D0;
          padding: 0;
          margin: 0;
        }

        .total_money {
          text-align: left;
          font-size: 0;
          margin-top: 15px;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          .hide_amount {
            -webkit-transform: translateY(5px);
            -moz-transform: translateY(5px);
            -ms-transform: translateY(5px);
            -o-transform: translateY(5px);
            transform: translateY(5px);
          }
          li {
            display: inline-block;
            vertical-align: middle;
            color: #ffffff;
            line-height: 30px;
            &.amount {
              color: #fff;
              display: inline-block;
              font-size: 32px;
              position: relative;
              width: 90%;

              .cny {
                font-size: 18px;
                display: inline-block;
                line-height: 30px;
                vertical-align: bottom;
              }
              .total {
                color: #fff;
                display: inline-block;
                font-size: 26px;
                position: relative;
                max-width: 187.98px;
                overflow: hidden;
              }
            }
            &.eyeShow {
              cursor: pointer;
              width: 10%;
              font-size: 28px;
              color: #9B9B9B;
            }
          }
        }
      }
      .buttonWrapper {
        &:hover a {
          background: #26a8fb;
        }
        a {
          width: 100%;
          line-height: 45px;
          display: inline-block;
          background: #0093F1;
          color: white;
          border-radius: 3px;
          font-size: 16px;
        }
      }
      .otherLink {
        a:hover {
          color: #0093F1;
        }
        ul {
          padding: 17px 0;
          li {
            padding: 0 16px;
            display: inline-block;
            font-size: 14px;
            height: 15px;
            color: white;
            line-height: 15px;
          }
          .tx {
            border-left: 1px solid white;
            border-right: 1px solid white;
          }
        }
      }
      .security {
        color: white;
        font-size: 0;
        a:hover {
          color: #0093F1;
        }
        .security_iofo {
          font-size: 12px;
          /*float: left;*/
          display: inline-block;
          vertical-align: middle;
          width: 50%;
          text-align: left;
          .security_type {
            color: #FF4FA1;
          }
        }
        .security_add {
          font-size: 12px;
          width: 50%;
          text-align: right;
          /*float: right;*/
          display: inline-block;
          vertical-align: middle;
        }
      }
    }
  }

  .login_pannel {
    /*float: right;*/
    /*right: 0;*/
    /*top: 210px;*/
    /*position: relative;*/
  }
</style>
