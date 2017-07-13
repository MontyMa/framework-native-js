<template>
	<div class="check_code">
		<div class="box">
			<input type="text" placeholder="输入右图验证码" v-model="checkImgCode"/>
			<div class="img_box" >
				<img id="img" src="" alt="" v-checkimg/>
			</div>
			<!--<input type="button" :value="msg.hintMsg" class="reset_width_88" :class="{'disable': this.msg.sending == true}" :disabled="this.msg.sending == true" @click="sendMsg"/>-->
		</div>
	</div>
</template>

<script>
  export default {
    name: 'checkCode',
    data () {
      return {
        checkImgCode: ""
      }
    },
    computed: {
    	updataImgCode () {
    		return this.$store.getters.updataImgCode;
    	}
    },
    watch: {
    	checkImgCode (val) {
    		this.$emit("ImgCode", val);
    	},
    	updataImgCode (val) {
    		if(val) {
    			$("#img").click();
    			this.$store.dispatch("updataImgCode", false);
    		}
    	}
    },
    mounted () {
    	//$("#img").click();
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .check_code {
    .box {
      /*width: 320px;*/
      width: 100%;
      display: flex;
      position: relative;
      input {
        /*width: 69%;*/
        flex: 1;
        padding: 0 10px;
        height: 45px;
        border: 1px solid #9b9b9b;
        border-radius: 3px;
        &[type=button] {
          cursor: pointer;
          /*background: #fff;*/
          border-color: #0093F1;
          color: #fff;
          &.disable {
            background: #d8d8d8;
            border-color: #9b9b9b;
            color: #9b9b9b;
          }
        }
      }
      .img_box {
        display: inline-block;
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
        height: 45px;
        border-radius: 3px;
        border: 1px solid #ccc;
        overflow: hidden;
        cursor: pointer;
      }
    }
  }
</style>
