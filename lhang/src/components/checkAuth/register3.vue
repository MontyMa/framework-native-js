<template>
	<div class="register_3">
		<p :class="{active: thispayPassword}">设置资金密码</p>
		<span v-if="!thispayPassword">您尚未设置资金密码，为了您的交易，资金安全，建议您设置资金密码</span>
		<span v-else>您已设置资金密码，目前您的资金密码安全指数偏低</span>
		<div class="circle_box" :class="{active : thispayPassword}">
			<div class="circle_shadow"></div>
			<div class="circle"></div>
		</div>
		<a href="javascript:;" v-if="!thispayPassword && disable" @click="goCheck">立即认证</a>
		<a class="gray" href="javascript:;" v-if="!disable">请先绑定手机或绑定(设置)谷歌验证器</a>
		<i class="checked_icon" v-if="thispayPassword && disable"></i>
		<div class="bar"></div>
	</div>
</template>

<script>
//设置资金密码
export default {
    name: 'register_3',
    props: ['value'],
    data () {
    	return{
    		thispayPassword: false,
    		disable: false,
    	}
    },
    components: {
    },
    computed: {
/*    	thispayPassword () {
    		return this.$store.getters.hasPayPassword;
    	}*/
		user() {
			return this.$store.getters.getUser;
		},
    },
    mounted () {
    	if(this.user){
    		let mobile = this.user.customerInfo.mobile;
    		let google = this.user.customerInfo.otherGoogleIdentifier;
    		
    		if(mobile || google){
    			this.thispayPassword = this.user.customerInfo.hasPayPassword;
    			this.disable = true;
    		}
    	}
    },
    methods: {
    	goCheck () {
    		this.$router.push({path: '/user/settings/funding_bind'})
    	}
    }
 }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.register_3{
	position: relative;
	margin-left: 210px;
	width: 550px;
	margin-top:15px;
	border-top: 1px dashed #d7d7d7;
	p{
		color: #9B9B9B;
		margin-bottom: 10px;
		margin-top: 15px;
		&.active{
			color: #000;
		}
	}
	span{
		color: #9B9B9B;
		font-size: 12px;
	}
	a{
		color: #0093F1;
		position: absolute;
		right: 0;
		top: 15px;
	}
	.circle_box{
		position: absolute;
		z-index: 10;
		left: -85px;
		top: 18px;
		width: 14px;
		.circle_shadow{
			height: 14px;
			border-radius: 50%;
			background: #d0d0d0;
			opacity: 0.5;
		}
		.circle{
			position: absolute;
			left: 50%;
			top: 50%;
			margin-left: -4px;
			margin-top: -4px;
			width: 8px;
			height: 8px;
			border-radius: 50%;
			background: #d0d0d0;
			opacity: 1;
		}
		&.active{
			.circle_shadow{
				background: #0093F1;
			}
			.circle{
				background: #0093F1;
			}
		}
	}
	.checked_icon{
		position: absolute;
		width: 22px;
		height: 22px;
		background: url(./img/correct.png) no-repeat;
		right: 0;
		top: 12px;
	}
	.bar{
		width: 2px;
		height: 70px;
		background: #ededed;
		position: absolute;
		left: -79px;
		top: -50px;
	}
	.gray{
		color: #ccc;
	}
}
</style>