<template>
	<div class="google_bind">
		<!--<div class="st_t1">绑定({{title}})谷歌验证</div>-->
		<div class="title">
			<p class="account">您正在为账户<span>{{userName.content | encrypt(userName.type)}}</span>绑定({{title}})谷歌验证</p>
		</div>
		<div class="container">
			<ul>
				<!--				<li>
					<span class="title">您正在为账户</span>
					<div class="box">
						<p class="account"><span>{{userName.content | encrypt(userName.type)}}</span>绑定(设置谷歌验证器)</p>
					</div>
				</li>-->
				<li>
					<span class="title_item">秘钥</span>
					<div class="box">
						<p>{{gener_r.secret}}</p>
					</div>
				</li>
				<li>
					<span class="title_item">谷歌验证码</span>
					<div class="box">
						<input type="text" placeholder="请输入谷歌验证码" v-model="bind_p.token" />
					</div>
				</li>
				<li>
					<google-set @g_token="get_g_token" :smsType="msg_type" :emailType="email_type" @getMcode="get_sms_code"></google-set>
				</li>
				<!-- 策略决定 -->
				<!--<li v-if="getMobile">
					<span class="title">手机号码</span>
					<div class="box">
						<p class="account"><span>{{getMobile | encrypt('mobile')}}</span></p>
					</div>
				</li>
				<li v-if="getMobile">
					<span class="title">手机验证码</span>
					<div class="box">
						<sms-code @smsMsg="getMcode" :type="msg_type"></sms-code>
					</div>
				</li>
				
				<li v-if="!getMobile">
					<span class="title">邮箱地址</span>
					<div class="box">
						<p class="account"><span>{{getEmail | encrypt('email')}}</span></p>
					</div>
				</li>
				<li v-if="!getMobile">
					<span class="title">邮箱验证码</span>
					<div class="box">
						<sms-code @smsMsg="getMcode" :email="toEmail" :type="email_type" :toemail="getEmail"></sms-code>
					</div>
				</li>
				
				<li v-if="asssetGoogle">
					<span class="title">(设置)谷歌验证码</span>
					<div class="box">
						<input type="text" placeholder="请输入谷歌验证码" v-model="bind_p.gother"/>
					</div>
				</li>-->

				<li>
					<span class="title_item"></span>
					<div class="box">
						<div class="check_box">
							<label :class="{'g_i_no': type == 'settings'}">
			              <input type="checkbox" v-model="security" :class="{'g_i_check': true}"/>
			              <span ></span>
			              <span class="g_label sms_msg">设置[修改{{title}}验证策略]为 <span>"{{hint}}"</span></span>
			            </label>
						</div>
						<button type="button" @click="bind">确定绑定</button>
					</div>
				</li>
			</ul>
			<div class="code_img">
				<div id="code" class='img'></div>
				<p>扫一扫 即可绑定谷歌验证码</p>
			</div>
		</div>
	</div>
</template>

<script>
	//	import {mapGetters} from 'vuex'
	import googleSet from './pannel/google_set'
	export default {
		name: 'google_bind',
		data() {
			return {
				url: window.config.api.split('/')[0] + window.config.api.split('/')[1] + window.config.api.split('/')[2],
				security: true,
				type: this.$route.params.type,
				title: '',
				msg_type: '',
				email_type: 'bindOther',
				toEmail: 'email',
				gener_p: {
					type: ''
				},
				gener_r: {},
				bind_p: {
					type: '',
					secretKey: '',
					token: '',
					email: '',
					ecode: '',
					mobile: '',
					mcode: '',
					gother: '',
					securityId: ''
				},
				asssetGoogle: false,
				hint: '',
				myUrl: '',
			}
		},
		components: {
			googleSet
		},
		computed: {
			userName() {
				return this.$store.getters.userName;
			},
			getMobile() { //获取旧手机
				let mobile = this.$store.getters.getUser.customerInfo.mobile;
				if(!mobile) return false;
				this.bind_p.mobile = mobile;
				return mobile;
			},
			getEmail() {
				let email = this.$store.getters.getUser.customerInfo.email;
				this.bind_p.email = email;
				if(!email) return false;
				return email;
			},
			get_other_google() {
				let google = this.$store.getters.getUser.customerInfo.otherGoogleIdentifier;
				if(!google) return false;
				return google;
			},
			gener() {
				return this.getMobile ? this.getMobile : this.getEmail;
			}
		},
		methods: {
			get_gener() {
				switch(this.$route.params.type) {
					case 'login':
						this.gener_p.type = "gbind";
						break;
					case 'settings':
						this.gener_p.type = "gother";
						break;
					case 'funding':
						this.gener_p.type = "gasset";
						break;
				}
				lh_http("post", "account/gener", this.gener_p).done((res) => {
					if(res.status) {
						this.gener_r = res.data;
						//二维码
						$('#code').qrcode({
							width: 100, //宽度 
							height: 100, //高度 
							text: `otpauth://totp/${res.data.nextTitle}:LHang.com-${this.gener}?secret=${res.data.secret}&issuer=${res.data.nextTitle}`,
						});
					} else {
						alert(res.data)
					}
				});
			},
			get_sms_code(val) {
				if(this.getMobile) {
					this.bind_p.mcode = val;
				} else {
					this.bind_p.ecode = val;
				}
			},
			bind() {
				switch(this.$route.params.type) {
					case 'login':
						this.bind_p.type = "gbind";
						this.bind_p.securityId = this.security ? '1,2' : '';
						this.bind_p.secretKey = this.gener_r.secret;
						break;
					case 'settings':
						this.bind_p.type = "gother";
						this.bind_p.securityId = this.security ? '2,3' : '';
						this.bind_p.secretKey = this.gener_r.secret;
						break;
					case 'funding':
						this.bind_p.type = "gasset";
						this.bind_p.securityId = this.security ? '2,3,5' : '';
						this.bind_p.secretKey = this.gener_r.secret;
						break;
				}
				//console.log(this.bind_p)
				lh_http("post", "account/gbind", this.bind_p).done((res) => {
					if(res.status) {
						this.gener_r = res.data;
						this.$router.push({
							path: '/user/settings/google'
						});
					} else {
						alert(res.data)
					}
				});
			},
			get_g_token(val) {
				//console.log(val)
				this.bind_p.gother = val;
			}
		},
		mounted() {

			switch(this.$route.params.type) {
				case 'login':
					this.title = "登录";
					this.msg_type = "bindLogin";
					this.hint="登录密码+(登录)谷歌验证器"
					break;
				case 'settings':
					this.title = "设置";
					this.msg_type = "bindOther";
					if(this.getMobile) {
						this.hint = "短信验证码+(设置)谷歌验证器";
					} else {
						this.hint = "(设置)谷歌验证器";
					}
					break;
				case 'funding':
					this.title = "资金";
					this.msg_type = "bindAsset";
					this.asssetGoogle = true;
					if(this.getMobile) {
						this.hint = "短信验证码+资金密码+(资金)谷歌验证器";
					} else {
						this.hint = "资金密码+(资金)谷歌验证器";
					}
					break;
			}

			this.get_gener();
			
			this.myUrl = window.config.api;

		},
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	.google_bind {
		font-size: 13px;
		margin-bottom: 70px;
		text-align: left;
		.title {
			margin: 45px 0 0 44px;
			.account {
				font-size: 16px;
				text-align: left;
				span {
					text-align: left;
					margin-right: 0;
					width: initial;
					color: #0093F1
				}
			}
		}
		.g_i_no {
			pointer-events: none;
		}
		.st_t1 {
			padding: 15px 20px;
			background: #f4f4f4;
			width: 100%;
			font-size: 24px;
		}
		.container {
			padding: 50px;
			position: relative;
			.code_img {
				position: absolute;
				right: 119px;
				top: 44px;
				.img {
					width: 100px;
					height: 100px;
				}
				p {
					width: 100px;
					margin: 0 auto;
					text-align: center;
				}
			}
			li {
				margin-bottom: 30px;
				.title_item {
					display: inline-block;
					width: 165px;
					text-align: right;
					margin-right: 32px;
					font-size: 16px;
				}
				.account {
					text-align: left;
					span {
						text-align: left;
						margin-right: 0;
						width: initial;
						color: #0093F1
					}
				}
				.sound {
					@extend .account;
					position: absolute;
					top: 50px;
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
					.codeIcon {
						position: absolute;
						top: 2px;
						right: 10px;
						width: 100px;
						height: 40px;
						background: #ccc;
					}
					input[type="text"],
					input[type='button'] {
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
						margin-top: 30px;
						background: #0093F1;
						color: #fff;
						font-size: 18px;
						text-align: center;
						cursor: pointer;
						&:hover{
							background: #26a8fb;
						}
						&:active{
							background: #0084d9;
						}
					}
					.check_box {
						position: absolute;
					}
					.sms_msg {
						font-size: 12px;
						span {
							width: initial;
							color: #f35809;
						}
					}
					.reset_width_315 {
						width: 315px !important;
						margin-right: 5px;
					}
					.reset_width_88 {
						width: 88px !important;
						background: #0093F1;
						color: #fff;
						&.active {
							background: #0093F1;
						}
					}
				}
			}
		}
	}
</style>