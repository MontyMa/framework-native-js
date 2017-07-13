<template>
  <div class="merchandise">
    <div class="group">
      <div class="tit">1. 限价委托</div>
      <div class="mod" style="line-height: 30px">限价委托是设置委托买入或卖出的价格和数量进行委托交易的方式。</div>
      <p style="line-height: 30px">
        ①   点击“快速交易”或“专业交易”，进入交易页面，选择币种后选择交易类型为“限价委托”。</p>
      <img src="./img/merchandise_1.png"/>
      <img src="./img/merchandise_2.png"/>
      <p style="line-height: 30px">
        ②   输入您希望委托的限制价格，输入委托的数量，拖动快捷滚动条可以快速根据您的资产数量设置对应比例的交易数量。完成交易验证安全策略后，点击“买入”或“卖出”，提交该笔委托交易。</p>
      <img src="./img/merchandise_3.png"/>

      <p style="line-height: 30px">
        ③   您可以在交易页面下方或专门的委托记录页面查看您的当前委托和历史委托记录。当前委托即表示该笔委托尚在未成交，您可以点击撤销操作撤销该笔委托，历史委托则是已撤销或已成交的委托。</p>
      <img src="./img/merchandise_4.png"/>
    </div>
  </div>
</template>
<style rel="stylesheet/scss" lang="scss">
  .merchandise {
    text-align: left;
    .mod {
      color: #494949;
      line-height: 23px;
      font-size: 12px;
    }
    /*.mer_title {*/
    /*font-size: 26px;*/
    /*color: #1B1E23;*/
    /*line-height: 58px;*/
    /*background-color: #F4F4F4;*/
    /*padding-left: 20px;*/
    /*-webkit-box-sizing: border-box;*/
    /*-moz-box-sizing: border-box;*/
    /*box-sizing: border-box;*/
    /*}*/
    img {
      width: 100%;
    }
    .group {
      .tit {
        font-size: 16px;
        /*margin-top: 20px;*/
        font-weight: 600;
        color: #494949;
        line-height: 30px;
        margin-bottom: 10px;
      }
      p {
        font-size: 12px;
        color: #666666;
        line-height: 25px;
      }

      img {
        margin-bottom: 30px;
      }
    }
    .group_mod {
      margin-top: 10px;
      text-align: justify;
      &:not(:last-child) {
        margin-bottom: 30px;
      }
      .tit {
        font-size: 16px;
        color: #494949;
        font-weight: 600;
        margin-top: 20px;
        line-height: 25px;
      }
      .txt {
        font-size: 12px;
        color: #494949;
        line-height: 20px;
      }
    }
  }
</style>
