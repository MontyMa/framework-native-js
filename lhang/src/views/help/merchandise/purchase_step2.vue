<template>
  <div class="merchandise">

    <div class="group">
      <div class="tit">2. 市价委托</div>
      <p style="line-height: 30px">
        市价委托是根据当前市场最优价格和您输入的CNY金额或BTC数量进行买入或卖出交易。当使用市价买入时，系统会根据您预留的数量在市场上从高到低进行扫单，直至交易的人民币用完为止。<br/>
        以市价买入BTC为例：<br/>
        买入时您只需要输入希望买入的交易额CNY数量，比如我希望使用账户中的8000CNY作为交易额，输入交易额时，系统会提示您，根据当前的市场价格预估会买入的BTC数量（此数量仅为预估值，请以实际成交量为准），点击“买入”按钮，则完成该笔市价委托的提交。委托后系统会以市场最优价寻找对手单并成交至该笔金额用完为止。<br/>
        您可以在交易页面下方或专门的委托记录页面查看您的当前委托和历史委托记录。当前委托即表示该笔委托尚在未成交，您可以点击撤销操作撤销该笔委托，历史委托则是已撤销或已成交的委托。</p>
      <img src="./img/merchandise_6.png"/>
      <img src="./img/merchandise_7.png"/>
    </div>
    <!--<div class="group_mod">
      <div class="tit">3. 止盈止损委托</div>
      &lt;!&ndash;<div class="mod" style="line-height: 30px">限价委托是设置委托买入或卖出的价格和数量进行委托交易的方式。</div>&ndash;&gt;
      <p class="txt" style="line-height: 30px">
        止盈止损委托指预先设置止盈触发价和止盈委托价、止损触发价和止损委托价。当最新的市场成交价格达到某一触发价格时，系统会自动根据对应的委托价格形成委托单，最终形成止盈触发或止损触发的委托单。<br/>
        做多止盈止损示例：如果以6000元的价格买入2个BTC，投资者认为价格涨到6500为一个重要阻力位，则设置止盈触发价位6500，为了保障能够在该价格时顺利卖出自己的BTC，同时设置了止盈委托价位6490，确保自己的盈利。同时为了止损保障，投资者认为5500位重要的支持位，故设置市价跌破5500时，以此为触发价，按照5500的委托价进行卖出止损。
      </p>
      <img src="./img/merchandise_8.png"/>


      <p class="txt" style="line-height: 30px">
        做空止盈止损示例：投资者以7000元卖出1个BTC，获得7000元人民币。投资者认为价格为6000时为重要支撑位，将6000设为止盈触发价，并在6000时设置委托价为6005，以7000元买入BTC，可以买入更多BTC。同时可以根据情况设置对应的止损触发价和委托价。
      </p>
      <img src="./img/merchandise_9.png"/>
    </div>-->

    <!--<div class="group_mod">
      <div class="tit">4. 计划委托</div>
      <p class="txt" style="line-height: 30px">
        计划委托是预先设置委托的触发价格，当最新的成交价格达到事先设定的触发价格时，即会将事先设置的委托方式（限价或市价）进行委托挂单。<br/>
        计划委托可以分为计划市价单和计划限价单，计划市价单是指在市场最新价格触发您设置的触发价格时，按照您提交的金额或数量挂出市价委托单。计划限价单是指在市场最新价格触发您设置的触发价格时，按照您提交的金额或数量、限价挂出限价委托单。<br/>
        做多计划委托示例：<br/>
        当前BTC价格为6000元，投资者认为6500为重要阻力位，突破该位点后价格将迎来大幅上涨，则可以设置计划委托为：</p>
      <img src="./img/merchandise_10.png"/>


      <p class="txt" style="line-height: 30px">
        当价格触发时会以6501挂限价单。<br/>
        做空计划委托示例：<br/>
        当前BTC价格为6000元，投资者认为5500为重要支撑位，突破该位点后价格将迎来大幅下跌，则可以设置计划委托为</p>
      <img src="./img/merchandise_11.png"/>
    </div>-->
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

