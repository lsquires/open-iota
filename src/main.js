// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import AsyncComputed from 'vue-async-computed'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import IOTA from 'iota.lib.js'

Vue.use(IOTA)
Vue.use(Buefy)
Vue.use(AsyncComputed)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
