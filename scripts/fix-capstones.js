// Restructures Part 14 capstone lessons to have a proper workshop section.
// Pattern: keep intro + prereqs as text, merge all Step sections into workshop, keep final callout.
const fs = require('fs');

function restructure(filepath, workshopTag) {
  const d = JSON.parse(fs.readFileSync(filepath, 'utf8'));

  const intro    = [];  // text/callout before the first "Step"
  const steps    = [];  // text/callout sections that are the hands-on steps
  const finale   = [];  // final success callout

  let inSteps = false;

  d.sections.forEach(s => {
    const isSuccessCallout = s.type === 'callout' && s.variant === 'success';
    const isStepText = s.type === 'text' && /^##\s+Step\s+\d/i.test(s.content.trimStart());
    const isStuckText = s.type === 'text' && /what to do if you get stuck/i.test(s.content);
    const isMidStepCallout = inSteps && s.type === 'callout' && !isSuccessCallout;
    const isStepNote = s.type === 'text' && inSteps && !isSuccessCallout;

    if (isSuccessCallout) {
      finale.push(s);
    } else if (isStepText || isStuckText || (inSteps && (isMidStepCallout || isStepNote))) {
      inSteps = true;
      steps.push(s);
    } else if (!inSteps) {
      intro.push(s);
    }
  });

  // Merge step sections into one workshop content string
  const workshopContent = steps.map(s => {
    if (s.type === 'callout') {
      // Convert callouts inside steps to a blockquote-style note
      return `> **Note:** ${s.content.replace(/\*\*[^*]+\*\*\s*/, '').trim()}`;
    }
    return s.content;
  }).join('\n\n---\n\n');

  const workshopSection = {
    type: 'workshop',
    tag: workshopTag,
    title: d.title.replace(/^Capstone:\s*/i, ''),
    content: workshopContent
  };

  d.sections = [...intro, workshopSection, ...finale];

  fs.writeFileSync(filepath, JSON.stringify(d, null, 2), 'utf8');
  console.log(`Fixed ${filepath.split('/').pop()} — ${intro.length} intro + 1 workshop (from ${steps.length} sections) + ${finale.length} finale`);
}

restructure('data/lessons/part-14/14-1.json', 'BUILD');
restructure('data/lessons/part-14/14-2.json', 'BUILD');
restructure('data/lessons/part-14/14-3.json', 'BUILD');
restructure('data/lessons/part-14/14-4.json', 'BUILD');
restructure('data/lessons/part-14/14-5.json', 'BUILD');

console.log('\nValidating...');
for (let i = 1; i <= 5; i++) {
  const d = JSON.parse(fs.readFileSync(`data/lessons/part-14/14-${i}.json`, 'utf8'));
  const hasWorkshop = d.sections.some(s => s.type === 'workshop');
  console.log(`14-${i}: ${d.sections.length} sections, workshop=${hasWorkshop}`);
}
