<template>
  <div class="news">
    <div class="news_title">媒体报道</div>
    <div class="news_cont">
      <div class="group">
        <div class="imgbox img1"></div>
        <ul class="cont">
          <li class="title">交易所竞争加剧，主打高性能系统和智能交易的链行能否突出重围？</li>
          <li class="txt">面对市场月来预期激烈的急症，是否还能大飞机已我不不服面对市场月来预期激烈的急症，是否还能大飞机已我不不服面对市场月来预期激烈的急症，是否还能大飞机已我不不服...</li>
          <li class="time">2017年2月23日</li>
        </ul>
      </div>
      <div class="group">
        <div class="imgbox img1"></div>
        <ul class="cont">
          <li class="title">交易所竞争加剧，主打高性能系统和智能交易的链行能否突出重围？</li>
          <li class="txt">面对市场月来预期激烈的急症，是否还能大飞机已我不不服面对市场月来预期激烈的急症，是否还能大飞机已我不不服面对市场月来预期激烈的急症，是否还能大飞机已我不不服...</li>
          <li class="time">2017年2月23日</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style lang="scss" rel="stylesheet/scss">
  .news {
    text-align: left;
    font-size: 0;

    .news_title {
      font-size: 26px;
      color: #1B1E23;
      line-height: 58px;
      background-color: #F4F4F4;
      padding-left: 20px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
    }
    .group {
      margin: 15px 0 30px 0;
      position: relative;
      .imgbox {
        width: 90px;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-repeat: no-repeat;
        background-position: center center;
      }
      .img1 {
        background-image: url("./img/timg.png");
      }
      .cont {
        height: 90px;
        overflow: hidden;
        margin-left: 110px;
        .title {
          font-size: 16px;
          color: #494949;
          line-height: 25px;
        }
        .txt {
          font-size: 12px;
          color: #666;
          padding: 0 0 15px 0;
          box-sizing: border-box;
        }
        .time {
          font-size: 12px;
          color: #999999;
        }
      }
    }
  }
</style>
