<script setup lang="ts">
import { computed, ref } from 'vue'
import FlowIcon from '@/components/FlowIcon.vue'
import ProductDevice from '@/components/ProductDevice.vue'
import { devices, features, platforms, releasesUrl, repoUrl } from './homeData'
import './home.css'

const selectedDevice = ref<(typeof devices)[number]['id']>('desktop')
const currentDevice = computed(() => devices.find(device => device.id === selectedDevice.value) || devices[0])
const screenshotDialog = ref<HTMLDialogElement>()
const year = new Date().getFullYear()

function expandScreenshot() { screenshotDialog.value?.showModal() }
function closeScreenshot(event: MouseEvent) {
  if (event.target === screenshotDialog.value) screenshotDialog.value?.close()
}
</script>

<template>
  <div class="home-page">
    <a
      class="home-skip"
      href="#main"
    >跳转至主要内容</a>
    <main
      id="main"
      tabindex="-1"
    >
      <section
        class="home-hero home-container"
        aria-labelledby="hero-title"
      >
        <div class="home-hero-copy">
          <p class="home-eyebrow">
            <span class="home-status" /> 开源 · 跨平台 · 为热爱而来
          </p>
          <h1 id="hero-title">
            让喜欢的故事，<br><span>自然发生。</span>
          </h1>
          <p class="home-hero-description">
            从发现好番，到沉浸每一帧。<br>AnimeFlow，把你的追番日常连在一起。
          </p>
          <div class="home-hero-buttons">
            <a
              class="home-button primary"
              :href="releasesUrl"
              target="_blank"
              rel="noopener noreferrer"
            >免费下载 <FlowIcon
              name="download"
              :size="18"
            /></a><a
              class="home-button secondary"
              href="#experience"
            >探索 AnimeFlow <FlowIcon
              name="arrow"
              :size="18"
            /></a>
          </div>
          <div class="home-hero-platforms">
            <span>陪你在每一块屏幕上</span><div>
              <FlowIcon
                name="desktop"
                :size="16"
              /> 桌面 <i /> <FlowIcon
                name="tablet"
                :size="16"
              /> iPad <i /> <FlowIcon
                name="phone"
                :size="16"
              /> 手机
            </div>
          </div>
        </div>
        <div
          class="home-device-scene"
          role="group"
          aria-label="AnimeFlow 桌面端、iPad 与手机展示"
        >
          <div
            class="home-device-glow"
            aria-hidden="true"
          />
          <p class="home-scene-caption">
            <span>✦</span> 下一部喜欢的，就在这里。
          </p>
          <div class="scene-desktop">
            <ProductDevice
              device="desktop"
              eager
            /><span class="scene-device-label">MacBook Pro</span>
          </div>
          <div class="scene-tablet">
            <ProductDevice
              device="tablet"
              eager
            /><span class="scene-device-label">iPad</span>
          </div>
          <div class="scene-phone">
            <ProductDevice
              device="phone"
              eager
            /><span class="scene-device-label">MOBILE</span>
          </div>
          <div class="home-scene-note">
            <span><FlowIcon
              name="check"
              :size="15"
            /></span> 三种屏幕，同一份热爱。
          </div>
        </div>
      </section>
      <section
        class="home-platform-ribbon"
        aria-label="支持的平台"
      >
        <div class="home-container">
          <p>一个 AnimeFlow，连接你的每一天。</p><div>
            <span
              v-for="platform in platforms"
              :key="platform"
            ><FlowIcon
              :name="platform === 'Android' || platform === 'iOS' ? 'phone' : 'desktop'"
              :size="17"
            />{{ platform }}</span>
          </div>
        </div>
      </section>
      <section
        id="features"
        class="home-features home-container"
        aria-labelledby="features-title"
      >
        <div class="home-section-heading">
          <div>
            <p class="home-eyebrow">
              DESIGNED AROUND YOUR DAILY FLOW
            </p><h2 id="features-title">
              从「想看」，到「正在看」。
            </h2>
          </div><p>少一些来回切换，<br>多一些专注喜欢的时间。</p>
        </div>
        <div class="home-feature-grid">
          <article
            v-for="(feature, index) in features"
            :key="feature.title"
            class="home-feature-card"
          >
            <div class="home-feature-top">
              <span class="home-feature-icon"><FlowIcon
                :name="feature.icon"
                :size="23"
              /></span><span>0{{ index + 1 }}</span>
            </div><p class="home-feature-subtitle">
              {{ feature.subtitle }}
            </p><h3>{{ feature.title }}</h3><p>{{ feature.description }}</p>
          </article>
        </div>
      </section>
      <section
        id="experience"
        class="home-experience home-container"
        aria-labelledby="experience-title"
      >
        <div class="home-section-heading">
          <div>
            <p class="home-eyebrow">
              ONE APP. EVERY SCREEN.
            </p><h2 id="experience-title">
              屏幕不同，喜欢始终如一。
            </h2>
          </div><p>桌面、iPad、手机，<br>都有适合自己的打开方式。</p>
        </div>
        <div class="home-experience-panel">
          <div class="home-experience-copy">
            <div
              class="home-device-picker"
              aria-label="选择设备展示"
            >
              <button
                v-for="device in devices"
                :key="device.id"
                :aria-pressed="selectedDevice === device.id"
                :class="{ active: selectedDevice === device.id }"
                @click="selectedDevice = device.id"
              >
                <FlowIcon
                  :name="device.icon"
                  :size="18"
                />{{ device.name }}
              </button>
            </div>
            <div
              class="home-experience-text"
              aria-live="polite"
            >
              <span class="home-device-platforms">{{ currentDevice.platforms }}</span><h3>{{ currentDevice.heading }}</h3><p>{{ currentDevice.description }}</p>
            </div>
            <button
              class="home-text-button"
              @click="expandScreenshot"
            >
              查看完整界面 <FlowIcon
                name="expand"
                :size="16"
              />
            </button>
          </div>
          <div
            class="home-experience-visual"
            :data-selected-device="selectedDevice"
          >
            <ProductDevice :device="selectedDevice" />
          </div>
        </div>
      </section>
      <section
        class="home-freedom home-container"
        aria-labelledby="freedom-title"
      >
        <span class="home-freedom-symbol"><FlowIcon
          name="source"
          :size="32"
        /></span><div>
          <p class="home-eyebrow">
            OPEN SOURCE, OPEN POSSIBILITIES
          </p><h2 id="freedom-title">
            体验由你定义。
          </h2><p>自定义数据源，切换播放线路，按习惯调节弹幕。<br>AnimeFlow 的代码同样开放，欢迎一起把它做得更好。</p>
        </div><a
          class="home-text-link"
          :href="repoUrl"
          target="_blank"
          rel="noopener noreferrer"
        >在 GitHub 参与共建 <FlowIcon
          name="arrow"
          :size="18"
        /></a>
      </section>
    </main>
    <footer class="home-footer home-container">
      <div>
        <a
          class="home-brand"
          href="#main"
          aria-label="返回首页顶部"
        ><img
          src="/images/logo.webp"
          alt=""
          width="30"
          height="30"
        ><span>AnimeFlow<span class="brand-dot">.</span></span></a><p>让热爱，自然发生。</p>
      </div><div class="home-footer-right">
        <nav aria-label="项目链接">
          <a
            :href="repoUrl"
            target="_blank"
            rel="noopener noreferrer"
          >GitHub</a><a
            :href="`${repoUrl}/issues`"
            target="_blank"
            rel="noopener noreferrer"
          >问题反馈 ↗</a><a
            :href="`${repoUrl}/blob/main/LICENSE.txt`"
            target="_blank"
            rel="noopener noreferrer"
          >开源许可 ↗</a>
        </nav><p>致谢 Bangumi · Anime4K · 弹弹Play</p><span>© {{ year }} AnimeFlow</span>
      </div>
    </footer>
    <dialog
      ref="screenshotDialog"
      class="home-screenshot-dialog"
      aria-labelledby="screenshot-title"
      @click="closeScreenshot"
    >
      <div>
        <header>
          <h2 id="screenshot-title">
            {{ currentDevice.name }} · 界面一览
          </h2><button
            aria-label="关闭界面预览"
            @click="screenshotDialog?.close()"
          >
            <FlowIcon
              name="close"
              :size="22"
            />
          </button>
        </header><img
          :src="currentDevice.image"
          :alt="`AnimeFlow ${currentDevice.name}完整界面截图`"
        >
      </div>
    </dialog>
  </div>
</template>
