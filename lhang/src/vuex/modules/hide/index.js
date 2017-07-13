import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

let getState = () => {
  let get_state = JSON.parse(localStorage.getItem('total_hide_state'));

  if (!get_state) return false;

  let time = get_state.time;
  let last_time = +new Date();

  //记住一个星期
  return time + 604800000 <= last_time ? false : get_state.state;
};

const state = {
  is_hide_tatol: getState()    //2.设置默认值
};

export default {
  state,
  actions,
  getters,
  mutations
}
