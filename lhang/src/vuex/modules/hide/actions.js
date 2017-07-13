export const is_hide_tatol = ({commit}, val) => {   //is_hide_tatol  是dispatch订阅key
  commit('hideTatol', val)      // 'hideTatol' 是mutation里的key
};

