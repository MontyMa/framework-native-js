<template>
	<div class="register_1">
		<p :class="{active: activated}">注册激活账户</p>
		<span v-if="!activated">您还未注册激活账户，请先注册激活账户</span>
		<span v-else>您已注册激活账户</span>
		<div class="circle_box" :class="{active: activated}">
			<div class="circle_shadow"></div>
			<div class="circle"></div>
		</div>
		<a href="javascript:;" v-if="!activated">立即认证</a>
		<i class="checked_icon" v-if="activated"></i>
	</div>
</template>

<script>
//注册激活账号
export default {
    name: 'register_1',
    props: ['value'],
    data () {
    	return {
    		activated: true,
    	}
    },
    components: {
    },
    computed: {
/*    	activated () {
    		return this.$store.getters.activated;
    	}*/
		user() {
			return this.$store.getters.getUser;
		},
    },
    methods: {
    	goCheck () {
    		this.$router.push({path: '/user/settings'})
    	}
    },
    mounted () {
    	if(this.user){
    		this.activated = this.user.customerInfo.activated;
    	}
    }
 }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.register_1{
	position: relative;
	margin-left: 210px;
	width: 550px;
	margin-top:15px;
	p{
		color: #9B9B9B;
		margin-bottom: 10px;
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
		top: 0;
	}
	.circle_box{
		position: absolute;
		z-index: 10;
		left: -85px;
		top: 3px;
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
		top: 0;
	}
}
</style>