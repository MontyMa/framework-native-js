<script>
  import Vue from 'vue'

  import tabs from './tabs'
  Vue.component('ion-tabs', tabs);

  import header from './header/header'
  Vue.component('ion-header', header);

  import footer from './footer/footer'
  Vue.component('ion-footer', footer);

  import footer2 from './footer2'
  Vue.component('ion-footer2', footer2);

  //面包屑
  import breadcrumbTrail from './breadcrumb_trail/breadcrumb_trail.vue';
  Vue.component('breadcrumb-trail', breadcrumbTrail);

  Vue.component('models', {
    // 声明 props
    props: ['message'],
    // 就像 data 一样，prop 可以用在模板内
    // 同样也可以在 vm 实例中像 “this.message” 这样使用
    template: '\
    <div v-on:click="aaa()">\dfsdfs\</div>\
',
    methods: {
      aaa: function () {
        //console.log(this.message)
      }
    }
  });

  //import slide from './slide'
  //Vue.component('ion-slide', slide)

  import content from './content'
  Vue.component('ion-content', content);

  import content12 from './content12'
  Vue.component('ion-content12', content12);

  import characteristic from './characteristic/characteristic'
  Vue.component('ion-characteristic', characteristic);

  import unlock from './unlock'
  Vue.component('ion-unlock', unlock);

  import loginPannel from './login_pannel'
  Vue.component('ion-loginpannel', loginPannel);

  import page from './page'
  Vue.component('page', page);

  import userTitle from './user_title/user_title.vue';
  Vue.component('user-title', userTitle);

  import smsCode from './checkModule/smsCode.vue';
  Vue.component('sms-code', smsCode);

  import checkCode from './checkModule/checkCode.vue';
  Vue.component('check-code', checkCode);
//
  import datepicker from './timePicker/datepicker.vue'
  Vue.component('datepicker', datepicker);

  //	安全级别
  import passwordLevel from './password_level.vue';
  Vue.component('password-level', passwordLevel);

  //	悬浮窗
  import fixedArea from './fixed_area/fixed_area.vue';
  Vue.component('fixed-area', fixedArea);

  //	暂无数据
  import noData from './v-no-data.vue';
  Vue.component('no-data', noData);


  //分页
  import pagination from './pagination.vue';
  Vue.component('pagination', pagination)

</script>
