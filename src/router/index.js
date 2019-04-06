import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout'
import Home from '../Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/order',
      name: 'Layout',
      component: Layout,
      // You can edit/add/remove/change the objects in children to reach SPA //
      // 舉例來說，下面是新增一個頁面，路徑為"/order/home2" //
      children: [
        {
          path: 'home2',
          name: 'Home2',
          component: Home
        }
      ]
    }
  ]
})
