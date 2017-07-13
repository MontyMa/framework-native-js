<template>
  <div class="fixed_area" ref="j_fixed_area">
    <ul class="fixed_area_ul">
      <li><a href="http://q.url.cn/s/Wnafsym" target="_blank">&#xe616;</a></li>
      <li class="hover_list call">
        <span>&#xe604;</span>
        <div class="code_box">
          <div class="call_imgbox"></div>
          <div class="call_num">客服电话<br/>400-182-5855</div>
        </div>
      </li>
      <li class="hover_list wechart">
        <span>&#xe602;</span>
        <div class="code_box"><img src="./img/wechat_qr.png"></div>
      </li>
      <li @click="goTop" ref="j_go_top"><span>&#xe618;</span></li>
    </ul>
  </div>
</template>
<script>
  import $ from 'jquery';
  export default{
    data(){
      return {
        time: '15',
        scrollTop: 0
      }
    },
    computed: {
      getPath(){
        return this.$route.path;
      }
    },
    methods: {
      wacthScroll(){
        const fixed_area = this.$refs.j_fixed_area;
        window.addEventListener('scroll', () => {
          let $footer_links = $('.j_footer-links'), $footer_offset_top, $footer_top;

          if ($footer_links.offset() !== undefined) {
            $footer_offset_top = $footer_links.offset().top;
          }

          $footer_top = $footer_offset_top - document.body.scrollTop;
          fixed_area.style.marginTop = $footer_top <= 877 ? '-170px' : '170px';
        })
      },
      goTop(){
        //console.log(this.getPath);
        const SCROLLTOP = document.body.scrollTop || document.documentElement.scrollTop;
        let count = 0,
          max_count = 20;
        let interval = setInterval(() => {
          startRun();
        }, this.time);

        function startRun() {
          count++;
          if (count === max_count) {
            clearInterval(interval);
          }
          if (document.body.scrollTop) {
            document.body.scrollTop = -SCROLLTOP / max_count * count + SCROLLTOP
          } else {
            document.documentElement.scrollTop = -SCROLLTOP / max_count * count + SCROLLTOP
          }
        }
      },
    },
    mounted(){
      if (this.getPath === '/') this.wacthScroll();
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .fixed_area {
    position: fixed;
    top: 50%;
    margin-top: 170px;
    width: 50px;
    right: 20px;
    z-index: 50;
    transition: 300ms;
    .fixed_area_ul {
      .hover_list {
        position: relative;
        &:hover .code_box {
          display: block;
        }
        .code_box {
          position: absolute;
          width: 120px;
          height: 120px;
          display: none;
          background-color: #ffffff;
          top: -35px;
          left: -140px;
          border-radius: 3px;
          -webkit-box-shadow: 3px 0 24px 0 rgba(0, 0, 0, .3);
          -moz-box-shadow: 3px 0 24px 0 rgba(0, 0, 0, .3);
          box-shadow: 3px 0 24px 0 rgba(0, 0, 0, .3);
          &:after {
            content: '';
            display: block;
            border-top: 6px solid transparent;
            border-bottom: 6px solid transparent;
            border-left: 10px solid #ffffff;
            position: absolute;
            top: 45%;
            right: -10px;
          }
        }
        &.call .code_box {
          padding: 6px 18px;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
          .call_imgbox {
            width: 62px;
            height: 66px;
            display: inline-block;
            background: url("img/call_img.png") no-repeat center center;
          }
          .call_num {
            font-size: 12px;
            color: #494949;
            line-height: 18px;
          }
        }
      }
      li {
        line-height: 50px;
        cursor: pointer;
        background-color: #0093F1;
        border-radius: 2px;
        font-size: 40px;
        &:not(:last-child) {
          margin-bottom: 5px;
        }
        a, span {
          color: #ffffff;
        }
      }
    }
  }
</style>
