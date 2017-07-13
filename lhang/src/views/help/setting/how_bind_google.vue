<template>
  <div class="setting">
    <!--<div class="set_title">安全设置</div>-->
    <div class="box_wrap">
      <div class="group">
        <div>
          <div class="tit">3. 绑定谷歌验证</div>
          <div class="mod">3(1)  什么是谷歌验证？</div>
          <p>Google身份验证器可是一款动态口令验证工具，绑定谷歌验证器后，在进行相应的操作时就必须输入您手机上动态生成的谷歌验证码，校验通过后才能执行该操作，可以更好的保障您的账户和资金安全。</p>
          <div class="mod">3(2)  链行的谷歌验证类型？</div>
          <p>链行为用户提供登录、设置、资金三种操作的谷歌验证服务，即您可以设置（登录）谷歌验证、（设置）谷歌验证、（资金）谷歌验证，分别对应以下操作：</p>
          <ul class="ul_list">
            <li>(登录)谷歌验证，开启对应的安全策略后，您在登录时，输入账户和密码的同时，还需要输入您的登录谷歌验证码才能完成登录。</li>
            <li>(设置)谷歌验证，开启对应的安全策略后，您在修改链行的各类安全设置和安全策略时，需要校验您的设置谷歌验证码才能修改设置。</li>
            <li>(资金)谷歌验证，开启对应的安全策略后，您在进行资金提现时，在校验其他安全策略的基础上，还需要校验您的资金谷歌验码，通过校验才能进行资金提现，更好的保障您的资金安全。</li>
          </ul>
          <img src="./img/bind_google_1.png"/>
          <div class="mod">3(3)  如何设置使用谷歌验证？</div>
          <p>
            ① 在手机应用市场下载并安装谷歌验证器，安卓手机在安卓市场中搜索"谷歌身份验证器",或搜索Google Authenticator,iPhone手机在App Store中搜索Google Authenticator。</p>
          <p>下载链接：</p>
          <a class="google_app_link"
             href="http://shouji.baidu.com/software/3832652.html"><span>http://shouji.baidu.com/software/3832652.html</span>（Android）</a>
          <a class="google_app_link" href="https://itunes.apple.com/cn/app/google-authenticator/id388497605?mt=8"><span>http://shouji.baidu.com/software/3832652.html</span>（IOS）</a>
          <img src="./img/bind_google_2.png"/>
          <p>②  安装后在手机中打开该App，点击“开始”，进入添加账户页面。</p>
          <img src="./img/bind_google_3.png" style="width: auto"/>
          <p>在您设置谷歌密码的对应链行网站页面中，链行为您提供了对应的秘钥和二维码，您可以使用谷歌验证器扫该二维码码或手动将该秘钥输入。</p>
          <img src="./img/bind_google_4.png"/>
          <p>③  在APP中选择扫码条形码或者手动输入提供的秘钥（二选一即可，安卓手机可能无法直接使用扫码功能，您可以手动输入）。</p>
          <img src="./img/bind_google_5.png" style="width: auto"/>
          <p>④  完成绑定后，您的谷歌验证器中就会出现验证码，该验证码为动态变化。完成绑定后，如果您同时开启了对应的安全策略，那么下次进行对应的操作时您就需要输入该谷歌验证码进行校验。</p>
          <div class="mod">3(4)  谷歌验证对应的安全策略有哪些？</div>
          <p>绑定了谷歌验证器后，您就可以在安全策略中选择开启对应的安全策略，目前链行提供的对应安全策略有：修改设置验证策略、提现验证策略、登录验证策略。具体设置方法可以查看帮助中心-安全策略部分。</p>
          <img src="./img/bind_google_6.png"/>
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
