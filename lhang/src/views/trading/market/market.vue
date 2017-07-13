<template>
  <div class="market" id="market">
    <ion-content style="background: white">
      <div class="k_title">
        <span v-for="(i,$index) in work_list" :class="{ active1: $index == work_style}"
              @click="work_style = $index;work_name = i.name;work_tag = i.tag;work_channel = i.channel">{{i.name}}</span>
      </div>
      <kechar class="k" :name="work_name" :tag="work_tag" :channel="work_channel"></kechar>
      <!--<depth-echar v-if="dshow == null"></depth-echar>-->
      <!--<div v-if="dshow == null">-->
      <!--<info-deal></info-deal>-->
      <!--</div>-->
    </ion-content>
  </div>
</template>

<script>
  import echarts from 'echarts';
  import store from '../../../vuex/store'
  import kechar from './kechar.vue'
  import depthEchar from './depth.vue'
  import infoDeal from './info_deal'
  export default {
    name: 'trading',
    computed: {
      isLogged() {
        return this.$store.getters.isLogged;
      },
    },
    props: ['dshow'],
    data() {
      return {
        type: this.$route.params.type,
        work_list: [{
          name: '分时',
          tag: 'minute1',
          channel: 'sub_spot_' + this.$route.params.type + '_cny_kline_1minute',
        }, {
          name: '1分',
          tag: 'minute1',
          channel: 'sub_spot_' + this.$route.params.type + '_cny_kline_1minute',
        }, {
          name: '5分',
          tag: 'minute5',
          channel: 'sub_spot_' + this.$route.params.type + '_cny_kline_5minute',
        }, {
          name: '15分',
          tag: 'minute15',
          channel: 'sub_spot_' + this.$route.params.type + '_cny_kline_15minute',
        }, {
          name: '30分',
          tag: 'minute30',
          channel: 'sub_spot_' + this.$route.params.type + '_cny_kline_30minute',
        }, {
          name: '60分',
          tag: 'hour1',
          channel: 'sub_spot_' + this.$route.params.type + '_cny_kline_1hour',
        }, {
          name: '日线',
          tag: 'day1',
          channel: 'sub_spot_' + this.$route.params.type + '_cny_kline_1day',
        }, {
          name: '周线',
          tag: 'week1',
          channel: 'sub_spot_' + this.$route.params.type + '_cny_kline_1week',
        }, {
          name: '月线',
          tag: 'month1',
          channel: 'sub_spot_' + this.$route.params.type + '_cny_kline_1month',
        }],
        work_style: 0,
        work_name: null,
        work_tag: null,
        work_channel: null,
      }
    }, //定义变量
    components: {
      depthEchar,
      kechar,
      infoDeal
    }, //注册组件
    methods: { //方法都在这里
    },
    mounted() {
      this.type = this.$route.params.type;
      this.work_name = this.work_name ? this.work_name : '分时';
      this.work_tag = this.work_tag ? this.work_tag : 'minute1';
      this.work_channel = this.work_channel ? this.work_channel : 'sub_spot_' + this.type + '_cny_kline_1minute';
    },
    watch: {
      '$route' (to, from) {
        // 对路由变化作出响应...
        this.type = this.$route.params.type;
      },
    }
  }
</script>

<style lang="scss">
  .market {
    .k_title {
      z-index: 2;
      position: relative;
      font-size: 12px;
      transform: translateX(33px);
      span {
        margin-right: 10px;
        color: #8a8a8a;
        width: 40px;
        padding: 2px 8px;
        cursor: pointer;
        border-radius: 4px;
      }
      .active1 {
        color: white;
        background: #0093f1;
      }
    }
  }
</style>
