<template>
  <div class="about_custormer">
    <!--<div class="cus_title">登录注册</div>-->
    <div class="group">
      <div class="tit">1. 如何登录</div>
      <p>①  在首页点击右上角登录按钮进入登录页面，输入账户名或密码进行登录，或者直接在首页右部快捷登录框中输入账户密码进行登录。</p>
      <img src="./img/how_login_1.png"/>
      <img src="./img/how_login_2.png"/>
      <p>②  输入您的账户名和密码后，点击登录按钮即可进入登录状态，如果您设置的登录策略为登录密码+谷歌验证，则在输入账户密码点击登录后，需要再次输入您的登录谷歌验证码。</p>
      <img src="./img/how_login_3.png"/>
      <img src="./img/how_login_4.png"/>
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
