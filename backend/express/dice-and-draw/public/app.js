const $ = (id) => document.getElementById(id)
const grid = $('grid')
const statusEl = $('status')
let requestId = 0   // ignore out-of-date responses

async function getJSON(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error('Status ' + res.status)
  return res.json()
}

function setMsg(el, text, type = '') {
  el.textContent = text
  el.className = 'status ' + type
}

/* ---------- Filters ---------- */
async function loadCategories() {
  try {
    const list = await getJSON('/api/categories')
    for (const c of list) {
      const value = typeof c === 'string' ? c : c.category   // works for strings or {category}
      const opt = document.createElement('option')
      opt.value = value
      opt.textContent = value
      $('category').append(opt)
    }
  } catch (err) {
    console.error(err)   // the page still works without the dropdown list
  }
}

async function loadGames() {
  const id = ++requestId
  const params = new URLSearchParams()
  for (const key of ['category', 'search', 'players', 'maxMinutes']) {
    const value = $(key).value.trim()
    if (value) params.set(key, value)
  }
  const query = params.toString()

  try {
    const games = await getJSON('/api/games' + (query ? '?' + query : ''))
    if (id !== requestId) return
    render(games)
  } catch (err) {
    if (id !== requestId) return
    console.error(err)
    grid.replaceChildren()
    setMsg(statusEl, 'Could not load games. Check that the server is running.', 'error')
  }
}

/* ---------- Cards ---------- */
function makeCover(game) {
  const img = document.createElement('img')
  img.className = 'cover'
  img.src = game.image
  img.alt = 'Cover of ' + game.title
  img.loading = 'lazy'
  img.onerror = () => {                       // fallback if the image is missing
    const div = document.createElement('div')
    div.className = 'fallback'
    div.textContent = game.title
    img.replaceWith(div)
  }
  return img
}

function makeCard(game) {
  const li = document.createElement('li')
  li.className = 'card'

  const info = document.createElement('div')
  info.className = 'info'

  const tag = document.createElement('span')
  tag.className = 'tag'
  tag.textContent = game.category

  const title = document.createElement('h2')
  title.textContent = game.title

  const meta = document.createElement('p')
  meta.className = 'meta'
  meta.textContent = `${game.minPlayers}-${game.maxPlayers} players · ${game.playMinutes} min · ${game.copies} ${game.copies === 1 ? 'copy' : 'copies'}`

  const dots = document.createElement('div')
  dots.className = 'dots'
  dots.setAttribute('aria-label', 'Difficulty ' + game.difficulty + ' of 5')
  for (let i = 1; i <= 5; i++) {
    const dot = document.createElement('i')
    if (i <= game.difficulty) dot.className = 'on'
    dots.append(dot)
  }

  const btn = document.createElement('button')
  btn.type = 'button'
  btn.textContent = 'Reserve'
  btn.addEventListener('click', () => openBooking(game))

  info.append(tag, title, meta, dots, btn)
  li.append(makeCover(game), info)
  return li
}

function render(games) {
  grid.replaceChildren(...games.map(makeCard))
  if (games.length === 0) setMsg(statusEl, 'No games match. Try another word or filter.')
  else setMsg(statusEl, `${games.length} ${games.length === 1 ? 'game' : 'games'}`)
}

/* ---------- Reservation dialog (Level 3) ---------- */
const dialog = $('book')

for (let h = 10; h <= 21; h++) {
  const opt = document.createElement('option')
  opt.value = h
  opt.textContent = `${h}:00`
  $('startHour').append(opt)
}
$('date').min = new Date().toISOString().slice(0, 10)

function openBooking(game) {
  $('gameId').value = game.id
  $('bookTitle').textContent = game.title
  $('bookPlayers').min = game.minPlayers
  $('bookPlayers').max = game.maxPlayers
  $('bookPlayers').value = game.minPlayers
  setMsg($('bookMsg'), '')
  dialog.showModal()
}

$('cancel').addEventListener('click', () => dialog.close())

$('bookForm').addEventListener('submit', async (e) => {
  e.preventDefault()
  const btn = $('confirm')
  btn.disabled = true
  setMsg($('bookMsg'), 'Booking…')

  try {
    const res = await fetch('/api/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        gameId: Number($('gameId').value),
        name: $('name').value.trim(),
        players: Number($('bookPlayers').value),
        date: $('date').value,
        startHour: Number($('startHour').value),
        hours: Number($('hours').value)
      })
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) throw new Error(data.error || 'Status ' + res.status)
    setMsg($('bookMsg'), 'Booked. See you at the cafe!', 'ok')
    setTimeout(() => dialog.close(), 1200)
  } catch (err) {
    console.error(err)
    setMsg($('bookMsg'), err.message, 'error')   // show the server's reason
  } finally {
    btn.disabled = false
  }
})

/* ---------- Wire up ---------- */
let timer
$('search').addEventListener('input', () => {   // wait until the user stops typing
  clearTimeout(timer)
  timer = setTimeout(loadGames, 250)
})
for (const key of ['category', 'players', 'maxMinutes']) {
  $(key).addEventListener('change', loadGames)
}
$('filters').addEventListener('submit', (e) => e.preventDefault())

loadCategories()
loadGames()