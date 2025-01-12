const express = require('express')
const { resolve } = require('path')
const sqlite3 = require('sqlite3').verbose()
const cors = require('cors')

const app = express()
const port = 3000

app.use(express.static('static'))
app.use(cors())

// Database connection
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Error opening database:', err.message)
  } else {
    console.log('Connected to the SQLite database.')
  }
})

// Get All Games
app.get('/games', (req, res) => {
  db.all('SELECT * FROM games', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({ games: rows })
  })
})

// Get Game by ID
app.get('/games/details/:id', (req, res) => {
  db.get('SELECT * FROM games WHERE id = ?', [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({ game: row })
  })
})

// Get Games by Genre
app.get('/games/genre/:genre', (req, res) => {
  db.all(
    'SELECT * FROM games WHERE genre = ?',
    [req.params.genre],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message })
        return
      }
      res.json({ games: rows })
    }
  )
})

// Get Games by Platform
app.get('/games/platform/:platform', (req, res) => {
  db.all(
    'SELECT * FROM games WHERE platform = ?',
    [req.params.platform],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message })
        return
      }
      res.json({ games: rows })
    }
  )
})

// Get Games Sorted by Rating
app.get('/games/sort-by-rating', (req, res) => {
  db.all('SELECT * FROM games ORDER BY rating DESC', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({ games: rows })
  })
})

// Get All Players
app.get('/players', (req, res) => {
  db.all('SELECT * FROM players', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({ players: rows })
  })
})

// Get Player by ID
app.get('/players/details/:id', (req, res) => {
  db.get('SELECT * FROM players WHERE id = ?', [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({ player: row })
  })
})

// Get Players by Platform
app.get('/players/platform/:platform', (req, res) => {
  db.all(
    'SELECT * FROM players WHERE platform = ?',
    [req.params.platform],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message })
        return
      }
      res.json({ players: rows })
    }
  )
})

// Get Players Sorted by Rating
app.get('/players/sort-by-rating', (req, res) => {
  db.all('SELECT * FROM players ORDER BY rating DESC', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({ players: rows })
  })
})

//  Get All Tournaments
app.get('/tournaments', (req, res) => {
  db.all('SELECT * FROM tournaments', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({ tournaments: rows })
  })
})

//  Get Tournament by ID
app.get('/tournaments/details/:id', (req, res) => {
  db.get(
    'SELECT * FROM tournaments WHERE id = ?',
    [req.params.id],
    (err, row) => {
      if (err) {
        res.status(500).json({ error: err.message })
        return
      }
      res.json({ tournament: row })
    }
  )
})

//  Get Tournaments by Game ID
app.get('/tournaments/game/:id', (req, res) => {
  db.all(
    'SELECT * FROM tournaments WHERE gameId = ?',
    [req.params.id],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message })
        return
      }
      res.json({ tournaments: rows })
    }
  )
})

//  Get Tournaments Sorted by Prize Pool
app.get('/tournaments/sort-by-prize-pool', (req, res) => {
  db.all(
    'SELECT * FROM tournaments ORDER BY prizePool DESC',
    [],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message })
        return
      }
      res.json({ tournaments: rows })
    }
  )
})

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'))
})

// Start the server
app.listen(port, () => {
  console.log(
    `Gaming Community Platform API listening at http://localhost:${port}`
  )
})
