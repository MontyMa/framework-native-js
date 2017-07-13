<template>
	<div class="charge_info">
		<h4>充值须知</h4>
		<p>1、您充值{{name}}上述地址后，需要整个{{name}}网络节点的确认，为了快速到账，您可以向{{name}}网络支付少量的手续费。</p>
		<p>2、到账时间一般是10分钟-60分钟，最小充值金额是0.0001比特币</p>
		<a href="http://q.url.cn/s/Wnafsym" target="_blank">
			<img src="../../images/contact_service.png" alt="" />
		</a>
	</div>
</template>

<script>
export default {
    name: 'chargeInfo',    
    props: ['thistype'],
    computed: {
    	name () {
    		if(this.thistype == 'btc'){
    			return '比特币';
    		}else if(this.thistype == 'zec'){
    			return '零币';
    		}else if(this.thistype == 'etc'){
    			return '以太经典';
    		}else if(this.thistype == 'eth'){
    			return '以太坊';
    		}
    	}
    }
 }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.charge_info{
	font-size: 13px;
	width: 100%;
	padding-left: 32px;
	padding-top: 18px;
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