<template>
	<div class="recharge_code">
		<div v-if="clickable">
			<div class="container">
				<div class="container_left">
					<!--<recharge-code-handle :value="setAddress" @exchangeVal="getExchangeVal" v-if="setAddress == false"></recharge-code-handle>
					<recharge-code-handle2 v-if="setAddress == true"></recharge-code-handle2>-->
					<div class="step1" v-if="step == 1">
						<div class="recharge_btc_handle">
							<ul>
								<li>
									<span>充值码</span>
									<div class="box">
										<input type="text" placeholder="输入充值码" v-model="cardAddress" />
									</div>
								</li>
								<li>
									<span>验证码</span>
									<div class="box">
										<check-code @ImgCode="getImgCode"></check-code>
									</div>
								</li>
								<li>
									<span></span>
									<div class="box">
										<button type="button" @click="submitAddress">确定提交</button>
									</div>
								</li>
							</ul>
							<div class="help">
					            <router-link to="/help/how-recharge">查看充值教程</router-link>
					            <span>&raquo;</span>
								<!--查看充值码兑换教程<span>&raquo;</span>-->
							</div>
						</div>
					</div>
					<div class="step2" v-if="step == 2">
						<div class="recharge_btc_handle">
							<div class="charge_info">
								<ul>
									<li>
										<span>充值金额：</span>
										<div class="box">
											<p>{{chargeAmout}}</p>
										</div>
									</li>
									<li>
										<span>资产类型：</span>
										<div class="box">
											<span>{{chargeType}}</span>
										</div>
									</li>
									<li>
										<span>使用有效期：</span>
										<div class="box">
											<div v-if="!showAlways">
												<span class="toinline">{{startDate | formattime('yyyy/MM/dd hh:mm:ss')}}</span>
												<span class="toinline">-</span>
												<span class="toinline">{{endDate | formattime('yyyy/MM/dd hh:mm:ss')}}</span>
											</div>
											<div v-else class="toinline">永久生效</div>
										</div>
									</li>
								</ul>
							</div>
							<div class="password_box">
								<ul>
									<li>
										<span class="reset_margin">充值密码</span>
										<div class="box">
											<input type="password" placeholder="输入您的充值密码" v-model="payPwd" />
										</div>
									</li>
									<li>
										<span class="reset_margin"></span>
										<div class="box">
											<button type="button" @click="exchange">立即兑换</button>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div class="container_right">
					<recharge-code-info></recharge-code-info>
				</div>
			</div>
			<!--提取记录-->
			<recharge-code-record :value="changeStatus"></recharge-code-record>
		</div>
		<div v-else>
			<pre-register :myType="subTitle"></pre-register>
		</div>
		<!--<modal-success v-if="true" :value="showModal" @closeModal="closeThisModal"></modal-success>-->
	</div>
</template>

<script>
	import rechargeCodeHandle from "./rechargeCodeHandle"
	import rechargeCodeHandle2 from "./rechargeCodeHandle2"
	import rechargeCodeInfo from "./rechargeCodeInfo"
	import rechargeCodeRecord from "./rechargeCodeRecord"
	import preRegister from '../../../../components/checkAuth/preRegister'
//	import modalSuccess from './modalSuccess'
	export default {
		name: 'rechargeCode',
		data() {
			return {
				step: 1, //充值码充值提交充值地址
				cardAddress: "", //充币地址
				vCode: "", //图片验证码
				chargeAmout: "", //充值金额
				chargeType: "CNY", //资产类型
				startDate: "", //有效期起始时间
				endDate: "", //有效期终止时间
				payPwd: "", //交易密码
				changeStatus: false, //用来改变现实充值的步骤
				subTitle: '充值码兑换', //注册页面的功能的title
				showModal: false, //显示遮罩层
				showAlways: false,
				clickable: false,
			}
		},
		components: {
			rechargeCodeInfo,
			rechargeCodeRecord,
			preRegister,
//			modalSuccess
		},
		computed: {
			user() {
				return this.$store.getters.getUser;
			},
		},
		methods: {
			//获取输入的图片验证码
			getImgCode(val) {
				this.vCode = val;
			},
			//提交充值地址
			submitAddress() {
				let options = {
					cardId: this.cardAddress,
					vcode: this.vCode
				};
				//补0
				function fillZero(n) {
					return n > 9 ? '' + n : "0" + n;
				}

				if(!this.cardAddress) {
					alert("请输入充值地址!")
				} else if(!this.vCode) {
					alert("请输入验证码！")
				} else {
					lh_http("post", "depositCard/cardDetail", options).done((res) => {
						//console.log(res);
						if(res.status) {
							/*							if(res.data.data.cardStatus == 9) {
															alert("卡号已停用");
															return;
														} else*/
							if(res.data.data.cardStatus == 1) {
								alert("此卡已注册");
								return;
							} else if(res.data.data.cardStatus == 0) {
								if(res.data.data.neverExpires){
									this.chargeAmout = res.data.data.cardValue;
									this.chargeType = res.data.data.assetCode.toUpperCase();
									this.showAlways = true;
									this.step = 2;
								}else{
									let time = res.data.data.expEndDate;
									let endTime = new Date(time);
									let year = fillZero(endTime.getFullYear());
									let month = fillZero(endTime.getMonth() + 1);
									let day = fillZero(endTime.getDate());
									let hours = fillZero(endTime.getHours());
									let minutes = fillZero(endTime.getMinutes());
									let eTime = '' + year + month + day + hours + minutes;
									//当前时间
									let nowTime = new Date();
									let nowyear = fillZero(nowTime.getFullYear());
									let nowmonth = fillZero(nowTime.getMonth() + 1);
									let nowday = fillZero(nowTime.getDate());
									let nowhours = fillZero(nowTime.getHours());
									let nowminutes = fillZero(nowTime.getMinutes());
									let nTime = '' + nowyear + nowmonth + nowday + nowhours + nowminutes;
	
									if(nTime <= eTime) {
										this.chargeAmout = res.data.data.cardValue;
										this.chargeType = res.data.data.assetCode.toUpperCase();
										this.startDate = res.data.data.expStartDate;
										this.endDate = res.data.data.expEndDate;
										this.step = 2;
									} else {
										alert("卡号已停用");
										return;
									}
								}
							}
						} else {
							alert(res.data);
							this.$store.dispatch("updataImgCode", true);
						}
					});
				}
			},
			//立即兑换
			exchange() {
				let options = {
					cardId: this.cardAddress,
					cardPass: this.payPwd
				};
				//console.log(options);
				lh_http("post", "depositCard/cardExchange", options).done((res) => {
					console.log("11111", res);
					if(res.status) {
						this.changeStatus = true;
						alert("您已兑换成功！");
						this.cardAddress = "";
						this.payPwd = "";
						this.step = 1;
						//显示背景阴影弹窗
//						this.$store.dispatch("showShadowBox", true);
//						this.showModal = true;
					}else{
						console.log("2222",res);
						alert(res.data);
					}
				});
			},
			//关闭弹窗
			closeThisModal(val) {
				this.showModal = val;
			}
		},
		mounted() {
	    	if(this.user){
	    		//是否注册
	    		let activated = this.user.customerInfo.activated;
	    		//C2认证
	    		let isAuth = this.user.customerInfo.authType ? true : false;

	    		if(activated && isAuth){
	    			this.clickable = true;
	    		}
	    	}
			////console.log(this.activated)
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	.recharge_code {
		.title {
			p {
				margin-top: 30px;
				margin-bottom: 15px;
			}
			div {
				background: #F2F9FE;
				height: 52px;
				line-height: 52px;
				padding-left: 60px;
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
			overflow: hidden;
			margin: 24px 0 65px 0;
			.container_left {
				float: left;
				width: 475px;
				.step1,
				.step2 {
					.recharge_btc_handle {
						border-right: 1px solid #e2e2e2;
						font-size: 13px;
						/*padding-top: 33px;
						padding-right: 40px;*/
						min-height: 375px;
						padding: 33px 40px 35px 0px;
						ul {
							li {
								margin-bottom: 30px;
								span {
									display: inline-block;
									width: 78px;
									text-align: right;
									margin-right: 30px;
								}
								.box {
									width: 320px;
									display: inline-block;
									position: relative;
									vertical-align: middle;
									input {
										width: 320px;
										padding: 0 10px;
										height: 35px;
										border: 1px solid #9b9b9b;
										border-radius: 3px;
									}
									span {
										text-align: left;
									}
									.reset_width_220 {
										width: 220px;
										margin-right: 5px;
									}
									.reset_width_90 {
										width: 90px;
										color: #9b9b9b;
									}
									button {
										width: 320px;
										height: 40px;
										line-height: 40px;
										background: #0093F1;
										color: #fff;
										text-align: center;
										cursor: pointer;
										font-size: 18px;
										&:hover {
											background: #26a8fb;
										}
										&:active {
											background: #0084d9;
										}
									}
								}
							}
						}
						.help {
							text-align: right;
							/*margin-right: 48px;*/
							color: #0093F1;
							cursor: pointer;
							margin-top: -20px;
							span {
								font-size: 150%;
								margin-left: 5px;
								color: #0093F1;
							}
						}
					}
				}
				,
				.step2 {
					.recharge_btc_handle {
						.charge_info {
							span {
								color: #9B9B9B;
							}
						}
						.password_box {
							border-top: 1px solid #e2e2e2;
							padding-top: 30px;
							.reset_margin {
								margin-left: -5px;
							}
							/*margin-left: 55px;
							width: 470px;*/
							/*							ul {
								margin-left: -55px;
							}*/
						}
						ul {
							li {
								.toinline {
									display: inline;
									margin: 0;
								}
								.box {
									i {
										display: block;
										font-size: 12px;
										font-style: normal;
										position: absolute;
										top: 38px;
										color: #f06104;
									}
									a {
										@extend i;
										color: #0093F1;
									}
									span {
										text-align: left;
										width: 100%;
										color: #000;
									}
									p {
										font-size: 24px;
										color: #dd1a53;
										span {
											font-size: 13px;
											color: #000;
										}
									}
								}
							}
						}
					}
				}
			}
			.container_right {
				float: left;
				width: 432px;
			}
		}
	}
</style>
