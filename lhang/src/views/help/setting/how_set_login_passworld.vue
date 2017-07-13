<template>
  <div class="setting">
    <div class="box_wrap">
      <div class="group_mod">
        <div class="tit">4. 登录密码</div>
        <div class="mod">登录密码是您登录链行平台的重要信息，是保障您在链行财产安全的重要凭证之一，请不要泄露给任何人，不要设置得过于简单，不要设置和其它平台一样的登录密码。</div>
        <div class="mod">您在登录时就已设置该密码，登录后您可以根据需要修改登录密码，修改方法如下：</div>
        <p class="txt">①  点击“个人中心”主菜单，进入个人中心页面，点击“安全设置”，点击登录密码修改，进入修改页面。</p>
        <img src="./img/password_setting_1.png"/>
        <p class="txt">②  输入旧密码和新密码，点击“确认重置”完成修改。</p>
        <img src="./img/password_setting_2.png"/>
        <p class="txt">如果忘记登录密码，可以通过点击登录页面的“忘记密码”进行找回，帮助文档见帮助中心-登录注册-找回密码。</p>
      </div>
    </div>
  </div>
</template>
<style rel="stylesheet/scss" lang="scss">
  .setting {
    text-align: left;
    .box_wrap {
      width: 740px;
    }
    .google_app_link {
      font-size: 12px;
      display: block;
      line-height: 30px;
      color: #666666;
      span {
        color: #0093F1;
      }
    }
    .ul_list {
      margin-left: 30px;
      color: #666666;
      font-size: 12px;
      line-height: 25px;
    }
    /*.set_title {*/
    /*font-size: 26px;*/
    /*color: #1B1E23;*/
    /*line-height: 58px;*/
    /*background-color: #F4F4F4;*/
    /*padding-left: 20px;*/
    /*-webkit-box-sizing: border-box;*/
    /*-moz-box-sizing: border-box;*/
    /*box-sizing: border-box;*/
    /*}*/
    .mod {
      color: #494949;
      line-height: 23px;
      font-size: 12px;
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
      img:not(:last-child) {
        margin-bottom: 30px;
      }
    }
    img {
      width: 100%;
    }
    .group_mod {
      margin-top: 10px;
      text-align: justify;
      &:not(:last-child) {
        margin-bottom: 30px;
      }
      .tit {
        font-size: 14px;
        color: #494949;
        line-height: 25px;
      }
      .txt {
        font-size: 12px;
        color: #666666;
        line-height: 20px;
      }
    }

  }
</style>
