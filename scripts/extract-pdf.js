const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');

const PDF_PATH = path.join(__dirname, '..', 'Book', 'CISSP All in one Exam Guide - Version 8.pdf');
const OUT_DIR = path.join(__dirname, '..', 'public', 'book2', 'data');

// Authoritative H2 headings per domain (from book TOC)
const TOC_H2 = JSON.parse(fs.readFileSync(path.join(OUT_DIR, 'toc-h2.json'), 'utf8'));
// All TOC headings per domain (H2 + H3)
const TOC_ALL = JSON.parse(fs.readFileSync(path.join(OUT_DIR, 'toc-headings.json'), 'utf8'));

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

function detectHeadingLevel(line, prevBlank, nextBlank, prevLineText, domainNum) {
  const l = line.trim();
  if (!l || l.length > 120) return null;

  const h2List = TOC_H2[domainNum] || [];
  const allList = TOC_ALL[domainNum] || [];

  // Exact TOC match → authoritative level
  if (h2List.includes(l)) return 2;
  if (allList.includes(l)) return 3;

  // Skip appendix/index/glossary lines
  if (/^(APPENDIX|INDEX|GLOSSARY)/i.test(l)) return null;

  // Fallback for headings not in TOC (e.g. minor sub-sub-headings)
  const afterSentenceEnd = prevLineText && /[.?!]\s*$/.test(prevLineText.trim());
  const hasContext = prevBlank || nextBlank || afterSentenceEnd;
  if (!hasContext) return null;

  // ALL CAPS multi-word (not short acronyms) → H2
  if (/^[A-Z][A-Z\s\-/&:()]{5,60}$/.test(l) && l.includes(' ')) return 2;

  // Single Title-Case word (4+ chars) → H3
  if (/^[A-Z][a-z]{3,}$/.test(l)) return 3;

  // Title Case multi-word → H3
  const words = l.split(' ');
  const isTitleCase = words.length >= 2 && words.length <= 12 &&
    words.filter(w => w.length > 3).every(w => /^[A-Z]/.test(w)) &&
    !l.endsWith('.') && !l.endsWith(',') && !l.endsWith(':');
  if (isTitleCase) return 3;

  return null;
}

function parseTextToSections(rawText, domainNum) {
  const lines = rawText.split('\n');
  const sections = [];
  let currentSection = null;
  let paragraphBuffer = [];
  let bulletBuffer = [];
  let quoteBuffer = [];
  let inQuote = false;

  function flushBullets() {
    if (!bulletBuffer.length) return;
    if (currentSection) currentSection.content.push({ type: 'list', items: [...bulletBuffer] });
    bulletBuffer = [];
  }

  function flushQuote() {
    if (!quoteBuffer.length) return;
    if (currentSection) currentSection.content.push({ type: 'quote', lines: [...quoteBuffer] });
    quoteBuffer = [];
    inQuote = false;
  }

  function flushParagraph() {
    flushBullets();
    flushQuote();
    if (!paragraphBuffer.length) return;
    const text = paragraphBuffer.join(' ').replace(/\s+/g, ' ').trim();
    if (text.length > 20 && currentSection) {
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
    const rawLine = lines[i].trim();
    const line = cleanLine(rawLine);
    const prevBlank = i === 0 || lines[i - 1].trim() === '';
    const nextBlank = i === lines.length - 1 || lines[i + 1].trim() === '';

    // Blank line — only flush if previous text ends a sentence
    if (!line) {
      const lastPara = paragraphBuffer[paragraphBuffer.length - 1] || '';
      const sentenceEnded = /[.?!)"»]\s*$/.test(lastPara) || bulletBuffer.length || quoteBuffer.length;
      if (sentenceEnded) {
        flushParagraph();
      }
      // If sentence didn't end, just skip the blank — keep accumulating
      continue;
    }

    // Skip page numbers, running headers, and standalone chapter number lines
    if (/^\d+$/.test(line)) continue;
    if (/^cissp all-in-one/i.test(line)) continue;
    if (/^chapter \d+/i.test(line) && line.length < 20) continue;
    if (line === 'CHAPTER') continue;

    // Skip domain title if it matches the intro section title (already shown as heading)
    if (currentSection && currentSection.content.length === 0 && line === currentSection.title) continue;
    // Also skip if it matches any DOMAIN_MARKERS title (chapter title line)
    if (DOMAIN_MARKERS.some(m => m.titlePattern.test(line))) continue;

    // ── Bullet point line (starts with • or – used as bullet)
    if (/^[•\-–]\s+/.test(rawLine)) {
      flushParagraph(); // flush any preceding paragraph first
      const itemText = rawLine.replace(/^[•\-–]\s+/, '').trim();
      bulletBuffer.push(itemText);
      continue;
    }

    // If we were collecting bullets and hit a non-bullet, flush them
    if (bulletBuffer.length && !/^[•\-–]\s+/.test(rawLine)) {
      flushBullets();
    }

    // ── Quote attribution line (starts with em-dash —)
    if (/^—/.test(rawLine)) {
      // The lines before this (in paragraphBuffer) are the quote text
      if (paragraphBuffer.length) {
        quoteBuffer = [...paragraphBuffer];
        paragraphBuffer = [];
      }
      quoteBuffer.push(rawLine); // include attribution
      flushQuote();
      continue;
    }

    // ── Figure caption (no prevBlank required — captions often follow inline references)
    const figMatch = rawLine.match(FIGURE_CAPTION_RE);
    if (figMatch) {
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

    // ── Table caption
    const tableMatch = rawLine.match(TABLE_CAPTION_RE);
    if (tableMatch) {
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

    // ── Exam tip
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

    // ── NOTE / CAUTION — collect until sentence ends or blank line
    if (/^(note|caution|warning|important)[\s:]/i.test(line)) {
      flushParagraph();
      let noteText = line;
      while (i + 1 < lines.length) {
        const nextRaw = lines[i + 1].trim();
        if (!nextRaw) break; // blank line ends note
        if (/[.?!)"»]\s*$/.test(noteText)) break; // sentence complete
        i++;
        noteText += ' ' + cleanLine(lines[i]);
      }
      if (currentSection) currentSection.content.push({ type: 'note', text: noteText });
      continue;
    }

    // ── "This chapter presents the following:" intro line
    if (/^this chapter presents/i.test(line)) {
      flushParagraph();
      if (currentSection) currentSection.content.push({ type: 'chapter_intro', text: line });
      continue;
    }

    // ── Section heading — always flush, even mid-paragraph
    const prevLineText = i > 0 ? lines[i - 1] : '';
    const headingLevel = detectHeadingLevel(line, prevBlank, nextBlank, prevLineText, domainNum);
    if (headingLevel) {
      flushSection();
      currentSection = { id: slugify(line), title: line, level: headingLevel, content: [] };
      continue;
    }

    // ── Flush paragraph when previous line ends a sentence AND current line
    // starts a new sentence (capital letter after period, no blank line needed)
    if (paragraphBuffer.length > 0) {
      const lastLine = paragraphBuffer[paragraphBuffer.length - 1];
      const prevEndsSentence = /[.?!]\s*$/.test(lastLine);
      const currStartsNewSentence = /^[A-Z]/.test(line);
      // Only split if the last line is a complete short line (likely end of paragraph)
      // OR if there was a blank line between them
      if (prevEndsSentence && currStartsNewSentence && (prevBlank || lastLine.length < 80)) {
        flushParagraph();
      }
    }

    paragraphBuffer.push(line);
  }

  flushSection();

  // Post-process: merge consecutive list blocks into one
  for (const section of sections) {
    const merged = [];
    for (const block of section.content) {
      const prev = merged[merged.length - 1];
      if (block.type === 'list' && prev && prev.type === 'list') {
        prev.items.push(...block.items);
      } else {
        merged.push(block);
      }
    }
    section.content = merged;
  }

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

  // Extract all 8 domains
  const searchIndex = [];
  for (let di = 0; di < domainStarts.length; di++) {
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
