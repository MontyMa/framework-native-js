<template>
  <div class="shunt_page">
    <!--内容-->
    <ion-content>
      <ion-content12>
        <div class="shunt_cont">
          <div class="v_lay lay"></div>
          <div class="lay">
            <div class="imgbox "></div>
            <div class="txt">加载中...</div>
          </div>
        </div>
      </ion-content12>
    </ion-content>
    <!--脚-->
    <ion-footer></ion-footer>
  </div>
</template>

<script>
  export default{
    name: 'shunt',
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .shunt_page {
    .shunt_cont {
      height: 500px;
    }
    .v_lay {
      height: 100%;
    }
    .lay {
      display: inline-block;
      vertical-align: middle;
    }
    .imgbox {
      background: url("./img/loading.gif") no-repeat center center;
      width: 150px;
      height: 151px;
    }
    .txt {
      position: relative;
      color: #999;
      font-size: 14px;
      top: -30px;
    }
  }
</style>
