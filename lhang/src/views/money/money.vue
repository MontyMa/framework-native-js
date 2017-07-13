<template>
	<div class="user" id="user">
		<!--
            作者：846966684@qq.com
            时间：2017-02-21
            描述：通用全局容器--全屏容器
        -->
		<ion-content class="content">
			<!--新手指南-->
			<user-title></user-title>
			<ion-content12>
				<div class="trading_title">
					<div class="container">
						<breadcrumb-trail></breadcrumb-trail>
					</div>
				</div>
				<div class="box">
					<div class="content_left">
						<div class="main">
							<div class="ul_content border_b">
								<ul>
									<li class="ul_title">
										<i class="my_icon">&#xe649;</i>
										<span class="item_name">资产管理</span>
									</li>
									<li :class="{ 'active': isPath == '/money/overview' }">
										<a class="link_style" :class="{ 'active': isPath == '/money/overview' }" href="#/money/overview">资产总览</a>
									</li>
									<li :class="{ 'active': isPath == '/money/visualization' }">
										<a class="link_style" :class="{ 'active': isPath == '/money/visualization' }" href="#/money/visualization">资产可视化分析</a>
									</li>
									<!--<li>
                      <a :class="{ 'active': isPath == '/money/bbao' }" href="#/money/bbao">币宝理财</a>
                    </li>-->
									<li :class="{ 'active': isPath == '/money/recharge' }">
										<a class="link_style" :class="{ 'active': isPath == '/money/recharge' }" href="#/money/recharge">充值充币</a>
									</li>
									<li :class="{ 'active': isPath == '/money/cashIn' }">
										<a class="link_style" :class="{ 'active': isPath == '/money/cashIn' }" href="#/money/cashIn">提现提币</a>
									</li>
									<li :class="{ 'active': isPath == '/money/accountmanage' }">
										<a class="link_style" :class="{ 'active': isPath == '/money/accountmanage' }" href="#/money/accountmanage">资产账户管理</a>
									</li>
									<li :class="{ 'active': isPath == '/money/partner' }">
										<a class="link_style" :class="{ 'active': isPath == '/money/partner' }" href="#/money/partner">合伙人计划</a>
									</li>
								</ul>
							</div>

							<div class="ul_content">
								<ul>
									<li class="ul_title">
										<i class="my_icon">&#xe64a;</i>
										<span class="item_name">客服支持</span>
									</li>
									<li>
										<a class="link_style" target="_blank" href="http://q.url.cn/s/Wnafsym">在线客服</a>
									</li>
									<li>
										<a class="link_style" target="_blank" href="http://shang.qq.com/wpa/qunwpa?idkey=e7f238e982c2c667d1eab036927be6242314bbf94612d6bf5ab27cd9b3fe1e6d">QQ交流群</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="content_right">
						<!--<user-title></user-title>-->
						<router-view></router-view>
					</div>
				</div>
			</ion-content12>
		</ion-content>
		<!--
        作者：846966684@qq.com
        时间：2017-02-21
        描述：通用footer
    -->
		<ion-footer>
		</ion-footer>

	</div>
</template>

<script>
	export default {
		name: 'user',
		computed: {
			isPath() {
				return this.$route.path;
			},
		},
		data() {
			return {
				title: '',
			}
		}, //定义变量
		methods: { //方法都在这里
		},
		mounted() {
			var that = this;
			//获取banner
		},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
	.user {
		.box {
			overflow: hidden;
			text-align: left;
		}
		.content_left,
		.content_right {
			float: left;
			background: #fff;
			margin-bottom: 40px;
			.link_style {
				color: #727272;
				margin-left: 50px;
			}
			.active {
				color: #0093f1;
			}
		}
		.content_left {
			width: 200px;
			.border_b {
				border-bottom: 1px solid #D7D7D7;
			}
			.ul_content {
				padding-bottom: 16px;
				ul {
					.ul_title {
						margin-top: 26px;
						font-size: 16px;
						margin-left: 23px;
						color: #383a3f;
						margin-bottom: 10px;
						.item_name{
						}
						.my_icon {
							font-size: 18px;
							font-style: normal;
							color: #0093F1;
							margin-right: 2px;
						}
					}
					li {
						height: 36px;
						line-height: 36px;
						font-size: 14px;
						&.active {
							background: #f6f7fa;
							font-weight: bold;
						}
					}
				}
			}
		}
		.content_right {
			width: 970px;
			margin-left: 30px;
			padding: 30px;
			min-height: 465px;
		}
	}
</style>