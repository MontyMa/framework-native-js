<template>
	<div class="btc_withdraw">
		<div v-if="clickable">
			<div class="container">
				<div class="container_left">
					<btc-withdraw-handle :type="setType"></btc-withdraw-handle>
				</div>
				<div class="container_right">
					<digital-withdraw-info :type="setType"></digital-withdraw-info>
				</div>
			</div>
			<!--提取记录-->
			<digital-withdraw-record :type="setType"></digital-withdraw-record>
		</div>
		
		<div v-else>
			<pre-register3 :type="setType" :myType ="subTitle"></pre-register3>
		</div>
	</div>
</template>
<script>
import btcWithdrawHandle from "./btcWithdrawHandle"
import digitalWithdrawRecord from "./digitalWithdrawRecord"
import digitalWithdrawInfo from "./digitalWithdrawInfo"

import preRegister3 from '../../../../components/checkAuth/preRegister3'

import {mapGetters} from 'vuex'
export default {
    data () {
    	return {
			setType: {
				name: "以太坊", //虚拟货币名称
				moneytype: 'eth'
			},
			subTitle: '以太坊提现',
			
			actived: true,
    		thisvalidationMobile: false,
    		thisvalidationGoogle: false,
    		thispayPassword: false,
    		status: false,
    		isAuth: false,
    		clickable: false,
    	}
    },
    components: {
    	digitalWithdrawRecord,
    	btcWithdrawHandle,
    	digitalWithdrawInfo,
    	preRegister3
    },
	computed: {
		user() {
			return this.$store.getters.getUser;
		},
	},
	mounted () {
		if(this.user){
    		//是否注册
    		this.activated = this.user.customerInfo.activated;
    		//绑定手机或设置谷歌验证码
    		this.thisvalidationMobile = this.user.customerInfo.mobile ? true : false;
    		this.thisvalidationGoogle = this.user.customerInfo.otherGoogleIdentifier ? true : false;
    		//资金密码
    		this.thispayPassword = this.user.customerInfo.hasPayPassword;
    		//提现验证
    		let lists = this.user.policyList;
    		for(let i = 0; i < lists.length; i++){
    			if(lists[i].validationMode == 'draw'){
    				if(lists[i].showText){
    					this.status = true;
    				}
    			}
    		}
    		//C2认证
    		this.isAuth = (this.user.customerInfo.authType == 'C2') ? true : false;
    		
    		if(this.activated && (this.thisvalidationMobile || this.thisvalidationGoogle) && this.thispayPassword && this.status && this.isAuth){
    			this.clickable = true;
    		}
    	}
	}
 }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.btc_withdraw{
	.container{
		overflow: hidden;
		margin-top: 24px;
		.container_left{
			float: left;
			width: 475px;
		}
		.container_right{
			float:left;
			width: 432px;
		}
	}
}
</style>