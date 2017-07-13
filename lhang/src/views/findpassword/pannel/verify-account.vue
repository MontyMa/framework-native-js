<template>
  <!--找回密码第一步-->
  <div class="register-phone">
    <step :step="1"></step>
    <table class="table_1_5">
      <tr class="tr2">
        <td>账户号码</td>
        <td>
          <input type="text" class="text" placeholder="请输入您的账户号码" v-model="send_msg.username"/>
        </td>
      </tr>
      <tr class="tr2">
        <td>图片验证</td>
        <td>
          <ion-unlock ref="unlockref" @unlock_tag="unlock"></ion-unlock>
        </td>
      </tr>
      <tr style="text-align: center" class="tr2">
        <td></td>
        <td>
          <button @click="next" :class="{active: isClick}">下一步</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  import step from './step/step'
  export default {
    components: {
      step
    },
    data() {
      return {
        register_type: '',
        ajax_step_one: lh_http('post', "findpwd1", this.send_msg),
        send_msg: {
          'username': '',
          'vcode': ''
        },
        code_tag: 60,
        unlock_tag: false
      };
    },
    computed: {
      isClick(){
        return this.unlock_tag && this.send_msg.username !== ''
      }
    },
    methods: {
      unlock(){
        this.unlock_tag = true;
      },

      next() {
        if (!this.unlock_tag || this.send_msg.username === '')return;

        lh_http('post', "findpwd1", this.send_msg).done(res=> {
          if (!res.status) {
            alert(res.data);
            return
          }

          cookie().set("username", this.send_msg.username);
          cookie().set("step_one_data", res.data);

          this.$router.push({
            path: '/findpassword/verifyidentity_phone'
          })
        });
      },
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  button.active {
    background-color: #0093f1 !important;
    cursor: pointer;
  }

  .register-phone {
  }

  /* eslint-enable */
</style>
