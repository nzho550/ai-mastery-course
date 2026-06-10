// Fixes literal control characters (newlines, tabs) inside JSON string values
const fs = require('fs');
const path = require('path');

const dirs = [
  'data/lessons/part-01',
  'data/lessons/part-02',
  'data/lessons/part-03',
];

let fixedCount = 0;

dirs.forEach(dir => {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
  files.forEach(f => {
    const fp = path.join(dir, f);
    const raw = fs.readFileSync(fp, 'utf8');
    try {
      JSON.parse(raw);
      process.stdout.write('OK  ' + f + '\n');
    } catch (e) {
      // Escape bare newlines/tabs/CRs inside JSON string values
      const normalized = raw.replace(/\r\n/g, '\n');
      let inStr = false;
      let esc = false;
      let out = '';
      for (let i = 0; i < normalized.length; i++) {
        const c = normalized[i];
        if (esc) { out += c; esc = false; continue; }
        if (c === '\\') { esc = true; out += c; continue; }
        if (c === '"') { inStr = !inStr; out += c; continue; }
        if (inStr && c === '\n') { out += '\\n'; continue; }
        if (inStr && c === '\r') { out += '\\r'; continue; }
        if (inStr && c === '\t') { out += '\\t'; continue; }
        out += c;
      }
      try {
        JSON.parse(out); // confirm fix worked
        fs.writeFileSync(fp, out, 'utf8');
        process.stdout.write('FIX ' + f + '\n');
        fixedCount++;
      } catch (e2) {
        process.stdout.write('ERR ' + f + ': ' + e2.message + '\n');
      }
    }
  });
});

process.stdout.write('Done. Fixed: ' + fixedCount + '\n');
