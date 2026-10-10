<script setup lang="ts">
import {computed, onBeforeUnmount, onMounted, ref, watch} from 'vue'
import {RouterLink, useRoute} from 'vue-router'
import FlowIcon from '@/components/FlowIcon.vue'
import {repoUrl} from '@/config/site'
import {useTheme, type ThemePreference} from '@/theme'

const {preference, setTheme} = useTheme()
const themeOptions = [
  { value: 'system', label: '跟随系统', icon: 'desktop' },
  { value: 'dark', label: '深色', icon: 'moon' },
  { value: 'light', label: '浅色', icon: 'sun' },
] as const
const currentTheme = computed(() => themeOptions.find(option => option.value === preference.value)!)
const themeMenu = ref<HTMLDetailsElement>()
const route = useRoute()
const menuOpen = ref(false)

function closeMenu() {
  menuOpen.value = false
}

function closeThemeMenu(restoreFocus = false) {
  if (!themeMenu.value?.open) return
  themeMenu.value.open = false
  if (restoreFocus) themeMenu.value.querySelector('summary')?.focus()
}

function selectTheme(value: ThemePreference) {
  setTheme(value)
  closeThemeMenu(true)
}

function toggleMenu() {
  closeThemeMenu()
  menuOpen.value = !menuOpen.value
}

function handlePointerdown(event: PointerEvent) {
  if (event.target instanceof Node && !themeMenu.value?.contains(event.target)) closeThemeMenu()
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    closeMenu()
    closeThemeMenu(true)
  }
}

watch(() => route.fullPath, () => {
  closeMenu()
  closeThemeMenu()
})
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
  document.addEventListener('pointerdown', handlePointerdown)
})
onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.removeEventListener('pointerdown', handlePointerdown)
})
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
        <RouterLink
          :to="{ name: 'home' }"
          :class="{ 'nav-current': route.name === 'home' }"
        >
          简介
        </RouterLink>
        <RouterLink
          to="/introduction"
          :class="{ 'nav-current': route.name === 'introduction' }"
        >
          项目介绍
        </RouterLink>
        <RouterLink
          to="/architecture"
          :class="{ 'nav-current': route.name === 'architecture' }"
        >
          架构设计
        </RouterLink>
        <a
          :href="`${repoUrl}#readme`"
          target="_blank"
          rel="noopener noreferrer"
        >使用指南 <FlowIcon
          class="external-link-icon"
          name="arrow-up-right"
          :size="14"
        /></a>
      </nav>
      <div class="nav-actions">
        <details
          ref="themeMenu"
          class="theme-control"
        >
          <summary
            class="theme-toggle"
            :aria-label="`主题：${currentTheme.label}`"
            :title="`主题：${currentTheme.label}`"
            @click="closeMenu"
          >
            <FlowIcon :name="currentTheme.icon" />
          </summary>
          <div
            class="theme-options"
            role="group"
            aria-label="主题模式"
          >
            <button
              v-for="option in themeOptions"
              :key="option.value"
              type="button"
              :aria-pressed="preference === option.value"
              @click="selectTheme(option.value)"
            >
              <FlowIcon
                :name="option.icon"
                :size="18"
              />
              <span>{{ option.label }}</span>
              <FlowIcon
                v-if="preference === option.value"
                name="check"
                :size="16"
              />
            </button>
          </div>
        </details>
        <a
          class="github-link"
          :href="repoUrl"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="访问 GitHub 仓库"
        >
          <FlowIcon name="github" />
        </a>
        <button
          class="menu-toggle"
          type="button"
          :aria-expanded="menuOpen"
          aria-controls="site-mobile-nav"
          aria-label="展开或收起导航"
          @click="toggleMenu"
        >
          <span class="menu-toggle-icon">
            <Transition name="menu-icon">
              <FlowIcon
                :key="menuOpen ? 'close' : 'menu'"
                :name="menuOpen ? 'close' : 'menu'"
              />
            </Transition>
          </span>
        </button>
      </div>
    </div>
    <Transition name="mobile-menu">
      <nav
        v-show="menuOpen"
        id="site-mobile-nav"
        :inert="!menuOpen"
        class="mobile-nav"
        aria-label="移动端导航"
      >
        <RouterLink
          :to="{ name: 'home' }"
          :class="{ 'nav-current': route.name === 'home' }"
          @click="closeMenu"
        >
          简介
        </RouterLink>
        <RouterLink
          to="/introduction"
          :class="{ 'nav-current': route.name === 'introduction' }"
          @click="closeMenu"
        >
          项目介绍
        </RouterLink>
        <RouterLink
          to="/architecture"
          :class="{ 'nav-current': route.name === 'architecture' }"
          @click="closeMenu"
        >
          架构设计
        </RouterLink>
        <a
          :href="`${repoUrl}#readme`"
          target="_blank"
          rel="noopener noreferrer"
          @click="closeMenu"
        >使用指南 <FlowIcon
          class="external-link-icon"
          name="arrow-up-right"
          :size="14"
        /></a>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
.site-header {
  position: fixed;
  inset: 0 0 auto;
  z-index: 50;
  background: var(--home-bg);
  border-bottom: 1px solid var(--home-line);
  color: var(--home-ink);
}

.site-header * {
  box-sizing: border-box;
}

.site-header a {
  color: inherit;
  text-decoration: none;
}

.site-header button {
  font: inherit;
  cursor: pointer;
}

.site-header a:focus-visible, .site-header button:focus-visible, .theme-toggle:focus-visible {
  outline: 3px solid var(--home-accent);
  outline-offset: 5px;
}

.site-nav {
  width: calc(100% - 112px);
  max-width: 1240px;
  margin-inline: auto;
  height: var(--site-header-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
}

.site-brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 23px;
  font-weight: 700;
  letter-spacing: -.8px;
  line-height: 1;
}

.site-brand img {
  display: block;
  border-radius: 11px;
}

.brand-dot {
  color: var(--home-accent);
}

.desktop-nav {
  display: flex;
  gap: 8px;
  align-items: center;
  color: var(--home-muted);
  font-size: 13px;
}

.desktop-nav a, .mobile-nav a {
  position: relative;
  display: inline-flex;
  align-items: center;
  min-height: 42px;
  padding: 10px 16px;
  border-radius: 10px;
  transition: color .2s, background-color .2s;
}

.desktop-nav a:hover, .mobile-nav a:hover {
  color: var(--home-accent);
  background: var(--home-panel);
}

.site-header a.nav-current {
  color: var(--home-accent);
  background: var(--home-soft);
  font-weight: 700;
  animation: nav-selection .24s ease-out;
}

@keyframes nav-selection {
  from { opacity: .65; transform: translateY(3px); }
  to { opacity: 1; transform: translateY(0); }
}

.external-link-icon {
  margin-left: 4px;
  flex-shrink: 0;
}

.nav-actions {
  display: flex;
  gap: 24px;
  align-items: center;
}

.github-link {
  display: flex;
}

.theme-control {
  position: relative;
}

.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border: 1px solid var(--home-line);
  border-radius: 10px;
  background: transparent;
  color: var(--home-muted);
  cursor: pointer;
  list-style: none;
}

.theme-toggle::-webkit-details-marker {
  display: none;
}

.theme-toggle:hover {
  background: var(--home-soft);
  color: var(--home-accent);
}

.theme-options {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  z-index: 1;
  width: 164px;
  padding: 6px;
  border: 1px solid var(--home-line);
  border-radius: 12px;
  background: var(--home-bg);
  box-shadow: 0 12px 28px var(--home-menu-shadow);
  animation: nav-selection .18s ease-out;
}

.theme-options button {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  min-height: 40px;
  padding: 9px 10px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--home-muted);
  font-size: 13px;
}

.theme-options button span {
  flex: 1;
  text-align: left;
}

.theme-options button:hover {
  background: var(--home-panel);
  color: var(--home-accent);
}

.theme-options button[aria-pressed=true] {
  background: var(--home-soft);
  color: var(--home-accent);
  font-weight: 600;
}

.menu-toggle {
  display: none;
  padding: 8px;
  background: transparent;
  color: var(--home-ink);
  border: 0;
}

.menu-toggle-icon {
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
}

.menu-toggle-icon > svg {
  grid-area: 1 / 1;
}

.menu-icon-enter-active, .menu-icon-leave-active {
  transition: opacity .18s ease, transform .18s ease;
}

.menu-icon-enter-from {
  opacity: 0;
  transform: rotate(-90deg) scale(.7);
}

.menu-icon-leave-to {
  opacity: 0;
  transform: rotate(90deg) scale(.7);
}

.mobile-nav {
  position: absolute;
  inset: 100% 0 auto;
  display: flex;
  padding: 16px 24px 24px;
  max-height: calc(100dvh - var(--site-header-height));
  overflow-y: auto;
  background: var(--home-bg);
  border-bottom: 1px solid var(--home-line);
  flex-direction: column;
  gap: 6px;
  box-shadow: 0 16px 24px var(--home-menu-shadow);
}

.mobile-menu-enter-active {
  transition: opacity .22s ease-out, transform .22s ease-out;
}

.mobile-menu-leave-active {
  transition: opacity .16s ease-in, transform .16s ease-in;
}

.mobile-menu-enter-from, .mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (min-width: 851px) {
  .mobile-nav {
    display: none !important;
  }
}

@media (max-width: 1100px) {
  .site-nav {
    width: calc(100% - 64px);
  }
}

@media (max-width: 850px) {
  .site-nav {
    width: calc(100% - 48px);
  }

  .desktop-nav {
    display: none;
  }

  .menu-toggle {
    display: flex;
  }

  .nav-actions {
    gap: 15px;
  }
}

@media (max-width: 600px) {
  .site-nav {
    width: calc(100% - 40px);
    gap: 12px;
  }

  .site-brand {
    font-size: 20px;
    gap: 8px;
  }

  .site-brand img {
    width: 32px;
    height: 32px;
    border-radius: 9px;
  }

  .nav-actions {
    gap: 7px;
  }

  .github-link {
    display: none;
  }

  .nav-download svg {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .desktop-nav a, .mobile-nav a,
  .site-header a.nav-current,
  .theme-options,
  .mobile-menu-enter-active, .mobile-menu-leave-active,
  .menu-icon-enter-active, .menu-icon-leave-active {
    transition: none;
    animation: none;
  }

  .mobile-menu-enter-from, .mobile-menu-leave-to,
  .menu-icon-enter-from, .menu-icon-leave-to {
    opacity: 1;
    transform: none;
  }
}
</style>
