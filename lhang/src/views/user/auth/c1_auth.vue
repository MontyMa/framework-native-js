<template>
  <div class="auth" id="info">
    <div class="container">
      <ul class="info_title">
        <li>
          <img class="icon_img" src="./imgs/c1_auth.svg" alt=""/>
        </li>
        <li class="tit_list">
          <p class="tit_tip">您正在为账户进行实名认证(<span class="red">*</span>为必须填写)</p>
          <span class="red">*提示认证年龄满18岁，最高年龄限制为60岁</span>
        </li>
      </ul>
      <ul class="details">
        <li>
          <span class="title">昵称</span>
          <div class="box">
            <input type="text" placeholder="请输入昵称" v-model="nickname"/>
          </div>
        </li>
        <li>
          <span class="title">姓名<span class="red">*</span></span>
          <div class="box">
            <input type="text" placeholder="请输入姓名" v-model="name"/>
            <span class="red tip_txt" v-if="hasName">姓名不能为空</span>
          </div>
        </li>
        <li>
          <span class="title"></span>
          <div class="box">
            <p class="red changsize">真实姓名经实名认证后将不能修改，请如实填写只接受实名充值，提现时银行等姓名信息必须与您的认证姓名一致。</p>
          </div>
        </li>
        <li>
          <span class="title">出生日期<span class="red">*</span></span>
          <div class="box">
            <!--日期选择器-->
            <div id="laydate_point"></div>
            <span class="red tip_txt" v-if="hasBirth">出生日期不正确</span>
          </div>
        </li>
        <li>
          <span class="title">国家/地区<span class="red">*</span></span>
          <div class="box">
            <input type="text" value="China中国大陆" disabled style="background-color: #F8F8F8"/>
          </div>
        </li>
        <li>
          <span class="title">证件类型<span class="red">*</span></span>
          <div class="box">
            <input type="text" value="身份证" disabled style="background-color: #F8F8F8"/>
          </div>
        </li>
        <li>
          <span class="title">证件号码<span class="red">*</span></span>
          <div class="box">
            <input type="text" placeholder="请输入证件号码" v-model="num"/>
            <span class="red tip_txt" v-if="hasNumber">证件号码不能为空</span>
          </div>
        </li>
        <li>
          <span class="title"></span>
          <div class="box">
            <div class="check_box">
              <label>
                <input type="checkbox" class="g_i_check" checked/>
                <span></span>
                <span class="g_label sms_msg">我承认提交的信息属于本人所有，不存在盗用他人证件的行为</span>
              </label>
            </div>
            <button type="button" @click="runRequest">确定绑定</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import laydate from '../../../assets/js/laydate.js';
  export default {
    data () {
      return {
        hasName: false,
        hasBirth: false,
        hasNumber: false,
        nickname: '',
        name: '',
        birth: '',
        num: '',
      }
    },
    methods: {
      runRequest () {
        if (!this.name) {
          this.hasName = true;
        }
        if (this.birth === '') {
          this.hasBirth = true;
        }
        if (!this.num) {
          this.hasNumber = true;
        }

        let url = 'account/identify';
        let send_msg = {
          nickname: this.nickname.replace(/\s+/g, ""),
          username: this.name.replace(/\s+/g, ""),
          birthday: this.birth,
          type: '身份证',
          code: this.num.replace(/\s+/g, ""),
          authType: 'c1',
          photo_front: '',
          photo_back: '',
          useruuid: this.$store.getters.uuid
        };
        this.$store.dispatch("setC1Auth", 'C1');

        lh_http('post', url, send_msg).done(res => {
          if (!res.status) {
            alert(res.data);
            return
          }
          location.hash = '/user/auth';
          location.reload();
        })
      },
      getBirthday(){
        let _this = this;
        window.laydate({
          elem: '#laydate_point',
          format: "YYYY-MM-DD",
          max: window.laydate.now(),
          istoday: false,
          istime: false,
          fixed: false,
          choose(time) {
            _this.birth = time;
          }
        })
      },
    },

    mounted(){
      this.getBirthday();
    },
    computed: {},
  }
</script>

<style lang="scss" scoped>
  .auth {
    text-align: left;
    font-size: 16px;
    #laydate_point {
      border: 1px #9b9b9b solid;
      line-height: 43px;
      padding: 0 15px;
      height: 43px;
      border-radius: 3px;
      cursor: pointer;
    }
    .container {
      /*border: 1px solid #efefef;*/
      padding: 50px 0;
      text-align: center;
      .red {
        &.tip_txt {
          position: absolute;
          top: 50%;
          -webkit-transform: translate(100%, -50%);
          -moz-transform: translate(100%, -50%);
          -ms-transform: translate(100%, -50%);
          -o-transform: translate(100%, -50%);
          transform: translate(100%, -50%);
          right: -10px;
        }

        font-size: 12px;
        color: #ff6464;
      }
      .info_title {
        margin-left: 47px;
        margin-bottom: 33px;
        overflow: hidden;
        text-align: left;

        .tit_tip {
          font-size: 16px;
          color: #494949;
        }
        .icon_img {
          width: 60px;
          height: 60px;
          margin-right: 27px;
        }
        li {
          /*float: left;*/
          display: inline-block;
          vertical-align: middle;
        }
      }
      .details {
        display: inline-block;
        margin-left: -80px;
        li {
          margin-bottom: 30px;
          margin-left: 35px;
          .title {
            display: inline-block;
            width: 80px;
            text-align: right;
            color: #283138;
            margin-right: 38px;
          }
          .st_span {
            display: inline-block;
            width: 90px;
            text-align: right;
            margin-right: 50px;
          }
          .account {
            text-align: left;
            span {
              text-align: left;
              margin-right: 0;
              width: initial;
              color: #0093F1
            }
          }
          .box {
            width: 412px;
            display: inline-block;
            text-align: left;
            position: relative;
            margin-right: 10px;
            vertical-align: middle;
            .changsize {
              font-size: 12px;
              margin: 0;
            }
            .code {
              position: absolute;
              right: 15px;
              top: 15px;
            }
            .check_box {
              position: absolute;
              font-size: 14px;
            }
            .sms_msg {
              span {
                width: initial;
                color: #f35809;
              }
            }
            .codeIcon {
              position: absolute;
              top: 2px;
              right: 10px;
              width: 100px;
              height: 40px;
              background: #ccc;
            }
            input[type="text"] {
              width: 412px;
              padding: 0 15px;
              height: 45px;
              border: 1px solid #9b9b9b;
              border-radius: 3px;
            }
            button {
              width: 412px;
              height: 45px;
              line-height: 45px;
              background: #0093F1;
              margin-top: 30px;
              color: #fff;
              text-align: center;
              cursor: pointer;
              &:hover {
                background: darken(#0093F1, 10%);
              }
            }
          }
        }
      }
    }
  }
</style>
