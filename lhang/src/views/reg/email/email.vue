<template>
  <div class="email" id="email">
    <reg-email1 v-if="regstep == 1"></reg-email1>
    <reg-email2 v-if="regstep == 2"></reg-email2>
    <reg-email3 v-if="regstep == 3"></reg-email3>
  </div>

</template>

<script>
  //	import stepThird from './pannel/register-step-third-party'
  //
  //	import registerPhone from './pannel/register-phone'
  //
  //	import registerThird from './pannel/register-third-party'

  import regEmail1 from './pannel/reg-email-1'
  import regEmail2 from './pannel/reg-email-2'
  import regEmail3 from './pannel/reg-email-3'


  export default {
    name: 'email',
    computed: {},
    data() {
      return {
        title: '',
        regstep: 0
      }
    }, //定义变量
    components: {
      regEmail1,
      regEmail2,
      regEmail3
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
  .email {

  }
</style>
