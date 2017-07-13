<template>
  <div class="setting">
    <!--<div class="set_title">安全设置</div>-->
    <div class="box_wrap">
      <div class="group">
        <div>
          <div class="tit">2. 绑定邮箱</div>
          <div class="mod">如果您是手机注册用户，尚未绑定邮箱，可以选择绑定您的常用邮箱。链行暂时不提供绑定邮箱修改业务。</div>
          <p>①	点击“个人中心”主菜单，进入个人中心页面，点击“安全设置”，点击邮箱绑定，进入邮箱绑定页面。</p>
          <img src="./img/bind_email_1.png"/>
          <p>②	输入您的邮箱地址并获取验证码，完成后点击“确认绑定”，完成邮箱绑定。</p>
          <img src="./img/bind_email_2.png"/>
        </div>
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
