<template>
  <div class="safe_setting_list">
    <table class="setting_list">
      <thead>
      <tr>
        <td width="80%">设置内容</td>
        <td width="20%">设置时间</td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in list_data">
        <td>{{item.messageContent}}</td>
        <td>{{item.sendTime}}</td>
      </tr>
      <tr v-if="list_data.length===0">
        <td colspan="2" style="text-align: center">暂无数据</td>
      </tr>
      </tbody>
    </table>
    <div class="pagation_wrap">
      <page v-if="!empty" :totalPages='page_option.totalPages' :totalCount='page_option.totalCount'
            :page='page_option.page' @pagego="getJson" :pageSize="15"></page>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        empty: false,
        page_option: {},
        list_data: [],
        req: {
        	type: '安全'
        }
      }
    },
    methods: {
      getJson(page){
        let setting_history_url = 'messageInfo/messageInfoJsonList';

        lh_http('post', setting_history_url, this.req, page).done(res => {
          if (!res.status) {
            alert("获取数据失败");
            this.empty = true;
            return
          }
          this.list_data = res.data.list.resultList;
          console.log(res.data.list);
          this.empty = false;
          this.page_option = res.data.list
        });
      }
    },
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .safe_setting_list {
    .setting_list {
      width: 100%;
      border-collapse: collapse;
      thead {
        td {
          color: #494949;
        }
      }
      tbody {
        tr:nth-child(2n-1) {
          background-color: #F8F8F8;
        }
      }
      td {
        color: #666;
        font-size: 12px;
        line-height: 40px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        &:first-child {
          padding-left: 20px;
          text-align: left;
        }
        &:last-child {
          padding-right: 20px;
          text-align: right;
        }
      }
    }
    .pagation_wrap{
    	margin-top: 20px;
    }
  }
</style>
