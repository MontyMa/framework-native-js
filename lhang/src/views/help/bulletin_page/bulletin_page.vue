<template>
  <div class="bulletin_page">
    <div class="bul_tit_box">
      <router-link class="bul_title" to="/help/bulletin">返回官方公告</router-link>
    </div>
    <div class="page_content" v-html="contents"></div>
  </div>
</template>

<script>
  export default{
    name: 'bulletin-page',
    data(){
      return {
        contents: '请稍候...'
      }
    },
    computed: {
      getQueryPid(){
        return this.$route.query.pid;
      },
      getBulletinPage(){
        let bulletin = JSON.parse(sessionStorage.getItem('bulletin'));
        return bulletin ? bulletin[this.getQueryPid] : lh_http('get', 'info/typeList', {type: '网站公告'});
      }
    },
    methods: {
      getPageDom(html){
        return html
          .replace(html ? /&(?!#?\w+;)/g : /&/g, '&amp;')
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&quot;/g, "\"")
          .replace(/&#39;/g, "\'");
      },
      renderDom(){
        if (!this.getBulletinPage.done) {
          this.contents = this.getPageDom(this.getBulletinPage);
          return
        }

        this.getBulletinPage.done(res => {
          if (!res.status) {
            alert(res.data);
            return
          }
          let res_data_list = res.data.list.resultList;
//          console.log(res_data_list);
          res_data_list.some(elem => {
            if (parseInt(elem.id) === parseInt(this.getQueryPid)) {
              this.contents = this.getPageDom(elem.content);
              return true
            }
          })
        });
      }
    },
    beforeMount(){
      this.renderDom();
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .bulletin_page {
    text-align: left;
    .bul_tit_box {
      padding-left: 20px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      background-color: #F4F4F4;
      &:hover {
        .bul_title {
          color: #0093F1;
          &:before {
            border-color: #0093F1;
          }
        }
      }
    }
    .bul_title {
      font-size: 16px;
      color: #1B1E23;
      line-height: 40px;
      display: inline-block;
      vertical-align: middle;
      cursor: pointer;
      &:before {
        content: '';
        border-left: 1px solid #1B1E23;
        border-bottom: 1px solid #1B1E23;
        width: 9px;
        height: 9px;
        margin-right: 10px;
        display: inline-block;
        vertical-align: middle;
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        transform: rotate(45deg);
      }
    }
    .page_content {
      margin-top: 37px;
    }
    /*.page_content {*/
    /*margin-top: 37px;*/
    /*h3 {*/
    /*font-size: 18px;*/
    /*color: #494949;*/
    /*font-weight: normal;*/
    /*text-align: center;*/
    /*line-height: 40px;*/
    /*}*/
    /*p {*/
    /*font-size: 12px;*/
    /*color: #666666;*/
    /*text-align: justify;*/
    /*text-indent: 2em;*/
    /*padding: 10px 0 47px 0;*/
    /*-webkit-box-sizing: border-box;*/
    /*-moz-box-sizing: border-box;*/
    /*box-sizing: border-box;*/
    /*line-height: 20px;*/
    /*}*/
    /*ul {*/
    /*text-align: right;*/
    /*li {*/
    /*font-size: 12px;*/
    /*color: #999999;*/
    /*line-height: 20px;*/
    /*}*/
    /*}*/
    /*}*/
  }
</style>


