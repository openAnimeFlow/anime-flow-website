import { pageUrl, publicAsset, releasesUrl, repoUrl, siteName, siteUrl } from './site'

export const seoPages = [
  {
    path: '/',
    title: 'AnimeFlow 官网 - 官方下载与项目介绍 | 跨平台动漫追番播放器',
    description: 'AnimeFlow 官网，提供官方下载安装入口、功能介绍与使用指南。开源跨平台动漫追番播放器，支持 Windows、Android、macOS、Linux、iOS，集成多数据源、Anime4K 实时超分、弹幕与 Bangumi 收藏同步。',
    label: 'AnimeFlow 官网',
  },
  {
    path: '/introduction',
    title: 'AnimeFlow 功能与项目介绍 | AnimeFlow 官网',
    description: '了解 AnimeFlow 的追番日历、番剧搜索、多数据源、离线下载、Anime4K 实时超分、弹幕设置与 Bangumi 收藏同步，查看桌面、平板和手机端的实际界面。',
    label: '项目介绍',
  },
  {
    path: '/architecture',
    title: 'AnimeFlow 架构设计与开源技术说明 | AnimeFlow 官网',
    description: 'AnimeFlow 客户端架构设计说明：了解 Flutter 跨平台界面、Riverpod 状态管理、可配置数据源、双播放内核、离线下载和收藏同步的实现与开源代码。',
    label: '架构设计',
  },
] as const

export function getSeo(path: string) {
  const page = seoPages.find(page => page.path === path.replace(/\/$/, '') || (page.path === '/' && path === '/'))
  const title = page?.title ?? '页面未找到 | AnimeFlow 官网'
  const description = page?.description ?? '访问 AnimeFlow 官网，了解跨平台动漫追番播放器和官方下载安装入口。'
  const url = pageUrl(page?.path ?? path)
  const image = new URL(publicAsset('images/app-wide.jpg'), siteUrl).href
  const websiteId = `${siteUrl}#website`
  const schema: Record<string, unknown>[] = [
    {
      '@type': 'WebSite', '@id': websiteId, name: siteName,
      alternateName: ['AnimeFlow 官网', 'Anime Flow'], url: siteUrl, inLanguage: 'zh-CN',
      sameAs: [repoUrl],
    },
    {
      '@type': 'WebPage', '@id': `${url}#webpage`, url, name: title, description,
      inLanguage: 'zh-CN', isPartOf: { '@id': websiteId },
    },
  ]
  if (page?.path === '/') {
    schema.push({
      '@type': 'SoftwareApplication', '@id': `${siteUrl}#application`, name: siteName,
      url: siteUrl, description, applicationCategory: 'MultimediaApplication',
      operatingSystem: 'Windows, Android, macOS, Linux, iOS',
      downloadUrl: releasesUrl, sameAs: [repoUrl],
      image: new URL(publicAsset('images/logo.webp'), siteUrl).href,
      featureList: ['多数据源', 'Anime4K 实时超分', '弹幕', 'Bangumi 收藏同步'],
    })
  } else if (page) {
    schema.push({
      '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'AnimeFlow 官网', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: page.label, item: url },
      ],
    })
  }
  return {
    title, url,
    meta: {
      description,
      robots: page ? 'index, follow, max-image-preview:large' : 'noindex, follow',
      'og:type': 'website', 'og:locale': 'zh_CN', 'og:site_name': siteName,
      'og:title': title, 'og:description': description, 'og:url': url,
      'og:image': image, 'og:image:alt': 'AnimeFlow 跨平台动漫追番播放器界面',
      'twitter:card': 'summary_large_image', 'twitter:title': title,
      'twitter:description': description, 'twitter:image': image,
      'twitter:image:alt': 'AnimeFlow 跨平台动漫追番播放器界面',
    },
    schema: { '@context': 'https://schema.org', '@graph': schema },
  }
}

export function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!)
}

export function renderSeoHead(path: string) {
  const seo = getSeo(path)
  return [
    `<title>${escapeHtml(seo.title)}</title>`,
    ...Object.entries(seo.meta).map(([key, value]) => `<meta ${key.startsWith('og:') ? 'property' : 'name'}="${key}" content="${escapeHtml(value)}" />`),
    `<link rel="canonical" href="${escapeHtml(seo.url)}" />`,
    `<script id="site-schema" type="application/ld+json">${JSON.stringify(seo.schema).replace(/</g, '\\u003c')}</script>`,
  ].join('\n    ')
}

export function applySeo(path: string) {
  const seo = getSeo(path)
  document.title = seo.title
  for (const [key, value] of Object.entries(seo.meta)) {
    const attribute = key.startsWith('og:') ? 'property' : 'name'
    let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
    if (!tag) {
      tag = document.createElement('meta')
      tag.setAttribute(attribute, key)
      document.head.appendChild(tag)
    }
    tag.content = value
  }
  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.rel = 'canonical'
    document.head.appendChild(canonical)
  }
  canonical.href = seo.url
  let schema = document.getElementById('site-schema')
  if (!schema) {
    schema = document.createElement('script')
    schema.id = 'site-schema'
    schema.setAttribute('type', 'application/ld+json')
    document.head.appendChild(schema)
  }
  schema.textContent = JSON.stringify(seo.schema)
}
