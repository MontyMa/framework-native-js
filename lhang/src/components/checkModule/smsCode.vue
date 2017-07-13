<template>
	<div class="sms_box">
		<div class="box">
			<input type="text" :placeholder="defaultName" class="reset_width_208" v-model="thisSmsCode"/>
			<input type="button" :value="msg.hintMsg" class="reset_width_90" :class="{'disable': this.msg.sending == true}" :disabled="this.msg.sending == true" @click="sendMsg"/>
		</div>
	</div>	
</template>

<script>
export default {
    name: 'smsCode',
    props:['type', 'email', 'toemail', 'tophone'],
    data () {
    	return {
			msg: {
				count: 60,
				timer: null,
				hintMsg: "点击获取",
				sending: false,
			},
			thisSmsCode: '',
			defaultName: '输入短信验证码'
    	}
    },
    computed: {
    	phoneNumber () {
    		if(this.$store.getters.getUser){
    			return this.$store.getters.getUser.customerInfo.mobile;
			}
    	},
		clearMsg () {
			return this.$store.getters.clearMsg;
		}
    },
    watch: {
    	thisSmsCode (val) {
    		this.$emit("smsMsg", val);
    	},
    	clearMsg (val) {
    		if(val) {
    			this.thisSmsCode = "";
    			this.$store.dispatch("clearMsg", false);
    		}
    	}
    },
    components:{
    	
    },
    methods: {
    	startTimer () {
    		clearInterval(this.msg.timer);
    		this.msg.timer = setInterval(() => {
    			this.msg.sending = true;
    			this.msg.count --;
    			if(this.msg.count <= 0){
    				this.msg.sending = false;
    				this.msg.hintMsg = "手机验证";
    				this.msg.count = 5;
    				clearInterval(this.msg.timer);
    				return;
    			}
    			this.msg.hintMsg = '剩余'+this.msg.count+'秒';
    		},1000);
    		
    	},
    	sendMsg () {
    		let options = {};
/*    		let options = {
    			mobile: this.tophone ? this.tophone : '17191765885'//this.phoneNumber,
    			email: this.toemail ? this.toemail : '',
    			//type: this.value.type
    			type: this.type
    		};*/
    		if(this.toemail){
    			options = {
	    			email: this.toemail ? this.toemail : '',
	    			type: this.type
	    		};
    		}else{
    			options = {
	    			mobile: this.tophone ? this.tophone : this.phoneNumber,//this.phoneNumber,
	    			type: this.type
	    		};
    		}
    		//console.log(options);
			lh_http('post', "sendvcode", options).done( (res) => {
				if(res.status) {
					this.startTimer ();
					//alert('请注意查收短信');
				} else {
					alert(res.data);
				}
			})
    	}
    },
    mounted(){
    	if(this.email){
    		this.defaultName = "输入邮箱验证码";
    	}
    }
 }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.sms_box{
	.box{
		width: 100%;
		display: flex;
		position: relative;
		input{
			width: 294px;
			padding: 0 10px;
			height: 45px;
			border: 1px solid #9b9b9b;
			border-radius: 3px;
			&[type=button]{
				cursor: pointer;
				/*background: #fff;*/
				border-color: #0093F1;
				color: #fff;
				&.disable{
					background: #d8d8d8;
					border-color: #9b9b9b;
					color: #9b9b9b;
					&:hover{
						background: #d8d8d8;
					}
					&:active{
						background: #d8d8d8;
					}
				}
				&:hover{
					background: #26a8fb;
				}
				&:active{
					background: #0084d9;
				}
			}
		}
		.reset_width_208{
			flex: 1
		}
		.reset_width_90{
			width: 90px;
			margin-left: 10px;
			background: #0093F1;
			color: #fff;
			&.active{
				background: #0093F1;
			}
		}
	}
}
</style>