<template>
	<div class="charge_info">
		<h4>充值须知</h4>
		<div v-if="type == 'bank'">
			<p>1、仅接受实名认证客户本人银行卡充值，请勿使用他人银行卡汇款。</p>
			<p>2、人民币充值处理时间：每天9:00-22:00，链行会在收到汇款后于2小时内为您入账。</p>
			<p>3、最低充值金额为100元，汇款时请严格按照充值订单汇款，包括备注和汇款金额，如果信息不匹配，会造成汇款的到账延迟。</p>
		</div>

		<div v-if="type == 'alipay'">
			<p>1、仅接受实名认证客户本人银行卡充值，请勿使用他人银行卡汇款。</p>
			<p>2、人民币充值处理时间：每天9:00-22:00，链行会在收到汇款后于2小时内为您入账。</p>
			<p>3、最低充值金额为100元，汇款时请严格按照充值订单汇款，包括备注和汇款金额，如果信息不匹配，会造成汇款的到账延迟。</p>
		</div>

		<div v-if="type == 'netbank'">
			<p>1、实时到账，第三方会收取0.3%手续费。</p>
			<p>2、仅接受实名认证客户本人银行卡充值，请勿使用他人银行卡汇款。</p>
			<p>3、最低充值金额为100元。</p>
		</div>

		<div v-if="type == 'quick'">
			<p>1、实时到账，第三方会收取0.5%手续费。</p>
			<p>2、仅接受实名认证客户本人银行卡充值，请勿使用他人银行卡汇款。</p>
			<p>3、最低充值金额为100元。</p>
		</div>

		<div v-if="type == 'wechat'">
			<p>1、实时到账，第三方会收取0.6%手续费。</p>
			<p>2、仅接受实名认证客户本人银行卡充值，请勿使用他人银行卡汇款。</p>
			<p>3、最低充值金额为100元。</p>
		</div>
		<a href="http://q.url.cn/s/Wnafsym" target="_blank">
			<img src="../../images/contact_service.png" alt="" />
		</a>
	</div>
</template>

<script>
export default {
    name: 'chargeInfo',
    props: ['type'],
    data () {
    	return {

    	}
    },
    mounted () {
    }
 }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.charge_info{
	font-size: 13px;
	width: 100%;
	padding: 25px 43px 0 40px;
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
