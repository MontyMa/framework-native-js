<template>
  <div class="reg-email-2">
    <step :step="step"></step>
    <table class="table_1_5">
      <tr class="tr2">
        <td>登录密码</td>
        <td>
          <!--v-model="code_phone.mobile"-->
          <input type="password" class="text"
                 v-model="set_password.password"
                 :class="{g_input_error:tip_status}"
                 @blur="inputBlur"
                 @focus="inputFocus"
                 placeholder="密码由不少于7位的数字和字母组成"
                 autocomplete="off"
                 maxlength="20"/>
          <!--安全级别-->
          <password-level :password="set_password.password" :tip_status="tip_status"></password-level>
        </td>
      </tr>
      <tr class="tr2">
        <td>确认登录密码</td>
        <td>
          <input type="password" class="text" placeholder="请确认您的密码"
                 :class="{g_input_error:verification}"
                 @blur="verBlur"
                 v-model="set_password.cfmpwd"/>
          <div v-if="verification" class="verification_tip">两次密码不一致，请重新输入</div>
        </td>
      </tr>
      <tr class="tr2">
        <td>邀请码 <label style="font-size: 12px;color: silver;">(选填)</label></td>
        <td>
          <input type="text" class="text" placeholder="请输入邀请码" v-model="set_password.icode"/>
        </td>
      </tr>
      <!--<tr class="tr1">
                    <td></td>
                    <td style="padding: 10px 0">
                        <input style="margin-right: 10px;: " type="checkbox" />我已经阅读并同意
                        <label style="color: #0093F1;">《用户服务协议》</label>
                    </td>
                </tr>-->
      <tr style="text-align: center" class="tr2">
        <td></td>
        <td>
          <!--v-verification="two_p"-->
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
        tip_status: false,
        verification: false,
        reg: /[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/,
        set_password: {
          password: '',
          cfmpwd: '',
          icode: ''
        },
      };
    },
    computed: {
      isClick(){
        return this.set_password.password === this.set_password.cfmpwd && !(this.set_password.password.length === 0) && this.set_password.cfmpwd.length !== 0
      },
    },
    mounted() {
	    	if(cookie().status('invitecode')){
	    		this.set_password.icode = cookie().get('invitecode')
	    	}
    },
    methods: {
      verBlur(){
        this.verification = this.set_password.cfmpwd !== this.set_password.password;
      },
      inputFocus(){
        this.tip_status = false;
      },
      inputBlur(){
        let password = this.set_password.password;

        if (this.set_password.cfmpwd !== '') {
          this.verification = this.set_password.cfmpwd !== this.set_password.password;
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
          //console.log(res);
          if (!res.status)return;
          this.step = 3;
          this.loginCallBack(res);
          this.$router.push({
            path: '/reg/email/3'
          });
        })
      },
      next() {
        if (!this.reg.test(this.set_password.password) || !this.isClick)return;

        if (this.set_password.password === '' && this.set_password.cfmpwd === '') {
          alert('密码不能为空');
          return;
        }
        if (this.set_password.password !== this.set_password.cfmpwd) {
          alert('请确认两次输入密码一致');
          return;
        }
        //获取处理后的数据
        let send_msg = this.getUserMsg();
        lh_http('post', "regStepTwo", send_msg).done(function (res) {
          if (res.status) {
            this.autoLogin(send_msg.email, send_msg.password);   //注册成功后自动登录
          } else {
            alert(res.data);
          }
        }.bind(this))
      },
      //处理发送数据
      getUserMsg(){
        let reg_rule = window.cookie().get('reg_rule');
        //console.log(reg_rule);
        this.set_password.email = reg_rule.email;
        this.set_password.ecode = reg_rule.ecode;

        return this.set_password;
      }
    }
  };
</script>

<style lang="scss">
  .reg-email-2 {
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
    .button_s {
      background: #0093F1;
      color: #fff;
    }

  }
</style>
