const fs = require('fs');
const path = require('path');
function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css')) {
        results.push(file);
      }
    }
  });
  return results;
}
const files = walk('d:/demo26/src');
let changedCount = 0;
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // Replace text-slate-900 with text-white if the className also contains a dark solid background
  content = content.replace(/className=(['"])(.*?)\1|className=\{`(.*?)`\}/g, (match) => {
    if (match.includes('bg-[#2563EB]') || 
        match.includes('bg-[#1D4ED8]') || 
        match.includes('bg-rose-600') ||
        match.includes('bg-emerald-600') ||
        match.includes('bg-[#0B1F3A]') ||
        match.includes('group-hover:bg-[#2563EB]')) {
      return match.replace(/text-slate-900/g, 'text-white')
                  .replace(/hover:text-slate-900/g, 'hover:text-white')
                  .replace(/group-hover:text-slate-900/g, 'group-hover:text-white');
    }
    return match;
  });

  // Shell.tsx specific fixes
  if (file.endsWith('Shell.tsx')) {
    content = content.replace(/bg-\[#0B1F3A\]/g, 'bg-white');
    content = content.replace(/bg-\[#0B1F3A\]\/95/g, 'bg-white/95');
  }

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    changedCount++;
  }
});
console.log('Changed ' + changedCount + ' files for text contrast.');
