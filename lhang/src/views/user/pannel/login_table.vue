<template>
  <div class="login_table" id="login_table">
    <table class="table">
      <thead>
      <tr>
        <td>登录时间</td>
        <td>登录IP</td>
        <td>所在地</td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in listData">
        <td>{{item.loginTime}}</td>
        <td>{{item.loginIp}}</td>
        <td>{{item.location}}</td>
      </tr>
      <tr v-if="listData.length===0">
        <td colspan="3" style="text-align: center">暂无数据</td>
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
  export default {
    name: 'login_table',
    computed: {},
    data() {
      return {
        empty: false,
        listData: [],
        page_option: {}
      }
    }, //定义变量
    components: {}, //注册组件
    methods: { //方法都在这里
      getJson(page){
        let login_history_url = 'loginlog/loginlist';
        page.pageSize = 15;
        lh_http('post', login_history_url, page).done(res => {
          if (!res.status) {
            alert("获取数据失败");
            this.empty = true;
            return
          }
          this.listData = res.data.list.resultList;
          this.empty = false;
          this.page_option = res.data.list
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .login_table {
    text-align: center;
    .pagation_wrap {
      padding: 20px 0;
    }
    .table {
      width: 910px;
      font-size: 14px;
      color: #999;
      font-weight: normal;
      border-collapse: collapse;
      td:first-child {
        text-align: left;
      }
      td:last-child {
        text-align: right;
      }
      td {
        width: 33.33333%;
        font-size: 12px;
        line-height: 20px;
        padding: 10px 20px;
        display: table-cell;
      }
      thead {
        td {
          color: #494949;
        }
      }

      tbody {
        tr:nth-child(odd) {
          background: #f8f8f8;
        }
      }
    }
  }
</style>
