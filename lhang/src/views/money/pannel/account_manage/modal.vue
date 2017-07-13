<template>
	<div class="btc_modal">
		<div class="shadow_box"></div>
		<div class="content">
			<span class="close_btn" @click="close">&times;</span>
			<h2>添加{{thisTypeName}}钱包地址</h2>
			<ul class="body">
				<li>
					<span class="left">{{thisTypeName}}地址</span>
					<div class="right">
						<input type="text" v-model="digitAssetAddress" />
					</div>
				</li>
				<li>
					<span class="left">资金密码</span>
					<div class="right">
						<input type="password" value="" autocomplete="off" v-model="paypwd" />
						<router-link to="/user/settings/funding_edit"><span class="hint" @click="close">忘记资金密码？</span></router-link>
					</div>
				</li>
				<li v-if="validationMobile">
					<span class="left">短信验证码</span>
					<div class="right">
						<sms-code @smsMsg="getMcode" :type="getSmsCode.type"></sms-code>
						<!--<sms-code @smsMsg="getMcode" :value="getCodeData"></sms-code>-->
					</div>
				</li>
				<li>
					<span class="left">备注信息</span>
					<div class="right">
						<textarea name="" rows="" cols="" v-model="remark"></textarea>
					</div>
				</li>
				<li>
					<span class="left"></span>
					<div class="right">
						<!--<input type="checkbox" v-model="isDefault"/><span>设置为默认账户</span>-->
						<div class="check_box">
							<label>
                <input type="checkbox" class="g_i_check" v-model="isDefault"/>
                <span></span>
                <span class="g_label sms_msg">设置为默认账户</span>
              </label>
						</div>
					</div>
				</li>
				<li>
					<span class="left"></span>
					<div class="right">
						<a href="javascript:;" class="btn" @click="addAddress">立即绑定</a>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import store from "../../../../vuex/store"
	export default {
		name: 'btcModal',
		props: ['value', 'type'],
		data() {
			return {
				useruuid: '',
				walletType: "提现",
				digitAssetAddress: "",
				paypwd: "",
				smscode: "",
				remark: "",
				isDefault: false,
				getSmsCode: {
					type: 'addAddress'
				}
			}
		},
		computed: {
			thisUuid() {
				return this.$store.getters.uuid;
			},
			validationMobile() {
				if(this.$store.getters.getUser.customerInfo.mobile) {
					return true;
				}
			},
			thisType() {
				if(this.type.moneytype == 'btc') {
					return 'btc';
				} else if(this.type.moneytype == 'zec') {
					return 'zec';
				} else if(this.type.moneytype == 'eth') {
					return 'eth';
				} else if(this.type.moneytype == 'etc') {
					return 'etc';
				}
			},
			thisTypeName() {
				if(this.type.moneytype == 'btc') {
					return '比特币';
				} else if(this.type.moneytype == 'zec') {
					return '零币';
				} else if(this.type.moneytype == 'eth') {
					return '以太坊';
				} else if(this.type.moneytype == 'etc') {
					return '以太经典';
				}
			}
		},
		components: {},
		mounted() {},
		methods: {
			addAddress() {
				let options = {
					"useruuid": this.thisUuid,
					"assetCode": this.thisType,
					"walletType": "提现",
					"digitAssetAddress": this.digitAssetAddress,
					"paypwd": this.paypwd,
					"smscode": this.smscode,
					"remark": this.remark
				};
				//console.log(options);
				if(this.validationMobile && !this.smscode) {
					alert("请输入短信验证码!")
				} else {
					lh_http("post", "walletInfo/add", options).done((res) => {
						if(res.status == true) {
							this.close();
							this.$emit("updateList", true);
						} else {
							alert(res.data);
						}
					})
				}
			},
			//关闭遮罩层
			close() {
				store.dispatch("showShadowBox", false);
				store.dispatch("showMoneyBTCModal", false);

				this.$emit("closeModal", false);
			},
			//获取短信验证码
			getMcode(val) {
				this.smscode = val;
			}
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	.btc_modal {
		width: 490px;
		height: 570px;
		position: fixed;
		left: 50%;
		top: 50%;
		z-index: 1000;
		padding: 0 30px;
		border-radius: 5px;
		transform: translate(-50%, -50%);
		background: #fff;
		.content {
			background: #fff;
			border-radius: 3px;
			h2 {
				border-bottom: 1px solid #EAEAEA;
				padding: 20px 0;
				font-size: 18px;
				font-weight: normal;
			}
			.body {
				li {
					margin: 30px 0;
					.left {
						text-align: right;
						vertical-align: middle;
						display: inline-block;
						width: 90px;
						margin-right: 20px;
					}
					.right {
						width: 294px;
						display: inline-block;
						vertical-align: middle;
						input[type=text],
						input[type=password] {
							padding: 0 10px;
							width: 294px;
							height: 40px;
							border: 1px solid #9B9B9B;
							vertical-align: middle;
							&.reset_width {
								width: 139px;
								margin-right: 2px;
							}
						}
						i {
							position: absolute;
							color: #F06104;
							font-style: normal;
							display: block;
						}
						textarea {
							@extend input[type=text];
							height: 76px;
							resize: none;
							vertical-align: middle;
						}
						.btn {
							display: inline-block;
							@extend input[type=text];
							background: #0093F1;
							color: #fff;
							border-radius: 3px;
							text-align: center;
							height: 45px;
							line-height: 45px;
							border: none;
							margin-top: -15px;
						}
						.hint {
							color: #0093F1;
							display: inline-block;
							margin-top: 3px;
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