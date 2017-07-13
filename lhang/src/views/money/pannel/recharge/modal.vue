<template>
	<div class="btc_modal">
		<div class="shadow_box"></div>
		<div class="content">
			<span class="close_btn" @click="close">&times;</span>
			<h2>充值订单</h2>
			<div class="detail">
				<ul>
					<li>
						<p>1、请按照以下订单进行汇款</p>
						<table>
							<tr>
								<td>收款方户名</td>
								<td>上海焱钰电子商务有限公司</td>
							</tr>
							<tr>
								<td>收款方开户行</td>
								<td>平安银行上海张江支行</td>
							</tr>
							<tr>
								<td>收款方账号</td>
								<td>1500 0008 6329 62</td>
							</tr>
							<tr>
								<td>转账金额</td>
								<td><span>{{amount}}</span>(包括小数位)</td>
							</tr>
							<tr>
								<td>汇款时备注内容</td>
								<td><span>{{markMsg}}</span>(请务必填写)</td>
							</tr>
						</table>
					</li>
					<li>
						<p class="inbk">2、登录您的网上银行或手机银行进行汇款</p>
						<!--<a class="linkbtn" href="javaScript:;">前往网上银行转账&raquo;</a>-->
					</li>
					<li>
						<p>3、无手续费，周一至周日09：00-22：00人工审核，<span>2小时内</span>到账。为了您的账户安全，<span>50,000或以上</span>可能需要C3认证。</p>
					</li>
				</ul>
			</div>
			<p class="btm">温馨提示：如有任何问题请联系<a href="http://q.url.cn/s/Wnafsym" target="_blank">在线客服</a>或查看帮助中心<a href="#/help/how-recharge" @click="close">充值教程</a></p>
		</div>
	</div>
</template>

<script>
import store from "../../../../vuex/store"
export default {
    name: 'modal',
    props:['amount', 'markMsg'],
    data () {
    	return {
    	}
    },
    computed: {
    },
    components: {
    },
    mounted(){

    },
    methods: {
    	//关闭遮罩层
    	close () {
    		store.dispatch("showShadowBox", false);
    		this.$emit("closeModal", false);
    	}
    }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.btc_modal{
	width: 490px;
	height: 515px;
	position: fixed;
	left: 50%;
	top: 50%;
	z-index: 1000;
	border-radius: 5px;
	transform: translate(-50%, -50%);
	background: #fff;
	.content{
		background: #fff;
		border-radius: 3px;
		padding: 18px 32px;
		h2{
			border-bottom: 1px solid #EAEAEA;
			font-size: 18px;
			font-weight: normal;
			padding-bottom: 16px;
			margin-bottom: 25px;
		}
		.detail{
			li{
				position: relative;
				table{
					width: 100%;
					margin-bottom: 30px;
					border-collapse: collapse;
					tr{
						td{
							border: 1px solid #d8d8d8;
							padding: 9px 20px 9px 0;
							height: 34px;
							&:nth-child(1){
								background: #f4f4f4;
								text-align: right;
								color: #7f7f7f;
							}
							&:nth-child(2){
								padding-left: 20px;
								span{
									color: #F06104;
									margin-right: 10px;
								}
							}
						}
					}
				}
				p{
					margin-bottom: 15px;
					span{
						color: #F06104;
					}
				}
				.linkbtn{
					display: inline-block;
					height: 22px;
					line-height: 22px;
					padding: 0 10px;
					background: #F06104;
					color: #fff;
					font-size: 12px;
					position: absolute;
					right: 0;
					top: 0;
					border-radius: 3px;
					&:hover{
						background: lighten(#f06104, 10%);
					}
				}
			}
		}
		.btm{
			text-align: center;
			color: #9b9b9b;
			border-top: 1px solid #eaeae;
			padding-top: 10px;
			a{
				color: #F06104;
			}
		}
	}
	.close_btn{
		color: #fff;
		font-size: 300%;
		position: absolute;
		right: -35px;
		top: -18px;
		cursor: pointer;
	}
}
</style>
