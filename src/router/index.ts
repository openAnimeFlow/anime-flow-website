import {createRouter, createWebHistory} from 'vue-router'

const Home = () => import('@/view/home/HomeView.vue')
const Introduction = () => import('@/view/introduction/IntroductionView.vue')
const Architecture = () => import('@/view/architecture/ArchitectureView.vue')

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
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
            meta: {title: '项目介绍 · AnimeFlow'},
        },
        {
            path: '/architecture',
            name: 'architecture',
            component: Architecture,
            meta: {title: '架构设计 · AnimeFlow'},
        },
    ],
    scrollBehavior(to, _from, savedPosition) {
        if (savedPosition) return savedPosition
        if (to.hash) {
            const headerHeight = Number.parseFloat(
                getComputedStyle(document.documentElement).getPropertyValue('--site-header-height'),
            ) || 0
            return {el: to.hash, top: headerHeight + 24, behavior: 'smooth'}
        }
        return {top: 0}
    },
})

router.afterEach(to => {
    document.title = typeof to.meta.title === 'string'
        ? to.meta.title
        : 'AnimeFlow — 跨平台动漫追番播放器'
})

export default router
