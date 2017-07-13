<template>
	<div class="recharge_btc_step">
		<div class="address">
			<p>充值地址：</p>
			<input type="text" id="chargeAddress" :value="walletInfo" readonly/>
			<a href="javascript:;" v-clipboard data-clipboard-action="copy" data-clipboard-target="#chargeAddress">复制钱包地址</a>
		</div>
		<div class="d_code">
			<div id="code" class="img"></div>
			<!--<img :src="myUrl+walletAddress" alt="" />-->
			<!--<a href="/help/funds-circulation">查看{{digitalName}}充值教程<span>&raquo;</span></a>-->
			<div class="help" @click="anchorPoint(12)">
				<router-link to="/help/how-recharge">查看充值教程</router-link>
				<span>&raquo;</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'rechargeBtcStep',
		props: ['thistype'],
		data() {
			return {
				walletAddress: '',
				walletInfo: '',
				myUrl: '',
			}
		},
		computed: {
			uuid() {
				return this.$store.getters.uuid;
			},
			digitalName() {
				if(this.thistype == 'btc') {
					return "比特币"
				} else if(this.thistype == 'zec') {
					return "零币"
				} else if(this.thistype == 'etc') {
					return "以太经典"
				} else if(this.thistype == 'eth') {
					return "以太坊"
				}
			}
		},
		components: {},
		methods: {
			getInfo() {
				lh_http("post", "walletInfo/getbytype", {
					useruuid: this.uuid,
					type: '充值',
					assetCode: this.thistype
				}).done((res) => {
					if(res.status) {
						this.walletAddress = res.data.walletAddress;
						this.walletInfo = res.data.walletInfo;
						//二维码
						$('#code').qrcode({
							width: 150, //宽度 
							height: 150, //高度 
							text: res.data.walletInfo,
						});
					}
				})
			},
			anchorPoint(num) {
				this.$store.dispatch('help_page_state', num);
				sessionStorage.setItem('help_page_state', num);
			}
		},
		mounted() {
			this.getInfo();
			this.myUrl = window.config.api;
			//console.log(this.thistype)
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	.recharge_btc_step {
		border-right: 1px solid #e2e2e2;
		margin-left: 12px;
		padding-top: 30px;
		.address {
			p {
				margin-bottom: 10px;
			}
			input {
				width: 320px;
				height: 35px;
				padding-left: 10px;
				background: #f8f8f8;
				border: 1px solid #999;
			}
			a {
				display: inline-block;
				width: 94px;
				height: 35px;
				line-height: 35px;
				text-align: center;
				background: #0093F1;
				color: #fff;
				border-radius: 3px;
				margin-left: 10px;
				font-size: 12px;
				&:hover {
					background: #26a8fb;
				}
				&:active {
					background: #0084d9;
				}
			}
		}
		.d_code {
			text-align: center;
			.img {
				width: 156px;
				height: 156px;
				display: block;
				margin-top: 30px;
				margin-left: 100px;
			}
			a {
				display: inline-block;
				color: #0093F1;
				font-size: 12px;
				margin-left: -105px;
				margin-top: 10px;
			}
			span {
				color: #0093F1;
			}
		}
	}
</style>