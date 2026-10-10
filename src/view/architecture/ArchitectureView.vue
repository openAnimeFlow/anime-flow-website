<script setup lang="ts">
import { RouterLink } from 'vue-router'
import FlowIcon from '@/components/FlowIcon.vue'
import ArchitectureDiagram from './ArchitectureDiagram.vue'
import {
  contents, designDecisions, diagrams, directoryLayers, featureChapters,
  foundations, overviewDiagram, sourceRevision, sourceUrl, startupSteps,
} from './architectureData'
import './architecture.css'
</script>

<template>
  <div class="arch-page">
    <a
      class="arch-skip"
      href="#architecture-main"
    >跳到架构设计内容</a>
    <main
      id="architecture-main"
      class="arch-container"
      tabindex="-1"
    >
      <header class="arch-hero">
        <div>
          <p class="arch-eyebrow">
            <span class="arch-status" /> ENGINEERING / ANIMEFLOW
          </p>
          <h1>AnimeFlow 架构设计，<br>读懂<span>每一条播放链路。</span></h1>
          <p class="arch-lead">
            一份基于客户端源码的架构设计说明。沿着数据与事件的流向，了解 AnimeFlow 如何连接跨平台界面、可配置数据源、双播放内核、离线下载与收藏同步。
          </p>
          <div class="arch-hero-actions">
            <a
              class="arch-button arch-button-primary"
              href="#overview"
            >浏览架构图 <FlowIcon
              name="arrow"
              :size="17"
            /></a>
            <RouterLink
              class="arch-button"
              to="/introduction"
            >
              了解功能体验 <FlowIcon
                name="arrow-up-right"
                :size="15"
              />
            </RouterLink>
          </div>
        </div>
        <aside
          class="arch-hero-note"
          aria-label="架构说明范围"
        >
          <FlowIcon
            name="layers"
            :size="30"
          />
          <p class="arch-detail-label">
            CLIENT ARCHITECTURE
          </p>
          <h2>共享业务，适配平台。</h2>
          <p>Flutter 负责多端界面，Riverpod 组织状态和会话；原生内核、网络服务与本地存储在明确的边界协作。</p>
          <div class="arch-stack-tags">
            <span>Flutter / Dart</span><span>Riverpod</span><span>GoRouter</span><span>media_kit / FVP</span><span>Dio</span><span>Hive CE</span>
          </div>
          <a
            :href="sourceUrl('pubspec.yaml')"
            target="_blank"
            rel="noopener noreferrer"
          >源码快照 <code>{{ sourceRevision.slice(0, 8) }}</code><FlowIcon
            name="arrow-up-right"
            :size="13"
          /></a>
        </aside>
      </header>

      <nav
        class="arch-toc"
        aria-label="架构设计目录"
      >
        <a
          v-for="(item, index) in contents"
          :key="item.id"
          :href="`#${item.id}`"
        ><span>{{ String(index + 1).padStart(2, '0') }}</span>{{ item.title }}</a>
      </nav>

      <section
        id="overview"
        class="arch-section"
      >
        <div class="arch-section-heading">
          <div>
            <p class="arch-eyebrow">
              01 / SYSTEM OVERVIEW
            </p><h2>以功能为边界，以接口连接。</h2>
          </div>
          <p>app 组装应用，features 承载业务，core 提供基础设施，shared 复用模型与组件。下面的图展示模块关系，点击节点可查看职责和对应实现。</p>
        </div>
        <ArchitectureDiagram :diagram="overviewDiagram" />
        <p class="arch-scope-note">
          <FlowIcon
            name="source"
            :size="17"
          /> 说明范围：客户端源码及其外部接口。Flow 服务的数据库、任务队列与部署拓扑未包含在此仓库中，因此以外部服务节点表示。
        </p>
      </section>

      <section
        id="bootstrap"
        class="arch-section"
      >
        <div class="arch-section-heading">
          <div>
            <p class="arch-eyebrow">
              02 / BOOTSTRAP & STRUCTURE
            </p><h2>先恢复运行条件，再进入界面。</h2>
          </div>
          <p>启动流程把必须完成的存储与平台初始化放在 runApp 之前；在线状态、内置源和 Shader 准备等工作以异步任务启动，减少根组件中的初始化责任。</p>
        </div>
        <div
          class="arch-startup"
          aria-label="应用启动顺序"
        >
          <article
            v-for="(step, index) in startupSteps"
            :key="step.title"
          >
            <span class="arch-step-number">{{ String(index + 1).padStart(2, '0') }}</span>
            <h3>{{ step.title }}</h3><p>{{ step.text }}</p>
            <FlowIcon
              v-if="index < startupSteps.length - 1"
              class="arch-step-arrow"
              name="arrow"
              :size="17"
            />
          </article>
        </div>
        <div class="arch-source-line">
          <span>启动入口</span><a
            :href="sourceUrl('lib/main.dart')"
            target="_blank"
            rel="noopener noreferrer"
          ><code>main.dart</code></a><span>→</span><a
            :href="sourceUrl('lib/app/bootstrap.dart')"
            target="_blank"
            rel="noopener noreferrer"
          ><code>bootstrap.dart</code></a><span>→</span><a
            :href="sourceUrl('lib/app/app.dart')"
            target="_blank"
            rel="noopener noreferrer"
          ><code>MyApp</code></a>
        </div>
        <div class="arch-table-wrap">
          <table class="arch-directory-table">
            <caption>目录职责与实现入口</caption>
            <thead>
              <tr>
                <th scope="col">
                  源码目录
                </th><th scope="col">
                  职责
                </th><th scope="col">
                  组织方式
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="layer in directoryLayers"
                :key="layer.path"
              >
                <td>
                  <a
                    :href="sourceUrl(layer.file)"
                    target="_blank"
                    rel="noopener noreferrer"
                  ><code>{{ layer.path }}</code><FlowIcon
                    name="arrow-up-right"
                    :size="12"
                  /></a>
                </td><th scope="row">
                  {{ layer.label }}
                </th><td>{{ layer.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section
        v-for="chapter in featureChapters"
        :id="chapter.id"
        :key="chapter.id"
        class="arch-section"
      >
        <div class="arch-section-heading">
          <div>
            <p class="arch-eyebrow">
              {{ chapter.number }} / {{ chapter.eyebrow }}
            </p><h2>{{ chapter.title }}</h2>
          </div>
          <p>{{ chapter.description }}</p>
        </div>
        <ArchitectureDiagram :diagram="diagrams[chapter.id]!" />
        <div
          class="arch-logic-grid"
          :class="{ 'arch-logic-grid-four': chapter.points.length === 4 }"
        >
          <article
            v-for="(point, index) in chapter.points"
            :key="point.title"
          >
            <span class="arch-point-index">{{ String(index + 1).padStart(2, '0') }}</span><h3>{{ point.title }}</h3><p>{{ point.text }}</p>
          </article>
        </div>
        <details class="arch-test-references">
          <summary>
            <FlowIcon
              name="check"
              :size="16"
            /> 查看相关行为测试 <span>{{ chapter.tests.length }} 个源码入口</span><FlowIcon
              class="arch-details-arrow"
              name="arrow"
              :size="15"
            />
          </summary>
          <div>
            <a
              v-for="file in chapter.tests"
              :key="file"
              :href="sourceUrl(file)"
              target="_blank"
              rel="noopener noreferrer"
            ><code>{{ file }}</code><FlowIcon
              name="arrow-up-right"
              :size="13"
            /></a>
          </div>
        </details>
      </section>

      <section
        id="foundation"
        class="arch-section"
      >
        <div class="arch-section-heading">
          <div>
            <p class="arch-eyebrow">
              07 / SHARED INFRASTRUCTURE
            </p><h2>完整体验，来自共同的基础设施。</h2>
          </div>
          <p>账号、网络、缓存、平台与更新贯穿多个功能。将这些能力放在独立入口中，让业务页面保持清晰，也让异常恢复有一致的处理位置。</p>
        </div>
        <div class="arch-foundation-grid">
          <article
            v-for="item in foundations"
            :key="item.title"
          >
            <span class="arch-foundation-icon"><FlowIcon
              :name="item.icon"
              :size="23"
            /></span><h3>{{ item.title }}</h3><p>{{ item.text }}</p>
            <details class="arch-foundation-files">
              <summary>查看实现文件</summary><a
                v-for="file in item.files"
                :key="file"
                :href="sourceUrl(file)"
                target="_blank"
                rel="noopener noreferrer"
              ><code>{{ file }}</code><FlowIcon
                name="arrow-up-right"
                :size="12"
              /></a>
            </details>
          </article>
        </div>
      </section>

      <section
        id="quality"
        class="arch-section"
      >
        <div class="arch-section-heading">
          <div>
            <p class="arch-eyebrow">
              08 / DESIGN & VERIFICATION
            </p><h2>把复杂性留在明确的边界里。</h2>
          </div>
          <p>功能内聚、接口隔离、异步失效检查与持久化策略贯穿这些实现。现有测试覆盖规则解析、内核切换、弹幕调度、下载恢复和收藏同步等行为，可从各章节的测试入口继续阅读。</p>
        </div>
        <div class="arch-decisions">
          <article
            v-for="(decision, index) in designDecisions"
            :key="decision.title"
          >
            <span>{{ String(index + 1).padStart(2, '0') }}</span><div><h3>{{ decision.title }}</h3><p>{{ decision.text }}</p></div>
          </article>
        </div>
      </section>

      <aside class="arch-closing">
        <div>
          <p class="arch-eyebrow">
            CONTINUE EXPLORING
          </p><h2>从架构走进实现。</h2><p>所有源码入口固定到本次审阅的客户端提交，便于把图中的职责与实际代码逐一对应。</p>
        </div>
        <a
          class="arch-button arch-button-primary"
          :href="sourceUrl('lib/app/bootstrap.dart')"
          target="_blank"
          rel="noopener noreferrer"
        >从启动入口阅读 <FlowIcon
          name="arrow-up-right"
          :size="16"
        /></a>
      </aside>
      <a
        class="arch-back-top"
        href="#architecture-main"
      >回到页面顶部 ↑</a>
    </main>
  </div>
</template>
