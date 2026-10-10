<script setup lang="ts">
const paths = {
  'arrow-up-right': 'M7 17 17 7M7 7h10v10',
  arrow: 'M5 12h14M13 6l6 6-6 6', download: 'M12 3v12M7 10l5 5 5-5M5 16v5h14v-5',
  play: 'm9 5 11 7-11 7Z', calendar: 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14H3V6a2 2 0 0 1 2-2ZM7 14h3M14 14h3M7 18h3',
  sparkles: 'm12 3 2.6 6.4L21 12l-6.4 2.6L12 21l-2.6-6.4L3 12l6.4-2.6ZM20 2v4M18 4h4',
  message: 'M21 4H3v13h4v4l5-4h9ZM7 8h10M7 12h7', layers: 'm12 3 10 5-10 5L2 8Zm-10 9 10 5 10-5M2 16l10 5 10-5',
  desktop: 'M3 3h18v13H3ZM8 21h8M12 16v5', phone: 'M7 2h10a1 1 0 0 1 1 1v18H6V3a1 1 0 0 1 1-1ZM10 18h4',
  tablet: 'M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1ZM7 3v18M5 11v2',
  github: 'M9 19c-4 1-4-2-6-2M9 22v-4c0-1 .3-1.7 1-2-4-.5-6-2-6-5a4 4 0 0 1 1-3c-.5-1-.5-3 0-4 2 0 3 1 4 1a13 13 0 0 1 6 0c1 0 2-1 4-1 .5 1 .5 3 0 4a4 4 0 0 1 1 3c0 3-2 4.5-6 5 .7.3 1 1 1 2v4',
  close: 'm6 6 12 12M6 18 18 6', check: 'm5 12 4 4L19 6', source: 'M8 4H4v16h4M16 4h4v16h-4M14 7l-4 10',
  expand: 'M8 3H3v5M16 3h5v5M21 16v5h-5M3 16v5h5', menu: 'M4 6h16M4 12h16M4 18h16',
  sun: 'M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5',
  moon: 'M20.5 13A8.5 8.5 0 0 1 11 3.5 8.5 8.5 0 1 0 20.5 13Z',
} as const

type IconName = keyof typeof paths

withDefaults(defineProps<{ name: IconName; size?: number }>(), { size: 20 })
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.6"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path :d="paths[name]" />
  </svg>
</template>
