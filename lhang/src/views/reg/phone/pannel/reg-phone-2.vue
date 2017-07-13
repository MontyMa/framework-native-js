<template>
  <div class="register-phone">
    <step :step="step"></step>
    <table class="table_1_5">
      <tr class="tr2">
        <td>登录密码</td>
        <td class="input_box">
          <input type="password" class="text"
                 :class="{g_input_error:tip_status}"
                 @blur="inputBlur"
                 @focus="inputFocus"
                 placeholder="密码由不少于7位的数字和字母组成"
                 v-model="two_p.password"
                 autocomplete="off"
                 maxlength="20"/>
          <!--安全级别-->
          <password-level :password="two_p.password" :tip_status="tip_status"></password-level>
        </td>
      </tr>
      <tr class="tr2">
        <td>确认登录密码</td>
        <td>
          <input type="password" class="text"
                 :class="{g_input_error:verification}"
                 @blur="verBlur"
                 placeholder="请确认您的密码"
                 v-model="two_p.cfmpwd"/>
          <div v-if="verification" class="verification_tip">两次密码不一致，请重新输入</div>
        </td>
      </tr>
      <tr class="tr2">
        <td>邀请码 <label style="font-size: 12px;color: silver;">(选填)</label></td>
        <td>
          <input type="text" class="text" placeholder="请输入邀请码" v-model="two_p.icode"/>
        </td>
      </tr>
      <tr style="text-align: center" class="tr2">
        <td></td>
        <td>
          <button :class="{button_s:isClick}" v-on:click="next">完成注册</button>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
  import step from './step/step';
  import store from '../../../../vuex/store'
  export default {
    components: {
      step
    },
    data() {
      return {
        step: 2,
        reg: /[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/,
        tip_status: false,
        verification: false,
        register_type: '',
        two_p: {
          'mobile': '',
          'mcode': '',
          'password': '',
          'cfmpwd': '',
          'icode': ''
        },
      };
    },
    computed: {
      isClick(){
        return !(this.two_p.password !== this.two_p.cfmpwd) && (!(this.two_p.password.length === 0) && this.two_p.cfmpwd.length !== 0)
      },
    },
    mounted() {
	    	if(cookie().status('invitecode')){
	    		this.two_p.icode = cookie().get('invitecode')
	    	}
    },
    methods: {
      verBlur(){
        this.verification = this.two_p.cfmpwd !== this.two_p.password;
      },
      inputFocus(){
        this.tip_status = false;
      },
      inputBlur(){
        let password = this.two_p.password;

        if (this.two_p.cfmpwd !== '') {
          this.verification = this.two_p.cfmpwd !== this.two_p.password;
        }

        if (password.length < 6) {
          this.tip_status = true;
          return;
        }

        this.tip_status = !this.reg.test(password);
      },
      loginCallBack(res){
        this.$store.commit('logon', res.data);
        //登录时获取策略信息
        this.$store.dispatch("getPolicy", res.data);

        this.get_sub_customer_asset();
      },

      get_sub_customer_asset() {
        store.dispatch('send', {
          channel: 'sub_customer_asset',
          uuid: this.uuid
        })
      },
      autoLogin(username, password){
        let login_msg = {
          username: username,
          password: password
        };

        lh_http('post', "login", login_msg).done(res => {
          if (!res.status)return;
          this.loginCallBack(res);

          this.$router.push({
            path: '/reg/phone/3'
          });
        })
      },
      next() {
        if (!this.reg.test(this.two_p.password) || !this.isClick)return;

        let reg_phone_p = cookie().get('reg_phone_p');

        this.two_p.mobile = reg_phone_p.mobile;
        this.two_p.mcode = reg_phone_p.mcode;

        lh_http('post', "regStepTwo", this.two_p).done(res => {
          if (res.status) {
            this.autoLogin(this.two_p.mobile, this.two_p.password);   //注册成功后自动登录
          } else {
            alert(res.data);
          }
        })
      },
    },
    watch: {
      '$refs.unlockref': function (res) {
        //console.log(res);
        this.value = res;
      },
      unlock: function (res) {
        //console.log(res)
      }
    }

  };
</script>

<style lang="scss">
  .register-phone {
    td {
      position: relative;
    }
    .verification_tip {
      position: absolute;
      bottom: -10px;
      line-height: normal;
      font-size: 12px;
      color: #FF4FA1;
    }
  }
</style>
