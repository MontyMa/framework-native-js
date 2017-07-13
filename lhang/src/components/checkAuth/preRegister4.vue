<template>
	<div class="recharge_btc_2">
		<div class="title">
			<img src="./img/icon_question.png" alt="" />
			<p class="title_name">抱歉，您需要完成以下全部操作，才可以使用<span>API</span>功能</p>
			<p class="hint">链行为您提供了强大的API，您可以根据自身需求建立不同权限的API，并利用自动交易或者提现。API的交易权限让您可以快速的获取当前市场最新行情及时的下单交易、查询自己可用和冻结金额、查询自己当前尚未成交的挂单、买进或卖出、撤单。</p>
		</div>
		<register1></register1>
		<register7></register7>
		<register5></register5>
	</div>
</template>

<script>
import register1 from "./register1"
import register2 from "./register2"
import register3 from "./register3"
import register4 from "./register4"
import register5 from "./register5_1"
import register7 from "./register7"

export default {
    name: 'preRegister2',
    props: ['type', 'myType'],
    data(){
	    return {
	    }
    },
    components: {
    	register1,
    	register2,
    	register3,
    	register4,
    	register5,
    	register7
    },
    watch: {
    },
    computed: {
    },
    mounted () {
    }

 }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.recharge_btc_2{
	.title{
		margin-left: 104px;
		margin-top: 46px;
		.title_name{
			display: inline-block;
			vertical-align: middle;
			font-size: 18px;
			margin-top: -55px;
			margin-left: 46px;
			span{
				color: #F06104;
			}
		}
		.hint{
			font-size: 13px;
			width: 650px;
			margin-left: 105px;	
		}
	}
}
</style>