<!--Created by monty.ma on 17/7/4.-->
<template>
  <div class="market_price">
    <!--可用资产-->
    <div class="market_head">
      <account-usable :tradetype="tradetype" :currentType="currentType"
                      @assets="getAssets" @assetCny="getClickAssetsCny"
                      @assetCategroy="getClickAssetsCny"/>
      <div class="recharge_link">
        <router-link to="/money/recharge" v-if="tradetype==='buy'">充值</router-link>
        <router-link :to='`/money/recharge?chargeType=${currentType}`' v-else-if="tradetype==='sell'">充币</router-link>
      </div>
    </div>
    <!--主体-->
    <div class="market_body">
      <div class="group">
        <label class="input_label">
          <div class="input_tit">{{tradetype === 'buy' ? '买入价格' : '卖出价格'}}</div>
          <div class="trade_input input_mod">
            <div class="input input_disable">
              {{tradetype === 'buy' ? '以市场最优价格买入' : '以市场最优价格卖出'}}
              <span class="input_tip_market">[?]</span>
            </div>
          </div>
        </label>
        <label class="input_label">
          <div class="input_tit">{{tradetype === 'buy' ? '买入金额' : '卖出数量'}}</div>
          <div class="trade_input input_mod">
            <input class="input j_input_sec" type="text" autocomplete="off"
                   :class="tradetype==='buy'? 'g_price_red':'g_price_green'"
                   @input='inputSecEvent' v-model="inputSec"/>
            <div class="input_tip" v-if="tradetype === 'buy'">CNY</div>
            <div class="input_tip" v-if="tradetype === 'sell'">{{currentType.toUpperCase()}}</div>
          </div>
        </label>
        <div class="range_box">
          <div></div> <!--用于布局-->
          <range v-if="tradetype==='buy'" @thisvalue="getRangeVal" :min="0" :max="100" :step="25" :theme="'danger'"
                 :value="rangeBuyValue"
                 class="market_range"></range>
          <range v-if="tradetype==='sell'" @thisvalue="getRangeVal" :min="0" :max="100" :step="25" :theme="'danger'"
                 :value="rangeSellValue"
                 class="market_range"></range>
        </div>
      </div>
      <div class="group">
        <label class="input_label">
          <div class="input_tit"></div>
          <div class="trade_input input_mod">
            <ul class="pre_quantity">
              <li>{{tradetype === 'buy' ? '预计买入量' : '预计卖出金额'}}</li>
              <li>
                <span class="quantity"
                      :class="tradetype==='buy'?
                      'g_price_red':
                      'g_price_green'">
                  {{inputThir}}
                </span>
                <template v-if="tradetype === 'buy'">
                  {{currentType.toUpperCase()}}
                </template>
                <template v-if="tradetype === 'sell'">CNY</template>
              </li>
            </ul>
            <div class="quantity_tip">
              <span :class="tradetype==='buy'? 'g_price_red':'g_price_green'">*</span>
              以实际{{tradetype === 'buy' ? '买入量' : '卖出金额'}}为准，以上仅为预估值
            </div>
          </div>
        </label>
        <assets-password @assetsPassword="getPassword" :tradetype="tradetype"></assets-password>
        <div class="btn_box">
          <div></div> <!--用于布局-->
          <div class="btn" :class="tradetype === 'buy'?'red':'green'"
               @click="runRequest">
            {{tradetype === 'buy' ? '买入' : '卖出'}}{{currentType.toUpperCase()}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import accountUsable from './account_usable.vue'; //可用资产
  import range from '../trade/pannel/pannel/range.vue';  //拖动条
  import assetsPassword from './assets_password.vue';  //资金密码

  export default {
    name: 'market_price',
    props: {
      tradetype: {type: String, required: true},//控制买和卖
      newPriceObj: {type: Object, required: true}, //接收最新成交价 socket
      requestObj: {type: Object}, //需要挂单后重新请求的接口
    },
    data() {
      return {
        uuid: this.$store.getters.uuid, //uuid
        regExp: /[A-z]/g,
        inputSec: '',  //第二输入框
        inputThir: '',  //第三个计算值
        usableAssets: {}, //可用资产
        passwordInput: '', //资金密码
        isClick: true, //控制不可重复点击
      }
    },
    components: {accountUsable, range, assetsPassword},
    computed: {
      currentType(){  //当前货币对
        return this.$route.params.type;
      },
      closingPrice(){ //价格
        return +this.newPriceObj.closingPrice
      },
      rangeBuyValue(){  //控制购买拖动条传入值
        if (!this.usableAssets.asset_cny)return;
        let a = (this.inputSec / this.usableAssets.asset_cny) * 100;
        if (a > 100) a = 100;
        return a ? a : 0;
      },
      rangeSellValue(){
        let usableAssetsCate = this.usableAssets[`asset_${this.currentType}`];
        if (!usableAssetsCate)return;
        let a = (this.inputSec / usableAssetsCate) * 100;
        if (a > 100) a = 100;
        return a ? a : 0;
      }
    },
    methods: {
      getAccuracy(val, acc){  //获取精度
        let accNum = Math.pow(10, +acc);
        let valNum = Number(val);
        return valNum && valNum !== 0 ? Math.floor(valNum * accNum) / accNum : 0;
      },
      getAssets(res){ //获取可用资产
        this.usableAssets = res;
      },
      getClickAssetsCny(res){ //获取点击后的可用的数字资产
        this.inputSec = res;

        let distinguish = {
          buy: () => this.inputThir = this.getAccuracy(+this.inputSec / this.closingPrice, 2),
          sell: () => this.inputThir = this.getAccuracy(+this.inputSec * this.closingPrice, 4),
        };
        distinguish[this.tradetype]();
      },
      checkInput(event, input){ //检查input 的输入
        let targetVal = $(event.target).val();
        this[input] = targetVal.replace(this.regExp, '');

        if (targetVal.split('.').length > 2) {
          this[input] = '';
        }

        return this[input];
      },

      inputSecEvent(event){  //数量输入事件
        let inputVal = this.checkInput.call(this, event, 'inputSec');
        let inputValNum = Number(inputVal);
        let distinguish = {
          buy: this.getAccuracy(inputValNum / this.closingPrice, 4),
          sell: this.getAccuracy(inputValNum * this.closingPrice, 2),
        };

        this.inputThir = distinguish[this.tradetype];
      },

      getRangeVal(val){    //获取拖动条数据
        val = +val / 100;
        let rangeFunc = {
          buy(){
            let asset_cny = this.usableAssets.asset_cny;
            if ($('.j_input_sec').is(':focus'))return;
            this.inputSec = this.getAccuracy(asset_cny * val, 2);
            this.inputThir = this.getAccuracy(this.inputSec / this.closingPrice, 4);
          },
          sell(){
            if ($('.j_input_sec').is(':focus'))return;
            this.inputSec = this.getAccuracy(this.usableAssets[`asset_${this.currentType}`] * val, 4);
            this.inputThir = this.getAccuracy(this.closingPrice * this.inputSec, 2);
          }
        };

        rangeFunc[this.tradetype].call(this);
      },
      getPassword(password){ //获取资金密码
        this.passwordInput = password;
      },
      runRequest(){ //发送请求
        let options = {
          useruuid: this.uuid,
          price: this.closingPrice,
          paypwd: this.passwordInput,
          category: this.currentType + "_cny"
        };

        let typePool = {
          buy: () => {
            let obj = {
              type: 'buy_market',
              quantity: this.inputThir,
              amount: this.inputSec,
            };
            return Object.assign(options, obj);
          },
          sell: () => {
            let obj = {
              type: 'sell_market',
              quantity: this.inputSec,
              amount: this.inputThir,
            };
            return Object.assign(options, obj);
          }
        };

        let option = typePool[this.tradetype]();
        if (!Number(option.amount) || !Number(option.price) || !Number(option.quantity)) {
          alert('输入有误，请重新输入');
          return;
        }
        if (!this.isClick)return;
        this.isClick = false;
        console.log(options, 'options');
//        return;
        lh_http("post", "order/createorder", options).done((res) => {
          if (!res.status) {
            alert(res.data);
            this.isClick = true;
            return;
          }

          alert("挂单完成");
          this.inputSec = null;
          this.inputThir = null;
          this.passwordInput = null;
          //记住资金密码两小时
          cookie().rememberPayPwd("rememberPaypwd", false);
          this.reappearRequest();
          this.isClick = true;
        });
      },
      reappearRequest(){  //  重新获取一下需要的数据
        let key = Object.keys(this.requestObj);
        setTimeout(() => key.forEach(elem => this.requestObj[elem] && this.requestObj[elem]()), 800);
      }
    },
    beforeMount(){
    },
    mounted() {
    },
    watch: {
      $route(){
        this.inputSec = null;
        this.inputThir = null;
        this.passwordInput = null;
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .market_price {
    border: 1px solid #6F8EA1;
    width: 390px;
    padding: 10px 20px 20px 20px;
    background-color: #EBF6FE; /* fallback color if gradients are not supported */
    background-image: -webkit-linear-gradient(top, #EBF6FE, #FFFFFF); /* For Chrome 25 and Safari 6, iOS 6.1, Android 4.3 */
    background-image: -moz-linear-gradient(top, #EBF6FE, #FFFFFF); /* For Firefox (3.6 to 15) */
    background-image: -o-linear-gradient(top, #EBF6FE, #FFFFFF); /* For old Opera (11.1 to 12.0) */
    filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr='#EBF6FE', endColorStr='#FFFFFF', gradientType=0);
    background-image: linear-gradient(to bottom, #EBF6FE, #FFFFFF); /* Standard syntax; must be last */
    .market_head {
      display: flex;
      justify-content: space-between;
    }
    .recharge_link {
      font-size: 12px;
      font-weight: 600;
      color: #0093F1;
    }
    .input_label {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }
    .input_tit {
      font-size: 12px;
    }
    .input_mod {
      width: 281px;
    }
    .pre_quantity {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      .quantity {
        font-size: 14px;
        font-weight: 600;
        margin-right: 5px;
      }
    }
    .quantity_tip {
      font-size: 12px;
      color: #494949;
      margin-top: 5px;
    }
    .range_box, .password_tip, .tip, .btn_box {
      display: flex;
      justify-content: space-between;
    }
    .btn_box {
      margin-top: 15px;
      .btn {
        width: 281px;
        color: #ffffff;
        font-size: 12px;
        text-align: center;
        line-height: 36px;
        border-radius: 2px;
        cursor: pointer;
        &.red {
          background-color: #E93C6F;
        }
        &.green {
          background-color: #3AC569;
        }
      }
    }
    .tip {
      width: 281px;
      .link_style {
        color: #333333;
        font-size: 12px;
        display: block;
      }
    }
    .market_range {
      width: 281px;
      -webkit-transform: translateY(-8px);
      -moz-transform: translateY(-8px);
      -ms-transform: translateY(-8px);
      -o-transform: translateY(-8px);
      transform: translateY(-8px);
    }
    .market_body {
      .group {
        padding: 10px 0;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        &:not(:last-child ) {
          border-bottom: 1px dashed #e1e1e1;
        }
        &:last-child {
          padding-bottom: 0;
        }
        .trade_input {
          position: relative;
          .input {
            border: 1px solid #979797;
            border-radius: 4px;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            padding: 8px 52px 8px 8px;
            line-height: normal;
            width: 100%;
            font-size: 14px;
            font-weight: 600;
            text-align: right;
            &.input_disable {
              background-color: #F8F8F8;
              padding: 6px 8px;
              font-weight: normal;
            }
          }
          .input_tip_market {
            color: #0093F1;
            cursor: pointer;
            margin-left: 5px;
          }
          .input_tip {
            width: 46px;
            line-height: 34px;
            font-size: 12px;
            color: #ffffff;
            background-color: #0093F1;
            position: absolute;
            text-align: center;
            top: 0;
            right: 0;
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
          }
        }
      }
    }
  }
</style>
