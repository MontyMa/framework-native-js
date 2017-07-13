<template>
  <div class="setting">
    <div class="box_wrap">
      <div class="group">
        <div>
          <div class="tit">1. 绑定手机</div>
          <div class="mod">如果您是使用手机注册账户，则默认就是绑定的您注册的手机号码。这个时候您可以选择修改手机绑定。</div>
          <p>①	点击“个人中心”主菜单，进入个人中心页面，点击“安全设置”，点击手机绑定修改，进入修改手机绑定页面。</p>
          <img src="./img/bind_phone_1.png"/>
          <p>②	修改手机绑定需要通过验证码验证您原来的手机号码和新的手机号码，完成校验后点击“确认修改”按钮完成修改。</p>
          <img src="./img/bind_phone_2.png"/>
          <div class="mod">如果您是邮箱注册的账户，尚未绑定过手机号码，建议您尽量绑定您的手机号，方便用于及时通知。</div>
          <p>①	点击“个人中心”主菜单，进入个人中心页面，点击“安全设置”，点击手机绑定，进入手机绑定页面。</p>
          <img src="./img/bind_phone_3.png"/>
          <p>②	绑定手机需要您输入手机号码并对进行验证码校验，输入完整后，点击“确认绑定”按钮，即可完成手机绑定。</p>
          <img src="./img/bind_phone_4.png"/>
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
