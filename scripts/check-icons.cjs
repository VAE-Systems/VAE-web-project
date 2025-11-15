const fs = require('fs');
const glob = require('glob');

const srcFiles = glob.sync('src/**/*.{ts,tsx,jsx,js}');
const iconFiles = srcFiles.filter(f => fs.readFileSync(f, 'utf8').includes('Icon name='));
const names = new Set();
iconFiles.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const regex = /<Icon\s+[^>]*name=\{?\s*(['\"])([^'\"]+)\1/g;
  let m;
  while ((m = regex.exec(content)) !== null) {
    names.add(m[2]);
  }
});
const iconMapFile = fs.readFileSync('src/components/ui/Icon.tsx', 'utf8');
const keyRegex = /(\w+):\s*[A-Za-z_]+,/gi;
const mapKeys = new Set();
let match;
while ((match = keyRegex.exec(iconMapFile)) !== null) {
  mapKeys.add(match[1]);
}
const missing = [...names].filter(n => !mapKeys.has(n));
console.log('Icon names found in code:', [...names].length);
if (missing.length) {
  console.log('Missing icon names:', missing.join(', '));
  process.exitCode = 1;
} else {
  console.log('No missing icon names.');
}
