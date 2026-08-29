// One-time build script: converts CISSP-Study-Resources markdown files into
// the same per-domain JSON shape used by the CBK reader, so we can reuse its
// static reader app (public/cbk/assets/app.js) for a second content set.
const fs = require('fs');
const path = require('path');

const SRC_DIR = 'C:/Users/Densil/Desktop/CISSP-Study-Resources';
const OUT_DIR = path.join(__dirname, '..', 'public', 'study-resources', 'data');
fs.mkdirSync(OUT_DIR, { recursive: true });

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/\[.*?\]\(.*?\)/g, '') // strip markdown links first pass (headings have their own anchor link, handled by caller)
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function stripInlineMd(text) {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // [text](url) -> text
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .trim();
}

const files = fs.readdirSync(SRC_DIR)
  .filter(f => /^CISSP-Domain-\d+-2024\+Objectives\.md$/.test(f))
  .sort((a, b) => parseInt(a.match(/Domain-(\d+)/)[1]) - parseInt(b.match(/Domain-(\d+)/)[1]));

const searchIndex = [];

for (const file of files) {
  const domainNum = parseInt(file.match(/Domain-(\d+)/)[1], 10);
  const raw = fs.readFileSync(path.join(SRC_DIR, file), 'utf-8');
  const lines = raw.replace(/\r\n/g, '\n').split('\n');

  const h1Match = lines[0].match(/^# \[Domain-\d+\]\(#[\w-]+\) \*\*(.+?)\*\*/);
  const domainTitle = h1Match ? h1Match[1] : `Domain ${domainNum}`;

  const sections = [];
  let current = null;
  let listBuf = null;

  function flushList() {
    if (listBuf && listBuf.items.length) {
      current.content.push({ type: 'list', ordered: false, items: listBuf.items });
    }
    listBuf = null;
  }

  // Skip the "Contents" TOC block we generated earlier — regenerate nav from sections instead.
  let inGeneratedToc = false;

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];

    if (/^## Contents\s*$/.test(line)) { inGeneratedToc = true; continue; }
    if (inGeneratedToc) {
      if (/^##? /.test(line) && !/^## Contents/.test(line)) { inGeneratedToc = false; } // fallthrough to normal handling
      else if (line.trim() === '' || line.trim().startsWith('- [')) continue;
      else { inGeneratedToc = false; }
    }

    const h2 = line.match(/^## \[([\d.]+)\]\(#[\w-]+\) (.+)/);
    if (h2) {
      if (current) { flushList(); sections.push(current); }
      const [, num, rest] = h2;
      const title = `${num} ${stripInlineMd(rest)}`;
      current = { id: `d${domainNum}-${slugify(title)}`, title, level: 2, content: [] };
      continue;
    }

    if (!current) {
      // preamble bullets before the first ## heading -> synthetic intro section
      current = { id: `d${domainNum}-introduction`, title: 'Introduction', level: 2, content: [] };
    }

    const bullet = line.match(/^(\s*)-\s+(.*)$/);
    if (bullet) {
      const text = stripInlineMd(bullet[2]);
      if (!text) continue;
      if (!listBuf) listBuf = { items: [] };
      listBuf.items.push(text);
      continue;
    }

    flushList();
    const trimmed = line.trim();
    if (trimmed === '') continue;
    current.content.push({ type: 'paragraph', text: stripInlineMd(trimmed) });
  }
  if (current) { flushList(); sections.push(current); }

  const domainJson = { domain: domainNum, title: domainTitle, sections };
  fs.writeFileSync(
    path.join(OUT_DIR, `domain${domainNum}.json`),
    JSON.stringify(domainJson, null, 2)
  );
  console.log(`domain${domainNum}.json: ${sections.length} sections`);

  for (const s of sections) {
    const fullText = s.content
      .map(b => b.type === 'list' ? b.items.join(' ') : (b.text || ''))
      .join(' ');
    searchIndex.push({ domain: domainNum, id: s.id, title: s.title, domainTitle, fullText });
  }
}

fs.writeFileSync(path.join(OUT_DIR, 'search-index.json'), JSON.stringify(searchIndex, null, 2));
console.log('Wrote search-index.json');
