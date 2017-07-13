<template>
	<div class="wx" id="wx" v-if="wx_status">
		<div class="wxbg">
			<div class="wxLogin">
				<span v-on:click="closewx()">X</span>
				<iframe scrolling="no" frameborder="0" src="https://open.weixin.qq.com/connect/qrconnect?appid=wx2d98887bb56517b0&redirect_uri=http%3A%2F%2Fwww.lhang.com&response_type=code&scope=snsapi_login&state=8574fd98-c1f4-4774-a304-96247b3cce2d#wechat_redirect"></iframe>
			</div>
		</div>
		
	</div>
</template>

<script>
	export default {
		name: 'wx',
		computed: {},
		data() {
			return {
				title: '',
				wx_status: false
			}
		}, //定义变量
		components: {}, //注册组件
		methods: { //方法都在这里
			aaa: function(){
//				alert("bb是组件")
//				//console.log(this.wx_status)
				this.wx_status = true;
			},
			closewx: function(){
				this.wx_status = false;
			}
		},
		mounted() {
			var that = this;
			//获取banner
//			alert(1111,323)
		},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
	.wx {
		.wxbg{
			width:100%;
			height:100%;
			background:rgba(0,0,0,0.3);
			z-index:10000000;
			position:fixed;
			top:0;
			bottom:0;
			left:0;
			right:0;
			.wxLogin{
				background:#fff;
				width: 400px;
				height: 400px;
				position: fixed;
				transform: translate(-50%, -50%);
				-webkit-transform: translate(-50%, -50%);
				left: 50%;
				top: 50%;
				border:#ccc solid 1px;
				iframe{
					width:400px;
					height:400px;
					position: absolute;
					top:0;
					left:0;
				}
				span{
					position:absolute;
					top:0;
					right:0;
					color:#999 !important;
					display: block;
					width:43px;
					cursor: pointer;
					z-index:9999999;
				}
			}
		}
	}
</style>