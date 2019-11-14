//仓库共有属性的集合，用于存储公共状态，只储存，不能在state里直接修改状态
const state = {
    nm: window.localStorage.getItem('curNm') || '北京',
    id: window.localStorage.getItem('curId') || '1'
}

const actions = {

}

// 在mutations对象中可以定义一系列方法，可专门用于修改state常量中保存的属性的状态
const mutations = {
    CITY_INFO(state, payload){
        state.nm = payload.nm,
        state.id = payload.id
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}