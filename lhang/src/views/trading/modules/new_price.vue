<!--Created by monty.ma on 17/6/29.-->
<template>
  <table class="new_price">
    <tr>
      <td class="price_list_1">
        <div class="tit">最新价
          <span :class="priceObj.changePercent>=0?'g_price_red':'g_price_green'">
            {{priceObj.changePercent >= 0 ? '\ue65a' : '\ue659'}}
          </span>
        </div>
        <div class="data" :class="priceObj.changePercent>=0?'g_price_red':'g_price_green'">
          ￥ {{priceObj.closingPrice}}
        </div>
      </td>
      <td class="price_list_2">
        <div class="tit">涨幅</div>
        <div class="data" :class="priceObj.changePercent>=0?'g_price_red':'g_price_green'">
          {{priceObj.changePercent >= 0 ? '+' : null}}  {{priceObj.changePercent}}
        </div>
      </td>
      <td class="price_list_3">
        <div class="tit">最高价</div>
        <div class="data g_price_red">￥ {{priceObj.maxPrice}}</div>
      </td>
      <td class="price_list_4">
        <div class="tit">最低价</div>
        <div class="data g_price_green">￥ {{priceObj.minPrice}}</div>
      </td>
      <td class="price_list_5">
        <div class="tit">交易量</div>
        <div class="data">{{typeIcon[currencyType]}} {{priceObj.volumeQuantity}}</div>
      </td>
    </tr>
  </table>
</template>
<script>
  export default {
    name: 'new_price',
    data() {
      return {
        priceObj: {
          changePercent: 0.00,
          closingPrice: 0.00,
          maxPrice: 0.00,
          minPrice: 0.00,
          volumeQuantity: 0.00,
        },
        typeIcon: {
          btc: '\ue621',
          zec: '\ue629',
          eth: '\ue627',
          etc: '\ue628',
        }
      }
    },
    components: {},
    computed: {
      currencyType(){
        return this.$route.params.type;
      },
      socket() {
        let channel = `sub_spot_${this.currencyType}_cny_dailydata`;
        return this.$store.getters[channel].data;
      }
    },
    methods: {
      sendSocket(type, status){ //发送订阅
        this.$store.dispatch('send', {
          channel: `sub_spot_${type}_cny_dailydata`,
          isClose: status,
        });
      }
    },
    watch: {
      socket(res){
        if (!res) return;
        this.$emit('newPrice', res);  //传递出去；
        this.$nextTick(() => this.priceObj = res);
      },
      $route(to, from){
        this.sendSocket(this.currencyType, false);  //订阅新的
      }
    },
    beforeMount(){
      this.sendSocket(this.currencyType, false);
    },
    mounted() {
    },
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .new_price {
    width: 100%;
    height: 100%;
    text-align: center;
    border: 1px solid #6F8EA2;
    border-collapse: collapse;
    color: #494949;
    td {
      border: 1px solid #6F8EA2;
    }
    .price_list_1 {
      width: 20%;
    }
    .price_list_2 {
      width: 15.5%;
    }
    .price_list_3 {
      width: 20%;
    }
    .price_list_4 {
      width: 20%;
    }
    .price_list_5 {
      width: 24.5%;
    }
    .tit {
      font-size: 12px;
      color: #494949;
      margin-bottom: 4px;
    }
    .data {
      font-size: 14px;
      font-weight: 600;
    }
  }
</style>
