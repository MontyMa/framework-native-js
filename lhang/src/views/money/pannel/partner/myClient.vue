<template>
	<div class="my_income">
		<table>
			<thead>
				<tr>
					<td width="30%">被邀请人姓名</td>
					<td width="5%"></td>
					<td width="30%">注册时间</td>
					<td width="5%"></td>
					<td width="30%">到期时间</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(i,index) in clientlists">
					<td>{{i.inviteeUserName | encrypt}}</td>
					<td></td>
					<td>{{i.createTime}}</td>
					<td></td>
					<td>{{i.endTime | formattime('yyyy-MM-dd hh:mm:ss')}}</td>
				</tr>
			</tbody>
		</table>
		<p>说明: <span>出于对受邀者的账户信息保护，平台不提供受邀者的充值信息数据。</span></p>
		
		<page  :totalPages='list_r.totalPages' :totalCount='list_r.totalCount'
      :page='list_r.page' @pagego="getList" :pageSize="'5'"></page>
		
	</div>
</template>

<script>
	export default {
		name: 'myClient',
		props: ['clientlists', 'list_r', 'getList'],
		data() {
			return {
				/*    		req: {
				    			pageNo: 1,
				    			pageSize: 10,
				    			startTime: '2017-02-01',
				    			endTime: '2017-03-30'
				    		},
				    		lists:[]*/
			}
		},
		methods: {
			/*    	getList () {
			    		//pageNo","pageSize","startTime","endTime"
			    		let options = this.req;
			    		lh_http('post', 'invite/myInvite', options).done((res)=>{
			    			//console.log(res)
			    			if(res.status){
			    				this.lists = res.data.result.resultList;
			    			}
			    		})
			    	}*/
		},
		/*    watch: {
		    	ajaxObj (val) {
		    		val.done((res)=>{
						if(res.status){
							this.lists = res.data.result.resultList;
						}
			    	});
		    	}
		    },*/
		mounted() {

			//this.getList();
			////console.log(this.ajaxObj)
			/*    	this.ajaxObj.done((res)=>{
						if(res.status){
							this.lists = res.data.result.resultList;
						}
			    	})*/
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
				color: #494949;
			}
		}
	}
</style>