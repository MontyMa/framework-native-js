<template>
  <div class="phone" id="phone">
    <reg-phone1 v-if="regstep == 1"></reg-phone1>
    <reg-phone2 v-if="regstep == 2"></reg-phone2>
    <reg-phone3 v-if="regstep == 3"></reg-phone3>
  </div>
</template>

<script>
  //	import stepThird from './pannel/register-step-third-party'
  //
  //	import registerPhone from './pannel/register-phone'
  //
  //	import registerThird from './pannel/register-third-party'
  import regPhone1 from './pannel/reg-phone-1'
  import regPhone2 from './pannel/reg-phone-2'
  import regPhone3 from './pannel/reg-phone-3'


  export default {
    name: 'phone',
    computed: {},
    data() {
      return {
        title: '',
        regstep: 0
      }
    }, //定义变量
    components: {
      regPhone1,
      regPhone2,
      regPhone3,
//			registerEmail,
//			registerPhone,
//			registerThird,
    }, //注册组件
    methods: { //方法都在这里
    },
    mounted() {
      var that = this;
      this.regstep = this.$route.params.step;
      //获取banner
    },
    watch: {
      '$route' (to, from) {
        // 对路由变化作出响应...
        this.regstep = this.$route.params.step
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .phone {

  }
</style>
