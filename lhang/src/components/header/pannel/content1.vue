<template>
	<div class="content1">
		<ion-content12>
			<div class="left">
				<ul class="header_social">
					<!--微信-->
					<li class="wechat icon">&#xe602;
						<div class="wechat_code_bg">
							<div class="wechat_code">
								<img src="./img/wechat_qr.png">
							</div>
						</div>
					</li>
					<!--微博-->
					<li class="icon">
						<a href="http://weibo.com/u/6011181205?refer_flag=1001030101_&is_all=1" target="_blank" class="weibo_link">&#xe610;</a>
					</li>
				</ul>

				<div class="header_data_box">
					<router-link v-for="item in lhhq" :to="item.myHref">
						<span class='header_data'>
              {{item.symbol}}:
              <span :class="item.change>=0&&(+item.lastPrice)?'rise':'fall'">￥ {{item.lastPrice}}</span>
						</span>
					</router-link>
				</div>
			</div>
			<div class="right">
				<div class="customer_box">
					<!--登录前-->
					<ul class="ul_lay login_before" v-if="!isLogged">
						<li class="ul_first">
							<router-link class="link login" to='/login'>
								<span>登录</span>
							</router-link>
						</li>
						<li>
							<router-link class="link" to='/reg/phone/1'>
								<span>注册</span>
							</router-link>
						</li>
					</ul>

					<!--登录后-->
					<ul class="ul_lay login_after" v-else>
						<li>
							<!--<span>-->
							<router-link to="/user/settings">{{getUserName.content | encrypt(getUserName.type)}}
							</router-link>
							<!--</span>-->
						</li>
						<!--<li>-->
						<!--<router-link class="link"-->
						<!--to='/user/notice'>-->
						<!--<div class="tip_icon">-->
						<!--<span>&#xe637;</span>-->
						<!--<div class="tip">3</div>-->
						<!--</div>-->
						<!--</router-link>-->
						<!--</li>-->
						<li @click="logout()">退出</li>
					</ul>

					<ul class="ul_lay">
						<!--<li>中文</li>-->
						<li class="nav_web">
							<span>网站导航</span>

							<div class="nav_cont">
								<div class="nav_group">
									<div class="li_lay">
										<div class="title">快速交易</div>
										<ul class="nav_ul">
											<li>
												<a href="#/trading/btc/trade">BTC/CNY</a>
											</li>
											<li>
												<a href="#/trading/zec/trade">ZEC/CNY</a>
											</li>
											<li>
												<a href="#/trading/eth/trade">ETH/CNY</a>
											</li>
											<li>
												<a href="#/trading/etc/trade">ETC/CNY</a>
											</li>
											<li>
												<a target="_blank" :href="myUrl+'fullScreen.html'">专业交易</a>
											</li>
										</ul>
									</div>
								</div>
								<div class="nav_group">
									<div class="li_lay">

										<div class="title">
											<a href="#/money/partner" class="a_title">资产管理</a>
										</div>
										<ul class="nav_ul">
											<li>
												<a href="#/money/overview">资产总览</a>
											</li>
											<li>
												<a href="#/money/visualization">可视化分析</a>
											</li>
											<li>
												<a href="#/money/recharge">充值充币</a>
											</li>
											<li>
												<a href="#/money/cashIn">提现提币</a>
											</li>
											<li>
												<a href="#/money/accountmanage">资金账户</a>
											</li>
											<li>
												<a href="#/money/partner">合伙人计划</a>
											</li>
										</ul>
									</div>
								</div>
								<div class="nav_group">
									<div class="li_lay">
										<div class="title">个人中心</div>
										<ul class="nav_ul">
											<li>
												<a href="#/user/settings">安全设置</a>
											</li>
											<li>
												<a href="#/user/policy">安全策略</a>
											</li>
											<li>
												<a href="#/user/auth">实名认证</a>
											</li>
											<li>
												<a href="#/user/notice">我的消息</a>
											</li>
											<!--我的积分暂时隐藏-->
											<!--<li><a href="#/user/points">我的积分</a></li>-->
											<li>
												<a href="#/user/api/index">我的API</a>
											</li>
										</ul>
									</div>
								</div>
								<div class="nav_group">
									<div class="li_lay">
										<div class="title">更多</div>
										<ul class="nav_ul">
											<li>
												<a href="#/help/bulletin">帮助中心</a>
											</li>
											<li>
												<a href="http://blog.lhang.com/" target="_blank">资讯论坛</a>
											</li>
											<!--<li><a target="_blank"-->
											<!--:href="myUrl + 'givebtc/givebtc.html'">最新活动</a></li>-->
											<li>
												<a href="/api/rest_api.html">API文档</a>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</li>
					</ul>
				</div>
				<div class="v_center"></div>
			</div>
		</ion-content12>
	</div>
</template>

<script>
	import store from '../../../vuex/store'
	export default {
		name: 'header_content1',
		data() {
			return {
				lhhq: [{
					symbol: 'BTC/CNY',
					myHref: '/trading/btc/trade',
					change: '',
					lastPrice: '--.--'
				}, {
					symbol: 'ZEC/CNY',
					myHref: '/trading/zec/trade',
					change: '',
					lastPrice: '--.--'
				}, {
					symbol: 'ETH/CNY',
					myHref: '/trading/eth/trade',
					change: '',
					lastPrice: '--.--'
				},
				{
					symbol: 'ETC/CNY',
					myHref: '/trading/etc/trade',
					change: '',
					lastPrice: '--.--'
				}
				],
				myUrl: '',
			}
		},
		computed: {
			isLogged() {
				return this.$store.getters.isLogged;
			},
			getUser() {
				return this.$store.getters.getUser;
			},
			getUserName() {
				return this.$store.getters.userName;
			},
			socket() {
				return this.$store.getters.multi_platform;
			}
		},
		components: {}, //这里注册
		mounted() {
			store.dispatch('send', {
				channel: 'multi_platform_lhang_tickers'
			});
			this.myUrl = window.config.api;
		},
		methods: {
			logout: function() {
				store.dispatch('logout');
			}
		},
		watch: {
			socket: function(res) {
				let res_channel = res.channel;

				if(res_channel !== 'multi_platform_lhang_tickers') return;

				let res_data = res.data;
				let lhhq_type = ['BTC/CNY', 'ZEC/CNY', 'ETC/CNY', 'ETH/CNY'];

				if(lhhq_type.indexOf(res_data.symbol) < 0) return;

				if(res_data.symbol === 'BTC/CNY' && res_data.lastPrice) {
					document.title = `￥ ${res_data.lastPrice} - 链行`;
				}

				this.lhhq.forEach(elem => {
					if(elem.symbol === res_data.symbol && res_data.lastPrice) {
						elem.lastPrice = res_data.lastPrice;
						elem.change = res_data.change;
					}
				});
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
	.content1 {
		height: 28px;
		background: #283138;
		color: white;
		z-index: 99;
		.header_social {
			display: inline-block;
			vertical-align: middle;
			position: relative;
			.wechat_code_bg {
				display: none;
				position: absolute;
				top: 45px;
				left: -20px;
				padding: 8px;
				-webkit-box-sizing: border-box;
				-moz-box-sizing: border-box;
				box-sizing: border-box;
				background-color: #ffffff;
				border-radius: 5px;
				z-index: 10;
				box-shadow: 0 0 10px 3px rgba(0, 0, 0, .3);
				&:before {
					content: '';
					display: block;
					border-left: 7px solid transparent;
					border-right: 7px solid transparent;
					border-bottom: 14px solid #ffffff;
					position: absolute;
					top: -13px;
					left: 26px;
					z-index: 0;
				}
				.wechat_code {
					width: 120px;
					height: 120px;
					img {
						width: 100%;
					}
				}
			}
			.wechat:hover .wechat_code_bg {
				display: block;
			}
			.weibo_link {
				color: inherit;
			}
			li.icon {
				font-size: 25px;
				margin-top: -2px;
				line-height: 28px;
				color: #D0D0D0;
				cursor: pointer;
				display: inline-block;
				vertical-align: middle;
				&:not(:first-child) {
					margin-left: 18px;
				}
				&:hover {
					color: #50E3C2;
				}
			}
		}
		.header_data_box {
			display: inline-block;
			vertical-align: middle;
			margin-left: 114px;
		}
		.left {
			float: left;
			font-size: 12px;
			height: 100%;
		}
		.header_data {
			font-size: 12px;
			color: #D0D0D0;
			line-height: 28px;
			margin-right: 20px;
			cursor: pointer;
			.rise {
				color: #ff4739;
				&::after {
					content: '\e65a';
				}
			}
			.fall {
				color: #19d457;
				&::after {
					content: '\e659';
				}
			}
			&:hover {
				color: #44C0FF;
			}
		}
		.right {
			float: right;
			height: 100%;
			font-size: 0;
			color: #D0D0D0;
			.v_center {
				height: 100%;
			}
			.v_center,
			.customer_box,
			.ul_lay,
			li {
				display: inline-block;
				vertical-align: middle;
			}
			.ul_lay {
				line-height: 20px;
				&:first-child {
					margin-right: 20px;
				}
				li {
					font-size: 14px;
					line-height: 19px;
					a:hover {
						color: #44C0FF;
					}
					&.ul_first:after {
						/*line-height: 20px;*/
						content: "|";
						margin: 0 15px;
					}
				}
				.link {
					color: inherit;
					display: inline-block;
					vertical-align: middle;
				}
			}
		}
		.login_after {
			li {
				cursor: pointer;
			}
			li:hover {
				color: #44C0FF;
			}
			li:not(:first-child) {
				margin-left: 20px;
			}
			.tip_icon {
				position: relative;
				span {
					font-size: 20px;
				}
				.tip {
					position: absolute;
					top: -3px;
					right: -6px;
					background-color: #FF4FA1;
					border-radius: 50%;
					width: 15px;
					font-size: 12px;
					line-height: 15px;
					color: #ffffff;
				}
			}
		}
		.nav_web {
			cursor: pointer;
			position: relative;
			&:hover .nav_cont {
				display: block;
			}
			span {
				&:hover {
					color: #44C0FF;
				}
				&:after {
					content: '\e62d';
					margin-left: 5px;
					font-size: 13px;
				}
			}
			.nav_cont {
				display: none;
				z-index: 10;
				position: absolute;
				right: 0;
				top: 16px;
				width: 496px;
				font-size: 0;
				padding: 25px 20px 10px 20px;
				box-sizing: border-box;
				background-color: #283138;
				.nav_group {
					display: inline-block;
					vertical-align: top;
					width: 25%;
					text-align: center;
					.title {
						font-size: 16px;
						color: #fff;
						a {
							color: inherit;
						}
						padding: 8px 0;
						box-sizing: border-box;
						white-space: nowrap;
						border-bottom: 1px solid #fff;
					}
					.nav_ul {
						li {
							line-height: 30px;
							display: block;
							font-size: 12px;
							a {
								color: #93989B;
								&:hover {
									color: #44C0FF;
								}
							}
						}
					}
					.li_lay {
						width: 65%;
						display: inline-block;
					}
				}
			}
		}
	}
</style>
