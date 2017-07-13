<template>
  <div class="content2">
    <ion-content12>
      <div class="content2_nav_left nav_layout">
        <router-link to="/" class="home_logo_box"></router-link>
        <ul class="left_nav_ul first_nav_ul">
          <li class="nav_list" :class="{active:isPath==='/'}">
            <router-link to="/" class="a_link">首页</router-link>
          </li>
          <li class="nav_list fast_trade" :class="{active:isPath==='/trading'}">
            <router-link to="/trading/btc/trade" class="a_link">快速交易</router-link>
            <!--hover弹出-->
            <ul class="fast_trade_hover">
              <li class="fast_trade_list_1">
                <router-link to="/trading/btc/trade">BTC现货交易</router-link>
              </li>
              <li class="fast_trade_list_2">
                <router-link to="/trading/zec/trade">ZEC现货交易</router-link>
              </li>
              <li class="fast_trade_list_3">
                <router-link to="/trading/eth/trade">ETH现货交易</router-link>
              </li>
              <li class="fast_trade_list_4">
                <router-link to="/trading/etc/trade">ETC现货交易</router-link>
              </li>

            </ul>
          </li>
          <li class="nav_list">
            <a target="_blank" :href="myUrl+'fullScreen.html'" class="a_link">专业交易</a>
          </li>
          <li class="nav_list" :class="{active:isPath==='/money'}">
            <router-link to="/money/overview" class="a_link">资产管理</router-link>
          </li>
        </ul>
        <!--未登录导航-->
        <ul class="left_nav_ul secon_nav_ul" v-if="!isLogged">
          <li class="nav_list">
            <a href="http://blog.lhang.com/" class="a_link" target="_blank">资讯论坛</a>
          </li>
          <li class="nav_list">
            <router-link to="/help/bulletin" class="a_link">帮助中心</router-link>
          </li>
        </ul>
        <!--已登录导航-->
        <ul class="left_nav_ul secon_nav_ul" v-else>
          <li class="nav_list" :class="{active:isPath==='/user'}">
            <router-link to="/user/settings" class="a_link">个人中心</router-link>
          </li>
          <li class="nav_list more">
            <span class="a_link more_box">更多</span>

            <ul class="more_hover">
              <li>
                <router-link to="/help/bulletin">帮助中心</router-link>
              </li>
              <li>
                <a href="http://blog.lhang.com/" target="_blank">资讯论坛</a>
              </li>
              <!--隐藏热门活动-->
              <!--<li>
                <router-link to="/trading/etc/trade">热门活动</router-link>
              </li>-->
              <li>
                <a href="/api/rest_api.html">API文档</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="content2_nav_right nav_layout">
        <!--导航右边登录前-->
        <ul class="right_nav_ul" v-if="!isLogged">
          <li class="right_nav_list">
            <router-link to="/login" class="right_link">登录</router-link>
          </li>
          <li class="right_nav_list reg_btn">
            <router-link class="right_link" to="/reg/phone/1">注册</router-link>
          </li>
        </ul>

        <!--导航右边登录后-->
        <ul class="right_nav_ul" v-else>
          <li class="right_nav_list list_login" @mouseenter="update_list">
            <span @mouseover='getCnyAccount()'
                  class="list_login_username">{{getUserName.content | encrypt(getUserName.type)}}</span>
            <div class="login_username_hover">
              <div class="login_username_hover_bg">
                <ul class="user_hover_iconbox">
                  <li class="hover_iconbox_attest hover_iconbox">
										<span :class="{active:getUser.customerInfo.mobile}">
                      	<router-link
                          :to="getUser.customerInfo.mobile?'/user/settings/phone_edit':'/user/settings/phone_bind'">&#xe60a;</router-link>
                      </span>
                    <span :class="{active:getUser.customerInfo.email}">
                      	<router-link to="/user/settings/email_bind">&#xe611;</router-link>
                      </span>
                    <span
                      :class="{active:getUser.customerInfo.authType == 'C1' || getUser.customerInfo.authType == 'C2'}">
                      	<router-link to="/user/auth">&#xe60f;</router-link>
                      </span>
                    <span :class="{active:getUser.customerInfo.authType == 'C2'}">
                      	<router-link to="/user/auth">&#xe60e;</router-link>
                      </span>
                    <span :class="{active:getUser.customerInfo.hasPayPassword}">
                      	<router-link
                          :to="getUser.customerInfo.hasPayPassword ? '/user/settings/funding_edit' : '/user/settings/funding_bind'">&#xe608;</router-link>
                      </span>
                    <span
                      :class="{active:getUser.customerInfo.googleIdentifier || getUser.customerInfo.assetGoogleIdentifier || getUser.customerInfo.otherGoogleIdentifier}">
                      	<router-link to="/user/settings/google">&#xe607;</router-link>
                      </span>
                  </li>
                  <li class="hover_iconbox_service hover_iconbox">
                    <a
                      href="//shang.qq.com/wpa/qunwpa?idkey=e7f238e982c2c667d1eab036927be6242314bbf94612d6bf5ab27cd9b3fe1e6d"
                      target="_blank">
                      <a href="http://q.url.cn/s/Wnafsym" target="_blank" class="service_txt link_a active">客户经理</a>
                    </a>
                  </li>
                </ul>

                <div class="assets_wrap">
                  <ul class="assets_group">
                    <li class="assets_group_tit">总资产</li>
                    <li class="all_cny_hide" :class="+account.change===1?'rise':'fall'" v-if="getTotalHide">******</li>
                    <li class="assets_group_var" :class="account.change===1?'rise':'fall'" v-else="getTotalHide">
                      <div class="account_all_cny var_1">{{account.all_cny ? account.all_cny.toFixed(2) : '--'}}
                        <div class="tip"></div>
                      </div>
                      <div class="assets_group_rate">CNY</div>
                    </li>
                    <li @click="toggle" class="eye_icon">{{getTotalHide ? '&#xe61a;' : '&#xe612;'}}</li>
                  </ul>
                  <!--总积分暂时隐藏掉-->
                  <!--<ul class="assets_group">
                    <li class="assets_group_tit">总积分</li>
                    <li class="assets_group_var"><span>{{myVipScore}}</span></li>
                    <li class="assets_group_rate" v-if="myVipLevel == 'VIP1'">&#xe61d;</li>
                    <li class="assets_group_rate" v-if="myVipLevel == 'VIP2'">&#xe61f;</li>
                    <li class="assets_group_rate" v-if="myVipLevel == 'VIP3'">&#xe620;</li>
                    <li class="assets_group_rate" v-if="myVipLevel == 'VIP4'">&#xe61b;</li>
                    <li class="assets_group_rate" v-if="myVipLevel == 'VIP5'">&#xe61c;</li>
                    <li class="assets_group_rate" v-if="myVipLevel == 'VIP6'">&#xe61e;</li>
                  </ul>-->
                </div>
                <div class="table_list_wrap">
                  <table>
                    <thead>
                    <tr>
                      <td>币种</td>
                      <td>可用</td>
                      <td>冻结</td>
                      <td>小计</td>
                      <td>折合CNY</td>
                    </tr>
                    </thead>
                    <tbody v-if="getTotalHide">
                    <tr>
                      <td>&#xe65b; CNY</td>
                      <td>******</td>
                      <td>******</td>
                      <td>******</td>
                      <td>******</td>
                    </tr>
                    <tr>
                      <td>&#xe64b; BTC</td>
                      <td>******</td>
                      <td>******</td>
                      <td>******</td>
                      <td>******</td>
                    </tr>
                    <tr>
                      <td>&#xe64c; ZEC</td>
                      <td>******</td>
                      <td>******</td>
                      <td>******</td>
                      <td>******</td>
                    </tr>
                    <tr>
                      <td>&#xe64e; ETH</td>
                      <td>******</td>
                      <td>******</td>
                      <td>******</td>
                      <td>******</td>
                    </tr>
                    <!--<tr>
                      <td>&#xe64d; ETC</td>
                      <td>******</td>
                      <td>******</td>
                      <td>******</td>
                      <td>******</td>
                    </tr>-->
                    </tbody>
                    <tbody v-else="getTotalHide">
                    <tr>
                      <td>&#xe65b; CNY</td>
                      <td>{{account.cny_usable}}</td>
                      <td>{{account.cny_freeze}}</td>
                      <td>{{account.cny_cny}}</td>
                      <td>{{account.cny_cny}}</td>
                    </tr>
                    <tr>
                      <td>&#xe64b; BTC</td>
                      <td>{{account.btc_usable}}</td>
                      <td>{{account.btc_freeze}}</td>
                      <td>{{account.btc_usable + account.btc_freeze}}</td>
                      <td>{{account.btc_cny ? account.btc_cny.toFixed(2) : '--'}}</td>
                    </tr>
                    <tr>
                      <td>&#xe64c; ZEC</td>
                      <td>{{account.zec_usable}}</td>
                      <td>{{account.zec_freeze}}</td>
                      <td>{{account.zec_usable + account.zec_freeze}}</td>
                      <td>{{account.zec_cny ? account.zec_cny.toFixed(2) : '--'}}</td>
                    </tr>
                    <tr>
                      <td>&#xe64e; ETH</td>
                      <td>{{account.eth_usable}}</td>
                      <td>{{account.eth_freeze}}</td>
                      <td>{{account.eth_usable + account.eth_freeze}}</td>
                      <td>{{account.eth_cny ? account.eth_cny.toFixed(2) : '--'}}</td>
                    </tr>
                    <tr>
                      <td>&#xe64d; ETC</td>
                      <td>{{account.etc_usable}}</td>
                      <td>{{account.etc_freeze}}</td>
                      <td>{{account.etc_usable + account.etc_freeze}}</td>
                      <td>{{account.etc_cny ? account.etc_cny.toFixed(2) : '--'}}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
                <ul class="button_wrap">
                  <li class="button">
                    <router-link to="/money/cashIn">提现</router-link>
                  </li>
                  <li class="button">
                    <router-link to="/money/recharge">充值</router-link>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li class="right_nav_list login_out">
            <span class="right_link" @click="logout()">退出</span>
          </li>
        </ul>
      </div>
      <!--垂直居中相对定位点-->
      <div class="v_center"></div>
    </ion-content12>
  </div>
</template>

<script>
  import store from '../../../vuex/store'
  export default {
    name: 'header',
    data() {
      return {
        account: {},
        myVipLevel: '',
        myVipScore: '',
        myUrl: '',
        //        is_hide: false
      }
    },
    computed: {
      isLogged() {
        return this.$store.getters.isLogged;
      },
      getUser() {
        return this.$store.getters.getUser;
      },
      getUserName() {
        return this.$store.getters.userName;
      },
      isTrading() {
        return this.$route.path.indexOf("trading") > 0 ? true : false;
      },
      uuid() {
        return this.$store.getters.uuid;
      },
      isPath() {
        const regex = /\w+/i;
        let _path = this.$route.path;

        let path_reg_arr = _path.match(regex);

        if (path_reg_arr === null) {
          return _path;
        }

        let get_path = {
          trading() {
            return '/trading'
          },
          money() {
            return '/money'
          },
          help() {
            return '/help'
          },
          user() {
            return '/user'
          }

        };

        let path_reg = _path.match(regex)[0];
        if (get_path[path_reg] === undefined) return;
        return get_path[path_reg]();
      },
      //      获取是否隐藏总金额
      getTotalHide() {
        return this.$store.getters.is_hide_tatol
      }
    },
    components: {},
    mounted() {
      if (cookie().status('user')) {
        this.getCnyAccount();
      }
      this.myUrl = window.config.api;
    },
    methods: {
      logout: function () {
        store.dispatch('logout')
      },

      toggle() {
        let state = !this.getTotalHide;
        store.dispatch('is_hide_tatol', state);

        let state_obj = {
          state: state,
          time: +new Date()
        };

        localStorage.setItem('total_hide_state', JSON.stringify(state_obj));
      },

      getCnyAccount: function () {
        lh_http('post', 'customerAsset/cnyAccount', {
          useruuid: this.uuid
          //          useruuid: 'e30d55cc-9bbb-4a4f-a028-9d8b7bdb25be'
        }).done((res) => {
          if (res.status) {
            this.account = res.data.account;
            this.$store.dispatch("account", res.data.account)

          } else {
            console.log(res)
          }
        })
      },
      //查询vip积分情况
      getVipInfo() {
        lh_http("get", 'customerInfo/vipInfo').done((res) => {
          if (res.status) {
            this.myVipLevel = res.data.vipInfo.vipLevel;
            this.myVipScore = res.data.vipInfo.score;
          }
        })
      },
      update_list() {
        //      this.getVipInfo();
      }
    },
    watch: {
      'menu_pannel3' (value) {
        if (value) {
          this.getCnyAccount();
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .content2 {
    height: 70px;
    font-size: 0;
    border-bottom: 1px solid #D7D7D7;
    .v_center {
      height: 100%;
    }
    .nav_layout,
    .v_center {
      display: inline-block;
      vertical-align: middle;
    }
    .content2_nav_left {
      width: 70%;
      font-size: 16px;
      color: #1B1E23;
      text-align: left;
      a {
        color: inherit;
      }
      .home_logo_box {
        width: 114px;
        height: 70px;
        display: inline-block;
        vertical-align: middle;
        background: url("./img/lhang_logo.svg") no-repeat center center;
      }
      .left_nav_ul,
      .nav_list {
        display: inline-block;
        vertical-align: middle;
      }
      .left_nav_ul {
        &.first_nav_ul {
          margin-left: 80px;
        }
        &.secon_nav_ul {
          margin-left: 47px;
        }
        .nav_list {
          height: 70px;
          cursor: pointer;
          position: relative;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
          border-bottom: 4px solid transparent;
          &.active {
            color: #0093F1;
            border-color: #0093F1;
          }
          .a_link {
            line-height: 70px;
            display: inline-block;
          }
          &:not(:first-child) {
            margin-left: 47px;
          }
          &.more {
            margin-left: 67px;
          }
          &:hover .a_link {
            color: #0093F1;
          }
        }
      }
      .fast_trade:hover .fast_trade_hover,
      .more:hover .more_hover {
        display: block;
      }
      .more:hover .more_box:after {
        border-top-color: #0093F1;
        transform: rotate(180deg);
      }
      .more_box {
        &:after {
          content: '';
          border-top: 8px solid #1B1E23;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          display: inline-block;
          vertical-align: middle;
          margin-left: 5px;
          transition: 200ms;
        }
      }
      .fast_trade_hover {
        width: 112px;
        top: 65px;
        left: -17px;
        li {
          a {
            display: inline-block;
            vertical-align: middle;
          }
        }
        li:before {
          content: '';
          display: inline-block;
          vertical-align: middle;
          width: 14px;
          height: 14px;
          margin-right: 4px;
          background-repeat: no-repeat;
          background-position: center center;
        }
        .fast_trade_list_1:before {
          background-image: url("./img/btc_whrite.svg");
        }
        .fast_trade_list_2:before {
          background-image: url("./img/zec_whrite.svg");
        }
        .fast_trade_list_3:before {
          background-image: url("./img/etc_whrite.svg");
        }
        .fast_trade_list_4:before {
          background-image: url("./img/eth_whrite.svg");
        }
      }
      .more_hover {
        width: 100px;
        top: 65px;
        left: -30px;
      }
      .fast_trade_hover,
      .more_hover {
        display: none;
        position: absolute;
        z-index: 10;
        background-color: #0093F1;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, .3);
        li {
          text-align: center;
          line-height: 30px;
          color: #ffffff;
          cursor: pointer;
          font-size: 14px;
          &:hover {
            background-color: #ffffff;
            color: #0093F1;
            &.fast_trade_list_1:before {
              background-image: url("./img/btc.svg");
            }
            &.fast_trade_list_2:before {
              background-image: url("./img/zec.svg");
            }
            &.fast_trade_list_3:before {
              background-image: url("./img/etc.svg");
            }
            &.fast_trade_list_4:before {
              background-image: url("./img/eth.svg");
            }
          }
          a {
            color: inherit;
          }
        }
      }
    }
    .content2_nav_right {
      width: 30%;
      color: #1B1E23;
      text-align: right;
      a {
        color: inherit;
      }
      .right_nav_ul {
        font-size: 0;
        .right_nav_list {
          font-size: 14px;
          display: inline-block;
          vertical-align: middle;
          line-height: 15px;
          .right_link {
            cursor: pointer;
          }
          .right_link:hover {
            color: #0093F1;
          }
        }
        .list_login {
          color: #0093F1;
          position: relative;
          &:hover .login_username_hover {
            display: block;
          }
        }
        .list_login_username:after {
          content: "\e62e";
          font-size: 12px;
          margin-left: 8px;
          display: inline-block;
          transition: 200ms;
        }
        .login_username_hover {
          position: absolute;
          width: 530px;
          display: none;
          color: #1B1E23;
          text-align: center;
          box-sizing: border-box;
          background-color: rgba(0, 0, 0, 0);
          left: -395px;
          top: 7px;
          z-index: 10;
          .login_username_hover_bg {
            padding: 15px 30px 35px 30px;
            margin-top: 36px;
            box-shadow: 4px 6px 10px 0 rgba(0, 0, 0, 0.2);
            background-color: #ffffff;
          }
          .user_hover_iconbox {
            font-size: 0;
            .hover_iconbox {
              font-size: 14px;
              display: inline-block;
              vertical-align: middle;
              color: #D0D0D0;
              line-height: 22px;
              span,
              .link_a {
                display: inline-block;
                padding: 0 3px;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
                border-radius: 3px;
                border: 1px solid #D0D0D0;
                &:not(:first-child) {
                  margin-left: 5px;
                }
                &.service_txt:before {
                  content: "\e609";
                  margin-right: 6px;
                  font-size: 16px;
                  display: inline-block;
                  vertical-align: middle;
                }
                &.active {
                  color: #0093F1;
                  border-color: #0093F1;
                }
              }
            }
            .hover_iconbox_attest {
              width: 70%;
              text-align: left;
              font-size: 16px;
            }
            .hover_iconbox_service {
              width: 30%;
              text-align: right;
            }
          }
          .assets_wrap {
            text-align: left;
            padding: 30px 0;
            .assets_group {
              user-select: none;
              /*height: 26px;*/
              .all_cny_hide {
                font-size: 30px;
                &.rise {
                  color: #FF554B;
                }
                &.fall {
                  color: #00CA8D;
                }
              }
              .eye_icon {
                font-size: 30px;
                color: #999999;
                cursor: pointer;
                line-height: 26px;
                margin-left: 10px;
              }
              &:not(:first-child) {
                margin-top: 15px;
              }
              li {
                display: inline-block;
                vertical-align: bottom;
              }
              .assets_group_tit {
                width: 55px;
                -webkit-transform: translateY(-2px);
                -moz-transform: translateY(-2px);
                -ms-transform: translateY(-2px);
                -o-transform: translateY(-2px);
                transform: translateY(-2px);
              }
              .assets_group_var {
                margin-right: 8px;
                .var_1 {
                  display: inline-block;
                  font-size: 30px;
                  color: #0093F1;
                  position: relative;
                  line-height: 26px;
                }
                .tip {
                  position: absolute;
                  top: 2px;
                  right: -16px;
                  width: 8px;
                  height: 8px;
                }
                &.rise {
                  .var_1,
                  .assets_group_rate {
                    color: #FF554B;
                  }
                  .tip {
                    background: url("./img/rise.svg") no-repeat center center;
                  }
                }
                &.fall {
                  .var_1,
                  .assets_group_rate {
                    color: #00CA8D;
                  }
                  .tip {
                    background: url("./img/fall.svg") no-repeat center center;
                  }
                }
              }
              .assets_group_rate {
                margin-left: 14px;
                display: inline-block;
                font-size: 13px;
                color: #0093F1;
              }
            }
          }
          .table_list_wrap {
            table {
              width: 100%;
              border-collapse: collapse;
              td {
                width: 20%;
              }
              thead {
                tr {
                  border-bottom: 1px dashed #0093F1;
                  line-height: 39px;
                  color: #9B9B9B;
                }
              }
              tbody {
                line-height: 40px;
                color: #494949;
                tr:hover {
                  background-color: #F2F9FE;
                }
              }
            }
          }
          .button_wrap {
            font-size: 0;
            margin-top: 30px;
            .button {
              width: 50%;
              display: inline-block;
              vertical-align: middle;
              cursor: pointer;
              &:first-child {
                text-align: left;
              }
              &:last-child {
                text-align: right;
                a {
                  background-color: #0093F1;
                  color: #ffffff;
                }
              }
              a {
                text-align: center;
                border: 1px solid #0093F1;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
                font-size: 14px;
                line-height: 40px;
                border-radius: 3px;
                color: #0093F1;
                display: inline-block;
                width: 220px;
                height: 100%;
              }
            }
          }
        }
        .list_login:hover .list_login_username:after {
          transform: rotate(180deg);
        }
        .login_out,
        .reg_btn {
          &:before {
            content: "|";
            display: inline-block;
            margin: 0 20px;
          }
        }
      }
    }
  }
</style>
