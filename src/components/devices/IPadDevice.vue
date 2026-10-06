<script setup lang="ts">
import type { DeviceProps } from './types'

withDefaults(defineProps<DeviceProps>(), { eager: false, screenshot: undefined })
</script>

<template>
  <div
    class="product-device"
    data-device="tablet"
    :data-custom-screenshot="Boolean(screenshot)"
  >
    <span
      class="hardware-button button-power"
      aria-hidden="true"
    />
    <span
      class="hardware-button button-volume-up"
      aria-hidden="true"
    />
    <div class="device-bezel">
      <div class="device-screen">
        <img
          :src="screenshot?.src ?? '/images/app-wide.jpg'"
          :alt="screenshot?.alt ?? 'AnimeFlow 在 iPad 设备框中的宽屏界面展示'"
          :width="screenshot?.width ?? 2732"
          :height="screenshot?.height ?? 2010"
          :loading="eager ? 'eager' : 'lazy'"
          :fetchpriority="eager ? 'high' : 'auto'"
          decoding="async"
        >
      </div>
      <span
        class="device-camera"
        aria-hidden="true"
      />
    </div>
  </div>
</template>

<style scoped src="./device.css" />
<style scoped>
.device-bezel { padding: 2.7cqw; border-radius: 5.5cqw; background: #111216; box-shadow: 0 0 0 .25cqw #60636a, 0 0 0 .52cqw #b5b7bc, inset 0 0 0 .18cqw #272930; }
.device-screen { aspect-ratio: 2732 / 2010; border-radius: 3.3cqw; }
.device-camera { position: absolute; width: 1cqw; height: 1cqw; top: 50%; left: 1.3cqw; transform: translateY(-50%); border-radius: 50%; background: radial-gradient(circle at 35% 35%, #1d2c42, #07080b 70%); border: .15cqw solid #2b3039; }
.button-power { left: 8%; top: -.7cqw; width: 5%; height: .5cqw; }
.button-volume-up { left: -.7cqw; top: 8%; width: .5cqw; height: 8%; }
</style>
