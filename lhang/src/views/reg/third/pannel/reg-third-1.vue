<template>
	<div class="register-phone">
		<table class="table_1_5">
			<tr class="tr1">
				<td colspan="2">
					<router-link to='/reg/email'>直接绑定已有账号</router-link>
				</td>
			</tr>
			<tr class="tr2">
				<td>手机号码</td>
				<td>
					<input type="text" class="text" placeholder="请输入您的手机号码" v-model="code_phone.mobile" />
				</td>
			</tr>
			<tr class="tr2">
				<td>短信验证码</td>
				<td>
					<input type="text" class="text" placeholder="请输入您的短信验证码" v-model="one_p.mcode" style="width: 310px;" />
					<button :class="{ 'send_h': code_tag < 60,'send': true}" v-on:click="sendSMSCode()">{{code_tag == 60 ? '点击获取' : '剩余'+code_tag+'秒'}}</button>
				</td>
			</tr>
			<!--<tr class="tr1">-->
				<!--<td></td>-->
				<!--<td>收不到短信?用<label style="color: #0093F1;">语音验证码</label></td>-->
			<!--</tr>-->
			<tr class="tr2">
				<td>图片验证</td>
				<td>
					<ion-unlock ref="unlockref" @unlock_tag="unlock"></ion-unlock>
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
					<button :class="{ 'button_s': unlock_tag && code_phone.mobile && one_p.mcode}" v-on:click="next">下一步</button>
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
					code: '011pc2a91QnsTR1e6S791moR991pc2aq',
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
