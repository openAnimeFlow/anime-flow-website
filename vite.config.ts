import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode, isPreview }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = new URL(env.VITE_SITE_URL || 'https://web.ligg.top/')
  if (siteUrl.protocol !== 'https:' || siteUrl.search || siteUrl.hash) {
    throw new Error('VITE_SITE_URL must be an HTTPS URL without a query or fragment')
  }
  return {
    base: `${siteUrl.pathname.replace(/\/$/, '')}/`,
    appType: isPreview ? 'mpa' : 'spa',
    build: { manifest: true },
    plugins: [vue(), tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
