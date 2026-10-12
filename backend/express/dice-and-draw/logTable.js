import sqlite3 from 'sqlite3'
import {open} from 'sqlite'
import path from 'node:path'

async function ViewAllGames(){
    const db=await open({
        filename:path.join('database.db'),
        driver:sqlite3.Database
    })
    try{
        const games= await db.all('SELECT * FROM games')
        console.table(games)
    }catch(err){
        console.error('Error fetching games:',err.message)

    }finally{
        await db.close()

    }
}
ViewAllGames()
