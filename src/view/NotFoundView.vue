<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="not-found">
    <h1>页面未找到</h1>
    <p>这个地址暂时没有内容，请从 AnimeFlow 官网首页继续浏览。</p>
    <RouterLink to="/">
      返回 AnimeFlow 官网
    </RouterLink>
  </main>
</template>

<style scoped>
.not-found { max-width: 720px; margin: 80px auto; padding: 24px; color: var(--home-ink); }
.not-found h1 { font-size: 32px; margin-bottom: 20px; }
.not-found p { margin-bottom: 24px; color: var(--home-muted); }
.not-found a { color: var(--home-accent); }
</style>
