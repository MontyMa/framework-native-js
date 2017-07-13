<template>
  <div class="footer_common">
    <div v-if="true" class="content1">
      <div class="footer-links j_footer-links">
        <ul class="links">
          <li><a href="#/about/synopsis">关于链行</a></li>
          <li><a href="#/trading/btc/trade">快速交易</a></li>
          <li><a href="#/help/pact">用户协议</a></li>
          <li><a href="#/help/introduction">资产介绍</a></li>
          <li><a href="#/help/rate-description">费率说明</a></li>
          <li><a href="/api/rest_api.html">API文档</a></li>
          <!--暂时隐藏客户端-->
          <!--<li><a>客户端</a></li>-->
          <li><a href="#/help/bulletin">帮助中心</a></li>
          <li><a href="#/about/contact-us">联系我们</a></li>
        </ul>
        <div class="partner">
          <div class="partner_tit">合作伙伴</div>
          <div class="partner_box">
            <ul class="plinks">
              <li class="plinks_group">
                <div class="plinks_title">行业媒体</div>
                <ul class="plinks_list">
                  <li class="plinks_list_li"><a href="http://www.btcxun.cn" target="view_window" class="partner_1"></a>
                  </li>
                  <li class="plinks_list_li"><a href="https://www.btc123.com" target="view_window"
                                                class="partner_2"></a></li>
                  <li class="plinks_list_li"><a href="http://www.8btc.com" target="view_window" class="partner_3"></a>
                  </li>
                  <li class="plinks_list_li"><a href="https://www.sosobtc.com" target="view_window"
                                                class="partner_4"></a></li>
                  <li class="plinks_list_li"><a href="http://www.bitkan.com" target="view_window" class="partner_5"></a>
                  </li>
                </ul>
              </li>
              <li class="plinks_group">
                <div class="plinks_title">业内企业</div>
                <ul class="plinks_list">
                  <li class="plinks_list_li"><a href="http://radarwin.com" target="view_window" class="partner_6"></a>
                  </li>
                  <li class="plinks_list_li"><a href="http://cdci.radarwin.com" target="view_window"
                                                class="partner_7"></a></li>
                  <li class="plinks_list_li"><a href="https://www.hoopox.com" target="view_window"
                                                class="partner_8"></a></li>
                  <li class="plinks_list_li"><a href="http://www.btc.com" target="view_window"
                                                class="partner_16"></a></li>
                </ul>
              </li>
            </ul>
            <ul class="plinks">
              <li class="plinks_group">
                <div class="plinks_title">财经媒体</div>
                <ul class="plinks_list">
                  <li class="plinks_list_li"><a href="http://www.gongxiangcj.com" target="view_window"
                                                class="partner_9"></a></li>
                  <li class="plinks_list_li"><a href="http://www.caishiv.com" target="view_window"
                                                class="partner_10"></a></li>
                  <li class="plinks_list_li"><a class="partner_11"></a></li>
                  <li class="plinks_list_li"><a href="http://www.jinse.com/" target="view_window"
                                                class="partner_17"></a></li>
                </ul>
              </li>
              <li class="plinks_group">
                <div class="plinks_title">社&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;区</div>
                <ul class="plinks_list">
                  <li class="plinks_list_li"><a href="http://www.zcashfans.com" target="view_window"
                                                class="partner_12"></a></li>
                  <li class="plinks_list_li"><a href="http://ethfans.org" target="view_window" class="partner_13"></a>
                  </li>
                  <li class="plinks_list_li"><a href="http://www.etcfans.com" target="view_window"
                                                class="partner_14"></a></li>
                  <li class="plinks_list_li"><a href="https://bitcoin.org/en/" target="_blank" class="partner_15"></a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <p class="p_txt">币林网络科技（上海）有限公司旗下平台 © 2015 - 2017 lhang.com 沪ICP备16025000号</p>
          <ul class="safety_logo">
            <li>
              <a class="item_1" href="https://v.pinpaibao.com.cn/cert/site/?site=www.lhang.com&at=business"
                 target="_blank"></a>
            </li>
            <li>
              <a class="item_2"
                 href="http://218.242.124.22:8081/businessCheck/verifKey.do?showType=extShow&serial=9031000020160523103619000000833555-SAIC_SHOW_310000-20170523162200976149&signData=MEUCIDMbr0Zc/cNJzfOR2Q5MnjRTNqPksh3oNEQ/D7rYSBkRAiEA28eo4OmVOXBGPTQZURionVZon3JP9b/FF+7fpamc5TM="
                 target="_blank"></a>
            </li>
          </ul>
        </div>

      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .footer_common {
    text-align: center;
    width: 100%;
    .footer-links {
      background-color: #283138;
      padding: 100px 0 30px 0;
      .links {
        li {
          display: inline-block;
          vertical-align: middle;
          color: #93989b;
          a {
            cursor: pointer;
            color: inherit;
            &:hover {
              color: #0093F1;
            }
          }

          &:not(:last-child):after {
            content: '|';
            margin: 0 15px;
          }
        }
      }
    }
    .partner {
      margin-top: 30px;
      .partner_tit {
        font-size: 18px;
        color: #ffffff;
      }
    }
    .partner_box {
      margin-top: 20px;
      .plinks {
        display: inline-block;
        vertical-align: top;
        &:not(:last-child) {
          margin-right: 60px;
        }
      }
    }
    .plinks_group {
      font-size: 0;
      text-align: left;
      &:not(:last-child) {
        margin-bottom: 20px;
      }
      .plinks_title, .plinks_list {
        display: inline-block;
        vertical-align: middle;
      }
      .plinks_title {
        font-size: 14px;
        color: #93989b;
        margin-right: 20px;
      }

      .plinks_list_li {
        display: inline-block;
        vertical-align: middle;
        &:not(:last-child) {
          margin-right: 30px;
        }
        a {
          width: 80px;
          height: 30px;
          display: block;
          background-position: center center;
          background-repeat: no-repeat;
          &.partner_1 {
            background-image: url("./img/partner_2.png");
          }
          &.partner_2 {
            background-image: url("./img/partner_10.png");
          }
          &.partner_3 {
            background-image: url("./img/partner_16.png");
          }
          &.partner_4 {
            background-image: url("./img/partner_19.png");
          }
          &.partner_5 {
            background-image: url("./img/partner_28.png");
          }
          &.partner_6 {
            background-image: url("./img/partner_9.png");
          }
          &.partner_7 {
            background-image: url("./img/partner_27.png");
          }
          &.partner_8 {
            background-image: url("./img/partner_18.png");
          }
          &.partner_9 {
            background-image: url("./img/partner_20.png");
          }
          &.partner_10 {
            background-image: url("./img/partner_21.png");
          }
          &.partner_11 {
            background-image: url("./img/partner_22.png");
          }
          &.partner_12 {
            background-image: url("./img/partner_26.png");
          }
          &.partner_13 {
            background-image: url("./img/partner_25.png");
          }
          &.partner_14 {
            background-image: url("./img/partner_23.png");
          }
          &.partner_15 {
            background-image: url("./img/partner_24.png");
          }
          &.partner_16 {
            background-image: url("./img/partner_29.png");
          }
          &.partner_17 {
            background-image: url("./img/partner_30.png");
          }
        }
      }
    }
    .p_txt {
      font-size: 12px;
      color: #9B9B9B;
      line-height: 60px;
    }
    .safety_logo li {
      display: inline-block;
      &:not(:first-child) {
        margin-left: 10px;
      }
      a {
        display: inline-block;
        width: 80px;
        height: 30px;
        background-position: center center;
        background-repeat: no-repeat;
        &.item_1 {
          background-image: url("./img/safety_1.png");
        }
        &.item_2 {
          background-image: url("./img/safety_2.png");
        }
      }
    }
  }
</style>
