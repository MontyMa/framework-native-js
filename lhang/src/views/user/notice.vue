<template>
  <div class="notice" id="notice">
    <!--<div class="st_t1">我的消息</div>-->
    <div class="work">
      <div class="title">
        <span v-on:click="getJson('all')" :class="{ active: trade_index === 'all' }">全部</span>
        <span v-on:click="getJson('sys_msg')" :class="{ active: trade_index === 'sys_msg'}">系统消息</span>
        <span v-on:click="getJson('transaction')" :class="{ active: trade_index === 'transaction'}">充值提现</span>
        <span v-on:click="getJson('safe')" :class="{ active: trade_index === 'safe'}">安全</span>
        <span v-on:click="getJson('attest')" :class="{ active: trade_index === 'attest'}">认证</span>
        <span v-on:click="getJson('activity')" :class="{ active: trade_index === 'activity'}">活动</span>
      </div>
      <div class="trade_table" id="trade_table">
        <!--<div class="list_header">-->
        <!--<div class="layout">-->
        <!--<label class="for_input">-->
        <!--<input type="checkbox" class="g_i_check input_select"><span></span>-->
        <!--<span class="g_lable">全选</span>-->
        <!--</label>-->
        <!--</div>-->
        <!--<div class="trade_del layout"><span>del图标</span></div>-->
        <!--</div>-->

        <!--列表-->
        <div class="list_cont" v-for="item in list_data">
          <ul class="mes_group">
            <!--<li class="list_select">-->
            <!--<label class="for_input">-->
            <!--<input type="checkbox" class="g_i_check input_select"><span></span>-->
            <!--<span class="g_lable">系统</span>-->
            <!--</label>-->
            <!--</li>-->
            <li class="mes_content">
              <div class="time">{{item.sendTime}}</div>
              <div class="paragraph">
                <div class="par_title">尊敬的用户：</div>
                <p>{{item.messageContent}}</p>
              </div>
            </li>
            <!--<li class="del_box"><span>del图标</span></li>-->
          </ul>
        </div>
        <div class="list_cont" style="text-align: center;background-color: #f8f8f8;padding: 30px 0"
             v-if="list_data.length===0">暂无数据
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  //    import tradetable from './pannel/trade_table'
  import send_meg from './notice_send_msg.js'
  export default {
    name: 'notice',
    computed: {},
    data() {
      //定义变量
      return {
        title: '',
        trade_index: 'all',
        send_msg: send_meg,
        list_data: []
      }
    },
    components: {
      //注册组件
//      tradetable
    },
    methods: {
      //获取我的消息数据
      getJson(index){
        this.trade_index = index;
        let msg_obj = this.send_msg;
        let getSendMsgtFn = {
          all(){
            return msg_obj.all;
          },
          sys_msg(){
            return msg_obj.sys_msg;
          },
          transaction(){
            return msg_obj.transaction;
          },
          safe(){
            return msg_obj.safe;
          },
          attest(){
            return msg_obj.attest;
          },
          activity(){
            return msg_obj.activity;
          }
        };

        let send_msg = getSendMsgtFn[index]();
        let url = 'messageInfo/messageInfoJsonList';

        lh_http('post', url, send_msg).done(res => {
          this.list_data = res.data.list.resultList;
        })
      }
    },
    mounted() {
      this.getJson(this.trade_index);
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .notice {
    text-align: left;
    padding: 30px;

    .trade_table {
      margin-top: 30px;
      .list_header {
        padding: 10px 20px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        border-bottom: 1px solid #979797;
        font-size: 0;
        .layout {
          color: #0093F1;
          font-size: 12px;
          display: inline-block;
          vertical-align: middle;
          width: 50%;
        }
        .input_select {
          margin-right: 15px;
        }
        .for_input {
          cursor: pointer;
        }
        .trade_del {
          text-align: right;
          span {
            cursor: pointer;
          }
        }
      }
      .list_cont {
        color: #999;
        font-size: 12px;
        .mes_group {
          position: relative;
          border-bottom: 1px solid #D7D7D7;
          .mes_content {
            /*width: 80%;*/
            /*margin: 0 auto;*/
            padding: 12px 40px 40px 40px;
          }
          .list_select,
          .del_box {
            position: absolute;
            top: 10px;
          }
          .list_select {
            left: 20px;
            label {
              cursor: pointer;
            }
            .input_select {
              margin-right: 15px;
            }
          }
          .del_box {
            right: 20px;
            cursor: pointer;
          }
        }
        .mes_content {
          letter-spacing: 0.3px;
          .time {
            margin-bottom: 20px;
          }
          .paragraph {
            .par_title {
              margin-bottom: 15px;
            }
            p {
              line-height: 20px;
              text-align: justify;
            }
          }
        }
      }
    }

    .st_t1 {
      padding: 15px 20px;
      background: #f4f4f4;
      width: 100%;
      text-align: left;
      font-size: 24px;
    }

    .work {

      .title {
        /*background: #f4f4f4;*/
        border-bottom: 1px solid #D7D7D7;
        height: 44px;
        font-size: 14px;

        span {
          /*width: 156px;*/
          height: 44px;
          display: inline-block;
          text-align: center;
          line-height: 44px;
          margin-right: 60px;
          cursor: pointer;
        }

        /*        span:last-child {
                  width: 159px;
                  margin-left: 0.3px;
                }*/

      }
      .active {
        /*background-color: #fff;
        color: #0093f1;
        font-size: 14px;*/
        color: #0093f1;
        font-weight: 600;
        border-bottom: 2px solid #0093f1;
      }

      .market_work {
      }

    }
  }
</style>
