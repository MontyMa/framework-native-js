<template>
	<div class="partner_income">
		<div class="st_t1">
			<i>&#xe652;</i>
			<span class="st_t1_name">我的合伙人收入</span>
		</div>
		<div class="head">
			<div class="head_left">
				<span class="head_left_title">累计佣金折合</span>
				<p>{{ajaxData.totalCny}}<i>CNY</i></p>
			</div>
			<div class="head_right">
				<p><span>共邀请</span><strong>{{ajaxData.inum}}</strong>人</p>
			</div>
		</div>
		<div class="income_detial">
			<ul>
				<li v-for="i in incomeList">
					<p><span>{{i.name}}收入：</span>{{i.amount}}</p>
				</li>
			</ul>
			<p class="hint">说明：<span>佣金收益数据每日24：00统计结算一次，邀请人数实时统计显示</span></p>
		</div>
		<div class="tab">
			<div class="tab_head_detail">
				<span class="tab_head_item" :class="{'active': curIndex == 1}" @click="changeTab(1)">我的收益明细</span>
				<span class="tab_head_item" :class="{'active': curIndex == 2}" @click="changeTab(2)">我的邀请客户</span>
				<span class="tab_head_item" :class="{'active': curIndex == 3}" @click="changeTab(3)">合伙人排名</span>
				<div class="time_box" v-show="curIndex == 2">
					<datepicker @dateVal="getStartTime" :value="req.startTime" :disabled-days-of-week="disabled" :format="format" :clear-button="clear" :placeholder="placeholder1"></datepicker>
					<i>-</i>
					<datepicker @dateVal="getEndTime" :value="req.endTime" :disabled-days-of-week="disabled" :format="format" :clear-button="clear" :placeholder="placeholder2"></datepicker>
					<a href="javascript:;" @click="setMsg">查询</a>
				</div>
			</div>
			<my-income v-if="curIndex == 1"></my-income>
			<my-client v-if="curIndex == 2" :clientlists="myclientList" :list_r="list_r" :getList="setMsg"></my-client>
			<my-rank v-if="curIndex == 3"></my-rank>
		</div>
	</div>
</template>

<script>
	import myIncome from './myIncome'
	import myClient from './myClient'
	import myRank from './myRank'
	//import timePicker from '../../../../components/timePicker/timepicker'
	//import datepicker from '../../../../components/timePicker/datepicker'
	export default {
		name: 'partnerIncome',
		props: ['ajaxData'],
		data() {
			return {
				curIndex: 1,
				incomeList: [{
						name: 'CNY',
						amount: 0
					},
					{
						name: 'BTC',
						amount: 0
					},
					{
						name: 'ZEC',
						amount: 0
					},
//					{
//						name: 'ETH',
//						amount: 0
//					},
//					{
//						name: 'ETC',
//						amount: 0
//					}
				],
				totalMoney: 0,
				totalInvitePeople: 0,
				req: {
					pageNo: 1,
					pageSize: 10,
					startTime: '',
					endTime: ''
				},
				myclientList: [],
				list_r: {},

				disabled: [],
				format: 'yyyy-MM-dd',
				clear: true,
				placeholder1: '开始时间',
				placeholder2: '结束时间'
			}
		},
		components: {
			myIncome,
			myClient,
			myRank,
			//datepicker
		},
		methods: {
			//tab切换
			changeTab(data) {
				this.curIndex = data;
			},
			//获取日期
			getStartTime(val) {
				//console.log(val);
				this.req.startTime = val;
			},
			getEndTime(val) {
				//console.log(val);
				this.req.endTime = val;
			},
			/*    	//合伙人收益
			    	totalInfo () {
			    		lh_http('post', 'invite/myIncome').done((res)=>{
			    			if(res.status){
			    				this.totalMoney = res.data.data.totalCny;
			    				this.totalInvitePeople = res.data.data.inum;
			    			}
			    		})
			    	},*/
			//收入列表详情
			addIncomeDetail() {
				lh_http('post', 'invite/mySubIncome').done((res) => {
					let incomeDetail = res.data.data;
					for(let i = 0; i < this.incomeList.length; i++) {
						for(let key in incomeDetail) {
							if(key == this.incomeList[i].name.toLowerCase()) {
								this.incomeList[i].amount = incomeDetail[key];
							}
						}
					}
				});
			},
			//传ajax对象
			setMsg() {
				let options = this.req;
				//console.log(123, options)
				//this.ajaxIncome = lh_http('post', 'invite/myInvite', options);
				lh_http('post', 'invite/myInvite', options).done((res) => {
					//console.log(res.data.result)
					this.myclientList = res.data.result.resultList;
					this.list_r = res.data.result;
					console.log(this.myclientList)
				})
			},
			/*    	getSt(val){
			    		//console.log(111)
			    		//console.log(val)
			    	}*/
		},
		mounted() {
			this.addIncomeDetail();
			//this.setMsg();
			//this.totalInfo();
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	.partner_income {
		text-align: left;
		font-size: 14px;
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
		.head {
			overflow: hidden;
			margin-top: 20px;
			margin-left: 10px;
			padding-bottom: 8px;
			border-bottom: 1px solid #e8e8e8;
			.head_left {
				float: left;
				.head_left_title {
					display: block;
					color: #9b9b9b;
					margin-bottom: 10px;
				}
				p {
					font-size: 24px;
					i {
						font-size: 14px;
						font-style: normal;
						color: #9b9b9b;
						margin-left: 5px;
					}
				}
			}
			.head_right {
				float: right;
				margin-top: 27px;
				span {
					color: #9b9b9b;
				}
				strong {
					font-size: 32px;
					font-weight: normal;
					margin: 0 5px
				}
			}
		}
		.income_detial {
			overflow: hidden;
			ul {
				margin: 25px 0 20px 0;
				display: flex;
				margin-right: -1px;
			}
			li {
				flex: 1;
				p {
					border-right: 1px dashed #979797;
					color: #000;
					text-align: center;
					span {
						color: #9b9b9b;
					}
				}
			}
			.hint {
				color: #0093f1;
				margin-left: 10px;
				margin-top: 30px;
				span{
					color: #666;
				}
			}
		}
		.tab {
			margin-top: 20px;
			min-height: 280px;
			.tab_head_detail {
				border-bottom: 2px solid #d7d7d7;
				position: relative;
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
				.time_box {
					input {
						width: 170px;
						height: 32px;
						border: 1px solid #ccc;
					}
					position: absolute;
					right: 0;
					top: 4px;
					a {
						font-size: 14px;
						color: #0093F1;
						margin: 0 10px;
					}
				}
			}
		}
	}
</style>