<template>
	<div class="policy_handle">
		<ul>
			<li v-if="showPwd">
				<span class="handle_item">资金密码</span>
				<div class="box">
					<input type="password" placeholder="请输入资金密码" v-model="payPwd" />
					<a href="#/user/settings/funding_edit" class="forget_hint">忘记资金密码</a>
				</div>
			</li>
			<li v-if="showSms">
				<span class="handle_item">短信验证码</span>
				<div class="box">
					<sms-code @smsMsg="getSmsCode" :type="type"></sms-code>
				</div>
			</li>
			<li v-if="showGoogle">
				<span class="handle_item">(资金)谷歌验证码</span>
				<div class="box">
					<input type="password" placeholder="请输入(资金)谷歌验证码" v-model="token" />
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		props: ['type'],
		data() {
			return {
				showPwd: false,
				showSms: false,
				showGoogle: false,
				
				payPwd: "", //资金密码 
				token: "" //谷歌验证码
			}
		},
		computed: {
			user () {
				return this.$store.getters.getUser;
			},
			clearMsg () {
				return this.$store.getters.clearPolicyMsg;
			}
		},
		watch: {
			payPwd (val) {
				this.$emit("payPwd", val);
			},
			token (val) {
				this.$emit("token", val);
			},
			clearMsg (val) {
				if(val){
					this.payPwd = "";
					this.token = "";
					this.$store.dispatch("clearPolicyMsg", false);
				}
			}
		},
		methods: {
			getSmsCode (val){
				this.$emit("smscode", val);
			},
			getPolicy () {
				let policyList = this.user.policyList;
				for(let i = 0; i < policyList.length; i++){
					if(policyList[i].validationMode == 'draw'){
						let securityId = policyList[i].securityId.split(",");
						for(let j of securityId){
							switch(j){
								case '2':
									this.showGoogle = true;
									break;
								case '3':
									this.showSms = true;
									break;
								case '5':
									this.showPwd = true;
									break;
							}
						}
					}
				}
			}
			
		},
		mounted() {
			////console.log(111,this.user)
			this.getPolicy();
		},
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	.policy_handle {
		width: 455px;
		border-top: 1px solid #e2e2e2;
		font-size: 13px;
		padding-top: 30px;
		ul {
			li {
				margin-bottom: 30px;
				.handle_item {
					display: inline-block;
					width: 100px;
					text-align: right;
					margin-right: 30px;
				}
				.box {
					width: 320px;
					display: inline-block;
					position: relative;
					input {
						width: 320px;
						padding: 0 10px;
						height: 35px;
						border: 1px solid #9b9b9b;
						border-radius: 3px;
					}
					select {
						@extend input;
					}
					option {
						height: 40px;
					}
					i {
						display: block;
						font-size: 12px;
						font-style: normal;
						position: absolute;
						top: 38px;
						color: #f06104;
					}
					.forget_hint {
						@extend i;
						color: #0093F1;
						display: inline-block;
						width: 100%;
						text-align: right;
						right: 0;
					}
					span {
						text-align: left;
					}
					p {
						font-size: 24px;
						color: #dd1a53;
						span {
							font-size: 13px;
							color: #000;
							display: inline;
						}
					}
					.reset_width_220 {
						width: 220px;
						margin-right: 5px;
					}
					.reset_width_90 {
						width: 90px;
						color: #9b9b9b;
					}
					.reset_width_150 {
						width: 150px;
					}
					button {
						width: 320px;
						height: 40px;
						line-height: 40px;
						font-size: 18px;
						background: #0093F1;
						color: #fff;
						text-align: center;
						cursor: pointer;
						&:hover {
							background: #26a8fb;
						}
						&:active {
							background: #0084d9;
						}
					}
					.container {
						position: relative;
						.item {
							position: absolute;
							left: 0;
							top: 35px;
							background: #fff;
							z-index: 10;
							box-shadow: 0 0px 15px #ccc;
							span {
								display: block;
								height: 40px;
								line-height: 40px;
								width: 320px;
								padding: 0 15px;
								margin: 0;
								&:hover {
									background: #0093F1;
									color: #fff;
								}
							}
						}
					}
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
</style>