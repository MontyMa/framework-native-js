<template>
  <div class="news">
    <div class="dib">{{title}}</div>
    <ul>
      <li v-for="d in news.list_data">
        <a :class="d.theme" :href="d.url" target="_blank">
          <span>{{d.newcreateTime}}</span>{{d.infoTitle}}
        </a>
      </li>
      <li class="more">
        <a :href="news.more_url">查看更多 >> </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['title', 'news'],
};
</script>

<style lang="scss" rel="stylesheet/scss">
.news-wrapper {
  padding-bottom: 60px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  border-bottom: 1px solid #E6E6E6;
}

.news {
  padding: 0 36px 10px;
  text-align: center;
  &+& {
    border-left: 1px dashed #dbdbdb;
  }
  .dib {
    color: #494949;
    font-size: 18px;
    line-height: 28px;
    margin-bottom: 25px;
    font-weight: normal;
    position: relative;
    text-align: center;
  }
  ul {
    border-top: 1px dashed #f2f2f2;
    padding-top: 18px;
    height: 169px;
    position: relative;
    li {
      line-height: 50px;
    }
    .more {
      bottom: -10px;
      padding-left: 0;
      position: absolute;
      a {
        color: #0093F1;
        font-size: 13px;
      }
    }
  }
  a {
    color: #7c7c7c;
    display: block;
    font-size: 13px;
    line-height: 30px;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &:hover {
      color: #0093F1;
      cursor: pointer;
    }
    &.danger {
      color: #fb6807;
    }
    span {
      color: #cbcbcb;
      font-size: 12px;
      float: right;
    }
  }
}
</style>
