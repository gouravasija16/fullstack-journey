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
        const {category}=req.query
        if(category){
            query+=' WHERE category=?'
            params.push(category)
        }
        const games=await db.all(query,params)
        res.status(200).json(games)
    }catch(err){
        res.status(500).json({error:'failed to fetch games',details:err.message})

    }

}