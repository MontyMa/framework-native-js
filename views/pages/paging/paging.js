/**
 * Created by monty on 2017/4/18.
 */
import $ from 'jquery';
import Paging from '../../public/scripts/paging-plugin';

import './paging.less';

const DATA_BOX = document.querySelector('.data_box');
const PAGING_POINT = document.querySelector('.paging_point');
const J_FIXED = document.querySelector('.j_fixed');
document.querySelector('.j_btn').addEventListener('click', () => {
    J_FIXED.style.display = 'block';
});
J_FIXED.addEventListener('click', () => {
    J_FIXED.style.display = 'none';
});

//分页配置
new Paging("monty").add(2)._replace();

// let paging_option = {
//     el: 'paging_point',  //挂载点
//
// };


{

    let obj = {
        name: 'monty',
        age: 26
    };

    let func = (name) => {
        console.log(name)
    };

    Object.defineProperty(obj, 'name', {
        get(){
            return `${name} 已发生改变`;
        },
        set(val){
            // name = val;
            func(val);
        }
    });

    const J_WATCH_OBJ = document.querySelector('.j_watch_obj');

    J_WATCH_OBJ.addEventListener('click', () => {
        obj.name = document.body.scrollTop;
        console.log(obj.name)
    });


}
