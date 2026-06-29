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
      .join(' ').trim();

    // Only match caption blocks: "Figure X.Y" must appear at the START of the block
    // (captions begin with "Figure X.Y", paragraphs only reference them mid-sentence)
    const re = /^Figure\s+(\d+\.\d+)/i;
    const m = re.exec(blockText);
    if (m) {
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

  // Render full page at target DPI
  const matrix = mupdf.Matrix.scale(SCALE, SCALE);
  const pixmap = page.toPixmap(matrix, mupdf.ColorSpace.DeviceRGB, false, true);
  const pngBuf = Buffer.from(pixmap.asPNG());

  const { width: pixW, height: pixH } = await sharp(pngBuf).metadata();

  const captionBottomPx = Math.min(pixH, Math.round((captionBbox.y + captionBbox.h + 12) * SCALE));

  // Find the bottom of the last "body text" paragraph above the figure.
  // Exclude figure-internal labels by requiring block to end ≥50pt above caption.
  const json = JSON.parse(page.toStructuredText('preserve-whitespace').asJSON());
  let textAboveBottomPt = 36;
  for (const block of json.blocks) {
    const blockBottom = block.bbox.y + block.bbox.h;
    if (blockBottom < captionBbox.y - 80) {
      textAboveBottomPt = Math.max(textAboveBottomPt, blockBottom);
    }
  }

  const left  = Math.max(0, Math.round(30 * SCALE));
  const right = Math.min(pixW, Math.round((36 + 468 + 6) * SCALE));
  const scanWidth = right - left;

  // Pixel-scan the full band from textAboveBottomPx to captionTopPx.
  // Scan DOWNWARD to find the first row that has colored/non-white pixels —
  // that is where the figure graphic begins.
  const captionTopPx = Math.round(captionBbox.y * SCALE);
  const bandTop = Math.max(0, Math.round(textAboveBottomPt * SCALE));
  const bandH   = Math.max(1, captionTopPx - bandTop);

  // Get RGB raw pixels to detect color (figures have colored fills)
  const { data: rgbBand } = await sharp(pngBuf)
    .extract({ left, top: bandTop, width: scanWidth, height: bandH })
    .raw()
    .toBuffer({ resolveWithObject: true });

  // A pixel is "figure content" if it's not near-white (any channel < 230)
  // or if it's strongly colored (high saturation)
  const NEAR_WHITE = 250; // high threshold catches antialiased edges of vector figures
  let figureFirstRow = -1;
  for (let row = 0; row < bandH; row++) {
    for (let col = 0; col < scanWidth; col++) {
      const i = (row * scanWidth + col) * 3;
      const r = rgbBand[i], g = rgbBand[i+1], b = rgbBand[i+2];
      if (r < NEAR_WHITE || g < NEAR_WHITE || b < NEAR_WHITE) {
        figureFirstRow = row;
        break;
      }
    }
    if (figureFirstRow !== -1) break;
  }

  let top, bottom;
  if (figureFirstRow !== -1) {
    // Use exact first content row — no subtraction to avoid going into paragraph above
    top = bandTop + figureFirstRow;
  } else {
    top = bandTop;
  }
  bottom = captionBottomPx;

  top    = Math.max(0, top);
  bottom = Math.min(pixH, bottom);

  if (bottom <= top) {
    console.log(`  ⚠ Figure ${figNum}: invalid crop (top=${top} bottom=${bottom})`);
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
