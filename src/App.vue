<script setup lang="ts">
import { RouterView } from 'vue-router'
import SiteHeader from '@/components/SiteHeader.vue'
</script>

<template>
  <div class="app-shell">
    <SiteHeader />
    <div class="app-content">
      <RouterView />
    </div>
  </div>
</template>
