<template>
	<div class="mail_msg">
		<div class="box">
			<input type="text" placeholder="输入邮箱验证码" class="reset_width_315"/>
			<input type="button" :value="msg.hintMsg" class="reset_width_88" :class="{'disable': this.msg.sending == true}" :disabled="this.msg.sending == true" @click="sendMsg"/>
		</div>
	</div>	
</template>

<script>
export default {
    name: 'mailCode',
    data () {
    	return {
			msg: {
				count: 5,
				timer: null,
				hintMsg: "点击获取",
				sending: false
			}
    	}
    },
    components:{
    	
    },
    methods: {
    	sendMsg () {
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
    		},1000)
    	}
    }
 }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.mail_msg{
	.box{
		width: 412px;
		display: inline-block;
		position: relative;
		input{
			width: 320px;
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
				}
			}
		}
		.reset_width_315{
			width: 315px;
			margin-right: 5px;
		}
		.reset_width_88{
			width: 88px;
			background: #0093F1;
			color: #fff;
			&.active{
				background: #0093F1;
			}
		}
	}
}
</style>