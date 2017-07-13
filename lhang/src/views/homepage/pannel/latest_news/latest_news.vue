<template>
  <div class="latest_news">
    <ion-content12 class="content12">
      <ul class="main">
        <li>
          <div class="new_msg_icon">&#xe60d;</div>
          <div class="txt">最新消息：</div>
        </li>
        <li class="content">
          <div class="content_z" ref="content_z">
            <div class="sroll_list j_scroll" v-if="newlist.length>0" v-for="item in newlist" ref="j_scroll">
              <a :href="item._url">
                <span>{{item.infoTitle}}</span>
              </a>
            </div>
            <div v-if="newlist.length===0">---</div>
          </div>
        </li>
        <li>
          <a href="#/help/bulletin" class="more">更多...</a>
        </li>
      </ul>
    </ion-content12>
  </div>
</template>
<script>
export default {
  name: 'login_pannel',
  data() {
    return {
      newlist: [],
      //滚动设置默认时间
      timer: 3000
    }
  },
  components: {},
  computed: {},
  methods: {
    getNews() {

      lh_http('get', "info/typeList", {
        type: '网站公告'
      }).done(res => {
        let result_list = res.data.list.resultList;

        if (result_list.length === 0) return;

        result_list.forEach((elem, i) => {
          if (i >= 3) return;
          elem._url = `#/help/bulletin-page??pid=${elem.id}`;
          this.newlist.push(elem);
        });

        this.$nextTick(() => this.runScroll());
      })
    },
    //开始滚动
    runScroll() {
      let count = 1,
        _this = this,
        j_scroll = document.getElementsByClassName('j_scroll'),
        content_z = document.getElementsByClassName('content_z')[0],
        j_scroll_len = j_scroll.length,
        scrollheight = j_scroll[0].offsetHeight;

      function runInterval() {
        let interval = setInterval(function () {
          if (count === j_scroll_len) {
            count = 0;
          }
          content_z.style.marginTop = `-${count * scrollheight}px`;
          count += 1;
        }, _this.timer);
        //鼠标放上滚动条,就停止滚动
        $(j_scroll).on('mouseover', function () {
          clearInterval(interval);
        })
      }

      runInterval();
      //鼠标离开后继续滚动
      $(j_scroll).on('mouseout', function () {
        runInterval()
      });
    }
  },

  created() {
    this.getNews();
  },
  mounted() {
  },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
.latest_news {
  font-size: 14px;
  text-align: center;
  color: #494949;
  .content12 {
    line-height: 20px;
    padding: 10px 0;
  }
  .main {
    display: inline-block;
    li,
    .new_msg_icon,
    .txt {
      display: inline-block;
      vertical-align: middle;
    }
    .txt {
      margin-left: 3px;
    }
    .new_msg_icon {
      font-size: 20px;
      color: #0093F1;
      line-height: 18px;
    }
    .more {
      color: #0093F1;
      cursor: pointer;
    }
    .content {
      height: 20px;
      width: 300px;
      overflow: hidden;
      text-align: left;
    }
    .sroll_list {
      cursor: pointer;
      &:hover a {
        color: #0093F1;
      }
      a {
        color: inherit;
      }
    }
    .content_z {
      margin-top: 0;
      -webkit-transition: 1s;
      -moz-transition: 1s;
      -o-transition: 1s;
      transition: 1s;
    }
  }
}
</style>



