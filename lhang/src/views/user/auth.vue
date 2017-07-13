<template>
  <div class="auth" id="info">
    <!--<div class="st_t1">实名认证</div>-->
    <div class="info_title">
      <div class="auth_box" v-for="i in authDetails" v-if="thisAuthLevel== i.authLevel">
        <img width="60" height="60" :src="i.pic"/>
        <div class="info_intro" v-html="i.hint">
        </div>
      </div>
      <div class="auth_info" v-if="thisAuthLevel !='no'">
        <p class="auth_info_title">认证信息</p>
        <ul>
          <!--<li>-->
          <!--<span class="itemtype">昵称</span>-->
          <!--<a v-if="!hasNickname && !setNickname" class="blue" @click="changeNickname">设置昵称</a>-->
          <!--<p v-if="hasNickname && !setNickname" class="inlineblock">{{getNickName}}</p>-->
          <!--<input type="text" v-if="setNickname" class="nickname" v-focus v-model="nickname" @blur="saveNickName"/>-->
          <!--<i class="set_nickname" @click="changeNickname"></i>-->
          <!--</li>-->

          <li class="nickname_box">
            <span class="itemtype">昵称</span>
            <label class="nickname_label">
              <input type="text" class="nickname_input" :value="getNickName"
                     v-model="nickname"
                     @blur="saveNickName"
                     @keydown.enter="saveNickName"/>
            </label>
          </li>

          <li>
            <span class="itemtype">真实信息</span>
            <p class="inlineblock">{{realInfo}}</p>
          </li>
          <li>
            <span class="itemtype">证件类型</span>
            <p class="inlineblock">{{certificateType}}</p>
          </li>
          <li>
            <span class="itemtype">证件号码</span>
            <p class="inlineblock">{{getCertificateNum}}</p>
          </li>
        </ul>
      </div>
      <div class="st_d1" v-if="thisAuthLevel !='C2'">
        <h1 class="st_t1 ul_title">资金安全策略</h1>
        <ul class="setting_ul" v-for="i in policy" v-if="thisAuthLevel == i.authLevel">
          <li>
            <div class="icon"><img width="60" height="60" :src="i.pic"/></div>
            <div>
              <strong>{{i.authHint}}</strong>
            </div>
            <div>
              <span class="intro">{{i.hint}}</span>
            </div>
            <div class="operation">
              <button @click="auditStatus!=='待审核'?toc1Auth(thisAuthLevel):null" :class="{no_user:auditStatus==='待审核'}">
                {{auditStatus !== '待审核' ? '认证' : auditStatus}}
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'info',
    data() {
      return {
//        input_width: '',
        hasNickname: false,
        setNickname: false,
        nickname: '',
        realInfo: '--',
        certificateType: '--',
        certificateNum: '--',
        thisAuthLevel: '',//认证等级
        auditStatus: '',
        authDetails: [
          {
            pic: require('./auth/imgs/c1_auth0.svg'),
            hint: `<div style="font-weight: 600;color: #494949">您还没有进行实名认证。请立即认证身份</div>
						<p style="color: #797979">实名认证一旦成功，不予修改和解除认证，不予变更认证方式，建议您谨慎选择，真实填写。<br>
						<strong>完成</strong><span style="color: #00A6F4">C1</span>认证会使您开启交易所各类资产的充值服务。</p>`,
            authLevel: 'no'
          },
          {
            pic: require('./auth/imgs/c1_auth.svg'),
            hint: `<div style="font-weight: 600;color: #494949">您目前的认证级别是<span style="color: #00A6F4">C1</span></div>
						<p>您现在已开启交易所各类资产的充值服务,但是您需要完成<span>C2</span>认证才能进行全部资产的提现服务。</p>
						<p><span>C2</span>认证需要进行人工审核，为期1-3个工作日，建议您尽早认证。</p>`,
            authLevel: 'C1'
          },
          {
            pic: require('./auth/imgs/c2_auth.svg'),
            hint: `<div style="font-weight: 600;color: #494949">您目前的认证级别是<span style="color: #00A6F4">C2</span></div>
						<p>您的账户现在可以为所欲为</p>`,
            authLevel: 'C2'
          },
        ],
        policy: [
          {
            pic: require('./auth/imgs/c1_auth0.svg'),
            hint: `适用于人民币充值和交易的用户`,
            authHint: '',
            authLevel: 'no',
          },
          {
            pic: require('./auth/imgs/c2_auth0.svg'),
            hint: `适用于人民币充值和交易的用户`,
            authHint: 'C2认证',
            authLevel: 'C1',
          },
        ]
      }
    },
    components: {},
    computed: {
      getCertificateNum(){
        return this.certificateNum.replace(/^(.{2})(.+)(.{2})$/, '$1****$3')
      },
      getNickName(){
        return this.$store.getters.getUser.customerInfo.nickname;
      },
      user() {
        return this.$store.getters.getUser.customerInfo.authType;
      }
    },
    watch: {
      '$route' (to, from) {
        this.runRequest();
        this.getUser();
      },
      nickname(val, old){
        let z_ch_arr = val.match(/[\u4e00-\u9fa5]+/g);
        let z_ch_str = '';
        if (z_ch_arr) {
          z_ch_arr.forEach(elem => {
            z_ch_str += elem
          });
        }

        let z_che_len = z_ch_str.length * 2;
        let eng_arr = val.match(/[a-zA-z0-9]+/g);
        let eng_str = '';

        if (eng_arr) {
          eng_arr.forEach(elem => {
            eng_str += elem
          });
        }

        let eng_len = eng_str.length;
        let total_len = eng_len + z_che_len;

        if (total_len > 16) {
          this.nickname = old;
        }
      }
    },
    methods: {
      runRequest(){
        lh_http('get', 'customerIdentify/get', {
//          useruuid: this.$store.getters.getUser.customerInfo.uuid
        }).done(res => {
          if (!res.status) {
            alert(res.data);
            return
          }

          console.log(res);
          if (Object.keys(res.data).length === 0) return;    //如果为空就不赋值

          let customer_identify = res.data.customerIdentify;
          if (!customer_identify) return;

          [
            this.realInfo,
            this.certificateType,
            this.certificateNum,
            this.auditStatus
          ] = [
            customer_identify.userName,
            customer_identify.credentialsType,
            customer_identify.credentialsCode,
            customer_identify.auditStatus
          ];
          sessionStorage.setItem('identify', JSON.stringify(customer_identify));
        })
      },
      toc1Auth (data) {
        let val = '';

        if (data === 'no') {
          val = 'c1_auth';
        } else if (data === 'C1') {
          val = 'c2_auth';
        }

        this.$router.push({
          path: '/user/auth/' + val
        })
      },
      changeNickname () {
        this.setNickname = true;
      },
      saveNickName () {
        if (this.nickname === '') {
          this.nickname = this.getNickName;
          return
        }

        if (this.nickname === this.getNickName) {
          return
        }

        this.setNickname = false;
        this.hasNickname = true;

        let uuid = this.$store.getters.getUser.customerInfo.uuid;
        let url = `${config.api}customerInfo/changeInfo`;

        $.ajax(url, {
          type: 'POSt',
          data: {
            nickname: this.nickname,
          }
        }).done(res => {
          if (!res.success)return;
          let data = res.dataWrapper;

          this.nickname = data.nickname;
          this.hasNickname = true;
          this.$store.dispatch('changeNickName', data.nickname);

          let getUser = cookie().get("user");
          getUser.customerInfo.nickname = data.nickname;
          cookie().set("user", getUser);
          location.reload(false);
        });
      },
      getUser() {
        lh_http('get', 'user', {}).done(res => {
          if (res.status) {
            ////console.log(res.data)
            this.$store.commit('logon', res.data);
          }
        })
      },
    },
    beforeMount(){
      this.thisAuthLevel = this.user ? this.user : 'no';
      if (this.thisAuthLevel !== 'no') this.runRequest();
    },
    mounted() {
      if (this.getNickName !== '' || this.getNickName !== null) {
        this.hasNickname = true;
      }
      if (this.getNickName) {
        this.nickname = this.getNickName;
      }

      this.getUser();
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .auth {
    text-align: left;

    .nickname_box {
      .nickname_input {
        font-size: 14px;
        color: #494949;
        width: 120px;
        min-width: 100px;
        border: 1px solid transparent;
        display: inline-block;
        vertical-align: middle;
        cursor: pointer;
      }
      .nickname_label {
        cursor: pointer;
        &:after {
          content: '\e655';
          margin-left: 3px;
          display: inline-block;
          vertical-align: middle;
          color: #0093F1;
          font-size: 18px;
        }
      }
    }

    .st_t1 {
      padding: 15px 20px;
      /*background: #f4f4f4;*/
      width: 100%;
      text-align: left;
      font-size: 24px;
    }
    .info_title {
      padding: 32px 30px;
      /*border: 1px solid #ededed;*/
      img {
        width: 60px;
        display: inline-block;
        vertical-align: middle;
        margin-right: 30px;
      }
      .info_intro {
        font-size: 14px;
        line-height: 25px;
        display: inline-block;
        vertical-align: middle;
        span {
          color: #0093f1;
          font-weight: bold;
        }
      }
      .auth_box {
        padding: 20px;
        background-color: #F5F7FA;
      }
      .auth_info {
        /*margin-top: 30px;*/
        font-size: 14px;
        .auth_info_title {
          margin-bottom: 20px;
          padding-top: 30px;
        }
        li {
          margin-bottom: 15px;
          .itemtype {
            display: inline-block;
            width: 80px;
            text-align: right;
            margin-right: 20px;
            color: #999;
          }
          .inlineblock {
            display: inline-block;
          }
          .set_nickname {
            display: inline-block;
            vertical-align: middle;
            margin-left: 10px;
            width: 13px;
            height: 14px;
            background: url("./auth/imgs/set_nickname.png") no-repeat center;
            background-size: 13px 14px;
            cursor: pointer;
          }
          .nickname {
            border-bottom: 1px solid #ccc;
          }
          .blue {
            color: #0093F1;
          }
        }
      }
    }
    .st_d1 {
      overflow: auto;
      padding: 40px 0 0;
      .ul_title {
        background: none;
        font-weight: normal;
        padding-left: 0;
        color: #333;
        font-size: 20px;
      }
    }
    .setting_ul {
      overflow: auto;
      li {
        font-size: 14px;
        overflow: auto;
        border: 1px solid #ededed;
        display: table;
        height: 100px;
        width: 100%;
        margin-bottom: 20px;
        > div {
          display: table-cell;
          vertical-align: middle;
        }
        .icon {
          padding-left: 40px;
          height: 60px;
          width: 60px;
        }
        .operation {
          padding-right: 20px;
          text-align: right;
          button {
            width: 82px;
            background-color: #0093f1;
            height: 37px;
            line-height: 37px;
            border: none;
            color: white;
            font-size: 14px;
            &.no_user {
              background-color: #999999;
            }
          }
        }
        .intro {
          color: #a3a1a1;
        }
      }
      li:hover {
        border: 1px solid #0093f1;
      }
    }
  }
</style>
