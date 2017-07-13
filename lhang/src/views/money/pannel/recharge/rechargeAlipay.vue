<template>
	<div class="recharge_alipay">
		<div class="title">
			<p>支付宝充值步骤：</p>
			<div>
				<span>1、填写并生成充值申请</span>
				<i></i>
				<span>2、前往您的支付宝向指定账户转账</span>
				<i></i>
				<span>3、完成充值后2小时内到账</span>
			</div>
		</div>
		<div class="container clearFix">
			<div class="container_left">
				<div class="charge_cny_step">
					<ul>
						<li>
							<span class="itemname">支付宝账号</span>
							<div class="box">
								<vue-select-bank @thisbankAccount="getBankName" :type="chargeType"></vue-select-bank>
							</div>
						</li>
						<li>
							<span class="itemname">充值金额</span>
							<div class="box">
								<input type="text" placeholder="请输入充值金额" v-model="assetAmt" /><span class="rdmNum">{{random}}</span>
								<p class="hint">为了快速到账,请严格按上述金额汇款，包括<span>小数点后两位{{random}}</span></p>
							</div>
						</li>
						<li class="changeHeight">
							<span class="itemname">通知手机</span>
							<div class="box">
								<input type="text" placeholder="请输入手机号" v-model="mobile" />
								<div class="bind_phone">
									<!--<input type="checkbox" v-model="useBindPhone"/><span>使用绑定手机号码</span>-->
									<div class="check_box">
										<label>
                      <input type="checkbox" class="g_i_check" v-model="useBindPhone"/>
                      <span></span>
                      <span class="g_label sms_msg">使用绑定手机号码</span>
                    </label>
									</div>
								</div>
							</div>
						</li>
						<li>
							<span class="itemname"></span>
							<div class="box">
								<button type="button" @click="chargeApply">生成充值申请</button>
							</div>
						</li>
					</ul>
					<div class="help" @click="anchorPoint(12)">
						<router-link to="/help/how-recharge">查看充值教程</router-link>
						<span>&raquo;</span></div>
				</div>
			</div>
			<div class="container_right">
				<recharge-cny-info :type="chargeType"></recharge-cny-info>
			</div>
		</div>
		<modal-alipay v-if="showModal" @closeModal="closeThisModal" :amount="totalMoney" :markMsg="uniqueCode"></modal-alipay>
	</div>
</template>

<script>
	import rechargeCnyInfo from "./rechargeCnyInfo"
	import vueSelectBank from '../components/vueSelectBank'

	import modalAlipay from './modalAlipay'
	export default {
		name: 'rechargeAlipay',
		data() {
			return {
				depositType: "支付宝充值",
				account: '',
				assetCode: "cny",
				assetAmt: "",
				mobile: "",
				mark: "",
				random: 0,
				totalMoney: 0,
				updateList: false, //添加成功后通知列表更新
				useBindPhone: false, //使用绑定手机
				moneyType: 'cny',
				showSuccessModal: false,
				uniqueCode: '',
				showModal: false,
				chargeType: "alipay" //传给select选择框
			}
		},
		computed: {
			//生成随机数并去除整数位0
			/*		random () {
			 let ranNum = (Math.random()*(0.99-0.01)+0.01).toFixed(2);
			 //let ranNum = random.toFixed(2);
			 let s = ranNum.toString().replace(/^0/, '');
			 return s;
			 },*/
			thisuuid() {
				return this.$store.getters.uuid;
			},
			/*    	//计算总金额（加上随机生成的小数）
			 totalMoney () {
			 return this.assetAmt + this.random;
			 },*/
			//获取绑定手机号码
			getBindPhone() {
				if(this.$store.getters.getUser) {
					return this.$store.getters.getUser.customerInfo.mobile;
				}
			},
		},
		components: {
			rechargeCnyInfo,
			vueSelectBank,
			modalAlipay
		},
		watch: {
			//使用绑定手机号码
			useBindPhone(val) {
				if(val) {
					if(this.getBindPhone) {
						this.mobile = this.getBindPhone;
					} else {
						alert("您尚未绑定手机!")
					}
				} else {
					this.mobile = "";
				}
			},
			assetAmt(val) {
				this.totalMoney = val + this.random;
				let reg = /[^0-9]/g;
				this.assetAmt = val.replace(reg, '');
			}
		},
		methods: {
			setCur(data) {
				for(let i = 0; i < this.rechageType.length; i++) {
					this.rechageType[i].isCur = false;
				}
				data.isCur = true;
			},
			randomNum() {
				let ranNum = (Math.random() * (0.99 - 0.01) + 0.01).toFixed(2);
				//let ranNum = random.toFixed(2);
				let s = ranNum.toString().replace(/^0/, '');
				//console.log('random11111', s);
				this.random = s;
			},
			//立即充值
			chargeApply() {
				let options = {
					useruuid: this.thisuuid,
					depositType: this.depositType,
					account: this.account,
					assetCode: this.assetCode,
					assetAmt: this.totalMoney,
					mobile: this.mobile,
					mark: this.mark
				};
				if(!this.account) {
					alert("请输入支付宝账号!");
				} else if(!this.assetAmt) {
					alert("请输入充值金额！")
				} else if(!this.assetAmt) {
					alert("请输入手机号！")
				} else {
					lh_http("post", 'depositOrder/deposit', options).done((res) => {
						if(res.status) {
							this.uniqueCode = res.data.mark;
							this.showModal = true;
							this.$store.dispatch("showShadowBox", true);
							this.useBindPhone = false;
							this.$store.dispatch("updateList", true);
							this.randomNum();
						} else {
							alert(res.data);
						}
					});
				}
			},
			//监听银行账号
			getBankName(val) {
				this.account = val;
			},
			closeThisModal(val) {
				this.showModal = val;
				this.assetAmt = '';
				this.mobile = '';
			},
			anchorPoint(num) {
				this.$store.dispatch('help_page_state', num);
				sessionStorage.setItem('help_page_state', num);
			}
		},
		mounted() {
			this.randomNum();
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	.recharge_alipay {
		.clearFix:after {
			display: block;
			content: "";
			clear: both;
		}
		.charge_type {
			overflow: hidden;
			.chargeType {
				float: left;
				margin-top: 20px;
				margin-right: 40px;
			}
			margin-top: 33px;
			ul {
				float: left;
				height: 65px;
				overflow: hidden;
				li {
					float: left;
					margin-right: 30px;
					width: 110px;
					height: 61px;
					position: relative;
					cursor: pointer;
					img {
						width: 110px;
						height: 61px;
					}
					.clicked {
						display: inline-block;
						width: 22px;
						height: 22px;
						background: url(./img/clicked.png) no-repeat;
						background-size: 100%;
						position: absolute;
						right: -12px;
						bottom: -5px;
					}
				}
			}
			.tips {
				margin-left: 140px;
				float: left;
				margin-top: 15px;
				height: 40px;
				span {
					color: #f06104;
				}
			}
		}
		.title {
			p {
				margin-bottom: 15px;
			}
			div {
				background: #F2F9FE;
				height: 40px;
				line-height: 40px;
				padding-left: 6px;
				span {
					color: #0093F1;
				}
				i {
					display: inline-block;
					width: 29px;
					height: 15px;
					background: url(../../images/to_left.png) no-repeat left;
					vertical-align: middle;
					margin-left: 20px;
					margin-right: 30px;
				}
			}
		}
		.container {
			margin-top: 23px;
			margin-bottom: 65px;
			.container_left {
				float: left;
				width: 475px;
			}
			.container_right {
				float: left;
				width: 432px;
			}
		}
		.charge_cny_step {
			width: 100%;
			border-right: 1px solid #e2e2e2;
			font-size: 13px;
			padding-bottom: 50px;
			padding-top: 33px;
			ul {
				li {
					margin-bottom: 30px;
					.itemname {
						display: inline-block;
						width: 65px;
						text-align: right;
						margin-right: 32px;
						margin-left: 12px;
					}
					.box {
						width: 320px;
						display: inline-block;
						position: relative;
						vertical-align: middle;
						input[type=text],
						input[type=password] {
							width: 320px;
							padding: 0 10px;
							height: 35px;
							border: 1px solid #9b9b9b;
							border-radius: 3px;
						}
						select {
							@extend input;
						}
						button {
							margin-top: 15px;
							width: 320px;
							height: 40px;
							line-height: 40px;
							;
							background: #0093F1;
							color: #fff;
							text-align: center;
							font-size: 18px;
							cursor: pointer;
							&:hover {
								background: #26a8fb;
							}
							&:active {
								background: #0084d9;
							}
						}
						.hint {
							position: absolute;
							font-size: 12px;
							top: 42px;
							width: 326px;
							color: #9B9B9B;
							span {
								color: #F06104;
							}
						}
						.rdmNum {
							position: absolute;
							right: -20px;
							top: 8px;
							color: #F06104;
						}
						.bind_phone {
							position: absolute;
							top: 40px;
							.sms_msg {
								display: inline-block;
								vertical-align: middle;
							}
						}
					}
					&.changeHeight {
						margin-top: 36px;
					}
				}
			}
			.help {
				text-align: right;
				margin-right: 35px;
				color: #0093F1;
				cursor: pointer;
				margin-top: -20px;
				span {
					font-size: 150%;
					margin-left: 5px;
				}
			}
		}
	}
</style>