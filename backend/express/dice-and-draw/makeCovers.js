// makeCovers.js
// Generates one SVG cover per game into public/images/
// Run once: node makeCovers.js
import fs from 'node:fs/promises'
import path from 'node:path'
import { games } from './seedData.js'

const outDir = path.join(import.meta.dirname, 'public', 'images')
await fs.mkdir(outDir, { recursive: true })

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Split a title into lines of about 14 characters
function wrap(title, max = 14) {
  const lines = []
  let line = ''
  for (const word of title.split(' ')) {
    if ((line + ' ' + word).trim().length > max && line) {
      lines.push(line)
      line = word
    } else {
      line = (line + ' ' + word).trim()
    }
  }
  if (line) lines.push(line)
  return lines
}

for (const g of games) {
  const [c1, c2] = g.colors
  const lines = wrap(g.title)
  const startY = 235 - (lines.length - 1) * 18
  const text = lines
    .map((l, i) => `<text x="150" y="${startY + i * 36}" text-anchor="middle" font-family="Georgia, serif" font-size="30" font-weight="bold" fill="#fff">${esc(l)}</text>`)
    .join('\n  ')

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400" width="300" height="400">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/>
    </linearGradient>
  </defs>
  <rect width="300" height="400" fill="url(#g)"/>
  <circle cx="150" cy="105" r="62" fill="none" stroke="#fff" stroke-opacity="0.35" stroke-width="3"/>
  <circle cx="150" cy="105" r="38" fill="#fff" fill-opacity="0.18"/>
  <rect x="20" y="20" width="260" height="360" rx="8" fill="none" stroke="#fff" stroke-opacity="0.4" stroke-width="2"/>
  ${text}
  <text x="150" y="360" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" letter-spacing="3" fill="#fff" fill-opacity="0.8">${esc(g.category.toUpperCase())} / ${g.minPlayers}-${g.maxPlayers} PLAYERS</text>
</svg>`

  await fs.writeFile(path.join(outDir, path.basename(g.image)), svg, 'utf8')
}
console.log(`Created ${games.length} covers in ${outDir}`)