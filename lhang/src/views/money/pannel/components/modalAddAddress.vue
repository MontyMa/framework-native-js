<template>
	<div class="modal">
		<div class="shadow_box"></div>
		<div class="content">
			<span class="close_btn" @click="close">&times;</span>
			<h2>添加{{moneyName}}钱包地址</h2>
			<ul class="body">
				<li>
					<span class="left">{{moneyName}}地址</span>
					<div class="right">
						<input type="text" placeholder="请输入地址" v-model="digitAssetAddress"/>
					</div>
				</li>
				<li>
					<span class="left">资金密码</span>
					<div class="right">
						<input type="password" placeholder="请输入资金密码" v-model="paypwd"/>
						<router-link to="/user/settings/funding_edit"><span class="hint" @click="close">忘记资金密码？</span></router-link>
					</div>
				</li>
				<li v-if="validationMobile">
					<span class="left">短信验证码</span>
					<div class="right">
						<sms-code @smsMsg="getSmsCode" :type="getMcode.type"></sms-code>
					</div>
				</li>
				<li>
					<span class="left">备注信息</span>
					<div class="right">
						<textarea name="" rows="" cols="" v-model="remark"></textarea>
					</div>
				</li>
				<li>
					<span class="left"></span>
					<div class="right">
						<!--<input type="checkbox" v-model="isDefault"/><span>设置为默认账户</span>-->
						<div class="check_box">
							<label>
			              		<input type="checkbox" class="g_i_check" v-model="isDefault"/>
			              		<span ></span>
			              		<span class="g_label sms_msg">设置为默认账户</span>
			            	</label>
						</div>
					</div>
				</li>
				<li>
					<span class="left"></span>
					<div class="right">
						<a href="javascript:;" class="btn" @click="addAddress">立即绑定</a>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import store from "../../../../vuex/store"
export default {
    name: 'modal',
    props:['type'],
    data () {
    	return {
			walletType: "提现",
			digitAssetAddress: "",
			paypwd: "",
			mcode: "",
			getMcode: {
				type: 'addAddress'
			},
			remark:"",
			isDefault: false
    	}
    },
    computed: {
    	thisuuid () {
    		if(this.$store.getters.uuid){
    			return this.$store.getters.uuid;
    		}
    	},
		validationMobile () {
    		if(this.$store.getters.validationMobile){
    			return true;
    		}
    	},
    	moneyName () {
    		if(this.type == "btc"){
    			return '比特币';
    		}else if(this.type == 'zec'){
    			return '零币';
    		}else if(this.type == 'etc'){
    			return '以太经典';
    		}else if(this.type == 'eth'){
    			return '以太坊'
    		}
    	}
    },
    components: {
    },
    mounted () {
    	////console.log('121212',this.type)
    },
    methods: {
    	addAddress () {
    		let options = {
				"useruuid": this.thisuuid,
				"assetCode": this.type, //数字资产编码 btc/ltc/eth 
				"walletType": "提现",//钱包类型
				"digitAssetAddress": this.digitAssetAddress, //钱包地址
				"paypwd": this.paypwd,//资金密码
				"smscode": this.mcode,//短信验证码//非必须
				"token": this.token,//设置谷歌验证码
				"remark": this.remark, //备注
    		};
    		////console.log(options)
    		if(!this.digitAssetAddress){
    			alert("请输入提现地址！")
    		}else if(!this.paypwd){
    			alert("请输入资金密码！")
    		}else if(this.validationMobile && !this.mcode){
    			alert("请输入短信验证码！")
    		}else{
    			lh_http("post", "walletInfo/add", options).done((res) => {
	    			if(res.status == true){
	    				this.close();
	    				this.$emit("updateList", true);
	    				this.$emit("selectNew", options);
	    			}else{
	    				alert(res.data);    			
	    			}
	    		})
    		}
    	},
    	//关闭遮罩层
    	close () {
    		store.dispatch("showShadowBox", false)
    		this.$emit("closeModal", false);
    	},
    	//获取短信验证码
    	getSmsCode (val) {
    		this.mcode = val;
    	}
    }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.modal{
	width: 490px;
	height: 570px;
	position: fixed;
	left: 50%;
	top: 50%;
	z-index: 1000;
	border-radius: 5px;
/*	margin-left: -245px;
	margin-top: -285px;*/
	transform: translate(-50%, -50%);
	background: #fff;

	.content{
		background: #fff;
		padding: 0 25px;
		border-radius: 3px;
		h2{
			border-bottom: 1px solid #EAEAEA;
			padding: 20px 0;
			font-size: 18px;
			font-weight: normal;
		}
		.body{
			li{
				margin: 20px 0;
				&.addHeight{
					margin-bottom: 30px;
				}
				.left {
					text-align: right;
					display: inline-block;
					width: 100px;
					margin-right: 20px;
				}
				.right{
					display: inline-block;
					width: 294px;
					vertical-align: middle;
					input[type=text],input[type=password]{
						padding: 0 10px;
						width: 294px;
						height: 45px;
						border: 1px solid #9B9B9B;
						&.reset_width{
							width: 139px;
							margin-right: 2px;
						}
					}
					i{
						position: absolute;
						color: #F06104;
						font-style: normal;
					}
					textarea{
						@extend input[type=text];
						height: 76px;
						resize: none;
						vertical-align: middle;
						border-radius: 3px;
					}
					.btn{
						display: inline-block;
						@extend input[type=text];
						background: #0093F1;
						color: #fff;
						border-radius: 3px;
						text-align: center;
						line-height: 45px;
					}
					.hint{
						color: #0093F1;
						display: inline-block;
						margin-top: 3px;
					}
				}
			}
		}
	}
	.close_btn{
		color: #fff;
		font-size: 300%;
		position: absolute;
		right: -35px;
		top: -18px;
		cursor: pointer;
	}
}
</style>