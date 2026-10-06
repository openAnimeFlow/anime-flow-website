import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('@/view/home/HomeView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) {
      const headerHeight = Number.parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--site-header-height'),
      ) || 0
      return { el: to.hash, top: headerHeight + 24, behavior: 'smooth' }
    }
    return { top: 0 }
  },
})

export default router
