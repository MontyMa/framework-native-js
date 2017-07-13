<template>
  <div class="cny_withdraw_handle">
    <ul>
      <li>
        <span class="handle_item">选择银行卡</span>
        <div class="box">
          <vue-select-bank @thisbankName="getBankName" :type="chargeType"
                           @thisbankAccount="getAccount"></vue-select-bank>
          <i>*仅允许提现到与账户实名认证姓名一致的银行卡账户</i>
        </div>
      </li>
      <li>
        <span class="handle_item">最大可提现金额</span>
        <div class="box">
          <span>{{avaliableAmount}} CNY</span>
        </div>
      </li>
      <li>
        <span class="handle_item">提现金额</span>
        <div class="box">
          <input type="text" placeholder="请输入提现金额" v-model="widthdrawAmount" @blur="judgeAmount"/>
        </div>
      </li>
      <li>
        <span class="handle_item">手续费</span>
        <div class="box">
          <span>{{poundage}} CNY</span>
        </div>
      </li>
      <li>
        <span class="handle_item">实际到账金额</span>
        <div class="box">
          <p>{{actualAmount | number(2)}}<span>CNY (24小时内)</span></p>
        </div>
      </li>
      <policy-handle :type="getMcode.type" @payPwd="getPayPwd" @token="getToken" @smscode="getSmsCode"></policy-handle>
      <!--策略-->
      <!--			<li>
                      <span class="handle_item">资金密码</span>
                      <div class="box">
                          <input type="password" placeholder="请输入资金密码" v-model="payPwd" />
                          <a class="forget_hint" href="javascript:void(0);">忘记资金密码</a>
                      </div>
                  </li>
                  <li v-if="isbandPhone">
                      <span class="handle_item">短信验证码</span>
                      <div class="box">
                          <sms-code @smsMsg="getSmsCode" :type="getMcode.type"></sms-code>
                      </div>
                  </li>-->
      <!---->
      <li>
        <span class="handle_item"></span>
        <div class="box">
          <button type="button" @click="widthdraw">确定提现</button>
        </div>
      </li>
    </ul>
    <div class="help">
      <router-link to="/help/how-withdraw">查看提现帮助教程</router-link>
      <span>&raquo;</span>
      <!--查看提现帮助教程<span>&raquo;</span>-->
    </div>
  </div>
</template>

<script>
  import vueSelectBank from '../components/vueSelectBank'
  import policyHandle from './policyHandle'
  export default {
    name: 'cnyWithdrawHandle',
    data() {
      return {
        chargeType: 'bank', //传递给选择框组件，判断显示条件
        avaliableAmount: 0.00, //最大可提现金额（可用的）
        widthdrawAmount: 0.00,
        actualAmount: 0,
        getMcode: {
          type: 'rmbWithDraw'
        },
        //初始化参数
        account: "", //提现账户
        drawType: "法币提现", //提现类型
        assetCode: "cny", //货币编码
        bankName: "", //开户支行
        mcode: "", //短信验证码
        payPwd: "", //资金密码
        token: "", //谷歌验证码
        clearMsg: {
          clear: false
        },
        //
      }
    },
    computed: {
      vipfee() {
        lh_http('get', 'customerInfo/vipInfo', {}).done((res) => {
          if (res.status) {
            return res.data.vipInfo.currencyRates.CNY_DRAW_RATE
          }
        });
        return 0.003;
      },
      //手续费
      poundage() {
        let fee = (this.widthdrawAmount * this.vipfee).toFixed(2);
        if (fee <= 2) {
          return '2.00';
        } else {
          return fee;
        }
      },
      //判断是否绑定手机
      isbandPhone() {
        if (this.$store.getters.validationMobile) {
          return true;
        }
      },
      thisuuid() {
        return this.$store.getters.uuid;
      }
    },
    watch: {
      //实际到账金额
      widthdrawAmount(val) {
        /*let reg = /[^0-9]/g;
         this.widthdrawAmount = val.replace(reg, '');*/
        //    	this.widthdrawAmount = val.replace(/[^\d.]/g,"");
        val = `${val}`;
        this.widthdrawAmount = val.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符
        this.widthdrawAmount = this.widthdrawAmount.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
        this.widthdrawAmount = this.widthdrawAmount.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        this.widthdrawAmount = this.widthdrawAmount.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
        if (this.widthdrawAmount.indexOf(".") < 0 && this.widthdrawAmount != "") { //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
          this.widthdrawAmount = parseFloat(this.widthdrawAmount);
        }
        //let n = this.widthdrawAmount - this.poundage;
        let n = val - this.poundage;
        if (n <= 0) {
          this.actualAmount = 0;
        } else {
          this.actualAmount = (this.widthdrawAmount - this.poundage).toFixed(2);
        }
      }
    },
    components: {
      vueSelectBank,
      policyHandle
    },
    methods: {
      //监听银行账号
      getBankName(val) {
        this.bankName = val;
      },
      getAccount(val) {
        this.account = val;
      },
      //获取短信验证码
      getSmsCode(val) {
        this.mcode = val;
      },
      //获取资金密码
      getPayPwd(val) {
        //console.log('pwd', val)
        this.payPwd = val;
      },
      //获取资金谷歌验证码
      getToken(val) {
        //console.log('token', val)
        this.token = val;
      },
      //获取用户资金信息
      getUserInfo() {
        lh_http('post', 'customerAsset/cnyAccount', {}).done((res) => {
          if (res.status) {
            let cny_usable = res.data.account.cny_usable;
            this.$nextTick(() => {
              this.avaliableAmount = this.widthdrawAmount = cny_usable;
            });
          }
        })
      },
      //判断输入的金额
      judgeAmount() {
        if (this.widthdrawAmount) {
          if (this.widthdrawAmount < 100) {
            alert("最低限额为100!");
            this.widthdrawAmount = 100;
          } else if (this.widthdrawAmount <= 2000000) {
            if (this.widthdrawAmount > this.avaliableAmount) {
              alert("已超出最大可取金额!")
              this.widthdrawAmount = this.avaliableAmount;
            }
          } else if (this.widthdrawAmount > 2000000) {
            alert("单笔最高提现金额为2000000!")
            this.widthdrawAmount = 2000000;
          }
        }
        /*    		else if(this.widthdrawAmount > this.avaliableAmount){
         alert("已超出最大可取金额!")
         this.widthdrawAmount = this.avaliableAmount;
         }*/
      },
      //提现
      widthdraw() {
        let options = {
          "useruuid": this.thisuuid, //调试时传去
          "account": this.account, //提现账户
          "drawType": this.drawType, //提现类型
          "assetCode": this.assetCode, //货币编码
          "amount": this.widthdrawAmount, //提现金额
          "walletFee": this.poundage, //手续费
          "bankName": this.bankName, //开户支行
          "mcode": this.mcode, //短信验证码
          "payPwd": this.payPwd, //资金密码
          "token": this.token //谷歌验证码
        };
        lh_http('post', 'drawOrder/createDrawOrder', options).done((res) => {
          if (res.status) {
            this.$store.dispatch('updateCnyList', true);
            //提现成功后清空数据
            this.$store.dispatch('clearPolicyMsg', true);
            this.$store.dispatch('clearMsg', true);
            alert("提现成功!");
            this.getUserInfo();

            this.widthdrawAmount = "";
          } else {
            alert(res.data);
          }
        })
      }
    },
    mounted() {
      this.getUserInfo();
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .cny_withdraw_handle {
    width: 475px;
    border-right: 1px solid #e2e2e2;
    font-size: 13px;
    padding-top: 32px;
    margin-bottom: 70px;
    ul {
      li {
        margin-bottom: 30px;
        .handle_item {
          display: inline-block;
          width: 100px;
          text-align: right;
          margin-right: 30px;
        }
        .box {
          width: 320px;
          display: inline-block;
          position: relative;
          vertical-align: middle;
          input {
            width: 320px;
            padding: 0 10px;
            height: 35px;
            border: 1px solid #9b9b9b;
            border-radius: 3px;
          }
          select {
            @extend input;
          }
          option {
            height: 40px;
          }
          i {
            display: block;
            font-size: 12px;
            font-style: normal;
            position: absolute;
            top: 38px;
            color: #f06104;
          }
          .forget_hint {
            @extend i;
            color: #0093F1;
            display: inline-block;
            width: 100%;
            text-align: right;
          }
          span {
            text-align: left;
          }
          p {
            font-size: 24px;
            color: #dd1a53;
            span {
              font-size: 13px;
              color: #000;
              display: inline;
            }
          }
          .reset_width_220 {
            width: 220px;
            margin-right: 5px;
          }
          .reset_width_90 {
            width: 90px;
            color: #9b9b9b;
          }
          button {
            width: 320px;
            height: 40px;
            line-height: 40px;
            font-size: 18px;
            background: #0093F1;
            color: #fff;
            text-align: center;
            cursor: pointer;
            &:hover {
              background: #26a8fb;
            }
            &:active {
              background: #0084d9;
            }
          }
          .container {
            position: relative;
            .item {
              position: absolute;
              left: 0;
              top: 35px;
              background: #fff;
              z-index: 10;
              box-shadow: 0 0px 15px #ccc;
              span {
                display: block;
                height: 40px;
                line-height: 40px;
                width: 320px;
                padding: 0 15px;
                margin: 0;
                &:hover {
                  background: #0093F1;
                  color: #fff;
                }
              }
            }
          }
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
        color: #0093F1;
      }
    }
  }
</style>
