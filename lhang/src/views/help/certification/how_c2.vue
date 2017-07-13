<template>
  <div class="certification">
    <div class="group">
      <div>
        <div class="tit">2. C2实名认证</div>
        <div class="mod" style="line-height: 30px">C2实名认证用于资金的提现业务，进行C2实名认证后，您的账户才可以进行资金的提现操作。进行C2认证的前提是完成了C1认证。</div>

        <p style="line-height: 30px">
          ①   点击“个人中心”主菜单进入个人中心页面，点击实名认证-认证，进入C2认证信息提交页面。
        </p>
        <img src="./img/c2_1.png"/>
        <p style="line-height: 30px">
          ②	根据页面要求提交您的身份证正反面和手持照片，提交后后台工作人员将会在工作日对您的身份信息进行人工审核，审核通过后即可完成C2认证。
        </p>
        <img src="./img/c2_2.png"/>
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
