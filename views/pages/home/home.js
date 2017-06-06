/**
 * Created by monty on 2017/4/18.
 */

import './home.less';
import './theme.scss';

// let a = decodeURIComponent(location.search);
//
// let b = a.replace('?', '').split('&');
// let obj = {};
// b.forEach((elem) => {
//     let c = elem.split('=');
//     obj[c[0]] = c[1];
// });
//
// console.log(obj);

import $ from 'jquery';
(function (exports) {
    var themeChanger = {
        settings: {
            wrapper: $('.wrapper'),
            buttons: $('.controls > button')
        },

        init: function () {
            var _self = this;
            this.settings.buttons.on('click', function () {
                var $node = $(this),
                    theme = $node.data('theme');
                _self.settings.wrapper.removeClass().addClass('.wrapper ' + theme);
                _self.settings.buttons.removeAttr('disabled');
                $node.attr('disabled', true);
            });
        }
    };

    themeChanger.init();
}(window));