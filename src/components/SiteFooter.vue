<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { repoUrl } from '@/config/site'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="footer-identity">
      <RouterLink
        class="footer-brand"
        :to="{ name: 'home', hash: '#main' }"
        aria-label="返回 AnimeFlow 首页"
      >
        <img
          src="/images/logo.webp"
          alt=""
          width="30"
          height="30"
        >
        <span>AnimeFlow<span class="brand-dot">.</span></span>
      </RouterLink>
      <p>让热爱，自然发生。</p>
    </div>
    <div class="footer-details">
      <nav aria-label="页脚导航">
        <a
          :href="repoUrl"
          target="_blank"
          rel="noopener noreferrer"
        >GitHub</a>
        <a
          :href="`${repoUrl}#readme`"
          target="_blank"
          rel="noopener noreferrer"
        >使用指南 ↗</a>
        <a
          :href="`${repoUrl}/issues`"
          target="_blank"
          rel="noopener noreferrer"
        >问题反馈 ↗</a>
        <a
          :href="`${repoUrl}/blob/main/LICENSE.txt`"
          target="_blank"
          rel="noopener noreferrer"
        >项目许可 ↗</a>
      </nav>
      <p>致谢 Bangumi · Anime4K · 弹弹Play</p>
      <span class="footer-copyright">© {{ year }} AnimeFlow</span>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  width: calc(100% - 112px);
  max-width: 1240px;
  margin-inline: auto;
  padding-block: 36px;
  border-top: 1px solid var(--home-line);
  gap: 30px;
  color: var(--home-muted);
}

.site-footer a {
  color: inherit;
  text-decoration: none;
}

.site-footer a:hover {
  color: var(--home-accent);
}

.site-footer a:focus-visible {
  outline: 3px solid var(--home-accent);
  outline-offset: 5px;
}

.site-footer p {
  margin: 13px 0 0;
  font-size: 11px;
}

.footer-brand {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: var(--home-ink) !important;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -.8px;
  line-height: 1;
}

.footer-brand img {
  display: block;
  border-radius: 8px;
}

.brand-dot {
  color: var(--home-accent);
}

.footer-details {
  text-align: right;
}

.footer-details nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 12px 24px;
  font-size: 12px;
}

.footer-copyright {
  display: block;
  margin-top: 6px;
  font-size: 10px;
}

@media (max-width: 1100px) {
  .site-footer { width: calc(100% - 64px); }
}

@media (max-width: 850px) {
  .site-footer { width: calc(100% - 48px); }
}

@media (max-width: 600px) {
  .site-footer {
    width: calc(100% - 40px);
    flex-direction: column;
    align-items: flex-start;
    padding-block: 30px;
    gap: 24px;
  }

  .footer-details { text-align: left; }
  .footer-details nav { justify-content: flex-start; gap: 12px 18px; font-size: 11px; }
}
</style>
