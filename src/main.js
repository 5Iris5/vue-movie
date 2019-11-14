// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// 跨域
import axios from 'axios'
Vue.prototype.$axios = axios

// 全局环境下配置过滤器
Vue.filter('setWH', (url, arg) => {
  url = url + '';  // 确保url一定是字符串格式
  return url.replace((/w\.h/), arg);
})

// 全局环境下配置better-scroll滚动/点击功能
import Scroller from '@/components/Scroller'
Vue.component('Scroller', Scroller)  // '组件名称', 组件

// 全局环境下配置loading
import Loading from '@/components/Loading'
Vue.component('Loading', Loading)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
