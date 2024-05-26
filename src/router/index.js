import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Profil from '../views/Profil.vue'
import Home from '../views/Home.vue'
import stvoriTermin from '../views/stvoriTermin.vue'
import mojTermin from '../views/mojTermin.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/profil',
    name: 'Profil',
    component: Profil
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/stvori-termin',
    name: 'stvoriTermin',
    component: stvoriTermin
  },
  {
    path: '/moj-termin',
    name: 'mojTermin',
    component: mojTermin
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
