export type DownloadPlatform = 'windows' | 'macos' | 'linux' | 'android' | 'ios'

export interface DownloadOption {
  id: string
  platform: DownloadPlatform
  label: string
  name: string
  url: string
}

const packages: { id: string; platform: DownloadPlatform; pattern: RegExp; label: string }[] = [
  { id: 'windows-exe', platform: 'windows', pattern: /^AnimeFlow-windows-.*\.exe$/i, label: '.exe (Windows)' },
  { id: 'windows-zip', platform: 'windows', pattern: /^AnimeFlow-windows-.*\.zip$/i, label: '.zip (Windows 便携版)' },
  { id: 'macos-dmg', platform: 'macos', pattern: /^AnimeFlow-macos-.*\.dmg$/i, label: '.dmg (macOS)' },
  { id: 'linux-deb', platform: 'linux', pattern: /^AnimeFlow-linux-.*\.deb$/i, label: '.deb (Linux)' },
  { id: 'linux-tar', platform: 'linux', pattern: /^AnimeFlow-linux-.*\.tar\.gz$/i, label: '.tar.gz (Linux)' },
  { id: 'android-arm64', platform: 'android', pattern: /^AnimeFlow-android-arm64-.*\.apk$/i, label: '.apk (Android arm64)' },
  { id: 'android-v7a', platform: 'android', pattern: /^AnimeFlow-android-v7a-.*\.apk$/i, label: '.apk (Android v7a)' },
  { id: 'android-x86_64', platform: 'android', pattern: /^AnimeFlow-android-x86_64-.*\.apk$/i, label: '.apk (Android x86_64)' },
  { id: 'ios-ipa', platform: 'ios', pattern: /^AnimeFlow-ios-.*\.ipa$/i, label: '.ipa (iOS / iPadOS)' },
]

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

export function parseReleaseDownloads(data: unknown): { version: string; options: DownloadOption[] } {
  if (!isRecord(data) || typeof data.tag_name !== 'string' || !data.tag_name.trim() || !Array.isArray(data.assets)) {
    throw new Error('Invalid release response')
  }

  const assets = data.assets.filter(isRecord)
  const options = packages.flatMap(pkg => {
    const asset = assets.find(asset =>
      typeof asset.name === 'string' && pkg.pattern.test(asset.name) &&
      asset.state === 'uploaded' && typeof asset.browser_download_url === 'string' &&
      asset.browser_download_url.startsWith('https://github.com/openAnimeFlow/AnimeFlow/releases/download/'),
    )
    if (!asset) return []
    return [{ id: pkg.id, platform: pkg.platform, label: pkg.label, name: asset.name as string, url: asset.browser_download_url as string }]
  })

  if (!options.length) throw new Error('No downloadable release assets')
  return { version: data.tag_name, options }
}

export function detectDownloadPlatform(device: { userAgent: string; platform: string; maxTouchPoints: number }): DownloadPlatform | undefined {
  const { userAgent, platform, maxTouchPoints } = device
  if (/Android/i.test(userAgent)) return 'android'
  // iPadOS can present a desktop Mac user agent.
  if (/iPhone|iPad|iPod/i.test(userAgent) || (/Mac/i.test(platform + userAgent) && maxTouchPoints > 1)) return 'ios'
  if (/Win/i.test(platform + userAgent)) return 'windows'
  if (/Mac/i.test(platform + userAgent)) return 'macos'
  if (/Linux/i.test(platform + userAgent)) return 'linux'
  return undefined
}

export function selectDeviceDownload(options: DownloadOption[], device: { userAgent: string; platform: string; maxTouchPoints: number }): string {
  const platform = detectDownloadPlatform(device)
  const matches = options.filter(option => option.platform === platform)
  if (platform === 'android') {
    const architecture = /x86_64|x64|amd64/i.test(device.userAgent) ? 'x86_64'
      : /armv7|armv8l/i.test(device.userAgent) ? 'v7a' : 'arm64'
    return matches.find(option => option.id === `android-${architecture}`)?.id ?? matches[0]?.id ?? ''
  }
  return matches[0]?.id ?? ''
}
