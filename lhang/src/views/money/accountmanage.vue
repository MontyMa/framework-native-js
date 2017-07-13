<template>
	<div class="account_manage">
		<div class="tab">
			<div class="tab_head">
				<div class="tab_head_detail">
					<span class="tab_head_item" :class="{'active': curIndex == 1}" @click="changeTab(1)">银行卡管理</span>
					<span class="tab_head_item" :class="{'active': curIndex == 2}" @click="changeTab(2)">支付宝管理</span>
					<span class="tab_head_item" :class="{'active': curIndex == 3}" @click="changeTab(3)">BTC提现地址</span>
					<span class="tab_head_item" :class="{'active': curIndex == 4}" @click="changeTab(4)">ZEC提现地址</span>
					<span class="tab_head_item" :class="{'active': curIndex == 5}" @click="changeTab(5)">ETC提现地址</span>
					<span class="tab_head_item" :class="{'active': curIndex == 6}" @click="changeTab(6)">ETH提现地址</span>
				</div>
			</div>

			<bankcard-manage v-if="curIndex == 1"></bankcard-manage>
			<alipay-manage v-if="curIndex == 2"></alipay-manage>
			<btc-address v-if="curIndex == 3"></btc-address>
			<zec-address v-if="curIndex == 4"></zec-address>
			<etc-address v-if="curIndex == 5"></etc-address>
			<eth-address v-if="curIndex == 6"></eth-address>
		</div>
	</div>
</template>

<script>
	import bankcardManage from './pannel/account_manage/bankcardManage'
	import alipayManage from './pannel/account_manage/alipayManage'
	import btcAddress from './pannel/account_manage/btcAddress'
	import zecAddress from './pannel/account_manage/zecAddress'
	import etcAddress from './pannel/account_manage/etcAddress'
	import ethAddress from './pannel/account_manage/ethAddress'

	export default {
		name: 'accountManage',
		data() {
			return {
				curIndex: 1
			}
		},
		computed: {
			/*    	whichItem (val) {
			    		//console.log(val)
			    		if(this.curIndex == 3){
			    			return 'btc';
			    		}else if(this.curIndex == 4){
			    			return 'zec';
			    		}else if(this.curIndex == 5){
			    			return 'etc';
			    		}else if(this.curIndex == 6){
			    			return 'eth';
			    		}
			    	}*/
		},
		components: {
			bankcardManage,
			alipayManage,
			btcAddress,
			zecAddress,
			etcAddress,
			ethAddress
		},
		methods: {
			changeTab(data) {
				this.curIndex = data;
			}
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	.account_manage {
		text-align: left;
		font-size: 14px;
		.tab {
			.tab_head {
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