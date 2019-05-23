import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import 'common/stylus/index.styl'
import fastclick from 'fastclick'
import lazyload from 'vue-lazyload'
import store from './store'
fastclick.attach(document.body)
Vue.config.productionTip = false
Vue.use(lazyload, {
  preLoad: 1.3,
  loading: require('common/image/default.png'),
  attempt: 1
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
