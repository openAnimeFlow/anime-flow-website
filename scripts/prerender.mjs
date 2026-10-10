import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { build } from 'vite'

// Use production env and the same Vue components as the browser build.
await build({ build: { ssr: 'src/entry-server.ts', outDir: 'dist-ssr', manifest: false } })
const { render, seoPages, renderSeoHead, escapeHtml, siteUrl, pageUrl, publicAsset } = await import(
  pathToFileURL(resolve('dist-ssr/entry-server.js')).href
)
const template = await readFile('dist/index.html', 'utf8')
const manifest = JSON.parse(await readFile('dist/.vite/manifest.json', 'utf8'))

// Include only the current route's styles, including shared component styles.
const routeEntries = {
  '/': 'src/view/home/HomeView.vue',
  '/introduction': 'src/view/introduction/IntroductionView.vue',
  '/architecture': 'src/view/architecture/ArchitectureView.vue',
  '/404': 'src/view/NotFoundView.vue',
}
function renderStyles(path) {
  const visited = new Set()
  const styles = new Set()
  function visit(key) {
    if (visited.has(key)) return
    visited.add(key)
    const chunk = manifest[key]
    if (!chunk) throw new Error(`Missing build manifest entry: ${key}`)
    for (const dependency of chunk.imports ?? []) visit(dependency)
    for (const file of chunk.css ?? []) styles.add(file)
  }
  visit(routeEntries[path])
  return [...styles].map(file => publicAsset(file))
    .filter(url => !template.includes(`href="${url}"`))
    .map(url => `<link rel="stylesheet" href="${escapeHtml(url)}" />`).join('\n    ')
}

for (const path of [...seoPages.map(page => page.path), '/404']) {
  const html = template
    .replace(/<title>[\s\S]*?<\/title>/, '')
    .replace(/<meta\s+name="description"[\s\S]*?\/>/, '')
    .replace('<!--seo-head-->', `${renderSeoHead(path)}\n    ${renderStyles(path)}`)
    .replace('<!--ssr-outlet-->', await render(path))
  // Vite preview and static hosts resolve /introduction to introduction.html.
  const file = resolve('dist', path === '/' ? 'index.html' : `${path.slice(1)}.html`)
  await mkdir(resolve(file, '..'), { recursive: true })
  await writeFile(file, html)
  console.log(`Prerendered ${path}`)
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${seoPages.map(page => `  <url><loc>${escapeHtml(pageUrl(page.path))}</loc></url>`).join('\n')}
</urlset>
`
await writeFile('dist/sitemap.xml', sitemap)
// robots.txt only takes effect at the origin root; see README deployment steps.
await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}sitemap.xml\n`)
