<template>
  <div class="content3">
    <ion-content12>

      <div class="lay_out group_1">
        <div class="img_box">
          <a href="/"></a>
        </div>
        <div class="page_title">{{navigation_title}}</div>
      </div>

      <div class="lay_out group_2"><a href="/">返回首页</a></div>
      <!--垂直居中使用，勿删-->
      <div class="v_center"></div>
    </ion-content12>
  </div>
</template>

<script>
  import store from '../../../vuex/store'
  export default {
    name: 'header',
    data() {
      return {
        navigation_title: '',
      }
    },
    computed: {},
    components: {}, //这里注册
    mounted() {
      this.get_navigation();
    },
    methods: {
      get_navigation() {
        let path = this.$route.path.split('/')[1];
        switch (path) {
          case 'reg':
            this.navigation_title = '用户注册';
            break;
          case 'setpassword':
            this.navigation_title = '用户注册';
            break;
          case 'findpassword':
            this.navigation_title = '找回密码';
            break;
          case 'login':
            this.navigation_title = '用户登录';
            break;
          default:
            this.navigation_title = '';
            break;
        }
      }
    },
    watch: {
      '$route' (to, from) {
        // 对路由变化作出响应...
        this.get_navigation();
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .content3 {
    height: 70px;
    background: white;
    z-index: 0;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .11);
    font-size: 0;
    .v_center {
      height: 100%;
    }
    .lay_out, .v_center {
      display: inline-block;
      vertical-align: middle;
    }
    .lay_out {
      color: #1B1E23;
      width: 50%;
    }
    .group_1 {
      text-align: left;
      font-size: 18px;
      .img_box {
        width: 114px;
        height: 70px;
        display: inline-block;
        vertical-align: middle;
        background: url('./img/lhang_logo.svg') no-repeat center center;
        a {
          display: inline-block;
          width: 100%;
          height: 100%;
        }
      }
      .page_title {
        display: inline-block;
        vertical-align: middle;
        margin-left: 127px;
        padding: 10px 26px;
        border-left: 1px solid #C1C1C1;
      }
    }
    .group_2 {
      text-align: right;
      font-size: 14px;
      a {
        color: inherit;
      }
    }
  }
</style>
