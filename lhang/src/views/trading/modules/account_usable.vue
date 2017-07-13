<!--Created by monty.ma on 17/6/30.-->
<template>
  <!--买-->
  <ul class="account_usable" v-if="tradetype==='buy'">
    <li>
      <span class="usable_tit">可用CNY：</span>
      <span class="usable_data g_price_red click"
            @click="sendAssetCny">￥ {{usableAssets.asset_cny}}</span>
    </li>
    <li>
      <span class="usable_tit">可买{{conversionType}}：</span>
      <span class="usable_data">{{unico}} {{usableAssets[`uBuy_${currentType}`]}}</span>
    </li>
    <li>
      <span class="usable_tit">平均持仓成本：</span>
      <span class="usable_data">{{usableAssets[`avg_balance_${currentType}`]}}CNY/{{conversionType}}</span>
    </li>
  </ul>
  <!--卖-->
  <ul class="account_usable" v-else-if="tradetype==='sell'">
    <li>
      <span class="usable_tit">可用{{conversionType}}：</span>
      <span class="usable_data g_price_green click"
            @click="sendAssetCategroy">{{unico}} {{usableAssets[`asset_${currentType}`]}}</span>
    </li>
    <li>
      <span class="usable_tit">可卖CNY：</span>
      <span class="usable_data">￥ {{usableAssets[`${currentType}_cny_total`]}}</span>
    </li>
    <li>
      <span class="usable_tit">平均持仓成本：</span>
      <span class="usable_data">{{usableAssets[`avg_balance_${currentType}`]}}CNY/{{conversionType}}</span>
    </li>
  </ul>
</template>
<script>
  export default {
    name: 'account_usable',
    props: {
      tradetype: {type: String, required: true},  //交易类型
      currentType: {type: String, required: true},  //当前货币对
    },
    data() {
      return {
        usableAssets: {}, //可用资产
      }
    },
    components: {},
    computed: {
      socket() {
        return this.$store.getters.sub_customer_asset.data;
      },
      unico(){
        let unicoObj = {
          btc: '\ue621',
          zec: '\ue629',
          etc: '\ue628',
          eth: '\ue627',
        };
        return unicoObj[this.currentType];
      },
      conversionType(){
        return this.currentType.toUpperCase();
      }
    },
    methods: {
      sendAssetCny(){ //点击发送可用 cny
        if (this.usableAssets.asset_cny) {
          this.$emit('assetCny', this.usableAssets.asset_cny)
        }
      },
      sendAssetCategroy(){  //点击发送 可用的数字资产
        this.$emit('assetCategroy', this.usableAssets[`asset_${this.currentType}`]);
      }
    },
    beforeMount(){

    },
    mounted() {
    },
    watch: {
      socket(res){  //可用资产
        this.usableAssets = res;
//        console.log(res);
        this.$emit('assets', res);
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .account_usable {
    font-size: 12px;
    .usable_tit {
      color: #999999;
    }
    .usable_data {
      letter-spacing: 0.6px;
      font-weight: 600;
    }
    .click {
      cursor: pointer;
    }
  }
</style>
