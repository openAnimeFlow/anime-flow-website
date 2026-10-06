<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import FlowIcon from '@/components/FlowIcon.vue'
import { releasesUrl, repoUrl } from '@/config/site'
import { useTheme } from '@/theme'

const { theme, toggleTheme } = useTheme()
const route = useRoute()
const menuOpen = ref(false)
function closeMenu() { menuOpen.value = false }
function handleKeydown(event: KeyboardEvent) { if (event.key === 'Escape') closeMenu() }
watch(() => route.fullPath, closeMenu)
onMounted(() => document.addEventListener('keydown', handleKeydown))
onBeforeUnmount(() => document.removeEventListener('keydown', handleKeydown))
</script>

<template>
  <header class="site-header">
    <div class="site-nav">
      <RouterLink
        class="site-brand"
        :to="{ path: '/', hash: '#main' }"
        aria-label="AnimeFlow 首页"
        @click="closeMenu"
      >
        <img
          src="/images/logo.webp"
          width="38"
          height="38"
          alt=""
        ><span>AnimeFlow<span class="brand-dot">.</span></span>
      </RouterLink>
      <nav
        class="desktop-nav"
        aria-label="官网导航"
      >
        <RouterLink :to="{ path: '/', hash: '#features' }">
          功能体验
        </RouterLink><RouterLink :to="{ path: '/', hash: '#experience' }">
          多端体验
        </RouterLink><a
          :href="`${repoUrl}#readme`"
          target="_blank"
          rel="noopener noreferrer"
        >使用指南 <span>↗</span></a>
      </nav>
      <div class="nav-actions">
        <button
          class="theme-toggle"
          type="button"
          :aria-label="theme === 'dark' ? '切换到浅色主题' : '切换到深色主题'"
          :title="theme === 'dark' ? '切换到浅色主题' : '切换到深色主题'"
          @click="toggleTheme"
        >
          <FlowIcon :name="theme === 'dark' ? 'sun' : 'moon'" />
        </button>
        <a
          class="github-link"
          :href="repoUrl"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="访问 GitHub 仓库"
        ><FlowIcon name="github" /></a><a
          :href="releasesUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="nav-download"
          @click="closeMenu"
        >
          下载客户端 <FlowIcon
            name="arrow"
            :size="16"
          />
        </a><button
          class="menu-toggle"
          :aria-expanded="menuOpen"
          aria-controls="site-mobile-nav"
          aria-label="展开或收起导航"
          @click="menuOpen = !menuOpen"
        >
          <FlowIcon :name="menuOpen ? 'close' : 'menu'" />
        </button>
      </div>
    </div>
    <nav
      v-show="menuOpen"
      id="site-mobile-nav"
      class="mobile-nav"
      aria-label="移动端导航"
    >
      <RouterLink
        :to="{ path: '/', hash: '#features' }"
        @click="closeMenu"
      >
        功能体验
      </RouterLink><RouterLink
        :to="{ path: '/', hash: '#experience' }"
        @click="closeMenu"
      >
        多端体验
      </RouterLink><a
        :href="releasesUrl"
        target="_blank"
        rel="noopener noreferrer"
        @click="closeMenu"
      >
        下载客户端
      </a><a
        :href="`${repoUrl}#readme`"
        target="_blank"
        rel="noopener noreferrer"
        @click="closeMenu"
      >使用指南 ↗</a>
    </nav>
  </header>
</template>

<style scoped>
.site-header { position: fixed; inset: 0 0 auto; z-index: 50; background: var(--home-bg); border-bottom: 1px solid var(--home-line); color: var(--home-ink); }
.site-header * { box-sizing: border-box; }
.site-header a { color: inherit; text-decoration: none; }
.site-header button { font: inherit; cursor: pointer; }
.site-header a:focus-visible, .site-header button:focus-visible { outline: 3px solid var(--home-accent); outline-offset: 5px; }
.site-nav { width: calc(100% - 112px); max-width: 1240px; margin-inline: auto; height: var(--site-header-height); display: flex; align-items: center; justify-content: space-between; gap: 30px; }
.site-brand { display: inline-flex; align-items: center; gap: 10px; font-size: 23px; font-weight: 700; letter-spacing: -.8px; line-height: 1; }
.site-brand img { display: block; border-radius: 11px; }
.brand-dot { color: var(--home-accent); }
.desktop-nav { display: flex; gap: 34px; align-items: center; color: var(--home-muted); font-size: 13px; }
.desktop-nav a:hover { color: var(--home-accent); }
.desktop-nav a > span { margin-left: 3px; }
.nav-actions { display: flex; gap: 24px; align-items: center; }
.github-link { display: flex; }
.theme-toggle { display: flex; align-items: center; justify-content: center; flex-shrink: 0; width: 40px; height: 40px; border: 1px solid var(--home-line); border-radius: 10px; background: transparent; color: var(--home-muted); }
.theme-toggle:hover { background: var(--home-soft); color: var(--home-accent); }
.nav-download { display: flex; gap: 16px; align-items: center; padding: 11px 16px; border-radius: 8px; background: var(--home-soft); font-size: 12px; font-weight: 600; }
.menu-toggle { display: none; padding: 8px; background: transparent; color: var(--home-ink); border: 0; }
.mobile-nav { position: absolute; inset: 100% 0 auto; display: flex; padding: 16px 24px 24px; max-height: calc(100dvh - var(--site-header-height)); overflow-y: auto; background: var(--home-bg); border-bottom: 1px solid var(--home-line); flex-direction: column; gap: 18px; box-shadow: 0 16px 24px var(--home-menu-shadow); }
@media (min-width: 851px) { .mobile-nav { display: none !important; } }
@media (max-width: 1100px) { .site-nav { width: calc(100% - 64px); } }
@media (max-width: 850px) {
  .site-nav { width: calc(100% - 48px); }
  .desktop-nav { display: none; }
  .menu-toggle { display: flex; }
  .nav-actions { gap: 15px; }
}
@media (max-width: 600px) {
  .site-nav { width: calc(100% - 40px); gap: 12px; }
  .site-brand { font-size: 20px; gap: 8px; }
  .site-brand img { width: 32px; height: 32px; border-radius: 9px; }
  .nav-actions { gap: 7px; }
  .github-link { display: none; }
  .nav-download { font-size: 11px; padding: 9px 11px; }
  .nav-download svg { display: none; }
}
@media (max-width: 420px) {
  .nav-download { display: none; }
}
</style>
