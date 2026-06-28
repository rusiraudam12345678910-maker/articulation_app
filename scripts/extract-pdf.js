const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');

const PDF_PATH = path.join(__dirname, '..', 'Book', 'CISSP All in one Exam Guide - Version 8.pdf');
const OUT_DIR = path.join(__dirname, '..', 'public', 'book2', 'data');

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// Chapter boundary — PDF uses "CHAPTER" then next line is the title
// We detect the CHAPTER header line followed by the domain title
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

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function cleanLine(line) {
  return line.replace(/\s+/g, ' ').trim();
}

function detectHeadingLevel(line, prevBlank, nextBlank) {
  const l = line.trim();
  if (!l) return null;
  if (l.length > 100) return null;
  // Must be surrounded by blank lines to be a heading
  if (!prevBlank && !nextBlank) return null;

  // ALL CAPS line = H2 section heading
  if (/^[A-Z][A-Z\s\-/&:()]{3,60}$/.test(l)) return 2;

  // Title Case line: each significant word starts with capital, no period at end
  // Short enough to be a heading, not a sentence
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
    if (paragraphBuffer.length === 0) return;
    const text = paragraphBuffer.join(' ').replace(/\s+/g, ' ').trim();
    if (text.length > 30 && currentSection) {
      currentSection.content.push({ type: 'paragraph', text });
    }
    paragraphBuffer = [];
  }

  function flushSection() {
    flushParagraph();
    if (currentSection && currentSection.content.length > 0) {
      sections.push(currentSection);
    }
  }

  // Start with a default section for intro content
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

    if (!line) {
      flushParagraph();
      continue;
    }

    // Skip page numbers, headers/footers (short lines that are just numbers or "CISSP...")
    if (/^\d+$/.test(line)) continue;
    if (/^cissp all-in-one/i.test(line)) continue;
    if (/^chapter \d+/i.test(line)) continue;

    const headingLevel = detectHeadingLevel(line, prevBlank, nextBlank);
    if (headingLevel) {
      flushSection();
      currentSection = {
        id: slugify(line),
        title: line,
        level: headingLevel,
        content: []
      };
      continue;
    }

    // Exam tip detection
    if (/^exam\s*tip/i.test(line)) {
      flushParagraph();
      let tipText = line;
      // grab next lines until blank
      while (i + 1 < lines.length && lines[i + 1].trim() !== '') {
        i++;
        tipText += ' ' + cleanLine(lines[i]);
      }
      if (currentSection) {
        currentSection.content.push({ type: 'exam_tip', text: tipText.replace(/^exam\s*tip[\s:.]*/i, '').trim() });
      }
      continue;
    }

    // NOTE / CAUTION boxes
    if (/^(note|caution|warning|important)[\s:]/i.test(line)) {
      flushParagraph();
      if (currentSection) {
        currentSection.content.push({ type: 'note', text: line });
      }
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

  console.log(`Total pages: ${data.numpages}`);
  console.log(`Total characters: ${data.text.length}`);

  // Save raw text for inspection
  fs.writeFileSync(path.join(OUT_DIR, 'raw.txt'), data.text, 'utf8');
  console.log('Raw text saved to data/raw.txt');

  // Find domain boundaries in the text
  const fullText = data.text;
  const lines = fullText.split('\n');

  // Pattern in PDF: "CHAPTER     " (line), then "1" (line), then "Security and Risk Management" (line)
  const domainStarts = [];
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i].trim();
    if (l === 'CHAPTER') {
      // Next few lines: number then title
      const lookahead = [];
      for (let j = i + 1; j < Math.min(i + 6, lines.length); j++) {
        const t = lines[j].trim();
        if (t) lookahead.push(t);
        if (lookahead.length >= 3) break;
      }
      // lookahead[0] should be the chapter number, lookahead[1] should be the title
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

  // Extract Domain 1 and 2 text
  for (let di = 0; di < Math.min(2, domainStarts.length); di++) {
    const start = domainStarts[di];
    const end = domainStarts[di + 1];
    const domainLines = end
      ? lines.slice(start.lineIndex, end.lineIndex)
      : lines.slice(start.lineIndex);

    const domainText = domainLines.join('\n');
    const sections = parseTextToSections(domainText, start.domain);

    const output = {
      domain: start.domain,
      title: start.title,
      totalSections: sections.length,
      sections
    };

    const outFile = path.join(OUT_DIR, `domain${start.domain}.json`);
    fs.writeFileSync(outFile, JSON.stringify(output, null, 2), 'utf8');
    console.log(`\nDomain ${start.domain}: ${sections.length} sections → ${outFile}`);
  }

  // Build combined search index
  console.log('\nBuilding search index...');
  const searchIndex = [];
  for (let di = 0; di < Math.min(2, domainStarts.length); di++) {
    const domainNum = domainStarts[di].domain;
    const domainFile = path.join(OUT_DIR, `domain${domainNum}.json`);
    if (!fs.existsSync(domainFile)) continue;
    const domainData = JSON.parse(fs.readFileSync(domainFile, 'utf8'));
    for (const section of domainData.sections) {
      const fullText = section.content.map(c => c.text).join(' ');
      searchIndex.push({
        id: section.id,
        domain: domainNum,
        title: section.title,
        text: fullText.substring(0, 500), // excerpt for search display
        fullText: fullText
      });
    }
  }
  fs.writeFileSync(path.join(OUT_DIR, 'search-index.json'), JSON.stringify(searchIndex, null, 2), 'utf8');
  console.log(`Search index: ${searchIndex.length} entries`);
  console.log('\nExtraction complete!');
}

main().catch(console.error);
