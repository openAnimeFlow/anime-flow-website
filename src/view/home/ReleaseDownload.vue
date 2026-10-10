<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId } from 'vue'

const props = withDefaults(defineProps<{
  options: readonly { id: string; label: string }[]
  modelValue: string
  version?: string
  loading?: boolean
  failed?: boolean
  hint?: string
}>(), { version: '', loading: false, failed: false, hint: '' })
const emit = defineEmits<{
  'update:modelValue': [id: string]
  download: [id: string]
  retry: []
}>()
const selected = computed(() => props.options.find(option => option.id === props.modelValue))
const downloadLabel = computed(() => `下载 AnimeFlow${props.version ? ` ${props.version}` : ''}`)
const picker = ref<HTMLElement>()
const pickerTrigger = ref<HTMLButtonElement>()
const pickerList = ref<HTMLUListElement>()
const pickerOpen = ref(false)
const pickerPlacement = ref<'top' | 'bottom'>('bottom')
const pickerMaxHeight = ref(360)
const activeIndex = ref(0)
const pickerId = useId()
const pickerLabel = computed(() => props.loading ? '获取安装包…' : props.failed ? '暂不可用' : selected.value?.label ?? '选择平台')

async function openPicker() {
  if (props.loading || props.failed || !props.options.length) return
  const bounds = pickerTrigger.value?.getBoundingClientRect()
  if (bounds) {
    const below = window.innerHeight - bounds.bottom - 16
    const above = bounds.top - 16
    pickerPlacement.value = below < 240 && above > below ? 'top' : 'bottom'
    pickerMaxHeight.value = Math.max(0, Math.min(360, window.innerHeight / 2, pickerPlacement.value === 'top' ? above : below))
  }
  activeIndex.value = Math.max(0, props.options.findIndex(option => option.id === props.modelValue))
  pickerOpen.value = true
  await nextTick()
  pickerList.value?.focus({ preventScroll: true })
  scrollToActiveOption()
}

function closePicker(restoreFocus = false) {
  pickerOpen.value = false
  if (restoreFocus) pickerTrigger.value?.focus({ preventScroll: true })
}

function chooseOption(id: string) {
  emit('update:modelValue', id)
  closePicker(true)
}

function scrollToActiveOption() {
  const list = pickerList.value
  const option = list?.children[activeIndex.value]
  if (!list || !(option instanceof HTMLElement)) return
  if (option.offsetTop < list.scrollTop) list.scrollTop = option.offsetTop
  else if (option.offsetTop + option.offsetHeight > list.scrollTop + list.clientHeight) {
    list.scrollTop = option.offsetTop + option.offsetHeight - list.clientHeight
  }
}

function handlePickerKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    event.preventDefault()
    closePicker(true)
  } else if (event.key === 'Tab') {
    closePicker()
  } else if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    const option = props.options[activeIndex.value]
    if (option) chooseOption(option.id)
  } else if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
    event.preventDefault()
    const count = props.options.length
    if (event.key === 'Home') activeIndex.value = 0
    else if (event.key === 'End') activeIndex.value = count - 1
    else activeIndex.value = (activeIndex.value + (event.key === 'ArrowDown' ? 1 : -1) + count) % count
    nextTick(scrollToActiveOption)
  }
}

function handleOutsidePointer(event: PointerEvent) {
  if (event.target instanceof Node && !picker.value?.contains(event.target)) closePicker()
}

function handlePickerFocusout(event: FocusEvent) {
  if (!(event.relatedTarget instanceof Node) || !picker.value?.contains(event.relatedTarget)) closePicker()
}

onMounted(() => {
  document.addEventListener('pointerdown', handleOutsidePointer)
})
onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', handleOutsidePointer)
})
</script>

<template>
  <div class="release-download">
    <div
      class="release-download-pill"
      :aria-busy="loading"
    >
      <button
        class="release-download-action"
        type="button"
        :disabled="!selected || loading || failed"
        :aria-label="selected ? `${downloadLabel} ${selected.label}` : downloadLabel"
        @click="emit('download', modelValue)"
      >
        {{ downloadLabel }}
      </button>
      <div
        ref="picker"
        class="release-download-picker"
        @focusout="handlePickerFocusout"
      >
        <button
          ref="pickerTrigger"
          type="button"
          class="release-download-trigger"
          :aria-label="`选择下载平台和安装包格式：${pickerLabel}`"
          aria-haspopup="listbox"
          :aria-expanded="pickerOpen"
          :aria-controls="pickerId"
          :disabled="loading || failed || !options.length"
          @click="pickerOpen ? closePicker() : openPicker()"
          @keydown.down.prevent="openPicker"
          @keydown.up.prevent="openPicker"
        >
          <span>{{ pickerLabel }}</span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
            :class="{ 'is-open': pickerOpen }"
          ><path d="m5 9 7 7 7-7" /></svg>
        </button>
        <ul
          v-if="pickerOpen"
          :id="pickerId"
          ref="pickerList"
          class="release-download-menu"
          :data-placement="pickerPlacement"
          :style="{ maxHeight: `${pickerMaxHeight}px` }"
          role="listbox"
          aria-label="下载平台和安装包格式"
          :aria-activedescendant="`${pickerId}-${activeIndex}`"
          tabindex="-1"
          @keydown="handlePickerKeydown"
        >
          <li
            v-for="(option, index) in options"
            :id="`${pickerId}-${index}`"
            :key="option.id"
            role="option"
            :aria-selected="modelValue === option.id"
            :class="{ 'is-selected': modelValue === option.id, 'is-active': activeIndex === index }"
            @mouseenter="activeIndex = index"
            @click="chooseOption(option.id)"
          >
            <span>{{ option.label }}</span>
            <svg
              v-if="modelValue === option.id"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            ><path d="m5 12 4 4L19 6" /></svg>
          </li>
        </ul>
      </div>
    </div>
    <p
      class="release-download-status"
      aria-live="polite"
    >
      <template v-if="loading">
        正在获取最新版本…
      </template>
      <template v-else-if="failed">
        版本获取失败，<button
          type="button"
          @click="emit('retry')"
        >
          重试
        </button>
      </template>
    </p>
    <p
      v-if="hint"
      class="release-download-hint"
    >
      {{ hint }}
    </p>
  </div>
</template>

<style scoped>
.release-download { position: relative; max-width: 100%; }
.release-download-pill { display: inline-flex; align-items: stretch; height: 42px; max-width: 100%; border-radius: 999px; background: var(--home-primary); color: var(--home-on-primary); font-size: 14px; font-weight: 600; }
.release-download-action { display: flex; align-items: center; justify-content: center; min-width: 0; padding: 0 22px; border: 0; border-right: 1px solid color-mix(in srgb, var(--home-on-primary) 35%, transparent); border-radius: 999px 0 0 999px; background: transparent; color: var(--home-on-primary) !important; line-height: 1.3; text-align: center; transition: background .2s; }
.release-download-action:hover:not(:disabled) { background: var(--home-primary-hover); }
.release-download-action:disabled { cursor: not-allowed; color: color-mix(in srgb, var(--home-on-primary) 65%, transparent) !important; }
.release-download-picker { position: relative; display: flex; align-items: center; min-width: 0; }
.release-download-trigger { display: inline-flex; align-items: center; gap: 14px; height: 100%; padding: 0 20px; border: 0; border-radius: 0 999px 999px 0; background: transparent; color: var(--home-on-primary); white-space: nowrap; transition: background .2s; }
.release-download-trigger:hover:not(:disabled), .release-download-trigger[aria-expanded=true], .release-download-trigger:focus-visible { background: var(--home-primary-hover); }
.release-download-trigger:disabled { cursor: wait; opacity: .7; }
.release-download-picker .release-download-trigger:focus-visible { outline: none; }
.release-download-trigger svg { flex-shrink: 0; transition: transform .2s; }
.release-download-trigger svg.is-open { transform: rotate(180deg); }
.release-download-menu { position: absolute; top: calc(100% + 8px); right: 0; z-index: 10; width: max-content; min-width: 100%; max-width: calc(100vw - 40px); max-height: min(360px, 50vh); overflow-y: auto; margin: 0; padding: 6px; list-style: none; border: 1px solid var(--home-line); border-radius: 12px; background: var(--home-bg); color: var(--home-ink); box-shadow: 0 12px 32px color-mix(in srgb, var(--home-ink) 15%, transparent); outline: none; font-size: 12px; font-weight: 500; }
.release-download-menu[data-placement=top] { top: auto; bottom: calc(100% + 8px); }
.release-download-menu li { display: flex; align-items: center; justify-content: space-between; gap: 18px; min-height: 38px; padding: 8px 12px; border-radius: 7px; cursor: pointer; transition: background .15s, color .15s; }
.release-download-menu li.is-active { background: var(--home-panel); }
.release-download-menu li.is-selected { color: var(--home-accent); background: var(--home-soft); font-weight: 600; }
.release-download-menu li.is-selected.is-active { background: var(--home-picker); }
.release-download-menu li svg { flex-shrink: 0; }
.release-download-status { margin-top: 9px !important; color: var(--home-muted); font-size: 11px; line-height: 1.6; }
.release-download-status button { border: 0; padding: 0; background: transparent; color: var(--home-accent); text-decoration: underline; }
.release-download-hint { margin-top: 4px !important; color: var(--home-muted); font-size: 11px; }
@media (max-width: 600px) {
  .release-download-pill { font-size: 13px; }
  .release-download-action { padding-inline: 12px; }
  .release-download-trigger { gap: 10px; padding-inline: 16px; }
}
</style>
