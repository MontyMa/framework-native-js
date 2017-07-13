<template>
  <div class="setting">
    <!--<div class="set_title">安全设置</div>-->
    <div class="box_wrap">
      <div class="group_mod">
        <div class="tit">6. 安全策略</div>
        <p class="txt" style="line-height: 30px">
          在安全策略中，您可以灵活变更并组合出适合于自己的安全策略，用以保障您的信息、资金以及交易的安全性。登录验证、修改设置验证、交易验证以及提现验证等均可设置多种安全策略，理论上越是复杂的安全策略安全系数越高，建议根据您的需要进行安全策略配置。
        </p>
        <p class="txt" style="line-height: 30px">点击“个人中心”主菜单，进入个人中心页面，点击“安全策略”， 进入安全策略页面。</p>
        <img src="./img/strategy_1.png"/>
        <div class="mod" style="line-height: 30px">6(1)  登录验证安全策略</div>
        <p class="txt" style="line-height: 30px">
          该策略用于登录时的验证。
        </p>
        <p class="txt" style="line-height: 30px">
          ①	在安全策略页面点击修改登录验证，进入登录验证安全策略修改页面。
        </p>
        <img src="./img/strategy_2.png"/>
        <div class="mod" style="line-height: 30px">②   如果您绑定了（登录）谷歌验证器，那么可以选择两个登录安全策略：</div>
        <p class="txt" style="line-height: 30px">
          通过登录密码：登录时只验证登录密码<br/>通过登录密码+（登录）谷歌验证：登录时需要先验证登录密码，再验证（登录）谷歌验证。
        </p>
        <img src="./img/strategy_3.png"/>
        <div class="mod" style="line-height: 30px">6(2)  修改设置验证安全策略</div>
        <p class="txt" style="line-height: 30px">
          该策略用于您在修改设置时的验证，即您修改账户设置时需要通过对应的策略校验才能完成操作。<br/>①	在安全策略页面点击修改设置验证，进入登录验证安全策略修改页面。
        </p>
        <img src="./img/strategy_4.png"/>
        <div class="mod" style="line-height: 30px">②   修改设置验证策略默认使用手机短信校验，如果您设置了谷歌验证码，您可以选择三种安全策略：</div>
        <p class="txt" style="line-height: 30px">
          通过短信验证码：修改设置时验证您的手机短信。<br/>
          通过（设置）谷歌验证器：修改设置时验证您的（设置）谷歌验证码。<br/>
          通过短信验证码和（设置）谷歌验证器：修改设置时同时验证您的手机短信和（设置）谷歌验证码。
        </p>
        <img src="./img/strategy_5.png"/>
        <div class="mod" style="line-height: 30px">6(3)  交易验证安全策略</div>
        <p class="txt" style="line-height: 30px">
          该策略用于您进行买卖交易时的验证，即您在进行买卖交易操作时需要验证该策略。<br/>
          ①   安全策略页面点击修改交易验证，进入交易验证安全策略修改页面。
        </p>
        <img src="./img/strategy_6.png"/>

        <div class="mod" style="line-height: 30px">②   交易验证的安全策略是基于您设置的资金密码，您可以设置三种安全策略：</div>
        <p class="txt" style="line-height: 30px">
          不验证资金密码：即关闭该安全策略，在进行买卖交易时不需要输入您的资金密码。<br/>
          每两小时验证一次资金密码：即在您交易过程中，每两小时验证一次资金密码。<br/>
          每次都验证资金密码：每次进行交易买卖的操作，都需要输入资金密码。</p>
        <img src="./img/strategy_7.png"/>


        <div class="mod" style="line-height: 30px">6(4)  提现验证安全策略</div>
        <p class="txt" style="line-height: 30px">
          该策略用于您进行买卖交易时的验证，即您在进行买卖交易操作时需要验证该策略。<br/>
          ①   安全策略页面点击修改交易验证，进入交易验证安全策略修改页面。
        </p>
        <img src="./img/strategy_8.png"/>

        <div class="mod" style="line-height: 30px">②   提现验证根据资金密码、短信验证码、（资金）谷歌验证器三种安全设置，有三种安全策略：</div>
        <p class="txt" style="line-height: 30px">
          通过资金密码+短信验证码：提现时必须验证资金密码和手机短信验证码。<br/>
          通过资金密码+（资金）谷歌验证器：提现时必须验证资金密码和（资金）谷歌验证器。<br/>
          通过资金密码+短信验证码+（资金）谷歌验证器：提现时必须验证以上三种设置。</p>
        <img src="./img/strategy_9.png"/>
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
