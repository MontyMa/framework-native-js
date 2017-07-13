<template>
  <!--找回密码第二步-->
  <div class="verify-identity-phone">
    <step :step="2"></step>
    <table class="table_1_5">
      <!--<tr class="tr1">-->
      <!--<td colspan="2">-->
      <!--<router-link to='/reg/email/1'>使用邮箱注册?</router-link>-->
      <!--</td>-->
      <!--</tr>-->
      <tr class="tr2" v-if="getOneData.type!=='email'">
        <td>手机号码</td>
        <td>
          <input type="text" class="text" placeholder="请输入您的手机号码" v-model="getOneData.findUserName"
                 readonly="readonly" disabled
                 style="background-color: #f5f5f5;user-select: none"/>
        </td>
      </tr>
      <tr class="tr2" v-if="getOneData.type==='email'">
        <td>邮箱地址</td>
        <td>
          <input type="text" class="text" placeholder="请输入您的邮箱账号" v-model="getOneData.findUserName"
                 readonly="readonly" disabled
                 style="background-color: #f5f5f5;user-select: none"/>
        </td>
      </tr>
      <tr class="tr2" v-if="getOneData.type!=='email'">
        <td>短信验证码</td>
        <td>
          <input type="text" class="text" placeholder="请输入您的短信验证码" v-model="code" style="width: 310px;"/>
          <button :class="{ 'send_h': code_tag < 60,'send': true}" v-on:click="sendSMSCode()">
            <span>{{code_tag == 60 ? '点击获取' : '剩余' + code_tag + '秒'}}</span>
          </button>
        </td>
      </tr>
      <tr class="tr2" v-if="getOneData.type==='email'">
        <td>邮箱验证码</td>
        <td>
          <input type="text" class="text" placeholder="请输入您的邮箱验证码" v-model="code" style="width: 310px;"/>
          <button :class="{ 'send_h': code_tag < 60,'send': true}" v-on:click="sendSMSCode()">
            <span>{{code_tag == 60 ? '点击获取' : '剩余' + code_tag + '秒'}}</span>
          </button>
        </td>
      </tr>
      <tr class="tr2" v-if="getOneData.isAuth">
        <td>证件类型</td>
        <td>
          <input type="text" class="text" value="身份证" readonly="readonly"/>
        </td>
      </tr>
      <tr class="tr2" v-if="getOneData.isAuth">
        <td>证件号码</td>
        <td>
          <input type="text" class="text" placeholder="请输入证件号码" v-model="idcode"/>
        </td>
      </tr>
      <!--<tr class="tr2">-->
      <!--<td>图片验证</td>-->
      <!--<td>-->
      <!--<ion-unlock ref="unlockref" @unlock_tag="unlock"></ion-unlock>-->
      <!--</td>-->
      <!--</tr>-->
      <tr style="text-align: center" class="tr2">
        <td></td>
        <td>
          <button :class="{button_s: isClick}" class="next" v-on:click="next">
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
        page_status: {
          isAuth: false,
          type: 'email',
          findUserName: '--'
        },
        code: '',
        idcode: '',
        code_tag: 60,
//        unlock_tag: false
      };
    },
    computed: {
      getOneData(){
        let step_one_obj = cookie().get('step_one_data');
        //console.log(step_one_obj);

        this.page_status = {
          isAuth: step_one_obj.isAuth,
          type: step_one_obj.type,
          findUserName: step_one_obj.findUserName
        };

        return this.page_status
      },
      isClick(){
        if (!this.getOneData.isAuth) {
          return this.code.length === 6;
        }
        return this.code.length === 6 && this.idcode.length === 18;
      }
    },
    methods: {
//      unlock() {
//        this.unlock_tag = true;
//      },
      next() {
        if (!this.isClick)return;

        let send_msg = {};

        if (this.getOneData.isAuth) {
          send_msg.idcode = this.idcode;
        }
        if (this.getOneData.type === 'email') {
          send_msg.ecode = this.code;
          send_msg.email = this.getOneData.findUserName;

        } else {
          send_msg.mcode = this.code;
          send_msg.mobile = this.getOneData.findUserName
        }

        lh_http('post', "findpwd2", send_msg).done(res => {
          //console.log(res);
          if (res.status) {
            cookie().set("useruuid", res.data);
            this.$router.push({
              path: '/findpassword/resetpassword'
            })
          } else {
            alert(res.data);
          }
        })
      },
      sendSMSCode() {
        if (this.code_tag < 60) return;

        let send_msg = {
          type: 'findPwd'
        };

        if (this.getOneData.type === 'email') {
          send_msg.email = this.getOneData.findUserName
        } else {
          send_msg.mobile = this.getOneData.findUserName
        }

        lh_http('post', "sendvcode", send_msg).done(res => {
          if (res.status) {
            this.runcode();
//            alert('请注意查收短信');
          } else {
            alert(res.data);
          }
        })

      },
      verificationCode(type) {
        UserService.verificationCode(this.code_phone);
      },
      runcode() {
        let that = this;
        let run = function () {
          that.code_tag--;
          if (that.code_tag <= 0) {
            clearInterval(timer);
            that.code_tag = 60;
          }
        };
        let timer = setInterval(run, 1000)
      }
    },
    watch: {
      '$refs.unlockref': function (res) {
        //console.log(res);
        this.value = res;
      },
      unlock: function (res) {
        //console.log(res)
      }
    },
  };
</script>

<style lang="scss">
  .verify-identity-phone {
    .button_s {
      background-color: #0093F1 !important;
      color: #ffffff !important;
    }
  }
</style>
