<template>
	<div class="bind_phone">
		<!--<div class="st_t1">重置({{title}})谷歌验证</div>-->
		<div class="title">
			<p class="account">您正在为账户<span>{{userName.content | encrypt(userName.type)}}</span>重置({{title}})谷歌验证</p>
		</div>
		<div class="container">
			<ul>
				<!--				<li>
					<span class="title_item">您正在为账户</span>
					<div class="box">
						<p class="account"><span>{{userName.content | encrypt(userName.type)}}</span>绑定手机</p>
					</div>
				</li>-->
				<li>
					<span class="title_item">原谷歌验证码</span>
					<div class="box">
						<input type="text" :placeholder="placehold1" v-model="bind_p.token" />
					</div>
				</li>
				<li>
					<span class="title_item">新秘钥</span>
					<div class="box">
						<p>{{gener_r.secret}}</p>
					</div>
				</li>
				<li>
					<span class="title_item">新谷歌验证码</span>
					<div class="box">
						<input type="text" :placeholder="placehold2" v-model="bind_p.gnew" />
					</div>
				</li>
				<!--				<li v-if="show_phone">
					<span>手机号码</span>
					<div class="box">
						<p class="account"><span>{{getMobile | encrypt('mobile')}}</span></p>
					</div>
				</li>
				<li v-if="show_phone">
					<span>短信验证码</span>
					<div class="box">
						<sms-code @smsMsg="getMcode" :type="msg_type"></sms-code>
						<p class="sound">收不到短息？用<span>语音验证码</span></p>
					</div>
				</li>-->
				<li>
					<google-set @g_token="get_g_token" :smsType="msg_type" @getMcode="get_sms_code"></google-set>
				</li>
				<!--				<li v-if="title !== '设置'">
					<span>(设置)谷歌验证码</span>
					<div class="box">
						<input type="text" placeholder="请输入（设置）谷歌验证码" v-model="bind_p.gsecurity"/>
					</div>
				</li>-->
				<li>
					<span class="title_item"></span>
					<div class="box">
						<button type="button" @click="bind">确定重置</button>
					</div>
				</li>
			</ul>
			<div class="code_img">
				<div id="code" class='img'></div>
				<!--<img v-if="gener_r.qrcode" :src="myUrl+gener_r.qrcode" alt="" />-->
				<p>扫一扫 即可绑定谷歌验证码</p>
			</div>
		</div>
	</div>
</template>

<script>
	import googleSet from './pannel/google_set'
	export default {
		data() {
			return {
				url: window.config.api.split('/')[0] + window.config.api.split('/')[1] + window.config.api.split('/')[2],
				security: true,
				type: this.$route.params.type,
				title: '',
				msg_type: '',
				show_phone: false,
				gener_p: {
					type: ''
				},
				gener_r: {},
				bind_p: {
					type: "",
					token: "",
					secretKey: "",
					gnew: "",
					mobile: "",
					email: "",
					mcode: "",
					gsecurity: ""
				},
				asssetGoogle: false,
				placehold1: '',
				placehold2: '',
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
				if(!mobile) return '';
				return mobile;
			},
			getEmail() { //获取旧手机
				let email = this.$store.getters.getUser.customerInfo.email;
				if(!email) return '';
				return email;
			},
			user() {
				return this.$store.getters.getUser;
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
				if(this.getMobile) {
					this.bind_p.mobile = this.getMobile;
				}
				if(this.getEmail) {
					this.bind_p.email = this.getEmail;
				}
				lh_http("post", "account/gener", this.gener_p).done((res) => {
					//console.log(res)
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
				this.bind_p.mcode = val;
			},
			bind() {

				switch(this.$route.params.type) {
					case 'login':
						this.bind_p.type = "gbind";
						this.bind_p.secretKey = this.gener_r.secret;
						break;
					case 'settings':
						this.bind_p.type = "gother";
						this.bind_p.secretKey = this.gener_r.secret;
						break;
					case 'funding':
						this.bind_p.type = "gasset";
						this.bind_p.secretKey = this.gener_r.secret;
						break;
				}
				//console.log(this.bind_p)
				lh_http("post", "account/chgbind", this.bind_p).done((res) => {
					//console.log(res.data)
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
				this.bind_p.gsecurity = val;
			}
		},
		mounted() {

			switch(this.$route.params.type) {
				case 'login':
					this.title = "登录";
					this.msg_type = "updateLogin";
					this.placehold1 = "请输入原(登录)谷歌验证码";
					this.placehold2 = "请输入新(登录)谷歌验证码";
					break;
				case 'settings':
					this.title = "设置";
					this.msg_type = "updateOther";
					this.placehold1 = "请输入原(设置)谷歌验证码";
					this.placehold2 = "请输入新(设置)谷歌验证码";
					break;
				case 'funding':
					this.title = "资金";
					this.msg_type = "updateAsset";
					this.asssetGoogle = true;
					this.placehold1 = "请输入原(资金)谷歌验证码";
					this.placehold2 = "请输入新(资金)谷歌验证码";
					break;
			}

			for(let i = 0; i < this.user.policyList.length; i++) {
				if(this.user.policyList[i].validationMode == 'security') {
					if(this.user.policyList[i].securityId == '3' || this.user.policyList[i].securityId == '2,3') {
						this.show_phone = true;
					}
				}
			}
			this.get_gener();
			
			this.myUrl = window.config.api;

		},
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	.bind_phone {
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
					input[type="text"] {
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
				}
			}
		}
	}
</style>