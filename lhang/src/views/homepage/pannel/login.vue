<template>
  <div class="homepage" id="home">
    <!--
            作者：846966684@qq.com
            时间：2017-02-21
            描述：通用头部
            通过参数，可以控制不同的状态
        -->
    <ion-header>
    </ion-header>
    <!--
            作者：846966684@qq.com
            时间：2017-02-21
            描述：通用全局容器--全屏容器
        -->
    <ion-content>
      <!--
          作者：846966684@qq.com
          时间：2017-02-21
          描述：通用banner插件
      -->
      <swiper-pannel type="login"></swiper-pannel>


      <!--
                作者：846966684@qq.com
                时间：2017-02-21
                描述：特点组件
            -->
      <ion-characteristic title="值得投资者信赖的专业平台"></ion-characteristic>


    </ion-content>
    <!--
        作者：846966684@qq.com
        时间：2017-02-21
        描述：通用footer
    -->
    <ion-footer>
    </ion-footer>

  </div>
</template>

<script>
  import swiperPannel from './swiper_pannel/swiper_pannel'

  export default {
    name: 'homepage',
    computed: {
      isLogged () {
        return this.$store.getters.isLogged;
      }
    },
    data() {
      return {
        title: '',
      }
    }, //定义变量
    components: {
      swiperPannel,
    }, //注册组件
    methods: { //方法都在这里
      test: function () {
        this.items.splice(index, 1)
      },
    },
    mounted() {
      var that = this;
      //获取banner
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .homepage {

  }
</style>
