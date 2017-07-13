<template>
	<div class="recharge">
		<div class="tab">
			<div class="tab_head">
				<div class="tab_head_detail">
					<span class="tab_head_item" :class="{'active': curIndex == 1}" @click="changeTab(1)">人民币充值</span>
					<span class="tab_head_item" :class="{'active': curIndex == 2}" @click="changeTab(2)">BTC充币</span>
					<span class="tab_head_item" :class="{'active': curIndex == 3}" @click="changeTab(3)">ZEC充币</span>
					<span class="tab_head_item" :class="{'active': curIndex == 4}" @click="changeTab(4)">ETC充币</span>
					<span class="tab_head_item" :class="{'active': curIndex == 5}" @click="changeTab(5)">ETH充币</span>
					<span class="tab_head_item" :class="{'active': curIndex == 6}" @click="changeTab(6)">充值码兑换</span>
				</div>
			</div>
			<recharge-cny v-if="curIndex == 1"></recharge-cny>
			<recharge-btc v-if="curIndex == 2"></recharge-btc>
			<recharge-zec v-if="curIndex == 3"></recharge-zec>
			<recharge-etc v-if="curIndex == 4"></recharge-etc>
			<recharge-eth v-if="curIndex == 5"></recharge-eth>
			<recharge-code v-if="curIndex == 6"></recharge-code>
			<!--cny-withDraw v-if="curIndex == 1"></cny-withDraw>-->

			<!--	<alipay-manage v-if="curIndex == 2"></alipay-manage>
			<btc-address v-if="curIndex == 3"></btc-address>
			<zec-address v-if="curIndex == 4"></zec-address>
			<etc-address v-if="curIndex == 5"></etc-address>-->
		</div>
	</div>
</template>

<script>
	import rechargeCny from './pannel/recharge/rechargeCny'
	import rechargeBtc from './pannel/recharge/rechargeBtc'
	import rechargeZec from './pannel/recharge/rechargeZec'
	import rechargeEtc from './pannel/recharge/rechargeEtc'
	import rechargeEth from './pannel/recharge/rechargeEth'
	import rechargeCode from './pannel/recharge/rechargeCode'
	export default {
		name: 'recharge',
		computed: {
			//监听资产总览过来的链接
			toChargeItem() {
				////console.log(111, this.$store.getters.tocharge)
				if(this.$store.getters.tocharge == 'cny') {
					return 1;
				} else if(this.$store.getters.tocharge == 'btc') {
					return 2;
				} else if(this.$store.getters.tocharge == 'zec') {
					return 3;
				} else if(this.$store.getters.tocharge == 'etc') {
					return 4;
				} else if(this.$store.getters.tocharge == 'eth') {
					return 5;
				}
			}
		},
		data() {
			return {
				curIndex: 1,
				isResgister: true //比特币充值时判断是否注册
			}
		}, //定义变量
		components: {
			rechargeCny,
			rechargeBtc,
			rechargeZec,
			rechargeEtc,
			rechargeEth,
			rechargeCode
			//cnyWithDraw,
			//btcWithDraw
		}, //注册组件
		methods: { //方法都在这里
			changeTab(data) {
				this.curIndex = data;
			},
			
		},
		watch: {
			toChargeItem(val) {
				//console.log(val)
			}
		},
		mounted() {
			////console.log(2222, this.toChargeItem)
			if(this.toChargeItem) {
				this.curIndex = this.toChargeItem;
			}
			
			if(this.$route.query.chargeType){
				if(this.$route.query.chargeType == 'btc'){
					this.curIndex = 2;
				}else if(this.$route.query.chargeType == 'zec'){
					this.curIndex = 3;
				}else if(this.$route.query.chargeType == 'etc'){
					this.curIndex = 4;
				}else if(this.$route.query.chargeType == 'eth'){
					this.curIndex = 5;
				}
			}
			//console.log(111111,this.$route.query)
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
	.recharge {
		text-align: left;
		font-size: 14px;
		color: #494949;
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