/* ---------- Settings: change these if your backend uses other names ---------- */
const API = {
  me: '/api/auth/me',
  register: '/api/auth/register',
  login: '/api/auth/login',
  logout: '/api/auth/logout',
  games: '/api/games',
  categories: '/api/categories',
  reservations: '/api/reservations'
}

const $ = (id) => document.getElementById(id)
const grid = $('grid')
const statusEl = $('status')
const state = { user: null }
let requestId = 0   // ignore out-of-date game responses

async function getJSON(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error('Status ' + res.status)
  return res.json()
}

function setMsg(el, text, type = '') {
  el.textContent = text
  el.className = 'status ' + type
}

const errorText = (data, res) => data.error || data.message || 'Status ' + res.status
const displayName = (u) => u.name || u.username || u.email || 'friend'

/* ---------- Filters and games ---------- */
async function loadCategories() {
  try {
    const list = await getJSON(API.categories)
    for (const c of list) {
      const value = typeof c === 'string' ? c : c.category
      const opt = document.createElement('option')
      opt.value = value
      opt.textContent = value
      $('category').append(opt)
    }
  } catch (err) {
    console.error(err)
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
    const games = await getJSON(API.games + (query ? '?' + query : ''))
    if (id !== requestId) return
    render(games)
  } catch (err) {
    if (id !== requestId) return
    console.error(err)
    grid.replaceChildren()
    setMsg(statusEl, 'Could not load games. Check that the server is running.', 'error')
  }
}

function makeCover(game) {
  const img = document.createElement('img')
  img.className = 'cover'
  img.src = game.image
  img.alt = 'Cover of ' + game.title
  img.loading = 'lazy'
  img.onerror = () => {
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

/* ---------- Authentication ---------- */
const authDialog = $('authDialog')
let authMode = 'login'

async function loadUser() {
  try {
    const res = await fetch(API.me)
    if (res.ok) {
      const data = await res.json()
      state.user = data.user ?? data          // accepts { name } or { user: { name } }
    } else {
      state.user = null
    }
  } catch (err) {
    state.user = null
  }
  renderAuth()
}

function renderAuth() {
  const nav = $('auth')
  nav.replaceChildren()

  const makeBtn = (text, onClick, cls) => {
    const b = document.createElement('button')
    b.type = 'button'
    b.textContent = text
    if (cls) b.className = cls
    b.addEventListener('click', onClick)
    return b
  }

  if (state.user) {
    const hello = document.createElement('span')
    hello.className = 'hello'
    hello.textContent = 'Hi, ' + displayName(state.user)   // textContent, never innerHTML
    nav.append(hello, makeBtn('Log out', logout, 'ghost'))
  } else {
    nav.append(
      makeBtn('Log in', () => openAuth('login'), 'ghost'),
      makeBtn('Sign up', () => openAuth('register'))
    )
  }
}

function openAuth(mode, note = '') {
  authMode = mode
  const reg = mode === 'register'
  $('authTitle').textContent = reg ? 'Sign up' : 'Log in'
  $('authSubmit').textContent = reg ? 'Create account' : 'Log in'
  $('authSwitch').textContent = reg ? 'Have an account? Log in' : 'New here? Sign up'
  $('nameRow').hidden = !reg
  $('authName').required = reg
  $('authPass').autocomplete = reg ? 'new-password' : 'current-password'
  setMsg($('authMsg'), note)
  authDialog.showModal()
}

function sessionExpired() {
  state.user = null
  renderAuth()
  openAuth('login', 'Please log in first.')
}

async function sendAuth(path, body) {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(errorText(data, res))
}

$('authForm').addEventListener('submit', async (e) => {
  e.preventDefault()
  const email = $('authEmail').value.trim()
  const password = $('authPass').value
  const btn = $('authSubmit')
  btn.disabled = true
  setMsg($('authMsg'), 'Please wait…')

  try {
    if (authMode === 'register') {
      await sendAuth(API.register, { name: $('authName').value.trim(), email, password })
      await loadUser()
      if (!state.user) await sendAuth(API.login, { email, password })   // if register doesn't log in by itself
    } else {
      await sendAuth(API.login, { email, password })
    }
    $('authForm').reset()
    authDialog.close()
    await loadUser()
  } catch (err) {
    console.error(err)
    setMsg($('authMsg'), err.message, 'error')
  } finally {
    btn.disabled = false
  }
})

$('authSwitch').addEventListener('click', () => openAuth(authMode === 'login' ? 'register' : 'login'))
$('authCancel').addEventListener('click', () => authDialog.close())

async function logout() {
  try { await fetch(API.logout, { method: 'POST' }) } catch (err) { console.error(err) }
  state.user = null
  renderAuth()
}

/* ---------- Reservations (login required) ---------- */
const dialog = $('book')

for (let h = 10; h <= 21; h++) {
  const opt = document.createElement('option')
  opt.value = h
  opt.textContent = `${h}:00`
  $('startHour').append(opt)
}
$('date').min = new Date().toLocaleDateString('en-CA')   // today, in YYYY-MM-DD, local time

function openBooking(game) {
  if (!state.user) return openAuth('login', 'Log in to reserve a game.')
  $('gameId').value = game.id
  $('bookTitle').textContent = game.title
  $('bookAs').textContent = 'Booking as ' + displayName(state.user)
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
    const res = await fetch(API.reservations, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // No name or user id: the server takes the user from the session
      body: JSON.stringify({
        gameId: Number($('gameId').value),
        players: Number($('bookPlayers').value),
        date: $('date').value,
        startHour: Number($('startHour').value),
        hours: Number($('hours').value)
      })
    })
    if (res.status === 401) {
      dialog.close()
      return sessionExpired()
    }
    const data = await res.json().catch(() => ({}))
    if (!res.ok) throw new Error(errorText(data, res))
    setMsg($('bookMsg'), 'Booked. See you at the cafe!', 'ok')
    setTimeout(() => dialog.close(), 1200)
  } catch (err) {
    console.error(err)
    setMsg($('bookMsg'), err.message, 'error')
  } finally {
    btn.disabled = false
  }
})

/* ---------- Wire up ---------- */
let timer
$('search').addEventListener('input', () => {
  clearTimeout(timer)
  timer = setTimeout(loadGames, 250)
})
for (const key of ['category', 'players', 'maxMinutes']) {
  $(key).addEventListener('change', loadGames)
}
$('filters').addEventListener('submit', (e) => e.preventDefault())

loadUser()
loadCategories()
loadGames()