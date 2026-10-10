import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'
import { applySeo } from '@/config/seo'

const Home = () => import('@/view/home/HomeView.vue')
const Introduction = () => import('@/view/introduction/IntroductionView.vue')
const Architecture = () => import('@/view/architecture/ArchitectureView.vue')

export function createSiteRouter() {
  const router = createRouter({
    history: import.meta.env.SSR
      ? createMemoryHistory(import.meta.env.BASE_URL)
      : createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/introduction',
            name: 'introduction',
            component: Introduction,
        },
        {
            path: '/architecture',
            name: 'architecture',
            component: Architecture,
        },
        {
            path: '/:pathMatch(.*)*',
            component: () => import('@/view/NotFoundView.vue'),
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

  router.afterEach(to => {
    if (!import.meta.env.SSR) applySeo(to.path)
  })

  return router
}
