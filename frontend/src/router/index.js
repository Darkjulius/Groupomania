import { createRouter, createWebHistory } from 'vue-router'
import AddArticle from "../components/AddArticle.vue"

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../components/Login')
  },
  {
    path: '/add',
    name: 'add',
    component: AddArticle
  },
  {
    path: '/modifAccount',
    name: 'modifAccount',
    component: () => import('../components/ModifyAccount')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/Signup')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home')
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('../views/Account')
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router