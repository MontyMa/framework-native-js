/*
 * Created by monty.ma on 17/4/27.
 */

import Vue from 'vue';
import $ from 'jquery';

Vue.directive('isNumber', function (a) {
    $(a).focus();
});


/*
 {
 //只调用一次，指令第一次绑定到元素时调用
 bind(elem){
 $(elem).on('input', (e) => {
 let $elem_val = $(elem).val();
 let reg = /[^0-9]/g;
 $(elem).val($elem_val.replace(reg, ''))
 })
 },
 //被绑定元素插入父节点时调用
 inserted(elem, q, e){
 //      console.log(elem, '指令');
 //            console.log(q);
 //      console.log(e);
 }
 ,
 //被绑定元素所在的模板更新时调用，而不论绑定值是否变化
 update(elem, binding){
 //            let value = binding.value;
 //            let oldValue = binding.oldValue;
 //      console.log(oldValue);

 //            let reg = /[^0-9]/g;
 //            console.log(value.replace(reg, ''));

 //            value = value.replace(reg, '');

 //            elem.value = value.replace(reg, '');
 },
 //被绑定元素所在模板完成一次更新周期时调用
 componentUpdated(){

 },
 //只调用一次， 指令与元素解绑时调用
 unbind(){

 }
 }*/
