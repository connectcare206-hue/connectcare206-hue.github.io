import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const publicDir = path.join(rootDir, 'public');
const siteUrl = 'https://connectcare.co.in';

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const homePage = {
  title: 'Remote Staffing Company in India | ConnectCare Services',
  description:
    'Hire skilled remote professionals from India for Australia, UK, USA and global businesses. Reduce hiring costs with dedicated remote staffing and recruitment outsourcing.',
  h1: 'Remote Staffing & Recruitment Outsourcing from India',
  intro:
    'ConnectCare Services helps businesses in Australia, the UK, the USA and worldwide hire skilled remote professionals from India.',
};

const pages = JSON.parse(fs.readFileSync(path.join(rootDir, 'seoPages.json'), 'utf8'));

const buildPageHtml = (page, slug = '') => {
  const canonical = `${siteUrl}${slug ? `/${slug}` : '/'}`;
  const title = slug ? page.title : homePage.title;
  const description = slug ? page.description : homePage.description;
  const h1 = slug ? page.h1 : homePage.h1;
  const intro = slug ? page.intro : homePage.intro;
  const faqSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (page.faqs || []).map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  });

  const sectionsHtml = (page.sections || [])
    .map(
      (section) => `
        <section>
          <h2>${escapeHtml(section.h)}</h2>
          ${section.p ? `<p>${escapeHtml(section.p)}</p>` : ''}
          ${section.list ? `<ul>${section.list.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>` : ''}
        </section>
      `,
    )
    .join('');

  const faqHtml = (page.faqs || [])
    .map(
      (faq) => `
        <div class="faq-item">
          <h3>${escapeHtml(faq.q)}</h3>
          <p>${escapeHtml(faq.a)}</p>
        </div>
      `,
    )
    .join('');

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="ConnectCare Services" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${canonical}" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <link rel="canonical" href="${canonical}" />
    <script type="application/ld+json">${faqSchema}</script>
    <style>
      :root {
        --bg: #0b0f17;
        --panel: #121a2b;
        --text: #edf3ff;
        --muted: #99a7bf;
        --accent: #8b5cf6;
        --accent-2: #38bdf8;
        --border: rgba(255,255,255,0.1);
      }
      * { box-sizing: border-box; }
      html, body { margin: 0; padding: 0; font-family: Inter, Arial, sans-serif; background: var(--bg); color: var(--text); }
      body { line-height: 1.6; }
      main { max-width: 1100px; margin: 0 auto; padding: 64px 24px 96px; }
      nav { font-size: 0.9rem; color: var(--muted); margin-bottom: 28px; }
      a { color: #dbeafe; text-decoration: none; }
      a:hover { color: white; }
      .hero { margin-bottom: 24px; }
      h1 { margin: 0 0 16px; font-size: clamp(2.3rem, 5vw, 4rem); line-height: 1.08; }
      .intro { color: var(--muted); font-size: 1.15rem; margin: 0 0 32px; }
      section {
        background: rgba(255,255,255,0.02);
        border: 1px solid var(--border);
        border-radius: 20px;
        padding: 24px 24px 8px;
        margin-bottom: 24px;
      }
      h2 { margin-top: 0; font-size: clamp(1.5rem, 2vw, 2.2rem); }
      p, li { color: var(--muted); }
      ul { padding-left: 20px; }
      .faq-item { border-top: 1px solid var(--border); padding-top: 18px; margin-top: 18px; }
      .faq-item:first-child { border-top: none; margin-top: 0; padding-top: 0; }
      .cta {
        display: inline-block; margin-top: 18px; background: linear-gradient(135deg, var(--accent), var(--accent-2));
        color: #fff; border-radius: 999px; padding: 14px 26px; font-weight: 700; box-shadow: 0 15px 40px rgba(139, 92, 246, 0.35);
      }
      @media (max-width: 640px) { main { padding-left: 16px; padding-right: 16px; } section { padding: 20px 18px 8px; } }
    </style>
  </head>
  <body>
    <main>
      <nav><a href="${siteUrl}/">Home</a> ${slug ? ` / ${escapeHtml(page.name)}` : ''}</nav>
      <div class="hero">
        <h1>${escapeHtml(h1)}</h1>
        <p class="intro">${escapeHtml(intro)}</p>
      </div>
      ${sectionsHtml}
      <section>
        <h2>Frequently Asked Questions</h2>
        ${faqHtml}
      </section>
      <a class="cta" href="https://wa.me/918460335032?text=${encodeURIComponent('Hi Connectcare, I would like to discuss hiring requirements.')}">Book a Consultation</a>
    </main>
  </body>
</html>`;
};

const routes = [
  { slug: '', page: homePage },
  ...pages.map((page) => ({ slug: page.slug, page })),
];

for (const { slug, page } of routes) {
  const targetDir = slug ? path.join(distDir, slug) : distDir;
  fs.mkdirSync(targetDir, { recursive: true });
  const indexPath = path.join(targetDir, 'index.html');
  fs.writeFileSync(indexPath, buildPageHtml(page, slug), 'utf8');
}

const sitemapUrls = ['/', ...pages.map((page) => `/${page.slug}`)]
  .map((route) => `  <url><loc>${siteUrl}${route}</loc><lastmod>${new Date().toISOString().slice(0, 10)}</lastmod></url>`)
  .join('\n');

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls}\n</urlset>\n`;

fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf8');
fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf8');

console.log(`Prerendered ${routes.length} pages and sitemap (${siteUrl})`);
