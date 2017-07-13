<template>
	<div class="info_deal">
		<div class="st_t1">
			<span class="st_t1_name">委托信息和最新成交</span>
		</div>
		<div class="wrapper">
			<div class="wrapper_left">
				<div class="title">
					<span>委托信息</span>
					<span class="c1_3">
						<div class="select" @mouseenter="showDeepth = true" @mouseleave="showDeepth = false">
							深度{{depth_index}}
						</div>
						<ul class="select_ul" v-show="showDeepth"  @mouseenter="showDeepth = true" @mouseleave="showDeepth = false">
							<li v-on:click="change_depth(0)" :class="{'active_li' : depth_index == '0'}">0</li>
							<li v-on:click="change_depth(1)" :class="{'active_li' : depth_index == '1'}">1</li>
							<li v-on:click="change_depth(2)" :class="{'active_li' : depth_index == '2'}">2</li>
							<li v-on:click="change_depth(3)" :class="{'active_li' : depth_index == '3'}">3</li>
							<li v-on:click="change_depth(4)" :class="{'active_li' : depth_index == '4'}">4</li>
							<li v-on:click="change_depth(5)" :class="{'active_li' : depth_index == '5'}">5</li>
						</ul>
					</span>
				</div>
				<table style="width: 280px;float: left;">
					<thead>
						<tr>
							<td width="12%"></td>
							<td width="22%">买入量</td>
							<td width="22%">买入价</td>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(i, index) in info.bids" v-if="index<100">
							<td>{{index+1}}</td>
							<td><span style="position: relative; z-index: 1;">{{i[1]}}</span></td>
							<td>
								<span class="red">{{i[0]}}</span>
								<div class="span_left" :style="{width: (i[1]/50*100*2.2+'px')}"></div>
							</td>
						</tr>
					</tbody>
				</table>
				<table style="width: 220px;">
					<thead>
						<tr>
							<td width="22%">卖出价</td>
							<td width="22%">卖出量</td>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(i, index) in info.asks" v-if="index<100">
							<td style="background: white;">
								<span class="green">{{i[0]}}</span>
								<div class="span_right" :style="{width: (i[1]/50*100*2.2 +'px')}"></div>
							</td>
							<td><span style="position: relative; z-index: 1;">{{i[1]}}</span></td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="wrapper_right">
				<div class="title">
					<span>最新成交</span>
				</div>
				<table>
					<thead>
						<tr>
							<td width="50%">时间</td>
							<td width="10%">价格</td>
							<td width="40%">数量</td>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(i, index) in sub_spot_trades">
							<td>{{i[3] | formattime('yyyy-MM-dd hh:mm:ss')}}</td>
							<td>{{i[1]}}</td>
							<td>
								<span :class="{red1: i[4] == 'buy', green1: i[4] == 'sell'}">{{i[2]}}</span>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
	import store from '../../../vuex/store'
	export default {
		data() {
			return {
				depth_index: 0,
				showDeepth: false,
				info: [],
			}
		},
		computed: {
			sub_spot_trades() {
				return this.$store.getters.sub_spot_trades.data;
			},
			sub_spot_btc_cny_depth() {
				return this.$store.getters.sub_spot_btc_cny_depth.data;
			},
			sub_spot_zec_cny_depth() {
				return this.$store.getters.sub_spot_zec_cny_depth.data;
			},
			sub_spot_eth_cny_depth() {
				return this.$store.getters.sub_spot_eth_cny_depth.data;
			},
			sub_spot_etc_cny_depth() {
				return this.$store.getters.sub_spot_etc_cny_depth.data;
			},
		},
		methods: {
			change_depth(index) {
				this.depth_index = index;
				this.showDeepth = false;
			},
			subscribes() {
				var currencys  = ['btc','zec','eth','etc'];
				for(var i of currencys) {
					if(i == this.$route.params.type) {
						console.log('订阅22'+i)
						store.dispatch('send', {
              channel: 'sub_spot_' + i + '_cny_trades',
            });
						store.dispatch('send', {
							channel: 'sub_spot_' + i + '_cny_depth',
							depth: this.depth_index,
						});
					}else {
						console.log('取消22'+i)
						store.dispatch('send', {
							channel: 'sub_spot_' + i + '_cny_trades',
							isClose: true,
						});
						store.dispatch('send', {
							channel: 'sub_spot_' + i + '_cny_depth',
							depth: this.depth_index,
							isClose: true,
						});
					}
				}
			}
		},
		mounted() {
			this.subscribes();
		},
		watch: {
			sub_spot_btc_cny_depth(val) {
				if(this.$route.params.type == 'btc')
				this.info = val
			},
			sub_spot_zec_cny_depth(val) {
				if(this.$route.params.type == 'zec')
				this.info = val
			},
			sub_spot_eth_cny_depth(val) {
				if(this.$route.params.type == 'eth')
				this.info = val
			},
			sub_spot_etc_cny_depth(val) {
				if(this.$route.params.type == 'etc')
				this.info = val
			},
			depth_index(val, oldval) {
				store.dispatch('send', {
					channel: 'sub_spot_' + this.$route.params.type + '_cny_depth',
					depth: val,
				});
				store.dispatch('send', {
					channel: 'sub_spot_' + this.$route.params.type + '_cny_depth',
					depth: oldval,
					isClose: true
				});
			},
			'$route' (to, from) {
				this.subscribes();
			}
		},
		fliters: {
			countWidth (val) {
				console.log(val)
			}
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	.info_deal {
		padding: 0 20px;
		padding-bottom: 20px;
		text-align: left;
		.span_left {
			position: absolute;
			top: 1px;
			background: #FFDFDF;
			float: right;
			right: 0px;
			height: 35px;
			max-width: 220px;
		}
		.span_right {
			position: absolute;
			background: #D2EFB5;
			float: left;
			left: 0px;
			top: 1px;
			height: 35px;
			max-width: 220px;
		}
		.st_t1 {
			height: 30px;
			line-height: 30px;
			text-align: left;
			font-size: 14px;
			font-weight: bold;
			padding-left: 6px;
			color: #0093F1;
			background: #F8F8F8;
			i {
				font-style: normal;
				font-size: 16px;
			}
			.st_t1_name {
				text-align: top;
			}
		}
		.wrapper {
			overflow: hidden;
			min-height: 200px;
			.title {
				margin: 20px 0 10px 0;
				border-bottom: 2px solid #3392d6;
				padding-bottom: 10px;
			}
			.c1_3 {
				float: right;
				position: relative;
				.select {
					width: 66px;
					text-align: right;
					cursor: pointer;
					background: url(./img/select.png) no-repeat right;
					padding-right: 12px;
					background-size: 7px;
					img {
						height: 12px;
						position: relative;
						top: 2px;
						left: 4px;
					}
				}
				.select_ul {
					width: 66px;
					position: absolute;
					right: -5px;
					border: 1px solid rgba(0, 147, 241, 0.37);
					z-index: 10;
					li {
						font-size: 14px;
						height: 25px;
						line-height: 25px;
						text-align: center;
						background: white;
						cursor: pointer;
						&:hover {
							background: lighten(#0093F1, 30%);
							color: #fff;
						}
					}
					.active_li {
						background: #0093F1;
						color: #fff;
					}
				}
			}
		}
		table {
			width: 100%;
			border-collapse: collapse;
			font-size: 12px;
			thead td {
				text-align: center;
				padding: 10px 0;
				color: #9b9b9b;
				border-bottom: 1px solid #d7d7d7;
			}
			tbody {
				tr {
					td {
						height: 38px;
						text-align: center;
						/*padding: 10px 0;*/
						a {
							display: inline-block;
							&:first-child {
								width: 70px;
							}
						}
					}
				}
			}
		}
		.wrapper_left,
		.wrapper_right {
			float: left;
			/*height: 400px;
			overflow: hidden;
			overflow-y:scroll;*/
		}
		.wrapper_left {
			width: 500px;
			margin-right: 39px;
			position: relative;
			.deepth {
				position: absolute;
				right: 0;
			}
			table {
				tbody {
					border: 1px solid #cbcbcb;
					tr{
						position: relative;
					}
					td {
						border-bottom: 1px solid #cbcbcb;
						position: relative;
						.red,
						.green {
							position: absolute;
							left: 50%;
							top: 50%;
							transform: translate(-50%, -50%);
							z-index: 1;
						}
					}
					td:first-child {
						background: #f8f8f8;
					}
					td:nth-child(3) {
						border-right: 1px solid #cbcbcb;
					}
				}
			}
		}
		.wrapper_right {
			width: 380px;
			table {
				tbody {
					border: 1px solid #cbcbcb;
					td {
						border-bottom: 1px solid #cbcbcb;
					}
				}
			}
		}
		.green {
			color: green;
			top: 10px;
			position: relative;
		}
		.green1 {
			color: green;
		}
		.red {
			color: red;
			top: 10px;
			position: relative;
		}
		.red1 {
			color: red;
		}
	}
</style>
