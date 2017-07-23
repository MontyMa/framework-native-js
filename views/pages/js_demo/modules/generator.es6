import 'babel-polyfill';
import $ from 'jquery';


function* hello() {
    yield $.get('/static/json/pagination.json');

}
let hlo = hello();

let requst = hlo.next().value;

requst.done(res => {
    console.log(res);
});