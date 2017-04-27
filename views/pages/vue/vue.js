/**
 * Created by monty on 2017/4/24.
 */

import Vue from 'vue';
import App from './app.vue';
import '../../public/styles/base.less'
new Vue({

    el: '#app',
    render: template => template(App)
});
