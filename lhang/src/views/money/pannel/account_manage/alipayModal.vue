<template>
	<div class="modal">
		<div class="shadow_box"></div>
		<div class="content">
			<span class="close_btn" @click="close">&times;</span>
			<h2>添加支付宝</h2>
			<ul class="body">
				<li>
					<span class="left">姓名</span>
					<div class="right">
						<input type="text" v-model="userAlipayName"/>
						<i>*只接受实名用户</i>
					</div>
				</li>
				<li>
					<span class="left">支付宝账号</span>
					<div class="right">
						<input type="text" v-model="alipayAccount"/>
						<i>*如果您的支付宝绑定了邮箱，请优先填写邮箱地址</i>
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
						<!--<input type="checkbox" v-model="isdefault"/><span>设置为默认账户</span>-->
						<div class="check_box">
							<label>
			              		<input type="checkbox" class="g_i_check" v-model="isdefault"/>
			              		<span ></span>
			              		<span class="g_label sms_msg">设置为默认账户</span>
			            	</label>
						</div>
					</div>
				</li>
				<li>
					<span class="left"></span>
					<div class="right">
						<a href="javascript:;" class="btn" @click="addAliPay">立即绑定</a>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import store from "../../../../vuex/store"
export default {
    name: 'alipayModal',
    prop:['value'],
    data () {
    	return {
			userAlipayName: "",
			alipayAccount: "",
			isdefault: false,
			isauth: false,
			remark:""
    	}
    },
    computed () {
    },
    components: {
    },
    methods: {
		//添加账号
		addAliPay() {
	    	let options = {
				userAlipayName: this.userAlipayName,
				alipayAccount: this.alipayAccount,
				isdefault: this.isdefault,
				isauth: this.isauth,
				remark: this.remark
	    	};
/*	    	if(!options.userAlipayName){
	    		alert("请输入姓名！");
	    		return;
	    	}else if(!options.alipayAccount){
	    		alert("请输入支付宝账号！")
	    		return;
	    	}else{*/
	    		lh_http("post", "alipayInfo/add",options).done((res) => {
	    			if(res.status == true){
	    				this.close();
	    			}else{
	    				alert(res.data)
	    			}
				});
	    	//}
		},
    	//关闭遮罩层
    	close () {
    		store.dispatch("showShadowBox", false);
    		this.$emit("closeModal", false);
    	}
    	//
    }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.modal{
	width: 490px;
	height: 500px;
	position: fixed;
	left: 50%;
	top: 50%;
	z-index: 1000;
	padding: 0 30px;
	transform: translate(-50%, -50%);
	background: #fff;
	border-radius: 5px;
	.content{
		background: #fff;
		border-radius: 3px;
		h2{
			border-bottom: 1px solid #EAEAEA;
			padding: 20px 0;
			font-size: 18px;
			font-weight: normal;
		}
		.body{
			li{
				margin: 30px 0;
				.left {
					text-align: right;
					vertical-align: middle;
					display: inline-block;
					width: 90px;
					margin-right: 20px;
					
				}
				.right{
					display: inline-block;
					vertical-align: middle;
					input[type=text]{
						padding: 0 10px;
						width: 294px;
						height: 35px;
						border: 1px solid #9B9B9B;
						vertical-align: middle;
						&.reset_width{
							width: 139px;
							margin-right: 2px;
						}
					}
					i{
						position: absolute;
						color: #F06104;
						font-style: normal;
						font-size: 12px;
						display: block;
					}
					textarea{
						@extend input[type=text];
						height: 76px;
						resize: none;
						vertical-align: middle;
					}
					.btn{
						display: inline-block;
						@extend input[type=text];
						background: #0093F1;
						color: #fff;
						border-radius: 3px;
						text-align: center;
						height: 45px;
						line-height: 45px;
						border: none;
						margin-top: -15px;
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