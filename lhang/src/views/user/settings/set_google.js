//status: 0 未启用, 1 绑定, 2 重置
let googleList = [{
		type: "登录",
		hint: "用于登录时的二次验证",
		status: '',
		disable: false,
		items: [
			'google/login/bind', "google/login/edit"
		]
	},
	{
		type: "设置",
		hint: "用于账户设置修改验证",
		status: '',
		disable: false,
		items: [
			'google/settings/bind', "google/settings/edit"
		]
	},
	{
		type: "资金",
		hint: "用于资金安全管理",
		status: '',
		disable: false,
		items: [
			'google/funding/bind', "google/funding/edit"
		]
	},
];

const setList = {
	google_list_init() {
		return googleList;
	},
	get_data(user) {
		for(let i of googleList) {
			switch(i.type) {
				case '登录':
					if(user.customerInfo.mobile) {
						i.status = user.customerInfo.googleIdentifier ? 2 : 1;
					} else if(user.customerInfo.email) {
						for(let j = 0; j < user.policyList.length; j++) {
							if(user.policyList[j].validationMode == 'security') {
								
								if(user.customerInfo.googleIdentifier){
									i.status = '2';
								}else if(user.policyList[j].securityId == '2' || user.policyList[j].securityId == '2,3') {
									i.status = '1';
								}
								
							} else {
								i.status = '0';
								i.disable = true;
							}
						}
					}
					break;
				case '设置':
					i.status = user.customerInfo.otherGoogleIdentifier ? 2 : 1;
					break;
				case '资金':
					if(user.customerInfo.mobile) {
						i.status = user.customerInfo.assetGoogleIdentifier ? 2 : 1;
					} else if(user.customerInfo.email) {
						for(let j = 0; j < user.policyList.length; j++) {
							if(user.policyList[j].validationMode == 'security') {
								
								if(user.customerInfo.assetGoogleIdentifier){
									i.status = '2';
								} else if (user.policyList[j].securityId == '2' || user.policyList[j].securityId == '2,3') {
									i.status = '1';
								}
								
							} else {
								i.status = '0';
								i.disable = true;
							}
						}
					}
					break;
			}
		}
		return googleList;
	}
}

export default setList;