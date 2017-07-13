//当前安全策略
let securityState = [
	{
		type: "手机",
		account: "",
		showAccount: true,
		status: false,
		icon: {
			bind: require('./imgs/mobile.svg'),
			unbind: require('./imgs/mobile0.svg')
		},
		sethref: '#/user/settings/phone_bind',
		modifyhref: '#/user/settings/phone_edit'
	}, {
		type: "谷歌验证器",
		account: "",
		showAccount: false,
		status: false,
		icon: {
			bind: require('./imgs/google.svg'),
			unbind: require('./imgs/google0.svg'),
		},
		sethref: '#/user/settings/google',
		modifyhref: '#/user/settings/google'
	}, {
		type: "资金密码",
		account: "13654298425",
		showAccount: false,
		status: false,
		icon: {
			bind: require('./imgs/paypassword.svg'),
			unbind: require('./imgs/paypassword0.svg')
		},
		sethref: '#/user/settings/funding_edit',
		modifyhref: '#/user/settings/funding_edit'
	},
];
//账户安全策略
let accountPolicy = [
	{
		pic: {
			bind: require('./imgs/login_check0.svg'),
			unbind: require('./imgs/login_check.svg'),
		},
		name: '登录验证',
		hint: '登录交易所的验证方法',
		policyType: "登录密码",
		status: false,
		items: ['bind/modify_login_check', 'unbind/modify_login_check']
	}, {
		pic: {
			bind: require('./imgs/modify_check0.svg'),
			unbind: require('./imgs/modify_check.svg'),
		},
		name: '修改设置验证',
		hint: '更改安全中心的各项设置',
		policyType: "Google验证码+短信验证码",
		status: false,
		items: ['bind/modify_setting_check', 'unbind/modify_setting_check']
	},
];
//资金安全策略
let assetPolicy = [
	{
		pic: {
			bind: require('./imgs/trade_check0.svg'),
			unbind: require('./imgs/trade_check.svg'),
		},
		name: '交易验证',
		hint: '进行人民币现货交易，美元现货交易时',
		policyType: "不验证资金密码",
		status: false,
		items: ['bind/modify_trade_check', 'unbind/modify_trade_check']
	}, {
		pic: {
			bind: require('./imgs/withdraw_check0.svg'),
			unbind: require('./imgs/withdraw_check.svg'),
		},
		name: '提现验证',
		hint: '进行各种提现操作时',
		policyType: "短信验证码+资金验证码",
		status: false,
		items: ['bind/modify_withdraw_check', 'unbind/modify_withdraw_check']
	},
];

const setPolicy = {
	setsecurity_init () {
		return securityState;
	},
	accountPolicy_init () {
		return accountPolicy;
	},
	assetPolicy_init () {
		return assetPolicy;
	},
	//当前安全策略
	setsecurityState (user) {
		for(let i of securityState){
			switch (i.type){
				case '手机':
					i.status = user.customerInfo.mobile? true : false;
					i.account = user.customerInfo.mobile;
					break;
				case '谷歌验证器':
					i.status = user.customerInfo.googleIdentifier || user.customerInfo.assetGoogleIdentifier || user.customerInfo.otherGoogleIdentifier ? true : false;
					break;
				case '资金密码':
					i.status = user.customerInfo.hasPayPassword ? true : false;
					break;
			}
		}
		return securityState;
	},
	//账户安全策略
	setaccountPolicy (user) {
		for(let i of accountPolicy) {
			switch (i.name){
				case '登录验证':
					for(let j = 0; j < user.policyList.length; j++){
						if(user.policyList[j].validationMode == 'login'){
							i.status = true;
							i.policyType = user.policyList[j].showText;
						}
					}
					break;
				case '修改设置验证':
					for(let k = 0; k < user.policyList.length; k++){
						if(user.policyList[k].validationMode == 'security'){
							i.status = true;
							i.policyType = user.policyList[k].showText;
						}
					}
					break;
			}
		}
		return accountPolicy;
	},
	//资金安全策略
	setassetPolicy (user) {
		for(let i of assetPolicy) {
			switch (i.name){
				case '交易验证':
					for(let j = 0; j < user.policyList.length; j++){
						if(user.policyList[j].validationMode == 'trade'){
							i.status = true;
							i.policyType = user.policyList[j].showText;
						}
					}
					break;
				case '提现验证':
					for(let k = 0; k < user.policyList.length; k++){
						if(user.policyList[k].validationMode == 'draw'){
							i.status = true;
							i.policyType = user.policyList[k].showText;
						}
					}
					break;
			}
		}
		return assetPolicy;
	},
};
export default setPolicy;