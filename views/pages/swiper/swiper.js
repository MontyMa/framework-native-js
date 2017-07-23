/**
 * Created by monty on 2017/4/18.
 */

import $ from 'jquery';
import './swiper.less';

let el = $('.box');    //主要元素
let i = 0;
let el_height = el.children(i).height();
let el_len = el.children().length;
let index = 0;

console.log(el_len);

function runAni(item) {


    if (index >= el_len) {
        index = 0;
    }


    item.css({
        transform: `translateY(-${el_height * i}px)`,
    });
    i++;

    if (i >= el_len) {
        $(el.children().get(index)).css({
            transform: `translateY(${el_height * i - el_height * index }px)`,
        });
        index++;
    }
}

runAni(el);

setInterval(() => {
    runAni(el);
}, 1000);
