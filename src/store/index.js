// vuex就是一个前端的公共仓库（状态管理工具），用于平行组件间的通信（传值，双向数据绑定

import Vue from 'vue'
import Vuex from 'vuex'
import city from './city'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {

    },
    actions: {

    },
    mutations: {

    },
    modules: {
        city
    }
})
