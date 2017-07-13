<template>
  <div class="help_area">
    <!--内容-->
    <ion-content class="content">
      <!--主体-->
      <ion-content12>
        <!--面包屑-->
        <breadcrumb-trail></breadcrumb-trail>
        <div class="help_content g_c_f">

          <!--导航-->
          <help-nav></help-nav>

          <div class="cont_right">
            <router-view></router-view>
          </div>
        </div>
      </ion-content12>
    </ion-content>

    <!--页尾-->
    <ion-footer></ion-footer>
  </div>
</template>
<style lang="scss" rel="stylesheet/scss">
  .help_area {
    .content {
      padding-bottom: 80px;
    }
    .help_content {
      position: relative;
      height: 100%;
    }
    /*右面区域*/
    .cont_right {
      background-color: #ffffff;
      padding: 20px 25px;
      min-height: 1557px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      margin-left: 240px;
    }
  }
</style>
<script>
  //帮助中心导航
  import helpNav from './pannel/help_nav/help_nav.vue';
  let help_config = {
    name: 'help',
    computed: {
      isPath(){
        return this.$route.path;
      }
    },
    data(){
      return {};
    },
    components: {
      helpNav, //帮助中心导航
    }
  };

  export default help_config;
</script>
