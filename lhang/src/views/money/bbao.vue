<template>
  <div class="policy" id="policy">
    <div class="st_t1">
      安全策略
    </div>
  </div>
</template>

<script>
  export default {
    name: 'policy',
    computed: {},
    data() {
      return {
        title: '',
      }
    }, //定义变量
    components: {}, //注册组件
    methods: { //方法都在这里
    },
    mounted() {
      var that = this;
      //获取banner
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
  .policy {
    text-align: left;
    .st_t1 {
      padding: 15px 20px;
      background: #f4f4f4;
      width: 100%;
      text-align: left;
      font-size: 24px;
    }
  }
</style>
