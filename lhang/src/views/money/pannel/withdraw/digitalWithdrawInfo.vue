<template>
  <div class="digital_withdraw_info">
    <h4>提现须知1</h4>

    <template v-if="this.type.moneytype=='zec'">
      <p>1、链行{{type.name}}提现单个账户每日最高提现额度为300{{type.moneytype | toUpper}}。</p>
      <p>2、单笔最低限额为0.01{{type.moneytype | toUpper}}</p>
      <p>3、手续费为区块链网络转账费，费率为0.0001。</p>
    </template>
    <template v-if="this.type.moneytype=='btc'">
      <p>1、链行{{type.name}}提现单个账户单日最高限额为30{{type.moneytype | toUpper}}。</p>
      <p>2、单笔最低限额为0.01{{type.moneytype | toUpper}}</p>
      <p>3、手续费为区块链网络转账费，转账费越高，提现速度越快，为了不影响速度，建议不要使用过低的手续费。</p>
    </template>
    <template v-if="this.type.moneytype=='eth'">
      <p>1、链行{{type.name}}提现单个账户单日最高限额为300{{type.moneytype | toUpper}}。</p>
      <p>2、单笔最低限额为0.01{{type.moneytype | toUpper}}</p>
      <p>3、手续费为区块链网络转账费，转账费越高，提现速度越快，为了不影响速度，建议不要使用过低的手续费。</p>
    </template>
    <template v-if="this.type.moneytype=='etc'">
      <p>1、链行{{type.name}}提现单个账户单日最高限额为300{{type.moneytype | toUpper}}。</p>
      <p>2、单笔最低限额为0.01{{type.moneytype | toUpper}}</p>
      <p>3、手续费为区块链网络转账费，转账费越高，提现速度越快，为了不影响速度，建议不要使用过低的手续费。</p>
    </template>

    <a href="http://q.url.cn/s/Wnafsym" target="_blank">
      <img src="../../images/contact_service.png" alt=""/>
    </a>
  </div>
</template>

<script>
  export default {
    props: ['type'],
    filters: {
      toUpper (val) {
        return val.toString().toUpperCase();
      }
    },
    mounted () {
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .digital_withdraw_info {
    font-size: 13px;
    width: 368px;
    padding-left: 32px;
    padding-top: 33px;
    h4 {
      margin-bottom: 20px;
      background: url(../../images/charge_info.png) no-repeat left;
      padding-left: 20px;
    }
    p {
      font-size: 12px;
      color: #7e7e7e;
      line-height: 20px;
    }
    img {
      width: 124px;
      /*height: 124px;*/
      margin-top: 20px;
      margin-left: 100px;
    }
  }
</style>
