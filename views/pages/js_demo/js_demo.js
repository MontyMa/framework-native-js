/**
 * Created by monty on 2017/5/21.
 */
import $ from 'jquery';
import 'babel-polyfill';
import 'babel-core/register';
import './modules/generator.es6';    //es6 generator函数学习
// import './modules/regular_expression.es6'    //正则表达式学习
// import './js_demo.less';
// import * as importer from './modules/importer.es6';

import {htmlEncode} from 'htmlencode';

// console.log(importer.default.hhh(1));
// console.log(importer.box(3));
// console.log(importer.ddd);

let col = '#fff';

let time = new Date().getTime();
let top = Math.floor(Math.random() * 100);

let darrage_style = `{top:${top}%,`;
let darrage_dom = `<div id="barrage_${time}" class="test" style=${darrage_style}>${htmlEncode('哈哈哈')}</div>`;

$('.barrage').append(darrage_dom);

$(document).on('click', function () {
    $('.barrage').css({transform: 'translateX(-1000%)'});
});

console.log('qunimeid');