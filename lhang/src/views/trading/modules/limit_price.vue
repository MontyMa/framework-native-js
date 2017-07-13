<!--Created by monty.ma on 17/6/29.-->
<template>
  <div class="limit_price">
    <!--可用资产-->
    <div class="limit_head">
      <account-usable :tradetype="tradetype" :currentType="currentType"
                      @assets="getAssets" @assetCny="getClickAssetsCny"
                      @assetCategroy="getClickAssetsCny"/>
      <!--@assetCategroy="getAssetCategroy"-->
      <div class="recharge_link">
        <router-link to="/money/recharge" v-if="tradetype==='buy'">充值</router-link>
        <router-link :to='`/money/recharge?chargeType=${currentType}`' v-else-if="tradetype==='sell'">充币</router-link>
      </div>
    </div>
    <!--主体-->
    <div class="limit_body">
      <div class="group">
        <label class="input_label">
          <div class="input_tit">{{tradetype === 'buy' ? '买入价格' : '卖出价格'}}</div>
          <div class="trade_input input_mod">
            <input class="input j_price_input" type="text" autocomplete="off"
                   :class="tradetype==='buy'? 'g_price_red':'g_price_green'"
                   @input='priceEvent' v-model="priceInput"/>
            <div class="input_tip">CNY</div>
          </div>
        </label>
        <label class="input_label">
          <div class="input_tit">数量</div>
          <div class="trade_input input_mod">
            <input class="input j_quantity_input" type="text" autocomplete="off"
                   :class="tradetype==='buy'? 'g_price_red':'g_price_green'"
                   @input='quantityEvent' v-model="quantityInput"/>
            <div class="input_tip">{{currentType.toUpperCase()}}</div>
          </div>
        </label>
        <div class="range_box">
          <div></div> <!--用于布局-->
          <range v-if="tradetype==='buy'" class="limit_range" :min="0" :max="100" :step="25" :theme="'danger'"
                 :value="rangeBuyValue" @thisvalue="getRangeVal"></range>
          <range v-if="tradetype==='sell'" class="limit_range" :min="0" :max="100" :step="25" :theme="'danger'"
                 :value="rangeSellValue" @thisvalue="getRangeVal"></range>
        </div>
      </div>
      <div class="group">
        <label class="input_label">
          <div class="input_tit">交易金额</div>
          <div class="trade_input input_mod">
            <input class="input j_money_input" type="text" autocomplete="off"
                   :class="tradetype==='buy'? 'g_price_red':'g_price_green'"
                   @input='moneyEvent' v-model="moneyInput"/>
            <div class="input_tip">CNY</div>
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
    name: 'limit_price',
    props: {
      tradetype: {type: String, required: true},  //交易类型为买还是卖
      newPriceObj: {type: Object, required: true}, //接收最新成交价 socket
      newPrice: {type: Number, required: true}, //接收最新成交价
      requestObj: {type: Object}, //需要挂单后重新请求的接口
    },
    data() {
      return {
        uuid: this.$store.getters.uuid, //uuid
        regExp: /[A-z]/g,
        isPassword: true, //是否需要资金密码
        isAutoPrice: true,  //是否自动填充最新价格
        priceInput: '', //价格
        quantityInput: '',  //数量
        moneyInput: '',  //金额
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
      rangeBuyValue() {  //购买拖动条传入数据
        return this.rangePackage.call(this, 'buy', 'priceInput', 'quantityInput', 'asset_cny');
      },
      rangeSellValue(){ //出售拖动条传入数据
        return this.rangePackage.call(this, 'sell', 'moneyInput', 'priceInput', `asset_${this.currentType}`);
      }
    },
    methods: {
      rangePackage(tradeType, inputA, inputB, inputC){ //传入拖动条数据方法封装
        let calculation = {
          buy: (Number(this[inputA]) * Number(this[inputB]) / Number(this.usableAssets[inputC])) * 100,
          sell: (Number(this[inputA]) / Number(this[inputB]) / Number(this.usableAssets[inputC])) * 100,
        };

        let a = calculation[tradeType];
        if (a > 100) a = 100;
        return a ? a : 0;
      },
      getAssets(res){ //获取可用资产
        this.usableAssets = res;
      },
      getClickAssetsCny(res){ //获取点击后的可用的数字资产
        let closingPrice = this.newPriceObj.closingPrice;

        function func(inputA, inputB, inputC) {
          this[inputA] = res;
          if (closingPrice) {
            this[inputB] = closingPrice;

            let tradetypeFunc = {
              buy: Number(this[inputA]) / Number(this[inputB]),
              sell: Number(this.quantityInput) * Number(this.priceInput)
            };

            let val = tradetypeFunc[this.tradetype];
            this[inputC] = this.getAccuracy(val, 4);
          }
        }

        let distinguish = {
          buy: () => func.call(this, 'moneyInput', 'priceInput', 'quantityInput'),
          sell: () => func.call(this, 'quantityInput', 'priceInput', 'moneyInput'),
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

      priceEvent(event){ //价格输入事件,
        let inputVal = this.checkInput.call(this, event, 'priceInput');
        let inputValNum = Number(inputVal);
        let quantityInputNum = Number(this.quantityInput);

        let val = inputValNum * quantityInputNum;
        this.moneyInput = val.toFixed(4);
      },
      quantityEvent(event){  //数量输入事件
        let inputVal = this.checkInput.call(this, event, 'quantityInput');
        let inputValNum = Number(inputVal);
        let priceInputNum = Number(this.priceInput);

        if (!priceInputNum)return;

        let val = inputValNum * priceInputNum;
        this.moneyInput = val.toFixed(4);
      },
      moneyEvent(event){ //交易金额输入事件
        let inputVal = this.checkInput.call(this, event, 'moneyInput');
        let inputValNum = Number(inputVal);

        if (!Number(this.priceInput))return;
        let val = inputValNum / Number(this.priceInput);
        this.quantityInput = val.toFixed(4);
      },
      getAccuracy(val, acc){  //获取精度
        let accNum = Math.pow(10, +acc);
        let valNum = Number(val);
        if (valNum && valNum !== 0) {
          return Math.floor(valNum * accNum) / accNum
        }
      },

      getRangeVal(val){    //获取拖动条数据
        val = +val / 100;
        let rangeFunc = {
          buy: () => {
            if (!this.priceInput) {
              this.priceInput = this.newPriceObj.closingPrice;
            }
            let usableBuy = this.usableAssets[`uBuy_${this.currentType}`]; //动态获取可用的币种
            let asset_cny = this.usableAssets.asset_cny;  //可用 cny
            let priceInput = +this.priceInput;

            if (!asset_cny && !usableBuy)return;
            if ($('.j_money_input').is(':focus') || $('.j_quantity_input').is(':focus'))return;
            this.quantityInput = val === 0 ? 0 : this.getAccuracy(asset_cny * val / priceInput, 4);
            this.moneyInput = val === 1 ? asset_cny : this.getAccuracy(this.quantityInput * priceInput, 2);
          },
          sell: () => {
            if (!this.priceInput) {
              this.priceInput = this.newPriceObj.closingPrice;
            }

            let usableSell = this.usableAssets[`uSell_${this.currentType}`]; //动态获取可用的币种
            let asset_categroy = this.usableAssets[`asset_${this.currentType}`];  //可用 数字资产
            let priceInput = +this.priceInput;

            if (!asset_categroy && !usableSell)return;

            if ($('.j_money_input').is(':focus') || $('.j_quantity_input').is(':focus'))return;

            this.quantityInput = val === 0 ? 0 : this.getAccuracy(asset_categroy * val, 4);
            this.moneyInput = val === 1 ? usableSell : this.getAccuracy(this.quantityInput * priceInput, 2);
          },
        };

        rangeFunc[this.tradetype]();
      },
      sendChannel(){  //发送订阅数据
        let uuid = this.uuid;
        if (!uuid)return;
        this.$store.dispatch('send', {
          channel: 'sub_customer_asset',
          uuid: uuid,
        });
      },
      getPassword(password){ //获取资金密码
        this.passwordInput = password;
      },
      runRequest(){ //发送请求
        let typePool = {
          buy: 'buy',
          sell: 'sell_market'
        };
        let option = {
          useruuid: this.uuid,
          price: this.priceInput,
          quantity: this.quantityInput,
          amount: this.moneyInput,
          type: typePool[this.tradetype],
          paypwd: this.passwordInput,
          category: this.currentType + "_cny"
        };

        if (!Number(option.amount) || !Number(option.price) || !Number(option.quantity)) {
          alert('输入有误，请重新输入');
          return;
        }

        if (!this.isClick)return;
        this.isClick = false;

        lh_http("post", "order/createorder", option).done((res) => {
          if (!res.status) {
            alert(res.data);
            this.isClick = true;
            return;
          }

          alert("挂单完成");
          this.priceInput = null;
          this.quantityInput = null;
          this.moneyInput = null;
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
      this.sendChannel();
    },
    mounted() {
    },
    watch: {
      newPriceObj(res){ //自动填充最新价格，且只填充一次
        if (this.isAutoPrice) {
          this.priceInput = res.closingPrice;
          this.isAutoPrice = false;
        }
      },
      newPrice(price){
        this.priceInput = price;
      },
      $route(){
        this.priceInput = null;
        this.quantityInput = null;
        this.moneyInput = null;
        this.passwordInput = null;
        this.isAutoPrice = true;
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .limit_price {
    border: 1px solid #6F8EA1;
    width: 390px;
    padding: 10px 20px 18px 20px;
    background-color: #EBF6FE; /* fallback color if gradients are not supported */
    background-image: -webkit-linear-gradient(top, #EBF6FE, #FFFFFF); /* For Chrome 25 and Safari 6, iOS 6.1, Android 4.3 */
    background-image: -moz-linear-gradient(top, #EBF6FE, #FFFFFF); /* For Firefox (3.6 to 15) */
    background-image: -o-linear-gradient(top, #EBF6FE, #FFFFFF); /* For old Opera (11.1 to 12.0) */
    filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr='#EBF6FE', endColorStr='#FFFFFF', gradientType=0);
    background-image: linear-gradient(to bottom, #EBF6FE, #FFFFFF); /* Standard syntax; must be last */
    .limit_head {
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
    .limit_range {
      width: 281px;
      -webkit-transform: translateY(-8px);
      -moz-transform: translateY(-8px);
      -ms-transform: translateY(-8px);
      -o-transform: translateY(-8px);
      transform: translateY(-8px);
    }
    .limit_body {
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
