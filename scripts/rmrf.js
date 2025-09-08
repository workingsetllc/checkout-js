#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function rmrf(target) {
  const p = path.resolve(process.cwd(), target);
  try {
    fs.rmSync(p, { recursive: true, force: true });
    console.log(`Removed: ${p}`);
  } catch (err) {
    console.warn(`Warning removing ${p}: ${err.message}`);
  }
}

const args = process.argv.slice(2);
if (args.length === 0) {
  console.log('Usage: node scripts/rmrf.js <path> [<path> ...]');
  process.exit(1);
}
args.forEach(rmrf);
