import { createRouter, createWebHistory as createHistory } from 'vue-router'

const routes = [
  {
    path: '/car',
    name: 'Car',
    component: () => import('@/views/car/index.vue')
  },
  {
    path: '/door',
    name: 'Door',
    component: () => import('@/views/door/index.vue')
  },
  {
    path: '/',
    redirect: '/home'
  }
]

const router = createRouter({
  history: createHistory(),
  routes: routes
})

export default router
