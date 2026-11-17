import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(rootDir, 'dist');

function stripCssImportsFromEntryTypes(dtsPath) {
  if (!fs.existsSync(dtsPath)) {
    return;
  }

  const content = fs.readFileSync(dtsPath, 'utf8');
  const cleaned = content.replace(/^import ['"]\.\/styles\/tokens\.css['"];\r?\n/, '');
  if (cleaned === content) {
    return;
  }

  fs.writeFileSync(dtsPath, cleaned, 'utf8');
}

fs.copyFileSync(path.join(rootDir, 'src/styles/tokens.css'), path.join(distDir, 'tokens.css'));
fs.copyFileSync(path.join(rootDir, 'src/styles/reset.css'), path.join(distDir, 'reset.css'));
stripCssImportsFromEntryTypes(path.join(distDir, 'index.d.ts'));
