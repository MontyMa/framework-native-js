<template>
  <div class="bulletin">
    <div class="bul_content">
      <!--暂无数据组件-->
      <no-data v-if="list_data.length===0"></no-data>
      <ul class="content_group" v-else v-for="item in list_data">
        <li class="link_box"><a :href="'#/help/bulletin-page?pid='+item.id"></a></li>
        <li class="title">{{item.infoTitle}}</li>
        <li class="paragraph">{{item.infoBrief}}</li>
        <li class="time">{{item.createTime}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery';
  export default{
    name: 'bulletin-page',
    data(){
      return {
        list_data: [],
      }
    },
    methods: {
      runRequest(){
        lh_http('get', 'info/typeList', {type: '网站公告'}).done(res => {
          if (!res.status) {
            this.list_data = [];
            return;
          }

          let contents_obj = {};
          let list = res.data.list.resultList;

          list.forEach(ele => {
            contents_obj[ele.id] = ele.content
          });

          this.list_data = list;
          sessionStorage.setItem('bulletin', JSON.stringify(contents_obj));
        })
      }
    },
    beforeMount(){
      this.runRequest();
    }

  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .bulletin {
    text-align: left;
    .bul_content {
      margin-bottom: 30px;
    }
    .link_box a {
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0);
    }
    .content_group {
      border-bottom: 1px solid #D7D7D7;
      padding-bottom: 10px;
      position: relative;
      &:not(:last-child) {
        margin-bottom: 20px;
      }
      &:hover {
        .title {
          color: #0093F1;
        }
      }

      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      .title {
        font-size: 18px;
        color: #494949;
        line-height: 40px;
        cursor: pointer;
      }
      .paragraph {
        font-size: 12px;
        color: #666666;
        line-height: 20px;
        text-align: justify;
      }
      .time {
        text-align: right;
        font-size: 12px;
        color: #999999;
        margin-top: 8px;
      }
    }
  }

</style>
