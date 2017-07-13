<template>
  <div class="about_nav">
    <!--<div class="title_main">关于链行</div>-->
    <ul class="about_nav_group">
      <li class="group">
        <a :class="{'active': isPath === '/about/synopsis'}" href="#/about/synopsis">关于链行</a>
      </li>
      <li class="group">
        <a :class="{'active':isPath === '/about/landmark'}" href="#/about/landmark">链行大事记</a>
      </li>
      <li class="group">
        <a :class="{'active':isPath==='/about/team'}" href="#/about/team">链行团队</a>
      </li>
      <!--<li class="group">-->
      <!--<a :class="{'active':isPath ==='/about/news'}" href="#/about/news">媒体报道</a>-->
      <!--</li>-->
      <!--<li class="group">-->
      <!--<a :class="{'active':isPath ==='/help/pact'}" href="#/help/pact">加入链行</a>-->
      <!--</li>-->
      <li class="group">
        <a :class="{'active':isPath ==='/about/contact-us'}" href="#/about/contact-us">联系我们</a>
      </li>
    </ul>
  </div>
</template>
<style lang="scss" rel="stylesheet/scss">
  .about_nav {
    float: left;
    width: 200px;
    left: 0;
    top: 0;
    background-color: #ffffff;
    padding: 10px 0;
    box-sizing: border-box;

    /*border: 2px solid #E1E1E1;*/
    /*.title_main {*/
    /*color: #494949;*/
    /*font-size: 20px;*/
    /*line-height: 40px;*/
    /*border-bottom: 1px solid #494949;*/
    /*}*/

    .about_nav_group {
      text-align: left;
      /*padding: 40px 0 30px 46px;*/
      .group {
        font-size: 14px;
        line-height: 40px;
        a {
          color: #494949;
          display: block;
          width: 100%;
          height: 100%;
          padding-left: 50px;
          box-sizing: border-box;
          &.active {
            font-weight: 600;
            color: #0093F1;
            background-color: #F5F7FA;
          }
        }
        cursor: pointer;
        &:not(:last-child) {
          /*margin-bottom: 35px;*/
        }
      }
    }

  }
</style>
<script>
  export default{
    name: 'about_nav',
    computed: {
      isPath(){
        return this.$route.path;
      }
    },
    methods: {
    }
  }
</script>



