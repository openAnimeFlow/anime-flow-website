<script setup lang="ts">
import { computed, ref } from 'vue'
import FlowIcon from '@/components/FlowIcon.vue'
import { sourceUrl, type ArchitectureDiagram } from './architectureData'

const props = defineProps<{ diagram: ArchitectureDiagram }>()
const selectedId = ref(props.diagram.nodes[0]!.id)
const selected = computed(() => props.diagram.nodes.find(node => node.id === selectedId.value) ?? props.diagram.nodes[0]!)
const kinds = { app: '界面与状态', service: '逻辑与接口', storage: '数据与存储', external: '平台与外部服务' }
</script>

<template>
  <figure class="arch-diagram">
    <div class="arch-diagram-heading">
      <span class="arch-diagram-title">{{ diagram.title }}</span>
      <span class="arch-diagram-hint"><FlowIcon name="source" :size="14" /> 选择节点查看实现</span>
    </div>
    <div class="arch-diagram-legend" aria-label="架构图图例">
      <span v-for="(label, kind) in kinds" :key="kind"><i :class="`arch-kind-${kind}`" />{{ label }}</span>
    </div>
    <div
      class="arch-diagram-scroll"
      tabindex="0"
      role="region"
      :aria-label="`${diagram.title}，窄屏可横向滚动；Tab 切换节点，Enter 或空格查看详情`"
    >
      <svg
        class="arch-diagram-svg"
        :viewBox="`0 0 1020 ${diagram.height}`"
        role="group"
        :aria-labelledby="`${diagram.id}-diagram-title ${diagram.id}-diagram-desc`"
      >
        <title :id="`${diagram.id}-diagram-title`">{{ diagram.title }}</title>
        <desc :id="`${diagram.id}-diagram-desc`">{{ diagram.caption }}</desc>
        <defs>
          <marker :id="`${diagram.id}-arrow`" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 Z" class="arch-arrowhead" />
          </marker>
        </defs>
        <g v-for="(edge, index) in diagram.edges" :key="index" class="arch-edge" :class="{ 'arch-edge-active': edge.from === selectedId || edge.to === selectedId }">
          <path :d="edge.path" fill="none" :stroke-dasharray="edge.dashed ? '5 5' : undefined" :marker-end="`url(#${diagram.id}-arrow)`" />
          <text :x="edge.labelX" :y="edge.labelY" text-anchor="middle">{{ edge.label }}</text>
        </g>
        <g
          v-for="node in diagram.nodes"
          :key="node.id"
          class="arch-node"
          :class="[`arch-kind-${node.kind}`, { 'arch-node-selected': selectedId === node.id }]"
          :transform="`translate(${node.x}, ${node.y})`"
          role="button"
          tabindex="0"
          :aria-pressed="selectedId === node.id"
          :aria-label="`${node.title}：${node.subtitle}，查看详情`"
          :aria-controls="`${diagram.id}-node-detail`"
          @click="selectedId = node.id"
          @keydown.enter.prevent="selectedId = node.id"
          @keydown.space.prevent="selectedId = node.id"
        >
          <rect width="256" height="84" rx="12" />
          <rect x="0" y="22" width="3" height="40" rx="1.5" class="arch-node-stripe" />
          <text x="18" y="34" class="arch-node-title">{{ node.title }}</text>
          <text x="18" y="59" class="arch-node-subtitle">{{ node.subtitle }}</text>
          <circle v-if="selectedId === node.id" cx="236" cy="19" r="3" class="arch-node-dot" />
        </g>
      </svg>
    </div>
    <figcaption>{{ diagram.caption }}<span class="arch-scroll-hint">窄屏可左右滑动查看完整图示。</span></figcaption>
    <div :id="`${diagram.id}-node-detail`" class="arch-node-detail" aria-live="polite" aria-atomic="true">
      <div class="arch-node-detail-copy">
        <span class="arch-detail-label">{{ kinds[selected.kind] }} · 实现说明</span>
        <h3>{{ selected.title }}</h3>
        <p>{{ selected.description }}</p>
      </div>
      <div class="arch-node-files">
        <span class="arch-detail-label">对应源码</span>
        <a v-for="file in selected.files" :key="file" :href="sourceUrl(file)" target="_blank" rel="noopener noreferrer">
          <code>{{ file }}</code><FlowIcon name="arrow-up-right" :size="13" />
        </a>
      </div>
    </div>
  </figure>
</template>
