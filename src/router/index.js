import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import AuthPage from '../pages/AuthPage.vue'
import { forbidUnauthenticated } from './navigationGuards'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
      beforeEnter: forbidUnauthenticated,
    },
    {
      path: '/auth',
      name: 'AuthPage',
      component: AuthPage,
    },
  ],
})

export default router
