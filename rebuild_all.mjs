/**
 * Rebuilds all 8 CISSP chapter HTML files + appA + appB from the PDF.
 *
 * Font role detection is height-based (auto-detected per chapter),
 * except callout labels which are detected by gap (>= 27pt) + callout keyword.
 *
 * Heights observed across all chapters:
 *   ~18pt, ~13pt → h2 (section heading)
 *   ~12pt, ~13pt → h3 (sub-heading)
 *   ~11pt         → body text
 *   ~10pt, ~9.5pt → body text (italic/quote) OR callout body text
 *   ~9pt          → figure caption
 *   ~8pt          → diagram labels → skip
 *   ~14pt         → page number (font g_d0_f2 always) → skip
 *
 * The callout-label lines appear at gap >= 27 from the previous line and start with NOTE/TIP/etc.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist/legacy/build/pdf.mjs';

const workerSrc = new URL('./node_modules/pdfjs-dist/legacy/build/pdf.worker.mjs', import.meta.url).href;
GlobalWorkerOptions.workerSrc = workerSrc;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PDF_PATH  = path.join(__dirname, 'site', 'cissp-all-in-one-exam-guide-seventh-edition.pdf');
const CHAP_DIR  = path.join(__dirname, 'site', 'chapters');
const FIGURES   = path.join(__dirname, 'site', 'figures');

// ── Chapter definitions ───────────────────────────────────────────────────
const CHAPTERS = [
  { file: 'ch01.html', title: 'Security and Risk Management',      eyebrow: 'Domain 1',    bodyStart: 35,   bodyEnd: 203,  assetBase: '../' },
  { file: 'ch02.html', title: 'Asset Security',                    eyebrow: 'Domain 2',    bodyStart: 223,  bodyEnd: 279,  assetBase: '../' },
  { file: 'ch03.html', title: 'Security Engineering',              eyebrow: 'Domain 3',    bodyStart: 281,  bodyEnd: 509,  assetBase: '../' },
  { file: 'ch04.html', title: 'Communication and Network Security', eyebrow: 'Domain 4',   bodyStart: 511,  bodyEnd: 754,  assetBase: '../' },
  { file: 'ch05.html', title: 'Identity and Access Management',    eyebrow: 'Domain 5',    bodyStart: 755,  bodyEnd: 878,  assetBase: '../' },
  { file: 'ch06.html', title: 'Security Assessment and Testing',   eyebrow: 'Domain 6',    bodyStart: 893,  bodyEnd: 955,  assetBase: '../' },
  { file: 'ch07.html', title: 'Security Operations',               eyebrow: 'Domain 7',    bodyStart: 957,  bodyEnd: 1109, assetBase: '../' },
  { file: 'ch08.html', title: 'Software Development Security',     eyebrow: 'Domain 8',    bodyStart: 1111, bodyEnd: 1246, assetBase: '../' },
  { file: 'appA.html', title: 'Comprehensive Questions',           eyebrow: 'Appendix A',  bodyStart: 1247, bodyEnd: 1302, assetBase: '../' },
  { file: 'appB.html', title: 'About the CD-ROM',                  eyebrow: 'Appendix B',  bodyStart: 1303, bodyEnd: 1305, assetBase: '../' },
];

// ── Callout patterns ──────────────────────────────────────────────────────
const CALLOUTS = [
  { re: /^EXAM\s*TIP/i,  cls: 'callout-examtip',  label: 'Exam Tip'  },
  { re: /^CAUTION/i,     cls: 'callout-caution',  label: 'Caution'   },
  { re: /^IMPORTANT/i,   cls: 'callout-important', label: 'Important' },
  { re: /^NOTE/i,        cls: 'callout-note',      label: 'Note'      },
  { re: /^TIP/i,         cls: 'callout-tip',       label: 'Tip'       },
];
function detectCallout(text) {
  for (const c of CALLOUTS) if (c.re.test(text.trimStart())) return c;
  return null;
}
function stripLabel(text) {
  return text.replace(/^(EXAM\s*TIP|CAUTION|IMPORTANT|NOTE|TIP)\s*/i, '').trim();
}

// ── Height-based font role ────────────────────────────────────────────────
// h = font size in pts (item.transform[0])
// gap = distance from previous line
// fn = font name
function heightRole(h, gap, fn, txt) {
  // Page numbers are always g_d0_f2
  if (fn === 'g_d0_f2') return 'skip';

  // Running header / chapter title bar — appears at top of each page (gap 0, h=8-10)
  // We skip these when gap < 15 and h <= 10 and txt matches "Chapter N:" or "CISSP All-in-One"
  if (h <= 10 && gap < 15 && /^(Chapter \d|CISSP All-in-One|Appendix [AB]:)/.test(txt)) return 'skip';

  // h2 headings: large (>= 13)
  if (h >= 13) return 'h2';

  // h3 headings: ~12
  if (h >= 11.5) return 'h3';

  // Bullet marker: bullet character specifically
  if (txt === '•' || txt === '▪') return 'bullet';

  // Figure caption: ~9pt
  if (h >= 8.8 && h < 10) return 'caption';

  // Body text: ~10–11pt (the main body)
  if (h >= 10) {
    // Callout label: appears at gap >= 27 and starts with keyword
    if (gap >= 25 && detectCallout(txt)) return 'callout-label';
    return 'body';
  }

  // Small text (8pt and below): diagram labels
  return 'diagram';
}

// ── Helpers ───────────────────────────────────────────────────────────────
const esc  = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').substring(0,70);
const fix  = s => s.replace(/([a-z])- ([a-z])/g,'$1$2').replace(/\s{2,}/g,' ').trim();

function figPath(p, base) {
  const f = path.join(FIGURES, `page_${p}.jpg`);
  return fs.existsSync(f) ? `${base}figures/page_${p}.jpg` : null;
}

// ── Extract lines from PDF pages ──────────────────────────────────────────
async function extractLines(pdf, pageStart, pageEnd, assetBase) {
  const lines = [];

  for (let p = pageStart; p <= pageEnd; p++) {
    const page    = await pdf.getPage(p);
    const content = await page.getTextContent();
    const fig     = figPath(p, assetBase);

    const byY = new Map();
    for (const item of content.items) {
      if (!item.str?.trim()) continue;
      const y = Math.round(item.transform[5] * 2) / 2;
      if (!byY.has(y)) byY.set(y, []);
      byY.get(y).push(item);
    }

    const ys = [...byY.keys()].sort((a,b) => b - a);
    let prevY     = null;
    let figPlaced = false;

    for (const y of ys) {
      const its = byY.get(y).sort((a,b) => a.transform[4] - b.transform[4]);
      const fn  = its[0].fontName;
      const h   = Math.round(its[0].transform[0] * 10) / 10;
      const txt = its.map(it => it.str).join('').trim();
      if (!txt) continue;

      const gap  = prevY !== null ? Math.round((prevY - y) * 10) / 10 : 0;
      prevY = y;
      const role = heightRole(h, gap, fn, txt);

      if (role === 'caption' && fig && !figPlaced) {
        lines.push({ page: p, y, role: 'figure', text: txt, fig, gap: 0 });
        figPlaced = true;
        continue;
      }
      if (role === 'skip' || role === 'diagram') continue;

      // Bullet character by itself — emit bullet marker
      if (role === 'bullet') {
        lines.push({ page: p, y, role: 'bullet', text: '', gap });
        continue;
      }

      lines.push({ page: p, y, role, text: txt, gap });
    }

    if (fig && !figPlaced) {
      lines.push({ page: p, y: 0, role: 'figure', text: `Diagram (p. ${p})`, fig, gap: 0 });
    }
  }

  return lines;
}

// ── Lines → blocks ────────────────────────────────────────────────────────
function buildBlocks(lines) {
  const blocks = [];
  let para     = [];
  let bullets  = [];
  let callout  = null;
  let awaitBulletText = false;
  let prevPage = null;

  function flushPara() {
    if (!para.length) return;
    const t = fix(para.join(' '));
    if (t) blocks.push({ type: 'p', text: t });
    para = [];
  }
  function flushBullets() {
    if (!bullets.length) return;
    blocks.push({ type: 'ul', items: bullets.map(fix).filter(Boolean) });
    bullets = [];
    awaitBulletText = false;
  }
  function flushCallout() {
    if (!callout) return;
    const body = fix(callout.lines.join(' '));
    if (body) blocks.push({ type: 'callout', cls: callout.cls, label: callout.label, body });
    callout = null;
  }
  function flushAll() { flushPara(); flushBullets(); flushCallout(); }

  for (const line of lines) {
    const { page, role, text, fig, gap } = line;
    const effectiveGap = (prevPage !== null && page !== prevPage) ? 999 : (gap || 0);
    prevPage = page;

    if (role === 'figure') {
      flushAll();
      blocks.push({ type: 'figure', src: fig, caption: text });
      continue;
    }
    if (role === 'h2') { flushAll(); blocks.push({ type: 'h2', text }); continue; }
    if (role === 'h3') { flushAll(); blocks.push({ type: 'h3', text }); continue; }
    if (role === 'h4') { flushAll(); blocks.push({ type: 'h4', text }); continue; }

    if (role === 'callout-label') {
      flushPara(); flushBullets(); flushCallout();
      const co  = detectCallout(text);
      const body = co ? stripLabel(text) : text;
      callout = { cls: co?.cls || 'callout-note', label: co?.label || 'Note', lines: body ? [body] : [] };
      continue;
    }

    if (role === 'bullet') {
      flushPara(); flushCallout();
      awaitBulletText = true;
      bullets.push('');
      continue;
    }

    if (role === 'body') {
      if (callout) {
        if (effectiveGap >= 30) { flushCallout(); }
        else { callout.lines.push(text); continue; }
      }
      if (awaitBulletText) {
        bullets[bullets.length - 1] = text;
        awaitBulletText = false;
        continue;
      }
      if (bullets.length > 0 && effectiveGap < 16) {
        bullets[bullets.length - 1] += ' ' + text;
        continue;
      }
      if (bullets.length > 0 && effectiveGap >= 16) flushBullets();
      if (effectiveGap >= 18 && para.length > 0) flushPara();
      para.push(text);
    }
  }
  flushAll();
  return blocks;
}

// ── Render blocks → HTML ──────────────────────────────────────────────────
function renderBlocks(blocks) {
  return blocks.map(b => {
    switch (b.type) {
      case 'h2':
        return `<h2 class="section-heading" id="${slug(b.text)}">${esc(b.text)}</h2>`;
      case 'h3':
        return `<h3 class="sub-heading" id="${slug(b.text)}">${esc(b.text)}</h3>`;
      case 'h4':
        return `<h4 class="sub-sub-heading" id="${slug(b.text)}">${esc(b.text)}</h4>`;
      case 'p':
        return `<p>${esc(b.text)}</p>`;
      case 'ul':
        return `<ul class="book-list">\n${b.items.map(i=>`  <li>${esc(i)}</li>`).join('\n')}\n</ul>`;
      case 'figure':
        return `<div class="figure-block">\n  <img src="${b.src}" loading="lazy" alt="${esc(b.caption)}">\n  <p class="figure-caption">${esc(b.caption)}</p>\n</div>`;
      case 'callout':
        return `<div class="callout ${b.cls}">\n  <span class="callout-label">${esc(b.label)}</span>\n  <p>${esc(b.body)}</p>\n</div>`;
      default: return '';
    }
  }).filter(Boolean).join('\n');
}

// ── Build HTML shell ──────────────────────────────────────────────────────
function buildHtml(chap, sidebar, content) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(chap.title)} &middot; CISSP All-in-One Exam Guide</title>
<link rel="stylesheet" href="${chap.assetBase}assets/style.css">
</head>
<body data-chapter="${chap.file.replace('.html','')}" data-base="${chap.assetBase}">
<button class="mobile-nav-toggle" id="mobileNavToggle">&#9776; Contents &amp; Search</button>
<div class="shell">
<aside class="sidebar">${sidebar}</aside>
<main class="main">
<div class="content-wrap">
<p class="chapter-eyebrow">${esc(chap.eyebrow)}</p>
<h1 class="chapter-title">${esc(chap.title)}</h1>
${content}
</div>
</main>
</div>
<script src="${chap.assetBase}assets/app.js"></script>
</body>
</html>`;
}

// ── Main ──────────────────────────────────────────────────────────────────
console.log('Loading PDF…');
const pdfData = new Uint8Array(fs.readFileSync(PDF_PATH));
const pdf     = await getDocument({ data: pdfData, useSystemFonts: true }).promise;
console.log(`PDF: ${pdf.numPages} pages\n`);

for (const chap of CHAPTERS) {
  const chapFile = path.join(CHAP_DIR, chap.file);
  if (!fs.existsSync(chapFile)) {
    console.log(`SKIP ${chap.file} — not found`);
    continue;
  }

  process.stdout.write(`${chap.file} (pp${chap.bodyStart}–${chap.bodyEnd})… `);

  const existing = fs.readFileSync(chapFile, 'utf8');
  const sidebarM = existing.match(/<aside class="sidebar">([\s\S]*?)<\/aside>/);
  const sidebar  = sidebarM ? sidebarM[1] : '';

  const lines   = await extractLines(pdf, chap.bodyStart, chap.bodyEnd, chap.assetBase);
  const blocks  = buildBlocks(lines);
  const content = renderBlocks(blocks);

  const bt = {};
  for (const b of blocks) bt[b.type] = (bt[b.type]||0)+1;
  process.stdout.write(`${blocks.length} blocks  p:${bt.p||0} h2:${bt.h2||0} h3:${bt.h3||0} ul:${bt.ul||0} fig:${bt.figure||0} call:${bt.callout||0}\n`);

  fs.writeFileSync(chapFile, buildHtml(chap, sidebar, content), 'utf8');
}

// Remove old ch01_new.html if present
const legacyNew = path.join(CHAP_DIR, 'ch01_new.html');
if (fs.existsSync(legacyNew)) {
  fs.unlinkSync(legacyNew);
  console.log('\nRemoved ch01_new.html');
}

console.log('\n✓ Done. All chapters rebuilt.');
