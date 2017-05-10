/**
 * Created by monty on 2017/4/24.
 */

import Vue from 'vue';
import App from './app.vue';
import '../../public/scripts/directives.js';
import '../../public/styles/base.less'
import './vue.less';
import store from '../../vuex/store.js';
new Vue({
    el: '#app',
    store,
    render: template => template(App)
});
