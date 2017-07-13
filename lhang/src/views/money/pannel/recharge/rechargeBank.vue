<template>
  <div class="recharge_cny">
    <div class="title">
      <p>银行卡充值步骤：</p>
      <div>
        <span>1、填写并生成充值申请</span>
        <i></i>
        <span>2、前往您的网银向指定账户转账</span>
        <i></i>
        <span>3、完成充值后2小时内到账</span>
      </div>
    </div>
    <div class="container clearFix">
      <div class="container_left">
        <!--<recharge-cny-step></recharge-cny-step>-->
        <div class="charge_cny_step">
          <ul>
            <li>
              <span class="itemname">银行账号</span>
              <div class="box">
                <vue-select-bank @thisbankAccount="getBankAccount" :type="chargeType"></vue-select-bank>
              </div>
            </li>
            <li>
              <span class="itemname">充值金额</span>
              <div class="box">
                <input type="text" placeholder="请输入充值金额" v-model="assetAmt"/><span
                class="rdmNum">{{random}}</span>
                <p class="hint">为了快速到账,请严格按上述金额汇款，包括<span>小数点后两位{{random}}</span></p>
              </div>
            </li>
            <li class="changeHeight">
              <span class="itemname">通知手机</span>
              <div class="box">
                <input type="text" placeholder="请输入手机号" v-model="mobile"/>
                <div class="bind_phone">
                  <!--<input type="checkbox" v-model="useBindPhone" /><span>使用绑定手机号码</span>-->
                  <div class="check_box">
                    <label>
                      <input type="checkbox" class="g_i_check" v-model="useBindPhone"/>
                      <span></span>
                      <span class="g_label sms_msg">使用绑定手机号码</span>
                    </label>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <span class="itemname"></span>
              <div class="box">
                <button type="button" @click="chargeApply">生成充值申请</button>
              </div>
            </li>
          </ul>
          <div class="help">
            <router-link to="/help/how-recharge">查看充值教程</router-link>
            <span>&raquo;</span></div>
        </div>
      </div>
      <div class="container_right">
        <recharge-cny-info :type="chargeType"></recharge-cny-info>
      </div>
    </div>
    <modal v-if="showModal" @closeModal="closeThisModal" :amount="totalMoney" :markMsg="uniqueCode"></modal>
  </div>
</template>

<script>
  import rechargeCnyInfo from "./rechargeCnyInfo"
  import rechargeRecord from "./rechargeRecord"
  import vueSelectBank from '../components/vueSelectBank'
  import modal from './modal'

  import rechargeAlipay from './rechargeAlipay'
  export default {
    name: 'CNYwithdraw',
    data() {
      return {
        //ajax参数
        depositType: "银行卡充值",
        account: '',
        assetCode: "cny",
        assetAmt: "",
        mobile: "",
        mark: "",
        bankName: "",
        //
        random: 0,
        totalMoney: 0,
        updateList: false, //添加成功后通知列表更新
        useBindPhone: false, //使用绑定手机
        moneyType: 'cny',
        showSuccessModal: false,
        uniqueCode: '',
        showModal: false,
        chargeType: 'bank'
      }
    },
    computed: {
//			//生成随机数并去除整数位0
//			random() {
//				//let ranNum = Math.random().toFixed(2);
//				let ranNum = (Math.random() * (0.99 - 0.01) + 0.01).toFixed(2);
//				let s = ranNum.toString().replace(/^0/, '');
//				return s;
//			},
      thisuuid() {
        return this.$store.getters.uuid;
      },
      //获取绑定手机号码
      getBindPhone() {
        if (this.$store.getters.getUser) {
          return this.$store.getters.getUser.customerInfo.mobile;
        }
      },
    },
    components: {
      rechargeCnyInfo,
      vueSelectBank,
      modal,
      rechargeAlipay
    },
    watch: {
      //使用绑定手机号码
      useBindPhone(val) {
        if (val) {
          if (this.getBindPhone) {
            this.mobile = this.getBindPhone;
          } else {
            alert("您尚未绑定手机!")
          }
        } else {
          this.mobile = "";
        }
      },
      assetAmt (val) {
        this.totalMoney = val + this.random;
        let reg = /[^0-9]/g;
        this.assetAmt = val.replace(reg, '');
      }
    },
    methods: {
      randomNum () {
        let ranNum = (Math.random() * (0.99 - 0.01) + 0.01).toFixed(2);
        //let ranNum = random.toFixed(2);
        let s = ranNum.toString().replace(/^0/, '');
        //console.log('random', s);
        this.random = s;
      },
      //立即充值
      chargeApply() {
        let options = {
          useruuid: this.thisuuid,
          depositType: this.depositType,
          account: this.account,
          assetCode: this.assetCode,
          assetAmt: this.totalMoney,
          mobile: this.mobile,
          mark: this.mark,
          bankName: this.bankName
        };
        //console.log(options);
        if (!this.account) {
          alert("请输入银行卡号!");
        } else if (!this.assetAmt) {
          alert("请输入充值金额！")
        } else if (!this.assetAmt) {
          alert("请输入手机号！")
        } else {
          lh_http("post", 'depositOrder/deposit', options).done((res) => {
            //console.log(res)
            if (res.status) {
              this.uniqueCode = res.data.mark;
              this.showModal = true;
              this.$store.dispatch("showShadowBox", true);
              this.useBindPhone = false;
              this.$store.dispatch("updateList", true);
              this.randomNum();
            } else {
              alert(res.data);
            }
          });
        }
      },
      //监听银行账号
      getBankAccount(val) {
        this.account = val;
      },
      closeThisModal(val) {
        this.showModal = val;
        this.assetAmt = '';
        this.mobile = ''
      },
    },
    mounted () {
      this.randomNum();
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .recharge_cny {
    .clearFix:after {
      display: block;
      content: "";
      clear: both;
    }
    .charge_type {
      overflow: hidden;
      .chargeType {
        float: left;
        margin-top: 20px;
        margin-right: 40px;
      }
      margin-top: 34px;
      ul {
        float: left;
        height: 65px;
        overflow: hidden;
        li {
          float: left;
          margin-right: 30px;
          width: 110px;
          height: 61px;
          position: relative;
          cursor: pointer;
          img {
            width: 110px;
            height: 61px;
          }
          .clicked {
            display: inline-block;
            width: 22px;
            height: 22px;
            background: url(./img/clicked.png) no-repeat;
            background-size: 100%;
            position: absolute;
            right: -12px;
            bottom: -5px;
          }
        }
      }
      .tips {
        margin-left: 140px;
        float: left;
        margin-top: 15px;
        height: 55px;
        span {
          color: #f06104;
        }
      }
    }
    .title {
      p {
        margin-bottom: 15px;
      }
      div {
        background: #F2F9FE;
        height: 40px;
        line-height: 40px;
        padding-left: 6px;
        span {
          color: #0093F1;
        }
        i {
          display: inline-block;
          width: 29px;
          height: 15px;
          background: url(../../images/to_left.png) no-repeat left;
          vertical-align: middle;
          margin-left: 20px;
          margin-right: 30px;
        }
      }
    }
    .container {
      margin-top: 23px;
      margin-bottom: 65px;
      .container_left {
        float: left;
        width: 475px;
      }
      .container_right {
        float: left;
        width: 432px;
      }
    }
    .charge_cny_step {
      border-right: 1px solid #e2e2e2;
      font-size: 13px;
      padding-top: 33px;
      padding-bottom: 50px;
      ul {
        li {
          margin-bottom: 30px;
          .itemname {
            display: inline-block;
            margin-left: 25px;
            text-align: right;
            margin-right: 32px;
            width: 52px;
          }
          .box {
            width: 320px;
            display: inline-block;
            position: relative;
            vertical-align: middle;
            input[type=text],
            input[type=password] {
              width: 320px;
              padding: 0 10px;
              height: 35px;
              border: 1px solid #9b9b9b;
              border-radius: 3px;
            }
            select {
              @extend input;
            }
            button {
              margin-top: 15px;
              width: 320px;
              height: 40px;
              line-height: 40px;
              background: #0093F1;
              color: #fff;
              text-align: center;
              cursor: pointer;
              font-size: 18px;
              &:hover {
                background: #26a8fb;
              }
              &:active {
                background: #0084d9;
              }
            }
            .hint {
              position: absolute;
              top: 42px;
              text-align: justify;
              width: 326px;
              font-size: 12px;
              color: #9B9B9B;
              span {
                color: #F06104;
              }
            }
            .rdmNum {
              position: absolute;
              right: -20px;
              top: 8px;
              color: #F06104;
            }
            .bind_phone {
              position: absolute;
              top: 40px;
              .sms_msg {
                display: inline-block;
                vertical-align: middle;
              }
            }
          }
          &.changeHeight {
            margin-top: 36px;
          }
        }
      }
      .help {
        text-align: right;
        margin-right: 35px;
        color: #0093F1;
        cursor: pointer;
        margin-top: -20px;
        span {
          font-size: 150%;
          margin-left: 5px;
        }
      }
    }
  }
</style>
