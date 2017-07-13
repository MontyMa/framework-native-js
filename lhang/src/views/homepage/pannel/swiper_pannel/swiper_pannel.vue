<template>
  <div class="swiper_pannel">
    <swiper v-if="type == 'home'" class="my-swipe" :options="swiperOption">
      <swiper-slide class="silde" v-for="banner in banners">
        <a v-bind:href="banner.adUrl===''?'javascript:void(0)':banner.adUrl" target="view_window">
          <img :src='banner.adPic'
               placeholder="http://static.m.maizuo.com/v4/static/app/asset/3d2cdb3bd9a23609aa2d84e7c2bfd035.png"/>
        </a>
      </swiper-slide>
      <div class="swiper-pagination swiper-pagination-bullets" slot="pagination"></div>
      <!--<div class="swiper-button-prev" slot="button-prev"></div>-->
      <!--<div class="swiper-button-next" slot="button-next"></div>-->
    </swiper>
    <div v-if="type == 'login'">
      <img class="login_img" src='img/banner.png'/>
    </div>
    <div class="login_pannel_">
      <ion-loginpannel class="login_pannel"></ion-loginpannel>
    </div>
  </div>
</template>

<script>
  import {
    swiper,
    swiperSlide
  } from 'vue-awesome-swiper'
  export default {
    name: 'swiper_pannel',
    data() {
      return {
        banners: [],
        swiperOption: {
//          nextButton: '.swiper-button-next',
//          prevButton: '.swiper-button-prev',
//          paginationType:'custom',
          pagination: '.swiper-pagination',
          autoplayDisableOnInteraction: false,
          paginationClickable: true,
          spaceBetween: 30,
          autoplay: 3000,
          width: 3000,
          paginationBulletRender(swiper, index, className) {
            return `<span class="${className} swiper-pagination-bullet-custom"></span>`
          }
        }
      }
    },
    components: {
      swiper,
      swiperSlide,
    }, //这里注册
    props: ['type'],
    methods: {},
    mounted() {
      let that = this;
      //获取banner
      lh_http('post', "showing/Banners", {type: 'pc'}).done(function (res) {
        if (res.status) {
          that.banners = res.data.banners;
        }
      })
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
  .swiper-pagination-bullet-custom.swiper-pagination-bullet {
    width: 10px;
    height: 10px;
    opacity: 1;
    cursor: pointer;
    background: rgba(255, 255, 255, 0.9);
  }

  .swiper-pagination-bullet-custom.swiper-pagination-bullet-active {
    transition: 300ms;
    background: #ffffff;
    width: 30px;
    border-radius: 5px;
  }

  .swiper_pannel {
    position: relative;
    z-index: 0;
    .swiper-wrapper {
      width: 3000px;
      position: absolute;
      left: 50%;
      margin-left: -1500px;
    }
    .my-swipe {
      img {
        min-height: 380px;
        width: auto;
      }
    }
    .login_img {
      height: 380px;
      width: 100%;
    }
    .swiper-container {
      position: relative;
      height: 380px;
      z-index: -1;
    }
    .login_pannel_ {
      position: absolute;
      top: 50%;
      left: 50%;
      -webkit-transform: translate(320px, -50%);
      -moz-transform: translate(320px, -50%);
      -ms-transform: translate(320px, -50%);
      -o-transform: translate(320px, -50%);
      transform: translate(320px, -50%);
    }
  }
</style>
