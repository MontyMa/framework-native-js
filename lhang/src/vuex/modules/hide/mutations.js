const mutations = {

  hideTatol(state, val){    //3 事件  state是index.js 里的state    val是由action分发的dispatch的值
    state.is_hide_tatol = val;
  }
};
export default mutations
