<script setup lang="ts">
withDefaults(defineProps<{ device: 'desktop' | 'tablet' | 'phone'; eager?: boolean }>(), { eager: false })

const keyboard = [
  ['esc', '◦', '◦', '◦', '◦', '◦', '◦', '◦', '◦', '◦', '◦', '◦', '◦', '◉'],
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '−', '=', 'delete'],
  ['tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
  ['caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'return'],
  ['shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'shift'],
  ['fn', '⌃', '⌥', '⌘', 'space', '⌘', '⌥', '←', '↑', '→'],
]
</script>

<template>
  <div
    class="product-device"
    :data-device="device"
  >
    <span
      v-if="device !== 'desktop'"
      class="hardware-button button-power"
      aria-hidden="true"
    />
    <span
      v-if="device !== 'desktop'"
      class="hardware-button button-volume-up"
      aria-hidden="true"
    />
    <span
      v-if="device === 'phone'"
      class="hardware-button button-volume-down"
      aria-hidden="true"
    />
    <div class="device-bezel">
      <div class="device-screen">
        <div
          v-if="device === 'desktop'"
          class="mac-menubar"
          aria-hidden="true"
        >
          <div class="mac-menu-left">
            <svg
              class="mac-apple"
              viewBox="0 0 20 22"
              fill="currentColor"
            ><path d="M12.8 4.5c1.1-1.1 1.7-2.5 1.6-4-1.4.1-2.9.9-3.8 2-1 1.1-1.6 2.5-1.4 3.9 1.4.1 2.6-.6 3.6-1.9ZM16.9 11.7c0-2 1-3.4 2.4-4.3-1.2-1.6-3-2.4-4.8-2.4-1.7 0-2.7.9-4 .9-1.4 0-2.6-.9-4.1-.9C3.1 5 1 7.7 1 11.3c0 3.1 1.6 6.6 3.2 8.5 1 1.2 2 1.8 3.1 1.8 1.2 0 2-.7 3.3-.7 1.3 0 2.1.7 3.3.7 1.1 0 2.2-.6 3.2-1.8 1.1-1.4 1.9-2.9 2.4-4.4-1.6-.7-2.6-2-2.6-3.7Z" /></svg><strong>AnimeFlow</strong><span>文件</span><span>窗口</span>
          </div>
          <div class="mac-menu-right">
            <span>⌁</span><span class="mac-battery" /><span>9:41</span>
          </div>
        </div>
        <div
          v-if="device === 'phone'"
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
          :src="device === 'phone' ? '/images/app-mobile.jpg' : '/images/app-wide.jpg'"
          :alt="device === 'phone' ? 'AnimeFlow 手机端推荐与播放记录界面' : device === 'tablet' ? 'AnimeFlow 在 iPad 设备框中的宽屏界面展示' : 'AnimeFlow 在 macOS MacBook 笔记本中的宽屏界面展示'"
          :width="device === 'phone' ? 1080 : 2732"
          :height="device === 'phone' ? 2294 : 2010"
          :loading="eager ? 'eager' : 'lazy'"
          :fetchpriority="eager ? 'high' : 'auto'"
          decoding="async"
        >
      </div>
      <span
        class="device-camera"
        aria-hidden="true"
      ><i /></span>
      <span
        v-if="device === 'desktop'"
        class="lid-brand"
        aria-hidden="true"
      >MacBook Pro</span>
    </div>
    <div
      v-if="device === 'desktop'"
      class="laptop-base"
      aria-hidden="true"
    >
      <div class="laptop-hinge" />
      <div class="laptop-deck">
        <div class="speaker-grille grille-left" />
        <div class="keyboard">
          <div
            v-for="(row, index) in keyboard"
            :key="index"
            class="keyboard-row"
          >
            <span
              v-for="(key, keyIndex) in row"
              :key="keyIndex"
              class="keycap"
              :class="{ 'key-wide': key.length > 2, 'spacebar': key === 'space' }"
            >{{ key === 'space' ? '' : key }}</span>
          </div>
        </div>
        <div class="speaker-grille grille-right" />
        <div class="trackpad" />
      </div>
      <div class="laptop-front-edge">
        <span />
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-device {
  position: relative;
  width: 100%;
  container-type: inline-size;
  filter: drop-shadow(0 18px 22px #163a471c);
}
.device-bezel {
  position: relative;
  padding: 1.1cqw 1.05cqw 1.65cqw;
  border-radius: 1.8cqw 1.8cqw .8cqw .8cqw;
  background: linear-gradient(100deg, #101114, #2f3034 52%, #151619);
  box-shadow: 0 0 0 .22cqw #92969a, 0 0 0 .4cqw #d5d7d9, inset 0 0 0 .13cqw #48494d;
}
.device-screen {
  position: relative;
  overflow: hidden;
  aspect-ratio: 16 / 10;
  border-radius: .8cqw .8cqw .2cqw .2cqw;
  background: #0e1316;
}
.device-screen img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: top;
}
[data-device=desktop] .device-screen img { height: calc(100% - 2.35cqw); }
.mac-menubar {
  height: 2.35cqw;
  padding-inline: 1.3cqw;
  background: linear-gradient(180deg, #292929, #222222);
  color: #ededed;
  box-shadow: inset 0 -1px 0 #ffffff08;
  font-size: .85cqw;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.mac-menu-left, .mac-menu-right { display: flex; align-items: center; gap: 1.1cqw; }
.mac-menu-left strong { font-weight: 600; }
.mac-apple { width: 1.1cqw; height: 1.2cqw; }
.mac-battery { width: 1.55cqw; height: .75cqw; border: .1cqw solid currentColor; border-radius: .15cqw; position: relative; }
.mac-battery::before { content: ''; position: absolute; inset: .1cqw; background: currentColor; border-radius: .08cqw; }
.mac-battery::after { content: ''; position: absolute; right: -.3cqw; top: .2cqw; height: .2cqw; width: .2cqw; background: currentColor; }
.device-camera { position: absolute; left: 50%; top: 1.04cqw; transform: translateX(-50%); width: 8.5cqw; height: 2.1cqw; background: #101114; border-radius: 0 0 .55cqw .55cqw; }
.device-camera i { position: absolute; right: 1.3cqw; top: .55cqw; width: .55cqw; height: .55cqw; background: radial-gradient(circle at 40% 40%, #1a3550, #080c12 70%); border: .08cqw solid #30343b; border-radius: 50%; }
.lid-brand { position: absolute; bottom: .22cqw; left: 0; width: 100%; text-align: center; color: #85858b; font-size: .67cqw; letter-spacing: .08cqw; }
.laptop-base { position: relative; width: 109%; margin: -.2cqw 0 0 -4.5%; }
.laptop-hinge { position: absolute; z-index: 1; top: -.15cqw; left: 9%; right: 9%; height: .7cqw; border-radius: 0 0 .3cqw .3cqw; background: linear-gradient(#030507, #53585e, #171a1e); }
.laptop-deck {
  position: relative;
  height: 15.5cqw;
  background: linear-gradient(160deg, #d8dadd 0%, #e6e7e9 42%, #c2c6cb 80%, #a8adb4 100%);
  clip-path: polygon(4.2% 0, 95.8% 0, 100% 96%, 99.5% 100%, .5% 100%, 0 96%);
  border-radius: .5cqw .5cqw 1cqw 1cqw;
  box-shadow: inset 0 -.3cqw .2cqw #a3a7ad, inset 0 .3cqw .2cqw #fff8;
}
.keyboard { position: absolute; top: 1.1cqw; left: 15%; width: 70%; height: 8.5cqw; background: #5c6167; border-radius: .55cqw; padding: .34cqw; display: flex; flex-direction: column; gap: .2cqw; box-shadow: 0 0 0 .15cqw #f3f3f4a8, inset 0 0 .4cqw #34383d; }
.keyboard-row { display: flex; flex: 1; gap: .23cqw; min-height: 0; }
.keycap { display: flex; align-items: center; justify-content: center; flex: 1; min-width: 0; background: linear-gradient(#282b30, #16181c); border-radius: .21cqw; color: #b7bcc2; font-size: .63cqw; line-height: 1; box-shadow: inset 0 0 0 .1cqw #40444a, 0 .12cqw .05cqw #0004; }
.keycap.key-wide { flex: 1.55; font-size: .47cqw; }
.keycap.spacebar { flex: 5.8; }
.speaker-grille { position: absolute; top: 1.4cqw; width: 3.2%; height: 7.7cqw; background-image: radial-gradient(#53595f 27%, transparent 32%); background-size: .36cqw .36cqw; opacity: .6; border-radius: .25cqw; }
.grille-left { left: 10%; }
.grille-right { right: 10%; }
.trackpad { position: absolute; left: 37%; width: 26%; top: 10.25cqw; height: 4.25cqw; border-radius: .45cqw; background: linear-gradient(150deg, #d5d8db, #c6cacf); border: .12cqw solid #aeb3b9; box-shadow: 0 .12cqw .12cqw #fff9, inset 0 .1cqw .1cqw #989ea233; }
.laptop-front-edge { position: relative; height: .75cqw; margin-top: -.15cqw; border-radius: 0 0 1.3cqw 1.3cqw; background: linear-gradient(#f0f1f2, #9ca3ab 55%, #c3c7cc 90%); box-shadow: 0 .3cqw .4cqw #40535e23; }
.laptop-front-edge span { display: block; width: 13%; height: .36cqw; margin: auto; background: linear-gradient(#959ba3, #dfe2e5); border-radius: 0 0 .8cqw .8cqw; }
.hardware-button { position: absolute; z-index: -1; background: linear-gradient(90deg, #87898e, #d4d6d9, #85888d); border-radius: .6cqw; }
[data-device=tablet] .device-bezel { padding: 2.7cqw; border-radius: 5.5cqw; background: #111216; box-shadow: 0 0 0 .25cqw #60636a, 0 0 0 .52cqw #b5b7bc, inset 0 0 0 .18cqw #272930; }
[data-device=tablet] .device-screen { aspect-ratio: 2732 / 2010; border-radius: 3.3cqw; }
[data-device=tablet] .device-camera { width: 1cqw; height: 1cqw; top: 50%; left: 1.3cqw; transform: translateY(-50%); border-radius: 50%; background: radial-gradient(circle at 35% 35%, #1d2c42, #07080b 70%); border: .15cqw solid #2b3039; }
[data-device=tablet] .device-camera i { display: none; }
[data-device=tablet] .button-power { right: 8%; top: -.7cqw; width: 5%; height: .5cqw; }
[data-device=tablet] .button-volume-up { right: -.7cqw; top: 8%; width: .5cqw; height: 8%; }
[data-device=phone] .device-bezel { padding: 2.3cqw; border-radius: 15cqw; background: #131316; box-shadow: 0 0 0 .55cqw #4b4b4e, 0 0 0 1.3cqw #bab8b4, 0 0 0 1.55cqw #797772, inset 0 0 0 .35cqw #3e3f43; }
[data-device=phone] .device-screen { aspect-ratio: auto; border-radius: 12.7cqw; }
[data-device=phone] .device-screen img { height: auto; }
[data-device=phone] .device-camera { display: none; }
.phone-status { height: 13cqw; display: flex; align-items: center; justify-content: space-between; padding: 0 7cqw; background: #0e1316; color: #eceef0; font-size: 5.5cqw; font-weight: 600; }
.dynamic-island { position: absolute; left: 32%; top: 5.3cqw; width: 36%; height: 7.4cqw; border-radius: 5cqw; background: #000; }
.dynamic-island i { position: absolute; right: 3cqw; top: 2.2cqw; width: 3cqw; height: 3cqw; border-radius: 50%; background: radial-gradient(circle at 40% 35%, #17233b, #070c12 70%); }
.status-signals { display: flex; align-items: center; gap: 2cqw; }
.status-signals > i { width: 7cqw; height: 4.2cqw; background: linear-gradient(90deg, #eceef0 16%, transparent 16% 27%, #eceef0 27% 44%, transparent 44% 55%, #eceef0 55% 72%, transparent 72% 83%, #eceef0 83%); clip-path: polygon(0 65%, 22% 65%, 22% 45%, 49% 45%, 49% 24%, 76% 24%, 76% 0, 100% 0, 100% 100%, 0 100%); }
.phone-battery { width: 8cqw; height: 4cqw; border: .5cqw solid #e0e3e6; border-radius: 1cqw; box-shadow: inset 0 0 0 .5cqw #0e1316; background: #e0e3e6; }
[data-device=phone] .button-power { right: -2cqw; top: 25%; width: 1cqw; height: 14%; }
[data-device=phone] .button-volume-up { left: -2cqw; top: 24%; width: 1cqw; height: 8%; }
[data-device=phone] .button-volume-down { left: -2cqw; top: 35%; width: 1cqw; height: 8%; }
</style>
