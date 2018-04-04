import Vue from 'vue'
import Router from 'vue-router'
import Passage from '../components/Passage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/post/:filename',
      component: Passage,
      props: true
    }
  ]
})
