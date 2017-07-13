// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '../../assets/img/favicon.ico';    //引入favicon.ico
import '../../assets/js/polyfill.js';    //引入polyfill
import '../../assets/css/all.scss';		//所有业务页面的css的集合
import '../../assets/css/v-ionic.scss';		//模拟的ionic组件用到的样式
import $ from 'jquery';		//使用jq
import '../../custom/alert.js';		//一个修改了alert的插件
import '../../custom/reconnecting-websocket.min.js';		//socket自动重连插件
import '../../custom/cookie.js';
import '../../custom/qrcode.js';
import Vue from 'vue';
import App from './App.vue';

//数据请求
import VueResource from 'vue-resource'
Vue.use(VueResource);

//路由相关
import VueRouter from 'vue-router'
import routes from '../../routers'
// 0. 如果使用模块化机制编程，導入Vue和VueRouter，要调用 Vue.use(VueRouter)
Vue.use(VueRouter);
// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  //	mode: 'history',
  routes // （缩写）相当于 routes: routes
});

//指令
import '../../directives.vue'
//ionic部分实现
import '../../components/modules'
//服务
import '../../servers'
//过滤器
import '../../filters'

//vuex相关
import store from '../../vuex/store'
$.ajaxSetup({
  dataType: "json",
  crossDomain: true,
});

window.lh_http = (type, url, params, page) => {
  let uuid = cookie().status('user') ? cookie().get('user').customerInfo.uuid : null;
  let q;
  let result;
  q = $.Deferred();
  let _url;
  _url = window.config.api + url;
  if (page) {
    params.pageNo = page.pageNo;
    params.pageSize = page.pageSize
  }

  $.ajaxSetup({
    beforeSend(xhr) {
      xhr.setRequestHeader("_uuid", uuid);
    }
  });

  if (type == 'post' || type == 'POST') {
    $.ajax(_url, {
      type: 'post',
      data: params,
      success: function (data, textStatus, request) {
        if (data.status === 0) {
          result = {
            data: data.dataWrapper,
            status: true,
          };
          window.cookie().delay('user');
        } else {
          result = {
            data: data.msg,
            status: false,
          }
        }
        q.resolve(
          result,
        );
      },
      error: function (e) {
        q.reject(e);
      }
    })
  } else {
    $.ajax(_url, {
      type: 'get',
      data: params,
      success: function (data, textStatus, request) {
        if (data.status === 0) {
          result = {
            data: data.dataWrapper,
            status: true,
          };
          window.cookie().delay('user');
        } else {
          result = {
            data: data.msg,
            status: false,
          }
        }
        q.resolve(
          result,
        );
      },
      error: function (e) {
        q.reject(e);
        //	//console.log(e)
      }
    })
  }
  return q.promise();
};


// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (window.ormat('2006-07-02 08:09:04.423',"yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423

window.format = function (timer, fmt) {
  if (Object.prototype.toString.call(timer) === '[object Number]') {
    timer = new Date(timer);
  } else {
    timer = new Date(timer.replace(/\-/g, '/'));
  }
  let option = {
    "M+": timer.getMonth() + 1, //月份
    "d+": timer.getDate(), //日
    "h+": timer.getHours(), //小时
    "m+": timer.getMinutes(), //分
    "s+": timer.getSeconds(), //秒
    "q+": Math.floor((timer.getMonth() + 3) / 3), //季度
    "S": timer.getMilliseconds() //毫秒
  };

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (timer.getFullYear() + "").substr(4 - RegExp.$1.length));
  }

  for (let k in option) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (option[k]) : (("00" + option[k]).substr(("" + option[k]).length)));
    }
  }
  return fmt;
};

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) { //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
// 现在，应用已经启动了！
/* eslint-disable no-new */

const app = new Vue({
  store,
  router,
  template: '<App/>',
  components: {App}
}).$mount('#app');
