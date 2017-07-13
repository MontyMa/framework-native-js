<template>
	<div class="recharge_cny">
		<div v-if="clickable">
			<div class="charge_type">
				<span class="chargeType">选择充值方式：</span>
				<ul>
					<li v-for="i in rechageType" @click="setCur(i)">
						<img :src="i.url" alt="" />
						<i class="clicked" v-show="i.isCur"></i>
					</li>
				</ul>
				<div class="tips" v-for="i in rechageType" v-show="i.isCur" v-html="i.hints">
				</div>
			</div>
			<div v-if="curItem == 'bank'">
				<recharge-bank></recharge-bank>
			</div>
			<div v-if="curItem=='alipay'">
				<recharge-alipay></recharge-alipay>
			</div>
			<!--提取记录-->
			<recharge-record :thistype="moneyType" :successModal= "showSuccessModal"></recharge-record>
		</div>
		<div v-else>
			<pre-register></pre-register>
		</div>
	</div>
</template>

<script>
import preRegister from '../../../../components/checkAuth/preRegister'
import rechargeAlipay from './rechargeAlipay'
import rechargeBank from './rechargeBank'

import rechargeBtcInfo from "./rechargeBtcInfo"
import rechargeRecord from "./rechargeRecord"

export default {
    name: 'chargeCny',
    data () {
    	return {
    		rechageType: [
    			{
    				url: require('./img/yhk.png'),
    				isCur: true,
    				hints: `<p>无手续费，周一至周日09:00-22:00人工审核，<span style='color: #F06104'>2小时内</span>到账</p>
					<p>为了您的账户安全,<span style='color: #F06104'>50,000或以上</span>可能需要C3认证</p>`,
					name: "bank"
    			},
    			{
    				url: require('./img/zfb.png'),
    				isCur: false,
    				hints: `<p>无手续费，周一至周日09:00-22:00人工审核，<span style='color: #F06104'>2小时内</span>到账</p>
					<p>为了您的账户安全,<span style='color: #F06104'>50,000或以上</span>可能需要C3认证</p>`,
					name: "alipay"
    			},
    			//暂时隐藏网银，快捷支付和微信支付
/*    			{
    				url: require('./img/wy.png'),
    				isCur: false,
    				hints: `<p>24小时在线自动充值，需要插入U盾，实时到账，第三方收取<span style='color: #F06104'>0.3%</span>手续费</p>`,
    				name: "netbank"
    			},
    			{
    				url: require('./img/kjzf.png'),
    				isCur: false,
    				hints: `<p>24小时在线自动充值，需要插入U盾，实时到账，第三方收取<span style='color: #F06104'>0.3%</span>手续费</p>`,
    				name: "quick"
    			},
    			{
    				url: require('./img/wxzf.png'),
    				isCur: false,
    				hints: `<p>24小时在线自动充值，需要插入U盾，实时到账，第三方收取<span style='color: #F06104'>0.3%</span>手续费</p>`,
    				name: "wechat"
    			},*/
    		],
    		curItem: 'bank',
    		
			updateList: false, //添加成功后通知列表更新
			moneyType: 'cny',
			showSuccessModal: false,
			clickable: false
    	}
    },
    computed: {
		user() {
			return this.$store.getters.getUser;
		},
    },
    components: {
    	rechargeBtcInfo,
    	rechargeRecord,
    	preRegister,
    	rechargeAlipay,
    	rechargeBank
    },
    methods: {
		setCur (data) {
			for( let i = 0; i < this.rechageType.length; i++){
				this.rechageType[i].isCur = false;
			}
			data.isCur = true;
			this.curItem = data.name;
		}
    },
    mounted () {
    	if(this.user){
    		//是否注册
    		let activated = this.user.customerInfo.activated;
    		//C2认证
    		let isAuth = this.user.customerInfo.authType ? true : false;
    		
    		if(activated && isAuth){
    			this.clickable = true;
    		}
    	}
    }
 }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.recharge_cny{
	.clearFix:after{
		display: block;
		content: "";
		clear: both;
	}
	.charge_type{
		overflow: hidden;
		.chargeType{
			float: left;
			margin-top: 20px;
			margin-right: 40px;
		}
		margin-top: 34px;
		ul{
			float: left;
			height: 65px;
			overflow: hidden;
			li{
				float: left;
				margin-right: 30px;
				width: 110px;
				height: 61px;
				position: relative;
				cursor: pointer;
				img{
					width: 110px;
					height: 61px;
				}
				.clicked{
					display: inline-block;
					width: 22px;
					height: 22px;
					background: url(./img/clicked.png) no-repeat;
					background-size: 100%;
					position: absolute;
					right: -12px;
					bottom: -5px;
				}
			}
		}
		.tips{
			margin-left: 140px;
			float: left;
			margin-top: 15px;
			height: 58px;
		}
	}
	.title{
		p{
			margin-bottom: 15px;
		}
		div{
			background: #F2F9FE;
			height:52px;
			line-height: 52px;
			padding-left: 60px;
			span{
				color: #0093F1;
			}
			i{
				display: inline-block;
				width: 29px;
				height: 15px;
				background: url(../../images/to_left.png) no-repeat left;
				vertical-align: middle;
				margin-left: 20px;
				margin-right: 30px;
			}
		}
	}
	.container{
		margin-top: 30px;
		.container_left{
			float: left;
			width: 475px;
		}
		.container_right{
			float:left;
			width: 432px;
		}
	}
	.charge_cny_step{
		border-right: 1px solid #e2e2e2;
		font-size: 13px;
		margin-bottom: 70px;
		ul{
			li{
				margin-bottom: 30px;
				.itemname{
					display: inline-block;
					width: 150px;
					text-align: right;
					margin-right: 50px;
				}
				.box{
					width: 320px;
					display: inline-block;
					position: relative;
					input[type=text], input[type=password]{
						width: 320px;
						padding: 0 10px;
						height: 35px;
						border: 1px solid #9b9b9b;
						border-radius: 3px;
					}
					select{
						@extend input;
					}
					button{
						margin-top: 15px;
						width: 320px;
						height: 40px;
						line-height: 40px;;
						background: #0093F1;
						color: #fff;
						text-align: center;
						cursor: pointer;
						&:hover{
							background: darken(#0093F1, 10%);
						}
					}
					.hint{
						position: absolute;
						font-size: 12px;
						color: #9B9B9B;
						span{
							color: #F06104;
						}
					}
					.rdmNum{
						position: absolute;
						right: -20px;
						top: 8px;
						color: #F06104;
					}
					.bind_phone{
						position: absolute;
						top: 40px;
					}
				}
			}
		}
		.help{
			text-align: right;
			margin-right: 35px;
			color: #0093F1;
			cursor: pointer;
			margin-top: -20px;
			span{
				font-size: 150%;
				margin-left: 5px;
			}
		}
	}
}
</style>