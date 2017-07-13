<template>
  <div class="header_common">
    <div v-if="navigation"
         id="content1">
      <content1></content1>
    </div>
    <div v-if="navigation"
         id="content2">
      <content2></content2>
    </div>
    <div v-if="!navigation"
         id="content3">
      <content3></content3>
    </div>
  </div>
</template>

<script>
import store from '../../vuex/store'
import content1 from './pannel/content1'
import content2 from './pannel/content2'
import content3 from './pannel/content3'

export default {
  name: 'header',
  data() {
    return {
      navigation: true,
    }
  },
  components: {
    content1,
    content2,
    content3,
  }, //这里注册
  methods: {
    get_navigation() {
      var path = this.$route.path.split('/')[1];
      switch (path) {
        case 'reg':
          this.navigation = false;
          break;
        case 'setpassword':
          this.navigation = false;
          break;
        case 'findpassword':
          this.navigation = false;
          break;
        case 'login':
          this.navigation = false;
          break;
        default:
          this.navigation = true;
          break;
      }
    }
  },
  mounted() {
    this.get_navigation();
  },
  watch: {
    '$route'(to, from) {
      // 对路由变化作出响应...
      this.get_navigation();
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
.header_common {
  width: 100%;
  z-index: 10;
  .menu_pannel {
    width: 678px;
    height: 226px;
    position: absolute;
    right: 0;
    z-index: 10;
    text-align: left;
    background: #283138;
    margin-top: -1px;
    .column_4 {
      width: 25%;
      float: left;
      padding: 0 40px;
      .col_title {
        font-size: 18px;
        border-bottom: 1px white solid;
        padding: 4px 0px;
        margin-bottom: 10px;
        .a_title {
          font-size: 18px;
        }
      }
      a {
        color: white;
        cursor: pointer;
        font-size: 14px;
      }
      .col_row {
        padding: 4px 0;
      }
    }
  }
}
</style>
