/**
 * Created by monty on 2017/4/18.
 */
import $ from 'jquery';
import Paging from '../../public/scripts/paging-plugin';

import './paging.less';

let data_box = document.querySelector('.data_box');
let paging_point = document.querySelector('.paging_point');

let paging_option = {
    el: 'paging_point',  //挂载点

};

new Paging("monty");
