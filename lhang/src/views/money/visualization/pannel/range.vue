<template>
  <div class="vis_modules_gap">
    <ul class="vis_title">
      <li class="vis_line"></li>
      <li class="vis_txt">
        <div class="vis_txt_tit">您的操盘头衔</div>
        <div class="vis_txt_icon">
          <span>&#xe658;</span>
          <div class="hover_content_box">
            <div class="hover_content">
              根据您的交易频率、资产占比、交易额度计算出您的操盘风格，所有数据更新至上一日的24：00
            </div>
          </div>
        </div>
      </li>
      <li class="vis_line"></li>
    </ul>
    <div class="range">
      <template v-if="empty">
        <div class="no_data">您还没有操盘头衔</div>
      </template>
      <template v-else="empty">
        <ul class="lay">
          <li v-for="item in one_group">
            <div class="img_box" :class="item.operateType"></div>
            <p>{{item.operateName}}</p>
          </li>
        </ul>
        <ul class="lay">
          <li v-for="item in two_group">
            <div class="img_box" :class="item.operateType"></div>
            <p>{{item.operateName}}</p>
          </li>
        </ul>
        <ul class="lay">
          <li v-for="item in three_group">
            <div class="img_box" :class="item.operateType"></div>
            <p>{{item.operateName}}</p>
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'range',
    data(){
      return {
        one_group: [],
        two_group: [],
        three_group: [],
        empty: false
      }
    },
    methods: {
      allotData(group, elem){
        group.push({
          operateType: `img_${elem.operateType}`,
          operateName: elem.operateName
        });
      },
      getResData(res){
        //console.log(res);
        if (res.length === 0) {
          this.empty = true;
          return;
        }

        if (this.empty) this.empty = false;

        let _this = this;
        let one_arr = [4, 3, 2],
          two_arr = [6, 5],
          three_arr = [1, 0];

        res.forEach((ele, i) => {
          if (i > 2)return;

          let operate_type = ele.operateType;

          if (one_arr.indexOf(operate_type) >= 0) {
            _this.allotData(_this.one_group, ele);
          }
          if (two_arr.indexOf(operate_type) >= 0) {
            _this.allotData(_this.two_group, ele);
          }
          if (three_arr.indexOf(operate_type) >= 0) {
            _this.allotData(_this.three_group, ele);
          }
        })
      },
      runRequest(){
        let url = 'customerAsset/queryHaiLunTitle';

        lh_http('get', url, {}).done(res => this.getResData(res.data.haiLunTiTle))
      }
    },
    mounted(){
      this.runRequest();
    }

  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  /*操盘头衔*/
  .vis_modules_gap {
    .vis_txt_tit {
      vertical-align: top;
      display: inline-block;
      line-height: 25px;
    }

    .hover_content_box {
      position: absolute;
      display: none;
      text-align: justify;
      bottom: 25px;
      width: 240px;
      left: 50%;
      -webkit-transform: translateX(-120px);
      -moz-transform: translateX(-120px);
      -ms-transform: translateX(-120px);
      -o-transform: translateX(-120px);
      transform: translateX(-120px);
      font-size: 12px;
      .hover_content {
        padding: 8px;
        border-radius: 2px;
        color: #666;
        border: 0.5px solid #999;
        background-color: #fefedc;
        position: relative;
        &:after {
          content: '';
          display: block;
          width: 10px;
          height: 10px;
          position: absolute;
          bottom: -5px;
          background-color: #fefedc;
          border-right: 1px solid #999;
          border-bottom: 1px solid #999;
          left: 50%;
          margin-left: -5px;
          -webkit-transform: rotate(45deg);
          -moz-transform: rotate(45deg);
          -ms-transform: rotate(45deg);
          -o-transform: rotate(45deg);
          transform: rotate(45deg);
        }
      }
    }
    .vis_txt_icon {
      font-size: 16px;
      display: inline-block;
      vertical-align: top;
      cursor: pointer;
      position: relative;
      &:hover {
        .hover_content_box {
          display: block;
        }
      }
    }
  }

  .range {
    font-size: 0;
    margin-top: 60px;
    .no_data {
      text-align: center;
      font-size: 14px;
      background-color: #f0f0f0;
      padding: 30px 0;
      margin-top: -40px;
    }
    .lay {
      width: 33.333333%;
      display: inline-block;
      vertical-align: top;
      font-weight: 600;
      color: #666666;
      font-size: 26px;
      li {
        margin-bottom: 30px;
      }
      .img_box {
        width: 150px;
        height: 150px;
        display: inline-block;
        background-position: center;
        background-repeat: no-repeat;

        &.img_4 {
          background-image: url("../img/range1.png");
        }
        &.img_6 {
          background-image: url("../img/range2.png");
        }
        &.img_3 {
          background-image: url("../img/range4.png");
        }
        &.img_1 {
          background-image: url("../img/range3.png");
        }
        &.img_5 {
          background-image: url("../img/range5.png");
        }
        &.img_0 {
          background-image: url("../img/range6.png");
        }
        &.img_2 {
          background-image: url("../img/range7.png");
        }
      }
    }
  }
</style>
