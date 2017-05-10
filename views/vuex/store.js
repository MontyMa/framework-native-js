/**
 * Created by monty.ma on 17/5/10.
 */
import Vue from 'vue';       //引入vue
import Vuex from 'vuex';    //引入vuex

Vue.use(Vuex);      //告诉vue使用vuex

// 创建一个对象来保存应用启动时的初始状态
const state = {
    isSuccess: true,
    testState: '我是测试默认值'
};

// 创建一个对象存储一系列我们接下来要写的 mutation 函数
const mutations = {
    UPDATE_ISSUCCESS(state, val){
        state.isSuccess = val;
    },
    UPDATE_TESTSTATE(state, val){
        state.testState = val
    }
};

const getters = {
    is_success(state){
        return state.isSuccess;
    },
    test_state(state){
        return state.testState;
    }
};

const actions = {
    sub_is_success({commit}, val){              //是dispatch订阅key
        commit('UPDATE_ISSUCCESS', val)           // 'update' 是mutations里的key
    },
    sub_test_state({commit}, val){              //是dispatch订阅key
        commit('UPDATE_TESTSTATE', val)           // 'update' 是mutations里的key
    },
};

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
});


