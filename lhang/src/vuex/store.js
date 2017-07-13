/**
 * Created by zhengguorong on 16/6/22.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import socket from './modules/socket'
import user from './modules/user'
import trade from './modules/trade'
import account from './modules/account'
import modal from './modules/modal'
import isAuth from './modules/isAuth'
import help_page_state from './modules/help'
import recharge from './modules/recharge'
import links from './modules/links'
import policy from './modules/policy'
import withdraw from './modules/withdraw'
import is_hide_total from './modules/hide' ;  //1 引入配置文件夹

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    socket,
    user,
    trade,
    account,
    modal,
    isAuth,
    help_page_state,
    recharge,
    links,
    policy,
    withdraw,
    is_hide_total
  },
  strict: debug
})
