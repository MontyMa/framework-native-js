<template>
	<div class="recharge_btc_record">
		<div class="st_t1">
			<i>&#xe651;</i>
			<span class="st_t1_name">{{typeName}}充值记录</span>
		</div>
		<table>
			<thead>
				<tr>
					<td width="18%">充值时间</td>
					<td width="31%">充值地址</td>
					<td width="10%">充值金额({{thistype |changeCaps('uppercase')}})</td>
					<td width="19%">申请时间</td>
					<td width="10%">状态</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for="i in lists">
					<td>{{i.updateTime}}</td>
					<td>
						<p>{{i.account}}</p>
					</td>
					<td>{{i.assetAmt}}</td>
					<td>{{i.createTime}}</td>
					<td><span>{{i.depositStatus}}</span></td>
				</tr>
			</tbody>
		</table>
		
		<page  :totalPages='list_r.totalPages' :totalCount='list_r.totalCount'
      :page='list_r.page' @pagego="getInfo" :pageSize="'5'"></page>
	</div>
</template>

<script>
	export default {
		name: 'rechargeBtcRecord',
		props: ['thistype'],
		data() {
			return {
				pageNo: 1,
				pageSize: 5,
				assetCode: 'btc',
				lists: [],
				list_r:{},
			}
		},
		computed: {
			uuid() {
				return this.$store.getters.uuid;
			},
			typeName() {
				if(this.thistype) {
					if(this.thistype == 'btc') {
						return "比特币";
					} else if(this.thistype == 'zec') {
						return "零币";
					} else if(this.thistype == 'etc') {
						return "以太经典";
					} else if(this.thistype == 'eth') {
						return "以太坊";
					}
				}
			}
		},
		methods: {
			getInfo(page) {
				let options = {
					uuid: this.uuid,
//					pageNo: this.pageNo,
//					pageSize: this.pageSize,
					assetCode: this.thistype
				};
				lh_http('post', 'depositOrder/depositOrderJsonList', options, page).done((res) => {
					//  			//console.log(res)
					if(res.status) {
						this.lists = res.data.list.resultList;
						this.list_r = res.data.list;
					}
				})
			},
			
		},
		mounted() {
//			this.getInfo();
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
					/*				&:nth-child(2n){
					background: #f2f9fe;
				}*/
					&:hover {
						background-color: #F2F9FE;
					}
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