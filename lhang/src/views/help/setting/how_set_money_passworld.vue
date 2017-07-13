<template>
  <div class="setting">
    <div class="box_wrap">
      <div class="group_mod">
        <div class="tit">5. 资金密码</div>
        <p class="txt">
          资金密码可以用于您的账户资金变动（交易和提现）的安全策略，设置资金密码并开启对应安全策略后，在进行对应操作时必须验证资金密码。
        </p>
        <div class="mod">5(1)  如何设置和修改资金密码？</div>
        <p class="txt">
          点击“个人中心”主菜单，进入个人中心页面，点击“安全设置”，可以看到底部是资金密码状态栏，您可以在这里设置和修改您的资金密码。设置和修改资金密码都需要验证您的手机绑定。
        </p>
        <img src="./img/money_password.png"/>
        <div class="mod">5(2)  资金密码涉及哪些安全策略？</div>
        <p class="txt">
          资金密码关系到您的交易和提现安全策略。<br/>您可以设置对应的交易安全策略为验证资金密码、不验证资金密码、每2小时验证一次资金密码。提现策略中，资金密码是必选选。您在对账户进行资金提现操作时必须验证资金密码。具体帮助文档见帮助中-安全设置-安全策略。
        </p>
        <img src="./img/money_password_1.png"/>
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
