/**
 * Created by monty on 2017/4/18.
 */

import $ from 'jquery';
import 'babel-polyfill';
import 'babel-core/register';
import './modules/generator.js';
import './home.less';

let url = '/static/json/pagination.json';

// let total = '',
//     status = false;

// function getStatus() {
//     status = true
// }

// $.get(url).done(res => {
//     total = res.totalPages;
//     getStatus();
// });

// setTimeout(() => {
//     if (status) {
//         console.log(total);
//     }
// });