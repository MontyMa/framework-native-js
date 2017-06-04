/**
 * Created by monty on 2017/4/18.
 */

import './home.less';

let a = decodeURIComponent(location.search);

let b = a.replace('?', '').split('&');
let obj = {};
b.forEach((elem) => {
    let c = elem.split('=');
    obj[c[0]] = c[1];
});

console.log(obj);
