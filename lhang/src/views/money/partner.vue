<template>
	<div class="partner" id="partner">
		<!--<partner-introduce :ajaxData = "totalInfo"></partner-introduce>-->
		<div v-if="activated && isAuth">
			<div class="partner_introduce">
				<div class="st_t1">
					<i>&#xe653;</i>
					<span class="st_t1_name">合伙人计划介绍</span>
				</div>
				<div class="st_t2">
					<p> 推荐链行(www.lhang.com)给其他人，可以获取被推荐人45天内的充值金额返佣（CNY返佣充值面额的0.05%，数字资产返佣充值面额的0.03%），单个被邀请人奖励最大上限为50000元、5BTC、80ZEC（三种资产可累计奖励）。躺着也能赚钱啦！</p>
				</div>
				<div class="st_t3">
					<p>邀请方法一：复制您的专属推荐地址推荐给您的好友</p>
					<p id="address"><span>您的专属地址：</span><i id="myaddress">{{url+'/#/invite/'+totalInfo.icodestring}}</i></p>
					<a href="javascript:;" v-clipboard data-clipboard-action="copy" data-clipboard-target="#myaddress">复制</a>
				</div>
				<div class="st_t4">
					<p>邀请方法二：复制您的专属邀请码给您的好友，让好友注册时在邀请码一栏填写您的邀请码</p>
					<p><span>您的专属邀请码：</span><i id="mycode">{{totalInfo.icodestring}}</i></p>
					<a href="javascript:;" v-clipboard data-clipboard-action="copy" data-clipboard-target="#mycode">复制</a>
				</div>
				<div class="st_t5">
					<p>邀请方法三：分享下方二维码给您的好友，好友通过扫码注册</p>
					<p><span>您的专属二维码：</span></p>
					<div class="code_img">
						<!--<img src="../../images/2d_code.png" alt="" />-->
						<div id="code"></div>
						<a id="download" download="qrcode.jpg"></a>
					</div>
					<a href="javascript:;" @click="downloadImg">下载</a>
				</div>
			</div>
			<partner-income :ajaxData="totalInfo"></partner-income>
		</div>
		<pre-register v-else></pre-register>
	</div>
</template>

<script>
	//import partnerIntroduce from './pannel/partner/partnerIntroduce'
	import partnerIncome from './pannel/partner/partnerIncome'
	import preRegister from '../../components/checkAuth/preRegister'
	import { mapGetters } from 'vuex'
	export default {
		name: 'partner',
		computed: {},
		data() {
			return {
				title: '',
				icodestring: '',
				totalCny: '',
				totalInfo: {},
				activated: true,
				isAuth: false,
//				url: window.config.api,
				url: window.location.host,
				imgurl: ''
			}
		},
		computed: {
			user() {
				return this.$store.getters.getUser;
			},
		}, //定义变量
		components: {
			//partnerIntroduce,
			partnerIncome,
			preRegister
		}, //注册组件
		methods: { //方法都在这里
			//获取加载信息
			getTotalInfo() {
				lh_http('post', 'invite/myIncome').done((res) => {
					////console.log(res)
					if(res.status) {
						this.totalInfo = res.data.data;

						//二维码
						$('#code').qrcode({
							width: 150, //宽度 
							height: 150, //高度 
							text: `${this.url}/#/invite/${this.totalInfo.icodestring}`,
						});
					}
				})
			},
			//下载图片
			downloadImg() {
				let canvas = $('#code').find("canvas").get(0);
				this.imgurl = canvas.toDataURL('image/jpeg')
				$("#download").attr('href', this.imgurl).get(0).click();
			}
		},
		mounted() {
			if(this.user) {
				this.activated = this.user.customerInfo.activated;
				this.isAuth = this.user.customerInfo.authType ? true : false;
			}
			this.getTotalInfo();
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
	.partner {
		.partner_introduce {
			text-align: left;
			font-size: 14px;
			margin-bottom: 32px;
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
			.st_t2 {
				padding: 14px;
				margin-top: 11px;
				background: #f5f7fa;
				p {
					font-size: 14px;
					color: #666;
				}
			}
			.st_t3 {
				position: relative;
				margin-top: 40px;
				margin-left: 15px;
				;
				border-bottom: 1px solid #e8e8e8;
				p {
					margin-bottom: 23px;
					span {
						color: #9b9b9b;
					}
					i {
						font-style: normal;
					}
				}
				a {
					position: absolute;
					right: 0;
					top: 0;
					width: 96px;
					height: 40px;
					line-height: 40px;
					text-align: center;
					color: #fff;
					background: #0093f1;
					border-radius: 3px;
					&:hover {
						background: #26a8fb;
					}
					&:active {
						background: #0084d9;
					}
					/*					&:hover {
						background: darken(#0093f1, 10%)
					}*/
				}
			}
			.st_t4 {
				@extend .st_t3;
			}
			.st_t5 {
				@extend .st_t3;
				border-bottom: none;
				.code_img {
					width: 150px;
					height: 150px;
					margin-left: 110px;
					img {
						width: 150px;
						height: 150px;
					}
				}
			}
		}
	}
</style>