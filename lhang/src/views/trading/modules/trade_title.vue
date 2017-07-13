<!--Created by monty.ma on 17/6/29.-->
<template>
  <ul class="trade_title">
    <li class="icon">{{currencyType.icon}}</li>
    <li class="txt">{{currencyType.type}}/CNY交易</li>
  </ul>
</template>
<script>
  export default {
    name: 'trade_title',
    data() {
      return {
        typeIcon: {
          btc: '\ue64b',
          zec: '\ue64c',
          eth: '\ue64e',
          etc: '\ue64d',
        }
      }
    },
    computed: {
      currencyType(){
        let type_params = this.$route.params.type;
        return {
          type: type_params.toUpperCase(),
          icon: this.typeIcon[type_params],
        };
      }
    },
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .trade_title {
    color: #666666;
    .icon {
      font-size: 15px;
    }
    .txt {
      font-size: 20px;
      font-weight: 600;
    }
    li {
      line-height: 30px;
      display: inline-block;
      vertical-align: middle;
    }
  }
</style>
