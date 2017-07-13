import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

const state = {
  isLogged: cookie().status('user'),
  user: cookie().get('user'),
  name: {
    type: '',
    content: '',
  },
  uuid: cookie().status('user') ? cookie().get('user').customerInfo.uuid : '',
  policy: {
  	activated: false, //激活账号
  	validationMobile: false, //绑定手机
  	validationGoogle: false, //绑定谷歌
  	authType: '', //等级(c1,c2等)
  	hasPayPassword: '', //资金密码
  	policyList: {
  		lists: [],//策略列表
  		policyStatus: false //根据策略列表是否有策略信息来赋布尔值(详见67-88行)
  	}
  },
  trade: '',
};

if (cookie().status('user')) {
  let user = cookie().get('user');
  if (user.customerInfo.nickname) {
    state.name.content = user.customerInfo.nickname;
    state.name.type = 'nickname'
  } else if (user.customerInfo.userName) {
    state.name.content = user.customerInfo.userName;
    state.name.type = 'userName'
  } else if (user.customerInfo.mobile) {
    state.name.content = user.customerInfo.mobile;
    state.name.type = 'mobile'
  } else if (user.customerInfo.email) {
    state.name.content = user.customerInfo.email;
    state.name.type = 'email'
  }
}

//首次从user下面获取策略信息
if(cookie().status('user')){
	let user = cookie().get('user');

	if(user.customerInfo.activated){
		state.policy.activated = user.customerInfo.activated;
	}

	if(user.customerInfo.mobile){
		state.policy.validationMobile = user.customerInfo.mobile;
	}

	if(user.customerInfo.otherGoogleIdentifier){
		state.policy.validationGoogle = user.customerInfo.otherGoogleIdentifier;
	}

	if(user.customerInfo.authType){
		state.policy.authType = user.customerInfo.authType;
	}

	if(user.customerInfo.hasPayPassword){
		state.policy.hasPayPassword = user.customerInfo.hasPayPassword;
	}
	//模拟添加资金密码
	//资金密码状态
//
//	let lists = user.policyList;
//	for( let i = 0; i < lists.length; i++){
//		if(lists[i].validationMode == 'trade'){
//			console.log("aaaa", lists[i].securityId)
//
//			if(lists[i].securityId == '5'){
//				state.trade = true;
//			}else if(lists[i].securityId == '6'){
//				state.trade = false;
//			}else if(lists[i].securityId == '5-2'){
//				if(cookie().status('rememberPaypwd')){
//					state.trade = true;
//				}else{
//					state.trade = false;
//				}
//			}
//		}
//	}

	//state.trade = user.policyList[1].securityId == '5' || user.policyList[1].securityId == '5-2' ? '5' : '6';
	//
/*securityId:
 	"1" =  密码登录
	"1,2"= "密码+（登录）谷歌验证器"
	"6"="不验证资金密码"
	"5-2"="两小时验证一次资金密码"
	"5"="每次都验证资金密码"
	"3,5"="短信验证码+资金密码"
	"2,5"="资金密码+（资金）谷歌验证码"
	"2,3,5"="资金密码+短信验证码+（资金）谷歌验证码"
	"3"="短信验证码"
	"2"="（设置）谷歌验证码"
	"2,3"="短信验证码+（设置）谷歌验证码"
	*/
	if(user.policyList.length > 0){
		let tempArr = [];
/*		//模拟添加策略信息
		user.policyList.push({
			securityId: "2,3,5"
		});
		//*/
		for(let i = 0; i < user.policyList.length; i++){
			if(user.policyList[i].validationMode == 'draw'){
				if(user.policyList[i].securityId == '3,5' || user.policyList[i].securityId == '2,5' || user.policyList[i].securityId ==  '2,3,5'){
					tempArr.push(user.policyList[i]);
					state.policy.policyList.policyStatus = true;
				}
			}
		}
		state.policy.policyList.lists = tempArr;
	}
}




export default {
  state,
  actions,
  getters,
  mutations
}
