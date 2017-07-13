export const logout = ({commit}) => {
  commit('logout')
};

export const logon = ({commit}, user) => {
  commit('logon', user)
};

export const getPolicy = ({commit}, cookieMsg) => {
  commit('getPolicy', cookieMsg)
};

export const setC1Auth = ({commit}, val) => {
  commit('setC1Auth', val)
};

export const changeNickName = ({commit}, val) => {
  commit('changeNickName', val)
};

export const changeTrade = ({commit}) => {
  commit('changeTrade')
};