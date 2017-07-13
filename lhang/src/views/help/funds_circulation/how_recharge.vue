<template>
  <div class="funds_circulation">
    <!--<div class="funds_title">充值提现</div>-->
    <div class="group">
      <div class="tit">1. 如何充值</div>
      <div class="mod" style="line-height: 30px">充值的前提条件：注册并完成C1实名认证</div>
      <p style="line-height: 30px">
        人民币充值方式对比：
      </p>
      <img src="./img/recharge_1.png"/>

      <div class="mod" style="line-height: 30px">银行卡和支付宝汇款充值教程：</div>
      <p style="line-height: 30px">
        ①	点击“资产管理”主菜单，选择充值充币-人民币充值-银行卡汇款或支付宝汇款，进入汇款页面。
      </p>
      <img src="./img/recharge_2.png"/>

      <p style="line-height: 30px">
        ②	选择您绑定过的银行卡账号或支付宝账户，也可点击添加新的账户。
      </p>
      <img src="./img/recharge_3.png"/>


      <p style="line-height: 30px">
        ③	输入您的充值金额，只能输入整数。注意：系统自动为您生成了两位小数，您在转账时汇款金额务必要包含这两位小数，方便充值审核快速到账。
      </p>
      <img src="./img/recharge_4.png"/>


      <p style="line-height: 30px">
        ④	输入到账通知手机号码，当该笔充值审核通过到账时会向该号码发送通知短信。
      </p>
      <img src="./img/recharge_5.png"/>


      <p style="line-height: 30px">
        ⑤	点击“生成充值申请”按钮，出现汇款申请单弹窗。
      </p>
      <img src="./img/recharge_6.png"/>

      <p style="line-height: 30px">
        ⑥	打开您的银行卡网银或支付宝，向汇款单中提示的银行或支付宝账户中汇款。<br/>
        <span style="color: #F20000">注意</span>：为保障快速到账请在汇款时的转账金额中包涵系统生成的小数位；银行卡汇款尽量按照提示填写备注信息，收款方账户名为“上海焱钰电子商务有限公司”，“焱”字包含三个“火”。
      </p>

      <p style="line-height: 30px;margin-top: 45px">
        <span style="font-weight: 600; font-size: 14px">相关问题：充值充币多久到账？</span><br/>
        人民币充值处理时间：每天9:00-22:00，链行会在收到汇款后于2小时内为您入账。<br/>
        数字资产充值需要网络节点的确认。到账时间一般是10分钟-60分钟之间。
      </p>
      <p style="line-height: 30px;margin-top: 45px">
        <span style="font-weight: 600; font-size: 14px">数字货币充值/充币教程（以比特币为例）：</span><br/>
        ①点击“资产管理”主菜单，选择充值充币-BTC充币，进入充币申请页面。<br/>
        <img src="./img/recharge_7.png"/>
        ②页面中已展示了您在链行的BTC钱包地址，复制或扫码地址到您自己的比特币钱包应用，使用您的个人钱包向该地址转币即可，BTC到账至少需要4个区块确认。一般到账时间是10分钟-60分钟。<br/>
        ③转币过程中发生的网络手续费（给矿工的区块打包费）已被您的个人钱包自动收取，为保证到账速度，请根据您对到账速度的需求选择合适的区块网络手续费费用。
      </p>

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

    img {
      width: 100%;
    }
    .group {
      .tit {
        font-size: 16px;
        font-weight: 600;
        color: #494949;
        line-height: 26px;
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

