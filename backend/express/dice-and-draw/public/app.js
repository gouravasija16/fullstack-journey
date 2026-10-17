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
const reservationsState = { items: [], count: 0, visible: false }
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
let pendingReservationsAccess = false

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
    nav.append(
      hello,
      makeBtn('My reservations', openReservations, 'ghost'),
      makeBtn('Log out', logout, 'ghost')
    )
  } else {
    nav.append(
      makeBtn('My reservations', openReservations, 'ghost'),
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
  $('emailRow').hidden = !reg
  $('authEmail').required = reg
  $('authPass').autocomplete = reg ? 'new-password' : 'current-password'
  setMsg($('authMsg'), note)
  authDialog.showModal()
}

function sessionExpired() {
  state.user = null
  reservationsState.items = []
  reservationsState.visible = false
  $('reservationsSection').hidden = true
  renderAuth()
  pendingReservationsAccess = true
  openAuth('login', 'Please log in first.')
}

async function openReservations() {
  if (!state.user) {
    pendingReservationsAccess = true
    return openAuth('login', 'Log in to view your reservations.')
  }

  pendingReservationsAccess = false
  reservationsState.visible = true
  $('reservationsSection').hidden = false
  $('reservationsSection').scrollIntoView({ behavior: 'smooth', block: 'start' })
  await loadReservations()
}

function getReservationRows(data) {
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.reservations)) return data.reservations
  if (Array.isArray(data?.data)) return data.data
  if (Array.isArray(data?.data?.reservations)) return data.data.reservations
  throw new Error('The reservations response must be an array or contain a reservations array.')
}

function normalizeReservation(reservation) {
  if (!reservation || typeof reservation !== 'object') {
    throw new Error('The reservations response contains an invalid item.')
  }

  const id = reservation.id ?? reservation.reservationId
  if (id === undefined || id === null) {
    throw new Error('A reservation is missing its id, so it cannot be cancelled.')
  }

  return {
    id,
    gameTitle: reservation.gameTitle || reservation.title || reservation.game?.title ||
      (reservation.gameId !== undefined ? `Game #${reservation.gameId}` : 'Board game'),
    date: reservation.date || reservation.reservationDate || '',
    startHour: reservation.startHour ?? reservation.startTime,
    hours: reservation.hours ?? reservation.durationHours ?? reservation.duration,
    players: reservation.players
  }
}

function formatReservationDate(date) {
  if (!date) return 'Date unavailable'
  const parsedDate = new Date(`${date}T00:00:00`)
  if (Number.isNaN(parsedDate.getTime())) return date
  return new Intl.DateTimeFormat(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(parsedDate)
}

function formatReservationTime(startHour) {
  if (typeof startHour === 'string' && /^\d{1,2}:\d{2}$/.test(startHour)) return startHour
  const hour = Number(startHour)
  if (!Number.isInteger(hour) || hour < 0 || hour > 23) return 'Time unavailable'
  return `${String(hour).padStart(2, '0')}:00`
}

function makeReservationCard(reservation) {
  const item = document.createElement('li')
  item.className = 'reservation-card'

  const details = document.createElement('div')
  details.className = 'reservation-details'

  const title = document.createElement('h3')
  title.textContent = reservation.gameTitle

  const facts = document.createElement('div')
  facts.className = 'reservation-facts'
  const values = [
    ['Date', formatReservationDate(reservation.date)],
    ['Start time', formatReservationTime(reservation.startHour)],
    ['Duration', reservation.hours ? `${reservation.hours} ${Number(reservation.hours) === 1 ? 'hour' : 'hours'}` : 'Duration unavailable'],
    ['Players', reservation.players ?? 'Not specified']
  ]

  for (const [label, value] of values) {
    const fact = document.createElement('p')
    const factLabel = document.createElement('span')
    factLabel.textContent = label
    const factValue = document.createElement('strong')
    factValue.textContent = String(value)
    fact.append(factLabel, factValue)
    facts.append(fact)
  }

  const cancelButton = document.createElement('button')
  cancelButton.type = 'button'
  cancelButton.className = 'cancel-reservation'
  cancelButton.textContent = 'Cancel reservation'
  cancelButton.addEventListener('click', () => deleteReservation(reservation, cancelButton))

  details.append(title, facts)
  item.append(details, cancelButton)
  return item
}

function renderReservations(successMessage = '') {
  const list = $('reservationsList')
  list.replaceChildren()
  const count = reservationsState.count
  const countBadge = $('reservationCount')
  countBadge.textContent = String(count)
  countBadge.setAttribute('aria-label', `${count} ${count === 1 ? 'reservation' : 'reservations'}`)
  countBadge.hidden = false

  if (count === 0) {
    setMsg($('reservationsStatus'), successMessage || 'No reservations yet.', successMessage ? 'ok' : '')
    const empty = document.createElement('li')
    empty.className = 'reservation-empty'
    const title = document.createElement('h3')
    title.textContent = 'Your next game night starts here'
    const message = document.createElement('p')
    message.textContent = 'You don’t have any reservations yet. Browse the shelf and book a game to get started.'
    const link = document.createElement('a')
    link.href = '#gameShelf'
    link.className = 'hero-link'
    link.textContent = 'Explore the collection'
    empty.append(title, message, link)
    list.append(empty)
    return
  }

  setMsg($('reservationsStatus'), successMessage)
  list.replaceChildren(...reservationsState.items.map(makeReservationCard))
}

async function loadReservations(successMessage = '') {
  if (!state.user) {
    pendingReservationsAccess = true
    return openAuth('login', 'Log in to view your reservations.')
  }

  $('reservationsList').replaceChildren()
  setMsg($('reservationsStatus'), 'Loading your reservations…')

  try {
    const res = await fetch(API.reservations, { credentials: 'same-origin' })
    const data = await res.json().catch(() => ({}))
    if (res.status === 401) {
      sessionExpired()
      throw new Error('Your session has expired. Log in again to view reservations.')
    }
    if (!res.ok) throw new Error(errorText(data, res))
    reservationsState.items = getReservationRows(data).map(normalizeReservation)
    reservationsState.count = Number.isInteger(data.count) ? data.count : reservationsState.items.length
    renderReservations(successMessage)
  } catch (err) {
    console.error(err)
    setMsg($('reservationsStatus'), err.message, 'error')
  }
}

async function deleteReservation(reservation, button) {
  if (!window.confirm(`Cancel your reservation for ${reservation.gameTitle}?`)) return

  button.disabled = true
  button.textContent = 'Cancelling…'

  try {
    const res = await fetch(`${API.reservations}/${encodeURIComponent(reservation.id)}`, {
      method: 'DELETE',
      credentials: 'same-origin'
    })
    const data = await res.json().catch(() => ({}))
    if (res.status === 401) {
      sessionExpired()
      throw new Error('Your session has expired. Log in again to manage reservations.')
    }
    if (!res.ok) throw new Error(errorText(data, res))

    reservationsState.items = reservationsState.items.filter((item) => item.id !== reservation.id)
    reservationsState.count = reservationsState.items.length
    renderReservations('Reservation cancelled.')
  } catch (err) {
    console.error(err)
    setMsg($('reservationsStatus'), err.message, 'error')
    button.disabled = false
    button.textContent = 'Cancel reservation'
  }
}

async function sendAuth(path, body) {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(errorText(data, res))
  return data
}

$('authForm').addEventListener('submit', async (e) => {
  e.preventDefault()
  const name = $('authName').value.trim()
  const password = $('authPass').value
  const btn = $('authSubmit')
  btn.disabled = true
  setMsg($('authMsg'), 'Please wait…')

  try {
    if (authMode === 'register') {
      await sendAuth(API.register, { name, email: $('authEmail').value.trim(), password })
    } else {
      await sendAuth(API.login, { name, password })
    }
    $('authForm').reset()
    authDialog.close()
    await loadUser()
    if (pendingReservationsAccess && state.user) await openReservations()
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
  reservationsState.items = []
  reservationsState.visible = false
  $('reservationsSection').hidden = true
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
      body: JSON.stringify({
        gameId: Number($('gameId').value),
        name: displayName(state.user),
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
    if (reservationsState.visible) await loadReservations('Reservation added.')
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
$('refreshReservations').addEventListener('click', () => loadReservations())

loadUser()
loadCategories()
loadGames()