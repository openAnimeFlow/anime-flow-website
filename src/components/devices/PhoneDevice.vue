<script setup lang="ts">
import type { DeviceProps } from './types'

withDefaults(defineProps<DeviceProps>(), { eager: false, screenshot: undefined, objectFit: 'cover' })
</script>

<template>
  <div
    class="product-device"
    data-device="phone"
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
    <span
      class="hardware-button button-volume-down"
      aria-hidden="true"
    />
    <div class="device-bezel">
      <div class="device-screen">
        <div
          v-if="!screenshot?.includesStatusBar"
          class="phone-status"
          aria-hidden="true"
        >
          <span>9:41</span><div class="dynamic-island">
            <i />
          </div><div class="status-signals">
            <i /><span class="phone-battery" />
          </div>
        </div>
        <img
          :src="screenshot?.src ?? '/images/app-mobile.jpg'"
          :alt="screenshot?.alt ?? 'AnimeFlow 手机端推荐与播放记录界面'"
          :width="screenshot?.width ?? 1080"
          :height="screenshot?.height ?? 2294"
          :style="{ objectFit }"
          :loading="eager ? 'eager' : 'lazy'"
          :fetchpriority="eager ? 'high' : 'auto'"
          decoding="async"
        >
      </div>
    </div>
  </div>
</template>

<style scoped src="./device.css" />
<style scoped>
.device-bezel { padding: 2.3cqw; border-radius: 15cqw; background: #131316; box-shadow: 0 0 0 .55cqw #4b4b4e, 0 0 0 1.3cqw #bab8b4, 0 0 0 1.55cqw #797772, inset 0 0 0 .35cqw #3e3f43; }
.device-screen { aspect-ratio: auto; border-radius: 12.7cqw; }
.device-screen img { height: auto; aspect-ratio: 1080 / 2294; }
.phone-status { height: 13cqw; display: flex; align-items: center; justify-content: space-between; padding: 0 7cqw; background: #0e1316; color: #eceef0; font-size: 5.5cqw; font-weight: 600; }
.dynamic-island { position: absolute; left: 32%; top: 5.3cqw; width: 36%; height: 7.4cqw; border-radius: 5cqw; background: #000; }
.dynamic-island i { position: absolute; right: 3cqw; top: 2.2cqw; width: 3cqw; height: 3cqw; border-radius: 50%; background: radial-gradient(circle at 40% 35%, #17233b, #070c12 70%); }
.status-signals { display: flex; align-items: center; gap: 2cqw; }
.status-signals > i { width: 7cqw; height: 4.2cqw; background: linear-gradient(90deg, #eceef0 16%, transparent 16% 27%, #eceef0 27% 44%, transparent 44% 55%, #eceef0 55% 72%, transparent 72% 83%, #eceef0 83%); clip-path: polygon(0 65%, 22% 65%, 22% 45%, 49% 45%, 49% 24%, 76% 24%, 76% 0, 100% 0, 100% 100%, 0 100%); }
.phone-battery { width: 8cqw; height: 4cqw; border: .5cqw solid #e0e3e6; border-radius: 1cqw; box-shadow: inset 0 0 0 .5cqw #0e1316; background: #e0e3e6; }
.button-power { right: -2cqw; top: 25%; width: 1cqw; height: 14%; }
.button-volume-up { left: -2cqw; top: 24%; width: 1cqw; height: 8%; }
.button-volume-down { left: -2cqw; top: 35%; width: 1cqw; height: 8%; }
</style>
