import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const SEMVER_RE = /^\d+\.\d+\.\d+$/

function usage() {
  console.error('Usage: node scripts/bump-version.mjs <version>')
  console.error('Example: node scripts/bump-version.mjs 0.2.0')
  process.exit(1)
}

const version = process.argv[2]

if (!version) {
  console.error('Error: version argument is required')
  usage()
}

if (!SEMVER_RE.test(version)) {
  console.error(`Error: "${version}" is not a valid semver version (expected x.y.z)`)
  usage()
}

// package.json — replace top-level "version" field
function bumpPackageJson(filePath, newVersion) {
  const raw = readFileSync(filePath, 'utf8')
  const parsed = JSON.parse(raw)
  const updated = JSON.stringify({ ...parsed, version: newVersion }, null, 2) + '\n'
  writeFileSync(filePath, updated, 'utf8')
}

// tauri.conf.json — replace top-level "version" field
function bumpTauriConf(filePath, newVersion) {
  const raw = readFileSync(filePath, 'utf8')
  const parsed = JSON.parse(raw)
  const updated = JSON.stringify({ ...parsed, version: newVersion }, null, 2) + '\n'
  writeFileSync(filePath, updated, 'utf8')
}

// Cargo.toml — replace only the FIRST occurrence of version = "..."
// Targets the root [package] section; leaves dependency lines untouched.
function bumpCargoToml(filePath, newVersion) {
  const raw = readFileSync(filePath, 'utf8')
  const pattern = /^version\s*=\s*"[^"]*"/m
  if (!pattern.test(raw)) {
    throw new Error(`No version field found in ${filePath}`)
  }
  const updated = raw.replace(pattern, `version = "${newVersion}"`)
  writeFileSync(filePath, updated, 'utf8')
}

const files = [
  {
    label: 'package.json',
    path: resolve(root, 'package.json'),
    bump: bumpPackageJson,
  },
  {
    label: 'src-tauri/tauri.conf.json',
    path: resolve(root, 'src-tauri', 'tauri.conf.json'),
    bump: bumpTauriConf,
  },
  {
    label: 'src-tauri/Cargo.toml',
    path: resolve(root, 'src-tauri', 'Cargo.toml'),
    bump: bumpCargoToml,
  },
]

for (const { label, path, bump } of files) {
  bump(path, version)
  console.log(`Updated ${label} -> ${version}`)
}

console.log(`
Next:
  git commit -am "chore: bump version to ${version}"
  git tag v${version}
  git push && git push --tags
`)
