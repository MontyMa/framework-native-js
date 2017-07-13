<template>
  <div class="google_set">
    <ul v-if="security.sms || security.google">
      <li v-if="security.sms">
        <span>手机号码</span>
        <div class="box">
          <p class="account"><span>{{getMobile | encrypt('mobile')}}</span></p>
        </div>
      </li>
      <li v-if="security.sms">
        <span>短信验证码</span>
        <div class="box">
          <sms-code :type="smsType" @smsMsg="getMcode"></sms-code>
        </div>
      </li>
      <li v-if="security.google">
        <span>(设置)谷歌验证码</span>
        <div class="box">
          <input type="text" v-model="token" placeholder="请输入(设置)谷歌密码"/>
        </div>
      </li>
      <li v-if="security.sms || security.google">
        <span></span>
        <div class="box">
          <button type="button" @click="save">确认重置</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        security: {
          sms: false,
          google: false,
        },
        token: null,
      }
    },
    props: ['smsType'],
    computed: {
      user() {
        return this.$store.getters.getUser;
      },
      getMobile() {
        let mobile = this.$store.getters.getUser.customerInfo.mobile;
        if (!mobile) return '--';
        return mobile;
      },
			clearMsg () {
				return this.$store.getters.clearPolicyMsg;
			}
    },
    methods: {
      getMcode(val) {
        //获取短信验证码
        this.$emit("getMcode", val);
      },
      save() {
        this.$emit("save");
      }
    },
    watch: {
      token (val) {
        this.$emit("g_token", val);
      },
			clearMsg (val) {
				if(val){
					this.token = "";
					this.$store.dispatch("clearPolicyMsg", false);
				}
			}
    },
    mounted() {
      if (this.user.policyList) {
        for (let i = 0; i < this.user.policyList.length; i++) {
          if (this.user.policyList[i].validationMode == 'security') {
            let security = this.user.policyList[i].securityId.split(',');
            for (var j of security) {
              switch (j) {
                case '2':
                  this.security.google = true;
                  break;
                case '3':
                  this.security.sms = true;
                  break;
              }
            }
          }
        }
      }
    },
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
  .google_set {
    text-align: center;
    margin-left: -80px;
    li {
      margin-bottom: 30px;
      margin-left: 40px;
      span {
        display: inline-block;
        width: 100px;
        text-align: right;
        margin-right: 50px;
      }
      .account {
        text-align: left;
        span {
          text-align: left;
          margin-right: 0;
          width: initial;
          color: #0093F1
        }
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
        .code {
          position: absolute;
          right: 15px;
          top: 15px;
        }
        .check_box {
          position: absolute;
        }
        .sms_msg {
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
        input[type="text"] {
          width: 412px;
          padding: 0 10px;
          height: 45px;
          border: 1px solid #9b9b9b;
          border-radius: 3px;
        }
        button {
          width: 412px;
          height: 45px;
          line-height: 45px;;
          background: #0093F1;
          color: #fff;
          font-size: 18px;
          text-align: center;
          cursor: pointer;
					&:hover{
						background: #26a8fb;
					}
					&:active{
						background: #0084d9;
					}

          &.unable {
            background: lighten(#0093F1, 30%)
          }
        }
      }
    }
  }
</style>
