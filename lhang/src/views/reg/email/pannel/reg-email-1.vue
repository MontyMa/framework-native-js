<template>
  <div class="register-phone">
    <step :step="1"></step>
    <table class="table_1_5">
      <tr class="tr1">
        <td colspan="2">
          <router-link to='/reg/phone/1'>使用手机注册</router-link>
        </td>
      </tr>
      <tr class="tr2">
        <td>邮箱地址</td>
        <td>
          <input type="text" class="text" placeholder="输入您的邮箱地址" v-model="sendvcode_p.email"/>
        </td>
      </tr>
      <tr class="tr2">
        <td>邮箱验证码</td>
        <td>
          <input type="text" class="text" placeholder="请输入您的邮箱验证码" v-model="regStepOne_p.ecode" style="width: 310px;"/>
          <button :class="{ 'send_h': code_tag < 60,'send': true}" v-on:click="sendSMSCode()">
            <span>{{code_tag === 60 ? '点击获取' : '剩余' + code_tag + '秒'}}</span>
          </button>
        </td>
      </tr>
      <!--<tr class="tr1">-->
      <!--<td></td>-->
      <!--&lt;!&ndash;<td>收不到邮件?用 <label style="color: #0093F1; cursor: pointer">语音验证码</label></td>&ndash;&gt;-->
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
          <button :class="{ 'button_s': unlock_tag && sendvcode_p.email && regStepOne_p.ecode}"
                  @click="next"><span>下一步</span>
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
        agree: true,
        register_type: '',
        sendvcode_p: {
          'email': '',
          'type': 'ereg'
        },
        regStepOne_p: {
          'email': '',
          'ecode': ''
        },
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
        //如果没有拖动滑块和勾选 我已经阅读并同意 《用户服务协议》则以下都不能发送请求
        if (!(this.agree === true && this.unlock_tag === true)) return;

        this.regStepOne_p.email = this.sendvcode_p.email;

        lh_http('post', "regStepOne", this.regStepOne_p).done(function (res) {
          window.cookie().set('reg_rule', this.regStepOne_p);
          if (res.status) {
            this.$router.push({
              path: '/reg/email/2'
            });

          } else {
            alert(res.data);
          }
        }.bind(this))
      },
      sendSMSCode() {
        if (this.code_tag < 60) return;
        var that = this;
        lh_http('post', "sendvcode", this.sendvcode_p).done(function (res) {     //获取邮箱验证码
          //console.log(res);
          if (res.status) {
            that.runcode();
            alert('请注意查收邮件');
          } else {
            alert(res.data);
          }
        })

      },
      verificationCode(type) {
        UserService.verificationCode(this.code_phone);
      },
      runcode() {   //倒计时
        var that = this;
        var run = function () {
          that.code_tag--;
          if (that.code_tag <= 0) {
            clearInterval(timer);
            that.code_tag = 60;
          }
        };
        var timer = setInterval(run, 1000)
      },

      watch: {},
      beforeMount(){
      },
      mounted(){
      }
    }
  };

</script>

<style lang="scss">
  .register-phone {
  }

  /* eslint-enable */
</style>
