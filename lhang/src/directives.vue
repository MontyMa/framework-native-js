<script>
  import Vue from 'vue'
  import Clipboard from 'clipboard'

  // 当参数里面有false null '' 时让对象不可点击 而且 颜色灰质
  Vue.directive('verification', {
    inserted: function (el, value) {
      //颜色就暂时不由指令来改了
      el.style.cursor = 'pointer';
      el.style.pointerEvents = 'auto';
      for (var Key in value.value) {
        if (!value.value[Key]) {
          el.style.pointerEvents = 'none';
          el.style.backgroundColor = "#999";
        }
      }
    },
    update: function (el, value) {
      el.style.cursor = 'pointer';
      el.style.pointerEvents = 'auto';
      for (var Key in value.value) {
        if (!value.value[Key]) {
          el.style.backgroundColor = "#999";
          el.style.pointerEvents = 'none';
        }
      }
    },
  });

  // 注册一个全局自定义指令 v-focus
  Vue.directive('focus', {
    // 当绑定元素插入到 DOM 中。
    inserted: function (el) {
      // 聚焦元素
      el.focus()
    }
  });


  // 注册一个全局自定义指令 v-focus
  Vue.directive('checkimg', {
    // 当绑定元素插入到 DOM 中。
    inserted(el) {
      let url = window.config.api;
      el.src = url + "authImage";
      el.style.height = '100%';
      el.style.width = '100%';
      /*			$(el).click(function(){
       el.src="http://172.16.1.92:8081/authImage?"+ new Date();
       })*/
      el.onclick = function () {
        let url = window.config.api;
        url = url + "authImage";
        this.src = url + "?" + new Date();
      }
    }
  });

  //将内容复制至粘贴板
  Vue.directive('clipboard', {
    // 当绑定元素插入到 DOM 中。
    inserted: function (el) {
      let clipboard = new Clipboard(el);
      clipboard.on('success', function (e) {
      	alert("复制成功！")
        console.log(e);
      });
      clipboard.on('error', function (e) {
        //console.log(e);
      });
    }
  });


  //有bug  暂不能用
  import $ from 'jquery'
  Vue.directive('isNumber', {
    //只调用一次，指令第一次绑定到元素时调用
    bind(){

    },
    //被绑定元素插入父节点时调用
    inserted(elem, q, e){
//      //console.log(elem, '指令');
      //console.log(q);
//      //console.log(e);
    },
    //被绑定元素所在的模板更新时调用，而不论绑定值是否变化
    update(elem, binding){
      let value = binding.value;
      let oldValue = binding.oldValue;
//      //console.log(oldValue);

      let reg = /[^0-9]/g;
      //console.log(value.replace(reg, ''));

      value = value.replace(reg, '');

//      elem.value = value.replace(reg, '');
    },
    //被绑定元素所在模板完成一次更新周期时调用
    componentUpdated(){

    },
    //只调用一次， 指令与元素解绑时调用
    unbind(){

    }
  })

  //	Vue.directive('header', {
  //		// 当绑定元素插入到 DOM 中。
  //		inserted: function(el) {
  //			// 聚焦元素
  //			//console.log(el)
  //		},
  //		bind: function(el, binding, vnode){
  //			el.style.width = '100%';
  //			el.style.height = '44px';
  //			el.style.position = 'fixed';
  //			el.style.top = '0px';
  //			el.style.overflow = 'hidden';
  //			el.style.lineHeight = '44px';
  //			el.style.background = 'rgb(22, 112, 177)';
  //			el.style.color = 'white';
  //
  //			var zis = el.querySelectorAll('.header div');
  //			var b = 100 / zis.length;
  //			for (el in zis) {
  //				if(el >= 0){
  //					zis[el].style.width = b+'%';
  //					zis[el].style.float = 'left';
  //				}
  //			}
  //		}
  //	})

  //	Vue.directive('content', {
  //		// 当绑定元素插入到 DOM 中。
  //		inserted: function(el) {
  //			// 聚焦元素
  ////			//console.log(el)
  //		},
  //		bind: function(el, binding, vnode){
  ////			el.style.backgroundColor = 'rgba(0, 0, 255, 0.35)'
  ////			el.style.height = '50px'
  //		}
  //	})

  //	Vue.directive('slide', {
  //		// 当绑定元素插入到 DOM 中。
  //		inserted: function(el) {
  //			// 聚焦元素
  ////			//console.log(el)
  //		},
  //		bind: function(el, binding, vnode){
  //			//console.log(999)
  //
  //			$(el).addClass("swiper-container");
  //			$(el.children[0]).addClass("swiper-wrapper");
  //			$(el.children[0].children).addClass("swiper-slide");
  //
  //
  //		}
  //	})

  //	Vue.directive('models', {
  //		// 当绑定元素插入到 DOM 中。
  //		inserted: function(el) {
  //			// 聚焦元素
  ////			//console.log(el)
  //		},
  //		bind: function(el, binding, vnode){
  //			el.style.backgroundColor = 'rgba(0, 0, 255, 0.35)'
  //			el.style.height = '100%'
  //			el.style.top = '0px'
  //			el.style.position = 'fixed'
  //			el.style.width = '100%'
  //			el.style.overflow = 'hidden'
  //			el.style.display = 'none'
  //			el.style.zIndex = '1'
  //			//console.log(binding)
  //		},
  //		update: function (el,value) {
  ////			el.innerHTML = 'wew'
  //			//console.log(el)
  //		},
  //	})
</script>
