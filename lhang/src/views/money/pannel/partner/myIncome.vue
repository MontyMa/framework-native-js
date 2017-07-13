<template>
	<div class="my_income">
		<table>
			<thead>
				<tr>
					<td width="20%">时间</td>
					<td width="20%">CNY佣金</td>
					<td width="20%">BTC佣金</td>
					<td width="20%">ZEC佣金</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(i,index) in incomeList" v-if="index < pageList.pageSize">
					<td>{{i.dateTime}}</td>
					<td>{{i.cny}}</td>
					<td>{{i.btc}}</td>
					<td>{{i.zec}}</td>
				</tr>
			</tbody>
		</table>
		<p>说明: <span>出于对受邀者的账户信息保护，平台不提供受邀者的充值信息数据。</span></p>
		<!--分页-->
		<page  :totalPages='list_r.totalPages' :totalCount='list_r.totalCount'
      :page='list_r.page' @pagego="getList" :pageSize="'5'"></page>
		
	</div>
</template>

<script>
	export default {
		name: 'myIncome',
		data() {
			return {
				pageList: {
					pageNo: 1,
					pageSize: 10
				},
				incomeList: [],
				list_r: {}
			}
		},
		methods: {
			getList(page) {
				let options = {};
				lh_http('post', 'invite/myIncomeDetail', options, page).done((res) => {
					if(res.status) {
						this.incomeList = res.data.data.resultList;
						this.list_r = res.data.data;
					}
				})
			}
		},
		mounted() {
//			this.getList();
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	$gray: #9b9b9b;
	.my_income {
		table {
			width: 100%;
			border-collapse: collapse;
			thead td {
				text-align: center;
				padding: 20px 0 10px 0;
				border-bottom: 1px dashed #d7d7d7;
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
		p {
			color: #0093f1;
			margin-top: 20px;
			margin-left: 10px;
			span {
				color: #666;
			}
		}
	}
</style>