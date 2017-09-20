import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Search from '@/components/Search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: 'search/:type/:hash',
          component: Search,
          props: true
        },
        {
          path: 'search/*',
          redirect: '/'
        }
      ]
    }
  ]
})
