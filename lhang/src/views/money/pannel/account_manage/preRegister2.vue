<template>
	<div class="recharge_btc_2">
		<div class="title">
			<img src="../../images/icon_question.png" alt="" />
			<p>抱歉，您需要完成以下全部操作，才可以使用<span> 添加账户</span>功能</p>
		</div>
		<register1></register1>
		<register2></register2>
		<register3></register3>
		<register4></register4>
		<register6 :moneyType="type"></register6>
	</div>
</template>

<script>
import register1 from "../../../../components/checkAuth/register1"
import register2 from "../../../../components/checkAuth/register2"
import register3 from "../../../../components/checkAuth/register3"
import register4 from "../../../../components/checkAuth/register4"
import register5 from "../../../../components/checkAuth/register5"
import register6 from "../../../../components/checkAuth/register6"

export default {
    name: 'preRegister2',
    props: ['type'],
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
    	register6
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