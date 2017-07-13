<script>
  import Vue from 'vue';
  Vue.filter('encrypt', function (val, type) {

    const REG_MOBILE = /^\d{11}$/;
    const EMAIL_MOBILE = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.(?:[a-zA-Z0-9]{2,4})$/;
    const ID_CARD_15 = /^[1-9]\d{7}(?:(?:0\d)|(?:1[0-2]))(?:(?:[0|1|2]\d)|3[0-1])\d{3}$/;
    const ID_CARD_18 = /^[1-9]\d{5}[1-9]\d{3}(?:(?:0\d)|(?:1[0-2]))(?:(?:[0|1|2]\d)|3[0-1])\d{3}[0-9xX]$/;

    if (!val) {
      return '';
    }
    const value = val.toString();
    if (type === 'username') {
      if (value.length === 2) {
        return `${value.charAt(0)}*`;
      }
      return `${value.charAt(0)}${(new Array(value.length - 1)).join('*')}${value.charAt(value.length - 1)}`;
    }
    if (type === 'mobile' && REG_MOBILE.test(value)) { // 手机号
      return value.replace(/(\d{3})(\d{4})(\d{4})/, '$1****$3');
    }

    if (type === 'email' && EMAIL_MOBILE.test(value)) { // 邮箱
      return value.replace(/^([a-zA-Z0-9_\.\-])([a-zA-Z0-9_\.\-]+)([a-zA-Z0-9_\.\-])(@[a-zA-Z0-9\-]+\.(?:[a-zA-Z0-9]{2,4}))$/, '$1****$3$4');
    }

    if (ID_CARD_15.test(value) || ID_CARD_18.test(value)) { // 身份证
      return value.replace(/^(.{2})(.+)(.{2})$/, '$1****$3');
    }
    const rv = value.replace(/^\s+|\s+$/g, '');
    return `${rv.charAt(0) + rv.substr(1).replace(/./g, '*')}`;

  });

  Vue.filter('number', function (val, number) {
    if (val) {
      let num = number ? number + 1 : 3;
      if (val.toString().indexOf(".") > 0) {
        return val.toString().substr(0, val.toString().indexOf(".")) + val.toString().substr(val.toString().indexOf("."), num);
      }
      else {
        return val;
      }
    } else {
      return 0;
    }
  });

  //格式化时间
  // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
  // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
  // 例子：
  // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
  // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
  Vue.filter('formattime', function (val, fmt) {
    let time = new Date(val * 1);

    let o = {
      "M+": time.getMonth() + 1, //月份
      "d+": time.getDate(), //日
      "h+": time.getHours(), //小时
      "m+": time.getMinutes(), //分
      "s+": time.getSeconds(), //秒
      "q+": Math.floor((time.getMonth() + 3) / 3), //季度
      "S": time.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  });
  //改变大小写
  Vue.filter('changeCaps', function (val, type) {
    if (!val) return;
    if (type == 'uppercase') {
      return val.toString().toUpperCase();
    } else if (type == 'lowercase') {
      return val.toString().toLowerCase();
    }
  });
</script>
