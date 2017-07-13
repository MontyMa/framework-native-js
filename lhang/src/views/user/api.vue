<template>
  <div>
    <div v-if="clickable">
      <api-created v-if="showItem==='created'" :parentGetJson="getJson"></api-created>
      <div class="api" id="api" v-if="showItem==='index'">
        <!--<div class="st_t1">我的API</div>-->
        <div class="api_int">
          <p>链行为您提供了强大的API，您可以根据自身需求建立不同权限的API，并利用自动交易或者提现。<br/> API的交易权限让您可以快速的获取当前市场最新行情及时的下单交易、查询自己可用和冻结金额、查询自己当前
            <br/> 尚未成交的挂单、买进或卖出、撤单。
            <br/> 每个普通用户最多只能创建10个秘钥对。
          </p>
          <div class="btn_api">
            <div class="btn" @click="openPage('created')">创建API</div>
          </div>
        </div>
        <div class="api_link">详情请见
          <a href="/api/rest_api.html">API文档</a>
        </div>
        <div class="api_table">
          <div class="table_title">
            <div class="title_p">已申请API接口</div>
          </div>
          <table class="table">
            <thead>
            <tr>
              <td>备注名称</td>
              <td>APIKey</td>
              <td>权限</td>
              <td>创建时间</td>
              <td>操作</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in list_data">
              <td>{{item.description}}</td>
              <td>{{item.apiKey}}</td>
              <td>{{item.authorityNames}}</td>
              <td>{{item.createTime}}</td>
              <td class="operate">
                <span class="view" @click="openWindow(item.id,'view')">查看</span>
                <span class="del" @click="openWindow(item.id,'del')">删除</span>
              </td>
            </tr>
            </tbody>
          </table>
          <div class="null_table" v-if="list_data.length===0">暂未创建API</div>
        </div>
      </div>
      <alert-box v-if="isAlert" :productData="alert_msg" :parentGetJson="getJson"
                 @window_status="getCloseStatus"></alert-box>
    </div>
    <div v-else>
      <pre-register4></pre-register4>
    </div>
  </div>
</template>

<script>
  import apiCreated from './pannel/api_created.vue';
  import alertBox from './pannel/api_alert.vue';
  import preRegister4 from '../../components/checkAuth/preRegister4'

  export default {
    name: 'api',
    data() {
      return {
        title: '',
        showItem: '',
        list_data: [],
        isAlert: false,
        alert_msg: {
          id: '',
          operating: ''
        },
        clickable: false,

      }
    },
    computed: {
      user() {
        return this.$store.getters.getUser;
      },
    },
    components: {
      apiCreated,
      alertBox,
      preRegister4
    },
    methods: {
      //        关闭窗口
      getCloseStatus(val) {
        this.isAlert = val;
      },
      openWindow(id, type) {
        this.isAlert = true;
        this.alert_msg.id = id;
        this.alert_msg.operating = type;
      },
      openPage(item) {
        this.$router.push({
          path: `/user/api/${item}`
        })
      },
      getJson() {
        let url = 'apiPairs.do';
        lh_http('post', url, {}).done(res => {
          //console.log(res);
          if (!res.status) {
            return
          }

          this.list_data = res.data.apiPairs
        })
      }
    },
    watch: {
      '$route' (to, from) {
        // 对路由变化作出响应...
        this.showItem = to.params.type;
      },
    },
    mounted() {
      this.getJson();
      this.showItem = this.$route.params.type;
      if (this.user) {
        //是否注册
        let activated = this.user.customerInfo.activated;
        //绑定手机
        let mobile = this.user.customerInfo.mobile ? true : false;
        //c1或c2认证
        let isAuth = this.user.customerInfo.authType ? true : false;

        if (activated && mobile && isAuth) {
          this.clickable = true;
        }
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .api {
    text-align: left;
    padding: 41px 30px;
    .api_link {
      text-align: right;
      line-height: 40px;
      font-size: 14px;
      color: #A7A7A7;
      a {
        color: #00A6F4;
      }
    }
    .st_t1 {
      padding: 15px 20px;
      background: #f4f4f4;
      width: 100%;
      text-align: left;
      font-size: 24px;
    }
    .api_int {
      padding: 23px 30px;
      /*margin-top: 30px;*/
      background: #F5F7FA;
      height: 140px;
      font-size: 12px;
      line-height: 20px;
      color: #666666;
      position: relative;
      .btn_api {
        position: absolute;
        right: 0;
        bottom: 0;
        .btn {
          width: 135px;
          text-align: center;
          line-height: 40px;
          border: 0;
          background: #3392D6;
          color: #fff;
          font-size: 16px;
          cursor: pointer;
          border-radius: 0;
        }
      }
    }
    .api_table {
      .table_title {
        width: 100%;
        border-bottom: #3392D6 solid 2px;
        .title_p {
          width: 135px;
          line-height: 40px;
          border: 0;
          background: #3392D6;
          color: #fff;
          border-radius: 0;
          text-align: center;
          font-size: 14px;
          padding-top: 5px;
        }
      }
      .table {
        width: 100%;
        text-align: center;
        border-collapse: collapse;
        .operate {
          span {
            cursor: pointer;
          }
          .view {
            color: #0093F1;
          }
          .del {
            color: #FF6CB0;
          }
          .del:before {
            content: '|';
            margin: 0 3px;
            color: #D7D7D7;
          }
        }
        thead {
          td {
            color: #9B9B9B;
            line-height: 40px;
            border-bottom: 1px solid #D7D7D7;
          }
        }
        tbody {
          /*          tr:nth-child(2n-1) {
            background-color: #F2F9FE;
          }*/
          tr {
            &:hover {
              background-color: #F2F9FE;
            }
          }
        }
        td {
          color: #494949;
          font-size: 14px;
          line-height: 60px;
          width: 20%;
        }
      }
      .null_table {
        width: 100%;
        height: 95px;
        background: #f8f8f8;
        color: #999;
        text-align: center;
        line-height: 95px;
      }
    }
  }
</style>
