<template>
	<div class="bind_phone">
		<div class="st_t1">设置登录密码</div>
		<div class="container">
			<ul class="setPwd">
				<li>
					<span>您正在为账户</span>
					<div class="box">
						<p class="account"><span>m****03@136.com</span>设置登录密码</p>
					</div>
				</li>
				<li>
					<span>登录密码</span>
					<div class="box">
						<input type="text" placeholder="请输入登录密码" />
					</div>
				</li>
				<li>
					<span>确认登录密码</span>
					<div class="box">
						<input type="password"  :class="{wrong_pwd: showWrongPwd == true}" placeholder="请再次输入新登录密码" />
						<span class="red" v-show="showWrongPwd == true">两次输入密码不一致,请重新输入</span>
					</div>
				</li>
			</ul>
				
			<ul>	
				<li>
					<span>手机号码</span>
					<div class="box">
						<p class="account"><span>183***7654</span></p>
					</div>
				</li>
				<li>
					<span>短信验证码</span>
					<div class="box">
						<sms-code></sms-code>
						<p class="sound">收不到短息？用<span>语音验证码</span></p>
					</div>
				</li>
				<li>
					<span></span>
					<div class="box">
						<button type="button">确定</button>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>

  export default {
    name: 'bindPhone',
    data() {
		return {
			showWrongPwd: false
		}
    },
    components: {
    },
    computed: {}
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .bind_phone {
    font-size: 13px;
    margin-bottom: 70px;
    text-align: left;
    .st_t1 {
      padding: 15px 20px;
      background: #f4f4f4;
      width: 100%;
      font-size: 24px;
    }
    .container {
      margin-top: 50px;
      border: 1px solid #efefef;
      padding: 50px;
      position: relative;
      .setPwd{
      	border-bottom: 1px solid #ECECEC;
      	margin-bottom: 30px;
      }
      li {
        margin-bottom: 30px;
        span {
          display: inline-block;
          width: 90px;
          text-align: right;
          margin-right: 50px;
        }
        .account {
          text-align: left;
          span {
            text-align: left;
            margin-right: 0;
            width: initial;
            color: #0093F1
          }
        }
        .sound {
          @extend .account;
          position: absolute;
          top: 50px;
        }
        .box {
          width: 412px;
          display: inline-block;
          text-align: left;
          position: relative;
          vertical-align: middle;
          .code {
            position: absolute;
            right: 15px;
            top: 15px;
          }
          .check_box {
            position: absolute;
          }
          .sms_msg {
            display: inline-block;
            span {
              width: initial;
              color: #f35809;
            }
          }
          .codeIcon {
            position: absolute;
            top: 2px;
            right: 10px;
            width: 100px;
            height: 40px;
            background: #ccc;
          }
          input[type="text"], input[type="password"] {
            width: 412px;
            padding: 0 10px;
            height: 45px;
            border: 1px solid #9b9b9b;
            border-radius: 3px;
			&.wrong_pwd{
				background: #ffeef6;
				border-color: #FF4FA1;
			}
          }
          button {
            width: 412px;
            height: 45px;
            line-height: 45px;
            margin-top: 30px;
            background: #0093F1;
            color: #fff;
            text-align: center;
            cursor: pointer;
            &:hover {
              background: darken(#0093F1, 10%);
            }
          }
        }
      }
    }
  }
</style>
