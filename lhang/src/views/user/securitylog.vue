<template>
  <div class="securitylog" id="securitylog">
    <!--<div class="st_t1">安全记录</div>-->

    <div class="work">
      <div class="title">
        <span v-on:click="trade(1)" :class="{ active: trade_index === 1 }">最近登录历史</span>
        <span v-on:click="trade(2)" :class="{ active: trade_index === 2 }">安全设置历史</span>
      </div>
      <div class="recently">
	      <p>您上次登录系统时间为:<span>{{getJson.lastLoginTime}} 登录IP：{{getJson.ip}}</span></p>
	    </div>
      <div v-if="trade_index == 1">
        <logintable :request="request.login_history"></logintable>
      </div>
      <div v-if="trade_index == 2">
        <safetable :request="request.setting_history"></safetable>
      </div>
    </div>
  </div>
</template>

<script>
  import logintable from './pannel/login_table.vue';
  import safetable from './pannel/safe_setting_list.vue';
  export default {
    name: 'securitylog',
    data() {
      return {
        title: '',
        trade_index: 1,
        request: {
          login_history: '',
          setting_history: ''
        },
        login_send_msg: {
          pageNo: 1,
          pageSize: 20,
        },
        setting_send_msg: {
          pageNo: 1,
          pageSize: 20,
          type: '安全'
        },
      }
    }, //定义变量
    computed: {
      getJson(){
        let user_info = this.$store.getters.getUser;

        if (!user_info) {
          return {
            lastLoginTime: '--',
            ip: '--'
          }
        }
        return {
          lastLoginTime: user_info.lastLoginTime,
          ip: user_info.ip
        };
      }
    },
    components: {logintable, safetable}, //注册组件
    methods: { //方法都在这里
      trade(index) {
        this.trade_index = index;

        this.settingRequest(this.login_send_msg, this.setting_send_msg)
      },
      settingRequest(login_send_msg, setting_send_msg){
        let login_history_url = 'loginlog/loginlist',
          setting_history_url = 'messageInfo/messageInfoJsonList';

        this.request = {
          login_history: lh_http('post', login_history_url, login_send_msg),
          setting_history: lh_http('post', setting_history_url, setting_send_msg)
        }
      }

    },
    beforeMount() {
      this.settingRequest(this.login_send_msg, this.setting_send_msg)
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .securitylog {
    text-align: left;
    padding: 30px;
/*    .st_t1 {
      padding: 15px 20px;
      background: #f4f4f4;
      width: 100%;
      text-align: left;
      font-size: 24px;
    }*/
    .recently {
      /*padding: 15px 40px;*/
     	height: 40px;
     	line-height: 40px;
      margin: 16px 0;
      font-size: 14px;
      color: #999;
      background: #FFFAF4;
      p{
      	margin-left: 14px;
      }
    }
    .work {
      .title {
        height: 40px;
        font-size: 16px;
        border-bottom: 1px solid #d7d7d7;
        span {
          height: 40px;
          display: inline-block;
          line-height: 40px;
          cursor: pointer;
          margin-right: 70px;;
          
        }
/*        span:last-child {
          width: 159px;
          margin-left: 0.3px;
        }*/
      }
      .active {
        color: #0093f1;
        font-weight: 600;
        border-bottom: 2px solid #0093F1;
      }
    }
  }
</style>
