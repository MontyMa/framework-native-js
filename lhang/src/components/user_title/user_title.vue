<template>
  <div class="user_title" id="user_title" v-if="type<=3">
    <div class="g_center box_position">
      <div class="user_group">
        <div class="user_before">
          <span v-if="type<3">在交易前，您还需要完成</span>
          <span v-else="type>3">您已完成充值，</span>
          <a class="a1" href="#/user/auth" v-if="type===1">C1认证</a>
          <a class="a1" href="#/money/recharge" v-else-if="type===2">充值</a>
          <a class="a1" href="#/trading/btc/trade" v-else="type===3">快来开启第一次交易吧</a>
        </div>
        <!--步骤-->
        <ul class="sp1_ul">
          <li class="sp1_li">
            <div class="icon_first"></div>
            <p>注册账号</p>
            <div class="flow_first"></div>
          </li>
          <li :class="type>=2?'sp1_li_bright':'sp1_li'">
            <a :href="type===1?'#/user/auth':'javascript:void (0)'" :class="type===1?'icon_hover':'no_icon_hover'">
              <div class="icon icon_2"></div>
              <p>C1实名认证</p>
            </a>
            <div class="flow"></div>
          </li>
          <li :class="type>=3?'sp1_li_bright':'sp1_li'">
            <a :href="type===2?'#/money/recharge':'javascript:void (0)'" :class="type===2?'icon_hover':'no_icon_hover'">
              <div class="icon icon_3"></div>
              <p>充值</p>
            </a>
            <div class="flow"></div>
          </li>
          <li class="sp1_li">
            <a :href="type===3?'#/trading/btc/trade':'javascript:void (0)'"
               :class="type===3?'icon_hover':'no_icon_hover'">
              <div class="icon icon_4"></div>
              <p>下单交易</p>
            </a>
          </li>
        </ul>
      </div>

      <div class="user_group u_t_d1">
        <ul class="sp2 sp2_ul">
          <li class="join">立即加入链行新手教学群</li>
          <li class="qq_num">
            <a target="_blank"
               href="//shang.qq.com/wpa/qunwpa?idkey=e7f238e982c2c667d1eab036927be6242314bbf94612d6bf5ab27cd9b3fe1e6d"><span>qq群号：</span>151591368</a>
          </li>

          <!--todo 待添加连接地址-->
          <li class="help">不知道怎么玩？立即<a href="#/help/bulletin">查看新手帮助</a></li>
        </ul>
        <div class="sp2 user_imgbox"><img width="90" height="90" class="user_title_img" src="./img/i_code.png"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'user_title',
    data() {
      return {
        type: 4
      }
    },
    methods: {
      getJson(){
        let url = 'customerInfo/authentication';
//      , {useruuid: this.$store.getters.uuid}

        lh_http('get', url).done(res => {
//        console.log(res);
          if (!res.status) return;
          //        防止出现取值问题
          if (res.data.type > 4) {
            res.data.type = 4
          } else if (res.data.type < 1) {
            res.data.type = 1
          }
          this.type = res.data.type
        })
      }
    },
    mounted() {
      this.getJson();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
  .user_title {
    text-align: left;
    background-color: #ffffff;
    padding: 7px 0;
    box-sizing: border-box;
    font-size: 0;
    color: #1B1E23;
    .g_center {
      width: 1200px;
      margin: 0 auto;
    }
    .box_position {
      position: relative;
    }
    .user_group {
      display: inline-block;
      vertical-align: top;
      font-size: 14px;
      .user_before {
        padding-left: 6px;
        margin-top: 12px;
        a {
          color: #0093F1;
          margin-left: 2px;
        }
      }
      &:first-child {
        width: 67%;
        text-align: left;
      }
      &:last-child {
        width: 33%;
        text-align: right;
      }
    }
    .sp1_ul {
      font-size: 0;
      position: absolute;
      bottom: 2px;
      left: 0;
      .sp1_li, .sp1_li_bright {
        a {
          display: inline-block;
          &.icon_hover:hover {
            .icon {
              background: url("./img/icon_hover.png") no-repeat center center;
            }
            p {
              color: #0093F1;
            }
          }
          &.no_icon_hover {
            cursor: default;
          }
        }

        display: inline-block;
        vertical-align: top;
        font-size: 16px;
        line-height: 38px;
        &:not(:last-child) {
          margin-right: 8px;
        }
      }

      .sp1_li .icon_2:before {
        content: '2';
      }
      .sp1_li .icon_3:before {
        content: '3';
      }
      .sp1_li .icon_4:before {
        content: '4';
      }

      .icon, .icon_first, .flow, .flow_first, p {
        display: inline-block;
        vertical-align: middle;
      }
      .icon, .icon_first {
        width: 38px;
        height: 38px;
        text-align: center;
        color: #fff;
      }
      .icon {
        background: url("./img/icon2.png") no-repeat;
      }
      .icon_first {
        background: url("./img/icon_complete.png") no-repeat;
      }

      .flow, .flow_first {
        width: 38px;
        height: 13px;
        margin-left: 5px;
      }
      .flow {
        background: url("./img/icon_flow.png") no-repeat;
      }

      .flow_first {
        background: url("./img/icon_flow_bright.png") no-repeat;
      }

      /*todo 变量控制li标签class 改变成:sp1_li_bright 即可*/
      .sp1_li_bright {
        .icon {
          background: url("./img/icon_complete.png") no-repeat;
        }
        .flow {
          background: url("./img/icon_flow_bright.png") no-repeat;
        }
      }
    }

    .sp2_ul {
      margin-right: 110px;
      .join {
        margin-bottom: 10px;
      }
      .qq_num {
        margin-bottom: 26px;
        color: #0093F1;
        span {
          font-size: 12px;
        }
      }
      .help {
        color: #494949;
        font-size: 12px;
        a {
          color: #0093F1;
          margin-left: 5px;
        }
      }
    }

    .u_t_d1 {
      position: relative;
    }
    .user_imgbox {
      width: 90px;
      height: 90px;
      position: absolute;
      top: 0;
      right: 0;
      img {
        width: 100%;
      }
    }
  }
</style>
