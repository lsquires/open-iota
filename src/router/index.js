import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Search from '@/components/Search'
import CreateWallet from '@/components/CreateWallet'
import ImportWallet from '@/components/ImportWallet'
import Other from '@/components/Other'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/search/:type/:hash',
          name: 'Search',
          component: Search,
          props: true
        },
        {
          path: '/create-wallet',
          name: 'Create',
          component: CreateWallet
        },
        {
          path: '/import-wallet',
          name: 'Import',
          component: ImportWallet
        },
        {
          path: '/other',
          name: 'Other',
          component: Other
        }
      ]
    }
  ]
})
