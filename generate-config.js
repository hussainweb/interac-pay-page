
import fs from 'fs';
import path from 'path';

// Load config from ENV
const config = {
  INTERAC_EMAIL: process.env.INTERAC_EMAIL || 'pay@aljumantreats.com',
};

const fileContent = `window.APP_CONFIG = ${JSON.stringify(config)};`;

// Always write to public/config.js (for dev server and build process)
const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}
fs.writeFileSync(path.join(publicDir, 'config.js'), fileContent);
console.log('Config generated at public/config.js');

// If dist exists (production runtime), update it there too so served files get new config
const distDir = path.resolve('dist');
if (fs.existsSync(distDir)) {
  fs.writeFileSync(path.join(distDir, 'config.js'), fileContent);
  console.log('Config generated at dist/config.js');
}
