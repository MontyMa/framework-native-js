<template>
  <div class="set_login_pwd">
    <div class="container">
      <div class="check_container">
        <div class="check_item" :class="{gray: !security.sms,selected_box:checkItem === 1}">
          <label class="left">
            <div class="checkbox_style">
              <input type="radio" v-model="setstrategy_p.id" value="3" id="checkboxFourInput" :disabled="!security.sms"
                     :checked="checkItem == 1" name="policyType"/>
              <label for="checkboxFourInput"></label>
            </div>
            <p>通过<span>“短信验证码”</span></p>
          </label>
          <span class="right black" v-if="checkItem == 1">当前设置</span>
        </div>
        <div class="check_item" :class="{gray: !security.google,selected_box:checkItem === 2}">
          <label class="left">
            <div class="checkbox_style">
              <input type="radio" v-model="setstrategy_p.id" value="2" id="checkboxFourInput1" :checked="checkItem == 2"
                     :disabled="!security.google" name="policyType"/>
              <label for="checkboxFourInput1"></label>
            </div>
            <p>通过<span>“(设置)谷歌验证器”</span></p>
          </label>
          <span class="right black" v-if="checkItem == 2 && security.google">当前设置</span>
          <a v-if="!security.google" class="right blue changeColor" href="#/user/settings/google/settings/bind">立即前往(设置)谷歌验证</a>
        </div>
        <div class="check_item" :class="{gray: !security.google || !security.sms,selected_box:checkItem === 3}">
          <label class="left">
            <div class="checkbox_style">
              <input type="radio" v-model="setstrategy_p.id" value="2,3" id="checkboxFourInput2"
                     :checked="checkItem == 3" :disabled="!security.google || !security.sms" name="policyType"/>
              <label for="checkboxFourInput2"></label>
            </div>
            <p>通过<span>“短信验证码+(设置)谷歌验证器”</span></p>
          </label>
          <span class="right black" v-if="checkItem == 3 && security.google">当前设置</span>
          <a v-if="!security.google" class="right blue changeColor" href="#/user/settings/google/settings/bind">立即前往(设置)谷歌验证</a>
        </div>
      </div>
      <google-set :smsType="'otherStrategy'" @save="setstrategy" @getMcode="getMcode" @g_token="getToken"></google-set>
    </div>
  </div>
</template>

<script>
  import googleSet from './pannel/google_set'
  export default {
    data() {
      return {
        checkItem: 1,
        security: {
          sms: false,
          google: false,
          showGoogle: false,
        },
        setstrategy_p: {
          validmode: 'security',
          id: '3',
          mcode: '',
          token: '',
        }
      }
    },
    components: {
      googleSet
    },
    computed: {
      user() {
        return this.$store.getters.getUser;
      },
    },
    methods: {
      getMcode(val) {
        this.setstrategy_p.mcode = val;
      },
      getToken (val){
        this.setstrategy_p.token = val;
      },
      setstrategy() {
        //console.log(this.setstrategy_p)
        lh_http("post", "account/setstrategy", this.setstrategy_p).done((res) => {
          if (res.status) {
            alert("策略修改成功");
            this.$store.dispatch("clearMsg", true);
            this.$store.dispatch("clearPolicyMsg", true);
          } else {
            alert(res.data)
          }
        });
      },
      changeItem (val) {
        this.checkItem = val;
      }
    },
    mounted() {
      for (let i = 0; i < this.user.policyList.length; i++) {
        if (this.user.policyList[i].validationMode == 'security') {
          [
            this.setstrategy_p.id,
          ] = [
            this.user.policyList[i].securityId,
          ];
          ////
          let security = this.user.policyList[i].securityId;
          switch (security) {
            case '2':
              this.checkItem = 2;
              break;
            case '3':
              this.checkItem = 1;
              break;
            case '2,3':
              this.checkItem = 3;
              break;
          }
        }
      }


      this.security.sms = this.user.customerInfo.mobile ? true : false;
      this.security.google = this.user.customerInfo.otherGoogleIdentifier ? true : false;
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .set_login_pwd {
    font-size: 13px;
    margin-bottom: 70px;
    text-align: left;
    .blue {
      color: #3392d6;
    }
    .black{
    	color: #494949;
    }
    .selected_box {
      background-color: #F5F7FA;
    }
    .container {
      padding-top: 50px;
      .check_container {
        margin: 0 26px 45px 32px;
        border-bottom: 1px solid #ececec;
        .check_item {
          overflow: hidden;
          padding: 0 20px;
          &.gray {
            color: #ccc;
            span {
              color: #ccc;
            }
          }
          text-align: left;
          .checkbox_style {
            width: 14px;
            line-height: 40px;
            height: 14px;
            border: 1px solid #D0D0D0;
            border-radius: 100%;
            position: relative;
            display: inline-block;
            top: 14px;
            label {
              display: block;
              position: absolute;
              left: 0;
              top: 0;
              width: 14px;
              height: 14px;
            }
            input[type=radio] {
              opacity: 0;
            }
            input[type=radio]:checked + label {
              background: url(imgs/checked.svg) no-repeat;
            }
          }
          p {
            display: inline-block;
            span {
              color: #F06104;
            }
          }
          .left {
            float: left;
            line-height: 40px;
          }
          .right {
            float: right;
            line-height: 40px;
          }
        }
      }
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
            text-align: center;
            cursor: pointer;
            &:hover {
              background: darken(#0093F1, 10%);
            }
            &.unable {
              background: lighten(#0093F1, 30%)
            }
          }
        }
      }
      .changeColor{
				&:hover{
					color: #26a8fb;
				}
				&:active{
					color: #0084d9;
				}
      }
      
    }
  }
</style>
