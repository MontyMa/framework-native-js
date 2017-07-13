<!--Created by monty.ma on 17/6/29.-->
<template>
  <div class="trade_introdution">
    <introduction-btc v-if="currencyType==='btc'"></introduction-btc>
    <introduction-zec v-if="currencyType==='zec'"></introduction-zec>
    <introduction-eth v-if="currencyType==='eth'"></introduction-eth>
    <introduction-etc v-if="currencyType==='etc'"></introduction-etc>
  </div>
</template>
<script>
  import introductionBtc from './introduction_btc.vue'; //btc介绍
  import introductionZec from './introduction_zec.vue'; //zec介绍
  import introductionEth from './introduction_eth.vue'; //eth介绍
  import introductionEtc from './introduction_etc.vue'; //etc介绍
  export default {
    name: 'trade_introdution',
    data() {
      return {}
    },
    components: {introductionBtc, introductionZec, introductionEth, introductionEtc},
    computed: {
      currencyType(){
        return this.$route.params.type;
      }
    },
    methods: {},
    beforeMount(){
    },
    mounted() {
    },
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .trade_introdution {
    .intro_tit {
      font-size: 0;
      font-weight: bold;
      .v_center {
        font-size: 20px;
        display: inline-block;
        vertical-align: middle;
        line-height: 30px;
      }
      .img_box {
        width: 30px;
        height: 30px;
        margin-right: 8px;
      }
    }
    .paragraph {
      font-size: 12px;
      color: #494949;
      text-align: justify;
      line-height: 20px;
      p {
        margin-top: 10px;
      }
    }
    .link_box {
      margin-top: 20px;
      font-size: 12px;
      .link {
        color: #0093F1;
      }
      .link_list {
        margin-top: 5px;
        font-size: 0;
        li {
          font-size: 12px;
          margin-top: 10px;
          color: #ffffff;
          background-color: #0093F1;
          line-height: 30px;
          display: inline-block;
          padding: 0 10px;
          border-radius: 3px;
          &:not(:last-child) {
            margin-right: 20px;
          }
          a {
            display: inline-block;
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
</style>
