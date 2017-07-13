<template>
  <div class="about_custormer">
    <div class="group">
      <div class="tit">2. 如何注册</div>
      <p>①  进入链行首页，点击右上角注册按钮，进入注册页面。</p>
      <img src="./img/how_reg.png"/>
      <img src="./img/how_reg_2.png"/>
      <p>②  使用手机注册，输入您的手机号码，获取验证码并输入，拖动图片验证码，校验通过后点击“下一步”。</p>
      <img src="./img/mirror_reg_phone.png"/>
      <p>链行同时提供了邮箱注册渠道，使用邮箱注册则点击右上角“使用邮箱注册”进入邮箱注册页面。</p>
      <img src="./img/mirror_reg_mail.png"/>
      <p>③  进入设置登录密码页面，设置您的账户登录密码，密码必须由不少于7位的数字和字母组成。点击“完成注册”，就成功注册了链行账户。</p>
      <img src="./img/how_reg_3.png"/>
      <p>④  点击完成后，链行会提示您是否进行C1身份认证，C1实名认证是您在链行交易的前提，建议您选择去认证。</p>
      <img src="./img/how_reg_4.png"/>
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
