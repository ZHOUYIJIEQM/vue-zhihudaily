// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'lib-flexible'
import '@/styles/common.scss'
import '@/styles/iconfont/iconfont.css'
import 'mint-ui/lib/style.css'
import {Toast} from 'mint-ui'

Vue.config.productionTip = false

Vue.prototype.$toast = Toast

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
