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
      // 如果希望網頁有一固定版面，當網址改動時版面不動，只改變內容，你可以用children來放變動內容的router
      // 並在固定內容的.vue中以<router-view>表示當前路徑對應到的children
      path: '/order',
      name: 'Layout',
      component: Layout
      // You can edit/add/remove/change the objects in children to reach SPA //
      // 如果路徑希望接續父router，path不要以/開頭。若不希望接續則反之。
    }
  ]
})
