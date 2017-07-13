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

let i = 0;
while (i < 5) {
    i++;
    console.log(i + 1);
}

let k = 0;
do {
    k++;
    console.log(k + 1);
} while (k < 5);


for (let j = 0; j < 5; j++) {
    console.log(j + 1);
}
