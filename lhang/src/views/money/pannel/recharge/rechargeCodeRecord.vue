<template>
	<div class="recharge_btc_record">
		<div class="st_t1">
			<i>&#xe651;</i>
			<span class="st_t1_name">充值卡兑换记录</span>
		</div>
		<table>
			<thead>
				<tr>
					<td width="22%">兑换时间</td>
					<td width="22%">卡号</td>
					<td width="10%">操作类型</td>
					<td width="10%">资产类型</td>
					<td width="10%">金额</td>
					<td width="10%">状态</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(i,index) in lists" v-if="index < 10">
					<td>{{i.exchangeTime | formattime('yyyy/MM/dd hh:mm:ss')}}</td>
					<td>
						<p>{{i.cardId}}</p>
					</td>
					<td>{{i.cardType}}</td>
					<td>{{i.assetCode}}</td>
					<td>{{i.cardValue}}</td>
					<td>
						<span v-if="i.cardStatus == 1">充值成功</span>
						<span class="red" v-if="i.cardStatus == 0">充值失败</span>
						<span class="green" v-if="i.cardStatus == 9">已停用</span>
					</td>
				</tr>
			</tbody>
		</table>
		<page  :totalPages='list_r.totalPages' :totalCount='list_r.totalCount'
      :page='list_r.page' @pagego="addRecordList" :pageSize="'5'"></page>
	</div>
</template>

<script>
	export default {
		name: 'rechargeBtcRecord',
		props: ['value'],
		data() {
			return {
				lists: [],
				list_r:{},
				pageList: {
					pageNo: 1,
					pageSize: 10
				},
				mypage: null,
			}
		},
		methods: {
			addRecordList(page) {
				let options = {};
				this.mypage = page;
				lh_http('post', 'depositCard/myCardList', options, page).done((res) => {
					console.log(res)
					if(res.status) {
						this.lists = res.data.data.resultList;
						this.list_r = res.data.data;
						//console.log(res.data.data.resultList)
					}
				})
			}
		},
		mounted() {
//			this.addRecordList();
		},
		watch: {
			value(val) {
				//console.log(val);
				if(val == true) {
					this.addRecordList(this.mypage);
				}
			}
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	.recharge_btc_record {
		.st_t1 {
			height: 30px;
			line-height: 30px;
			text-align: left;
			font-size: 14px;
			font-weight: bold;
			/*background: #f8f8f8 url(../../images/record.png) no-repeat 10px;*/
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
		table {
			width: 100%;
			border-collapse: collapse;
			thead td {
				text-align: center;
				padding: 20px 0 10px 0;
				color: #9b9b9b;
				border-bottom: 1px solid #d7d7d7;
				/*			&:nth-child(2n-1){
				border-bottom: 2px solid #0093F1;
			}*/
			}
			tbody {
				tr {
					td {
						text-align: center;
						height: 60px;
						line-height: 60px;
						a {
							display: inline-block;
							&:first-child {
								width: 70px;
							}
						}
					}
					&:hover {
						background-color: #F2F9FE;
					}
					/*				&:nth-child(2n){
					background: #f2f9fe;
				}*/
				}
			}
		}
		.green {
			color: #50e3c2;
		}
		.blue {
			color: #0093f1;
		}
		.red {
			color: #f15984;
		}
	}
</style>