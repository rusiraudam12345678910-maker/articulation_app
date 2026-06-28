const fs = require('fs');
const path = require('path');

function extractFigureMap(htmlFile) {
  const html = fs.readFileSync(htmlFile, 'utf8');
  const imgRe = /src="\.\.\/figures\/(page_\d+\.jpg)"[^>]*alt="([^"]*)"/g;
  const map = {};
  let m;
  while ((m = imgRe.exec(html)) !== null) {
    const file = m[1];
    const alt = m[2];
    const figMatch = alt.match(/Figure (\d+)-(\d+)/);
    if (figMatch) {
      const key = figMatch[1] + '-' + figMatch[2];
      map[key] = file;
    }
  }
  return map;
}

const base = path.join(__dirname, '..');
const map1 = extractFigureMap(path.join(base, 'public/book/chapters/ch01.html'));
const map2 = extractFigureMap(path.join(base, 'public/book/chapters/ch02.html'));
const map3 = extractFigureMap(path.join(base, 'public/book/chapters/ch03.html'));
const map4 = extractFigureMap(path.join(base, 'public/book/chapters/ch04.html'));
const map5 = extractFigureMap(path.join(base, 'public/book/chapters/ch05.html'));
const map6 = extractFigureMap(path.join(base, 'public/book/chapters/ch06.html'));
const map7 = extractFigureMap(path.join(base, 'public/book/chapters/ch07.html'));
const map8 = extractFigureMap(path.join(base, 'public/book/chapters/ch08.html'));

const combined = { ...map1, ...map2, ...map3, ...map4, ...map5, ...map6, ...map7, ...map8 };

console.log('Figure map:');
Object.entries(combined).forEach(([k, v]) => console.log(' ', k, '->', v));
console.log('Total:', Object.keys(combined).length);

const outPath = path.join(base, 'public/book2/data/figure-map.json');
fs.writeFileSync(outPath, JSON.stringify(combined, null, 2));
console.log('Saved to', outPath);
