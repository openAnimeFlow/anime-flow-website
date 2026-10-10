import { computed, onBeforeUnmount, onMounted, readonly, ref } from 'vue'
import { parseReleaseDownloads, selectDeviceDownload, type DownloadOption } from './releaseDownloads'

export function useReleaseDownloads(apiUrl: string) {
  const options = ref<DownloadOption[]>([])
  const selectedId = ref('')
  const version = ref('')
  const loading = ref(true)
  const failed = ref(false)
  const selected = computed(() => options.value.find(option => option.id === selectedId.value))
  const installationHint = computed(() => selected.value?.platform === 'ios' ? 'iOS / iPadOS 安装需自行签名或侧载。' : '')
  let controller: AbortController | undefined

  async function loadRelease() {
    controller?.abort()
    const request = new AbortController()
    controller = request
    const timeout = window.setTimeout(() => request.abort(), 12000)
    loading.value = true
    failed.value = false

    try {
      const response = await fetch(apiUrl, { signal: request.signal })
      if (!response.ok) throw new Error(`Release request failed: ${response.status}`)
      const release = parseReleaseDownloads(await response.json())
      if (controller !== request) return
      options.value = release.options
      version.value = release.version
      selectedId.value = selectDeviceDownload(release.options, navigator)
    } catch {
      if (controller === request) failed.value = true
    } finally {
      window.clearTimeout(timeout)
      if (controller === request) loading.value = false
    }
  }

  function downloadPackage(id: string) {
    const option = options.value.find(option => option.id === id)
    if (!option || loading.value || failed.value) return
    const link = document.createElement('a')
    link.href = option.url
    link.download = option.name
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  onMounted(loadRelease)
  onBeforeUnmount(() => {
    controller?.abort()
    controller = undefined
  })

  return {
    options: readonly(options),
    selectedId,
    version: readonly(version),
    loading: readonly(loading),
    failed: readonly(failed),
    installationHint,
    loadRelease,
    downloadPackage,
  }
}
