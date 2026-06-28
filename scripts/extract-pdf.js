const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');

const PDF_PATH = path.join(__dirname, '..', 'Book', 'CISSP All in one Exam Guide - Version 8.pdf');
const OUT_DIR = path.join(__dirname, '..', 'public', 'book2', 'data');

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const DOMAIN_MARKERS = [
  { domain: 1, titlePattern: /^Security and Risk Management$/, title: 'Security and Risk Management' },
  { domain: 2, titlePattern: /^Asset Security$/, title: 'Asset Security' },
  { domain: 3, titlePattern: /^Security Architecture and Engineering$/, title: 'Security Architecture and Engineering' },
  { domain: 4, titlePattern: /^Communication and Network Security$/, title: 'Communication and Network Security' },
  { domain: 5, titlePattern: /^Identity and Access Management$/, title: 'Identity and Access Management' },
  { domain: 6, titlePattern: /^Security Assessment and Testing$/, title: 'Security Assessment and Testing' },
  { domain: 7, titlePattern: /^Security Operations$/, title: 'Security Operations' },
  { domain: 8, titlePattern: /^Software Development Security$/, title: 'Software Development Security' },
];

// Figure caption pattern: "Figure 1-1  Some caption text"
const FIGURE_CAPTION_RE = /^Figure\s+(\d+)-(\d+)\s{2,}(.+)$/;
// Inline figure reference: "shown in Figure 1-1"
const FIGURE_REF_RE = /Figure\s+(\d+)-(\d+)/g;

// Table caption pattern: "Table 1-1  Some caption text"
const TABLE_CAPTION_RE = /^Table\s+(\d+)-(\d+)\s{2,}(.+)$/;

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function cleanLine(line) {
  return line.replace(/\s+/g, ' ').trim();
}

function detectHeadingLevel(line, prevBlank, nextBlank) {
  const l = line.trim();
  if (!l || l.length > 100) return null;
  if (!prevBlank && !nextBlank) return null;

  // ALL CAPS line = H2
  if (/^[A-Z][A-Z\s\-/&:()]{3,60}$/.test(l)) return 2;

  // Title Case = H3
  const words = l.split(' ');
  const isTitleCase = words.length >= 2 && words.length <= 12 &&
    words.filter(w => w.length > 3).every(w => /^[A-Z]/.test(w)) &&
    !l.endsWith('.') && !l.endsWith(',');
  if (isTitleCase && (prevBlank || nextBlank)) return 3;

  return null;
}

function parseTextToSections(rawText, domainNum) {
  const lines = rawText.split('\n');
  const sections = [];
  let currentSection = null;
  let paragraphBuffer = [];

  function flushParagraph() {
    if (!paragraphBuffer.length) return;
    const text = paragraphBuffer.join(' ').replace(/\s+/g, ' ').trim();
    if (text.length > 30 && currentSection) {
      currentSection.content.push({ type: 'paragraph', text });
    }
    paragraphBuffer = [];
  }

  function flushSection() {
    flushParagraph();
    if (currentSection && currentSection.content.length > 0) sections.push(currentSection);
  }

  currentSection = {
    id: `domain-${domainNum}-intro`,
    title: `Domain ${domainNum} Introduction`,
    level: 2,
    content: []
  };

  for (let i = 0; i < lines.length; i++) {
    const line = cleanLine(lines[i]);
    const prevBlank = i === 0 || lines[i - 1].trim() === '';
    const nextBlank = i === lines.length - 1 || lines[i + 1].trim() === '';

    if (!line) { flushParagraph(); continue; }

    // Skip page numbers and running headers
    if (/^\d+$/.test(line)) continue;
    if (/^cissp all-in-one/i.test(line)) continue;
    if (/^chapter \d+/i.test(line) && line.length < 20) continue;

    // Figure caption (standalone line: "Figure 1-1  Caption text") — check raw line before space collapse
    const rawLine = lines[i].trim();
    const figMatch = rawLine.match(FIGURE_CAPTION_RE);
    if (figMatch && prevBlank) {
      flushParagraph();
      if (currentSection) {
        currentSection.content.push({
          type: 'figure',
          figNum: `${figMatch[1]}-${figMatch[2]}`,
          caption: figMatch[3].trim(),
          domain: parseInt(figMatch[1]),
          num: parseInt(figMatch[2]),
        });
      }
      continue;
    }

    // Table caption
    const tableMatch = rawLine.match(TABLE_CAPTION_RE);
    if (tableMatch && prevBlank) {
      flushParagraph();
      if (currentSection) {
        currentSection.content.push({
          type: 'table_caption',
          tableNum: `${tableMatch[1]}-${tableMatch[2]}`,
          caption: tableMatch[3].trim(),
        });
      }
      continue;
    }

    // Exam tip
    if (/^exam\s*tip/i.test(line)) {
      flushParagraph();
      let tipText = line;
      while (i + 1 < lines.length && lines[i + 1].trim() !== '') {
        i++;
        tipText += ' ' + cleanLine(lines[i]);
      }
      if (currentSection) {
        currentSection.content.push({ type: 'exam_tip', text: tipText.replace(/^exam\s*tip[\s:.]*/i, '').trim() });
      }
      continue;
    }

    // NOTE / CAUTION
    if (/^(note|caution|warning|important)[\s:]/i.test(line)) {
      flushParagraph();
      if (currentSection) currentSection.content.push({ type: 'note', text: line });
      continue;
    }

    // Section heading
    const headingLevel = detectHeadingLevel(line, prevBlank, nextBlank);
    if (headingLevel) {
      flushSection();
      currentSection = { id: slugify(line), title: line, level: headingLevel, content: [] };
      continue;
    }

    paragraphBuffer.push(line);
  }

  flushSection();
  return sections;
}

async function main() {
  console.log('Reading PDF...');
  const dataBuffer = fs.readFileSync(PDF_PATH);

  console.log('Parsing PDF (this may take 1-2 minutes)...');
  const data = await pdfParse(dataBuffer);

  console.log(`Total pages: ${data.numpages}, characters: ${data.text.length}`);

  fs.writeFileSync(path.join(OUT_DIR, 'raw.txt'), data.text, 'utf8');
  console.log('Raw text saved.');

  const lines = data.text.split('\n');

  // Find domain chapter starts
  const domainStarts = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === 'CHAPTER') {
      const lookahead = [];
      for (let j = i + 1; j < Math.min(i + 6, lines.length); j++) {
        const t = lines[j].trim();
        if (t) lookahead.push(t);
        if (lookahead.length >= 3) break;
      }
      const titleCandidate = lookahead[1] || lookahead[0];
      for (const marker of DOMAIN_MARKERS) {
        if (marker.titlePattern.test(titleCandidate)) {
          if (!domainStarts.find(d => d.domain === marker.domain)) {
            domainStarts.push({ domain: marker.domain, title: marker.title, lineIndex: i, line: titleCandidate });
          }
        }
      }
    }
  }

  console.log('\nDetected domain markers:');
  domainStarts.forEach(d => console.log(`  Domain ${d.domain} at line ${d.lineIndex}: "${d.line}"`));

  // Build figure index from ALL domain text (so we know which figures exist)
  const allFigures = {};
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].trim().match(FIGURE_CAPTION_RE);
    if (m) {
      const key = `${m[1]}-${m[2]}`;
      if (!allFigures[key]) allFigures[key] = { figNum: key, caption: m[3].trim(), domain: parseInt(m[1]), num: parseInt(m[2]) };
    }
  }
  console.log(`\nTotal figures found in PDF: ${Object.keys(allFigures).length}`);

  // Extract domains 1 and 2
  const searchIndex = [];
  for (let di = 0; di < Math.min(2, domainStarts.length); di++) {
    const start = domainStarts[di];
    const end = domainStarts[di + 1];
    const domainLines = end ? lines.slice(start.lineIndex, end.lineIndex) : lines.slice(start.lineIndex);
    const domainText = domainLines.join('\n');
    const sections = parseTextToSections(domainText, start.domain);

    // Count figures in this domain
    let figCount = 0;
    sections.forEach(s => s.content.forEach(c => { if (c.type === 'figure') figCount++; }));

    const output = { domain: start.domain, title: start.title, totalSections: sections.length, sections };
    const outFile = path.join(OUT_DIR, `domain${start.domain}.json`);
    fs.writeFileSync(outFile, JSON.stringify(output, null, 2), 'utf8');
    console.log(`Domain ${start.domain}: ${sections.length} sections, ${figCount} figures → ${outFile}`);

    // Build search index
    for (const section of sections) {
      const fullText = section.content.filter(c => c.text).map(c => c.text).join(' ');
      searchIndex.push({
        id: section.id, domain: start.domain, title: section.title,
        text: fullText.substring(0, 400),
        fullText,
      });
    }
  }

  // Save figure index (all figures across book, for lookup)
  fs.writeFileSync(path.join(OUT_DIR, 'figures.json'), JSON.stringify(allFigures, null, 2), 'utf8');
  console.log(`Figure index saved: ${Object.keys(allFigures).length} figures`);

  fs.writeFileSync(path.join(OUT_DIR, 'search-index.json'), JSON.stringify(searchIndex, null, 2), 'utf8');
  console.log(`Search index: ${searchIndex.length} entries`);
  console.log('\nDone!');
}

main().catch(console.error);
