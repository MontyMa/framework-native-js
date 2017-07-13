<template>
  <div class="created_api">
    <!--<div class="title">创建API</div>-->
    <div class="created_api_cont">
      <div class="user_name">您正在为账户<span>{{getCodeData.mobile | encrypt('mobile')}}</span>创建新的API</div>
      <ul class="form_cont">
        <li>
          <label class="form_list">
            <span class="input_name">备注名称</span>
            <span class="input_box">
              <input class="api_name" type="text" v-model="api_name" placeholder="请输入API备注名"/>
            </span>
          </label>
        </li>
        <li>
          <label class="form_list">
            <span class="input_name"></span>
            <span class="input_box">
              <input type="checkbox" v-model="api_status" class="g_i_check"/><span></span>
              <span class="g_lable">交易</span>
            </span>
          </label>
        </li>
        <!--<sms-code @smsMsg="getMcode" :value="getCodeData"></sms-code>-->
        <li>
          <span class="input_name">短信验证码</span>
          <span class="input_box">
            <sms-code @smsMsg="getMcode" :type="'generateApiKey'"></sms-code>
          </span>
        </li>
        <li class="form_btn">
          <span class="input_name"></span>
          <div class="input_box">
            <div class="btn" @click="getJson" :class="{no_click :isRequest}">创建API</div>
          </div>
        </li>
      </ul>
    </div>

  </div>
</template>
<script>
  export default{
    data(){
      return {
        api_name: '',
        api_status: true,
        mcode: '',
        getCodeData: {    //发送给短信验证码的数据
          mobile: this.$store.getters.getUser.customerInfo.mobile,
          type: 'generateApiKey'
        },
      }
    },
//    components: {alertBox},
    props: ['parentGetJson'],
    computed: {
      isRequest(){
        return this.api_name === '' || this.api_status === false || this.mcode.length !== 6
      }
    },
    methods: {
      getMcode(val){
        if (val.length === 6) this.mcode = val;
        //console.log(this.mcode);
      },
      getJson(){
        if (this.isRequest) return;

        let url = 'createApiPair.do';

        let send_msg = {
          description: this.api_name,
          apiAuthorities: 1,
          mcode: this.mcode
        };

        lh_http('post', url, send_msg).done(res => {
          if (!res.status) {
            alert('没有该API权限');
            return
          }

          this.$router.push({
            path: '/user/api/index'
          });

          this.parentGetJson();   //成功之后再执行一次API请求
        })
      }
    },
    mounted(){
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .created_api {
    font-size: 14px;

    .created_api_cont {
      padding: 50px 70px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      .user_name {
        text-align: left;
        color: #494949;
        span {
          color: #0093F1;
          margin: 0 3px;
        }
      }
      .form_cont {
        margin-top: 45px;
        text-align: center;
        li {
          margin-bottom: 30px;
        }
        li:last-child {
          margin-top: 60px;
        }
      }
      .input_name {
        width: 90px;
        text-align: right;
        margin-right: 40px;
        display: inline-block;
        vertical-align: middle;
        color: #283138;
      }
      .input_box {
        display: inline-block;
        width: 413px;
        text-align: left;
      }
      .api_name {
        width: 100%;
        padding: 0 10px;
        height: 45px;
        border: 1px solid #9b9b9b;
        border-radius: 3px;
      }
      .form_btn {
        .btn {
          cursor: pointer;
          color: #fff;
          width: 100%;
          line-height: 50px;
          background-color: #0093F1;
          display: inline-block;
          text-align: center;
          border-radius: 3px;
          &.no_click {
            background-color: #78cbfa;
            color: #bbe2fd;
          }
        }
      }
    }
  }
</style>
