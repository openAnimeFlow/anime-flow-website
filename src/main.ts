import { createApp, createSSRApp } from 'vue'
import '@/style.css'
import App from '@/App.vue'
import { createSiteRouter } from '@/router'
import { initializeTheme } from '@/theme'

const router = createSiteRouter()
const app = document.querySelector('#app')?.childElementCount ? createSSRApp(App) : createApp(App)
app.use(router)
router.isReady().then(() => {
  app.mount('#app')
  initializeTheme()
})
