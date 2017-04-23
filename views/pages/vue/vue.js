/**
 * Created by monty on 2017/4/24.
 */

import Vue from 'vue';
// import React from 'react';
import app from './modules/a.vue';

Vue.config.productionTip = false;


new Vue({
    el: '#vue_app',
    components: {app},
    template: '<app/>',
    // template: '<div>hdhdhdhdh</div>',
});
