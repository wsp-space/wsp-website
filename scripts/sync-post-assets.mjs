import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const collections = ['posts', 'projects']

for (const name of collections) {
  const source = path.join(root, 'content', name)
  const destination = path.join(root, 'public', 'media', name)
  fs.rmSync(destination, { recursive: true, force: true })
  if (!fs.existsSync(source)) continue
  copyAssets(source, destination)
}

function copyAssets(sourceDir, destinationDir) {
  for (const entry of fs.readdirSync(sourceDir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue
    const from = path.join(sourceDir, entry.name)
    const to = path.join(destinationDir, entry.name)
    if (entry.isDirectory()) {
      copyAssets(from, to)
      continue
    }
    if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) continue
    fs.mkdirSync(path.dirname(to), { recursive: true })
    fs.copyFileSync(from, to)
  }
}
