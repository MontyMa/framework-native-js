export const isLogged = state => state.isLogged;
export const getUser = state => state.user;
export const userName = state => state.name;
export const uuid = state => state.uuid;
//获取授权信息

/*export const policy = state => state.policy;*/
export const activated = state => state.policy.activated;
export const validationMobile = state => state.policy.validationMobile;
export const validationGoogle = state => state.policy.validationGoogle;
export const authType = state => state.policy.authType;
export const hasPayPassword = state => state.policy.hasPayPassword;
export const policyList = state => state.policy.policyList;

export const trade = state => state.trade;