<template>
  <div class="about_lhang">
    <!--内容-->
    <ion-content class="content">
      <!--主体-->
      <ion-content12>
        <!--面包屑-->
        <breadcrumb-trail></breadcrumb-trail>
        <div class="about_content">

          <!--导航-->
          <about-nav></about-nav>

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
  .about_lhang {
    .about_content {
      margin-bottom: 80px;
      position: relative;
      height: 100%;
    }
    /*右面区域*/
    .cont_right {
      background-color: #ffffff;
      margin-left: 240px;
      padding: 20px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
    }
  }
</style>
<script>
  //导航
  import aboutNav from './pannel/about_nav.vue';
  //面包屑
  import breadcrumbTrail from '../../components/breadcrumb_trail/breadcrumb_trail.vue';

  export default{
    name: 'aboutLhang',
    methods: {},
    components: {
      aboutNav,
      breadcrumbTrail
    }
  }
</script>
