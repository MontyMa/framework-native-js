<template>
  <!--面包屑-->
  <div class="breadcrumb_trail">
    <div class="bre_list_box">
      <router-link class='list' to='/'>首页</router-link>
      <router-link class='list' v-for="item in list_data" :to='item.path'>{{item.field}}</router-link>
    </div>
  </div>
</template>
<style lang="scss" rel="stylesheet/scss">
  .breadcrumb_trail {
    text-align: left;
    padding: 14px 0;
    /*padding: 40px 0 10px 0;*/
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    .bre_list_box .list {
      font-size: 14px;
      display: inline-block;
      vertical-align: middle;
      color: #494949;
      margin-right: 5px;
      &:last-child {
        color: #0093f1;
      }
      &:not(:last-child):after {
        content: '>';
        display: inline-block;
        vertical-align: middle;
        margin-left: 5px;
      }
    }
  }
</style>
<script>
  //字典
  import dictionary from './breadcrumb_trail.js';
  export default{
    data(){
      return {
        list_data: '',
        hash: this.$route.path
      };
    },
    methods: {
      getHash(path){
        let _path = `#${path}`;
        if (dictionary[_path]) {
          this.list_data = dictionary[_path]
        }
      }
    },
    beforeMount(){
      this.getHash(this.hash);
    },
    watch: {
      '$route'(val){
        this.getHash(val.path)
      }
    }
  };
</script>
