<template>
  <div id="app">
    <ion-header></ion-header>
    <router-view class="app_main"></router-view>
    <!--<ion-content12>-->
    <!--悬浮窗-->
    <fixed-area></fixed-area>
    <!--</ion-content12>-->
    <!--<div style="position: absolute; height: 500px;width: 500px;background: red;z-index: 999999999;">sdfafasfasfsa</div>-->
    <div class="shadow_container" v-if="showShdow">
      <div class="shadow_box_new">
        <div class="close_btn" @click="closeShadow()">&times;</div>
        <div class="shadow_content">
          <h2>有关ZEC价格波动异常提醒</h2>
          <p class="p1">近期受交易市场整体环境影响，ZEC价格波动频繁，请各位投资者做好风险 防范工作，提高风险意识，合理控制资金和交易风险，理性交易！</p>
          <p class="p1">链行提醒您：请您在自身能承受的风险范围内参与数字资产交易，不要投入 超过您风险承受能力的资金，严禁任何恶意操控市场的行为！严禁洗钱、倒 汇、非法集资等违法犯罪行为</p>
          <p class="p2">链行运营部</p>
          <p class="p2">2017.06.30</p>
          <button class="my_btn" @click="closeShadow()">知道了</button>
        </div>
      </div>
    </div>
    <div class="shadow_container" v-if="showShdow2">
      <div class="shadow_box_new">
        <div class="close_btn" @click="closeShadow2()">&times;</div>
        <div class="shadow_content">
          <h2>有关ZEC价格涨幅过高友情提醒</h2>
          <p class="p1">近期受交易市场整体环境影响，ZEC价格上涨已超过20%，请各位投资者理性 投资，切勿因ZEC价格涨幅过高而盲目追涨，做好风险防范工作，提高风险 意识，合理控制资金和交易风险。</p>
          <p class="p1">链行提醒您：请您在自身能承受的风险范围内参与数字资产交易，不要投入 超过您风险承受能力的资金，严禁任何恶意操控市场的行为！严禁洗钱、倒 汇、非法集资等违法犯罪行为。</p>
          <p class="p2">链行运营部</p>
          <p class="p2">{{myDate}}</p>
          <button class="my_btn" @click="closeShadow2()">知道了</button>
        </div>
      </div>
    </div>
    <shadow-box v-if="isshowModal"></shadow-box>
  </div>
</template>

<script>
  import shadowBox from '../../components/shadowBox';
//  import {mapGetters} from '../../../../../vuex';

  export default {
    name: 'app',
    data() {
      return {
        isshowModal: false, //是否显示遮罩层
        showShdow: false,
        showShdow2: false,
        myDate: '',
        timer: null,
      }
    },
    components: {
      shadowBox
    },
    computed: {
      isLogged() { //获得是否登录的状态
        return this.$store.getters.isLogged;
      },
      isShow() {
        this.isshowModal = this.$store.getters.showShadowBox;
      },
      zecChange() {
        //				setInterval(()=>{
        return this.$store.getters.zecChange;
        //				}, 1000)
      }
    },
    watch: {
      isLogged(val) {
        if (!val) {
          this.$router.push({
            path: '/'
          })
        }
      },
      isShow(val) {
        this.isshowModal = val;
      },
      '$route' (to, from) {
        let path = to.path.split('/')[1] ? to.path.split('/')[1] : '/';
        this.verificationLogin(path)
      },
    },
    methods: {
      verificationLogin(path) {
        window.cookie().delay('user');
        var noVerification = {
          '/': true,
          'help': true,
          'about': true, //关于链行和联系我们
          'reg': true,
          'findpassword': true,
          'shunt': true,
          'invite': true,
        };

        function verification() {
          if (cookie().status('user')) {
            return false;
          }
          if (noVerification[path])
            return false;
          else
            return true;
        }

        // 对路由变化作出响应...
        if (verification()) {
          if (!this.isLogged) {
            this.$router.push({
              path: '/login'
            })
          }
        }
      },
      closeShadow() {
        this.showShdow = false;
        cookie().rememberAccount('notice1', 'false')
      },
      closeShadow2() {
        this.showShdow2 = false;
        clearInterval(this.timer);
        cookie().rememberAccount('notice1', 'false')
        cookie().rememberAccount('notice2', 'false')
      },
      fillZero(n) {
        return n > 9 ? n : '0' + n;
      },
      showNotice() {
        let num = parseFloat(this.zecChange);
        if (cookie().get('notice1') != 'false' && num < 20 && num > 0) {
          this.showShdow = true;
          cookie().rememberAccount('notice1', 'false')
        }
      },
      showNotice2() {
        let num = parseFloat(this.zecChange);
        if (cookie().get('notice2') != 'false' && num >= 20) {
          let year, month, day, hour, minutes, seconds, timer;
          //					this.timer = setInterval(() => {
          let time = new Date();
          year = time.getFullYear();
          month = this.fillZero(time.getMonth() + 1);
          day = this.fillZero(time.getDate());

          this.myDate = '' + year + '.' + month + '.' + day;
          this.showShdow = false;
          this.showShdow2 = true;
          cookie().rememberAccount('notice2', 'false')
          //					}, 1000);
        }
      }
    },
    mounted() {
      this.timer = setInterval(() => {
        this.showNotice();
        this.showNotice2();
      }, 1000);
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    height: 100%;
  }

  .app_main {
    min-height: 100%;
  }

  .shadow_container {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    left: 0;
    top: 0;
    .shadow_box_new {
      width: 600px;
      padding: 34px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background: #fff;
      border-radius: 5px;
      box-sizing: border-box;
      h2 {
        margin-bottom: 20px;
      }
    }
    .close_btn {
      position: absolute;
      right: 10px;
      top: 0;
      font-size: 200%;
      cursor: pointer;
    }

    .p1 {
      text-align: left;
      margin-bottom: 10px;
    }

    .p2 {
      text-align: right;
      margin-bottom: 10px;
    }

    .my_btn {
      width: 280px;
      height: 32px;
      line-height: 32px;
      color: #0093F1;
      border: 1px solid #0093F1;
      border-radius: 5px;
      background: #fff;
      cursor: pointer;
      margin-top: 36px;
    }
  }
</style>
