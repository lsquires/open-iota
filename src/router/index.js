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
      component: Home
    },
    {
      path: '/search/:type/:hash',
      name: 'Search',
      component: Search
    }
  ]
})
