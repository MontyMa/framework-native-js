<template>
  <div class="help_nav">
    <ul class="help_nav_group">
      <li class="group" v-for="item in nav">
        <div class="group_title">{{item.title}}</div>
        <ul class="group_ul" v-for="list in item.list">
          <li :class="{active_li:isPath === list.url}">
            <a :target="list._target?'_blank':null" :href="list.url">{{list.txt}}</a></li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
  import nav_data from './help_nav.js';
  export default{
    name: 'help_nav',
    data(){
      return {
        nav: nav_data
      }
    },
    computed: {
      isPath(){
        return `#${this.$route.path}`;
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .help_nav {
    float: left;
    width: 200px;
    left: 0;
    top: 0;
    padding-top: 10px;
    padding-bottom: 20px;
    background-color: #ffffff;

    .help_nav_group {
      text-align: left;
      .group {
        &:not(:last-child) {
          border-bottom: 1px solid #d7d7d7;
        }
        padding: 20px 0;
      }
      .group, .group_tit {
        font-size: 16px;
        a, .group_title {
          color: #494949;
          display: inline-block;
          padding-left: 50px;
          width: 100%;
          line-height: 40px;
          height: 100%;
          &.active {
            font-weight: 600;
            background-color: #F5F7FA;
            color: #0093F1;
          }
        }
        cursor: pointer;
      }
      .group_ul {
        li {
          a {
            color: #666666;
          }
          &.active_li {
            color: #0093F1;
            a {
              color: #0093F1;
              background-color: #F5F7FA;
              font-weight: 600;
            }
          }
          cursor: pointer;
          line-height: 25px;
          font-size: 14px;
          color: #666666;
        }
      }
    }
  }
</style>




