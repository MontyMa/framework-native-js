<template>
  <div class="homepage" id="home">
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
      <swiper-pannel type="home"></swiper-pannel>
      <!--
                          作者：846966684@qq.com
                          时间：2017-02-21
                          描述：最新新闻 轮播
                      -->
      <news-pannel></news-pannel>
      <!--
                          作者：846966684@qq.com
                          时间：2017-02-21
                          描述：行情信息
                      -->
      <market-information></market-information>
      <!--
                          作者：846966684@qq.com
                          时间：2017-02-21
                          描述：更多数字资产
                      -->
      <more-type></more-type>

      <!--
                          作者：846966684@qq.com
                          时间：2017-02-21
                          描述：特点组件
                      -->
      <ion-characteristic class="homepage_characteristic" title="值得投资者信赖的专业平台"></ion-characteristic>
      <!--
                          作者：846966684@qq.com
                          时间：2017-02-21
                          描述：lhang 最新动态
                      -->
      <lhang-dynamics></lhang-dynamics>
      <!--
                          作者：846966684@qq.com
                          时间：2017-02-21
                          描述：累计交易额
                      -->
      <count-board></count-board>

      <!--
                  作者：846966684@qq.com
                  时间：2017-02-21
                  描述：通用footer
              -->
      <ion-footer></ion-footer>
    </ion-content>
  </div>
</template>

<script>
  import swiperPannel from './pannel/swiper_pannel/swiper_pannel'
  import newsPannel from './pannel/latest_news/latest_news.vue'
  import marketInformation from './pannel/market_information'
  import moreType from './pannel/more_type/more_type'
  import lhangDynamics from './pannel/lhang_dynamics'
  import countBoard from './pannel/count_board/count_board';


  export default {
    name: 'homepage',
    computed: {
      isLogged() {
        return this.$store.getters.isLogged;
      },
    },
    data() {
      return {
        title: '',
      }
    }, //定义变量
    components: {
      swiperPannel,
      newsPannel,
      marketInformation,
      moreType,
      lhangDynamics,
      countBoard,
    }, //注册组件
    methods: { //方法都在这里
      test: function () {
        this.items.splice(index, 1)
      },
    },
    mounted() {

    },
    watch: {
      '$route'(to, from) {
        //console.log('从' + from.params.id + '到' + to.params.id);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped rel="stylesheet/scss">
  .homepage {
    .content12_common {
      position: relative;
    }
    // hr {
    /*border-bottom: #e6e6e6 solid 1px;*/
    // }
  }
</style>
