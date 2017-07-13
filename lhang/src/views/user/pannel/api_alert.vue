<template>
  <div class="alert_wrap">
    <div class="input_wrap">
      <div class="lay_box">
        <div class="cont_box">
          <div class="title" :class="{title_del: page_tyep==='del'}">{{title}}</div>


          <div v-if="isView" class="view_page_wrap">
            <ul class="view_page">
              <li class="list">
                <span class="list_name">备注名称：</span>
                <span class="list_data">{{view_data.description}}</span>
              </li>
              <li class="list">
                <span class="list_name">权限：</span>
                <span class="list_data">{{view_data.authorityNames}}</span>
              </li>
              <li class="list">
                <span class="list_name">apiKey：</span>
                <span class="list_data" id="copy_apiKey">{{view_data.apiKey}}</span>
                <span class="list_operating" v-clipboard data-clipboard-action="copy"
                      data-clipboard-target="#copy_apiKey">复制</span>
              </li>
              <li class="list">
                <span class="list_name">secretKey：</span>
                <span class="list_data" id="copy_secretKey">{{view_data.secretKey}}</span>
                <span class="list_operating" v-clipboard data-clipboard-action="copy"
                      data-clipboard-target="#copy_secretKey">复制</span>
              </li>
            </ul>
          </div>

          <ul class="input_box" v-else>
            <li class="input_group">
              <span class="input_name">短信验证码</span>
              <sms-code class="send_msg" @smsMsg="getMcode" :type="getCodeData.type"></sms-code>
            </li>
            <li class="input_group">
              <span class="input_name"></span>
              <div class="btn" :class="{no_click:!isClick}" @click="runRequest">确认</div>
            </li>
          </ul>
        </div>
        <div class="close" @click="closeWindow(false)">
          <div class="icon"></div>
        </div>
      </div>
    </div>
    <div class="v_center"></div>
  </div>
</template>
<script>
  export default{
    name: "alert-box",
    data(){
      return {
        window_status: '',
        title: '--',
        page_tyep: 'view',
        mcode: '',
        getCodeData: {
          mobile: this.$store.getters.getUser.customerInfo.mobile,
          type: ''
        },
        isView: false,
        view_data: {
          description: '--',
          authorityNames: '--',
          apiKey: '--',
          secretKey: '--'
        }
      }
    },
    props: ['productData', 'parentGetJson'],
    computed: {
      isClick(){
        return this.mcode.length === 6
      }
    },
    methods: {
      getMcode(val){
        this.mcode = val;
      },
      closeWindow(status){
        this.window_status = status;
      },
      _changView(type){
        let viewFn = {
          view(){
            this.title = 'API查看';
            this.getCodeData.type = 'viewApiKey'
          },
          del(){
            this.title = '确认删除此API？';
            this.page_tyep = 'del';
            this.getCodeData.type = 'deleteApiKey'
          }
        };
        viewFn[type].call(this);
      },
      runOperating(_data_){
        //console.log(_data_);
        this._changView(_data_.operating)   //控制view层
      },
      runRequest(){
        if (!this.isClick)return;
        let request = {
          view(){
            let url = 'apiPairDetail.do';
            let send_msg = {
              id: this.productData.id,
              mcode: this.mcode
            };
            lh_http('post', url, send_msg).done(res => {
              //console.log(res);
              if (!res.status) {
                alert(res.data);
                return
              }
//              106275
              this.isView = true;
              this.view_data = res.data.apiPair;
            })
          },
          del(){
            let url = 'apiPairDelete.do';
            let send_msg = {
              id: this.productData.id,
              mcode: this.mcode
            };
            lh_http('post', url, send_msg).done(res => {
              //console.log(res);
              if (!res.status) {
                alert(res.data);
                return
              }

              this.parentGetJson();
              this.window_status = false;
            })
          }
        };
        request[this.page_tyep].call(this);
      }
    },
    watch: {
      window_status(val){
        this.$emit('window_status', val)
      }
    },
    mounted(){
      this.runOperating(this.productData);
    }

  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .alert_wrap {
    position: fixed;
    top: 0;
    left: 0;
    text-align: center;
    width: 100%;
    height: 100%;
    z-index: 9;
    background-color: rgba(0, 0, 0, 0.5);
    .view_page_wrap {
      text-align: center;
      .view_page {
        display: inline-block;
        text-align: center;
        margin-top: 45px;
      }
      .list {
        margin-bottom: 18px;
        text-align: left;
        font-size: 14px;
        span {
          display: inline-block;
          vertical-align: middle;
        }
        .list_name {
          width: 90px;
          text-align: right;
          color: #666666;
        }
        .list_data {
          width: 320px;
          color: #494949;
        }
        .list_operating {
          color: #0093F1;
          cursor: pointer;
        }
      }
    }
    .input_wrap {
      width: 800px;
      height: 400px;
      background-color: #ffffff;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .5);
      border-radius: 3px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      padding: 65px 78px;
    }

    .v_center, .input_wrap, .input_name, .send_msg, .btn {
      display: inline-block;
      vertical-align: middle;
    }
    .v_center {
      height: 100%;
    }
    .input_group {
      margin-top: 34px;
      .send_msg {
        width: 413px;
      }
      .input_name {
        font-size: 14px;
        color: #283138;
        width: 80px;
        margin-right: 20px;
      }
      .btn {
        text-align: center;
        width: 413px;
        line-height: 50px;
        background-color: #0093F1;
        color: #ffffff;
        border-radius: 3px;
        margin-top: 30px;
        cursor: pointer;
        user-select: none;
        &.no_click {
          background-color: #78cbfa;
          color: #bbe2fd;
        }
      }
    }
    .lay_box {
      position: relative;
    }
    .close {
      user-select: none;
      position: absolute;
      top: -50px;
      right: -50px;
      cursor: pointer;
      width: 20px;
      height: 20px;
      .icon {
        &:before, &:after {
          -webkit-transition: 300ms;
          -moz-transition: 300ms;
          -o-transition: 300ms;
          transition: 300ms;
          width: 2px;
          height: 20px;
          content: '';
          display: block;
          background-color: #999999;
          position: absolute;
          margin-left: 50%;
        }
        &:before {
          -webkit-transform: rotate(45deg);
          -moz-transform: rotate(45deg);
          -ms-transform: rotate(45deg);
          -o-transform: rotate(45deg);
          transform: rotate(45deg);
        }
        &:after {
          -webkit-transform: rotate(-45deg);
          -moz-transform: rotate(-45deg);
          -ms-transform: rotate(-45deg);
          -o-transform: rotate(-45deg);
          transform: rotate(-45deg);
        }
      }

      &:hover .icon:before {
        -webkit-transform: rotate(135deg);
        -moz-transform: rotate(135deg);
        -ms-transform: rotate(135deg);
        -o-transform: rotate(135deg);
        transform: rotate(135deg);
      }
      &:hover .icon:after {
        -webkit-transform: rotate(-135deg);
        -moz-transform: rotate(-135deg);
        -ms-transform: rotate(-135deg);
        -o-transform: rotate(-135deg);
        transform: rotate(-135deg);
      }
    }
    .cont_box {
      text-align: left;
      .title {
        font-size: 14px;
        color: #0093F1;
        padding: 8px 0;
        border-bottom: 1px solid #D7D7D7;
        &.title_del {
          color: #F20000;
        }
      }
    }
  }
</style>
