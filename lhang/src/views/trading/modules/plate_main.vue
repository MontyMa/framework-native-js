<!--Created by monty.ma on 17/6/29.-->
<template>
  <div class="plate_main">
    <ul class="list_head">
      <li>币种</li>
      <li>最新价</li>
      <li>涨幅比</li>
      <li>24h成交量</li>
    </ul>
    <div class="list_body">
      <template v-for="(item,i) in getRenderData">
        <div class="body_item" :class="{active:item.symbol===currentType.toUpperCase()}">
          <router-link class="a_link" :to="item.href"></router-link>
          <ul>
            <li><span class="icon">{{item.icon}}</span>{{item.symbol}}</li>
            <li>￥ {{item.lastPrice}}</li>
            <li :class="item.change>=0?'g_price_red':'g_price_green'">
              {{item.change >= 0 ? '+' : null}} {{item.change}}
            </li>
            <li>{{item.vol}}</li>
          </ul>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  import plateRenderData from './plate_main.js'; //数据格式
  export default {
    name: 'plate_main',
    props: {
      plateIndex: {type: Number, required: true}, //是哪一个板
    },
    data() {
      return {}
    },
    components: {},
    computed: {
      socket() {
        return this.$store.getters.multi_platform;
      },
      currentType(){
        return this.$route.params.type;
      },
      getRenderData(){
        return plateRenderData[this.plateIndex];
      }
    },
    methods: {},
    watch: {
      socket(res) {
        let res_channel = res.channel;

        if (res_channel !== 'multi_platform_lhang_tickers') return;

        let res_data = res.data;
        let lhhq_type = ['BTC', 'ZEC', 'ETC', 'ETH'];
        let symbol = res_data.symbol.split('/')[0];
        let index = lhhq_type.indexOf(symbol);

        if (index < 0)return;
        this.getRenderData.forEach((elem) => {
          if (elem.symbol === symbol && res_data.lastPrice) {
            elem.change = res_data.change;
            elem.lastPrice = res_data.lastPrice;
            elem.vol = res_data.vol;
          }
        })
      }
    },
    beforeMount(){
    },
    mounted() {
    },
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .plate_main {
    width: 100%;
    line-height: 22px;
    font-size: 0;
    text-align: center;
    ul {
      padding: 0 20px;
      li {
        width: 25%;
        font-size: 12px;
        display: inline-block;
        vertical-align: middle;
        .icon {
          margin-right: 5px;
        }
        &:first-child {
          text-align: left;
        }
        &:last-child {
          text-align: right;
        }
      }
    }
    .list_head {
      background-color: #EBF2FD;
      color: #666666;
      font-weight: 600;
    }
    .list_body {
      li {
        cursor: pointer;
      }
    }
    .body_item {
      position: relative;
      border-top: 1px solid transparent;
      border-bottom: 1px solid transparent;
      &:nth-child(2n) {
        background-color: #F5F7FA;
      }
      &.active {
        background-color: #FDF2EA;
        border-top: 1px solid #F39E67;
        border-bottom: 1px solid #F39E67;
      }
      .a_link {
        position: absolute;
        top: 0;
        left: 0;
        display: inline-block;
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
