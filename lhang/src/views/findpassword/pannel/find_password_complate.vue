<template>
  <div class="reg-phone-3">
    <step :step="4"></step>
    <div class="tip">
      修改密码成功，<label>{{time}}</label><label>s</label>后自动返回登录页面
    </div>
    <button class="gologin" v-on:click="gologin()">立即登录</button>
  </div>
</template>

<script>
  import step from './step/step'
  export default {
    name: 'reg-phone-3',
    components: {
      step,
    },
    data() {
      return {
        step: 3,
        time: 3,
        timer: null,
      };
    },
    computed: {},
    methods: {
      gologin: function () {
        this.$router.push({
          path: '/login'
        })
      }
    },
    mounted() {
      var that = this;
      this.timer = setInterval(function () {
        that.time--;
        if (that.time == 0) {
          clearInterval(that.timer);
          if (that.$route.path == '/findpassword/complate') {
            that.$router.push({
              path: '/login'
            })
          }
        }
      }, 1000)
    },
    beforeRouteLeave(to, from, next) {
      clearInterval(this.timer);
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .reg-phone-3 {
    .tip {
      padding: 65px 0px;
      label {
        color: #0093F1;
      }
    }
    .gologin {
      width: 412px;
      height: 50px;
      background: #0093F1;
      font-size: 18px;
      color: white;
      margin-bottom: 100px;
    }
  }
</style>
