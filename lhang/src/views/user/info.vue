<template>
  <div class="auth" id="auth">
    <div class="info_title">
      <div class="info_title_box">
        <p class="st_t1 ul_title">{{getUserName.content | encrypt(getUserName.type)}}</p>
        <ul class="info_box">
          <li v-for="i in basicInfo">
            <img  width="40" height="40" :src="i.icon.bind" v-if="i.status"/>
            <img  width="40" height="40" :src="i.icon.unbind" v-else/>
            <div class="ul_type">
              <p>{{i.type}}</p>
              <div class="ul_type_r">
                <span v-if="i.showAccount && i.type =='手机'">{{i.account | encrypt('mobile')}}</span>
                <span v-if="i.showAccount && i.type =='邮箱'">{{i.account | encrypt('email')}}</span>
                <a :href="i.sethref" v-if="!i.status">设置</a>
                <a :href="i.modifyhref" v-if="i.status && i.type != '邮箱'">修改</a>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="st_d1">
        <h2 class="st_t1 ul_title ul_title_2">资金安全策略{{securityLevel}}</h2>
        <ul class="setting_ul">
          <li v-for="i in assetPolicy">
            <div class="icon" v-if="i.status">
              <img  width="40" height="40" :src="i.pic.bind"/>
            </div>
            <div class="icon" v-else>
              <img  width="40" height="40" :src="i.pic.unbind"/>
            </div>
            <div class="box">
              <div class="name">
                <span>{{i.name}}</span>
              </div>
              <div class="level">
                <span class="intro_color">{{i.level || '&nbsp;'}}</span>
              </div>
              <div class="hint">
                <span class="intro">{{i.hint}}</span>
              </div>
              <div class="operation">
                <a :href="i.thisHref" class="btn" v-if="i.status">{{i.btnName}}</a>
                <a :href="i.thisHref" class="btn disable_btn" v-else="i.status">启用</a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'auth',
    data() {
      return {
        authType: 'C1',
        userName: '',
        myVipLevel: '',
        superVip: '',
        myScore: 5,
        unfinished: 0,
        finished: 1,
        basicInfo: [{
          type: "手机",
          account: "123456",
          showAccount: true,
          status: true,
          icon: {
            bind: require('./info/imgs/mobile.svg'),
            unbind: require('./info/imgs/mobile0.svg')
          },
          sethref: '#/user/settings/phone_bind',
          modifyhref: '#/user/settings/phone_edit'
        }, {
          type: "邮箱",
          account: "",
          showAccount: true,
          status: false,
          icon: {
            bind: require('./info/imgs/email.svg'),
            unbind: require('./info/imgs/email0.svg'),
          },
          sethref: '#/user/settings/email_bind',
          modifyhref: '#/user/settings/email_bind'
        }, {
          type: "资金密码",
          account: "13654298425",
          showAccount: false,
          status: false,
          icon: {
            bind: require('./info/imgs/paypwd.svg'),
            unbind: require('./info/imgs/paypwd0.svg')
          },
          sethref: '#/user/settings/funding_bind',
          modifyhref: '#/user/settings/funding_edit'
        }, {
          type: "谷歌验证器",
          account: "13654298425",
          showAccount: false,
          status: false,
          icon: {
            bind: require('./info/imgs/google.svg'),
            unbind: require('./info/imgs/google0.svg')
          },
          sethref: '#/user/settings/google',
          modifyhref: '#/user/settings/google'
        }, {
          type: "登录密码",
          account: "13654298425",
          showAccount: false,
          status: true,
          icon: {
            bind: require('./info/imgs/login.svg'),
            unbind: require('./info/imgs/login0.svg')
          },
          sethref: '#/btnpassword',
          modifyhref: '#/user/settings/password'
        }],
        assetPolicy: [
          {
            pic: {
              bind: require('./info/imgs/level.svg'),
              unbind: require('./info/imgs/level0.svg'),
            },
            name: '安全等级',
            hint: '',
            level: '高',
            status: true,
            items: ['', ''],
            btnName: '提升',
            thisHref: '#/user/settings'
          },
          {
            pic: {
              bind: require('./info/imgs/C1check.svg'),
              unbind: require('./info/imgs/C1check0.svg'),
            },
            name: '认证等级',
            hint: '已完成C1认证',
            level: 'C1',
            status: true,
            items: ['', ''],
            btnName: '查看',
            thisHref: '#/user/auth'
          },
//          {
//            pic: {
//              bind: require('./info/imgs/vip.svg'),
//              unbind: require('./info/imgs/vip0.svg'),
//            },
//            name: '积分等级',
//            hint: '您当前提现手续费为0.5%，提高积分等级可以享受低费率',
//            level: 'VIP1',
//            status: true,
//            items: ['', ''],
//            btnName: '查看',
//            thisHref: '#/user/points'
//          },
        ]
      }
    }, //定义变量
    components: {}, //注册组件
    computed: {
      user() {
        return this.$store.getters.getUser;
      },
      vipLevel () {
        //console.log(this.$store.getters.vipLevel)
        return this.$store.getters.vipLevel;
      },
      securityLevel () {
        this.assetPolicy[0].level = this.$store.getters.mySecurityLevel;
        this.assetPolicy[0].hint = '您已完成' + this.$store.getters.finished + '项,还有' + this.$store.getters.unfinished + '个未完成';
      },
      getUserName() {
        return this.$store.getters.userName;
      },
    },
    methods: { //方法都在这里
      init() {
        this.userName = this.user.customerInfo.nickname ? this.user.customerInfo.nickname : this.user.customerInfo.userName;
        let res_customerInfo = this.user.customerInfo;
        let res_data = this.user.policyList;
        [
          this.basicInfo[0].account,
          this.basicInfo[0].status,
          this.basicInfo[1].status,
          this.basicInfo[1].account,
          this.basicInfo[2].status,
          this.basicInfo[3].status,
        ] = [
          res_customerInfo.mobile,
          res_customerInfo.mobile,
          res_customerInfo.email,
          res_customerInfo.email,
          res_customerInfo.hasPayPassword,
          (res_customerInfo.assetGoogleIdentifier || res_customerInfo.googleIdentifier || res_customerInfo.otherGoogleIdentifier) ? true : false,
//					res_customerInfo.password
        ];
        [
          this.assetPolicy[1].level,
          this.assetPolicy[1].hint,
        ] = [
          res_customerInfo.authType,
          res_customerInfo.authType ? `已完成${res_customerInfo.authType}认证` : "你还未完成实名认证",

        ];
        this.assetPolicy[1].status = res_customerInfo.authType ? true : false;
      },
      //查询vip积分情况
      getVipInfo() {
        lh_http("get", 'customerInfo/vipInfo').done((res) => {
          if (res.status) {
            this.superVip = res.data.vipInfo.isSuperVip;
            this.myVipLevel = res.data.vipInfo.vipLevel;

            //积分主程序，勿删
            //this.setLevel();
          }
        })
      },
      setLevel () {
        if (this.superVip) {
          this.assetPolicy[2].level = "超级会员";
          this.assetPolicy[2].hint = "超级会员的费率是根据您购买此服务时的协议确定的哦";
        } else {
          this.assetPolicy[2].level = this.myVipLevel;
          switch (this.myVipLevel) {
            case "VIP1":
              this.assetPolicy[2].hint = "您当前提现手续费为0.50%，提高积分等级可以享受低费率";
              break;
            case "VIP2":
              this.assetPolicy[2].hint = "您当前提现手续费为0.45%，提高积分等级可以享受低费率";
              break;
            case "VIP3":
              this.assetPolicy[2].hint = "您当前提现手续费为0.38%，提高积分等级可以享受低费率";
              break;
            case "VIP4":
              this.assetPolicy[2].hint = "您当前提现手续费为0.30%，提高积分等级可以享受低费率";
              break;
            case "VIP5":
              this.assetPolicy[2].hint = "您当前提现手续费为0.20%，提高积分等级可以享受低费率";
              break;
          }
        }
      },
      //算积分判断用户安全级别
    },
    mounted() {
      this.init();
      this.getVipInfo();
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .auth {
    text-align: left;
    .st_t1 {
      padding: 15px 20px;
      background: #f4f4f4;
      width: 100%;
      text-align: left;
      font-size: 24px;
    }
    .info_title_box {
      background: #F5F7FA;
      height: 204px;
      padding: 0 33px;
      overflow: hidden;
    }
    .info_title {
      padding: 32px 30px;
      .ul_title {
        background: none;
        font-weight: normal;
        padding-left: 0;
        color: #333;
        font-size: 16px;
        margin: 0;
      }
      .ul_title_2 {
        font-size: 16px;
        padding: 0;
        margin-top: 60px;
        margin-bottom: 26px;
      }
      .info_box {
        overflow: hidden;
        zoom: 1;
        width: 1200px;
        /*margin-top: 20px;*/
        li {
          float: left;
          width: 350px;
          margin-bottom: 40px;
          img {
            width: 40px;
            float: left;
            margin-right: 30px
          }
          .ul_type {
            font-size: 12px;
            line-height: 20px;
            .ul_type_r {
              a {
                color: #0093F1;
              }
            }
            .set_color {
              color: #0093f1;
            }
          }
        }
      }
      .policy_ul {
        overflow: hidden;
        zoom: 1;
        margin: 20px 0;
        li {
          float: left;
          width: 224px;
          margin-bottom: 20px;
          img {
            width: 40px;
            float: left;
            margin-right: 30px
          }
          .ul_type {
            font-size: 12px;
            line-height: 20px;
            span {
              color: #0093f1;
              margin-left: 10px;
            }
            .set_color {
              color: #0093f1;
            }
          }
        }
      }
    }
    .st_d1 {
      overflow: auto;
      padding: 0 33px;
      .ul_title {
        background: none;
        font-weight: normal;
        padding-left: 0;
        color: #333;
        font-size: 20px;
      }
    }
    .setting_ul {
      border-bottom: 1px solid #d7d7d7;
      border-top: 1px solid #d7d7d7;
      li {
        font-size: 14px;
        overflow: hidden;
        height: 100px;
        margin-bottom: -1px;
        .icon, .hint, .name, .status, .operation, .box {
          display: inline-block;
        }
        .box {
          border-bottom: 1px dashed #d7d7d7;
          margin-bottom: -1px;
          overflow: hidden;
          width: 774px;
          height: 100px;
          line-height: 100px;
          float: left;
        }
        .hint, .name, .level {
          float: left;
        }
        .icon {
          margin: 30px 30px 0 0px;
          float: left;
          width: 40px;
          height: 40px;
          > img {
          }
        }
        .operation {
          text-align: center;
          float: right;
          .btn {
            width: 82px;
            display: inline-block;
            vertical-align: middle;
            background-color: #0093f1;
            line-height: 37px;
            border: none;
            color: #ffffff;
            font-size: 14px;
            cursor: pointer;
            &.disable_btn {
              /*background-color: #d7d7d7;*/
            }
            &.gray {
              background: #ccc;
            }
            &:hover {
              background: #26a8fb;
            }
            &:active {
              background: #0084d9;
            }
          }
        }
        .btn {
          /*padding: 10px 20px;*/
          border-radius: 3px;;
        }
        .name {
          width: 100px;
          margin-left: 10px;
        }
        .level {
          width: 100px;
          color: #fa5e5b;
        }
        .hint {
          color: #9b9b9b;
          width: 300px;
        }
      }
      /*li:hover {
                border: 1px solid #0093f1;
            }*/
    }
    /*		.setting_ul {
                overflow: auto;
                li {
                    font-size: 14px;
                    overflow: auto;
                    border: 1px solid #ededed;
                    display: table;
                    height: 100px;
                    width: 100%;
                    margin-bottom: 20px;
                    >div {
                        display: table-cell;
                        vertical-align: middle;
                    }
                    .icon {
                        padding-left: 40px;
                        width: 175px;
                        >img {
                            width: 60px;
                        }
                    }
                    .operation {
                        padding-right: 20px;
                        text-align: right;
                        button,.btn {
                            display: inline-block;
                            width: 82px;
                            text-align: center;
                            line-height: 37px;
                            border-radius: 3px;
                            background-color: #0093f1;
                            height: 37px;
                            border: none;
                            color: white;
                            font-size: 14px;
                            cursor: pointer;
                        }
                        .jinzhi{
                            background:none;
                            color:#A3A1A1;
                        }
                    }
                    .intro{
                        color:#a3a1a1;
                    }
                    .intro_color{
                        color:#f35809;
                    }
                    .name {
                        width: 120px;
                    }
                    .level{
                        width: 100px;
                    }
                    .hint {
                        width: 270px;
                    }
                }
                li:hover{
                    border: 1px solid #0093f1;
                }
            }*/
  }
</style>
