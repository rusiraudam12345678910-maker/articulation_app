/**
 * Parses the CONTENTS section from raw.txt to extract H2/H3 heading hierarchy.
 * Since pdf-parse loses indentation, we use a heuristic:
 *   - Headings that have sub-items immediately following them (i.e., the next
 *     heading is a "child" topic) are H2.
 *   - We determine this by cross-referencing with the known book structure.
 *
 * Output: toc-headings.json — { domain: { h2: [...], h3: [...] } }
 */

const fs = require('fs');
const path = require('path');

const raw = fs.readFileSync(path.join(__dirname, '../public/book2/data/raw.txt'), 'utf8');
const lines = raw.split('\n');

// Find CONTENTS section
const tocStart = lines.findIndex(l => l.trim() === 'CONTENTS');
const tocEnd = lines.findIndex((l, i) => i > tocStart + 200 && /^(Index|Glossary)$/.test(l.trim()));

console.log(`TOC: lines ${tocStart} to ${tocEnd}`);

const tocLines = lines.slice(tocStart, tocEnd).map(l => l.trim()).filter(Boolean);

// Chapter boundary indices
const chapIdxs = tocLines.map((l, i) => (/^Chapter \d/.test(l) ? i : -1)).filter(i => i >= 0);
chapIdxs.push(tocLines.length);

// For each chapter, extract the flat list of headings
const domainTOC = {};
for (let ci = 0; ci < chapIdxs.length - 1; ci++) {
  const chapLine = tocLines[chapIdxs[ci]]; // e.g. "Chapter 1     Security and Risk Management"
  const domainNum = parseInt(chapLine.match(/Chapter (\d+)/)[1]);
  if (domainNum > 8) continue;

  const chapLines = tocLines
    .slice(chapIdxs[ci] + 1, chapIdxs[ci + 1])
    .filter(l => !/^(Summary|Quick Tips|Questions|Answers|Appendix)/.test(l));

  domainTOC[domainNum] = chapLines;
}

// Save flat TOC per domain for use in extract-pdf.js
const out = path.join(__dirname, '../public/book2/data/toc-headings.json');
fs.writeFileSync(out, JSON.stringify(domainTOC, null, 2));
console.log('Saved toc-headings.json');
Object.entries(domainTOC).forEach(([d, headings]) => {
  console.log(`  Domain ${d}: ${headings.length} headings`);
});
