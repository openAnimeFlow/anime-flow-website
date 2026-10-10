import { createSSRApp } from 'vue'
import { renderToString } from '@vue/server-renderer'
import App from './App.vue'
import { createSiteRouter } from './router'

export { seoPages, renderSeoHead, escapeHtml } from './config/seo'
export { siteUrl, pageUrl, publicAsset } from './config/site'

export async function render(path: string) {
  const router = createSiteRouter()
  const app = createSSRApp(App)
  app.use(router)
  await router.push(path)
  await router.isReady()
  return renderToString(app)
}
