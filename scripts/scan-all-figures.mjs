/**
 * Scan entire PDF for ALL figure captions (Figure X.Y at start of block)
 * to find what figures exist in the book vs what's in our data
 */
import mupdf from 'mupdf';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PDF_PATH = path.join(__dirname, '../Book/Sybex-The-Official-ISC2®-CISSP®-CBK®-Reference-5nd-Edition.pdf');

const pdfBytes = fs.readFileSync(PDF_PATH);
const doc = mupdf.Document.openDocument(pdfBytes, 'application/pdf');
const totalPages = doc.countPages();

const found = {};

for (let p = 0; p < totalPages; p++) {
  const page = doc.loadPage(p);
  const json = JSON.parse(page.toStructuredText('preserve-whitespace').asJSON());
  for (const block of json.blocks) {
    const blockText = (block.lines || [])
      .map(l => l.text || (l.spans || []).map(s => s.text).join(''))
      .join(' ').trim();
    const m = /^Figure\s+(\d+\.\d+)/i.exec(blockText);
    if (m && !found[m[1]]) {
      found[m[1]] = { page: p + 1, y: Math.round(block.bbox.y) };
    }
  }
  if (p % 100 === 0) process.stdout.write(`  ${p}/${totalPages}\r`);
}

const allFigs = Object.keys(found).sort((a, b) => {
  const [ad, an] = a.split('.').map(Number);
  const [bd, bn] = b.split('.').map(Number);
  return ad !== bd ? ad - bd : an - bn;
});

console.log(`\nAll figures in PDF (${allFigs.length}):`);
allFigs.forEach(f => console.log(`  Figure ${f} → page ${found[f].page}`));
