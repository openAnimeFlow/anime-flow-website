import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import { seoPages, pageUrl, siteUrl } from '../dist-ssr/entry-server.js'

const titles = new Set()
const descriptions = new Set()
const sitemap = await readFile('dist/sitemap.xml', 'utf8')
const base = new URL(siteUrl).pathname

for (const page of seoPages) {
  const file = page.path === '/' ? 'index.html' : `${page.path.slice(1)}.html`
  const html = await readFile(`dist/${file}`, 'utf8')
  assert.equal((html.match(/<title>/g) ?? []).length, 1, `${file}: duplicate title`)
  assert.equal((html.match(/name="description"/g) ?? []).length, 1, `${file}: duplicate description`)
  assert.equal((html.match(/rel="canonical"/g) ?? []).length, 1, `${file}: duplicate canonical`)
  assert.equal((html.match(/<h1[\s>]/g) ?? []).length, 1, `${file}: needs one main heading`)
  assert.match(html, /<h1[\s\S]*?AnimeFlow[\s\S]*?<\/h1>/, `${file}: missing brand in heading`)
  assert.ok(!html.includes('<!--ssr-outlet-->'), `${file}: content was not prerendered`)
  assert.match(html, /<main[\s>]/, `${file}: missing static content`)
  const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1]
  assert.equal(canonical, pageUrl(page.path), `${file}: incorrect canonical`)
  assert.ok(sitemap.includes(`<loc>${canonical}</loc>`), `${file}: missing from sitemap`)
  const schema = JSON.parse(html.match(/id="site-schema" type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1] ?? '{}')
  assert.equal(schema['@context'], 'https://schema.org')
  assert.ok(schema['@graph'].some(node => node['@type'] === 'WebPage' && node.url === canonical))
  for (const match of html.matchAll(/(?:src|href)="(\/[^"#]*)"/g)) {
    const url = new URL(match[1], siteUrl)
    if (!/\.(?:js|css|jpg|webp|ico)$/.test(url.pathname)) continue
    assert.ok(url.pathname.startsWith(base), `${file}: asset outside deployment base`)
    await access(`dist/${url.pathname.slice(base.length)}`)
  }
  titles.add(html.match(/<title>(.*?)<\/title>/)?.[1])
  descriptions.add(html.match(/name="description" content="([^"]+)"/)?.[1])
}
assert.equal(titles.size, seoPages.length, 'Pages must have unique titles')
assert.equal(descriptions.size, seoPages.length, 'Pages must have unique descriptions')
assert.equal((sitemap.match(/<loc>/g) ?? []).length, seoPages.length)
assert.ok(!sitemap.includes('/404'))
assert.match(await readFile('dist/404.html', 'utf8'), /name="robots" content="noindex, follow"/)
assert.ok((await readFile('dist/robots.txt', 'utf8')).includes(`Sitemap: ${siteUrl}sitemap.xml`))
console.log('SEO checks passed: static content, unique metadata, canonical URLs, structured data, assets, sitemap and 404')
