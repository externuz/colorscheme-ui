import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(rootDir, 'dist');

fs.copyFileSync(path.join(rootDir, 'src/styles/tokens.css'), path.join(distDir, 'tokens.css'));
fs.copyFileSync(path.join(rootDir, 'src/styles/reset.css'), path.join(distDir, 'reset.css'));
