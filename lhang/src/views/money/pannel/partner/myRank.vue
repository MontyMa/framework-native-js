<template>
	<div class="my_rank">
		<div class="container_1">
			<div class="title">
				<p>被邀请人数排行榜</p>
				<p>我的排名:<span>{{rankByInvite}}</span>名</p>
			</div>
			<table>
				<thead>
					<tr>
						<td>序号</td>
						<td>账号名</td>
						<td>邀请人数</td>
						<td>总收益(折合CNY)</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(i,index) in listOfInvite">
						<td>{{index+1}}</td>
						<td>{{i.username | encrypt}}</td>
						<td>{{i.inum}}</td>
						<td>{{i.totalCny}}</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="container_2">
			<div class="title">
				<p>总收益人数折合CNY排行榜</p>
				<p>我的排名:<span>{{rankByIncome}}</span>名</p>
			</div>
			<table>
				<thead>
					<tr>
						<td>序号</td>
						<td>账号名</td>
						<td>邀请人数</td>
						<td>总收益（折合CNY）</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(i,index) in listOfIncome">
						<td>{{index+1}}</td>
						<td>{{i.username | encrypt}}</td>
						<td>{{i.inum}}</td>
						<td>{{i.totalCny}}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
export default {
    name: 'myRank',
    data () {
    	return {
    		rankByInvite: 0,
    		rankByIncome:0,
    		listOfInvite: [],
    		listOfIncome: []
    	}
    },
    methods: {
    	//获取排名      type["0"：按邀请人数，"1"：按邀请收益]
    	getRank (rankType) {
    		lh_http('post', 'invite/myRanking', {
    			type: rankType
    		}).done((res)=>{
    			if(res.status){
    				if(rankType == 0){
    					this.rankByInvite = res.data.ranking;
    				}else if(rankType == 1){
    					this.rankByIncome = res.data.ranking;
    				}
    			}
    		});
    	},
    	//获取列表
    	getList (listType) {
    		lh_http('post', 'invite/topList',{
    			type: listType,
    			count: 10
    		}).done((res)=>{
    			if(res.status){
    				if(listType == 0){
    					this.listOfInvite = res.data.data;
    					console.log('aaaa', res.data.data)
    				}else if(listType == 1){
    					this.listOfIncome = res.data.data;
    				}
    			}
    		});
    	}
    },
    mounted () {
    	//按邀请人数获取排名数
    	this.getRank(0);
    	//按邀请收益获取排名数
    	this.getRank(1);
    	//按邀请人数获取排名列表
    	this.getList(0);
    	//按邀请收益获取排名列表
    	this.getList(1);
    }
 }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
$gray: #9b9b9b;
.my_rank{
	overflow: hidden;
	.container_1{
		float: left;
		width: 49%;
		.title{
			margin: 26px 0 33px 0;
			p{
				display: inline-block;
				margin-right: 10px;
				span{
					font-size: 18px;
					font-weight: bold;
				}
			}
		}
		table{
			width: 100%;
			border-collapse: collapse;
			td{
				border: 1px solid #ddd;
				height: 40px;
				line-height: 40px;
				text-align: center;
				&:first-child{
					background: #f8f8f8;
				}
			}
			thead{
				color: #9b9b9b;
			}
			tbody{
				color: #494949;
			}
		}
	}
	.container_2{
		@extend .container_1;
		float: right;
	}
}
</style>