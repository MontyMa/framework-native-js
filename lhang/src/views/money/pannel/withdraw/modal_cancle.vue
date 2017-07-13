<template>
	<div class="btc_modal">
		<div class="shadow_box"></div>
		<div class="content">
			<span class="close_btn" @click="close">&times;</span>
			<h2>撤销订单</h2>
			<div class="detail">
				<p>您确定要撤销该订单么？</p>
				<div class="btn_box">
					<a href="javascripr: void(0)" @click="close">取消</a>
					<a class="linkbtn" href="javascripr: void(0)" @click="recall">确认</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import store from "../../../../vuex/store"
	export default {
		props: ['id', 'ajax', 'myPage'],
		data() {
			return {}
		},
		computed: {},
		components: {},
		mounted() {
			
		},
		methods: {
			//撤销
			recall() {
				let options = {
					"cancelOrderId": this.id
				};
				
				lh_http('post', 'drawOrder/cancelDrawOrder', options).done((res) => {
					if(res.status) {
						this.close();
						this.ajax(this.myPage);
					} else {
					}
				})
			},
			//关闭遮罩层
			close() {
				store.dispatch("showShadowBox", false);
				this.$emit("closeModal", false);
			}
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	.btc_modal {
		width: 360px;
		height: 192px;
		position: fixed;
		left: 50%;
		top: 50%;
		z-index: 1000;
		border-radius: 5px;
		transform: translate(-50%, -50%);
		background: #fff;
		.content {
			background: #fff;
			border-radius: 3px;
			h2 {
				border-bottom: 1px solid #EAEAEA;
				font-size: 18px;
				color: #0093F1;
				font-weight: normal;
				padding-bottom: 16px;
				padding-left: 28px;
				margin-top: 14px;
			}
			.detail {
				p {
					margin: 28px 0 40px 28px;
				}
				.btn_box {
					margin-left: 182px;
				}
				a {
					display: inline-block;
					font-size: 14px;
					width: 68px;
					height: 30px;
					line-height: 30px;
					text-align: center;
					color: #0093F1;
					border: 1px solid #0093F1;
					border-radius: 3px;
					margin-right: 10px;
				}
				.linkbtn {
					background: #0093F1;
					color: #fff;
				}
			}
			.btm {
				text-align: center;
				color: #9b9b9b;
				border-top: 1px solid #eaeae;
				padding-top: 10px;
				a {
					color: #F06104;
				}
			}
		}
		.close_btn {
			color: #999;
			font-size: 300%;
			position: absolute;
			right: 10px;
			top: -4px;
			cursor: pointer;
		}
	}
</style>