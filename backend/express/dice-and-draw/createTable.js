import sqlite3 from 'sqlite3'
import {open} from 'sqlite'
import path from 'node:path'

 async function createTable(){
    const db =await open({
        filename:path.join('database.db'),
        driver: sqlite3.Database
    })
    await db.exec(`
        CREATE TABLE IF NOT EXISTS games(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            category TEXT NOT NULL,
            description TEXT NOT NULL,
            difficulty TEXT NOT NULL,
            Players TEXT NOT NULL,
            duration INTEGER NOT NULL,
            image TEXT NOT NULL
        )
    `)
    await db.close()
    console.log('Table created successfully')
}
createTable()
