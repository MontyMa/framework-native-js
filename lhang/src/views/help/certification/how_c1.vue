<template>
  <div class="certification">
    <!--<div class="cer_title">实名认证</div>-->
    <div class="group">
      <div>
        <div class="tit">1. C1实名认证</div>
        <div class="mod" style="line-height: 30px">C1实名认证用于充值和交易，进行C1实名认证后，您的账户才可以进行充值和交易的操作。</div>
        <p style="line-height: 30px">
          ①	点击“个人中心”主菜单进入个人中心页面，点击实名认证-认证，进入C1认证信息填写页面。</p>
        <img src="./img/c1_1.png"/>

        <p style="line-height: 30px">
          ②	根据页面提示填写身份认证</p>
        <img src="./img/c1_2.png"/>

        <p style="line-height: 30px">
          ③	点击确认提交完成C1实名认证。</p>
      </div>
    </div>
  </div>
</template>
<style rel="stylesheet/scss" lang="scss">
  .certification {
    text-align: left;
    .mod {
      color: #494949;
      line-height: 23px;
      font-size: 12px;
    }
    /*.cer_title {
      font-size: 26px;
      color: #1B1E23;
      line-height: 58px;
      background-color: #F4F4F4;
      padding-left: 20px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
    }*/
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
  }
</style>
