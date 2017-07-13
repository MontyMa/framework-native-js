<template>
	<div class="google_set">
		<ul v-if="security.sms || security.google || security.email">
			<li v-if="security.email">
				<span>邮箱地址</span>
				<div class="box">
					<p class="account"><span>{{getEmail | encrypt('email')}}</span></p>
				</div>
			</li>
			<li v-if="security.email">
				<span>邮箱验证码</span>
				<div class="box">
					<sms-code :type="emailType" :email="toEmail" :toemail="getEmail" @smsMsg="getMcode"></sms-code>
				</div>
			</li>
			<!-- -->
			<li v-if="security.sms">
				<span>手机号码</span>
				<div class="box">
					<p class="account"><span>{{getMobile | encrypt('mobile')}}</span></p>
				</div>
			</li>
			<li v-if="security.sms">
				<span>短信验证码</span>
				<div class="box">
					<sms-code :type="smsType" @smsMsg="getMcode"></sms-code>
				</div>
			</li>
			<!-- -->
			<li v-if="security.google">
				<span>(设置)谷歌验证码</span>
				<div class="box">
					<input type="password" v-model="token" placeholder="请输入(设置)谷歌密码"/>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				security: {
					sms: false,
					google: false,
					email: false,
				},
				token: null,
				toEmail: 'email'
			}
		},
		props: ['smsType', 'emailType'],
		computed: {
			user() {
				return this.$store.getters.getUser;
			},
			getMobile() {
				let mobile = this.$store.getters.getUser.customerInfo.mobile;
				if(!mobile) return false;
				return mobile;
			},
			getEmail() {
				let email = this.$store.getters.getUser.customerInfo.email;
				if(!email) return false;
				return email;
			},
		},
		methods: {
			getMcode(val) {
				//获取短信验证码
				this.$emit("getMcode", val);
			},
			save() {
				this.$emit("save");
			}
		},
		watch: {
			token (val) {
				this.$emit("g_token", val);
			}
		},
		mounted() {
			if(this.user.policyList){
				for (let i = 0; i < this.user.policyList.length; i++) {
					if(this.user.policyList[i].validationMode == 'security'){
						let security = this.user.policyList[i].securityId.split(',');
						for(var j of security) {
							switch(j) {
								case '2':
									this.security.google = true;
									break;
								case '3':
									this.security.sms = true;
									break;
							}
						}
					}
				}
				if(!(this.security.google || this.security.sms)){
						this.security.google = false;
						this.security.sms = false;
						this.security.email = true;
				}
			}
		},
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
	.google_set {
		border-top: 1px solid #ccc;
		padding-top: 40px;
		margin-top: 65px;
		/*margin-left: -40px;*/
		li {
				margin-bottom: 30px;
				margin-left: 40px;
				span {
					display: inline-block;
					width: 125px;
					text-align: right;
					margin-right: 32px;
					font-size: 16px;
				}
				.reset_left{
					margin-left: -40px;
				}
				.account {
					text-align: left;
					span {
						text-align: left;
						margin-right: 0;
						width: initial;
						color: #0093F1;
					}
				}
				.sound {
					@extend .account;
					position: absolute;
				}
				.box {
					width: 412px;
					display: inline-block;
					text-align: left;
					position: relative;
					vertical-align: middle;
					.code {
						position: absolute;
						right: 15px;
						top: 15px;
					}
					.check_box {
						position: absolute;
					}
					.sms_msg {
						span {
							width: initial;
							color: #f35809;
						}
					}
					.codeIcon {
						position: absolute;
						top: 2px;
						right: 10px;
						width: 100px;
						height: 40px;
						background: #ccc;
					}
					input[type="text"], input[type="password"]{
						width: 412px;
						padding: 0 10px;
						height: 45px;
						border: 1px solid #9b9b9b;
						border-radius: 3px;
					}
					button {
						width: 412px;
						height: 45px;
						line-height: 45px;
						;
						background: #0093F1;
						color: #fff;
						text-align: center;
						cursor: pointer;
						&:hover {
							background: darken(#0093F1, 10%);
						}
						&.unable {
							background: lighten(#0093F1, 30%)
						}
					}
				}
			}
	}
</style>