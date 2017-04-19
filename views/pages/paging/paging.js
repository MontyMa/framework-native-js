/**
 * Created by monty on 2017/4/18.
 */
import $ from 'jquery';
import doT from 'dot-js';

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
new Paging("monty").add(2)._replace();
