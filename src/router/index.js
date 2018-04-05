import Vue from 'vue'
import Router from 'vue-router'
import Passage from '../components/Passage'
import WaterFlow from '../components/WaterFlow'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/post/:filename',
      component: Passage,
      props: true
    }, {
      path: '/home',
      component: WaterFlow
    }, {
      path: '/',
      redirect: '/home'
    }
  ]
})
