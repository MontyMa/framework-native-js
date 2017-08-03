/**
 * Created by monty on 2017/5/21.
 */
import $ from 'jquery';
import 'babel-polyfill';
import 'babel-core/register';
// import './modules/generator.js';    //es6 generator函数学习
// import './modules/regular_expression.js'    //正则表达式学习
import './js_demo.less';
import * as importer from './modules/importer.es6';
import {htmlEncode} from 'htmlencode';

console.log(importer.default.hhh(1));
console.log(importer.box(3));
console.log(importer.ddd);

let col = '#fff';

let time = new Date().getTime();
let top = Math.floor(Math.random() * 100);

let darrage_style = `{top:${top}%,`;
let darrage_dom = `<div id="barrage_${time}" class="test" style=${darrage_style}>${htmlEncode('哈哈哈')}</div>`;

$('.barrage').append(darrage_dom);

$(document).on('click', function () {
    $('.barrage').css({transform: 'translateX(-1000%)'});
});


let data = [
    {time: '123', txt1: 'werwe', txt2: '342343'},
    {time: '123', txt1: 'werwe', txt2: '342343'},
    {time: '123', txt1: 'werwe', txt2: '342343'},
    {time: '1234', txt1: 'werwe', txt2: '342343'},
    {time: '1235', txt1: 'werwe', txt2: '342343'},
    {time: '1235', txt1: 'werwe', txt2: '342343'},
];


let reference = '';
let arr = JSON.parse(JSON.stringify(data));
let obj = {};

data.forEach((elem) => {
    let a = elem.time;
    let r = obj[a];

    if (r) {
        obj[a] += 1
    } else {
        obj[a] = 1
    }
});

arr.forEach((elem, i) => {
    if (reference !== elem.time) {
        arr[i].new_time = elem.time;
        arr[i].rowspan = obj[elem.time];
        reference = elem.time;
    }
});



// let temp = '';
// let cont = 0;
// let arrobj = [];
//
// for (let i = 0; i < hh.length; i++) {
//     if (hh[i] != -1) {
//         temp = hh[i];
//
//         for (let j = 0; j < hh.length; j++) {
//             if (temp === hh[j]) {
//                 cont++;
//                 hh[j] = -1;
//             }
//         }
//     }
//
// }

// console.log(arrobj);
// console.log(hh);






