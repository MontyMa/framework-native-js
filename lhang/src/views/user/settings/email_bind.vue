<template>
	<div class="bind_mail">
		<!--<div class="st_t1">绑定邮箱</div>-->
		<div class="title">
			<p class="account">您正在为账户<span>{{getUserName.content | encrypt(getUserName.type)}}</span>绑定邮箱</p>
		</div>
		<ul class="container">
<!--			<li>
				<span>您正在为账户</span>
				<div class="box">
					<p class="account"><span>{{getUserName.content | encrypt(getUserName.type)}}</span>绑定邮箱</p>
				</div>
			</li>-->
			<li>
				<span>邮箱地址</span>
				<div class="box">
					<input type="text" placeholder="请输入邮箱地址" v-model="save_p.email" />
				</div>
			</li>
			<li>
				<span>邮箱验证码</span>
				<div class="box">
					<sms-code :type="smstype" :email="toEmail" :toemail="save_p.email" @smsMsg="getMcode"></sms-code>
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
					<button type="button" @click="save">确定</button>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import mailCode from './mailCode'
	import checkCode from '../../../components/checkModule/checkCode'

	export default {
		name: 'bindMail',
		data() {
			return {
				emailVal: '',
				save_p: {
					type: 'ebind',
					email: '',
					ecode: '',
					vcode: '',
				},
				smstype: 'ebind',
				toEmail: 'email',
			}
		},
		components: {
			mailCode,
			checkCode
		},
		methods: {
			getMcode(val) {
				this.save_p.ecode = val;
			},
			getImgCode(val) {
				this.save_p.vcode = val;
			},
			save() {
				lh_http("post", "account/bind", this.save_p).done((res) => {
					if(res.status) {
						alert("修改成功");
						this.$router.push({
							path: '/user/settings'
						})
					} else {
						alert(res.data)
					}
				});
			}
		},
		computed: {
			getUserName() { //获取旧手机
				let userName = this.$store.getters.userName;
				return userName;
			}
		},
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	.bind_mail {
		font-size: 14px;
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
					color: #0093F1;
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
			text-align: left;
			margin-top: 57px;
			text-align: center;
			li {
				margin-bottom: 30px;
				span {
					display: inline-block;
					width: 100px;
					text-align: right;
					margin-right: 50px;
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
				}
				.box {
					width: 412px;
					display: inline-block;
					position: relative;
					vertical-align: middle;
					.code {
						position: absolute;
						right: 15px;
						top: 15px;
					}
					.sms_msg {
						display: inline-block;
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
						font-size: 18px;
						background: #0093F1;
						color: #fff;
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