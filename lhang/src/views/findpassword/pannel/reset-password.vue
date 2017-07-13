<template>
  <div class="reset-password">
    <step :step="3"></step>
    <table class="table_1_5">
      <tr class="tr2">
        <td>登录密码</td>
        <td>
          <input type="password" class="text" placeholder="请输入您的密码" v-model="password"/>
        </td>
      </tr>
      <tr class="tr2">
        <td>确认登录密码</td>
        <td>
          <input type="password" class="text" placeholder="请确认您的密码" v-model="confirm_password"/>
        </td>
      </tr>
      <!--<tr class="tr2">-->
      <!--<td>邀请码 <label style="font-size: 12px;color: silver;">(选填)</label></td>-->
      <!--<td>-->
      <!--<input type="text" class="text" placeholder="请输入邀请码"/>-->
      <!--</td>-->
      <!--</tr>-->
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
          <button v-on:click="next" :class="{active:isClick}">下一步</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  import step from './step/step';
  export default {
    components: {
      step
    },
    data() {
      return {
        register_type: '',
        password: '',
        confirm_password: '',
        code_phone: {
          'mobile': '',
          'type': 'nreg'
        },
        two_p: {
          'username': '',
          'password': '',
          'cfmpwd': '',
          'icode': ''
        }
      };
    },
    computed: {
      isClick(){
        return this.password !== '' && this.password.length >= 7 && this.password === this.confirm_password;
      }
    },

    methods: {

      next() {
        if (!this.isClick) return;

        let send_msg = {
          password: this.confirm_password,
          useruuid: cookie().get('useruuid').useruuid
        };

        lh_http('post', "findpwd3", send_msg).done(res => {
            if (!res.status) {
              alert(res.data);
              return
            }

            this.$router.push({
              path: '/findpassword/complate'

            });
          }
        )
      },
      sendSMSCode() {
        if (this.code_tag < 60) {
          return;
        }

        lh_http('post', "sendvcode", this.code_phone).done(res => {
          if (!res.status) alert(res.data);
        })

      }

    },
    watch: {
      '$refs.unlockref': function (res) {
        this.value = res;
      },
//      unlock: function (res) {
//        //console.log(res)
//      }
    }
  };
</script>

<style lang="scss">
  .reset-password {
  }
</style>
