import { readonly, ref } from 'vue'

type Theme = 'light' | 'dark'
export type ThemePreference = Theme | 'system'
const storageKey = 'animeflow-theme'
const theme = ref<Theme>('light')
const preference = ref<ThemePreference>('system')
let systemTheme: MediaQueryList | undefined
let initialized = false

function parseTheme(value: string | null): ThemePreference {
  return value === 'light' || value === 'dark' ? value : 'system'
}

function applyTheme(value: Theme) {
  theme.value = value
  document.documentElement.dataset.theme = value
  document.documentElement.style.colorScheme = value
  document.querySelector('meta[name="theme-color"]')?.setAttribute(
    'content', value === 'dark' ? '#0b1418' : '#fbfdfd',
  )
}

function applyPreference() {
  applyTheme(preference.value === 'system' ? (systemTheme?.matches ? 'dark' : 'light') : preference.value)
}

export function initializeTheme() {
  if (initialized) return
  initialized = true
  systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
  try { preference.value = parseTheme(localStorage.getItem(storageKey)) } catch { /* Storage may be unavailable. */ }
  applyPreference()
  systemTheme.addEventListener('change', applyPreference)
  window.addEventListener('storage', event => {
    if (event.key !== storageKey && event.key !== null) return
    preference.value = parseTheme(event.newValue)
    applyPreference()
  })
}

export function useTheme() {
  function setTheme(value: ThemePreference) {
    initializeTheme()
    preference.value = value
    applyPreference()
    try { localStorage.setItem(storageKey, value) } catch { /* Keep the selection for this visit. */ }
  }
  return { theme: readonly(theme), preference: readonly(preference), setTheme }
}
