<template>
	<div class="recharge_btc_handle">
		<ul>
			<li>
				<span>充值地址</span>
				<div class="box">
					<input type="text" placeholder="输入充值卡卡号"/>
				</div>
			</li>
			<li>
				<span>验证码</span>
				<div class="box">
					<check-code></check-code>
				</div>
			</li>
			<li>
				<span></span>
				<div class="box">
					<button type="button" @click="exchange">确定提交</button>
				</div>
			</li>
		</ul>
		<div class="help">查看充值码兑换教程<span>&raquo;</span></div>
	</div>
</template>

<script>
import checkCode from '../../../../components/checkModule/checkCode'
export default {
    name: 'rechargeBtcHandle',
    props:["value"],
    components: {
    	checkCode
    },
    methods: {
    	exchange () {
    		this.$emit("exchangeVal", !this.value);
    	}
    }
 }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.recharge_btc_handle{
	width: 475px;
	border-right: 1px solid #e2e2e2;
	font-size: 13px;
	margin-bottom: 70px;
	ul{
		li{
			margin-bottom: 30px;
			span{
				display: inline-block;
				width: 150px;
				text-align: right;
				margin-right: 50px;
			}
			.box{
				width: 320px;
				display: inline-block;
				position: relative;
				input{
					width: 320px;
					padding: 0 10px;
					height: 35px;
					border: 1px solid #9b9b9b;
					border-radius: 3px;
				}
				span{
					text-align: left;
				}
				.reset_width_220{
					width: 220px;
					margin-right: 5px;
				}
				.reset_width_90{
					width: 90px;
					color: #9b9b9b;
				}
				button{
					width: 320px;
					height: 40px;
					line-height: 40px;;
					background: #0093F1;
					color: #fff;
					text-align: center;
					cursor: pointer;
					&:hover{
						background: darken(#0093F1, 10%);
					}
				}
			}
		}
	}
	.help{
		text-align: right;
		margin-right: 35px;
		color: #0093F1;
		cursor: pointer;
		margin-top: -20px;
		span{
			font-size: 150%;
			margin-left: 5px;
		}
	}
}
</style>
