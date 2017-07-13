<template>
  <div class="third" id="third">
    <step :step="1"></step>
    <reg-third1 v-if="thirdstep == 1"></reg-third1>
    <reg-third2 v-if="thirdstep == 2"></reg-third2>
  </div>
</template>

<script>
  import step from './pannel/step/step'
  import regThird1 from './pannel/reg-third-1'
  import regThird2 from './pannel/reg-third-2'

  export default {
    name: 'third',
    computed: {},
    data() {
      return {
        title: '',
        thirdstep: 0
      }
    }, //定义变量
    components: {
      step,
      regThird1,
      regThird2
    }, //注册组件
    methods: { //方法都在这里
    },
    mounted() {
      var that = this;
      this.thirdstep = this.$route.params.step;
      //第三方
    },
    watch: {
      '$route' (to, from) {
        // 对路由变化作出响应...
        this.thirdstep = this.$route.params.step
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .third {
  }
</style>
