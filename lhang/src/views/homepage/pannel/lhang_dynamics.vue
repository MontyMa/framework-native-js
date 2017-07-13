<template>
  <div class="lhang_dynamic">
    <ion-content12>
      <div class="news-wrapper">
        <news title="网站公告" :news="news1"></news>
        <news title="行业资讯" :news="news2"></news>
        <news title="常见问题" :news="news3"></news>
      </div>
    </ion-content12>
  </div>
</template>

<script>
  import news from './news'
  export default {
    name: 'lhang_dynamic',
    data() {
      return {
        content: "宝宝是链行动态",
        news: [],
      }
    },
    components: {
      news,
    }, //这里注册
    methods: {},
    computed: {
      news1() {
        const t = this.news.filter(d => (d.iinfoType === '网站公告'));
        return {
          list_data: t.splice(0, 4),
          more_url: '#/help/bulletin'
        };
      },
      news2() {
        const t = this.news.filter(d => (d.iinfoType === '行业资讯'));
        return {
          list_data: t.splice(0, 4),
          more_url: 'http://blog.lhang.com/portal.php'
        };
      },
      news3() {
        const t = this.news.filter(d => (d.iinfoType === '常见问题'));
        if (t.length === 0) {
          return {
            list_data: [
              {
                theme: '',
                url: '#/help/service',
                newcreateTime: '04/01',
                infoTitle: '链行的交易模式和交易时间分别是？',
              },
              {
                theme: '',
                url: '#/help/how-c1',
                newcreateTime: '04/01',
                infoTitle: '如何实名认证？可以修改认证么？',
              },
              {
                theme: '',
                url: '#/help/how-recharge',
                newcreateTime: '04/01',
                infoTitle: '如何进行充值和充币？多久到账？',
              },
              {
                theme: '',
                url: '#/help/rate-description',
                newcreateTime: '04/01',
                infoTitle: '链行平台收手续费吗？相关资费情况如何？',
              },
            ],
            more_url: '#/help/bulletin'
          }
        }
        return {
          list_data: t.splice(0, 4),
          more_url: '#/help/bulletin'
        };
      },
      total() {
        const data = this.spotlatestvolumepricedata ?
          JSON.parse(this.spotlatestvolumepricedata) : '';
        if (data) {
          return data.data;
        }
        return 0;
      },
    },
    mounted() {
      //获取newslist
      lh_http('get', "info/infoList", {}).done(res => {
        //console.log(123, res)
        if (res.status) {
          let list = res.data.list;
//          endTime = endTime.replace(/\-/g, '/');
          list.forEach(elem => {
//            elem.newcreateTime = new Date(elem.createTime).Format('MM/dd');
            elem.newcreateTime = window.format(elem.createTime, 'MM/dd');
          });

          this.news = res.data.list;
        }
      })
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
  .lhang_dynamic {
    margin: 80px auto 40px;
    width: 1200px;
    height: 100%;
    .news-wrapper {
      overflow: hidden;
      zoom: 1;
      .news {
        float: left;
        width: 33.33%;
      }
    }

  }
</style>
