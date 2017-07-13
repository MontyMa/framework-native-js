<template>
	<div class="cny_withdraw">
		<div v-if="clickable">
			<div class="container">
				<div class="container_left">
					<cny-withdraw-handle></cny-withdraw-handle>
				</div>
				<div class="container_right">
					<cny-withdraw-info></cny-withdraw-info>
				</div>
			</div>
			<!--提取记录-->
			<cny-withdraw-record></cny-withdraw-record>
		</div>
		
		<div v-else>
			<pre-register3 :type="setType" :myType ="subTitle"></pre-register3>
		</div>
	</div>
</template>

<script>
import cnyWithdrawHandle from "./cnyWithdrawHandle"
import cnyWithdrawRecord from "./cnyWithdrawRecord"
import cnyWithdrawInfo from "./cnyWithdrawInfo"

import preRegister3 from '../../../../components/checkAuth/preRegister3'

import {mapGetters} from 'vuex'
export default {
    name: 'CNYwithdraw',
    components: {
    	cnyWithdrawRecord,
    	cnyWithdrawHandle,
    	cnyWithdrawInfo,
    	preRegister3
    },
    data () {
		return {
			setType: { 
				name: "人民币", //虚拟货币名称
				moneytype: 'cny'
			},
			subTitle: '人民币提现',
			
			actived: true,
    		thisvalidationMobile: false,
    		thisvalidationGoogle: false,
    		thispayPassword: false,
    		status: false,
    		isAuth: false,
    		clickable: false,
			
		}
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
.cny_withdraw{
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