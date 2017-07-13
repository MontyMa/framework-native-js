<!--Created by monty.ma on 17/7/5.-->
<template>
  <div class="assets_password" v-if="isPassword">
    <label class="input_label">
      <div class="input_tit">资金密码</div>
      <div class="trade_input input_mod">
        <input class="input password_input j_trade_input" type="password" autocomplete="off"
               :class="tradetype==='buy'? 'g_price_red':'g_price_green'"
               @input="inputEvent"/>
        <!--<div class="input_tip">CNY</div>-->
      </div>
    </label>
    <div class="password_tip">
      <div></div> <!--用于布局-->
      <div class="tip">
        <router-link class="link_style" to="/user/settings/funding_edit">忘记资金密码？</router-link>
        <router-link class="link_style" to="/user/policy/bind/modify_trade_check">免输资金密码</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'assets_password',
    props: {
      tradetype: {type: String, required: true},  //交易类型为买还是卖
    },
    data() {
      return {
        passwordInput: '', //资金密码
      }
    },
    components: {},
    computed: {
      isPassword() {  //是否需要资金密码
        return this.$store.getters.trade;
      },
    },
    methods: {
      inputEvent(event){
        let val = $(event.target).val();
        this.$emit('assetsPassword', val);
      },
//      isNeedPassword(){ //是否需要资金密码,无用
//        let policyList = cookie().get('user').policyList;
//        let securityId;
//
////        "6"="不验证资金密码"
////        "5-2"="两小时验证一次资金密码"
////        "5"="每次都验证资金密码"
//        policyList.forEach(elem => {
//          if (elem.validationMode === 'trade') {
//            securityId = elem.securityId;
//          }
//        });
//        console.log(securityId);
//      },
    },
    beforeMount(){
    },
    mounted() {
    },
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .assets_password {
    .password_input {
      padding: 8px !important;
    }
  }
</style>
