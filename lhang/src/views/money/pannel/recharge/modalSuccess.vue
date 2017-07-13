<template>
	<div class="btc_modal">
		<div class="shadow_box"></div>
		<div class="content">
			<span class="close_btn" @click="close">&times;</span>
			<div class="success">
				<img src="" alt="" />
				<p>您已兑换成功！</p>
			</div>
			<div class="btn">
				<div class="btn_box">
					<a href="javascript:;">跳转查看</a>
					<a href="javascript:;" @click="close">暂不查看</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import store from "../../../../vuex/store"
export default {
    name: 'btcModal',
    props:['value', 'type'],
    data () {
    	return {
    	}
    },
    computed: {
    },
    components: {
    },
    mounted(){
    	
    },
    methods: {
    	//关闭遮罩层
    	close () {
    		store.dispatch("showShadowBox", false);
    		store.dispatch("showMoneyBTCModal", false);
    		
    		this.$emit("closeModal", false);
    	}
    }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.btc_modal{
	width: 300px;
	height: 210px;
	position: fixed;
	left: 50%;
	top: 50%;
	z-index: 1000;
	border-radius: 5px;
	transform: translate(-50%, -50%);
	background: #fff;
	.content{
		background: #fff;
		border-radius: 3px;
		.success{
			text-align: center;
			height: 140px;
			line-height: 140px;
			p{
				font-size: 18px;
			}
		}
		.btn{
			padding: 8px 11px;
			border-top: 1px solid #EAEAEA;
			overflow: hidden;
			.btn_box{
				width: 301px;
			}
			a{
				float: left;
				border-right: 1px solid #EAEAEA;
				height: 70px;
				line-height: 70px;
				text-align: center;
				width: 149px;
				font-size: 14px;
				color: #0093F1;
			}
		}
	}
	.close_btn{
		color: #fff;
		font-size: 300%;
		position: absolute;
		right: -35px;
		top: -18px;
		cursor: pointer;
	}
}
</style>