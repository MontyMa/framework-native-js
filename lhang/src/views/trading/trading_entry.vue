<template>
  <div class="trading" id="trading">
    <!--新手指南-->
    <user-title></user-title>
    <div class="g_center">
      <!--内容-->
      <div class="trading_content">
        <router-view></router-view>
        <!--切换-->
        <alternately></alternately>
      </div>
    </div>
    <ion-footer>
    </ion-footer>
  </div>
</template>
<script>
  import alternately from './modules/alternately.vue';
  export default {
    name: 'trading',
    computed: {},
    data() {
      return {}
    },
    components: {alternately},
    methods: {},
    mounted() {
    },
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .trading {
    .trading_content {
      margin-top: 20px;
      position: relative;
    }
    /*width: 810px;*/
  }
</style>
