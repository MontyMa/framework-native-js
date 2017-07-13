//console.log("this is index")
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

const state = {
  thisPolicy: '',
  clearMsg: false,
  clearPolicyMsg: false,
  //安全等级
  mySecurityLevel: '低',
  myScore: 5, //安全等级积分
  unfinished: 0, //未完成项目
  finished: 1, //已完成项目
}

if (cookie().status('user')) {
  let user = cookie().get('user');
  let userInfo = user.customerInfo;
  let userPolicy = user.policyList;

  //邮箱
  if (userInfo.email) {
    state.myScore += 5;
    state.finished += 1;
  } else {
    state.unfinished += 1;
  }
  //手机
  if (userInfo.mobile) {
    state.myScore += 5;
    state.finished += 1;
  } else {
    state.unfinished += 1;
  }
  //资金谷歌
  if (userInfo.assetGoogleIdentifier) {
    state.myScore += 5;
    state.finished += 1;
  } else {
    state.unfinished += 1;
  }
  //设置谷歌
  if (userInfo.otherGoogleIdentifier) {
    state.myScore += 5;
    state.finished += 1;
  } else {
    state.unfinished += 1;
  }
  //谷歌登录
  if (userInfo.googleIdentifier) {
    state.myScore += 5;
    state.finished += 1;
  } else {
    state.unfinished += 1;
  }
  //资金密码
  if (userInfo.hasPayPassword) {
    state.myScore += 5;
    state.finished += 1;
  } else {
    state.unfinished += 1;
  }
  //策略
  for (let i = 0; i < userPolicy.length; i++) {
    if (userPolicy[i].securityId != 6) {
      state.myScore += 5;
      state.finished += 1;
    } else {
      state.unfinished += 1;
    }
  }

  if (state.myScore <= 30) {
    state.mySecurityLevel = "低";
  } else if (state.myScore > 30 && state.myScore < 55) {
    state.mySecurityLevel = "中";
  } else if (state.myScore >= 55) {
    state.mySecurityLevel = "高";
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
