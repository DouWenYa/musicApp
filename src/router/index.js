import Vue from 'vue'
import Router from 'vue-router'
import Singer from 'components/singer/singer'
import Rank from 'components/rank/rank'
import Search from 'components/search/search'
// import Recommend from 'components/recommend/recommend'
// import SingerDatail from 'components/singer-detail/singer-detail'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      // component: Recommend,
      component: resolve =>
        require(['components/recommend/recommend'], resolve),
      children: [
        {
          path: ':id',
          component: () => import('components/discover/discover')
        }
      ]
    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: () => import('components/singer-detail/singer-detail')
        }
      ]
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/rank',
      component: Rank
    }
  ]
})
