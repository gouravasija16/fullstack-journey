import {games} from "./seedData.js"
import sqlite3 from 'sqlite3'
import {open} from 'sqlite'
import path from 'node:path'
async function seedTable(){
    const db =await open({
        filename:path.join('database.db'),
        driver: sqlite3.Database
    })
    try{
        await db.exec('BEGIN TRANSACTION')
        for(const {title,category,description,difficulty,minPlayers,maxPlayers,playMinutes,copies,image} of games){
        await db.run(
            `INSERT INTO games(title,category,description,difficulty,minPlayers,maxPlayers,playMinutes,copies,image)
            VALUES (?,?,?,?,?,?,?,?,?)`,
            [title,category,description,difficulty,minPlayers,maxPlayers,playMinutes,copies,image]
        )
      }
      await db.exec('COMMIT')
      console.log('All records inserted')

    }catch(err){
        await db.exec('ROLLBACK')
        console.log('Error inserting data',err.message)

    }finally{
        await db.close()
        console.log('Connection closed')
    }
}
seedTable()