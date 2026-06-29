#!/usr/bin/env node
/**
 * CBK PDF Parser — TOC-driven, domain-opener boundary detection
 */
const fs   = require('fs');
const path = require('path');

const RAW_FILE = path.join(__dirname, '../Book/cbk-raw.txt');
const OUT_DIR  = path.join(__dirname, '../public/cbk/data');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const DOMAIN_TITLES = [
  'Security and Risk Management',
  'Asset Security',
  'Security Architecture and Engineering',
  'Communication and Network Security',
  'Identity and Access Management',
  'Security Assessment and Testing',
  'Security Operations',
  'Software Development Security',
];

// ── TOC extraction ────────────────────────────────────────────────────────────
function extractTOC(text) {
  const toc1  = text.indexOf('Domain 1: Security anD riSk management 1\n');
  const tocEnd = text.indexOf('\nIndex', toc1 + 1000);
  const tocArea = text.substring(toc1, tocEnd > 0 ? tocEnd : toc1 + 25000);

  const domainTocTitles = {};
  let currentDomain = 0;
  const lines = tocArea.split('\n');
  let buffer = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim().replace(/\s+/g, ' ');
    const domM = line.match(/^Domain (\d+):/i);
    if (domM) { currentDomain = parseInt(domM[1]); domainTocTitles[currentDomain] = domainTocTitles[currentDomain] || []; buffer = ''; continue; }
    if (!currentDomain) continue;
    if (/^Contents(xv|xvi|xvii|xviii|xix|xx|xxi|xxii|xxiii|xxiv)/i.test(line)) { buffer = ''; continue; }
    if (!line) { buffer = ''; continue; }

    buffer = buffer ? buffer + ' ' + line : line;
    // Ends with page number?
    if (/\s\d+\s*$/.test(buffer) || /\s{2,}\d+\s*$/.test(buffer)) {
      const title = buffer.replace(/\s+\d+\s*$/, '').replace(/\s{2,}/g, ' ').trim();
      if (title && title.length > 2) domainTocTitles[currentDomain].push(title);
      buffer = '';
    }
  }
  return domainTocTitles;
}

// ── Domain body boundaries (via chapter opener pattern) ───────────────────────
function findDomainBodies(text) {
  const re = /\n\s+do[mM][aA][iI][nN]\s+(\d+)\s*\n/gi;
  const found = {};
  let m;
  while ((m = re.exec(text)) !== null) {
    const d = parseInt(m[1]);
    if (!found[d]) found[d] = m.index;
  }
  const boundaries = [];
  for (let d = 1; d <= 8; d++) {
    if (found[d] !== undefined) boundaries.push({ domain: d, idx: found[d] });
  }
  boundaries.push({ domain: 9, idx: text.length });
  return boundaries;
}

// ── Line cleaning & noise detection ──────────────────────────────────────────
function cleanLine(l) { return l.replace(/\s+/g, ' ').trim(); }

function isNoise(line) {
  if (!line) return true;
  // Page footers: "Domain N Title\d+" or "SectionTitle\d+"
  if (/^Domain \d+ .+\d+$/.test(line)) return true;
  if (/^(Asset|Security|Communication|Identity|Software|Implement|Understand|Determine|Evaluate|Develop|Contribute|Apply|Establish|Select|Manage|Assess|Conduct|Operate|Ensure|Protect|Analyze|Design|Support|Employ|Collect|Perform|Participate|Plan|Build|Integrate|Define|Use|Adhere|Promote).{5,80}\d+$/.test(line)) return true;
  // Vertical header fragments (1-4 chars, letters only)
  if (line.length <= 4 && /^[A-Za-z\s]+$/.test(line)) return true;
  // Standalone page numbers
  if (/^\d+$/.test(line)) return true;
  // ISC2 copyright encoded line
  if (/^\$\*44/.test(line) || /\(ISC\).*Copyright/i.test(line)) return true;
  // Contents pages
  if (/^Contents(xv|xvi|xvii|xviii|xix|xx)/i.test(line)) return true;
  // Common vertical header words seen in CBK
  if (/^(aSSEt|SECurIty|ConCEPtS|SEcurity|anD|riSk|mANA|ge|ME|nt|AS|ss|et|ur|it|ty|Co|mm|un|ic|at|io|En|gi|De|ve|lo|pm|Op|So|ft|wa|Sw|ne|er|ar|ch|ng)$/.test(line)) return true;
  return false;
}

function isBullet(line) { return /^[■•]\s/.test(line); }

// ── Section-level classification ──────────────────────────────────────────────
const H2_VERBS = /^(Understand|Evaluate|Determine|Develop|Identify|Contribute|Apply|Establish|Select|Implement|Manage|Assess|Conduct|Operate|Ensure|Protect|Analyze|Design|Support|Employ|Collect|Perform|Participate|Plan|Build|Integrate|Define|Adhere|Promote|Use and Apply|Control)/i;
function isH2Title(t) { return H2_VERBS.test(t) || /^Summary$/i.test(t); }

// ── Parse one domain ──────────────────────────────────────────────────────────
function parseDomain(domainNum, rawChunk, tocTitles) {
  function slugify(t) {
    return `domain-${domainNum}-` + t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').substring(0, 60);
  }
  function makeSection(title, level) { return { id: slugify(title), title, level, content: [] }; }

  function normalize(t) { return t.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ').trim(); }
  const normTitles = new Map(tocTitles.map(t => [normalize(t), t]));

  // Pre-process: join wrapped lines into logical lines
  // Lines ending with trailing space (or hyphen) are continuations
  const rawLines = rawChunk.split('\n');
  const logicalLines = [];
  let acc = '';

  for (let i = 0; i < rawLines.length; i++) {
    const raw = rawLines[i];
    const cl  = cleanLine(raw);
    if (!cl) {
      if (acc) { logicalLines.push(acc); acc = ''; }
      logicalLines.push('');
      continue;
    }
    if (isNoise(cl)) {
      if (acc) { logicalLines.push(acc); acc = ''; }
      continue;
    }
    // Solo bullet marker "■" — next line is the item text
    if (cl === '■' || cl === '•') {
      if (acc) { logicalLines.push(acc); acc = ''; }
      acc = '■ ';
      continue;
    }
    // Line ends with hyphen (soft-wrap) — join without space
    if (raw.trimEnd().endsWith('-') && !raw.trimEnd().endsWith('—')) {
      acc += cl.replace(/-$/, '');
      continue;
    }
    // Line ends with trailing space in original (paragraph continuation)
    if (raw.endsWith(' ') || raw.endsWith('\t')) {
      acc += (acc ? ' ' : '') + cl;
      continue;
    }
    // Otherwise: end of logical line
    acc += (acc ? ' ' : '') + cl;
    logicalLines.push(acc);
    acc = '';
  }
  if (acc) logicalLines.push(acc);

  const sections = [];
  let currentSection = makeSection(`Domain ${domainNum} Introduction`, 2);
  sections.push(currentSection);

  let listItems = [];
  let inList    = false;

  function flushList() {
    if (!listItems.length) return;
    currentSection.content.push({ type: 'list', items: listItems.slice(), ordered: false });
    listItems = []; inList = false;
  }
  function startSection(title, level) {
    flushList();
    currentSection = makeSection(title, level);
    sections.push(currentSection);
  }

  for (let i = 0; i < logicalLines.length; i++) {
    const line = logicalLines[i];
    if (!line) continue;

    // TOC heading match
    const normLine = normalize(line);
    let matchedTitle = normTitles.get(normLine);
    if (!matchedTitle && i + 1 < logicalLines.length) {
      const joined = normalize(line + ' ' + logicalLines[i + 1]);
      const m2 = normTitles.get(joined);
      if (m2) { matchedTitle = m2; i++; }
    }
    if (matchedTitle) {
      startSection(matchedTitle, isH2Title(matchedTitle) ? 2 : 3);
      inList = false;
      continue;
    }

    // Figure
    if (/^Figure \d+[.\d-]*/i.test(line)) {
      flushList();
      const m = line.match(/^Figure ([\d.\-]+)\s*(.*)/i);
      if (m) currentSection.content.push({ type: 'figure', figNum: m[1], caption: m[2] || '' });
      continue;
    }

    // Table
    if (/^Table \d+[.\d-]*/i.test(line)) {
      flushList();
      const m = line.match(/^Table ([\d.\-]+)\s*(.*)/i);
      if (m) currentSection.content.push({ type: 'table_caption', tableNum: m[1], caption: m[2] || '' });
      continue;
    }

    // Note / Tip / Exam Tip
    if (/^(note|tip|warning|caution|exam tip)[:\s]/i.test(line)) {
      flushList();
      const m = line.match(/^(note|tip|warning|caution|exam tip)[:\s]+(.*)/i);
      const tag = /exam tip/i.test(line) ? 'exam_tip' : 'note';
      let noteText = (m ? m[2] : line).trim();
      // Absorb continuation lines
      while (i + 1 < logicalLines.length) {
        const next = logicalLines[i + 1];
        if (!next || /^(note|tip|■|Figure|Table)/i.test(next) || normTitles.has(normalize(next))) break;
        noteText += ' ' + next; i++;
      }
      currentSection.content.push({ type: tag, text: noteText.replace(/\s+/g, ' ').trim() });
      continue;
    }

    // Bullet
    if (isBullet(line)) {
      inList = true;
      listItems.push(line.replace(/^[■•]\s*/, '').trim());
      continue;
    }
    if (inList) flushList();

    // Regular paragraph
    const text = line.replace(/\s+/g, ' ').trim();
    if (text.length > 20) currentSection.content.push({ type: 'paragraph', text });
  }
  flushList();

  return sections.filter(s => s.content.length > 0);
}

// ── Main ──────────────────────────────────────────────────────────────────────
const rawText = fs.readFileSync(RAW_FILE, 'utf8');

console.log('Extracting TOC headings...');
const tocTitles = extractTOC(rawText);
for (let d = 1; d <= 8; d++) {
  console.log(`  Domain ${d}: ${(tocTitles[d] || []).length} TOC headings`);
}

console.log('\nFinding domain body boundaries...');
const bodies = findDomainBodies(rawText);
bodies.forEach(b => console.log(`  Domain ${b.domain}: idx ${b.idx}`));

const allDomains = [];

for (let i = 0; i < 8; i++) {
  const domainNum = i + 1;
  const start = bodies[i].idx;
  const end   = bodies[i + 1] ? bodies[i + 1].idx : rawText.length;
  const chunk = rawText.substring(start, end);
  const domainToc = tocTitles[domainNum] || [];

  console.log(`\nParsing Domain ${domainNum}: ${DOMAIN_TITLES[i]}`);
  console.log(`  Chunk: ${Math.round(chunk.length / 1000)}k chars | TOC entries: ${domainToc.length}`);

  const sections = parseDomain(domainNum, chunk, domainToc);
  const domainData = { domain: domainNum, title: DOMAIN_TITLES[i], sections };
  allDomains.push({ domain: domainNum, title: DOMAIN_TITLES[i], sections });

  fs.writeFileSync(path.join(OUT_DIR, `domain${domainNum}.json`), JSON.stringify(domainData, null, 2));
  console.log(`  → ${sections.length} sections`);

  // Coverage check: how many TOC titles were found as sections?
  const sectionTitles = new Set(sections.map(s => s.title.toLowerCase()));
  const found  = domainToc.filter(t => sectionTitles.has(t.toLowerCase())).length;
  console.log(`  Coverage: ${found}/${domainToc.length} TOC headings matched`);
}

// Search index
const searchIndex = [];
for (const { domain, sections } of allDomains) {
  for (const s of sections) {
    const fullText = s.content.map(b => {
      if (['paragraph','note','exam_tip'].includes(b.type)) return b.text;
      if (b.type === 'list') return b.items.join(' ');
      return '';
    }).filter(Boolean).join(' ');
    searchIndex.push({ domain, id: s.id, title: s.title, fullText: fullText.substring(0, 500) });
  }
}

fs.writeFileSync(path.join(OUT_DIR, 'search-index.json'), JSON.stringify(searchIndex, null, 2));
fs.writeFileSync(path.join(OUT_DIR, 'figure-map.json'), JSON.stringify({}, null, 2));

console.log(`\nSearch index: ${searchIndex.length} entries`);
console.log('Done! Data written to', OUT_DIR);
