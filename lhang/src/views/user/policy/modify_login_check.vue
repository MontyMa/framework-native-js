<template>
  <div class="modify_login_check">
    <div class="container">
      <div class="check_container">
        <div class="check_item" :class="{selected_box:checkedItem === 1}">
          <label class="left">
            <div class="checkbox_style">
              <input type="radio" v-model="setstrategy_p.id" value="1" id="checkboxFourInput"
                     :checked="checkedItem == 1" :disabled="!security.google" name="policyType"/>
              <label for="checkboxFourInput"></label>
            </div>
            <p>通过<span>“登录密码”</span></p>
          </label>
          <span class="right black" v-if="checkedItem == 1">当前设置</span>
        </div>
        <div class="check_item" :class="{gray: !security.google,selected_box:checkedItem === 2}">
          <label class="left">
            <div class="checkbox_style">
              <input type="radio" v-model="setstrategy_p.id" value="1,2" :checked="checkedItem == 2"
                     id="checkboxFourInput1" :disabled="!security.google" name="policyType"/>
              <label for="checkboxFourInput1"></label>
            </div>
            <p>通过<span>“登录密码+(登录)谷歌验证器”</span></p>
          </label>
          <span class="right blue" v-if="checkedItem == 2">当前设置</span>
          <a class="right blue changeColor" href="#/user/settings/google/login/bind" v-if="!security.google">立即前往(登录)谷歌验证</a>
        </div>
      </div>
      <google-set :smsType="'loginStrategy'" @save="setstrategy" @getMcode="getMcode" @g_token="getToken"></google-set>
    </div>
  </div>
</template>

<script>
  import googleSet from './pannel/google_set'
  export default {
    data() {
      return {
        checkedItem: 1,
        setstrategy_p: {
          validmode: 'login',
          id: '1',
          mcode: '',
          token: '',
        },
        security: {
          sms: false,
          google: false,
          showGoogle: false,
        },
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
      changeItem(val) {
        this.checkedItem = val;
      }
    },
    mounted() {
      for (let i = 0; i < this.user.policyList.length; i++) {
        if (this.user.policyList[i].validationMode == 'login') {
          [
            this.setstrategy_p.id,
          ] = [
            this.user.policyList[i].securityId,
          ];

          let mySecurity = this.user.policyList[i].securityId;
          switch (mySecurity) {
            case '1':
              this.checkedItem = 1;
              break;
            case '1,2':
              this.checkedItem = 2;
              break;
          }
        }
      }


      this.security.sms = this.user.customerInfo.mobile ? true : false;
      this.security.google = this.user.customerInfo.googleIdentifier ? true : false;
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .modify_login_check {
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
          line-height: 40px;
          padding: 0 20px;
          overflow: hidden;
          &.gray {
            color: #ccc;
            span {
              color: #ccc;
            }
          }
          text-align: left;
          .checkbox_style {
            width: 14px;
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
          }
          .right {
            float: right;
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
