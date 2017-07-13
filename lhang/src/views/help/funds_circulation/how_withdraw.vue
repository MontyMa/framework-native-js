<template>
  <div class="funds_circulation">
    <div class="group">
      <div class="tit">2. 如何提现</div>
      <div class="mod" style="line-height: 30px">提现的前提：注册、绑定手机或谷歌验证码、设置资金密码、设置提现验证安全策略、完成C2实名认证、添加对应的提现账户。</div>
      <div class="mod" style="line-height: 30px; margin-top: 25px">数字货币提现/提币教程（以比特币为例）：</div>
      <p style="line-height: 30px">
        ①   点击“资产管理”主菜单，选择提现提币-BTC提币，进入提币申请页面。
      </p>
      <img src="./img/withdraw_1.png"/>
      <p style="line-height: 30px">
        ②   选择您添加过的提币地址（没有可以点击添加地址）和提币数量，并选择网络手续费（给矿工的区块打包费，手续费目前6档可选，手续费越高区块确认越快，您可以根据需要进行选择），校验您的提现验证安全策略内容，最后点击按钮“确定提币”，则成功提交申请。
      </p>
      <img src="./img/withdraw_2.png"/>

      <p style="line-height: 30px">
        ③   提交后等待财务审核，审核通过后经区块确认会自动到账。提现额度参看 帮助中心-费率说明。
      </p>

      <p style="line-height: 30px">
        <span style="font-weight: 600;font-size: 14px;">人民币提现教程：</span><br/>
        ①   点击“资产管理”主菜单，选择提现提币-人民币提现，进入提现申请页面。</p>
      <img src="./img/withdraw_3.png"/>


      <p style="line-height: 30px">
        ②选择您添加过的银行卡账号（没有可以点击添加，一定要实名认证本人的账户，否则无法提现）和提现金额，校验您的提现验证安全策略内容，最后点击按钮“确定提现”，则成功提交申请。
      </p>
      <img src="./img/withdraw_4.png"/>

      <p style="line-height: 30px">
        ③提交后等待财务审核。如果财务人员发现您的账户提现异常，会联系您进行C3身份认证，确认身份后才会打款。提现额度和提现手续费参看 帮助中心-费率说明。
      </p>
      <p style="line-height: 30px">
        <span style="font-size: 14px;font-weight: 600; ">相关问题：提现多久到账？</span><br/>
        人民币提现正常24小时内到账，具体到账时间因收款银行略有不同。<br/>
        数字资产提现会在您申请提币的24个小时内为您处理。</p>
    </div>
  </div>
</template>
<style rel="stylesheet/scss" lang="scss">
  .funds_circulation {
    text-align: left;
    .mod {
      color: #494949;
      line-height: 23px;
      font-size: 12px;
    }
    /*.funds_title {
      font-size: 26px;
      color: #1B1E23;
      line-height: 58px;
      background-color: #F4F4F4;
      padding-left: 20px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
    }*/
    img {
      width: 100%;
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

  }
</style>
