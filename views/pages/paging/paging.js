/**
 * Created by monty on 2017/4/18.
 */
import $ from 'jquery';
import doT from 'dot-js';

import Paging from '../../public/scripts/paging-plugin';

import './paging.less';

let data_box = document.querySelector('.data_box');
let paging_point = document.querySelector('.paging_point');


new Paging("monty").add(2)._replace();
