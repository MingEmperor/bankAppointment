import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Main from '@/components/Main'

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
    }
  ]
})
