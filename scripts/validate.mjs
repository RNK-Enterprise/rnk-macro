import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const requiredFiles = [
  'module.json',
  'package.json',
  'README.md',
  'CHANGELOG.md',
  'languages/en.json',
  'src/main.js',
  'src/macro-picker.js',
  'src/sheet-button.js',
  'styles/rnk-macro.css',
  'templates/macro-picker.hbs',
  'LICENSE'
];

const maxTrackedLines = new Map([
  ['src/main.js', 500],
  ['src/macro-picker.js', 500],
  ['src/sheet-button.js', 500],
  ['styles/rnk-macro.css', 500],
  ['templates/macro-picker.hbs', 500],
  ['README.md', 500],
  ['CHANGELOG.md', 500]
]);

let hasFailure = false;

function fail(message) {
  hasFailure = true;
  console.error(`Validation failed: ${message}`);
}

function readText(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function ensureFile(relativePath) {
  if (!fs.existsSync(path.join(root, relativePath))) {
    fail(`Missing required file: ${relativePath}`);
  }
}

for (const file of requiredFiles) ensureFile(file);

const moduleJson = JSON.parse(readText('module.json'));
const packageJson = JSON.parse(readText('package.json'));
const langJson = JSON.parse(readText('languages/en.json'));

if (moduleJson.version !== packageJson.version) {
  fail(`Version mismatch between module.json (${moduleJson.version}) and package.json (${packageJson.version})`);
}

if (moduleJson.protected !== false) {
  fail('Free module manifest must set protected to false');
}

if (moduleJson.compatibility?.minimum !== 13 || moduleJson.compatibility?.verified !== 13) {
  fail('Compatibility must target Foundry v13');
}

if (moduleJson.manifest !== 'https://github.com/RNK-Enterprise/rnk-macro/releases/latest/download/module.json') {
  fail('Manifest URL is not the GitHub release asset URL');
}

if (moduleJson.download !== 'https://github.com/RNK-Enterprise/rnk-macro/releases/latest/download/module.zip') {
  fail('Download URL is not the GitHub release asset URL');
}

if (!String(moduleJson.title).includes('RNK™')) {
  fail('Module title must include RNK™');
}

const requiredKeys = [
  'RNKMACRO.ButtonTitleAssigned',
  'RNKMACRO.ButtonTitleEmpty',
  'RNKMACRO.NoMacroAssigned',
  'RNKMACRO.MacroNotFound',
  'RNKMACRO.MacroCannotExecute',
  'RNKMACRO.MacroAssigned',
  'RNKMACRO.MacroCleared',
  'RNKMACRO.PickerTitle',
  'RNKMACRO.PickerSubtitle',
  'RNKMACRO.ClearMacro',
  'RNKMACRO.NoMacros'
];

for (const key of requiredKeys) {
  if (!langJson[key]) fail(`Missing localization key: ${key}`);
}

const pictographicRegex = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u;
for (const file of ['README.md', 'CHANGELOG.md', 'module.json', 'languages/en.json', 'src/main.js', 'src/macro-picker.js', 'src/sheet-button.js', 'styles/rnk-macro.css', 'templates/macro-picker.hbs']) {
  const text = readText(file);
  if (pictographicRegex.test(text)) fail(`Pictographic character found in ${file}`);
}

for (const [file, maxLines] of maxTrackedLines) {
  const lines = readText(file).split(/\r?\n/).length;
  if (lines > maxLines) fail(`${file} exceeds ${maxLines} lines (${lines})`);
}

if (hasFailure) {
  process.exit(1);
}

console.log('Validation passed.');
