<template>
  <div class="cash_in" id="cash_in">
  	<div class="tab">
			<div class="tab_head">
				<div class="tab_head_detail">
					<span class="tab_head_item" :class="{'active': curIndex == 1}" @click="changeTab(1)">人民币提现</span>
					<span class="tab_head_item" :class="{'active': curIndex == 2}" @click="changeTab(2)">BTC提币</span>
					<span class="tab_head_item" :class="{'active': curIndex == 3}" @click="changeTab(3)">ZEC提币</span>
					<span class="tab_head_item" :class="{'active': curIndex == 4}" @click="changeTab(4)">ETC提币</span>
					<span class="tab_head_item" :class="{'active': curIndex == 5}" @click="changeTab(5)">ETH提币</span>
				</div>	
			</div>
			
			<cny-withDraw v-if="curIndex == 1"></cny-withDraw>
			<btc-withDraw v-if="curIndex == 2"></btc-withDraw>
			<zec-withDraw v-if="curIndex == 3"></zec-withDraw>
			<etc-withDraw v-if="curIndex == 4"></etc-withDraw>
			<eth-withDraw v-if="curIndex == 5"></eth-withDraw>

		</div>
  </div>
</template>

<script>
	import cnyWithDraw from './pannel/withdraw/cnyWithdraw'
	import btcWithDraw from './pannel/withdraw/btcWithdraw'
	import zecWithDraw from './pannel/withdraw/zecWithdraw'
	import etcWithDraw from './pannel/withdraw/etcWithdraw'
	import ethWithDraw from './pannel/withdraw/ethWithdraw'
  export default {
    name: 'cash_in',
    computed: {
    	//监听资产总览过来的链接
    	toChargeItem () {
    		if(this.$store.getters.towithdraw == 'cny'){
    			return 1;
    		}else if(this.$store.getters.towithdraw == 'btc'){
    			return 2;
    		}else if(this.$store.getters.towithdraw == 'zec'){
    			return 3;
    		}else if(this.$store.getters.towithdraw == 'etc'){
    			return 4;
    		}else if(this.$store.getters.towithdraw == 'eth'){
    			return 5;
    		}
    	}
    },
    data() {
      return {
        curIndex: 1
      }
    }, //定义变量
    components: {
    	cnyWithDraw,
    	btcWithDraw,
    	zecWithDraw,
    	etcWithDraw,
    	ethWithDraw,
    }, //注册组件
    methods: { //方法都在这里
    	changeTab (data) {
    		this.curIndex = data;
    	}
    },
/*    watch: {
    	toChargeItem (val){
    		//console.log(val)
	    	if(val){
	    		this.curIndex = val;
	    	}
    	}
    },*/
    mounted () {
    	if(this.toChargeItem){
    		this.curIndex = this.toChargeItem;
    	}
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
.cash_in{
	 text-align: left;
	 font-size: 14px;
	.tab{
		.tab_head{
			height: 40px;
			.tab_head_detail {
				border-bottom: 2px solid #d7d7d7;
				.tab_head_item {
					display: inline-block;
					margin-right: 60px;
					line-height: 37px;
					border-bottom: 2px solid #d7d7d7;
					margin-bottom: -2px;
					text-align: center;
					cursor: pointer;
					&.active {
						border-color: #0093F1;
						background: #fff;
						color: #0093F1;
						font-weight: bold;
					}
				}
			}
		}
	}
}
</style>
