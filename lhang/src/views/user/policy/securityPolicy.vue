<template>
	<div class="set_login_pwd">
		<div class="st_t1">安全策略</div>
		<div class="container">
			<div class="check_container">
				<div class="check_item">
					<label>
					  	<div class="checkbox_style">
					  		<input type="radio" value="1" id="checkboxFourInput" checked name="policyType" />
						  	<label for="checkboxFourInput"></label>
					  	</div>
						<p>从<span>不验证资金密码</span></p>
					</label>
				</div>
				<div class="check_item">
					<label>
					  	<div class="checkbox_style">
					  		<input type="radio" value="1" id="checkboxFourInput1" name="policyType" />
						  	<label for="checkboxFourInput1"></label>
					  	</div>
						<p>每两个小时验证一次<span>“资金密码”</span></p>
					</label>
				</div>
				<div class="check_item">
					<label>
					  	<div class="checkbox_style">
					  		<input type="radio" value="1" id="checkboxFourInput2" name="policyType" />
						  	<label for="checkboxFourInput2"></label>
					  	</div>
						<p>每次都验证<span>“资金密码”</span></p>
					</label>
				</div>
			</div>
			<ul>
				<li>
					<span>手机号码</span>
					<div class="box">
						<p class="account"><span>186****132</span></p>
					</div>
				</li>
				<li>
					<span>短信验证码</span>
					<div class="box">
						<sms-code></sms-code>
					</div>
				</li>
				<li>
					<span></span>
					<div class="box">
						<button type="button">确定提现</button>
					</div>
				</li>
			</ul>	
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {

		}
	},
	components: {
	},
	computed: {
	},
	methods: {
	}
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	.set_login_pwd {
		font-size: 13px;
		margin-bottom: 70px;
		text-align: left;
		.st_t1 {
			padding: 15px 20px;
			background: #f4f4f4;
			width: 100%;
			font-size: 24px;
		}
		.container {
			margin-top: 50px;
			border: 1px solid #efefef;
			padding-top: 50px;
			.check_container{
				margin: 0 26px 45px 32px;
				border-bottom: 1px solid #ececec;
				.check_item{
					text-align: left;
					margin-bottom: 23px;
					.checkbox_style {
						width: 14px;
						height: 14px;
						border: 1px solid #D0D0D0;
						border-radius: 100%;
						position: relative;
						display: inline-block; 
						top: 3px;
						label{
							display: block;
							position: absolute;
							left: 0;
							top: 0;
							width: 14px;
							height: 14px;
						}
						input[type=radio]{
							opacity: 0;
						}
						input[type=radio]:checked + label{
							background: url(imgs/checked.png) no-repeat;
						}
					}
					p{
						display: inline-block;
						span{
							color: #F06104;
						}
					}
				}
			}
			li {
				margin-bottom: 30px;
				margin-left: 40px;
				span {
					display: inline-block;
					width: 90px;
					text-align: right;
					margin-right: 50px;
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
					.code {
						position: absolute;
						right: 15px;
						top: 15px;
					}
					.check_box{
						position: absolute;
					}
					.sms_msg{
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
						;
						background: #0093F1;
						color: #fff;
						text-align: center;
						cursor: pointer;
						&:hover {
							background: darken(#0093F1, 10%);
						}
					}
				}
			}
		}
	}
</style>