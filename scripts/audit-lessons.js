const fs = require('fs');
const curriculum = JSON.parse(fs.readFileSync('data/curriculum.json', 'utf8'));
const all = curriculum.parts.flatMap(p => p.lessons.map(l => ({ id: l.id, part: p.id })));
const missing = [], empty = [], ok = [];

all.forEach(function(item) {
  const partStr = String(item.part).padStart(2, '0');
  const fp = 'data/lessons/part-' + partStr + '/' + item.id + '.json';
  if (!fs.existsSync(fp)) { missing.push(item.id); return; }
  try {
    const d = JSON.parse(fs.readFileSync(fp, 'utf8'));
    if (!d.sections || d.sections.length === 0) empty.push(item.id);
    else ok.push(item.id);
  } catch (e) { empty.push(item.id + '(parse-err)'); }
});

console.log('Total in curriculum:', all.length);
console.log('OK (have content):  ', ok.length);
console.log('Missing files:      ', missing.length);
if (missing.length) missing.forEach(function(id) { console.log('  MISSING:', id); });
console.log('Empty/broken:       ', empty.length);
if (empty.length) empty.forEach(function(id) { console.log('  EMPTY:', id); });
