<!--Created by monty.ma on 17/7/4.-->
<template>
  <div class="depth_area">
    <div class="depth_head">
      <trade-button :val="btnParams" :width="100" :isPointer="false"></trade-button>
      <div class="depth_btn">
        <div class="show">深度：{{depthIndex}}</div>
        <ul class="hidden">
          <template v-for="item in depthRender">
            <li :class="{active:item === depthIndex}"
                @click="clickEvent(item)">{{item}}
            </li>
          </template>
        </ul>
      </div>
    </div>
    <div class="depth_cont">
      <div class="depth_sell j_scroll">
        <div class="" :style="{transform:sell.length>7?'':`translateY(${(7-sell.length)*17}px)`}">
          <!--<div>-->
          <template v-for="(item,i) in sell">
            <ul class="cont" @click="sendPrice(item[0])">
              <li class="g_price_green">卖{{sell.length - i}}</li>
              <li>￥{{item[0]}}</li>
              <li class="g_price_green">{{item[1]}}</li>
            </ul>
          </template>
        </div>
      </div>
      <ul class="depth_tit" :class="{padding:buy.length>=7||sell.length>=7}">
        <li>买卖</li>
        <li>价格</li>
        <li>数量</li>
      </ul>
      <div class="depth_buy">
        <template v-for="(item,i) in buy">
          <ul class="cont" @click="sendPrice(item[0])">
            <li class="g_price_red">买{{i + 1}}</li>
            <li>￥{{item[0]}}</li>
            <li class="g_price_red">{{item[1]}}</li>
          </ul>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
  import tradeButton from './trade_button.vue';  //按钮
  export default {
    name: 'depth',
    data() {
      return {
        btnParams: ['挂单信息'],
        depthRender: ['0', '1', '2', '3', '4', '5'],
        depthIndex: '0', //深度
        buy: [],  //bids
        sell: [],  //asks
        $j_scroll: null,  //滚动 dom
        isAutoScroll: true,  //控制要不要自动滚动到底部
        oldScrollTop: 0, //保存的老的ScrollTop
      }
    },
    components: {tradeButton},
    computed: {
      currentType(){  //当前货币对
        return this.$route.params.type;
      },
      depth() { //深度数据
        let channel = 'sub_spot_' + this.currentType + '_cny_depth';
        return this.$store.getters[channel].data;
      },
    },
    methods: {
      getSocketData(depthIndex, status){
        this.$store.dispatch('send', {
          channel: `sub_spot_${this.currentType}_cny_depth`,
          depth: depthIndex,
          isClose: status,
        });
      },
      clickEvent(index){  //点击事件
        if (index === this.depthIndex)return;
        this.getSocketData(index, false);
        this.getSocketData(this.depthIndex, true);
        this.depthIndex = index;
      },
      sendPrice(price){  //发送价格
        this.$emit('price', price)
      },
      autoScroll(){ //自动滚动到底部
        this.$j_scroll = $('.j_scroll');
        this.$j_scroll.on('scroll', () => {
          this.isAutoScroll = $(this.$j_scroll).scrollTop() >= this.oldScrollTop - 22;
        })
      },
    },
    watch: {
      depth(val) {
        if (val && val.asks && val.bids) {
          this.sell = val.asks.slice(0, [100]).reverse();
          this.buy = val.bids
        } else {
          this.sell = [];
          this.buy = []
        }
      },
      $route(){
        this.getSocketData('1', false);
      }
    },
    beforeMount(){
      this.getSocketData(this.depthIndex, false);
    },
    beforeUpdate(){
      if (this.isAutoScroll) {
        this.$j_scroll.scrollTop(this.$j_scroll[0].scrollHeight);
        this.oldScrollTop = this.$j_scroll.scrollTop();
      }
    },
    mounted() {
      this.autoScroll();
    },
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .depth_area {
    font-size: 12px;
    line-height: 22px;
    .padding {
      padding-right: 34px !important;
    }
    .depth_tit {
      padding: 0 20px;
      background-color: #EAF2FD;
    }
    .depth_head, .depth_tit {
      display: flex;
      justify-content: space-between;
      font-weight: 600;
    }
    .depth_head {
      .depth_btn {
        cursor: pointer;
        position: relative;
        &:hover .hidden {
          display: block;
        }
      }
      .show {
        display: inline-block;
        vertical-align: middle;
        &:before {
          content: '';
          display: inline-block;
          vertical-align: middle;
          height: 32px;
        }
        &:after {
          content: '\e62e';
          margin-left: 5px;
          color: #C7C7CC;
        }
      }
      .hidden {
        width: 66px;
        left: 0;
        position: absolute;
        -webkit-transform: translateY(-7px);
        -moz-transform: translateY(-7px);
        -ms-transform: translateY(-7px);
        -o-transform: translateY(-7px);
        transform: translateY(-7px);
        border: 1px solid rgba(0, 147, 241, 0.37);
        display: none;
        z-index: 20;
        background-color: #ffffff;
        text-align: center;
        li {
          &:hover {
            background-color: #8bd2ff;
            color: #fff;
          }
          &.active {
            background-color: #0093F1;
            color: #ffffff;
          }
        }
      }
    }
    .depth_cont {
      width: 360px;
      height: 331px;
      border: 1px solid #6F8EA1;
      -webkit-transform: translateY(-1px);
      -moz-transform: translateY(-1px);
      -ms-transform: translateY(-1px);
      -o-transform: translateY(-1px);
      transform: translateY(-1px);
      .depth_tit {
        /*display: flex;*/
        /*justify-content: space-between;*/
      }
      .depth_sell, .depth_buy {
        width: 100%;
        height: 149px;
        overflow-y: auto;
      }
      .cont {
        padding: 0 20px;
        display: flex;
        cursor: pointer;
        justify-content: space-between;
        &:nth-child(2n) {
          background-color: #F5F7FA;
        }
        li {
          width: 33.333%;
          &:nth-child(2) {
            text-align: center;
          }
          &:last-child {
            text-align: right;
          }
        }
      }
    }
  }

</style>
