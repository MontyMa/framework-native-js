<template>
  <div class="cny_withdraw_handle">
    <ul>
      <li>
        <span class="handle_item">选择提币地址</span>
        <div class="box">
          <vue-select-bank :type="chargeType" @thisbankAccount="getAddress"></vue-select-bank>
        </div>
      </li>
      <li>
        <span class="handle_item">最多可提{{type.moneytype | toUpper}}</span>
        <div class="box">
          <span>{{avaliableAmount}} {{ type.moneytype | toUpper}}</span>
        </div>
      </li>
      <li>
        <span class="handle_item">提币数量</span>
        <div class="box">
          <input type="text" placeholder="请输入提币数量" class="reset_width_150" v-model="widthdrawAmount"
                 @blur="judgeAmount"> ≈
          <input type="text" class="reset_width_150" placeholder="0 CNY" disabled :value="toCny"/>
        </div>
      </li>
      <li>
        <span class="handle_item">网络手续费</span>
        <div class="box">
          <vue-select :type="type.moneytype" @selectVal="getSltVal"></vue-select>
        </div>
      </li>
      <li>
        <span class="handle_item">实际到账{{type.moneytype | toUpper}}</span>
        <div class="box">
          <p>{{actualAmount | number(4)}}<span>{{type.moneytype | toUpper}}</span></p>
        </div>
      </li>
      <li>
        <policy-handle :type="getMcode.type"
                       @payPwd="getPayPwd"
                       @token="getToken"
                       @smscode="getSmsCode"></policy-handle>
      </li>

      <!---->
      <!--			<li>
                      <span class="handle_item">资金密码</span>
                      <div class="box">
                          <input type="password" placeholder="请输入资金密码" v-model="payPwd" />
                          <a href="javascript:void(0);" class="forget_hint">忘记资金密码</a>
                      </div>
                  </li>
                  <li v-if="validationMobile">
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
  import vueSelect from '../components/vueSelect'
  import policyHandle from './policyHandle'
  import store from '../../../../vuex/store'
  export default {
    props: ['type'],
    data() {
      return {
        //chargeType: 'btcAddress',//传递给选择框组件，判断显示条件
        avaliableAmount: 0.00, //最大可提现金额（可用的）
        widthdrawAmount: 0.00,
        actualAmount: 0,
        poundage: '',
        marketPrice: '',
        getMcode: {
          type: this.type.moneytype + 'WithDraw'
        },
        //初始化参数
        address: "", //提现账户
        drawType: "数字资产提现", //提现类型
        //assetCode: "btc",//货币编码
        mcode: "", //短信验证码
        payPwd: "", //资金密码
        token: "" //谷歌验证码
        //
      }
    },
    computed: {
      //传递给选择框组件，判断显示条件
      chargeType() {
        return this.type.moneytype + "Address";
      },
      //判断是否绑定手机
      validationMobile() {
        if (this.$store.getters.validationMobile) {
          return true;
        }
      },
      thisuuid() {
        return this.$store.getters.uuid;
      },
      //获取当前比特币能折换多少人民币
      closeingCny() {
        return this.$store.getters.closingPrice;
      },
      //获取当前的比特币可以换多少人民币
      socket() {
        let channel = 'sub_spot_' + this.type.moneytype + '_cny_dailydata';
        return this.$store.getters[channel].data;
      },
      toCny() {
        if (this.widthdrawAmount) {
          let val = (this.widthdrawAmount * this.marketPrice).toFixed(2);
          return val + "CNY";
        }
      }
    },
    watch: {
      //实际到账金额
      widthdrawAmount(val) {
        /*        let reg = /[^0-9]/g;
         this.widthdrawAmount = val.replace(reg, '');*/

        val = `${val}`;
        this.widthdrawAmount = val.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符
        this.widthdrawAmount = this.widthdrawAmount.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
        this.widthdrawAmount = this.widthdrawAmount.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        this.widthdrawAmount = this.widthdrawAmount.replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/, '$1$2.$3'); //只能输入两个小数
        if (this.widthdrawAmount.indexOf(".") < 0 && this.widthdrawAmount != "") { //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
          this.widthdrawAmount = parseFloat(this.widthdrawAmount);
        }

        let n = val - this.poundage;

        if (n <= 0) {
          this.actualAmount = 0;
        } else {
          this.actualAmount = (this.widthdrawAmount - this.poundage).toFixed(4);
        }
      },
      //实际到账金额
      poundage(val) {
        let n = this.widthdrawAmount - this.poundage;
        if (n <= 0) {
          this.actualAmount = 0;
        } else {
          this.actualAmount = this.widthdrawAmount - this.poundage;
        }
      },
      //
      socket(val) {
        if (val) {
          this.marketPrice = val.closingPrice;
        }
      }
    },
    components: {
      vueSelectBank,
      vueSelect,
      policyHandle
    },
    methods: {
      //监听银行账号
      getAddress(val) {
        this.address = val;
      },
      //获取短信验证码
      getSmsCode(val) {
        this.mcode = val;
      },
      //获取资金密码
      getPayPwd(val) {
        this.payPwd = val;
      },
      //获取资金谷歌验证码
      getToken(val) {
        this.token = val;
      },
      //获取用户资金信息
      getUserInfo() {
        lh_http('post', 'customerAsset/cnyAccount', {}).done((res) => {
          if (res.status) {
            let usable = res.data.account[`${this.type.moneytype}_usable`];
            this.$nextTick(() => {
              this.avaliableAmount = this.widthdrawAmount = usable;
            })
          }
        })
      },
      //判断输入的金额
      judgeAmount() {
        let name = this.type.moneytype.toUpperCase();
        if (this.widthdrawAmount) {
          if (this.widthdrawAmount < 0.01) {
            alert("最低限额为0.01" + name + "!");
            this.widthdrawAmount = 0.01;
          } else if (this.avaliableAmount <= 500) {
            if (this.widthdrawAmount > this.avaliableAmount) {
              alert("已超出最大可取金额!");
              this.widthdrawAmount = this.avaliableAmount;
            }
          } else if (this.widthdrawAmount > 500) {
            alert("每日最高提现额为500" + name + "!");
            this.widthdrawAmount = 500;
          }
        }
      },
      //获取网络手续费用
      getSltVal(val) {
        this.poundage = val;
      },
      //提现
      widthdraw() {
        let options = {
          "useruuid": this.thisuuid, //调试时传去
          "account": this.address, //提现账户
          "drawType": this.drawType, //提现类型
          "assetCode": this.type.moneytype, //货币编码
          "amount": this.widthdrawAmount, //提现金额
          "walletFee": this.poundage, //手续费
          "mcode": this.mcode, //短信验证码
          "payPwd": this.payPwd, //资金密码
          "token": this.token //谷歌验证码
        };
        this.$store.dispatch('updateDigistList', true);
        lh_http('post', 'drawOrder/createDrawOrder', options).done((res) => {
          if (res.status) {
            this.$store.dispatch('updateDigistList', true);
            //提现成功后清空输入数据
            this.$store.dispatch('clearPolicyMsg', true);
            this.$store.dispatch('clearMsg', true);
            alert("提现成功!");
            this.widthdrawAmount = "";
            this.getUserInfo();
          } else {
            alert(res.data)
          }
        })
      },

    },
    mounted() {
      this.$store.dispatch('send', {
        channel: `sub_spot_${this.type.moneytype}_cny_dailydata`,
      });
      this.getUserInfo();
    },
    filters: {
      toUpper(val) {
        return val.toString().toUpperCase();
      }

    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .cny_withdraw_handle {
    width: 475px;
    border-right: 1px solid #e2e2e2;
    font-size: 13px;
    margin-bottom: 70px;
    padding-top: 32px;
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
          .reset_width_150 {
            width: 150px;
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
