<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref } from 'vue'
import { RouterLink } from 'vue-router'
import FlowIcon from '@/components/FlowIcon.vue'
import IPadDevice from '@/components/devices/IPadDevice.vue'
import type { DeviceScreenshot } from '@/components/devices/types'
import { repoUrl } from '@/config/site'
import { chapters, moreFeatures, screenshots, type AppScreenshot } from './introductionData'
import './introduction.css'

const selections = ref(chapters.map(() => 0))
const screenshotDialog = ref<HTMLDialogElement>()
const previewIndex = ref(0)
const preview = computed(() => screenshots[previewIndex.value]!)
const year = new Date().getFullYear()

function selectedScreenshot(chapterIndex: number): AppScreenshot {
  return chapters[chapterIndex]!.screenshots[selections.value[chapterIndex] ?? 0]!
}

function deviceScreenshot(screenshot: AppScreenshot): DeviceScreenshot {
  return {
    src: screenshot.src,
    alt: `AnimeFlow ${screenshot.label}：${screenshot.description}`,
    width: 1640,
    height: 1229,
  }
}

async function openScreenshot(screenshot: AppScreenshot) {
  previewIndex.value = screenshots.findIndex(item => item.id === screenshot.id)
  await nextTick()
  screenshotDialog.value?.showModal()
}

function changePreview(direction: number) {
  previewIndex.value = (previewIndex.value + direction + screenshots.length) % screenshots.length
}

function handlePreviewKey(event: KeyboardEvent) {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault()
    changePreview(event.key === 'ArrowLeft' ? -1 : 1)
  }
}

function closeOnBackdrop(event: MouseEvent) {
  if (event.target === screenshotDialog.value) screenshotDialog.value?.close()
}

onBeforeUnmount(() => screenshotDialog.value?.close())
</script>

<template>
  <div class="intro-page">
    <a
      class="intro-skip"
      href="#intro-main"
    >跳转至项目介绍</a>
    <main
      id="intro-main"
      tabindex="-1"
    >
      <section
        class="intro-hero intro-container"
        aria-labelledby="intro-title"
      >
        <div class="intro-hero-copy">
          <p class="intro-eyebrow">
            <span class="intro-status" /> MEET ANIMEFLOW
          </p>
          <h1 id="intro-title">
            每一份喜欢，<br><span>都有迹可循。</span>
          </h1>
          <p class="intro-lead">
            一个连接发现、追番与观看的动漫客户端。<br>让找番少一点折腾，让喜欢多一点陪伴。
          </p>
          <div class="intro-actions">
            <a
              class="intro-button primary"
              href="#discover"
            >开始了解 <FlowIcon
              name="arrow"
              :size="17"
            /></a>
            <RouterLink
              class="intro-button secondary"
              :to="{ path: '/', hash: '#main' }"
            >
              下载 AnimeFlow <FlowIcon
                name="download"
                :size="17"
              />
            </RouterLink>
          </div>
          <p class="intro-platforms">
            Windows · macOS · Linux · Android · iOS
          </p>
        </div>
        <div
          class="intro-hero-scene"
          aria-label="AnimeFlow 推荐与播放界面"
        >
          <span class="intro-scene-note"><FlowIcon
            name="sparkles"
            :size="17"
          /> 从发现，到每一帧。</span>
          <button
            class="intro-hero-screen intro-hero-main"
            aria-label="放大推荐首页截图"
            @click="openScreenshot(screenshots[0]!)"
          >
            <IPadDevice
              :screenshot="deviceScreenshot(screenshots[0]!)"
              eager
            />
          </button>
          <button
            class="intro-hero-screen intro-hero-player"
            aria-label="放大播放界面截图"
            @click="openScreenshot(chapters[2].screenshots[0])"
          >
            <IPadDevice :screenshot="deviceScreenshot(chapters[2].screenshots[0])" />
          </button>
          <span class="intro-scene-label"><span class="intro-status" /> 真实界面页面截图</span>
        </div>
      </section>

      <nav
        class="intro-chapter-nav intro-container"
        aria-label="介绍页章节"
      >
        <a
          v-for="chapter in chapters"
          :key="chapter.id"
          :href="`#${chapter.id}`"
        >
          <span>{{ chapter.number }}</span><FlowIcon
            :name="chapter.icon"
            :size="19"
          />{{ chapter.label }}<FlowIcon
            class="intro-chapter-arrow"
            name="arrow"
            :size="16"
          />
        </a>
      </nav>

      <div class="intro-stories intro-container">
        <section
          v-for="(chapter, index) in chapters"
          :id="chapter.id"
          :key="chapter.id"
          class="intro-story"
          :class="{ 'intro-story-reverse': index % 2 === 1 }"
          :aria-labelledby="`${chapter.id}-title`"
        >
          <div class="intro-story-copy">
            <p class="intro-eyebrow">
              <span class="intro-chapter-number">{{ chapter.number }}</span>{{ chapter.eyebrow }}
            </p>
            <h2 :id="`${chapter.id}-title`">
              {{ chapter.title }}
            </h2>
            <p class="intro-description">
              {{ chapter.description }}
            </p>
            <ul class="intro-feature-list">
              <li
                v-for="feature in chapter.features"
                :key="feature.title"
              >
                <span class="intro-feature-check"><FlowIcon
                  name="check"
                  :size="14"
                /></span>
                <div><h3>{{ feature.title }}</h3><p>{{ feature.description }}</p></div>
              </li>
            </ul>
          </div>
          <div class="intro-showcase">
            <div
              class="intro-screenshot-picker"
              role="group"
              :aria-label="`${chapter.label}截图选择`"
            >
              <button
                v-for="(screenshot, imageIndex) in chapter.screenshots"
                :key="screenshot.id"
                type="button"
                :aria-pressed="selections[index] === imageIndex"
                :aria-controls="`${chapter.id}-figure`"
                @click="selections[index] = imageIndex"
              >
                {{ screenshot.label }}
              </button>
            </div>
            <figure
              :id="`${chapter.id}-figure`"
              class="intro-figure"
            >
              <button
                class="intro-screenshot"
                type="button"
                :aria-label="`放大${selectedScreenshot(index).label}截图`"
                @click="openScreenshot(selectedScreenshot(index))"
              >
                <IPadDevice :screenshot="deviceScreenshot(selectedScreenshot(index))" />
                <span class="intro-expand"><FlowIcon
                  name="expand"
                  :size="15"
                /> 查看大图</span>
              </button>
              <figcaption aria-live="polite">
                <span class="intro-caption-heading">{{ selectedScreenshot(index).label }}<span>{{ String((selections[index] ?? 0) + 1).padStart(2, '0') }} / {{ String(chapter.screenshots.length).padStart(2, '0') }}</span></span>
                <p>{{ selectedScreenshot(index).description }}</p>
              </figcaption>
            </figure>
          </div>
        </section>
      </div>

      <section
        class="intro-more intro-container"
        aria-labelledby="intro-more-title"
      >
        <div class="intro-more-heading">
          <div>
            <p class="intro-eyebrow">
              AND THERE IS MORE
            </p><h2 id="intro-more-title">
              还有一些，值得慢慢发现。
            </h2>
          </div>
          <p>为日常观看，多想一步。</p>
        </div>
        <div class="intro-more-grid">
          <article
            v-for="feature in moreFeatures"
            :key="feature.title"
          >
            <span class="intro-more-icon"><FlowIcon
              :name="feature.icon"
              :size="25"
            /></span>
            <h3>{{ feature.title }}</h3><p>{{ feature.description }}</p>
          </article>
        </div>
      </section>

      <section
        class="intro-closing intro-container"
        aria-labelledby="intro-closing-title"
      >
        <img
          src="/images/logo.webp"
          alt=""
          width="58"
          height="58"
          loading="lazy"
        >
        <p class="intro-eyebrow">
          YOUR NEXT STORY STARTS HERE
        </p>
        <h2 id="intro-closing-title">
          把喜欢，带进每一天。
        </h2>
        <p>在手机、平板或桌面上，开启你的 AnimeFlow。<br>项目持续开发中，欢迎一起让体验变得更好。</p>
        <div class="intro-actions">
          <RouterLink
            class="intro-button primary"
            :to="{ path: '/', hash: '#main' }"
          >
            前往下载 <FlowIcon
              name="download"
              :size="17"
            />
          </RouterLink>
          <a
            class="intro-button secondary"
            :href="repoUrl"
            target="_blank"
            rel="noopener noreferrer"
          >了解项目源码 <FlowIcon
            name="github"
            :size="17"
          /></a>
        </div>
      </section>
    </main>

    <footer class="intro-footer intro-container">
      <RouterLink
        class="intro-footer-brand"
        to="/"
      >
        AnimeFlow<span>.</span>
      </RouterLink>
      <p>让热爱，自然发生。</p>
      <nav aria-label="项目相关链接">
        <a
          :href="`${repoUrl}#readme`"
          target="_blank"
          rel="noopener noreferrer"
        >使用指南 ↗</a><a
          :href="`${repoUrl}/issues`"
          target="_blank"
          rel="noopener noreferrer"
        >问题反馈 ↗</a>
      </nav>
      <span>© {{ year }} AnimeFlow</span>
    </footer>

    <dialog
      ref="screenshotDialog"
      class="intro-dialog"
      aria-labelledby="intro-preview-title"
      aria-describedby="intro-preview-description"
      @click="closeOnBackdrop"
      @keydown="handlePreviewKey"
    >
      <div class="intro-dialog-content">
        <header class="intro-dialog-header">
          <div aria-live="polite">
            <p class="intro-eyebrow">
              ANIMEFLOW · 界面一览
            </p><h2 id="intro-preview-title">
              {{ preview.label }} <span>{{ previewIndex + 1 }} / {{ screenshots.length }}</span>
            </h2>
          </div>
          <button
            type="button"
            class="intro-icon-button"
            aria-label="关闭截图预览"
            autofocus
            @click="screenshotDialog?.close()"
          >
            <FlowIcon
              name="close"
              :size="23"
            />
          </button>
        </header>
        <div class="intro-preview-device">
          <IPadDevice
            :screenshot="deviceScreenshot(preview)"
            eager
          />
        </div>
        <p
          id="intro-preview-description"
          class="intro-preview-description"
          aria-live="polite"
        >
          {{ preview.description }}
        </p>
        <div class="intro-dialog-controls">
          <button
            type="button"
            class="intro-preview-prev"
            @click="changePreview(-1)"
          >
            <FlowIcon
              name="arrow"
              :size="17"
            /> 上一张
          </button>
          <a
            :href="preview.src"
            target="_blank"
            rel="noopener noreferrer"
          >查看图片 ↗</a>
          <button
            type="button"
            @click="changePreview(1)"
          >
            下一张 <FlowIcon
              name="arrow"
              :size="17"
            />
          </button>
        </div>
      </div>
    </dialog>
  </div>
</template>
