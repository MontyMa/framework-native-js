<template>
	<div class="modal">
		<div class="shadow_box"></div>
		<div class="content">
			<span class="close_btn" @click="close">&times;</span>
			<h2>添加银行卡</h2>
			<ul class="body">
				<li class="addHeight">
					<span class="left">姓名</span>
					<div class="right">
						<input type="text" v-model="cardHolderName"/>
						<i>*只接受实名用户</i>
					</div>
				</li>
				<li>
					<span class="left">银行卡账号</span>
					<div class="right">
						<input type="text" v-model="bankAccount"/>
					</div>
				</li>
				<li>
					<span class="left"></span>
					<div class="right">
						<input type="text" class="reset_width" placeholder="开户银行" v-model="bankName"/>
						<span>-</span>
						<input type="text" class="reset_width" placeholder="开户支行" v-model="branchName"/>
					</div>
				</li>
				<li class="addHeight">
					<span class="left"></span>
					<div class="right">
						<input type="text" class="reset_width" placeholder="开户省" v-model="bankProvince"/>
						<span>-</span>
						<input type="text" class="reset_width" placeholder="开户市" v-model="bankCity"/>
						<i>*以上内容务必正确填写，避免到账延迟</i>
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
						<a href="javascript:;" class="btn" @click="addBank">立即绑定</a>
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
    prop:['value'],
    data () {
    	return {
			bankName: "",
			bankAccount: "",
			branchName: "",
			bankProvince: "",
			bankCity: "",
			cardHolderName: "",
			cardHolderMobile: "",
			idNumber: "",
			isDefault: false,
			isAuth: false,
			remark: ""
    	}
    },
    computed () {
    },
    components: {
    },
    methods: {
    	addBank () {
    		let options = {
    			bankName: this.bankName, 
				bankAccount: this.bankAccount, 
				branchName: this.branchName,
				bankProvince: this.bankProvince,
				bankCity: this.bankCity,
				cardHolderName: this.cardHolderName,
				cardHolderMobile: this.cardHolderMobile,
				idNumber: this.idNumber,
				isDefault: this.isDefault,
				isAuth: this.isAuth,
				remark: this.remark
    		};
    		if(!this.cardHolderName){
    			alert("请输入姓名！")
    		}else if(!this.bankAccount){
    			alert("请输入银行卡账号！")
    		}else if(!this.bankName){
    			alert("请输入开户银行！")
    		}else if(!this.branchName){
    			alert("请输入开户支行！")
    		}else if(!this.bankProvince){
    			alert("请输入开户省！")
    		}else if(!this.bankCity){
    			alert("请输入开户市！")
    		}else{
    			lh_http("post", "bankInfo/add", options).done((res) => {
	    			if(res.status == true){
	    				this.close();
	    				this.$emit("updateList", true);
	    				this.$emit("selectNew", options)
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
					input[type=text]{
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
						display: block;
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