<template>
  <div class="reg" id="reg">
    <ion-content>

      <div class="custormer_wrap">
        <div class="auth_padding">
          <phone v-if="'phone' == reg_type"></phone>
          <email v-if="'email' == reg_type"></email>
          <third v-if="'third' == reg_type"></third>
          <!--<register-step v-if="register_type != 'thirdParty'" :step="1" :type="register_type"></register-step>
                  <step-third v-if="register_type == 'thirdParty'" :step="2"></step-third>
                  <register-email v-if="register_type === 'email'"></register-email>
                  <register-phone v-if="register_type === 'phone'"></register-phone>
                  <register-third v-if="register_type === 'thirdParty'"></register-third>-->
        </div>
        <ion-characteristic></ion-characteristic>
      </div>

    </ion-content>
    <ion-footer2></ion-footer2>
  </div>

</template>

<script>
  /*
   *	import registerStep from './pannel/register-step'
   import stepThird from './pannel/register-step-third-party'

   import registerEmail from './pannel/register-email'
   import registerPhone from './pannel/register-phone'

   import registerThird from './pannel/register-third-party'

   * */

  import phone from './phone/phone'
  import email from './email/email'
  import third from './third/third'

  export default {
    name: 'regeist',
    computed: {},
    data() {
      return {
        title: '',
        reg_type: ''
      }
    }, //定义变量
    components: {
      //			registerStep,
      phone,
      email,
      third,
      //			registerEmail,
      //			registerPhone,
      //			registerThird,
    }, //注册组件
    methods: { //方法都在这里
    },
    mounted() {
      this.reg_type = this.$route.params.type;


      //第三方登录
//			lh_http('post', "thirdLogin", {
//				code: '011pc2a91QnsTR1e6S791moR991pc2aq',
//				state: '8574fd98-c1f4-4774-a304-96247b3cce2d'
//			}).done(function(res) {
//				if(res.status) {
//					//console.log(res)
//						//						that.$router.push({
//						//							path: '/reg/phone/2'
//						//						})
//				} else {
//					alert(res.data);
//				}
//			})


    },
    watch: {
      '$route' (to, from) {
        // 对路由变化作出响应...
        this.reg_type = this.$route.params.type
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .reg {
    .custormer_wrap {
      width: 1200px;
      margin: 0 auto;
      background-color: #ffffff;
    }

    a {
      color: #0093F1;
    }

    .auth_padding {
      margin: 70px auto;
      width: 832px;
      background-color: #ffffff;
      padding: 70px 0 50px 0;
    }

    .table_1_5 {
      position: relative;
      left: 50%;
      transform: translate(-50%, 0%);
      -webkit-transform: translate(-50%, 0%);
      -moz-transform: translate(-50%, 0%);
      -ms-transform: translate(-50%, 0%);
      -o-transform: translate(-50%, 0%);
      margin: 45px 0 75px -38px;

      tr {

        td {
          margin: 20px;
          text-align: left;

          .text {
            height: 45px;
            width: 412px;
            padding: 0 20px;
            border-radius: 2px;
            border: 1px solid #CBCBCB;
            font-size: 14px;
          }

          .send {
            width: 88px;
            background: #0093F1;
            height: 45px;
            top: 1px;
            position: relative;
            border-radius: 2px;
            font-size: 14px;
            margin-left: 10px;
            cursor: pointer;
          }

          .send_h {
            background: silver;
            cursor: auto;
          }

        }
        td:first-child {
          text-align: right;
          padding-right: 35px;
        }

        button {
          width: 412px;
          height: 50px;
          border: none;
          background: #91CCF1;
          color: white;
          font-size: 16px;
        }

        .button_s {
          background: #0093F1;
        }

      }
      .tr1 {

        td:first-child {
          color: #0093F1;
          padding-right: 0;
        }

      }
      .tr2 {
        height: 70px;
        line-height: 70px;
      }

    }
  }
</style>
