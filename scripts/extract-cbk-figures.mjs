/**
 * Extract CBK figures using mupdf + sharp
 * - Scans each page's plain text for "Figure X.Y" captions
 * - Renders the page at 150dpi
 * - Crops: from top of page (or previous text block) down to just below the caption
 * - Saves to public/cbk/figures/figX-Y.png
 * - Updates public/cbk/data/figure-map.json
 */

import mupdf from 'mupdf';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PDF_PATH = path.join(__dirname, '../Book/Sybex-The-Official-ISC2®-CISSP®-CBK®-Reference-5nd-Edition.pdf');
const OUT_DIR  = path.join(__dirname, '../public/cbk/figures');
const DATA_DIR = path.join(__dirname, '../public/cbk/data');

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// ── Collect figure numbers needed ─────────────────────────────────────────────
const figureNums = new Set();
for (let d = 1; d <= 8; d++) {
  const data = JSON.parse(fs.readFileSync(path.join(DATA_DIR, `domain${d}.json`), 'utf8'));
  for (const section of data.sections)
    for (const block of section.content)
      if (block.type === 'figure' && block.figNum) figureNums.add(block.figNum);
}
const figures = [...figureNums].sort((a, b) => {
  const [ad, an] = a.split('.').map(Number);
  const [bd, bn] = b.split('.').map(Number);
  return ad !== bd ? ad - bd : an - bn;
});
console.log(`Figures needed (${figures.length}):`, figures.join(', '));

// ── Open PDF ──────────────────────────────────────────────────────────────────
const pdfBytes = fs.readFileSync(PDF_PATH);
const doc = mupdf.Document.openDocument(pdfBytes, 'application/pdf');
const totalPages = doc.countPages();
console.log(`PDF: ${totalPages} pages\n`);

// ── Scan pages for figure captions ───────────────────────────────────────────
// For each page, parse structured text and look for blocks containing "Figure X.Y"
// Record: figNum → { pageIdx, captionBbox }
const figLocations = {}; // figNum → { pageIdx, captionBbox:{x,y,w,h} }

console.log('Scanning pages...');
for (let p = 0; p < totalPages; p++) {
  const page = doc.loadPage(p);
  const json = JSON.parse(page.toStructuredText('preserve-whitespace').asJSON());

  for (const block of json.blocks) {
    // Collect all text in block
    const blockText = (block.lines || [])
      .map(l => l.text || (l.spans || []).map(s => s.text).join(''))
      .join(' ');

    const re = /Figure\s+(\d+\.\d+)/gi;
    let m;
    while ((m = re.exec(blockText)) !== null) {
      const figNum = m[1];
      if (figureNums.has(figNum) && !figLocations[figNum]) {
        figLocations[figNum] = { pageIdx: p, captionBbox: block.bbox };
      }
    }
  }

  if (p % 100 === 0) process.stdout.write(`  ${p}/${totalPages}\r`);
}
console.log(`\nLocated ${Object.keys(figLocations).length}/${figures.length} figures`);
Object.entries(figLocations).forEach(([f, loc]) =>
  console.log(`  Figure ${f} → page ${loc.pageIdx + 1}, caption at y=${Math.round(loc.captionBbox.y)}`));

// ── Render and crop each figure ───────────────────────────────────────────────
const DPI = 150;
const SCALE = DPI / 72;
const figureMap = {};

async function renderFigure(figNum, pageIdx, captionBbox) {
  const page = doc.loadPage(pageIdx);

  // Render full page
  const matrix = mupdf.Matrix.scale(SCALE, SCALE);
  const pixmap = page.toPixmap(matrix, mupdf.ColorSpace.DeviceRGB, false, true);
  const pngBuf = Buffer.from(pixmap.asPNG());

  const { width: pixW, height: pixH } = await sharp(pngBuf).metadata();

  // Get all text blocks on page to find what's above the caption
  const json = JSON.parse(page.toStructuredText('preserve-whitespace').asJSON());

  // Find the caption block again and all blocks
  const captionY = captionBbox.y;

  // Find the nearest text block that ends just above the figure
  // (i.e. the last block whose bottom < captionY - some margin)
  let topY = 36; // default: 0.5 inch from top
  for (const block of json.blocks) {
    const blockBottom = block.bbox.y + block.bbox.h;
    // Block must end above the caption with at least 10pt gap
    if (blockBottom < captionY - 10) {
      topY = Math.max(topY, blockBottom);
    }
  }

  // Caption bottom
  const captionBottom = captionBbox.y + captionBbox.h + 8; // +8pt padding

  // Convert PDF coords to pixels
  const left   = Math.max(0, Math.round(36 * SCALE));   // 0.5in left margin
  const right  = Math.min(pixW, Math.round((36 + 468) * SCALE)); // standard text width
  const top    = Math.max(0, Math.round(topY * SCALE));
  const bottom = Math.min(pixH, Math.round(captionBottom * SCALE));

  if (bottom <= top) {
    console.log(`  ⚠ Figure ${figNum}: invalid crop (top=${top} bottom=${bottom}), using half-page`);
    return null;
  }

  const cropW = right - left;
  const cropH = bottom - top;

  const outFile = `fig${figNum.replace('.', '-')}.png`;
  const outPath = path.join(OUT_DIR, outFile);

  await sharp(pngBuf)
    .extract({ left, top, width: cropW, height: cropH })
    .png({ compressionLevel: 7 })
    .toFile(outPath);

  console.log(`  ✓ Figure ${figNum} → ${outFile} (${cropW}×${cropH}px, page ${pageIdx + 1})`);
  return outFile;
}

console.log('\nExtracting figures...');
for (const figNum of figures) {
  const loc = figLocations[figNum];
  if (!loc) {
    console.log(`  ⚠ Figure ${figNum}: not found in PDF`);
    continue;
  }
  try {
    const outFile = await renderFigure(figNum, loc.pageIdx, loc.captionBbox);
    if (outFile) figureMap[figNum] = outFile;
  } catch (e) {
    console.error(`  ✗ Figure ${figNum} error:`, e.message);
  }
}

// ── Write figure-map.json ─────────────────────────────────────────────────────
fs.writeFileSync(path.join(DATA_DIR, 'figure-map.json'), JSON.stringify(figureMap, null, 2));
console.log(`\n✓ ${Object.keys(figureMap).length}/${figures.length} figures extracted`);
console.log('figure-map.json updated');
