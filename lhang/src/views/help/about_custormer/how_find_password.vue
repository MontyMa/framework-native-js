<template>
  <div class="about_custormer">
    <div class="group">
      <div class="tit">3. 找回密码</div>
      <p>①  在登录页面或首页快捷登录框，点击“忘记密码”，进入密码找回页面。</p>
      <img src="./img/mirror_reset_password.png"/>
      <img src="./img/find_password_1.png"/>
      <p>②  输入您的手机号或者邮箱。</p>
      <img src="./img/mirror_reset_password_1.png"/>
      <p>③  根据系统提示验证您的身份信息（若已实名认证需要验证实名信息）。</p>
      <img src="./img/mirror_reset_password_2.png"/>
      <p>④  重新设置您的密码，点击“下一步”后系统会自动跳转至登录页面。</p>
      <img src="./img/mirror_reset_password_3.png"/>
      <img src="./img/mirror_reset_password_4.png"/>
    </div>
  </div>
</template>
<style rel="stylesheet/scss" lang="scss">
  .about_custormer {
    text-align: left;
    .cus_title {
      font-size: 26px;
      color: #1B1E23;
      line-height: 58px;
      background-color: #F4F4F4;
      padding-left: 20px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
    }
    .group {
      .tit {
        font-size: 16px;
        font-weight: 600;
        color: #494949;
        line-height: 26px;
        /*margin-top: 30px;*/
      }
      p {
        font-size: 12px;
        color: #666666;
        line-height: 25px;
        margin-bottom: 10px;
      }
      img {
        width: 100%;
      }
      img:not(:last-child) {
        margin-bottom: 30px;
      }
    }

  }
</style>
