<template>
	<div class="recharge_btc_2">
		<div class="title">
			<img src="./img/icon_question.png" alt="" />
			<p>抱歉，您需要完成以下全部操作，才可以使用<span>{{myType}}</span>功能</p>
		</div>
		<register1></register1>
		<register2></register2>
		<register3></register3>
		<register4></register4>
		<register5></register5>
		<register6 :moneyType="type"></register6>
	</div>
</template>

<script>
import register1 from "./register1"
import register2 from "./register2"
import register3 from "./register3"
import register4 from "./register4"
import register5 from "./register5"
import register6 from "./register6"

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