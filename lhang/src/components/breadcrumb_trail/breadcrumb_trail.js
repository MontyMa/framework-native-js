/**
 * Created by monty.ma on 17/3/20.
 */

/*
 * 说明此key名:为当前页面的hash值;
 * 此hash值数组的length决定了面包屑有多长;
 *
 * field 显示的字段名     path 为该字段的链接
 * */

//路径查询字典
export default {
  //常见问题
  '#/help/F&Q': [
    {field: '帮助中心', path: '/help/F&Q'},
    {field: '常见问题', path: '/help/F&Q'}
  ],
  '#/help/bulletin': [
    {field: '帮助中心', path: '/help/bulletin'},
    {field: '最新公告', path: '/help/bulletin'}
  ],
  '#/help/bulletin-page': [
    {field: '帮助中心', path: '/help/bulletin'},
    {field: '最新公告', path: '/help/bulletin'}
  ],
  '#/help/service': [
    {field: '帮助中心', path: '/help/bulletin'},
    {field: '链行服务', path: '/help/service'}
  ],
  '#/help/how-login': [
    {field: '帮助中心', path: '/help/bulletin'},
    {field: '如何登录', path: '/help/how-login'}
  ],
  '#/help/how-reg': [
    {field: '帮助中心', path: '/help/bulletin'},
    {field: '如何注册', path: '/help/how-reg'}
  ],
  '#/help/how-find-password': [
    {field: '帮助中心', path: '/help/bulletin'},
    {field: '找回密码', path: '/help/how-find-password'}
  ],
  '#/help/how-bind-phone': [
    {field: '帮助中心', path: '/help/bulletin'},
    {field: '绑定手机', path: '/help/how-bind-phone'}
  ],
  '#/help/how-bind-email': [
    {field: '帮助中心', path: '/help/bulletin'},
    {field: '绑定邮箱', path: '/help/how-bind-email'}
  ],
  '#/help/how-bind-google': [
    {field: '帮助中心', path: '/help/bulletin'},
    {field: '绑定谷歌验证器', path: '/help/how-bind-google'}
  ],
  '#/help/how-set-login-passworld': [
    {field: '帮助中心', path: '/help/bulletin'},
    {field: '登录密码', path: '/help/how-set-login-passworld'}
  ],
  '#/help/how-set-safety': [
    {field: '帮助中心', path: '/help/bulletin'},
    {field: '安全策略', path: '/help/how-set-safety'}
  ],
  '#/help/how-c1': [
    {field: '帮助中心', path: '/help/bulletin'},
    {field: 'c1认证', path: '/help/how-c1'}
  ],
  '#/help/how-c2': [
    {field: '帮助中心', path: '/help/bulletin'},
    {field: 'c2认证', path: '/help/how-c2'}
  ],
  '#/help/how-c3': [
    {field: '帮助中心', path: '/help/bulletin'},
    {field: 'c3认证', path: '/help/how-c3'}
  ],
  '#/help/how-recharge': [
    {field: '帮助中心', path: '/help/bulletin'},
    {field: '如何充值', path: '/help/how-recharge'}
  ],
  '#/help/how-withdraw': [
    {field: '帮助中心', path: '/help/bulletin'},
    {field: '如何提现', path: '/help/how-withdraw'}
  ],
  '#/help/purchase-step1': [
    {field: '帮助中心', path: '/help/bulletin'},
    {field: '限价委托', path: '/help/purchase-step1'}
  ],
  '#/help/purchase-step2': [
    {field: '帮助中心', path: '/help/bulletin'},
    {field: '市价委托', path: '/help/purchase-step2'}
  ],
  '#/help/rate-description': [
    {field: '帮助中心', path: '/help/bulletin'},
    {field: '费率说明', path: '/help/rate-description'}
  ],
  '#/help/introduction': [
    {field: '帮助中心', path: '/help/bulletin'},
    {field: '资产介绍', path: '/help/introduction'}
  ],
  '#/help/pact': [
    {field: '帮助中心', path: '/help/bulletin'},
    {field: '用户协议', path: '/help/pact'}
  ],
  //安全设置
  '#/user/settings': [
    {field: '安全中心', path: '/user/settings'},
    {field: '安全设置', path: '/user/settings'},
  ],
  '#/user/settings/phone_bind': [
    {field: '安全中心', path: '/user/settings'},
    {field: '安全设置', path: '/user/settings/'},
    {field: '手机绑定', path: '/user/settings/phone_bind'},
  ],
  '#/user/settings/phone_edit': [
    {field: '安全中心', path: '/user/settings'},
    {field: '安全设置', path: '/user/settings/'},
    {field: '修改手机绑定', path: '/user/settings/phone_edit'},
  ],
  '#/user/settings/email_bind': [
    {field: '安全中心', path: '/user/settings'},
    {field: '安全设置', path: '/user/settings/'},
    {field: '绑定邮箱', path: '/user/settings/email_bind'},
  ],
  '#/user/settings/google': [
    {field: '安全中心', path: '/user/settings'},
    {field: '安全设置', path: '/user/settings/'},
    {field: '绑定谷歌验证器', path: '/user/settings/google'},
  ],
  '#/user/settings/google/login/bind': [
    {field: '安全中心', path: '/user/settings'},
    {field: '安全设置', path: '/user/settings/google'},
    {field: '绑定(登录)谷歌验证', path: '/user/settings/google/login/bind'},
  ],
  '#/user/settings/google/login/edit': [
    {field: '安全中心', path: '/user/settings'},
    {field: '安全设置', path: '/user/settings/google'},
    {field: '重置(登录)谷歌验证', path: '/user/settings/google/login/edit'},
  ],
  '#/user/settings/google/settings/bind': [
    {field: '安全中心', path: '/user/settings'},
    {field: '安全设置', path: '/user/settings/google'},
    {field: '绑定(设置)谷歌验证', path: '/user/settings/google/settings/bind'},
  ],
  '#/user/settings/google/settings/edit': [
    {field: '安全中心', path: '/user/settings'},
    {field: '安全设置', path: '/user/settings/google'},
    {field: '重置(设置)谷歌验证', path: '/user/settings/google/settings/edit'},
  ],
  '#/user/settings/google/funding/bind': [
    {field: '安全中心', path: '/user/settings'},
    {field: '安全设置', path: '/user/settings/google'},
    {field: '绑定(资金)谷歌验证', path: '/user/settings/google/funding/bind'},
  ],
  '#/user/settings/google/funding/edit': [
    {field: '安全中心', path: '/user/settings'},
    {field: '安全设置', path: '/user/settings/google'},
    {field: '重置(资金)谷歌验证', path: '/user/settings/google/funding/edit'},
  ],
  '#/user/settings/password': [
    {field: '安全中心', path: '/user/settings'},
    {field: '安全设置', path: '/user/settings/'},
    {field: '重置登录密码', path: '/user/settings/password'},
  ],
  '#/user/settings/funding_bind': [
    {field: '安全中心', path: '/user/settings'},
    {field: '安全设置', path: '/user/settings/'},
    {field: '设置资金密码', path: '/user/settings/funding_bind'},
  ],
  '#/user/settings/funding_edit': [
    {field: '安全中心', path: '/user/settings'},
    {field: '安全设置', path: '/user/settings/'},
    {field: '重置资金密码', path: '/user/settings/funding_edit'},
  ],
  //安全策略
  '#/user/policy': [
    {field: '安全中心', path: '/user/settings'},
    {field: '安全策略', path: '/user/policy'},
  ],
  '#/user/policy/bind/modify_login_check': [
    {field: '安全中心', path: '/user/settings'},
    {field: '安全策略', path: '/user/policy'},
    {field: '更改登录验证', path: '/user/policy/bind/modify_login_check'},
  ],
  '#/user/policy/bind/modify_setting_check': [
    {field: '安全中心', path: '/user/settings'},
    {field: '安全策略', path: '/user/policy/'},
    {field: '更改设置验证', path: '/user/policy/bind/modify_setting_check'},
  ],
  '#/user/policy/bind/modify_trade_check': [
    {field: '安全中心', path: '/user/settings'},
    {field: '安全策略', path: '/user/policy'},
    {field: '更改交易验证', path: '/user/policy/bind/modify_trade_check'},
  ],
  '#/user/policy/bind/modify_withdraw_check': [
    {field: '安全中心', path: '/user/settings'},
    {field: '安全策略', path: '/user/policy'},
    {field: '更改提现验证', path: '/user/policy/bind/modify_withdraw_check'},
  ],

  //用户中心
  '#/user/securitylog': [
    {field: '安全中心', path: '/user/settings'},
    {field: '安全记录', path: '/user/securitylog'},
  ],
  '#/user/info': [
    {field: '安全中心', path: '/user/settings'},
    {field: '基本信息', path: '/user/info'},
  ],
  '#/user/auth': [
    {field: '安全中心', path: '/user/settings'},
    {field: '实名认证', path: '/user/auth'},
  ],
  '#/user/auth/c1_auth': [
    {field: '安全中心', path: '/user/settings'},
    {field: '填写C1实名认证信息', path: '/user/auth/c1_auth'},
  ],
  '#/user/auth/c2_auth': [
    {field: '安全中心', path: '/user/settings'},
    {field: '填写C2实名认证信息', path: '/user/auth/c2_auth'},
  ],
  '#/user/notice': [
    {field: '安全中心', path: '/user/settings'},
    {field: '我的消息', path: '/user/notice'},
  ],
  '#/user/points': [
    {field: '安全中心', path: '/user/settings'},
    {field: '我的积分', path: '/user/points'},
  ],
  '#/user/api/index': [
    {field: '安全中心', path: '/user/settings'},
    {field: '我的API', path: '/user/api/index'},
  ],
  '#/user/api/created': [
    {field: '安全中心', path: '/user/settings'},
    {field: '创建API', path: '/user/api/created'},
  ],

  //资金管理
  '#/money/overview': [
    {field: '资产管理', path: '/user/money'},
    {field: '资产总览', path: '/money/overview'},
  ],
  '#/money/visualization': [
    {field: '资产管理', path: '/user/money'},
    {field: '资产可视化分析', path: '/money/visualization'},
  ],
  '#/money/recharge': [
    {field: '资产管理', path: '/user/money'},
    {field: '充值充币', path: '/money/recharge'},
  ],
  '#/money/cashIn': [
    {field: '资产管理', path: '/user/money'},
    {field: '提现提币', path: '/money/cashIn'},
  ],
  '#/money/accountmanage': [
    {field: '资产管理', path: '/user/money'},
    {field: '资产账户管理', path: '/money/accountmanage'},
  ],
  '#/money/partner': [
    {field: '资产管理', path: '/user/money'},
    {field: '合伙人计划', path: '/money/partner'},
  ],
  //快速交易
  '#/trading/btc/trade': [
    {field: '快速交易', path: '/trading/btc/trade'},
    {field: 'BTC买卖交易', path: '/trading/btc/trade'},
  ],
  '#/trading/btc/market': [
    {field: '快速交易', path: '/trading/btc/trade'},
    {field: 'BTC行情信息', path: '/trading/btc/market'},
  ],
  '#/trading/btc/consignation': [
    {field: '快速交易', path: '/trading/btc/trade'},
    {field: 'BTC委托管理', path: '/trading/btc/consignation'},
  ],
  '#/trading/zec/trade': [
    {field: '快速交易', path: '/trading/zec/trade'},
    {field: 'ZEC买卖交易', path: '/trading/zec/trade'},
  ],
  '#/trading/zec/market': [
    {field: '快速交易', path: '/trading/zec/trade'},
    {field: 'ZEC行情信息', path: '/trading/zec/market'},
  ],
  '#/trading/zec/consignation': [
    {field: '快速交易', path: '/trading/zec/trade'},
    {field: 'ZEC委托管理', path: '/trading/zec/consignation'},
  ],
  '#/trading/etc/trade': [
    {field: '快速交易', path: '/trading/etc/trade'},
    {field: 'ETC买卖交易', path: '/trading/etc/trade'},
  ],
  '#/trading/etc/market': [
    {field: '快速交易', path: '/trading/etc/trade'},
    {field: 'ETC行情信息', path: '/trading/etc/market'},
  ],
  '#/trading/etc/consignation': [
    {field: '快速交易', path: '/trading/etc/trade'},
    {field: 'ETC委托管理', path: '/trading/etc/consignation'},
  ],
  '#/trading/eth/trade': [
    {field: '快速交易', path: '/trading/eth/trade'},
    {field: 'ETH买卖交易', path: '/trading/eth/trade'},
  ],
  '#/trading/eth/market': [
    {field: '快速交易', path: '/trading/eth/trade'},
    {field: 'ETH行情信息', path: '/trading/eth/market'},
  ],
  '#/trading/eth/consignation': [
    {field: '快速交易', path: '/trading/eth/trade'},
    {field: 'ETH委托管理', path: '/trading/eth/consignation'},
  ],
  '#/about/synopsis': [
    {field: '关于链行', path: '/about/synopsis'},
  ],
  '#/about/landmark': [
    {field: '链行大事记', path: '/about/landmark'},
  ],
  '#/about/team': [
    {field: '链行团队', path: '/about/team'},
  ],
  '#/about/contact-us': [
    {field: '联系我们', path: '/about/contact-us'},
  ]
}
