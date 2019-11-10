// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 跨域
import axios from 'axios'
Vue.prototype.$axios = axios

// 全局环境下配置过滤器
Vue.filter('setWH', (url, arg) => {
  return url.replace((/w\.h/), arg);
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
