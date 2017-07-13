<template>
	<div class="register_5">
		<p :class="{active: isAuth}">完成实名认证{{authName}}</p>
		<span v-if="!isAuth">您还未完成实名认证，目前无法进行账户或地址提现操作</span>
		<span v-else>您已完成{{authName}}认证</span>
		<div class="circle_box" :class="{active : isAuth}">
			<div class="circle_shadow"></div>
			<div class="circle"></div>
		</div>
		<a href="javascript:;" v-if="!isAuth" @click="goCheck">立即认证</a>
		<i class="checked_icon" v-if="isAuth"></i>
		<div class="bar"></div>
	</div>
</template>

<script>
//实名认证C2
export default {
    props: ['value'],
    data () {
    	return {
    		isAuth: false,
    		authName: '',
    	}
    },
    computed: {
/*    	isAuth () {
    		if(this.$store.getters.authType){
    			return true;
    		}else{
    			return false;
    		}
    	},
    	authName () {
    		return this.$store.getters.authType;
    	}*/
		user() {
			return this.$store.getters.getUser;
		},
    },
    components: {
    },
    mounted () {
    	////console.log(this.$store.getters.authType)
    	if(this.user){
    		this.isAuth = this.user.customerInfo.authType ? true : false;
    		this.authName = this.user.customerInfo.authType;
    	}
    },
    methods: {
    	goCheck () {
    		this.$router.push({path: '/user/auth'})
    	}
    }
 }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.register_5{
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