import sqlite3 from 'sqlite3'
import path from "path"
import {open} from "sqlite"
export  async function gamesController(req,res){
    const db =await open({
            filename:path.join('database.db'),
            driver: sqlite3.Database
        })
    try{
        let query= `SELECT * FROM games`
        const params =[]
        const filters=[]
        const {category,search,players,maxMinutes}=req.query
        if(category){
           filters.push("category =?")
           params.push(category)
        } if(search){
           filters.push("(title LIKE ?)")
            const searchPattern= `%${search}%`
            params.push(searchPattern)
        }if(players){
            filters.push("minPlayers <= ? AND  maxPlayers >= ?")
            params.push(Number(players),Number(players))
        }if(maxMinutes){
            filters.push("playMinutes<= ?")
            params.push(Number(maxMinutes))

        }
        if (filters.length > 0) {
        query += ` WHERE ${filters.join(' AND ')}`
    }
        const games=await db.all(query,params)
        res.status(200).json(games)
    }catch(err){
        res.status(500).json({error:'failed to fetch games',details:err.message})

    }

}