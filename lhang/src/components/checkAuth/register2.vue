<template>
	<div class="register_2">
		<p :class="{active: thisvalidationMobile || thisvalidationGoogle}">绑定手机或者设置谷歌验证码</p>
		<span v-if="!thisvalidationMobile && !thisvalidationGoogle">您尚未绑定手机，为了您的交易，资金安全，建议您绑定手机</span>
		<span v-if="thisvalidationMobile && !thisvalidationGoogle">您已绑定手机，为了您的交易，资金安全，建议您去设置谷歌验证码</span>
		<span v-if="thisvalidationMobile && thisvalidationGoogle">您已绑定谷歌验证码</span>
		<div class="circle_box" :class="{active : thisvalidationMobile || thisvalidationGoogle}">
			<div class="circle_shadow"></div>
			<div class="circle"></div>
		</div>
		<a href="javascript:;" v-if="!thisvalidationMobile && !thisvalidationGoogle" @click="goCheck">立即认证</a>
		<i class="checked_icon" v-if="thisvalidationMobile || thisvalidationGoogle"></i>
		<div class="bar"></div>
	</div>
</template>

<script>
import store from '../../vuex/store'
//绑定手机或谷歌注册码
export default {
    name: 'register_2',
    props: ['value'],
    data () {
    	return {
    		thisvalidationMobile: false,
    		thisvalidationGoogle: false,
    	}
    },
    components: {
    },
    computed: {
/*    	thisvalidationMobile () {
    		return this.$store.getters.validationMobile ? true : false;
    	},
    	thisvalidationGoogle () {
    		return this.$store.getters.validationGoogle ? true : false;
    	}*/
		user() {
			return this.$store.getters.getUser;
		},
    },
    mounted () {
    	////console.log(this.$store.getters.validationMobile)
    	if(this.user){
    		this.thisvalidationMobile = this.user.customerInfo.mobile ? true : false;
    		this.thisvalidationGoogle = this.user.customerInfo.otherGoogleIdentifier ? true : false;
    	}
    },
    methods: {
    	goCheck () {
    		this.$router.push({path: '/user/settings'});
    	}
    }
 }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.register_2{
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
}
</style>