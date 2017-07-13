/**
 * Created by monty.ma on 17/4/6.
 */
//type: 0 消失 ，1 绑定， 2 重置， 3 未启用
let data = [{
  pic: {
    binded: require('./imgs/security_phone.svg'),
    unbind: require('./imgs/security_phone0.svg')
  },
  name: '手机绑定',
  status: false,
  tips: [
    '您绑定的手机是',
    '您尚未绑定手机'
  ],
  bind: '--',
  type: '1',
  items: [
    "phone_bind", "phone_edit"
  ]
}, {
  pic: {
    binded: require('./imgs/security_email.svg'),
    unbind: require('./imgs/security_email0.svg')
  },
  name: '邮箱绑定',
  status: false,
  tips: [
    '您绑定的邮箱是',
    '您尚未绑定邮箱'
  ],
  bind: '--',
  type: '1',
  items: [
    'email_bind'
  ]
}, {
  pic: {
    binded: require('./imgs/security_google.svg'),
    unbind: require('./imgs/security_google0.svg')
  },
  name: '谷歌验证器',
  status: false,
  tips: [
    '经常收不到短信验证码，建议绑定谷歌验证器',
    '您尚未绑定谷歌验证'
  ],
  bind: "",
  type: '1',
  items: [
    'google', 'google'
  ]
}, {
  pic: {
    binded: require('./imgs/security_password.svg'),
    unbind: require('./imgs/security_password0.svg')
  },
  name: '登录密码',
  status: false,
  tips: [
    '登录交易所时使用',
    '您尚未绑定密码安全'
  ],
  items: [
    'password', 'password'
  ],
  type: '1',
}, {
  pic: {
    binded: require('./imgs/security_funding.svg'),
    unbind: require('./imgs/security_funding0.svg')
  },
  name: '资金密码',
  status: false,
  tips: [
    '账户资金变更时，需先验证该资金密码',
    '您尚未绑定密码安全'
  ],
  items: [
    'funding_bind', 'funding_edit'
  ],
  type: '1',
}];

const setList = {
	get_policy_init: function() {
		return data;
	},
	get_data: function(user) {
		for(var i of data){
			switch (i.name){
				case '手机绑定':
				i.status = user.customerInfo.mobile ? true : false;
				i.type = i.status ? '2' : '1';
				i.bind = user.customerInfo.mobile;
				break;
				case '邮箱绑定':
				i.status = user.customerInfo.email ? true : false;
				i.type = i.status ? '0' : '1';
				i.bind = user.customerInfo.email;
				break;
				case '谷歌验证器':
				i.status = user.customerInfo.googleIdentifier || user.customerInfo.assetGoogleIdentifier || user.customerInfo.otherGoogleIdentifier ? true : false;
				i.type = i.status ? '2' : '1';
				break;
				case '登录密码':
				i.status = true;
				i.type = '2'
				break;
				case '资金密码':
				i.status = user.customerInfo.hasPayPassword ? true : false;
				if(!this.pwd_unable(user)){
					i.type = '3';
				}else{
					i.type = i.status ? '2' : '1';
				}
				break;
			}
		}
		return data;
	},
	pwd_unable: function(user) {
		let bool = false;
		for (let i = 0; i < user.policyList.length; i++) {
			if(user.policyList[i].validationMode == 'security'){
				bool = true;
			}
		}
		return bool;
	}
}

export default setList;
