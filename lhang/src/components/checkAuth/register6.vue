<template>
	<div class="register_6">
		<p :class="{active: clickable}">设置{{moneyType.name}}提现账户</p>
		<span v-if="!clickable">为了方便您的{{moneyType.name}}提现，请及时添加{{moneyType.name}}提现账户</span>
		<span v-else>您已设置{{moneyType.name}}提现账户</span>
		<div class="circle_box" :class="{active : clickable}">
			<div class="circle_shadow"></div>
			<div class="circle"></div>
		</div>
		<a class="active" href="javascript:;" v-if="clickable" @click="openModal">立即设置</a>
		<a v-else href="javascript:;">立即设置</a>
		<div class="bar"></div>
	</div>
</template>

<script>
export default {
    name: 'register_6',
    props: ['value',"moneyType"],
    data () {
    	return {
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
    methods: {
    	openModal () {
    		//console.log(this.thisType);
    		//显示阴影盒背景
    		this.$store.dispatch("showShadowBox", true);
    		//显示比特币提现的弹窗
    		//console.log(this.thisType)
    		this.$store.dispatch("showMoney"+this.thisType+"Modal", true);
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
    				//console.log('88888888',lists[i].showText,this.status)
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
.register_6{
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
		color: #9B9B9B;
		position: absolute;
		right: 0;
		top: 15px;
		&.active{
			color: #0093F1;
		}
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
}
</style>