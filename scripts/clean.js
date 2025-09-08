const fs = require('fs');
const path = require('path');

function rmrf(targetPath) {
  try {
    fs.rmSync(targetPath, { recursive: true, force: true });
    console.log(`Removed: ${targetPath}`);
  } catch (err) {
    console.warn(`Skip remove (missing?): ${targetPath}`);
  }
}

const root = path.join(__dirname, '..');
rmrf(path.join(root, 'dist'));
rmrf(path.join(root, 'packages', 'test-framework', 'report'));
