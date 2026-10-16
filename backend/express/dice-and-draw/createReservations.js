import sqlite3 from 'sqlite3'
import {open} from 'sqlite'
import path from 'node:path'
async function createReservations(){
     const db =await open({
            filename:path.join('database.db'),
            driver: sqlite3.Database
        })
    await db.exec('PRAGMA foreign_keys = ON')
    await db.exec(`
       CREATE TABLE IF NOT EXISTS reservations(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER NOT NULL,
            gameId INTEGER NOT NULL,
            name TEXT NOT NULL,
            players INTEGER NOT NULL,
            date TEXT NOT NULL,
            startHour INTEGER NOT NULL,
            hours INTEGER NOT NULL,
            FOREIGN KEY (userId) REFERENCES users(id),
            FOREIGN KEY (gameId) REFERENCES games(id)
         )
  `)
    const columns = await db.all('PRAGMA table_info(reservations)')
    if (!columns.some((column) => column.name === 'userId')) {
        await db.exec(
            'ALTER TABLE reservations ADD COLUMN userId INTEGER REFERENCES users(id)'
        )
    }
   await db.close()
}
createReservations()