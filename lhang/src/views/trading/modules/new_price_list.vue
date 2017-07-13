<!--Created by monty.ma on 17/7/4.-->
<template>
  <div class="new_price_list">
    <ul class="table_tr table_head">
      <li>时间</li>
      <li>价格</li>
      <li>数量</li>
    </ul>
    <div class="table_body">
      <ul class="table_tr" v-for="(i, index) in listData">
        <li>{{i[3] | formattime('yyyy-MM-dd hh:mm:ss')}}</li>
        <li :class="i[4]==='buy'?'g_price_green':'g_price_red'">{{i[1]}}</li>
        <li :class="i[4]==='buy'?'g_price_green':'g_price_red'">{{i[2]}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'new_price_list',
    data() {
      return {
        listData: []
      }
    },
    components: {},
    computed: {
      currentType(){  //当前货币对
        return this.$route.params.type;
      },
      subSpotTrades() { //数据
        return this.$store.getters[`sub_spot_${this.currentType}_trades`].data;
      },
    },
    methods: {
      subSocket(){
        this.$store.dispatch('send', {
          channel: `sub_spot_${this.currentType}_cny_trades`,
        });
      }
    },
    beforeMount(){
      this.subSocket();
    },
    mounted() {
    },
    watch: {
      $route(){
        this.subSocket();
      },
      subSpotTrades(res){
        this.listData = res;
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .new_price_list {
    width: 100%;
    height: 353px;
    margin-top: 20px;
    border: 1px solid #6F8EA1;
    font-size: 12px;
    line-height: 22px;
    .table_tr {
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      li {
        &:nth-child(2) {
          width: 25%;
          text-align: center;
        }
        &:first-child {
          width: 50%;
        }
        &:last-child {
          width: 25%;
          text-align: right;
        }
      }

      &.table_head {
        background-color: #EAF2FD;
        font-weight: bold;
        padding-right: 36px;
      }
      &:nth-child(2n) {
        background-color: #F5F7FA;
      }
    }
    .table_body {
      height: 329px;
      overflow-y: scroll;
    }
  }
</style>
