/**
 * Created by monty.ma on 17/5/10.
 */
import Vue from 'vue';       //引入vue
import Vuex from 'vuex';    //引入vuex

Vue.use(Vuex);      //告诉vue使用vuex

// 创建一个对象来保存应用启动时的初始状态
const state = {
    // TODO: 放置初始状态
    isSuccess: true,
    
};

// 创建一个对象存储一系列我们接下来要写的 mutation 函数
const mutations = {
    // TODO: 放置我们的状态变更函数
    update(state, val){
        console.log(state, 'state');
        console.log(val, 'val');
        state.isSuccess = val;
    }
};

const getters = {
    is_success(state, val){
        return state.isSuccess;
    }
};

const actions = {
    update({commit}, val){           //是dispatch订阅key
        commit('update', val)
    }
};

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
});


