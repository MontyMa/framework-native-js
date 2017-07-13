<template>
	<div class="modify_phone">
		<!--<div class="st_t1">修改绑定手机</div>-->
		<div class="title">
			<p class="account">您正在为账户<span>{{getUserName.content | encrypt(getUserName.type)}}</span>修改绑定手机</p>
		</div>
		<ul class="container">
<!--			<li>
				<span>您正在为账户</span>
				<div class="box">
					<p class="account"><span>{{getUserName.content | encrypt(getUserName.type)}}</span>修改绑定手机</p>
				</div>
			</li>-->
			<li>
				<span>原手机号码</span>
				<div class="box">
					<p class="account"><span>{{oldmobile | encrypt('mobile')}}</span></p>
				</div>
			</li>
			<li>
				<span>短信验证码</span>
				<div class="box">
					<sms-code @smsMsg="getMcode_old" :type="'change'" :tophone="save_p.omobile"></sms-code>
					<!--<p class="sound">收不到短息？用<span>语音验证码</span></p>-->
				</div>
			</li>
			<li>
				<span>所在地</span>
				<div class="box">
					<input type="text" style="background-color: #f8f8f8" value="China(中国大陆)" disabled/>
				</div>
			</li>
			<li>
				<span>新手机号码</span>
				<div class="box">
					<input type="text" v-model="save_p.mobile" placeholder="请输入手机号" />
				</div>
			</li>
			<li>
				<span>短信验证码</span>
				<div class="box">
					<sms-code @smsMsg="getMcode_new" :type="save_p.type" :tophone="save_p.mobile"></sms-code>
					<!--<p class="sound">收不到短息？用<span>语音验证码</span></p>-->
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
					<button type="button" @click="save">确定修改</button>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'modifyPhone',
		data() {
			return {
				save_p: {
					type: 'change',
					omobile: '',
					ocode: '',
					mobile: '',
					mcode: '',
					vcode: '',
					token: '',
				}
			}
		},
		components: {},
		methods: {
			getMcode(val) {
				if(val.length === 6) this.mcode = val;
			},
			save() {
				lh_http("post", "account/changemobile", this.save_p).done((res) => {
					if(res.status) {
						alert("修改成功");
							this.$router.push({
    							path: '/user/settings'
    						})
					} else {
						alert(res.data)
					}
				});
			},
			getMcode_old(val) {
				this.save_p.ocode = val;
			},
			getMcode_new(val) {
				this.save_p.mcode = val;
			},
			getImgCode(val) {
				this.save_p.vcode = val;
			}
		},
		computed: {
			oldmobile() { //获取旧手机
				let mobile = this.$store.getters.getUser.customerInfo.mobile;
				this.save_p.omobile = mobile;
				if(!mobile) return '--';
				return mobile;
			},
			getUserName() { //获取旧手机
				let userName = this.$store.getters.userName;
				//console.log(userName)
				return userName;
			}
		},
		mounted() {

		}
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	.modify_phone {
		font-size: 14px;
		margin-bottom: 70px;
		text-align: left;		
		height: 100%;
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
			text-align: center;
			margin-top: 57px;
			li {
				margin-bottom: 30px;
				span {
					display: inline-block;
					width: 90px;
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