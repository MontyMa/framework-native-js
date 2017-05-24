/**
 * Created by monty on 2017/5/21.
 */
import $ from 'jquery';
import 'babel-polyfill';
import 'babel-core/register';
// import './modules/generator.js';    //es6 generator函数学习
// import './modules/regular_expression.js'    //正则表达式学习
import './js_demo.less';
import {htmlEncode} from 'htmlencode';

let col = '#fff';

let time = new Date().getTime();
let top = Math.floor(Math.random() * 100);

let darrage_style = `{top:${top}%,`;
let darrage_dom = `<div id="barrage_${time}" class="test" style=${darrage_style}>${htmlEncode('哈哈哈')}</div>`;

console.log(darrage_dom, 'dom');
// console.log($(this)[0], 0);
// $($(this)[0]).append(darrage_dom);


$('.barrage').append(darrage_dom);

$(document).on('click', function () {
    $('.barrage').css({transform: 'translateX(-1000%)'});
    // $('.barrage').css({left: '0%', transform: 'translateX(-100%)'})
});

console.log('qunimeid');