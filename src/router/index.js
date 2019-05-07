import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Main from '@/components/Main'
import Manage from '@/components/Manage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    }, {
      path: '/components/Register',
      name: 'Register',
      component: Register
    }, {
      path: '/components/Main',
      name: 'Main',
      component: Main
    }, {
      path: '/components/Manage',
      name: 'Manage',
      component: Manage
    }
  ]
})
