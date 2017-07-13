<template>
  <div class="login" id="login">
    <ion-content>
      <div class="login_img">
        <div class="login_pannel_box">
          <ion-loginpannel></ion-loginpannel>
        </div>
      </div>
      <ion-characteristic></ion-characteristic>
      <ion-footer2></ion-footer2>
    </ion-content>
  </div>
</template>

<script>
  export default {
    name: 'homepage',
    computed: {
      isLogged() {
        return this.$store.getters.isLogged;
      }
    },
    data() {
      return {
        title: ''
      }
    }, //定义变量
    components: {}, //注册组件
    methods: { //方法都在这里
      test: function () {
        this.items.splice(index, 1)
      }
    },
    mounted() {
    },
    watch: {
      '$route' (to, from) {
        //console.log('从' + from.params.id + '到' + to.params.id);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
  .login {
    .login_img {
      position: relative;
      height: 380px;
      background: url(img/login_bg.jpg) no-repeat center center;
    }
    .login_pannel_box {
      position: absolute;
      left: 50%;
      top: 50%;
      -webkit-transform: translate(320px, -50%);
      -moz-transform: translate(320px, -50%);
      -ms-transform: translate(320px, -50%);
      -o-transform: translate(320px, -50%);
      transform: translate(320px, -50%);
      .login_pannel {
        float: none;
        top: 0;
      }
    }
    .footer2, .characteristic_common {
      background-color: #ffffff;
    }
  }
</style>
