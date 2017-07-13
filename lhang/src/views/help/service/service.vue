<template>
  <div class="service">
    <div class="ser_wrap">
      <div class="group">
        <div class="tit_mian">服务内容</div>
        <div class="tit">链行提供什么服务？</div>
        <p class="paragraph">
          链行（Lhang.com）是一家面向数字资产爱好者的资产交易与综合管理平台，目前链行已上线比特币（BTC）、零币（Zcash）、以太坊（ETH）和以太经典（ETC）四个数字资产品种，除此之外，链行也关注市场上其他有投资价值的、基于可信区块链的资产品种。经过严格的第三方尽调、评定，链行将陆续推出符合严格的评估体系的资产品种，助力用户进行更专业的数字化资产配置。
        </p>
        <p class="paragraph">
          链行基于自主研发的海量并发撮合引擎，采用多层安全架构设计、动态冷热钱包机制，以保证用户个人信息、交易信息以及网站的后台数据的安全性。平台将提供PC、web端、移动端、APP三个端口实现数字资产交易及其他增值服务等业务，此外，链行还为数字资产量化交易用户提供API接口服务，以及专业行情资讯服务。
        </p>
      </div>
      <div class="group">
        <div class="tit_mian">服务通道</div>
        <div class="tit">链行如何为用户提供贴心服务？</div>
        <p class="paragraph">
          链行现已开通客服热线电话<span>（400-182-5855）</span>、QQ群、微信交流群等服务，全方位、立体化地为用户提供优质、贴心的服务。
        </p>
      </div>
      <div class="group">
        <div class="tit_mian">服务特色</div>
        <div class="tit">链行平台的优势和特色是什么？</div>
        <p class="paragraph">
          链行为广大用户提供一个安全性、稳定性极高的交易平台，具有以下优势：
        </p>
        <ul class="list_ul">
          <li>撮合引擎性能优秀：链行目前的撮合性能水平约为3-4万笔每秒；链行下一代撮合引擎的研发工作也在进行中，下一代撮合引擎的性能目标为数十万笔每秒，最终目标是研发出没有性能瓶颈的撮合引擎;</li>
          <li>资金安全且稳定性极高：链行采用多层安全架构设计、动态冷热钱包机制，以保证用户个人信息、交易信息以及网站的后台数据的安全性;</li>
          <li>用户使用友好便捷：链行实现了便捷的一键下单功能，智能化的交易设计，在封闭的账户认证系统中，实现可视化的账户资金查询界面，保障账户及信息安全的同时，使交易明细一目了然；</li>
        </ul>

      </div>
      <div class="group">
        <!--<div class="tit_mian">服务特色</div>-->
        <div class="tit">链行如何确保交易的安全、快捷、稳定？</div>
        <p class="paragraph">
          链行参考了专业金融机构的安全设计理念，采用了多种先进的计算机技术，比如ssl加密传输、比特币离线存储、广域网负载均衡、分布式服务器集群等高新技术，确保交易的安全、快捷、稳定。
        </p>
      </div>
      <div class="group">
        <div class="tit">在链行，我的登录状态会保持多久？</div>
        <p class="paragraph">
          若用户30分钟内无任何操作，则系统会自动登出。
        </p>
      </div>
      <div class="group">
        <div class="tit">链行采用何种撮合算法？</div>
        <p class="paragraph">
          链行采用国际通用的价格优先，时间优先（进入撮合队列的时间）的算法规则进行撮合，优化了队列结构和CPU的处理算法，大大提高了撮合性能。
        </p>
      </div>
    </div>
  </div>
</template>
<style lang="scss" rel="stylesheet/scss">
  .service {
    text-align: left;
    /*.ser_title {*/
    /*font-size: 26px;*/
    /*color: #1B1E23;*/
    /*line-height: 58px;*/
    /*background-color: #F4F4F4;*/
    /*padding-left: 20px;*/
    /*-webkit-box-sizing: border-box;*/
    /*-moz-box-sizing: border-box;*/
    /*box-sizing: border-box;*/
    /*}*/
    .ser_wrap {
      .group {
        &:not(:last-child) {
          margin-bottom: 20px;
        }
      }
      .tit_mian {
        color: #494949;
        font-size: 16px;
        line-height: 30px;
        font-weight: 600;
      }
      .tit {
        color: #494949;
        font-size: 14px;
        line-height: 30px;

      }
      .paragraph, .list_ul li {
        text-indent: 2em;
        font-size: 12px;
        color: #666666;
        text-align: justify;
        line-height: 23px;
        span {
          color: #EF8037;
        }
        &:not(:last-child) {
          margin-bottom: 5px;
        }
      }
      .list_ul li {
        margin-left: 60px;
        text-indent: 0;
        list-style: disc;
      }
    }
  }
</style>



