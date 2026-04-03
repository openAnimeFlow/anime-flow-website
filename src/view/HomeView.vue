<script setup lang="ts">
const repoUrl = 'https://github.com/openAnimeFlow/AnimeFlow'
const releasesUrl = `${repoUrl}/releases`

const platforms = [
  { name: 'Android', desc: '移动端' },
  { name: 'iOS', desc: '移动端' },
  { name: 'Windows', desc: '桌面端' },
  { name: 'macOS', desc: '桌面端' },
  { name: 'Linux', desc: '桌面端' },
] as const

const highlights = [
  {
    title: '多数据源',
    body: '支持自定义数据源，灵活添加、编辑与切换；可配置 XPath 爬虫规则，适配不同站点结构。',
    accent: 'from-violet-500/20 to-fuchsia-500/10',
  },
  {
    title: '实时超分辨率',
    body: '基于 Anime4K 在播放中实时提升清晰度，提供效率档与质量档，可按设备性能自由选择。',
    accent: 'from-cyan-500/20 to-violet-500/10',
  },
  {
    title: 'Bangumi 深度整合',
    body: '账号登录与收藏同步、热门推荐、时间线、每日放送与排行榜；详情页含角色、评论与标签。',
    accent: 'from-fuchsia-500/20 to-pink-500/10',
  },
  {
    title: '弹幕体验',
    body: '对接 Bilibili、Gamer、弹弹Play 等来源；可调透明度、字号、速度与显示区域，并支持类型与样式筛选。',
    accent: 'from-amber-500/15 to-orange-500/10',
  },
] as const

const danmakuDetails = [
  '透明度、字体大小、滚动速度',
  '显示区域与类型筛选（滚动 / 顶 / 底）',
  '边框、颜色与密集模式等样式',
]

const srModes = [
  { name: '关闭', note: '节省性能，适合流畅优先' },
  { name: '效率档', note: '轻量模型，适合中低端设备' },
  { name: '质量档', note: '高画质，建议独显或高性能 GPU' },
] as const

const bangumiItems = [
  '账号登录与资料',
  '收藏列表同步',
  '热门与推荐',
  '时间胶囊动态',
  '每日放送日历',
  '多维度排行榜',
  '番剧详情 / 角色 / 评论 / 标签',
] as const
</script>

<template>
  <div
    class="min-h-screen bg-slate-950 text-slate-200 antialiased selection:bg-violet-500/40 selection:text-white"
  >
    <div
      class="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,80,220,0.35),transparent)]"
    />
    <div
      class="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_60%_40%_at_100%_0%,rgba(59,130,246,0.12),transparent)]"
    />

    <header
      class="sticky top-0 z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-md"
    >
      <div
        class="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6"
      >
        <RouterLink
          class="flex items-center gap-2 font-semibold tracking-tight text-white"
          to="/"
        >
          <span
            class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-600 text-sm font-bold text-white shadow-lg shadow-violet-500/25"
          >
            AF
          </span>
          <span class="hidden sm:inline">AnimeFlow</span>
        </RouterLink>
        <nav
          class="hidden items-center gap-6 text-sm text-slate-400 md:flex"
          aria-label="页面导航"
        >
          <a
            class="transition hover:text-white"
            href="#features"
          >功能</a>
          <a
            class="transition hover:text-white"
            href="#platforms"
          >平台</a>
          <a
            class="transition hover:text-white"
            href="#bangumi"
          >Bangumi</a>
          <a
            class="transition hover:text-white"
            href="#data"
          >数据源</a>
        </nav>
        <div class="flex shrink-0 items-center gap-2">
          <a
            :href="releasesUrl"
            class="hidden rounded-lg px-3 py-2 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white sm:inline"
            target="_blank"
            rel="noopener noreferrer"
          >
            下载
          </a>
          <a
            :href="repoUrl"
            class="inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm font-medium text-white ring-1 ring-white/10 transition hover:bg-white/15"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              class="h-4 w-4"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
              />
            </svg>
            GitHub
          </a>
        </div>
      </div>
    </header>

    <main id="top">
      <section
        class="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24"
      >
        <p
          class="mb-4 inline-flex rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-200"
        >
          开源跨平台追番播放器
        </p>
        <h1
          class="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl sm:leading-[1.1]"
        >
          用
          <span
            class="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent"
          >
            AnimeFlow
          </span>
          追番，多端一致、画质与弹幕兼得
        </h1>
        <p class="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
          基于
          <a
            :href="repoUrl"
            class="text-violet-300 underline decoration-violet-500/50 underline-offset-2 hover:text-violet-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            openAnimeFlow/AnimeFlow
          </a>
          ：支持多数据源与自定义爬虫、实时视频超分辨率（Anime4K）、Bangumi
          收藏与发现，并接入弹弹Play 等弹幕源，为观影提供流畅体验。
        </p>
        <div class="mt-10 flex flex-wrap gap-3">
          <a
            :href="releasesUrl"
            class="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/30 transition hover:brightness-110"
            target="_blank"
            rel="noopener noreferrer"
          >
            获取发布版本
          </a>
          <a
            :href="repoUrl"
            class="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
            target="_blank"
            rel="noopener noreferrer"
          >
            查看源码与文档
          </a>
        </div>
      </section>

      <section
        id="platforms"
        class="border-y border-white/5 bg-slate-900/40 py-16"
      >
        <div class="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 class="text-center text-sm font-semibold uppercase tracking-widest text-violet-400">
            多平台
          </h2>
          <p class="mx-auto mt-2 max-w-xl text-center text-2xl font-semibold text-white">
            移动端与桌面端一套理念，随处打开即看
          </p>
          <ul
            class="mt-10 flex flex-wrap justify-center gap-3"
            role="list"
          >
            <li
              v-for="p in platforms"
              :key="p.name"
              class="rounded-2xl border border-white/10 bg-slate-950/60 px-5 py-3 text-center shadow-sm"
            >
              <span class="block font-medium text-white">{{ p.name }}</span>
              <span class="text-xs text-slate-500">{{ p.desc }}</span>
            </li>
          </ul>
        </div>
      </section>

      <section
        id="features"
        class="mx-auto max-w-6xl px-4 py-20 sm:px-6"
      >
        <h2 class="text-2xl font-semibold text-white sm:text-3xl">
          核心能力
        </h2>
        <p class="mt-2 max-w-2xl text-slate-400">
          覆盖找片、播放、画质增强与社区数据同步的完整链路。
        </p>
        <div class="mt-12 grid gap-6 sm:grid-cols-2">
          <article
            v-for="h in highlights"
            :key="h.title"
            class="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 p-6 transition hover:border-violet-500/30"
          >
            <div
              :class="[
                'absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br opacity-60 blur-2xl transition group-hover:opacity-100',
                h.accent,
              ]"
              aria-hidden="true"
            />
            <h3 class="relative text-lg font-semibold text-white">
              {{ h.title }}
            </h3>
            <p class="relative mt-3 text-sm leading-relaxed text-slate-400">
              {{ h.body }}
            </p>
          </article>
        </div>
      </section>

      <section
        id="danmaku"
        class="border-t border-white/5 bg-slate-900/30 py-20"
      >
        <div class="mx-auto grid max-w-6xl gap-12 px-4 sm:grid-cols-2 sm:px-6">
          <div>
            <h2 class="text-2xl font-semibold text-white">
              弹幕系统
            </h2>
            <p class="mt-2 text-slate-400">
              聚合多平台弹幕源，在播放器内统一呈现与调节。
            </p>
            <ul class="mt-6 space-y-2 text-sm text-slate-300">
              <li class="flex gap-2">
                <span class="text-violet-400">·</span>
                Bilibili、Gamer、弹弹Play 等
              </li>
              <li
                v-for="d in danmakuDetails"
                :key="d"
                class="flex gap-2"
              >
                <span class="text-violet-400">·</span>
                {{ d }}
              </li>
            </ul>
          </div>
          <div id="sr">
            <h2 class="text-2xl font-semibold text-white">
              超分辨率
            </h2>
            <p class="mt-2 text-slate-400">
              播放中即可切换模式；低分辨率片源提升更明显，高性能设备可尝试质量档。
            </p>
            <ul class="mt-6 space-y-3">
              <li
                v-for="m in srModes"
                :key="m.name"
                class="rounded-xl border border-white/10 bg-slate-950/50 px-4 py-3"
              >
                <span class="font-medium text-white">{{ m.name }}</span>
                <span class="mt-1 block text-xs text-slate-500">{{
                  m.note
                }}</span>
              </li>
            </ul>
            <p class="mt-4 text-xs text-slate-500">
              算法致谢：
              <a
                href="https://github.com/bloc97/Anime4K"
                class="text-violet-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Anime4K
              </a>
            </p>
          </div>
        </div>
      </section>

      <section
        id="bangumi"
        class="mx-auto max-w-6xl px-4 py-20 sm:px-6"
      >
        <h2 class="text-2xl font-semibold text-white sm:text-3xl">
          Bangumi 集成
        </h2>
        <p class="mt-2 max-w-2xl text-slate-400">
          使用 Bangumi 开放能力同步账号与番剧元数据：收藏、发现与时间线，让追番状态可携带。
        </p>
        <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="item in bangumiItems"
            :key="item"
            class="rounded-xl border border-white/10 bg-slate-900/40 px-4 py-3 text-sm text-slate-300"
          >
            {{ item }}
          </div>
        </div>
      </section>

      <section
        id="data"
        class="border-t border-white/5 bg-slate-900/40 py-20"
      >
        <div class="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 class="text-2xl font-semibold text-white sm:text-3xl">
            数据源管理
          </h2>
          <p class="mt-2 max-w-2xl text-slate-400">
            在应用内即可维护数据源：版本、名称、站点与搜索链接、各类 XPath
            规则等，便于扩展与迁移。
          </p>
          <ol
            class="mt-8 list-decimal space-y-3 pl-5 text-sm text-slate-300 marker:text-violet-400"
          >
            <li>进入「设置」→「数据源管理」</li>
            <li>添加数据源并填写站点、搜索 URL（使用 <code class="rounded bg-white/10 px-1.5 py-0.5 text-violet-200">{keyword}</code> 作为搜索占位符）</li>
            <li>配置列表、线路、剧集等 XPath，保存后即可使用</li>
          </ol>
        </div>
      </section>

      <section class="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div
          class="rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-950/50 to-slate-900/80 p-8 text-center sm:p-12"
        >
          <h2 class="text-xl font-semibold text-white sm:text-2xl">
            参与共建
          </h2>
          <p class="mx-auto mt-3 max-w-lg text-sm text-slate-400">
            欢迎通过 Issue 与 Pull Request 反馈问题、提交改进。具体许可证与使用范围请以仓库内说明为准。
          </p>
          <a
            :href="repoUrl"
            class="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            target="_blank"
            rel="noopener noreferrer"
          >
            前往 GitHub 仓库
          </a>
        </div>
      </section>
    </main>

    <footer class="border-t border-white/5 py-10 text-center text-xs text-slate-500">
      <p>
        本页为 AnimeFlow 项目介绍站点，内容与功能描述参考
        <a
          :href="repoUrl"
          class="text-violet-400 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          openAnimeFlow/AnimeFlow
        </a>
        公开说明。
      </p>
      <p class="mt-2">
        仅供学习交流使用，请遵守法律法规，尊重版权。致谢：Anime4K、Bangumi、弹弹Play 等生态项目。
      </p>
    </footer>
  </div>
</template>
