<template>
  <div class="setings" id="setings">
    <!--<div class="st_t1">安全设置</div>-->
    <div class="st_d1">
      <ul class="ul_title">
        <li class="img_box">&#xe62c;</li>
        <li class="d_l">
          <div class="name">{{userName.content | encrypt(userName.type)}}</div>
          <div class="ip_adr">IP：<span>{{ip}}</span></div>
        </li>
      </ul>
      <ul class="setting_ul">
        <li v-for="(i,index) in setlist">
          <div class="icon" v-if="i.status"><img width="40" height="40" :src='i.pic.binded'/></div>
          <div class="icon" v-else><img width="40" height="40" :src='i.pic.unbind'/></div>
          <div class="box">
            <div class="name">
							<span>
								{{i.name}}
							</span>
            </div>
            <div class="status">
							<span v-if="i.status" class="orange">
								已绑定
							</span>
              <span v-else>未绑定</span>
            </div>
            <div class="hint">
							<span v-if="i.status">
	              <span v-if="index===0">{{i.tips[0]}} {{i.bind | encrypt('mobile')}}</span>
							<span v-else-if="index===1">{{i.tips[0]}} {{i.bind | encrypt('email')}}</span>
							<span v-else>{{i.tips[0]}} {{i.bind}}</span>
							</span>
              <span v-else>{{i.tips[1]}}</span>
              <a href="#/help/how-bind-google" v-if="index===2&&i.status===false" style="color: #0093F1">查看帮助</a>
            </div>
            <div class="operation">
              <button @click="toggle(i.items[0])" v-if="i.type == 1">绑定</button>
              <button @click="toggle(i.items[1])" v-if="i.type == 2">修改</button>
              <button class="gray" v-if="i.type == 3">未启用</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import setList from './settings.js';
  export default {
    name: 'settingDetails',
    data() {
      return {
        setlist: setList.get_policy_init(),
        ip: '',
      }
    },
    computed: {
      user() {
        return this.$store.getters.getUser;
      },
      userName() {
        return this.$store.getters.userName;
      },
    },
    methods: {
      toggle(data) {
        //console.log(data);
        this.$router.push({
          path: '/user/settings/' + data
        })
      },
    },
    mounted() {
      this.setlist = setList.get_data(this.user);
      //console.log(11111,this.user.customerInfo)
      this.ip = this.user.ip;
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .setings {
    text-align: left;
    height: 992px;
    .st_d1 {
      padding: 32px 30px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      overflow: auto;
    }
    .ul_title {
      margin-bottom: 20px;
      background: #f5f7fa;
      height: 120px;
      line-height: 120px;
      .img_box,
      .d_l {
        display: inline-block;
        vertical-align: middle;
      }
      .img_box {
        font-size: 80px;
        color: #0093F1;
      }
      .d_l {
        line-height: 30px;
        margin-left: 20px;
        .name {
          font-size: 20px;
          color: #515357;
        }
        .ip_adr {
          font-size: 16px;
          color: #666666;
        }
      }
    }
    .ul_title:hover {
      border: none;
    }
    .setting_ul {
      overflow: auto;
      li {
        font-size: 14px;
        overflow: hidden;
        height: 100px;
        .icon, .hint, .name, .status, .operation, .box {
          display: inline-block;
        }
        .box {
          border-bottom: 1px solid #d7d7d7;
          overflow: hidden;
          width: 780px;
          height: 100px;
          line-height: 100px;
          float: left;
        }
        .hint, .name, .status {
          float: left;
        }
        .operation {
          float: right;
        }
        .icon {
          margin: 30px 30px 0 33px;
          float: left;
          width: 40px;
          height: 40px;
          > img {
            width: 100%;
            height: 100%;
          }
        }
        .operation {
          text-align: right;
          button {
            width: 82px;
            background-color: #0093f1;
            height: 37px;
            line-height: 37px;
            border: none;
            color: white;
            font-size: 14px;
            cursor: pointer;
            &.gray {
              background: #ccc;
            }
            &:hover {
              background: #26a8fb;
            }
            &:active {
              background: #0084d9;
            }
          }
        }
        .name {
          width: 100px;
          margin-left: 10px;
        }
        .status {
          width: 100px;
          color: #fa5e5b;
        }
        .hint {
          color: #9b9b9b;
        }
      }
      /*li:hover {
                border: 1px solid #0093f1;
            }*/
    }
  }
</style>
