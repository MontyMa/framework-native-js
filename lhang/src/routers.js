// 1. 定义（路由）组件。

//// 首页
const homepage = resolve => require(['./views/homepage/homepage'], resolve);
//// 登录
const login = resolve => require(['./views/login/login'], resolve);

//// 注册
const reg = resolve => require(['./views/reg/reg'], resolve);
//// 找回密码
const findpassword = resolve => require(['./views/findpassword/findpassword'], resolve);

//// 快速交易
const trading = resolve => require(['./views/trading/trading_entry.vue'], resolve);
// 买卖交易
const trade = resolve => require(['./views/trading/modules/trade.vue'], resolve);
// 行情交易
const market = resolve => require(['./views/trading/market/market'], resolve);
const market2 = resolve => require(['./views/trading/pannel/market2.vue'], resolve);
// 委托交易
const consignation = resolve => require(['./views/trading/pannel/consignation.vue'], resolve);

//// 个人中心
const user = resolve => require(['./views/user/user.vue'], resolve);
//// 安全设置
const settings = resolve => require(['./views/user/settings/settings.vue'], resolve);
//手机
const phone_edit = resolve => require(['./views/user/settings/phone_edit'], resolve);
const phone_bind = resolve => require(['./views/user/settings/phone_bind'], resolve);

//邮箱
//const email_edit = resolve => require(['./views/user/settings/email_edit'], resolve);
const email_bind = resolve => require(['./views/user/settings/email_bind'], resolve);

//密码
const password = resolve => require(['./views/user/settings/password'], resolve);

//资金密码
const funding_edit = resolve => require(['./views/user/settings/funding_edit'], resolve);
const funding_bind = resolve => require(['./views/user/settings/funding_bind'], resolve);

////谷歌
const google = resolve => require(['./views/user/settings/google'], resolve);
//谷歌:type
const google_edit = resolve => require(['./views/user/settings/google_edit'], resolve);
const google_bind = resolve => require(['./views/user/settings/google_bind'], resolve);

// 安全记录
const securitylog = resolve => require(['./views/user/securitylog'], resolve);
//// 安全策略
const policy = resolve => require(['./views/user/policy/policy'], resolve);
//修改登录
const modify_login_check = resolve => require(['./views/user/policy/modify_login_check'], resolve);
//设置修改
const modify_setting_check = resolve => require(['./views/user/policy/modify_setting_check'], resolve);
//交易修改
const modify_trade_check = resolve => require(['./views/user/policy/modify_trade_check'], resolve);
//提现修改
const modify_withdraw_check = resolve => require(['./views/user/policy/modify_withdraw_check'], resolve);

//// 实名认证
const auth = resolve => require(['./views/user/auth'], resolve);
//c1认证
const c1_auth = resolve => require(['./views/user/auth/c1_auth'], resolve);
//c2认证
const c2_auth = resolve => require(['./views/user/auth/c2_auth'], resolve);
// 我的消息
const notice = resolve => require(['./views/user/notice'], resolve);
// 基本信息
const info = resolve => require(['./views/user/info'], resolve);
// 我的积分
const points = resolve => require(['./views/user/points'], resolve);
//我的API
const api = resolve => require(['./views/user/api'], resolve);

//// 资产理财
const money = resolve => require(['./views/money/money'], resolve);
// 资产总览
const overview = resolve => require(['./views/money/overview'], resolve);
// 资产可视化
const visualization = resolve => require(['./views/money/visualization/visualization'], resolve);
// 充值
const recharge = resolve => require(['./views/money/recharge'], resolve);
// 提现
const cashIn = resolve => require(['./views/money/cashIn'], resolve);
//	 币宝
const bbao = resolve => require(['./views/money/bbao'], resolve);
//  账户资金管理
const accountmanage = resolve => require(['./views/money/accountmanage'], resolve);
//	 合伙人
const partner = resolve => require(['./views/money/partner'], resolve);

////帮助中心
const help = resolve => require(['./views/help/help'], resolve);
//F&Q
const problem = resolve => require(['./views/help/F&Q/F&Q'], resolve);
//最新公告
const bulletin = resolve => require(['./views/help/bulletin/bulletin'], resolve);
//最新公告内页
const bulletin_page = resolve => require(['./views/help/bulletin_page/bulletin_page'], resolve);
//链行服务
const service = resolve => require(['./views/help/service/service'], resolve);

//如何登录
const how_login = resolve => require(['./views/help/about_custormer/how_login'], resolve);

//如何登录
const how_reg = resolve => require(['./views/help/about_custormer/how_reg'], resolve);

//找回密码
const how_find_password = resolve => require(['./views/help/about_custormer/how_find_password'], resolve);

//安全设置
const how_bind_phone = resolve => require(['./views/help/setting/how_bind_phone'], resolve);
const how_bind_email = resolve => require(['./views/help/setting/how_bind_email'], resolve);
const how_bind_google = resolve => require(['./views/help/setting/how_bind_google'], resolve);
const how_set_money_passworld = resolve => require(['./views/help/setting/how_set_money_passworld'], resolve);
const how_set_login_passworld = resolve => require(['./views/help/setting/how_set_login_passworld'], resolve);
const how_set_safety = resolve => require(['./views/help/setting/how_set_safety'], resolve);


//实名认证
const how_c1 = resolve => require(['./views/help/certification/how_c1'], resolve);
const how_c2 = resolve => require(['./views/help/certification/how_c2'], resolve);
const how_c3 = resolve => require(['./views/help/certification/how_c3'], resolve);


//充值提现
const how_recharge = resolve => require(['./views/help/funds_circulation/how_recharge.vue'], resolve);
const how_withdraw = resolve => require(['./views/help/funds_circulation/how_withdraw'], resolve);


//如何交易
const purchase_step1 = resolve => require(['./views/help/merchandise/purchase_step1'], resolve);
const purchase_step2 = resolve => require(['./views/help/merchandise/purchase_step2'], resolve);

//费率说明
const rate_description = resolve => require(['./views/help/rate_description/rate_description'], resolve);
//资产介绍
const introduction = resolve => require(['./views/help/introduction/introduction'], resolve);
//用户协议
const pact = resolve => require(['./views/help/pact/pact'], resolve);

////关于链行
const about_lhang = resolve => require(['./views/about_lhang/about_lhang'], resolve);
//链行简介
const synopsis = resolve => require(['./views/about_lhang/synopsis/synopsis'], resolve);
//链行大事记
const landmark = resolve => require(['./views/about_lhang/landmark/landmark'], resolve);
//链行团队
const team = resolve => require(['./views/about_lhang/team/team'], resolve);
//媒体报道
const news = resolve => require(['./views/about_lhang/news/news'], resolve);
//联系我们
const contact_us = resolve => require(['./views/about_lhang/contact_us/contact_us'], resolve);

////加载页
const shunt = resolve => require(['./views/shunt/shunt'], resolve);
////邀请码
const invite = resolve => require(['./views/shunt/invite'], resolve);


// 2. 定义路由
const routers = [
  //加载页
  {
    path: '/shunt',
    component: shunt
  },
  //邀请码
  {
    path: '/invite/:code',
    component: invite
  },
  {
    path: '/',
    component: homepage
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/user',
    component: user,
    children: [{
      path: '/user/settings/',
      component: settings,
    }, {
      path: '/user/settings/phone_edit',
      component: phone_edit,
    }, {
      path: '/user/settings/phone_bind',
      component: phone_bind,
    }, {
      path: '/user/settings/email_bind',
      component: email_bind,
    }, {
      path: '/user/settings/password',
      component: password,
    }, {
      path: '/user/settings/funding_edit',
      component: funding_edit,
    }, {
      path: '/user/settings/funding_bind',
      component: funding_bind,
    }, {
      path: '/user/settings/google',
      component: google,
    }, {
      path: '/user/settings/google/:type/edit',
      component: google_edit,
    }, {
      path: '/user/settings/google/:type/bind',
      component: google_bind,
    }, {
      path: '/user/securitylog',
      component: securitylog
    }, {
      path: '/user/policy',
      component: policy
    }, {
      path: '/user/policy/:type/modify_login_check',
      component: modify_login_check
    }, {
      path: '/user/policy/:type/modify_setting_check',
      component: modify_setting_check
    }, {
      path: '/user/policy/:type/modify_trade_check',
      component: modify_trade_check
    }, {
      path: '/user/policy/:type/modify_withdraw_check',
      component: modify_withdraw_check
    }, {
      path: '/user/auth',
      component: auth
    }, {
      path: '/user/auth/c1_auth',
      component: c1_auth
    }, {
      path: '/user/auth/c2_auth',
      component: c2_auth
    }, {
      path: '/user/notice',
      component: notice
    }, {
      path: '/user/info',
      component: info
    }, {
      path: '/user/points',
      component: points
    }, {
      path: '/user/api/:type',
      component: api
    }
    ]
  },
  {
    path: '/reg/:type/:step',
    component: reg
  },
  {
    path: '/findpassword/:type',
    component: findpassword
  },
  {
    path: '/trading',
    component: trading,
    children: [
      {
        path: '/trading/:type/trade',
        component: trade
      }
    ]
  },
  {
    path: '/money/money',
    component: money,
    children: [{
      path: '/money/overview',
      component: overview
    }, {
      path: '/money/visualization',
      component: visualization
    }, {
      path: '/money/recharge',
      component: recharge
    }, {
      path: '/money/cashIn',
      component: cashIn
    }, {
      path: '/money/bbao',
      component: bbao
    }, {
      path: '/money/accountmanage',
      component: accountmanage
    }, {
      path: '/money/partner',
      component: partner
    }, {
      path: '*',
      component: homepage
    }]
  },
  //帮助中心
  {
    path: '/help',
    component: help,
    children: [
      {
        path: '/help/F&Q',
        component: problem
      },
      {
        path: '/help/bulletin',
        component: bulletin
      },
      {
        path: '/help/bulletin-page/',
        component: bulletin_page
      },
      {
        path: '/help/service',
        component: service
      },
      {
        path: '/help/how-login',
        component: how_login
      },
      {
        path: '/help/how-reg',
        component: how_reg
      },
      {
        path: '/help/how-find-password',
        component: how_find_password
      },
      {
        path: '/help/how-bind-phone',
        component: how_bind_phone
      },
      {
        path: '/help/how-bind-email',
        component: how_bind_email
      },
      {
        path: '/help/how-bind-google',
        component: how_bind_google
      },
      {
        path: '/help/how-set-money-passworld',
        component: how_set_money_passworld
      },
      {
        path: '/help/how-set-login-passworld',
        component: how_set_login_passworld
      },
      {
        path: '/help/how-set-safety',
        component: how_set_safety
      },

      // {
      //   path: '/help/certification',
      //   component: certification
      // },

      {
        path: '/help/how-c1',
        component: how_c1
      },
      {
        path: '/help/how-c2',
        component: how_c2
      },
      {
        path: '/help/how-c3',
        component: how_c3
      },

      // {
      //   path: '/help/funds-circulation',
      //   component: funds_circulation
      // },

      {
        path: '/help/how-recharge',
        component: how_recharge
      },
      {
        path: '/help/how-withdraw',
        component: how_withdraw
      },

      // {
      //   path: '/help/merchandise',
      //   component: merchandise
      // },

      {
        path: '/help/purchase-step1',
        component: purchase_step1
      },
      {
        path: '/help/purchase-step2',
        component: purchase_step2
      },

      {
        path: '/help/introduction',
        component: introduction
      },
      {
        path: '/help/rate-description',
        component: rate_description
      },
      {
        path: '/help/pact',
        component: pact
      }
    ]
  },

  //关于链行
  {
    path: '/about',
    component: about_lhang,
    children: [{
      path: '/about/synopsis',
      component: synopsis
    },
      {
        path: '/about/landmark',
        component: landmark
      },
      {
        path: '/about/team',
        component: team
      },
      {
        path: '/about/news',
        component: news
      },
      {
        path: '/about/contact-us',
        component: contact_us
      }
    ]
  }
];

export default routers;
