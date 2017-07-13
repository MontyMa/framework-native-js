<template>
  <div class="register-phone">
    <step :step="1"></step>
    <table class="table_1_5">
      <tr class="tr1">
        <td colspan="2">
          <router-link to='/reg/email/1'>使用邮箱注册</router-link>
        </td>
      </tr>
      <tr class="tr2">
        <td>手机号码</td>
        <td>
          <input type="text" class="text" placeholder="请输入您的手机号码" v-model="send_mobile.mobile"/>
        </td>
      </tr>
      <tr class="tr2">
        <td>短信验证码</td>
        <td>
          <input type="text" class="text" placeholder="请输入您的短信验证码" v-model="send_msg.mcode" style="width: 310px;"/>
          <button :class="{ 'send_h': code_tag < 60,'send': true}" v-on:click="sendSMSCode()">
            <span>{{code_tag == 60 ? '点击获取' : '剩余' + code_tag + '秒'}}</span>
          </button>
        </td>
      </tr>
      <!--<tr class="tr1">-->
      <!--<td></td>-->
      <!--<td>收不到短信?用<label style="color: #0093F1;">语音验证码</label></td>-->
      <!--</tr>-->
      <tr class="tr2">
        <td>图片验证</td>
        <td>
          <ion-unlock ref="unlockref" @unlock_tag="unlock"></ion-unlock>
        </td>
      </tr>
      <tr class="tr1">
        <td></td>
        <td style="padding: 10px 0">
          <input style="margin-right: 10px;: " type="checkbox" v-model="agree"/>我已经阅读并同意
                        <label style="color: #0093F1;"><a href="#/help/pact">《用户服务协议》</a></label>
        </td>
      </tr>
      <tr style="text-align: center" class="tr2">
        <td></td>
        <td>
          <button :class="{ 'button_s': unlock_tag && send_mobile.mobile && send_msg.mcode}" v-on:click="next">
            <span>下一步</span>
          </button>
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
        send_mobile: {
          type: 'nreg',
          mobile: ''
        },
        send_msg: {
          mobile: '',
          mcode: ''
        },
        agree: true,
        code_tag: 60,
        unlock_tag: false

      };
    },
    computed: {},
    methods: {
      unlock() {
        this.unlock_tag = true;
      },
      next() {

        if (this.send_mobile.mobile === '' || this.send_msg.mcode === '' || this.unlock_tag === false || this.agree === false)return;
        this.send_msg.mobile = this.send_mobile.mobile;

        lh_http('post', "regStepOne", this.send_msg).done(res => {
          //console.log(res);
          if (!res.status) {
            alert(res.data);
            return
          }

          cookie().set('reg_phone_p', this.send_msg);

          this.$router.push({
            path: '/reg/phone/2'
          })

        });
      },
      sendSMSCode(){
        if (this.send_mobile.mobile === '' || this.code_tag < 60) return;

        lh_http('post', "sendvcode", this.send_mobile).done(res => {
          //console.log(res);
          if (res.status) {
            this.runcode();
//            alert('请注意查收短信');
          } else {
            alert(res.data);
          }
        })

      },
      verificationCode(type)
      {
        UserService.verificationCode(this.code_phone);
      },
      runcode(){
        var that = this;
        var run = function () {
          that.code_tag--;
          if (that.code_tag <= 0) {
            clearInterval(timer);
            that.code_tag = 60;
          }
        };
        var timer = setInterval(run, 1000)
      }
    },
    watch: {
      '$refs.unlockref': function (res) {
        //console.log(res);
        this.value = res;
      }

      ,
      unlock: function (res) {
        //console.log(res)
      }
    }

  }
  ;
</script>

<style lang="scss">
  .register-phone {
  }

  /* eslint-enable */
</style>
