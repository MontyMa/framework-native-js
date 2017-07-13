<template>
	<div class="bind_phone">
		<!--<div class="st_t1">绑定手机</div>-->
		<div class="title">
			<p class="account">您正在为账户<span>{{getUserName.content | encrypt(getUserName.type)}}</span>绑定手机</p>
		</div>
		<ul class="container">
			<!--      <li>
        <span class="st_span">您正在为账户</span>
        <div class="box">
          <p class="account"><span>{{getUserName.content | encrypt(getUserName.type)}}</span>绑定手机</p>
        </div>
      </li>-->
			<li>
				<span class="st_span">所在地</span>
				<div class="box">
					<input type="text" style="background-color: #F8F8F8" value="China(中国大陆)" disabled/>
				</div>
			</li>
			<li>
				<span class="st_span">手机号</span>
				<div class="box">
					<input type="text" v-model="save_p.mobile" placeholder="请输入手机号" />
				</div>
			</li>
			<li>
				<span class="st_span">短信验证码</span>
				<div class="box">
					<sms-code @smsMsg="getMcode" :type="save_p.type" :tophone="save_p.mobile"></sms-code>
					<!--<p class="sound">收不到短息？用<span>语音验证码</span></p>-->
				</div>
			</li>
			<li>
				<span class="st_span">验证码</span>
				<div class="box">
					<!--<input type="text" placeholder="请输入右侧验证码" />
                    <img class="codeIcon" src="" alt="" />-->
					<check-code @ImgCode="getImgCode"></check-code>
				</div>
			</li>
			<li>
				<span class="st_span"></span>
				<div class="box">
					<div class="check_box">
						<label>
              <input type="checkbox" checked disabled class="g_i_check" v-model="checkbox"/>
              <span class="g_label sms_msg" v-if="!getUser.customerInfo.securitySetting"><p>设置[修改验证策略为]<span>"手机短信"</span></p></span>
              <span class="g_label sms_msg" v-else><p>设置[修改验证策略为]<span>"手机短信+(设置)谷歌验证器"</span></p></span>
            </label>
					</div>
				</div>
			</li>
			<li>
				<span class="st_span"></span>
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
				save_p: {
					type: 'mbind',
					mobile: '',
					mcode: '',
					vcode: '',
					securitytype: '',
					drawtype: ''
				},
				checkbox: '',
			}
		},
		computed: {
			getUserName() { //获取旧手机
				let userName = this.$store.getters.userName;
				return userName;
			},
			getUser() { //获取旧手机
				let user = this.$store.getters.getUser;
				return user;
			}
		},
		methods: {
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
			},
			getMcode(val) {
				this.save_p.mcode = val;
			},
			getImgCode(val) {
				this.save_p.vcode = val;
			}
		},
		mounted() {
			this.checkbox = true;
		},
		watch: {
			'checkbox' (val) {
				let list = '3';
				if(this.getUser.customerInfo.securitySetting) {
					list = '2,3';
				}
				this.save_p.securitytype = val ? list : '';
			},
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	.bind_phone {
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
			margin-top: 57px;
			text-align: center;
			li {
				margin-bottom: 30px;
				.st_span {
					display: inline-block;
					width: 83px;
					text-align: right;
					margin-right: 32px;
					font-size: 16px;
				}
				.sound {
					@extend .account;
					position: absolute;
					margin-top: 5px;
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
						display: inline-block;
						span {
							width: initial;
							color: #f35809;
						}
						p {
							width: 301px;
							margin-left: 21px;
							vertical-align: middle;
							margin-top: -3px;
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
						padding: 0 15px;
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