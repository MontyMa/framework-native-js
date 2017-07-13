window.cookie = function($window) {
    function getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        arr = document.cookie.match(reg)
        if(arr && arr[2] != 'null')
            return unescape(arr[2]);
        else
            return null;
    }
    return {
        //存储单个属性
        set: function(key, value) {
        	var values = JSON.stringify(value);
            var exp = new Date();
            exp.setTime(exp.getTime() + (0.5 * 60) * 60 * 1000);
//			exp.setTime(exp.getTime() + 900 * 1000);
            document.cookie = key + "=" + escape(values) + ";expires=" + exp.toGMTString();
        },
        del: function(key) {
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
        	var cval = getCookie(key)
            document.cookie = key + "=" + cval + ";expires=" + exp.toGMTString();
        },
        get:function(key) {
	        var arr, reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
	        arr = document.cookie.match(reg)
	        let r = {};
	        if(arr && arr[2] != 'null'){
		        	try{
		        		r = JSON.parse(unescape(arr[2]))
		        	}catch(e){
		        		//TODO handle the exception
		        		r = {};
		        	}
	        		return r;
	        }
	        else
	            return {};
        },
        status:function(key) {
	        var arr, reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
	        arr = document.cookie.match(reg)
	        if(arr && arr[2] != 'null'){
	        		let r = {};
	        		try{
		        		r = JSON.parse(unescape(arr[2]))
		        		return true;
		        	}catch(e){
		        		//TODO handle the exception
		        		r = {};
		        		return false;
		        	}
	        }
	        else
	            return false;
        },
        delay:function(key) {
        	var cval = getCookie(key)
        	var values = cval;
            var exp = new Date();
            exp.setTime(exp.getTime() + (0.5 * 60) * 60 * 1000);
//			exp.setTime(exp.getTime() + 900 * 1000);
            document.cookie = key + "=" + escape(values) + ";expires=" + exp.toGMTString();
        },
        //记住账户名
        rememberAccount: function(key, value) {
        	var values = JSON.stringify(value);
            var exp = new Date();
            exp.setTime(exp.getTime() + (7 * 24 * 60) * 60 * 1000);
//			exp.setTime(exp.getTime() + 900 * 1000);
            document.cookie = key + "=" + escape(values) + ";expires=" + exp.toGMTString();
        },
        //5-2  记住资金密码两个小时
        rememberPayPwd: function(key, value) {
	    	var values = JSON.stringify(value);
	        var exp = new Date();
	        exp.setTime(exp.getTime() + (2 * 60) * 60 * 1000);
	        document.cookie = key + "=" + escape(values) + ";expires=" + exp.toGMTString();
        },
    };
};