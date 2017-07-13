<template>
	<div class="recharge_btc">
		<div v-if="clickable">
			<div class="title">
				<p>以太经典充币步骤：</p>
				<div>
					<span>1、复制地址或扫描二维码</span>
					<i></i>
					<span>2、使用您的个人钱包相向定地址转币</span>
					<i></i>
					<span>3、完成充值后10-60分钟到账</span>
				</div>
			</div>
			<div class="container">
				<div class="container_left">
					<recharge-btc-step :thistype="moneyType"></recharge-btc-step>
				</div>
				<div class="container_right">
					<recharge-btc-info :thistype="moneyType"></recharge-btc-info>
				</div>
			</div>
			<!--提取记录-->
			<recharge-btc-record :thistype="moneyType"></recharge-btc-record>
		</div>
		<div v-else>
			<pre-register></pre-register>
		</div>
	</div>
</template>

<script>
import preRegister from '../../../../components/checkAuth/preRegister'
import rechargeBtcStep from "./rechargeBtcStep"
import rechargeBtcInfo from "./rechargeBtcInfo"
import rechargeBtcRecord from "./rechargeBtcRecord"
export default {
    name: 'CNYwithdraw',
    data () {
    	return {
    		moneyType: 'etc',
    		clickable: false,
    	}
    },
    computed: {
		user() {
			return this.$store.getters.getUser;
		},
    },
    components: {
    	rechargeBtcStep,
    	rechargeBtcInfo,
    	rechargeBtcRecord,
    	preRegister
    },
    mounted () {
    	if(this.user){
    		//是否注册
    		let activated = this.user.customerInfo.activated;
    		//C2认证
    		let isAuth = this.user.customerInfo.authType ? true : false;
    		
    		if(activated && isAuth){
    			this.clickable = true;
    		}
    	}
    }
 }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.recharge_btc{
	.title{
		p{
			margin-top: 30px;
			margin-bottom: 15px;
		}
		div{
			background: #F2F9FE;
			height:40px;
			line-height: 40px;
			padding-left: 6px;
			span{
				color: #0093F1;
			}
			i{
				display: inline-block;
				width: 29px;
				height: 15px;
				background: url(../../images/to_left.png) no-repeat left;
				vertical-align: middle;
				margin-left: 20px;
				margin-right: 30px;
			}
		}
	}
	.container{
		overflow: hidden;
		margin: 23px 0 65px 0;
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
