<template>
	<div class="register-phone">
		<table class="table_1_5">
			<tr class="tr1">
				<td colspan="2">
					还没有账户？
					<router-link to='/reg/email'>绑定新账号</router-link>
				</td>
			</tr>
			<tr class="tr2">
				<td>账号</td>
				<td>
					<input type="text" class="text" placeholder="请输入您的手机号码" v-model="code_phone.mobile" />
				</td>
			</tr>
			<tr class="tr2">
				<td>登录密码</td>
				<td>
					<input type="text" class="text" placeholder="请输入您的手机号码" v-model="code_phone.mobile" />
				</td>
			</tr>
			<!--<tr class="tr1">
					<td></td>
					<td style="padding: 10px 0">
						<input style="margin-right: 10px;: " type="checkbox" />我已经阅读并同意
						<label style="color: #0093F1;">《用户服务协议》</label>
					</td>
				</tr>-->
			<tr style="text-align: center" class="tr2">
				<td></td>
				<td>
					<button :class="{ 'button_s': unlock_tag && code_phone.mobile && one_p.mcode}" v-on:click="next">完成绑定</button>
				</td>
			</tr>
		</table>
	</div>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				register_type: '',
				code_phone: {
					'mobile': '',
					'type': 'nreg',
				},
				one_p: {
					'mobile': '',
					'mcode': '',
				},
				code_tag: 60,
				unlock_tag: false,
			};
		},
		computed: {
	  },
		methods: {
			unlock() {
				this.unlock_tag = true;
			},
			next() {
				var that = this;
//				this.one_p.mobile = this.code_phone.mobile;
//				lh_http('post', "regStepOne", this.one_p).done(function(res) {
//					if(res.status) {
//						that.$router.push({
//							path: '/reg/phone/2'
//						})
//					} else {
//						alert(res.data);
//					}
//				})


				lh_http('post', "thirdLogin", {
					code: '0313ireY0a6jy02XHLeY03VzeY03ire-',
					state: '8574fd98-c1f4-4774-a304-96247b3cce2d'
				}).done(function(res) {
					if(res.status) {
						//console.log(res)
//						that.$router.push({
//							path: '/reg/phone/2'
//						})
					} else {
						alert(res.data);
					}
				})



			},
			sendSMSCode() {
				if(this.code_tag < 60) {
					return;
				}
				var that = this;
				lh_http('post', "sendvcode", this.code_phone).done(function(res) {
					if(res.status) {
						that.runcode();
//						alert('请注意查收短信');
					} else {
						alert(res.data);
					}
				})

			},
			verificationCode(type) {
				UserService.verificationCode(this.code_phone);
			},
			runcode() {
				var that = this;
				var run = function() {
					that.code_tag--;
					if(that.code_tag <= 0) {
						clearInterval(timer)
						that.code_tag = 60;
					}
				}
				var timer = setInterval(run, 1000)
			}
		},
		watch: {
			'$refs.unlockref': function(res) {
				//console.log(res)
				this.value = res;
			},
			unlock: function(res){
				//console.log(res)
			}
		}

	};
</script>

<style lang="scss">
	.register-phone {}
	/* eslint-enable */
</style>
