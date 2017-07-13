<template>
  <div class="count_board">
    <ion-content12>
      <div class="title">累计交易总金额</div>
      <div class="center">
        <item class="item" v-for="d in items" track-by="$index" :value="d"></item>
        <span class="unit">{{unit}}</span>
        <slot></slot>
      </div>
    </ion-content12>
  </div>
</template>

<script>
  import item from '../count_board_item';
  import store from '../../../../vuex/store'
  export default {
    name: 'count_board',
    data() {
      return {
        value: 0,
        unit: 0,
      }
    },
    computed: {
      items() {
        const val = parseInt(this.value, 10);
        return val > -1 ? String(val).split('') : [];
      },
      socket() {
        return this.$store.getters.spot_latest_volume_price.data;
      },
    },
    components: {
      item,
    }, //这里注册
    methods: {},
    mounted() {
      store.dispatch('send', {
        channel: 'spot_latest_volume_price'
      });
    },
    watch: {
      // 如果 question 发生改变，这个函数就会运行
      socket: function (res) {
        this.value = res;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
  .count_board {
    position: relative;
    top: 60px;
    margin-bottom: 20px;
    .title {
      margin: 0 auto;
      width: 240px;
      color: #1B1E23;
      font-size: 18px;
      height: 100px;
      line-height: 100px;
      position: relative;
      top: -60px;
    }
    .center {
      /*display: inline-block;*/
      /*position: absolute;*/
      /*left: 50%;*/

      /*top: 60px;*/
    }
    .item {
      display: inline-block;
      margin: 0 10px;
    }
    .unit {
      border-radius: 50%;
      color: #fff;
      height: 31px;
      line-height: 31px;
      position: absolute;
      top: -10px;
      text-align: center;
      right: -42px;
      width: 31px;
      display: none;
    }
  }
</style>
