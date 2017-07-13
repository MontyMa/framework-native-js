<template>
	<div class="bind_phone">
		<!--<div class="st_t1">重置登录密码</div>-->
		<div class="title">
			<p class="account">您正在为账户<span>{{getUserName.content | encrypt(getUserName.type)}}</span>重置登录密码</p>
		</div>
		<ul class="container">
			<!--<li>
				<span>您正在为账户</span>
				<div class="box">
					<p class="account"><span>{{getUserName.content | encrypt(getUserName.type)}}</span>重置登录密码</p>
				</div>
			</li>-->
			<li>
				<span>旧登录密码</span>
				<div class="box">
					<input type="password" v-model="save_p.oldpwd" placeholder="请输入登入密码" />
				</div>
			</li>
			<li>
				<span>新登录密码</span>
				<div class="box">
					<input type="password" v-model="save_p.password" placeholder="请输入新登录密码" />
				</div>
			</li>
			<li>
				<span>确认新密码</span>
				<div class="box">
					<input type="password" v-model="save_p.cfmpwd" :class="{wrong_pwd: showWrongPwd == true}" placeholder="请再次输入新登录密码" />
					<span class="red" v-show="showWrongPwd == true">两次输入密码不一致,请重新输入</span>
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

//	import {mapGetters} from 'vuex' 
	export default {
		name: 'bindPhone',
		data() {
			return {
				showWrongPwd: false,
				save_p: {
					username:'',
					oldpwd: '',
					password: '',
					cfmpwd: ''
				}
			}
		},
		computed: {
			getUserName() {
				let userName = this.$store.getters.userName;
				return userName;
			}
    },
		components: {
		},
		methods: {
			save() {
				lh_http("post", "account/changepwd", this.save_p).done((res) => {
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
		}
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
			margin-top: 57px;
			text-align: center;
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
					text-align: left;
					position: relative;
					vertical-align: middle;
					.code {
						position: absolute;
						right: 15px;
						top: 15px;
					}
					.check_box{
						position: absolute;
					}
					.sms_msg{
						display: inline-block;
						span{
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
					input {
						width: 412px;
						padding: 0 10px;
						height: 45px;
						border: 1px solid #9b9b9b;
						border-radius: 3px;
						&.wrong_pwd{
							background: #ffeef6;
							border-color: #FF4FA1;
						}
					}
					button {
						width: 412px;
						height: 45px;
						line-height: 45px;
						margin-top: 60px;
						background: #0093F1;
						font-size: 18px;
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
					.red{
						width: inherit;
						position: absolute;
						text-align: left;
						margin-left: 10px;
						top: 48px;
						color: #FF4FA1;
					}
				}
			}
		}
	}
</style>