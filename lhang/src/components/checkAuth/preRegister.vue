<template>
	<div class="recharge_btc_2">
		<div class="title">
			<img src="./img/icon_question.png" alt="" />
			<p>抱歉，您需要完成以下全部操作，才可以使用<span>{{myType}}</span>功能</p>
		</div>
		<register1 :value="thisRegister"></register1>
		<register5 :value="thisRegister"></register5>
	</div>
</template>

<script>
import register1 from "./register1"
import register5 from "./register5_1"

export default {
    name: 'preRegister',
    props: ['thisRegister','myType'],
    components: {
    	register1,
    	register5
    }
 }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.recharge_btc_2{
	.title{
		margin-left: 104px;
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