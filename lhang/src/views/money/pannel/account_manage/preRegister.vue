<template>
	<div class="recharge_btc_2">
		<div class="title">
			<img src="../../images/icon_question.png" alt="" />
			<p>抱歉，您需要完成以下全部操作，才可以使用<span> 添加账户</span>功能</p>
		</div>
		<register1 :value="thisRegister"></register1>
		<register2 :value="thisRegister"></register2>
	</div>
</template>

<script>
import register1 from "../../../../components/checkAuth/register1"
import register2 from "../../../../components/checkAuth/register2"

export default {
    name: 'preRegister',
    props: ['thisRegister'],
    components: {
    	register1,
    	register2
    }
 }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.recharge_btc_2{
	.title{
		margin-left: 87px;
		margin-top: 46px;
		p{
			display: inline-block;
			vertical-align: middle;
			font-size: 18px;
			margin-top: -55px;
			margin-left: 46px;
			span{
				color: #F06104;
			}
		}
	}
}
</style>