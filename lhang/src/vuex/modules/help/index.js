import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

const state = {
  help_page_state: +sessionStorage.getItem('help_page_state')
};

export default {
  state,
  actions,
  getters,
  mutations
}
