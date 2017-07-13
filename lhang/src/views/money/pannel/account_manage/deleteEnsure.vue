<template>
	<div class="modal">
		<div class="shadow_box"></div>
		<div class="content">
			<span class="close_btn" @click="close">&times;</span>
			<h2>提示</h2>
			<div class="detail">
				<p class="content_info">删除之后不可恢复，确认删除？</p>
				<div class="btn_box">
					<a href="javascript:void(0);" class="ensure" @click="deleteAccount">确认</a>
					<a href="javascript:void(0);" class="cancle" @click="close">取消</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import store from "../../../../vuex/store"
	export default {
		props: ['thisDelete'],
		data() {
			return {}
		},
		components: {},
		computed: {},
		methods: {
			//删除
			deleteAccount() {
				if(!this.thisDelete) return;
				let url = '';
				let options = {};
				options.id = this.thisDelete.id;
				if(this.thisDelete.type == 'bank'){
					url = 'bankInfo/delete';
				}else if(this.thisDelete.type == 'alipay'){
					url = 'alipayInfo/delete';
				}else if(this.thisDelete.type == 'digital'){
					url = 'walletInfo/delete';
				}
				lh_http("post", url, options).done((res) => {
					if(res.status){
						this.close();
					}
				})
			},
			//关闭遮罩层
			close() {
				store.dispatch("showShadowBox", false);
				this.$emit("closeModal", false);
			}
			//
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	.modal {
		width: 360px;
		height: 192px;
		position: fixed;
		left: 50%;
		top: 50%;
		z-index: 1000;
		transform: translate(-50%, -50%);
		background: #fff;
		border-radius: 5px;
		.content {
			background: #fff;
			border-radius: 3px;
			height: 100%;
			h2 {
				border-bottom: 1px solid #EAEAEA;
				padding: 14px 0 14px 28px;
				font-size: 18px;
				color: #0093F1;
				font-weight: normal;
			}
			.detail {
				.content_info {
					padding: 28px 0 40px 28px;
					font-size: 16px;
				}
				.btn_box {
					padding-left: 182px;
					a {
						display: inline-block;
						width: 68px;
						height: 30px;
						font-size: 14px;
						margin-right: 10px;
						line-height: 32px;
						text-align: center;
						border: 1px solid #999;
						border-radius: 3px;
						&.ensure {
							background: #0093F1;
							color: #fff;
							border-color: #0093F1;
							&:hover {
								background: #26a8fb;
							}
							&:active {
								background: #0084d9;
							}
						}
						&.cancle {
							&:hover {
								color: #26a8fb;
								border-color: #26a8fb;
							}
							&:active {
								color: #0084d9;
								border-color: #0084d9;
							}
						}
					}
				}
			}
		}
		.close_btn {
			color: #fff;
			font-size: 300%;
			position: absolute;
			right: -35px;
			top: -18px;
			cursor: pointer;
		}
	}
</style>