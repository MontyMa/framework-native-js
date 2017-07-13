<template>
	<div class="points">
		<div class="title">
			<span>当前会员等级:</span><strong>{{myVipLevel}}</strong>
			<span>积分:</span><strong>{{myVipScore}}</strong>
		</div>
		<div class="vip_container">
			<div :class="{'vip_box':true,'vip_sp':true}">
				<div class="vip_level_1">
					<div v-bind:style="{borderRight:(myVipScore <= 0 ? '':'1px solid white'),background:(myVipScore <= 0 ? '':'#0093f1'),width:(myVipScore/2000 > 1 ? 100 : myVipScore/20)+'%',height:'22px',borderBottomLeftRadius: '10px',borderTopLeftRadius: '10px'}"></div>
					<span>VIP1(0)</span>
				</div>
				<div class="vip_level_2">
					<div v-bind:style="{borderRight:(myVipScore <= 2000 ? '':'1px solid white'),background:(myVipScore <= 2000 ? '':'#0093f1'),width:(myVipScore/6000 > 1 ? 100 : myVipScore/60)+'%',height:'22px'}"></div>
					<span>VIP2(2000)</span>
				</div>
				<div class="vip_level_3">
					<div v-bind:style="{borderRight:(myVipScore <= 6000 ? '':'1px solid white'),background:(myVipScore <= 6000 ? '':'#0093f1'),width:(myVipScore/25000 > 1 ? 100 : myVipScore/250)+'%',height:'22px'}"></div>
					<span>VIP3(6000)</span>
				</div>
				<div class="vip_level_4">
					<div v-bind:style="{borderRight:(myVipScore <= 20000? '':'1px solid white'),background:(myVipScore <= 20000 ? '':'#0093f1'),width:(myVipScore/50000 > 1 ? 100 : myVipScore/500)+'%',height:'22px'}"></div>
					<span>VIP4(20000)</span>
				</div>
				<div class="vip_level_5">
					<!--<div v-bind:style="{borderRight:(myVipScore <= 50000 ? '':'1px solid white'),background:(myVipScore <= 50000 ? '':'#0093f1'),width:(myVipScore/50000 > 1 ? 100 : myVipScore/500)+'%',height:'22px'}"></div>-->
					<div style="width: 100%;height: 22px;;"></div>
					<span class="v5">VIP5(50000)</span>
					<span class="vs">超级会员</span>
				</div>
			</div>
			<p class="hint">注:积分累计达到会员级别要求，会自动升级您的VIP会员，链行可能会根据运营要求对积分规则进行不定期调整。</p>
		</div>
		<div class="my_table">
			<p class="table_title">
				<strong>会员等级越高，优惠越多:</strong>
			</p>
			<table>
				<thead>
					<tr>
						<th>VIP会员级别</th>
						<th>VIP1</th>
						<th>VIP2</th>
						<th>VIP3</th>
						<th>VIP4</th>
						<th>VIP5</th>
						<th>超级会员</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="i in vipLevel">
						<td>{{i.name}}</td>
						<td>{{i.v1}}</td>
						<td>{{i.v2}}</td>
						<td>{{i.v3}}</td>
						<td>{{i.v4}}</td>
						<td>{{i.v5}}</td>
						<td v-if="i.name=='对应积分'" :rowspan="vipLevel.length">
							<a class="blue" href="javascript:;">{{i.super}}</a>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<!--新手任务-->
		<div class="my_table my_table_2">
			<p class="table_title">
				<strong>如何获取积分:</strong>
			</p>
			<table>
				<thead>
					<tr>
						<th class="changeStyle" colspan="5">新手任务</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>积分项目</td>
						<td>积分类型</td>
						<td>积分数量</td>
						<td>上限</td>
						<td>完成状态</td>
					</tr>
					<tr v-for="i in newTask">
						<td>{{i.name}}</td>
						<td>{{i.type}}</td>
						<td>{{i.amount}}</td>
						<td>{{i.uplimit}}</td>
						<td>
							<span v-if="i.status">已完成</span>
							<a v-if="!i.status" class="blue" :href="i.href">{{i.statusName}}</a>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<!--每日任务-->
		<div class="my_table my_table_2">
			<table>
				<thead>
					<tr>
						<th class="changeStyle" colspan="5">每日任务</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>积分项目</td>
						<td>积分类型</td>
						<td>积分数量</td>
						<td>上限</td>
						<td>完成状态</td>
					</tr>
					<tr v-for="i in dailyTask">
						<td>{{i.name}}</td>
						<td>{{i.type}}</td>
						<td>{{i.amount}}</td>
						<td>{{i.uplimit}}</td>
						<td>
							<span v-if="i.status">已完成</span>
							<a v-if="!i.status" class="blue" :href="i.href">{{i.statusName}}</a>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<!--积分明细-->
		<div class="my_table set_height">
			<div class="time_container clearFix">
				<div class="left">
					<strong>积分明细</strong>
				</div>
				<div class="right">
					<div class="time_box">
						<datepicker @dateVal="getStartTime" :value="req.startTime" :disabled-days-of-week="disabled" :format="format" :clear-button="clear" :placeholder="placeholder1"></datepicker>
						<i>-</i>
						<datepicker @dateVal="getEndTime" :value="req.endTime" :disabled-days-of-week="disabled" :format="format" :clear-button="clear" :placeholder="placeholder2"></datepicker>
						<a href="javascript:;" @click="getScoreInfo">查询</a>
					</div>
				</div>
			</div>
			<table>
				<thead>
					<tr>
						<th width="33.3%">时间</th>
						<th width="33.3%">积分项目</th>
						<th width="33.3%">积分数量</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="i in pointsDetail">
						<td>{{i.createTime}}</td>
						<td>{{i.scoreTaskName}}</td>
						<td>{{i.score}}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
	export default {
		computed: {},
		data() {
			return {
				//vipe等级信息
				myVipLevel: '',
				myVipScore: '',
				//日期选择空间参数
				req: {
					startTime: '',
					endTime: '',
					pageSize: 10,
					pageNo: 1
				},
				disabled: [],
				format: 'yyyy-MM-dd',
				clear: true,
				placeholder1: '开始时间',
				placeholder2: '结束时间',
				//
				vipLevel: [{
					name: '对应积分',
					v1: "0",
					v2: "2000",
					v3: "6000",
					v4: "20,000",
					v5: "50,000",
					super: '需要联系购买'
				}, {
					name: 'CNY提现费率',
					v1: "0.50%",
					v2: "0.45%",
					v3: "0.38%",
					v4: "0.30%",
					v5: "0.20%",
					super: ''
				}, {
					name: 'BTC交易手续费',
					v1: "0.00%",
					v2: "0.00%",
					v3: "0.00%",
					v4: "0.00%",
					v5: "0.00%",
					super: ''
				}, {
					name: 'ZEC交易手续费',
					v1: "0.10%",
					v2: "0.10%",
					v3: "0.10%",
					v4: "0.10%",
					v5: "0.10%",
					super: ''
				}, {
					name: 'ETH交易手续费',
					v1: "0.10%",
					v2: "0.10%",
					v3: "0.10%",
					v4: "0.10%",
					v5: "0.10%",
					super: ''
				}, {
					name: 'ETC交易手续费',
					v1: "0.10%",
					v2: "0.10%",
					v3: "0.10%",
					v4: "0.10%",
					v5: "0.10%",
					super: ''
				}],
				newTask: [{
					name: "注册",
					type: "首次积分",
					amount: '+100',
					uplimit: '100',
					status: false,
					statusName: '立即注册',
					href: ''
				}, {
					name: "绑定手机",
					type: "首次积分",
					amount: '+200',
					uplimit: '200',
					status: false,
					statusName: '立即绑定',
					href: '#/user/settings/phone_bind'
				}, {
					name: "绑定邮箱",
					type: "首次积分",
					amount: '+50',
					uplimit: '50',
					status: false,
					statusName: '立即绑定',
					href: '#/user/settings/email_bind'
				}, {
					name: "设置昵称",
					type: "首次积分",
					amount: '+100',
					uplimit: '100',
					status: false,
					statusName: '立即设置',
					href: '#/user/auth'
				}, {
					name: "设置谷歌验证",
					type: "首次积分",
					amount: '+50',
					uplimit: '50',
					status: false,
					statusName: '立即设置 ',
					href: '#/user/settings/google'
				}, {
					name: "设置资金密码",
					type: "首次积分",
					amount: '+100',
					uplimit: '100',
					status: false,
					statusName: '立即设置',
					href: '#/user/settings/funding_bind'
				}, {
					name: "C1认证",
					type: "首次积分",
					amount: '+300',
					uplimit: '300',
					status: false,
					statusName: '立即认证',
					href: '#/user/auth'
				}, {
					name: "C2认证",
					type: "首次积分",
					amount: '+100',
					uplimit: '100',
					status: false,
					statusName: '立即认证',
					href: '#/user/auth'
				}, {
					name: "首次充值",
					type: "首次积分",
					amount: '充值金额(折合CNY)*1%+100',
					uplimit: '500',
					status: false,
					statusName: '立即充值',
					href: '#/money/recharge'
				}],
				dailyTask: [{
					name: "登录",
					type: "常规积分",
					amount: '+5',
					uplimit: '5',
					status: false,
					statusName: '立即登录',
					href: ''
				}, {
					name: "充值CNY",
					type: "常规积分",
					amount: '充值金额*1%',
					uplimit: '500',
					status: false,
					statusName: '立即充值',
					href: '#/money/recharge'
				}, {
					name: "充值数字资产",
					type: "常规积分",
					amount: '按充值时刻的市价折合CNY*1%',
					uplimit: '500',
					status: false,
					statusName: '立即充值',
					href: '#/money/recharge?chargeType=btc'
				}, {
					name: "交易",
					type: "常规积分",
					amount: '交易金额折合CNY*2%',
					uplimit: '500',
					status: false,
					statusName: '立即交易',
					href: '#/trading/btc/trade'
				}, {
					name: "账户每日总资产折合CNY",
					type: "常规积分",
					amount: '折合CNY*0.1%',
					uplimit: '100',
					status: false,
					statusName: '立即充值',
					href: '#/money/recharge'
				}, ],
				pointsDetail: []
			}
		}, //定义变量
		components: {}, //注册组件
		methods: { //方法都在这里
			//获取日期
			getStartTime(val) {
				//console.log(val);
				this.req.startTime = val;
			},
			getEndTime(val) {
				//console.log(val);
				this.req.endTime = val;
			},
			//查询vip积分情况
			getVipInfo() {
				lh_http("get", 'customerInfo/vipInfo').done((res) => {
					////console.log(res)
					if(res.status) {
						this.myVipLevel = res.data.vipInfo.vipLevel;
						this.myVipScore = res.data.vipInfo.score;
						
					}
				})
			},
			getTaskList() {
				lh_http("get", 'customerInfo/scoreTaskStatus').done((res) => {
					if(res.status) {
						//新手任务
						[
							this.newTask[0].statusName,
							this.newTask[1].statusName,
							this.newTask[2].statusName,
							this.newTask[3].statusName,
							this.newTask[4].statusName,
							this.newTask[5].statusName,
							this.newTask[6].statusName,
							this.newTask[7].statusName,
							this.newTask[8].statusName,
						] = [
							res.data.scoreTaskStatus.basicScoreTask.register,
							res.data.scoreTaskStatus.basicScoreTask.bind_mobile,
							res.data.scoreTaskStatus.basicScoreTask.bind_email,
							res.data.scoreTaskStatus.basicScoreTask.set_nickname,
							res.data.scoreTaskStatus.basicScoreTask.set_gauth,
							res.data.scoreTaskStatus.basicScoreTask.set_asset_pwd,
							res.data.scoreTaskStatus.basicScoreTask.c1_auth,
							res.data.scoreTaskStatus.basicScoreTask.c2_auth,
							res.data.scoreTaskStatus.basicScoreTask.first_deposit
						];
						[
							this.newTask[0].status,
							this.newTask[1].status,
							this.newTask[2].status,
							this.newTask[3].status,
							this.newTask[4].status,
							this.newTask[5].status,
							this.newTask[6].status,
							this.newTask[7].status,
							this.newTask[8].status,
						] = [
							res.data.scoreTaskStatus.basicScoreTask.register == 'finished' ? true : false,
							res.data.scoreTaskStatus.basicScoreTask.bind_mobile == 'finished' ? true : false,
							res.data.scoreTaskStatus.basicScoreTask.bind_email == 'finished' ? true : false,
							res.data.scoreTaskStatus.basicScoreTask.set_nickname == 'finished' ? true : false,
							res.data.scoreTaskStatus.basicScoreTask.set_gauth == 'finished' ? true : false,
							res.data.scoreTaskStatus.basicScoreTask.set_asset_pwd == 'finished' ? true : false,
							res.data.scoreTaskStatus.basicScoreTask.c1_auth == 'finished' ? true : false,
							res.data.scoreTaskStatus.basicScoreTask.c2_auth == 'finished' ? true : false,
							res.data.scoreTaskStatus.basicScoreTask.first_deposit == 'finished' ? true : false
						];
						//每日任务
						[
							this.dailyTask[0].statusName,
							this.dailyTask[1].statusName,
							this.dailyTask[2].statusName,
							this.dailyTask[3].statusName,
							this.dailyTask[4].statusName
						] = [
							res.data.scoreTaskStatus.normalScoreTask.login,
							res.data.scoreTaskStatus.normalScoreTask.cny_deposit,
							res.data.scoreTaskStatus.normalScoreTask.other_deposit,
							res.data.scoreTaskStatus.normalScoreTask.trade,
							res.data.scoreTaskStatus.normalScoreTask.total_asset
						];
						[
							this.dailyTask[0].status,
							this.dailyTask[1].status,
							this.dailyTask[2].status,
							this.dailyTask[3].status,
							this.dailyTask[4].status
						] = [
							res.data.scoreTaskStatus.normalScoreTask.login == 'finished' ? true : false,
							res.data.scoreTaskStatus.normalScoreTask.cny_deposit == 'finished' ? true : false,
							res.data.scoreTaskStatus.normalScoreTask.other_deposit == 'finished' ? true : false,
							res.data.scoreTaskStatus.normalScoreTask.trade == 'finished' ? true : false,
							res.data.scoreTaskStatus.normalScoreTask.total_asset == 'finished' ? true : false
						];
					}
				})
			},
			//积分明细
			getScoreInfo() {
				let options = this.req;
				options.startTime+=' 00:00:00'
				options.endTime+=' 00:00:00'
				//console.log(options)
				lh_http("get", 'customerInfo/scoreTaskDetail', options).done((res) => {
					//console.log(res)
					if(res.status) {
						this.pointsDetail = res.data.scoreTasks;
					}
				});
			}
		},
		mounted() {
			this.getVipInfo();
			this.getTaskList();
			this.getScoreInfo();
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.points {
		.clearFix:after {
			content: '', ;
			display: block;
			clear: both;
		}
		text-align: left;
		font-size: 14px;
		padding: 43px 30px;
		color: #494949;
		.title {
			span {
				margin-right: 10px;
			}
			strong {
				margin-right: 54px;
			}
		}
		.vip_container {
			.hint {
				color: #666;
				font-size: 12px;
			}
			.vip_sp {
				background: #0093F1;
			}
			.vip_box {
				width: 100%;
				height: 24px;
				border: 1px solid #0093f1;
				border-radius: 12px;
				margin-top: 40px;
				margin-bottom: 46px;
				/*overflow: hidden;*/
				>div {
					float: left;
					height: 22px;
					span {
						position: relative;
						top: -45px;
					}
				}
				.vip_level_1 {
					width: 100px;
					border-right: 1px solid #0093F1;
				}
				.vip_level_2 {
					width: 150px;
					border-right: 1px solid #0093F1;
					span{
						left: -33px;
					}
				}
				.vip_level_3 {
					width: 200px;
					border-right: 1px solid #0093F1;
					span{
						left: -33px;
					}
				}
				.vip_level_4 {
					width: 300px;
					border-right: 1px solid #0093F1;
					span{
						left: -33px;
					}
				}
				.vip_level_5 {
					/*width: 208px;*/
					.v5{
						left: -33px;
					}
					.vs{
						left: 15px;
					}
				}
			}
		}
		.my_table {
			margin-top: 40px;
			.table_title {
				margin: 16px 0;
			}
			table {
				width: 100%;
				border-collapse: collapse;
				border: 1px solid #F2F9FE;
				th,
				td {
					text-align: center;
					padding: 20px 0;
					.blue {
						color: #0093F1;
					}
				}
				th {
					background: #F2F9FE;
					font-weight: normal;
				}
				tr:nth-child(2n) {
					background: #F2F9FE;
				}
			}
			&.set_height {
				min-height: 280px;
			}
		}
		.my_table_2 {
			@extends: .my_table;
			table {
				th {
					text-align: left;
					padding-left: 20px;
					background: #fff;
					font-weight: normal;
				}
				tr:nth-child(2n) {
					background: #fff;
				}
				tr:nth-child(2n-1) {
					background: #F2F9FE;
				}
			}
		}
		.time_container {
			margin-top: 50px;
			margin-bottom: 20px;
			.left {
				float: left;
			}
			.right {
				float: right;
				.time_box {
					input {
						width: 170px;
						height: 32px;
						border: 1px solid #ccc;
					}
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