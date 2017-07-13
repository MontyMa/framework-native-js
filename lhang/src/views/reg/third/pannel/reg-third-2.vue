<template>
	<div class="register-phone">
		<table class="table_1_5">
			<tr class="tr2">
				<td>登录密码</td>
				<td>
					<input type="text" class="text" placeholder="请输入您的密码" v-model="set_p.password" />
				</td>
			</tr>
			<tr class="tr2">
				<td>确认登录密码</td>
				<td>
					<input type="text" class="text" placeholder="请确认您的密码" v-model="set_p.cfmpwd" />
				</td>
			</tr>
			<tr class="tr2">
				<td>邀请码 <label style="font-size: 12px;color: silver;">(选填)</label></td>
				<td>
					<input type="text" class="text" placeholder="请输入邀请码" v-model="set_p.icode" />
				</td>
			</tr>
			<tr style="text-align: center" class="tr2">
				<td></td>
				<td>
					<button v-on:click="next()">下一步</button>
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
				set_p: {},
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
				this.one_p.mobile = this.code_phone.mobile;
				lh_http('post', "regStepOne", this.one_p).done(function(res) {
					if(res.status) {
						that.$router.push({
							path: '/reg/setpassword'
						})
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
