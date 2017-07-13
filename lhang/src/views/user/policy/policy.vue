<template>
	<div class="policy_detail" id="policy">
		<!--		<div class="st_t1">
			安全策略
		</div>-->
		<div class="info_title">
			<div class="info_title_box">
				<h1 class="st_t1 ul_title">您当前安全状态</h1>
				<ul class="policy_ul">
					<li v-for="i in securityState">
						<img width="40" height="40" :src="i.icon.bind" v-if="i.status" />
						<img width="40" height="40" :src="i.icon.unbind" v-else/>
						<div class="ul_type">
							<p>{{i.type}}</p>
							<div class="ul_type_r">
								<span class="item_name" v-if="i.showAccount && i.type !='手机'">{{i.account}}</span>
								<span class="item_name" v-if="i.showAccount && i.type =='手机'">{{i.account | encrypt('mobile')}}</span>
								<a :href="i.sethref" v-if="!i.status">设置</a>
								<a :href="i.modifyhref" v-else>修改</a>
							</div>
						</div>
					</li>
				</ul>
			</div>
			<div class="st_d1">
				<h1 class="st_t1 ul_title">账户安全策略</h1>
				<ul class="setting_ul">
					<li v-for="i in accountPolicy">
						<div class="icon" v-if="i.status">
							<img width="40" height="40" :src="i.pic.bind" />
						</div>
						<div class="icon" v-else>
							<img width="40" height="40" :src="i.pic.unbind" />
						</div>
						<div class="box">
							<div class="name">
								<span>{{i.name}}</span>
							</div>
							<div class="hint">
								<span class="intro">{{i.hint}}</span>
							</div>
							<div class="status">
								<span class="intro_color">{{i.policyType}}</span>
							</div>
							<div class="operation">
								<button class="jinzhi" v-if="!i.status" @click="toggle(i.items[1])">启用</button>
								<button v-if="i.status" @click="toggle(i.items[0])">更改</button>
							</div>
						</div>	
					</li>
				</ul>
			</div>

			<div class="st_d1">
				<h1 class="st_t1 ul_title">资金安全策略</h1>
				<ul class="setting_ul">
					<li v-for="i in assetPolicy">
						<div class="icon" v-if="i.status">
							<img width="40" height="40" :src="i.pic.bind" />
						</div>
						<div class="icon" v-else>
							<img width="40" height="40" :src="i.pic.unbind" />
						</div>
						<div class="box">
							<div class="name">
								<span>{{i.name}}</span>
							</div>
							<div class="hint">
								<span class="intro">{{i.hint}}</span>
							</div>
							<div class="status">
								<span class="intro_color">{{i.policyType}}</span>
							</div>
							<div class="operation">
								<button class="jinzhi" v-if="!i.status" href="javascript:;" @click="toggle(i.items[1])">启用</button>
								<button v-if="i.status" @click="toggle(i.items[0])">更改</button>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import setPolicy from './about_policy.js'
	export default {
		name: 'policyDetail',
		data() {
			return {
				securityState: setPolicy.setsecurity_init(),
				accountPolicy: setPolicy.accountPolicy_init(),
				assetPolicy: setPolicy.assetPolicy_init(),
			}
		},
		computed: {
			user() {
				return this.$store.getters.getUser;
			},
		},
		methods: {
			toggle(data) {
				this.$router.push({
					path: '/user/policy/' + data
				});
			},
		},
		mounted() {
			this.securityState = setPolicy.setsecurityState(this.user);
			this.accountPolicy = setPolicy.setaccountPolicy(this.user);
			this.assetPolicy = setPolicy.setassetPolicy(this.user);
		},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
	.policy_detail {
		text-align: left;
		/*height: 992px;*/
		.info_title {
			.info_title_box {
				background: #F5F7FA;
				height: 120px;
				padding: 17px 33px;
			}
			padding: 32px 30px;
			.ul_title {
				background: none;
				font-weight: normal;
				padding-left: 0;
				color: #333;
				font-size: 16px;
				margin: 0;
			}
			.policy_ul {
				overflow: hidden;
				zoom: 1;
				margin: 20px 0;
				width: 1200px;
				li {
					float: left;
					width: 330px;
					img {
						width: 40px;
						float: left;
						margin-right: 30px;
					}
					.ul_type {
						font-size: 16px;
						line-height: 20px;
						.ul_type_r {
							a {
								color: #0093F1;
								font-size: 12px;
							}
							.item_name{
								font-size: 12px;
							}
						}
						.set_color {
							color: #0093f1;
						}
					}
				}
			}
		}
		.st_d1 {
			overflow: auto;
			margin-top: 60px;
			padding: 0 30px;
			.ul_title {
				background: none;
				font-weight: normal;
				padding-left: 0;
				color: #333;
				font-size: 16px;
				margin-bottom: 26px;
			}
		}
		.setting_ul {
			border-bottom: 1px solid #d7d7d7;
			border-top: 1px solid #d7d7d7;
			li {
				font-size: 14px;
				overflow: hidden;
				height: 100px;
				margin-bottom: -1px;
				.icon, .hint, .name, .status, .operation, .box{
					display: inline-block;
				}
				.box{
					border-bottom: 1px dashed #d7d7d7;
					margin-bottom: -1px;
					overflow: hidden;
					width: 780px;
					height: 100px;
					line-height: 100px;
					float: left;
				}
				.hint, .name, .status {
					float: left;
				}
				.icon {
					margin: 30px 30px 0 0px;
					height: 40px;
					width: 40px;
					float: left;
					>img {
						width: 100%;
						height: 100%;
					}
				}
				.operation {
					text-align: right;
					float: right;
					button {
						width: 82px;
						background-color: #0093f1;
						height: 37px;
						line-height: 37px;
						border: none;
						color: white;
						font-size: 14px;
						cursor: pointer;
						&.gray {
							background: #ccc;
						}
						&:hover{
							background: #26a8fb;
						}
						&:active{
							background: #0084d9;
						}
					}
				}
				.name {
					width: 100px;
					margin-left: 10px;
				}
				.status {
					/*width: 100px;*/
					color: #fa5e5b;
				}
				.hint {
					color: #9b9b9b;
					width: 300px;
				}
			}
			/*li:hover {
				border: 1px solid #0093f1;
			}*/
		}
	}
</style>