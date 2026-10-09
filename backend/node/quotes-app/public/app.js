const board = document.getElementById('board')
const statusEl = document.getElementById('status')
const countEl = document.getElementById('count')
const searchEl = document.getElementById('search')
const form = document.getElementById('quote-form')
const formMsg = document.getElementById('form-msg')
const saveBtn = document.getElementById('save')

const ACCENTS = ['#3b4cca', '#1f9d8f', '#d4506f', '#7a4fd0', '#e09a00']
let quotes = []

// Same author always gets the same accent colour
function accentFor(name) {
  let sum = 0
  for (const ch of name) sum += ch.charCodeAt(0)
  return ACCENTS[sum % ACCENTS.length]
}

function setMessage(el, text, type = '') {
  el.textContent = text
  el.className = 'msg ' + type
}

// GET /api -> array of quotes
async function loadQuotes() {
  try {
    const res = await fetch('/api')
    if (!res.ok) throw new Error('Status ' + res.status)
    quotes = await res.json()
    render()
  } catch (err) {
    console.error(err)
    setMessage(statusEl, 'Could not load quotes. Check that your server is running and /api returns JSON.', 'error')
  }
}

function render() {
  const term = searchEl.value.trim().toLowerCase()
  const shown = quotes.filter(q =>
    (q.text + ' ' + q.author).toLowerCase().includes(term)
  )

  board.replaceChildren()
  countEl.textContent = quotes.length ? `(${shown.length})` : ''

  if (quotes.length === 0) {
    setMessage(statusEl, 'No quotes yet. Add your first one above.')
    return
  }
  if (shown.length === 0) {
    setMessage(statusEl, 'No quotes match your search. Try a different word.')
    return
  }
  setMessage(statusEl, '')

  for (const q of shown) {
    const li = document.createElement('li')
    li.className = 'quote'
    li.style.setProperty('--accent', accentFor(q.author))

    const bq = document.createElement('blockquote')
    bq.textContent = q.text            // textContent, never innerHTML: stops script injection

    const cite = document.createElement('cite')
    cite.textContent = q.author

    li.append(bq, cite)
    board.append(li)
  }
}

// POST /api -> saves a new quote (you build handlePost on the backend)
form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const text = form.text.value.trim()
  const author = form.author.value.trim()
  if (!text || !author) {
    setMessage(formMsg, 'Add both a quote and an author.', 'error')
    return
  }

  saveBtn.disabled = true
  setMessage(formMsg, 'Saving…')
  try {
    const res = await fetch('/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, author })
    })
    if (!res.ok) throw new Error('Status ' + res.status)
    form.reset()
    setMessage(formMsg, 'Quote saved.', 'ok')
    await loadQuotes()
  } catch (err) {
    console.error(err)
    setMessage(formMsg, 'The server could not save this quote. Build POST /api on the backend first.', 'error')
  } finally {
    saveBtn.disabled = false
  }
})

searchEl.addEventListener('input', render)
loadQuotes()  // initial load
const evtSource = new EventSource('/api/live')
evtSource.onmessage=() => loadQuotes()
evtSource.onerror =() => console.log('Live connection lost, retrying ...')
