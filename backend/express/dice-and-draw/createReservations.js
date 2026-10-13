import sqlite3 from 'sqlite3'
import {open} from 'sqlite'
import path from 'node:path'
async function createReservations(){
     const db =await open({
            filename:path.join('database.db'),
            driver: sqlite3.Database
        })
    await db.exec(`
       CREATE TABLE IF NOT EXISTS reservations(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            gameId INTEGER NOT NULL,
            name TEXT NOT NULL,
            players INTEGER NOT NULL,
            date TEXT NOT NULL,
            startHour INTEGER NOT NULL,
            hours INTEGER NOT NULL,
            FOREIGN KEY (gameId) REFERENCES games(id)
         )
  `)
   await db.close()
}
createReservations()