<template>
	<div class="cny_withdraw_info">
		<h4>提现须知</h4>
		<p>1、每个账户单日最高限额为200,000元，单笔最低限额为100元， 单笔手续费最低2元。</p>
		<p>2、提现银行卡账户名必须与您的实名认证一致</p>
		<p>3、人民币提现正常24小时内到账，具体到账时间因收款银行略有不同，节假日到账时间延迟。</p>
		<p>4、为了您的账户安全，50,000CNY或以上可能需要C3认证。</p>
		<a href="http://q.url.cn/s/Wnafsym" target="_blank">
			<img src="../../images/contact_service.png" alt="" />
		</a>
	</div>
</template>

<script>
export default {
    name: 'CNYwithdrawInfo'
 }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.cny_withdraw_info{
	font-size: 13px;
	width: 368px;
	padding-left: 32px;
	padding-top:33px;
	h4{
		margin-bottom: 20px;
		background: url(../../images/charge_info.png) no-repeat left;
		padding-left: 20px;
	}
	p{
		font-size: 12px;
		color: #7e7e7e;
		line-height: 20px;
	}
	img{
		width: 124px;
		/*height: 124px;*/
		margin-top: 20px;
		margin-left: 100px;
	}
}
</style>
