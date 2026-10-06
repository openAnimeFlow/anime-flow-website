import { readonly, ref } from 'vue'

type Theme = 'light' | 'dark'
const storageKey = 'animeflow-theme'
const theme = ref<Theme>('light')
let preference: Theme | null = null
let initialized = false

function parseTheme(value: string | null): Theme | null {
  return value === 'light' || value === 'dark' ? value : null
}

function applyTheme(value: Theme) {
  theme.value = value
  document.documentElement.dataset.theme = value
  document.documentElement.style.colorScheme = value
  document.querySelector('meta[name="theme-color"]')?.setAttribute(
    'content', value === 'dark' ? '#0b1418' : '#fbfdfd',
  )
}

export function initializeTheme() {
  if (initialized) return
  initialized = true
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
  try { preference = parseTheme(localStorage.getItem(storageKey)) } catch { /* Storage may be unavailable. */ }
  const followSystem = () => applyTheme(preference ?? (systemTheme.matches ? 'dark' : 'light'))
  followSystem()
  systemTheme.addEventListener('change', followSystem)
  window.addEventListener('storage', event => {
    if (event.key !== storageKey && event.key !== null) return
    preference = parseTheme(event.newValue)
    followSystem()
  })
}

export function useTheme() {
  function toggleTheme() {
    preference = theme.value === 'dark' ? 'light' : 'dark'
    applyTheme(preference)
    try { localStorage.setItem(storageKey, preference) } catch { /* Keep the selection for this visit. */ }
  }
  return { theme: readonly(theme), toggleTheme }
}
