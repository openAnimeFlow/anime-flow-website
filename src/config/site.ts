export const repoUrl = 'https://github.com/openAnimeFlow/AnimeFlow'
export const releasesUrl = `${repoUrl}/releases`
export const releasesApiUrl = 'https://api.github.com/repos/openAnimeFlow/AnimeFlow/releases/latest'

export const siteName = 'AnimeFlow'
export const siteUrl = `${(import.meta.env.VITE_SITE_URL || 'https://web.ligg.top/').replace(/\/$/, '')}/`

export function publicAsset(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}

export function pageUrl(path: string) {
  return path === '/' ? siteUrl : `${siteUrl}${path.replace(/^\//, '')}`
}
