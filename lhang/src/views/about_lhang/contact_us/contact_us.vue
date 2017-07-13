<template>
  <div class="contact_us">
    <img class="map_img" src="./img/map_us.png">
    <div class="contact_information">
      <ul class="social lay">
        <li class="list list_1">中国（上海）自由贸易实验区加太路39号1幢楼2层45室</li>
        <li class="list list_2">400-182-5855</li>
        <li class="list list_3">services@lhang.com</li>
        <li class="list list_4">企业QQ：4001825855<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;官方QQ群：151591368
        </li>
        <li class="list list_5">链行微博： http://weibo.com/u/6011181205</li>
      </ul>
      <div class="QR_code lay">
        <div class="QR_code_wrap">
          <ul>
            <li class="imgbox img1"></li>
            <li class="tip">链行微信订阅号</li>
          </ul>
          <ul>
            <li class="imgbox img2"></li>
            <li class="tip">链行微信服务号</li>
          </ul>
        </div>
        <p class="txt">官方微信交流群：请加客服微信（微信号：lianhang2015），由客服邀请加入</p>
      </div>
    </div>
  </div>
</template>
<style lang="scss" rel="stylesheet/scss">
  .contact_us {
    text-align: left;
    .map_img {
      max-width: 100%;
    }
    .contact_information {
      font-size: 0;
      padding-top: 20px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      .lay {
        display: inline-block;
        vertical-align: middle;
        width: 50%;
        font-size: 14px;
        color: #494949;
        .list {
          line-height: 18px;
          &:before {
            content: '';
            display: inline-block;
            vertical-align: top;
            width: 18px;
            height: 18px;
            margin-right: 15px;
            background-position: center center;
            background-repeat: no-repeat;
          }
          &:not(:last-child) {
            margin-bottom: 20px;
          }
        }
        .list_1:before {
          background-image: url("./img/site.svg");
        }
        .list_2:before {
          background-image: url("./img/Tel.png");
        }
        .list_3:before {
          background-image: url("./img/mail.svg");
        }
        .list_4:before {
          background-image: url("./img/qq.svg");
        }
        .list_5:before {
          background-image: url("./img/weibo.svg");
        }
      }
      .QR_code {
        text-align: center;
        .QR_code_wrap {
          ul {
            display: inline-block;
            vertical-align: middle;
            margin-right: 60px;
          }
          .imgbox {
            width: 120px;
            height: 120px;
            background-repeat: no-repeat;
            background-position: center center;
          }
          .img1 {
            background-image: url("./img/WechatIMG5.png");
          }
          .img2 {
            background-image: url("./img/WechatIMG6.png");
          }
          .tip {
            /*margin-top: 10px;*/
          }
        }
        .txt {
          margin-top: 20px;
        }
      }
    }
  }
</style>
