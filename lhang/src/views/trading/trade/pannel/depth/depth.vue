<template>
  <div></div>
</template>
<!--<template>-->
  <!--<div class="depth g_c_f">-->
    <!--<div class="title_m">-->
      <!--<a :href="myUrl+'fullScreen.html'" target="_blank">专业交易</a>-->
    <!--</div>-->
    <!--<div class="d1">-->
      <!--<div class="c1">-->
        <!--<font class="c1_1">￥</font>-->
        <!--<span class="c1_2">{{marketPrice}}</span>-->
        <!--<span class="c1_3">-->
					<!--<div class="select">-->
						<!--深度{{depth_index}}<img src="./img/select.png">-->
					<!--</div>-->
					<!--<ul class="select_ul">-->
						<!--<li v-on:click="change_depth(0)" :class="{'active_li' : depth_index == '0'}">0</li>-->
						<!--<li v-on:click="change_depth(1)" :class="{'active_li' : depth_index == '1'}">1</li>-->
						<!--<li v-on:click="change_depth(2)" :class="{'active_li' : depth_index == '2'}">2</li>-->
						<!--<li v-on:click="change_depth(3)" :class="{'active_li' : depth_index == '3'}">3</li>-->
						<!--<li v-on:click="change_depth(4)" :class="{'active_li' : depth_index == '4'}">4</li>-->
						<!--<li v-on:click="change_depth(5)" :class="{'active_li' : depth_index == '5'}">5</li>-->
					<!--</ul>-->
				<!--</span>-->
      <!--</div>-->
      <!--<label class="c1_4">-->
        <!--最新价格-->
      <!--</label>-->
    <!--</div>-->
    <!--<div class="d2">-->
      <!--<ul class="d2_1">-->
        <!--<li>-->
          <!--<p>{{newPrice.maxPrice}}</p>-->
          <!--<span class="up">最高价</span>-->
        <!--</li>-->
        <!--<li>-->
          <!--<p>{{newPrice.minPrice}}</p>-->
          <!--<span class="down">最低价</span>-->
        <!--</li>-->
        <!--<li>-->
          <!--<p>{{newPrice.changePercent}}%</p>-->
          <!--<span class="down">日涨幅</span>-->
        <!--</li>-->
        <!--<li>-->
          <!--<p>{{newPrice.volumeQuantity}}</p>-->
          <!--<span>日成交量</span>-->
        <!--</li>-->
      <!--</ul>-->
      <!--<div class="d2_2">-->
        <!--<div class="d2_2_title">-->
          <!--<span>买卖</span>-->
          <!--<span class="textalign_center">价格</span>-->
          <!--<span class="textalign_right">数量</span>-->
        <!--</div>-->
        <!--<div class="d2_2_content">-->
          <!--<ul class="d2_u1">-->
            <!--<li v-for="(i,index) in asks" v-if="index < 5" v-on:click="change_index('ask'+index,i[0])"-->
                <!--:class="{'active_hangq' : ask_index == 'ask'+index}">-->
              <!--<span class="color_green">卖{{5 - index}}</span>-->
              <!--<span class="textalign_center color_gray">{{i[0]}}</span>-->
              <!--<span class="textalign_right color_green">{{i[1]}}</span>-->
            <!--</li>-->
          <!--</ul>-->
          <!--<ul class="d2_u2">-->
            <!--<li v-for="(i,index) in bids" v-if="index < 5" v-on:click="change_index('bid'+index,i[0])"-->
                <!--:class="{'active_hangq' : bid_index == 'bid'+index}">-->
              <!--<span class="color_red">买{{index + 1}}</span>-->
              <!--<span class="textalign_center color_gray">{{i[0]}}</span>-->
              <!--<span class="textalign_right color_red">{{i[1]}}</span>-->
            <!--</li>-->
          <!--</ul>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
  <!--</div>-->
<!--</template>-->

<!--<script>-->
  <!--import store from '../../../../../vuex/store'-->
  <!--export default {-->
    <!--data() {-->
      <!--return {-->
        <!--depth_index: 0,-->
        <!--curprice: "",-->
        <!--curdepth: "",-->
        <!--asks: [],-->
        <!--bids: [],-->
        <!--marketPrice: "",-->
        <!--type: this.$route.params.type,-->
        <!--newPrice: {},-->
        <!--myUrl: '',-->
        <!--ask_index: null,-->
        <!--bid_index: null-->
      <!--}-->
    <!--},-->
    <!--methods: {-->
      <!--change_depth: function (index) {-->
        <!--this.depth_index = index-->
      <!--},-->
      <!--change_index: function (index, p) {-->
        <!--this.ask_index = index;-->
        <!--this.bid_index = index;-->
        <!--store.dispatch('tradPrice', p);-->
      <!--}-->
    <!--},-->
    <!--computed: {-->
      <!--socket() {-->
        <!--let channel = 'sub_spot_' + this.type + '_cny_dailydata';-->
        <!--return this.$store.getters[channel].data;-->
      <!--},-->
      <!--depth() {-->
        <!--let channel = 'sub_spot_' + this.type + '_cny_depth'-->
        <!--return this.$store.getters[channel].data;-->
      <!--}-->
    <!--},-->
    <!--mounted() {-->
      <!--//订阅socket日数据-->
      <!--store.dispatch('send', {-->
        <!--channel: `sub_spot_${this.type}_cny_dailydata`,-->
      <!--});-->
      <!--//订阅深度-->
      <!--store.dispatch('send', {-->
        <!--channel: `sub_spot_${this.type}_cny_depth`,-->
        <!--depth: this.depth_index-->
      <!--});-->

      <!--this.myUrl = window.config.api;-->
    <!--},-->
    <!--watch: {-->
      <!--'$route' (to, from) {-->
        <!--this.ask_index = null;-->
        <!--this.bid_index = null;-->
        <!--//对路由变化作出响应...-->
        <!--this.type = this.$route.params.type;-->
        <!--//关闭to的订阅-->
        <!--store.dispatch('send', {-->
          <!--channel: `sub_spot_${from.params.type}_cny_dailydata`,-->
          <!--isClose: true,-->
        <!--});-->
        <!--store.dispatch('send', {-->
          <!--channel: `sub_spot_${from.params.type}_cny_depth`,-->
          <!--isClose: true,-->
          <!--depth: this.depth_index-->
        <!--});-->
        <!--//打开from的订阅-->
        <!--store.dispatch('send', {-->
          <!--channel: `sub_spot_${to.params.type}_cny_dailydata`,-->
        <!--});-->
        <!--store.dispatch('send', {-->
          <!--channel: `sub_spot_${to.params.type}_cny_depth`,-->
          <!--depth: this.depth_index-->
        <!--});-->
      <!--},-->
      <!--depth_index (val, oldVal){-->
        <!--//对路由变化作出响应...-->
        <!--this.type = this.$route.params.type;-->
        <!--//关闭to的订阅-->
        <!--store.dispatch('send', {-->
          <!--channel: `sub_spot_${this.type}_cny_dailydata`,-->
          <!--isClose: true,-->
        <!--});-->
        <!--store.dispatch('send', {-->
          <!--channel: `sub_spot_${this.type}_cny_depth`,-->
          <!--isClose: true,-->
          <!--depth: oldVal-->
        <!--});-->
        <!--//打开from的订阅-->
        <!--store.dispatch('send', {-->
          <!--channel: `sub_spot_${this.type}_cny_dailydata`,-->
        <!--});-->
        <!--store.dispatch('send', {-->
          <!--channel: `sub_spot_${this.type}_cny_depth`,-->
          <!--depth: val-->
        <!--});-->
      <!--},-->
      <!--socket (val) {-->
        <!--if (val) {-->
          <!--this.marketPrice = val.closingPrice;-->
          <!--this.$store.commit('closingPrice', val.closingPrice);-->
          <!--this.newPrice = val;-->
        <!--}-->
      <!--},-->
      <!--depth(val) {-->
        <!--if (val && val.asks && val.bids) {-->
          <!--var asks_ = val.asks.slice(0, [5]);-->
          <!--var asks_ = asks_.reverse();-->
          <!--this.asks = asks_;-->
          <!--this.bids = val.bids;-->
        <!--} else {-->
          <!--this.asks = {};-->
          <!--this.bids = {};-->
        <!--}-->
      <!--},-->
    <!--}-->
  <!--};-->
<!--</script>-->

<!--<style lang="scss" rel="stylesheet/scss">-->
  <!--$fontColorGary: #9b9b9b;-->
  <!--$colorRed: #ee2560;-->
  <!--$colorGreen: #3ac569;-->
  <!--.depth {-->
    <!--font-size: 12px;-->
    <!--width: 256px;-->
    <!--float: left;-->
    <!--color: #1B1E23;-->
    <!--.title_m {-->
      <!--text-align: right;-->
      <!--height: 33px;-->
      <!--a {-->
        <!--line-height: 30px;-->
        <!--display: inline-block;-->
        <!--&:after {-->
          <!--content: '\e614';-->
          <!--font-size: 19px;-->
          <!--display: inline-block;-->
          <!--vertical-align: middle;-->
          <!--margin-left: 5px;-->
          <!--line-height: 29px;-->
        <!--}-->
      <!--}-->
      <!--color: #0093F1;-->
      <!--border-bottom: 3px solid #d7d7d7;-->
    <!--}-->
    <!--.d1 {-->
      <!--border-bottom: 1px solid #DBDBDB;-->
      <!--padding: 10px 5px;-->
      <!--.c1_1 {-->
        <!--color: #E93C6F;-->
        <!--font-size: 12px;-->
      <!--}-->
      <!--.c1_2 {-->
        <!--color: #E93C6F;-->
        <!--font-size: 30px;-->
      <!--}-->
      <!--.c1_3 {-->
        <!--float: right;-->
        <!--position: relative;-->
        <!--.select {-->
          <!--width: 66px;-->
          <!--text-align: right;-->
          <!--img {-->
            <!--height: 12px;-->
            <!--position: relative;-->
            <!--top: 2px;-->
            <!--left: 4px;-->
          <!--}-->
        <!--}-->
        <!--.select_ul {-->
          <!--display: none;-->
          <!--width: 66px;-->
          <!--position: absolute;-->
          <!--right: -5px;-->
          <!--border: 1px solid rgba(0, 147, 241, 0.37);-->
          <!--li {-->
            <!--font-size: 14px;-->
            <!--height: 25px;-->
            <!--line-height: 25px;-->
            <!--text-align: center;-->
            <!--background: white;-->
            <!--cursor: pointer;-->
            <!--&:hover {-->
              <!--background: lighten(#0093F1, 30%);-->
              <!--color: #fff;-->
            <!--}-->
          <!--}-->
          <!--.active_li {-->
            <!--background: #0093F1;-->
            <!--color: #fff;-->
          <!--}-->
        <!--}-->
      <!--}-->
      <!--.c1_3:hover {-->
        <!--.select_ul {-->
          <!--display: block;-->
        <!--}-->
      <!--}-->
      <!--.c1_4 {-->
        <!--color: #9B9B9B;-->
      <!--}-->
    <!--}-->
    <!--.d2 {-->
      <!--.d2_1 {-->
        <!--overflow: hidden;-->
        <!--padding-left: 6px;-->
        <!--margin-top: 15px;-->
        <!--li {-->
          <!--float: left;-->
          <!--width: 60px;-->
          <!--span {-->
            <!--color: $fontColorGary;-->
            <!--&.up {-->
              <!--background: url(./img/Triangle_up.png) no-repeat right;-->
              <!--padding-right: 10px;-->
            <!--}-->
            <!--&.down {-->
              <!--background: url(./img/Triangle_down.png) no-repeat right;-->
              <!--padding-right: 10px;-->
            <!--}-->
          <!--}-->
        <!--}-->
      <!--}-->
      <!--.d2_2 {-->
        <!--.d2_2_title {-->
          <!--height: 40px;-->
          <!--line-height: 40px;-->
          <!--margin-top: 16px;-->
          <!--background: #f4f4f4;-->
          <!--padding: 0 16px;-->
          <!--span {-->
            <!--display: inline-block;-->
            <!--/*font-weight: bold;*/-->
            <!--width: 72px;-->
            <!--&.textalign_right {-->
              <!--text-align: right;-->
            <!--}-->
            <!--&.textalign_center {-->
              <!--text-align: center;-->
            <!--}-->
            <!--&.color_red {-->
              <!--color: $colorRed;-->
            <!--}-->
            <!--&.color_green {-->
              <!--color: $colorGreen;-->
            <!--}-->
            <!--&.color_gray {-->
              <!--color: #494949;-->
            <!--}-->
          <!--}-->
        <!--}-->
      <!--}-->
      <!--.d2_2_content {-->
        <!--/*padding: 0 16px;*/-->
        <!--.d2_u1 {-->
          <!--padding: 16px 0;-->
          <!--border-bottom: 1px solid #dbdbdb;-->
          <!--height: 135px;-->
          <!--li {-->
            <!--line-height: 20px;-->
            <!--padding: 0 16px;-->
          <!--}-->
          <!--li:hover {-->
            <!--background: #f2f9fe;-->
            <!--cursor: pointer;-->
          <!--}-->
          <!--.active_hangq {-->
            <!--background: #f2f9fe;-->
          <!--}-->
          <!--span {-->
            <!--display: inline-block;-->
            <!--width: 72px;-->
            <!--&.textalign_right {-->
              <!--text-align: right;-->
            <!--}-->
            <!--&.textalign_center {-->
              <!--text-align: center;-->
            <!--}-->
            <!--&.color_red {-->
              <!--color: $colorRed;-->
            <!--}-->
            <!--&.color_green {-->
              <!--color: $colorGreen;-->
            <!--}-->
          <!--}-->
        <!--}-->
        <!--.d2_u2 {-->
          <!--@extend .d2_u1;-->
          <!--border-bottom: none;-->
          <!--height: 135px;-->
        <!--}-->
      <!--}-->
    <!--}-->
  <!--}-->
<!--</style>-->
