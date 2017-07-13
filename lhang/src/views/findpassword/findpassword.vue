<template>
  <div class="findpassword" id="findpassword">
    <ion-content>
      <div class="custormer_wrap">
        <div class="auth_padding">
          <verify-account v-if="find_type === 'verifyaccount'"></verify-account>
          <verify-identity-phone v-if="find_type === 'verifyidentity_phone'"></verify-identity-phone>
          <reset-password v-if="find_type === 'resetpassword'"></reset-password>
          <find-complate v-if="find_type === 'complate'"></find-complate>
        </div>
        <ion-characteristic></ion-characteristic>
      </div>
    </ion-content>
    <ion-footer2></ion-footer2>
  </div>
</template>

<script>
  import verifyAccount from './pannel/verify-account'
  import verifyIdentityPhone from './pannel/verify-identity-phone'
  import resetPassword from './pannel/reset-password';
  import findComplate from './pannel/find_password_complate.vue';


  export default {
    name: 'findpassword',
    computed: {},
    data() {
      return {
        title: '',
        find_type: ''
      }
    }, //定义变量
    components: {
      verifyAccount,
      verifyIdentityPhone,
      resetPassword,
      findComplate
    }, //注册组件
    methods: { //方法都在这里
    },
    mounted() {
      this.find_type = this.$route.params.type;
    },
    watch: {
      '$route' (to, from) {
        // 对路由变化作出响应...
        this.find_type = this.$route.params.type
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss">
  .findpassword {
    .custormer_wrap {
      width: 1200px;
      margin: 0 auto;
      background-color: #ffffff;
      margin-top: 30px;
      padding-top: 40px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
    }
    a {
      color: #0093F1;
    }
    .auth_padding {
      /*border: 1px solid #EFEFEF;*/
      margin: 70px auto;
      width: 832px;
      background-color: #ffffff;
    }

    .table_1_5 {
      position: relative;
      left: 50%;
      transform: translate(-50%, 0%);
      -webkit-transform: translate(-50%, 0%);
      -moz-transform: translate(-50%, 0%);
      -ms-transform: translate(-50%, 0%);
      -o-transform: translate(-50%, 0%);
      margin: 35px 0; /* change */
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      tr {
        td {
          margin: 10px;
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
    .next {
      margin-top: 40px;
    }

  }
</style>
