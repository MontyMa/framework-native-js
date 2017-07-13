const mutations = {
  logon(state, user) {
    state.isLogged = true;
    state.user = user;
    state.uuid = user.customerInfo.uuid;
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
    cookie().set('user', user)
  },
  logout(state) {
    cookie().del('user');
    state.isLogged = false;
    state.name.type = '';
    state.name.content = '';
    state.uuid = '';
    location.reload();
  },
  logchange(state, bool) {
    state.isLogged = bool
  },
  //登录时获取策略信息
  getPolicy(state, val){
    let user = val;

    if (user.customerInfo.activated) {
      state.policy.activated = user.customerInfo.activated;
    }

    if (user.customerInfo.mobile) {
      state.policy.validationMobile = user.customerInfo.mobile;
    }

    if (user.customerInfo.otherGoogleIdentifier) {
      state.policy.validationGoogle = user.customerInfo.otherGoogleIdentifier;
    }

    if (user.customerInfo.authType) {
      state.policy.authType = user.customerInfo.authType;
    }

    if (user.customerInfo.hasPayPassword) {
      state.policy.hasPayPassword = user.customerInfo.hasPayPassword;
    }

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
     "2,3"="短信验证码+（设置）谷歌验证码"*/
    if (user.policyList.length > 0) {
      let tempArr = [];
      for (let i = 0; i < user.policyList.length; i++) {
        if (user.policyList[i].securityId == '3,5' || user.policyList[i].securityId == '2,5' || user.policyList[i].securityId == '2,3,5') {
          tempArr.push(user.policyList[i]);
          state.policy.policyList.policyStatus = true;
        }
      }
      state.policy.policyList.lists = tempArr;
    }
  },

  //更新C1认证
  setC1Auth (state, val) {
    state.policy.authType = val;
  },
  changeNickName (state, val){
    state.user.customerInfo.nickname = val;
    //console.log(state.user.customerInfo.nickname);
  },
  changeTrade (state, val){
    //资金密码状态
    let user = cookie().get('user');
    let lists = user.policyList;
    for (let i = 0; i < lists.length; i++) {
      if (lists[i].validationMode == 'trade') {
        if (lists[i].securityId == '5') {
          state.trade = true;
        } else if (lists[i].securityId == '6') {
          state.trade = false;
        } else if (lists[i].securityId == '5-2') {
          if (cookie().status('rememberPaypwd')) {
            state.trade = false;
          } else {
            state.trade = true;
          }
        }
      }
    }
  }
};
export default mutations
